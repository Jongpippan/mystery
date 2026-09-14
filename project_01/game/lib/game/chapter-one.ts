import { script, type ScriptNode } from './script';

export const taskIds = ['D01','D02','Q01','D03','D04','D05'] as const;
export type TaskId = typeof taskIds[number];
export type Draft = { evidence:string[]; fields:Record<string,string>; note:string; roleEvidence?:Record<string,string[]>; roleNotes?:Record<string,string>; sourceRole?:string; sourceScroll?:number };
export type Field = { id:string; label:string; options:{value:string;label:string}[] };
export type Challenge = { required:string[]; fields:Field[]; evidence:boolean; success:string; errors:Record<string,string>; hints:string[]; missing:[string,string][]; errorHints:Record<string,string> };
const field=(id:string,label:string,options:[string,string][]):Field=>({id,label,options:options.map(([value,label])=>({value,label}))});
export const challenges:Record<TaskId,Challenge> = {
  D01:{required:['E03','E05'],evidence:true,fields:[
    field('x6','칸막이가 6m 정지선일 때 북쪽 창',[['east','동쪽 작업실'],['west','서쪽 공개 공간']]),
    field('x9','칸막이가 9m 정지선일 때 북쪽 창',[['east','동쪽 작업실'],['west','서쪽 공개 공간']]),
    field('fixed','배치가 바뀌는 원리',[['boundary','창과 문은 고정되고 칸막이만 이동한다'],['moving','창이나 문도 칸막이와 함께 이동한다']])],
    success:'B_D01_success',errors:{moving_window_or_door:'B_D01_err_moving_window_or_door',wrong_partition_side:'UI_ONLY'},hints:['0003','0011','0021','0032','0042'],missing:[['E05','0001'],['E03','0002']],errorHints:{moving_window_or_door:'0033'}},
  D02:{required:['K01','E04','E05'],evidence:true,fields:[
    field('history','기록과 실측으로 뒷받침되는 작업',[['work','19:40–46, 탁두철·봉만실이 행사 준비로 9m에 옮겼다'],['track','최근 바퀴 자국만으로 정확한 이동 시각을 알 수 있다'],['alone','범행 도중 한 사람이 몰래 칸막이를 옮겼다']])],
    success:'B_D02_success',errors:{fresh_track_dates_exact_move:'B_D02_err_fresh_track_dates_exact_move',culprit_moved_alone:'B_D02_err_culprit_moved_alone'},hints:['0004','0011','0021','0032','0042'],missing:[['K01','0001'],['E04','0002'],['E05','0003']],errorHints:{fresh_track_dates_exact_move:'0033',culprit_moved_alone:'0034'}},
  Q01:{required:[],evidence:true,fields:[
    field('statement','따져 물을 진술',[['S_Q01_v1',script.utterances.S_Q01_v1.text]]),
    field('route','근거를 연결할 방식',[['photo','공개 점검에서 직접 본 순서와 행사 사진'],['sightline','확인한 칸막이 배치와 창 시야·재킷 기록']]),
    field('scope','이 근거로 반박할 수 있는 범위',[['limited','두 번의 목격으로 그 사이의 연속 재실까지 확정할 수 없다'],['complicity','불확실한 진술을 했으므로 살인 공범이다']])],
    success:'B_Q01_success',errors:{uncertainty_proves_complicity:'B_Q01_err_uncertainty_proves_complicity'},hints:['0004','0011','0021','0032','0042'],missing:[],errorHints:{uncertainty_proves_complicity:'0033'}},
  D03:{required:['K01','K02','E08','E07'],evidence:true,fields:[
    field('route','연결할 자료',[['sightline','목격 정정과 의자에 걸린 재킷'],['photo','목격 정정과 직접 본 공개 점검·행사 사진']]),
    field('scope','알리바이에 관한 결론',[['limited','얼굴 없는 두 장면은 연속 재실을 증명하지 못한다. 범행 주체는 미정이다'],['culprit','의자 모습이 모호하므로 차무록이 범인이다']])],
    success:'B_D03_success',errors:{ambiguous_chair_identifies_murderer:'B_D03_err_ambiguous_chair_identifies_murderer'},hints:['0005','0011','0021','0031','0042'],missing:[['K01','0001'],['K02','0002'],['E08','0003'],['E07','0004']],errorHints:{ambiguous_chair_identifies_murderer:'0032'}},
  D04:{required:['K03','K01','E09'],evidence:true,fields:[
    field('first','창가 의자에서 첫 출구',[['guest','서쪽 공개 공간의 손님 문'],['service','칸막이를 가로질러 동쪽 작업실의 직원 문']]),
    field('second','출구 다음 구간',[['junction','바깥 공용 연결부 → 서비스 접속부'],['landing','연결부를 거치지 않고 곧바로 수영장 상부 랜딩']]),
    field('third','서비스 접속부 다음',[['boundary','동쪽 상부 랜딩 방향 통제선까지만 확인'],['through','잠긴 작업실을 열고 안쪽으로 통과']]),
    field('scope','실측이 증명하는 범위',[['feasible','동쪽 작업실이 잠겨 있어도 공용 우회 경로는 가능하다'],['observed','가능한 경로이므로 차무록이 실제로 지나간 것이 확인됐다']])],
    success:'B_D04_success',errors:{route_crosses_closed_partition:'B_D04_err_route_crosses_closed_partition',feasible_route_proves_observed_use:'B_D04_err_feasible_route_proves_observed_use',unconnected_route:'UI_ONLY'},hints:['0004','0011','0021','0031','0042'],missing:[['K03','0001'],['K01','0003'],['E09','0002']],errorHints:{route_crosses_closed_partition:'0032',feasible_route_proves_observed_use:'0033'}},
  D05:{required:['K02','K03','K04'],evidence:false,fields:[
    field('work','실제 칸막이 작업',[['preparation','탁두철·봉만실의 행사 전 정상 작업'],['conspiracy','세 사람이 범행을 위해 합의한 공동 작업']]),
    field('witness','봉만실의 목격',[['overclaim','얼굴 없는 두 순간을 연속 재실로 확장한 착오'],['conspiracy','범행을 함께 감추려 꾸민 목격']]),
    field('beneficiary','차무록의 방 알리바이',[['weak','재킷이 남아 있었다고 사람이 계속 있었다고 할 수는 없다'],['conspiracy','재킷을 남긴 의도와 공모까지 입증됐다']]),
    field('route','출입 가능성과 남은 문제',[['open','공용 우회는 가능하지만 실제 사용자·범행 주체는 아직 모른다'],['unlocked','동쪽 작업실을 포함해 모든 문이 열려 있었다']])],
    success:'B_D05_success',errors:{collective_guilt:'B_D05_err_collective_guilt',all_rooms_unlocked:'B_D05_err_all_rooms_unlocked'},hints:['0004','0011','0021','0031','0042'],missing:[['K02','0001'],['K03','0002'],['K04','0003']],errorHints:{collective_guilt:'0032',all_rooms_unlocked:'0033'}}
};
export type Judgment = {kind:'incomplete';message:string}|{kind:'error';key:string}|{kind:'success';route:string};
export const uiFeedback:Record<string,string>={
  unsupported_evidence:'선택한 자료로는 이 연결을 뒷받침할 수 없습니다. 아래 답안과 자료의 실제 관찰 범위를 비교해 주세요. 조사할 자료를 모두 찾았다면, 주장에 필요한 자료를 제시 목록에도 선택했는지 확인해 주세요.',
  wrong_partition_side:'고정된 창 좌표와 선택한 동쪽·서쪽 분류가 맞지 않습니다. 창과 문을 옮기지 않고, 각 정지선에 칸막이를 놓았을 때 창이 어느 쪽에 남는지 도면에서 다시 확인해 주세요.',
  unconnected_route:'출구와 다음 구간이 실측한 길에서 이어지지 않습니다. 손님 문 뒤의 연결부와 서비스 접속부를 거쳐 확인했던 순서를 출입 동선 실측과 비교해 주세요.'
};
export function judge(id:TaskId,draft:Draft,held:string[]):Judgment {
  const c=challenges[id], f=draft.fields;
  if(c.required.some(k=>!held.includes(k))) return {kind:'incomplete',message:'먼저 필요한 조사와 선행 추리를 확인해 주세요. 힌트에서 돌아갈 곳을 볼 수 있습니다.'};
  if(c.fields.some(field=>!field.options.some(o=>o.value===f[field.id])))return {kind:'incomplete',message:'비어 있는 답안 항목을 먼저 선택해 주세요.'};
  if(id==='Q01'&&!(f.route==='photo'?['E10','E18']:['E06','E07','K02']).every(k=>held.includes(k)))return {kind:'incomplete',message:'선택한 반박 경로에 필요한 자료 확인이 남아 있습니다. 힌트에서 조사할 곳을 확인해 주세요.'};
  if(id==='D03'&&f.route==='photo'&&!['E10','E18'].every(k=>held.includes(k)))return {kind:'incomplete',message:'사진 경로를 쓰려면 실제 공개 행사 사진을 먼저 확인해야 합니다.'};
  if(c.evidence&&!draft.evidence.length)return {kind:'incomplete',message:'주장을 뒷받침할 자료를 선택해 주세요.'};
  const has=(...ids:string[])=>ids.every(e=>draft.evidence.includes(e)&&held.includes(e));
  let key='';const route=f.route??'';
  if(id==='D01'){if(f.fixed!=='boundary')key='moving_window_or_door';else if(f.x6!=='east'||f.x9!=='west')key='wrong_partition_side';}
  if(id==='D02'&&f.history!=='work')key=f.history==='track'?'fresh_track_dates_exact_move':'culprit_moved_alone';
  if(id==='Q01'&&f.scope!=='limited')key='uncertainty_proves_complicity';
  if(id==='D03'&&f.scope!=='limited')key='ambiguous_chair_identifies_murderer';
  if(id==='D04') {if(f.first!=='guest'||f.third!=='boundary')key='route_crosses_closed_partition';else if(f.second!=='junction')key='unconnected_route';else if(f.scope!=='feasible')key='feasible_route_proves_observed_use';}
  if(id==='D05'){if(f.work!=='preparation'||f.witness!=='overclaim'||f.beneficiary!=='weak')key='collective_guilt';else if(f.route!=='open')key='all_rooms_unlocked';}
  if(key)return {kind:'error',key};
  const supported=id==='D01'?has('E03','E05'):id==='D02'?has('E04','E05'):id==='Q01'?(route==='photo'?has('E10','E18'):has('E06','E07')&&held.includes('K02')):id==='D03'?(route==='photo'?has('E08','E10','E18'):has('E08','E07')):id==='D04'?has('E09'):true;
  if(!supported)return {kind:'error',key:'unsupported_evidence'};
  return {kind:'success',route};
}

// Explicit source sections prevent rendering unchosen errors or author metadata.
export function sections(sceneId:string,prefixes:string[]):ScriptNode[] {
  return script.scenes[sceneId].nodes.filter(n=>prefixes.some(p=>n.section[0]?.startsWith(p))&&(!n.condition||n.section[0]==='Chapter exit')&&
    !(n.kind==='display'&&/여유|추리:/.test(n.text))&&
    !(n.kind==='direction'&&/이 경로는|유효 경로|위 유효 실현|조건이 갖춰지면|게임 |플레이어|획득 효과|새로운 사건 증거|이 장면에서는/.test(n.text)));
}
export const setupNodes=(id:TaskId)=>sections(`C_${id}`,id==='Q01'?['Historical claim in scope','Free clarification']:['Task setup','Free clarification','Free P04 explanation']);
export function responseNodes(id:TaskId,result:Judgment):ScriptNode[] {
  if(result.kind!=='success')return result.kind==='error'&&result.key!=='unsupported_evidence'?sections(`C_${id}`,[challenges[id].errors[result.key]]):[];
  const prefixes=[challenges[id].success];
  if(id==='Q01')prefixes.unshift(result.route==='photo'?'Valid route A':'Valid route B');
  if(id==='D03')prefixes.unshift(result.route==='photo'?'Valid realization B':'Valid realization A');
  if(id==='Q01')prefixes.push('Immediate aftermath');
  if(id==='D04')prefixes.push('After success');
  return sections(`C_${id}`,prefixes);
}
export function hintLine(id:TaskId,level:number,held:string[],draft:Draft,error='') {
  const c=challenges[id], prefix=`S_H_${id}_`;
  if(held.includes(id==='Q01'?'KQ01':id.replace('D','K')))return prefix+(id==='Q01'?'0044':'0043');
  if(id==='Q01') {
    const photo=['E10','E18'].every(e=>held.includes(e));
    const sight=['E06','E07','K02'].every(e=>held.includes(e));
    if(!photo&&!sight)return prefix+(held.includes('E18')&&!held.includes('E10')?'0001':!held.includes('E06')||!held.includes('E07')?'0002':'0003');
    if(level===3&&c.errorHints[error])return prefix+c.errorHints[error];
    const usePhoto=photo&&(!sight||draft.fields.route==='photo');
    return prefix+['0004','0011',usePhoto?'0021':'0022','0032',usePhoto?'0042':'0043'][level];
  }
  const missing=c.missing.find(([key])=>!held.includes(key));
  if(missing)return prefix+missing[1];
  if(level===3&&c.errorHints[error])return prefix+c.errorHints[error];
  if(id==='D03'&&level===2&&held.includes('E10')&&held.includes('E18'))return prefix+'0022';
  return prefix+c.hints[level];
}

export type Stage = {scene:string;parts:string[];start?:string;end?:string;next?:string};
export const stages:Record<string,Stage>={
  morning:{scene:'C_CH01_01',parts:['Script'],next:'arrival'},
  arrival:{scene:'C_CH01_02',parts:['Script']},
  photo:{scene:'C_CH01_02',parts:['Optional early evidence'],start:'S_CH01_02_0031',end:'S_CH01_02_0035'},
  window:{scene:'C_CH01_03',parts:['Script','Common test authorization','If Q01'],next:'handback'},
  handback:{scene:'C_CH01_04',parts:['Script'],end:'C_CH01_04:n0005'},
  wall:{scene:'C_CH01_04',parts:['Script','If Q01'],start:'S_CH01_04_0001'},
  aftermath:{scene:'C_CH01_05',parts:['Script','Task return wording']},
  route:{scene:'C_CH01_06',parts:['Script','Task transition']},
  objection:{scene:'C_CH01_07',parts:['Script','If E10']},
  resolution:{scene:'C_CH01_08',parts:['Script — before D05']},
  departure:{scene:'C_CH01_08',parts:['After C_D05','Chapter exit']},
  personal1:{scene:'C_CH01_O1',parts:['Script','If B_PR_02','Merge']},
  personal2:{scene:'C_CH01_O2',parts:['Script']},
  personal3:{scene:'C_CH01_O3',parts:['Script']},
};
export function stageNodes(stage:string,known:string[],choices:Record<string,string>) {
  const cfg=stages[stage]; if(!cfg)return [];
  let nodes=sections(cfg.scene,cfg.parts).filter(n=>{
    const h=n.section[0]??'';
    if(h.startsWith('If Q01'))return /unresolved/.test(h)?!known.includes('KQ01'):known.includes('KQ01');
    if(h==='If E10 was not yet acquired')return !known.includes('E10');
    if(h.startsWith('If B_PR_02'))return h.endsWith(choices.B_PR_02);
    return true;
  });
  if(cfg.start)nodes=nodes.slice(nodes.findIndex(n=>n.id===cfg.start));
  if(cfg.end)nodes=nodes.slice(0,nodes.findIndex(n=>n.id===cfg.end)+1);
  return nodes;
}
