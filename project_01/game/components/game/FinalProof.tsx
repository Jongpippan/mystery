import { useLayoutEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { finalProofGroups, type Draft, type Challenge } from '@/lib/game/case';
import { script } from '@/lib/game/script';
import type { GameState, Tool } from '@/lib/game/state';

export function ProofField({field,draft,edit}:{field:Challenge['fields'][number];draft:Draft;edit:(d:Draft)=>void}) {
  return <fieldset className="proof-field"><legend>{field.label}</legend>{field.options.map(o=><label key={o.value}><input type="radio" name={field.id} value={o.value} checked={draft.fields[field.id]===o.value} onChange={()=>edit({...draft,fields:{...draft.fields,[field.id]:o.value}})}/><span>{o.label}</span></label>)}</fieldset>;
}

export function FinalProof({state,draft,fields,edit,inspect}:{state:GameState;draft:Draft;fields:Challenge['fields'];edit:(d:Draft)=>void;inspect:(tool:Tool,id:string)=>void}) {
  const list=useRef<HTMLDivElement>(null),offset=useRef(draft.sourceScroll??0);
  useLayoutEffect(()=>{offset.current=draft.sourceScroll??0;},[draft.sourceScroll]);
  useLayoutEffect(()=>{if(list.current)list.current.scrollTop=offset.current;},[draft.sourceRole]);
  const scene=(id:string)=>id.startsWith('KQ')?`C_${id.slice(1)}`:`C_D${id.slice(1)}`;
  const title=(id:string)=>id.startsWith('E')?script.evidence[id].title:script.scenes[scene(id)].title;
  const sources=[...state.evidence,...(state.investigation?.knowledge??[])];
  return <div className="final-proof">
    <p>다섯 역할마다 주장과 근거를 연결해 주세요. 원자료나 이미 입증한 결론을 사용할 수 있습니다. 메모는 자유롭게 적으며 판정하지 않습니다.</p>
    <ProofField field={fields.find(f=>f.id==='order')!} draft={draft} edit={edit}/>
    {finalProofGroups.map(g=>{
      const selected=draft.roleEvidence?.[g.id]??[];
      return <section key={g.id} id={`proof-role-${g.id}`} className="proof-role" tabIndex={-1} aria-labelledby={`proof-title-${g.id}`}>
        <h4 id={`proof-title-${g.id}`}>{g.label}</h4>
        {fields.filter(f=>(g.fields as readonly string[]).includes(f.id)).map(f=><ProofField key={f.id} field={f} draft={draft} edit={edit}/>)}
        <p>이 역할에 연결한 근거</p>
        <ul className="proof-source-chips">{selected.map(id=><li key={id}><Button type="button" variant="ghost" onClick={()=>inspect(id.startsWith('E')?'evidence':'history',id.startsWith('E')?id:scene(id))}>{title(id)} · 내용 보기</Button></li>)}</ul>
        <Button type="button" variant="outline" aria-expanded={draft.sourceRole===g.id} aria-controls={`sources-${g.id}`} onClick={()=>edit({...draft,sourceRole:draft.sourceRole===g.id?'':g.id,sourceScroll:0})}>근거 고르기 · {selected.length}개 선택</Button>
        {draft.sourceRole===g.id&&<div id={`sources-${g.id}`} className="role-source-list" ref={list} tabIndex={0} aria-label={`${g.label} 근거 선택`} onScroll={e=>{const y=e.currentTarget.scrollTop;if(Math.abs(y-(draft.sourceScroll??0))>1)edit({...draft,sourceScroll:y});}}>{sources.map(id=><label key={id}><input type="checkbox" checked={selected.includes(id)} onChange={()=>edit({...draft,roleEvidence:{...draft.roleEvidence,[g.id]:selected.includes(id)?selected.filter(k=>k!==id):[...selected,id]}})}/><span>{id.startsWith('K')?'입증한 결론 · ':''}{title(id)}</span></label>)}</div>}
        <label className="proof-note">{g.label} 메모 <Textarea value={draft.roleNotes?.[g.id]??''} onChange={e=>edit({...draft,roleNotes:{...draft.roleNotes,[g.id]:e.target.value}})}/></label>
      </section>;
    })}
  </div>;
}
