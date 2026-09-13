# CH04 — 서명하지 않은 약속

- Packet: `YEOWUL-FULL-v3`
- Revision: `r03`
- Status: `draft`
- Coverage: complete CH04 assignment — `C_CH04_01..08`, `C_CH04_O1..O3`, `C_D16..D20`, `C_Q04`, `C_H_D16..D20`, `C_H_Q04`, `C_H_V04`
- Preceding continuity: focused CH03 r03 with K15, the settled `원본 대조 자리`, V04 invitation, and the bound wet original remaining in L12 custody

## C_CH04_01 — 한 의자에 모두 앉히지 않기

### Context
- Place: L02
- Cast: P00, P02, P06
- Entry: K15 / V04 appointment; C_CH03_08 already renamed the shared table `원본 대조 자리` and removed the representative-chair label.
- Exit: the settled table naming is preserved; staff originals are physically present but not yet interpreted
- World effects: V04 begins; no K
- Supervision: P01 remains at the same L02 meal nook under P02 direct supervision; she does not handle the financial originals
- Repeat/resume: if the appointment was postponed, reopen with the unopened envelope; do not recreate the discarded representative-chair dispute, and do not reacquire already-read originals

### Script
*전날 모눈이 붙여 둔 `원본 대조 자리` 쪽지가 휴게실 긴 테이블 모서리에 그대로 남아 있다. 봉만실은 맨 앞 의자를 당기다가 멈추고, 네 봉투를 가져온 사람 쪽에 하나씩 나눠 놓는다.*

**P02 | 봉만실 [S_CH04_01_0001]**

어제 제가 `대표석`이라고 붙였다가 바로 떼었죠. 오늘은 그 이름 다시 안 붙일게요. 가져온 봉투는 각자 앞에 놓고 봅시다.

**P06 | 배한술 [S_CH04_01_0002]**

좋아요. 제 서명은 제가 설명하고, 다른 사람 동의까지 제 입으로 대신 만들지 않을게요.

**P00 | 나여백 [S_CH04_01_0003]**

어제 정한 대로 여기는 `원본 대조 자리`입니다. 대표 한 사람의 기억이 아니라, 각 종이가 실제로 무엇을 허락했다고 쓰는지 하나씩 보겠습니다.

**P02 | 봉만실 [S_CH04_01_0004]**

내가 승인한 대출 문서도 숨기지 않을게요. 대신 그게 직원들이 돈을 포기한 거랑 같은 말은 아니라고 생각해요.

**P06 | 배한술 [S_CH04_01_0005]**

저도 제가 잡은 두 번째 담보 문서를 냅니다. 좋은 의도였다는 말부터 하지 않을게요.

*여백이 네 봉투 아래에 `목적 문구 먼저`라고 작은 보류 쪽지를 넣는다.*

**P02 | 봉만실 [S_CH04_01_0006]**

컵도 아닌데 또 종이를 받침으로 써요?

**P00 | 나여백 [S_CH04_01_0007]**

아직 정리 중이라는 표시입니다. 끝나면 떼겠습니다.

**P06 | 배한술 [S_CH04_01_0008]**

그럼 이번에는 진짜 끝날 때 떼세요.

---

## C_H_V04 — V04 직원 원본 모임 힌트

### Context
- Place: L02 / help overlay
- Cast: P00 guidance
- Entry: V04 eligible or interrupted
- Exit: returns to the exact missing staff-original or transaction request
- State keys: appointment-not-joined / missing-E31-E34 / all-originals-held / missing-E35-E37 / interrupted / completed

#### Deterministic selector (normative)
- Return exactly one Korean S line. Priority: `V04 purpose/transaction acquisition complete` → `missing current acquisition prerequisite` → interrupted stage → requested held-state level. A higher requested level never skips an unopened original or an uncollected transaction packet.
- Before joining the appointment, any H0–H4 request → `S_H_V04_0001`.
- After joining, if any E31–E34 purpose original is missing, any H0–H4 → `S_H_V04_0002`.
- With E31–E34 held but staff-scope comparison not yet complete: H0 `S_H_V04_0003`; H1 `S_H_V04_0011`; H2 `S_H_V04_0021`; H3 `S_H_V04_0031`; H4 `S_H_V04_0041`. If interrupted while reading purpose clauses, any H1–H4 request may select `S_H_V04_0041`.
- After staff scope is settled, if the later transaction packet E35/E37 is the missing next acquisition, any H0–H4 → `S_H_V04_0032`.
- After the V04 acquisition chain has opened all required purpose/transaction material, any H0–H4 → `S_H_V04_0091`.
- The selector returns one line only; it never concatenates `purpose original missing` with `transaction packet missing`.

### H_V04_0
**P00 | 나여백 [S_H_V04_0001]**

직원 원본 모임에 아직 들어가지 않았다면 휴게실의 만실 씨와 한술 씨에게 갑니다. 모임이 이미 시작됐다면 처음 안 연 봉투부터 이어 봅니다.

#### State — purpose original missing
**P00 | 나여백 [S_H_V04_0002]**

대출 승인서, 두 번째 담보, 문제의 포기 취합본, 실제 서명 안내문 중 빠진 봉투가 있습니다. 새 추론보다 그 원본 목적 문구를 먼저 확인하겠습니다.

#### State — all E31..E34 held
**P00 | 나여백 [S_H_V04_0003]**

네 목적 문구를 모두 봤습니다. 이제 이름이 아니라 `무엇을 허락했는지`를 네 칸으로 나눌 수 있습니다.

### H_V04_1
**P00 | 나여백 [S_H_V04_0011]**

서명 모양을 먼저 판단하지 말고, 각 문서의 `무엇에 동의한다`는 문장을 소리 내어 비교해 봅시다.

### H_V04_2
**P00 | 나여백 [S_H_V04_0021]**

대출, 두 번째 담보, 수령 포기 주장, 외부 보관 동의는 같은 `정산금`을 말해도 권한이 서로 다릅니다.

### H_V04_3
**P00 | 나여백 [S_H_V04_0031]**

직원 문서의 범위를 정리한 뒤 실제 돈의 이동이 필요하면 새벽 경위에게 은행·거래처·공사 기록과 문식 씨의 차이 통지 패킷을 요청합니다.

#### State — transaction packet missing after staff scope work
**P00 | 나여백 [S_H_V04_0032]**

직원 동의 범위는 정리했습니다. 다음은 `돈이 어디로 갔는지`입니다. 현관에서 새벽 경위가 준비한 거래 기록을 확인하면 됩니다.

### H_V04_4
**P00 | 나여백 [S_H_V04_0041]**

지금 빠진 것이 직원 원본이면 그 봉투, 돈의 이동이면 거래 기록으로 갑니다. 이미 확인한 자료를 다시 얻을 필요는 없습니다. 중간에 멈췄다면 마지막으로 읽은 목적 문구 다음부터 잇겠습니다.

#### State — completed
**P00 | 나여백 [S_H_V04_0091]**

직원 원본 모임에서 필요한 목적·거래 자료는 모두 열렸습니다. 현재 진행 중인 D/Q를 그대로 이어 가면 됩니다.

## C_CH04_02 — 같은 서명, 다른 문장

### Context
- Place: L02
- Cast: P00, P02, P06
- Entry: V04
- Exit: E31/E32/E33/E34 acquired; sole S_Q04_v1 defined; chapter objective opens
- World effects: D16 eligible
- Supervision: P01 stays in the same L02 meal nook under P02; P00 can see both the table and the nook
- Repeat/resume: resume at the first unread purpose clause; S_Q04_v1 is not repeated after its historical capture

### Script

*여백은 봉투를 하나씩 열어 목적 문구만 큰 소리로 읽는다.*

#### E31 — 매각대금 담보 승인서

> `매각대금 중 직원 정산 예정액을 담보로 운영자금을 빌리는 데 동의함. 직원 개인의 정산금 수령 포기와는 별개임.`  
> 봉만실 서명.

**P02 | 봉만실 [S_CH04_02_0001]**

이건 내가 승인했어요. 운영자금이 막혀서요. 위험을 제대로 설명하지 못한 것도 내 책임이고.

#### E32 — 두 번째 담보 약정

> `급여 선지급을 위한 임시 차입 / 상환 재원: 직원 정산 예정액 / 서명: 배한술`

**P06 | 배한술 [S_CH04_02_0002]**

이건 제 거예요. 첫 담보랑 겹치는 걸 알면서도 급여부터 주고 싶었습니다.

#### E33 — 수령 포기 취합본

> `직원 정산금 수령을 포기하며 잔액 처리를 운영담당자에게 위임함.`  
> 서명지가 떨어졌다 다시 붙은 흔적, 페이지 번호 충돌.

**P02 | 봉만실 [S_CH04_02_0003]**

난 이걸 직원들한테 받은 포기 서명으로 알고 있었어요.

**P02 | 봉만실 [S_Q04_v1]**

직원들이 전부 정산금 포기에 동의했어요. 그 서명들이 그 뜻이에요.

#### E34 — 서명 당시 안내문

> `기록 사본을 외부 보관소에 맡기는 데 동의함. 금전 채무나 정산금 권리는 바뀌지 않음.`  
> 직원 보관 원본. 연속된 페이지 가장자리와 서명 순서 표시가 문제의 `정산금 수령 포기` 취합본 서명지와 대응한다.

**P06 | 배한술 [S_CH04_02_0004]**

우리가 실제로 본 안내문은 이쪽입니다. 사본을 밖에 맡긴다는 내용이었어요. 돈을 포기한다는 문장은 없었습니다.

**P00 | 나여백 [S_CH04_02_0005]**

같은 사람이 서명했더라도, 붙어 있던 목적 문구가 다르면 동의 범위도 따로 확인해야 합니다.

> **Objective:** `서명한 내용과 돈의 이동이 같은 약속인지 대조하자.`

---

## C_D16 — 이 서명들은 무엇에 동의한 것일까?

### Context
- Place: L02
- Cast: P00, P02, P06
- Entry: E31/E32/E33/E34 inspected
- Exit: K16 on success
- Repeat/resume: preserve selected evidence and latest error; no reacquisition

### Script

**P00 | 나여백 [S_D16_0001]**

네 문서의 서명을 하나의 `동의`로 합치지 않고 목적을 각각 대응시키겠습니다.

> **D16:** `이 서명들은 무엇에 동의한 것일까?`

### B_D16_incomplete
**P00 | 나여백 [S_D16_0011]**

매각대금 담보 승인서/두 번째 담보 약정/수령 포기 취합본/서명 당시 안내문 가운데 빠진 문서가 있으면 판단을 보류하겠습니다. 네 목적을 모두 본 뒤 분류합니다.

### B_D16_err_all_consent_has_same_scope
**P00 | 나여백 [S_D16_0021]**

네 문서 모두 결국 정산금을 쓰는 데 동의한 것이므로 같은 범위입니다.

**P06 | 배한술 [S_D16_0022]**

제 담보 약정이랑 다른 직원들 보관 동의는 같은 문장이 아니에요. 누가 돈을 빌리는지, 뭘 맡기는지부터 다릅니다.

> 여유 `-2`.

### B_D16_err_all_signatures_forged
**P00 | 나여백 [S_D16_0031]**

문구가 충돌하니 서명 자체가 전부 위조됐다고 보겠습니다.

**P06 | 배한술 [S_D16_0032]**

문장이 다르다고 제 서명까지 가짜가 되는 건 아니에요. 지금 확인한 건 각 종이가 허락한 범위가 다르다는 쪽이죠.

> 여유 `-2`.

### B_D16_success
**P00 | 나여백 [S_D16_0041]**

매각대금 담보 승인서는 봉만실의 운영자금 대출 담보 승인, 두 번째 담보 약정은 배한술의 별도 급여 선지급 담보, 수령 포기 취합본은 겉으로는 직원 정산금 수령 포기를 주장하는 취합본, 서명 당시 안내문은 실제 직원 서명 당시 `외부 보관 동의이며 권리는 바뀌지 않는다`고 적힌 안내문입니다.

**P00 | 나여백 [S_D16_0042]**

따라서 같은 서명이나 같은 `정산금` 단어가 보인다고 서로의 권한을 대신하지 않습니다.

- Author state: **K16 acquired.**

### B_D16_retry
**P00 | 나여백 [S_D16_0081]**

서명 모양 대신 목적 문장을 네 칸으로 다시 나누겠습니다.

### Current revisit
**P00 | 나여백 [S_D16_0091]**

서명별 동의 범위 구분 결론은 네 문서의 권한 범위를 분리합니다. 다음은 수령 포기 취합본 서명지가 원래 어떤 목적 페이지와 붙어 있었는지입니다.

---

## C_H_D16 — D16 힌트

### Context
- Place: L02 / reasoning help
- Cast: P00 guidance
- Entry: D16 available or interrupted
- Exit: state-selected return to D16
- State keys: missing purpose document / all-held / recent same-scope error / recent all-forged error / interrupted / K16-complete

#### Deterministic selector (normative)
- Return exactly one Korean S line. Priority: `K16 complete` → `missing E31/E32/E33/E34` → eligible recent error/interruption → requested all-held level.
- K16 complete, any H0–H4 → `S_H_D16_0091`.
- Any required purpose document missing, any H0–H4 → `S_H_D16_0002`.
- All four held and unsolved: H0 `S_H_D16_0003`; H1 `S_H_D16_0011`; H2 `S_H_D16_0021`; H3 `S_H_D16_0031`; H4 `S_H_D16_0041`.
- With all four held, recent `all_consent_has_same_scope` at H3/H4 → `S_H_D16_0032`; recent `all_signatures_forged` at H3/H4 → `S_H_D16_0033`.
- With all prerequisites held and an interrupted draft, H1–H4 may select `S_H_D16_0042`; missing documents still outrank interruption.

### H_D16_0
**P00 | 나여백 [S_H_D16_0001]**

네 문서 중 아직 안 본 것이 있다면 그 목적 문구부터 확인하겠습니다. 네 개가 모두 있다면 바로 비교할 수 있습니다.

#### State — missing document
**P00 | 나여백 [S_H_D16_0002]**

빠진 것은 `매각대금 담보 승인서 / 두 번째 담보 약정 / 수령 포기 취합본 / 서명 당시 안내문` 가운데 하나입니다. 휴게실 원본 봉투에서 그 문서만 먼저 보세요.

#### State — all held
**P00 | 나여백 [S_H_D16_0003]**

네 원본이 모두 있습니다. `대출 / 두 번째 담보 / 포기 주장 / 외부 보관` 네 칸을 만들고 문장을 그대로 대응시키면 됩니다.

### H_D16_1
**P00 | 나여백 [S_H_D16_0011]**

구분 기준은 서명자의 이름이 아니라 `무엇을 허락한다고 적혔는지`입니다.

### H_D16_2
**P00 | 나여백 [S_H_D16_0021]**

만실 씨 문서는 운영자금 대출 담보, 한술 씨 문서는 급여 선지급 담보, 취합본은 포기 주장, 실제 직원 안내문은 외부 보관 동의이며 권리는 바뀌지 않는다고 적혀 있습니다.

### H_D16_3
**P00 | 나여백 [S_H_D16_0031]**

`동의라는 말이 있으니 다 같다`도, `문구가 충돌하니 서명이 전부 가짜다`도 현재 자료보다 멀리 갑니다.

#### State — recent same-scope error
**P00 | 나여백 [S_H_D16_0032]**

방금은 네 문서를 한 종류의 동의로 묶었습니다. 이번에는 각 문서가 허락한 **행동**을 한 줄씩 따로 적어 보세요.

#### State — recent all-forged error
**P00 | 나여백 [S_H_D16_0033]**

방금은 문구 충돌을 서명 위조로 바꿨습니다. 서명 진위 대신 서로 다른 목적 범위만 분리하면 됩니다.

### H_D16_4
**P00 | 나여백 [S_H_D16_0041]**

저라면 이렇게 주장하겠습니다. `만실 씨의 대출 승인, 한술 씨의 별도 담보, 포기를 주장하는 취합본, 실제 직원들의 외부 보관 동의는 서로 다른 권한이다. 같은 서명이나 정산금이라는 단어만으로 서로를 대신할 수 없다.`

#### State — interrupted
**P00 | 나여백 [S_H_D16_0042]**

중간에 멈췄다면 마지막으로 채운 칸 다음부터 이어 갑니다. 이미 분류한 문서를 다시 읽을 필요는 없습니다.

#### State — complete
**P00 | 나여백 [S_H_D16_0091]**

네 문서의 권한 범위는 이미 분리했습니다. 다음은 서명지가 원래 어느 목적 페이지와 이어졌는지 확인할 차례입니다.

## C_CH04_03 — 가장자리와 순서

### Context
- Place: L03
- Cast: P00, P07, P06
- Entry: K16; E33/E34 held; E26 remains physically in L12 custody after CH03 conservation
- Exit: page-edge/order comparison completed; D17 eligible
- Evidence view: E34 physical staff-retained original + P07's documented custody images/transcript of the relevant E26 folio; no wet bound sheet is detached or carried here
- Supervision: P01 remains in L02 with P02
- Repeat/resume: if interrupted, resume from the first unmatched page-edge/order mark; do not recreate or move the L12 original

### Script

*자료실의 넓은 책상 위에 새벽이 투명 자를 내려놓는다. 한술이 가져온 서명 당시 안내문 원본은 보호 슬리브 안에 있다. 살아남은 장부 자체는 호숫가 보관 창고에 남아 있고, 새벽은 개봉 때 찍은 입회 사진과 페이지 순서 기록만 태블릿에 띄운다.*

**P07 | 진새벽 [S_CH04_03_0001]**

필적 맞히기는 하지 맙시다. 젖은 장부도 여기로 옮기지 않았어요. 지금 비교할 수 있는 건 원래 페이지가 어떻게 이어졌는지, 그 기록뿐입니다.

**P06 | 배한술 [S_CH04_03_0003]**

그럼 제 이름이 닮았느냐가 아니라, 제가 서명했을 때 앞뒤에 무슨 종이가 있었는지를 보는 거네요.

*한술이 자기 안내문의 오른쪽 아래를 가리킨다. 작은 반달 모양 눌림과 연속 번호가 다음 장으로 이어진다. 새벽이 개봉 입회 사진의 같은 위치를 확대한다.*

**P00 | 나여백 [S_CH04_03_0002]**

서명 당시 안내문은 가장자리 눌림과 서명 순서 표시가 앞뒤 페이지로 이어집니다. 그런데 수령 포기 취합본은 서명지와 `포기` 표지 사이가 한 번 떨어졌다 붙은 흔적이 있고, 페이지 번호도 건너뜁니다.

**P07 | 진새벽 [S_CH04_03_0010]**

여기, 접착 자국은 보이지만 그 자국만으로 누가 붙였는지는 안 나옵니다. 대신 `처음부터 이 표지와 한 묶음이었나`는 시험할 수 있어요.

**P06 | 배한술 [S_CH04_03_0011]**

제가 실제로 본 문장은 `사본을 외부에 맡긴다`였어요. 그런데 서명지만 떼어 다른 표지 밑에 놓으면, 나중에 보는 사람은 우리가 돈을 포기한 것처럼 읽겠네요.

**P00 | 나여백 [S_CH04_03_0004]**

그 가능성은 페이지 연결로 따져 보겠습니다. 종이를 바꾼 책임과 수영장에서 누가 누구를 밀었는지는 여기서 합치지 않습니다.

## C_D17 — 서명지와 표지는 처음부터 한 묶음이었을까?

### Context
- Place: L03
- Cast: P00, P07, P06
- Entry: K16 + E33/E34 + accessible E26 custody view
- Exit: K17 on success; Q04 supported
- Repeat/resume: reuse the existing page-edge comparison; do not move E26 from L12

### Script

**P00 | 나여백 [S_D17_0001]**

서명 모양이 아니라 페이지 물리 연속성을 비교하겠습니다.

> **D17:** `서명지와 표지는 처음부터 한 묶음이었을까?`

### B_D17_incomplete
**P00 | 나여백 [S_D17_0011]**

서명별 동의 범위 구분과 수령 포기 취합본, 서명 당시 안내문, 그리고 보관 창고 장부를 열 때 남긴 페이지 기록이 필요합니다. 빠진 것이 있으면 판단을 보류하고 그 자료부터 확인하겠습니다.

### B_D17_err_handwriting_intuition_only
**P00 | 나여백 [S_D17_0021]**

서명 필체가 비슷해 보이니 수령 포기 취합본의 포기 문구도 처음부터 같은 문서였다고 보겠습니다.

**P07 | 진새벽 [S_D17_0022]**

서명이 실제라는 것과 그 서명지가 어떤 목적 페이지에 붙어 있었는지는 다른 질문입니다. 가장자리·순서 기록을 쓰세요.

> 여유 `-2`.

### B_D17_err_tear_identifies_murderer
**P00 | 나여백 [S_D17_0031]**

재부착 흔적이 있으니 이 문서를 바꾼 사람이 곧 살인범입니다.

**P06 | 배한술 [S_D17_0032]**

종이 바꾼 책임이 커도, 그 종이가 수영장에서 누가 누구를 밀었는지는 말하지 않아요.

> 여유 `-2`.

### B_D17_success
**P00 | 나여백 [S_D17_0041]**

서명 당시 안내문의 목적 페이지와 서명지는 페이지 가장자리와 서명 순서가 이어지고, 보관 창고에서 장부를 열 때 남긴 페이지 기록도 그 연속을 뒷받침합니다. 반면 수령 포기 취합본은 포기 목적 표지가 떨어졌다 다시 붙고 페이지 번호도 충돌합니다. 따라서 기존 서명지를 가져와 목적 표지만 `수령 포기`로 바꾼 묶음으로 보는 것이 물리 기록과 맞습니다.

- Author state: **K17 acquired. Q04 supported.**

### B_D17_retry
**P00 | 나여백 [S_D17_0081]**

필체 인상이나 살인 결론을 빼고, 원본의 페이지 연결과 재부착만 다시 정리합니다.

### Current revisit
**P00 | 나여백 [S_D17_0091]**

서명지 목적이 바뀌었다는 결론은 서명지 재사용과 목적 대체를 증명합니다. 누가 어떤 범위로 조립을 맡았는지는 직원 포기 동의 진술 추궁에서 묻습니다.

---

## C_H_D17 — D17 힌트

### Context
- Place: L03 / reasoning help
- Cast: P00 guidance
- Entry: D17 available or interrupted
- Exit: state-selected return to D17
- State keys: missing K16/E33/E34/E26-view / all-held / handwriting error / tear-murderer error / interrupted / K17-complete

#### Deterministic selector (normative)
- Return exactly one Korean S line. Priority: `K17 complete` → `missing K16/E33/E34/E26 custody view` → eligible recent error/interruption → requested all-held level.
- K17 complete, any H0–H4 → `S_H_D17_0091`.
- Any prerequisite missing, any H0–H4 → `S_H_D17_0002`.
- All held and unsolved: H0 `S_H_D17_0003`; H1 `S_H_D17_0011`; H2 `S_H_D17_0021`; H3 `S_H_D17_0031`; H4 `S_H_D17_0041`.
- With all prerequisites held, recent `handwriting_intuition_only` at H3/H4 → `S_H_D17_0032`; recent `tear_identifies_murderer` at H3/H4 → `S_H_D17_0033`.
- With all prerequisites held and an interrupted comparison, H1–H4 may select `S_H_D17_0042`; the selector never tells the player to move the wet bound original from custody.

### H_D17_0
**P00 | 나여백 [S_H_D17_0001]**

동의 범위 구분이나 세 페이지 자료가 빠졌다면 그 비교부터 끝냅니다. 다 있다면 서명 모양이 아니라 가장자리·순서 기록을 보겠습니다.

#### State — missing prerequisite
**P00 | 나여백 [S_H_D17_0002]**

지금 필요한 건 `수령 포기 취합본`, `서명 당시 안내문`, 그리고 보관 창고에서 장부를 열 때 남긴 페이지 순서 기록입니다. 젖은 장부를 다시 들고 올 필요는 없습니다.

#### State — all held
**P00 | 나여백 [S_H_D17_0003]**

자료가 모두 있습니다. 안내문 쪽의 연속된 가장자리와 취합본의 재부착·페이지 번호 충돌을 한 쌍으로 비교하세요.

### H_D17_1
**P00 | 나여백 [S_H_D17_0011]**

실제 직원 안내문은 앞뒤 순서가 이어지고, 문제의 취합본은 `포기` 표지와 서명지 사이가 끊겨 있습니다.

### H_D17_2
**P00 | 나여백 [S_H_D17_0021]**

비교하는 것은 필체가 아니라 종이의 연결입니다. 원본 안내문과 장부 입회 기록이 기준이 됩니다.

### H_D17_3
**P00 | 나여백 [S_H_D17_0031]**

서명이 진짜여도 목적 표지가 바뀔 수 있습니다. 반대로 표지가 바뀌었다고 그 조립자가 곧 살인범인 것도 아닙니다.

#### State — recent handwriting error
**P00 | 나여백 [S_H_D17_0032]**

방금은 필체가 비슷하다는 이유로 같은 문서라고 봤습니다. 이번에는 가장자리 눌림, 연속 번호, 재부착 흔적만 쓰세요.

#### State — recent tear-murderer error
**P00 | 나여백 [S_H_D17_0033]**

방금은 종이 조립 책임을 살인까지 늘렸습니다. 여기서는 `목적 표지가 바뀌었는가`까지만 답하면 됩니다.

### H_D17_4
**P00 | 나여백 [S_H_D17_0041]**

저라면 `직원들이 실제로 서명한 보관 안내문은 페이지 연결이 이어지지만, 포기 취합본은 목적 표지가 다시 붙고 번호도 충돌한다. 따라서 기존 서명지가 다른 목적 표지에 재사용됐다`고 정리하겠습니다.

#### State — interrupted
**P00 | 나여백 [S_H_D17_0042]**

중단했다면 마지막으로 대조한 가장자리 다음부터 이어 봅니다. 보관 창고의 원본은 그대로 두고 입회 기록을 계속 사용합니다.

#### State — complete
**P00 | 나여백 [S_H_D17_0091]**

서명지 목적 대체는 이미 확인했습니다. 이제 만실 씨의 `직원 전원 포기` 설명을 실제 서명 목적과 대조할 수 있습니다.

## C_Q04 — 전부 포기했다는 말의 범위

### Context
- Place: L02
- Cast: P00, P02, P06
- Entry: S_Q04_v1 + K17 + E31 + E34
- Exit: sole S_Q04_v2; E36/KQ04
- Exclusivity: delegation/assembly/no-waiver-meeting correction first appears in S_Q04_v2
- Repeat/resume: after success show current corrected statement; historical v1 remains in history only

### Entry states
- Required: S_Q04_v1 + K17 + E31 + E34
- Success creates E36/KQ04

### Script

**P00 | 나여백 [S_Q04_0001]**

만실 씨, 실제 서명 안내문은 권리가 바뀌지 않는다고 적혀 있고, 수령 포기 취합본은 그 서명지를 다른 목적 표지에 붙인 것으로 보입니다. `전부 포기에 동의했다`는 말씀의 근거를 범위별로 다시 묻겠습니다.

- Author state: **Q04:** `직원 전원이 포기에 동의했다고 확인하셨나요?`

### B_Q04_incomplete
**P00 | 나여백 [S_Q04_0011]**

서명지 목적이 바뀌었다는 결론과 매각대금 담보 승인서/서명 당시 안내문이 없으면 먼저 그 자료를 확인하겠습니다. 대출 승인과 직원 보관 동의를 둘 다 확인한 뒤 묻습니다.

### B_Q04_err_owner_authorized_no_loan
**P00 | 나여백 [S_Q04_0021]**

서명 포기 문구가 틀렸으니 만실 씨는 정산금을 담보로 한 어떤 금융 위험도 승인하지 않았습니다.

**P02 | 봉만실 [S_Q04_0022]**

그건 아니에요. 매각대금 담보 승인서 대출은 내가 서명했습니다. 내가 한 잘못까지 다른 문서가 틀렸다고 없애면 안 돼요.

> 여유 `-2`.

### B_Q04_success

**P00 | 나여백 [S_Q04_0031]**

매각대금 담보 승인서에는 만실 씨가 운영자금 대출 담보를 승인한 사실이 있습니다. 하지만 서명 당시 안내문은 직원들이 `외부 보관`에 동의했을 뿐 정산금 포기에는 동의하지 않았다고 적습니다. 수령 포기 취합본은 그 서명지의 목적 페이지가 바뀐 것으로 보입니다. 직원 전원이 포기를 확인했다는 설명은 유지되기 어렵습니다.

*만실은 한동안 매각대금 담보 승인서와 서명 당시 안내문을 번갈아 본다.*

**P02 | 봉만실 [S_Q04_v2]**

맞아요. 제가 직접 승인한 건 운영자금 대출이고, 직원들한테 `정산금을 포기하자`고 모아 확인한 적은 없어요. 무록 씨에게 맡긴 건 사본을 모아 외부 보관용 묶음으로 정리하는 일이었습니다. 직원 원본은 이 서랍과 각자 봉투에 남겨 뒀고요. `포기` 문구가 붙은 취합본은 무록 씨가 정리해 가져왔는데, 저는 그 표지와 서명이 원래부터 한 문서인 줄 알았습니다.

**P02 | 봉만실 [S_Q04_0032]**

그렇다고 내가 대출 위험을 설명 못 한 책임까지 없어지는 건 아니죠. 그건 내 몫입니다.

#### E36 — 위임 범위 정정

> **봉만실의 정정 진술 기록**  
> - 차무록에게 맡긴 일: 직원들이 이미 작성한 사본을 모아 **외부 보관용 묶음으로 정리하는 일**  
> - 실제로 하지 않은 일: 직원 정산금 수령 포기를 논의·확인하는 전원 회의  
> - 직원 원본: 봉만실의 서랍과 각 직원 봉투에 남아 있었음  
> - `포기` 문구가 붙은 취합본: 차무록이 정리해 가져온 것을 봉만실이 원래 한 문서로 오인함  
> - 한계: 이 정정은 봉만실의 실제 대출 승인 책임을 없애지 않음

- Author state: acquire E36 and KQ04.

### B_Q04_retry
**P00 | 나여백 [S_Q04_0081]**

`포기 문구가 틀림`을 `만실 씨가 아무 금융 결정을 하지 않음`으로 늘리지 않고, 위임 범위와 실제 대출을 분리해 다시 묻겠습니다.

### Historical replay / current revisit
**P00 | 나여백 [S_Q04_0091]**

현재 진술은 정정된 설명입니다. `직원 모두가 포기에 동의했다`는 초기 설명도 이력에 남기되, 실제 포기 회의는 없었고 문제의 취합본은 차무록에게 맡긴 사본 정리 과정에서 조립됐다는 정정을 사용합니다.

---

## C_H_Q04 — Q04 힌트

### Context
- Place: L02 / testimony help
- Cast: P00 guidance
- Entry: Q04 live or interrupted
- Exit: returns to Q04 without leaking S_Q04_v2
- State keys: missing K17/E31/E34 / all-held-live-v1 / recent no-loan error / interrupted / KQ04-complete

#### Deterministic selector (normative)
- Return exactly one Korean S line. Priority: `KQ04 complete` → `missing K17/E31/E34` → eligible recent error/interruption → requested live-v1 level. Missing knowledge always outranks the recent-error overlay.
- KQ04 complete, any H0–H4 → `S_H_Q04_0091`.
- Any prerequisite missing, any H0–H4 → `S_H_Q04_0002`.
- With K17/E31/E34 held and S_Q04_v1 still live: H0 `S_H_Q04_0003`; H1 `S_H_Q04_0011`; H2 `S_H_Q04_0021`; H3 `S_H_Q04_0031`; H4 `S_H_Q04_0041`.
- With all prerequisites held, recent `owner_authorized_no_loan` at H3/H4 → `S_H_Q04_0032`.
- With all prerequisites held and an interrupted challenge, H1–H4 may select `S_H_Q04_0042`.
- No pre-success selector line may disclose the delegation/assembly/no-waiver-meeting facts first stated in `S_Q04_v2` / E36.

### H_Q04_0
**P00 | 나여백 [S_H_Q04_0001]**

서명지 목적 대체 결론, 만실 씨의 대출 승인서, 실제 직원 보관 안내문이 모두 있는지 확인합니다. 하나라도 없으면 그 자료부터 봅니다.

#### State — missing prerequisite
**P00 | 나여백 [S_H_Q04_0002]**

현재 빠진 자료를 먼저 채우세요. 이 추궁은 `포기 문구가 틀렸다`가 아니라, 만실 씨가 직원들의 포기 의사를 **직접 확인했는지**를 묻는 단계입니다.

#### State — all held / live v1
**P00 | 나여백 [S_H_Q04_0003]**

만실 씨의 현재 주장은 `직원들이 전부 포기에 동의했다`입니다. 실제 안내문에는 외부 보관 동의와 `정산금 권리는 바뀌지 않음`이 적혀 있습니다. 두 문장을 바로 대조할 수 있습니다.

### H_Q04_1
**P00 | 나여백 [S_H_Q04_0011]**

대출 승인서는 만실 씨 자신의 금융 결정이고, 직원 안내문은 직원들의 외부 보관 동의입니다. 주체도 목적도 다릅니다.

### H_Q04_2
**P00 | 나여백 [S_H_Q04_0021]**

지금 가진 자료로는 `직원 전원이 포기했다`는 설명이 실제 서명 목적과 맞지 않는다는 데까지 갈 수 있습니다. 누가 취합본을 조립했는지는 성공 뒤 정정에서만 듣습니다.

### H_Q04_3
**P00 | 나여백 [S_H_Q04_0031]**

포기 동의가 없었다는 사실을 `만실 씨가 대출도 승인하지 않았다`로 바꾸지 마세요. 대출 승인서는 실제입니다.

#### State — recent no-loan error
**P00 | 나여백 [S_H_Q04_0032]**

방금은 잘못된 포기 문구 때문에 실제 대출 승인까지 지웠습니다. 이번에는 `대출은 승인했다 / 직원 포기는 확인하지 않았다`를 동시에 유지해 질문하세요.

### H_Q04_4
**P00 | 나여백 [S_H_Q04_0041]**

질문은 이렇게 좁히면 됩니다. `운영자금 대출을 승인한 사실은 따로 인정합니다. 하지만 직원들이 실제로 서명한 건 외부 보관 동의이고 권리 포기가 아닙니다. 직원 전원이 정산금 포기에 동의했다는 것을 직접 확인한 회의나 원본이 있습니까?`

#### State — interrupted
**P00 | 나여백 [S_H_Q04_0042]**

중간에 멈췄다면 만실 씨의 현재 `전원 포기` 주장과 실제 직원 안내문을 다시 나란히 놓고 질문을 이어 갑니다. 정정 내용을 먼저 추측할 필요는 없습니다.

#### State — complete
**P00 | 나여백 [S_H_Q04_0091]**

만실 씨의 설명은 이미 정정됐습니다. 이후에는 `사본 정리 위임 범위`와 `실제 대출 책임`을 분리해 사용합니다.

## C_CH04_04 — 책임이 줄지 않는 정정

### Context
- Place: L02
- Cast: P00, P02, P06
- Entry: Q04 success / E36/KQ04
- Exit: delegated-copy scope, actual loan fault and second-pledge fault are separately acknowledged; V41 visible relabeling done
- Supervision: P01 is at the same L02 meal nook under P02 and does not join the financial discussion unless O1 is entered later
- Branch effect: no forgiveness flag is set by this scene
- Repeat/resume: on return, show the corrected labels and the unresolved personal responsibility rather than replaying S_Q04_v2

### Script

*만실은 네 봉투의 표지를 한꺼번에 치우려다 손을 멈춘다. 대신 `운영자금 대출`, `두 번째 담보`, `외부 보관 동의`, `문제의 포기 취합본`이라고 각각 새 쪽지를 붙인다.*

**P06 | 배한술 [S_CH04_04_0001]**

사장님이 포기 회의를 안 했다는 건 알겠어요. 그런데 대출 담보를 우리한테 제대로 설명 안 한 건 그대로예요.

**P02 | 봉만실 [S_CH04_04_0002]**

알아요. `호텔만 버티면 결국 다 돌려줄 수 있다`고 내가 먼저 결론 내리고, 위험한 부분은 뒤로 미뤘어요.

**P06 | 배한술 [S_CH04_04_0010]**

저도 그 말을 핑계로 삼을 수는 없어요. 급여를 주겠다고 같은 예상 정산금에 두 번째 담보를 얹은 건 제가 한 일이니까요.

**P02 | 봉만실 [S_CH04_04_0011]**

그럼 우리 둘 다 `직원을 위해서였다`는 말로 끝내지 맙시다. 그 말을 듣는 직원이 결정할 몫이니까.

**P00 | 나여백 [S_CH04_04_0003]**

이번 정정은 만실 씨 책임을 없애는 게 아니라, 만실 씨가 한 대출 승인과 무록 씨에게 맡긴 사본 정리 범위를 분리한 겁니다.

**P06 | 배한술 [S_CH04_04_0004]**

제 두 번째 담보도 따로 남겨 주세요. 장부를 지켰다는 이유로 없던 일이 되면 안 됩니다.

*만실과 한술은 서로 사과하거나 화해하지 않는다. 대신 자기 이름이 붙은 봉투를 자기 쪽으로 당기고, 문제의 취합본은 둘 사이 중앙에 남긴다.*

**P02 | 봉만실 [S_CH04_04_0012]**

이제 돈이 실제로 어디로 갔는지도 봐야겠네요. 서류 말만 나누고 끝내면 또 같은 실수예요.

## C_CH04_05 — 돈이 실제로 간 곳

### Context
- Place: L01
- Cast: P00, P07, P03
- Entry: KQ04/E36; P07 has requested the independent transaction packet
- Exit: E35/E37 acquired with source boundaries visible; D18 eligible
- Supervision: P01 remains in L02 with P02
- Source discipline: E35 combines separately-originating bank debit, P03 vendor submission and P04 job register; E37 notice + its named acknowledgment are one correspondence packet, not two independent witnesses
- Repeat/resume: resume at the first unchecked source column; already acquired rows are not reacquired

### Script

*현관 카운터에 새벽이 세 장의 출처 표지를 먼저 놓는다. `은행`, `호텔 거래처 등록`, `공사 실적`. 무록은 팔짱을 끼고 세 장을 번갈아 본다.*

**P07 | 진새벽 [S_CH04_05_0010]**

한 묶음처럼 보이지만 출처는 다릅니다. 그래서 먼저 누가 만든 기록인지부터 나눕니다.

#### E35 — 거래처 정산 묶음

> **은행 거래 내역 — 봉만실 보관본에서 제공**  
> 직원 기금 계정 → `해담설비` 18,400,000원 / 7,600,000원 출금.  
> **호텔 거래처 등록 — 차무록 제출**  
> `해담설비` 수령 확인 연락처·계정.  
> **호텔 공사 실적 장부 — 탁두철 관리 원본**  
> 같은 금액·기간에 대응하는 공사: `해당 공사 없음`.

**P03 | 차무록 [S_CH04_05_0001]**

호텔은 그때 당장 막아야 할 돈이 많았습니다. 거래처 연락도 제가 맡았고요. 계정을 등록했다는 것 자체가 범죄는 아니죠.

**P00 | 나여백 [S_CH04_05_0002]**

맞습니다. 연락처 하나로 끝내지 않겠습니다. 은행에서 실제로 나간 돈, 그 계정의 수령 연결, 대응 공사가 있는지, 그리고 누가 그런 이동을 허락했는지를 따로 봅니다.

**P03 | 차무록 [S_CH04_05_0011]**

공사 장부에 없다고 모든 지출이 허위가 되는 것도 아닙니다. 급한 비용은 나중에 정산하는 경우도 있었어요.

**P07 | 진새벽 [S_CH04_05_0012]**

그래서 `장부에 없음`만 쓰지 않습니다. 같은 기간 은행 기록과 수령 확인, 승인 문서를 함께 보죠.

*새벽이 다음 투명 파일을 연다. 문식이 보낸 통지문 뒤에 작은 수령확인 첨부가 스테이플로 묶여 있다.*

#### E37 — 정산 차이 통지

> `해담설비 계정의 수령 확인 명의는 차무록입니다. 직원 동의 원본과 공사 실적 원본을 22일 아침 함께 확인하겠습니다. 사본의 포기 문구로 대체할 수 없습니다.`  
> **첨부 — 수령 확인**  
> `거래처: 해담설비 / 수령 확인 명의: 차무록 / 관련 정산금: 18,400,000원 및 7,600,000원`  
> 표문식이 봉만실에게 보낸 패킷이며 봉만실의 수령 흔적이 남아 있음.

**P03 | 차무록 [S_CH04_05_0003]**

문식 씨는 사정을 들으려 하기보다 원본부터 내놓으라고 몰아붙였습니다. 저 첨부도 제 이름이 있다는 이유로 결론부터 내렸고요.

**P07 | 진새벽 [S_CH04_05_0004]**

그 태도 평가는 따로 남깁니다. 지금 확인한 건 통지와 첨부가 죽기 전에 실제로 전달됐고, 어떤 거래를 문제 삼았는지입니다.

**P00 | 나여백 [S_CH04_05_0013]**

그리고 이 첨부는 통지문과 같은 패킷입니다. 같은 종이를 둘로 세어 독립 증거를 늘리진 않겠습니다.

**P03 | 차무록 [S_CH04_05_0014]**

그럼 저도 하나 요구하죠. 제가 업체 접점이었다는 사실과, 돈을 제 마음대로 빼돌렸다는 결론을 같은 문장으로 쓰지 마세요.

**P00 | 나여백 [S_CH04_05_0015]**

그 구분을 유지한 채 실제 승인 범위와 대조하겠습니다.

## C_D18 — 실제 돈의 이동은 어느 승인과도 맞지 않을까?

### Context
- Place: L01
- Cast: P00, P07, P03
- Entry: E35/E37 + K16/E36
- Exit: K18 on success
- Repeat/resume: preserve source columns and latest rejected premise

### Script

**P00 | 나여백 [S_D18_0001]**

거래처 정산 묶음의 실제 이동을 서명별 동의 범위 구분 결론/위임 범위 정정의 허용 범위와 대조하고, 정산 차이 통지의 독립 통지로 수령 연결을 확인하겠습니다.

> **D18:** `실제 돈의 이동은 어느 승인과도 맞지 않을까?`

### B_D18_incomplete
**P00 | 나여백 [S_D18_0011]**

거래처 정산 묶음/정산 차이 통지와 서명별 동의 범위 구분 결론/위임 범위 정정이 모두 필요합니다. 하나가 없으면 판단을 보류하고 그 자료부터 확인하겠습니다.

### B_D18_err_account_contact_alone_proves_diversion
**P00 | 나여백 [S_D18_0021]**

해담설비 연락처를 무록 씨가 제출했으니 그 사실만으로 돈을 빼돌렸다고 확정하겠습니다.

**P07 | 진새벽 [S_D18_0022]**

계정 접점은 접근을 보여 주지만 단독으로 유용을 완성하지 않습니다. 실제 출금, 수령 확인, 공사 부재와 승인 범위를 함께 써야 합니다.

> 여유 `-2`.

### B_D18_err_second_pledge_equals_contractor_receipt
**P00 | 나여백 [S_D18_0031]**

배한술 씨의 두 번째 담보가 해담설비 수령과 같은 거래입니다.

**P07 | 진새벽 [S_D18_0032]**

한술 씨 약정은 급여 선지급을 위한 별도 차입입니다. 해담설비 수령과는 상대도 목적도 다른 문서예요.

> 여유 `-2`.

### B_D18_err_same_origin_as_independent
**P00 | 나여백 [S_D18_0041]**

무록 씨가 제출한 거래처 등록과 무록 씨가 설명한 거래를 두 독립 출처로 보겠습니다.

**P07 | 진새벽 [S_D18_0042]**

같은 사람에게서 나온 설명 둘은 독립 확인이 아닙니다. 은행 이동/수령 자료와 실제 공사·승인 원본처럼 다른 기원을 붙이세요.

> 여유 `-2`.

### B_D18_success
**P00 | 나여백 [S_D18_0051]**

거래처 정산 묶음의 은행 내역은 직원 기금이 해담설비로 이동한 사실을 보여 주고, 거래처 등록과 정산 차이 통지의 수령 확인은 차무록 씨가 그 수령 연결에 관여했음을 보여 줍니다. 동시에 공사 장부에는 대응 공사가 없고, 서명별 동의 범위 구분 결론/위임 범위 정정의 대출·보관 동의 어느 쪽도 `차무록이 관리하는 거래처로 정산금을 보내도 된다`는 권한을 주지 않습니다.

**P00 | 나여백 [S_D18_0052]**

따라서 이 이동은 직원 포기 결과로 설명되지 않습니다. 서로 다른 출처의 돈 이동/수령과 실제 공사·동의 범위를 함께 써서 해담설비 계정과 정산금 전용 결론으로 남깁니다.

- Author state: **K18 acquired.**

### B_D18_retry
**P00 | 나여백 [S_D18_0081]**

한 사람의 연락처나 한 문서만으로 끝내지 않고, 다른 기원의 돈 이동과 승인 범위를 다시 조합하겠습니다.

### Current revisit
**P00 | 나여백 [S_D18_0091]**

해담설비 계정과 정산금 전용 결론은 유용·대체 문서의 재정 동기를 뒷받침하지만, 아직 수영장 행동을 증명하지 않습니다.

---

## C_H_D18 — D18 힌트

### Context
- Place: L01 / reasoning help
- Cast: P00 guidance
- Entry: D18 available or interrupted
- Exit: state-selected return to D18
- State keys: missing E35/E37 / missing K16/E36 / all-held / three named errors / interrupted / K18-complete

#### Deterministic selector (normative)
- Return exactly one Korean S line. Priority: `K18 complete` → `missing E35/E37` → `missing K16/E36` → eligible recent error/interruption → requested all-held level.
- K18 complete, any H0–H4 → `S_H_D18_0091`.
- E35 or E37 missing, any H0–H4 → `S_H_D18_0002`.
- With transaction sources held but K16 or E36 missing, any H0–H4 → `S_H_D18_0003`.
- All prerequisites held: H0 `S_H_D18_0004`; H1 `S_H_D18_0011`; H2 `S_H_D18_0021`; H3 `S_H_D18_0031`; H4 `S_H_D18_0041`.
- With all prerequisites held, recent `account_contact_alone_proves_diversion` / `second_pledge_equals_contractor_receipt` / `same_origin_as_independent` at H3/H4 → `S_H_D18_0032` / `S_H_D18_0033` / `S_H_D18_0034`.
- With all prerequisites held and an interrupted draft, H1–H4 may select `S_H_D18_0042`.

### H_D18_0
**P00 | 나여백 [S_H_D18_0001]**

거래 기록이나 차이 통지가 없으면 현관의 새벽 경위에게서 그 패킷을 확인합니다. 직원 동의 범위와 만실 씨 정정이 없다면 그쪽부터 끝냅니다.

#### State — missing transaction packet
**P00 | 나여백 [S_H_D18_0002]**

은행 출금, 거래처 등록, 공사 실적, 문식 씨 통지와 첨부 수령확인을 먼저 확인하세요. 같은 패킷 안 문서를 두 독립 증거로 세지는 않습니다.

#### State — missing scope proof
**P00 | 나여백 [S_H_D18_0003]**

돈은 보이지만 허용 범위가 비어 있습니다. 대출·보관 동의의 실제 범위와 만실 씨의 위임 범위 정정을 먼저 가져오세요.

#### State — all held
**P00 | 나여백 [S_H_D18_0004]**

필요한 자료가 모두 있습니다. `실제 출금·수령 연결·대응 공사`와 `그 이동을 허락한 문서`를 두 열로 나누면 됩니다.

### H_D18_1
**P00 | 나여백 [S_H_D18_0011]**

핵심은 돈이 어디로 갔는지와, 그 이동을 허락한 권한이 실제 있었는지를 따로 확인하는 겁니다.

### H_D18_2
**P00 | 나여백 [S_H_D18_0021]**

은행 기록은 해담설비로의 출금, 거래처·첨부 기록은 차무록의 수령 연결, 공사 장부는 대응 공사 부재를 보여 줍니다. 직원 원본은 그런 거래처 전용 권한을 주지 않습니다.

### H_D18_3
**P00 | 나여백 [S_H_D18_0031]**

연락처 하나만으로 끝내지 말고, 한술 씨의 두 번째 담보를 해담설비 거래와 합치지도 말고, 같은 패킷의 통지와 첨부를 두 명의 증인처럼 세지도 마세요.

#### State — recent contact-only error
**P00 | 나여백 [S_H_D18_0032]**

방금은 거래처 접점만으로 유용을 확정했습니다. 은행 출금과 공사 부재, 승인 범위를 함께 붙이세요.

#### State — recent pledge-equals-receipt error
**P00 | 나여백 [S_H_D18_0033]**

방금은 한술 씨 담보와 해담설비 수령을 같은 거래로 만들었습니다. 상대·목적이 다른 문서이므로 분리하세요.

#### State — recent same-origin error
**P00 | 나여백 [S_H_D18_0034]**

방금은 같은 기원의 자료를 독립 확인처럼 셌습니다. 은행·공사·직원 원본처럼 출처가 다른 기록을 함께 쓰세요.

### H_D18_4
**P00 | 나여백 [S_H_D18_0041]**

저라면 `직원 기금이 해담설비로 실제 출금됐고 차무록의 수령 연결이 남아 있으며 대응 공사는 없다. 대출 승인이나 사본 보관 동의 어느 것도 그 거래처로 정산금을 보내라는 권한은 아니다`라고 정리하겠습니다.

#### State — interrupted
**P00 | 나여백 [S_H_D18_0042]**

중단했다면 마지막으로 채운 `돈 이동 / 수령·공사 / 승인 범위` 열 다음부터 이어 갑니다.

#### State — complete
**P00 | 나여백 [S_H_D18_0091]**

정당한 직원 포기와 다른 자금 이동은 이미 분리했습니다. 다음에는 그 노출을 막으려 한 구체적 압박과 만남 예정이 있는지 봅니다.

## C_CH04_06 — 숨기고 싶은 담보

### Context
- Place: L02
- Cast: P00, P06, P04
- Entry: K17/K18; P06 has decided to produce E38
- Exit: E38 acquired; P04 learns the second pledge here, not earlier; family relationship strain is explicit
- Supervision: P01 is with P02 at the opposite L02 meal nook; P02 accepts direct supervision before P00 focuses on P04/P06
- Repeat/resume: if interrupted after note handoff, resume with the unread line/reaction; do not make P04 know the pledge retroactively

### Script

*한술이 여백을 보기 전에 휴게실 반대편의 만실에게 먼저 눈짓한다. 만실이 모눈 옆 의자를 당겨 앉는다. 여백이 돌아오자 한술은 접힌 메모를 꺼낸다. 두철은 그 종이를 처음 보는 표정이다.*

#### E38 — 한술에게 남긴 메모

> `두 번째 담보를 설명하기 싫으면, 정산 자료는 내가 정리하게 두세요. — 무록`  
> 배한술이 보관한 종이. 차무록은 자신의 필체·문맥임을 인정하면서도 `업무 독촉`이었다고 설명함.

**P04 | 탁두철 [S_CH04_06_0001]**

두 번째 담보가 뭐야?

**P06 | 배한술 [S_CH04_06_0002]**

급여 먼저 주려고 제가 잡은 거. 오빠한테도 말 안 했어. 첫 담보랑 겹치는 걸 알고도.

**P04 | 탁두철 [S_CH04_06_0010]**

그래서 어제 내가 `장부만 빼면 된다`고 할 때도 아무 말 안 한 거야?

**P06 | 배한술 [S_CH04_06_0011]**

말하면 내가 먼저 직원들 돈을 위험하게 한 사람이 되니까. 무록 씨도 그걸 알고 있었고.

**P04 | 탁두철 [S_CH04_06_0003]**

나는 장부만 빼면 해결되는 줄 알았네. 네가 뭘 숨기는지도 모르고 같이 움직였고.

**P06 | 배한술 [S_CH04_06_0004]**

그래서 더 꼬였지. 내 잘못 들킬까 봐 정산 자료 정리를 무록 씨에게 맡겨 두는 쪽을 택했어.

**P00 | 나여백 [S_CH04_06_0005]**

이 메모는 한술 씨가 왜 압박을 느꼈는지와 무록 씨가 어떤 약점을 알고 있었는지를 보여 줍니다. 하지만 이 문장만으로 수영장에서 일어난 일을 정하진 않겠습니다.

**P04 | 탁두철 [S_CH04_06_0006]**

살인 얘기 전에 이것부터는 알겠네요. 한술이가 입을 닫은 이유가 나를 믿어서가 아니라, 자기 담보가 드러날까 무서워서였다는 거.

**P06 | 배한술 [S_CH04_06_0012]**

응. 그건 미안하다고 해서 바로 없어질 일도 아니고.

*두철은 대답하지 않는다. 메모를 돌려줄 때 접힌 방향만 원래대로 맞춰 놓는다.*

## C_CH04_07 — 만나기로 한 자리

### Context
- Place: L03
- Cast: P00, P07
- Entry: K18 + E38
- Exit: E19 acquired; E39 historical request revisited beside E37/E38; D19 eligible
- Supervision: P01 remains in L02 with P02
- Scope: meeting intention/exposure pressure only; no reenactment, no claim P03 attended, no fatal-act proof
- Repeat/resume: resume from the first unpaired motive/opportunity source; do not replay the prologue as new evidence

### Script

*자료실. 새벽이 네 칸짜리 받침을 만든다. `원본 확인 통지`, `한술 메모`, `피해자의 원본 요청`, `만남 카드`. 마지막 칸만 비어 있다.*

**P07 | 진새벽 [S_CH04_07_0010]**

돈이 새어나간 기록이 있어도 `그날 만나기로 했다`는 건 따로 확인해야 합니다. 반대로 만나기로 했다는 카드만 있어도 공격 계획은 아닙니다.

*새벽이 문식의 폴더에서 회수한 작은 카드를 보호 슬리브째 빈 칸에 놓는다.*

#### E19 — 표문식의 약속 카드

> `무록 씨 요청. 수영장 위 직원 통로에서 원본 인계 범위 확인. 행사 정리 신호 뒤.`  
> 표문식 필적은 기존 서명 자료와 대조됨. 카드가 있던 폴더 위치도 회수 기록에 남아 있음.

**P07 | 진새벽 [S_CH04_07_0001]**

이 카드는 표문식 씨가 그 자리에 갈 생각이었다는 것과 `무록 씨 요청`이라는 문구를 보여 줍니다. 무록 씨가 실제로 왔는지, 거기서 무슨 일이 있었는지는 적혀 있지 않습니다.

**P00 | 나여백 [S_CH04_07_0002]**

전날 문식 씨가 제게는 서명지와 목적 페이지를 떼지 말고 같이 보관해 달라고 직접 부탁했습니다. 그 요청은 제가 들은 역사적 진술로 남아 있습니다.

**P07 | 진새벽 [S_CH04_07_0011]**

그럼 네 칸을 연결해 보죠. 먼저 정산 차이 통지 때문에 원본을 보면 어떤 문제가 드러날 수 있었는지.

**P00 | 나여백 [S_CH04_07_0012]**

해담설비로 간 돈과 수령 연결, 대응 공사가 없다는 점입니다.

**P07 | 진새벽 [S_CH04_07_0013]**

한술 씨 메모는?

**P00 | 나여백 [S_CH04_07_0014]**

두 번째 담보 비밀을 이용해 정산 자료 정리를 계속 맡기려는 압박입니다.

**P07 | 진새벽 [S_CH04_07_0003]**

그리고 피해자는 원본 목적 페이지를 보존하려 했고, 행사 뒤 직원 통로에서 그 범위를 확인할 약속을 적어 뒀습니다. 여기까지면 `원본 공개를 막을 이유와 사적 확인 기회`를 시험할 수 있습니다. 밀침은 아직 아닙니다.

**P00 | 나여백 [S_CH04_07_0015]**

네. 사람을 싫어했다는 감정이 아니라, 무엇이 공개될 위험이었는지부터 정리하겠습니다.

## C_D19 — 원본 확인을 막으려 한 압박은 어디로 향했을까?

### Context
- Place: L03
- Cast: P00, P07
- Entry: E19/E37/E38/E39 + K18
- Exit: K19 on success
- Repeat/resume: motive/opportunity remains bounded; no fatal-act claim

### Script

**P00 | 나여백 [S_D19_0001]**

사람이 싫었다는 감정과, 특정 원본 확인을 막아야 할 구체적 이유를 구분하겠습니다.

> **D19:** `원본 확인을 막으려 한 압박은 어디로 향했을까?`

### B_D19_incomplete
**P00 | 나여백 [S_D19_0011]**

표문식의 약속 카드/정산 차이 통지/한술에게 남긴 메모/표문식의 원본 요청과 해담설비 계정과 정산금 전용 결론이 필요합니다. 빠진 것이 있으면 먼저 확인하겠습니다.

### B_D19_err_rudeness_makes_all_motives_equal
**P00 | 나여백 [S_D19_0021]**

표문식 씨가 직원들에게 무례했으니 직원 모두에게 같은 살해 동기가 있었습니다.

**P07 | 진새벽 [S_D19_0022]**

불쾌감은 넓게 있었을 수 있지만, 해담설비 계정과 정산금 전용 결론의 자금 이동 노출과 한술에게 남긴 메모의 구체적 압박은 특정 위험입니다. 감정만으로 동기를 평평하게 만들지 마세요.

> 여유 `-2`.

### B_D19_err_note_predicts_exact_murder
**P00 | 나여백 [S_D19_0031]**

표문식의 약속 카드에 수영장 위 통로가 적혀 있으니 차무록 씨가 거기서 표문식 씨를 죽이겠다는 계획까지 증명됩니다.

**P07 | 진새벽 [S_D19_0032]**

카드는 만남 의도와 장소를 기록합니다. 공격 계획이나 실제 참석은 기록하지 않습니다.

> 여유 `-2`.

### B_D19_success
**P00 | 나여백 [S_D19_0041]**

해담설비 계정과 정산금 전용 결론과 정산 차이 통지 때문에 원본을 대조하면 해담설비 이동과 차무록 씨의 수령 연결, 공사 부재가 드러날 상황이었습니다. 한술에게 남긴 메모는 한술 씨의 숨기고 싶은 두 번째 담보를 이용해 정산 자료 정리를 자신에게 맡기라고 압박한 흔적입니다. 표문식의 원본 요청에서 표문식 씨는 목적 페이지와 원본을 함께 보존하려 했고, 표문식의 약속 카드는 행사 정리 신호 뒤 두 사람이 직원 통로에서 그 범위를 확인하려 한 약속을 보여 줍니다.

**P00 | 나여백 [S_D19_0042]**

따라서 차무록 씨에게 원본 공개를 막을 구체적 이유와 만날 예정이 있었습니다. 다만 이 단계는 만남 의도와 압박까지이며 실제 밀침은 아직 증명하지 않습니다.

- Author state: **K19 acquired.**

### B_D19_retry
**P00 | 나여백 [S_D19_0081]**

무례함이나 약속 장소를 곧바로 살인으로 바꾸지 않고, `노출 위험 + 압박 + 만남 기회`까지만 다시 정리합니다.

### Current revisit
**P00 | 나여백 [S_D19_0091]**

표문식과 차무록의 원본 확인 접점은 동기와 예정된 만남을 뒷받침합니다. 실제 추락 행동은 이후 시야와 현장 자료로 따로 확인해야 합니다.

---

## C_H_D19 — D19 힌트

### Context
- Place: L03 / reasoning help
- Cast: P00 guidance
- Entry: D19 available or interrupted
- Exit: state-selected return to D19
- State keys: missing E19/E37/E38/E39/K18 / all-held / rudeness error / murder-plan error / interrupted / K19-complete

#### Deterministic selector (normative)
- Return exactly one Korean S line. Priority: `K19 complete` → `missing E19/E37/E38/E39/K18` → eligible recent error/interruption → requested all-held level.
- K19 complete, any H0–H4 → `S_H_D19_0091`.
- Any required source/conclusion missing, any H0–H4 → `S_H_D19_0002`.
- All held: H0 `S_H_D19_0003`; H1 `S_H_D19_0011`; H2 `S_H_D19_0021`; H3 `S_H_D19_0031`; H4 `S_H_D19_0041`.
- With all prerequisites held, recent `rudeness_is_motive` at H3/H4 → `S_H_D19_0032`; recent `meeting_card_is_murder_plan` at H3/H4 → `S_H_D19_0033`.
- With all prerequisites held and an interrupted draft, H1–H4 may select `S_H_D19_0042`.

### H_D19_0
**P00 | 나여백 [S_H_D19_0001]**

약속 카드, 정산 차이 통지, 한술 씨 메모, 문식 씨의 원본 보존 요청, 자금 전용 결론 가운데 빠진 것이 있으면 그 자료부터 확인합니다.

#### State — missing source
**P00 | 나여백 [S_H_D19_0002]**

지금 필요한 건 `무엇이 공개될 위험이었는지 / 누가 자료 통제를 압박했는지 / 둘이 따로 확인할 약속이 있었는지` 세 갈래입니다. 비어 있는 갈래의 자료만 보충하세요.

#### State — all held
**P00 | 나여백 [S_H_D19_0003]**

세 갈래가 모두 있습니다. 불쾌감 대신 `구체적 노출 위험 + 압박 + 예정된 만남`까지만 연결하면 됩니다.

### H_D19_1
**P00 | 나여백 [S_H_D19_0011]**

원본을 보면 해담설비 이동과 수령 연결, 공사 부재가 드러날 수 있었습니다. 그 공개를 막을 구체적 이유가 있었는지가 핵심입니다.

### H_D19_2
**P00 | 나여백 [S_H_D19_0021]**

차이 통지는 원본 확인 예고, 한술 씨 메모는 담보 비밀을 이용한 압박, 피해자 요청은 목적 페이지 보존 의지, 약속 카드는 행사 뒤 직원 통로에서의 확인 예정입니다.

### H_D19_3
**P00 | 나여백 [S_H_D19_0031]**

피해자가 까다로웠다는 이유로 모두의 동기를 같게 만들지 말고, 약속 카드가 공격 계획까지 적었다고도 하지 마세요.

#### State — recent rudeness error
**P00 | 나여백 [S_H_D19_0032]**

방금은 넓은 반감을 모두 같은 동기로 만들었습니다. 이번에는 차무록 씨에게만 걸리는 자금 노출과 자료 통제 압박을 쓰세요.

#### State — recent murder-plan error
**P00 | 나여백 [S_H_D19_0033]**

방금은 만남 장소를 살인 계획으로 바꿨습니다. 카드는 `만날 예정`까지만 증명합니다.

### H_D19_4
**P00 | 나여백 [S_H_D19_0041]**

저라면 `원본 확인은 차무록 씨의 해담설비 수령 연결과 공사 부재를 드러낼 위험이었고, 한술 씨 담보 비밀을 이용한 자료 통제 압박도 있었다. 피해자는 원본 보존을 요구했고 둘은 행사 뒤 따로 확인할 약속이 있었다. 이는 막을 이유와 만남 기회이지 밀침의 증명은 아니다`라고 정리하겠습니다.

#### State — interrupted
**P00 | 나여백 [S_H_D19_0042]**

중단했다면 네 칸 받침에서 마지막으로 연결한 자료 다음부터 이어 갑니다.

#### State — complete
**P00 | 나여백 [S_H_D19_0091]**

원본 공개를 막을 이유와 사적 확인 약속은 이미 정리했습니다. 실제 추락 행동은 다음 장의 현장·시야 자료로 검증해야 합니다.

## C_D20 — 세 사람의 책임을 섞지 않고 정리하자

### Context
- Place: L02
- Cast: P00, P02, P06, P07; P03 responsibility is represented by proven records and may be contacted, not silently summoned
- Entry: K16/K17/K18/K19
- Exit: K20; V05 requested
- Repeat/resume: responsibility matrix persists; homicide actor remains open

### Script

**P00 | 나여백 [S_D20_0001]**

재정 자료에서 드러난 책임을 사람별로 나누겠습니다. 이 표는 살인 행위자를 정하는 표가 아닙니다.

> **D20:** `세 사람의 책임을 섞지 않고 정리하자.`

### B_D20_incomplete
**P00 | 나여백 [S_D20_0011]**

서명별 동의 범위 구분 결론/서명지 목적이 바뀌었다는 결론/해담설비 계정과 정산금 전용 결론/표문식과 차무록의 원본 확인 접점 결론이 모두 필요합니다. 하나가 비어 있으면 그 결론부터 마저 확인하겠습니다.

### B_D20_err_only_one_person_at_fault
**P00 | 나여백 [S_D20_0021]**

차무록 씨의 자금 유용이 가장 크니 봉만실과 배한술의 대출·담보 책임은 없다고 정리하겠습니다.

**P06 | 배한술 [S_D20_0022]**

제 잘못은 제가 없애 달라고 한 적 없어요. 한 사람 잘못이 더 크다고 다른 사람 책임이 사라지진 않아요.

> 여유 `-2`.

### B_D20_err_finance_papers_prove_push
**P00 | 나여백 [S_D20_0031]**

자금 유용과 문서 대체를 증명했으니 차무록 씨가 표문식 씨를 밀었다고도 증명됩니다.

**P07 | 진새벽 [S_D20_0032]**

동기와 문서 행위가 강해져도 수영장 행동은 별도 증거가 필요합니다. 다음 장에서 그 행동을 확인합니다.

> 여유 `-2`.

### B_D20_success
**P00 | 나여백 [S_D20_0041]**

봉만실 씨는 운영자금 대출을 승인했고 위험 설명을 충분히 하지 않은 책임이 있습니다. 배한술 씨는 직원 급여를 위해 같은 예상 정산금에 두 번째 담보를 잡고 이를 숨긴 책임이 있습니다. 차무록 씨는 서명지 목적을 바꾸고 정당한 승인 범위를 벗어난 해담설비 자금 이동에 연결됐으며, 원본 확인을 막을 구체적 이유가 있었습니다.

**P00 | 나여백 [S_D20_0042]**

세 책임은 서로 대체되지 않습니다. 살인 행위에 대해서는 아직 차무록/탁두철 등 가능한 설명을 남겨 두고, 다음에는 실제 창 시야와 추락 행동을 확인하겠습니다.

- Author state: **K20 acquired.**

### B_D20_retry
**P00 | 나여백 [S_D20_0081]**

`가장 큰 잘못 하나`도 `재정범행=밀침`도 지우고, 사람별 실제 행동과 아직 미증명인 추락 행위를 분리하겠습니다.

### Current revisit
**P00 | 나여백 [S_D20_0091]**

대출·담보·전용 책임 분리 결론 뒤에도 수영장 행동 주체는 열려 있습니다. 소해금 씨가 보았다고 두려워하는 범위를 안전하게 검증해야 합니다.

---

## C_H_D20 — D20 힌트

### Context
- Place: L02 / reasoning help
- Cast: P00 guidance
- Entry: D20 available or interrupted
- Exit: state-selected return to D20
- State keys: missing K16..K19 / all-held / one-person error / finance-proves-push error / interrupted / K20-complete

#### Deterministic selector (normative)
- Return exactly one Korean S line. Priority: `K20 complete` → `missing K16/K17/K18/K19` → eligible recent error/interruption → requested all-held level.
- K20 complete, any H0–H4 → `S_H_D20_0091`.
- Any predecessor conclusion missing, any H0–H4 → `S_H_D20_0002`.
- All four conclusions held: H0 `S_H_D20_0003`; H1 `S_H_D20_0011`; H2 `S_H_D20_0021`; H3 `S_H_D20_0031`; H4 `S_H_D20_0041`.
- With all prerequisites held, recent `one_person_explains_all` at H3/H4 → `S_H_D20_0032`; recent `finance_proves_push` at H3/H4 → `S_H_D20_0033`.
- With all prerequisites held and an interrupted matrix, H1–H4 may select `S_H_D20_0042`.

### H_D20_0
**P00 | 나여백 [S_H_D20_0001]**

네 결론 가운데 비어 있는 것이 있으면 그 작업부터 끝냅니다. 모두 있다면 만실·한술·무록 세 사람의 `실제로 한 행동`을 세 칸에 나눕니다.

#### State — missing K
**P00 | 나여백 [S_H_D20_0002]**

아직 비어 있는 결론을 먼저 채우세요: 동의 범위, 서명지 목적 대체, 실제 자금 이동, 원본 공개 압박과 만남 예정 중 하나입니다.

#### State — all held
**P00 | 나여백 [S_H_D20_0003]**

네 결론이 모두 있습니다. 책임의 크기를 순위 매기지 말고 `대출 승인 / 두 번째 담보 / 문서 대체·승인 밖 자금 이동`을 각각 배치하세요.

### H_D20_1
**P00 | 나여백 [S_H_D20_0011]**

핵심은 누가 더 나쁜가가 아니라 책임의 종류가 다르다는 점입니다.

### H_D20_2
**P00 | 나여백 [S_H_D20_0021]**

만실 씨의 실제 대출, 한술 씨의 두 번째 담보, 무록 씨의 문서 목적 대체와 승인 밖 자금 이동·원본 공개 압박을 각각 자기 칸에 둡니다.

### H_D20_3
**P00 | 나여백 [S_H_D20_0031]**

한 사람의 큰 책임이 다른 사람 책임을 지우지 않습니다. 그리고 금융 문서는 수영장 밀침을 직접 보여 주지 않습니다.

#### State — recent one-person error
**P00 | 나여백 [S_H_D20_0032]**

방금은 무록 씨 책임이 크다는 이유로 다른 두 사람의 실제 결정을 지웠습니다. 세 칸을 모두 남기세요.

#### State — recent finance-proves-push error
**P00 | 나여백 [S_H_D20_0033]**

방금은 재정 범행을 곧바로 밀침으로 이어 붙였습니다. 추락 행동은 아직 열린 칸으로 남겨 둡니다.

### H_D20_4
**P00 | 나여백 [S_H_D20_0041]**

저라면 `봉만실은 실제 대출 승인과 설명 부족, 배한술은 별도 두 번째 담보와 은폐, 차무록은 서명 목적 대체·승인 밖 자금 이동·원본 공개 압박의 책임이 있다. 세 책임은 서로를 지우지 않으며 추락 행위자는 이 문서만으로 확정하지 않는다`고 정리하겠습니다.

#### State — interrupted
**P00 | 나여백 [S_H_D20_0042]**

중단했다면 세 사람 표에서 아직 비어 있는 사람부터 이어 적습니다.

#### State — complete
**P00 | 나여백 [S_H_D20_0091]**

재정·문서 책임은 분리됐습니다. 이제 해금 씨의 제한된 시야를 안전하게 검증하는 다음 약속으로 넘어가면 됩니다.

## C_CH04_08 — 보지 못한 걸 확인하러 가기

### Context
- Place: L02
- Cast: P00, P02, P06, P05, P07
- Entry: K20; staff responsibility matrix complete
- Exit: V05/CH05 adult sightline appointment motivated; no E40/E41/E42 acquired and no S_Q05_v1 stated yet
- Supervision: P01 is already in the same L02 meal nook with P02; P07 explicitly keeps the next site check adult-only
- Q discipline: P05 does not reveal the later Q05-exclusive correction or replace the live denial before CH05_02
- Repeat/resume: if revisited, P05 repeats only the request for a controlled view test; no historical denial/correction is replayed here

### Script

*직원 원본 모임이 끝나갈 때 소해금이 문 앞에서 한참 서 있다가 들어온다. 손에는 접힌 수첩이 있지만 펴지 않는다.*

**P05 | 소해금 [S_CH04_08_0001]**

다음에 제가 확인해야 할 게 있어요. 그런데 제가 먼저 설명해 버리면, 또 기억보다 말을 크게 만들 것 같아요.

**P00 | 나여백 [S_CH04_08_0002]**

어느 자리에서 어느 방향이 실제로 보이는지부터 재보자는 뜻입니까?

**P05 | 소해금 [S_CH04_08_0003]**

네. 부스의 연회장 쪽 맑은 창 말고, 직원 통로 쪽 반투명 창이요. 정전 때 그쪽을 제가 얼마나 구별할 수 있었는지부터 확인하고 싶어요. 사람 이름은 그다음에 말할게요.

**P07 | 진새벽 [S_CH04_08_0004]**

좋습니다. 안전 장벽을 먼저 설치하고 성인만 현장을 확인하죠. 과거 상황을 위험하게 재현하지 않고, 보이는 범위만 측정합니다.

**P02 | 봉만실 [S_CH04_08_0005]**

모눈이는 나랑 여기 있을게요. 대신 이번에도 사람을 `보관`한다고 쓰진 마요.

**P00 | 나여백 [S_CH04_08_0006]**

`봉만실 감독 아래 휴게실 대기`라고 적겠습니다.

**P06 | 배한술 [S_CH04_08_0010]**

해금 씨, 오늘 여기서 결론까지 말하려고 하지 않아도 돼요. 실제로 보이는 만큼만 확인해요.

**P05 | 소해금 [S_CH04_08_0011]**

그게 필요했어요. 제가 무서운 건 틀린 기억보다, 틀린 말을 확신처럼 붙잡는 거라서.

## C_CH04_O1 — 목소리 라벨과 서명

### Context
- Place: L02
- Cast: P00, P01
- Entry: calm family beat while P02 accepts nearby supervision context
- Exit: relationship-only understanding; no mandatory K/E
- Repeat: once per chapter

### Script

**P01 | 나모눈 [S_CH04_O1_0001]**

이모, 내 녹음 파일에 이름 써 놨다고 그 사람이 뭐든 허락한 건 아니지?

**P00 | 나여백 [S_CH04_O1_0002]**

응. 이름이 붙었다는 건 누구 파일인지 알려 줄 뿐, 사용 범위를 대신하지 않아.

**P01 | 나모눈 [S_CH04_O1_0003]**

그럼 서명도 비슷해?

**P00 | 나여백 [S_CH04_O1_0004]**

비슷한 점은 있지만, 금융 문서는 네가 혼자 결론 내릴 필요 없어. 오늘은 `서명 옆 문장을 같이 봐야 한다` 정도만 기억하면 돼.

**P01 | 나모눈 [S_CH04_O1_0005]**

좋아. 돈 얘기는 아직 재미없어.

---

## C_CH04_O2 — 누구 이름으로 전시할까

### Context
- Place: L02
- Cast: P00, P02, P06
- Branch: B_EXHIBIT; if skipped, offered again in EP03
- No mandatory evidence depends on either option
- Supervision: if P01 is present in L02, P02 remains the responsible adult while P00/P06 discuss labels
- Repeat/resume: after a branch is set, revisit shows the chosen display method; if skipped, EP03 offers the same two choices without changing facts

### Choice B_EXHIBIT

#### Option `attributed_accounts`
- Label: `각 문서 옆에 작성·책임 주체를 따로 적는다.`

**P00 | 나여백 [S_CH04_O2_0001]**

전시용 사본에는 누가 어떤 결정을 했는지 문서별로 따로 적겠습니다. 같은 `직원 정산` 묶음으로 책임을 합치지 않겠습니다.

**P06 | 배한술 [S_CH04_O2_0002]**

좋아요. 제 두 번째 담보도 제 이름으로 남겨 주세요. 직원 전체 이름 뒤에 숨기지 말고.

**P02 | 봉만실 [S_CH04_O2_0003]**

내 대출 승인도 같이요. 좋은 뜻이었다는 해설로 먼저 덮지 말고.

- Author state: Set `B_EXHIBIT=attributed_accounts`.

#### Option `joint_annotations`
- Label: `문서 옆에 당사자들의 공동 주석을 붙인다.`

**P00 | 나여백 [S_CH04_O2_0011]**

각 문서 옆에 당사자들이 `내가 동의한 범위 / 몰랐던 범위 / 지금 인정하는 책임`을 공동 주석으로 남기겠습니다.

**P02 | 봉만실 [S_CH04_O2_0012]**

내 말 하나가 대표 설명이 되지 않게 하는 건 좋네요.

**P06 | 배한술 [S_CH04_O2_0013]**

대신 주석도 다 같이 합의했다는 한 문장으로 묶지 말아요. 이름별로 남겨 주세요.

- Author state: Set `B_EXHIBIT=joint_annotations`.

### Current revisit
**P00 | 나여백 [S_CH04_O2_0091]**

공동 주석 방식으로 정했습니다. 원문은 그대로 두고, 각자 자기 이름 옆에 `내가 동의한 범위 / 몰랐던 범위 / 지금 인정하는 책임`만 따로 남겨 두겠습니다.

---

## C_CH04_O3 — 가림과 원본은 다른 일

### Context
- Place: L01
- Cast: P00, P03, P09
- Entry: wage-privacy/copy handling discussion available
- Exit: redaction rule restated without Q06 correction
- Repeat: historical/current line only; no evidence change

### Script

*현관. 차무록이 목백로에게 임금액이 보이는 복사본을 가리키며 언성을 낮춘다.*

**P03 | 차무록 [S_CH04_O3_0001]**

임금액은 공개 자료에 그대로 두면 안 됩니다. 그건 백로 씨도 알고 계셨잖아요.

**P09 | 목백로 [S_CH04_O3_0002]**

그래서 금액만 가리라고 했습니다. 시각하고 참여자까지 바꾸라고 한 적은 없어요.

**P03 | 차무록 [S_CH04_O3_0003]**

지금은 바뀌었다고 확정된 것도 아니지 않습니까.

**P00 | 나여백 [S_CH04_O3_0004]**

맞습니다. 백로 씨가 처음 보여 준 견본도 `금액만 가리고, 시각과 참여자는 그대로 둔다`는 방식이었죠. 지금은 그 약속이 어디까지였는지만 확인하겠습니다. 공개본의 시각이 맞는지는 아직 따로 확인해야 합니다.

*백로는 대답 대신 자기 보관 영수증을 다시 접어 넣는다.*

---

## CH04 r02 revision state

- Revised: C_CH04_01..08, O1..O3, D16..D20, Q04, H_D16..H_D20, H_Q04, H_V04.
- B_EXHIBIT has both actual branches and late-choice fallback remains for EP03.
- Next r02 unit: C_CH05_01. This chapter is revised, not project-final or Codex-accepted.
