import {currentSequence,type GameState} from '@/lib/game/state';
import {presentation} from '@/lib/game/presentation';

export function eventStill(state:GameState){
 if(state.travel)return null;
 const stage=state.investigation?.stage,place=presentation(state).place;
 const sequence=currentSequence(state),reached=(id:string)=>{const at=sequence.findIndex(n=>n.id===id);return at>=0&&at<=state.cursor;};
 if(stage==='route'&&reached('C_CH01_06:n0006')&&!reached('C_CH01_06:n0011'))return {kind:'route',changed:true};
 if(stage==='ch2-sources'&&place.startsWith('현관'))return {kind:'sources',changed:state.evidence.includes('E17')};
 if(stage==='ch4-pressure')return {kind:'note',changed:reached('C_CH04_06:n0012')};
 if(stage==='ep-handoff')return {kind:'handoff',changed:reached('C_EP_01:n0007')};
 if(stage==='ep-staff')return {kind:'staff',changed:state.choices.B_EXHIBIT==='joint_annotations'};
 if(stage==='ep-departure')return {kind:'departure',changed:false};
 if(!state.investigation&&state.sceneId==='C_PR_10'&&reached('C_PR_10:n0015')&&!reached('C_PR_10:n0036'))return {kind:'form',changed:reached('C_PR_10:n0024'),received:reached('C_PR_10:n0019'),finished:reached('C_PR_10:n0022')};
 return null;
}
type Shot=NonNullable<ReturnType<typeof eventStill>>;
export function EventStill({shot}:{shot:Shot}){
 const descriptions:Record<string,string>={route:'손님 문 쪽 출입 끈은 옮겼고 동쪽 작업실 문에는 봉인이 남아 있습니다.',sources:'현관 조사 탁자 위에 사람·시계·전원 카드와 각 기록 봉투가 나뉘어 놓여 있습니다.',note:'한술이 가져온 접힌 메모. 두철이 같은 접힌 방향으로 돌려놓습니다.',handoff:'직접 확인, 진술과 정정, 증거로 이은 결론을 별도 묶음으로 인계합니다.',staff:'직원 기록을 설명할 빈 패널과 서로 다른 당사자의 자료입니다.',departure:'여행가방과 문서 가방, 모눈의 배낭을 벽 쪽에 두어 통로를 비워 둡니다.',form:'견본 00의 위쪽 업무용 부본과 제본된 아래쪽 본장. 같은 입력이 두 장에 남습니다.'};
 const labels=shot.kind==='sources'?['사람','시계','전원']:shot.kind==='handoff'?['직접 확인','진술과 정정','증거로 이은 결론']:['대출 서류','담보 자료','게이트 점검표'];
 if(shot.kind==='note'&&!shot.changed)descriptions.note='한술이 꺼낸 접힌 메모입니다. 내용은 자료 상세에서 확인합니다.';
 return <figure className="event-papers"><svg viewBox="0 0 600 290" role="img" aria-label={descriptions[shot.kind]} className="w-full rounded-xl bg-[#d9dfd0] text-[#254440]">
  <rect x="12" y="12" width="576" height="266" rx="12" fill="#e9e4d4" stroke="currentColor"/>
  {shot.kind==='route'?<><rect x="80" y="45" width="150" height="190" fill="#456a60"/><path d="M90 60H210V225" fill="none" stroke="#eee8cf" strokeWidth="3"/><rect x="380" y="45" width="130" height="190" fill="#446057"/><path d="M385 120H505" stroke="#e5bd67" strokeWidth="16"/><text x="455" y="126" textAnchor="middle">봉인</text><path d="M260 220Q300 155 330 225" fill="none" stroke="#b6814e" strokeWidth="7"/><text x="155" y="260" textAnchor="middle">손님 문</text><text x="445" y="260" textAnchor="middle">동쪽 작업실 문</text></>
  :shot.kind==='form'?<>{[0,1].map((n)=><g key={n} transform={`translate(${shot.changed?45+n*270:145+n*22},${shot.changed?48:45+n*55})`}><rect width="230" height="150" fill={n?'#e6d8b3':'#fffaf0'} stroke="currentColor"/><path d="M12 10V138" stroke="currentColor" strokeDasharray={n?undefined:'3 4'}/><text x="28" y="28">견본 00 · {n?'본장':'업무용 부본'}</text><text x="28" y="72">접수 {shot.received?'19:10':'—'}</text><text x="28" y="108">종료 {shot.finished?'19:12':'—'}</text></g>)}<text x="300" y="265" textAnchor="middle">{shot.changed?'뜯어 낸 위쪽 · 제본에 남은 아래쪽':'두 겹에 같은 시각을 눌러 찍음'}</text></>
  :shot.kind==='note'?<><g transform={`translate(${shot.changed?215:175},65)`}><rect width="210" height="155" rx="4" fill="#f9f0d8" stroke="currentColor"/><path d="M0 0L65 70H210M65 70L0 155" fill="none" stroke="#987653" strokeDasharray="4 3"/></g><text x="300" y="255" textAnchor="middle">{shot.changed?'원래 접힌 방향으로 반환':'한술이 가져온 메모'}</text></>
  :shot.kind==='departure'?<><rect x="70" y="95" width="140" height="125" rx="12" fill="#6c796b"/><path d="M105 95V72H175V95" fill="none" stroke="currentColor" strokeWidth="6"/><rect x="235" y="145" width="110" height="75" rx="5" fill="#ab835f"/><path d="M265 145V130H315V145" fill="none" stroke="currentColor" strokeWidth="5"/><rect x="390" y="118" width="88" height="102" rx="20" fill="#799eb1"/><rect x="405" y="165" width="58" height="40" rx="10" fill="#adc2c2"/><text x="300" y="258" textAnchor="middle">짐은 벽 쪽에 · 통로는 비워 둠</text></>
  :<>{labels.map((label,n)=><g key={label} transform={`translate(${32+n*190},50)`}><rect width="166" height="145" fill={shot.kind==='staff'?'#d8dfc6':'#fffaf0'} stroke="currentColor"/><path d="M0 0L83 45L166 0" fill="none" stroke="#99856b"/><text x="83" y="85" textAnchor="middle" fontSize="16">{label}</text><path d="M20 108H145M20 122H125" stroke="#b1ad98"/></g>)}<text x="300" y="249" textAnchor="middle">{shot.kind==='handoff'?(shot.changed?'인수 서명 완료 · 같은 줄에 남긴 사본':'묶음별로 넘겨 보며 인계 확인'):shot.kind==='sources'?'각 기록이 확인하는 범위를 따로 읽기':'당사자의 자료를 구분해 설명할 자리'}</text></>}
 </svg><figcaption className="source-caption">{descriptions[shot.kind]}</figcaption></figure>;
}
