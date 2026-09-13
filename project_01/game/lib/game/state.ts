import { script, type ScriptNode } from './script';

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
  log:{sceneId:string;nodeId:string}[];
  notes:string;
  textScale:number;
  points:number;
  savedAt:string|null;
};
export type GameAction =
  | {type:'start';name:string}
  | {type:'advance'}
  | {type:'choose';choice:string;value:string}
  | {type:'acknowledge';id:string}
  | {type:'note';text:string}
  | {type:'textScale';value:number}
  | {type:'restore';state:GameState};

export const initialState:GameState = {version:1,edition:script.edition,playerName:'나여백',started:false,sceneId:'C_PR_01',cursor:0,choices:{},evidence:[],met:['P00','P01'],acknowledged:[],log:[],notes:'',textScale:1,points:6,savedAt:null};
const opening = ['C_PR_01','C_PR_02','C_PR_03','C_PR_04','C_PR_05'];

export type RuntimeNode = ScriptNode | {id:string;kind:'choice';choice:string;options:{value:string;text:string}[];text:string};
export function currentSequence(state:GameState):RuntimeNode[] {
  const scene=script.scenes[state.sceneId];
  if (!scene) return [];
  const result:RuntimeNode[]=[];
  let prompted='';
  for (const node of scene.nodes) {
    if (node.section.some(h=>/revisit|replay|resume|Chapter exit/i.test(h))) continue;
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
  return result;
}
export const currentNode=(state:GameState)=>currentSequence(state)[state.cursor]??null;
function enter(state:GameState):GameState {
  const node=currentNode(state);
  if (!node) return state;
  let next={...state};
  if (node.kind==='speech' && node.speaker && !next.met.includes(node.speaker)) next={...next,met:[...next.met,node.speaker]};
  if (node.kind==='evidence' && node.evidenceId && !next.evidence.includes(node.evidenceId)) next={...next,evidence:[...next.evidence,node.evidenceId]};
  if (node.kind!=='choice' && !next.log.some(item=>item.nodeId===node.id)) next={...next,log:[...next.log,{sceneId:next.sceneId,nodeId:node.id}]};
  return next;
}
export function gameReducer(state:GameState,action:GameAction):GameState {
  switch(action.type) {
    case 'start':return enter({...initialState,started:true,playerName:action.name.trim()||'나여백'});
    case 'restore':return action.state;
    case 'note':return {...state,notes:action.text};
    case 'textScale':return {...state,textScale:Math.max(1,Math.min(2,action.value))};
    case 'acknowledge':return {...state,acknowledged:[...new Set([...state.acknowledged,action.id])]};
    case 'choose': {
      const node=currentNode(state);
      if (node?.kind!=='choice'||node.choice!==action.choice||!node.options.some(o=>o.value===action.value)) return state;
      return enter({...state,choices:{...state.choices,[action.choice]:action.value},cursor:state.cursor+1});
    }
    case 'advance': {
      const node=currentNode(state);
      if (node?.kind==='choice') return state;
      if (node?.kind==='evidence' && node.evidenceId && !state.acknowledged.includes(node.evidenceId)) return state;
      if (state.cursor+1 < currentSequence(state).length) return enter({...state,cursor:state.cursor+1});
      const index=opening.indexOf(state.sceneId);
      if(index>=0 && index<opening.length-1) return enter({...state,sceneId:opening[index+1],cursor:0});
      return state;
    }
  }
}
export function isSave(value:unknown):value is GameState {
  if (!value || typeof value!=='object') return false;
  const s=value as GameState;
  return s.version===1 && s.edition===script.edition && typeof s.playerName==='string' && typeof s.cursor==='number' && s.cursor>=0 && !!script.scenes[s.sceneId] && Array.isArray(s.evidence) && Array.isArray(s.log) && typeof s.choices==='object' && typeof s.notes==='string';
}
