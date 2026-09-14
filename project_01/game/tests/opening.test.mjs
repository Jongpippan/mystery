import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import test from 'node:test';

const temp=mkdtempSync(join(tmpdir(),'yeowul-opening-'));
const output=join(temp,'state.cjs');
await build({entryPoints:['lib/game/state.ts'],bundle:true,platform:'node',format:'cjs',outfile:output,alias:{'@':resolve('.')},logLevel:'silent'});
const {initialState,gameReducer,currentNode,currentSequence,isSave}=createRequire(import.meta.url)(output);
const presentationOutput=join(temp,'prologue.cjs');
await build({entryPoints:['lib/game/prologue.ts'],bundle:true,platform:'node',format:'cjs',outfile:presentationOutput,alias:{'@':resolve('.')},logLevel:'silent'});
const {prologuePresentation}=createRequire(import.meta.url)(presentationOutput);
assert.equal(dirname(resolve(temp)),resolve(tmpdir()));
assert.ok(basename(temp).startsWith('yeowul-opening-'));
rmSync(temp,{recursive:true,force:true});

for(const bag of ['help_queue','protect_papers']) for(const sound of ['environment_first','ask_voice_later']) for(const counting of ['A','B']) {
  test(`Prologue selected branches and restored positions: ${bag}/${sound}/${counting}`,()=>{
    let state=gameReducer(initialState,{type:'start',name:'테스트 이름'});
    state=gameReducer(state,{type:'note',text:'우산과 짐을 구분한다.'});
    const seenChoices=[];
    let count=0;
    while(count++<1000) {
      const node=currentNode(state);
      assert.ok(node,`No current node at ${state.sceneId}/${state.cursor}`);
      if(node.kind==='speech'&&node.speaker==='P01') assert.equal(prologuePresentation(state).companion,true,'child speech requires actual presence');
      if(state.sceneId==='C_PR_10') assert.equal(prologuePresentation(state).companion,false,'child stays with P02 during cargo demonstration');
      const restored=JSON.parse(JSON.stringify(state));
      assert.ok(isSave(restored));
      assert.deepEqual(currentNode(gameReducer(initialState,{type:'restore',state:restored})),node);
      if(node.kind==='choice') {
        seenChoices.push(node.choice);
        assert.deepEqual(gameReducer(state,{type:'advance'}),state,'advance cannot skip a choice');
        const action={type:'choose',choice:node.choice,value:node.choice==='B_PR_01'?bag:node.choice==='B_PR_02'?sound:counting};
        state=gameReducer(state,action);
        assert.deepEqual(gameReducer(state,action),state,'repeated selection cannot advance twice');
      }else{
        if(node.kind==='evidence') {
          assert.deepEqual(gameReducer(state,{type:'advance'}),state,'unacknowledged evidence blocks continuation');
          state=gameReducer(state,{type:'acknowledge',id:node.evidenceId});
          assert.deepEqual(gameReducer(state,{type:'acknowledge',id:node.evidenceId}),state);
        }
        const next=gameReducer(state,{type:'advance'});
        if(next===state) break;
        state=next;
      }
    }
    assert.ok(count<1000,'prologue terminates without a loop');
    assert.equal(state.sceneId,'C_PR_16');
    assert.equal(state.cursor,currentSequence(state).length-1);
    assert.deepEqual(seenChoices,['B_PR_01','B_PR_02','B_PR_COUNT']);
    assert.deepEqual(state.evidence,['E02','E03','E01','E39','E28','E18']);
    assert.deepEqual(state.met,['P00','P01','P02','P03','P08','P05','P09','P07']);
    assert.equal(state.points,6);
    assert.equal(state.notes,'우산과 짐을 구분한다.');
    const logged=new Set(state.log.map(item=>item.nodeId));
    assert.equal(logged.size,state.log.length,'no repeated nodes');
    assert.equal(logged.has('S_PR_02_0011'),bag==='help_queue');
    assert.equal(logged.has('S_PR_02_0021'),bag==='protect_papers');
    assert.equal(logged.has('S_PR_04_0041'),sound==='ask_voice_later');
    assert.equal(logged.has('S_PR_04_0031'),sound==='environment_first');
    assert.equal(logged.has('S_PR_12_0011'),counting==='A');
    assert.equal(logged.has('S_PR_12_0014'),counting==='B');
    for(const item of state.log) {
      const node=currentSequence({...state,sceneId:item.sceneId}).find(n=>n.id===item.nodeId);
      assert.ok(node);
      assert.doesNotMatch(node.text,/^State boundary:/);
      assert.ok(!node.section.some(s=>/revisit|replay|resume|Suspended/i.test(s)));
    }
  });
}

test('Invalid saved data cannot replace the current game or acknowledge unseen evidence',()=>{
  const state=gameReducer(initialState,{type:'start',name:'검사'});
  for(const patch of [{choices:null},{cursor:NaN},{cursor:5000},{met:undefined},{log:[null]},{textScale:NaN},{acknowledged:['E52']},{evidence:['E99']},{choices:{B_PR_02:'unknown'}},{points:-2}]) {
    const candidate={...state,...patch};
    assert.equal(isSave(candidate),false);
    assert.equal(gameReducer(state,{type:'restore',state:candidate}),state);
  }
  assert.equal(gameReducer(state,{type:'acknowledge',id:'E52'}),state);
});
