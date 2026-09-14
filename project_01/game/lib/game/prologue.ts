import { currentSequence, type GameState } from './state';

// Positions refer to accepted source nodes, so returning from a tool or loading
// a save derives the same visible location without replaying an effect.
export function prologuePresentation(state:GameState) {
  const sequence=currentSequence(state);
  const reached=(id:string)=>sequence.findIndex(n=>n.id===id)>=0&&sequence.findIndex(n=>n.id===id)<=state.cursor;
  const number=Number(state.sceneId.slice(-2));
  let place=number<=2?'현관 · 접수대':number===6||number===7?'연회장 · 동쪽 기록 탁자':number===9?'음향 부스':number>=12&&number<=14?'연회장':'휴게실';
  let companion=true;
  if(number===7&&reached('C_PR_07:n0031')) place='휴게실';
  if(number===9&&reached('C_PR_09:n0033')) place='연회장';
  if(number===10) {
    companion=false;
    place=reached('C_PR_10:n0006')?'적재 기록대':'현관 · 직원 출입구';
    if(reached('C_PR_10:n0036')) place='현관 · 접수대';
  }
  if(number===12&&!reached('C_PR_12:n0004')) place='휴게실';
  if(number===15&&reached('C_PR_15:n0018')&&!reached('C_PR_15:n0034')) {place='현관 · 접수대';companion=false;}
  if(number===16) {
    place=reached('C_PR_16:n0021')?'휴게실':'현관 · 접수대';
    companion=reached('C_PR_16:n0021');
    if(reached('C_PR_16:n0035')) place='읍내 게스트하우스로 가는 길';
  }
  return {place,companion,time:number>=12?'10월 21일 · 밤':'10월 21일 · 오후'};
}
