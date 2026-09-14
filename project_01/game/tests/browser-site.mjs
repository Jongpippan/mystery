import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {r,isSave} from './runtime-harness.mjs';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ep-fixtures.json','utf8'));
const out='../game-plan/validation/site-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch(),results=[];
try {for(const profile of [{name:'desktop',width:1440,height:900,scale:1},{name:'phone-200',width:390,height:844,scale:2}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.YEOWUL_BASE_URL??'http://localhost:5173/',{waitUntil:'networkidle'});
  const source={...r(fixtures['task-D03'],{type:'viewClose'}),textScale:profile.scale};assert.ok(isSave(source));
  await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},source);
  await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기',exact:true}).click();
  await page.getByRole('button',{name:'봉만실·모눈과 목격 정정 다시 확인하기',exact:true}).click();
  assert.match(await page.locator('.dialogue-text').innerText(),/내 정정은 그대로/);
  await page.getByRole('navigation',{name:'조사 도구'}).getByRole('button',{name:'지도',exact:true}).click();
  const dialog=page.getByRole('dialog');await dialog.getByRole('img',{name:'확인한 여울관 공간'}).waitFor();
  assert.match(await dialog.innerText(),/현재 장면/);
  assert.ok(await dialog.locator('.tool-body').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
  await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-map.png`,fullPage:true});
  await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기',exact:true}).click();await page.keyboard.press('Escape');
  assert.match(await page.locator('.dialogue-text').innerText(),/내 정정은 그대로/);
  await page.getByRole('button',{name:'계속',exact:true}).click();assert.match(await page.locator('.dialogue-text').innerText(),/내 접수대 의자/);
  await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-revisit.png`,fullPage:true});
  await page.getByRole('button',{name:'계속',exact:true}).click();
  const saved=await page.evaluate(()=>{const v=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return v.slots.find(s=>s.id===v.active).state;});
  assert.equal(saved.revisit,undefined);assert.deepEqual(saved.investigation,source.investigation);assert.equal(saved.cursor,source.cursor);assert.deepEqual(saved.evidence,source.evidence);
  assert.deepEqual(errors,[]);results.push({profile:profile.name,status:'pass',checks:['map layout','live source conversation','tool/reload return','exact suspended answer and position']});await context.close();
}writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(results);}finally{await browser.close();}
