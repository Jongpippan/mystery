import { currentSequence, taskNodes, type GameState } from './state';
import { prologuePresentation } from './prologue';
import {portName} from './travel';
import {currentConversationIds} from './revisits';

export function presentation(state:GameState) {
  return state.travel?{...state.travel.origin,place:portName(state.travel.position),companion:state.travel.origin.companion||state.travel.position==='L02',experiment:false}:scenePresentation(state);
}
export function scenePresentation(state:GameState) {
  const narrativeLog=state.log.filter(l=>!currentConversationIds.has(l.nodeId));
  if(!state.investigation)return {...prologuePresentation(state),caretaker:'봉만실',chapter:'프롤로그 · 도착한 사람들',wall:9 as 6|9,experiment:false};
  const i=state.investigation, seq=currentSequence(state);
  const reached=(id:string)=>{const index=seq.findIndex(n=>n.id===id);return index>=0&&index<=state.cursor;};
  if(i.stage.startsWith('ep-'))return {place:({'ep-handoff':'현관 · 공식 기록 인계','ep-account':'연회장 · 진새벽 입회','ep-staff':'휴게실 · 성인 조사 탁자','ep-sound':'음향 부스 · 허가된 공개 가장자리','ep-departure':'현관 · 출발','ep-archive':'사건 보관함'} as Record<string,string>)[i.stage],companion:['ep-sound','ep-departure','ep-archive'].includes(i.stage),caretaker:'봉만실',time:'10월 23일',chapter:'에필로그 · 남겨 둔 자리',wall:9 as const,experiment:false};
  if(i.stage.startsWith('ch6-')){
    let place='연회장 · 증거 탁자',companion=false;
    if(i.stage==='ch6-contact'){place=reached('C_CH06_01:n0018')?'호숫가 보관 창고로 내려가는 길':reached('C_CH06_01:n0010')?'휴게실':'읍내 게스트하우스';companion=!reached('C_CH06_01:n0018');}
    if(i.stage==='ch6-unfold')place='호숫가 보관 창고';
    if(['ch6-early-machine','ch6-overlay'].includes(i.stage))place='적재·기록 데스크';
    if(i.stage==='ch6-copier')place=reached('C_CH06_04:n0005')?'주방 · 일반 복사기':'적재·기록 데스크';
    if(i.stage==='ch6-bands')place='휴게실 · 성인 조사 탁자';
    if(['ch6-aftermath','ch6-personal1'].includes(i.stage)){place='휴게실';companion=true;}
    if(i.stage==='ch6-personal2'){companion=reached('C_CH06_O2:n0006');place=companion?'휴게실':'호숫가 보관 창고';}
    if(i.stage==='ch6-personal3'){place='연회장 · 공개 정리 자리';companion=true;}
    if(!i.stage.includes('personal')){
      const task=i.task?.id??narrativeLog.findLast(l=>!l.sceneId.startsWith('C_SYS'))?.sceneId.replace('C_','');
      if(task==='D26')place='호숫가 보관 창고';
      if(task==='D27')place='적재·기록 데스크';
      if(task==='Q06')place='주방 · 일반 복사기';
      if(task==='D28')place='휴게실 · 성인 조사 탁자';
    }
    return {place,companion,caretaker:'봉만실',time:'10월 23일 · 아침',chapter:'6장 · 젖은 원본이 마르는 아침',wall:9 as const,experiment:false};
  }
  if(i.stage.startsWith('ch5-')){
    let place='음향 부스',companion=false;
    if(i.stage==='ch5-handoff'){companion=!reached('C_CH05_01:n0009');place=companion?'휴게실':'연회장 · 음향 부스 방향';}
    if(i.stage==='ch5-gate')place='수영장 상부 랜딩 · 임시 장벽 밖';
    if(i.stage==='ch5-compare')place='음향 부스 · 통제선 밖 성인 비교';
    if(i.stage==='ch5-personal2')place='연회장 · 장비 옆';
    if(['ch5-reunion','ch5-personal1','ch5-photo'].includes(i.stage)){place='휴게실';companion=true;}
    if(i.stage==='ch5-personal3')place='휴게실';
    if(i.stage==='ch5-coat')place='현관 · 증거 대조 탁자';
    if(!i.stage.includes('personal')){
      const task=i.task?.id??narrativeLog.at(-1)?.sceneId.replace('C_','');
      if(['D21','Q05','D22','D23'].includes(task??'')){place='음향 부스';companion=false;}
      if(task==='D24'){place='현관 · 증거 대조 탁자';companion=false;}
      if(task==='D25'){place='휴게실 · 조사 탁자';companion=false;}
    }
    if(i.stage==='ch5-departure'){companion=true;place=reached('C_CH05_08:n0011')?'읍내 게스트하우스':reached('C_CH05_08:n0009')?'현관 · 숙소로 나가는 길':'휴게실';}
    return {place,companion,caretaker:'봉만실',time:'10월 22일 · 늦은 저녁',chapter:'5장 · 창 너머의 두 사람',wall:9 as const,experiment:false};
  }
  if(i.stage.startsWith('ch4-')){
    let place=['ch4-edges','ch4-card'].includes(i.stage)?'연회장 · 자료 대조 탁자':['ch4-transactions','ch4-personal3'].includes(i.stage)?'현관 · 카운터':'휴게실 · 원본 대조 자리';
    if(!i.stage.includes('personal')){
      const task=i.task?.id??narrativeLog.at(-1)?.sceneId.replace('C_','');
      if(task==='Q04'||task==='D20')place='휴게실 · 원본 대조 자리';
    }
    return {place,companion:i.stage==='ch4-personal1',caretaker:'봉만실',time:'10월 22일 · 저녁',chapter:'4장 · 같은 서명, 다른 문장',wall:9 as const,experiment:false};
  }
  if(i.stage.startsWith('ch3-')){
    let place='적재·기록 데스크',companion=false;
    if(i.stage==='ch3-kitchen'){companion=!reached('C_CH03_01:n0005');place=companion?'휴게실':'주방';}
    if(i.stage.startsWith('ch3-ash'))place='주방 · 난로 옆';
    if(i.stage==='ch3-cart')place=reached('C_CH03_03:n0012')?'적재·기록 데스크':reached('C_CH03_03:n0009')?'덮인 경사로 입구':reached('C_CH03_03:n0005')?'서비스 계단 회전부':'적재·기록 데스크';
    if(i.stage==='ch3-opening')place=reached('C_CH03_05:n0009')?'호숫가 보관 창고':reached('C_CH03_05:n0005')?'덮인 경사로':'적재·기록 데스크';
    if(i.stage==='ch3-preserve')place=reached('C_CH03_06:n0010')?'주방':'호숫가 보관 창고';
    if(['ch3-reunion','ch3-departure','ch3-personal1','ch3-personal3'].includes(i.stage)){place='휴게실';companion=true;}
    if(!i.stage.includes('personal')){
      const id=i.task?.id??narrativeLog.at(-1)?.sceneId.replace('C_','');
      if(['D11','D12','Q03'].includes(id??''))place='적재·기록 데스크';
      if(id==='D13')place='호숫가 보관 창고';
      if(id==='D14')place='주방 · 난로 옆';
    }
    return {place,companion,caretaker:'봉만실',time:'10월 22일 · 오후',chapter:'3장 · 실려 나간 사람',wall:9 as const,experiment:false};
  }
  if(i.stage.startsWith('ch2-')) {
    let place='음향 부스',companion=true,caretaker='봉만실';
    if(i.stage==='ch2-authority'){companion=!reached('C_CH02_03:n0005');place=companion?'연회장 입구':'음향 부스';}
    if(i.stage==='ch2-apology')place=reached('C_CH02_04:n0006')?'음향 부스':'휴게실';
    if(i.stage==='ch2-sources'){companion=!reached('C_CH02_05:n0005');place=companion?'휴게실':'현관 · 조사 탁자';caretaker='차무록';}
    if(i.stage==='ch2-public') {
      companion=false;caretaker='차무록';
      const returned=i.knowledge.includes('K09')||i.knowledge.includes('K08')&&!i.stageKnowledge[i.stage].includes('K08');
      place=returned?'현관 · 조사 탁자':'연회장 · 공개 탁자';
    }
    if(['ch2-quiet','ch2-personal1','ch2-personal3'].includes(i.stage))place='휴게실';
    if(i.stage==='ch2-personal2'){place='연회장 · 장비 옆';companion=false;caretaker='차무록';}
    if(i.stage==='ch2-departure'){companion=!reached('C_CH02_08:n0006')||reached('C_CH02_08:n0015');place=companion?'휴게실':'현관 · 조사 탁자';}
    const lastScene=narrativeLog.at(-1)?.sceneId;
    const task=i.task??(!i.stage.includes('personal')?Object.values(i.suspended).find(t=>lastScene===`C_${t.id}`):undefined);
    if(task&&['D08','D09'].includes(task.id)){place='현관 · 조사 탁자';companion=false;caretaker='차무록';}
    if(task?.id==='D10'){
      const nodes=taskNodes({...state,investigation:{...i,task}}),at=(id:string)=>{const index=nodes.findIndex(n=>n.id===id);return index>=0&&task.cursor>=index;};
      companion=task.phase==='setup'?!at('C_D10:n0006'):task.phase==='response'&&task.result?.kind==='success'&&at('C_D10:n0015');
      place=companion?'휴게실':'현관 · 조사 탁자';caretaker='차무록';
    }
    return {place,companion,caretaker,time:'10월 22일 · 낮',chapter:'2장 · 남아 있던 목소리',wall:9 as const,experiment:false};
  }
  let place='연회장 · 공개 공간',companion=true,caretaker='차무록';
  if(['morning','aftermath','objection','personal1','departure'].includes(i.stage))place='휴게실';
  if(i.stage==='window'){
    const left=reached('C_CH01_03:n0005');
    place=left?'북쪽 관람 통로':'휴게실';companion=!left;
  }
  if(i.stage==='handback')place=reached('C_CH01_04:n0005')?'연회장 · 공개 공간':'휴게실';
  if(i.stage==='personal3')place='현관 · 접수대';
  if(i.stage==='route'){
    caretaker='봉만실';
    const returnIndex=taskNodes(state).findIndex(n=>n.id==='C_D04:n0021');
    const returned=i.knowledge.includes('K04')||!!(i.task&&i.task.id==='D04'&&returnIndex>=0&&i.task.cursor>=returnIndex);
    place=returned?'휴게실':reached('C_CH01_06:n0015')?'서비스 접속부 · 통제선 밖':reached('C_CH01_06:n0006')?'연회장 · 손님 문':'휴게실';
    companion=returned||!reached('C_CH01_06:n0006');
  }
  if(i.stage==='resolution'){companion=!reached('C_CH01_08:n0005');place=companion?'휴게실':'연회장 · 공개 공간';}
  if(i.stage==='departure'){companion=reached('C_CH01_08:n0020');place=companion?'휴게실':'연회장 · 공개 공간';}
  const wall:6|9=i.stage==='wall'&&reached('C_CH01_04:n0015')&&!reached('C_CH01_04:n0018')?6:9;
  return {place,companion,caretaker,time:'10월 22일 · 오전',chapter:'1장 · 옮겨진 방',wall,experiment:i.stage==='wall'};
}
