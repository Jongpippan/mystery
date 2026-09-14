import test from 'node:test';
import assert from 'node:assert/strict';
import {r,initialState,finishScene,solve,investigationOptions,isSave,currentNode,acquiredPending,revisits} from './runtime-harness.mjs';

test('prologue rechecks remain in their authorized place and return to the exact source',()=>{
 let s=r(initialState,{type:'start',name:'나여백'});const visited=new Set();
 for(let n=0;n<2000&&!s.investigation;n++){
  if(acquiredPending(s)){s=r(s,{type:'acknowledge',id:acquiredPending(s)});continue;}
  const node=currentNode(s),option=revisits.currentRevisits(s).find(v=>['pr-inventory','pr-rest','pr-form','pr-boundary'].includes(v.id)&&!visited.has(v.id));
  if(option&&(node.kind==='appointment'||option.id==='pr-boundary')){
   const before=s;s=r(s,{type:'revisit',id:option.id});assert.ok(s.revisit);
   for(let k=0;k<5&&s.revisit;k++){assert.ok(isSave(s));s=r(s,{type:'advance'});}
   assert.equal(s.revisit,undefined);assert.equal(s.sceneId,before.sceneId);assert.equal(s.cursor,before.cursor);assert.deepEqual(s.evidence,before.evidence);assert.deepEqual(s.choices,before.choices);visited.add(option.id);
  }
  s=node.kind==='choice'?r(s,{type:'choose',choice:node.choice,value:node.options[0].value}):r(s,{type:'advance'});
 }
 assert.ok(s.investigation);assert.deepEqual([...visited],['pr-inventory','pr-rest','pr-form','pr-boundary']);
 assert.ok(!revisits.currentRevisits(s).some(v=>v.id.startsWith('pr-')));
});

test('current CH01 conversations retain source position, drafts, facts and actual test state',()=>{
  let s=finishScene(r(initialState,{type:'start',name:'나여백'}),{B_PR_02:'environment_first'});
  const visited=[];
  for(let n=0;n<100;n++){
    s=finishScene(s);
    const stage=s.investigation.stage;
    if(['wall','aftermath','objection'].includes(stage)&&!visited.includes(stage)){
      visited.push(stage);const before=s;
      s=r(s,{type:'revisit',id:stage});assert.equal(s.revisit.id,stage);
      assert.ok(isSave(s));s=r(initialState,{type:'restore',state:JSON.parse(JSON.stringify(s))});
      assert.equal(s.cursor,before.cursor);assert.deepEqual(s.investigation,before.investigation);
      for(const tool of ['evidence','people','map','history','notes','settings']){s=r(s,{type:'view',tool});s=r(s,{type:'viewBack'});}
      s=r(s,{type:'advance'});assert.equal(s.revisit.index,1);assert.ok(isSave(s));
      s=r(s,{type:'advance'});assert.equal(s.revisit,undefined);
      assert.deepEqual(s.investigation,before.investigation);assert.deepEqual(s.evidence,before.evidence);
      assert.equal(s.points,before.points);assert.equal(s.cursor,before.cursor);
      assert.equal(s.log.length,before.log.length+2);
      const again=r(r(r(s,{type:'revisit',id:stage}),{type:'advance'}),{type:'advance'});
      assert.deepEqual(again.log,s.log);assert.ok(isSave(again));
      assert.equal(isSave({...s,revisit:{id:stage,index:999}}),false);
    }
    if(stage==='departure')break;
    const options=investigationOptions(s);
    const option=options.find(o=>o.kind==='task'&&(o.id!=='Q01'||s.investigation.completed.includes('wall')))??options.find(o=>o.kind==='visit'&&o.id!=='photo'&&!o.id.startsWith('personal'));
    assert.ok(option);s=option.kind==='visit'?r(s,{type:'visit',stage:option.id}):solve(s,option.id);
  }
  assert.deepEqual(visited,['wall','aftermath','objection']);
});
test('current revisit cannot start before arrival or in another chapter',()=>{
  assert.equal(r(initialState,{type:'revisit',id:'wall'}),initialState);
});
