import {script} from '@/lib/game/script';

export function SoundRoutes({mode}:{mode:'input'|'file'}) {
  return <figure className="sound-routes" aria-label="현재 기능 시연의 입력과 출력">
    <p className="sound-kicker">10월 22일 · 기능 확인</p>
    <div className={mode==='input'?'route-active':''}><span>마이크 입력</span><b>{mode==='input'?'입력 표시등 켜짐':'입력 없음'}</b></div>
    <div className={mode==='file'?'route-active':''}><span>로컬 플레이어</span><b>{mode==='file'?'딸깍 시험 파일 → 탁상 스피커':'재생 없음'}</b></div>
    <div><span>연회장 외부 출력</span><b>닫힘</b></div>
    <figcaption>지금의 기능 확인 · 전날 사용한 경로를 확정하는 기록은 아닙니다.</figcaption>
  </figure>;
}
export function SoundComparison({compare=false}:{compare?:boolean}) {
  const labels=compare?['18:10 리허설 원본','20:30 현장 출력 기록']:['18:10 리허설 원본'];
  return <figure className="sound-comparison">
    <figcaption>소리 위치 자막 · 발화 순서에 맞춘 표시</figcaption>
    <p className="source-caption">자막 안에서 좌우로 이동해 같은 위치를 비교할 수 있습니다.</p>
    <div className="sound-tracks" tabIndex={0} aria-label="음절과 비언어음 비교. 좌우로 이동할 수 있습니다.">
      {labels.map(label=><div className="sound-track" key={label}><strong>{label}</strong><div className="sound-segments"><span>의</span><span className="sound-overlap">자<small>끼익 · 겹침</small></span><span>부터 좀…</span><span className="sound-pause">끊김</span><span>다시 하겠습니다.</span></div></div>)}
    </div>
    <blockquote>{script.utterances.S_CH02_02_0007.text}</blockquote>
    <p className="source-caption">음성 재생 없이도 겹침과 중단 위치를 비교할 수 있는 자막입니다. 칸 너비는 실제 시간 길이를 나타내지 않습니다.</p>
  </figure>;
}
