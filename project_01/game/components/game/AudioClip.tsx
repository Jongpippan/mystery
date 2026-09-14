'use client';
import {createContext,useContext,useEffect,useRef} from 'react';
export const AudioVolume=createContext(.7);
export function AudioClip({src,label,transcript}:{src:string;label:string;transcript:string}){
  const ref=useRef<HTMLAudioElement>(null),volume=useContext(AudioVolume);
  useEffect(()=>{if(ref.current)ref.current.volume=volume;},[volume]);
  useEffect(()=>{const player=ref.current;return ()=>{player?.pause();};},[]);
  return <section className="space-y-2 my-3" aria-label={label}><h4>{label}</h4><audio ref={ref} controls preload="none" className="w-full min-h-14" aria-label={`${label} 재생`} onPlay={()=>{document.querySelectorAll('audio').forEach(a=>{if(a!==ref.current)a.pause();});}}><source src={src} type="audio/wav"/>이 브라우저에서는 음향을 재생할 수 없습니다.</audio><p className="source-caption">{transcript}</p></section>;
}
