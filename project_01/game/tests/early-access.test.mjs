import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {r,isSave,acquiredPending,revisits,finishScene,solve,investigationOptions,chapterOne} from './runtime-harness.mjs';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ep-fixtures.json','utf8'));
test('early console request acquires identical sources without room conclusions or later repeat effects',()=>{
 const original=r(fixtures['task-D01'],{type:'viewClose'});let s=r(original,{type:'move',route:'R04'});
 assert.ok(revisits.currentRevisits(s).some(v=>v.id==='early-console'));s=r(s,{type:'revisit',id:'early-console'});
 for(let n=0;n<150&&s.revisit;n++){
   assert.ok(isSave(s));const e=acquiredPending(s);if(e){assert.equal(r(s,{type:'advance'}),s);s=r(s,{type:'acknowledge',id:e});s=r(s,{type:'viewBack'});}else s=r(s,{type:'advance'});
 }
 assert.equal(s.revisit,undefined);assert.ok(['E12','E11','E14'].every(e=>s.evidence.includes(e)));assert.deepEqual(s.investigation,original.investigation);
 s=r(s,{type:'move',route:'R04'});assert.equal(s.travel,undefined);
 for(let n=0;n<100;n++){
  s=finishScene(s);if(s.investigation.stage==='ch2-compare')break;
  const options=investigationOptions(s),o=options.find(o=>o.kind==='task'&&(o.id!=='Q01'||s.investigation.completed.includes('wall')))??options.find(o=>o.kind==='visit'&&o.id!=='photo'&&!o.id.includes('personal'));
  assert.ok(o);s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);
 }
 assert.equal(s.investigation.stage,'ch2-compare');assert.equal(s.log.filter(l=>l.nodeId==='C_CH02_02:n0025').length,1);assert.ok(s.log.some(l=>l.nodeId==='S_CH02_02_0091'));
 s=finishScene(r(s,{type:'visit',stage:'ch2-authority'}));s=solve(s,'D06');assert.ok(s.investigation.knowledge.includes('K06'));
});
test('prop-list inquiry can precede the cart demonstration and never duplicates its contents',()=>{
 let s=chapterOne(false,'environment_first');
 for(let n=0;n<80;n++){s=finishScene(s);if(s.investigation.stage==='ch3-photo')break;const o=investigationOptions(s).find(o=>!o.id.includes('personal'));assert.ok(o);s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);}
 assert.ok(investigationOptions(s).some(o=>o.id==='ch3-props'));s=finishScene(r(s,{type:'visit',stage:'ch3-props'}));assert.ok(s.evidence.includes('E22'));assert.ok(!s.evidence.includes('E21'));
 s=finishScene(r(s,{type:'visit',stage:s.investigation.returnStage}));s=solve(s,'D11');assert.ok(s.investigation.knowledge.includes('K11'));s=finishScene(r(s,{type:'visit',stage:'ch3-cart'}));assert.ok(s.evidence.includes('E21'));assert.equal(s.log.filter(l=>l.nodeId==='C_CH03_03:n0014').length,1);
});
test('visual copy overlay is available before K26 but cannot award D27 or Q06 conclusions',()=>{
 let s=r(fixtures['task-D26'],{type:'viewClose'});assert.ok(!s.investigation.knowledge.includes('K26'));
 assert.ok(investigationOptions(s).some(o=>o.id==='ch6-overlay'));s=finishScene(r(s,{type:'visit',stage:'ch6-overlay'}));assert.ok(s.evidence.includes('E51'));assert.ok(!s.investigation.knowledge.includes('K26'));
 assert.ok(!investigationOptions(s).some(o=>['D27','Q06'].includes(o.id)));s=solve(s,'D26');assert.ok(s.investigation.knowledge.includes('K26'));assert.ok(investigationOptions(s).some(o=>o.id==='D27'));assert.ok(isSave(s));
});
