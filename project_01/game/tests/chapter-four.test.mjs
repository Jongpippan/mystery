import assert from 'node:assert/strict';
import test from 'node:test';
import {writeFileSync} from 'node:fs';
import {r,investigationOptions,heldFacts,challenges,judge,hintLine,chapterFourVisitHint,stageNodes,presentation,script,answers,fixtures,restored,finishScene,finishTask,solve,throughChapterThree} from './runtime-harness.mjs';
const start=throughChapterThree();assert.equal(start.investigation.knowledge.length,18);
for(const exhibit of [null,'attributed_accounts','joint_annotations'])test(`CH04 complete; optional exhibit=${exhibit}`,()=>{
 let s=r(start,{type:'visit',stage:'ch4-meeting'});
 for(let n=0;n<60;n++){
  s=finishScene(s,{B_EXHIBIT:exhibit});const i=s.investigation;
  fixtures[`hub-${i.stage}`]??=s;
  assert.equal(s.points,6);assert.ok(!s.evidence.some(id=>['E40','E41','E42','E49'].includes(id)));assert.ok(!s.log.some(l=>l.nodeId==='S_Q05_v1'));
  if(!i.knowledge.includes('KQ04'))assert.ok(!s.evidence.includes('E36'));
  const opts=investigationOptions(s);let o=exhibit?opts.find(o=>o.id.startsWith('ch4-personal')):null;
  if(!o&&i.stage==='ch4-departure')break;
  o??=opts.find(o=>!o.id.includes('personal'));assert.ok(o,`deadlock ${i.stage}`);
  s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);
 }
 assert.equal(s.investigation.stage,'ch4-departure');assert.equal(s.investigation.knowledge.length,24);
 assert.deepEqual(s.evidence.filter(id=>['E31','E32','E33','E34'].includes(id)),['E31','E32','E33','E34']);
 assert.deepEqual(s.evidence.filter(id=>['E35','E37','E38','E19'].includes(id)),['E35','E37','E38','E19']);
 assert.equal(s.log.filter(l=>l.nodeId==='S_Q04_v2').length,1);
 assert.equal(s.log.some(l=>l.nodeId==='S_CH04_O2_0001'),exhibit==='attributed_accounts');assert.equal(s.log.some(l=>l.nodeId==='S_CH04_O2_0011'),exhibit==='joint_annotations');
 assert.equal(s.choices.B_EXHIBIT,exhibit??undefined);assert.equal(presentation(s).companion,false);assert.equal(presentation(s).caretaker,'봉만실');
 for(const id of ['ch4-personal1','ch4-personal2','ch4-personal3'])assert.equal(s.investigation.completed.includes(id),!!exhibit);
 fixtures[exhibit??'skipped']=s;
});
test('CH04 all named errors and wrong role mappings charge once, preserve drafts and keep source dialogue distinct',()=>{
 const wrong={D16:[['scope','same'],['scope','forged'],['E31','storage']],D17:[['comparison','handwriting'],['scope','murder']],Q04:[['scope','no_loan']],D18:[['movement','contact'],['authority','pledge'],['origins','duplicate']],D19:[['pressure','rude'],['meeting','plan']],D20:[['P02','clear'],['act','push'],['P06','diversion']]};
 for(const [id,cases] of Object.entries(wrong)){
  const c=challenges[id];for(const key of c.required)assert.equal(judge(id,answers[id],c.required.filter(k=>k!==key)).kind,'incomplete');
  assert.equal(judge(id,{...answers[id],evidence:[...answers[id].evidence,'E01']},c.required).kind,'success');
  for(const [key,value] of cases){let s=fixtures[`task-${id}`];const d={...answers[id],fields:{...answers[id].fields,[key]:value}};s=r(s,{type:'draft',id,draft:d});const action={type:'submit',id,attempt:`wrong-${id}-${key}-${value}`};s=r(s,action);assert.equal(s.investigation.task.result.kind,'error');assert.equal(s.points,4);assert.equal(r(s,action),s);s=finishTask(s);s=r(s,{type:'view',tool:'history'});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.investigation.drafts[id],d);}
 }
});
test('Four purpose assignments cannot substitute for each other',()=>{
 const perms=a=>a.length?a.flatMap((x,n)=>perms(a.filter((_,i)=>i!==n)).map(p=>[x,...p])):[[]];let accepted=0;
 for(const values of perms(['loan','pledge','waiver','storage'])){
  const fields={scope:'distinct',...Object.fromEntries(['E31','E32','E33','E34'].map((id,n)=>[id,values[n]]))};
  if(judge('D16',{...answers.D16,fields},challenges.D16.required).kind==='success')accepted++;
 }
 assert.equal(accepted,1);
});
test('CH04 missing and interrupted hint priorities match accepted selectors',()=>{
 for(const id of ['D16','D17','Q04','D18','D19','D20']){
  const c=challenges[id];for(let level=0;level<5;level++)assert.ok(script.utterances[hintLine(id,level,c.required,answers[id])]);
 }
});
test('CH04 deterministic hints keep complete H4 and canonical error binding',()=>{
 for(const id of ['D16','D17','Q04','D18','D19','D20']){
  const c=challenges[id],done=id.startsWith('Q')?`K${id}`:id.replace('D','K');
  assert.equal(hintLine(id,4,c.required,answers[id],Object.keys(c.errorHints)[0],true),`S_H_${id}_0041`);
  assert.equal(hintLine(id,3,c.required,answers[id],'',true),`S_H_${id}_0042`);
  assert.equal(hintLine(id,0,[...c.required,done],answers[id]),`S_H_${id}_0091`);
  for(const [error,suffix] of Object.entries(c.errorHints))assert.equal(hintLine(id,3,c.required,answers[id],error),`S_H_${id}_${suffix}`);
  for(const [missing,suffix] of c.missing)assert.equal(hintLine(id,4,c.required.filter(k=>k!==missing),answers[id],'',true),`S_H_${id}_${suffix}`);
 }
 assert.equal(judge('D17',answers.D17,['K16','E33','E34','E26']).kind,'incomplete');
 const sources=['E31','E32','E33','E34'];for(let level=0;level<5;level++){
  assert.equal(chapterFourVisitHint(level,[],false),'S_H_V04_0001');assert.equal(chapterFourVisitHint(level,[],true),'S_H_V04_0002');
  assert.equal(chapterFourVisitHint(level,[...sources,'KQ04'],true),'S_H_V04_0032');assert.equal(chapterFourVisitHint(level,[...sources,'E35','E37'],true),'S_H_V04_0091');
  assert.ok(script.utterances[chapterFourVisitHint(level,sources,true,true)]);
 }
});
test('Q04 correction acquisition is a persisted detail before knowledge award',()=>{
 let s=fixtures['acquire-E36'];assert.ok(!s.investigation.knowledge.includes('KQ04'));assert.equal(s.views.at(-1).detail,'E36');
 s=restored(s);s=finishTask(s);assert.ok(s.investigation.knowledge.includes('KQ04'));assert.equal(s.acknowledged.filter(id=>id==='E36').length,1);
 assert.ok(heldFacts(fixtures['task-D17']).includes('V04_EDGES'));assert.ok(!heldFacts(fixtures['task-D16']).includes('V04_EDGES'));
});
test('Optional exhibition choice uses only its selected source lines',()=>{
 for(const value of ['attributed_accounts','joint_annotations']){
  const nodes=stageNodes('ch4-personal2',[],{B_EXHIBIT:value});assert.equal(nodes[0].kind,'choice');assert.equal(nodes.filter(n=>n.kind==='speech').length,3);
  assert.equal(nodes.some(n=>n.id==='S_CH04_O2_0001'),value==='attributed_accounts');
 }
});
test.after(()=>{if(process.env.YEOWUL_WRITE_FIXTURES==='1')writeFileSync('../game-plan/validation/runtime-ch04-fixtures.json',JSON.stringify(fixtures,null,2));});
