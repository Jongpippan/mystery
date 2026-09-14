import {script} from '@/lib/game/script';

export function PurposeEnvelopes({held,sorted=false}:{held:string[];sorted?:boolean}){
 return <figure className="purpose-envelopes"><figcaption>{sorted?'정정 뒤 다시 나눈 봉투':'원본 대조 자리에 가져온 봉투'}</figcaption><div>{['E31','E32','E33','E34'].map((id,n)=><section key={id} data-paper={id} className={held.includes(id)?'envelope-read':'envelope-closed'}><span aria-hidden className="envelope-flap"/><strong>{held.includes(id)?script.evidence[id].title:`아직 열지 않은 봉투 ${n+1}`}</strong>{sorted&&<small>{['운영자금 대출','두 번째 담보','문제가 된 포기 취합본','외부 보관 동의'][n]}</small>}</section>)}</div></figure>;
}

export function PageConnections(){
 return <figure className="page-connections"><figcaption>원래 연결과 다시 붙인 연결</figcaption><div className="page-pair">
  <section><h4>직원들이 보관한 외부 보관 동의서</h4><div className="page-edge original-edge"><span>원래 목적 페이지</span><span>서명 페이지</span></div><p>반달 모양 눌림과 가장자리가 이어집니다.<br/>쪽 순서와 서명 순서가 연속됩니다.</p></section>
  <section><h4>정산금 포기 취합본</h4><div className="page-edge attached-edge"><span>포기 문구 표지</span><span>다시 붙인 서명지</span></div><p>떼었다 붙인 흔적이 있습니다.<br/>표지와 서명지의 쪽번호가 맞지 않습니다.</p></section>
 </div><p className="custody-caption">젖은 장부는 호숫가 보관 창고에 그대로 있습니다. 여기서는 진새벽의 입회 촬영·필사 기록과 보호 슬리브에 넣은 원본을 대조합니다.</p></figure>;
}

export function PaperSources({id}:{id:string}){
 if(['E31','E32','E33','E34'].includes(id))return <div className={`paper-origin paper-origin-${id}`}><strong>{({E31:'봉만실의 대출 승인 문서',E32:'배한술의 별도 담보 문서',E33:'취합본의 목적 표지와 서명지',E34:'직원들이 각자 보관한 원래 동의서'} as Record<string,string>)[id]}</strong><p>아래 목적 문장과 서명 권한을 함께 확인하세요.</p></div>;
 if(id==='E35')return <figure className="transaction-sources"><figcaption>같이 가져온 자료 · 서로 다른 출처</figcaption><div>
  <section><h4>은행 명세</h4><p>직원 정산 계정 → 해담설비</p><dl><div><dt>출금</dt><dd>18,400,000원</dd></div><div><dt>출금</dt><dd>7,600,000원</dd></div></dl><small>봉만실이 보관한 은행 명세 사본</small></section>
  <section><h4>거래처 등록</h4><p>해담설비의 연락처·계좌</p><small>차무록이 제출한 등록 · 제출자와 실제 수령 확인을 구분할 것</small></section>
  <section><h4>공사 장부</h4><p>같은 금액·같은 기간에<br/>해당 공사 없음</p><small>탁두철이 관리한 공사 원본</small></section>
 </div></figure>;
 if(id==='E37')return <figure className="notice-packet"><figcaption>표문식의 통지와 첨부 수령 확인</figcaption><div><section><h4>봉만실 앞으로 보낸 통지</h4><p>22일 아침 · 직원 동의 원본과 공사 실적 원본 확인</p></section><section><h4>같은 통지에 붙은 수령 확인</h4><p>해담설비 · 수령 확인 명의: 차무록</p></section></div><p>통지와 첨부는 한 패킷입니다. 서로 독립된 두 통지로 세지 않습니다.</p></figure>;
 return null;
}
