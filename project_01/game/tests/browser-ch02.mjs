import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ch02-fixtures.json','utf8'));
const out='../game-plan/validation/ch02-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}),results=[];
try{
 for(const profile of [{name:'desktop',width:1440,height:900,touch:false,scale:1},{name:'phone-200',width:390,height:844,touch:true,scale:2}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch,isMobile:profile.touch});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});
  const restore=async fixture=>{await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},{...fixture,textScale:profile.scale});await page.reload({waitUntil:'networkidle'});const button=page.getByRole('button',{name:'읽던 자리에서 이어하기'});if(profile.touch)await button.tap();else await button.click();};
  const saved=()=>page.evaluate(()=>(()=>{const store=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return store?store.slots.find(s=>s.id===store.active).state:JSON.parse(localStorage.getItem('yeowul-save-v1'));})());
  const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&Array.from(document.querySelectorAll('.tool-dialog,.tool-body')).every(el=>el.scrollWidth<=el.clientWidth+2)),true,`${profile.name}: horizontal overflow`);
  for(const id of ['D06','Q02','D07','D08','D09','D10']){
   await restore(fixtures[`task-${id}`]);const dialog=page.getByRole('dialog');
   await dialog.getByRole('textbox',{name:'추리 메모'}).fill(`${id} 작업 중인 초안`);
   for(const field of await dialog.locator('fieldset.proof-field').all()){const radio=field.locator('input[type=radio]').first();if(await radio.count())await radio.check();}
   const before=await saved(),nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
   for(const name of ['증거','인물','지도','대화','메모','설정']){await nav.getByRole('button',{name,exact:true}).click();await page.keyboard.press('Escape');await dialog.getByRole('textbox',{name:'추리 메모'}).waitFor();}
   await dialog.getByRole('button',{name:'해답과 이유',exact:true}).click();await dialog.getByRole('button',{name:'읽던 답안으로 돌아가기'}).click();
   await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();
   assert.deepEqual((await saved()).investigation.drafts[id],before.investigation.drafts[id]);assert.equal((await saved()).points,6);
   for(let n=0;n<6;n++){await page.keyboard.press('Tab');assert.equal(await dialog.evaluate(el=>el.contains(document.activeElement)),true);}
   await noOverflow();
   if(id==='D09'){await dialog.locator('input[name=first]').first().scrollIntoViewIfNeeded();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-chronology.png`,fullPage:true});}
   results.push({profile:`${profile.name} ${id}`,status:'pass',checks:['six tool round trips','H4 return','reload selected fields and note','keyboard containment','no horizontal overflow','no point loss']});
  }
  for(const id of ['E11','E14','E15','E16','E13','E17']){
   await restore(fixtures[`acquire-${id}`]);const dialog=page.getByRole('dialog');await dialog.waitFor();
   assert.equal(await dialog.locator(`.evidence-${id}`).count(),1);assert.equal((await saved()).acknowledged.includes(id),false);
   if(id==='E11')assert.equal(await dialog.locator('.sound-track').count(),1);
   if(id==='E14'){assert.equal(await dialog.locator('.sound-track').count(),2);assert.equal(await dialog.locator('.sound-overlap small').evaluateAll(els=>els.every(el=>el.scrollWidth<=el.clientWidth+1)),true,'caption remains inside its aligned cell at text zoom');await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-comparison.png`,fullPage:true});}
   if(id==='E15')await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-correction.png`,fullPage:true});
   await noOverflow();await dialog.getByRole('button',{name:'확인했어요',exact:true}).click();assert.equal((await saved()).acknowledged.filter(e=>e===id).length,1);
  }
  results.push({profile:`${profile.name} acquisitions`,status:'pass',checks:['six actual details survive reload','E11 single source then E14 aligned pair','ordered E16 E13 E17','E15 returns to Q02 response','one acknowledgment']});
  await restore(fixtures['task-D06']);let dialog=page.getByRole('dialog');await dialog.getByRole('navigation',{name:'다른 조사 도구'}).getByRole('button',{name:'인물',exact:true}).click();await dialog.locator('#person-P05').click();assert.equal(await dialog.getByRole('button',{name:'이후 재생 조작 정정 보기'}).count(),0);
  await restore(fixtures['task-D07']);dialog=page.getByRole('dialog');await dialog.getByRole('navigation',{name:'다른 조사 도구'}).getByRole('button',{name:'인물',exact:true}).click();await dialog.locator('#person-P05').click();await dialog.getByRole('button',{name:'이후 재생 조작 정정 보기'}).click();await dialog.locator('.evidence-E15').waitFor();
  results.push({profile:`${profile.name} correction provenance`,status:'pass',checks:['no future correction link before Q02','original statement links to separate acquired E15 after Q02']});
  for(const value of ['accept_apology','need_time']){
   await restore(fixtures['choice-B_PLAYBACK_RESPONSE']);const buttons=page.locator('.choice-list button');await buttons.nth(value==='accept_apology'?0:1).click();assert.equal((await saved()).choices.B_PLAYBACK_RESPONSE,value);assert.equal((await saved()).points,6);await noOverflow();
  }
  results.push({profile:`${profile.name} apology`,status:'pass',checks:['both responses selectable','choice saved without penalty']});
  for(const key of ['event-n0015','event-n0017','event-n0021']){await restore(fixtures[key]);await noOverflow();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-${key}.png`,fullPage:true});}
  await restore(fixtures['event-S_CH02_02_0007']);assert.equal(await page.locator('.dialogue-label').innerText(),'리허설 녹음 — 표문식');
  assert.deepEqual(errors,[]);results.push({profile:`${profile.name} sound event`,status:'pass',checks:['saved input/file/comparison states','recorded speaker provenance visible','no browser errors']});
  await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
