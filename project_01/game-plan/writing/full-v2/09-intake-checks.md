# Full draft r01 — intake and mechanical checks

Date:2026-09-13. Received candidate, not accepted. Local Python3 pathlib/re/hashlib/zipfile/collections assertions inspected actual sources against the exported assignment. The writer's draft-complete label is not editorial acceptance.

## Passed structural checks

- Exactly19 required UTF-8 files; ZIP CRC valid. Flat filenames checked before extraction; different existing bytes are never overwritten. Extracted sources equal archive bytes.
- All165 assigned C headings occur once in their assigned files, without extra C.
- All71 named error headings and210 H-level headings occur once.
- All1769 new spoken definitions are unique. With97 accepted opening lines, 1866 project-wide spoken definitions have no duplicate S ID.
- Each of six original/corrected Q pairs has one spoken definition. S_Q06_v1 is in C_CH06_04, though source08 assigns C_CH06_03. Uniqueness does not establish correct placement/disclosure.

## Actual text distribution

Counts include mutually exclusive responses and tool wording. They are not reading time or a minimum quality quota.

| File | C | Spoken S including reserved Q | Core01..08 spoken S |
|---|---:|---:|---:|
| script-ch01-r01.ko.md | 24 | 420 | 181 |
| script-ch02-r01.ko.md | 24 | 293 | 127 |
| script-ch03-r01.ko.md | 24 | 168 | 60 |
| script-ch04-r01.ko.md | 24 | 152 | 41 |
| script-ch05-r01.ko.md | 24 | 149 | 43 |
| script-ch06-r01.ko.md | 24 | 167 | 36 |
| script-ep-r01.ko.md | 6 | 83 | 0 |
| script-pr-rest-r01.ko.md | 11 | 277 | 0 |
| script-sys-r01.ko.md | 4 | 60 | 0 |

## Warnings and retained checker failures

31 hint scenes have exactly five spoken lines, one per H level. This is an editorial review signal; many actual lines lack separate held/missing/recent-error conditions and disclose future sources. 36 task scenes lack a literal Context section; some have Entry states, but local cast/place and conditional retries need inspection. A heading count cannot verify these behaviors.

The first strict hint-heading regex matched205/210 because H_V01 headings append descriptive titles and failed its assertion. Inspection confirmed all five definitions exist; allowing descriptive suffixes gives210/210. A second assertion incorrectly assumed the writer's1757 count covered all new spoken definitions. It excludes twelve reserved S_Qnn_v1/v2 lines. Actual inclusive count is1769 (1866 with the accepted opening). Both assumptions were corrected and the final assertions passed. No returned source was changed to make the checker pass. Revision notes should distinguish ordinary and reserved S counts explicitly.

## Source fingerprints

| File | SHA-256 |
|---|---|
| `writing/YEOWUL-full-draft-r01.zip` | `b1fbeb6efe7899b9ea575dbf945093ef00a4b892eb8c45e24eef796e456c4165` |
| `writing/full-draft-r01/script-ch01-r01.ko.md` | `d7f641c7fc7bf9450c508230be759c61a62af0de8db2f687b0e909df4a26b289` |
| `writing/full-draft-r01/script-ch01-r01.notes.md` | `22412481d12fa7fe59b95633be5aa43ad37811ce6c9f018140e74a8d7eb3b8ce` |
| `writing/full-draft-r01/script-ch02-r01.ko.md` | `d0f1cc1c4309167b24dc5bad6e35b435b68d8c956220774fd1ce79cee7ea1f81` |
| `writing/full-draft-r01/script-ch02-r01.notes.md` | `ab303849ff4a4311f8381c654a6fc652dae36f6781cd222e881c9751a88b83b1` |
| `writing/full-draft-r01/script-ch03-r01.ko.md` | `b03d196771cf1b563119f3ebd3d572bc404d41d14b8970d2368975867edeec7b` |
| `writing/full-draft-r01/script-ch03-r01.notes.md` | `eef643a44492bf34fab8d11b12c8191c0f2bf319980638d3984782118d56c032` |
| `writing/full-draft-r01/script-ch04-r01.ko.md` | `9fc83d52a7c8ef86610032fd8fd42f0e9103ca7639f921ad56d93f1717a9d483` |
| `writing/full-draft-r01/script-ch04-r01.notes.md` | `cd9374246fe3909d5a35fc0affde9c667851df73ad9fb233da3753682ac9fa50` |
| `writing/full-draft-r01/script-ch05-r01.ko.md` | `0ec7c394e290e0f515264a512f3a23c30d2af4d5ab86ff612103c00312e80159` |
| `writing/full-draft-r01/script-ch05-r01.notes.md` | `ac2a18a21c763d6e04e458aff14fefb8e14c5a681dfb3711473b2b2ef3e204ec` |
| `writing/full-draft-r01/script-ch06-r01.ko.md` | `1e06e2fd01349f3adb6f1117d3ff40551a01d00bb15b4a06d00e74ffe9c3b7db` |
| `writing/full-draft-r01/script-ch06-r01.notes.md` | `7068ab7347915293c725b57362f4a340a224485e0e33dac816daf798dafee81a` |
| `writing/full-draft-r01/script-ep-r01.ko.md` | `8f6f06b70e3de89bb2a6196b6018a9f9fd17671f20ab40259bf0bc1ccd8c2b68` |
| `writing/full-draft-r01/script-ep-r01.notes.md` | `f439a89bee985d2101c795626a3f963b2f6f8ca8425b31e09f5c12c4aa1e9808` |
| `writing/full-draft-r01/script-pr-rest-r01.ko.md` | `7bd208e43d7fff96b6cedd06044a624bceea1c47cc315b1ce05f992a27da537e` |
| `writing/full-draft-r01/script-pr-rest-r01.notes.md` | `dd9c28c7e8503a3622f1a638dc1413631b8cb3c457211bb23b2b5d2483f9875e` |
| `writing/full-draft-r01/script-sys-r01.ko.md` | `5559078d0bc657ddcc8b8a8f392a5970c3ec91d67f6e74e4d3d311a63682a04a` |
| `writing/full-draft-r01/script-sys-r01.notes.md` | `b01c25116cbb68ad1f32322f238567eba4db460c865687305206444223d1a986` |
| `writing/full-draft-r01/writing-progress.md` | `fd7143d8c2eb003a16ef34c7fd24d26bdce4f4fd7be4eabc5de02e77678b0ec3` |
| `scripts/pr-b01.ko.md` | `fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45` |

## Review scope and limits

Editorial inspection read the full prologue and SYS/EP text, core/optional scenes across chapters, and targeted D/Q/H/alternative-order passages. Global source scans cover all nine screenplays. Not every returned line has completed final acceptance reading: blocking findings require revision first. No complete-script acceptance, runtime, lint/build/e2e, visual/audio QA, or independent reader/playtest occurred. Counts and archive integrity cannot prove scene depth, natural Korean, valid proof or hint-state completeness.
