import { FinalProof, ProofField } from './FinalProof';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { challenges, uiFeedback, finalErrorRole, finalProofGroups, type TaskId } from '@/lib/game/case';
import { emptyDraft, investigationOptions, taskNode, type GameState, type InvestigationAction, type GameAction } from '@/lib/game/state';
import { displayText, script } from '@/lib/game/script';
import { recoveryLines } from '@/lib/game/systems';
import {portName} from '@/lib/game/travel';

export function ChallengePanel({state,dispatch}:{state:GameState;dispatch:React.Dispatch<GameAction|InvestigationAction>}) {
  const i=state.investigation;if(!i)return null;
  const t=i.task;
  if(state.travel)return <section className="space-y-3"><h3>조사하던 자리로 돌아가 이어 쓰기</h3><p>{portName(state.travel.anchor)}에 작성하던 조사와 답안이 남아 있습니다. 현장의 연결된 길을 따라 돌아가면 같은 질문을 이어 쓸 수 있습니다.</p><p>보유 자료·대화·메모는 위의 도구에서 계속 볼 수 있습니다.</p><Button onClick={()=>dispatch({type:'viewClose'})}>현재 장소와 이동 경로 보기</Button></section>;
  if(!t)return <div className="challenge-choices"><h3>현재 조사에서 따져 볼 질문</h3>{investigationOptions(state).filter(o=>o.kind==='task').map(o=><Button key={o.id} variant="outline" onClick={()=>dispatch({type:'task',id:o.id as TaskId})}>{o.label}</Button>)}{!investigationOptions(state).some(o=>o.kind==='task')&&<p>지금 이어지는 현장 확인과 대화를 먼저 마쳐 주세요.</p>}</div>;
  const c=challenges[t.id], d=i.drafts[t.id]??emptyDraft(), node=taskNode(state);
  const edit=(draft:typeof d)=>dispatch({type:'draft',id:t.id,draft});
  const feedback=t.result?.kind==='error'?uiFeedback[t.result.key]:null;
  const show=(text:string)=>displayText(text,state.playerName);
  return <section className="challenge-panel">
    <h3 className="detail-title">{script.scenes[`C_${t.id}`].title}</h3>
    <div className="point-strip" aria-live="polite"><strong>여유 {state.points} / 6</strong><span>틀린 주장 제출 시 여유 2 감소</span></div>
    {t.phase!=='answer'&&<div className="task-dialogue" aria-live="polite">
      {node&&<><p className="task-speaker">{node.kind==='speech'?node.speaker==='P00'?state.playerName:node.label?.replace(/^P\d+ · /,''):'현장'}</p><p className={node.kind==='direction'?'stage-direction':''}>{show(node.text)}</p></>}
      {feedback&&<p>{feedback} 여유는 이번 제출에 한 번만 감소했습니다.</p>}
      <Button onClick={()=>dispatch({type:'taskNext'})}>{node?'대화 계속':'답안으로 돌아가기'}</Button>
    </div>}
    {t.result?.kind==='incomplete'&&<div role="alert" className="task-feedback"><p>{t.result.message} 여유는 줄지 않았습니다.</p><p>{show(script.utterances.S_SYS_03_0031.text)}</p></div>}
    {state.points===0&&<div className="recovery-panel" role="status">{recoveryLines(state).map(n=><p key={n.id}><strong>{n.speaker==='P00'?state.playerName:n.label?.replace(/^P\d+ · /,'')}</strong> · {show(n.text)}</p>)}<p>자료·메모·초안은 유지됩니다. 읽고 고치는 것은 무료입니다.</p><Button onClick={()=>dispatch({type:'recover'})}>잠깐 정리하고 이어가기 · 여유 4로 회복</Button></div>}
    <form onSubmit={e=>{e.preventDefault();dispatch({type:'submit',id:t.id,attempt:crypto.randomUUID()});}}>
      {t.id==='D30'&&finalErrorRole[i.errors.D30??'']&&<Button type="button" variant="outline" onClick={()=>{const card=document.getElementById(`proof-role-${finalErrorRole[i.errors.D30??'']}`);card?.focus({preventScroll:true});card?.scrollIntoView({block:'start'});}}>다시 살필 역할로 이동 · {finalProofGroups.find(g=>g.id===finalErrorRole[i.errors.D30??''])?.label}</Button>}
      {t.id==='D30'?<FinalProof state={state} draft={d} fields={c.fields} edit={edit} inspect={(tool,id)=>{dispatch({type:'view',tool});dispatch({type:'viewState',patch:{detail:id}});}}/>:c.fields.map(f=><ProofField key={f.id} field={f} draft={d} edit={edit}/>)}

      {c.evidence&&<fieldset className="proof-field"><legend>제시할 자료 · {d.evidence.length}개 선택</legend><p>내용 열람과 제시 선택은 별개입니다. 충분한 근거가 있으면 관련 자료를 더 골라도 됩니다.</p><div className="proof-evidence">{state.evidence.map(id=><div key={id}><label><input type="checkbox" checked={d.evidence.includes(id)} onChange={()=>edit({...d,evidence:d.evidence.includes(id)?d.evidence.filter(e=>e!==id):[...d.evidence,id]})}/><span>{script.evidence[id].title}</span></label><Button type="button" variant="ghost" onClick={()=>{dispatch({type:'view',tool:'evidence'});dispatch({type:'viewState',patch:{detail:id}});}}>내용 보기</Button></div>)}</div></fieldset>}
      <label className="proof-note">추리 메모 <Textarea value={d.note} onChange={e=>edit({...d,note:e.target.value})}/></label>
      <p className="source-caption">메모는 자유롭게 적을 수 있습니다. 판정에는 선택한 주장·경로·자료를 사용합니다.</p>
      <div className="task-actions"><Button type="submit" disabled={t.phase!=='answer'||state.points===0}>확정 제출</Button><Button type="button" variant="outline" onClick={()=>dispatch({type:'viewClose'})}>초안을 두고 현장 보기</Button></div>
    </form>
    <div className="hint-controls" aria-label="이 과제의 단계별 힌트"><span>요청할 때만 힌트를 봅니다.</span>{[0,1,2,3,4].map(level=><Button key={level} variant="outline" onClick={()=>dispatch({type:'hint',id:t.id,level})}>{['조사할 곳','눈여겨볼 점','비교할 자료','연결 방법','해답과 이유'][level]}</Button>)}</div>
  </section>;
}
