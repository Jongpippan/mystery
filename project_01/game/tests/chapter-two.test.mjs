import assert from 'node:assert/strict';
import test from 'node:test';
import {writeFileSync} from 'node:fs';
import {r,investigationOptions,challenges,judge,hintLine,chapterTwoVisitHint,stageNodes,presentation,script,answers,fixtures,restored,finishScene,finishTask,solve,chapterOne} from './runtime-harness.mjs';
for(const photo of [false,true])for(const prior of ['environment_first','ask_voice_later']){
 const start=chapterOne(photo,prior);
 for(const apology of ['accept_apology','need_time'])for(const lastContactFirst of [true,false])test(`CH02 photo=${photo} prior=${prior} apology=${apology} contactFirst=${lastContactFirst}`,()=>{
  let s=r(start,{type:'visit',stage:'ch2-booth'}),order=[];
  for(let n=0;n<100;n++){
   s=finishScene(s,{B_PLAYBACK_RESPONSE:apology});
   assert.equal(s.points,6);assert.ok(!s.evidence.includes('E20'),'cargo evidence requires CH03');
   if(!s.investigation.knowledge.includes('KQ02'))assert.ok(!s.evidence.includes('E15'),'correction requires Q02');
   const opts=investigationOptions(s);
   let o=opts.find(o=>o.id.startsWith('ch2-personal'));
   if(!o&&s.investigation.stage==='ch2-departure')break;
   if(!o&&!lastContactFirst)o=opts.find(o=>o.id==='ch2-public')??opts.find(o=>o.id==='D09');
   o??=opts.find(o=>o.kind==='task')??opts.find(o=>o.kind==='visit');assert.ok(o,`CH02 deadlock ${s.investigation.stage}`);
   if(o.kind==='visit')s=r(s,{type:'visit',stage:o.id});else{order.push(o.id);s=solve(s,o.id);}
  }
  assert.equal(s.investigation.stage,'ch2-departure');assert.equal(s.investigation.knowledge.length,12);assert.equal(s.choices.B_PLAYBACK_RESPONSE,apology);
  for(const id of ['ch2-personal1','ch2-personal2','ch2-personal3'])assert.ok(s.investigation.completed.includes(id));
  const ids=s.log.map(l=>l.nodeId),accepted=apology==='accept_apology';
  assert.equal(ids.includes('S_CH02_04_0011'),accepted);assert.equal(ids.includes('S_CH02_04_0021'),!accepted);
  assert.equal(ids.includes('S_CH02_07_0011'),accepted);assert.equal(ids.includes('S_CH02_07_0021'),!accepted);
  assert.equal(ids.includes('S_CH02_04_0007'),prior==='environment_first');assert.equal(ids.includes('S_CH02_04_0009'),prior==='ask_voice_later');
  for(const id of ['S_CH02_06_0001','S_CH02_06_0004','S_CH02_07_0031','S_CH02_08_0016'])assert.ok(ids.includes(id),`common line missing ${id}`);
  assert.equal(ids.includes('S_CH02_06_0010'),lastContactFirst);assert.equal(ids.includes('S_CH02_06_0011'),!lastContactFirst);
  assert.equal(order.indexOf('D08')<order.indexOf('D09'),lastContactFirst);
  assert.deepEqual(s.evidence.filter(id=>['E16','E13','E17'].includes(id)),['E16','E13','E17']);
  assert.equal(ids.filter(id=>id==='S_Q02_v2').length,1);assert.equal(presentation(s).companion,true);
  fixtures[apology+'Ending']=s;
 });
}
test('Every CH02 task has free incomplete, sourced H0–H4, incomplete-prerequisite precedence and completed hint',()=>{
 for(const id of ['D06','Q02','D07','D08','D09','D10']){
  const c=challenges[id],draft=answers[id];
  assert.equal(judge(id,{...draft,fields:{}},c.required).kind,'incomplete');
  for(const [missing] of c.missing){const held=c.required.filter(k=>k!==missing);assert.equal(judge(id,draft,held).kind,'incomplete');assert.ok(script.utterances[hintLine(id,4,held,draft)]);}
  for(let level=0;level<5;level++)assert.ok(script.utterances[hintLine(id,level,c.required,draft)]);
  const key=id.startsWith('Q')?`K${id}`:id.replace('D','K');assert.equal(hintLine(id,0,[...c.required,key],draft),`S_H_${id}_0042`);
  assert.equal(hintLine(id,4,c.required,draft,Object.keys(c.errorHints)[0]),`S_H_${id}_0041`);
  assert.equal(judge(id,{...draft,evidence:[...draft.evidence,'E01']},[...c.required,'E01']).kind,'success');
 }
 assert.equal(judge('D09',answers.D09,['E12','E17','E18']).kind,'incomplete');
 assert.equal(hintLine('D09',4,['E12','E17','E18'],answers.D09),'S_H_D09_0013');
 for(const id of ['D08','D09','D10'])assert.equal(hintLine(id,3,challenges[id].required,answers[id],'',true),`S_H_${id}_0033`);
 const sets=[[],['E12'],['E12','E11'],['E12','E11','E14'],['K06'],['KQ02']];
 for(const held of sets)for(let level=0;level<5;level++)assert.ok(script.utterances[chapterTwoVisitHint(level,held,true)]);
 assert.equal(chapterTwoVisitHint(4,['E12','E11','E14'],false),'S_H_V02_0031');
});
test('All named wrong premises charge once and preserve drafts through response and tools',()=>{
 const wrong={D06:[['feature','voice'],['feature','schedule'],['origin','two']],Q02:[['reason','murder'],['reason','mimic']],D07:[['presence','death'],['created','output']],D08:[['scope','stay'],['scope','death'],['contact','audio']],D09:[['support','scheduled'],['precision','second'],['first','playback']],D10:[['gap','death'],['scope','culprit']]};
 for(const [id,cases] of Object.entries(wrong))for(const [key,value] of cases){
  let s=fixtures[`task-${id}`];assert.ok(s);const d={...answers[id],fields:{...answers[id].fields,[key]:value}};
  s=r(s,{type:'draft',id,draft:d});const action={type:'submit',id,attempt:`wrong-${id}-${key}-${value}`};s=r(s,action);
  assert.equal(s.investigation.task.result.kind,'error');assert.equal(s.points,4);assert.equal(r(s,action),s);s=finishTask(s);
  s=r(s,{type:'view',tool:'history'});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.investigation.drafts[id],d);assert.equal(s.investigation.task.phase,'answer');
 }
});
test('Unchosen apology never reappears in optional callback and optional prose keeps physical action',()=>{
 for(const value of ['accept_apology','need_time']){
  const nodes=stageNodes('ch2-personal1',[],{B_PLAYBACK_RESPONSE:value});
  assert.equal(nodes.some(n=>n.id==='S_CH02_O1_0011'),value==='accept_apology');assert.equal(nodes.some(n=>n.id==='S_CH02_O1_0021'),value==='need_time');
 }
 assert.ok(stageNodes('ch2-personal2',[],{}).some(n=>n.text.includes('브레이크를 직접 확인')));
});
test('CH02 can finish with no optional scenes; interrupted D10 keeps adult interview location',()=>{
 let s=fixtures['task-D06'];s=r(s,{type:'draft',id:'D06',draft:answers.D06});s=r(s,{type:'submit',id:'D06',attempt:'no-optional'});s=finishTask(s);
 for(let n=0;n<40;n++){
  s=finishScene(s,{B_PLAYBACK_RESPONSE:'need_time'});if(s.investigation.stage==='ch2-departure')break;
  const o=investigationOptions(s).find(o=>!o.id.startsWith('ch2-personal'));assert.ok(o);
  if(o.kind==='visit')s=r(s,{type:'visit',stage:o.id});else {
   if(o.id==='D10'){
    s=finishTask(r(s,{type:'task',id:'D10'}));s=r(s,{type:'viewClose'});s=restored(s);
    assert.equal(presentation(s).companion,false);assert.equal(presentation(s).place,'현관 · 조사 탁자');assert.ok(!investigationOptions(s).some(o=>o.id.startsWith('ch2-personal')));
   }
   s=solve(s,o.id);
  }
 }
 assert.equal(s.investigation.stage,'ch2-departure');assert.ok(!s.investigation.completed.some(id=>id.startsWith('ch2-personal')));assert.equal(s.investigation.knowledge.length,12);
});
test('Suspended D08 does not move the public-event revisit back to the entrance',()=>{
 let s=finishTask(r(fixtures.sourcesHub,{type:'task',id:'D08'}));assert.equal(s.investigation.task.id,'D08');s=r(s,{type:'viewClose'});assert.equal(presentation(s).place,'현관 · 조사 탁자');
 s=finishScene(r(s,{type:'visit',stage:'ch2-public'}));assert.equal(presentation(s).place,'연회장 · 공개 탁자');assert.equal(presentation(s).companion,false);
 s=r(s,{type:'task',id:'D08'});assert.equal(presentation(s).place,'현관 · 조사 탁자');assert.equal(s.investigation.task.phase,'answer');
});
test.after(()=>{if(process.env.YEOWUL_WRITE_FIXTURES==='1')writeFileSync('../game-plan/validation/runtime-ch02-fixtures.json',JSON.stringify(fixtures,null,2));});
