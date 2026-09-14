import {script,displayText} from './script';
import type {GameState} from './state';

export const evidenceTypes={document:'문서',photo:'사진·물건',measurement:'실측·시험',audio:'음성 자료',observation:'직접 관찰',testimony:'진술·정정'} as const;
export const placeNames={L01:'현관',L02:'휴게실',L03:'연회장',L04:'북쪽 관람 통로',L05:'주방',L06:'적재·기록 데스크',L07:'음향 부스',L08:'서비스 접속부',L09:'수영장 상부 랜딩',L10:'빈 수영장',L11:'덮인 경사로',L12:'호숫가 보관 창고'} as const;
export const personNames:Record<string,string>={P00:'나여백',P01:'나모눈',P02:'봉만실',P03:'차무록',P04:'탁두철',P05:'소해금',P06:'배한술',P07:'진새벽',P08:'표문식',P09:'목백로'};
export const personName=(id:string,name:string)=>id==='P00'?name:personNames[id];
export type EvidenceType=keyof typeof evidenceTypes;
export type PlaceId=keyof typeof placeNames;
type StoryTime={day:number|null;minute:number|null;label:string};
type EvidenceMeta={type:EvidenceType;people:string[];places:PlaceId[];story:StoryTime;motif:string};
const time=(day:number|null,label:string,minute:number|null=null):StoryTime=>({day,minute,label});
const unknown=time(null,'날짜·시각 미기재');
const item=(type:EvidenceType,people:string[],places:PlaceId[],story:StoryTime,motif:string):EvidenceMeta=>({type,people,places,story,motif});
// Tags describe only each acquired source's objects, named people and relevant
// places. They do not certify a suspect, a claimed clock value or a live location.
// Authority: the same-ID accepted evidence original and its acquisition scene.
export const evidenceIndex:Record<string,EvidenceMeta>={
 E01:item('document',['P00','P02'],['L02'],time(21,'10/21–23 · 의뢰 기간'),'날짜 칸과 서명란이 있는 작업 의뢰서'),
 E02:item('document',['P01','P02'],['L01','L02','L03','L10'],unknown,'안전 구역 안내와 출입 금지 표식'),
 E03:item('document',['P02'],['L01','L02','L03','L07'],unknown,'현관에서 갈라지는 행사장 약도'),
 E04:item('document',['P04','P02'],['L03'],time(21,'10/21 · 작업표 19:40–19:46',19*60+40),'정지선 9 작업표와 바퀴'),
 E05:item('measurement',[],['L03'],time(22,'10/22 · 현장 실측'),'고정 창·두 문과 두 칸막이 정지선'),
 E06:item('measurement',[],['L03','L04'],time(22,'10/22 · 중립 시야 시험'),'반투명 창과 높이가 다른 세 의자 시야'),
 E07:item('photo',['P03'],['L03'],time(22,'10/22 · 회수 사진'),'의자에 걸친 파란 재킷과 주머니 수선표'),
 E08:item('testimony',['P02','P03'],['L03','L04'],time(21,'진술 대상 · 약 20:08과 20:25',20*60+8),'창을 사이에 둔 두 목격과 끊긴 연결선'),
 E09:item('measurement',['P07'],['L03','L08','L09'],time(22,'10/22 · 보통 걸음 실측'),'손님 문에서 통제선까지 꺾이는 출입 동선'),
 E10:item('photo',['P03','P00','P02'],['L03','L08'],time(21,'10/21 · 점검 시작 전 필기'),'번호표 앞 붉은 코트와 온전한 삼각 수선'),
 E11:item('audio',['P05','P08'],['L07'],time(21,'10/21 · 리허설 18:10',18*60+10),'한 줄 음성 트랙과 의자 삐걱임 표식'),
 E12:item('document',['P05'],['L07'],time(21,'10/21 · 예정표 18:10부터',18*60+10),'네 일정 줄과 접힌 오른쪽 색인 탭'),
 E13:item('measurement',['P07','P09'],['L01','L05','L07'],time(21,'10/21 사전 점검·10/22 재대조'),'현관 화면과 두 시계의 오차 대조'),
 E14:item('audio',['P00','P05','P08'],['L03','L07'],time(21,'비교 대상 · 18:10와 20:30',18*60+10),'중단과 삐걱임 위치가 맞는 두 음성 트랙'),
 E15:item('testimony',['P05','P08'],['L07'],time(21,'정정된 재생 조작 · 20:30',20*60+30),'마이크 설명에서 파일 재생으로 바뀐 진술'),
 E16:item('document',['P08','P06'],['L01'],time(21,'직접 수령 기재 · 20:10–20:12',20*60+10),'두 사람 사이 원본 목록 한 장의 인계표'),
 E17:item('document',['P00','P02'],['L03'],time(21,'장비 기록 · 20:19 차단·20:20 복귀',20*60+19),'차단과 복귀 두 줄의 전원 기록'),
 E18:item('observation',['P00','P02','P03','P05'],['L03','L07'],time(21,'공개 점검 · 20:18 신호·20:20 복귀',20*60+18),'수량표 탁자와 계속 켜진 낮은 안전 조명'),
 E19:item('document',['P08','P03','P07'],['L03','L09'],time(21,'10/21 · 행사 정리 신호 뒤 약속'),'폴더에서 나온 접힌 약속 카드'),
 E20:item('photo',['P09','P06'],['L06','L05'],time(21,'사진 · 20:24 무렵',20*60+24),'덮개 아래 상자와 장화 같은 두 끝'),
 E21:item('measurement',['P04'],['L06','L11'],time(22,'10/22 · 수레·계단 실측'),'계단 개구보다 넓은 수레와 바퀴 흔적'),
 E22:item('document',['P05'],['L06'],unknown,'장화 달린 인형 다리 두 개의 소품 목록'),
 E23:item('photo',['P07','P09','P06'],['L12'],time(22,'10/22 · 입회 개봉'),'장부가 든 열린 상자와 옆의 공연용 다리'),
 E24:item('testimony',['P06','P04','P09'],['L06','L11','L12'],time(21,'정정된 포장 시작 · 20:02 무렵',20*60+2),'수레 호송 경로와 인계 뒤 빠진 한 사람'),
 E25:item('photo',[],['L05'],time(22,'10/22 · 재 관찰'),'재 옆의 탄 느슨한 표지와 빈 줄 조각'),
 E26:item('photo',[],['L12'],time(22,'10/22 · 개봉한 장부'),'그을린 표지 속 묶인 장부 속지'),
 E27:item('document',['P09','P04','P06'],['L06'],time(21,'공개본 기재 · 20:07–20:17',20*60+7),'두 시각 칸과 금액 가림이 있는 공개 사본'),
 E28:item('document',['P09'],['L06'],time(21,'견본 기재 · 19:10–19:12',19*60+10),'견본 00의 위쪽 부본과 아래쪽 본장'),
 E29:item('photo',['P09'],['L12'],time(21,'인수 기록 · 20:36',20*60+36),'봉인 사진과 접힘이 이어지는 인수 기록'),
 E30:item('photo',[],['L12'],time(21,'10/21 · 젖은 장 안쪽 시각 미확인'),'제본에 묶인 채 젖어 붙은 접힌 장'),
 E31:item('document',['P02'],['L02'],unknown,'운영자금 대출 목적과 한 사람의 서명'),
 E32:item('document',['P06'],['L02'],unknown,'급여 선지급 차입과 두 번째 담보 약정'),
 E33:item('document',[],['L02'],unknown,'포기 문구에 다시 붙인 서명지와 충돌한 쪽수'),
 E34:item('document',[],['L02'],unknown,'외부 보관 안내와 연속된 서명 순서'),
 E35:item('document',['P02','P03','P04'],['L01'],unknown,'은행·거래처 등록·공사 장부 세 묶음'),
 E36:item('testimony',['P02','P03'],['L02'],unknown,'외부 보관 묶음과 별도로 남은 대출 승인'),
 E37:item('document',['P08','P02','P03'],['L01'],time(22,'통지된 확인 약속 · 10/22 아침'),'정산 차이 통지와 별도 수령 확인 첨부'),
 E38:item('document',['P06','P03'],['L02'],unknown,'한술에게 남긴 짧은 두 번째 담보 메모'),
 E39:item('document',['P08','P00'],['L03'],time(21,'10/21 · 원본 보관 요청'),'목적 페이지와 서명장을 함께 묶은 요청'),
 E40:item('measurement',[],['L03','L07','L09'],time(22,'10/22 · 부스 창 실측'),'맑은 창과 별도의 반투명 창'),
 E41:item('document',['P05'],['L07'],time(21,'10/21 · 리셋 무렵 메모'),'접힌 수첩의 네 짧은 관찰 단어'),
 E42:item('photo',['P04','P07'],['L09'],time(22,'10/22 · 게이트 확인·사후 장벽'),'열린 경첩 문·기존 경고표·새 장벽'),
 E43:item('testimony',['P05'],['L07','L09'],time(21,'관찰 경계 진술 · 20:18 뒤–20:20 전',20*60+18),'반투명 창 너머 두 그림자와 팔 동작 정정'),
 E44:item('photo',['P08','P07'],['L01','L10'],time(21,'10/21 · 천 조각 회수'),'맞물리는 찢김선과 끊긴 삼각 수선'),
 E45:item('measurement',['P05','P07'],['L07','L09'],time(22,'10/22 · 세 동작 안전 비교'),'헛디딤·부축·밀어내기의 다른 동작 순서'),
 E46:item('testimony',['P04','P03'],['L01'],time(21,'충돌 진술 · 20:17 이전 / 약 20:26'),'외투 인계 시점을 다르게 말하는 두 말풍선'),
 E47:item('photo',['P04'],['L01','L08'],time(22,'10/22 · 작업복 기록 대조'),'랙의 젖은 파란 작업복과 재 묻은 소매'),
 E48:item('measurement',['P09'],['L06','L05'],time(23,'10/23 · 시각 인상·복사 시험'),'두 겹에 함께 인상하는 장치와 일반 복사기'),
 E49:item('photo',['P09','P04','P06'],['L12'],time(21,'하단 본장 기재 · 20:14–20:24',20*60+14),'제본을 유지한 펼친 하단 본장과 두 시각'),
 E50:item('measurement',[],['L12'],time(23,'10/23 · 제본 연결부 대조'),'제본 실·천공·연속 번호의 맞물림'),
 E51:item('measurement',[],['L06','L05'],time(23,'10/23 · 원본·공개본 겹침 비교'),'금액 가림과 별개의 두 시각 필드 차이'),
 E52:item('testimony',['P09','P04','P06','P03'],['L12','L05'],time(21,'직접 관찰 20:14–24 / 복사 20:40–50',20*60+14),'연속 관찰과 혼자 쓴 복사기를 나눈 정정')
};
export type EvidenceFilters={type:EvidenceType|'';person:string;place:PlaceId|'';sort:'acquired'|'newest'|'story'};
export const defaultEvidenceFilters:EvidenceFilters={type:'',person:'',place:'',sort:'acquired'};
// Explicit comparison families named by the originals; intersect with held IDs.
const comparisonFamilies=[['E06','E07','E08','E10'],['E11','E12','E14','E15'],['E20','E21','E22','E23','E24'],['E25','E26'],['E27','E28','E30','E48','E49','E50','E51'],['E31','E32','E33','E34','E35','E36'],['E40','E41','E43','E45'],['E10','E44'],['E46','E47','E52']];
export function relatedEvidence(id:string,held:string[]){return held.filter(other=>other!==id&&comparisonFamilies.some(group=>group.includes(id)&&group.includes(other)));}
export function evidenceFilterOptions(state:Pick<GameState,'evidence'|'met'>){
 const rows=state.evidence.map(id=>evidenceIndex[id]);
 return {types:Object.keys(evidenceTypes).filter(k=>rows.some(r=>r.type===k)) as EvidenceType[],people:state.met.filter(id=>rows.some(r=>r.people.includes(id))),places:(Object.keys(placeNames) as PlaceId[]).filter(id=>rows.some(r=>r.places.includes(id)))};
}
export function validEvidenceFilters(v:unknown,state:Pick<GameState,'evidence'|'met'>):v is EvidenceFilters{
 if(!v||typeof v!=='object'||Array.isArray(v))return false;const f=v as EvidenceFilters,o=evidenceFilterOptions(state);
 return Object.keys(v).every(k=>['type','person','place','sort'].includes(k))&&(f.type===''||o.types.includes(f.type))&&(f.person===''||o.people.includes(f.person))&&(f.place===''||o.places.includes(f.place))&&['acquired','newest','story'].includes(f.sort);
}
export function evidenceRows(state:Pick<GameState,'evidence'|'met'|'playerName'>,search='',filters:EvidenceFilters=defaultEvidenceFilters){
 const query=search.trim().normalize('NFKC').toLocaleLowerCase('ko');
 const ids=state.evidence.filter(id=>{const m=evidenceIndex[id],e=script.evidence[id];return (!filters.type||m.type===filters.type)&&(!filters.person||m.people.includes(filters.person))&&(!filters.place||m.places.includes(filters.place))&&(!query||displayText(e.title+' '+e.text,state.playerName).normalize('NFKC').toLocaleLowerCase('ko').includes(query));});
 if(filters.sort==='newest')ids.reverse();
 if(filters.sort==='story')ids.sort((a,b)=>{const x=evidenceIndex[a].story,y=evidenceIndex[b].story;return (x.day??Infinity)-(y.day??Infinity)||(x.minute??Infinity)-(y.minute??Infinity)||state.evidence.indexOf(a)-state.evidence.indexOf(b);});
 return ids;
}
