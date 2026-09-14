import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ch03-fixtures.json','utf8'));
const out='../game-plan/validation/ch03-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}),results=[];
try{
 for(const profile of [{name:'desktop',width:1440,height:900,touch:false,scale:1},{name:'phone-200',width:390,height:844,touch:true,scale:2}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch,isMobile:profile.touch});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});
  const restore=async fixture=>{assert.ok(fixture);await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},{...fixture,textScale:profile.scale});await page.reload({waitUntil:'networkidle'});const button=page.getByRole('button',{name:'읽던 자리에서 이어하기'});if(profile.touch)await button.tap();else await button.click();};
  const saved=()=>page.evaluate(()=>(()=>{const store=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return store?store.slots.find(s=>s.id===store.active).state:JSON.parse(localStorage.getItem('yeowul-save-v1'));})());
  const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&Array.from(document.querySelectorAll('.tool-dialog,.tool-body')).every(el=>el.scrollWidth<=el.clientWidth+2)),true,`${profile.name}: horizontal overflow`);
  for(const id of ['D11','D12','Q03','D13','D14','D15']){
   await restore(fixtures[`task-${id}`]);const dialog=page.getByRole('dialog');
   await dialog.getByRole('textbox',{name:'추리 메모'}).fill(`${id} 읽던 초안`);
   for(const field of await dialog.locator('fieldset.proof-field').all()){const radio=field.locator('input[type=radio]').first();if(await radio.count())await radio.check();}
   const before=await saved(),nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
   for(const name of ['증거','인물','지도','대화','메모','설정']){await nav.getByRole('button',{name,exact:true}).click();await page.keyboard.press('Escape');await dialog.getByRole('textbox',{name:'추리 메모'}).waitFor();}
   await dialog.getByRole('button',{name:'해답과 이유',exact:true}).click();await dialog.getByRole('button',{name:'읽던 답안으로 돌아가기'}).click();
   await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();
   assert.deepEqual((await saved()).investigation.drafts[id],before.investigation.drafts[id]);assert.equal((await saved()).points,6);
   for(let n=0;n<5;n++){await page.keyboard.press('Tab');assert.equal(await dialog.evaluate(el=>el.contains(document.activeElement)),true);}
   await noOverflow();if(id==='D13'){await dialog.locator('fieldset.proof-field').first().scrollIntoViewIfNeeded();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-custody-draft.png`,fullPage:true});}
   results.push({profile:`${profile.name} ${id}`,status:'pass',checks:['six tools and H4','exact draft restore','keyboard containment','no point loss or overflow']});
  }
  for(const id of ['E21','E23','E24','E27','E30']){
   await restore(fixtures[`acquire-${id}`]);const dialog=page.getByRole('dialog');await dialog.locator(`.evidence-${id}`).waitFor();await noOverflow();
   await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-${id}.png`,fullPage:true});
   if(id==='E30'){assert.equal((await saved()).evidence.includes('E49'),false);assert.equal(await dialog.locator('.folded-leaf').innerText(),'젖어 붙은 접힌 본장\n안쪽 면 미개봉 · 시각 읽을 수 없음');}
   await dialog.getByRole('button',{name:'확인했어요',exact:true}).click();assert.equal((await saved()).acknowledged.filter(e=>e===id).length,1);
  }
  results.push({profile:`${profile.name} acquired diagrams`,status:'pass',checks:['five immediate details','Q03 correction','wet bound original stays unreadable','single acknowledgment','no overflow']});
  await restore(fixtures['cargo-sealed']);assert.equal((await saved()).evidence.includes('E23'),false);assert.equal(await page.locator('[data-cargo=sealed]').count(),1);assert.equal(await page.locator('[data-cargo=contents]').count(),0);
  await page.getByRole('button',{name:'화물 호송·입회 개봉 확인'}).click();await page.getByRole('dialog').getByRole('button',{name:'해답과 이유',exact:true}).click();assert.equal((await saved()).investigation.hintId,'S_H_V03_0031');await page.keyboard.press('Escape');
  await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-sealed.png`,fullPage:true});
  await restore(fixtures['acquire-E23']);const acquired=[];
  for(let n=0;n<60;n++){
   const s=await saved(),pending=s.evidence.find(id=>!s.acknowledged.includes(id));
   if(pending){acquired.push(pending);await page.getByRole('dialog').locator(`.evidence-${pending}`).waitFor();await page.getByRole('dialog').getByRole('button',{name:'확인했어요',exact:true}).click();if(pending==='E30')break;}
   else await page.locator('.dialogue-box').getByRole('button',{name:'계속',exact:true}).click();
  }
  assert.deepEqual(acquired,['E23','E26','E29','E30']);assert.equal((await saved()).evidence.includes('E49'),false);await noOverflow();
  results.push({profile:`${profile.name} opening sequence`,status:'pass',checks:['opaque sealed view','sealed H4 exterior only','actual E23 E26 E29 E30 acquisition queue','future original not exposed']});
  await restore(fixtures['cargo-joined']);assert.equal(await page.locator('.dialogue-label').innerText(),'휴게실 전화 · 나모눈');assert.equal(await page.locator('.dialogue-portrait').count(),0);assert.equal(await page.locator('.companion-portrait').count(),0);
  await restore(fixtures['task-D13']);const dialog=page.getByRole('dialog');await dialog.getByRole('navigation',{name:'다른 조사 도구'}).getByRole('button',{name:'인물',exact:true}).click();await dialog.locator('#person-P06').click();await dialog.getByRole('button',{name:'이후 반출 경로 정정 보기'}).click();await dialog.locator('.evidence-E24').waitFor();
  assert.deepEqual(errors,[]);results.push({profile:`${profile.name} supervision and provenance`,status:'pass',checks:['remote child stays in supervised lounge','corrected statement linked to E24','no page errors']});
  await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
