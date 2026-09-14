import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {r} from './runtime-harness.mjs';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ep-fixtures.json','utf8'));
const out='../game-plan/validation/integration-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch(),results=[];
try{for(const profile of [{name:'desktop',width:1440,height:900,scale:1},{name:'phone-200',width:390,height:844,scale:2}]){
 const context=await browser.newContext({viewport:{width:profile.width,height:profile.height}}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.YEOWUL_BASE_URL??'http://localhost:5173/',{waitUntil:'networkidle'});
 if(profile.scale===2){await page.getByRole('button',{name:'설정 열기',exact:true}).click();const scale=page.getByRole('slider',{name:'글자 크기',exact:true});await scale.focus();await scale.press('End');await page.keyboard.press('Escape');}
 const saved=()=>page.evaluate(()=>{const v=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return v.slots.find(s=>s.id===v.active).state;});
 const restore=async s=>{await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},{...s,textScale:profile.scale});await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기',exact:true}).click();};
 const noOverflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.getByRole('button',{name:'직접 입력',exact:true}).click();await page.locator('#player-name').fill('   ');await page.getByRole('button',{name:'입력한 이름 확인',exact:true}).click();assert.match(await page.locator('.start-copy').innerText(),/빈칸으로는/);
 await page.locator('#player-name').fill('가'.repeat(21));await page.getByRole('button',{name:'입력한 이름 확인',exact:true}).click();assert.equal(await page.locator('#player-name').inputValue(),'가'.repeat(21));
 await page.locator('#player-name').fill('  나 기록  ');await page.getByRole('button',{name:'입력한 이름 확인',exact:true}).click();await page.reload({waitUntil:'networkidle'});assert.match(await page.locator('.start-copy').innerText(),/나 기록/);
 await page.getByRole('button',{name:'이 이름으로 시작',exact:true}).click();await page.getByRole('button',{name:'여울관 들어가기',exact:true}).click();assert.equal((await saved()).playerName,'나 기록');await noOverflow();results.push({profile:profile.name,group:'name',status:'pass'});
 const original={...r(fixtures['task-D03'],{type:'viewClose'}),textScale:profile.scale};await restore(original);
 const exits=page.getByRole('region',{name:'현장 이동'});await exits.getByRole('button',{name:/동쪽.*현관/}).click();await exits.getByRole('button',{name:/동쪽.*연회장/}).click();
 assert.equal((await saved()).travel.position,'L03:guest');assert.equal(await exits.getByRole('button',{name:/북쪽/}).count(),0);
 await page.getByRole('button',{name:'탁두철에게 완료한 칸막이 시험 다시 묻기',exact:true}).click();assert.match(await page.locator('.dialogue-text').innerText(),/다시 움직일 필요/);
 await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기',exact:true}).click();assert.match(await page.locator('.dialogue-text').innerText(),/다시 움직일 필요/);
 await page.getByRole('button',{name:'계속',exact:true}).click();await page.getByRole('button',{name:'계속',exact:true}).click();
 await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-travel.png`,fullPage:true});
 await exits.getByRole('button',{name:/서쪽.*현관/}).click();await exits.getByRole('button',{name:/서쪽.*휴게실/}).click();const returned=await saved();assert.equal(returned.travel,undefined);assert.equal(returned.cursor,original.cursor);assert.deepEqual(returned.investigation,original.investigation);await noOverflow();results.push({profile:profile.name,group:'travel/current conversation',status:'pass'});
 await restore(fixtures['task-D06']);const dialog=page.getByRole('dialog'),nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
 await nav.getByRole('button',{name:'증거',exact:true}).click();await dialog.locator('#evidence-E14').click();const players=dialog.locator('audio');await players.first().waitFor();assert.equal(await players.count(),2);assert.ok(await players.evaluateAll(es=>es.every(a=>a.paused)));
 await players.first().evaluate(a=>a.play());await page.waitForFunction(()=>document.querySelector('audio')?.currentTime>.15);assert.ok(await players.first().evaluate(a=>a.duration>5));
 await players.nth(1).evaluate(a=>a.play());assert.ok(await players.first().evaluate(a=>a.paused));await players.nth(1).evaluate(a=>a.pause());
 await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-audio.png`,fullPage:true});await nav.getByRole('button',{name:'설정',exact:true}).click();await dialog.getByRole('button',{name:'음소거',exact:true}).click();assert.equal((await saved()).audioVolume,0);await noOverflow();results.push({profile:profile.name,group:'audio',status:'pass'});
 assert.deepEqual(errors,[]);await context.close();
}writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(results);}finally{await browser.close();}
