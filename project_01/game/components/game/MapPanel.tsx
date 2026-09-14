import type {GameState,InvestigationAction} from '@/lib/game/state';
import {travelOptions,portName} from '@/lib/game/travel';
import {Button} from '@/components/ui/button';
import {presentation} from '@/lib/game/presentation';
import {knownPlaces,sitePlaces,siteRoutes} from '@/lib/game/site';
import {displayText,script} from '@/lib/game/script';
import {EvidenceView} from './EvidenceView';

export function MapPanel({state,dispatch}:{state:GameState;dispatch:(action:InvestigationAction)=>void}) {
  const current=presentation(state),known=knownPlaces(state);
  const zoom=state.views?.at(-1)?.zoom??1;
  const places=sitePlaces.filter(p=>known.includes(p.id));
  const routes=siteRoutes.filter(r=>known.includes(r.from)&&known.includes(r.to));
  const lower=places.some(p=>p.floor==='lower');
  const height=Math.max(180,...places.map(p=>p.y+45));
  const locate=(id:string)=>sitePlaces.find(p=>p.id===id)!;
  return <section className="space-y-5" aria-label="여울관 지도">
    <h3 className="detail-title">여울관 안내도</h3>
    <p><strong>현재 장면</strong> · {current.place}<br/>{current.time}</p>
    <p>{current.companion?'모눈과 함께 있습니다.':`모눈은 휴게실에서 ${current.caretaker}과 함께 있습니다.`}</p>
    {travelOptions(state).length>0&&<section className="space-y-3" aria-label="현재 자리에서 이동"><h4>현재 자리에서 이동</h4><p>이동을 선택하면 연결된 다음 장소로 갑니다. 읽던 조사와 답안은 원래 자리에 남겨 둡니다.</p><div className="choice-list">{travelOptions(state).map(o=><Button key={o.id} variant="outline" onClick={()=>dispatch({type:'move',route:o.id})}>{o.label}</Button>)}</div></section>}
    {state.travel&&<p>조사를 이어갈 자리 · {portName(state.travel.anchor)}. 연결된 길을 따라 돌아가면 읽던 조사로 이어집니다.</p>}
    {places.length>0&&<>
      <div className="flex flex-wrap items-center gap-2" aria-label="지도 배율"><Button variant="outline" disabled={zoom<=1} onClick={()=>dispatch({type:'viewState',patch:{zoom:Math.max(1,zoom-.5)}})}>축소</Button><span>{Math.round(zoom*100)}%</span><Button variant="outline" disabled={zoom>=3} onClick={()=>dispatch({type:'viewState',patch:{zoom:Math.min(3,zoom+.5)}})}>확대</Button><Button variant="ghost" onClick={()=>dispatch({type:'viewState',patch:{zoom:1}})}>전체 보기</Button></div>
      <div className="max-h-96 overflow-auto" tabIndex={0} aria-label="확대한 지도 이동 영역"><svg viewBox={`0 0 570 ${height}`} role="img" aria-labelledby="site-map-title site-map-description" style={{width:`${zoom*100}%`,maxWidth:zoom===1?'42rem':'none'}} className="mx-auto rounded-lg border bg-stone-50 text-stone-800">
        <title id="site-map-title">확인한 여울관 공간</title>
        <desc id="site-map-description">북쪽이 위입니다. 위쪽은 지상, 아래쪽은 아래층입니다. 도식은 거리 비율을 나타내지 않습니다. 자세한 경로와 출입 조건은 아래 목록에서 읽을 수 있습니다.</desc>
        <text x="20" y="30" fontSize="16">↑ 북 · 지상</text>
        {lower&&<><path d="M15 350H555" stroke="currentColor" strokeDasharray="5 5"/><text x="20" y="380" fontSize="16">아래층</text></>}
        {routes.map(r=>{const a=locate(r.from),b=locate(r.to);return <path key={r.id} d={`M${a.x} ${a.y}L${b.x} ${b.y}`} stroke="currentColor" strokeWidth="2" strokeDasharray={r.id==='R09'?'4 5':undefined}/>;})}
        {places.map(p=><g key={p.id}><rect x={p.x-53} y={p.y-22} width="106" height="44" rx="6" fill="#fafaf9" stroke="currentColor"/><text x={p.x} y={p.y+5} textAnchor="middle" fontSize="12">{p.name}</text></g>)}
      </svg></div>
      <p>길의 방향을 나타낸 약도입니다. 길이·이동 시간의 축척은 아닙니다.</p>
      <ul className="space-y-4" aria-label="확인한 공간의 연결과 출입 조건">{routes.map(r=><li key={r.id}>
        <strong>{locate(r.from).name}{'port' in r?` ${r.port}`:''} → {locate(r.to).name}</strong>
        <p>{r.direction} · {r.access}</p>
      </li>)}</ul>
      {known.includes('L08')&&<p>연회장의 손님 문과 직원 문은 서로 다릅니다. 칸막이를 통과할 수 없으며, 음향 부스에는 연회장 쪽 문으로 들어갑니다.</p>}
    </>}
    <p>지도 열람은 이동하거나 시간을 진행하지 않습니다. 이동은 위의 현재 자리에서 이동 버튼으로 선택합니다. 아래 출입 조건은 경로 안내입니다.</p>
    {state.evidence.includes('E03')?<details><summary>받은 안내도 원문</summary><div className="document-original">{displayText(script.evidence.E03.text,state.playerName)}</div></details>:<p className="empty-note">안내도를 받으면 여기서 다시 볼 수 있습니다.</p>}
    {state.evidence.includes('E09')&&<details><summary>직접 확인한 출입 동선</summary><EvidenceView id="E09" name={state.playerName}/></details>}
  </section>;
}
