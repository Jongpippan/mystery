import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {r,isSave,acquiredPending} from './runtime-harness.mjs';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ep-fixtures.json','utf8'));
const out='../game-plan/validation/art-browser';mkdirSync(out,{recursive:true});
const cases=[['form','acquire-E28'],['source-table','sourcesHub'],['cargo-sealed','cargo-sealed'],['cargo-open','cargo-opened'],['note','acquire-E38'],['landing','acquire-E42'],['silhouette','event-C_CH05_04:n0008'],['unfolded','event-C_CH06_02:n0005'],['copy','acquire-E51'],['handoff-before','event-C_EP_01:n0001'],['handoff-after','event-C_EP_01:n0007'],['staff','event-C_EP_03:n0001'],['departure','event-C_EP_05:n0001']];
const browser=await chromium.launch(),results=[];
try{for(const profile of [{name:'desktop',width:1440,height:900,scale:1},{name:'phone-200',width:390,height:844,scale:2}]){
 const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.scale===2}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.YEOWUL_BASE_URL??'http://localhost:5173/',{waitUntil:'networkidle'});
 const restore=async source=>{let s=structuredClone(source);assert.ok(s);while(acquiredPending(s))s=r(s,{type:'acknowledge',id:acquiredPending(s)});s=r(s,{type:'viewClose'});assert.ok(isSave(s));await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},{...s,textScale:profile.scale});await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기',exact:true}).click();await page.locator('.scene-stage').waitFor();};
 for(const [name,key] of cases){await restore(fixtures[key]);await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete));assert.ok(await page.evaluate(()=>Array.from(document.images).every(i=>i.naturalWidth>0)));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-${name}.png`,fullPage:true});results.push({profile:profile.name,scene:name,status:'pass'});}
 for(const choice of ['environment_only','consented_voices']){
  const end=Object.entries(fixtures).find(([k,s])=>k.startsWith('ending-')&&s.choices.B_SOUND===choice)[1];await restore(end);await page.getByRole('button',{name:'사건 보관함 열기',exact:true}).click();const player=page.getByRole('dialog').locator('audio');await player.waitFor();assert.match(await player.locator('source').getAttribute('src'),choice==='environment_only'?/school-environment/:/school-voice/);assert.ok(await player.evaluate(a=>a.paused));await player.evaluate(a=>a.play());await page.waitForFunction(()=>document.querySelector('audio')?.currentTime>.1);await player.evaluate(a=>a.pause());results.push({profile:profile.name,scene:`school-${choice}`,status:'pass'});
 }
 assert.deepEqual(errors,[]);await context.close();
}writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(`${results.length} art/audio browser groups passed`);}finally{await browser.close();}
