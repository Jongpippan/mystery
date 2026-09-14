import type {GameState} from './state';
import {script} from './script';
import {presentation} from './presentation';
import {locate,type Port} from './travel';

// Same-place current conversations, sourced explicitly; interrupted-test lines
// and past replay sections are deliberately separate adapters.
type Revisit={id:string;label:string;place:Port;chapter:number;stage?:string;required?:string[];absent?:string[];choice?:[string,string];lines:string[];eligible?:(state:GameState)=>boolean};
const lines=(scene:string,...numbers:string[])=>numbers.map(n=>`S_${scene}_${n}`);
const visits:Revisit[]=[
  {id:'pr-count',label:'봉만실에게 공개 수량 확인 약속 묻기',place:'L02',chapter:0,eligible:s=>s.sceneId==='C_PR_11',lines:lines('PR_11','0091','0092')},
  {id:'pr-booth',label:'소해금에게 장비와 녹음 범위 다시 묻기',place:'L07',chapter:0,eligible:s=>s.sceneId==='C_PR_11',lines:lines('PR_09','0091','0092')},
  {id:'pr-inventory',label:'모눈과 같은 탁자의 기록 범위 다시 보기',place:'L03:service',chapter:0,eligible:s=>s.sceneId==='C_PR_06',lines:lines('PR_06','0091','0092')},
  {id:'pr-rest',label:'쉬고 있는 모눈에게 말 걸기',place:'L02',chapter:0,eligible:s=>s.sceneId==='C_PR_08',lines:lines('PR_08','0091','0092')},
  {id:'pr-form',label:'목백로에게 기존 견본의 보관 방식 다시 묻기',place:'L01',chapter:0,required:['E28'],eligible:s=>s.sceneId==='C_PR_10',lines:lines('PR_10','0091','0092')},
  {id:'pr-boundary',label:'진새벽에게 오늘 밤 출입 경계 다시 묻기',place:'L01',chapter:0,eligible:s=>s.sceneId==='C_PR_16'&&!presentation(s).companion&&s.log.some(l=>l.nodeId==='S_PR_16_0011'),lines:lines('PR_16','0091','0092')},
  {id:'morning',label:'모눈과 냅킨 그림의 확인 범위 짚기',place:'L02',chapter:1,stage:'morning',absent:['E05'],lines:lines('CH01_01','0091','0092')},
  {id:'arrival',label:'탁두철·봉만실에게 바닥 표식과 사진 묻기',place:'L03:guest',chapter:1,stage:'arrival',absent:['K02'],lines:lines('CH01_02','0091','0092','0093')},
  {id:'window',label:'진새벽에게 창 시야와 회수 기록 다시 묻기',place:'L04',chapter:1,stage:'window',lines:lines('CH01_03','0091','0092')},
  {id:'wall',label:'탁두철에게 완료한 칸막이 시험 다시 묻기',place:'L03:guest',chapter:1,stage:'wall',required:['K02'],lines:lines('CH01_04','0091','0092')},
  {id:'aftermath',label:'봉만실·모눈과 목격 정정 다시 확인하기',place:'L02',chapter:1,stage:'aftermath',required:['KQ01'],lines:lines('CH01_05','0091','0092')},
  {id:'route',label:'진새벽에게 동선 시험의 범위 다시 묻기',place:'L08',chapter:1,stage:'route',lines:lines('CH01_06','0091')},
  {id:'objection',label:'차무록에게 반박의 범위 다시 묻기',place:'L02',chapter:1,stage:'objection',required:['K04'],lines:lines('CH01_07','0091','0092')},
  {id:'resolution',label:'봉만실과 세 자료의 역할 다시 확인하기',place:'L03:guest',chapter:1,stage:'resolution',absent:['K05'],lines:lines('CH01_08','0091')},
  {id:'personal1',label:'모눈에게 끝난 의자 민원 묻기',place:'L02',chapter:1,stage:'personal1',lines:lines('CH01_O1','0091')},
  {id:'personal2',label:'탁두철에게 수리비 이야기 다시 묻기',place:'L03:guest',chapter:1,stage:'personal2',lines:lines('CH01_O2','0091')},
  {id:'personal3',label:'차무록에게 반환 서명 확인하기',place:'L01',chapter:1,stage:'personal3',lines:lines('CH01_O3','0091')},
  {id:'ch2-booth',label:'소해금에게 진행표의 예정과 실행 묻기',place:'L07',chapter:2,stage:'ch2-booth',lines:lines('CH02_01','0091','0092')},
  {id:'ch2-compare',label:'소해금에게 직접 발화 설명 다시 묻기',place:'L07',chapter:2,stage:'ch2-compare',absent:['KQ02'],lines:lines('CH02_02','0091','0092')},
  {id:'ch2-authority',label:'소해금·차무록에게 일정 요구의 범위 묻기',place:'L07',chapter:2,stage:'ch2-authority',absent:['K06'],lines:lines('CH02_03','0091','0092')},
  {id:'ch2-apology-accepted',label:'사과와 녹음 허락 구분해 확인하기',place:'L07',chapter:2,stage:'ch2-apology',choice:['B_PLAYBACK_RESPONSE','accept_apology'],lines:lines('CH02_04','0091')},
  {id:'ch2-apology-pending',label:'사과에 답을 보류한 상태 확인하기',place:'L07',chapter:2,stage:'ch2-apology',choice:['B_PLAYBACK_RESPONSE','need_time'],lines:lines('CH02_04','0092')},
  {id:'ch2-sources',label:'세 기록이 각각 확인하는 범위 정리하기',place:'L01',chapter:2,stage:'ch2-sources',lines:lines('CH02_05','0091')},
  {id:'ch2-public',label:'봉만실에게 공개 점검에서 본 범위 묻기',place:'L03:guest',chapter:2,stage:'ch2-public',lines:lines('CH02_06','0091')},
  {id:'ch3-kitchen',label:'배한술에게 주방의 조사 범위 다시 묻기',place:'L05',chapter:3,stage:'ch3-kitchen',absent:['E25'],lines:lines('CH03_01','0091')},
  {id:'ch3-photo',label:'사진과 공개용 사본의 확인 범위 짚기',place:'L06',chapter:3,stage:'ch3-photo',absent:['KQ03'],lines:lines('CH03_02','0091')},
  {id:'ch3-preserve',label:'보호 중인 본장의 보존 상태 확인하기',place:'L05',chapter:3,stage:'ch3-preserve',lines:lines('CH03_06','0091')},
  {id:'ch3-departure',label:'진새벽에게 원본 회의 약속 다시 묻기',place:'L02',chapter:3,stage:'ch3-departure',lines:lines('CH03_08','0091')},
  {id:'ch4-personal2',label:'정해 둔 전시 방식을 다시 확인하기',place:'L02',chapter:4,stage:'ch4-personal2',lines:lines('CH04_O2','0091')},
];
const earlyBooth=script.scenes.C_CH02_01.nodes.filter(n=>n.section[0]==='Script');
visits.push({id:'early-console',label:'소해금에게 음향 진행표와 작업 파일 미리 확인 요청하기',place:'L07',chapter:1,absent:['E14'],eligible:s=>presentation(s).companion&&s.met.includes('P05'),
  lines:[...earlyBooth.slice(earlyBooth.findIndex(n=>n.id==='C_CH02_01:n0007'),earlyBooth.findIndex(n=>n.id==='S_CH02_01_0022')+1),...script.scenes.C_CH02_02.nodes.filter(n=>n.section[0]==='Script')].map(n=>n.id)});
for(const [chapter,knowledge,next,variant,direction] of [[2,'K10','K15','01','C_SYS_02:n0004'],[4,'K20','K25','02','C_SYS_02:n0009'],[5,'K25','K30','03','C_SYS_02:n0014']] as const){
  const done=`S_SYS_02_${variant}14`,base=`rest-${chapter}`;
  for(const repeat of [false,true])visits.push({id:repeat?`${base}-repeat`:base,label:repeat?'휴게실에서 다시 잠깐 쉬기':'휴게실에서 모눈과 잠깐 쉬기',place:'L02',chapter:-1,required:[knowledge],absent:[next],
    eligible:s=>s.revisit?.id===(repeat?`${base}-repeat`:base)||s.log.some(l=>l.nodeId===done)===repeat,
    lines:repeat?lines('SYS_02','0401','0402'):['S_SYS_02_0001','S_SYS_02_0002',direction,...lines('SYS_02',`${variant}11`,`${variant}12`,`${variant}13`,`${variant}14`),'C_SYS_02:n0021']});
}
const sourceNodes=new Map(Object.values(script.scenes).flatMap(scene=>scene.nodes.map(node=>[node.id,{node,scene:scene.id}] as const)));
export const currentConversationIds=new Set(visits.flatMap(v=>v.lines));
export function currentRevisits(state:GameState){
  const i=state.investigation;
  if(i?.task||!i&&!['C_PR_06','C_PR_08','C_PR_10','C_PR_11','C_PR_16'].includes(state.sceneId))return [];
  const chapter=i?Number(i.stage.match(/^ch(\d)-/)?.[1]??1):0;
  const position=state.travel?.position??locate(presentation(state).place),facts=[...state.evidence,...(i?.knowledge??[])];
  return visits.filter(v=>(v.chapter===chapter||v.chapter===-1)&&v.place===position&&(!v.stage||i?.completed.includes(v.stage))&&
    (v.required??[]).every(k=>facts.includes(k))&&(state.revisit?.id===v.id||!(v.absent??[]).some(k=>facts.includes(k)))&&(!v.choice||state.choices[v.choice[0]]===v.choice[1])&&(!v.eligible||v.eligible(state)));
}
export function revisitNode(state:GameState){
  const active=state.revisit;if(!active)return null;
  const visit=currentRevisits(state).find(v=>v.id===active.id);
  return visit?sourceNodes.get(visit.lines[active.index])?.node??null:null;
}
export const revisitSource=(state:GameState)=>{const node=revisitNode(state);return node?sourceNodes.get(node.id)!.scene:null;};
