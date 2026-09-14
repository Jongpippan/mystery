import {script,type ScriptNode} from './script';
import {type Challenge,type Draft,type Judgment,type Stage,sections} from './chapter-one';
import type {ChoiceNode} from './chapter-two';
export const taskIds=['D16','D17','Q04','D18','D19','D20'] as const;
export type TaskId=typeof taskIds[number];
const field=(id:string,label:string,options:[string,string][])=>({id,label,options:options.map(([value,label])=>({value,label}))});
const cfg=(id:TaskId,required:string[],fields:Challenge['fields'],errors:string[],missing:[string,string][],h0='0003'):Challenge=>({required,fields,evidence:required.some(k=>k.startsWith('E')),success:`B_${id}_success`,errors:Object.fromEntries(errors.map(k=>[k,`B_${id}_err_${k}`])),hints:[h0,'0011','0021','0031','0041'],missing,errorHints:Object.fromEntries(errors.map((k,n)=>[k,`003${n+2}`]))});
const purposes:[string,string][]=[['loan','운영자금 대출 담보 승인'],['pledge','급여 선지급을 위한 별도 담보'],['waiver','겉으로 정산금 수령 포기를 주장함'],['storage','사본 외부 보관 동의 · 금전 권리 유지']];
const responsibilities:[string,string][]=[['loan','운영자금 대출 승인과 부족한 위험 설명'],['pledge','두 번째 담보와 이를 숨긴 책임'],['diversion','목적 문서 대체·승인 밖 자금 이동·원본 공개를 막을 이유'],['clear','다른 사람 잘못이 더 크므로 이 사람 책임은 없음']];
export const challenges:Record<TaskId,Challenge>={
 D16:cfg('D16',['E31','E32','E33','E34'],[
  ...['E31','E32','E33','E34'].map(id=>field(id,script.evidence[id].title,purposes)),
  field('scope','서명과 동의 범위의 관계',[['distinct','각 문서의 목적과 서명 권한은 서로 대신할 수 없다'],['same','네 문서 모두 같은 범위로 정산금 사용을 허락한다'],['forged','목적이 충돌하므로 서명 자체가 전부 위조됐다']])
 ],['all_consent_has_same_scope','all_signatures_forged'],['E31','E32','E33','E34'].map(id=>[id,'0002'])),
 D17:cfg('D17',['K16','E33','E34','E26','V04_EDGES'],[
  field('comparison','서명지의 원래 연결을 판단할 근거',[['edges','원래 목적 페이지의 가장자리·순서와, 취합본의 재부착·번호 충돌을 대조한다'],['handwriting','필체가 닮았으므로 현재 표지도 원래부터 같은 묶음이다']]),
  field('scope','이 기록으로 판단할 수 있는 범위',[['reuse','기존 서명지를 재사용하며 목적 표지를 바꾼 묶음으로 판단한다'],['murder','종이 재부착 흔적이 있으므로 문서를 바꾼 사람이 살인범이다']])
 ],['handwriting_intuition_only','tear_identifies_murderer'],['K16','E33','E34','E26','V04_EDGES'].map(id=>[id,'0002'])),
 Q04:cfg('Q04',['K17','E31','E34'],[
  field('statement','따져 물을 현재 진술',[['S_Q04_v1',script.utterances.S_Q04_v1.text]]),
  field('scope','대출 승인과 직원 서명을 구분한 반박',[['limited','운영자금 대출 승인은 실제지만, 외부 보관 서명은 정산금 포기 동의가 아니다'],['no_loan','포기 문구가 틀렸으므로 봉만실은 어떤 금융 위험도 승인하지 않았다']])
 ],['owner_authorized_no_loan'],['K17','E31','E34'].map(id=>[id,'0002'])),
 D18:cfg('D18',['E35','E37','K16','E36'],[
  field('movement','실제 돈 이동의 근거',[['bank','은행 출금과 수령 확인을 거래처 연결·공사 장부와 함께 대조한다'],['contact','차무록이 거래처 연락처를 제출한 사실만으로 유용을 확정한다']]),
  field('authority','그 이동과 승인 문서의 관계',[['outside','대출·외부 보관 어느 승인도 해당 거래처로 정산금을 보낼 권한을 주지 않는다'],['pledge','배한술의 두 번째 담보가 해담설비 수령과 같은 거래다']]),
  field('origins','자료의 출처를 세는 방식',[['independent','은행·공사 원본·통지 패킷의 역할을 나누고 동일인 설명을 중복 증거로 세지 않는다'],['duplicate','차무록이 제출한 등록과 차무록 설명을 두 독립 출처로 센다']])
 ],['account_contact_alone_proves_diversion','second_pledge_equals_contractor_receipt','same_origin_as_independent'],[['E35','0002'],['E37','0002'],['K16','0003'],['E36','0003']],'0004'),
 D19:cfg('D19',['E19','E37','E38','E39','K18'],[
  field('pressure','원본 확인을 막을 구체적 이유',[['exposure','자금 이동 노출 위험과 두 번째 담보 비밀을 이용한 압박을 연결한다'],['rude','피해자가 무례했으므로 직원 모두의 살해 동기는 같다']]),
  field('meeting','원본 요청과 약속 카드의 범위',[['intention','원본 확인 의도와 예정된 만남을 보이지만 실제 참석·밀침은 아직 모른다'],['plan','장소가 적혔으므로 그곳에서 죽일 계획까지 증명된다']])
 ],['rudeness_makes_all_motives_equal','note_predicts_exact_murder'],['E19','E37','E38','E39','K18'].map(id=>[id,'0002'])),
 D20:cfg('D20',['K16','K17','K18','K19'],[
  field('P02','봉만실의 확인된 책임',responsibilities),field('P06','배한술의 확인된 책임',responsibilities),field('P03','차무록의 확인된 책임',responsibilities),
  field('act','아직 별도로 검증해야 할 것',[['open','수영장의 실제 행동과 행위자는 현장 증거로 검증해야 한다'],['push','자금 유용과 문서 대체를 증명했으므로 밀침도 증명됐다']])
 ],['only_one_person_at_fault','finance_papers_prove_push'],['K16','K17','K18','K19'].map(id=>[id,'0002']))
};
challenges.D16.errors.purpose_mismatch='UI_ONLY';challenges.D20.errors.responsibility_mismatch='UI_ONLY';
export const uiFeedback={purpose_mismatch:'문서와 목적의 짝이 원문에 적힌 범위와 맞지 않습니다. 각 목적 문장을 다시 확인해 네 칸을 나누어 주세요.',responsibility_mismatch:'선택한 책임이 해당 인물이 한 행동과 맞지 않습니다. 대출 승인, 두 번째 담보, 문서 대체와 자금 이동을 사람별 기록에 다시 연결해 주세요.'};
export function judge(id:TaskId,d:Draft,held:string[]):Judgment{
 const c=challenges[id],f=d.fields;
 if(c.required.some(k=>!held.includes(k)))return {kind:'incomplete',message:'필요한 자료나 선행 대조가 남아 있습니다. 힌트에서 확인할 곳을 볼 수 있습니다.'};
 if(c.fields.some(k=>!k.options.some(o=>o.value===f[k.id]))||c.evidence&&!d.evidence.length)return {kind:'incomplete',message:'주장 항목과 필요한 제시 자료를 먼저 선택해 주세요.'};
 let key='';
 if(id==='D16')key=f.scope==='same'?'all_consent_has_same_scope':f.scope==='forged'?'all_signatures_forged':f.E31!=='loan'||f.E32!=='pledge'||f.E33!=='waiver'||f.E34!=='storage'?'purpose_mismatch':'';
 if(id==='D17')key=f.comparison==='handwriting'?'handwriting_intuition_only':f.scope==='murder'?'tear_identifies_murderer':'';
 if(id==='Q04')key=f.scope==='no_loan'?'owner_authorized_no_loan':'';
 if(id==='D18')key=f.movement==='contact'?'account_contact_alone_proves_diversion':f.authority==='pledge'?'second_pledge_equals_contractor_receipt':f.origins==='duplicate'?'same_origin_as_independent':'';
 if(id==='D19')key=f.pressure==='rude'?'rudeness_makes_all_motives_equal':f.meeting==='plan'?'note_predicts_exact_murder':'';
 if(id==='D20')key=f.act==='push'?'finance_papers_prove_push':[f.P02,f.P06,f.P03].includes('clear')?'only_one_person_at_fault':f.P02!=='loan'||f.P06!=='pledge'||f.P03!=='diversion'?'responsibility_mismatch':'';
 if(key)return {kind:'error',key};
 if(c.required.filter(k=>k.startsWith('E')).some(k=>!d.evidence.includes(k)))return {kind:'error',key:'unsupported_evidence'};
 return {kind:'success',route:''};
}
export const setupNodes=(id:TaskId)=>sections(`C_${id}`,['Script']);
export const responseNodes=(id:TaskId,r:Judgment)=>r.kind==='success'?sections(`C_${id}`,[challenges[id].success]):r.kind==='error'&&challenges[id].errors[r.key]?sections(`C_${id}`,[challenges[id].errors[r.key]]):[];
export function hintLine(id:TaskId,level:number,held:string[],_draft:Draft,error='',interrupted=false){
 const c=challenges[id],prefix=`S_H_${id}_`;
 if(held.includes(id.startsWith('Q')?`K${id}`:id.replace('D','K')))return prefix+'0091';
 const missing=c.missing.find(([k])=>!held.includes(k));if(missing)return prefix+missing[1];
 if(level===3&&c.errorHints[error])return prefix+c.errorHints[error];
 if(level===3&&interrupted)return prefix+'0042';return prefix+c.hints[level];
}
export function visitHint(level:number,held:string[],joined:boolean,interrupted=false){
 const purposes=['E31','E32','E33','E34'].every(id=>held.includes(id));
 const suffix=purposes&&['E35','E37'].every(id=>held.includes(id))?'0091':!joined?'0001':!purposes?'0002':held.includes('KQ04')?'0032':interrupted&&level>0?'0041':['0003','0011','0021','0031','0041'][level];
 return `S_H_V04_${suffix}`;
}
export const stages:Record<string,Stage>={
 'ch4-meeting':{scene:'C_CH04_01',parts:['Script']},'ch4-originals':{scene:'C_CH04_02',parts:['Script']},'ch4-edges':{scene:'C_CH04_03',parts:['Script']},
 'ch4-aftermath':{scene:'C_CH04_04',parts:['Script']},'ch4-transactions':{scene:'C_CH04_05',parts:['Script']},'ch4-pressure':{scene:'C_CH04_06',parts:['Script']},
 'ch4-card':{scene:'C_CH04_07',parts:['Script']},'ch4-departure':{scene:'C_CH04_08',parts:['Script']},'ch4-personal1':{scene:'C_CH04_O1',parts:['Script']},
 'ch4-personal2':{scene:'C_CH04_O2',parts:['Choice']},'ch4-personal3':{scene:'C_CH04_O3',parts:['Script']}
};
export function stageNodes(stage:string,_known:string[],choices:Record<string,string>):(ScriptNode|ChoiceNode)[]{
 const c=stages[stage];if(stage!=='ch4-personal2')return sections(c.scene,c.parts).map(n=>n.kind==='display'?{...n,text:n.text.replace('Objective:','목표:')}:n);
 const options=[{value:'attributed_accounts',text:script.utterances.S_CH04_O2_0001.text},{value:'joint_annotations',text:script.utterances.S_CH04_O2_0011.text}];
 return [{kind:'choice',id:'B_EXHIBIT',choice:'B_EXHIBIT',text:'전시용 사본에 각자의 설명을 어떻게 남길까?',options},...script.scenes[c.scene].nodes.filter(n=>n.section[0]==='Choice B_EXHIBIT'&&n.section[1]===`Option \`${choices.B_EXHIBIT}\``)];
}
export type Option={kind:'visit';id:string;label:string}|{kind:'task';id:TaskId;label:string};
export function options(stage:string,done:string[],known:string[],returnStage:string):Option[]{
 const out:Option[]=[],has=(k:string)=>known.includes(k),seen=(s:string)=>done.includes(s),visit=(id:string,label:string)=>out.push({kind:'visit',id,label}),task=(id:TaskId,label=script.scenes[`C_${id}`].title)=>out.push({kind:'task',id,label});
 if(stage==='ch3-departure'){if(has('K15'))visit('ch4-meeting','휴게실 원본 대조 자리에 모인 사람들과 회의 시작하기');return out;}
 if(stage.includes('personal')){visit(returnStage,'이야기를 마치고 원래 조사 자리로 돌아가기');return out;}
 if(stage==='ch4-meeting')visit('ch4-originals','가져온 봉투를 하나씩 열어 목적 문구 확인하기');
 else if(!has('K16'))task('D16');
 else if(!seen('ch4-edges'))visit('ch4-edges','모눈을 봉만실 곁에 두고 현관을 지나 연회장 자료 대조 탁자로');
 else if(!has('K17'))task('D17');
 else if(!has('KQ04'))task('Q04','휴게실로 돌아가 봉만실에게 직원 서명의 범위 따져 묻기');
 else if(!seen('ch4-aftermath'))visit('ch4-aftermath','휴게실에서 정정 뒤에도 남는 책임 이야기하기');
 else if(!seen('ch4-transactions'))visit('ch4-transactions','봉만실의 감독을 확인하고 현관에서 거래 자료 대조하기');
 else if(!has('K18'))task('D18');
 else if(!seen('ch4-pressure'))visit('ch4-pressure','휴게실로 돌아가 배한술·탁두철과 메모 확인하기');
 else if(!seen('ch4-card'))visit('ch4-card','진새벽과 연회장 자료 대조 탁자에서 약속 카드 확인하기');
 else if(!has('K19'))task('D19');
 else if(!has('K20'))task('D20','휴게실로 돌아가 세 사람의 책임 나누어 정리하기');
 else if(!seen('ch4-departure'))visit('ch4-departure','휴게실에서 소해금의 안전한 시야 확인 요청 듣기');
 if(['ch4-aftermath','ch4-pressure','ch4-departure'].includes(stage)&&!seen('ch4-personal1'))visit('ch4-personal1','같은 휴게실의 모눈 곁에서 목소리 라벨과 서명 이야기하기');
 if(has('K20')&&!seen('ch4-personal2'))visit('ch4-personal2','휴게실에서 봉만실·배한술과 전시 설명 방식 정하기');
 if(['ch4-transactions','ch4-departure'].includes(stage)&&!seen('ch4-personal3'))visit('ch4-personal3','현관에서 차무록·목백로의 공개 사본 이야기 듣기');
 return out;
}
