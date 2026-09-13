# Full draft r02 — intake and local editorial checks

Date:2026-09-13. Actual return: YEOWUL-full-draft-r02.zip, nineteen UTF-8 files. Status: received revision candidate, not accepted. No runtime exists.

## Passed source checks

Local Python3 pathlib/re/collections/hashlib/zipfile assertions inspected the actual files against FULL-v2: 165 distinct assigned C in the correct files; every C has a Context heading; 71 named error headings; 210 H-level headings; 2156 candidate S plus97 accepted S =2253 unique definitions. All twelve Q v1/v2 definitions occur at their assigned locations. The writer's ID accounting matches the actual sets:1763 retained,393 new,6 retired. These checks establish structure, not meaningful scene/state coverage.

The ZIP CRC passes; all19 extracted files equal their archive bytes. Paths were checked as flat, relative, non-directory UTF-8 entries before extraction. The original ZIP and extracted r02 files were not edited.

## Actual revised spoken inventory

| File | r02 S | Retained | New | Retired |
|---|---:|---:|---:|---:|
| script-ch01-r02.ko.md | 437 | 420 | 17 | 0 |
| script-ch02-r02.ko.md | 343 | 293 | 50 | 0 |
| script-ch03-r02.ko.md | 260 | 167 | 93 | 1 |
| script-ch04-r02.ko.md | 215 | 152 | 63 | 0 |
| script-ch05-r02.ko.md | 209 | 149 | 60 | 0 |
| script-ch06-r02.ko.md | 267 | 162 | 105 | 5 |
| script-ep-r02.ko.md | 83 | 83 | 0 | 0 |
| script-pr-rest-r02.ko.md | 279 | 277 | 2 | 0 |
| script-sys-r02.ko.md | 63 | 60 | 3 | 0 |

## Codex consistency working edition

Nine unaccepted working screenplays are in writing/working-r02-c01. The23 bounded replacement operations in full-r02-local-fixes.json remove internal P/L codes from utterances, repair the E44 body-recovery connection, restore the PR13 historical observation location, distinguish the cut original seal from subsequent custody, correct the ending's pre-incident/pre-discovery confusion, remove a contradicted immediate-return promise and repair two Korean typos. No S IDs, C headings, branches, truth, core mechanism or accepted opening were changed. Two sequential replacements refine the same address;23 is the operation count, not23 unique utterances. Replaying the exact log against raw r02 reproduces all nine working files byte-for-byte.

The first repair attempt used Unicode word boundaries, which missed an L12 token directly followed by a Korean particle and failed a later exact-string assertion. It wrote only generated working files, never received sources. The selector was corrected to ASCII-ID boundaries; the full repair run and exact-log replay check passed. This retained failure concerns the repair script, not a changed original manuscript.

## Editorial scope and limits

Actual reading covered the full remaining prologue, all six core chapter sequences, selected optional scenes, all six Q scenes, full SYS/EP and targeted deduction/hint paths, plus returned progress/selected notes. The first combined CH01 output was truncated; core03–06 were reread in full separately. Global blockers in full-r02-review.md prevent acceptance. Full continuous reading of every D/H branch and every alternate-order combination is still pending; neither writer self-QA nor this structural pass is full G0/G1 acceptance. No runtime test, visual game inspection or independent first read/play occurred.

## Preserved/source fingerprints

| Source | SHA-256 |
|---|---|
| `project_01/game-plan/writing/YEOWUL-full-draft-r02.zip` | `c6f9c743d5736942549bea9e61324e3cfd50cc630162047f6a77eb0ff850257b` |
| `project_01/game-plan/writing/full-draft-r02/script-ch01-r02.ko.md` | `2a73932f508baffbcb12476c142396b94bf6a6bab7d4ef68c3703a520916e233` |
| `project_01/game-plan/writing/full-draft-r02/script-ch01-r02.notes.md` | `bf92b39132f6486087c56ab0efbd1aadb0b44258497175170a1525842d263041` |
| `project_01/game-plan/writing/full-draft-r02/script-ch02-r02.ko.md` | `0f74f9a66efabe40c97165219d9160e90ad7ac92b49b917e1a5edd4fdd2dfefc` |
| `project_01/game-plan/writing/full-draft-r02/script-ch02-r02.notes.md` | `f9bfba541beb19d154b321739d392a50058359e13f55fc8f0179de7e4d1c2c6c` |
| `project_01/game-plan/writing/full-draft-r02/script-ch03-r02.ko.md` | `02cba69a157e6a57bb2ba21b05538e419ab2ff1eca7c370940c2f03724b90f86` |
| `project_01/game-plan/writing/full-draft-r02/script-ch03-r02.notes.md` | `0641528ab757f11f86bc5b476f1adcfb8946b3f89de5198a05dfeac6516b6e80` |
| `project_01/game-plan/writing/full-draft-r02/script-ch04-r02.ko.md` | `3f13a80795c2cafb50477ad13a9d09936c4ac341ca1b3f73871ee8cd18903ba5` |
| `project_01/game-plan/writing/full-draft-r02/script-ch04-r02.notes.md` | `3d2e36c05b76207b54f14e87cf6e945902e7cd00f91a51e0f2e4cbdf7b4ea93e` |
| `project_01/game-plan/writing/full-draft-r02/script-ch05-r02.ko.md` | `52bc71e9e68904a5ab6be150da5f024692e0c063e68ef610653bf4c816b1b638` |
| `project_01/game-plan/writing/full-draft-r02/script-ch05-r02.notes.md` | `aa66507026561e1c690262328dcea5684e5f8425228ee986ac853e7cfe93d9dc` |
| `project_01/game-plan/writing/full-draft-r02/script-ch06-r02.ko.md` | `b74ed1f33ef67a374dee4b728b29456c6076dc11e66697df6f3aab7b4b0f8a4a` |
| `project_01/game-plan/writing/full-draft-r02/script-ch06-r02.notes.md` | `16c7177bae48662143f4955568173e46e0c64302827ef8bb4a7d8788f167ddad` |
| `project_01/game-plan/writing/full-draft-r02/script-ep-r02.ko.md` | `a22a10bc47298cd811fa036d133077b5a257aeaec29e4e26f1cafdd34e9e8580` |
| `project_01/game-plan/writing/full-draft-r02/script-ep-r02.notes.md` | `dd162343872923da66a32f704ab247c2a4c9e9339a5e1470bd680446bfbe92f8` |
| `project_01/game-plan/writing/full-draft-r02/script-pr-rest-r02.ko.md` | `3e00b17f455bb44e69b647b21a6eb8215c4d5167c600e4187c13de2eaa6d66df` |
| `project_01/game-plan/writing/full-draft-r02/script-pr-rest-r02.notes.md` | `40c240347f994c1a5a15812509c1c6ef28e5c95149f20d452e606fdd1b9f0f67` |
| `project_01/game-plan/writing/full-draft-r02/script-sys-r02.ko.md` | `44a2ed014dfb178773c50bf888814de560c826142748a923c3cdf8a91a3f615b` |
| `project_01/game-plan/writing/full-draft-r02/script-sys-r02.notes.md` | `0d93a5f2820e1459ef4b6fbba772a914dd85c27447df9a9054377b79ee214dc3` |
| `project_01/game-plan/writing/full-draft-r02/writing-progress.md` | `b38b63c3e31bebd97140d1943e2cc9b7724385880ba09b98f628b6adfe804d9d` |
| `project_01/game-plan/scripts/pr-b01.ko.md` | `fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45` |
| `project_01/game-plan/validation/full-r02-local-fixes.json` | `65877f73eec6719696e0c98020d67de487e07e460f91fc6f3ff42e3884c3543f` |
| `project_01/game-plan/writing/working-r02-c01/script-ch01-r02.ko.md` | `2a73932f508baffbcb12476c142396b94bf6a6bab7d4ef68c3703a520916e233` |
| `project_01/game-plan/writing/working-r02-c01/script-ch02-r02.ko.md` | `0f74f9a66efabe40c97165219d9160e90ad7ac92b49b917e1a5edd4fdd2dfefc` |
| `project_01/game-plan/writing/working-r02-c01/script-ch03-r02.ko.md` | `02cba69a157e6a57bb2ba21b05538e419ab2ff1eca7c370940c2f03724b90f86` |
| `project_01/game-plan/writing/working-r02-c01/script-ch04-r02.ko.md` | `3f13a80795c2cafb50477ad13a9d09936c4ac341ca1b3f73871ee8cd18903ba5` |
| `project_01/game-plan/writing/working-r02-c01/script-ch05-r02.ko.md` | `74012a7c55a29a93be57c455f5b08c44395d3d89777c68688867d6cf9b9056af` |
| `project_01/game-plan/writing/working-r02-c01/script-ch06-r02.ko.md` | `1f288d63dc69e788a1facb3a46d91fccec44420e3783570c40faa7b306fc73ad` |
| `project_01/game-plan/writing/working-r02-c01/script-ep-r02.ko.md` | `5100bc409a46aa788e180fb5b3c4e2d901a3dffa26e320f96da77a01cd04e21f` |
| `project_01/game-plan/writing/working-r02-c01/script-pr-rest-r02.ko.md` | `76b70689e8bc830752d190cef486637746bdc679d89aacbd0c9753b567a18e01` |
| `project_01/game-plan/writing/working-r02-c01/script-sys-r02.ko.md` | `9990806127a995a9947937b8a5eaa405a49303d81a40efcbd61510c063439c4e` |
