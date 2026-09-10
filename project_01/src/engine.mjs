export const SAVE_VERSION=1;
const hasAll=(list,required)=>required.every(x=>list.includes(x));
const add=(list,id)=>{if(!list.includes(id))list.push(id);};
const npcHomes={P03:'L04',P04:'L03',P05:'L01',P06:'L06',P07:'L02'};
export function createState(data){
 const s={version:SAVE_VERSION,build:data.build,chapter:1,turn:0,location:'L01',acquired:{},solved:[],knowledge:{},heard:[],logs:[],completedEvents:[],pendingEvents:[],active:null,branches:{},lastSeen:{},trust:100,rewarded:[],enteredChapters:[1],processed:[],failures:{},hints:{},currentTask:'D01',drafts:{},notes:'',ui:{tab:'현장',detail:null,query:'',type:'',place:'',person:'',sort:'acquired',logKind:'',scroll:{},focus:null,font:16},recovery:false,ended:false,message:''};
 s.npcLocations={...npcHomes};refresh(s,data);beginEvent(s,data,'V00');return s;
}
export function availableTasks(s,data){return data.tasks.filter(t=>t.chapter===s.chapter&&hasAll(s.solved,t.needs)&&!s.solved.includes(t.id));}
export function discoverable(s,data,place=s.location){return data.evidence.filter(e=>e.location===place&&e.chapter<=s.chapter&&!s.acquired[e.id]);}
export function availableTalks(s,data){return data.statements.filter(t=>t.place===s.location&&t.chapter<=s.chapter);}
export function readyConversations(s,data){return data.conversations.filter(c=>c.kind==='조수 상담'&&c.chapter<=s.chapter&&c.place===s.location&&hasAll(s.solved,c.needs||[])&&!s.logs.some(l=>l.id===c.id));}
export function draftFor(s,id){return s.drafts[id]||{answer:'',statement:'',evidence:[]};}
export function canTask(s,t){return t&&t.chapter===s.chapter&&hasAll(s.solved,t.needs)&&!s.solved.includes(t.id);}
function acquire(s,id){if(id&&!s.acquired[id])s.acquired[id]={chapter:s.chapter,turn:s.turn,location:s.location};}
function refresh(s,data){
 for(const e of data.events)if(e.chapter<=s.chapter&&hasAll(s.solved,e.needs)&&!s.completedEvents.includes(e.id)&&s.active?.event!==e.id)add(s.pendingEvents,e.id);
 s.pendingEvents.sort((a,b)=>data.events.find(e=>e.id===a).priority-data.events.find(e=>e.id===b).priority);
 const stageTasks=data.tasks.filter(t=>t.chapter===s.chapter&&!t.id.startsWith('F')).map(t=>t.id);
 const requiredEvents={1:['V00','V01','V02'],2:['V03','V04','V05'],3:['V06','V07']}[s.chapter];
 if(s.chapter<4&&hasAll(s.solved,stageTasks)&&hasAll(s.completedEvents,requiredEvents)){
  s.chapter++;if(!s.enteredChapters.includes(s.chapter)){s.trust=Math.max(60,s.trust);add(s.enteredChapters,s.chapter);}
  s.message=`${s.chapter}장 · ${data.chapters[s.chapter]} — 새로운 조사 질문이 열렸습니다.`;
  refresh(s,data);
 }
 if(!canTask(s,data.tasks.find(t=>t.id===s.currentTask))){s.currentTask=availableTasks(s,data)[0]?.id||null;}
}
function conversationLines(s,c){
 const lines=structuredClone(c.lines);
 if(c.id==='C34'&&s.branches.B01)lines[0].text=s.branches.B01==='public'?'아까 모두 앞에서 말한 일, 끝까지 보여 드릴게요.':'따로 말할 시간을 주셨으니, 이제 제 기록도 내놓겠습니다.';
 return lines;
}
function beginEvent(s,data,id){
 const e=data.events.find(e=>e.id===id);if(!e||e.place!==s.location||!s.pendingEvents.includes(id)||s.active)return;
 const c=data.conversations.find(c=>c.id===e.conversation);
 s.active={event:id,conversation:c.id,step:0,lines:conversationLines(s,c)};
 const present=e.id==='V10'?data.people.map(p=>p.id):[...new Set(['P01','P02',...c.lines.map(l=>l.person)])];
 for(const p of present){s.lastSeen[p]={place:s.location,chapter:s.chapter,turn:s.turn,log:c.id};if(npcHomes[p])s.npcLocations[p]=s.location;}
 s.pendingEvents=s.pendingEvents.filter(x=>x!==id);
}
function logConversation(s,data,c,lines){
 if(s.logs.some(l=>l.id===c.id))return;
 s.logs.push({id:c.id,title:c.title,kind:c.kind,place:s.location,chapter:s.chapter,turn:s.turn,lines});
 for(const l of lines)s.lastSeen[l.person]={place:s.location,chapter:s.chapter,turn:s.turn,log:c.id};
}
function finishActive(s,data){
 const active=s.active,c=data.conversations.find(c=>c.id===active.conversation);
 logConversation(s,data,c,active.lines);
 if(active.event){
  const e=data.events.find(e=>e.id===active.event);add(s.completedEvents,e.id);acquire(s,e.reward);
  if(e.id==='V10')s.message='논증이 모두 제출되었습니다. 함께 남길 약속을 선택해 주세요.';
  s.npcLocations=e.id==='V10'?Object.fromEntries(Object.keys(npcHomes).map(id=>[id,'L01'])):{...npcHomes,P07:s.completedEvents.includes('V08')?'L07':'L02'};
 }
 if(c.id==='C92'){s.ended=true;s.message='사건 기록을 마쳤습니다. 자료와 대화, 선택은 계속 열람할 수 있습니다.';}
 s.active=null;refresh(s,data);
}
export function shortestRoute(from,to,data){
 const distances=Object.fromEntries(data.places.map(p=>[p.id,Infinity]));const prev={};distances[from]=0;const left=new Set(data.places.map(p=>p.id));
 while(left.size){const current=[...left].sort((a,b)=>distances[a]-distances[b])[0];left.delete(current);
  for(const [id,a,b,time] of data.routes){const next=a===current?b:b===current?a:null;if(next&&distances[current]+time<distances[next]){distances[next]=distances[current]+time;prev[next]={place:current,id};}}
 }
 const path=[];let cursor=to;while(prev[cursor]){path.unshift(prev[cursor].id);cursor=prev[cursor].place;}
 return {minutes:distances[to],routes:path};
}
export function transition(previous,action,data){
 const s=structuredClone(previous);s.message='';
 s.npcLocations??={...npcHomes};
 const blocked=s.active&&['move','inspect','talk','submit','chooseBranch','conversation','event'].includes(action.type);
 if(blocked){s.message='진행 중인 장면을 확인한 뒤 계속할 수 있습니다. 수첩 열람과 답안 메모는 가능합니다.';return s;}
 switch(action.type){
 case 'ui':s.ui={...s.ui,...action.patch};break;
 case 'notes':s.notes=String(action.text).slice(0,20000);break;
 case 'ack':s.awaitingReview=null;break;
 case 'task':if(canTask(s,data.tasks.find(t=>t.id===action.id)))s.currentTask=action.id;break;
 case 'draft':{
  if(!data.tasks.some(t=>t.id===action.id))break;
  const d=draftFor(s,action.id);s.drafts[action.id]={...d,...action.patch};break;
 }
 case 'move':{
  if(!data.places.some(p=>p.id===action.id))break;
  if(s.location!==action.id){s.location=action.id;s.turn++;}
  const p=data.places.find(p=>p.id===s.location);for(const id of ['P01','P02',...Object.keys(s.npcLocations).filter(id=>s.npcLocations[id]===p.id)])s.lastSeen[id]={place:p.id,chapter:s.chapter,turn:s.turn};
  s.ui.tab='현장';s.ui.detail=null;refresh(s,data);
  const next=s.pendingEvents.find(id=>data.events.find(e=>e.id===id).place===s.location);if(next)beginEvent(s,data,next);break;
 }
 case 'inspect':{
  const e=discoverable(s,data).find(e=>e.id===action.id);if(!e)break;
  s.turn++;acquire(s,e.id);s.message=`자료 확보: ${e.name}. 수첩에서 원문을 다시 읽을 수 있습니다.`;break;
 }
 case 'event':beginEvent(s,data,action.id);break;
 case 'conversation':{
  const c=readyConversations(s,data).find(c=>c.id===action.id);if(c)s.active={conversation:c.id,event:null,step:0,lines:conversationLines(s,c)};break;
 }
 case 'next':if(s.active){if(s.active.step<s.active.lines.length-1)s.active.step++;else finishActive(s,data);}break;
 case 'skip':if(s.active)finishActive(s,data);break;
 case 'talk':{
  const st=availableTalks(s,data).find(t=>t.id===action.id);if(!st)break;
  const corrected=s.solved.includes(st.task);const logId=st.id+(corrected?'.v2':'.v1');
  add(s.heard,st.id);s.lastSeen[st.person]={place:s.location,chapter:s.chapter,turn:s.turn,log:logId};
  const lines=[{person:st.person,text:corrected?st.v2:st.v1},{person:st.person,text:corrected?'정정한 진술과 그 계기를 함께 남겨 주세요.':st.detail}];
  if(!s.logs.some(l=>l.id===logId))s.logs.push({id:logId,title:corrected?'정정된 진술':'무료 질문 · '+data.people.find(p=>p.id===st.person).name,kind:'일반 조사',place:s.location,chapter:s.chapter,turn:s.turn,lines,statement:st.id});
  s.message=lines.map(l=>l.text).join('\n');break;
 }
 case 'chooseBranch':{
  if(action.id==='B01'&&s.chapter>=2&&!s.branches.B01&&['public','private'].includes(action.value)){
   s.branches.B01=action.value;
   s.logs.push({id:'B01',title:'이동을 묻는 방식',kind:'개인 대화',place:s.location,chapter:s.chapter,turn:s.turn,lines:action.value==='public'?[{person:'P01',text:'함께 본 동선부터 확인합시다.'},{person:'P04',text:'모두 앞에서는 변명처럼 들리겠군요. 그래도 제가 설명하겠습니다.'}]:[{person:'P01',text:'기록을 지키려 했던 이유부터 듣겠습니다.'},{person:'P04',text:'숨긴 잘못까지 봐 준다는 뜻은 아니겠죠. 그럼 말할게요.'}]});
  }
  if(action.id==='B02'&&s.completedEvents.includes('V10')&&!s.branches.B02&&['read','preserve'].includes(action.value)){
   s.branches.B02=action.value;
   s.logs.push({id:'B02',title:'다음에 남길 약속',kind:'종막',place:s.location,chapter:s.chapter,turn:s.turn,lines:action.value==='read'?[{person:'P01',text:'함께 원문 낭독을 준비하겠습니다.'},{person:'P07',text:'내 말부터 내 목소리로 읽겠소.'},{person:'P02',text:'저는 모두 읽을 수 있는 자막을 만들게요.'}]:[{person:'P01',text:'보존 과정을 공개할 준비부터 하겠습니다.'},{person:'P07',text:'어떻게 돌아왔는지도 보여 줍시다.'},{person:'P02',text:'열어 본 손과 지켜본 이름을 함께 적을게요.'}]});
   const c=data.conversations.find(c=>c.id==='C92');s.active={conversation:c.id,event:null,step:0,lines:c.lines};
  }break;
 }
 case 'hint':{
  const t=data.tasks.find(t=>t.id===action.id);if(!canTask(s,t))break;
  s.hints[t.id]=Math.min(4,(s.hints[t.id]??-1)+1);break;
 }
 case 'recover':if(s.recovery){s.trust=60;s.recovery=false;s.awaitingReview=null;if(s.currentTask)delete s.drafts[s.currentTask];s.message='신뢰도 60으로 재개합니다. 자료·명제·메모·관계는 보존했습니다.';}break;
 case 'submit':{
  const t=data.tasks.find(t=>t.id===action.id);if(!canTask(s,t))break;
  if(s.recovery){s.message='사건 정리 후 재도전으로 신뢰도를 회복하세요.';break;}
  if(s.awaitingReview){s.message='이전 피드백을 확인한 뒤 다시 제출할 수 있습니다. 중복 입력은 차감하지 않았습니다.';break;}
  if(!action.token||s.processed.includes(action.token))return previous;
  const d=draftFor(s,t.id);const min=Math.min(...t.sets.map(a=>a.length));
  if(d.answer===''||!Number.isInteger(Number(d.answer))||Number(d.answer)<0||Number(d.answer)>=t.options.length||d.evidence.length<min||(t.statement&&!d.statement)){
   s.message=`제출 전 결론${t.statement?'·대상 진술':''}과 최소 ${min}개의 근거를 채워 주세요. 차감하지 않았습니다.`;break;
  }
  if(t.statement&&!s.heard.includes(t.statement)){s.message='먼저 대상 인물에게 무료로 자세히 물어 진술 범위를 확인하세요.';break;}
  if(t.id==='Q02'&&!s.branches.B01){s.message='해준에게 질문할 방식을 선택해 주세요. 두 선택 모두 무료입니다.';break;}
  if(d.evidence.some(id=>!s.acquired[id])){s.message='아직 확보하지 않은 자료는 근거로 제출할 수 없습니다.';break;}
  if(t.timeOrder&&(!Array.isArray(d.order)||d.order.length!==t.timeOrder.length||new Set(d.order).size!==t.timeOrder.length||d.order.some(id=>!t.timeOrder.includes(id)))){s.message='시간 카드를 모두 배치한 뒤 제출하세요. 미완성 답안은 차감하지 않았습니다.';break;}
  add(s.processed,action.token);s.turn++;
  const allowed=new Set([...t.sets.flat(),...(t.supports||[])]);
  const correctSet=t.sets.some(set=>hasAll(d.evidence,set))&&d.evidence.every(id=>allowed.has(id));
  const correctOrder=!t.timeOrder||t.timeOrder.every((id,i)=>d.order[i]===id);
  const correct=Number(d.answer)===t.correct&&(!t.statement||d.statement===t.statement)&&correctSet&&correctOrder;
  if(correct){
   add(s.solved,t.id);if(t.knowledge)s.knowledge[t.knowledge]={text:t.result,task:t.id,chapter:s.chapter,turn:s.turn};
   if(!s.rewarded.includes(t.id)){s.trust=Math.min(100,s.trust+10);add(s.rewarded,t.id);}
   acquire(s,t.reward);s.message=t.result||'주장과 독립 근거를 확인했습니다.';
   const st=data.statements.find(st=>st.task===t.id);
   const lines=st?[{person:'P01',text:t.options[t.correct]},{person:st.person,text:st.v2},{person:'P02',text:'처음 진술과 정정본을 함께 기록했어요.'}]:[{person:'P01',text:t.options[t.correct]}];
   s.logs.push({id:t.id,title:t.title,kind:st?'추궁':'논증',place:s.location,chapter:s.chapter,turn:s.turn,lines,statement:st?.id,evidence:[...d.evidence]});
   refresh(s,data);
  }else{
   s.trust=Math.max(0,s.trust-t.cost);s.failures[t.id]=(s.failures[t.id]||0)+1;
   s.message=t.statement&&d.statement!==t.statement?'대상 진술이 현재 질문과 다릅니다. 누구의 어떤 주장을 반박하는지 먼저 확인하세요.':Number(d.answer)!==t.correct?t.feedback[Number(d.answer)]:'이 근거 조합은 주장을 충분히 지지하지 않습니다. 필요한 독립 출처가 빠졌거나 직접 연결하지 않은 자료가 들어 있습니다. 자료별 역할을 비교하세요.';
   if(!correctOrder)s.message='시간 카드 순서가 기록과 맞지 않습니다. 사진의 벽시계 시각을 기준시로 보정하고, 실물 확인·봉인·발견을 구분하세요.';
   s.message+=` 신뢰도 −${t.cost}. `+(s.failures[t.id]>=2?'모은: 원하시면 이 과제의 다음 힌트를 함께 볼게요.':'모은: 아직 고칠 수 있어요. 원문을 다시 보죠.');
   if(s.trust===0){s.recovery=true;s.message+=' 사건 정리에서 확보한 사실을 보존한 채 재도전할 수 있습니다.';}
   s.awaitingReview={id:t.id,message:s.message};
  }break;
 }
 default:break;
 }
 return s;
}
export function hintText(s,t,data){
 const missing=t.sets[0].filter(id=>!s.acquired[id]);
 const lead=missing.map(id=>{
  const e=data.evidence.find(e=>e.id===id);const q=data.tasks.find(t=>t.reward===id);const event=data.events.find(v=>v.reward===id);
  if(e.location)return `${data.places.find(p=>p.id===e.location).name}에서 아직 살펴보지 않은 자료를 조사하세요.`;
  if(q)return `먼저 「${q.title}」 추궁을 해결해 상대의 정정을 들으세요.`;
  if(event){const prerequisite=event.needs.find(id=>!s.solved.includes(id));if(prerequisite){const task=data.tasks.find(t=>t.id===prerequisite);return `이 확인은 「${task.title}」을 해결한 뒤 준비됩니다. 먼저 그 과제로 돌아가세요.`;}return `${data.places.find(p=>p.id===event.place).name}에 다시 가서 진행 가능한 확인 장면을 보세요.`;}
  return '현재 장의 조사 질문을 확인하세요.';
 });
 if(t.statement&&!s.heard.includes(t.statement))lead.unshift(`${data.people.find(p=>p.id===t.person).name}에게 무료로 자세히 물어보세요.`);
 const level=s.hints[t.id]??0;
 return [...new Set(lead),lead.length?'자료를 확보하면 이 단계의 비교 안내가 열립니다.':t.hints[level]].join('\n');
}
export function serialize(s){return JSON.stringify(s);}
export function restore(text,data){
 const s=JSON.parse(text);
 if(!s||s.version!==SAVE_VERSION||s.build!==data.build||!Number.isInteger(s.chapter)||s.chapter<1||s.chapter>4||!Number.isFinite(s.trust)||s.trust<0||s.trust>100)throw new Error('저장 버전 또는 상태가 맞지 않습니다. 원본 파일은 변경하지 않았습니다.');
 for(const key of ['solved','heard','logs','completedEvents','pendingEvents','rewarded','enteredChapters','processed'])if(!Array.isArray(s[key]))throw new Error('저장 목록 손상: '+key);
 for(const key of ['acquired','knowledge','branches','lastSeen','failures','hints','drafts','ui'])if(!s[key]||typeof s[key]!=='object'||Array.isArray(s[key]))throw new Error('저장 객체 손상: '+key);
 if(!data.places.some(p=>p.id===s.location)||s.solved.some(id=>!data.tasks.some(t=>t.id===id))||Object.keys(s.acquired).some(id=>!data.evidence.some(e=>e.id===id)))throw new Error('알 수 없는 저장 ID');
 if(typeof s.notes!=='string'||typeof s.recovery!=='boolean'||typeof s.ended!=='boolean')throw new Error('저장 필드 손상');
 for(const [id,d]of Object.entries(s.drafts))if(!data.tasks.some(t=>t.id===id)||!Array.isArray(d.evidence)||d.evidence.some(e=>!s.acquired[e]))throw new Error('답안 필드 손상');
 if(s.active&&(!data.conversations.some(c=>c.id===s.active.conversation)||!Array.isArray(s.active.lines)||!Number.isInteger(s.active.step)||s.active.step<0||s.active.step>=s.active.lines.length))throw new Error('장면 복구 정보 손상');
 if(!Number.isInteger(s.turn)||s.turn<0||!['현장','자료','인물','지도','대화','메모','설정'].includes(s.ui.tab)||![16,18,20,22,24,26,28,30,32].includes(s.ui.font))throw new Error('화면 또는 회차 정보 손상');
 if(!s.ui.scroll||typeof s.ui.scroll!=='object'||Object.values(s.ui.scroll).some(v=>!Number.isFinite(v)||v<0))throw new Error('스크롤 복구 정보 손상');
 if(['query','type','place','person','sort','logKind'].some(key=>typeof s.ui[key]!=='string'))throw new Error('검색 상태 손상');
 for(const log of [...s.logs,...(s.active?[s.active]:[])])if(!Array.isArray(log.lines)||log.lines.some(l=>typeof l.text!=='string'||!data.people.some(p=>p.id===l.person)))throw new Error('대화 기록 손상');
 if(s.ui.detail){const d=s.ui.detail;if(!['evidence','person','log'].includes(d.kind)||typeof d.id!=='string')throw new Error('상세 화면 정보 손상');}
 s.ui.windowScroll??={};s.ui.history??=[];
 s.npcLocations??={...npcHomes,P07:s.completedEvents.includes('V08')?'L07':'L02'};
 if(Object.entries(s.npcLocations).some(([id,location])=>!npcHomes[id]||!data.places.some(p=>p.id===location)))throw new Error('인물 위치 정보 손상');
 return s;
}
