import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {script} from './runtime-harness.mjs';

test('compact runtime preserves every accepted scene, spoken line and evidence original',()=>{
 const full=JSON.parse(readFileSync('content/screenplay.generated.json','utf8'));
 assert.deepEqual(Object.keys(script.scenes),Object.keys(full.scenes));
 assert.deepEqual(script.sources,full.sources);assert.deepEqual(script.evidence,full.evidence);
 for(const [id,scene] of Object.entries(full.scenes))assert.deepEqual(script.scenes[id].nodes,scene.nodes,id);
 assert.deepEqual(Object.keys(script.utterances).sort(),Object.keys(full.utterances).sort());
 for(const [id,line] of Object.entries(full.utterances))for(const key of ['text','speaker','label','scene'])assert.equal(script.utterances[id][key],line[key],`${id}:${key}`);
});
const pcm=file=>{
 const b=readFileSync(`public/audio/${file}`);assert.equal(b.toString('ascii',0,4),'RIFF');
 assert.equal(b.readUInt16LE(20),1);assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),22050);assert.equal(b.readUInt16LE(34),16);
 assert.equal(b.readUInt32LE(40),b.length-44);return Array.from({length:(b.length-44)/2},(_,n)=>b.readInt16LE(44+n*2)/32768);
};
test('playable audio retains shared speech take and excludes setup count from field output',()=>{
 const m=JSON.parse(readFileSync('public/audio/manifest.json','utf8')),a=pcm('rehearsal.wav'),b=pcm('field-output.wav');
 const offset=Math.round(m.rehearsal.setupDuration*22050);assert.equal(a.length-offset,b.length);
 let dot=0,aa=0,bb=0;for(let n=0;n<b.length;n++){dot+=a[n+offset]*b[n];aa+=a[n+offset]**2;bb+=b[n]**2;}
 assert.ok(dot/Math.sqrt(aa*bb)>.8,'filtered field signal shares the same aligned source');
 assert.equal(m.school.voiceText,script.utterances.S_EP_04_0302.text);
 for(const file of ['school-voice.wav','school-environment.wav','chair-sample.wav','click_test.wav']){const samples=pcm(file);assert.ok(samples.some(v=>Math.abs(v)>.03));assert.ok(samples.every(v=>Math.abs(v)<1));}
 for(let n=0;n<10;n++)assert.ok(existsSync(`public/art/p${String(n).padStart(2,'0')}.webp`));
});
