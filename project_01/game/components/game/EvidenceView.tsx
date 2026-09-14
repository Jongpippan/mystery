import {ReadableOriginal,BindingConnections,ImprintTest,CopyOverlay} from './OriginalView';
import { displayText, script } from '@/lib/game/script';
import { Button } from '@/components/ui/button';
import {SoundComparison} from './SoundView';
import {CartGeometry,CargoBox,BoundOriginal} from './CargoView';
import {PaperSources,PageConnections} from './PaperView';
import {BoothPanes,SecuredGate,ActionComparison,CoatComparison} from './VisibilityView';

export function BallroomPlan({stop=9,experiment=false}:{stop?:6|9;experiment?:boolean}) {
  const x=48+stop*34;
  return <figure className="ballroom-plan"><svg viewBox="0 0 510 430" role="img" aria-label={`연회장 실측도. 고정 창 7m, 손님 문 3m, 직원 문 10m. 칸막이 현재 ${stop}m 정지선.`}>
    <rect x="48" y="45" width="408" height="340" rx="2" fill="#f4eedb" stroke="#465f56" strokeWidth="4"/>
    {[6,9].map(n=><g key={n}><line x1={48+n*34} y1="45" x2={48+n*34} y2="385" stroke="#ad915e" strokeDasharray="4 5"/><text x={48+n*34} y="411" textAnchor="middle">{n}m 정지선</text></g>)}
    <line x1="267" y1="45" x2="306" y2="45" stroke="#55908d" strokeWidth="10"/>
    <text x="286" y="27" textAnchor="middle">북쪽 고정 창 · 7m</text>
    <line x1="132" y1="385" x2="168" y2="385" stroke="#f4eedb" strokeWidth="7"/><text x="150" y="366" textAnchor="middle">손님 문 · 3m</text>
    <line x1="372" y1="385" x2="404" y2="385" stroke="#f4eedb" strokeWidth="7"/><text x="388" y="342" textAnchor="middle">직원 문</text><text x="388" y="366" textAnchor="middle">10m</text>
    <line x1={x} y1="47" x2={x} y2="383" stroke="#233f3d" strokeWidth="8"/>
    <text x="70" y="85">북 ↑</text><text x="14" y="240" transform="rotate(-90 14 240)">10m</text>
    <text x="205" y="226" textAnchor="middle">12m</text>
  </svg><figcaption>{experiment?'10월 22일 재현시험':'현장 실측 삽입도'} · 창과 문은 고정 · 남서 모서리 기준</figcaption></figure>;
}
export function EvidenceView({id,name,zoom=1,onZoom,unfolded=false,edges=false,originalReadable=false}:{id:string;name:string;zoom?:number;onZoom?:(value:number)=>void;unfolded?:boolean;edges?:boolean;originalReadable?:boolean}) {
  const e=script.evidence[id];if(!e)return null;
  return <article className={`evidence-detail evidence-${id}`}>
    <h3 className="detail-title">{e.title}</h3>
    <PaperSources id={id}/>
    {id==='E40'&&<BoothPanes/>}
    {id==='E42'&&<SecuredGate/>}
    {id==='E44'&&<CoatComparison/>}
    {id==='E45'&&<div className="comparison-record">{(['stumble','help','push'] as const).map(mode=><ActionComparison key={mode} mode={mode}/>)}<p className="source-caption">가능한 동작의 시야 비교입니다. 어제 사건의 독립 목격으로 세지 않습니다.</p></div>}
    {id==='E41'&&<p className="witness-origin">소해금이 남긴 자기 관찰 메모 · 독립된 두 번째 목격자 아님</p>}
    {id==='E43'&&<p className="witness-origin">음향 수첩과 같은 소해금의 관찰 · 동작과 시각 경계 정정</p>}
    {edges&&['E33','E34'].includes(id)&&<PageConnections/>}
    {id==='E21'&&<CartGeometry/>}
    {id==='E23'&&<CargoBox opened/>}
    {id==='E30'&&(originalReadable?<ReadableOriginal/>:<BoundOriginal/>)}
    {id==='E48'&&<ImprintTest/>}{id==='E49'&&<ReadableOriginal/>}{id==='E50'&&<BindingConnections/>}{id==='E51'&&<CopyOverlay/>}
    {id==='E27'&&<div className="handoff-copy"><strong>기록 인계 · 공개용 사본</strong><dl><div><dt>접수</dt><dd><span className="copy-time-a">20:07</span></dd></div><div><dt>종료</dt><dd><span className="copy-time-b">20:17</span></dd></div><div><dt>입회</dt><dd>목백로</dd></div><div><dt>참여</dt><dd>탁두철·배한술</dd></div><div><dt>임금액</dt><dd aria-label="금액 가림"><span className="redacted-amount"/></dd></div></dl></div>}
    {(id==='E11'||id==='E14')&&<SoundComparison compare={id==='E14'}/>}
    {id==='E12'&&<div className="schedule-tab"><strong>{unfolded?'펼쳐 확인한 예정 경로':'접혀 있는 예정 경로 칸'}</strong><p>{unfolded?script.scenes.C_CH02_01.nodes.find(n=>n.id==='C_CH02_01:n0024')!.text:'진행표 오른쪽 칸은 색인 탭 아래에 있습니다. 소해금에게 펼쳐 달라고 요청할 수 있습니다.'}</p></div>}
    {id==='E13'&&<figure className="clock-comparison"><strong>현관 통화 화면 ↔ 주방 인계 시계 ↔ 음향 시계</strong><p>차이 1분 이내</p><figcaption>10월 22일 대조 기록 + 10월 21일 사전 점검 카드</figcaption></figure>}
    {id==='E17'&&<figure className="power-record"><ol><li><time>20:19</time>부하 차단</li><li><time>20:20</time>복귀</li></ol><figcaption>장비 기록 · 사람의 위치나 상태를 기록한 자료는 아닙니다.</figcaption></figure>}
    {id==='E05'&&<><div className="task-actions"><Button variant="outline" onClick={()=>onZoom?.(Math.min(3,zoom+.5))} disabled={!onZoom||zoom>=3}>도면 확대</Button><Button variant="outline" onClick={()=>onZoom?.(Math.max(1,zoom-.5))} disabled={!onZoom||zoom<=1}>도면 축소</Button><span>{Math.round(zoom*100)}% · 확대 후 도면 안에서 좌우로 이동할 수 있습니다.</span></div><div className="plan-viewport" tabIndex={0} aria-label="연회장 실측도 확대 영역"><div className="plan-comparison" style={zoom>1?{minWidth:1020*zoom}:undefined}><BallroomPlan stop={6}/><BallroomPlan stop={9}/></div></div></>}
    {id==='E09'&&<figure className="route-diagram"><ol><li>북쪽 창가 의자 · 서쪽 공개 공간</li><li>남쪽 손님 문</li><li>서비스 접속부 · 26m / 30–45초</li><li>동쪽 상부 랜딩 경계 · 12m / 15–25초</li></ol><figcaption>오늘 걸어 본 경로 · 안쪽 현장 출입 아님 · 비례 지도 아님</figcaption></figure>}
    {id==='E30'&&originalReadable&&<p className="source-caption">위는 같은 본장을 펼친 현재 상태입니다. 아래 첫 확인 기록의 ‘읽을 수 없음’은 젖어 붙어 있던 당시 상태입니다.</p>}
    <div className="document-original">{displayText(e.text,name)}</div>
    <p className="source-caption">확인한 자리: {script.scenes[e.scene].title} · 원문과 진술의 범위는 자료에 적힌 그대로 보존됩니다.</p>
  </article>;
}
