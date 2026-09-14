import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {nameSetup,systems,r,initialState,isSave,revisits,saveStore} from './runtime-harness.mjs';
const fixtures=JSON.parse(readFileSync('../game-plan/validation/runtime-ep-fixtures.json','utf8'));
test('optional name confirmation retains blanks, overlong text and exact trimmed Unicode characters',()=>{
 const {initialNameSetup:init,nameReducer:n}=nameSetup;let s=n(init,{type:'manual'});
 for(const value of ['   ','가'.repeat(21)]){s=n(s,{type:'edit',value});s=n(s,{type:'check'});assert.equal(s.phase,'editing');assert.equal(s.draft,value);assert.ok(nameSetup.validNameSetup(s));}
 s=n(s,{type:'edit',value:'  나 여백  '});s=n(s,{type:'check'});assert.equal(s.confirmed,'나 여백');assert.equal(s.phase,'confirm');assert.ok(s.lines.includes('0051'));
 s=n(s,{type:'back'});assert.equal(s.draft,'  나 여백  ');s=n(n(s,{type:'check'}),{type:'confirm'});assert.equal(s.phase,'ready');
 const memory=new Map(),storage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v)};saveStore.saveNameSetup(storage,s);assert.deepEqual(saveStore.readNameSetup(storage),s);
 const game=r(initialState,{type:'start',name:s.confirmed,setupLines:s.heard.map(id=>`S_SYS_04_${id}`)});assert.ok(isSave(game));assert.equal(game.playerName,'나 여백');assert.ok(game.log.some(l=>l.nodeId==='S_SYS_04_0024'));assert.deepEqual(game.met,['P00','P01']);
});
test('zero boundary never summons an absent officer and repeat recovery uses its own source',()=>{
 const original=fixtures['task-D01'];let s={...original,points:0};assert.ok(systems.recoveryLines(s).some(n=>n.speaker==='P01'));
 // D26 is an adult custodian/conservator task; presence follows its actual setup.
 const adult={...fixtures['task-D26'],points:0};const selected=systems.recoveryLines(adult);assert.ok(selected[0].id==='S_SYS_01_0001');
 const neither={...fixtures['task-D11'],points:0};assert.deepEqual(systems.recoveryLines(neither).map(n=>n.id),['S_SYS_01_0001']);
 s=r(s,{type:'recover'});s={...s,points:0};assert.equal(systems.recoveryLines(s)[0].id,'S_SYS_01_0041');
});
test('voluntary rest and repeated rest preserve all resources and suspended questions',()=>{
 let original=r(fixtures['task-D15'],{type:'viewClose'});
 // D15's table is the lounge, with K10 established and K15 still pending.
 const option=revisits.currentRevisits(original).find(v=>v.id==='rest-2');assert.ok(option);
 let s=r(original,{type:'revisit',id:option.id});for(let n=0;n<20&&s.revisit;n++){assert.ok(isSave(s));s=r(s,{type:'advance'});}
 assert.equal(s.revisit,undefined);assert.equal(s.points,original.points);assert.deepEqual(s.evidence,original.evidence);assert.deepEqual(s.investigation,original.investigation);
 assert.ok(revisits.currentRevisits(s).some(v=>v.id==='rest-2-repeat'));
 s=r(s,{type:'revisit',id:'rest-2-repeat'});s=r(r(s,{type:'advance'}),{type:'advance'});assert.ok(isSave(s));assert.equal(s.points,original.points);
});
test('volume persists without changing the case and rejects non-finite saves',()=>{
 const original=fixtures['task-D03'],s=r(original,{type:'audioVolume',value:0});assert.ok(isSave(s));assert.equal(s.audioVolume,0);assert.deepEqual(s.investigation,original.investigation);assert.equal(r(s,{type:'audioVolume',value:NaN}),s);assert.equal(isSave({...s,audioVolume:2}),false);
});
