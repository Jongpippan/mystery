import { chromium } from '@playwright/test';
import { readFileSync,mkdirSync,writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ch01-fixtures.json','utf8'));
const out='../game-plan/validation/ch01-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try {
 for(const profile of [{name:'desktop',width:1440,height:900,touch:false,scale:1},{name:'phone',width:390,height:844,touch:true,scale:1},{name:'phone-200',width:390,height:844,touch:true,scale:2}]){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch,isMobile:profile.touch});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});
  const fixture=structuredClone(fixtures.deduction);fixture.textScale=profile.scale;
  await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},fixture);
  await page.reload({waitUntil:'networkidle'});
  if(profile.touch)await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).tap();else await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();
  const dialog=page.getByRole('dialog');await dialog.waitFor();
  await dialog.locator('input[name="x6"][value="east"]').check();
  await dialog.locator('input[name="x9"][value="west"]').check();
  await dialog.locator('input[name="fixed"][value="boundary"]').check();
  await dialog.getByRole('textbox',{name:'추리 메모'}).fill('창과 문은 고정. 확인하던 답안을 남긴다.');
  const nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
  await nav.getByRole('button',{name:'증거',exact:true}).click();
  await dialog.getByRole('textbox',{name:'증거 검색'}).fill('정지선');
  await dialog.locator('#evidence-E05').click();
  await dialog.getByRole('heading',{name:'두 정지선'}).waitFor();
  await dialog.getByRole('button',{name:'도면 확대',exact:true}).click();
  assert.equal(await dialog.locator('.plan-viewport').evaluate(el=>el.scrollWidth>el.clientWidth),true,'diagram supports zoom with its own scrolling surface');
  await dialog.getByRole('button',{name:'도면 축소',exact:true}).click();
  await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-geometry.png`,fullPage:true});
  await page.keyboard.press('Escape');
  assert.equal(await dialog.getByRole('textbox',{name:'증거 검색'}).inputValue(),'정지선');
  assert.equal(await page.evaluate(()=>document.activeElement?.id),'evidence-E05','Esc restores exact list row focus');
  await nav.getByRole('button',{name:'인물',exact:true}).click();
  await dialog.locator('#person-P02').click();
  await dialog.getByRole('button',{name:'이후 정정된 목격 보기'}).click();
  await dialog.getByRole('heading',{name:'창가 목격 정정'}).waitFor();
  await page.keyboard.press('Escape');
  await dialog.getByRole('button',{name:'바퀴에게 먼저 말하는 사람 · 대화 원문'}).first().click();
  await dialog.getByRole('heading',{name:'바퀴에게 먼저 말하는 사람'}).waitFor();
  await nav.getByRole('button',{name:'지도',exact:true}).click();
  await dialog.getByRole('heading',{name:'여울관 안내도'}).waitFor();
  await nav.getByRole('button',{name:'메모',exact:true}).click();
  await dialog.getByRole('textbox',{name:'내 메모'}).fill('도구를 보아도 여유는 그대로');
  await nav.getByRole('button',{name:'추리',exact:true}).click();
  assert.equal(await dialog.locator('input[name="x6"][value="east"]').isChecked(),true);
  assert.equal(await dialog.getByRole('textbox',{name:'추리 메모'}).inputValue(),'창과 문은 고정. 확인하던 답안을 남긴다.');
  await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();
  assert.equal(await dialog.locator('input[name="x9"][value="west"]').isChecked(),true);
  await dialog.getByRole('button',{name:'해답과 이유',exact:true}).click();
  await dialog.getByRole('button',{name:'읽던 답안으로 돌아가기'}).click();
  for(let n=0;n<8;n++){await page.keyboard.press('Tab');assert.equal(await dialog.evaluate(el=>el.contains(document.activeElement)),true,'keyboard focus remains in the active dialog');}
  const noOverflow=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&Array.from(document.querySelectorAll('.tool-dialog,.tool-body')).every(el=>el.scrollWidth<=el.clientWidth+2));
  assert.equal(noOverflow,true,`${profile.name} must have no horizontal overflow`);
  await dialog.locator('input[name="x6"][value="east"]').scrollIntoViewIfNeeded();
  await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-draft.png`,fullPage:true});
  const saved=await page.evaluate(()=>(()=>{const store=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return store?store.slots.find(s=>s.id===store.active).state:JSON.parse(localStorage.getItem('yeowul-save-v1'));})());
  assert.equal(saved.points,6);assert.equal(saved.notes,'도구를 보아도 여유는 그대로');
  assert.equal(saved.investigation.drafts.D01.fields.x6,'east');
  assert.deepEqual(errors,[]);
  results.push({profile:profile.name,checks:['draft editing','evidence filter/detail/Esc/focus','person/correction/history/map/notes round trip','reload exact draft','hint return','no horizontal overflow','points unchanged','no browser errors'],status:'pass'});
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();
 await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});
 const restore=async fixture=>{await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},fixture);await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();};
 await restore(fixtures.correctionAcquisition);
 let dialog=page.getByRole('dialog');await dialog.getByRole('heading',{name:'창가 목격 정정'}).waitFor();
 await page.screenshot({animations:'disabled',path:`${out}/correction-acquisition.png`,fullPage:true});
 await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기'}).click();
 await dialog.getByRole('heading',{name:'창가 목격 정정'}).waitFor();await dialog.getByRole('button',{name:'확인했어요'}).click();
 await dialog.getByRole('heading',{name:'추리하기',exact:true}).waitFor();
 let saved=await page.evaluate(()=>(()=>{const store=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return store?store.slots.find(s=>s.id===store.active).state:JSON.parse(localStorage.getItem('yeowul-save-v1'));})());assert.equal(saved.acknowledged.filter(e=>e==='E08').length,1);
 results.push({profile:'correction acquisition',status:'pass',checks:['immediate actual detail inside Q01','reload unacknowledged E08','one acknowledgment','same Q01 response return']});
 await restore(fixtures.zero);dialog=page.getByRole('dialog');assert.equal(await dialog.getByRole('button',{name:'확정 제출',exact:true}).isDisabled(),true);
 await dialog.getByRole('textbox',{name:'추리 메모'}).fill('0에서도 수정 가능한 답안');
 await dialog.getByRole('button',{name:'잠깐 정리하고 이어가기 · 여유 4로 회복'}).click();
 assert.equal(await dialog.getByRole('button',{name:'확정 제출',exact:true}).isEnabled(),true);
 saved=await page.evaluate(()=>(()=>{const store=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return store?store.slots.find(s=>s.id===store.active).state:JSON.parse(localStorage.getItem('yeowul-save-v1'));})());assert.equal(saved.points,4);assert.equal(saved.investigation.drafts.D01.note,'0에서도 수정 가능한 답안');
 results.push({profile:'zero recovery',status:'pass',checks:['submit blocked at zero','draft editable','recovery restores four without clearing draft']});
 for(const id of ['D02','Q01','D03','D04','D05']){
  await restore(fixtures[`task-${id}`]);dialog=page.getByRole('dialog');await dialog.getByRole('textbox',{name:'추리 메모'}).fill(`${id} 도구 왕복 기록`);
  const nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
  for(const name of ['증거','인물','지도','대화','메모','설정']){await nav.getByRole('button',{name,exact:true}).click();await page.keyboard.press('Escape');await dialog.getByRole('textbox',{name:'추리 메모'}).waitFor();}
  assert.equal(await dialog.getByRole('textbox',{name:'추리 메모'}).inputValue(),`${id} 도구 왕복 기록`);
  results.push({profile:`${id} tools`,status:'pass',checks:['six tools accessible','Esc returns to same draft']});
 }
 for(const [key,fixture] of Object.entries(fixtures).filter(([key])=>key.startsWith('wall-'))){await restore(fixture);await page.screenshot({animations:'disabled',path:`${out}/${key}.png`,fullPage:true});const expected=key.startsWith('wall-6')?'6m':'9m';assert.ok((await page.locator('.event-plan svg').getAttribute('aria-label')).includes(expected));}
 results.push({profile:'wall event',status:'pass',checks:['saved before/during/after positions render x9/x6/x9','experiment label remains visible']});
 await context.close();
 writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
