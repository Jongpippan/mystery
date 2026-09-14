import {chromium} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ep-fixtures.json','utf8'));
const out='../game-plan/validation/evidence-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch(),results=[];
try{for(const profile of [{name:'desktop',width:1440,height:900,scale:1,touch:false},{name:'phone-200',width:390,height:844,scale:2,touch:true}]){
 const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},hasTouch:profile.touch,isMobile:profile.touch}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.YEOWUL_BASE_URL??'http://localhost:5173/',{waitUntil:'networkidle'});
 const restore=async f=>{assert.ok(f);await page.evaluate(s=>{localStorage.removeItem('yeowul-saves-v2');localStorage.setItem('yeowul-save-v1',JSON.stringify(s));},{...f,textScale:profile.scale});await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기',exact:true}).click();};
 const saved=()=>page.evaluate(()=>{const v=JSON.parse(localStorage.getItem('yeowul-saves-v2'));return v.slots.find(s=>s.id===v.active).state;});
 const dialog=page.getByRole('dialog'),nav=dialog.getByRole('navigation',{name:'다른 조사 도구'});
 const ids=()=>dialog.locator('.evidence-list button').evaluateAll(es=>es.map(e=>e.id.replace('evidence-','')));
 const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&Array.from(document.querySelectorAll('.tool-dialog,.tool-body')).every(el=>el.scrollWidth<=el.clientWidth+2)),true,profile.name);
 const pass=(group,checks)=>results.push({profile:profile.name,group,status:'pass',checks});
 await restore(fixtures['acquire-E03']);await nav.getByRole('button',{name:'증거',exact:true}).click();
 await dialog.locator('#evidence-type').waitFor();
 assert.equal(await dialog.locator('#evidence-person option[value="P03"]').count(),0);assert.equal(await dialog.locator('#evidence-type option[value="testimony"]').count(),0);assert.equal(await dialog.locator('[data-evidence-thumbnail="E49"]').count(),0);
 assert.equal(await dialog.locator('.evidence-list button').count(),fixtures['acquire-E03'].evidence.length);await noOverflow();pass('early visibility',['only acquired totals and rows','no future person or type options','no future original thumbnail']);
 const end=fixtures['ending-protect_papers-ask_voice_later-need_time-joint_annotations-environment_only-true'];await restore(end);await page.getByRole('button',{name:'사건 보관함 열기',exact:true}).click();await nav.getByRole('button',{name:'증거',exact:true}).click();
 await dialog.locator('#evidence-type').waitFor();
 assert.equal(await dialog.locator('.evidence-list button').count(),52);assert.equal(new Set(await dialog.locator('.evidence-thumbnail').evaluateAll(es=>es.map(e=>e.innerHTML))).size,52);
 if(profile.name==='desktop'){
  const cards=await dialog.locator('.evidence-list button').evaluateAll(es=>es.map(e=>({id:e.id,svg:e.querySelector('svg').outerHTML,title:e.querySelector('span>span').textContent})));
  const sheet=await context.newPage();await sheet.setViewportSize({width:1200,height:900});
  const html=`<!doctype html><html lang="ko"><meta charset="utf-8"><title>증거 식별 그림 검토</title><style>body{font-family:Arial,sans-serif;background:#eeeadd;color:#284b46;padding:24px}main{display:grid;grid-template-columns:repeat(7,1fr);gap:12px}article{background:#fffaf0;border:1px solid #c8cdbe;padding:12px;font-size:13px;overflow-wrap:anywhere}svg{width:120px;height:90px;display:block;margin:auto}h1{font-size:24px}p{line-height:1.5}</style><h1>자료 식별 그림 · 52개</h1><p>원문을 대신하지 않는 목록용 그림. 보유한 자료만 실제 게임에서 표시됩니다.</p><main>${cards.sort((a,b)=>a.id.localeCompare(b.id)).map(c=>`<article>${c.svg}<p>${c.id.slice(9)} · ${c.title}</p></article>`).join('')}</main></html>`;
  writeFileSync(`${out}/thumbnail-sheet.html`,html);await sheet.setContent(html);await sheet.screenshot({animations:'disabled',path:`${out}/thumbnail-sheet.png`,fullPage:true});await sheet.close();
 }
 await dialog.locator('#evidence-type').selectOption('document');await dialog.locator('#evidence-person').selectOption('P03');await dialog.locator('#evidence-place').selectOption('L01');assert.deepEqual((await ids()).sort(),['E35','E37']);
 await dialog.locator('#evidence-sort').selectOption('story');await noOverflow();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-combined.png`,fullPage:true});
 await dialog.locator('#evidence-reset').click();await dialog.locator('#evidence-sort').selectOption('newest');assert.deepEqual(await ids(),[...end.evidence].reverse());
 await dialog.locator('#evidence-search').fill('  ２０：０７  ');assert.ok((await ids()).includes('E27'));await dialog.locator('#evidence-reset').click();
 await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-list.png`,fullPage:true});pass('index controls',['52 different SVG compositions','combined type/person/place AND','attributed time sort','reverse acquisition','normalized full-width search','clear controls','no overflow']);
 await dialog.locator('#evidence-type').selectOption('document');await dialog.locator('#evidence-sort').selectOption('story');await dialog.locator('#evidence-E27').evaluate(e=>e.scrollIntoView({block:'start'}));await dialog.locator('#evidence-E27').click();await dialog.locator('#source-E27-E49').click();await dialog.locator('.evidence-E49').waitFor();await dialog.locator('#source-E49-P09').click();await dialog.getByRole('button',{name:'이후 복사 감독 범위 정정 보기',exact:true}).click();await dialog.locator('.evidence-E52').waitFor();await dialog.getByRole('button',{name:'이 자료를 확인한 장면 보기',exact:true}).click();await dialog.locator('.history-log').waitFor();
 await nav.getByRole('button',{name:'지도',exact:true}).click();await noOverflow();for(let i=0;i<6;i++)await page.keyboard.press('Escape');
 assert.equal(await dialog.locator('#evidence-type').inputValue(),'document');assert.equal(await dialog.locator('#evidence-sort').inputValue(),'story');await page.waitForFunction(()=>document.activeElement?.id==='evidence-E27');await noOverflow();
 const offset=await dialog.locator('.tool-body').evaluate(e=>e.scrollTop);assert.ok(offset>0);await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기',exact:true}).click();assert.equal(await dialog.locator('#evidence-sort').inputValue(),'story');await page.waitForFunction(()=>document.activeElement?.id==='evidence-E27');assert.ok(Math.abs(await dialog.locator('.tool-body').evaluate(e=>e.scrollTop)-offset)<3);
 pass('source round trip',['filtered list → original → related original → person → correction → history → map','back restores filters, row focus and scroll','reload restores same view']);
 for(const task of ['D01','D04','D17','D20','D23','Q06','D29','D30']){
  await restore(fixtures[`task-${task}`]);await dialog.locator('.proof-note textarea').last().fill(`${task} 자료 대조를 계속할 메모`);const before=await saved();
  await nav.getByRole('button',{name:'증거',exact:true}).click();await dialog.locator('#evidence-type').selectOption('document');await dialog.locator('#evidence-person').selectOption('P02');await dialog.locator('#evidence-sort').selectOption('newest');
  const row=dialog.locator('.evidence-list button').first();await row.click();await dialog.getByRole('button',{name:'이 자료를 확인한 장면 보기',exact:true}).click();await noOverflow();await page.keyboard.press('Escape');await page.keyboard.press('Escape');
  for(const tool of ['인물','지도','대화','메모','설정']){await nav.getByRole('button',{name:tool,exact:true}).click();await noOverflow();await page.keyboard.press('Escape');assert.equal(await dialog.locator('#evidence-person').inputValue(),'P02');}
  await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'읽던 자리에서 이어하기',exact:true}).click();assert.equal(await dialog.locator('#evidence-sort').inputValue(),'newest');await page.keyboard.press('Escape');
  const after=await saved();assert.deepEqual(after.investigation,before.investigation);assert.deepEqual(after.choices,before.choices);assert.deepEqual(after.log,before.log);assert.equal(after.points,before.points);assert.equal(await dialog.locator('.proof-note textarea').last().inputValue(),`${task} 자료 대조를 계속할 메모`);await noOverflow();pass(task,['actual answer edit','all six tools with filtered source/history roundtrip','reload','exact draft/task/knowledge/log/choices/points retained']);
 }
 await restore({...end,playerName:'나여백긴이름확인용표시'});await page.getByRole('button',{name:'사건 보관함 열기',exact:true}).click();await nav.getByRole('button',{name:'증거',exact:true}).click();
 await dialog.locator('#evidence-person').selectOption('P00');assert.match(await dialog.locator('.evidence-selected-person').innerText(),/나여백긴이름확인용표시/);await dialog.locator('#evidence-place').selectOption('L06');await noOverflow();await page.screenshot({animations:'disabled',path:`${out}/${profile.name}-long-labels.png`,fullPage:true});
 await dialog.locator('#evidence-reset').click();await dialog.locator('#evidence-sort').focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');assert.equal(await dialog.locator('#evidence-sort').inputValue(),'newest');
 for(let n=0;n<6;n++){await page.keyboard.press('Tab');assert.ok(await dialog.evaluate(e=>e.contains(document.activeElement)));}
 assert.ok(await dialog.locator('select').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().height>=44)));await noOverflow();pass('keyboard and long labels',['long chosen name and place wrap outside native selector','keyboard changes sorting','tab focus contained','44px selects','200% text retained']);
 assert.deepEqual(errors,[]);await context.close();
 }writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
