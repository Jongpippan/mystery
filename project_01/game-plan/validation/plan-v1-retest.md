# Plan-v1 repair and export retest

Date:2026-09-12. Narrow follow-up to the retained failure in[initial checks](plan-v1-checks.md). F08 corrected D25's missing feedback column before first handoff; the source snapshot and hashes were regenerated before delivery.

- Markdown table retest: 17 source/export files, no width mismatch=True.
- Source fingerprints rechecked: 13; current exported sources match.
- ZIP verified: exactly five expected files, CRC valid, UTF-8 readable, bytes equal the loose Markdown sources.
- Local Markdown targets checked: 68; all exist.
- Old-name scan repeated across authoritative project and exported sources: no old names.
- Actual requested screenplay returns present: 0; no draft acceptance or game completion claimed.
- Scope not rerun: source graph closure passed in the initial check; only D25 feedback cell changed, no task/evidence prerequisite changed. No game tests or rendered visual checks exist.

Archive SHA-256: `04bf7f3fd750cd33456d16c6b4c3d0e65f81bed6722ad40f228e776f8d9ede5a`.

Verdict: PASS for this documentation/export scope only. Full-game gates remain incomplete.

Repository check: `git diff --check` exited0 after the export retest. `git status --short` shows the intended new project/shared-status edits and an unrelated untracked `design-guide/dialogue-experiment/personal-os-spec.zip`. That unrelated file was not opened, changed or used as a creative source. No commit or message to ChatGPT was made.
