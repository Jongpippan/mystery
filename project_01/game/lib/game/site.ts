import type {GameState} from './state';
import {personNames} from './evidence-index';

// Derived from game-plan/06-space-and-evidence.md. Ports keep the partition solid.
export const sitePlaces = [
  {id:'L01',name:'현관',x:180,y:125,floor:'ground'},
  {id:'L02',name:'휴게실',x:55,y:125,floor:'ground'},
  {id:'L03',name:'연회장',x:310,y:125,floor:'ground'},
  {id:'L04',name:'북쪽 관찰로',x:310,y:45,floor:'ground'},
  {id:'L07',name:'음향 부스',x:470,y:125,floor:'ground'},
  {id:'L08',name:'서비스 접속부',x:310,y:215,floor:'ground'},
  {id:'L09',name:'수영장 상부 랜딩',x:470,y:215,floor:'ground'},
  {id:'L10',name:'빈 수영장',x:470,y:300,floor:'ground'},
  {id:'L05',name:'주방',x:85,y:410,floor:'lower'},
  {id:'L06',name:'적재·기록 데스크',x:235,y:410,floor:'lower'},
  {id:'L11',name:'지붕 있는 경사로',x:385,y:410,floor:'lower'},
  {id:'L12',name:'호숫가 보관 창고',x:485,y:495,floor:'lower'},
] as const;
export type PlaceId=typeof sitePlaces[number]['id'];
export const siteRoutes = [
  {id:'R01',from:'L01',to:'L02',direction:'서쪽',access:'공개된 휴식 공간'},
  {id:'R02',from:'L01',to:'L03',direction:'동쪽',access:'안내받은 공개 공간·안전선'},
  {id:'R03',from:'L03',to:'L04',direction:'북쪽',port:'손님 문',access:'봉만실이 여는 바깥 관찰로. 창으로 방에 들어갈 수 없음'},
  {id:'R04',from:'L03',to:'L07',direction:'동쪽',access:`${personNames.P05}의 안내. 장비 조작은 별도 허가`},
  {id:'R05',from:'L03',to:'L08',direction:'남쪽·동쪽',port:'손님 문',access:'공용 우회로. 사건 발견 뒤에는 경찰의 출입 허가'},
  {id:'R06',from:'L03',to:'L08',direction:'남쪽',port:'직원 문',access:'동쪽 작업실의 열쇠 필요. 손님 문과 별개의 출입구'},
  {id:'R07',from:'L08',to:'L05',direction:'남쪽·아래층',access:'직원 계단. 모눈은 허가된 안전 구간에서 보호자와 동행'},
  {id:'R08',from:'L08',to:'L09',direction:'동쪽',access:'통제 구역. 경찰이 허가하고 동행하는 성인 조사'},
  {id:'R09',from:'L09',to:'L10',direction:'아래쪽',access:'잠긴 안전문. 경찰·전문가 전용, 직접 이동 불가'},
  {id:'R10',from:'L05',to:'L06',direction:'동쪽',access:'주방 안내를 받은 안전 표시선'},
  {id:'R11',from:'L06',to:'L11',direction:'동쪽',access:`${personNames.P09}의 동행`},
  {id:'R12',from:'L11',to:'L12',direction:'동쪽·내리막',access:'허가된 경사로와 창고. 봉인 확인·개방은 별도 절차'},
] as const;

// The initial handout names only four public rooms. A complete author map is
// not player knowledge; reveal additional places only from encountered context.
export function knownPlaces(state:GameState):PlaceId[] {
  const known=new Set<PlaceId>(state.evidence.includes('E03')?['L01','L02','L03','L07']:[]);
  for(const id of state.visitedPlaces??[])known.add(id);
  const aliases:Partial<Record<PlaceId,string[]>>={L04:['북쪽 창','북쪽 관찰','북쪽 관람'],L08:['서비스 접속','공용 연결'],L09:['상부 랜딩'],L10:['빈 수영장'],L11:['경사로']};
  for(const place of sitePlaces)if(state.log.some(l=>l.origin&&[place.name,...(aliases[place.id]??[])].some(name=>l.origin!.place.includes(name))))known.add(place.id);
  if(state.evidence.includes('E09'))known.add('L08');
  if(state.evidence.includes('E42')){known.add('L09');known.add('L10');}
  return sitePlaces.filter(p=>known.has(p.id)).map(p=>p.id);
}
