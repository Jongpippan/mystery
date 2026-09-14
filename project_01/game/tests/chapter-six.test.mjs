import assert from 'node:assert/strict';
import test from 'node:test';
import {writeFileSync} from 'node:fs';
import {r,isSave,investigationOptions,challenges,judge,hintLine,chapterSixVisitHint,finalProofGroups,stageNodes,presentation,script,answers,fixtures,restored,finishScene,finishTask,solve,throughChapterFive} from './runtime-harness.mjs';
const start=throughChapterFive(false),baseFinal=structuredClone(answers.D30),baseOriginal=structuredClone(answers.D26);
for(const order of ['chronology_first','concealment_first'])for(const early of [false,true])for(const optional of [false,true])for(const alias of [false,true])test(`CH06 ${order}; early machine=${early}; optional=${optional}; E30 alias=${alias}`,()=>{
 let s=r(start,{type:'visit',stage:'ch6-contact'});
 answers.D30={...baseFinal,fields:{...baseFinal.fields,order}};
 answers.D26={...baseOriginal,evidence:baseOriginal.evidence.map(id=>alias&&id==='E49'?'E30':id)};
 for(let n=0;n<100;n++){
  s=finishScene(s);const i=s.investigation;fixtures[`hub-${i.stage}`]??=s;
  if(i.stage==='ch6-contact'){assert.equal(s.evidence.includes('E49'),false);assert.equal(presentation(s).companion,false);}
  if(i.stage==='ch6-early-machine'){assert.equal(s.evidence.includes('E48'),true);assert.equal(s.evidence.includes('E51'),false);assert.equal(s.log.some(l=>l.nodeId==='S_Q06_v1'),false);}
  if(!i.knowledge.includes('KQ06'))assert.equal(s.evidence.includes('E52'),false);
  if(i.stage==='ch6-aftermath'&&!optional)break;
  const opts=investigationOptions(s).filter(o=>!o.id.startsWith('ep-'));
  let o=early?opts.find(o=>o.id==='ch6-early-machine'):null;
  o??=optional?opts.find(o=>o.id.includes('personal')):null;
  o??=opts.find(o=>!o.id.includes('personal'));
  if(!o)break;
  s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);
 }
 assert.equal(s.investigation.stage,'ch6-aftermath');assert.equal(s.investigation.knowledge.length,36);assert.equal(s.points,6);
 assert.equal(presentation(s).companion,true);assert.equal(presentation(s).place,'휴게실');
 for(const id of ['ch6-personal1','ch6-personal2','ch6-personal3'])assert.equal(s.investigation.completed.includes(id),optional);
 assert.equal(s.investigation.completed.includes('ch6-early-machine'),early);
 assert.deepEqual(s.evidence.filter(id=>['E49','E50','E48','E51','E52'].includes(id)),['E49','E50','E48','E51','E52']);
 assert.equal(s.evidence.length,52);
 const spoken=s.log.filter(l=>l.sceneId==='C_D30').map(l=>l.nodeId).filter(id=>/^S_D30_/.test(id));
 const chronological=['S_D30_0090','S_D30_0101','S_D30_0102','S_D30_0103','S_D30_0111','S_D30_0112','S_D30_0113','S_D30_0121','S_D30_0122','S_D30_0131','S_D30_0132','S_D30_0133','S_D30_0141'];
 const concealment=['S_D30_0145','S_D30_0146','S_D30_0161','S_D30_0162','S_D30_0163','S_D30_0164','S_D30_0165'];
 assert.deepEqual(spoken,[...(order==='chronology_first'?chronological:concealment),'S_D30_0151','S_D30_0152','S_D30_0153','S_D30_0154']);
 assert.equal(s.log.filter(l=>l.nodeId==='S_Q06_v2').length,1);
 assert.equal(s.log.filter(l=>l.nodeId==='C_CH06_03:n0005').length,1);
 fixtures[`ending-${order}-${early}-${optional}-${alias}`]=s;
});

test('CH06 prerequisite gates, source supersets, E30 current-state alias and free blanks',()=>{
 answers.D26=baseOriginal;answers.D30=baseFinal;
 for(const id of ['D26','D27','Q06','D28','D29','D30']){
  const held=[...fixtures[`task-${id}`].evidence,...fixtures[`task-${id}`].investigation.knowledge];
  for(const key of challenges[id].required)assert.equal(judge(id,answers[id],held.filter(k=>k!==key)).kind,'incomplete',`${id}/${key}`);
  assert.equal(judge(id,{...answers[id],evidence:[...answers[id].evidence,'E01']},held).kind,'success');
  assert.equal(judge(id,{...answers[id],fields:{}},held).kind,'incomplete');
 }
 const held=[...fixtures['task-D26'].evidence,...fixtures['task-D26'].investigation.knowledge];
 assert.equal(judge('D26',{...baseOriginal,evidence:['E30','E50','E29','E28']},held).kind,'success');
 assert.equal(judge('D26',{...baseOriginal,evidence:['E30','E50','E29','E28']},held.filter(k=>k!=='E49')).kind,'incomplete');
});

test('CH06 all named false premises cost once, preserve drafts and recover repeatedly',()=>{
 const wrong={D26:[['basis','authority'],['scope','everything']],D27:[['change','printer'],['change','forgery'],['author','identified']],Q06:[['question','murder'],['question','clock']],D28:[['basis','speed'],['basis','copies'],['coverage','17-17'],['scope','loan']],D29:[['reason','name'],['reason','motive'],['reason','copy'],['reason','conspiracy'],['person','P04']],D30:[['meeting','act'],['act','omit'],['interval','19'],['coat','holder'],['copy','murder_seen'],['origins','many'],['responsibility','complicity'],['responsibility','erased']]};
 for(const [id,cases] of Object.entries(wrong)){
  let s=fixtures[`task-${id}`];
  for(const [key,value] of cases){
   if(s.points===0){s=r(s,{type:'recover'});assert.equal(s.points,4);}
   const d={...answers[id],fields:{...answers[id].fields,[key]:value}},points=s.points;
   s=r(s,{type:'draft',id,draft:d});s=restored(s);
   const action={type:'submit',id,attempt:`wrong-${key}-${value}`};s=r(s,action);assert.equal(s.investigation.task.result.kind,'error',`${id}/${key}`);assert.equal(s.points,points-2);assert.equal(r(s,action),s);
   s=finishTask(s);s=r(s,{type:'view',tool:'history'});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.investigation.drafts[id],d);
  }
 }
});

test('D30 role originals or conclusions; wrong role preserves all five notes, source selection and order',()=>{
 const start=fixtures['task-D30'],held=[...start.evidence,...start.investigation.knowledge];
 for(const g of finalProofGroups)for(const set of g.sourceSets){const d={...baseFinal,roleEvidence:{...baseFinal.roleEvidence,[g.id]:[...set,'E01']}};assert.equal(judge('D30',d,held).kind,'success');}
 for(const g of finalProofGroups){
  const d={...baseFinal,fields:{...baseFinal.fields,order:'concealment_first'},roleEvidence:{...baseFinal.roleEvidence,[g.id]:['E01']},sourceRole:g.id,sourceScroll:280};
  let s=r(start,{type:'draft',id:'D30',draft:d});fixtures[`role-error-${g.id}`]=s;
  s=r(s,{type:'submit',id:'D30',attempt:g.id});assert.deepEqual(s.investigation.task.result,{kind:'error',key:`${g.id}_sources`});assert.equal(s.points,4);s=finishTask(s);
  for(const tool of ['evidence','people','history','map','notes','settings','deduction']){s=r(s,{type:'view',tool});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.investigation.drafts.D30,d);}
  const blank={...d,roleEvidence:{...d.roleEvidence,[g.id]:[]}};s=r(s,{type:'draft',id:'D30',draft:blank});s=r(s,{type:'submit',id:'D30',attempt:`blank-${g.id}`});assert.equal(s.investigation.task.result.kind,'incomplete');assert.equal(s.points,4);
 }
 for(const patch of [{roleEvidence:{unknown:['E01']}},{roleEvidence:{act:['K30']}},{roleEvidence:{act:['E01','E01']}},{roleNotes:{act:42}},{sourceRole:'bad'},{sourceScroll:-1}]){
  const bad=structuredClone(start);bad.investigation.drafts.D30={...baseFinal,...patch};assert.equal(isSave(bad),false);assert.equal(r(start,{type:'draft',id:'D30',draft:bad.investigation.drafts.D30}),start);
 }
});

test('CH06 original custody, remote call, supervision transitions and delayed interrogation fact',()=>{
 const at=id=>fixtures[`event-${id}`];
 for(const id of ['S_CH06_01_0001','S_CH06_01_0004','S_CH06_01_0008']){assert.equal(at(id).evidence.includes('E49'),false);assert.equal(presentation(at(id)).place,'읍내 게스트하우스');assert.equal(presentation(at(id)).companion,true);}
 assert.equal(presentation(at('S_CH06_01_0011')).companion,true);
 assert.equal(presentation(at('C_CH06_01:n0018')).companion,false);
 assert.equal(presentation(fixtures['hub-ch6-unfold']).place,'호숫가 보관 창고');
 assert.equal(presentation(fixtures['hub-ch6-overlay']).place,'적재·기록 데스크');
 for(const id of ['ch6-unfold','ch6-overlay','ch6-copier','ch6-bands','ch6-alternative','ch6-briefing'])assert.equal(presentation(fixtures[`hub-${id}`]).companion,false,id);
 let s=fixtures['acquire-E52'];assert.equal(s.investigation.knowledge.includes('KQ06'),false);s=finishTask(restored(s));assert.equal(s.investigation.knowledge.includes('KQ06'),true);
 assert.equal(presentation(at('C_CH06_O2:n0006')).companion,true);
 const early=stageNodes('ch6-early-machine',[],{}),later=stageNodes('ch6-overlay',['E48'],{});assert.equal(early.at(-1).evidenceId,'E48');assert.equal(later[0].id,'S_CH06_03_0011');assert.equal(later.some(n=>n.evidenceId==='E48'),false);
 s=r(fixtures['hub-ch6-early-machine'],{type:'task',id:'D26'});s=r(s,{type:'viewBack'});s=restored(s);assert.equal(presentation(s).place,'호숫가 보관 창고');
 s=finishTask(r(s,{type:'task',id:'D26'}));s=r(s,{type:'draft',id:'D26',draft:{...baseOriginal,fields:{basis:'authority',scope:'object'}}});
 for(let n=0;n<3;n++){s=r(s,{type:'submit',id:'D26',attempt:`location-${n}`});s=finishTask(s);}
 assert.equal(s.points,0);s=r(s,{type:'recover'});s=r(s,{type:'viewBack'});s=restored(s);assert.equal(presentation(s).place,'호숫가 보관 창고');
});

test('CH06 H0-H4 preserve missing-step and error priorities; both final H4 orders survive interruption',()=>{
 for(const id of ['D26','D27','Q06','D28','D29','D30']){
  const c=challenges[id],done=id.startsWith('Q')?`K${id}`:id.replace('D','K');
  for(let level=0;level<5;level++){assert.ok(script.utterances[hintLine(id,level,c.required,answers[id])]);assert.equal(hintLine(id,level,[...c.required,done],answers[id]),`S_H_${id}_0091`);}
  for(const [missing,suffix] of c.missing)assert.equal(hintLine(id,4,c.required.filter(k=>k!==missing),answers[id],'',true),`S_H_${id}_${suffix}`);
  for(const [error,suffix] of Object.entries(c.errorHints))assert.equal(hintLine(id,3,c.required,answers[id],error),`S_H_${id}_${suffix}`);
  assert.equal(hintLine(id,4,c.required,answers[id],Object.keys(c.errorHints)[0],true),`S_H_${id}_0041`);
 }
 assert.equal(hintLine('D30',4,challenges.D30.required,{...baseFinal,fields:{...baseFinal.fields,order:'concealment_first'}},'wrong_interval',true),'S_H_D30_0042');
 for(const progress of ['uncalled','travel','interrupted-travel','handoff','waiting','unfolding'])for(let level=0;level<5;level++)for(const held of [[],['K25'],['K25','E49'],['K25','E49','E50'],['K26']])assert.ok(script.utterances[chapterSixVisitHint(level,held,progress)]);
});

test.after(()=>{if(process.env.YEOWUL_WRITE_FIXTURES==='1')writeFileSync('../game-plan/validation/runtime-ch06-fixtures.json',JSON.stringify(fixtures,null,2));});
