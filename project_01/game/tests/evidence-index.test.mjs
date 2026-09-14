import test from 'node:test';
import assert from 'node:assert/strict';
import {evidenceIndex as index,script,r,initialState,finishScene,chapterOne,fixtures,isSave,restored,saveStore} from './runtime-harness.mjs';
const {evidenceIndex,evidenceRows,evidenceFilterOptions,validEvidenceFilters,defaultEvidenceFilters,relatedEvidence}=index;
const all={evidence:Object.keys(script.evidence),met:Object.keys(index.personNames),playerName:'나[여백]'};
test('all originals have distinct identification and sourced time classifications',()=>{
 assert.deepEqual(Object.keys(evidenceIndex).sort(),Object.keys(script.evidence).sort());
 assert.equal(new Set(Object.values(evidenceIndex).map(m=>m.motif)).size,52);
 for(const m of Object.values(evidenceIndex)){assert.ok(index.evidenceTypes[m.type]);assert.ok(m.places.every(p=>index.placeNames[p]));assert.ok(m.people.every(p=>index.personNames[p]));}
 assert.equal(evidenceIndex.E30.story.minute,null);assert.doesNotMatch(evidenceIndex.E30.story.label+evidenceIndex.E30.motif,/20:14|20:24/);
 assert.equal(evidenceIndex.E46.story.minute,null);assert.match(evidenceIndex.E27.story.label,/공개본 기재/);assert.match(evidenceIndex.E49.story.label,/하단 본장 기재/);
});
test('combined filters use AND, actual originals, stable acquisition and attributed story sorting',()=>{
 const f={...defaultEvidenceFilters,type:'document',person:'P03',place:'L01'};
 assert.deepEqual(evidenceRows(all,'',f),['E35','E37']);
 assert.deepEqual(evidenceRows(all,'', {...defaultEvidenceFilters,sort:'newest'}),[...all.evidence].reverse());
 const story=evidenceRows(all,'',{...defaultEvidenceFilters,sort:'story'});
 assert.ok(story.indexOf('E27')<story.indexOf('E49'));assert.ok(story.indexOf('E30')>story.indexOf('E49'));assert.ok(story.indexOf('E48')<story.indexOf('E02'));
 assert.deepEqual(evidenceRows(all,'  ２０：０７  '),evidenceRows(all,'20:07'));assert.ok(evidenceRows(all,'20:07').includes('E27'));
 assert.deepEqual(evidenceRows(all,'certainly absent string'),[]);
});
test('only held sources and encountered people produce options, relations and accepted filters',()=>{
 const early={...all,evidence:['E01','E02','E03'],met:['P00','P01','P02']};
 assert.deepEqual(evidenceFilterOptions(early).people,early.met);
 assert.deepEqual(evidenceFilterOptions(early).types,['document']);
 for(const patch of [{person:'P03'},{type:'testimony'},{place:'L12'},{sort:'secret'},{extra:true}])assert.equal(validEvidenceFilters({...defaultEvidenceFilters,...patch},early),false);
 assert.equal(validEvidenceFilters(defaultEvidenceFilters,early),true);assert.deepEqual(evidenceRows(early,'20:14'),[]);
 assert.deepEqual(relatedEvidence('E30',['E27','E30']),['E27']);assert.ok(!relatedEvidence('E30',['E27','E30']).includes('E49'));
});
test('filter view persists through source tools and legacy save import without changing an answer',()=>{
 chapterOne(false,'environment_first');let s=fixtures['task-D01'];assert.ok(s);
 s=r(s,{type:'draft',id:'D01',draft:{evidence:['E03'],fields:{x6:'east'},note:'창과 문부터 확인'}});
 const before=structuredClone(s.investigation),points=s.points;
 s=r(s,{type:'view',tool:'evidence'});const filters={...defaultEvidenceFilters,type:'document',person:'P02',sort:'story'};
 s=r(s,{type:'viewState',patch:{filters,search:'안내',scroll:212,focus:'evidence-E03'}});const view=structuredClone(s.views.at(-1));
 for(const tool of ['people','map','history','notes','settings']){s=r(s,{type:'view',tool});s=restored(s);s=r(s,{type:'viewBack'});assert.deepEqual(s.views.at(-1),view);}
 assert.deepEqual(s.investigation,before);assert.equal(s.points,points);
 const storage=new Map([['yeowul-save-v1',JSON.stringify(s)]]),api={getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)};
 assert.deepEqual(saveStore.readSaveStore(api).slots[0].state.views.at(-1),view);
 const bad=structuredClone(s);bad.views.at(-1).filters.person='P99';assert.equal(isSave(bad),false);
 assert.equal(r(s,{type:'viewState',patch:{filters:{...filters,person:'P99'}}}),s);
 s=r(s,{type:'view',tool:'people'});assert.equal(r(s,{type:'viewState',patch:{filters}}),s);
});
test('old views without filter properties retain default behavior',()=>{
 let s=finishScene(r(initialState,{type:'start',name:'나여백'}));s=r(s,{type:'view',tool:'evidence'});assert.equal(s.views.at(-1).filters,undefined);assert.ok(isSave(s));assert.deepEqual(evidenceRows(s),s.evidence);
});
