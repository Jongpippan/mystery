import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {displayText,script} from '@/lib/game/script';
import {defaultEvidenceFilters,evidenceFilterOptions,evidenceIndex,evidenceRows,evidenceTypes,personName,placeNames,relatedEvidence,type EvidenceFilters} from '@/lib/game/evidence-index';
import type {GameState,View} from '@/lib/game/state';
import {EvidenceThumbnail} from './EvidenceThumbnail';

export function EvidenceList({state,view,patch,inspect}:{state:GameState;view:View;patch:(v:Partial<View>)=>void;inspect:(id:string)=>void}){
 const filters=view.filters??defaultEvidenceFilters,options=evidenceFilterOptions(state),rows=evidenceRows(state,view.search,filters);
 const filter=(v:Partial<EvidenceFilters>)=>patch({filters:{...filters,...v},scroll:0});
 const selected=!!(view.search||filters.type||filters.person||filters.place||filters.sort!=='acquired');
 return <section aria-label="보유 증거 목록">
  <div className="evidence-search-row">
   <Input id="evidence-search" aria-label="증거 검색" placeholder="제목·원문에서 찾기" value={view.search} onChange={e=>patch({search:e.target.value,scroll:0})}/>
   <label>정렬<select id="evidence-sort" value={filters.sort} onChange={e=>filter({sort:e.target.value as EvidenceFilters['sort']})}><option value="acquired">입수순</option><option value="newest">최근 입수 먼저</option><option value="story">자료의 시각순</option></select></label>
  </div>
  <div className="evidence-filters">
   <label>종류<select id="evidence-type" value={filters.type} onChange={e=>filter({type:e.target.value as EvidenceFilters['type']})}><option value="">모든 종류</option>{options.types.map(t=><option key={t} value={t}>{evidenceTypes[t]}</option>)}</select></label>
   <label>관련 인물<select id="evidence-person" value={filters.person} onChange={e=>filter({person:e.target.value})}><option value="">모든 인물</option>{options.people.map(p=><option key={p} value={p}>{personName(p,state.playerName)}</option>)}</select></label>
   <label>관련 장소<select id="evidence-place" value={filters.place} onChange={e=>filter({place:e.target.value as EvidenceFilters['place']})}><option value="">모든 장소</option>{options.places.map(p=><option key={p} value={p}>{placeNames[p]}</option>)}</select></label>
  </div>
  <div className="evidence-results"><p role="status">현재 자료 {state.evidence.length}개 중 {rows.length}개</p>{selected&&<Button id="evidence-reset" variant="ghost" onClick={()=>patch({search:'',filters:{...defaultEvidenceFilters},scroll:0})}>조건 초기화</Button>}</div>
  {filters.sort==='story'&&<details className="evidence-sort-note"><summary>시각 정렬 기준</summary><p>자료에 기재된 날짜·시각 기준입니다. 진술이나 사본의 시각도 그 출처대로 표시합니다. 시각 미상은 해당 날짜의 뒤에, 날짜 미상은 맨 뒤에 둡니다.</p></details>}
  {!!filters.person&&personName(filters.person,state.playerName).length>6&&<p className="evidence-selected-person">관련 인물: {personName(filters.person,state.playerName)}</p>}
  {!!filters.place&&placeNames[filters.place].length>6&&<p className="evidence-selected-person">관련 장소: {placeNames[filters.place]}</p>}
  {rows.length?<div className="evidence-list">{rows.map(id=><button id={`evidence-${id}`} key={id} onClick={()=>inspect(id)}><EvidenceThumbnail id={id}/><span><span>{displayText(script.evidence[id].title,state.playerName)}</span><small>{filters.sort==='story'?evidenceIndex[id].story.label:evidenceTypes[evidenceIndex[id].type]}</small></span><span aria-hidden="true">›</span></button>)}</div>:<p className="empty-note">현재 자료에서 조건에 맞는 기록을 찾을 수 없습니다.</p>}
 </section>;
}

export function EvidenceContext({id,state,inspect}:{id:string;state:GameState;inspect:(tool:'people'|'evidence',id:string)=>void}){
 const m=evidenceIndex[id],people=m.people.filter(p=>state.met.includes(p)),related=relatedEvidence(id,state.evidence);
 return <section className="evidence-context" aria-label="자료 맥락">
  <p>{evidenceTypes[m.type]} · {m.story.label}</p><p>관련 장소: {m.places.map(p=>placeNames[p]).join(' · ')}</p>
  {!!people.length&&<><h4>자료에 관련된 인물</h4><div className="task-actions">{people.map(p=><Button id={`source-${id}-${p}`} key={p} variant="outline" onClick={()=>inspect('people',p)}>{personName(p,state.playerName)}</Button>)}</div></>}
  {!!related.length&&<><h4>함께 대조할 보유 자료</h4><div className="task-actions">{related.map(e=><Button id={`source-${id}-${e}`} key={e} variant="outline" onClick={()=>inspect('evidence',e)}>{displayText(script.evidence[e].title,state.playerName)}</Button>)}</div></>}
 </section>;
}
