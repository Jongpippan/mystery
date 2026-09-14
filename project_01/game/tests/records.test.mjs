import test from 'node:test';
import assert from 'node:assert/strict';
import {recordIndex as records,r,initialState,script,chapterOne,fixtures,restored,isSave,finishScene,throughChapterThree} from './runtime-harness.mjs';
const {recordNode,recordContext,personRecord,profileSources,conversations,historyFilterOptions,validHistoryFilters,defaultHistoryFilters}=records;
test('profile excerpts reference accepted source kinds and do not grant unheard introductions or relations',()=>{
 for(const f of profileSources)for(const id of f.nodes){const n=Object.values(script.scenes).flatMap(c=>c.nodes).find(n=>n.id===id);assert.ok(n,id);assert.equal(n.kind,f.kind==='observed'?'direction':'speech');}
 let s=r(initialState,{type:'start',name:'나여백'});assert.equal(personRecord(s,'P03'),null);assert.equal(personRecord(s,'P01').introduction,'소개를 아직 듣지 않음');assert.equal(personRecord(s,'P01').facts.some(f=>f.kind==='relation'),false);
 chapterOne(false,'environment_first');s=fixtures['task-D01'];assert.equal(personRecord(s,'P04').introduction,'건물 수리 담당');assert.equal(personRecord(s,'P04').facts.some(f=>f.people.includes('P06')),false);assert.equal(personRecord(s,'P06'),null);
});
test('origins capture actual presented place and remain stable across restored branch traversal',()=>{
 chapterOne(false,'environment_first');const s=fixtures['task-D01'];assert.ok(s.log.every(l=>l.origin));
 assert.match(s.log.find(l=>l.nodeId==='S_PR_10_0001').origin.place,/현관/);assert.match(s.log.find(l=>l.nodeId==='S_PR_10_0004').origin.place,/적재/);
 assert.match(s.log.find(l=>l.nodeId==='S_PR_07_0001').origin.place,/동쪽 기록/);assert.match(s.log.find(l=>l.nodeId==='S_PR_16_0001').origin.time,/10월 21일/);
 assert.deepEqual(restored(s).log,s.log);
 const old=structuredClone(s);old.log.forEach(l=>delete l.origin);assert.ok(isSave(old));assert.match(recordContext(old.log[0]).place,/미기록/);
 const bad=structuredClone(s);bad.log[0].origin.mode='teleport';assert.equal(isSave(bad),false);
});
test('speaker output does not become direct contact or reveal playback before correction',()=>{
 chapterOne(false,'environment_first');const s=fixtures['task-D01'],p=personRecord(s,'P08');
 assert.equal(p.lastDirect.sceneId,'C_PR_07');const output=s.log.find(l=>l.nodeId==='S_PR_14_0006');assert.equal(recordContext(output).mode,'output');assert.doesNotMatch(records.modeNames.output,/재생|녹음/);
 assert.equal(records.sourceMode(script.utterances.S_CH06_01_0001),'remote');assert.equal(records.sourceMode(script.utterances.S_CH06_01_0014),'direct');
 const c=conversations(s).find(c=>c.id==='C_PR_14');assert.ok(c.participants.includes('P08'));assert.equal(c.entries.filter(l=>recordNode(l).speaker==='P08'&&recordContext(l).mode==='direct').length,0);
});
test('corrections preserve before/after and original locations only after heard success',()=>{
 chapterOne(false,'environment_first');const before=fixtures['task-Q01'];assert.equal(personRecord(before,'P02').corrections.find(c=>c.id==='Q01').corrected,false);
 const after=fixtures['task-D03'];assert.equal(personRecord(after,'P02').corrections.find(c=>c.id==='Q01').corrected,true);assert.ok(after.log.some(l=>l.nodeId==='S_Q01_v1'));assert.ok(after.log.some(l=>l.nodeId==='S_Q01_v2'));
 assert.deepEqual(personRecord(before,'P02').related.filter(e=>e==='E08'),[]);
});
test('history combines actual group/speaker/keyword, excludes unchosen and future groups, and saves filters',()=>{
 let s=finishScene(r(initialState,{type:'start',name:'나긴이름'}));const options=historyFilterOptions(s);assert.equal(options.groups.includes('ending'),false);assert.equal(options.speakers.includes('P06'),false);
 const f={group:'companion',speaker:'P01'};assert.equal(validHistoryFilters(f,s),true);const cs=conversations(s,'이모',f);assert.ok(cs.length);assert.ok(cs.every(c=>c.group==='companion'&&c.participants.includes('P01')));
 assert.equal(validHistoryFilters({group:'ending',speaker:''},s),false);assert.equal(validHistoryFilters({...defaultHistoryFilters,speaker:'P06'},s),false);
 assert.ok(conversations(s,'나긴이름').length);assert.deepEqual(conversations(s,'무조건 없는 문자열'),[]);
 s=r(s,{type:'view',tool:'history'});s=r(s,{type:'viewState',patch:{historyFilters:f,search:'이모',scroll:120,focus:'history-C_PR_04'}});const view=structuredClone(s.views.at(-1));s=r(s,{type:'view',tool:'map'});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.views.at(-1),view);
 assert.equal(r(s,{type:'viewState',patch:{historyFilters:{group:'ending',speaker:''}}}),s);
 s=r(s,{type:'view',tool:'people'});s=r(s,{type:'viewState',patch:{detail:'P01',expanded:['C_PR_04']}});assert.deepEqual(restored(s).views.at(-1).expanded,['C_PR_04']);assert.equal(r(s,{type:'viewState',patch:{expanded:['C_EP_06']}}),s);
});
test('remote child/host call keeps their last direct contact out of adult cargo location',()=>{
 throughChapterThree();const s=fixtures['task-D13'],child=personRecord(s,'P01');
 assert.equal(recordContext(s.log.find(l=>l.nodeId==='S_CH03_05_0012')).mode,'remote');assert.notEqual(child.lastDirect.sceneId,'C_CH03_05');assert.doesNotMatch(recordContext(child.lastDirect).place,/保管|보관 창고/);
 const relation=personRecord(s,'P04').facts.find(f=>f.kind==='relation'&&f.people.includes('P06'));assert.ok(relation);assert.equal(relation.entries[0].nodeId,'S_CH03_01_0005');
});
