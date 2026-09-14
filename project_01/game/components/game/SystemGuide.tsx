import type {GameState} from '@/lib/game/state';
import {displayText,script} from '@/lib/game/script';
import {setupNodes} from '@/lib/game/case';

// A read-only help surface: these sourced system instructions do not impersonate
// a new current conversation or add evidence/history by opening a tool.
export function SystemGuide({state}:{state:GameState}){
 const task=state.investigation?.task;
 const officer=!!task&&setupNodes(task.id).some(n=>n.speaker==='P07');
 const lines=(ids:string[])=>ids.map(id=>{const n=script.utterances[`S_SYS_03_${id}`];return <p key={id}>{displayText(n.text,state.playerName)}</p>;});
 return <details className="my-4 space-y-3"><summary>자료 확인·초안 편집·힌트는 무료입니다</summary>
  {lines(['0002',...(officer?['0001']:[])])}
  <h4>사진과 측정값 보기</h4>{lines(['0011',...(officer?['0012']:[])])}
  <h4>봉인된 원본과 통제 구역</h4>{lines(['0021',...(officer?['0022']:[])])}
  <p>현장에 돌아가면 현재 허가된 조사와 약속을 선택할 수 있습니다.</p>
  <h4>도구를 닫고 돌아가기</h4>{lines(['0041'])}
  <h4>저장한 답안 이어 쓰기</h4>{lines(['0091'])}
  {state.points===0&&<><h4>여유가 0일 때</h4><p>{script.utterances.S_SYS_01_0051.text}</p><p>{script.utterances.S_SYS_01_0091.text}</p></>}
 </details>;
}
