import type {GameState} from './state';
import {currentNode} from './state';
import {scenePresentation} from './presentation';
import {sitePlaces,siteRoutes,type PlaceId} from './site';

export type Port=Exclude<PlaceId,'L03'>|'L03:guest'|'L03:service';
export type TravelState={anchor:Port;position:Port;trail:Port[];origin:ReturnType<typeof scenePresentation>};
export const placeOf=(port:Port):PlaceId=>port.startsWith('L03:')?'L03':port as PlaceId;
export const portName=(port:Port)=>port==='L03:guest'?'연회장 · 손님 문 쪽 공개 공간':port==='L03:service'?'연회장 · 동쪽 작업실':sitePlaces.find(p=>p.id===port)?.name??'';
export function locate(place:string):Port|null {
  if(/게스트하우스|내려가는 길|숙소로|사건 보관함/.test(place))return null;
  if(/연회장/.test(place))return /동쪽 기록|동쪽 작업실/.test(place)?'L03:service':'L03:guest';
  if(/북쪽/.test(place))return 'L04';
  if(/서비스 계단|서비스 접속|공용 연결/.test(place))return 'L08';
  if(/적재/.test(place))return 'L06';
  if(/경사로/.test(place))return 'L11';
  return sitePlaces.find(p=>place.includes(p.name))?.id as Port??null;
}
export function endpoints(route:typeof siteRoutes[number]):[Port,Port] {
  return [route.from==='L03'?route.id==='R06'?'L03:service':'L03:guest':route.from,route.to==='L03'?'L03:guest':route.to];
}
export function travelReady(state:GameState){
  const i=state.investigation;
  const free=i?!i.task&&!i.stage.startsWith('ep-')&&currentNode(state)?.kind==='investigation':state.sceneId==='C_PR_11'&&currentNode(state)?.kind==='appointment';
  return free&&!state.revisit&&!!locate(scenePresentation(state).place);
}
function permitted(state:GameState,id:string,child:boolean):boolean {
  const i=state.investigation;
  if(!i)return state.sceneId==='C_PR_11'&&(['R01','R02'].includes(id)||id==='R04'&&state.met.includes('P05'));
  const done=(stage:string)=>i.completed.includes(stage),has=(e:string)=>state.evidence.includes(e);
  switch(id){
    case 'R01':case 'R02':return true;
    case 'R03':return !child&&has('E06');
    case 'R04':return state.met.includes('P05');
    case 'R05':return !child&&has('E09');
    case 'R06':case 'R09':return false;
    case 'R07':case 'R10':return !child&&done('ch3-kitchen');
    case 'R08':return !child&&has('E42')&&i.stage.startsWith('ch5-');
    case 'R11':case 'R12':return !child&&done('ch3-opening');
    default:return false;
  }
}
export function travelOptions(state:GameState){
  if(!travelReady(state))return [];
  const origin=state.travel?.origin??scenePresentation(state),position=state.travel?.position??locate(origin.place)!;
  return siteRoutes.flatMap(route=>{
    const [from,to]=endpoints(route);if(position!==from&&position!==to)return [];
    const destination=position===from?to:from;
    const returning=state.travel?.trail.at(-2)===destination;
    // The exact already-traversed return path stays available; new entrances
    // still require the same authored clearance and adult/child boundary.
    if(!returning&&!permitted(state,route.id,origin.companion))return [];
    const direction=position===from?route.direction:({서쪽:'동쪽',동쪽:'서쪽',북쪽:'남쪽',남쪽:'북쪽','남쪽·동쪽':'북쪽·서쪽','남쪽·아래층':'북쪽·위층','동쪽·내리막':'서쪽·오르막'} as Record<string,string>)[route.direction]??'돌아가는 방향';
    return [{id:route.id,destination,direction,label:`${direction} · ${portName(destination)}${returning?' · 돌아가기':''}`}];
  });
}
export function move(state:GameState,routeId:string):GameState {
  const option=travelOptions(state).find(o=>o.id===routeId);if(!option)return state;
  const origin=state.travel?.origin??scenePresentation(state),anchor=state.travel?.anchor??locate(origin.place)!;
  const trail=state.travel?.trail??[anchor],back=trail.at(-2)===option.destination;
  const nextTrail=back?trail.slice(0,-1):[...trail,option.destination];
  if(nextTrail.length>100)return state;
  const visitedPlaces=Array.from(new Set([...(state.visitedPlaces??[]),placeOf(anchor),placeOf(option.destination)]));
  if(option.destination===anchor){const {travel:finished,...rest}=state;void finished;return {...rest,views:[],visitedPlaces};}
  return {...state,views:[],visitedPlaces,travel:{anchor,position:option.destination,trail:nextTrail,origin}};
}
export function validTravel(state:GameState):boolean {
  const t=state.travel;if(!t)return t===undefined;
  if(!t.origin||typeof t.origin.place!=='string'||typeof t.origin.time!=='string'||typeof t.origin.chapter!=='string'||typeof t.origin.caretaker!=='string'||typeof t.origin.companion!=='boolean'||typeof t.origin.experiment!=='boolean'||t.origin.wall!==9)return false;
  if(!travelReady({...state,revisit:undefined})||locate(t.origin.place)!==t.anchor||t.position===t.anchor)return false;
  if(!Array.isArray(t.trail)||t.trail.length<2||t.trail.length>100||t.trail[0]!==t.anchor||t.trail.at(-1)!==t.position)return false;
  return t.trail.every((port,index)=>!!portName(port)&&(!index||siteRoutes.some(r=>{const [a,b]=endpoints(r);return ((a===t.trail[index-1]&&b===port)||(b===t.trail[index-1]&&a===port))&&permitted(state,r.id,t.origin.companion);})));
}
