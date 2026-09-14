import assert from 'node:assert/strict';
import test from 'node:test';
import {writeFileSync} from 'node:fs';
import {r,investigationOptions,heldFacts,challenges,judge,hintLine,chapterThreeVisitHint,stageNodes,presentation,script,answers,fixtures,restored,finishScene,finishTask,solve,chapterOne} from './runtime-harness.mjs';
let start=r(chapterOne(false,'environment_first'),{type:'visit',stage:'ch2-booth'});
for(let n=0;n<40;n++){
 start=finishScene(start,{B_PLAYBACK_RESPONSE:'need_time'});if(start.investigation.stage==='ch2-departure')break;
 const o=investigationOptions(start).find(o=>!o.id.includes('personal'));assert.ok(o);start=o.kind==='visit'?r(start,{type:'visit',stage:o.id}):solve(start,o.id);
}
assert.equal(start.investigation.knowledge.length,12);
for(const earlyQ of [false,true])for(const earlyAsh of [false,true])for(const lateShape of [false,true])for(const optional of [false,true])test(`CH03 earlyQ=${earlyQ} ash=${earlyAsh} lateShape=${lateShape} optional=${optional}`,()=>{
 let s=r(start,{type:'visit',stage:'ch3-kitchen'}),order=[];
 for(let n=0;n<80;n++){
  s=finishScene(s);const i=s.investigation;
  assert.ok(!s.evidence.includes('E49'));assert.equal(s.points,6);
  if(!i.knowledge.includes('KQ03')){assert.ok(!s.evidence.includes('E24'));assert.ok(!s.log.some(l=>l.nodeId==='S_CH03_04_0042'));}
  const opts=investigationOptions(s);let o=optional?opts.find(o=>o.id.startsWith('ch3-personal')):null;
  if(!o&&i.stage==='ch3-departure')break;
  if(!o&&earlyAsh)o=opts.find(o=>o.id==='ch3-ash');
  if(!o&&earlyQ)o=opts.find(o=>o.id==='Q03');
  if(!o&&!earlyQ)o=opts.find(o=>o.id==='ch3-cart')??opts.find(o=>o.id==='D12');
  if(!o&&lateShape)o=opts.find(o=>o.id==='ch3-opening');
  o??=opts.find(o=>o.kind==='task'&&(!lateShape||o.id!=='D11'||i.completed.includes('ch3-preserve')))??opts.find(o=>o.kind==='visit'&&!o.id.includes('personal'));
  assert.ok(o,`deadlock ${i.stage} ${JSON.stringify(opts)}`);
  order.push(o.id);s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);
 }
 assert.equal(s.investigation.stage,'ch3-departure');assert.equal(s.investigation.knowledge.length,18);
 assert.equal(order.indexOf('Q03')<order.indexOf('D12'),earlyQ);
 assert.equal(order.indexOf('D11')>order.indexOf('ch3-opening'),lateShape);
 assert.deepEqual(s.evidence.filter(e=>['E23','E26','E29','E30'].includes(e)),['E23','E26','E29','E30']);
 assert.equal(s.log.filter(l=>l.nodeId==='S_Q03_v2').length,1);assert.equal(s.log.filter(l=>l.nodeId==='C_CH03_04:n0002').length,1);
 assert.ok(s.log.some(l=>l.nodeId==='S_CH03_04_0042'));assert.ok(s.log.some(l=>l.nodeId==='S_CH03_08_0015'));
 assert.equal(presentation(s).companion,true);assert.ok(!s.log.some(l=>/S_CH06/.test(l.nodeId)));
 for(const id of ['ch3-personal1','ch3-personal2','ch3-personal3'])assert.equal(s.investigation.completed.includes(id),optional);
 fixtures.ending=s;
});
test('CH03 judgments preserve source bounds, incomplete prerequisites and wrong-once accounting',()=>{
 const wrong={D11:[['shape','body'],['shape','empty']],D12:[['scope','person'],['route','stair']],Q03:[['claim','corpse']],D13:[['chain','present'],['escort','three']],D14:[['layers','all']],D15:[['responsibility','clear'],['responsibility','murder'],['next','copy']]};
 for(const [id,cases] of Object.entries(wrong)){
  for(const required of challenges[id].required)assert.equal(judge(id,answers[id],challenges[id].required.filter(k=>k!==required)).kind,'incomplete');
  assert.equal(judge(id,{...answers[id],evidence:[...answers[id].evidence,'E01']},challenges[id].required).kind,'success');
  for(const [key,value] of cases){let s=fixtures[`task-${id}`];const d={...answers[id],fields:{...answers[id].fields,[key]:value}};s=r(s,{type:'draft',id,draft:d});const action={type:'submit',id,attempt:`wrong-${id}-${key}-${value}`};s=r(s,action);assert.equal(s.points,4);assert.equal(s.investigation.task.result.kind,'error');assert.equal(r(s,action),s);s=finishTask(s);s=r(s,{type:'view',tool:'history'});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.investigation.drafts[id],d);}
 }
});
test('CH03 hint selectors protect opaque cargo, unreadable original and missing silhouette deduction',()=>{
 for(const id of ['D11','D12','Q03','D13','D14','D15']){
  const held=[...challenges[id].required,'V03_OPENED','V03_ACKNOWLEDGED'];
  for(let level=0;level<5;level++)assert.ok(script.utterances[hintLine(id,level,held,answers[id])]);
  assert.equal(hintLine(id,4,held,answers[id],Object.keys(challenges[id].errorHints)[0],true),`S_H_${id}_0041`);
  const k=id.startsWith('Q')?`K${id}`:id.replace('D','K');assert.equal(hintLine(id,0,[...held,k],answers[id]),`S_H_${id}_0091`);
 }
 assert.equal(hintLine('D13',4,['E24','KQ03','K12'],answers.D13),'S_H_D13_0004');
 assert.equal(hintLine('D13',4,['E24','KQ03','K12','V03_OPENED'],answers.D13),'S_H_D13_0012');
 assert.equal(hintLine('D15',4,['E20','E22','K13','K14'],answers.D15),'S_H_D11_0001');
 for(const level of [0,1,2,3,4]){
  assert.equal(chapterThreeVisitHint(level,['K12'],'pending'),'S_H_V03_0002');
  assert.equal(chapterThreeVisitHint(level,['KQ03'],'pending'),'S_H_V03_0003');
  assert.equal(chapterThreeVisitHint(level,['KQ03','K12'],'sealed'),'S_H_V03_0031');
  for(const stage of ['pending','joined','route','sealed','opened','complete'])assert.ok(script.utterances[chapterThreeVisitHint(level,['KQ03','K12'],stage,true)]);
 }
 for(const [key,s] of Object.entries(fixtures).filter(([key])=>key.startsWith('cargo-'))){const h=r(s,{type:'visitHint',event:'V03',level:4});assert.ok(script.utterances[h.investigation.hintId],key);assert.ok(restored(h));}
 const before=fixtures['acquire-E23'];assert.ok(!heldFacts(before).includes('V03_COMPLETE'));assert.ok(!heldFacts(before).includes('V03_ACKNOWLEDGED'));
 assert.ok(!script.evidence.E30.text.includes('20:14'));
});
test('Pre-correction ash lines never leak and post-correction followup does not repeat acquisition',()=>{
 const first=stageNodes('ch3-ash',[],{}),follow=stageNodes('ch3-ash-follow',['KQ03','K12'],{});
 assert.ok(first.some(n=>n.id==='S_CH03_04_0011'));assert.ok(!first.some(n=>n.id==='S_CH03_04_0042'));
 assert.ok(follow.some(n=>n.id==='S_CH03_04_0042'));assert.ok(!follow.some(n=>n.kind==='evidence'));
});
test('Suspending Q03 does not pin a subsequent kitchen visit to the loading desk',()=>{
 let s=finishScene(r(start,{type:'visit',stage:'ch3-kitchen'}));s=finishScene(r(s,{type:'visit',stage:'ch3-photo'}));
 s=finishTask(r(s,{type:'task',id:'Q03'}));s=r(s,{type:'draft',id:'Q03',draft:answers.Q03});s=r(s,{type:'viewClose'});
 assert.equal(presentation(s).place,'적재·기록 데스크');s=finishScene(r(s,{type:'visit',stage:'ch3-ash'}));
 assert.equal(presentation(s).place,'주방 · 난로 옆');assert.equal(presentation(s).companion,false);assert.deepEqual(s.investigation.drafts.Q03,answers.Q03);
 s=r(s,{type:'task',id:'Q03'});assert.equal(presentation(s).place,'적재·기록 데스크');assert.equal(s.investigation.task.phase,'answer');
});
test.after(()=>{if(process.env.YEOWUL_WRITE_FIXTURES==='1')writeFileSync('../game-plan/validation/runtime-ch03-fixtures.json',JSON.stringify(fixtures,null,2));});
