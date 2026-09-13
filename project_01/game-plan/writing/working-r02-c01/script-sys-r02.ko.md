# SYS — 기록을 이어가는 방법

- Packet: `YEOWUL-FULL-v2`
- Revision: `r02`
- Status: `draft-revised`
- Coverage: C_SYS_01..04
- Rules: 여유 start/max 6; committed wrong logical claim -2 once per attempt; incomplete/draft edit/inspection/questions/hints/relationship choices cost 0; at zero new committed submissions pause but draft editing and investigation tools remain available; recovery restores 4 without losing state and may repeat.

## C_SYS_01 — 잠깐 정리하고 이어가기

### Context
- Trigger: an unresolved D/Q reaches `여유 0`
- Cast: P00 plus P01 only when already safely present; otherwise P07 or no companion line
- Entry state: same current task, editable draft, selected roles/order, most recent useful error feedback, all E/K/S/B/notes/history retained
- Exit: `여유 4 / 6`, same unresolved task and same editable draft
- Cost/state: no new E/K/B, no time advance, no hidden ending penalty; repeatable without limit
- Zero behavior: new committed submissions are paused; draft editing, evidence/person/map/dialogue/note tools, cancellation and hints remain available
- Repeat/resume: save/load at zero preserves the exact draft and recent feedback; recovery does not force a hint or reset the task

### Script — first zero

*오답 제출 뒤 여유가 0이 되면, 방금 쓴 답안과 붉은 피드백은 그대로 남는다. 입력칸은 계속 편집할 수 있지만 `확정 제출` 버튼만 잠시 비활성화된다. 자료·인물·지도·대화·노트·힌트는 모두 열려 있다.*

> **여유 0 / 6**  
> 새 확정 제출은 잠시 멈춥니다.  
> 현재 답안은 편집할 수 있고, 조사 도구와 힌트는 계속 사용할 수 있습니다.
>
> - `잠깐 정리하고 이어가기` → 여유 4 / 6
> - `답안 계속 다듬기` — 무료
> - `자료를 더 읽기` — 무료
> - `힌트 보기` — 무료, 직접 요청

**P00 | 나여백 [S_SYS_01_0001]**

지금 주장은 어딘가 연결이 잘못됐어. 답 전체를 지우지 말고, 방금 반박받은 부분부터 고치자.

#### If P01 is safely present in the same public/safe scene

**P01 | 나모눈 [S_SYS_01_0011]**

종이 한 줄 틀렸다고 공책을 버리는 건 아니잖아. 고칠 줄만 남겨 두면 돼.

**P00 | 나여백 [S_SYS_01_0012]**

맞아. 모은 자료도 방금 반박도 그대로 둘게. 여기서 잠깐 정리하고 같은 질문으로 돌아가자.

#### If current context is adult-only/formal or P01 is elsewhere

**P07 | 진새벽 [S_SYS_01_0021]**

멈춰도 조사 기록은 없어지지 않습니다. 지금 적어 둔 주장과 방금 받은 반박을 그대로 두고 근거를 다시 보죠.

**P00 | 나여백 [S_SYS_01_0022]**

좋습니다. 지금 이 자리에 있는 기록만 놓고 다시 정리하겠습니다.

### State walk — different errors may lead to zero

*여유는 `같은 전제를 세 번 고집했다`는 서사를 가정하지 않는다. 서로 다른 과제·서로 다른 오답이어도 같은 경계 규칙을 쓴다.*

> **시작/최대 상태 — 여유 6 / 6**

#### Example boundary: 6 → 4

> **여유 4 / 6**  
> 방금 제출한 완성 주장은 틀렸습니다. 현재 초안과 오류 피드백은 남아 있습니다.

**P00 | 나여백 [S_SYS_01_0101]**

첫 번째로 틀린 이유가 뭔지 남아 있네. 자료를 더 볼 수도 있고, 이 문장만 바로 고칠 수도 있어.

#### Example boundary: 4 → 2

> **여유 2 / 6**  
> 다른 잘못된 주장을 제출해도 비용은 이번 시도에 한 번만 적용됩니다.

**P00 | 나여백 [S_SYS_01_0102]**

이번엔 아까와 다른 부분을 잘못 잡았네. 전 답을 초기화하지 말고 지금 틀린 역할만 바꾸자.

#### Example boundary: 2 → 0

> **여유 0 / 6**  
> 새 확정 제출만 멈춥니다. 편집·자료 확인·힌트는 계속 가능합니다.

**P00 | 나여백 [S_SYS_01_0103]**

0이 됐어도 지금 적어 둔 건 그대로야. 당장 확정만 멈추고 근거를 다시 보자.

### Recovery confirm

*플레이어가 `잠깐 정리하고 이어가기`를 선택한다.*

> **정리 완료 — 여유 4 / 6**  
> 보존됨: 획득 자료, 입증한 결론, 진술 버전, 관계 선택, 노트, 대화 기록, 현재 답안 초안, 선택 순서, 직전 오류 피드백.  
> 돌아갈 곳: **방금 해결하지 못한 같은 과제**

**P00 | 나여백 [S_SYS_01_0031]**

적어 둔 답이 그대로 남아 있네. 방금 틀렸던 부분부터 바꾸고 같은 질문으로 이어가자.

*같은 D/Q 답안 화면으로 돌아가며 `확정 제출`이 다시 활성화된다.*

### Repeat recovery — 4 → 2 → 0 again

*회복 뒤 다른 잘못된 완성 주장을 제출하면 4→2, 다시 다른 잘못된 주장을 제출하면 2→0이 된다. 이 두 오답이 이전과 같은 전제일 필요는 없다.*

**P00 | 나여백 [S_SYS_01_0041]**

또 0까지 왔네. 횟수 자체가 벌점은 아니야. 이번에도 자료와 적어 둔 답은 두고, 잘못 연결한 부분만 떼어 보자.

#### Repeat with P01 safely present

**P01 | 나모눈 [S_SYS_01_0042]**

이번엔 막힌 데만 도움을 받아 볼래? 안 봐도 되고. 네가 원할 때만 보면 돼.

#### Repeat in formal adult context

**P07 | 진새벽 [S_SYS_01_0043]**

필요하면 막힌 부분에서 도움을 요청하세요. 잠깐 정리했다고 새 사실이 생기거나, 이미 확인한 사실이 사라지지는 않습니다.

> `잠깐 정리하고 이어가기`를 다시 선택하면 언제나 **여유 4 / 6**으로 돌아간다. 회복 횟수는 결말·관계에 영향을 주지 않는다.

### Edit/inspect before recovery

*플레이어가 여유 0 상태에서 초안을 편집하거나 자료를 연다.*

**P00 | 나여백 [S_SYS_01_0051]**

읽고 고치는 건 새 주장을 확정하는 게 아니니까 여유를 쓰지 않아. 필요한 근거를 보고 적어 둔 문장으로 돌아오자.

*답안 텍스트·선택 역할은 수정할 수 있다. 다만 회복 전에는 `확정 제출`만 비활성화된 채 유지된다. 자료/인물/대화/지도/노트/힌트를 닫으면 같은 0점 초안으로 돌아온다.*

### Save/resume at zero

**P00 | 나여백 [S_SYS_01_0091]**

아까 멈췄던 바로 그 질문이네. 적어 둔 답과 마지막 반박도 남아 있어. 문장을 고쳐 이어가거나 자료부터 더 확인하자.

## C_SYS_02 — 쉬는 건 시간을 버리는 일이 아니다

### Context
- Place: L02 only
- Cast: P00, P01
- Entry: voluntary rest after CH02, CH04 or CH05; never interrupts unsafe/official handling
- Exit: returns to the same story/task state
- Evidence/knowledge: no E/K/S correction is created by resting
- Cost/reward: free; no 여유 restoration, no farming; story date/time advances only at explicit chapter transition
- Branch/state: after-CH02 / after-CH04 / after-CH05 / repeated rest in same window
- Repeat/resume: rest can repeat for dialogue without changing resources or evidence; reload returns to the same availability window

### Common entry

*휴게실의 `잠깐 쉬기`가 켜진다. 화면에는 `여유는 회복되지 않으며 사건 시간이 자동 진행되지 않습니다`가 작게 붙어 있다.*

**P01 | 나모눈 [S_SYS_02_0001]**

이모, 쉬는 것도 조사야?

**P00 | 나여백 [S_SYS_02_0002]**

아니. 그냥 쉬는 거야. 쉬었다고 답이 생기지도 않고, 안 쉬었다고 상을 받지도 않아.

### Variant — after CH02

*모눈은 종이컵 두 개를 뒤집어 놓고 하나에는 `진짜 목소리`, 하나에는 `재생된 목소리`라고 쓴다.*

**P01 | 나모눈 [S_SYS_02_0111]**

아까는 목소리가 들리면 사람이 거기 있는 줄 알았어.

**P00 | 나여백 [S_SYS_02_0112]**

나도 기록이 있으면 그 순간이 그대로 남는다고 생각하는 습관이 있어. 그런데 재생은 과거를 지금처럼 들리게 할 수 있지.

**P01 | 나모눈 [S_SYS_02_0113]**

그래도 소리 녹음하는 거 싫어지진 않았어. 허락은 더 잘 물어볼 거야.

**P00 | 나여백 [S_SYS_02_0114]**

그 정도면 충분해. 좋아하는 걸 버리는 게 배우는 건 아니니까.

### Variant — after CH04

*모눈은 대출·담보·동의서라는 단어가 적힌 메모를 한참 보다가 옆으로 밀어 놓는다.*

**P01 | 나모눈 [S_SYS_02_0211]**

나는 아직도 돈 서류는 잘 모르겠어. 서명했으면 다 알았다는 뜻인 줄 알았어.

**P00 | 나여백 [S_SYS_02_0212]**

모른다고 말해도 돼. 우리가 확인한 건 서명의 생김새보다 `무엇에 동의했는지`였잖아.

**P01 | 나모눈 [S_SYS_02_0213]**

그럼 내가 모르는 칸은 모른다고 써도 기록이야?

**P00 | 나여백 [S_SYS_02_0214]**

좋은 기록이지. 아는 척해서 빈칸을 채우는 것보다.

### Variant — after CH05

*모눈은 창문에 비친 자기 얼굴을 보다가 손바닥으로 한쪽을 가린다.*

**P01 | 나모눈 [S_SYS_02_0311]**

본 거랑 누군지 아는 게 다른 거, 이제 좀 알 것 같아.

**P00 | 나여백 [S_SYS_02_0312]**

그리고 못 본 것도 기록할 수 있어. `얼굴은 못 봄` 같은 식으로.

**P01 | 나모눈 [S_SYS_02_0313]**

그럼 모르는 건 빈칸 아니네. `모름`이라고 적는 칸이네.

**P00 | 나여백 [S_SYS_02_0314]**

응. 그 칸을 억지로 채우지 않는 게 이번 일의 절반이었어.

### Repeat rest in same availability window

**P01 | 나모눈 [S_SYS_02_0401]**

또 쉴 수는 있는데, 아까 쉰 걸로 여유 숫자 올라가진 않았지?

**P00 | 나여백 [S_SYS_02_0402]**

응. 필요해서 쉬는 거지 보상 받으려고 쉬는 건 아니야. 물 마시고 다시 가자.

### Exit

> 휴식을 마쳤습니다. `여유`, 사건 자료, 과제 상태와 시각은 그대로입니다.

---

## C_SYS_03 — 보는 일과 맡아 두는 일

### Context
- Availability: whenever player opens inspection/help during an investigation
- Cast: P00; P07 only when the current scene already permits adult official handling
- Entry: current D/Q draft or ordinary investigation state
- Exit: exact prior answer/investigation surface
- Evidence/state: free viewing never creates custody; official handling follows an already opened authorization/revisit path
- Cost: reading, clarification, tools, hints, draft editing and incomplete input cost 0; only a committed complete wrong logical claim costs 2
- Branch/state: safe view / official handling request / incomplete answer / tool return / save-resume
- Repeat/resume: input, role order, recent feedback and 여유 are preserved exactly

### Script — first clarification

**P07 | 진새벽 [S_SYS_03_0001]**

자료를 `본다`는 것과 원본을 `맡아 만진다`는 건 구분하겠습니다. 이미 공개된 사진·사본·측정값은 여기서 읽어도 됩니다. 봉인된 원본을 열거나 위험 구역에 들어가는 일은 허가된 절차로만 하죠.

**P00 | 나여백 [S_SYS_03_0002]**

자료를 읽고, 질문을 다시 듣고, 적어 둔 답을 고치는 건 새 주장을 확정하는 일이 아니니까 여유를 쓰지 않습니다.

#### UI message

> **자료 확인과 초안 편집은 무료입니다.**
> - 증거 상세 / 인물 / 지도 / 대화 기록 / 노트 열기: 비용 없음
> - 질문 문구 다시 보기 / 용어 설명: 비용 없음
> - 힌트 요청: 비용 없음
> - 답안 작성·수정·취소: 비용 없음
> - 불완전 답안: 제출 차단, 비용 없음
> - 완성된 틀린 주장 확정 제출: 여유 2 감소

### Safe inspection request

**P00 | 나여백 [S_SYS_03_0011]**

사진과 측정값으로 확인할 수 있는 일이라면 여기서 먼저 보겠습니다. 현장을 다시 봐야 하는 부분만 직접 가서 확인하죠.

**P07 | 진새벽 [S_SYS_03_0012]**

맞습니다. 화면에서 보기 편하다는 이유로 봉인이나 안전선을 건너뛰지는 않습니다.

### Official handling request

**P00 | 나여백 [S_SYS_03_0021]**

이건 원본 개봉이나 봉인 이동이 필요한 자료네요. 제가 임의로 꺼내지는 않겠습니다.

**P07 | 진새벽 [S_SYS_03_0022]**

허가가 난 절차라면 제가 같이 가겠습니다. 아직 못 여는 원본이면, 지금 확인할 수 있는 앞선 자료부터 보죠. 열 수 없는 걸 억지로 보여 주지는 않겠습니다.

### Incomplete answer

*필수 칸 하나 이상이 비어 있는 상태에서 제출을 누른다.*

> **아직 제출하지 않았습니다.**  
> 빠진 항목: `{missingField}`  
> 여유 변화 없음. 현재 입력은 유지됩니다.

**P00 | 나여백 [S_SYS_03_0031]**

빈칸이 있네요. 틀렸다고 판정받은 게 아니라 아직 주장을 완성하지 않은 겁니다. 지금 입력은 남겨 두고 필요한 자료를 확인하겠습니다.

### Return from tools

*증거 상세·인물·지도·대화 기록·노트·힌트를 닫는다.*

> **이전 답안으로 돌아갑니다.**  
> 입력값, 선택 순서, 최근 피드백, 여유가 그대로 유지됩니다.

**P00 | 나여백 [S_SYS_03_0041]**

보던 자료만 닫았습니다. 방금 적던 답에서 계속하겠습니다.

### Save/resume while editing

**P00 | 나여백 [S_SYS_03_0091]**

아까 멈췄을 때 다 쓰지 못한 답이 그대로 남아 있네요. 지우지 않고 마지막으로 고치던 자리에서 이어가겠습니다.

## C_SYS_04 — 기록에 쓸 이름

### Context
- Place: new-game setup immediately before C_PR_01
- Cast: P00, P01
- Entry: new game; stable protagonist identity remains P00 나여백 regardless of display name
- Exit: `{playerName}` resolves to default `나여백` or the confirmed valid entered display name, then C_PR_01 begins
- Identity effect: age, profession, family relationship, history and P00 speaker identity never change
- World effects: display-name token only; no E/K/B/여유/time/relationship effect
- Branch/state: default / valid entered / re-entry / empty / overlength / trimmed whitespace / resume-before-confirm / resume-after-confirm
- Repeat/resume: unconfirmed text remains editable; confirmed name is not requested again on reload; P01 continues to say `이모`

### Script — initial prompt

*비 오는 여울관 앞. 큰 여행가방 손잡이에 작업용 문서 가방이 걸려 있고, 나모눈은 자기 배낭을 멘 채 현관 간판을 올려다본다. 문을 열기 전, 여백이 휴대전화의 작업 의뢰 확인 화면을 켠다.*

**P01 | 나모눈 [S_SYS_04_0001]**

이모, 여기 일할 때 적을 이름도 확인해야 되는 거 아니야? 엄마가 예약 이름 틀리면 또 전화하라고 했잖아.

**P00 | 나여백 [S_SYS_04_0002]**

맞아. 현장에서 불릴 이름부터 확인하고 들어가자.

#### 입력 화면

> **기록에 표시할 이름을 입력하세요.**  
> 기본 이름: `나여백`  
> 이 설정은 주인공의 표시 이름만 바꿉니다. 인물 관계와 설정은 바뀌지 않습니다.

- 선택: `나여백으로 시작`
- 선택: `직접 입력`

### Branch A — default name

*플레이어가 `나여백으로 시작`을 고른다.*

**P00 | 나여백 [S_SYS_04_0011]**

나여백. 의뢰서에도 그대로 적혀 있네.

**P01 | 나모눈 [S_SYS_04_0012]**

응. 나는 그냥 이모라고 부를 거지만.

**P00 | 나여백 [S_SYS_04_0013]**

그건 바꾸지 마. 현장 사람들한테만 이름으로 소개하면 돼.

*`{playerName}`이 `나여백`으로 확정되고 도입 장면으로 이어진다.*

### Branch B — valid entered name

*플레이어가 직접 이름을 입력한다. 앞뒤의 불필요한 공백을 정리한 뒤에도 이름 문자가 남아 있고, 입력란이 허용하는 길이 안에 들어온 경우 확인 화면으로 간다.*

#### 확인 화면

> **이 이름으로 기록할까요?**  
> `{playerName}`

- 선택: `이 이름으로 시작`
- 선택: `다시 입력`

#### If `이 이름으로 시작`

**P00 | 나여백 [S_SYS_04_0021]**

좋아. 현장 기록에는 `{playerName}`이라고 쓰자.

**P01 | 나모눈 [S_SYS_04_0022]**

그래도 나는 이모라고 부르면 되지?

**P00 | 나여백 [S_SYS_04_0023]**

응. 네가 부르는 호칭이나 우리가 왜 여기 왔는지는 그대로야.

**P01 | 나모눈 [S_SYS_04_0024]**

그럼 됐어. 비 더 오기 전에 들어가자.

*입력한 이름이 `{playerName}`으로 확정된다. 주인공의 관계와 설정은 그대로인 채 도입 장면으로 이어진다.*

#### If `다시 입력`

**P00 | 나여백 [S_SYS_04_0025]**

아직 확정하지 말자. 다시 적고 확인하면 돼.

**P01 | 나모눈 [S_SYS_04_0026]**

응. 문 열기 전에 끝내자. 나 화장실 가고 싶어.

*입력 화면으로 돌아간다. 직전 입력값은 편집할 수 있게 남는다.*

### Branch C — empty or whitespace-only input

*입력값이 비어 있거나 공백만 남는 경우에는 이름을 확정하지 않는다. 점수나 시간 변화 없이 같은 입력 화면에 머문다.*

> **표시할 이름이 비어 있습니다.**  
> 이름을 입력하거나 `나여백으로 시작`을 선택하세요.

**P00 | 나여백 [S_SYS_04_0031]**

빈칸으로는 소개를 못 하겠네. 이름을 적거나 기본 이름을 쓰자.

**P01 | 나모눈 [S_SYS_04_0032]**

빈 이름이면 내가 계속 `이모`라고 불러도 다른 사람은 모르잖아.

- 선택: `다시 입력`
- 선택: `나여백으로 시작`

#### If `나여백으로 시작` from empty input

**P00 | 나여백 [S_SYS_04_0033]**

그럼 기본 이름인 나여백으로 시작하자.

**P01 | 나모눈 [S_SYS_04_0034]**

좋아. 이제 진짜 들어가자.

*`{playerName}`이 `나여백`으로 확정되고 도입 장면으로 이어진다.*

### Branch D — entered name exceeds the input field's allowed length

*입력값이 표시 이름 입력란의 허용 길이를 넘으면 자동으로 잘라 확정하지 않는다. 입력한 문자열은 편집 상태로 유지한다.*

> **이름이 너무 깁니다.**  
> 잘라서 저장하지 않습니다. 조금 줄인 뒤 다시 확인하세요.

**P00 | 나여백 [S_SYS_04_0041]**

뒤를 몰래 잘라서 다른 이름으로 만들지는 말자. 조금 줄여서 다시 확인하자.

**P01 | 나모눈 [S_SYS_04_0042]**

내가 부를 땐 어차피 이모 두 글자인데.

**P00 | 나여백 [S_SYS_04_0043]**

그래도 다른 사람 기록에 들어갈 이름은 본인이 확인해야지.

*같은 입력 화면으로 돌아가며 직전 입력값을 보존한다. 점수·시간·관계 변화는 없다.*

### Branch E — leading/trailing whitespace around an otherwise valid name

*이름 앞뒤에만 공백이 있고, 공백을 제외한 실제 이름은 유효한 경우에는 앞뒤 공백을 표시 이름에서 제외하고 확인 화면을 보여 준다. 공백 제거 전 값을 별도 이름으로 취급하지 않는다.*

> 입력한 이름의 앞뒤 공백을 정리했습니다.  
> **`{playerName}`으로 기록할까요?**

**P00 | 나여백 [S_SYS_04_0051]**

앞뒤 빈칸만 정리됐네. 실제로 표시될 이름을 한 번 보고 확정하자.

**P01 | 나모눈 [S_SYS_04_0052]**

글자까지 바뀐 건 아니지?

**P00 | 나여백 [S_SYS_04_0053]**

응. 이름 글자는 그대로고, 앞뒤에 붙은 빈칸만 빠졌어.

- 선택: `이 이름으로 시작` → Branch B의 확정 대사 `S_SYS_04_0021..0024`를 사용
- 선택: `다시 입력` → Branch B의 재입력 대사 `S_SYS_04_0025..0026`를 사용

### Resume behavior — before confirmation

*이름 입력 도중 저장·화면 이탈 뒤 돌아오면, 이미 확정한 이름이 없는 경우 마지막 편집값과 현재 단계가 유지된다. 확정 전에는 도입 장면의 자기소개가 시작되지 않는다.*

**P00 | 나여백 [S_SYS_04_0091]**

아직 이름을 확정하지 않았습니다. 마지막으로 적던 값부터 다시 확인하겠습니다.

### Resume behavior — after confirmation

*이미 `{playerName}`을 확정한 저장에서 이어오면 이름 입력을 다시 요구하지 않고 도입 장면으로 복귀한다. 이후 성인은 자연스러운 경우 `{playerName} 씨`라고 부르고, 모눈은 계속 `이모`라고 부른다.*

**P01 | 나모눈 [S_SYS_04_0092]**

이름 확인은 끝났지? 그럼 이제 들어가자. 나 진짜 급해.

**P00 | 나여백 [S_SYS_04_0093]**

끝났어. 들어가자.
