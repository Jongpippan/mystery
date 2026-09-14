export function CartGeometry(){
 return <figure className="cargo-geometry"><svg viewBox="0 0 640 310" role="img" aria-label="수레 폭 0.72미터, 계단 회전부 개구 0.70미터. 수레 통째로의 통과와 따로 들고 지나는 가능성은 다릅니다.">
  <path d="M110 55V255M530 55V255" stroke="#82927c" strokeWidth="2" strokeDasharray="5 6"/>
  <rect x="104" y="65" width="432" height="65" rx="4" fill="#ad8c55" stroke="#453e31" strokeWidth="3"/>
  <rect x="110" y="180" width="420" height="65" rx="4" fill="#d4dbc9" stroke="#496453" strokeWidth="3"/>
  <text x="320" y="105" textAnchor="middle">수레 폭 0.72m</text><text x="320" y="220" textAnchor="middle">계단 회전부 개구 0.70m</text>
 </svg><figcaption>실측 폭 비교 · 수레 0.72m / 개구 0.70m · 물건을 따로 들고 지나는 가능성은 남습니다.</figcaption><ol><li>적재·기록 데스크</li><li>동쪽 덮인 경사로 입구</li><li>호숫가 보관 창고 방향 바퀴 흔적</li></ol></figure>;
}
export function CargoBox({opened=false,cut=false}:{opened?:boolean;cut?:boolean}){
 return <figure className="cargo-box" data-cargo={opened?'contents':cut?'cut':'sealed'}><svg viewBox="0 0 620 340" role="img" aria-label={opened?'입회 개봉한 상자. 묶인 장부가 안에 있고 공연용 다리 두 개는 상자 옆에 있다.':cut?'입회자가 봉인을 끊고 뚜껑을 여는 중. 내용 관찰은 아직 기록하지 않았다.':'입회 개봉 전 불투명 상자. 상자 외관과 봉인 번호만 대조한다.'}>
  <rect x="65" y="110" width="350" height="170" rx="4" fill="#b09161" stroke="#4b4538" strokeWidth="5"/>
  {opened?<><path d="M65 110L100 40H450L415 110Z" fill="#c6b083" stroke="#4b4538" strokeWidth="4"/><rect x="89" y="131" width="300" height="85" rx="3" fill="#d9d0b4" stroke="#54695a" strokeWidth="3"/><path d="M100 148H375M100 161H375M100 174H375" stroke="#a7a083" strokeWidth="2"/><path d="M235 132V218" stroke="#6a7459" strokeWidth="7"/><text x="239" y="253" textAnchor="middle">묶인 장부</text><path d="M459 107H484V235H519V263H451Z M533 107H558V235H592V263H525Z" fill="#655b46" stroke="#403d34" strokeWidth="3"/><text x="520" y="299" textAnchor="middle">공연용 다리 2개</text></>:<><path d="M65 110L96 72H446L415 110Z" fill="#c6b083" stroke="#4b4538" strokeWidth="4"/><path d="M225 80V153" stroke="#e5d9af" strokeWidth="22"/>{cut&&<path d="M207 108L242 119" stroke="#584937" strokeWidth="6"/>}<text x="240" y="206" textAnchor="middle">{cut?'입회 개봉 중':'봉인 번호 · 외관 대조'}</text></>}
 </svg><figcaption>{opened?'상자 안에는 묶인 장부, 상자 옆에는 공연용 다리 2개. 입회: 진새벽·목백로·배한술.':'개봉 전 확인은 상자 외부에 한정됩니다.'}</figcaption></figure>;
}
export function BoundOriginal(){return <figure className="bound-original"><div className="bound-book"><span className="binding-stitch" aria-hidden>┆<br/>┆<br/>┆</span><div className="folded-leaf"><strong>젖어 붙은 접힌 본장</strong><span>안쪽 면 미개봉 · 시각 읽을 수 없음</span></div></div><figcaption>같은 장부의 제본 유지 · 장을 떼지 않고 책째로 받쳐 보호 · 입회 아래 보관</figcaption></figure>;}
