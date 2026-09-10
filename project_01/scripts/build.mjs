import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {tasks,statements,places,routes,people,events} from './task-source.mjs';
const root=resolve(import.meta.dirname,'..');
const read=p=>readFile(resolve(root,p),'utf8');
const write=(p,s)=>writeFile(resolve(root,p),s,'utf8');
const cells=l=>l.split('|').slice(1,-1).map(x=>x.trim());
const evidenceSource=await read('game-plan/02-deduction-graph.md');
const evidence=evidenceSource.split('\n').filter(l=>/^\| E\d\d /.test(l)).map(l=>{
 const [label,text,obtain,context,uses]=cells(l);const id=label.slice(0,3);const [name,type]=label.slice(4).split(' / ');
 const location=/^[QV]\d/.test(obtain)?null:(obtain.match(/L\d\d/)||[])[0]||null;
 const chapter=/3장/.test(obtain)?3:/2장/.test(obtain)?2:1;
 return {id,name,type,text,obtain,location,chapter,people:[...new Set(context.match(/P\d\d/g)||[])],asset:`assets/evidence/${id}.svg`,uses:uses.split(',')};
});
if(evidence.length!==24)throw new Error('Expected 24 evidence items');
const eventTimes=['19:24','19:06','19:24','18:50','19:16','18:58','18:40','18:50','20:00','18:58','19:07','20:00','19:11','20:00','19:04','19:06','19:03','18:40','19:11','19:06','20:00','18:00','20:00','20:00'];
evidence.forEach((e,i)=>{e.eventTime=eventTimes[i];});
const script=await read('game-plan/04-characters-and-dialogue.md');
const names=Object.fromEntries(people.flatMap(p=>[[p.name,p.id],[p.name.slice(1),p.id]]));
names['서안']='P01';names['모은']='P02';names['문서']='P07';names['도윤']='P03';names['해준']='P04';names['나경']='P05';names['유리']='P06';
function line(text){
 const m=text.trim().match(/^([^:：]+)[:：]\s*[‘“]?([\s\S]*?)[’”]?$/);
 return {person:names[m?.[1]]||'P02',text:m?m[2]:text};
}
const conversations=[];
const intro=script.split('## 서막 C00')[1].split('## 장별')[0].split('\n').filter(l=>/^[가-힣]+:/.test(l)).map(line);
conversations.push({id:'C00',title:'첫 공동 현장',kind:'일반 조사',place:'L01',chapter:1,lines:intro});
const titles={C11:'빈자리의 가장자리',C12:'시계의 다수결',C13:'고친 말을 남기다',C21:'책의 기분',C22:'사실의 폭',C23:'가벼운 수레',C31:'사진과 사람',C32:'소수점 다음',C33:'하지 않은 일',C41:'기다리는 조사',C42:'공동 작업 수첩',C43:'끝났다는 말'};
for(const l of script.split('\n').filter(l=>/^\| C\d\d /.test(l))){
 const [label,body]=cells(l);const id=label.slice(0,3);
 const needs=label.match(/[DQ]\d\d/g)||[];
 conversations.push({id,title:titles[id],kind:'조수 상담',place:label.match(/L\d\d/)[0],chapter:Number(id[1]),needs,lines:body.split(' / ').map(line)});
}
for(const l of script.split('\n').filter(l=>/^- C\d\d\/V/.test(l))){
 const m=l.match(/^- (C\d\d)\/(V\d\d) (L\d\d): (.*)$/);if(!m)throw new Error('Bad scene '+l);
 const [_,id,eventId,place,body]=m;const event=events.find(e=>e.id===eventId);
 const lines=[...body.matchAll(/([가-힣]+) ‘([^’]*)’/g)].map(m=>({person:names[m[1]],text:m[2]}));
 conversations.push({id,title:event.title,kind:'인물 간 사건',place,chapter:event.chapter,lines});
}
conversations.push({id:'C90',title:'남겨야 할 말',kind:'종막',place:'L01',chapter:4,lines:[
{person:'P01',text:'원판의 이동, 실제 시각, 사용 도구, 다른 경로의 불가능성, 삭제판과의 관계를 근거로 제출합니다.'},
{person:'P05',text:'인쇄관이 사라질까 두려웠습니다. 벽만 남으면 말을 나중에 돌려놓을 수 있다고 생각했어요.'},
{person:'P07',text:'말이 빠진 벽을 지킨 셈이군요.'},
{person:'P02',text:'원판은 보존하고, 공개 사용은 주민 동의를 다시 확인하기로 기록하겠습니다. 조사 결과는 운영위원회에 전달합니다.'} ]});
conversations.push({id:'C92',title:'좋은 시작',kind:'종막',place:'L01',chapter:4,lines:[
{person:'P01',text:'다음에는 무엇부터 물으면 좋겠어요?'},{person:'P02',text:'그 질문을 먼저 해 주세요.'},{person:'P01',text:'그건 이미 했는데.'},{person:'P02',text:'그러니까 좋은 시작이라는 말이에요.'}]});
const hintSource=await read('game-plan/06-interrogation-and-hints.md');
for(const t of tasks){
 const row=hintSource.split('\n').find(l=>l.startsWith('| '+t.id+' |'));
 t.hints=row?cells(row).slice(1):[
 '현재 주장의 범위를 읽고 확보 자료를 확인해요.',
 '행위·시각·행위자·고의·대안 배제는 서로 다른 입증이에요. 지금 묻는 범위에 집중해요.',
 '이 주장에는 '+t.sets[0].map(id=>evidence.find(e=>e.id===id).name).join(', ')+'을 비교해요.',
 ['운반과 회수까지 이어 보세요.','마지막 실물과 봉인 사이, 서비스 구멍과 정상 문을 구별하세요.','대여와 실사용을 독립적인 사진·맞춤으로 연결하세요.','삭제 승인과 원판 은닉을 연결하세요.','구멍·수레를 배제한 뒤 사람의 다른 문과 대리 운반도 검증하세요.'][Number(t.id.slice(-1))-1],
 t.options[t.correct]+' / 근거: '+t.sets[0].map(id=>evidence.find(e=>e.id===id).name).join(', ')];
 t.feedback=t.options.map((_,i)=>i===t.correct?'결론에 맞는 독립 근거를 다시 확인하세요.':[
 '이 설명은 관찰한 범위를 넘어섭니다. 물건의 특징과 기록이 보장하는 범위를 구별하세요.',
 '시각·행동·물체를 서로 다른 사실로 확인해야 합니다. 하나가 다른 것을 자동 증명하지 않습니다.',
 '이 전제는 원문 관찰과 맞지 않습니다. 추측이나 태도 대신 실제 수치와 연속 기록을 비교하세요.' ][i%3]);
}
// Past clock offset must have contemporary support, never a present-only experiment.
tasks.find(t=>t.id==='Q01').sets=[['E06','E08']];
tasks.find(t=>t.id==='Q03').sets=[['E08','E13'],['E04','E08','E13']];
tasks.find(t=>t.id==='Q01').hints[4]='S01, 차광막 바퀴 자국(E06)+두 시계가 찍힌 사진(E08), ‘금빛 반사만으로 원판 실물의 존재를 보장할 수 없다’. 막의 금박과 당시 사진의 반사를 연결합니다.';
tasks.find(t=>t.id==='Q03').hints[4]='S03, E08+E13(또는 E04+E08+E13), ‘당시 기준시와 확대 사진을 대조하면 실제 19:11 저울 사용’. 현재 촬영만으로 과거 오차를 확정하지 않습니다.';
for(const id of ['D02','F02']){
 const t=tasks.find(t=>t.id===id);
 t.timeCards=[{id:'last',label:'원판 실물 확인',time:'19:06'},{id:'photo',label:'회랑 운반 사진',time:'기준시 보정 필요'},{id:'seal',label:'보존 덮개 봉인',time:'19:16'},{id:'discovery',label:'원판 부재 발견',time:'19:24'}];
 t.timeOrder=['last','photo','seal','discovery'];
 t.hints[4]+=' 시간 카드는 원판 실물 확인 → 회랑 운반 사진(보정 후19:11) → 보존 덮개 봉인 → 원판 부재 발견 순서입니다.';
}
const supports={D01:[],Q01:[],D02:['E01','E04','E08'],Q02:['E09'],D03:['E03'],D04:['E10'],Q03:['E04','E12'],D05:['E04','E08','E12'],D06:['E02','E05','E11','E14'],Q04:['E13'],D07:['E18','E19'],D08:['E18','E21'],F01:['E21','E23'],F02:['E04','E13','E20'],F03:['E19','E21','E24'],F04:['E18','E21','E23'],F05:['E02','E05']};
const feedback={
 D01:['시각을 연결하는 독립 근거를 확인하세요.','빠른 시계의 표시값에는 실제보다 시간이 더해져 있습니다. 기준시로 돌아갈 때의 연산 방향을 보세요.','두 시계는 평균을 내는 측정치가 아닙니다. 방송 기준과 같은 순간의 차이를 확인하세요.'],
 Q01:['반사면을 관찰한 자료를 연결하세요.','점검 열쇠는 다섯 직원이 공유합니다. 접근 권한은 무엇을 보았는지에 대한 반증이 아닙니다.','시계 오차가 있다고 목격 내용 모두가 거짓이 되지는 않습니다. 빛과 물체를 구별하세요.'],
 D02:['불투명 덮개가 닫힌 기록은 그 안에 원판이 있었다는 기록이 아닙니다.','마지막 실물·봉인·정정 진술이 모두 필요합니다.','발견된 때와 사라진 때는 다릅니다. 발견 이전의 실물 확인을 함께 보세요.'],
 Q02:['바퀴 자국은 이동을 보여 줍니다. 무엇을 실었는지는 아직 별도의 문제입니다.','붉은 천의 색으로 발언 전체의 진위를 판단할 수 없습니다. 물건이 남긴 연속 흔적을 보세요.','부정한 이동과 실제 흔적을 연결하세요.'],
 D03:['판 두께가 얇아도 짧은 변보다 작은 원형 구멍을 통과하는 것은 별개입니다.','원판과 구멍의 실제 치수를 비교하세요.','천은 구멍에 걸릴 수 있어도 큰 원판까지 지나갔다는 증거가 아닙니다.'],
 D04:['카트 안과 사람의 별도 행동을 분리하는 근거를 제시하세요.','수레 하중으로 확인할 수 있는 범위는 수레 안입니다. 해준의 손 운반이나 다른 행동은 별도 기록이 필요합니다.','천의 색은 무게 기록을 대신하지 않습니다. 빈 수레와 총 하중을 빼 보세요.'],
 Q03:['현재 촬영만으로 과거 오차가 같았다고 단정할 수 없습니다. 당시 사진의 두 시계를 확인하세요.','당시 시각과 확대 사진의 저울 사용을 연결하세요.','대여표는 케이스를 빌렸다는 사실을 보여 줍니다. 내용물과 실제 사용에는 독립 자료가 필요합니다.'],
 D05:['저울의 총 하중에는 케이스 자체의 무게도 들어 있습니다.','운반자 사진·총 하중·용기 무게·원판 규격을 연결하세요.','빈 모형이라는 주장도 관찰된 총 하중을 설명해야 합니다. 무게를 없는 사실로 만들 수 없습니다.'],
 D06:['말을 고친 사실은 범행 시각의 위치를 증명하지 않습니다.','사건 구간 전체가 끊기지 않는 자료를 대조하세요.','명단 순서는 실제 이동이나 작업을 보여 주지 않습니다. 시간 범위를 확인하세요.'],
 Q04:['대여와 실제 사용은 다릅니다. 현장 흔적과 남아 있는 도구를 비교해야 합니다.','대여 맥락과 현장 흔적을 함께 제시하세요.','침묵이나 태도는 도구 사용의 증거가 아닙니다. 관찰 가능한 흔적으로 돌아가세요.'],
 D07:['운송 상자는 받침대 경첩음과 같은 시점의 도구 흔적을 설명하지 못합니다.','서비스 구멍 가설은 실측한 물체 제약과 맞지 않고 경첩음을 설명하지 못합니다.','소리는 시점, 접촉 흔적은 물건, 맞춤은 사용 도구를 검증합니다.'],
 D08:['원판을 되찾았다는 결과가 그 전에 숨기고 다른 판을 쓰려 한 행동을 없애지 않습니다.','불쾌한 말투는 고의의 증거가 아닙니다. 승인한 문장과 실제 운반을 대조하세요.','삭제된 판본과 회수한 원판, 실제 은닉 행동을 연결하세요.'],
 F01:['실제 운반과 내용물, 최종 발견을 각각 뒷받침하세요.','서비스 구멍은 실측한 원판을 통과시키지 못합니다. 기름 흔적만으로 경로를 정하지 마세요.','원판은 탁본과 타각이 일치한 상태로 회수됐습니다. 이미 파기됐다는 주장은 맞지 않습니다.'],
 F02:['발견 이후의 시각은 마지막 실물 확인과 봉인 기록을 설명하지 못합니다.','시각 구간과 정상 통로의 가능성을 함께 입증하세요.','봉인 유지 중 출입했다는 주장은 종이띠와 봉인 관찰을 설명하지 못합니다.'],
 F03:['도윤의 연속 점검 기록과 케이스 사진의 인물을 함께 대조하세요.','해준의 카트 하중과 연속 작업 기록을 설명할 수 없습니다.','대여 서명 외에 실제 운반자 사진과 사용 도구의 연결이 필요합니다.','유리의 외부 인계 기록과 실제 운반 사진의 인물을 구별하세요.','문서의 실물 확인 후 부스 연속 기록을 설명할 수 없습니다.'],
 F04:['고의 은닉과 실제 파기·처벌 결과를 구별하는 근거를 제시하세요.','네 직원의 연속 기록은 대리 운반과 맞지 않으며 원판은 회수됐습니다. 공모·파기를 뒷받침할 사실이 없습니다.','삭제 승인, 은닉, 복제판 사용 제안을 단순 물건 착각으로 설명할 수 없습니다.'],
 F05:['행위자 추측은 대안 가설의 반증을 대신하지 않습니다.','출입 권한은 직원 다섯 명에게 공유됐습니다. 단독 열쇠라는 전제가 틀렸습니다.','물체 경로를 배제하고 남는 정상 문과 대리 운반도 검증해야 합니다.']
};
for(const t of tasks){t.supports=supports[t.id];t.feedback=feedback[t.id];}
tasks.find(t=>t.id==='F03').sets.push(['E13','E19','E23','E24']);

await mkdir(resolve(root,'assets/evidence'),{recursive:true});
const hands=(x,y,h,m,r=14)=>{const angle=(v)=>v*Math.PI/180;const pt=(a,len)=>`${(x+Math.sin(angle(a))*len).toFixed(2)} ${(y-Math.cos(angle(a))*len).toFixed(2)}`;return `<path d="M${x} ${y}L${pt((h%12)*30+m*.5,r*.65)}M${x} ${y}L${pt(m*6,r)}"/>`;};
const shapes=[
'<path d="M28 20h65l9 85H32z"/><path d="M32 43h60M32 65h62M32 87h64"/><path d="M90 20v16h12"/>',
'<path d="M18 24h74v61H18z" fill="#ad7351"/><path d="M65 48h42v52H65z"/><circle cx="27" cy="32" r="3"/><circle cx="38" cy="32" r="3"/><circle cx="27" cy="43" r="3"/>',
'<circle cx="64" cy="53" r="35" fill="#243d42"/><path d="M33 55l20 7 4 43 14-14 19 6-7-39-22-8z"/><path d="M42 105l9-16M87 105l7-18"/>',
'<path d="M20 38h24l25-19v65L44 66H20z"/><path d="M80 34q18 18 0 35M89 24q27 28 0 55"/><path d="M20 97h91M22 108h58"/>',
'<path d="M21 22h70v83H21z"/><path d="M43 23v78" stroke-dasharray="5 4"/><circle cx="89" cy="78" r="20"/><path d="M79 76v-10a10 10 0 0120 0v10M76 76h27v16H76z"/>',
'<path d="M21 16h80v78H21z" fill="#56625b"/><path d="M39 18l30 74M78 18L48 92" stroke="#d6b665"/><circle cx="32" cy="105" r="8"/><circle cx="91" cy="105" r="8"/><path d="M23 116h20M87 116h25"/>',
'<path d="M18 25h92v74H18z"/>'+[28,46,64,82,100].map((x,i)=>`<circle cx="${x}" cy="47" r="6"/><path d="M${x} 53v${22+i*3}h7v-5"/>`).join(''),
'<path d="M12 25h104v76H12z" fill="#78918a"/><circle cx="43" cy="57" r="21"/><circle cx="88" cy="57" r="21"/>'+hands(43,57,18,50)+hands(88,57,18,58)+'<path d="M20 91h30"/>',
'<path d="M15 66l88-41v76z" fill="#ecdcbc"/><path d="M73 24v80"/><path d="M18 66l51-9 32 30" stroke="#b2774d"/><circle cx="17" cy="66" r="8"/>',
'<path d="M15 69l27-43 33 16 30 53-55 15z" fill="#925a50"/><path d="M30 39l35-20 24 44-39 23zM39 47l26-16M44 56l24-14M48 65l24-14"/>',
'<path d="M18 58h71v33H18zM18 59L9 33"/><circle cx="33" cy="103" r="10"/><circle cx="79" cy="103" r="10"/><path d="M74 18h34v54H74zM80 29h20M80 39h20M80 49h12"/>',
'<path d="M12 16h104v64H12z"/><circle cx="40" cy="47" r="18"/><circle cx="88" cy="47" r="18"/>'+hands(40,47,20,0,12)+hands(88,47,20,8,12)+'<path d="M64 80v30M64 85l-27 28M64 85l27 28"/>',
'<path d="M21 40h84v56H21z" fill="#31464a"/><path d="M47 40V27h32v13M26 67h74"/><path d="M32 100h64v15H32z"/><circle cx="64" cy="108" r="5"/>',
'<circle cx="32" cy="64" r="20"/><path d="M64 25h55v77.5H64z" fill="#ac7756"/><path d="M12 64h40M64 113h55"/>',
'<path d="M18 44h60v42H18zM78 53l24-13v46L78 72"/><circle cx="35" cy="30" r="13"/><circle cx="66" cy="30" r="13"/><path d="M18 104h95M34 96v18M57 96v18M81 96v18"/>',
'<path d="M13 15h102v95H13zM64 15v95M13 62h102M22 30h83"/>'+[29,53,78].map(x=>`<path d="M${x} 28v58h19V28z" fill="#e9dbc1"/>`).join(''),
'<path d="M17 45l37-20 38 20-37 22zM17 45v48l38 21 37-21V45M55 67v47"/><path d="M86 21l12-9 12 17-12 63-9-3z" fill="#c58b50"/>',
'<path d="M19 65V22h17v43a16 16 0 0032 0V22h17v43a33 33 0 01-66 0z" fill="#7b8c87"/><path d="M76 64h33v44H76zM82 79h20M82 91h13"/>',
'<path d="M14 23l14-6 15 6 14-6 15 6 14-6 28 8v83H14z"/><path d="M22 83h84M22 74l15 1 12-35 20 1 9 34 28-1" stroke="#538b82"/>',
'<circle cx="37" cy="43" r="23"/><circle cx="92" cy="43" r="23"/><path d="M14 43v60h102V43M25 89h12l8-17 10 26 9-20 8 10h28"/>',
'<path d="M14 40l47-23 53 23-47 24z" fill="#ece0c3"/><path d="M14 40v57l53 19V64M114 40v57l-47 19" fill="#536862"/><path d="M32 40l29-14 34 14-28 14z" stroke="#b27e55"/><path d="M55 48v6a8 8 0 0016 0v-6"/><circle cx="36" cy="44" r="2"/><circle cx="42" cy="47" r="2"/>',
'<path d="M12 18h46v90H12zM70 18h46v90H70z"/>'+[35,49,63,77,91].map(y=>`<path d="M18 ${y}h33M76 ${y}h32"/>`).join('')+'<path d="M74 59l36 9M74 68l36-9" stroke="#ac5b45"/>',
'<path d="M15 27v43a23 23 0 0046 0V27H48v21l-7 6 7 6v10a10 10 0 01-20 0V27z" fill="#84918a"/><path d="M79 27h30v76H79zM80 48l9 6-9 6M85 82h18"/>',
'<path d="M14 28h99v74H14z" fill="#b87b50"/><circle cx="24" cy="38" r="4"/><circle cx="36" cy="38" r="4"/><circle cx="24" cy="50" r="4"/><path d="M45 50h54M24 66h75M24 80h75"/><path d="M84 88l9-3 9 3 4 9-4 9-9 3-9-3-4-9z"/>'
];
for(let i=0;i<24;i++){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="8" fill="#eee2c9"/><g fill="#e4d8bc" stroke="#30484b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${shapes[i]}</g></svg>`;
 await write(`assets/evidence/${evidence[i].id}.svg`,svg);
}
for(const p of people){const path=`assets/portraits/${p.id}.png`;try{await access(resolve(root,path));p.portrait=path;}catch{}}
for(const v of events){const path=`assets/scenes/${v.id==='V01'?'V01-night':v.id}.png`;try{await access(resolve(root,path));v.asset=path;}catch{}}
const data={build:'0.1.0',title:'마지막 인쇄',series:'잔향 조사실',chapters:['','빛을 보았다는 사람','빈 수레의 무게','사진 밖의 아홉 킬로','남겨진 문장'],evidence,tasks,statements,places,routes,people,events,conversations};
await write('src/content.json',JSON.stringify(data,null,2));
await write('assets/manifest.json',JSON.stringify({build:data.build,evidence:evidence.map(e=>({id:'A_'+e.id,path:e.asset,method:'정확한 SVG 도해',alt:e.name,review:'렌더링 검수 예정'})),scenes:[{id:'A_V01',path:'assets/scenes/V01.png',method:'imagegen 내장 도구',prompt:'Original 2008 Korean civic printing museum, empty flatbed press and raised opaque hood, elderly printer cream knit, bookbinder green apron, manager burgundy shirt, ink-wash editorial illustration. No hidden copper plate or text.',review:'빈 인쇄대·세 인물·차광구멍 확인. 시간대가 낮처럼 보이므로 야간 조명 수정 필요.'}]},null,2));
console.log(`Built ${evidence.length} evidence, ${tasks.length} tasks, ${conversations.length} conversations, ${events.length} events.`);
