import test from 'node:test';
import assert from 'node:assert/strict';
import {site,initialState} from './runtime-harness.mjs';

test('initial map does not disclose author-only service locations',()=>{
  assert.deepEqual(site.knownPlaces(initialState),[]);
  const s={...initialState,evidence:['E03']};
  assert.deepEqual(site.knownPlaces(s),['L01','L02','L03','L07']);
  assert.deepEqual(site.knownPlaces({...s,evidence:['E03','E30']}),site.knownPlaces(s));
});
test('legacy logs are not assigned invented location knowledge',()=>{
  const s={...initialState,log:[{sceneId:'C_CH03_05',nodeId:'S_CH03_05_0012'}]};
  assert.deepEqual(site.knownPlaces(s),[]);
  assert.deepEqual(site.knownPlaces({...s,evidence:['E09']}),['L08']);
});
test('separate guest/service ports and booth doorway remain distinct',()=>{
  const route=id=>site.siteRoutes.find(r=>r.id===id);
  assert.notEqual(route('R05').port,route('R06').port);
  assert.equal(route('R04').from,'L03');assert.equal(route('R04').to,'L07');
  assert.equal(site.siteRoutes.some(r=>[r.from,r.to].includes('L07')&&[r.from,r.to].includes('L09')),false);
  assert.equal(route('R09').to,'L10');
});
