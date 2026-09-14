import { build } from 'esbuild';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join,resolve,dirname,basename } from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import test from 'node:test';
const temp=mkdtempSync(join(tmpdir(),'yeowul-ch01-'));
const require=createRequire(import.meta.url);
for(const entry of ['state','chapter-one','presentation'])await build({entryPoints:[`lib/game/${entry}.ts`],bundle:true,platform:'node',format:'cjs',outfile:join(temp,`${entry}.cjs`),alias:{'@':resolve('.')},logLevel:'silent'});
const {initialState,gameReducer:r,currentNode,taskNode,isSave,investigationOptions,acquiredPending}=require(join(temp,'state.cjs'));
const {judge,hintLine}=require(join(temp,'chapter-one.cjs'));
const {presentation}=require(join(temp,'presentation.cjs'));
assert.equal(dirname(resolve(temp)),resolve(tmpdir()));assert.ok(basename(temp).startsWith('yeowul-ch01-'));rmSync(temp,{recursive:true,force:true});
const answers={
  D01:{evidence:['E03','E05'],fields:{x6:'east',x9:'west',fixed:'boundary'},note:'고정 좌표와 경계만 비교'},
  D02:{evidence:['E04','E05'],fields:{history:'work'},note:''},
  Q01:{evidence:['E06','E07'],fields:{statement:'S_Q01_v1',route:'sightline',scope:'limited'},note:''},
  D03:{evidence:['E08','E07'],fields:{route:'sightline',scope:'limited'},note:''},
  D04:{evidence:['E09'],fields:{first:'guest',second:'junction',third:'boundary',scope:'feasible'},note:'가능과 실제 사용은 다르다'},
  D05:{evidence:[],fields:{work:'preparation',witness:'overclaim',beneficiary:'weak',route:'open'},note:''}
};
function restored(s){assert.ok(isSave(s),`invalid save ${s.sceneId}/${s.cursor}/${s.investigation?.task?.id}`);return r(initialState,{type:'restore',state:JSON.parse(JSON.stringify(s))});}
function finishScene(s){for(let n=0;n<1000;n++){
  s=restored(s);const pending=acquiredPending(s);if(pending){assert.equal(r(s,{type:'advance'}),s);s=r(s,{type:'acknowledge',id:pending});if(s.views?.at(-1)?.detail===pending)s=r(s,{type:'viewBack'});continue;}
  const node=currentNode(s);assert.ok(node);
  if(s.investigation?.stage==='wall'&&['C_CH01_04:n0010','C_CH01_04:n0015','C_CH01_04:n0025'].includes(node.id))fixtures[`wall-${presentation(s).wall}-${node.id.split(':')[1]}`]=s;
  if(node.kind==='investigation')return s;
  if(node.kind==='speech'&&node.speaker==='P01')assert.equal(presentation(s).companion,true,`child absent at ${node.id}`);
  s=node.kind==='choice'?r(s,{type:'choose',choice:node.choice,value:node.options[0].value}):r(s,{type:'advance'});
}assert.fail('scene did not finish');}
function finishTaskLines(s){for(let n=0;n<100;n++){
  s=restored(s);const t=s.investigation.task;if(!t||t.phase==='answer')return s;
  const current=taskNode(s);if(current?.speaker==='P01')assert.equal(presentation(s).companion,true,`task child absent at ${current.id}`);
  const pending=acquiredPending(s);if(pending){if(pending==='E08')fixtures.correctionAcquisition=s;assert.equal(r(s,{type:'taskNext'}),s);s=r(s,{type:'acknowledge',id:pending});if(s.views?.at(-1)?.detail===pending)s=r(s,{type:'viewBack'});continue;}
  s=r(s,{type:'taskNext'});
}assert.fail('task lines did not finish');}
const fixtures={};
function atArrival(){return finishScene(r(initialState,{type:'start',name:'첫 기록자'}));}
let prologue=atArrival(); // finishScene intentionally crosses PR16 to the first CH01 hub.
assert.equal(prologue.investigation.stage,'morning');
const arrival=finishScene(r(prologue,{type:'visit',stage:'arrival'}));
test('No automatic conclusions; accepted opening save still enters CH01',()=>{assert.deepEqual(arrival.investigation.knowledge,[]);assert.ok(arrival.evidence.includes('E05'));assert.ok(!arrival.evidence.includes('E08'));assert.ok(!arrival.evidence.includes('E10'));assert.ok(!arrival.log.some(l=>l.nodeId==='S_Q01_v2'));});
for(const photo of [false,true])for(const optional of [false,true])test(`Complete CH01 through ${photo?'early photograph':'sightline'}; optional=${optional}`,()=>{
  let s=arrival, count=0;const taskOrder=[];
  while(count++<100){
    s=finishScene(s);
    if(s.investigation.stage==='departure')break;
    const options=investigationOptions(s);
    let option=photo&&!s.evidence.includes('E10')?options.find(o=>o.id==='photo'):undefined;
    if(!option&&optional)option=options.find(o=>o.id.startsWith('personal'));
    if(!option)option=options.find(o=>o.kind==='task'&&(o.id!=='Q01'||photo&&s.evidence.includes('E10')||s.investigation.completed.includes('wall')));
    if(!option)option=options.find(o=>o.kind==='visit'&&o.id!=='photo');
    assert.ok(option,`deadlock at ${s.investigation.stage} ${JSON.stringify(options)}`);
    if(option.kind==='visit'){s=r(s,{type:'visit',stage:option.id});continue;}
    taskOrder.push(option.id);s=finishTaskLines(r(s,{type:'task',id:option.id}));
    fixtures[`task-${option.id}`]=s;
    if(option.id==='D01')fixtures.deduction=s;
    const draft=photo&&option.id==='Q01'?{...answers.Q01,evidence:['E10','E18'],fields:{...answers.Q01.fields,route:'photo'}}:answers[option.id];
    s=r(s,{type:'draft',id:option.id,draft});
    const before=s.investigation.knowledge.length,attempt=`${photo}-${optional}-${count}`;
    s=r(s,{type:'submit',id:option.id,attempt});assert.equal(s.investigation.task.result.kind,'success');
    assert.equal(s.investigation.knowledge.length,before,'accepted response precedes knowledge award');
    assert.equal(r(s,{type:'submit',id:option.id,attempt}),s);
    s=finishTaskLines(s);assert.equal(s.points,6);
  }
  assert.ok(count<100);assert.deepEqual([...s.investigation.knowledge].sort(),['K01','K02','K03','K04','K05','KQ01']);
  assert.ok(s.log.some(l=>l.nodeId==='S_CH01_END_0001'));assert.equal(s.log.filter(l=>l.nodeId==='S_Q01_v2').length,1);
  assert.equal(s.log.some(l=>l.nodeId==='S_Q01_0021'),photo);assert.equal(s.log.some(l=>l.nodeId==='S_Q01_0031'),!photo);
  assert.equal(s.log.some(l=>l.nodeId==='S_CH01_04_0021'),photo,'later correction must not rewrite completed wall dialogue');
  assert.equal(s.log.some(l=>l.nodeId==='S_CH01_04_0019'),!photo,'wall reaction uses knowledge at entry');
  assert.ok(s.evidence.includes('E09'));assert.ok(!s.evidence.includes('E15'));
  assert.equal(presentation(s).companion,true);assert.equal(presentation(s).wall,9);
  if(photo)assert.equal(taskOrder[0],'Q01');else assert.equal(taskOrder[0],'D01');
  if(optional)for(const id of ['personal1','personal2','personal3'])assert.ok(s.investigation.completed.includes(id));
  fixtures[photo?'photoEnding':'sightlineEnding']=s;
});
test('Wrong costs once, incomplete is free, zero retains edits/tools, unlimited recovery',()=>{
  let s=finishTaskLines(r(arrival,{type:'task',id:'D01'}));
  s=r(s,{type:'submit',id:'D01',attempt:'incomplete'});assert.equal(s.points,6);assert.equal(s.investigation.task.result.kind,'incomplete');
  const wrong={...answers.D01,fields:{...answers.D01.fields,fixed:'moving'}};
  s=r(s,{type:'draft',id:'D01',draft:wrong});s=r(s,{type:'note',text:'현재 초안은 지우지 않는다'});
  for(let n=0;n<3;n++){
    const action={type:'submit',id:'D01',attempt:`wrong-${n}`};s=r(s,action);assert.equal(s.points,4-n*2);assert.equal(r(s,action),s);
    s=finishTaskLines(s);s=r(s,{type:'view',tool:'evidence'});s=r(s,{type:'viewState',patch:{search:'정지선',scroll:120,detail:'E05'}});s=restored(s);s=r(s,{type:'viewBack'});
    assert.deepEqual(s.investigation.drafts.D01,wrong);assert.equal(s.notes,'현재 초안은 지우지 않는다');
  }
  fixtures.zero=s;
  assert.equal(r(s,{type:'submit',id:'D01',attempt:'zero-blocked'}),s);
  s=r(s,{type:'draft',id:'D01',draft:answers.D01});s=r(s,{type:'hint',id:'D01',level:4});assert.equal(s.investigation.hintId,'S_H_D01_0042');s=restored(s);s=r(s,{type:'viewBack'});
  s=r(s,{type:'recover'});assert.equal(s.points,4);assert.deepEqual(s.investigation.drafts.D01,answers.D01);assert.equal(r(s,{type:'recover'}),s);
  for(let cycle=0;cycle<2;cycle++){
    s=r(s,{type:'draft',id:'D01',draft:wrong});
    for(let n=0;n<2;n++){s=r(s,{type:'submit',id:'D01',attempt:`repeat-${cycle}-${n}`});s=finishTaskLines(s);}
    assert.equal(s.points,0);s=r(s,{type:'recover'});assert.equal(s.points,4);assert.deepEqual(s.investigation.drafts.D01,wrong);
  }
  s=r(s,{type:'draft',id:'D01',draft:answers.D01});
  s=r(s,{type:'submit',id:'D01',attempt:'good'});s=finishTaskLines(s);assert.ok(s.investigation.knowledge.includes('K01'));assert.equal(s.points,4);
});
test('Suspending an unresolved Q permits actual missing evidence acquisition and restores draft',()=>{
  let s=finishTaskLines(r(arrival,{type:'task',id:'Q01'}));
  const d={evidence:['E18'],fields:{statement:'S_Q01_v1',route:'photo',scope:'limited'},note:'사진 원본을 보러 간다'};
  s=r(s,{type:'draft',id:'Q01',draft:d});s=r(s,{type:'submit',id:'Q01',attempt:'missing-photo'});assert.equal(s.points,6);
  s=r(s,{type:'viewClose'});assert.equal(s.investigation.task,null);s=restored(s);
  s=finishScene(r(s,{type:'visit',stage:'photo'}));s=r(s,{type:'visit',stage:'arrival'});s=r(s,{type:'task',id:'Q01'});
  assert.equal(s.investigation.task.phase,'answer');assert.deepEqual(s.investigation.drafts.Q01,d);assert.ok(s.evidence.includes('E10'));
});
test('Judging accepts relevant supersets and rejects insufficient source sets with a cost class',()=>{
  assert.equal(judge('D01',{...answers.D01,evidence:['E05','E01','E03']},['E01','E03','E05']).kind,'success');
  assert.deepEqual(judge('D01',{...answers.D01,evidence:['E03']},['E03','E05']),{kind:'error',key:'unsupported_evidence'});
  assert.equal(judge('D04',{...answers.D04,fields:{...answers.D04.fields,scope:'observed'}},['K01','K03','E09']).key,'feasible_route_proves_observed_use');
});
test('Hint precedence does not leak missing geometry or overwrite H4 with a recent error',()=>{
  assert.equal(hintLine('D01',4,['E03'],answers.D01),'S_H_D01_0001');
  assert.equal(hintLine('D01',3,['E03','E05'],answers.D01,'moving_window_or_door'),'S_H_D01_0033');
  assert.equal(hintLine('D01',4,['E03','E05'],answers.D01,'moving_window_or_door'),'S_H_D01_0042');
  assert.equal(hintLine('Q01',4,['E18'],answers.Q01),'S_H_Q01_0001');
});
test('Malformed task/view saves are rejected without throwing',()=>{
  for(const patch of [{task:{id:'D99',phase:'answer',cursor:0,result:null}},{task:null,suspended:{Q01:{id:'D01'}}},{drafts:{D01:{evidence:['E52'],fields:{},note:''}}},{knowledge:['K99']},{stage:'unknown'},{hints:{D01:5}}]){
    const bad={...arrival,investigation:{...arrival.investigation,...patch}};assert.equal(isSave(bad),false);assert.equal(r(arrival,{type:'restore',state:bad}),arrival);
  }
});
test.after(()=>{if(process.env.YEOWUL_WRITE_FIXTURES==='1')writeFileSync('../game-plan/validation/runtime-ch01-fixtures.json',JSON.stringify(fixtures,null,2));});
