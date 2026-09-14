import {script,type ScriptNode} from './script';
import {type Challenge,type Draft,type Judgment,type Stage,sections} from './chapter-one';
export const taskIds=['D06','Q02','D07','D08','D09','D10'] as const;
export type TaskId=typeof taskIds[number];
const field=(id:string,label:string,options:[string,string][])=>({id,label,options:options.map(([value,label])=>({value,label}))});
const errors=(id:string,keys:string[])=>Object.fromEntries(keys.map(k=>[k,`B_${id}_err_${k}`]));
const events:[string,string][]=[['cue','실제로 본 조명 확인 신호'],['reset','주조명 중단과 복귀 확인'],['playback','20:30 공개 녹음 안내']];
export const challenges:Record<TaskId,Challenge>={
 D06:{required:['E11','E12','E14'],evidence:true,fields:[
  field('feature','같은 녹음 구간을 뒷받침하는 특징',[['aligned','같은 비언어음이 같은 음절에 겹치고 발화 중단 지점도 일치한다'],['voice','같은 사람의 음색이 들린다'],['schedule','시간표에 리허설과 안내가 모두 적혀 있다']]),
  field('origin','두 기록의 출처 관계',[['one','공개 출력의 발생은 별도 기록이지만, 음성의 발화 기원은 하나일 수 있다'],['two','두 기록이므로 20:30 생존을 독립적으로 두 번 확인한다']])],success:'B_D06_success',errors:errors('D06',['voice_similarity_only','schedule_only','same_origin_as_independent']),hints:['0004','0011','0021','0011','0041'],missing:[['E12','0001'],['E11','0002'],['E14','0003']],errorHints:{voice_similarity_only:'0031',schedule_only:'0032',same_origin_as_independent:'0033'}},
 Q02:{required:['K06','E12','E14'],evidence:true,fields:[
  field('statement','현재 설명에서 따져 물을 진술',[['S_Q02_v1',script.utterances.S_Q02_v1.text]]),
  field('reason','확인한 녹음 비교와 연결할 반박',[['recorded','같은 리허설 구간이므로 그때 새로 마이크에 말한 설명과 맞지 않는다'],['murder','콘솔을 조작했으므로 추락 사건의 범인이다'],['mimic','소해금이 표문식의 목소리를 흉내 내서 말했다']])],success:'B_Q02_success',errors:errors('Q02',['console_proves_murder','technician_mimicked_voice']),hints:['0003','0011','0021','0003','0041'],missing:[['E12','0002'],['E14','0002'],['K06','0001']],errorHints:{console_proves_murder:'0031',technician_mimicked_voice:'0032'}},
 D07:{required:['E11','E15','E12','KQ02'],evidence:true,fields:[
  field('created','녹음이 만들어진 때',[['rehearsal','18:10 실제 리허설'],['output','20:30 공개 출력 때']]),
  field('played','공개 출력된 때',[['output','20:30 소해금의 수동 재생'],['rehearsal','18:10 리허설 때만']]),
  field('presence','사람의 위치·상태에 관해 알 수 있는 범위',[['unknown','늦은 재생으로 당시 위치나 사망 시각은 정할 수 없다'],['death','파일 생성부터 공개 재생 사이에 사망했다고 확정한다']])],success:'B_D07_success',errors:{...errors('D07',['file_time_is_death_time']),swapped_audio_times:'UI_ONLY'},hints:['0004','0011','0021','0032','0041'],missing:[['E11','0001'],['E15','0002'],['KQ02','0002'],['E12','0003']],errorHints:{file_time_is_death_time:'0031'}},
 D08:{required:['K07','E16','E13'],evidence:true,fields:[
  field('contact','가장 늦은 직접 대면',[['receipt','20:10–12 배한술에게 원본 목록을 직접 건넨 대면'],['audio','20:30 공개 안내의 목소리']]),
  field('scope','그 기록의 범위',[['moment','직접 인계한 대면은 확인되지만 이후 체류와 사망 시각은 모른다'],['stay','주방에 이후에도 계속 머물렀다'],['death','마지막 대면이 곧 사망 시각이다']])],success:'B_D08_success',errors:{...errors('D08',['receipt_proves_continued_kitchen_stay','receipt_is_death_time']),recording_is_contact:'UI_ONLY'},hints:['0013','0011','0021','0011','0041'],missing:[['K07','0002'],['E16','0001'],['E13','0012']],errorHints:{receipt_proves_continued_kitchen_stay:'0031',receipt_is_death_time:'0032'}},
 D09:{required:['E12','E17','E18','V22_PUBLIC'],evidence:true,fields:[
  field('first','첫 번째 공개 사건',events),field('second','그 다음 공개 사건',events),field('third','마지막 공개 사건',events),
  field('support','순서를 뒷받침하는 근거',[['observed','현장 관찰과 장비 기록·조작 정정을 대조한다'],['scheduled','예정표에 적혔으므로 모두 그대로 실행됐다']]),
  field('precision','시각의 정밀도',[['minute','분 단위 범위와 순서를 쓰고 시계 오차를 남긴다'],['second','모든 시계가 정확히 일치하므로 초까지 단정한다']])],success:'B_D09_success',errors:{...errors('D09',['schedule_is_performance','perfect_clock_claim']),wrong_event_order:'UI_ONLY'},hints:['0014','0011','0021','0011','0041'],missing:[['E12','0001'],['E17','0012'],['E18','0013'],['V22_PUBLIC','0013']],errorHints:{schedule_is_performance:'0031',perfect_clock_claim:'0032'}},
 D10:{required:['K05','K07','K08','K09'],evidence:false,fields:[
  field('gap','직접 확인 자료가 남아 있는 조사 구간',[['open','20:12 이후부터 21:05 발견 통화 전까지의 실제 위치·상태'],['death','전원이 끊긴 20:19가 정확한 사망 시각이다']]),
  field('scope','방 알리바이와 늦은 목소리를 합친 결론',[['investigate','이 구간의 직접 행동 증거를 더 조사해야 한다'],['culprit','두 알리바이가 약해졌으므로 차무록이 범인이다']])],success:'B_D10_success',errors:errors('D10',['automatic_culprit','exact_death_minute']),hints:['0014','0011','0021','0011','0041'],missing:[['K05','0013'],['K07','0013'],['K08','0001'],['K09','0012']],errorHints:{automatic_culprit:'0031',exact_death_minute:'0032'}}
};
export const uiFeedback={
 swapped_audio_times:'녹음 생성과 공개 출력의 시각이 자료의 작업 이력과 맞지 않습니다. 리허설 원본과 조작 정정에서 각각 어떤 행동을 기록했는지 다시 나누어 보세요.',
 recording_is_contact:'공개 출력은 스피커에서 소리가 난 기록입니다. 앞서 분리한 녹음 재생과 사람의 직접 대면을 다시 섞지 말고, 직접 수령 표시가 있는 인계 자료를 확인해 주세요.',
 wrong_event_order:'놓은 순서가 직접 본 공개 과정과 장비의 차단·복귀 기록에 맞지 않습니다. 예정 경로와 실제 관찰을 구분해 각 사건을 다시 배치해 주세요.'
};
export function judge(id:TaskId,d:Draft,held:string[]):Judgment {
 const c=challenges[id],f=d.fields;
 if(c.required.some(k=>!held.includes(k)))return {kind:'incomplete',message:'아직 필요한 조사나 선행 추리가 남아 있습니다. 힌트에서 확인할 곳을 볼 수 있습니다.'};
 if(c.fields.some(field=>!field.options.some(o=>o.value===f[field.id])))return {kind:'incomplete',message:'비어 있는 답안 항목을 먼저 선택해 주세요.'};
 if(c.evidence&&!d.evidence.length)return {kind:'incomplete',message:'주장을 뒷받침할 자료를 제시 목록에서 선택해 주세요.'};
 let key='';
 if(id==='D06')key=f.feature==='voice'?'voice_similarity_only':f.feature==='schedule'?'schedule_only':f.origin==='two'?'same_origin_as_independent':'';
 if(id==='Q02')key=f.reason==='murder'?'console_proves_murder':f.reason==='mimic'?'technician_mimicked_voice':'';
 if(id==='D07')key=f.presence==='death'?'file_time_is_death_time':f.created!=='rehearsal'||f.played!=='output'?'swapped_audio_times':'';
 if(id==='D08')key=f.scope==='stay'?'receipt_proves_continued_kitchen_stay':f.scope==='death'?'receipt_is_death_time':f.contact!=='receipt'?'recording_is_contact':'';
 if(id==='D09')key=f.support==='scheduled'?'schedule_is_performance':f.precision==='second'?'perfect_clock_claim':f.first!=='cue'||f.second!=='reset'||f.third!=='playback'?'wrong_event_order':'';
 if(id==='D10')key=f.gap==='death'?'exact_death_minute':f.scope==='culprit'?'automatic_culprit':'';
 if(key)return {kind:'error',key};
 const sources=c.required.filter(k=>k.startsWith('E'));
 if(!sources.every(e=>d.evidence.includes(e)))return {kind:'error',key:'unsupported_evidence'};
 return {kind:'success',route:''};
}
export const setupNodes=(id:TaskId)=>sections(`C_${id}`,['Task setup','Setup','Free clarification']);
export const responseNodes=(id:TaskId,r:Judgment)=>r.kind==='success'?sections(`C_${id}`,id==='D07'?['Valid chronology construction',challenges[id].success]:[challenges[id].success]):r.kind==='error'&&r.key!=='unsupported_evidence'?sections(`C_${id}`,[challenges[id].errors[r.key]]):[];
export function hintLine(id:TaskId,level:number,held:string[],_draft:Draft,error='',interrupted=false) {
 const c=challenges[id],prefix=`S_H_${id}_`;
 if(held.includes(id.startsWith('Q')?`K${id}`:id.replace('D','K')))return prefix+'0042';
 const missing=c.missing.find(([k])=>!held.includes(k));if(missing)return prefix+missing[1];
 if(level===3&&c.errorHints[error])return prefix+c.errorHints[error];
 if(level===3&&interrupted&&['D08','D09','D10'].includes(id))return prefix+'0033';
 return prefix+c.hints[level];
}
export function visitHint(level:number,held:string[],interrupted:boolean) {
 const suffix=held.includes('KQ02')?'0044':held.includes('K06')?'0043':!held.includes('E12')?'0012':!held.includes('E11')?'0021':!held.includes('E14')?(interrupted?'0032':'0022'):['0003','0011','0023','0031','0031'][level];
 return `S_H_V02_${suffix}`;
}
export const stages:Record<string,Stage>={
 'ch2-booth':{scene:'C_CH02_01',parts:['Script']},
 'ch2-compare':{scene:'C_CH02_02',parts:['Script']},
 'ch2-authority':{scene:'C_CH02_03',parts:['Script']},
 'ch2-apology':{scene:'C_CH02_04',parts:['Script','Conditional callback','Common continuation','Choice','Merge']},
 'ch2-sources':{scene:'C_CH02_05',parts:['Script','Player order']},
 'ch2-public':{scene:'C_CH02_06',parts:['Script']},
 'ch2-quiet':{scene:'C_CH02_07',parts:['Script']},
 'ch2-departure':{scene:'C_CH02_08',parts:['Script']},
 'ch2-personal1':{scene:'C_CH02_O1',parts:['Script']},
 'ch2-personal2':{scene:'C_CH02_O2',parts:['Script']},
 'ch2-personal3':{scene:'C_CH02_O3',parts:['Script']}
};
export type ChoiceNode={kind:'choice';id:string;choice:string;text:string;options:{value:string;text:string}[]};
export function stageNodes(stage:string,known:string[],choices:Record<string,string>):(ScriptNode|ChoiceNode)[] {
 const cfg=stages[stage],result:(ScriptNode|ChoiceNode)[]=[];
 if(stage==='ch2-booth'&&known.includes('E14'))return [...script.scenes.C_CH02_01.nodes.slice(0,6),script.utterances.S_CH02_01_0081];
 if(stage==='ch2-compare'&&known.includes('E14'))return ['S_CH02_02_0091','S_CH02_02_0092'].map(id=>script.utterances[id]);
 let prompted=false;
 for(const n of script.scenes[cfg.scene].nodes){
  if(!cfg.parts.some(p=>n.section[0].startsWith(p)))continue;
  if(n.kind==='direction'&&(/필수 단서|한 작업의 성공|장면은 웃음/.test(n.text))) {
   // Keep the physical brake action in O2; omit only the editorial instruction.
   if(n.id==='C_CH02_O2:n0009')result.push({...n,text:'둘이 동시에 여백을 본다. 해금이 카트 브레이크를 직접 확인한다.'});
   continue;
  }
  const branch=n.section[1]?.match(/^If (B_\w+) = (\w+)/);
  if(branch&&choices[branch[1]]!==branch[2])continue;
  // In the accepted MD, inline If annotations govern the explicitly adjacent
  // callback, not all subsequent common lines up to the next markdown heading.
  if(['S_CH02_06_0010','S_CH02_06_0011'].includes(n.id)&&known.includes('K08')!==(n.id==='S_CH02_06_0010'))continue;
  if(/^S_CH02_(07|O1)_00[12]\d$/.test(n.id)&&n.condition.startsWith('If B_PLAYBACK_RESPONSE=')){
   if(choices.B_PLAYBACK_RESPONSE!==n.condition.split('=')[1])continue;
  }
  if(n.section[0]==='Choice B_PLAYBACK_RESPONSE'){
   if(!prompted){prompted=true;result.push({id:'B_PLAYBACK_RESPONSE',kind:'choice',choice:'B_PLAYBACK_RESPONSE',text:'사과에 어떻게 답할까?',options:[{value:'accept_apology',text:script.utterances.S_CH02_04_0011.text},{value:'need_time',text:script.utterances.S_CH02_04_0021.text}]});}
   const value=n.section[1]?.match(/`(.+)`/)?.[1];if(choices.B_PLAYBACK_RESPONSE!==value)continue;
  }
  result.push(n);
 }
 return result;
}
export type Option={kind:'visit';id:string;label:string}|{kind:'task';id:TaskId;label:string};
export function options(stage:string,done:string[],known:string[],returnStage:string):Option[]{
 const out:Option[]=[],has=(k:string)=>known.includes(k),seen=(s:string)=>done.includes(s);
 const visit=(id:string,label:string)=>out.push({kind:'visit',id,label}),task=(id:TaskId)=>out.push({kind:'task',id,label:script.scenes[`C_${id}`].title});
 if(stage==='departure'){if(has('K05'))visit('ch2-booth','모눈과 연회장을 지나 동쪽 음향 부스로 가기');return out;}
 if(stage.includes('personal')){visit(returnStage,'이야기를 마치고 조사하던 자리로');return out;}
 if(stage==='ch2-booth')visit('ch2-compare','소해금과 리허설 원본·공개 출력 비교하기');
 else if(stage==='ch2-compare')visit('ch2-authority','모눈을 봉만실에게 맡기고 운영표 책임 확인하기');
 else if(!has('K06'))task('D06');
 else if(!has('KQ02'))task('Q02');
 else if(!seen('ch2-apology'))visit('ch2-apology','휴게실에서 모눈과 합류하고 소해금의 사과 듣기');
 else if(!has('K07'))task('D07');
 else if(!seen('ch2-sources'))visit('ch2-sources','모눈을 맡기고 현관 조사 탁자에서 독립 기록 요청하기');
 else if(!has('K08')||!has('K09')){
  if(!has('K08')){task('D08');if(stage==='ch2-public')out[out.length-1].label='서쪽 현관 조사 탁자로 돌아가 마지막 대면 정리하기';}
  if(!seen('ch2-public'))visit('ch2-public','연회장 공개 탁자에서 직접 본 순서 재확인하기');
  else if(!has('K09'))task('D09');
 }else if(!seen('ch2-quiet'))visit('ch2-quiet','휴게실로 돌아가 모눈과 합류하기');
 else if(!has('K10'))task('D10');
 else if(!seen('ch2-departure'))visit('ch2-departure','현관에서 덮인 수레 조사 약속 잡고 돌아오기');
 if(['ch2-apology','ch2-quiet'].includes(stage)&&!seen('ch2-personal1'))visit('ch2-personal1','휴게실에서 목소리를 빌리는 일 이야기하기');
 if(['ch2-sources','ch2-public'].includes(stage)&&!seen('ch2-personal2'))visit('ch2-personal2','연회장 장비 옆에서 탁두철·소해금 이야기 듣기');
 if(stage==='ch2-departure'&&!seen('ch2-personal3'))visit('ch2-personal3','봉만실과 비어 있는 자리 이야기하기');
 return out;
}
