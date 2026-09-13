# EP r03 revision notes

## Scope and base

- Base: `working-base/script-ep-r02.ko.md` from YEOWUL-FULL-v3; working-base custody/location fixes were preserved.
- Coverage: C_EP_01..06.

## F05 consent and callback matrix

- `B_PR_02=ask_voice_later` is no longer recapped as an actual new voice request when `B_SOUND=environment_only`. The archive now distinguishes:
  - ask_voice_later + consented_voices: a new purpose/scope was stated and P05 was asked again;
  - ask_voice_later + environment_only: no new voice was used, so no new voice permission was requested.
- `consented_voices` uses silent record start/stop gestures. `S_EP_04_0301` occurs before recording, `S_EP_04_0302` is the permitted recorded sentence, and `S_EP_04_0303` occurs after stop. P00's refusal and P01's own start/end narration are not in the file.
- `environment_only` remains zero-voice during the recording interval.
- Apology branches remain independent from consent; `need_time` is not converted into forgiveness.
- B_EXHIBIT and B_PR_01 recaps render only stored values. EP05 retains the established three-item luggage inventory.

## ID accounting

- Retained working-base S IDs: 83/83.
- New S IDs: none.
- Retired S IDs: none.

## Checks performed

- All four B_PR_02 × B_SOUND histories were read against EP04/EP06.
- Both playback-apology histories, both exhibit histories, both B_PR_01 luggage callbacks and both B_SOUND EP05 lines were checked for branch-only rendering.
- Final archive text does not add new consent, automatic forgiveness or an unplayed callback.
