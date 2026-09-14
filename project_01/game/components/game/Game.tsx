'use client';

import { useEffect, useReducer, useState } from 'react';
import { BookOpen, ChevronRight, FileText, Map, MessageCircle, NotebookPen, Settings, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { currentNode, gameReducer, initialState, isSave, type GameState } from '@/lib/game/state';
import { displayText, script } from '@/lib/game/script';
import { prologuePresentation } from '@/lib/game/prologue';

const SAVE_KEY='yeowul-save-v1';
const names:Record<string,string>={P00:'나여백',P01:'나모눈',P02:'봉만실',P03:'차무록',P04:'탁두철',P05:'소해금',P06:'배한술',P07:'진새벽',P08:'표문식',P09:'목백로'};
const tools=[['evidence','증거',FileText],['people','인물',Users],['map','지도',Map],['history','대화',MessageCircle],['notes','메모',NotebookPen],['settings','설정',Settings]] as const;
type Tool=(typeof tools)[number][0];
const toolNames=Object.fromEntries(tools.map(([id,label])=>[id,label]));

export function Game() {
  const [state,dispatch]=useReducer(gameReducer,initialState);
  const [ready,setReady]=useState(false);
  const [stored,setStored]=useState<GameState|null>(null);
  const [name,setName]=useState('나여백');
  const [saveError,setSaveError]=useState('');
  const [tool,setTool]=useState<Tool|null>(null);
  const [detail,setDetail]=useState<string|null>(null);
  const [search,setSearch]=useState('');
  useEffect(()=>{
    queueMicrotask(()=>{
      try {const raw=localStorage.getItem(SAVE_KEY);if(raw){const value=JSON.parse(raw);if(isSave(value)) setStored(value);else setSaveError('저장한 기록을 읽을 수 없습니다. 새로 시작하기 전에 보관한 기록을 확인해 주세요.');}}
      catch {setSaveError('이 브라우저에서 저장 기록을 읽지 못했습니다.');}
      setReady(true);
    });
  },[]);
  useEffect(()=>{
    if(!ready||!state.started)return;
    try{localStorage.setItem(SAVE_KEY,JSON.stringify({...state,savedAt:new Date().toISOString()}));}
    catch{queueMicrotask(()=>setSaveError('저장 공간에 기록하지 못했습니다. 브라우저의 저장 공간을 확인해 주세요.'));}
  },[state,ready]);
  const node=currentNode(state);
  const scene=script.scenes[state.sceneId];
  const presentation=prologuePresentation(state);
  const show=(text:string)=>displayText(text,state.playerName);
  const speaker=node?.kind==='speech' ? node.speaker : null;
  const activeEvidence=node?.kind==='evidence' ? node.evidenceId ?? null : null;
  const acquisitionOpen=!!activeEvidence&&!state.acknowledged.includes(activeEvidence);
  const visibleTool=tool??(acquisitionOpen?'evidence':null);
  const evidenceId=detail??activeEvidence;
  const evidence=evidenceId?script.evidence[evidenceId]:null;
  const openTool=(next:Tool)=>{setTool(next);setDetail(null);};
  const closeTool=()=>{if(acquisitionOpen&&activeEvidence) dispatch({type:'acknowledge',id:activeEvidence});setTool(null);setDetail(null);};
  const portrait=speaker==='P00'?'/art/p00.png':speaker==='P01'?'/art/p01.png':null;
  const acquired=state.evidence.map(id=>script.evidence[id]).filter(e=>e.title.includes(search)||e.text.includes(search));
  return <main className="game-root" style={{'--text-scale':state.textScale} as React.CSSProperties}>
    <header className="game-header">
      <div className="flex items-center gap-3"><BookOpen aria-hidden className="size-5 text-[#d1ae73]"/><span className="game-wordmark">여울관 <span>남겨 둔 자리</span></span></div>
      <span className="chapter-label">프롤로그 · 도착한 사람들</span>
      <Button variant="ghost" onClick={()=>openTool('settings')} aria-label="설정 열기"><Settings className="size-5"/></Button>
    </header>
    {!state.started ? <section className="start-screen" style={{backgroundImage:'linear-gradient(90deg,rgba(9,28,29,.94),rgba(9,28,29,.25)),url(/art/l01.png)'}}>
      <div className="start-copy"><p className="eyebrow">여울관</p><h1>남겨 둔 자리</h1><form onSubmit={e=>{e.preventDefault();dispatch({type:'start',name});}} className="start-form">
        <Label htmlFor="player-name">기록에 남길 이름</Label><Input id="player-name" value={name} onChange={e=>setName(e.target.value)} maxLength={20} autoComplete="off" className="bg-black/20 border-white/30 text-white"/>
        <Button type="submit" size="lg" disabled={!ready}>처음부터 <ChevronRight aria-hidden/></Button>
        {stored&&<Button type="button" variant="outline" size="lg" onClick={()=>dispatch({type:'restore',state:stored})}>읽던 자리에서 이어하기</Button>}
      </form>{saveError&&<p role="alert">{saveError}</p>}</div>
    </section> : <div className="play-layout">
      <section className="scene-column" aria-label="현재 장면">
        <div className="scene-stage" style={state.sceneId==='C_PR_01'||state.sceneId==='C_PR_02'?{backgroundImage:'url(/art/l01.png)'}:undefined}>
          <div className="place-strip"><span>{presentation.place}</span><span>{presentation.time}</span></div>
          {portrait&&<img className="dialogue-portrait" src={portrait} alt={speaker==='P00'?state.playerName:'나모눈'}/>}
          <div className="scene-vignette"/>
        </div>
        <div className="dialogue-box">
          <div className="dialogue-label">{speaker ? speaker==='P00'?state.playerName:names[speaker] : node?.kind==='speech'?node.label:scene.title}</div>
          {node?.kind==='choice' ? <><p className="dialogue-text">{node.text}</p><div className="choice-list">{node.options.map(o=><Button key={o.value} variant="outline" onClick={()=>dispatch({type:'choose',choice:node.choice,value:o.value})}>{show(o.text)}</Button>)}</div></>
          : node?.kind==='evidence' && evidence ? <><p className="dialogue-text">{evidence.title}</p><Button onClick={()=>{setTool('evidence');setDetail(evidence.id);}}>자료 확인하기 <ChevronRight/></Button>{state.acknowledged.includes(evidence.id)&&<Button onClick={()=>dispatch({type:'advance'})}>계속 <ChevronRight/></Button>}</>
          : <><p className={`dialogue-text ${node?.kind==='direction'?'stage-direction':''}`} aria-live="polite">{node?show(node.text):''}</p><div className="dialogue-footer"><span className="save-caption">이 브라우저에 자동 저장</span><Button onClick={()=>dispatch({type:'advance'})}>계속 <ChevronRight aria-hidden/></Button></div></>}
        </div>
        <nav className="tool-bar" aria-label="조사 도구">{tools.map(([id,label,Icon])=><Button key={id} variant="ghost" onClick={()=>openTool(id)}><Icon aria-hidden className="size-5"/><span>{label}</span></Button>)}</nav>
      </section>
      <aside className="companion-panel">
        <div className="companion-heading"><span>{presentation.companion?'함께 있는 사람':'모눈이 있는 곳'}</span><span className="thin-rule"/></div>
        {presentation.companion&&<img src="/art/p01.png" alt="나모눈" className="companion-portrait"/>}
        <h2>나모눈</h2><p className="companion-relation">{presentation.companion?'조카 · 열한 살':'휴게실에서 봉만실과 함께 있어요.'}</p>
        <div className="companion-note"><NotebookPen aria-hidden className="size-5"/><h3>내 메모</h3><Textarea aria-label="내 메모" value={state.notes} onChange={e=>dispatch({type:'note',text:e.target.value})} placeholder="생각난 것을 적어 두세요."/></div>
        {saveError&&<p role="alert" className="text-sm">{saveError}</p>}
      </aside>
    </div>}
    <Dialog open={visibleTool!==null} onOpenChange={open=>{if(!open)closeTool();}}>
      <DialogContent showCloseButton={false} className="tool-dialog">
        <div className="flex items-center justify-between gap-4"><DialogTitle className="text-xl">{visibleTool?toolNames[visibleTool]:''}</DialogTitle><Button variant="ghost" onClick={closeTool} aria-label="도구 닫기"><X/></Button></div>
        <DialogDescription className="sr-only">현재까지 확인한 기록과 개인 메모</DialogDescription>
        <nav className="modal-tools" aria-label="다른 조사 도구">{tools.map(([id,label,Icon])=><Button key={id} variant={visibleTool===id?'secondary':'ghost'} onClick={()=>openTool(id)}><Icon className="size-4"/>{label}</Button>)}</nav>
        <div className="tool-body">
          {visibleTool==='notes'&&<><Label htmlFor="modal-notes">내 메모</Label><Textarea id="modal-notes" value={state.notes} onChange={e=>dispatch({type:'note',text:e.target.value})} className="min-h-64 mt-3"/></>}
          {visibleTool==='settings'&&<div className="settings-body"><Label>글자 크기 · {Math.round(state.textScale*100)}%</Label><Slider value={[state.textScale]} min={1} max={2} step={.1} onValueChange={v=>dispatch({type:'textScale',value:v[0]})} aria-label="글자 크기"/><p>읽던 위치와 메모는 이 브라우저에 저장됩니다.</p></div>}
          {visibleTool==='evidence'&&((detail||acquisitionOpen)&&evidence ? <article><Button variant="ghost" onClick={()=>setDetail(null)}>증거 목록으로</Button><h3 className="detail-title">{evidence.title}</h3><div className="document-original">{show(evidence.text)}</div>{activeEvidence===evidence.id&&!state.acknowledged.includes(evidence.id)&&<Button onClick={()=>{dispatch({type:'acknowledge',id:evidence.id});setTool(null);setDetail(null);}}>확인했어요</Button>}</article>:<><Input aria-label="증거 검색" placeholder="기록에서 찾기" value={search} onChange={e=>setSearch(e.target.value)}/>{acquired.length ? <div className="evidence-list">{acquired.map(e=><button key={e.id} onClick={()=>setDetail(e.id)}><FileText/><span>{e.title}</span><ChevronRight/></button>)}</div>:<p className="empty-note">아직 받은 자료가 없습니다.</p>}</>)}
          {visibleTool==='people'&&<div className="people-list">{state.met.map(id=><article key={id}>{(id==='P00'||id==='P01')&&<img src={id==='P00'?'/art/p00.png':'/art/p01.png'} alt=""/>}<h3>{id==='P00'?state.playerName:names[id]}</h3><p>{id==='P00'?'기록 정리를 맡아 여울관에 온 사람':id==='P01'?'함께 온 조카':id==='P02'?'여울관 주인':''}</p></article>)}</div>}
          {visibleTool==='map'&&<><h3 className="detail-title">여울관 안내도</h3>{state.evidence.includes('E03')?<div className="document-original">{show(script.evidence.E03.text)}</div>:<p className="empty-note">안내도를 받으면 여기서 다시 볼 수 있습니다.</p>}</>}
          {visibleTool==='history'&&<div className="history-log">{state.log.map((item,index)=>{const n=script.scenes[item.sceneId].nodes.find(n=>n.id===item.nodeId);if(!n||n.kind==='evidence')return null;return <p key={item.nodeId+index} className={n.kind==='direction'?'stage-direction':''}>{n.kind==='speech'&&<strong>{n.speaker==='P00'?state.playerName:names[n.speaker??'']} </strong>}{show(n.text)}</p>;})}</div>}
        </div>
      </DialogContent>
    </Dialog>
  </main>;
}
