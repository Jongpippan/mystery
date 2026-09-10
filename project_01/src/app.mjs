import {createState,transition,availableTasks,discoverable,availableTalks,readyConversations,draftFor,hintText,shortestRoute,serialize,restore} from './engine.mjs';
import {roomArt} from './room-art.mjs';
const data=await fetch('src/content.json').then(r=>{if(!r.ok)throw new Error('작품 데이터를 읽을 수 없습니다.');return r.json();});
const KEY='last-impression-v1',BACKUP=KEY+'-backup';
const $=s=>document.querySelector(s);
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const person=id=>data.people.find(p=>p.id===id);
const place=id=>data.places.find(p=>p.id===id);
const evidence=id=>data.evidence.find(e=>e.id===id);
let storageWarning='',corruptRaw=null,state,initialRaw=null;
try{initialRaw=localStorage.getItem(KEY);}catch{storageWarning='자동 저장을 사용할 수 없는 브라우저입니다. 설정에서 파일로 내보내 진행을 보관하세요.';}
try{state=initialRaw?restore(initialRaw,data):createState(data);}catch(error){corruptRaw=initialRaw;state=null;storageWarning=error.message;}
const app=$('#app');
function save(){if(!state)return;try{localStorage.setItem(KEY,serialize(state));storageWarning='';}catch{storageWarning='브라우저 저장 공간을 사용할 수 없습니다. 설정에서 저장 파일을 내보내 주세요.';}}
function btn(label,action,attrs='',classes=''){const hash=[...label+attrs].reduce((n,c)=>((n*33)^c.charCodeAt(0))>>>0,5381);const auto=/(?:^|\s)id=/.test(attrs)?'':`id="button-${action}-${hash}"`;return `<button type="button" data-action="${action}" class="${classes}" ${auto} ${attrs}>${label}</button>`;}
function update(action,{render=true,focus}={}){state=transition(state,action,data);save();if(render){if(!focus){if(action.type==='submit'&&state.awaitingReview)focus=state.recovery?'recover-trust':'ack-submit';else if(action.type==='ack')focus='submit-answer';else if(action.type==='recover')focus='task-select';else if(['next','skip','move'].includes(action.type)&&!state.active)focus='location-heading';else if(action.type==='hint')focus='current-hint';}draw({focus});}}
function download(text,name){const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function currentKey(){return state.ui.tab+':'+(state.ui.detail?.id||'list');}
function remember(){if(!state)return;state.ui.scroll[currentKey()]=$('#reader')?.scrollTop||0;state.ui.windowScroll??={};state.ui.windowScroll[currentKey()]=window.scrollY;state.ui.taskScroll=$('#task-panel')?.scrollTop||0;state.ui.evidenceScroll=$('#evidence-select')?.scrollTop||0;state.ui.focus=document.activeElement?.id||null;}
function navigate(tab,detail=null){remember();state.ui.history=[...(state.ui.history||[]),{tab:state.ui.tab,detail:state.ui.detail,focus:document.activeElement?.id}].slice(-30);state.ui.tab=tab;state.ui.detail=detail;save();draw({focus:detail?'detail-heading':null,restoreReader:true});}
function back(){remember();const prev=state.ui.history?.pop();if(prev){state.ui.tab=prev.tab;state.ui.detail=prev.detail;}else{state.ui.detail=null;}save();draw({focus:prev?.focus,restoreReader:true});}
function message(){const text=state.message||state.awaitingReview?.message;return (storageWarning?`<div class="recovery" role="alert">${h(storageWarning)}</div>`:'')+(text?`<div class="message" role="status">${h(text)}</div>`:'');}
function scene(){
 const event=state.active?.event&&data.events.find(e=>e.id===state.active.event);
 if(event?.asset)return `<figure class="scene"><img src="${h(event.asset)}" alt="${h(event.title)} — 현장에서 진행 중인 확인 장면"><figcaption>사건 장면 · ${h(event.title)}</figcaption></figure>`;
 return `<figure class="scene">${roomArt(state.location,state.completedEvents)}<figcaption>${event?h(event.title)+' · 현장 관찰도':'현장 관찰도 · 축척 없음 · '+h(place(state.location).description)}${state.completedEvents.includes('V09')&&state.location==='L07'?' · 아래칸 입회 개봉 완료':''}</figcaption></figure>`;
}
function activeDialogue(){
 const a=state.active,line=a.lines[a.step],p=person(line.person);return `${scene()}<article class="dialogue"><div class="speaker-head">${p?.portrait?`<img src="${p.portrait}" alt="${h(p.name)}">`:''}<div class="speaker">${h(p?.name||'기록')} · ${a.step+1}/${a.lines.length}</div></div><p>${h(line.text)}</p><div class="row-actions">${btn(a.step===a.lines.length-1?'장면 확인':'다음 대사','next','id="next-line"','primary')}${btn('전체 기록을 남기고 넘기기','skip')}</div></article><p class="footer-note">자료·인물·지도·대화 탭을 열어도 이 장면과 작성 중인 답안은 유지됩니다.</p>`;
}
function field(){
 if(state.active)return activeDialogue();
 const pending=state.pendingEvents.filter(id=>data.events.find(e=>e.id===id).place===state.location);
 const found=discoverable(state,data),talks=availableTalks(state,data),convs=readyConversations(state,data);
 return `<div class="section-head"><div><div class="eyebrow">현장 · 조사 ${state.turn}회차</div><h2 id="location-heading" tabindex="-1">${h(place(state.location).name)}</h2></div>${btn('지도와 이동','tab','data-tab="지도"')}</div>${scene()}
 ${state.ended?`<div class="end-card"><div class="eyebrow">사건 기록 완료</div><h2>남겨진 문장</h2><p>원판을 회수하고 변경된 복제판의 공개 사용을 중단했습니다. 주민 동의를 다시 확인한 뒤 ${state.branches.B02==='read'?'원문 낭독':'보존 과정 공개'}을 준비하기로 했습니다.</p><p>유서안과 차모은의 첫 공동 조사는 운영위원회에 전달할 기록으로 남았습니다.</p>${btn('저장 파일 내보내기','export')}</div>`:''}
 ${pending.length?`<h3>현장의 변화</h3><div class="grid">${pending.map(id=>{const v=data.events.find(e=>e.id===id);return btn(h(v.title),'event',`data-id="${id}"`,'primary');}).join('')}</div>`:''}
 ${state.completedEvents.includes('V10')&&!state.branches.B02?`<h3>함께 남길 약속 · 성격 선택 / 비용 없음</h3><div class="grid">${btn('함께 원문 낭독을 준비한다','branch','data-id="B02" data-value="read"')}${btn('보존 과정 공개부터 준비한다','branch','data-id="B02" data-value="preserve"')}</div>`:''}
 <h3>현장 조사 · 무료</h3>${found.length?`<div class="list">${found.map(e=>btn(`<img src="${e.asset}" alt="${h(e.name)} 도해"><span class="text"><strong>${h(e.name)}</strong><small>${h(e.type)} · 살펴보기</small></span>`,'inspect',`data-id="${e.id}"`,'entry')).join('')}</div>`:'<p class="muted">현재 보이는 자료는 확인했습니다. 새 확인이 준비되면 현장이 달라집니다.</p>'}
 ${talks.length?`<h3>일반 질문 · 자세히 묻기 / 무료</h3><div class="list">${talks.map(st=>btn(`<strong>${h(person(st.person).name)}</strong><br><small>${h(state.solved.includes(st.task)?st.v2:st.v1)}</small>`,'talk',`data-id="${st.id}"`)).join('')}</div>`:''}
 ${state.chapter>=2&&state.location==='L03'&&!state.branches.B01?`<h3>해준에게 묻는 방식 · 전략 / 비용 없음</h3><div class="grid">${btn('직원들 앞에서 동선을 묻는다','branch','data-id="B01" data-value="public"')}${btn('먼저 따로 설명을 듣는다','branch','data-id="B01" data-value="private"')}</div>`:''}
 ${convs.length?`<h3>모은과 이야기</h3><div class="grid">${convs.map(c=>btn(h(c.title),'conversation',`data-id="${c.id}"`)).join('')}</div>`:''}
 <h3>다른 장소로 이동</h3><div class="grid">${data.places.filter(p=>p.id!==state.location).map(p=>btn(h(p.name)+` <small>· ${shortestRoute(state.location,p.id,data).minutes}분 경로</small>`,'move',`data-id="${p.id}"`)).join('')}</div>`;
}
function evidenceList(){
 const owned=data.evidence.filter(e=>state.acquired[e.id]);
 const rows=owned.filter(e=>(!state.ui.query||(e.name+' '+e.text).includes(state.ui.query))&&(!state.ui.type||e.type===state.ui.type)&&(!state.ui.place||e.location===state.ui.place||state.acquired[e.id].location===state.ui.place)&&(!state.ui.person||e.people.includes(state.ui.person)));
 rows.sort((a,b)=>state.ui.sort==='event'?a.eventTime.localeCompare(b.eventTime):state.acquired[a.id].turn-state.acquired[b.id].turn);
 return `<div class="section-head"><h2>자료 수첩</h2><span class="pill">확보 ${owned.length}건</span></div><div class="filters">
 <input id="e-query" data-filter="query" value="${h(state.ui.query)}" placeholder="자료 이름·원문 검색" aria-label="자료 검색">
 <label>종류<select id="e-type" data-filter="type"><option value="">모든 종류</option>${[...new Set(owned.map(e=>e.type))].map(v=>`<option ${state.ui.type===v?'selected':''}>${h(v)}</option>`).join('')}</select></label>
 <label>장소<select id="e-place" data-filter="place"><option value="">모든 장소</option>${data.places.map(p=>`<option value="${p.id}" ${state.ui.place===p.id?'selected':''}>${h(p.name)}</option>`).join('')}</select></label>
 <label>관련 인물<select id="e-person" data-filter="person"><option value="">모든 인물</option>${data.people.slice(2).map(p=>`<option value="${p.id}" ${state.ui.person===p.id?'selected':''}>${h(p.name)}</option>`).join('')}</select></label>
 <label>정렬<select id="e-sort" data-filter="sort"><option value="acquired" ${state.ui.sort==='acquired'?'selected':''}>획득순</option><option value="event" ${state.ui.sort==='event'?'selected':''}>사건 기록순</option></select></label></div>
 <div class="list">${rows.map(e=>btn(`<img src="${e.asset}" alt="${h(e.name)}"><span class="text"><strong>${h(e.name)}</strong><small>${h(e.type)} · ${state.acquired[e.id].chapter}장 확보</small></span>`,'detail',`id="open-${e.id}" data-kind="evidence" data-id="${e.id}"`,'entry')).join('')||'<p class="muted">이 조건에 맞는 확보 자료가 없습니다.</p>'}</div>`;
}
function evidenceDetail(id){
 const e=evidence(id);if(!e||!state.acquired[id])return '<p>확보한 자료만 볼 수 있습니다.</p>';
 return `${btn('← 이전 화면','back','','back')}<h2 id="detail-heading" tabindex="-1">${h(e.name)}</h2><div class="paper"><img class="detail-art" src="${e.asset}" alt="${h(e.name)} 확대 도해"><small>${h(e.type)} · ${state.acquired[id].chapter}장 / 조사 ${state.acquired[id].turn}회차 확보</small><p>${h(e.text)}</p><div style="clear:both"></div></div><p class="footer-note">자료 원문과 관찰을 기록한 도해입니다. 입증된 명제와 해석은 별도로 비교하세요.</p><div class="related"><h3>관련 인물</h3><div class="actions">${e.people.map(p=>btn(h(person(p).name),'detail',`data-kind="person" data-id="${p}"`)).join('')}</div></div>${state.currentTask?btn('현재 답안의 근거로 선택 / 해제','e-toggle',`data-id="${e.id}"`):''}`;
}
function peopleList(){return `<h2>함께 남은 사람들</h2><div class="list">${data.people.map(p=>btn(`${p.portrait?`<img class="portrait-small" src="${p.portrait}" alt="${h(p.name)}">`:`<span class="avatar" aria-hidden="true">${h(p.name.slice(-1))}</span>`}<span class="text"><strong>${h(p.name)}</strong><small>${h(p.role)} · ${state.lastSeen[p.id]?h(place(state.lastSeen[p.id].place).name)+'에서 확인':'위치 미확인'}</small></span>`,'detail',`id="open-${p.id}" data-kind="person" data-id="${p.id}"`,'entry')).join('')}</div>`;}
function personDetail(id){
 const p=person(id);if(!p)return '';const sts=data.statements.filter(st=>st.person===id&&state.heard.includes(st.id));const related=data.evidence.filter(e=>state.acquired[e.id]&&e.people.includes(id));const logs=state.logs.filter(l=>l.lines.some(line=>line.person===id));const last=state.lastSeen[id];
 return `${btn('← 이전 화면','back','','back')}${p.portrait?`<img class="portrait-large" src="${p.portrait}" alt="${h(p.name)} 초상">`:''}<h2 id="detail-heading" tabindex="-1">${h(p.name)}</h2><span class="pill">${h(p.role)}</span><p>${h(p.intro)}</p><p class="muted">${last?`마지막 확인: ${h(place(last.place).name)} · ${last.chapter}장 / 조사 ${last.turn}회차`:'직접 확인한 위치 기록 없음'}</p>
 <h3>직접 들은 진술</h3>${sts.map(st=>`<article class="paper"><small>당시 발언 · ${h(place(st.place).name)} · ${st.chapter}장</small><p>${h(st.v1)}</p>${state.solved.includes(st.task)?`<small>정정 · ${st.task} 추궁</small><p>${h(st.v2)}</p>`:''}</article><div class="actions">${btn('원문 대화','detail',`data-kind="log" data-id="${st.id}.v1"`)}</div>`).join('')||'<p class="muted">아직 직접 질문해 들은 진술이 없습니다.</p>'}
 <h3>확인된 타임라인과 자료</h3>${related.map(e=>`<div class="log-line"><span class="pill">${e.type==='정정'?'본인의 정정':'관찰·기록 출처'}</span> ${btn(h(e.name),'detail',`data-kind="evidence" data-id="${e.id}"`)}<p>${h(e.text)}</p></div>`).join('')||'<p class="muted">확보된 근거 없음. 확인되지 않은 시간은 빈칸으로 남깁니다.</p>'}
 <h3>관계와 실제 대화</h3><div class="list">${logs.map(l=>btn(h(l.title)+` <small>· ${h(l.kind)}</small>`,'detail',`data-kind="log" data-id="${l.id}"`)).join('')||'<p>직접 관찰한 관계 대화가 아직 없습니다.</p>'}</div>`;
}
function mapView(){
 const node=p=>`<rect class="node ${state.location===p.id?'current':''}" x="${p.x-85}" y="${p.y-35}" width="170" height="70" rx="4"/><text class="place-name" x="${p.x}" y="${p.y-3}" text-anchor="middle">${h(p.name)}</text><text class="tag" x="${p.x}" y="${p.y+20}" text-anchor="middle">${state.location===p.id?'현재 위치':p.id}</text>`;
 return `<h2>물결 인쇄관 평면도</h2><p class="muted">단층 · 축척 없는 개념도. 선 길이가 아닌 구간 시간을 사용하세요. 지도 열람은 이동하지 않습니다.</p><svg class="map" viewBox="0 0 720 530" role="img" aria-label="인쇄관 일곱 장소와 실제 연결 통로 및 이동 시간"><title>물결 인쇄관 개념도</title>${data.routes.map(([id,a,b,t])=>{const p=place(a),q=place(b);return `<path class="route" d="M${p.x} ${p.y}L${q.x} ${q.y}"/><text class="time" x="${(p.x+q.x)/2+8}" y="${(p.y+q.y)/2-9}">${id} · ${t}분</text>`;}).join('')}<path class="service" d="M270 105L270 415"/><text class="time" transform="translate(252 347) rotate(-90)">배선 구멍 · 사람 이동 불가</text>${data.places.map(node).join('')}</svg><p>직원 문 폭 90cm. 인쇄실 동쪽 문은 공개 부스 촬영 범위, 낭독실 뒤 받침대 출입은 시야 밖입니다.</p>
 <h3>확보한 과거 공간 자료</h3><div class="actions">${['E06','E09','E14','E20'].filter(id=>state.acquired[id]).map(id=>btn(h(evidence(id).name),'detail',`data-kind="evidence" data-id="${id}"`)).join('')}</div>
 <h3>명시적 이동</h3><div class="list">${data.places.map(p=>btn(`<strong>${h(p.name)}</strong><small> · ${state.location===p.id?'현재 위치':shortestRoute(state.location,p.id,data).minutes+'분 / '+shortestRoute(state.location,p.id,data).routes.join(' → ')}</small>`,'move',`data-id="${p.id}" ${state.active?'disabled':''}`)).join('')}</div><h3>인물 마지막 확인</h3>${Object.entries(state.lastSeen).map(([id,last])=>`<p>${h(person(id).name)} · ${h(place(last.place).name)} · ${last.chapter}장 ${last.turn}회차</p>`).join('')}`;
}
function logList(){
 const rows=state.logs.filter(l=>(!state.ui.logKind||l.kind===state.ui.logKind)&&(!state.ui.person||l.lines.some(x=>x.person===state.ui.person))&&(!state.ui.query||(l.title+' '+l.lines.map(x=>x.text).join(' ')).includes(state.ui.query)));
 const groups=[...new Set(rows.map(l=>l.kind))];
 return `<h2>대화 기록</h2><div class="filters"><input id="log-query" data-filter="query" value="${h(state.ui.query)}" placeholder="대화 제목·발언 검색" aria-label="대화 검색"><label>종류<select id="log-kind" data-filter="logKind"><option value="">모든 종류</option>${[...new Set(state.logs.map(l=>l.kind))].map(v=>`<option ${state.ui.logKind===v?'selected':''}>${h(v)}</option>`).join('')}</select></label><label>인물<select id="log-person" data-filter="person"><option value="">모든 인물</option>${data.people.map(p=>`<option value="${p.id}" ${state.ui.person===p.id?'selected':''}>${h(p.name)}</option>`).join('')}</select></label></div>${groups.map(g=>`<h3 class="group-title">${h(g)}</h3><div class="list">${rows.filter(l=>l.kind===g).map(l=>btn(`<span class="text"><strong>${h(l.title)}</strong><small>${[...new Set(l.lines.map(x=>person(x.person)?.name))].map(h).join(' · ')} / ${h(place(l.place)?.name)} / ${l.chapter}장 ${l.turn}회차</small></span>`,'detail',`id="open-log-${h(l.id)}" data-kind="log" data-id="${h(l.id)}"`,'entry')).join('')}</div>`).join('')||'<p class="muted">이 조건에 맞는 읽은 대화가 없습니다.</p>'}`;
}
function logDetail(id){const l=state.logs.find(l=>l.id===id);if(!l)return '<p>아직 읽은 기록이 아닙니다.</p>';return `${btn('← 이전 화면','back','','back')}<h2 id="detail-heading" tabindex="-1">${h(l.title)}</h2><p class="muted">과거 대화 · ${h(l.kind)} · ${h(place(l.place)?.name)} · ${l.chapter}장 ${l.turn}회차</p>${l.lines.map(line=>`<div class="log-line"><strong>${h(person(line.person)?.name)}</strong><p>${h(line.text)}</p></div>`).join('')}<div class="actions">${(l.evidence||[]).map(id=>btn(h(evidence(id).name),'detail',`data-kind="evidence" data-id="${id}"`)).join('')}</div>`;}
function notes(){return `<h2>조사 메모</h2><label for="notes">자유 메모 · 자동 저장 · 힌트와 회복 뒤에도 보존</label><textarea id="notes" maxlength="20000">${h(state.notes)}</textarea><h3>입증한 명제</h3>${Object.entries(state.knowledge).map(([id,k])=>`<div class="log-line"><small>${id} · ${k.task}</small><p>${h(k.text)}</p></div>`).join('')||'<p>아직 입증한 명제가 없습니다. 단서 수집만으로 결론은 자동 확정되지 않습니다.</p>'}`;}
function settings(){return `<h2>설정과 기록 보관</h2><div class="setting"><label for="font-size">본문 글자 크기</label><div class="font-control"><input id="font-size" type="range" min="16" max="32" step="2" value="${state.ui.font}"><span>${state.ui.font}px</span></div></div><div class="setting"><h3>자동 저장과 수동 보관</h3><p>장면의 대사 위치, 답안, 신뢰도, 자료, 선택과 메모를 이 브라우저에 자동 저장합니다. 다른 브라우저나 기기로 옮길 때 저장 파일을 사용하세요.</p><div class="actions">${btn('저장 파일 내보내기','export')}${btn('현재 상태 다시 읽기','reload')}</div><label for="import-save">저장 파일 가져오기</label><input id="import-save" type="file" accept=".json,application/json"><p class="muted">가져오기는 기존 저장의 백업을 남깁니다. 잘못된 파일이면 현재 진행은 바뀌지 않습니다.</p></div><div class="setting"><h3>새 조사</h3>${btn('현재 기록을 백업하고 새 게임','new','','danger')}</div><h3>조사 안내</h3><p>현장 조사와 수첩 열람은 무료입니다. 잘못된 주장은 10점, 최종 주장은 15점을 잃습니다. 0점에서는 자료를 보존하고 60점으로 회복합니다. 힌트는 현재 과제에만 단계별로 열리며 불이익이 없습니다.</p><p class="footer-note">제작 빌드 ${h(data.build)} · 경험 품질과 독립 첫 플레이 검증은 진행 중입니다.</p>`;}
function reader(){if(state.ui.detail){const d=state.ui.detail;return d.kind==='evidence'?evidenceDetail(d.id):d.kind==='person'?personDetail(d.id):logDetail(d.id);}return ({'현장':field,'자료':evidenceList,'인물':peopleList,'지도':mapView,'대화':logList,'메모':notes,'설정':settings}[state.ui.tab]||field)();}
function taskPanel(){
 const available=availableTasks(state,data);const t=available.find(t=>t.id===state.currentTask)||available[0];
 const recovery=state.recovery?`<section class="recovery"><h3>모은과 사건 정리</h3><p>지금까지 확보한 사실은 사라지지 않았어요. ${Object.keys(state.acquired).length}개 자료와 ${Object.keys(state.knowledge).length}개 명제를 보존했습니다.</p>${btn('사건 정리 후 재도전 · 60 회복','recover','id="recover-trust"','primary')}</section>`:'';
 if(!t){const pending=state.pendingEvents.map(id=>data.events.find(e=>e.id===id));return recovery+`<div class="eyebrow">조사 수첩 · 다음 행동</div><h2 class="task-title">${state.ended?'기록을 마쳤습니다':'현장의 확인을 이어가세요'}</h2>${pending.map(v=>`<p>${h(place(v.place).name)}에서 「${h(v.title)}」 확인이 기다립니다.</p>`).join('')||'<p>현장에서 다음 대사와 약속을 확인하세요.</p>'}${btn('현장으로','tab','data-tab="현장"')}`;}
 const draft=draftFor(state,t.id);const min=Math.min(...t.sets.map(a=>a.length));
 return recovery+`<div class="eyebrow">논증 작업대 · 열람 중에도 유지</div><label class="visually-hidden" for="task-select">현재 과제</label><select class="task-select" id="task-select">${available.map(task=>`<option value="${task.id}" ${t.id===task.id?'selected':''}>${h(task.title)}</option>`).join('')}</select><h2 class="task-title">${h(t.title)}</h2><p>${h(t.question)}</p>
 ${t.statement?`<label for="statement-select">대상 진술</label><select id="statement-select" class="task-select"><option value="">진술 선택</option>${data.statements.filter(st=>state.heard.includes(st.id)).map(st=>`<option value="${st.id}" ${draft.statement===st.id?'selected':''}>${h(person(st.person).name)}: ${h(st.v1)}</option>`).join('')}</select>${!state.heard.includes(t.statement)?`<p class="muted">${h(person(t.person).name)}에게 먼저 무료로 자세히 물어보세요.</p>`:''}`:''}
 <fieldset><legend>${t.statement?'모순의 이유':'논증할 결론'}</legend>${t.options.map((option,i)=>`<label class="answer-option" for="answer-${i}"><input type="radio" name="answer" id="answer-${i}" value="${i}" ${String(draft.answer)===String(i)?'checked':''}><span>${h(option)}</span></label>`).join('')}</fieldset>
 ${t.timeCards?`<fieldset><legend>사건 순서 · 위에서 아래로 / 버튼으로 이동</legend>${draft.order?draft.order.map((id,i)=>{const card=t.timeCards.find(c=>c.id===id);return `<div class="time-card"><span>${i+1}. ${h(card.label)}<small> · ${h(card.time)}</small></span><div>${btn('↑','order-up',`data-id="${id}" aria-label="${h(card.label)} 위로" ${i===0?'disabled':''}`)}${btn('↓','order-down',`data-id="${id}" aria-label="${h(card.label)} 아래로" ${i===draft.order.length-1?'disabled':''}`)}</div></div>`;}).join(''):btn('시간 카드 배치 시작','order-start')}</fieldset>`:''}
 <fieldset><legend>근거 ${draft.evidence.length}개 선택 · 최소 ${min}개 / 다시 눌러 해제</legend><div class="evidence-select" id="evidence-select">${data.evidence.filter(e=>state.acquired[e.id]).map(e=>`<label for="select-${e.id}"><input type="checkbox" id="select-${e.id}" data-evidence="${e.id}" ${draft.evidence.includes(e.id)?'checked':''}><span>${h(e.name)}</span>${btn('원문','detail',`data-kind="evidence" data-id="${e.id}" aria-label="${h(e.name)} 원문"`,'mini')}</label>`).join('')||'<p class="muted">먼저 현장에서 자료를 살펴보세요.</p>'}</div></fieldset>
 <p><small>오답 제출 −${t.cost} · 빈칸은 무료 차단 · 최초 성공 +10</small></p>${state.awaitingReview&&!state.recovery?btn('피드백 확인 · 다시 검토해 제출','ack','id="ack-submit"','primary'):btn('주장 제출','submit',`id="submit-answer" data-id="${t.id}" ${state.recovery||state.active?'disabled':''}`,'primary')}
 <div class="actions">${btn(state.hints[t.id]===undefined?'모은에게 힌트 요청':state.ui.hiddenHint===t.id?'읽은 힌트 다시 열기':'다음 힌트 단계','hint',`id="hint-open" data-id="${t.id}" ${state.hints[t.id]===4&&state.ui.hiddenHint!==t.id?'disabled':''}`)}${btn('힌트 닫기','hint-close',`id="hint-close" data-id="${t.id}"`)}</div>
 ${state.hints[t.id]!==undefined&&state.ui.hiddenHint!==t.id?`<div class="hint" id="current-hint" tabindex="-1" role="region" aria-label="현재 과제 힌트"><strong>H${state.hints[t.id]} · ${h(t.title)}</strong><p>${h(hintText(state,t,data))}</p></div>`:''}
 <p class="footer-note">자료·인물·지도·대화·메모를 자유롭게 열어 보세요. 탭 열람은 포인트나 사건 시간을 바꾸지 않습니다.</p>`;
}
function draw({focus,restoreReader=false}={}){
 if(!state){app.innerHTML=`<main><h1>저장 기록을 확인할 수 없습니다</h1><p>${h(storageWarning)}</p><p>손상된 원본은 자동으로 지우지 않았습니다.</p>${btn('원본 저장 내려받기','export-corrupt')}${btn('백업에서 복구','restore-backup')}${btn('원본 보관 후 새 게임','new')}</main>`;return;}
 const oldMain=$('#reader')?.scrollTop||0,oldAside=$('#task-panel')?.scrollTop||0,oldList=$('#evidence-select')?.scrollTop||0;
 const oldFocus=document.activeElement?.id;const oldWindow=window.scrollY;
 document.documentElement.style.fontSize=state.ui.font+'px';
 app.innerHTML=`<header><div class="brand"><div class="seal" aria-hidden="true">잔향</div><div><div class="eyebrow">잔향 조사실 · 사건 01</div><h1>마지막 인쇄</h1></div></div><div class="trust">논증 신뢰도 <strong>${state.trust}</strong><span> / 100</span><progress max="100" value="${state.trust}" aria-label="논증 신뢰도"></progress></div></header><div class="layout"><nav aria-label="공통 조사 탭">${['현장','자료','인물','지도','대화','메모','설정'].map((tab,i)=>btn(`<span aria-hidden="true">${['◈','▤','◉','⌑','≡','✎','⚙'][i]}</span>${tab}`,'tab',`id="tab-${tab}" data-tab="${tab}" aria-selected="${state.ui.tab===tab}"`)).join('')}<small>${state.chapter}장<br>${h(data.chapters[state.chapter])}</small></nav><main id="reader" tabindex="-1">${message()}${reader()}</main><aside id="task-panel" aria-label="논증 답안">${taskPanel()}</aside></div>`;
 $('#reader').scrollTop=restoreReader?(state.ui.scroll[currentKey()]||0):oldMain;
 $('#task-panel').scrollTop=restoreReader?(state.ui.taskScroll||oldAside):oldAside;if($('#evidence-select'))$('#evidence-select').scrollTop=restoreReader?(state.ui.evidenceScroll||oldList):oldList;
 const target=document.getElementById(focus||oldFocus);if(target)target.focus({preventScroll:true});
 window.scrollTo({top:restoreReader?(state.ui.windowScroll?.[currentKey()]||0):oldWindow,behavior:'instant'});
}
app.addEventListener('click',e=>{
 const button=e.target.closest('button[data-action]');if(!button||button.disabled)return;
 const {action,id,tab,kind,value}=button.dataset;
 if(action==='new'){
  if(!confirm('현재 진행을 백업하고 새로운 조사를 시작할까요?'))return;
  try{localStorage.setItem(BACKUP,corruptRaw||serialize(state));}catch{}
  state=createState(data);corruptRaw=null;save();draw();return;
 }
 if(action==='export-corrupt'){download(corruptRaw||'null','last-impression-damaged.json');return;}
 if(action==='restore-backup'){try{state=restore(localStorage.getItem(BACKUP),data);corruptRaw=null;save();draw();}catch(error){storageWarning='백업 복구 실패: '+error.message;draw();}return;}
 if(!state)return;
 if(action==='tab'){navigate(tab);return;}
 if(action==='detail'){navigate(kind==='person'?'인물':kind==='log'?'대화':'자료',{kind,id});return;}
 if(action==='back'){back();return;}
 if(action==='export'){remember();download(serialize(state),'last-impression-save.json');return;}
 if(action==='reload'){remember();save();state=restore(localStorage.getItem(KEY),data);draw();return;}
 if(action==='e-toggle'){const d=draftFor(state,state.currentTask);update({type:'draft',id:state.currentTask,patch:{evidence:d.evidence.includes(id)?d.evidence.filter(x=>x!==id):[...d.evidence,id]}});return;}
 if(action==='order-start'){update({type:'draft',id:state.currentTask,patch:{order:['discovery','seal','last','photo']}});return;}
 if(action==='order-up'||action==='order-down'){const order=[...draftFor(state,state.currentTask).order],i=order.indexOf(id),j=i+(action==='order-up'?-1:1);if(j>=0&&j<order.length){[order[i],order[j]]=[order[j],order[i]];update({type:'draft',id:state.currentTask,patch:{order}});}return;}
 if(action==='hint-close'){update({type:'ui',patch:{hiddenHint:id}},{focus:'hint-open'});return;}
 if(action==='hint'){if(state.ui.hiddenHint===id){update({type:'ui',patch:{hiddenHint:null}},{focus:'current-hint'});}else{state.ui.hiddenHint=null;update({type:'hint',id});}return;}
 if(action==='branch'){update({type:'chooseBranch',id,value});return;}
 if(action==='submit'){button.disabled=true;update({type:'submit',id,token:crypto.randomUUID()});return;}
 update({type:action,id});
});
app.addEventListener('input',e=>{
 if(!state)return;const el=e.target;
 if(el.id==='notes'){update({type:'notes',text:el.value},{render:false});return;}
 if(el.dataset.filter!==undefined&&el.tagName==='INPUT'){
  const start=el.selectionStart;update({type:'ui',patch:{[el.dataset.filter]:el.value}});const next=document.getElementById(el.id);next?.focus();next?.setSelectionRange(start,start);return;
 }
 if(el.id==='font-size')update({type:'ui',patch:{font:Number(el.value)}});
});
app.addEventListener('change',async e=>{
 if(!state)return;const el=e.target;
 if(el.id==='task-select'){update({type:'task',id:el.value});return;}
 if(el.id==='statement-select'){update({type:'draft',id:state.currentTask,patch:{statement:el.value}});return;}
 if(el.name==='answer'){update({type:'draft',id:state.currentTask,patch:{answer:el.value}});return;}
 if(el.dataset.evidence){const d=draftFor(state,state.currentTask),id=el.dataset.evidence;update({type:'draft',id:state.currentTask,patch:{evidence:el.checked?[...new Set([...d.evidence,id])]:d.evidence.filter(x=>x!==id)}});return;}
 if(el.dataset.filter!==undefined){update({type:'ui',patch:{[el.dataset.filter]:el.value}});return;}
 if(el.id==='import-save'&&el.files[0]){
  try{const imported=restore(await el.files[0].text(),data);localStorage.setItem(BACKUP,serialize(state));state=imported;save();draw();}catch(error){state.message='저장을 가져오지 않았습니다: '+error.message;draw();}
 }
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state){e.preventDefault();if(state.ui.detail)back();else if(state.ui.tab!=='현장')navigate('현장');else if(state.currentTask&&state.hints[state.currentTask]!==undefined&&state.ui.hiddenHint!==state.currentTask)update({type:'ui',patch:{hiddenHint:state.currentTask}},{focus:'hint-open'});}});
window.addEventListener('beforeunload',()=>{remember();save();});
draw({focus:state?.ui.focus,restoreReader:true});if(state)save();
