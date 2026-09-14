import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ch06-fixtures.json','utf8'));
const out='../game-plan/validation/ch06-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}),results=[];
try{
 for(const profile of [{name:'desktop',width:1440,height:900,touch:false,scale:1},{name:'phone-200',width:390,height:844,touch:true,scale:2}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch,isMobile:profile.touch});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});
  const restore=async fixture=>{assert.ok(fixture);await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},{...fixture,textScale:profile.scale});await page.reload({waitUntil:'networkidle'});const button=page.getByRole('button',{name:'읽던 자리에서 이어하기'});if(profile.touch)await button.tap();else await button.click();};
  const saved=()=>page.evaluate(()=>(()=>{const store=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return store?store.slots.find(s=>s.id===store.active).state:JSON.parse(localStorage.getItem('yeowul-save-v1'));})());
  const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&Array.from(document.querySelectorAll('.tool-dialog,.tool-body')).every(el=>el.scrollWidth<=el.clientWidth+2)),true,`${profile.name}: horizontal overflow`);
  const pass=(group,checks)=>results.push({profile:profile.name,group,status:'pass',checks});
  for(const id of ['D26','D27','Q06','D28','D29','D30']){
   await restore(fixtures[`task-${id}`]);const dialog=page.getByRole('dialog');
   await dialog.getByRole('textbox',{name:'추리 메모',exact:true}).fill(`${id} 읽던 초안`);
   for(const field of await dialog.locator('fieldset.proof-field').all()){const radio=field.locator('input[type=radio]').first();if(await radio.count())await radio.check();}
   if(id==='D30')for(const role of ['meeting','act','coat','copy','responsibility'])await dialog.locator(`#proof-role-${role} textarea`).fill(`${role} 메모 유지`);
   const before=await saved(),nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
   for(const name of ['증거','인물','지도','대화','메모','설정']){await nav.getByRole('button',{name,exact:true}).click();await page.keyboard.press('Escape');await dialog.getByRole('textbox',{name:'추리 메모',exact:true}).waitFor();}
   await dialog.getByRole('button',{name:'해답과 이유',exact:true}).click();await dialog.getByRole('button',{name:'읽던 답안으로 돌아가기'}).click();
   await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();
   assert.deepEqual((await saved()).investigation.drafts[id],before.investigation.drafts[id]);assert.equal((await saved()).points,6);
   for(let n=0;n<5;n++){await page.keyboard.press('Tab');assert.equal(await dialog.evaluate(el=>el.contains(document.activeElement)),true);}
   await noOverflow();if(id==='D28'){await dialog.locator('fieldset.proof-field').first().scrollIntoViewIfNeeded();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-interval-draft.png`,fullPage:true});}
   pass(id,['six tools and H4','exact draft restore','keyboard containment','no point loss or overflow']);
  }
  for(const id of ['E48','E49','E50','E51','E52']){
   await restore(fixtures[`acquire-${id}`]);const dialog=page.getByRole('dialog');await dialog.locator(`.evidence-${id}`).waitFor();await noOverflow();
   await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-${id}.png`,fullPage:true});
   if(id==='E49'){assert.equal((await saved()).evidence.includes('E50'),false);assert.match(await dialog.locator('.readable-original').innerText(),/20:14/);assert.match(await dialog.locator('.readable-original').innerText(),/20:24/);}
   if(id==='E48')assert.equal((await saved()).evidence.includes('E51'),false);
   if(id==='E51'){assert.match(await dialog.locator('.copy-overlay').innerText(),/20:07/);assert.match(await dialog.locator('.copy-overlay').innerText(),/−7분/);assert.equal((await saved()).evidence.includes('E52'),false);}
   if(id==='E52')assert.equal((await saved()).investigation.knowledge.includes('KQ06'),false);
   await dialog.getByRole('button',{name:'확인했어요',exact:true}).click();assert.equal((await saved()).acknowledged.filter(e=>e===id).length,1);
  }
  pass('evidence',['five immediate acquisition details','E49 before E50','E48 before E51','E52 only in Q06 before K','both time fields and privacy mask']);
  for(const [key,readable] of [['event-S_CH06_01_0001',false],['hub-ch6-unfold',true]]){
   await restore(fixtures[key]);await page.getByRole('navigation',{name:'조사 도구',exact:true}).getByRole('button',{name:'증거',exact:true}).click();await page.locator('#evidence-E30').click();
   assert.equal(await page.getByRole('dialog').locator('.readable-original').count(),Number(readable));assert.equal(await page.getByRole('dialog').locator('.bound-original').count(),Number(!readable));
  }
  pass('same original',['E30 unreadable before actual opening','E30 readable afterward with historical record retained']);
  await restore(fixtures['event-S_CH06_01_0001']);assert.match(await page.locator('.dialogue-label').innerText(),/보관 창고에서 온 전화/);assert.equal(await page.locator('.dialogue-portrait').count(),0);assert.match(await page.locator('.place-strip').innerText(),/읍내 게스트하우스/);
  await page.getByRole('button',{name:'보존된 원본을 확인할 다음 단계'}).click();await page.getByRole('dialog').getByRole('button',{name:'해답과 이유',exact:true}).click();assert.equal((await saved()).investigation.hintId,'S_H_V06_0011');await page.keyboard.press('Escape');
  await restore(fixtures['event-S_CH06_01_0014']);assert.equal(await page.locator('.dialogue-label').innerText(),'목백로');
  await restore(fixtures['event-C_CH06_01:n0018']);assert.equal(await page.locator('.companion-portrait').count(),0);
  await restore(fixtures['hub-ch6-early-machine']);assert.equal(await page.locator('.imprint-test').count(),1);await page.locator('.choice-list button').first().click();await page.keyboard.press('Escape');assert.match(await page.locator('.place-strip').innerText(),/호숫가 보관 창고/);assert.equal(await page.locator('.imprint-test').count(),0);assert.equal(await page.locator('.readable-original').count(),1);
  await restore(fixtures['hub-ch6-bands']);assert.equal(await page.locator('.observation-bands').count(),1);await noOverflow();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-bands.png`,fullPage:true});
  pass('physical progression',['remote then present P09','travel hint without readable values','explicit child handoff','D26 returns from early machine to original','scaled interval bands']);
  for(const order of ['chronology_first','concealment_first']){
   const f=structuredClone(fixtures['task-D30']);f.investigation.drafts.D30=structuredClone(fixtures[`ending-${order}-false-false-false`].investigation.drafts.D30);
   await restore(f);const dialog=page.getByRole('dialog');
   await dialog.getByRole('button',{name:'해답과 이유',exact:true}).click();assert.equal((await saved()).investigation.hintId,`S_H_D30_${order==='concealment_first'?'0042':'0041'}`);await dialog.getByRole('button',{name:'읽던 답안으로 돌아가기'}).click();
   await dialog.getByRole('button',{name:'확정 제출',exact:true}).click();assert.equal((await saved()).investigation.task.result.kind,'success');
   for(let n=0;n<40;n++){const s=await saved();if(s.investigation.knowledge.includes('K30'))break;assert.equal(s.investigation.task.result.route,order);await dialog.getByRole('button',{name:'대화 계속',exact:true}).click();}
   const s=await saved();assert.equal(s.investigation.knowledge.includes('K30'),true);assert.equal(s.log.some(l=>l.nodeId==='S_D30_0161'),order==='concealment_first');assert.equal(s.log.some(l=>l.nodeId==='S_D30_0101'),order==='chronology_first');
   pass(order,['stored order selects exact H4','actual selected spoken sequence only','K30 after objections and conclusion']);
  }
  await restore(fixtures['role-error-copy']);const dialog=page.getByRole('dialog'),card=dialog.locator('#proof-role-copy');
  await card.getByRole('button',{name:/근거 고르기/}).click();await card.getByRole('button',{name:/근거 고르기/}).click();
  await card.locator('.role-source-list').evaluate(el=>el.scrollTop=330);await page.waitForTimeout(100);
  const before=await saved();assert.ok(before.investigation.drafts.D30.sourceScroll>0);
  await card.getByRole('button',{name:/내용 보기/}).first().click();await dialog.locator('.evidence-detail').waitFor();await page.keyboard.press('Escape');
  assert.ok(Math.abs(await card.locator('.role-source-list').evaluate(el=>el.scrollTop)-before.investigation.drafts.D30.sourceScroll)<3);
  await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();assert.deepEqual((await saved()).investigation.drafts.D30,before.investigation.drafts.D30);
  await dialog.getByRole('button',{name:'확정 제출',exact:true}).click();assert.equal((await saved()).points,4);await dialog.getByRole('button',{name:'답안으로 돌아가기',exact:true}).click();
  await dialog.getByRole('button',{name:/다시 살필 역할로 이동/}).click();assert.equal(await page.evaluate(()=>document.activeElement.id),'proof-role-copy');
  const heading=await card.locator('h4').boundingBox(),body=await dialog.locator('.tool-body').boundingBox();assert.ok(heading.y>=body.y+(profile.touch?0:60)&&heading.y+heading.height<=body.y+body.height,'failed role heading remains visible below point strip');
  await noOverflow();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-copy-role.png`,fullPage:true});
  assert.deepEqual((await saved()).investigation.drafts.D30,before.investigation.drafts.D30);
  for(let n=0;n<2;n++){await dialog.getByRole('button',{name:'확정 제출',exact:true}).click();await dialog.getByRole('button',{name:'답안으로 돌아가기',exact:true}).click();}
  assert.equal((await saved()).points,0);assert.equal(await dialog.getByRole('button',{name:'확정 제출',exact:true}).isDisabled(),true);
  await card.locator('textarea').fill('여유가 없어도 고칠 수 있는 메모');await dialog.getByRole('button',{name:/여유 4로 회복/}).click();assert.equal((await saved()).points,4);
  pass('five role correction',['role-specific error focus','other cards and order preserved','source list scroll survives detail and reload','once-only costs to zero','free editing at zero and recovery']);
  await restore(fixtures['ending-concealment_first-true-true-true']);assert.equal((await saved()).investigation.knowledge.length,36);assert.equal((await saved()).evidence.length,52);assert.match(await page.locator('.place-strip').innerText(),/휴게실/);
  await page.getByRole('navigation',{name:'조사 도구',exact:true}).getByRole('button',{name:'인물',exact:true}).click();await dialog.locator('#person-P09').click();await dialog.getByRole('button',{name:'이후 복사 감독 범위 정정 보기'}).click();await dialog.locator('.evidence-E52').waitFor();
  assert.deepEqual(errors,[]);pass('aftermath',['36 core tasks and 52 evidence','three optional scenes and child reunion','Q06 correction link','no page errors']);
  await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
