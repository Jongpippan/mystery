import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {r,initialState,currentNode,isSave,presentation,travel,revisits,acquiredPending} from './runtime-harness.mjs';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ep-fixtures.json','utf8'));
const hub=id=>r(fixtures[`task-${id}`],{type:'viewClose'});
test('public safe paths preserve child, answer, time and exact return position',()=>{
  const original=hub('D03');let s=original;
  for(const route of ['R01','R02','R04']){s=r(s,{type:'move',route});assert.ok(s.travel);assert.ok(isSave(s));assert.equal(presentation(s).companion,true);}
  assert.equal(s.travel.position,'L07');assert.equal(r(s,{type:'move',route:'R08'}),s);
  s=r(s,{type:'move',route:'R04'});assert.ok(!travel.travelOptions(s).some(o=>['R03','R05','R06'].includes(o.id)));
  const before=s;s=r(s,{type:'advance'});assert.deepEqual(s,before);
  s=r(s,{type:'view',tool:'map'});s=r(initialState,{type:'restore',state:JSON.parse(JSON.stringify(s))});assert.ok(s.travel);
  for(const route of ['R02','R01'])s=r(s,{type:'move',route});
  assert.equal(s.travel,undefined);assert.deepEqual(s.investigation,original.investigation);assert.equal(s.cursor,original.cursor);assert.deepEqual(s.log,original.log);
  assert.equal(presentation(s).time,presentation(original).time);assert.equal(s.points,original.points);
});
test('adult junction route cannot enter the locked service port or pool',()=>{
  const original=hub('D04');assert.equal(presentation(original).companion,false);
  assert.ok(travel.travelOptions(original).some(o=>o.id==='R05'));assert.ok(!travel.travelOptions(original).some(o=>['R06','R08','R09'].includes(o.id)));
  let s=r(original,{type:'move',route:'R05'});assert.equal(s.travel.position,'L03:guest');
  assert.equal(r(s,{type:'task',id:'D04'}),s);
  assert.equal(isSave({...s,travel:{...s.travel,position:'L03:service',trail:['L08','L03:service']}}),false);
  s=r(s,{type:'move',route:'R05'});assert.equal(s.travel,undefined);assert.deepEqual(s.investigation,original.investigation);
});
test('PR public count starts only after explicit participation and disallows travel during its interval',()=>{
  let s=r(initialState,{type:'start',name:'나여백'});
  for(let n=0;n<1000&&!(s.sceneId==='C_PR_11'&&currentNode(s)?.kind==='appointment');n++){
    const pending=acquiredPending(s);if(pending){s=r(s,{type:'acknowledge',id:pending});s=r(s,{type:'viewBack'});continue;}
    const node=currentNode(s);s=node.kind==='choice'?r(s,{type:'choose',choice:node.choice,value:node.options[0].value}):r(s,{type:'advance'});
  }
  assert.equal(s.sceneId,'C_PR_11');assert.equal(currentNode(s).kind,'appointment');const original=s;
  assert.ok(revisits.currentRevisits(s).some(v=>v.id==='pr-count'));
  s=r(s,{type:'move',route:'R01'});assert.ok(isSave(s));assert.equal(r(s,{type:'advance'}),s);
  s=r(s,{type:'move',route:'R02'});s=r(s,{type:'move',route:'R04'});
  assert.ok(revisits.currentRevisits(s).some(v=>v.id==='pr-booth'));
  s=r(s,{type:'revisit',id:'pr-booth'});assert.equal(revisits.revisitNode(s).id,'S_PR_09_0091');assert.ok(isSave(s));
  s=r(s,{type:'advance'});s=r(s,{type:'advance'});
  for(const route of ['R04','R02','R01'])s=r(s,{type:'move',route});
  assert.equal(s.cursor,original.cursor);s=r(s,{type:'advance'});assert.equal(s.sceneId,'C_PR_12');assert.deepEqual(travel.travelOptions(s),[]);
  assert.equal(r(s,{type:'move',route:'R02'}),s);
});
