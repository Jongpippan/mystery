import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createState,transition,availableTasks,discoverable,serialize,restore,hintText,shortestRoute} from '../src/engine.mjs';
const data=JSON.parse(await readFile(new URL('../src/content.json',import.meta.url),'utf8'));
const answers={D01:0,Q01:0,D02:1,Q02:2,D03:1,D04:0,Q03:1,D05:1,D06:1,Q04:1,D07:2,D08:2,F01:0,F02:1,F03:2,F04:0,F05:2};
const proofs={D01:['E04','E08'],Q01:['E06','E08'],D02:['E02','E05','E09'],Q02:['E06','E10'],D03:['E02','E14'],D04:['E02','E11'],Q03:['E08','E13'],D05:['E02','E18','E19','E13'],D06:['E15','E16','E17','E20'],Q04:['E18','E21'],D07:['E20','E21','E23'],D08:['E22','E24','E13'],F01:['E13','E19','E24'],F02:['E02','E05','E14','E08'],F03:['E13','E18','E23'],F04:['E22','E24','E19'],F05:['E14','E11','E15','E16','E17','E20']};
const act=(s,type,more={})=>transition(s,{type,...more},data);
const skip=s=>s.active?act(s,'skip'):s;
function investigate(s,order,strategy='private'){
 s=skip(s);
 for(const id of order){
  s=skip(act(s,'move',{id}));
  let pending=s.pendingEvents.find(v=>data.events.find(e=>e.id===v).place===id);
  while(pending){s=skip(act(s,'event',{id:pending}));pending=s.pendingEvents.find(v=>data.events.find(e=>e.id===v).place===id);}
  for(const e of discoverable(s,data))s=act(s,'inspect',{id:e.id});
  for(const st of data.statements.filter(st=>st.place===id&&st.chapter<=s.chapter))s=act(s,'talk',{id:st.id});
  if(id==='L03'&&s.chapter>=2)s=act(s,'chooseBranch',{id:'B01',value:strategy});
 }
 return s;
}
function solve(s,id,{answer=answers[id],evidence=proofs[id],token='solve-'+id,statement}={}){
 if(s.awaitingReview)s=act(s,'ack');
 s=act(s,'task',{id});s=act(s,'draft',{id,patch:{answer:String(answer),evidence,statement:statement||data.tasks.find(t=>t.id===id).statement||''}});
 if(['D02','F02'].includes(id))s=act(s,'draft',{id,patch:{order:['last','photo','seal','discovery']}});
 return act(s,'submit',{id,token});
}
function complete(order,stop,branches={B01:'private',B02:'read'}){
 let s=createState(data);
 for(let step=0;step<100&&!s.ended;step++){
  s=investigate(s,order,branches.B01);
  if(stop?.(s))return s;
  const t=availableTasks(s,data).find(t=>proofs[t.id].every(e=>s.acquired[e]));
  if(t){
   for(let i=0;i<5;i++)s=act(s,'hint',{id:t.id});
   const hint=hintText(s,t,data);for(const id of t.sets[0])assert.ok(hint.includes(id)||hint.includes(data.evidence.find(e=>e.id===id).name),t.id+' H4 must identify '+id);
   s=solve(s,t.id);assert.ok(s.solved.includes(t.id),`${t.id}: ${s.message}`);
  }
  if(s.completedEvents.includes('V10')){s=act(s,'chooseBranch',{id:'B02',value:branches.B02});s=skip(s);}
 }
 assert.equal(s.ended,true,'full game reaches ending');return s;
}
test('three legal investigation orders reach the same proved responsibility',()=>{
 const orders=[['L01','L02','L03','L04','L05','L06','L07'],['L07','L06','L05','L04','L03','L02','L01'],['L04','L06','L02','L07','L01','L05','L03']];
 for(const order of orders){const s=complete(order);assert.equal(s.solved.length,17);assert.equal(Object.keys(s.acquired).length,24);assert.equal(s.knowledge.K12.task,'D08');assert.equal(s.branches.B01,'private');assert.equal(s.branches.B02,'read');assert.equal(s.completedEvents.length,11);}
});
test('initial exploration cannot leak interrogation rewards or future revisits',()=>{
 const s=investigate(createState(data),data.places.map(p=>p.id));
 assert.deepEqual(Object.keys(s.acquired).sort(),['E01','E02','E03','E04','E05','E06','E07','E08']);
 for(const id of ['E09','E11','E19','E23'])assert.equal(s.acquired[id],undefined);
});
test('wrong submission charges once; blank, reading and duplicate token are free',()=>{
 let s=investigate(createState(data),data.places.map(p=>p.id));
 s=act(s,'submit',{id:'D01',token:'blank'});assert.equal(s.trust,100);
 s=solve(s,'D01',{answer:1,token:'wrong'});assert.equal(s.trust,90);
 const after=act(s,'submit',{id:'D01',token:'wrong'});assert.equal(after.trust,90);assert.equal(after.failures.D01,1);
 s=act(after,'ui',{patch:{tab:'資料',query:'시계'}});assert.equal(s.trust,90);
 s=solve(s,'D01',{answer:1,token:'wrong-again'});assert.equal(s.trust,80);
});
test('zero trust, mid-recovery save, notes and evidence survive unlimited retry',()=>{
 let s=investigate(createState(data),data.places.map(p=>p.id));s=act(s,'notes',{text:'시계의 기준은 접수실. 사진 속 시계 두 개.'});
 for(let i=0;i<10;i++)s=solve(s,'D01',{answer:2,token:'fail'+i});
 assert.equal(s.trust,0);assert.equal(s.recovery,true);const owned=structuredClone(s.acquired);
 s=restore(serialize(s),data);s=act(s,'recover');assert.equal(s.trust,60);assert.deepEqual(s.acquired,owned);assert.match(s.notes,/접수실/);assert.equal(s.drafts.D01,undefined);
 s=act(s,'hint',{id:'D01'});assert.equal(s.hints.D01,0);s=solve(s,'D01');assert.equal(s.trust,70);assert.equal(s.knowledge.K01.task,'D01');
 const replay=act(s,'submit',{id:'D01',token:'again-success'});assert.equal(replay.trust,70);
});
test('interrogation succeeds only with heard statement and awards exclusive corrected record',()=>{
 let s=investigate(createState(data),data.places.map(p=>p.id));s=solve(s,'Q01');
 assert.ok(s.acquired.E09);assert.ok(s.logs.find(l=>l.id==='S01.v1'));assert.ok(s.logs.find(l=>l.id==='Q01').lines.some(l=>l.text.includes('反')||l.text.includes('반사')));
 const missing=structuredClone(s);missing.solved=[];missing.heard=[];delete missing.acquired.E09;const attempted=solve(missing,'Q01');assert.equal(attempted.acquired.E09,undefined);assert.equal(attempted.trust,100);
});
test('simultaneous revisit events persist and apply once across mid-scene restore',()=>{
 let s=investigate(createState(data),data.places.map(p=>p.id));
 s=solve(s,'D01');s=solve(s,'Q01');s=solve(s,'D02');
 s=skip(act(s,'move',{id:'L05'}));
 assert.ok(s.pendingEvents.includes('V03'));assert.ok(s.pendingEvents.includes('V04'));
 s=act(s,'move',{id:'L01'});assert.equal(s.active.event,'V03');s=act(s,'next');const step=s.active.step;
 s=restore(serialize(s),data);assert.equal(s.active.step,step);s=skip(s);assert.ok(s.acquired.E12);assert.equal(s.completedEvents.filter(id=>id==='V03').length,1);
 s=act(s,'event',{id:'V03'});assert.equal(s.active,null);assert.ok(s.pendingEvents.includes('V04'));
});
test('all evidence in a pile and insufficient inference are not a shortcut',()=>{
 let s=investigate(createState(data),data.places.map(p=>p.id));
 s=solve(s,'D01',{evidence:Object.keys(s.acquired)});assert.equal(s.trust,90);assert.equal(s.solved.includes('D01'),false);
 s=solve(s,'D01',{evidence:['E01','E05'],token:'unrelated'});assert.equal(s.trust,80);assert.equal(s.solved.includes('D01'),false);
});
test('valid alternate independent proof succeeds regardless of evidence order',()=>{
 let s=complete(data.places.map(p=>p.id),s=>s.chapter===4&&!!s.acquired.E24);
 s=solve(s,'D08',{evidence:['E19','E24','E22']});assert.ok(s.solved.includes('D08'));
 const t=data.tasks.find(t=>t.id==='D08');assert.equal(t.sets.length,2);
});
test('final error costs 15 and editable draft persists through tabs and save',()=>{
 let s=complete(data.places.map(p=>p.id),s=>s.solved.includes('D08'));
 s=solve(s,'F01',{answer:1,token:'final-wrong'});assert.equal(s.trust,85);
 const draft=structuredClone(s.drafts.F01),location=s.location,turn=s.turn;
 for(const tab of ['자료','인물','지도','대화','메모'])s=act(s,'ui',{patch:{tab}});
 s=restore(serialize(s),data);assert.deepEqual(s.drafts.F01,draft);assert.equal(s.trust,85);assert.equal(s.location,location);assert.equal(s.turn,turn);
});
test('hints adapt to current acquisitions and never expose a future reward as already owned',()=>{
 let s=skip(createState(data));const t=data.tasks.find(t=>t.id==='D01');
 for(let i=0;i<5;i++)s=act(s,'hint',{id:'D01'});
 assert.match(hintText(s,t,data),/접수실/);assert.doesNotMatch(hintText(s,t,data),/나경|받침대/);
 s=investigate(s,data.places.map(p=>p.id));assert.match(hintText(s,t,data),/19:11/);
});
test('map route uses real corridor links, not picture distance',()=>{
 assert.deepEqual(shortestRoute('L05','L07',data),{minutes:2,routes:['R01','R07']});
 assert.equal(shortestRoute('L04','L06',data).minutes,3);
 assert.equal(data.routes.some(r=>(r[1]==='L04'&&r[2]==='L02')||(r[1]==='L02'&&r[2]==='L04')),false);
});
test('save import rejects invalid ids and event position without changing input',()=>{
 const s=createState(data);assert.throws(()=>restore('{bad',data));
 const bad=structuredClone(s);bad.active.step=999;assert.throws(()=>restore(JSON.stringify(bad),data));assert.equal(s.active.step,0);
 const wrong=structuredClone(s);wrong.acquired.E99={};assert.throws(()=>restore(JSON.stringify(wrong),data));
});
test('both strategy and ending choices preserve common truth and only log chosen responses',()=>{
 for(const B01 of ['public','private'])for(const B02 of ['read','preserve']){
  const s=complete(data.places.map(p=>p.id),null,{B01,B02});assert.deepEqual(s.branches,{B01,B02});
  const scene=s.logs.find(l=>l.id==='C34').lines[0].text;assert.match(scene,B01==='public'?/모두 앞/:/따로/);
  const ending=s.logs.find(l=>l.id==='B02').lines.map(l=>l.text).join(' ');assert.match(ending,B02==='read'?/낭독/:/보존/);
  assert.equal(s.solved.length,17);assert.equal(s.trust,100);
 }
});
test('related supporting evidence is accepted without accepting a whole unrelated notebook',()=>{
 let s=investigate(createState(data),data.places.map(p=>p.id));s=solve(s,'D01');s=solve(s,'Q01');
 s=solve(s,'D02',{evidence:['E01','E02','E05','E09','E08']});assert.ok(s.solved.includes('D02'));
});
test('time card error costs once and requires explicit feedback acknowledgement',()=>{
 let s=investigate(createState(data),data.places.map(p=>p.id));s=solve(s,'D01');s=solve(s,'Q01');
 s=act(s,'task',{id:'D02'});s=act(s,'draft',{id:'D02',patch:{answer:'1',evidence:proofs.D02,order:['last','seal','photo','discovery']}});
 s=act(s,'submit',{id:'D02',token:'time-wrong'});assert.equal(s.trust,90);assert.match(s.message,/시간 카드/);
 s=act(s,'submit',{id:'D02',token:'rapid-second-click'});assert.equal(s.trust,90);assert.equal(s.failures.D02,1);
 s=restore(serialize(s),data);assert.ok(s.awaitingReview);s=act(s,'ack');s=act(s,'draft',{id:'D02',patch:{order:['last','photo','seal','discovery']}});s=act(s,'submit',{id:'D02',token:'time-correct'});assert.ok(s.solved.includes('D02'));
});
test('unready revisit hint directs to its prerequisite rather than an unavailable scene',()=>{
 let s=investigate(createState(data),data.places.map(p=>p.id));s=solve(s,'D01');s=solve(s,'Q01');s=solve(s,'D02');s=skip(act(s,'move',{id:'L05'}));
 s=act(s,'hint',{id:'D03'});assert.match(hintText(s,data.tasks.find(t=>t.id==='D03'),data),/종이의 행방/);
});
