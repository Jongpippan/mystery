import assert from 'node:assert/strict';
import test from 'node:test';
import {writeFileSync} from 'node:fs';
import {r,initialState,currentNode,isSave,investigationOptions,script,answers,fixtures,restored,finishScene,solve,chapterOne,presentation,epilogue,saveStore} from './runtime-harness.mjs';
function prior(first,sound,apology,exhibit){
 let s=chapterOne(true,sound,{B_PR_01:first});
 answers.D30={...answers.D30,fields:{...answers.D30.fields,order:first==='help_queue'?'chronology_first':'concealment_first'}};
 for(let n=0;n<180;n++){
  s=finishScene(s,{B_PLAYBACK_RESPONSE:apology,B_EXHIBIT:exhibit});
  if(s.investigation.stage==='ch6-aftermath')return s;
  const options=investigationOptions(s);const o=(exhibit&&!s.choices.B_EXHIBIT?options.find(o=>o.id==='ch4-personal2'):null)??options.find(o=>!o.id.includes('personal'));
  assert.ok(o,`prior deadlock ${s.investigation.stage}`);s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);
 }assert.fail('prior loop');
}
for(const first of ['help_queue','protect_papers'])for(const priorSound of ['environment_first','ask_voice_later'])for(const apology of ['accept_apology','need_time'])for(const earlierExhibit of [null,'attributed_accounts','joint_annotations']){
 const start=prior(first,priorSound,apology,earlierExhibit);
 for(const sound of ['consented_voices','environment_only'])for(const staffFirst of [false,true])test(`EP ${first}/${priorSound}/${apology}/${earlierExhibit}; ${sound}; staff first=${staffFirst}`,()=>{
  const exhibit=earlierExhibit??(staffFirst?'joint_annotations':'attributed_accounts');let s=r(start,{type:'visit',stage:'ep-handoff'});
  for(let n=0;n<20;n++){
   s=finishScene(s,{B_EXHIBIT:exhibit,B_SOUND:sound});fixtures[`hub-${s.investigation.stage}`]??=s;
   if(s.investigation.stage==='ep-archive')break;
   const opts=investigationOptions(s),o=(staffFirst?opts.find(o=>o.id==='ep-staff'):opts.find(o=>o.id==='ep-account'))??opts[0];assert.ok(o);s=r(s,{type:'visit',stage:o.id});
  }
  assert.ok(epilogue.archiveComplete(s));assert.deepEqual(s.evidence,start.evidence);assert.deepEqual(s.investigation.knowledge,start.investigation.knowledge);assert.equal(s.points,6);
  assert.equal(s.choices.B_SOUND,sound);assert.equal(s.choices.B_EXHIBIT,exhibit);assert.equal(s.choices.B_PLAYBACK_RESPONSE,apology);assert.equal(s.choices.B_PR_01,first);assert.equal(s.choices.B_PR_02,priorSound);
  assert.deepEqual(s.investigation.drafts.D30,start.investigation.drafts.D30);assert.equal(s.investigation.completed.filter(k=>k.startsWith('ep-')).length,6);
  const saw=id=>s.log.some(l=>l.nodeId===id);
  assert.equal(saw('S_EP_03_0011'),earlierExhibit===null);assert.equal(saw('S_EP_03_0021'),earlierExhibit===null&&exhibit==='attributed_accounts');assert.equal(saw('S_EP_03_0031'),earlierExhibit===null&&exhibit==='joint_annotations');
  assert.equal(saw('S_EP_03_0041'),earlierExhibit==='attributed_accounts');assert.equal(saw('S_EP_03_0051'),earlierExhibit==='joint_annotations');
  assert.equal(saw('S_EP_04_0104'),sound==='consented_voices');assert.equal(saw('S_EP_04_0106'),sound==='consented_voices');assert.equal(saw('S_EP_04_0302'),sound==='consented_voices');assert.equal(saw('S_EP_04_0201'),sound==='environment_only');
  for(const id of ['S_EP_05_0061','S_EP_05_0062','S_EP_05_0063','S_EP_05_0064','C_EP_05:n0021','S_EP_06_0011','S_EP_06_0012','S_EP_06_0013','S_EP_06_0014'])assert.equal(saw(id),true);
  assert.equal(saw('S_EP_05_0041'),sound==='consented_voices');assert.equal(saw('S_EP_05_0051'),sound==='environment_only');
  const recaps=s.log.filter(l=>l.sceneId==='C_EP_06').map(l=>script.scenes.C_EP_06.nodes.find(n=>n.id===l.nodeId)).filter(n=>n.section[0].startsWith('Branch recap'));
  assert.equal(recaps.length,5);assert.deepEqual(recaps.map(n=>n.id),epilogue.recapNodes(s.choices).map(n=>n.id));
  assert.equal(saw('C_EP_06:n0011'),priorSound==='ask_voice_later'&&sound==='consented_voices');assert.equal(saw('C_EP_06:n0012'),priorSound==='ask_voice_later'&&sound==='environment_only');
  assert.equal(saw('S_EP_04_0031'),apology==='accept_apology');assert.equal(saw('S_EP_04_0041'),apology==='need_time');assert.equal(presentation(s).companion,true);
  assert.deepEqual(investigationOptions(s),[]);s=restored(s);assert.equal(r(s,{type:'visit',stage:'ep-sound'}),s);
  fixtures[`ending-${first}-${priorSound}-${apology}-${earlierExhibit}-${sound}-${staffFirst}`]=s;
 });
}

test('EP late-choice entry stays frozen; all recording consent and refusal precede the actual captured interval',()=>{
 let s=fixtures['choice-B_EXHIBIT'];
 // CH04's choice fixture is superseded by the actually visited late EP choice.
 assert.equal(s.investigation.stage,'ep-staff');const before=s.cursor;s=r(s,{type:'choose',choice:'B_EXHIBIT',value:'joint_annotations'});assert.equal(s.cursor,before+1);assert.equal(currentNode(s).id,'S_EP_03_0031');s=restored(s);assert.equal(currentNode(s).id,'S_EP_03_0031');
 const event=id=>fixtures[`event-${id}`];
 for(const id of ['S_EP_04_0103','S_EP_04_0104','S_EP_04_0106','S_EP_04_0108','S_EP_04_0301'])assert.equal(epilogue.recordingState(event(id)),'off');
 for(const id of ['C_EP_04:n0022','S_EP_04_0302','C_EP_04:n0031'])assert.equal(epilogue.recordingState(event(id)),'recording');
 for(const id of ['C_EP_04:n0024','S_EP_04_0303','C_EP_04:n0032'])assert.equal(epilogue.recordingState(event(id)),'complete');
 for(const stage of ['ep-handoff','ep-account','ep-staff'])assert.equal(presentation(fixtures[`hub-${stage}`]).companion,false);
});

test('Archive tools and replay positions retain completed source-only state through serialization',()=>{
 const end=fixtures['hub-ep-archive'];
 for(const detail of [null,'archive:proofs','archive:corrections','archive:recap','archive:credits']){let s=r(end,{type:'view',tool:'archive'});s=r(s,{type:'viewState',patch:{detail,scroll:350}});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.log,end.log);assert.deepEqual(s.investigation,end.investigation);}
 let s=r(end,{type:'view',tool:'history'});s=r(s,{type:'viewState',patch:{detail:'C_EP_04',replayIndex:5}});s=restored(s);assert.equal(s.views.at(-1).replayIndex,5);assert.deepEqual(s.log,end.log);
 const bad=structuredClone(s);bad.views.at(-1).replayIndex=-1;assert.equal(isSave(bad),false);
 for(const key of ['stageChoices','choices']){const bad=structuredClone(end);if(key==='stageChoices')delete bad.investigation.stageChoices;else bad.choices.B_SOUND='unconsented';assert.equal(isSave(bad),false);}
});

test('Save slots migrate old saves, retain endings on restart, switch active play and survive failed storage writes',()=>{
 const end=fixtures['hub-ep-archive'],data=new Map([['yeowul-save-v1',JSON.stringify(end)]]),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
 assert.equal(saveStore.readSaveStore(storage).slots[0].state.sceneId,'C_EP_06');
 saveStore.saveCurrent(storage,end);const legacy=data.get('yeowul-save-v1');
 saveStore.createSaveSlot(storage,'replay',end);let fresh=finishScene(r(initialState,{type:'start',name:'다시 읽는 여백'}));saveStore.saveCurrent(storage,fresh);
 const store=saveStore.readSaveStore(storage);assert.equal(store.slots.length,2);assert.equal(store.active,'replay');assert.deepEqual(store.slots[0].state.log,end.log);assert.deepEqual(store.slots[0].state.choices,end.choices);assert.deepEqual(store.slots[0].state.investigation.drafts.D30,end.investigation.drafts.D30);
 assert.equal(saveStore.activateSaveSlot(storage,'first',fresh).sceneId,'C_EP_06');assert.equal(saveStore.readSaveStore(storage).active,'first');assert.equal(data.get('yeowul-save-v1'),legacy);
 const before=data.get(saveStore.SAVE_STORE_KEY),broken={getItem:storage.getItem,setItem:()=>{throw Error('quota');}};assert.throws(()=>saveStore.createSaveSlot(broken,'another',end));assert.equal(data.get(saveStore.SAVE_STORE_KEY),before);
 data.set(saveStore.SAVE_STORE_KEY,'{"version":2}');assert.throws(()=>saveStore.readSaveStore(storage));
});
test.after(()=>{if(process.env.YEOWUL_WRITE_FIXTURES==='1')writeFileSync('../game-plan/validation/runtime-ep-fixtures.json',JSON.stringify(fixtures,null,2));});
