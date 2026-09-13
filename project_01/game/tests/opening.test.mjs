import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import test from 'node:test';

const temp=mkdtempSync(join(tmpdir(),'yeowul-opening-'));
const output=join(temp,'state.cjs');
await build({entryPoints:['lib/game/state.ts'],bundle:true,platform:'node',format:'cjs',outfile:output,alias:{'@':resolve('.')},logLevel:'silent'});
const {initialState,gameReducer,currentNode,currentSequence,isSave}=createRequire(import.meta.url)(output);
rmSync(temp,{recursive:true,force:true});

for(const bag of ['help_queue','protect_papers']) for(const sound of ['environment_first','ask_voice_later']) {
  test(`Opening selected branches and restored positions: ${bag}/${sound}`,()=>{
    let state=gameReducer(initialState,{type:'start',name:'테스트 이름'});
    state=gameReducer(state,{type:'note',text:'우산과 짐을 구분한다.'});
    const seenChoices=[];
    let count=0;
    while(count++<300) {
      const node=currentNode(state);
      assert.ok(node,`No current node at ${state.sceneId}/${state.cursor}`);
      const restored=JSON.parse(JSON.stringify(state));
      assert.ok(isSave(restored));
      assert.deepEqual(currentNode(gameReducer(initialState,{type:'restore',state:restored})),node);
      if(node.kind==='choice') {
        seenChoices.push(node.choice);
        assert.deepEqual(gameReducer(state,{type:'advance'}),state,'advance cannot skip a choice');
        const action={type:'choose',choice:node.choice,value:node.choice==='B_PR_01'?bag:sound};
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
    assert.ok(count<300,'opening terminates without a loop');
    assert.equal(state.sceneId,'C_PR_05');
    assert.equal(state.cursor,currentSequence(state).length-1);
    assert.deepEqual(seenChoices,['B_PR_01','B_PR_02']);
    assert.deepEqual(state.evidence,['E02','E03','E01']);
    assert.deepEqual(state.met,['P00','P01','P02','P03']);
    assert.equal(state.points,6);
    assert.equal(state.notes,'우산과 짐을 구분한다.');
    const logged=new Set(state.log.map(item=>item.nodeId));
    assert.equal(logged.size,state.log.length,'no repeated nodes');
    assert.equal(logged.has('S_PR_02_0011'),bag==='help_queue');
    assert.equal(logged.has('S_PR_02_0021'),bag==='protect_papers');
    assert.equal(logged.has('S_PR_04_0041'),false,'no invented line');
  });
}
