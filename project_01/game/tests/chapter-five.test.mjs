import assert from 'node:assert/strict';
import test from 'node:test';
import {writeFileSync} from 'node:fs';
import {r,investigationOptions,challenges,judge,hintLine,chapterFiveVisitHint,stageNodes,presentation,script,answers,fixtures,restored,finishScene,finishTask,solve,throughChapterFour} from './runtime-harness.mjs';
const starts={early:throughChapterFour(true),late:throughChapterFour(false)};
for(const photo of ['early','late'])for(const first of ['D22','D23'])for(const optional of [false,true])test(`CH05 photo=${photo}; first=${first}; optional=${optional}`,()=>{
 let s=r(starts[photo],{type:'visit',stage:'ch5-handoff'});assert.equal(s.investigation.knowledge.length,24);
 for(let n=0;n<70;n++){
  s=finishScene(s);const i=s.investigation;fixtures[`hub-${i.stage}`]??=s;
  if(i.stage==='ch5-first-result')fixtures[`after-first-${first}`]??=s;
  assert.equal(s.points,6);assert.equal(s.evidence.includes('E49'),false);
  if(!i.knowledge.includes('KQ05')){assert.equal(s.evidence.includes('E43'),false);assert.equal(s.log.some(l=>l.nodeId==='S_Q05_v2'),false);}
  if(i.stage==='ch5-departure')break;
  const opts=investigationOptions(s);let o=optional?opts.find(o=>o.id.includes('personal')):null;
  o??=opts.find(o=>o.id===first)??opts.find(o=>!o.id.includes('personal'));assert.ok(o,`deadlock ${i.stage}`);
  s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);
 }
 assert.equal(s.investigation.stage,'ch5-departure');assert.equal(s.investigation.knowledge.length,30);
 assert.equal(s.log.some(l=>l.nodeId==='S_CH05_05_0001'),first==='D22');assert.equal(s.log.some(l=>l.nodeId==='S_CH05_05_0011'),first==='D23');
 assert.equal(s.log.filter(l=>l.nodeId==='S_CH05_05_0021').length,1);assert.equal(s.log.filter(l=>l.nodeId==='C_CH05_05:n0008').length,1);
 assert.equal(s.log.filter(l=>l.nodeId==='S_Q05_v2').length,1);assert.equal(s.log.filter(l=>l.nodeId==='C_CH01_02:n0042').length,1);
 assert.equal(s.investigation.completed.includes('ch5-photo'),photo==='late');
 for(const id of ['ch5-personal1','ch5-personal2','ch5-personal3'])assert.equal(s.investigation.completed.includes(id),optional);
 assert.deepEqual(s.evidence.filter(id=>['E40','E41','E42','E43','E45','E44','E47','E46'].includes(id)),['E40','E41','E42','E43','E45','E44','E47','E46']);
 assert.equal(presentation(s).place,'읍내 게스트하우스');assert.equal(presentation(s).companion,true);assert.deepEqual(investigationOptions(s).map(o=>o.id),['ch6-contact']);
 fixtures[`ending-${photo}-${first}-${optional}`]=s;
});
test('CH05 named false premises, alternative actions and clock errors charge once and preserve drafts',()=>{
 const wrong={D21:[['visible','nothing'],['identity','identified']],Q05:[['source','two'],['request','color']],D22:[['fit','stumble'],['fit','help'],['basis','gate'],['basis','record']],D23:[['before','voice'],['after','outage'],['margin','exact'],['scope','death']],D24:[['match','holder'],['witness','red']],D25:[['remaining','settled'],['next','weapon']]};
 for(const [id,cases] of Object.entries(wrong)){
  const c=challenges[id];for(const key of c.required)assert.equal(judge(id,answers[id],c.required.filter(k=>k!==key)).kind,'incomplete');
  assert.equal(judge(id,{...answers[id],evidence:[...answers[id].evidence,'E01']},c.required).kind,'success');
  for(const [key,value] of cases){let s=fixtures[`task-${id}`];const d={...answers[id],fields:{...answers[id].fields,[key]:value}};s=r(s,{type:'draft',id,draft:d});const action={type:'submit',id,attempt:`wrong-${id}-${key}-${value}`};s=r(s,action);assert.equal(s.investigation.task.result.kind,'error');assert.equal(s.points,4);assert.equal(r(s,action),s);s=finishTask(s);s=r(s,{type:'view',tool:'history'});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.investigation.drafts[id],d);}
 }
});
test('CH05 hint selectors follow missing physical steps and preserve exact H4 with interruption or error',()=>{
 for(const id of ['D21','Q05','D22','D23','D24','D25']){
  const c=challenges[id],done=id.startsWith('Q')?`K${id}`:id.replace('D','K');
  for(let level=0;level<5;level++){assert.ok(script.utterances[hintLine(id,level,c.required,answers[id])]);assert.equal(hintLine(id,level,[...c.required,done],answers[id]),`S_H_${id}_0091`);}
  assert.equal(hintLine(id,4,c.required,answers[id],Object.keys(c.errorHints)[0],true),`S_H_${id}_0041`);
  assert.equal(hintLine(id,3,c.required,answers[id],'',true),`S_H_${id}_0031`);
  for(const [error,suffix] of Object.entries(c.errorHints))assert.equal(hintLine(id,3,c.required,answers[id],error),`S_H_${id}_${suffix}`);
  for(const [missing,suffix] of c.missing)assert.equal(hintLine(id,4,c.required.filter(k=>k!==missing),answers[id],'',true),`S_H_${id}_${suffix}`);
 }
 for(let level=0;level<5;level++){
  const h=(held,requested,supervised,interrupted=false,complete=false)=>chapterFiveVisitHint(level,held,requested,supervised,interrupted,complete);
  assert.equal(h([],false,false),'S_H_V05_0002');assert.equal(h([],true,false),'S_H_V05_0011');assert.equal(h([],true,true,true),'S_H_V05_0022');
  assert.equal(h([],true,true),'S_H_V05_0032');assert.equal(h(['E40'],true,true),'S_H_V05_0033');assert.equal(h(['E40','E41'],true,true),'S_H_V05_0042');
  assert.ok(script.utterances[h(['E40','E41','E42'],true,true)]);assert.equal(h(['E40','E41','E42'],true,true,false,true),'S_H_V05_0091');
 }
});
test('CH05 partial aftermath freezes the actually solved task; adult return and correction remain physical',()=>{
 const a=stageNodes('ch5-first-result',['K22'],{}),b=stageNodes('ch5-first-result',['K23'],{}),both=stageNodes('ch5-both-results',['K22','K23'],{});
 assert.equal(a.length,2);assert.equal(b.length,2);assert.equal(both.length,4);
 let s=fixtures['acquire-E43'];assert.equal(s.investigation.knowledge.includes('KQ05'),false);assert.equal(s.views.at(-1).detail,'E43');s=finishTask(restored(s));assert.ok(s.investigation.knowledge.includes('KQ05'));
 for(const id of ['ch5-panes','ch5-gate','ch5-compare'])assert.equal(presentation(fixtures[`hub-${id}`]).companion,false);
 assert.equal(presentation(fixtures['hub-ch5-reunion']).companion,true);
});
test.after(()=>{if(process.env.YEOWUL_WRITE_FIXTURES==='1')writeFileSync('../game-plan/validation/runtime-ch05-fixtures.json',JSON.stringify(fixtures,null,2));});
