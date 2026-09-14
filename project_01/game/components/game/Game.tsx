'use client';



import {AudioClip,AudioVolume} from './AudioClip';
import {portraitPath,locationPath} from '@/lib/game/art';
import {NameSetup} from './NameSetup';
import {SystemGuide} from './SystemGuide';
import {EventStill,eventStill} from './EventStill';
import {currentRevisits,revisitNode} from '@/lib/game/revisits';
import {travelOptions,portName} from '@/lib/game/travel';
import {readSettings,saveSettings,readSaveStore,saveCurrent,createSaveSlot,activateSaveSlot,type SaveSlot} from '@/lib/game/save-store';
import {archiveComplete,recordingState} from '@/lib/game/epilogue';
import {ReadableOriginal,ImprintTest,CopyOverlay,ObservationBands} from './OriginalView';

import { lazy, Suspense, useEffect, useReducer, useRef, useState } from 'react';
import { BookOpen, ChevronRight, FileText, Map, MessageCircle, NotebookPen, Settings, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { acquiredPending, cargoProgress, currentNode, freshView, gameReducer, initialState, investigationOptions, type GameState } from '@/lib/game/state';
import { displayText, script } from '@/lib/game/script';
import { presentation as gamePresentation } from '@/lib/game/presentation';

import { BallroomPlan, EvidenceView } from './EvidenceView';

import {SoundRoutes,SoundComparison} from './SoundView';
import {CargoBox,CartGeometry,BoundOriginal} from './CargoView';
import {PurposeEnvelopes,PageConnections} from './PaperView';
import {BoothPanes,SecuredGate,ActionComparison,CoatComparison,type Comparison} from './VisibilityView';

import {personNames as names} from '@/lib/game/evidence-index';
const EvidenceList=lazy(()=>import('./EvidenceList').then(m=>({default:m.EvidenceList})));
const EvidenceContext=lazy(()=>import('./EvidenceList').then(m=>({default:m.EvidenceContext})));
const ArchivePanel=lazy(()=>import('./ArchivePanel').then(m=>({default:m.ArchivePanel})));
const MapPanel=lazy(()=>import('./MapPanel').then(m=>({default:m.MapPanel})));
const ChallengePanel=lazy(()=>import('./ChallengePanel').then(m=>({default:m.ChallengePanel})));
const HistoryPanel=lazy(()=>import('./RecordsPanels').then(m=>({default:m.HistoryPanel})));
const PeoplePanel=lazy(()=>import('./RecordsPanels').then(m=>({default:m.PeoplePanel})));
const tools=[['evidence','증거',FileText],['people','인물',Users],['map','지도',Map],['history','대화',MessageCircle],['notes','메모',NotebookPen],['settings','설정',Settings]] as const;
type Tool=(typeof tools)[number][0]|'deduction'|'hint'|'archive';
const toolNames:Record<Tool,string>={evidence:'증거',people:'인물',map:'지도',history:'대화',notes:'메모',settings:'설정',deduction:'추리하기',hint:'막힌 부분 살펴보기',archive:'사건 보관함'};

export function Game() {
  const [state,dispatch]=useReducer(gameReducer,initialState);
  const [ready,setReady]=useState(false);
  const [stored,setStored]=useState<GameState|null>(null);
  const [saveError,setSaveError]=useState('');
  const [slots,setSlots]=useState<SaveSlot[]>([]);
  const [saveNotice,setSaveNotice]=useState('');
  const bodyRef=useRef<HTMLDivElement>(null);
  const pending=acquiredPending(state);
  const view=state.views?.at(-1)??(pending?{...freshView('evidence'),detail:pending}:null);
  const tool=view?.tool??null,detail=view?.detail??null,search=view?.search??'';
  const setTool=(next:Tool|null)=>dispatch(next?{type:'view',tool:next}:{type:'viewBack'});
  const setDetail=(id:string|null)=>dispatch({type:'viewState',patch:{detail:id}});
  const setSearch=(text:string)=>dispatch({type:'viewState',patch:{search:text}});
  const restoreKey=`${state.views?.length??0}:${tool}:${detail}`;
  const savedView=useRef(view);
  useEffect(()=>{savedView.current=view;});
  useEffect(()=>{
    const v=savedView.current;if(!v)return;
    const restore=()=>{const body=bodyRef.current;if(!body)return false;body.scrollTop=v.scroll;const el=v.focus?document.getElementById(v.focus):null;if(el&&body.contains(el)){el.focus({preventScroll:true});return true;}return !v.focus&&!body.querySelector('[role="status"]');};
    const observer=new MutationObserver(()=>{if(restore())observer.disconnect();});
    const frame=requestAnimationFrame(()=>{if(!restore()&&bodyRef.current)observer.observe(bodyRef.current,{childList:true,subtree:true});});
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();};
  },[restoreKey]);
  useEffect(()=>{
    queueMicrotask(()=>{
      try {const prefs=readSettings(localStorage);if(prefs){dispatch({type:'textScale',value:prefs.textScale});dispatch({type:'audioVolume',value:prefs.audioVolume});}const store=readSaveStore(localStorage);setSlots(store.slots);setStored(store.slots.find(s=>s.id===store.active)?.state??null);}
      catch {setSaveError('이 브라우저에서 저장 기록을 읽지 못했습니다.');}
      setReady(true);
    });
  },[]);
  useEffect(()=>{
    if(!ready||!state.started)return;
    try{saveCurrent(localStorage,state);}
    catch{queueMicrotask(()=>setSaveError('저장 공간에 기록하지 못했습니다. 브라우저의 저장 공간을 확인해 주세요.'));}
  },[state,ready]);
  useEffect(()=>{if(ready){try{saveSettings(localStorage,{textScale:state.textScale,audioVolume:state.audioVolume});}catch{/* Case saving reports storage errors separately. */}}},[ready,state.textScale,state.audioVolume]);
  const beginNamed=(name:string,setupLines?:string[])=>{try{const store=createSaveSlot(localStorage,crypto.randomUUID(),state.started?state:undefined);setSlots(store.slots);setStored(null);setSaveError('');dispatch({type:'start',name,setupLines});}catch{setSaveError('새 슬롯을 만들 수 없습니다. 기존 기록은 보존됩니다.');}};
  const startNew=()=>beginNamed(state.playerName);
  const loadSlot=(id:string)=>{try{const next=activateSaveSlot(localStorage,id,state.started?state:undefined);setSlots(readSaveStore(localStorage).slots);setStored(next);setSaveError('');dispatch({type:'restore',state:next});}catch{setSaveError('저장한 기록을 불러오지 못했습니다.');}};
  const manualSave=()=>{try{setSlots(saveCurrent(localStorage,state).slots);setSaveNotice('현재 슬롯에 저장했습니다.');}catch{setSaveError('저장 공간을 확인해 주세요. 기존 슬롯은 지우지 않았습니다.');}};
  const epilogue=state.investigation?.stage.startsWith('ep-');
  const ended=archiveComplete(state);
  const node=revisitNode(state)??currentNode(state);
  const scene=script.scenes[state.sceneId];
  const presentation=gamePresentation(state);
  const show=(text:string)=>displayText(text,state.playerName);
  const speaker=node?.kind==='speech' ? node.speaker : null;
  const acquisitionOpen=!!pending;
  const visibleTool=tool;
  const evidenceId=detail??(acquisitionOpen?pending:null);
  const evidence=evidenceId?script.evidence[evidenceId]:null;
  const openTool=(next:Tool)=>{if(next==='settings'){try{setSlots(readSaveStore(localStorage).slots);}catch{setSaveError('저장 슬롯을 읽지 못했습니다.');}}if(state.views?.length)dispatch({type:'viewState',patch:{scroll:bodyRef.current?.scrollTop??0,focus:document.activeElement?.id??''}});setTool(next);};
  const closeTool=()=>{if(acquisitionOpen&&visibleTool==='evidence'&&detail===pending)dispatch({type:'acknowledge',id:pending!});if(state.views?.length)dispatch({type:'viewBack'});};
  const inspect=(next:Tool,id:string)=>{openTool(next);setDetail(id);};
  const options=investigationOptions(state);
  const inChapterTwo=state.investigation?.stage.startsWith('ch2-');
  const inChapterThree=state.investigation?.stage.startsWith('ch3-');
  const inChapterFour=state.investigation?.stage.startsWith('ch4-');
  const inChapterSix=state.investigation?.stage.startsWith('ch6-');
  const originalReadable=state.evidence.includes('E49');
  const sixStage=state.investigation?.stage??'';
  const originalTable=inChapterSix&&presentation.place==='호숫가 보관 창고'&&originalReadable;
  const imprintTable=['ch6-early-machine','ch6-overlay'].includes(sixStage)&&state.evidence.includes('E48')&&presentation.place==='적재·기록 데스크';
  const bandsTable=sixStage==='ch6-bands'&&state.evidence.includes('E52');
  const inChapterFive=state.investigation?.stage.startsWith('ch5-');
  const panes=state.investigation?.stage==='ch5-panes'&&state.evidence.includes('E40');
  const gate=state.investigation?.stage==='ch5-gate'&&state.evidence.includes('E42')&&presentation.place.startsWith('수영장');
  const safeComparison:Comparison|null=state.investigation?.stage==='ch5-compare'&&!state.investigation.task?(state.log.some(l=>l.nodeId==='C_CH05_04:n0008')?'push':state.log.some(l=>l.nodeId==='C_CH05_04:n0006')?'help':state.log.some(l=>l.nodeId==='C_CH05_04:n0004')?'stumble':null):null;
  const coat=state.investigation?.stage==='ch5-coat'&&state.evidence.includes('E44')&&presentation.place.startsWith('현관');
  const edgesKnown=state.log.some(l=>l.nodeId==='S_CH04_03_0002');
  const paperTable=['ch4-meeting','ch4-originals','ch4-aftermath'].includes(state.investigation?.stage??'');
  const edgeTable=state.investigation?.stage==='ch4-edges'&&edgesKnown&&presentation.place.startsWith('연회장');
  const objectiveKnown=!epilogue&&state.investigation?.completed.includes(inChapterSix?'ch6-unfold':inChapterFive?'ch5-panes':inChapterFour?'ch4-originals':inChapterThree?'ch3-photo':inChapterTwo?'ch2-compare':'arrival');
  const objective=inChapterSix?show(script.scenes[state.investigation?.knowledge.includes('K29')?'C_CH06_07':state.investigation?.knowledge.includes('K28')?'C_CH06_06':state.investigation?.knowledge.includes('KQ06')?'C_CH06_05':'C_CH06_02'].nodes.find(n=>n.kind==='display')!.text).replace(/^Objective:\s*/,''):inChapterFive?show(script.scenes.C_CH05_02.nodes.find(n=>n.kind==='display')!.text).replace(/^Objective:\s*/,''):inChapterFour?show(script.scenes.C_CH04_02.nodes.find(n=>n.kind==='display')!.text).replace(/^Objective:\s*/,''):inChapterThree?show(script.scenes.C_CH03_02.nodes.find(n=>n.kind==='display')!.text).replace(/^Objective:\s*/,''):inChapterTwo?(state.investigation?.knowledge.includes('K10')?'덮인 수레를 직접 확인할 조사 약속을 잡자.':state.investigation?.knowledge.includes('KQ02')?'녹음한 때·틀어 둔 때와 직접 대면한 때를 나누자.':'안내 음성이 그 시각의 대면을 대신할 수 있는지 살피자.'):state.investigation?.knowledge.includes('K05')?'음향 부스 약속을 확인하자.':state.investigation?.knowledge.includes('KQ01')?'목격 정정과 별개로 방 구조·작업 이력·동선을 확인하자.':'창가의 목격이 무엇을 증명하는지 확인하자.';
  const soundMode=state.investigation?.stage==='ch2-booth'?(state.log.some(l=>l.nodeId==='C_CH02_01:n0017')?'file':state.log.some(l=>l.nodeId==='C_CH02_01:n0013')?'input':null):null;
  const soundCompare=state.investigation?.stage==='ch2-compare'&&state.log.some(l=>l.nodeId==='C_CH02_02:n0018');
  const recorded=node?.kind==='speech'&&/기록|녹음/.test(node.label??'');
  const originalCall=sixStage==='ch6-contact'&&speaker==='P09'&&!state.log.some(l=>l.nodeId==='C_CH06_01:n0015');
  const remote=originalCall||state.investigation?.stage==='ch3-opening'&&['S_CH03_05_0011','S_CH03_05_0012'].includes(node?.id??'');
  const cargo=state.investigation?.stage==='ch3-opening'&&['sealed','opened','complete'].includes(cargoProgress(state));
  const geometry=state.investigation?.stage==='ch3-cart'&&state.evidence.includes('E21');
  const conserving=state.investigation?.stage==='ch3-preserve';
  const shot=eventStill(state);
  const portrait=recorded||remote||!speaker?null:portraitPath(speaker,state);
  return <AudioVolume.Provider value={state.audioVolume??.7}><main className="game-root" style={{'--text-scale':state.textScale} as React.CSSProperties}>
    <header className="game-header">
      <div className="flex items-center gap-3"><BookOpen aria-hidden className="size-5 text-[#d1ae73]"/><span className="game-wordmark">여울관 <span>남겨 둔 자리</span></span></div>
      <span className="chapter-label">{presentation.chapter}</span>
      <Button variant="ghost" onClick={()=>openTool('settings')} aria-label="설정 열기"><Settings className="size-5"/></Button>
    </header>
    {!state.started ? <section className="start-screen" style={{backgroundImage:'linear-gradient(90deg,rgba(9,28,29,.94),rgba(9,28,29,.25)),url(/art/l01.webp)'}}>
      <div className="start-copy"><p className="eyebrow">여울관</p><h1>남겨 둔 자리</h1><div className="start-form">
        <NameSetup ready={ready} onStart={beginNamed}/>
        {stored&&<Button type="button" variant="outline" size="lg" onClick={()=>dispatch({type:'restore',state:stored})}>읽던 자리에서 이어하기</Button>}
      </div>{slots.some(s=>s.state)&&<div className="save-slots"><h2>보관한 플레이</h2>{slots.filter(s=>s.state).map((s,index)=><Button variant="outline" key={s.id} onClick={()=>loadSlot(s.id)}>{index+1}. {s.state!.playerName} · {archiveComplete(s.state!)?'엔딩':script.scenes[s.state!.sceneId].title}</Button>)}</div>}{saveError&&<p role="alert">{saveError}</p>}</div>
    </section> : <div className="play-layout">
      <section className="scene-column" aria-label="현재 장면">
        <div className="scene-stage" style={locationPath(presentation.place,state)?{backgroundImage:`linear-gradient(180deg,rgba(10,30,30,.18),rgba(10,30,30,.45)),url(${locationPath(presentation.place,state)})`}:undefined}>
          <div className="place-strip"><span>{presentation.place}</span><span>{presentation.time}</span></div>
          {state.travel&&portrait&&<img className="dialogue-portrait" src={portrait} alt={speaker==='P00'?state.playerName:names[speaker!]}/>}
          {!state.travel&&(shot?<EventStill shot={shot}/>:originalTable?<div className="event-original"><ReadableOriginal/></div>:bandsTable?<div className="event-original"><ObservationBands/></div>:imprintTable?<div className="event-original">{state.evidence.includes('E51')?<CopyOverlay/>:<ImprintTest/>}</div>:panes?<div className="event-visibility"><BoothPanes/></div>:gate?<div className="event-visibility"><SecuredGate/></div>:safeComparison?<div className="event-visibility"><ActionComparison mode={safeComparison}/></div>:coat?<div className="event-visibility"><CoatComparison/></div>:paperTable?<div className="event-papers"><PurposeEnvelopes held={state.evidence} sorted={state.log.some(l=>l.nodeId==='C_CH04_04:n0001')}/></div>:edgeTable?<div className="event-papers"><PageConnections/></div>:cargo?<div className="event-cargo"><CargoBox opened={state.evidence.includes('E23')} cut={cargoProgress(state)==='opened'}/></div>:geometry?<div className="event-cargo"><CartGeometry/></div>:conserving?<div className="event-cargo"><BoundOriginal/></div>:soundMode?<div className="event-sound"><SoundRoutes mode={soundMode}/></div>:soundCompare?<div className="event-sound"><SoundComparison compare/></div>:presentation.experiment?<div className="event-plan"><BallroomPlan stop={presentation.wall} experiment/></div>:portrait&&<img className="dialogue-portrait" src={portrait} alt={speaker==='P00'?state.playerName:names[speaker!]}/>)}
          {!presentation.experiment&&!soundMode&&!soundCompare&&!cargo&&!geometry&&!conserving&&!paperTable&&!edgeTable&&!panes&&!gate&&!safeComparison&&!coat&&<div className="scene-vignette"/>}
        </div>
        {state.investigation?.stage==='ep-sound'&&<div className="recording-panel" data-recording={recordingState(state)}><strong>{recordingState(state)==='off'?'녹음 꺼짐':recordingState(state)==='recording'?'허락한 범위 녹음 중':'녹음 종료'}</strong><p>{recordingState(state)==='off'?'용도와 범위를 정하고 있습니다. 아직 어떤 말도 녹음되지 않았습니다.':state.choices.B_SOUND==='consented_voices'?'해금이 새로 허락한 한 문장과 조용한 배경음만 남깁니다.':'허가된 자리의 바람·의자·물방울 소리만 남깁니다. 사람 목소리는 없습니다.'}</p></div>}
        {ended&&<div className="ending-panel"><h2>여울관: 남겨 둔 자리 · 끝</h2><p>이번 사건에서 확인한 기록과 지나온 대화를 보관했습니다.</p><Button onClick={()=>openTool('archive')}>사건 보관함 열기</Button><Button variant="outline" onClick={()=>openTool('settings')}>엔딩 저장·새 플레이</Button></div>}
        {state.investigation?.stage==='ep-sound'&&recordingState(state)==='complete'&&<SchoolAudio state={state}/>}
        {!state.travel&&soundMode==='file'&&<AudioClip src="/audio/click_test.wav" label="로컬 재생 시험" transcript="짧은 딸깍 소리 한 번. 마이크 입력은 녹음하지 않습니다."/>}
        {!state.travel&&((state.sceneId==='C_PR_09'&&state.log.some(l=>l.nodeId==='S_PR_09_0022'))||(sixStage==='ch6-personal1'&&state.log.some(l=>l.nodeId==='S_CH06_O1_0104')))&&<AudioClip src="/audio/chair-sample.wav" label="음향실 의자 — 허락받음" transcript="짧은 의자 마찰음 한 번. 사람 목소리와 주변 대화는 없습니다."/>}
        <div className="dialogue-box" hidden={ended}>
          <div className="dialogue-label">{remote?(originalCall?'보관 창고에서 온 전화 · ':'휴게실 전화 · ')+names[speaker!]:recorded&&node?.kind==='speech'?node.label:speaker ? speaker==='P00'?state.playerName:names[speaker] : node?.kind==='speech'?node.label:state.travel?presentation.place:scene.title}</div>
          {node?.kind==='appointment'?<><p className="dialogue-text">{state.travel?'공개 수량 확인이 시작되기 전입니다. 휴게실로 돌아가 봉만실에게 참여를 알릴 수 있습니다.':node.text}</p>{!state.travel&&<Button onClick={()=>dispatch({type:'advance'})}>{node.continueLabel??'봉만실에게 말하고 공개 수량 확인에 참여하기'}</Button>}</>
          : node?.kind==='choice' ? <><p className="dialogue-text">{node.text}</p><div className="choice-list">{node.options.map(o=><Button key={o.value} variant="outline" onClick={()=>dispatch({type:'choose',choice:node.choice,value:o.value})}>{show(o.text)}</Button>)}</div></>
          : node?.kind==='investigation'?<><p className="dialogue-text">{state.travel?'현재 자리에서 다시 이야기하거나 연결된 길로 이동할 수 있습니다.':state.investigation?.task?'작성하던 주장이 남아 있습니다. 필요한 자료를 보고 이어갈 수 있습니다.':state.investigation?.stage==='departure'?'음향 부스에서 소해금과 확인할 약속을 잡았습니다.':'확인할 곳과 따져 볼 주장을 선택하세요.'}</p><div className="choice-list">{options.map(o=><Button key={o.id} variant="outline" onClick={()=>o.kind==='visit'?dispatch({type:'visit',stage:o.id}):dispatch({type:'task',id:o.id})}>{o.label}</Button>)}{state.investigation?.task&&<Button onClick={()=>openTool('deduction')}>작성하던 추리로 돌아가기</Button>}</div></>
          : node?.kind==='evidence' ? <><p className="dialogue-text">{script.evidence[node.evidenceId!].title}</p><Button onClick={()=>inspect('evidence',node.evidenceId!)}>자료 확인하기 <ChevronRight/></Button>{state.acknowledged.includes(node.evidenceId!)&&<Button onClick={()=>dispatch({type:'advance'})}>계속 <ChevronRight/></Button>}</>
          : <><p className={`dialogue-text ${node?.kind==='direction'?'stage-direction':''}`} aria-live="polite">{node?show(node.text):''}</p><div className="dialogue-footer"><span className="save-caption">이 브라우저에 자동 저장</span><Button onClick={()=>dispatch({type:'advance'})}>계속 <ChevronRight aria-hidden/></Button></div></>}
        </div>
        {!state.revisit&&(node?.kind==='investigation'||node?.kind==='appointment'||state.sceneId==='C_PR_16')&&<div className="choice-list">{currentRevisits(state).map(v=><Button key={v.id} variant="outline" onClick={()=>dispatch({type:'revisit',id:v.id})}>{v.label}</Button>)}</div>}
        {(node?.kind==='investigation'||node?.kind==='appointment')&&travelOptions(state).length>0&&<section className="visit-hint" aria-label="현장 이동"><h3>현재 자리에서 이동</h3>{state.travel&&<p>읽던 조사 · {portName(state.travel.anchor)}. 길을 따라 돌아가면 같은 자리에서 이어갑니다.</p>}<div className="choice-list">{travelOptions(state).map(o=><Button key={o.id} variant="outline" onClick={()=>dispatch({type:'move',route:o.id})}>{o.label}</Button>)}</div></section>}
        {!epilogue&&state.investigation?.knowledge.includes('K02')&&!inChapterTwo&&!inChapterThree&&!inChapterFour&&!inChapterFive&&<div className="visit-hint"><Button variant="outline" onClick={()=>dispatch({type:'visitHint',level:0})}>칸막이 시험 기록과 약속 확인</Button></div>}
        {!epilogue&&state.investigation?.knowledge.includes('K05')&&!inChapterThree&&!inChapterFour&&!inChapterFive&&<div className="visit-hint"><Button variant="outline" onClick={()=>dispatch({type:'visitHint',level:0,event:'V02'})}>음향 부스 조사 약속 확인</Button></div>}
        {!epilogue&&state.investigation?.knowledge.includes('K10')&&!inChapterFour&&!inChapterFive&&<div className="visit-hint"><Button variant="outline" onClick={()=>dispatch({type:'visitHint',level:0,event:'V03'})}>화물 호송·입회 개봉 확인</Button></div>}
        {!epilogue&&state.investigation?.knowledge.includes('K15')&&!inChapterFive&&<div className="visit-hint"><Button variant="outline" onClick={()=>dispatch({type:'visitHint',level:0,event:'V04'})}>원본 대조 자리와 준비 자료 확인</Button></div>}
        {!epilogue&&state.investigation?.knowledge.includes('K20')&&!inChapterSix&&<div className="visit-hint"><Button variant="outline" onClick={()=>dispatch({type:'visitHint',level:0,event:'V05'})}>성인 시야 확인의 안전한 다음 단계</Button></div>}
        {!epilogue&&state.investigation?.knowledge.includes('K25')&&<div className="visit-hint"><Button variant="outline" onClick={()=>dispatch({type:'visitHint',level:0,event:'V06'})}>보존된 원본을 확인할 다음 단계</Button></div>}
        {objectiveKnown&&<div className="mobile-objective"><p>{objective}</p><Button onClick={()=>openTool('deduction')}>추리하기 · 여유 {state.points}/6</Button></div>}
        <nav className="tool-bar" aria-label="조사 도구">{tools.map(([id,label,Icon])=><Button key={id} variant="ghost" onClick={()=>openTool(id)}><Icon aria-hidden className="size-5"/><span>{label}</span></Button>)}</nav>
      </section>
      <aside className="companion-panel">
        <div className="companion-heading"><span>{presentation.companion?'함께 있는 사람':'모눈이 있는 곳'}</span><span className="thin-rule"/></div>
        {presentation.companion&&<img src="/art/p01.webp" alt="나모눈" className="companion-portrait"/>}
        <h2>나모눈</h2><p className="companion-relation">{presentation.companion?'조카 · 열한 살':`휴게실에서 ${presentation.caretaker}과 함께 있어요.`}</p>
        {objectiveKnown&&<div className="objective"><p>{objective}</p><Button onClick={()=>openTool('deduction')}>추리하기</Button><p>여유 {state.points} / 6</p></div>}
        <div className="companion-note"><NotebookPen aria-hidden className="size-5"/><h3>내 메모</h3><Textarea aria-label="내 메모" value={state.notes} onChange={e=>dispatch({type:'note',text:e.target.value})} placeholder="생각난 것을 적어 두세요."/></div>
        {saveError&&<p role="alert" className="text-sm">{saveError}</p>}
      </aside>
    </div>}
    <Dialog open={visibleTool!==null} onOpenChange={open=>{if(!open)closeTool();}}>
      <DialogContent showCloseButton={false} className="tool-dialog" style={{'--text-scale':state.textScale} as React.CSSProperties} onEscapeKeyDown={e=>{e.preventDefault();closeTool();}}>
        <div className="flex items-center justify-between gap-4"><DialogTitle className="text-xl">{visibleTool?toolNames[visibleTool]:''}</DialogTitle><Button variant="ghost" onClick={closeTool} aria-label="도구 닫기"><X/></Button></div>
        <DialogDescription className="sr-only">현재까지 확인한 기록과 개인 메모</DialogDescription>
        <nav className="modal-tools" aria-label="다른 조사 도구">{ended&&<Button onClick={()=>openTool('archive')}>보관함</Button>}{state.investigation&&!epilogue&&<Button onClick={()=>openTool('deduction')}>추리</Button>}{tools.map(([id,label,Icon])=><Button key={id} variant={visibleTool===id?'secondary':'ghost'} onClick={()=>openTool(id)}><Icon className="size-4"/>{label}</Button>)}</nav>
        <div className="tool-body" ref={bodyRef} onScroll={e=>{if(state.views?.length)dispatch({type:'viewState',patch:{scroll:e.currentTarget.scrollTop}});}}><Suspense fallback={<p role="status">기록을 열고 있습니다.</p>}>
          {state.investigation&&!epilogue&&<SystemGuide state={state}/>}
          {visibleTool==='archive'&&<ArchivePanel state={state} detail={detail} dispatch={dispatch}/>}
          {visibleTool==='archive'&&ended&&<SchoolAudio state={state}/>}
          {visibleTool==='settings'&&<section className="space-y-3"><Label>음향 크기 · {Math.round((state.audioVolume??.7)*100)}%</Label><Slider min={0} max={1} step={.05} value={[state.audioVolume??.7]} onValueChange={v=>dispatch({type:'audioVolume',value:v[0]})} aria-label="음향 크기"/><Button variant="outline" onClick={()=>dispatch({type:'audioVolume',value:state.audioVolume===0?.7:0})}>{state.audioVolume===0?'음향 켜기':'음소거'}</Button><p>음향은 재생을 선택할 때만 나옵니다. 소리 없이 자막으로도 비교할 수 있습니다.</p></section>}
          {visibleTool==='deduction'&&<ChallengePanel state={state} dispatch={dispatch}/>}
          {visibleTool==='hint'&&state.investigation?.hintId&&<div className="hint-page"><p>{show(script.utterances[state.investigation.hintId].text)}</p>{/^S_H_V0[123456]_/.test(state.investigation.hintId)&&<div className="hint-controls">{[0,1,2,3,4].map(level=><Button key={level} variant="outline" onClick={()=>dispatch({type:'visitHint',level,event:state.investigation!.hintId!.startsWith('S_H_V06')?'V06':state.investigation!.hintId!.startsWith('S_H_V05')?'V05':state.investigation!.hintId!.startsWith('S_H_V04')?'V04':state.investigation!.hintId!.startsWith('S_H_V03')?'V03':state.investigation!.hintId!.startsWith('S_H_V02')?'V02':'V01'})}>{['조사할 곳','눈여겨볼 점','비교할 자료','연결 방법','해답과 이유'][level]}</Button>)}</div>}<Button onClick={closeTool}>읽던 답안으로 돌아가기</Button></div>}
          {visibleTool==='notes'&&<><Label htmlFor="modal-notes">내 메모</Label><Textarea id="modal-notes" value={state.notes} onChange={e=>dispatch({type:'note',text:e.target.value})} className="min-h-64 mt-3"/></>}
          {visibleTool==='settings'&&<div className="settings-body"><Label>글자 크기 · {Math.round(state.textScale*100)}%</Label><Slider value={[state.textScale]} min={1} max={2} step={.1} onValueChange={v=>dispatch({type:'textScale',value:v[0]})} aria-label="글자 크기"/><p>읽던 위치와 메모는 이 브라우저에 자동 저장됩니다.</p>{state.started&&<><Button onClick={manualSave}>지금 저장하기</Button><p role="status">{saveNotice}</p><Button variant="outline" onClick={startNew}>새 슬롯에서 처음부터</Button><p>현재 플레이와 엔딩 저장은 별도 슬롯에 보존됩니다.</p></>}<div className="save-slots"><h3>보관한 플레이</h3>{slots.filter(s=>s.state).map((s,index)=><Button variant="outline" key={s.id} onClick={()=>loadSlot(s.id)}>{index+1}. {s.state!.playerName} · {archiveComplete(s.state!)?'엔딩':script.scenes[s.state!.sceneId].title}</Button>)}</div>{saveError&&<p role="alert">{saveError}</p>}</div>}
          {visibleTool==='evidence'&&(detail&&evidence&&state.evidence.includes(detail)?<article><Button variant="ghost" onClick={closeTool}>이전 화면으로</Button><EvidenceView id={detail} name={state.playerName} edges={edgesKnown} originalReadable={originalReadable} unfolded={state.log.some(l=>l.nodeId==='C_CH02_01:n0024')} zoom={view?.zoom??1} onZoom={zoom=>dispatch({type:'viewState',patch:{zoom}})}/>{!state.acknowledged.includes(detail)&&<Button onClick={()=>{dispatch({type:'acknowledge',id:detail});if(state.views?.length)dispatch({type:'viewBack'});}}>확인했어요</Button>}</article>:<EvidenceList state={state} view={view!} patch={patch=>dispatch({type:'viewState',patch})} inspect={id=>inspect('evidence',id)}/>)}
          {visibleTool==='people'&&<PeoplePanel expanded={view?.expanded} patch={patch=>dispatch({type:'viewState',patch})} state={state} detail={detail} inspect={inspect}/>}
          {visibleTool==='evidence'&&detail&&state.evidence.includes(detail)&&<EvidenceContext id={detail} state={state} inspect={inspect}/>}
          {visibleTool==='evidence'&&detail&&state.evidence.includes(detail)&&<Button variant="outline" onClick={()=>inspect('history',script.evidence[detail].scene)}>이 자료를 확인한 장면 보기</Button>}
          {visibleTool==='map'&&<MapPanel state={state} dispatch={dispatch}/>}
          {visibleTool==='history'&&<HistoryPanel filters={view?.historyFilters} onFilters={historyFilters=>dispatch({type:'viewState',patch:{historyFilters,scroll:0}})} replayIndex={view?.replayIndex} onReplay={replayIndex=>dispatch({type:'viewState',patch:{replayIndex}})} state={state} detail={detail} inspect={inspect} search={search} onSearch={setSearch}/>}
        </Suspense></div>
      </DialogContent>
    </Dialog>
  </main></AudioVolume.Provider>;
}

function SchoolAudio({state}:{state:GameState}){
  const voices=state.choices.B_SOUND==='consented_voices';
  return <AudioClip src={voices?'/audio/school-voice.wav':'/audio/school-environment.wav'} label="모눈의 학교 과제 파일" transcript={voices?script.utterances.S_EP_04_0302.text:'환풍기의 낮은 바람 소리 · 빈 의자를 한 번 미는 소리 · 우산 끝 물방울 세 번. 사람 목소리는 없습니다.'}/>;
}
