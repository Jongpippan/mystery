import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ch04-fixtures.json','utf8'));
const out='../game-plan/validation/ch04-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}),results=[];
try{
 for(const profile of [{name:'desktop',width:1440,height:900,touch:false,scale:1},{name:'phone-200',width:390,height:844,touch:true,scale:2}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch,isMobile:profile.touch});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});
  const restore=async fixture=>{assert.ok(fixture);await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},{...fixture,textScale:profile.scale});await page.reload({waitUntil:'networkidle'});const button=page.getByRole('button',{name:'읽던 자리에서 이어하기'});if(profile.touch)await button.tap();else await button.click();};
  const saved=()=>page.evaluate(()=>(()=>{const store=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return store?store.slots.find(s=>s.id===store.active).state:JSON.parse(localStorage.getItem('yeowul-save-v1'));})());
  const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&Array.from(document.querySelectorAll('.tool-dialog,.tool-body')).every(el=>el.scrollWidth<=el.clientWidth+2)),true,`${profile.name}: horizontal overflow`);
  for(const id of ['D16','D17','Q04','D18','D19','D20']){
   await restore(fixtures[`task-${id}`]);const dialog=page.getByRole('dialog');
   await dialog.getByRole('textbox',{name:'추리 메모'}).fill(`${id} 읽던 초안`);
   for(const field of await dialog.locator('fieldset.proof-field').all()){const radio=field.locator('input[type=radio]').first();if(await radio.count())await radio.check();}
   const before=await saved(),nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
   for(const name of ['증거','인물','지도','대화','메모','설정']){await nav.getByRole('button',{name,exact:true}).click();await page.keyboard.press('Escape');await dialog.getByRole('textbox',{name:'추리 메모'}).waitFor();}
   await dialog.getByRole('button',{name:'해답과 이유',exact:true}).click();await dialog.getByRole('button',{name:'읽던 답안으로 돌아가기'}).click();
   await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();
   assert.deepEqual((await saved()).investigation.drafts[id],before.investigation.drafts[id]);assert.equal((await saved()).points,6);
   for(let n=0;n<5;n++){await page.keyboard.press('Tab');assert.equal(await dialog.evaluate(el=>el.contains(document.activeElement)),true);}
   await noOverflow();if(id==='D18'){await dialog.locator('fieldset.proof-field').first().scrollIntoViewIfNeeded();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-transaction-draft.png`,fullPage:true});}
   results.push({profile:`${profile.name} ${id}`,status:'pass',checks:['six tools and H4','exact draft restore','keyboard containment','no point loss or overflow']});
  }
  for(const id of ['E31','E32','E33','E34','E35','E36','E37','E38','E19']){
   await restore(fixtures[`acquire-${id}`]);const dialog=page.getByRole('dialog');await dialog.locator(`.evidence-${id}`).waitFor();await noOverflow();
   if(['E33','E34','E35','E37'].includes(id))await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-${id}.png`,fullPage:true});
   if(id==='E35'){assert.equal((await saved()).evidence.includes('E37'),false);assert.equal(await dialog.locator('.transaction-sources section').count(),3);assert.equal((await dialog.innerText()).includes('수령 확인 명의: 차무록'),false);}
   if(id==='E36')assert.equal((await saved()).investigation.knowledge.includes('KQ04'),false);
   if(id==='E37')assert.match(await dialog.locator('.notice-packet').innerText(),/한 패킷/);
   await dialog.getByRole('button',{name:'확인했어요',exact:true}).click();assert.equal((await saved()).acknowledged.filter(e=>e===id).length,1);
  }
  results.push({profile:`${profile.name} acquisition`,status:'pass',checks:['nine immediate evidence details','three transaction origins','no early E37 recipient assertion','one notice packet','Q04 correction before knowledge award','single acknowledgments']});
  await restore(fixtures['hub-ch4-meeting']);assert.equal(await page.locator('.envelope-closed').count(),4);assert.equal(await page.locator('.envelope-read').count(),0);
  await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-envelopes-before.png`,fullPage:true});
  await page.getByRole('button',{name:'원본 대조 자리와 준비 자료 확인'}).click();await page.getByRole('dialog').getByRole('button',{name:'해답과 이유',exact:true}).click();assert.equal((await saved()).investigation.hintId,'S_H_V04_0002');await page.keyboard.press('Escape');
  await page.locator('.choice-list button').first().click();const acquired=[];
  for(let n=0;n<80;n++){
   const s=await saved(),pending=s.evidence.find(id=>!s.acknowledged.includes(id));
   if(pending){acquired.push(pending);await page.getByRole('dialog').locator(`.evidence-${pending}`).waitFor();await page.getByRole('dialog').getByRole('button',{name:'확인했어요',exact:true}).click();if(pending==='E34')break;}
   else await page.locator('.dialogue-box').getByRole('button',{name:'계속',exact:true}).click();
  }
  assert.deepEqual(acquired,['E31','E32','E33','E34']);assert.equal(await page.locator('.envelope-read').count(),4);assert.equal((await saved()).evidence.includes('E36'),false);
  await restore(fixtures['hub-ch4-edges']);await page.locator('.page-connections').waitFor();assert.match(await page.locator('.place-strip').innerText(),/연회장/);assert.match(await page.locator('.custody-caption').innerText(),/호숫가 보관 창고에 그대로/);await noOverflow();
  await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-page-connections.png`,fullPage:true});
  await restore(fixtures['task-Q04']);await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');assert.match(await page.locator('.place-strip').innerText(),/휴게실/);assert.equal(await page.locator('.event-papers').count(),0);
  await restore(fixtures['hub-ch4-aftermath']);assert.equal(await page.locator('.purpose-envelopes small').count(),4);assert.equal(await page.locator('.companion-portrait').count(),0);await noOverflow();
  results.push({profile:`${profile.name} physical originals`,status:'pass',checks:['four initially closed envelopes','actual E31 E32 E33 E34 queue','V04 missing-material H4','page connection comparison','wet book remains at L12','Q04 return to lounge','corrected envelope labels','child absent from formal inquiry']});
  for(const [value,index,nodeId] of [['attributed_accounts',0,'S_CH04_O2_0001'],['joint_annotations',1,'S_CH04_O2_0011']]){
   await restore(fixtures['choice-B_EXHIBIT']);const options=page.locator('.choice-list button');assert.equal(await options.count(),2);await noOverflow();await options.nth(index).click();const s=await saved();assert.equal(s.choices.B_EXHIBIT,value);assert.equal(s.log.at(-1).nodeId,nodeId);assert.equal(s.points,6);
   await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();assert.equal((await saved()).choices.B_EXHIBIT,value);
  }
  await restore(fixtures.skipped);assert.equal((await saved()).choices.B_EXHIBIT,undefined);assert.equal((await saved()).investigation.knowledge.length,24);
  await page.getByRole('navigation',{name:'조사 도구',exact:true}).getByRole('button',{name:'인물',exact:true}).click();const dialog=page.getByRole('dialog');await dialog.locator('#person-P02').click();await dialog.getByRole('button',{name:'이후 직원 동의 범위 정정 보기'}).click();await dialog.locator('.evidence-E36').waitFor();await noOverflow();
  assert.deepEqual(errors,[]);results.push({profile:`${profile.name} choices and records`,status:'pass',checks:['both exhibition choices and exact reload','optional skip retained','24 completed required tasks','Q04 original-to-correction link','no page errors']});
  await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
