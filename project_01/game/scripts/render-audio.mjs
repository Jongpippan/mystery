import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve('public/audio'),rate=22050;
const read=name=>{
  const b=readFileSync(`${root}/${name}`);let data=null;
  for(let offset=12;offset+8<=b.length;){const length=b.readUInt32LE(offset+4);if(b.toString('ascii',offset,offset+4)==='data'){data=b.subarray(offset+8,offset+8+length);break;}offset+=8+length+(length%2);}
  if(!data)throw Error(`No PCM data: ${name}`);
  const samples=Float64Array.from({length:data.length/2},(_,i)=>data.readInt16LE(i*2)/32768);
  let first=0,last=samples.length-1;while(first<last&&Math.abs(samples[first])<.003)first++;while(last>first&&Math.abs(samples[last])<.003)last--;
  // Trim synthesizer padding so the shared squeak starts on the final chair
  // syllable, retaining a short margin for soft consonants.
  return samples.slice(Math.max(0,first-440),Math.min(samples.length,last+441));
};
const silence=seconds=>new Float64Array(Math.round(seconds*rate));
const join=(...parts)=>{const out=new Float64Array(parts.reduce((n,p)=>n+p.length,0));let offset=0;for(const p of parts){out.set(p,offset);offset+=p.length;}return out;};
const wav=(name,samples)=>{
  const data=Buffer.alloc(samples.length*2);samples.forEach((v,i)=>data.writeInt16LE(Math.round(Math.max(-1,Math.min(1,v))*.93*32767),i*2));
  const h=Buffer.alloc(44);h.write('RIFF');h.writeUInt32LE(36+data.length,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(rate,24);h.writeUInt32LE(rate*2,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(data.length,40);writeFileSync(`${root}/${name}`,Buffer.concat([h,data]));
};
const phrases=[1,2,3,4].map(n=>read(`phrase-${n}.wav`));
const onset=(Math.round(.35*rate)+phrases[0].length+Math.round(.45*rate)+phrases[1].length)/rate;
const rehearsal=join(silence(.35),phrases[0],silence(.45),phrases[1],phrases[2],silence(.8),phrases[3],silence(.4));
const squeak=(t,duration=.5)=>t<0||t>duration?0:.15*Math.sin(Math.PI*t/duration)**2*(Math.sin(2*Math.PI*(1250*t+90*t*t))+.35*Math.sin(2*Math.PI*1870*t));
const chair=silence(1.6),click=silence(.8);
for(let n=0;n<chair.length;n++)chair[n]=squeak(n/rate-.25,.85);
for(let n=0;n<click.length;n++){const t=n/rate-.2;if(t>=0&&t<.12)click[n]=.22*Math.exp(-t*90)*Math.sin(2*Math.PI*2300*t);}
wav('chair-sample.wav',chair);wav('click_test.wav',click);
for(let n=0;n<rehearsal.length;n++)rehearsal[n]+=squeak(n/rate-onset);
const setup=join(read('setup-count.wav'),silence(.6));
wav('rehearsal.wav',join(setup,rehearsal));
const output=new Float64Array(rehearsal.length);let filtered=0;
for(let n=0;n<output.length;n++){filtered=.63*filtered+.37*rehearsal[n];output[n]=filtered*.85+(n>1100?rehearsal[n-1100]*.09:0);}
wav('field-output.wav',output);
let seed=104729;const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647-.5;};
const environment=silence(10);let air=0;
for(let n=0;n<environment.length;n++){
  const t=n/rate;air=.98*air+.02*random();let value=air*.25+.008*Math.sin(2*Math.PI*82*t);
  value+=squeak(t-2,1.25)*.4;
  for(const onset of [5.4,6.8,8.2]){const d=t-onset;if(d>=0&&d<.28)value+=.16*Math.exp(-d*25)*Math.sin(2*Math.PI*(1700*d-550*d*d));}
  environment[n]=value*Math.min(1,t*3,(10-t)*3);
}
wav('school-environment.wav',environment);
const voice=read('consented-voice.wav');
for(let n=0;n<voice.length;n++)voice[n]+=.0015*Math.sin(2*Math.PI*82*n/rate);
wav('school-voice.wav',voice);
const corpus=JSON.parse(readFileSync('content/screenplay.generated.json','utf8'));
const manifest={sampleRate:rate,voiceEngine:'Microsoft Heami Desktop / System.Speech',rehearsal:{setupSource:'S_CH02_02_0006',setupText:corpus.utterances.S_CH02_02_0006.text,source:'S_CH02_02_0007',text:corpus.utterances.S_CH02_02_0007.text,duration:(setup.length+rehearsal.length)/rate,setupDuration:setup.length/rate,squeakAt:onset+setup.length/rate,fieldSqueakAt:onset,sharedOrigin:['rehearsal.wav','field-output.wav']},school:{voiceSource:'S_EP_04_0302',voiceText:corpus.utterances.S_EP_04_0302.text,environment:{duration:10,chairAt:2,dropsAt:[5.4,6.8,8.2],humanVoices:0}},notes:'Authored synthetic voice and procedural effects; no real person recording. Field output excludes the setup count and is derived from the same rehearsal take. School voice contains only the explicitly consented sentence.'};
writeFileSync(`${root}/manifest.json`,JSON.stringify(manifest,null,2));console.log(manifest);
