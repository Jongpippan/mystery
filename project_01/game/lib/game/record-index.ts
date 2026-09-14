import {script,displayText,type ScriptNode} from './script';
import {personName,evidenceIndex} from './evidence-index';
import {corrections} from './epilogue';
import type {GameState} from './state';

export type RecordOrigin={place:string;time:string;mode:'direct'|'output'|'remote'};
export type LogEntry={sceneId:string;nodeId:string;origin?:RecordOrigin};
const nodes=new Map(Object.values(script.scenes).flatMap(c=>c.nodes.map(n=>[n.id,n] as const)));
export const recordNode=(entry:LogEntry)=>nodes.get(entry.nodeId)!;
export function sourceMode(node:ScriptNode):RecordOrigin['mode']{
 if(/녹음|기록|출력/.test(node.label??''))return 'output';
 if(['S_CH03_05_0011','S_CH03_05_0012','S_CH06_01_0001','S_CH06_01_0004','S_CH06_01_0008'].includes(node.id))return 'remote';
 return 'direct';
}
export const modeNames={direct:'같은 자리에서 들은 말',output:'스피커·자료에서 들은 말',remote:'통화로 들은 말'};
export function validRecordOrigin(v:unknown):v is RecordOrigin{
 if(!v||typeof v!=='object'||Array.isArray(v))return false;const o=v as RecordOrigin;
 return typeof o.place==='string'&&o.place.length>0&&o.place.length<=120&&typeof o.time==='string'&&o.time.length>0&&o.time.length<=120&&['direct','output','remote'].includes(o.mode);
}
export const recordContext=(entry:LogEntry)=>entry.origin??{place:'당시 장소 미기록',time:'당시 시점 미기록',mode:sourceMode(recordNode(entry))};
export const historyGroups={investigation:'현장 조사',challenge:'추궁·추리',companion:'동행 이야기',event:'인물 간 사건',personal:'개인 이야기',ending:'마무리',system:'정리·회복'} as const;
export type HistoryGroup=keyof typeof historyGroups;
export function historyGroup(id:string):HistoryGroup{
 if(/^C_[DQ]\d/.test(id))return 'challenge';if(id.startsWith('C_EP'))return 'ending';if(id.startsWith('C_SYS'))return 'system';
 if(['C_PR_04','C_PR_08','C_PR_11','C_CH02_04'].includes(id)||/^C_CH\d\d_O1$/.test(id))return 'companion';
 if(/_O\d$/.test(id))return 'personal';
 if(['C_CH02_03','C_CH04_04','C_CH04_06','C_CH06_08'].includes(id))return 'event';return 'investigation';
}
export type HistoryFilters={group:HistoryGroup|'';speaker:string};
export const defaultHistoryFilters:HistoryFilters={group:'',speaker:''};
export function historyFilterOptions(state:Pick<GameState,'log'|'met'>){
 return {groups:(Object.keys(historyGroups) as HistoryGroup[]).filter(g=>state.log.some(l=>historyGroup(l.sceneId)===g)),speakers:state.met.filter(p=>state.log.some(l=>recordNode(l).speaker===p))};
}
export function validHistoryFilters(v:unknown,state:Pick<GameState,'log'|'met'>):v is HistoryFilters{
 if(!v||typeof v!=='object'||Array.isArray(v))return false;const f=v as HistoryFilters,o=historyFilterOptions(state);
 return Object.keys(v).every(k=>['group','speaker'].includes(k))&&(f.group===''||o.groups.includes(f.group))&&(f.speaker===''||o.speakers.includes(f.speaker));
}
export function conversations(state:Pick<GameState,'log'|'met'|'playerName'>,search='',filters:HistoryFilters=defaultHistoryFilters){
 const groups=new Map<string,LogEntry[]>();for(const l of state.log){if(!groups.has(l.sceneId))groups.set(l.sceneId,[]);groups.get(l.sceneId)!.push(l);}
 const normalize=(s:string)=>displayText(s,state.playerName).normalize('NFKC').toLocaleLowerCase('ko');const query=normalize(search.trim());
 return [...groups].map(([id,entries])=>{
  const participants=[...new Set(entries.map(l=>recordNode(l).speaker).filter((p):p is string=>!!p&&state.met.includes(p)))];
  const contexts=[...new Set(entries.map(l=>{const o=recordContext(l);return `${o.time} · ${o.place}`;}))];
  return {id,entries,participants,contexts,group:historyGroup(id),title:script.scenes[id].title};
 }).filter(c=>(!filters.group||c.group===filters.group)&&(!filters.speaker||c.participants.includes(filters.speaker))&&(!query||normalize([c.title,historyGroups[c.group],...c.contexts,...c.participants.map(p=>personName(p,state.playerName)),...c.entries.map(l=>recordNode(l).text)].join(' ')).includes(query)));
}

type Fact={kind:'introduction'|'observed'|'relation'|'limit';people:string[];nodes:string[]};
// Exact, heard source excerpts only. No author biographies, secret schedules or
// inferred motive/guilt appear in this index. Multi-line relations require all.
export const profileSources:Fact[]=[
 {kind:'introduction',people:['P00'],nodes:['S_PR_02_0003']},
 {kind:'introduction',people:['P01'],nodes:['S_PR_02_0004']},
 {kind:'introduction',people:['P02'],nodes:['S_PR_02_0002']},
 {kind:'introduction',people:['P03'],nodes:['S_PR_05_0001']},
 {kind:'introduction',people:['P04'],nodes:['S_CH01_02_0004']},
 {kind:'introduction',people:['P05'],nodes:['S_PR_09_0001']},
 {kind:'introduction',people:['P06'],nodes:['S_CH03_01_0005']},
 {kind:'introduction',people:['P07'],nodes:['S_PR_16_0001']},
 {kind:'introduction',people:['P08'],nodes:['S_PR_07_0001']},
 {kind:'introduction',people:['P09'],nodes:['S_PR_10_0001']},
 {kind:'observed',people:['P00','P01'],nodes:['C_PR_01:n0004']},
 {kind:'observed',people:['P02'],nodes:['C_PR_02:n0003']},
 {kind:'observed',people:['P03','P00'],nodes:['C_PR_05:n0007']},
 {kind:'observed',people:['P04'],nodes:['C_CH01_02:n0002']},
 {kind:'observed',people:['P05'],nodes:['C_PR_09:n0006']},
 {kind:'observed',people:['P06'],nodes:['C_CH03_01:n0009']},
 {kind:'observed',people:['P07'],nodes:['C_PR_16:n0009']},
 {kind:'observed',people:['P08'],nodes:['C_PR_07:n0005']},
 {kind:'observed',people:['P09','P00'],nodes:['C_PR_10:n0012']},
 {kind:'observed',people:['P06','P09','P07'],nodes:['C_CH03_05:n0011']},
 {kind:'relation',people:['P00','P01'],nodes:['S_PR_02_0003','S_PR_02_0004']},
 {kind:'relation',people:['P00','P02'],nodes:['S_PR_02_0008']},
 {kind:'relation',people:['P02','P03'],nodes:['S_PR_05_0001']},
 {kind:'relation',people:['P00','P08'],nodes:['S_PR_07_0014']},
 {kind:'relation',people:['P01','P05'],nodes:['S_PR_09_0005']},
 {kind:'relation',people:['P00','P07'],nodes:['S_PR_16_0009','S_PR_16_0010']},
 {kind:'relation',people:['P04','P06'],nodes:['S_CH03_01_0005']},
 {kind:'relation',people:['P02','P04'],nodes:['S_CH01_O2_0002','S_CH01_O2_0003']},
 {kind:'relation',people:['P02','P06'],nodes:['S_CH04_04_0001','S_CH04_04_0002']},
 {kind:'relation',people:['P04','P05'],nodes:['S_CH05_O2_0001','S_CH05_O2_0002']},
 {kind:'relation',people:['P07','P09'],nodes:['S_CH03_06_0005','S_CH03_06_0006']},
 {kind:'limit',people:['P00','P02','P03','P05'],nodes:['S_PR_16_0004']},
 {kind:'limit',people:['P00','P08'],nodes:['S_PR_16_0006']},
 {kind:'limit',people:['P00','P09'],nodes:['S_CH03_06_0004']},
 {kind:'limit',people:['P03','P04'],nodes:['S_CH06_06_0001','S_CH06_06_0002']},
 {kind:'limit',people:['P03','P09'],nodes:['S_CH06_06_0013']}
];
const introductionLabels:Record<string,string>={P00:'기록 정리 담당',P01:'열한 살 동행',P02:'여울관 주인',P03:'운영·정산 실무',P04:'건물 수리 담당',P05:'행사 음향 담당',P06:'주방·직원 정산 전달',P07:'현장 기록·출입 통제',P08:'폐관 정산 확인',P09:'화물·기록 인계'};
export function personRecord(state:GameState,id:string){
 if(!state.met.includes(id))return null;const heard=new Set(state.log.map(l=>l.nodeId));
 const facts=profileSources.filter(f=>f.people.includes(id)&&f.people.every(p=>state.met.includes(p))&&f.nodes.every(n=>heard.has(n))).map(f=>({...f,entries:f.nodes.map(n=>state.log.find(l=>l.nodeId===n)!)}));
 const spoken=state.log.filter(l=>recordNode(l).speaker===id),direct=spoken.filter(l=>recordContext(l).mode==='direct');
 const observed=new Set(facts.filter(f=>f.kind==='observed').flatMap(f=>f.nodes));
 const lastObserved=state.log.findLast(l=>observed.has(l.nodeId)||recordNode(l).speaker===id&&recordContext(l).mode==='direct');
 return {facts,spoken,introduction:facts.some(f=>f.kind==='introduction')?introductionLabels[id]:'소개를 아직 듣지 않음',lastDirect:direct.at(-1),lastObserved,corrections:corrections.filter(c=>heard.has(c.before)&&script.utterances[c.before].speaker===id).map(c=>({...c,corrected:heard.has(c.after)&&state.evidence.includes(c.evidence)})),related:state.evidence.filter(e=>evidenceIndex[e].people.includes(id))};
}
