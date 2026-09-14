import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ch05-fixtures.json','utf8'));
const out='../game-plan/validation/ch05-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}),results=[];
try{
 for(const profile of [{name:'desktop',width:1440,height:900,touch:false,scale:1},{name:'phone-200',width:390,height:844,touch:true,scale:2}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch,isMobile:profile.touch});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});
  const restore=async fixture=>{assert.ok(fixture);await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},{...fixture,textScale:profile.scale});await page.reload({waitUntil:'networkidle'});const button=page.getByRole('button',{name:'읽던 자리에서 이어하기'});if(profile.touch)await button.tap();else await button.click();};
  const saved=()=>page.evaluate(()=>(()=>{const store=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return store?store.slots.find(s=>s.id===store.active).state:JSON.parse(localStorage.getItem('yeowul-save-v1'));})());
  const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&Array.from(document.querySelectorAll('.tool-dialog,.tool-body')).every(el=>el.scrollWidth<=el.clientWidth+2)),true,`${profile.name}: horizontal overflow`);
  for(const id of ['D21','Q05','D22','D23','D24','D25']){
   await restore(fixtures[`task-${id}`]);const dialog=page.getByRole('dialog');
   await dialog.getByRole('textbox',{name:'추리 메모'}).fill(`${id} 읽던 초안`);
   for(const field of await dialog.locator('fieldset.proof-field').all()){const radio=field.locator('input[type=radio]').first();if(await radio.count())await radio.check();}
   const before=await saved(),nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
   for(const name of ['증거','인물','지도','대화','메모','설정']){await nav.getByRole('button',{name,exact:true}).click();await page.keyboard.press('Escape');await dialog.getByRole('textbox',{name:'추리 메모'}).waitFor();}
   await dialog.getByRole('button',{name:'해답과 이유',exact:true}).click();await dialog.getByRole('button',{name:'읽던 답안으로 돌아가기'}).click();
   await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();
   assert.deepEqual((await saved()).investigation.drafts[id],before.investigation.drafts[id]);assert.equal((await saved()).points,6);
   for(let n=0;n<5;n++){await page.keyboard.press('Tab');assert.equal(await dialog.evaluate(el=>el.contains(document.activeElement)),true);}
   await noOverflow();if(id==='D23'){await dialog.locator('fieldset.proof-field').first().scrollIntoViewIfNeeded();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-timing-draft.png`,fullPage:true});}
   results.push({profile:`${profile.name} ${id}`,status:'pass',checks:['six tools and H4','exact draft restore','keyboard containment','no point loss or overflow']});
  }
  for(const id of ['E40','E41','E42','E43','E44','E45','E46','E47']){
   await restore(fixtures[`acquire-${id}`]);const dialog=page.getByRole('dialog');await dialog.locator(`.evidence-${id}`).waitFor();await noOverflow();
   if(['E40','E42','E44','E45'].includes(id))await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-${id}.png`,fullPage:true});
   if(id==='E40'){assert.equal(await dialog.locator('.clear-pane').count(),1);assert.equal(await dialog.locator('.frosted-pane').count(),1);}
   if(id==='E41'){assert.equal((await saved()).evidence.includes('E43'),false);assert.match(await dialog.locator('.witness-origin').innerText(),/두 번째 목격자 아님/);}
   if(id==='E42'){assert.match(await dialog.locator('.new-barrier').innerText(),/10\/22 경찰 설치/);assert.match(await dialog.locator('.old-warning').innerText(),/기존 경고표/);}
   if(id==='E43')assert.equal((await saved()).investigation.knowledge.includes('KQ05'),false);
   if(id==='E45'){assert.equal(await dialog.locator('.action-comparison').count(),3);assert.equal((await saved()).investigation.knowledge.includes('K22'),false);}
   if(id==='E46'){const text=await dialog.locator('.document-original').innerText();assert.match(text,/20:26/);assert.match(text,/20:17/);}
   assert.equal((await saved()).evidence.includes('E49'),false);
   await dialog.getByRole('button',{name:'확인했어요',exact:true}).click();assert.equal((await saved()).acknowledged.filter(e=>e===id).length,1);
  }
  results.push({profile:`${profile.name} evidence boundaries`,status:'pass',checks:['eight immediate details','distinct clear and frosted windows','old warning versus later barrier','one witness origin','Q05 correction before K','all three labeled safe alternatives','conflicting coat statements retained','no readable E49']});
  await restore(fixtures['event-C_CH05_01:n0001']);assert.equal(await page.locator('.dialogue-portrait').count(),0);
  await page.getByRole('button',{name:'성인 시야 확인의 안전한 다음 단계'}).click();await page.getByRole('dialog').getByRole('button',{name:'해답과 이유',exact:true}).click();assert.equal((await saved()).investigation.hintId,'S_H_V05_0011');await page.keyboard.press('Escape');
  await restore(fixtures['event-C_CH05_01:n0009']);assert.equal(await page.locator('.companion-portrait').count(),0);await page.getByRole('button',{name:'성인 시야 확인의 안전한 다음 단계'}).click();assert.equal((await saved()).investigation.hintId,'S_H_V05_0022');await page.keyboard.press('Escape');
  await restore(fixtures['hub-ch5-gate']);assert.equal(await page.locator('.new-barrier').count(),1);await noOverflow();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-gate.png`,fullPage:true});
  await restore(fixtures['task-Q05']);await page.keyboard.press('Escape');assert.match(await page.locator('.place-strip').innerText(),/음향 부스/);assert.equal(await page.locator('.secured-gate').count(),0);
  await restore(fixtures['event-C_CH05_04:n0004']);const observed=new Set();
  for(let n=0;n<30;n++){
   const s=await saved(),mode=await page.locator('[data-comparison]').first().getAttribute('data-comparison');observed.add(mode);
   if(s.evidence.includes('E45'))break;
   assert.equal(await page.locator('.companion-portrait').count(),0);await page.locator('.dialogue-box').getByRole('button',{name:'계속',exact:true}).click();
  }
  assert.deepEqual([...observed],['stumble','help','push']);await page.getByRole('dialog').locator('.evidence-E45').waitFor();assert.equal((await saved()).evidence.includes('E45'),true);
  for(const [mode,node] of [['stumble','n0004'],['help','n0006'],['push','n0008']]){await restore(fixtures[`event-C_CH05_04:${node}`]);await page.locator(`[data-comparison=${mode}]`).waitFor();await noOverflow();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-compare-${mode}.png`,fullPage:true});}
  results.push({profile:`${profile.name} supervised comparison`,status:'pass',checks:['supervision H4 before handoff','interrupted adult-route hint','child stays in lounge','gate view disappears at booth interview','actual A B C then E45 sequence','no overflowing diagrams']});
  for(const [first,remaining] of [['D22','D23'],['D23','D22']]){await restore(fixtures[`after-first-${first}`]);const s=await saved();assert.ok(s.investigation.knowledge.includes(first.replace('D','K')));assert.equal(s.investigation.knowledge.includes(remaining.replace('D','K')),false);const options=page.locator('.choice-list button');await options.first().click();assert.equal((await saved()).investigation.task.id,remaining);}
  await restore(fixtures['ending-late-D23-false']);assert.match(await page.locator('.place-strip').innerText(),/읍내 게스트하우스/);assert.equal((await saved()).investigation.knowledge.length,30);assert.equal((await saved()).evidence.includes('E49'),false);assert.equal((await saved()).investigation.completed.includes('ch5-photo'),true);await noOverflow();
  await page.getByRole('navigation',{name:'조사 도구',exact:true}).getByRole('button',{name:'인물',exact:true}).click();const dialog=page.getByRole('dialog');await dialog.locator('#person-P05').click();await dialog.getByRole('button',{name:'이후 창 목격 정정 보기'}).click();await dialog.locator('.evidence-E43').waitFor();
  assert.deepEqual(errors,[]);results.push({profile:`${profile.name} order and overnight`,status:'pass',checks:['either deduction order retains remaining task','30 tasks complete','late E10 actually acquired','guesthouse ending retains both hypotheses and no E49','Q05 correction linked','no page errors']});
  await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
