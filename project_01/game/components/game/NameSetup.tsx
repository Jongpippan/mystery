'use client';
import {useEffect,useReducer,useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {initialNameSetup,nameReducer} from '@/lib/game/name-setup';
import {readNameSetup,saveNameSetup} from '@/lib/game/save-store';
import {displayText,script} from '@/lib/game/script';
export function NameSetup({ready,onStart}:{ready:boolean;onStart:(name:string,heard:string[])=>void}){
  const [loaded,setLoaded]=useState(false),[error,setError]=useState('');
  const [state,dispatch]=useReducer((s:typeof initialNameSetup,a:Parameters<typeof nameReducer>[1]|{type:'restore';state:typeof initialNameSetup})=>a.type==='restore'?a.state:nameReducer(s,a),initialNameSetup);
  useEffect(()=>{queueMicrotask(()=>{try{dispatch({type:'restore',state:readNameSetup(localStorage)});}catch{setError('이름 입력을 불러오지 못했습니다. 다시 입력할 수 있습니다.');}setLoaded(true);});},[]);
  useEffect(()=>{if(!loaded)return;try{saveNameSetup(localStorage,state);}catch{queueMicrotask(()=>setError('이름 입력을 저장하지 못했습니다.'));}},[state,loaded]);
  return <section className="space-y-4" aria-label="기록에 남길 이름 확인">
    {state.lines.map(id=>{const n=script.utterances[`S_SYS_04_${id}`];return <p key={id}><strong>{n.speaker==='P01'?'나모눈':'나여백'}</strong> · {displayText(n.text,state.confirmed||'나여백')}</p>;})}
    {state.phase==='initial'&&<><p>기본 이름 · 나여백. 표시 이름을 바꾸어도 인물 관계와 설정은 그대로입니다.</p><div className="choice-list"><Button disabled={!ready} onClick={()=>dispatch({type:'default'})}>나여백으로 시작</Button><Button variant="outline" disabled={!ready} onClick={()=>dispatch({type:'manual'})}>직접 입력</Button></div></>}
    {state.phase==='editing'&&<form onSubmit={e=>{e.preventDefault();dispatch({type:'check'});}} className="space-y-3"><Label htmlFor="player-name">기록에 남길 이름 · 20자 이내</Label><Input id="player-name" value={state.draft} onChange={e=>dispatch({type:'edit',value:e.target.value})} autoComplete="off" className="bg-black/20 border-white/30 text-white"/><div className="choice-list"><Button type="submit">입력한 이름 확인</Button><Button type="button" variant="outline" onClick={()=>dispatch({type:'default'})}>나여백으로 시작</Button></div></form>}
    {state.phase==='confirm'&&<><p>이 이름으로 기록할까요? <strong>{state.confirmed}</strong></p><div className="choice-list"><Button onClick={()=>dispatch({type:'confirm'})}>이 이름으로 시작</Button><Button variant="outline" onClick={()=>dispatch({type:'back'})}>다시 입력</Button></div></>}
    {state.phase==='ready'&&<Button disabled={!ready} onClick={()=>onStart(state.confirmed,state.heard.map(id=>`S_SYS_04_${id}`))}>여울관 들어가기</Button>}
    {error&&<p role="alert">{error}</p>}
  </section>;
}
