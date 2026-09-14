import {script,type ScriptNode} from './script';
import {type Challenge,type Draft,type Judgment,type Stage,sections} from './chapter-one';
export const taskIds=['D26','D27','Q06','D28','D29','D30'] as const;
export type TaskId=typeof taskIds[number];
const field=(id:string,label:string,options:[string,string][])=>({id,label,options:options.map(([value,label])=>({value,label}))});
const cfg=(id:TaskId,required:string[],fields:Challenge['fields'],errors:string[],missing:[string,string][],h0='0001'):Challenge=>({required,fields,evidence:true,success:`B_${id}_success`,errors:Object.fromEntries(errors.map(k=>[k,`B_${id}_err_${k}`])),hints:[h0,'0011','0021','0031','0041'],missing,errorHints:Object.fromEntries(errors.map((k,n)=>[k,`003${n+2}`]))});
export const finalProofGroups=[
 {id:'meeting',label:'만남과 동기',fields:['meeting'],sourceSets:[['K18','K19'],['E19','E35','E37']]},
 {id:'act',label:'행동과 시간',fields:['act','interval'],sourceSets:[['K22','K23'],['E43','E42','E45','E13','E17','E18']]},
 {id:'coat',label:'외투와 대안',fields:['coat'],sourceSets:[['K24','K28'],['E44','E10','E46','E49','E52','E13']]},
 {id:'copy',label:'거짓 사본',fields:['copy','origins'],sourceSets:[['K27','KQ06'],['E51','E52','E48','E49']]},
 {id:'responsibility',label:'남은 오해와 책임',fields:['responsibility'],sourceSets:[['K05','K10','K15','K20','E42','E52']]}
] as const;
export const finalErrorRole:Record<string,string>={meeting_scope:'meeting',missing_act_support:'act',wrong_interval:'act',wearer_equals_holder:'coat',one_origin_corroboration:'copy',unsupported_complicity:'responsibility',erased_collateral_responsibility:'responsibility',copy_scope:'copy',...Object.fromEntries(finalProofGroups.map(g=>[`${g.id}_sources`,g.id]))};
export const challenges:Record<TaskId,Challenge>={
 D26:cfg('D26',['E49','E50','E29','E28'],[
  field('basis','동일한 원본임을 판단할 근거',[['continuity','발견 전 봉인·보관 경계와 제본 실·연속 번호·절취선·원래 양식을 잇는다'],['authority','원본이라는 제목과 여백의 기록 보존 전문성을 믿는다']]),
  field('scope','이번 인증이 말하는 범위',[['object','같은 하단 본장의 물리적 연속성 · 두 시각의 의미는 다음에 검증한다'],['everything','원본이므로 모든 시각과 편집자 신원까지 자동으로 맞다']])
 ],['original_label_or_profession_suffices'],[['E49','0002'],['E50','0003'],['E29','0004'],['E28','0004']]),
 D27:cfg('D27',['K26','E27','E48','E49','E51'],[
  field('change','정상 공개 처리와 다른 변화',[['fields','임금 가림 외에 접수·종료 두 값만 각각 7분 앞당겨졌다'],['printer','일반 복사기가 계산하면서 자연스럽게 시간을 7분 이동했다'],['forgery','시간이 다르므로 인증한 장부 전체도 새 위조다']]),
  field('author','현재 비교로 편집자까지 식별했는가',[['unknown','특정 필드의 의도적 편집을 입증했으며 편집자 귀속은 아직 별도다'],['identified','겹침 화면에서 편집자의 신원까지 식별했다']])
 ],['printer_shifts_values_seven_minutes','all_pages_forged'],[['K26','0002'],...['E48','E51','E27','E49'].map(k=>[k,'0003'] as [string,string])]),
 Q06:cfg('Q06',['K27','E28','E51'],[
  field('statement','따져 물을 현재 진술',[['S_Q06_v1',script.utterances.S_Q06_v1.text]]),
  field('question','충돌하는 범위를 어디까지 물을까',[['copying','상단 부본과 일반 복사기를 누가 다뤘는지, 감독자가 실제로 본 범위를 묻는다'],['murder','계속 지켜봤다는 말은 살인 장면을 봤다는 뜻이다'],['clock','기억이 틀렸으니 인증된 원본 시각도 자동으로 거짓이다']])
 ],['custodian_saw_murder','original_clock_inherently_false'],[['K27','0002'],['E28','0003'],['E51','0005']],'0004'),
 D28:cfg('D28',['K26','E49','E52','E13','K23'],[
  field('basis','사건 구간을 벗어날 수 없었던 근거',[['continuous','인증된 인계 구간과 직접 연속 관찰을 사건 범위에 겹친다'],['speed','랜딩까지 걷는 속도만으로 갈 수 없었다고 계산한다'],['copies','같은 공개 사본의 시각을 반복한 진술들을 독립 증거로 센다']]),
  field('coverage','시계 오차를 적용해도 반드시 포함되는 인계 범위',[['15-23','최소 20:15–20:23이어서 사건 20:17–20:21 전체를 덮는다'],['17-17','공개본의 20:17 한 점만으로 전체 사건을 덮는다']]),
  field('scope','배제한 설명의 범위',[['actor','두철·한술이 사건 구간의 밀침 행위자라는 설명을 배제한다'],['loan','사건 전 외투 인계라는 말 자체가 논리적으로 불가능해졌다']])
 ],['walking_speed_exclusion','two_copy_accounts_are_independent'],[['K26','0002'],['E49','0002'],['E52','0003'],['E13','0004'],['K23','0004']]),
 D29:cfg('D29',['K18','K19','K24','K27','KQ06','K28','E10','E19','E46','E18','K04'],[
  field('person','같은 설명에 모이는 사람',[['P03','차무록'],['P04','탁두철'],['P02','봉만실'],['P05','소해금']]),
  field('reason','그 이름에 이르는 근거 역할',[['roles','사건 직전 외투·피해자 접점·대안 행위자 배제·사후 복사 접근을 함께 잇는다'],['name','이름만 고르면 충분하다'],['motive','정산금 전용이 들킬 동기 하나로 밀침이 증명된다'],['copy','혼자 복사했고 시간이 바뀐 사실 하나로 살인이 증명된다'],['conspiracy','백로·한술·두철이 모두 무록과 공모했다고 가정한다']])
 ],['culprit_name_only','motive_only','copy_edit_only','unsupported_all_witness_conspiracy'],[...['K18','K19','K24'].map(k=>[k,'0001'] as [string,string]),['K27','0003'],['KQ06','0003'],['K28','0002'],...['E10','E19','E46','E18','K04'].map(k=>[k,'0004'] as [string,string])]),
 D30:cfg('D30',['K05','K10','K15','K20','K22','K23','K24','K27','KQ06','K28','K29'],[
  field('order','발표 순서',[['chronology_first','시간순 · 만남 → 행동·시간 → 외투 → 사본 → 책임'],['concealment_first','은폐부터 · 사본 → 잘못된 대안 → 외투 → 행동·시간 → 만남·책임']]),
  field('meeting','만남과 동기가 증명하는 것',[['originals','원본 공개의 압박과 표문식·차무록이 원본 문제로 만날 이유·기회'],['act','만남 약속 하나로 밀침 행동까지 직접 증명됨']]),
  field('act','중심 행동의 독립된 근거 역할',[['supported','제한된 창 목격을 게이트 상태와 안전 비교로 검증한 밀침 설명'],['omit','돈 문제와 거짓 사본만으로 행동 설명을 대신함']]),
  field('interval','입증 가능한 사건 범위',[['17-21','20:17–20:21 · 공개 신호와 시계 오차를 적용한 범위'],['19','정확히 20:19 한 시점']]),
  field('coat','외투와 가장 강한 대안',[['chain','사진·옷깃·인계 진술을 잇고 연속 알리바이로 두철의 사건 구간 행위자 설명을 배제함'],['holder','나중에 외투를 가진 두철이 밀친 사람임']]),
  field('copy','편집과 접근을 연결한 범위',[['access','두 시각 편집과 차무록의 독점 복사 접근이 거짓 시간표를 연결함 · 살인 목격은 아님'],['murder_seen','백로가 숫자 편집과 밀침 장면을 모두 직접 목격함']]),
  field('origins','공개 사본과 그것을 읽은 진술',[['one','같은 사본에서 나온 시간 기억은 하나의 파생 출처임'],['many','같은 사본의 숫자를 여러 사람이 말했으므로 독립된 시계 증언임']]),
  field('responsibility','앞선 오해와 남아 있는 책임',[['separate','방 구조·재생·화물의 오해를 풀되 각자의 대출·담보·전용·과실·무단 재생·반출·보관 책임은 남김'],['complicity','백로·한술이 살인 은폐를 도왔다고 공모를 추가함'],['erased','범인을 찾았으므로 나머지 잘못은 중요하지 않음']])
 ],['missing_act_support','wrong_interval','wearer_equals_holder','one_origin_corroboration','unsupported_complicity','erased_collateral_responsibility'],[['K22','0002'],['K23','0002'],['K24','0003'],['K28','0003'],['K27','0004'],['KQ06','0004'],...['K05','K10','K15','K20','K29'].map(k=>[k,'0001'] as [string,string])])
};
challenges.D30.evidence=false;
challenges.D29.errorHints={culprit_name_only:'0032',motive_only:'0033',copy_edit_only:'0033',unsupported_all_witness_conspiracy:'0034'};
challenges.D30.errorHints={missing_act_support:'0021',wrong_interval:'0032',wearer_equals_holder:'0033',one_origin_corroboration:'0034',unsupported_complicity:'0035',erased_collateral_responsibility:'0035'};
const extra:Partial<Record<TaskId,string[]>>={D26:['authentication_scope'],D27:['overlay_identity'],D28:['interval_coverage','loan_scope'],D29:['unsupported_actor'],D30:['meeting_scope','copy_scope',...finalProofGroups.map(g=>`${g.id}_sources`)]};
for(const [id,keys] of Object.entries(extra))for(const key of keys)challenges[id as TaskId].errors[key]='UI_ONLY';
export const uiFeedback:Record<string,string>={authentication_scope:'원본 인증은 같은 하단 본장의 물리적 연속성입니다. 시각의 정확성이나 편집자 귀속까지 자동으로 넓히지 마세요.',overlay_identity:'겹침 비교는 바뀐 필드를 보여 줍니다. 편집자의 신원은 아직 그 화면만으로 식별하지 않았습니다.',interval_coverage:'사건 전체 범위와 시계 오차를 적용한 최소 연속 관찰 범위를 겹쳐 주세요. 공개본의 한 시점은 이를 대신하지 못합니다.',loan_scope:'연속 관찰은 사건 구간 행위자 설명을 배제합니다. 외투 조기 인계 자체의 논리적 불가능까지 증명하지는 않았습니다.',unsupported_actor:'선택한 사람은 같은 설명의 근거 역할을 모두 만족하지 않습니다. 공개 연속 관찰과 인증된 인계 구간, 피해자 접점·외투·복사 접근을 함께 확인해 주세요.',meeting_scope:'만남과 동기는 이유와 기회입니다. 행동 역할에서 밀침을 별도로 증명해 주세요.',copy_scope:'백로의 정정은 직접 본 인계와 독점 복사 접근의 범위입니다. 숫자 편집이나 살인 장면을 직접 봤다는 말로 넓히지 마세요.',...Object.fromEntries(finalProofGroups.map(g=>[`${g.id}_sources`,`${g.label} 카드의 제시 자료가 선택한 주장을 충분히 뒷받침하지 않습니다. 해당 역할의 원자료나 이미 입증한 결론을 연결해 주세요. 다른 카드는 유지됩니다.`]))};
export function judge(id:TaskId,d:Draft,held:string[]):Judgment{
 const c=challenges[id],f=d.fields;
 if(c.required.some(k=>!held.includes(k)))return {kind:'incomplete',message:'필요한 이전 결론이나 실제 확인 단계가 남아 있습니다. 작성한 다른 항목은 유지됩니다.'};
 if(c.fields.some(k=>!k.options.some(o=>o.value===f[k.id]))||c.evidence&&!d.evidence.length||id==='D30'&&finalProofGroups.some(g=>!d.roleEvidence?.[g.id]?.length))return {kind:'incomplete',message:'비어 있는 주장이나 자료 연결을 먼저 채워 주세요. 이미 작성한 역할과 발표 순서는 유지됩니다.'};
 let key='';
 if(id==='D26')key=f.basis==='authority'?'original_label_or_profession_suffices':f.scope!=='object'?'authentication_scope':'';
 if(id==='D27')key=f.change==='printer'?'printer_shifts_values_seven_minutes':f.change==='forgery'?'all_pages_forged':f.author!=='unknown'?'overlay_identity':'';
 if(id==='Q06')key=f.question==='murder'?'custodian_saw_murder':f.question==='clock'?'original_clock_inherently_false':'';
 if(id==='D28')key=f.basis==='speed'?'walking_speed_exclusion':f.basis==='copies'?'two_copy_accounts_are_independent':f.coverage!=='15-23'?'interval_coverage':f.scope!=='actor'?'loan_scope':'';
 if(id==='D29')key=({name:'culprit_name_only',motive:'motive_only',copy:'copy_edit_only',conspiracy:'unsupported_all_witness_conspiracy'} as Record<string,string>)[f.reason]??(f.person!=='P03'?'unsupported_actor':'');
 if(id==='D30')key=f.act==='omit'?'missing_act_support':f.interval!=='17-21'?'wrong_interval':f.coat==='holder'?'wearer_equals_holder':f.origins==='many'?'one_origin_corroboration':f.responsibility==='complicity'?'unsupported_complicity':f.responsibility==='erased'?'erased_collateral_responsibility':f.meeting!=='originals'?'meeting_scope':f.copy!=='access'?'copy_scope':'';
 if(key)return {kind:'error',key};
 if(id==='D30'){
  const failed=finalProofGroups.find(g=>!g.sourceSets.some(set=>set.every(k=>d.roleEvidence?.[g.id]?.includes(k)&&held.includes(k))));
  if(failed)return {kind:'error',key:`${failed.id}_sources`};
 }else if(id==='D26'){
  if(!['E50','E29','E28'].every(k=>d.evidence.includes(k))||!['E49','E30'].some(k=>d.evidence.includes(k)&&held.includes(k)))return {kind:'error',key:'unsupported_evidence'};
 }else if(c.required.filter(k=>k.startsWith('E')).some(k=>!d.evidence.includes(k)))return {kind:'error',key:'unsupported_evidence'};
 return {kind:'success',route:id==='D30'?f.order:''};
}
export const setupNodes=(id:TaskId)=>{
 const nodes=sections(`C_${id}`,['Script']);
 // Keep the actual source prompt for silent task entries so returning from a
 // cross-location task retains its last visited scene without another store.
 return nodes.length?nodes:script.scenes[`C_${id}`].nodes.filter(n=>n.section[0]==='Script'&&n.kind==='display'&&/추리:/.test(n.text));
};
export function responseNodes(id:TaskId,r:Judgment):ScriptNode[]{
 if(id==='D30'&&r.kind==='success')return sections('C_D30',r.route==='concealment_first'?['Valid presentation B','B_D30_success — conclusion']:['Valid presentation A','B_D30_success — role','B_D30_success — conclusion']);
 return r.kind==='success'?sections(`C_${id}`,[challenges[id].success]):r.kind==='error'&&challenges[id].errors[r.key]?sections(`C_${id}`,[challenges[id].errors[r.key]]):[];
}
export function hintLine(id:TaskId,level:number,held:string[],d:Draft,error='',_interrupted=false){
 void _interrupted;const c=challenges[id],prefix=`S_H_${id}_`;
 if(held.includes(id.startsWith('Q')?`K${id}`:id.replace('D','K')))return prefix+'0091';
 const missing=c.missing.find(([k])=>!held.includes(k));if(missing)return prefix+missing[1];
 if(level===3&&c.errorHints[error])return prefix+c.errorHints[error];
 return prefix+(id==='D30'&&level===4&&d.fields.order==='concealment_first'?'0042':c.hints[level]);
}
export type ReturnProgress='uncalled'|'travel'|'interrupted-travel'|'handoff'|'waiting'|'unfolding';
export function visitHint(level:number,held:string[],progress:ReturnProgress){
 const suffix=held.includes('K26')?'0091':!held.includes('K25')?'0001':progress==='uncalled'?'0002':progress==='interrupted-travel'?'0013':progress==='travel'?'0011':progress==='handoff'?'0012':!held.includes('E49')?(progress==='unfolding'?'0022':'0021'):!held.includes('E50')?'0032':level===4?'0041':level===3?'0031':'0042';
 return 'S_H_V06_'+suffix;
}
export const stages:Record<string,Stage>={
 'ch6-contact':{scene:'C_CH06_01',parts:['Script']},'ch6-unfold':{scene:'C_CH06_02',parts:['Script']},'ch6-early-machine':{scene:'C_CH06_03',parts:['Script']},
 'ch6-overlay':{scene:'C_CH06_03',parts:['Script']},'ch6-copier':{scene:'C_CH06_04',parts:['Script']},'ch6-bands':{scene:'C_CH06_05',parts:['Script']},
 'ch6-alternative':{scene:'C_CH06_06',parts:['Script']},'ch6-briefing':{scene:'C_CH06_07',parts:['Script']},'ch6-aftermath':{scene:'C_CH06_08',parts:['Script']},
 'ch6-personal1':{scene:'C_CH06_O1',parts:['Script']},'ch6-personal2':{scene:'C_CH06_O2',parts:['Script']},'ch6-personal3':{scene:'C_CH06_O3',parts:['Script']}
};
export function stageNodes(stage:string,known:string[]):ScriptNode[]{
 const c=stages[stage],nodes=sections(c.scene,c.parts).map(n=>n.kind==='display'?{...n,text:n.text.replace('Objective:','목표:')}:n);
 if(stage==='ch6-early-machine')return nodes.slice(0,nodes.findIndex(n=>n.evidenceId==='E48')+1);
 if(stage==='ch6-overlay'&&known.includes('E48'))return nodes.slice(nodes.findIndex(n=>n.id==='S_CH06_03_0011'));
 return nodes;
}
export type Option={kind:'visit';id:string;label:string}|{kind:'task';id:TaskId;label:string};
export function options(stage:string,done:string[],known:string[],returnStage:string,evidence:string[]):Option[]{
 const out:Option[]=[],has=(k:string)=>known.includes(k),seen=(s:string)=>done.includes(s),visit=(id:string,label:string)=>out.push({kind:'visit',id,label}),task=(id:TaskId,label=script.scenes[`C_${id}`].title)=>out.push({kind:'task',id,label});
 if(stage==='ch5-departure'){if(has('K25'))visit('ch6-contact','읍내 숙소에서 다음 날 아침 백로의 원본 보존 연락 확인하기');return out;}
 if(stage.includes('personal')){visit(returnStage,'이야기를 마치고 모눈과 휴게실로 돌아가기');return out;}
 if(stage==='ch6-contact')visit('ch6-unfold','모눈을 봉만실에게 맡긴 뒤 성인 팀과 같은 보관 장부 펼치기');
 else if(!has('K26')){task('D26',['ch6-early-machine','ch6-overlay'].includes(stage)?'호숫가 보관 창고로 돌아가 같은 본장의 연결부 인증하기':undefined);if(!evidence.includes('E48'))visit('ch6-early-machine','원본은 보관 창고에 두고 적재·기록 데스크에서 두 겹 시각 인상 장치 먼저 시험하기');if(evidence.includes('E49')&&evidence.includes('E50')&&!seen('ch6-overlay'))visit('ch6-overlay','본장의 연결부 결론에 앞서 공개 사본과 촬영 이미지 먼저 겹쳐 보기');}
 else if(!seen('ch6-overlay'))visit('ch6-overlay','적재·기록 데스크에서 시각 출력과 공개 사본 겹침 비교하기');
 else if(!has('K27'))task('D27');
 else if(!seen('ch6-copier'))visit('ch6-copier','차무록을 부르고 주방의 일반 복사기 앞에서 감독 범위 확인하기');
 else if(!has('KQ06'))task('Q06');
 else if(!seen('ch6-bands'))visit('ch6-bands','휴게실의 성인 조사 탁자에서 사건·인계·오차 범위 겹치기');
 else if(!has('K28'))task('D28');
 else if(!seen('ch6-alternative'))visit('ch6-alternative','모눈은 봉만실 곁에 두고 연회장에서 가장 강한 외투 대안 듣기');
 else if(!has('K29'))task('D29');
 else if(!seen('ch6-briefing'))visit('ch6-briefing','연회장 증거 탁자에서 다섯 역할의 최종 발표 준비하기');
 else if(!has('K30'))task('D30');
 else if(!seen('ch6-aftermath'))visit('ch6-aftermath','공식 절차로 자료를 인계하고 휴게실의 모눈에게 돌아가기');
 if(seen('ch6-aftermath')){
  if(!seen('ch6-personal1'))visit('ch6-personal1','모눈과 처음 허락받은 의자 소리 다시 듣기');
  if(!seen('ch6-personal2'))visit('ch6-personal2','모눈을 봉만실에게 잠시 맡기고 보관 창고에서 고친 인수 확인서 보기');
  if(!seen('ch6-personal3'))visit('ch6-personal3','모눈과 공개 연회장에서 정리하는 사람들 만나기');
 }
 return out;
}
