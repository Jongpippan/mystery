import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const server=spawn(process.execPath,['scripts/server.mjs'],{cwd:root,env:{...process.env,PORT:'4175'},windowsHide:true,stdio:['ignore','pipe','pipe']});
await new Promise((ok,bad)=>{server.stdout.once('data',ok);server.once('error',bad);server.once('exit',code=>bad(new Error('server stopped '+code)));});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const report={build:'0.1.0',date:new Date().toISOString(),environment:'Windows / installed Chrome / Playwright',checks:[],screenshots:[],errors};
const dir=resolve(root,'validation');await mkdir(dir,{recursive:true});
const data=JSON.parse(await readFile(resolve(root,'src/content.json'),'utf8'));
const answers={D01:0,Q01:0,D02:1,Q02:2,D03:1,D04:0,Q03:1,D05:1,D06:1,Q04:1,D07:2,D08:2,F01:0,F02:1,F03:2,F04:0,F05:2};
const proofs={D01:['E04','E08'],Q01:['E06','E08'],D02:['E02','E05','E09'],Q02:['E06','E10'],D03:['E02','E14'],D04:['E02','E11'],Q03:['E08','E13'],D05:['E02','E18','E19','E13'],D06:['E15','E16','E17','E20'],Q04:['E18','E21'],D07:['E20','E21','E23'],D08:['E22','E24','E13'],F01:['E13','E19','E24'],F02:['E02','E05','E14','E08'],F03:['E13','E18','E23'],F04:['E22','E24','E19'],F05:['E14','E11','E15','E16','E17','E20']};
const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('last-impression-v1')));
const click=async(selector)=>{await page.locator(selector).first().click();};
async function screenshot(name){await page.waitForFunction(()=>[...document.images].every(img=>img.complete&&img.naturalWidth>0));await page.screenshot({path:resolve(dir,name+'.png'),fullPage:true});report.screenshots.push(name+'.png');}
async function skip(){if(await page.locator('[data-action="skip"]').count())await click('[data-action="skip"]');}
async function tabsPreserve(id){
 const before=await state();
 await click('#tab-자료');
 if(await page.locator('#e-query').count())await page.locator('#e-query').fill('');
 if(await page.locator('[data-kind="evidence"]').count()){
  await click('#reader [data-kind="evidence"]');
  if(await page.locator('#reader [data-kind="person"]').count())await click('#reader [data-kind="person"]');
 }
 await click('#tab-인물');await click('#open-P03');await click('#tab-지도');await click('#tab-대화');
 const logs=page.locator('#reader [data-kind="log"]');if(await logs.count()){await logs.first().click();await page.keyboard.press('Escape');}
 await click('#tab-메모');await page.locator('#notes').fill('검수 메모: 답안과 무료 열람은 독립이다.');
 await click('#tab-현장');
 const after=await state();assert.deepEqual(after.drafts[id],before.drafts[id]);assert.equal(after.trust,before.trust);assert.equal(after.location,before.location);assert.equal(after.turn,before.turn);
 await page.reload();await page.locator('#task-select').waitFor();assert.deepEqual((await state()).drafts[id],before.drafts[id]);
 report.checks.push(id+' tabs, detail chain, memo and reload preserve draft, trust, place, turn');
}
try{
 await page.goto('http://127.0.0.1:4175');await page.locator('#next-line').waitFor();await screenshot('01-intro-desktop');
 await click('#next-line');const middle=await state();await page.reload();await page.locator('#next-line').waitFor();assert.equal((await state()).active.step,middle.active.step);report.checks.push('intro mid-dialogue reload');await skip();
 for(let round=0;round<100;round++){
  for(const p of data.places){
   await click('#tab-現장'.replace('現','현'));
   await skip();
   if((await state()).location!==p.id)await click(`#reader [data-action="move"][data-id="${p.id}"]`);
   if((await state()).active?.event==='V01')await screenshot('02-event-press-desktop');
   await skip();
   while(await page.locator('#reader [data-action="event"]').count()){await click('#reader [data-action="event"]');await skip();}
   while(await page.locator('#reader [data-action="inspect"]').count())await click('#reader [data-action="inspect"]');
   const talks=await page.locator('#reader [data-action="talk"]').evaluateAll(es=>es.map(e=>e.dataset.id));
   for(const id of talks)await click(`#reader [data-action="talk"][data-id="${id}"]`);
   if(await page.locator('[data-action="branch"][data-id="B01"]').count())await click('[data-action="branch"][data-value="private"]');
  }
  let s=await state();
  if(s.completedEvents.includes('V10')){await click('[data-action="branch"][data-value="read"]');await skip();break;}
  const ready=data.tasks.find(t=>t.chapter===s.chapter&&!s.solved.includes(t.id)&&t.needs.every(id=>s.solved.includes(id))&&proofs[t.id].every(id=>s.acquired[id]));
  assert.ok(ready,'at least one actionable task after investigation pass');
  await page.locator('#task-select').selectOption(ready.id);
  if(ready.statement)await page.locator('#statement-select').selectOption(ready.statement);
  await page.locator('#answer-'+answers[ready.id]).check();
  for(const id of proofs[ready.id])await page.locator('#select-'+id).check();
  if(['D02','F02'].includes(ready.id)){
   await click('[data-action="order-start"]');
   for(const desired of ['last','photo','seal','discovery']){
    const target=['last','photo','seal','discovery'].indexOf(desired);
    while((await state()).drafts[ready.id].order.indexOf(desired)>target)await click(`[data-action="order-up"][data-id="${desired}"]`);
   }
  }
  if(['D01','Q01','D02','F01','F02','F03'].includes(ready.id))await tabsPreserve(ready.id);
  if(ready.id==='D01'){
   await page.locator('#answer-1').check();await click('#submit-answer');assert.equal((await state()).trust,90);
   await page.reload();await page.locator('[data-action="ack"]').waitFor();assert.equal((await state()).trust,90);
   for(let i=0;i<9;i++){await click('[data-action="ack"]');await click('#submit-answer');}assert.equal((await state()).trust,0);assert.equal((await state()).recovery,true);await screenshot('03-zero-recovery');
   await click('[data-action="recover"]');assert.equal((await state()).trust,60);assert.match((await state()).notes,/검수/);
   for(let i=0;i<5;i++)await click('[data-action="hint"]');assert.match(await page.locator('.hint').innerText(),/19:11/);
   await page.locator('#answer-0').check();for(const id of proofs.D01)await page.locator('#select-'+id).check();
  }
  if(ready.id==='F01'){
   await click('#tab-자료');await screenshot('04-evidence-desktop');
   const density=await page.locator('#reader .entry').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.top>=84&&r.bottom<=900;}).length);
   report.checks.push('visible desktop evidence rows: '+density);
   await click('#tab-인물');await screenshot('05-people-desktop');
   await page.setViewportSize({width:390,height:844});await click('#tab-자료');await screenshot('06-evidence-mobile');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no mobile document overflow');
   await click('#tab-설정');await page.locator('#font-size').fill('32');await click('#tab-인물');await screenshot('07-mobile-font-200');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no mobile overflow at 200% font');
   await click('#tab-설정');await page.locator('#font-size').fill('16');await page.setViewportSize({width:1440,height:900});await click('#tab-현장');
  }
  await click('#submit-answer');s=await state();assert.ok(s.solved.includes(ready.id),ready.id+' must solve: '+s.message);
  report.checks.push('UI solved '+ready.id);
 }
 assert.equal((await state()).ended,true);assert.equal(errors.length,0);await screenshot('08-ending-desktop');
 await writeFile(resolve(dir,'browser-final-save.json'),JSON.stringify(await state(),null,2));
 report.status='passed';
}catch(error){report.status='failed';report.failure=error.stack;await screenshot('failure');process.exitCode=1;}
finally{await writeFile(resolve(dir,'browser-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();server.kill();}
