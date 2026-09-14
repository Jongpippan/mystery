import {script,type ScriptNode} from './script';
import {type Challenge,type Draft,type Judgment,type Stage,sections,stageNodes as firstChapterStageNodes} from './chapter-one';
export const taskIds=['D21','Q05','D22','D23','D24','D25'] as const;
export type TaskId=typeof taskIds[number];
const field=(id:string,label:string,options:[string,string][])=>({id,label,options:options.map(([value,label])=>({value,label}))});
const cfg=(id:TaskId,required:string[],fields:Challenge['fields'],errors:string[],missing:[string,string][],h0:string):Challenge=>({required,fields,evidence:true,success:`B_${id}_success`,errors:Object.fromEntries(errors.map(k=>[k,`B_${id}_err_${k}`])),hints:[h0,'0011','0021','0031','0041'],missing,errorHints:Object.fromEntries(errors.map((k,n)=>[k,`003${n+2}`]))});
export const challenges:Record<TaskId,Challenge>={
 D21:cfg('D21',['E40','E42'],[
  field('visible','반투명 창에서 보이는 것',[['motion','성인 사람 수와 큰 전후 움직임은 구별된다'],['nothing','유리가 흐리므로 어떤 움직임도 볼 수 없다']]),
  field('identity','얼굴·표정·의복 색으로 신원을 정할 수 있는가',[['unknown','얼굴과 의복 색은 신뢰할 수 없어 신원은 별도 증거가 필요하다'],['identified','키와 자세로 차무록임을 식별할 수 있다']])
 ],['silhouette_identifies_person','nothing_was_visible'],[['E40','0002'],['E42','0003']],'0004'),
 Q05:cfg('Q05',['E41','K21'],[
  field('statement','따져 물을 현재 진술',[['S_Q05_v1',script.utterances.S_Q05_v1.text]]),
  field('source','수첩과 현재 진술의 관계',[['one','같은 사람의 한 관찰에서 나온 메모와 진술이다'],['two','독립된 두 목격자가 같은 행동을 확인했다']]),
  field('request','어디까지 다시 물을까',[['movement','움직임을 못 봤다는 말과 메모의 차이를 묻되 신원·색은 요구하지 않는다'],['color','추측해서라도 외투 색을 말해야 진술을 믿겠다고 한다']])
 ],['notebook_is_second_witness','demand_guessed_coat_color'],[['E41','0002'],['K21','0003']],'0004'),
 D22:cfg('D22',['E42','E43','E45'],[
  field('fit','목격된 순서와 가장 맞는 설명',[['push','먼저 다가감 → 두 팔 접촉 → 상대의 뒤쪽 이동'],['stumble','접근·선행 팔 동작 없이 혼자 먼저 헛디딤'],['help','상대의 흔들림 뒤 접근해 붙잡으며 가까워짐']]),
  field('basis','행동 판단의 근거와 한계',[['witness','제한된 목격을 오늘의 세 동작 비교로 검증한다'],['gate','게이트가 열려 있다는 사실만으로 밀침이 증명된다'],['record','오늘 실험은 어제 실제 행동의 독립 기록이다']])
 ],['open_gate_proves_push','test_is_record_of_past'],['E42','E43','E45'].map(k=>[k,'0002']),'0003'),
 D23:cfg('D23',['E43','K09','E13','E17','E18'],[
  field('before','목격 동작에 앞선 경계',[['cue','20:18 실시간 조명 확인 신호'],['voice','20:30 정산 안내 목소리']]),
  field('after','목격 동작 뒤의 경계',[['reset','20:20 전원 복귀·리셋 확인'],['outage','20:19 차단 그 자체가 사건 시각이다']]),
  field('margin','시계 대조의 1분 오차 적용',[['outward','앞 경계는 1분 앞, 뒤 경계는 1분 뒤로 넓힌다'],['exact','명목상 시각을 그대로 확정한다']]),
  field('scope','이 범위가 뜻하는 것',[['incident','추락 행동의 입증 가능한 범위'],['death','정확한 생리적 사망 시각']])
 ],['outage_alone_dates_death','recorded_voice_proves_alive_2030'],[['E43','0002'],...['K09','E13','E17','E18'].map(k=>[k,'0003'] as [string,string])],'0004'),
 D24:cfg('D24',['E44','E46','E47','E10'],[
  field('match','찢김·수선선의 물리적 일치가 연결하는 것',[['coat','현장 조각과 붉은 비옷 · 사건 당시 착용자는 아직 다툼이 있다'],['holder','나중에 비옷을 가진 탁두철이 사건 당시 밀친 사람이다']]),
  field('witness','옷의 색을 목격 진술에서 가져올 수 있는가',[['unknown','목격자는 얼굴·옷 색을 식별하지 못했다'],['red','반투명 창에서 붉은 비옷을 봤다']])
 ],['later_holder_is_actor','silhouette_identifies_red'],['E44','E46','E47','E10'].map(k=>[k,'0002']),'0003'),
 D25:cfg('D25',['K20','K22','K23','K24','E27','E30'],[
  field('remaining','남아 있는 두 설명',[['both','차무록 계속 착용과 탁두철 조기 대여를 둘 다 남긴다'],['settled','공개 사본의 시각으로 탁두철의 사건 기회와 밀침을 확정한다']]),
  field('next','두 설명을 가를 다음 확인',[['custody','실제 인계 시간과 공개 사본의 보관·복사 경로를 같은 제본 원본으로 확인한다'],['weapon','새로운 무기를 찾아야 두 설명을 구분할 수 있다']])
 ],['disputed_copy_already_identifies_actor'],[...['K20','K22','K23','K24'].map(k=>[k,'0002'] as [string,string]),['E27','0003'],['E30','0003']],'0004')
};
challenges.D22.errors.action_mismatch='UI_ONLY';challenges.D23.errors.clock_margin='UI_ONLY';challenges.D25.errors.unrelated_weapon='UI_ONLY';
export const uiFeedback={action_mismatch:'선택한 동작의 앞뒤 순서가 정정된 목격과 맞지 않습니다. 접근·두 팔·상대의 뒤쪽 이동을 세 비교 기록에 각각 놓아 보세요.',clock_margin:'서로 다른 시계의 명목상 숫자를 그대로 확정할 수 없습니다. 앞뒤 경계에 시계 대조에서 확인한 오차를 적용해 주세요.',unrelated_weapon:'현재 두 설명의 차이는 인계 시각과 옷의 이동에 있습니다. 이미 확보한 원본의 펼침과 사본의 보관·복사 경로를 확인할 방법을 선택해 주세요.'};
export function judge(id:TaskId,d:Draft,held:string[]):Judgment{
 const c=challenges[id],f=d.fields;
 if(c.required.some(k=>!held.includes(k)))return {kind:'incomplete',message:'필요한 자료나 선행 판단이 남아 있습니다. 확인한 범위부터 이어갈 수 있습니다.'};
 if(c.fields.some(k=>!k.options.some(o=>o.value===f[k.id]))||!d.evidence.length)return {kind:'incomplete',message:'주장 항목과 제시할 자료를 먼저 선택해 주세요.'};
 let key='';
 if(id==='D21')key=f.identity==='identified'?'silhouette_identifies_person':f.visible==='nothing'?'nothing_was_visible':'';
 if(id==='Q05')key=f.source==='two'?'notebook_is_second_witness':f.request==='color'?'demand_guessed_coat_color':'';
 if(id==='D22')key=f.basis==='gate'?'open_gate_proves_push':f.basis==='record'?'test_is_record_of_past':f.fit!=='push'?'action_mismatch':'';
 if(id==='D23')key=f.before==='voice'?'recorded_voice_proves_alive_2030':f.after==='outage'||f.scope==='death'?'outage_alone_dates_death':f.margin!=='outward'?'clock_margin':'';
 if(id==='D24')key=f.match==='holder'?'later_holder_is_actor':f.witness==='red'?'silhouette_identifies_red':'';
 if(id==='D25')key=f.remaining==='settled'?'disputed_copy_already_identifies_actor':f.next!=='custody'?'unrelated_weapon':'';
 if(key)return {kind:'error',key};
 if(c.required.filter(k=>k.startsWith('E')).some(k=>!d.evidence.includes(k)))return {kind:'error',key:'unsupported_evidence'};
 return {kind:'success',route:''};
}
export const setupNodes=(id:TaskId)=>sections(`C_${id}`,['Script']);
export const responseNodes=(id:TaskId,r:Judgment)=>r.kind==='success'?sections(`C_${id}`,[challenges[id].success]):r.kind==='error'&&challenges[id].errors[r.key]?sections(`C_${id}`,[challenges[id].errors[r.key]]):[];
export function hintLine(id:TaskId,level:number,held:string[],_draft:Draft,error='',_interrupted=false){
 void _interrupted; // This chapter's accepted selectors preserve the requested held-source level on interruption.
 const c=challenges[id],prefix=`S_H_${id}_`;
 if(held.includes(id.startsWith('Q')?`K${id}`:id.replace('D','K')))return prefix+'0091';
 const missing=c.missing.find(([k])=>!held.includes(k));if(missing)return prefix+missing[1];
 return prefix+(level===3&&c.errorHints[error]?c.errorHints[error]:c.hints[level]);
}
export function visitHint(level:number,held:string[],requested:boolean,supervised:boolean,interrupted=false,complete=false){
 const missing=!held.includes('E40')?'0032':!held.includes('E41')?'0033':!held.includes('E42')?'0042':null;
 return 'S_H_V05_'+(complete?'0091':!requested?'0002':!supervised?'0011':interrupted?'0022':missing??['0001','0012','0021','0031','0041'][level]);
}
export const stages:Record<string,Stage>={
 'ch5-handoff':{scene:'C_CH05_01',parts:['Script']},'ch5-panes':{scene:'C_CH05_02',parts:['Script']},'ch5-gate':{scene:'C_CH05_03',parts:['Script']},
 'ch5-compare':{scene:'C_CH05_04',parts:['Script']},'ch5-first-result':{scene:'C_CH05_05',parts:['Script']},'ch5-both-results':{scene:'C_CH05_05',parts:['Script']},
 'ch5-reunion':{scene:'C_CH05_06',parts:['Script']},'ch5-coat':{scene:'C_CH05_07',parts:['Script']},'ch5-departure':{scene:'C_CH05_08',parts:['Script']},
 'ch5-photo':{scene:'C_CH01_02',parts:['Optional early evidence']},
 'ch5-personal1':{scene:'C_CH05_O1',parts:['Script']},'ch5-personal2':{scene:'C_CH05_O2',parts:['Script']},'ch5-personal3':{scene:'C_CH05_O3',parts:['Script']}
};
export function stageNodes(stage:string,known:string[]):ScriptNode[]{
 const c=stages[stage];
 if(stage==='ch5-photo')return firstChapterStageNodes('photo',known,{});
 if(c.scene==='C_CH05_05'){
  const condition=known.includes('K22')&&known.includes('K23')?'If K22 and K23 acquired':known.includes('K22')?'If K22 acquired and K23 not yet':'If K23 acquired and K22 not yet';
  return script.scenes[c.scene].nodes.filter(n=>n.section[0]==='Script'&&n.condition===condition);
 }
 return sections(c.scene,c.parts).filter(n=>n.id!=='C_CH05_O2:n0006').map(n=>n.kind==='display'?{...n,text:n.text.replace('Objective:','목표:')}:n);
}
export type Option={kind:'visit';id:string;label:string}|{kind:'task';id:TaskId;label:string};
export function options(stage:string,done:string[],known:string[],returnStage:string,evidence:string[]=[]):Option[]{
 const out:Option[]=[],has=(k:string)=>known.includes(k),seen=(s:string)=>done.includes(s),visit=(id:string,label:string)=>out.push({kind:'visit',id,label}),task=(id:TaskId,label=script.scenes[`C_${id}`].title)=>out.push({kind:'task',id,label});
 if(stage==='ch4-departure'){if(has('K20'))visit('ch5-handoff','휴게실에서 새벽 경위에게 안전한 시야 확인 요청하기');return out;}
 if(stage==='ch5-departure')return out;
 if(stage.includes('personal')){visit(returnStage,'모눈의 감독을 확인하고 원래 조사 자리로 돌아가기');return out;}
 if(stage==='ch5-handoff')visit('ch5-panes','모눈을 봉만실에게 맡기고 현관·연회장을 지나 음향 부스로');
 else if(!seen('ch5-gate'))visit('ch5-gate','새벽 경위와 서비스 접속부를 지나 상부 랜딩 장벽 밖으로');
 else if(!has('K21'))task('D21','음향 부스로 돌아가 보이는 특징과 안 보이는 특징 나누기');
 else if(!has('KQ05'))task('Q05');
 else if(!seen('ch5-compare'))visit('ch5-compare','통제선 밖 성인 위치에서 세 동작의 시야 비교하기');
 else if((has('K22')||has('K23'))&&!seen('ch5-first-result'))visit('ch5-first-result','음향 부스에서 먼저 끝난 판단과 남은 질문 이야기하기');
 else if(!has('K22')||!has('K23')){if(!has('K22'))task('D22');if(!has('K23'))task('D23');}
 else if(!seen('ch5-both-results'))visit('ch5-both-results','음향 부스에서 두 판단 뒤에도 남는 책임 이야기하기');
 else if(!seen('ch5-reunion'))visit('ch5-reunion','휴게실로 돌아가 모눈을 다시 맡고 공개 신호 돌아보기');
 else if(!evidence.includes('E10'))visit('ch5-photo','휴게실의 봉만실에게 아직 받지 않은 공개 점검 사진 요청하기');
 else if(!seen('ch5-coat'))visit('ch5-coat','모눈을 봉만실 곁에 맡기고 현관에서 옷깃과 각자의 인계 진술 확인하기');
 else if(!has('K24'))task('D24');
 else if(!has('K25'))task('D25','휴게실로 돌아가 두 설명을 가를 원본 확인 정리하기');
 else visit('ch5-departure','오늘 조사를 마치고 모눈과 읍내 게스트하우스로 돌아가기');
 if(seen('ch5-reunion')&&!seen('ch5-personal1'))visit('ch5-personal1','휴게실에서 모눈과 안전해서 빠진 자리 이야기하기');
 if(seen('ch5-compare')&&!seen('ch5-personal2'))visit('ch5-personal2','모눈의 감독을 봉만실에게 확인하고 연회장의 두철·해금 만나기');
 if(has('K25')&&!seen('ch5-personal3'))visit('ch5-personal3','휴게실에서 봉만실과 사진 속 빈 의자 이야기하기');
 return out;
}
