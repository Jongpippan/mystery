import {presentation} from './presentation';
import {currentRevisits,revisitNode,revisitSource} from './revisits';
import {move,validTravel,type TravelState} from './travel';
import {sitePlaces,type PlaceId} from './site';
import {sourceMode,validRecordOrigin,validHistoryFilters,type LogEntry,type HistoryFilters} from './record-index';
import {validEvidenceFilters,type EvidenceFilters} from './evidence-index';
import {options as epilogueOptions} from './epilogue';
import { script, type ScriptNode } from './script';
import { challenges, chapterTwoOptions, chapterTwoVisitHint, chapterThreeOptions, chapterThreeVisitHint, chapterFourOptions, chapterFourVisitHint, chapterFiveOptions, chapterFiveVisitHint, chapterSixOptions, chapterSixVisitHint, finalProofGroups, hintLine, isOptionalStage, judge, responseNodes, setupNodes, stages, stageNodes, taskIds, type Draft, type Judgment, type TaskId } from './case';

export type Tool = 'evidence'|'people'|'map'|'history'|'notes'|'settings'|'deduction'|'hint'|'archive';
export type View = {tool:Tool;detail:string|null;search:string;scroll:number;focus:string;zoom?:number;replayIndex?:number;filters?:EvidenceFilters;historyFilters?:HistoryFilters;expanded?:string[]};
export type Investigation = {
  stage:string; completed:string[]; knowledge:string[]; returnStage:string;
  stageKnowledge:Record<string,string[]>;
  stageChoices?:Record<string,Record<string,string>>;
  drafts:Partial<Record<TaskId,Draft>>;
  task:null|{id:TaskId;phase:'setup'|'answer'|'response';cursor:number;result:Judgment|null};
  suspended:Partial<Record<TaskId,NonNullable<Investigation['task']>>>;
  attempts:string[]; errors:Partial<Record<TaskId,string>>;
  hints:Partial<Record<TaskId,number>>; hintId:string|null;
};
export const emptyInvestigation:Investigation={stage:'morning',completed:[],knowledge:[],stageKnowledge:{morning:[]},returnStage:'arrival',drafts:{},task:null,suspended:{},attempts:[],errors:{},hints:{},hintId:null};
export const emptyDraft=():Draft=>({evidence:[],fields:{},note:''});
export const freshView=(tool:Tool):View=>({tool,detail:null,search:'',scroll:0,focus:''});

export type GameState = {
  version:1;
  edition:string;
  playerName:string;
  started:boolean;
  sceneId:string;
  cursor:number;
  choices:Record<string,string>;
  evidence:string[];
  met:string[];
  acknowledged:string[];
  log:LogEntry[];
  notes:string;
  textScale:number;
  audioVolume?:number;
  points:number;
  savedAt:string|null;
  investigation?:Investigation;
  views?:View[];
  revisit?:{id:string;index:number};
  travel?:TravelState;
  visitedPlaces?:PlaceId[];
};
export type GameAction =
  | {type:'start';name:string;setupLines?:string[]}
  | {type:'advance'}
  | {type:'choose';choice:string;value:string}
  | {type:'acknowledge';id:string}
  | {type:'note';text:string}
  | {type:'textScale';value:number}
  | {type:'audioVolume';value:number}
  | {type:'restore';state:GameState};
export type InvestigationAction =
  | {type:'move';route:string}
  | {type:'revisit';id:string}
  | {type:'visit';stage:string}
  | {type:'task';id:TaskId}
  | {type:'draft';id:TaskId;draft:Draft}
  | {type:'submit';id:TaskId;attempt:string}
  | {type:'taskNext'}
  | {type:'recover'}
  | {type:'hint';id:TaskId;level:number}
  | {type:'visitHint';level:number;event?:'V01'|'V02'|'V03'|'V04'|'V05'|'V06'}
  | {type:'view';tool:Tool}
  | {type:'viewBack'}
  | {type:'viewClose'}
  | {type:'viewState';patch:Partial<Omit<View,'tool'>>};

export const initialState:GameState = {version:1,edition:script.edition,playerName:'나여백',started:false,sceneId:'C_PR_01',cursor:0,choices:{},evidence:[],met:['P00','P01'],acknowledged:[],log:[],notes:'',textScale:1,points:6,savedAt:null};
const opening = Array.from({length:16},(_,index)=>`C_PR_${String(index+1).padStart(2,'0')}`);

export type RuntimeNode = ScriptNode | {id:string;kind:'choice';choice:string;options:{value:string;text:string}[];text:string} | {id:string;kind:'investigation';text:string} | {id:string;kind:'appointment';text:string;continueLabel?:string};
export function currentSequence(state:GameState):RuntimeNode[] {
  if(state.investigation) {
    const i=state.investigation;
    const nodes=stageNodes(i.stage,i.stageKnowledge[i.stage],state.choices,i.stageChoices?.[i.stage]);
    return [...nodes,{id:`hub:${i.stage}`,kind:'investigation',text:'조사'}];
  }
  const scene=script.scenes[state.sceneId];
  if (!scene) return [];
  const result:RuntimeNode[]=[];
  let prompted='';
  for (const node of scene.nodes) {
    if (node.section.some(h=>/revisit|replay|resume|Chapter exit|Suspended tool inspection/i.test(h))) continue;
    if (/^State boundary:/.test(node.text)) continue;
    if (node.section[0]==='Local response — public count wording') {
      const choice='B_PR_COUNT';
      if(prompted!==choice) {
        prompted=choice;
        const headings=[...new Set(scene.nodes.filter(n=>n.section[0]===node.section[0]).map(n=>n.section[1]))];
        result.push({id:choice,kind:'choice',choice,text:'어떻게 말할까?',options:headings.map(h=>({value:h.match(/^Option ([AB])/)![1],text:h.match(/`(.+)`/)![1]}))});
      }
      if(state.choices[choice]!==node.section[1]?.match(/^Option ([AB])/)?.[1]) continue;
    }
    const choice=node.section[0]?.match(/^Choice (B_\w+)/)?.[1];
    if (choice) {
      if (prompted!==choice) {
        prompted=choice;
        const labels=scene.nodes.filter(n=>n.kind==='choice-label' && n.section[0]===node.section[0]);
        result.push({id:choice,kind:'choice',choice,text:'어떻게 말할까?',options:labels.map(n=>({value:n.section[1].replace(/^Option /,''),text:n.text}))});
      }
      const option=node.section[1]?.match(/^Option (.+)/)?.[1];
      if (!option || state.choices[choice]!==option || node.kind==='choice-label') continue;
    }
    const prior=node.section[1]?.match(/^If (B_\w+) = (\w+)/);
    if (prior && state.choices[prior[1]]!==prior[2]) continue;
    if (node.kind==='choice-label') continue;
    result.push(node);
  }
  if(state.sceneId==='C_PR_11')result.push({id:'appointment:public-count',kind:'appointment',text:'공개 수량 확인에 참여할 준비가 되면 봉만실에게 말하세요.'});
  const pauses:Record<string,[string,string]>={C_PR_06:['허락받은 기록 탁자에서 모눈과 정리하고 있습니다.','모눈 곁에서 기록 정리 계속하기'],C_PR_08:['모눈과 쉬고 있습니다. 준비되면 음향실 약속으로 갑니다.','모눈과 음향실 약속으로 가기'],C_PR_10:['목백로와 같은 직원 동선을 따라 현관으로 돌아왔습니다.','휴게실로 돌아가기']};
  if(pauses[state.sceneId])result.push({id:`appointment:${state.sceneId}`,kind:'appointment',text:pauses[state.sceneId][0],continueLabel:pauses[state.sceneId][1]});
  return result;
}
export const currentNode=(state:GameState)=>currentSequence(state)[state.cursor]??null;
function recordEntry(state:GameState,sceneId:string,node:ScriptNode):LogEntry {
  const p=presentation(state);return {sceneId,nodeId:node.id,origin:{place:p.place,time:p.time,mode:sourceMode(node)}};
}
function enter(state:GameState):GameState {
  const node=currentNode(state);
  if (!node) return state;
  let next={...state};
  if (node.kind==='speech' && node.speaker && !next.met.includes(node.speaker)) next={...next,met:[...next.met,node.speaker]};
  if (node.kind==='evidence' && node.evidenceId && !next.evidence.includes(node.evidenceId)) next={...next,evidence:[...next.evidence,node.evidenceId],views:[...(next.views??[]),{...freshView('evidence'),detail:node.evidenceId}]};
  if (node.kind!=='choice' && node.kind!=='investigation' && node.kind!=='appointment' && !next.log.some(item=>item.nodeId===node.id)) next={...next,log:[...next.log,recordEntry(next,next.sceneId,node)]};
  return next;
}
export function gameReducer(state:GameState,action:GameAction|InvestigationAction):GameState {
  if(!['start','restore','note','textScale','audioVolume','acknowledge','choose','advance'].includes(action.type))return investigationReducer(state,action as InvestigationAction);
  switch(action.type) {
    case 'start':return enter({...initialState,textScale:state.textScale,audioVolume:state.audioVolume??.7,started:true,playerName:action.name.trim()||'나여백',log:[...new Set(action.setupLines??[])].filter(id=>id.startsWith('S_SYS_04_')&&script.utterances[id]).map(nodeId=>({sceneId:'C_SYS_04',nodeId,origin:{place:'여울관 앞',time:'10월 21일 · 오후',mode:'direct' as const}}))});
    case 'restore':return isSave(action.state)?action.state:state;
    case 'note':return {...state,notes:action.text};
    case 'textScale':return Number.isFinite(action.value)?{...state,textScale:Math.max(1,Math.min(2,action.value))}:state;
    case 'audioVolume':return Number.isFinite(action.value)?{...state,audioVolume:Math.max(0,Math.min(1,action.value))}:state;
    case 'acknowledge':return acquiredPending(state)!==action.id?state:{...state,acknowledged:[...state.acknowledged,action.id]};
    case 'choose': {
      const node=currentNode(state);
      if (node?.kind!=='choice'||node.choice!==action.choice||!node.options.some(o=>o.value===action.value)) return state;
      return enter({...state,choices:{...state.choices,[action.choice]:action.value},cursor:state.cursor+1});
    }
    case 'advance': {
      if(state.revisit){
        const current=revisitNode(state);if(current?.kind==='evidence'&&current.evidenceId&&!state.acknowledged.includes(current.evidenceId))return state;
        const next={...state,revisit:{...state.revisit,index:state.revisit.index+1}};
        if(revisitNode(next))return enterRevisit(next);
        const {revisit:finished,...rest}=state;void finished;return rest;
      }
      if(state.travel)return state;
      if(state.investigation?.task)return state;
      const node=currentNode(state);
      if (node?.kind==='choice') return state;
      if (node?.kind==='evidence' && node.evidenceId && !state.acknowledged.includes(node.evidenceId)) return state;
      if (state.cursor+1 < currentSequence(state).length) {
        const next=enter({...state,cursor:state.cursor+1});
        if(next.investigation&&currentNode(next)?.kind==='investigation') {
          const i=next.investigation;
          next.investigation={...i,completed:Array.from(new Set([...i.completed,i.stage]))};
        }
        return next;
      }
      const index=opening.indexOf(state.sceneId);
      if(index>=0 && index<opening.length-1) return enter({...state,sceneId:opening[index+1],cursor:0});
      if(index===opening.length-1)return enter({...state,sceneId:stages.morning.scene,cursor:0,investigation:{...emptyInvestigation,stageKnowledge:{morning:[...state.evidence]}},views:[]});
      return state;
    }
  }
  return state;
}
export function isSave(value:unknown):value is GameState {
  if (!value || typeof value!=='object') return false;
  const s=value as GameState;
  const ids=(v:unknown):v is string[]=>Array.isArray(v)&&v.every(id=>typeof id==='string')&&new Set(v).size===v.length;
  if(s.version!==1||s.edition!==script.edition||typeof s.playerName!=='string'||typeof s.started!=='boolean'||!Number.isInteger(s.cursor)||s.cursor<0||!script.scenes[s.sceneId]) return false;
  if(!s.choices||typeof s.choices!=='object'||Array.isArray(s.choices)||typeof s.notes!=='string') return false;
  const choices:Record<string,string[]>={B_PR_01:['help_queue','protect_papers'],B_PR_02:['environment_first','ask_voice_later'],B_PR_COUNT:['A','B'],B_PLAYBACK_RESPONSE:['accept_apology','need_time'],B_EXHIBIT:['attributed_accounts','joint_annotations'],B_SOUND:['consented_voices','environment_only']};
  if(!Object.entries(s.choices).every(([key,v])=>choices[key]?.includes(v))) return false;
  if(!ids(s.evidence)||!s.evidence.every(id=>!!script.evidence[id])||!ids(s.met)||!s.met.every(id=>/^P0[0-9]$/.test(id))) return false;
  if(!ids(s.acknowledged)||!s.acknowledged.every(id=>s.evidence.includes(id))) return false;
  if(!Number.isFinite(s.textScale)||s.textScale<1||s.textScale>2||!Number.isInteger(s.points)||s.points<0||s.points>6) return false;
  if(s.audioVolume!==undefined&&(!Number.isFinite(s.audioVolume)||s.audioVolume<0||s.audioVolume>1))return false;
  if(s.savedAt!==null&&(typeof s.savedAt!=='string'||!Number.isFinite(Date.parse(s.savedAt)))) return false;
  if(!Array.isArray(s.log)||!s.log.every(item=>item&&typeof item==='object'&&script.scenes[item.sceneId]?.nodes.some(n=>n.id===item.nodeId)&&(item.origin===undefined||validRecordOrigin(item.origin)))) return false;
  if(s.investigation!==undefined&&!validInvestigation(s))return false;
  if(s.investigation===undefined&&!opening.includes(s.sceneId))return false;
  if(s.revisit!==undefined&&(!s.revisit||!Number.isInteger(s.revisit.index)||s.revisit.index<0||!revisitNode(s)||!['investigation','appointment'].includes(currentNode(s)?.kind??'')&&s.sceneId!=='C_PR_16'))return false;
  if(s.visitedPlaces!==undefined&&(!ids(s.visitedPlaces)||!s.visitedPlaces.every(id=>sitePlaces.some(p=>p.id===id))))return false;
  if(!validTravel(s))return false;
  if(s.views!==undefined&&(!Array.isArray(s.views)||s.views.length>20||!s.views.every(v=>v&&['evidence','people','map','history','notes','settings','deduction','hint','archive'].includes(v.tool)&&(v.detail===null||typeof v.detail==='string'&&(v.tool==='archive'&&['archive:proofs','archive:corrections','archive:recap','archive:credits'].includes(v.detail)||s.evidence.includes(v.detail)||s.met.includes(v.detail)||s.log.some(l=>l.sceneId===v.detail)))&&typeof v.search==='string'&&Number.isFinite(v.scroll)&&v.scroll>=0&&typeof v.focus==='string'&&(v.zoom===undefined||Number.isFinite(v.zoom)&&v.zoom>=1&&v.zoom<=3)&&(v.replayIndex===undefined||Number.isInteger(v.replayIndex)&&v.replayIndex>=0)&&(v.filters===undefined||v.tool==='evidence'&&validEvidenceFilters(v.filters,s))&&(v.historyFilters===undefined||v.tool==='history'&&validHistoryFilters(v.historyFilters,s))&&(v.expanded===undefined||v.tool==='people'&&Array.isArray(v.expanded)&&v.expanded.every(id=>typeof id==='string'&&s.log.some(l=>l.sceneId===id))))))return false;
  return s.cursor<currentSequence(s).length;
}

export function taskNodes(state:GameState):ScriptNode[] {
  const t=state.investigation?.task;
  return !t?[]:t.phase==='setup'?setupNodes(t.id):t.phase==='response'&&t.result?responseNodes(t.id,t.result):[];
}
export const taskNode=(state:GameState)=>{const t=state.investigation?.task;return t?taskNodes(state)[t.cursor]??null:null;};
export const acquiredPending=(state:GameState)=>state.evidence.find(id=>!state.acknowledged.includes(id))??null;
export const heldFacts=(state:GameState)=>[...state.evidence,...(state.investigation?.completed.includes('ch4-edges')?['V04_EDGES']:[]),...(state.investigation?.knowledge??[]),...(state.investigation?.completed.includes('ch2-public')?['V22_PUBLIC']:[]),...(state.investigation?.completed.includes('ch3-opening')?['V03_COMPLETE']:[]),...(state.log.some(l=>l.nodeId==='C_CH03_05:n0011')?['V03_OPENED']:[]),...(['E23','E29'].every(id=>state.acknowledged.includes(id))?['V03_ACKNOWLEDGED']:[])];
export function cargoProgress(state:GameState):'pending'|'joined'|'route'|'sealed'|'opened'|'complete'{
 const i=state.investigation;if(i?.completed.includes('ch3-opening'))return 'complete';
 if(i?.stage!=='ch3-opening')return 'pending';
 const ids=currentSequence(state).slice(0,state.cursor+1).map(n=>n.id);
 return ids.includes('C_CH03_05:n0011')?'opened':ids.includes('C_CH03_05:n0009')?'sealed':ids.includes('C_CH03_05:n0005')?'route':'joined';
}
export type InvestigationOption = {kind:'visit';id:string;label:string}|{kind:'task';id:TaskId;label:string};
export function investigationOptions(state:GameState):InvestigationOption[] {
  if(state.travel)return [];
  const i=state.investigation;
  if(!i||currentNode(state)?.kind!=='investigation'||i.task)return [];
  if(i.stage.startsWith('ep-'))return epilogueOptions(i.stage,i.completed,i.knowledge);
  if(i.stage==='ch6-aftermath')return [...chapterSixOptions(i.stage,i.completed,i.knowledge,i.returnStage,state.evidence),...epilogueOptions(i.stage,i.completed,i.knowledge)];
  if(i.stage.startsWith('ch6-')||i.stage==='ch5-departure')return chapterSixOptions(i.stage,i.completed,i.knowledge,i.returnStage,state.evidence);
  if(i.stage.startsWith('ch5-'))return chapterFiveOptions(i.stage,i.completed,i.knowledge,i.returnStage,state.evidence);
  if(i.stage==='ch4-departure')return [...chapterFourOptions(i.stage,i.completed,i.knowledge,i.returnStage),...chapterFiveOptions(i.stage,i.completed,i.knowledge,i.returnStage,state.evidence)];
  if(i.stage.startsWith('ch4-'))return chapterFourOptions(i.stage,i.completed,i.knowledge,i.returnStage);
  if(i.stage==='ch3-departure')return [...chapterThreeOptions(i.stage,i.completed,i.knowledge,i.returnStage,true),...chapterFourOptions(i.stage,i.completed,i.knowledge,i.returnStage)];
  if(i.stage.startsWith('ch3-'))return chapterThreeOptions(i.stage,i.completed,i.knowledge,i.returnStage,!!i.stageKnowledge['ch3-ash']?.includes('KQ03')||i.completed.includes('ch3-ash-follow'));
  if(i.stage==='departure'||i.stage.startsWith('ch2-'))return [...chapterTwoOptions(i.stage,i.completed,i.knowledge,i.returnStage),...(i.stage==='ch2-departure'?chapterThreeOptions(i.stage,i.completed,i.knowledge,i.returnStage,false):[])].filter(o=>!i.suspended.D10||!o.id.startsWith('ch2-personal'));
  const done=(stage:string)=>i.completed.includes(stage), has=(k:string)=>i.knowledge.includes(k);
  const options:InvestigationOption[]=[];
  const visit=(id:string,label:string)=>options.push({kind:'visit',id,label});
  const task=(id:TaskId)=>options.push({kind:'task',id,label:script.scenes[`C_${id}`].title});
  if(stages[i.stage].next&&!done(stages[i.stage].next!)){visit(stages[i.stage].next!,i.stage==='morning'?'봉만실과 현관을 지나 동쪽 연회장으로':'휴게실로 돌아가 모눈과 합류하기');return options;}
  // Optional visits always return to their explicit physical/narrative origin.
  if(['photo','personal1','personal2','personal3'].includes(i.stage)) {visit(i.returnStage,'이야기를 마치고 조사하던 자리로');return options;}
  if(!done('photo')&&['arrival','handback','wall','aftermath','objection','resolution'].includes(i.stage))visit('photo','봉만실에게 공개 행사 사진 요청하기');
  if(!has('KQ01')&&state.log.some(l=>l.nodeId==='S_Q01_v1')&&(!done('window')||done('wall')))task('Q01');
  if(!has('K01'))task('D01');
  else if(!done('window'))visit('window','모눈을 맡기고 북쪽 창밖 시야 확인하기');
  else if(!has('K02'))task('D02');
  else if(!done('wall'))visit('wall','연회장 안전선에서 성인 칸막이 시험에 참여하기');
  else if(has('KQ01')&&!done('aftermath'))visit('aftermath','봉만실·모눈과 휴게실로 돌아가 목격 정리하기');
  else if(done('aftermath')&&!has('K03'))task('D03');
  else if(has('K03')&&!done('route'))visit('route','모눈을 봉만실에게 맡기고 허가된 공용 동선 걷기');
  else if(done('route')&&!has('K04'))task('D04');
  else if(has('K04')&&!done('objection'))visit('objection','휴게실에서 차무록의 설명 듣기');
  else if(done('objection')&&!done('resolution'))visit('resolution','모눈을 맡기고 연회장에 방 조사 자료 펼치기');
  else if(done('resolution')&&!has('K05'))task('D05');
  else if(has('K05'))visit('departure','방 조사 결론을 전하고 음향 부스 약속 잡기');
  if(done('aftermath')&&['aftermath','objection'].includes(i.stage)&&!done('personal1'))visit('personal1','모눈의 의자 민원표 읽기');
  if(i.stage==='wall'&&!done('personal2'))visit('personal2','탁두철·봉만실의 밀린 수리비 이야기 듣기');
  if(i.stage==='objection'&&!done('personal3'))visit('personal3','서쪽 접수대로 계약서 돌려주러 가기');
  return options;
}
function enterTask(state:GameState):GameState {
  const node=taskNode(state); if(!node)return state;
  let next=state;
  if(node.kind==='evidence'&&node.evidenceId&&!next.evidence.includes(node.evidenceId))next={...next,evidence:[...next.evidence,node.evidenceId],views:[...(next.views??[]),{...freshView('evidence'),detail:node.evidenceId}]};
  if(!next.log.some(l=>l.nodeId===node.id))next={...next,log:[...next.log,recordEntry(next,`C_${state.investigation!.task!.id}`,node)]};
  return next;
}
function investigationReducer(state:GameState,action:InvestigationAction):GameState {
  const i=state.investigation;
  const view=state.views?.at(-1);
  if(action.type==='view') {
    if(action.tool==='deduction'&&!i)return state;
    return {...state,views:[...(state.views??[]),freshView(action.tool)].slice(-20)};
  }
  if(action.type==='viewBack'||action.type==='viewClose') {
    const views=action.type==='viewClose'?[]:state.views?.slice(0,-1)??[];
    const investigation=i?.task&&!views.some(v=>v.tool==='deduction')?{...i,suspended:{...i.suspended,[i.task.id]:i.task},task:null}:i;
    return {...state,views,...(investigation?{investigation}:{})};
  }
  if(action.type==='viewState'){
    if(!view)return state;
    if(action.patch.historyFilters!==undefined&&(view.tool!=='history'||!validHistoryFilters(action.patch.historyFilters,state)))return state;
    if(action.patch.expanded!==undefined&&(view.tool!=='people'||!Array.isArray(action.patch.expanded)||!action.patch.expanded.every(id=>typeof id==='string'&&state.log.some(l=>l.sceneId===id))))return state;
    if(action.patch.filters!==undefined&&(view.tool!=='evidence'||!validEvidenceFilters(action.patch.filters,state)))return state;
    if(action.patch.detail&&!(view.tool==='archive'&&['archive:proofs','archive:corrections','archive:recap','archive:credits'].includes(action.patch.detail))&&!state.evidence.includes(action.patch.detail)&&!state.met.includes(action.patch.detail)&&!state.log.some(l=>l.sceneId===action.patch.detail))return state;
    return {...state,views:[...state.views!.slice(0,-1),{...view,...action.patch}]};
  }
  if(action.type==='move')return move(state,action.route);
  if(action.type==='revisit'){
    if(state.revisit||!['investigation','appointment'].includes(currentNode(state)?.kind??'')&&state.sceneId!=='C_PR_16'||!currentRevisits(state).some(v=>v.id===action.id))return state;
    return enterRevisit({...state,revisit:{id:action.id,index:0}});
  }
  if(!i)return state;
  if(state.revisit&&['visit','task','submit','taskNext','recover'].includes(action.type))return state;
  if(state.travel&&['visit','task','submit','taskNext','recover'].includes(action.type))return state;
  const update=(patch:Partial<Investigation>):GameState=>({...state,investigation:{...i,...patch}});
  if(action.type==='visit') {
    if(!investigationOptions(state).some(o=>o.kind==='visit'&&o.id===action.stage))return state;
    const returning=isOptionalStage(i.stage);
    const optional=isOptionalStage(action.stage);
    const stageKnowledge=returning?i.stageKnowledge:{...i.stageKnowledge,[action.stage]:[...state.evidence,...i.knowledge]};
    const next={...state,sceneId:stages[action.stage].scene,cursor:0,views:[],investigation:{...i,stage:action.stage,stageKnowledge,stageChoices:{...i.stageChoices,[action.stage]:returning?i.stageChoices?.[action.stage]??{}:{...state.choices}},returnStage:optional?i.stage:i.returnStage}};
    if(returning)next.cursor=stageNodes(action.stage,stageKnowledge[action.stage],state.choices).length;
    return enter(next);
  }
  if(action.type==='task') {
    if(i.task?.id===action.id)return {...state,views:[freshView('deduction')]};
    if(!investigationOptions(state).some(o=>o.kind==='task'&&o.id===action.id))return state;
    return enterTask({...update({task:i.suspended[action.id]??{id:action.id,phase:'setup',cursor:0,result:null},drafts:{...i.drafts,[action.id]:i.drafts[action.id]??emptyDraft()}}),views:[freshView('deduction')]});
  }
  if(action.type==='draft') {
    if(!taskIds.includes(action.id)||!validRoleDraft(action.draft,action.id,state)||action.draft.evidence.some(e=>!state.evidence.includes(e)))return state;
    return update({drafts:{...i.drafts,[action.id]:action.draft}});
  }
  if(action.type==='submit') {
    const t=i.task;
    if(!t||t.id!==action.id||t.phase!=='answer'||state.points===0||i.attempts.includes(action.attempt)||!action.attempt||action.attempt.length>100)return state;
    const result=judge(t.id,i.drafts[t.id]??emptyDraft(),heldFacts(state));
    if(result.kind==='incomplete')return update({task:{...t,result}});
    const next=update({attempts:[...i.attempts,action.attempt],task:{...t,phase:'response',cursor:0,result},errors:result.kind==='error'?{...i.errors,[t.id]:result.key}:i.errors});
    if(result.kind==='error')next.points=Math.max(0,state.points-2);
    return enterTask(next);
  }
  if(action.type==='taskNext') {
    const t=i.task;if(!t||t.phase==='answer'||acquiredPending(state))return state;
    if(t.cursor+1<taskNodes(state).length)return enterTask(update({task:{...t,cursor:t.cursor+1}}));
    if(t.phase==='setup'||t.result?.kind!=='success')return update({task:{...t,phase:'answer',cursor:0}});
    const key=t.id.startsWith('Q')?`K${t.id}`:t.id.replace('D','K');
    const suspended={...i.suspended};delete suspended[t.id];
    return {...update({knowledge:Array.from(new Set([...i.knowledge,key])),task:null,suspended}),views:[]};
  }
  if(action.type==='recover') {
    if(state.points!==0||!i.task)return state;
    const speech=script.utterances.S_SYS_01_0031;
    return {...state,points:4,log:[...state.log,recordEntry(state,speech.scene,speech)]};
  }
  if(action.type==='hint') {
    if(!taskIds.includes(action.id)||!Number.isInteger(action.level)||action.level<0||action.level>4)return state;
    const id=hintLine(action.id,action.level,heldFacts(state),i.drafts[action.id]??emptyDraft(),i.errors[action.id],!!i.suspended[action.id]);
    return {...update({hints:{...i.hints,[action.id]:action.level},hintId:id}),views:[...(state.views??[]).filter(v=>v.tool!=='hint'),freshView('hint')]};
  }
  if(action.type==='visitHint') {
    if(action.event==='V06'){
      if(!i.knowledge.includes('K25')||!Number.isInteger(action.level)||action.level<0||action.level>4)return state;
      const seen=(id:string)=>state.log.some(l=>l.nodeId===id);
      const progress=!seen('S_CH06_01_0001')?'uncalled':!seen('C_CH06_01:n0010')?'travel':!seen('S_CH06_01_0010')?'handoff':i.stage==='ch6-contact'&&!i.completed.includes('ch6-contact')?'interrupted-travel':i.stage==='ch6-unfold'&&state.cursor>0?'unfolding':'waiting';
      const id=chapterSixVisitHint(action.level,heldFacts(state),progress);
      return {...update({hintId:id}),views:[...(state.views??[]).filter(v=>v.tool!=='hint'),freshView('hint')]};
    }
    if(action.event==='V05'){
      if(!i.knowledge.includes('K20')||!Number.isInteger(action.level)||action.level<0||action.level>4)return state;
      const requested=i.stage.startsWith('ch5-')||i.completed.includes('ch5-handoff');
      const supervised=state.log.some(l=>l.nodeId==='S_CH05_01_0005');
      const interrupted=i.stage==='ch5-handoff'&&!i.completed.includes('ch5-handoff')&&state.log.at(-1)?.nodeId==='C_CH05_01:n0009';
      const id=chapterFiveVisitHint(action.level,heldFacts(state),requested,supervised,interrupted,i.completed.includes('ch5-compare'));
      return {...update({hintId:id}),views:[...(state.views??[]).filter(v=>v.tool!=='hint'),freshView('hint')]};
    }
    if(action.event==='V04'){
      if(!i.knowledge.includes('K15')||!Number.isInteger(action.level)||action.level<0||action.level>4)return state;
      const id=chapterFourVisitHint(action.level,heldFacts(state),i.stage.startsWith('ch4-')||i.completed.includes('ch4-meeting'),i.stage==='ch4-originals'&&state.cursor>0);
      return {...update({hintId:id}),views:[...(state.views??[]).filter(v=>v.tool!=='hint'),freshView('hint')]};
    }
    if(action.event==='V03'){
      if(!i.knowledge.includes('K10')||!Number.isInteger(action.level)||action.level<0||action.level>4)return state;
      const id=chapterThreeVisitHint(action.level,heldFacts(state),cargoProgress(state));
      return {...update({hintId:id}),views:[...(state.views??[]).filter(v=>v.tool!=='hint'),freshView('hint')]};
    }
    if(action.event==='V02') {
      if(!i.knowledge.includes('K05')||!Number.isInteger(action.level)||action.level<0||action.level>4)return state;
      const id=chapterTwoVisitHint(action.level,heldFacts(state),i.stage==='ch2-compare'&&state.cursor>0);
      return {...update({hintId:id}),views:[...(state.views??[]).filter(v=>v.tool!=='hint'),freshView('hint')]};
    }
    if(!i.knowledge.includes('K02')||!Number.isInteger(action.level)||action.level<0||action.level>4)return state;
    const completed=i.completed.includes('wall'), middle=i.stage==='wall'&&state.cursor>=stageNodes('wall',[...state.evidence,...i.knowledge],state.choices).findIndex(n=>n.id==='C_CH01_04:n0015')&&state.cursor<stageNodes('wall',[...state.evidence,...i.knowledge],state.choices).findIndex(n=>n.id==='C_CH01_04:n0018');
    const suffix=!state.evidence.includes('E04')?'0022':!state.evidence.includes('E05')?'0023':(completed?['0002','0012','0021','0032','0042']:middle?['0003','0013','0021','0033','0043']:['0001','0011','0021','0031','0041'])[action.level];
    return {...update({hintId:`S_H_V01_${suffix}`}),views:[...(state.views??[]).filter(v=>v.tool!=='hint'),freshView('hint')]};
  }
  return state;
}

function enterRevisit(state:GameState):GameState {
  const node=revisitNode(state);
  if(!node)return state;let next=state;
  if(node.kind==='speech'&&node.speaker&&!state.met.includes(node.speaker))next={...next,met:[...next.met,node.speaker]};
  if(node.kind==='evidence'&&node.evidenceId&&!state.evidence.includes(node.evidenceId))next={...next,evidence:[...next.evidence,node.evidenceId],views:[...(next.views??[]),{...freshView('evidence'),detail:node.evidenceId}]};
  return next.log.some(l=>l.nodeId===node.id)?next:{...next,log:[...next.log,recordEntry(next,revisitSource(next)!,node)]};
}
function validInvestigation(state:GameState):boolean {
  const i=state.investigation!;
  const ids=(v:unknown):v is string[]=>Array.isArray(v)&&v.every(x=>typeof x==='string')&&new Set(v).size===v.length;
  if(!i||typeof i!=='object'||!stages[i.stage]||stages[i.stage].scene!==state.sceneId||!stages[i.returnStage]||!ids(i.completed)||!i.completed.every(k=>!!stages[k])||!ids(i.knowledge)||!i.knowledge.every(k=>taskIds.some(id=>(id.startsWith('Q')?`K${id}`:id.replace('D','K'))===k))||!ids(i.attempts))return false;
  if(!i.stageKnowledge||typeof i.stageKnowledge!=='object'||!ids(i.stageKnowledge[i.stage])||!Object.entries(i.stageKnowledge).every(([stage,known])=>!!stages[stage]&&ids(known)&&known.every(k=>state.evidence.includes(k)||i.knowledge.includes(k))))return false;
  if(i.stageChoices!==undefined&&(!i.stageChoices||typeof i.stageChoices!=='object'||Array.isArray(i.stageChoices)||!Object.entries(i.stageChoices).every(([stage,choices])=>!!stages[stage]&&choices&&typeof choices==='object'&&!Array.isArray(choices)&&Object.entries(choices).every(([key,value])=>typeof value==='string'&&state.choices[key]===value))))return false;
  if(i.stage.startsWith('ep-')&&(!i.stageChoices||!Object.hasOwn(i.stageChoices,i.stage)))return false;
  if(!i.drafts||typeof i.drafts!=='object'||!i.errors||typeof i.errors!=='object'||!i.hints||typeof i.hints!=='object'||!i.suspended||typeof i.suspended!=='object')return false;
  for(const [id,d] of Object.entries(i.drafts)) {
    if(!taskIds.includes(id as TaskId)||!d||!validRoleDraft(d,id as TaskId,state)||!ids(d.evidence)||!d.evidence.every(e=>state.evidence.includes(e))||typeof d.note!=='string'||!d.fields||typeof d.fields!=='object'||!Object.entries(d.fields).every(([key,value])=>challenges[id as TaskId].fields.some(f=>f.id===key&&f.options.some(o=>o.value===value))))return false;
  }
  if(!Object.entries(i.errors).every(([id,key])=>taskIds.includes(id as TaskId)&&typeof key==='string'&&(key==='unsupported_evidence'||key in challenges[id as TaskId].errors)))return false;
  if(!Object.entries(i.hints).every(([id,n])=>taskIds.includes(id as TaskId)&&Number.isInteger(n)&&n>=0&&n<=4))return false;
  if(i.hintId!==null&&(typeof i.hintId!=='string'||![...taskIds,'V01','V02','V03','V04','V05','V06'].some(id=>i.hintId!.startsWith(`S_H_${id}_`))||!script.utterances[i.hintId]))return false;
  for(const [id,t] of Object.entries(i.suspended))if(!taskIds.includes(id as TaskId)||!t||t.id!==id)return false;
  for(const t of [...Object.values(i.suspended),...(i.task!==null?[i.task]:[])]) {
    if(!t||!taskIds.includes(t.id)||!['setup','answer','response'].includes(t.phase)||!Number.isInteger(t.cursor)||t.cursor<0)return false;
    if(t.result!==null) {
      const r=t.result;
      if(!r||typeof r!=='object'||!['success','error','incomplete'].includes(r.kind))return false;
      if(r.kind==='success'&&typeof r.route!=='string'||r.kind==='incomplete'&&typeof r.message!=='string'||r.kind==='error'&&!(r.key==='unsupported_evidence'||r.key in challenges[t.id].errors))return false;
    }
    if(t.phase==='response'&&(!t.result||t.result.kind==='incomplete'))return false;
    if(t.cursor>=Math.max(1,taskNodes({...state,investigation:{...i,task:t}}).length))return false;
  }
  return true;
}

function validRoleDraft(d:Draft,id:TaskId,state:GameState){
 const role=(k:string)=>finalProofGroups.some(g=>g.id===k);
 const object=(v:unknown)=>!!v&&typeof v==='object'&&!Array.isArray(v);
 const held=[...state.evidence,...(state.investigation?.knowledge??[])];
 if(d.roleEvidence!==undefined&&(id!=='D30'||!object(d.roleEvidence)||!Object.entries(d.roleEvidence).every(([k,v])=>role(k)&&Array.isArray(v)&&new Set(v).size===v.length&&v.every(x=>typeof x==='string'&&held.includes(x)))))return false;
 if(d.roleNotes!==undefined&&(id!=='D30'||!object(d.roleNotes)||!Object.entries(d.roleNotes).every(([k,v])=>role(k)&&typeof v==='string')))return false;
 if(d.sourceRole!==undefined&&(id!=='D30'||typeof d.sourceRole!=='string'||d.sourceRole!==''&&!role(d.sourceRole)))return false;
 if(d.sourceScroll!==undefined&&(id!=='D30'||!Number.isFinite(d.sourceScroll)||d.sourceScroll<0))return false;
 return true;
}
