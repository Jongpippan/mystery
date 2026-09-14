import {script,type ScriptNode} from './script';
import {type Challenge,type Draft,type Judgment,type Stage,sections} from './chapter-one';
export const taskIds=['D11','D12','Q03','D13','D14','D15'] as const;
export type TaskId=typeof taskIds[number];
const field=(id:string,label:string,options:[string,string][])=>({id,label,options:options.map(([value,label])=>({value,label}))});
const config=(id:TaskId,required:string[],fields:Challenge['fields'],keys:string[],missing:[string,string][],h3='0033'):Challenge=>({required,fields,evidence:true,success:`B_${id}_success`,errors:Object.fromEntries(keys.map(k=>[k,`B_${id}_err_${k}`])),hints:['0001','0011','0021',h3,'0041'],missing,errorHints:Object.fromEntries(keys.map((k,n)=>[k,`003${n+1}`]))});
export const challenges:Record<TaskId,Challenge>={
 D11:config('D11',['E20','E22'],[
  field('shape','사진의 두 장화 끝과 수선 자국이 지지하는 설명',[['rival','목록의 소품 다리와 상자로도 사람 같은 윤곽을 만들 수 있다'],['body','사람처럼 길게 보이므로 시신이다'],['empty','소품 목록이 있으므로 사람이 절대로 없었다']])
 ],['shape_proves_body','shape_proves_no_body'],[['E20','0002'],['E22','0003']]),
 D12:config('D12',['E21','E03','K04'],[
  field('route','실제로 시험할 화물 경로',[['ramp','적재 데스크 → 덮인 경사로 → 보관소, 바퀴 흔적과 호송·봉인을 확인한다'],['stair','수레를 통째로 돌려 세워 계단 회전부로 보낸다']]),
  field('scope','폭 비교가 배제하는 범위',[['cart','수레 통째로의 통과만 배제한다. 따로 들고 옮기는 가능성은 남는다'],['person','수레가 못 지나가므로 사람을 들고 지나는 것도 불가능하다']])
 ],['cart_width_excludes_carried_person','intact_cart_fits_stair'],[['E21','0002'],['E03','0003'],['K04','0003']]),
 Q03:config('Q03',['E20','E27'],[
  field('statement','따져 물을 현재 진술',[['S_Q03_v1',script.utterances.S_Q03_v1.text]]),
  field('claim','사진과 참여자 표기로 반박할 범위',[['participation','사진 속 배한술의 위치와 인계 사본의 참여자 표기는 주방에만 있었다는 부정과 맞지 않는다'],['corpse','사진의 윤곽이 시신이므로 배한술이 시신을 옮겼다']])
 ],['cart_photo_proves_corpse'],[['E20','0002'],['E27','0003']],'0032'),
 D13:config('D13',['E23','E24','E29','K12','KQ03','V03_COMPLETE'],[
  field('chain','과거 화물과 현재 내용물을 연결하는 근거',[['custody','포장·인계 → 연속 호송 → 20:36 봉인 → 입회 개봉을 연결한다'],['present','지금 상자에 장부와 소품이 있으므로 어제도 같았다고 정한다']]),
  field('escort','인계 뒤 보관소까지 계속 동행한 사람',[['two','배한술과 목백로 · 탁두철은 인계 뒤 빠졌다'],['three','탁두철도 20:24 이후 보관소까지 계속 동행했다']])
 ],['present_contents_prove_past_contents','engineer_escorts_continuously_after_24'],[['E24','0002'],['KQ03','0002'],['K12','0003'],['V03_COMPLETE','0004'],['E23','0012'],['E29','0012']]),
 D14:config('D14',['E25','E26'],[
  field('layers','탄 종이와 살아남은 종이의 관계',[['separate','느슨한 표지·빈 중복물은 탔고, 원본 내부 잎은 묶인 채 남았다'],['all','재의 정산 제목이 원본 장부 전체가 탔다는 증거다']])
 ],['ash_title_proves_all_originals_destroyed'],[['E25','0002'],['E26','0003']],'0032'),
 D15:config('D15',['K11','K13','K14','E24','E26','E27','E30'],[
  field('responsibility','반출·소각과 살인의 관계',[['separate','기록 보존 목적, 무단 반출·기만 소각 책임과 미정인 살인 행위자를 구분한다'],['clear','시신 운반이 아니므로 두 사람의 모든 행동이 문제없다'],['murder','기록을 몰래 빼고 태웠으므로 살인에도 가담했다']]),
  field('next','다음에 검증할 자료',[['originals','직원별 동의 원본과, 보존 절차 뒤 확인할 아직 읽히지 않는 제본 인계 원본'],['copy','공개용 사본의 시각을 모두의 독립된 직접 기억으로 확정한다']])
 ],['cargo_clears_all_helpers','removal_proves_murder'],[['K11','0001'],['K13','0002'],['K14','0003'],['E24','0004'],['E26','0005'],['E27','0004'],['E30','0005']])
};
challenges.D15.errors.copy_as_independent='UI_ONLY';
export const uiFeedback={copy_as_independent:'공개용 사본을 다시 본 진술을 독립된 시계 기억으로 셀 수는 없습니다. 아직 읽히지 않는 제본 원본과 사본의 출처를 나누어 두세요.'};
export function judge(id:TaskId,d:Draft,held:string[]):Judgment{
 const c=challenges[id],f=d.fields;
 if(c.required.some(k=>!held.includes(k)))return {kind:'incomplete',message:'필요한 자료나 선행 조사가 남아 있습니다. 힌트에서 확인할 곳을 볼 수 있습니다.'};
 if(c.fields.some(k=>!k.options.some(o=>o.value===f[k.id]))||!d.evidence.length)return {kind:'incomplete',message:'주장 항목과 제시할 자료를 모두 선택해 주세요.'};
 let key='';
 if(id==='D11')key=f.shape==='body'?'shape_proves_body':f.shape==='empty'?'shape_proves_no_body':'';
 if(id==='D12')key=f.scope==='person'?'cart_width_excludes_carried_person':f.route==='stair'?'intact_cart_fits_stair':'';
 if(id==='Q03')key=f.claim==='corpse'?'cart_photo_proves_corpse':'';
 if(id==='D13')key=f.chain==='present'?'present_contents_prove_past_contents':f.escort==='three'?'engineer_escorts_continuously_after_24':'';
 if(id==='D14')key=f.layers==='all'?'ash_title_proves_all_originals_destroyed':'';
 if(id==='D15')key=f.responsibility==='clear'?'cargo_clears_all_helpers':f.responsibility==='murder'?'removal_proves_murder':f.next==='copy'?'copy_as_independent':'';
 if(key)return {kind:'error',key};
 if(c.required.filter(k=>k.startsWith('E')).some(k=>!d.evidence.includes(k)))return {kind:'error',key:'unsupported_evidence'};
 return {kind:'success',route:''};
}
export const setupNodes=(id:TaskId)=>sections(`C_${id}`,['Script','Free clarification']);
export const responseNodes=(id:TaskId,r:Judgment)=>r.kind==='success'?sections(`C_${id}`,[challenges[id].success]):r.kind==='error'&&challenges[id].errors[r.key]?sections(`C_${id}`,[challenges[id].errors[r.key]]):[];
export function hintLine(id:TaskId,level:number,held:string[],draft:Draft,error='',interrupted=false):string{
 const c=challenges[id],prefix=`S_H_${id}_`,has=(k:string)=>held.includes(k);
 if(has(id.startsWith('Q')?`K${id}`:id.replace('D','K')))return prefix+'0091';
 if(id==='D15'&&!has('K11'))return hintLine('D11',0,held,draft);
 if(id==='D13'&&has('E24')&&has('KQ03')&&has('K12')){
  if(!has('V03_OPENED'))return prefix+'0004';
  if(!has('V03_ACKNOWLEDGED'))return prefix+'0012';
 }
 const missing=c.missing.find(([k])=>!has(k));if(missing)return prefix+missing[1];
 if(level===3&&c.errorHints[error])return prefix+c.errorHints[error];
 if(level===1&&interrupted&&id!=='D13')return prefix+'0012';
 return prefix+c.hints[level];
}
export type VisitProgress='pending'|'joined'|'route'|'sealed'|'opened'|'complete';
export function visitHint(level:number,held:string[],progress:VisitProgress,interrupted=false){
 let suffix='';
 if(progress==='complete')suffix='0091';
 else if(!held.includes('KQ03'))suffix='0002';else if(!held.includes('K12'))suffix='0003';
 else if(progress==='pending')suffix=['0001','0011','0011','0011','0041'][level];
 else if(progress==='joined')suffix='0011';else if(progress==='route')suffix=level<2?'0012':interrupted?'0022':'0021';
 else if(progress==='sealed')suffix='0031';else suffix=level===4?'0042':'0032';
 return `S_H_V03_${suffix}`;
}
export const stages:Record<string,Stage>={
 'ch3-kitchen':{scene:'C_CH03_01',parts:['Script']},'ch3-photo':{scene:'C_CH03_02',parts:['Script']},
 'ch3-cart':{scene:'C_CH03_03',parts:['Script']},'ch3-ash':{scene:'C_CH03_04',parts:['Script']},
 'ch3-ash-follow':{scene:'C_CH03_04',parts:['Script']},'ch3-opening':{scene:'C_CH03_05',parts:['Script']},
 'ch3-preserve':{scene:'C_CH03_06',parts:['Script']},'ch3-reunion':{scene:'C_CH03_07',parts:['Script']},
 'ch3-departure':{scene:'C_CH03_08',parts:['Script']},'ch3-personal1':{scene:'C_CH03_O1',parts:['Script']},
 'ch3-personal2':{scene:'C_CH03_O2',parts:['Script']},'ch3-personal3':{scene:'C_CH03_O3',parts:['Script']}
};
export function stageNodes(stage:string,known:string[]):ScriptNode[]{
 const cfg=stages[stage],has=(k:string)=>known.includes(k);
 return script.scenes[cfg.scene].nodes.filter(n=>cfg.parts.some(p=>n.section[0].startsWith(p))).filter(n=>{
  if(n.kind==='direction'&&/^필수 (단서|E\/K)/.test(n.text))return false;
  if(stage==='ch3-ash-follow'&&!n.condition.startsWith('If Q03 solved'))return false;
  if(n.condition==='If Q03 unsolved')return !has('KQ03');
  if(n.condition.startsWith('If Q03 solved'))return has('KQ03')&&(!n.condition.includes('K12 missing')||!has('K12'))&&(!n.condition.includes('K12 held')||has('K12'));
  return true;
 }).map(n=>n.kind==='display'?{...n,text:n.text.replace('Objective:','목표:')}:n);
}
export type Option={kind:'visit';id:string;label:string}|{kind:'task';id:TaskId;label:string};
export function options(stage:string,done:string[],known:string[],returnStage:string,ashCorrected:boolean):Option[]{
 const out:Option[]=[],has=(k:string)=>known.includes(k),seen=(s:string)=>done.includes(s);
 const visit=(id:string,label:string)=>out.push({kind:'visit',id,label});
 const task=(id:TaskId,label=script.scenes[`C_${id}`].title)=>out.push({kind:'task',id,label});
 if(stage==='ch2-departure'){if(has('K10'))visit('ch3-kitchen','모눈을 봉만실에게 맡기고 서비스 계단을 따라 주방으로');return out;}
 if(stage.includes('personal')){visit(returnStage,'이야기를 마치고 원래 조사 자리로 돌아가기');return out;}
 if(stage==='ch3-kitchen'){visit('ch3-photo','배한술과 적재·기록 데스크로 가서 사진과 인계 사본 보기');return out;}
 if(!has('KQ03'))task('Q03','적재·기록 데스크에서 배한술에게 사진과 참여 기록 제시하기');
 if(!seen('ch3-cart'))visit('ch3-cart','적재 데스크에서 탁두철·목백로와 수레 경로·소품 확인하기');
 else {
  if(!has('K11'))task('D11','적재 데스크에서 탁두철·목백로와 사진의 윤곽 정리하기');
  if(!has('K12'))task('D12');
 }
 if(!seen('ch3-ash'))visit('ch3-ash','주방으로 가서 재와 남은 표지 관찰하기');
 else if(has('KQ03')&&!ashCorrected)visit('ch3-ash-follow','주방에서 반출 정정 뒤 남은 소각 책임 대화 이어가기');
 if(has('KQ03')&&has('K12')&&!seen('ch3-opening'))visit('ch3-opening','적재 데스크에서 합류해 성인 입회자들과 덮인 경사로·보관소로');
 if(seen('ch3-opening')&&!has('K13')){out.splice(0);task('D13');}
 else if(has('K13')&&!seen('ch3-preserve')){out.splice(0);visit('ch3-preserve','같은 보관소에서 제본을 유지한 채 젖은 원본 보호하기');}
 else if(seen('ch3-preserve')&&seen('ch3-ash')&&ashCorrected&&!has('K14'))task('D14','주방으로 돌아가 탄 표지와 개봉 관찰 기록 비교하기');
 else if(has('K14')&&has('K11')&&!seen('ch3-reunion'))visit('ch3-reunion','휴게실로 돌아가 모눈과 합류하기');
 else if(seen('ch3-reunion')&&!has('K15'))task('D15');
 else if(has('K15')&&!seen('ch3-departure'))visit('ch3-departure','휴게실에서 직원별 원본 대조 약속 잡기');
 if(seen('ch3-cart')&&!seen('ch3-reunion')&&!['ch3-opening'].includes(stage)&&!seen('ch3-personal2'))visit('ch3-personal2','적재 데스크에서 탁두철·목백로의 모래시계 이야기 듣기');
 if(seen('ch3-reunion')){
  if(!seen('ch3-personal1'))visit('ch3-personal1','휴게실에서 배한술과 반찬 위원회 이야기하기');
  if(!seen('ch3-personal3'))visit('ch3-personal3','모눈에게 젖은 종이를 기다리는 이유 이야기하기');
 }
 return out;
}
