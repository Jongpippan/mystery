"""Replay the received draft's recorded edits, then apply bounded review corrections."""
from pathlib import Path
import hashlib
import json
import re

root = Path(__file__).resolve().parents[2]
raw = root / 'writing/full-draft-r03'
out = root / 'writing/working-r03-c01'
log = root / 'validation/full-r03-local-fixes.json'
record = json.loads(log.read_text())
texts = {p.name: p.read_text() for p in raw.glob('*.ko.md')}
ops = [op for op in record['operations'] if op['before'] != op['after']]
for op in ops:
    assert texts[op['file']].count(op['before']) == 1, op['anchor']
    texts[op['file']] = texts[op['file']].replace(op['before'], op['after'], 1)
for f in record['files']:
    assert hashlib.sha256((raw/f['file']).read_bytes()).hexdigest() == f['raw_sha256']
    assert texts[f['file']] == (out/f['file']).read_text()

def replace(file, before, after, reason, anchor):
    assert texts[file].count(before) == 1, (file, anchor, texts[file].count(before))
    texts[file] = texts[file].replace(before, after, 1)
    ops.append(dict(file=file, anchor=anchor, before=before, after=after, reason=reason))

def line(ch, sid, before, after, reason):
    file = f'script-{ch}-r03.ko.md'
    m = re.search(r'^\*\*[^\n]+\[' + re.escape(sid) + r'\]\*\*\s*\n(.*?)(?=\n\s*\n|\Z)', texts[file], re.M|re.S)
    assert m and before in m[1], sid
    replace(file, m[1], m[1].replace(before, after), reason, sid)

if not any(op['anchor'] == 'canonical-hint-bindings-D30' for op in ops):
    replace('script-ch02-r03.ko.md', '*저녁 직전 휴게실. 봉만실이 작은 상 하나를 차리다가 네 번째 수저를 놓고 멈춘다. 전날 표문식이 서서 식사하겠다고 고집했던 자리다.*', '*휴게실. 봉만실이 작은 상 하나를 차리다가 네 번째 수저를 놓고 멈춘다. 빈 자리를 보던 눈길이 잠시 머문다.*', 'CH02 follows lunch and precedes CH03 afternoon; the ballroom chair does not move to this lounge.', 'C_CH02_O3')
    line('ch02', 'S_CH02_O3_0001', '저 양반은 앉으라고 해도 그 의자는 서류 받는 자리라고 안 앉았어요.', '어제 연회장 창가에서 저 양반은 앉으라고 해도 그 의자는 서류 받는 자리라고 안 앉았어요.', 'Make the existing chair anecdote an explicit ballroom recollection.')
    replace('script-ch03-r03.ko.md', '- Entry: after the cart demonstration; no required E/K.', '- Entry: after the cart demonstration and before the C_CH03_07 handback; no required E/K. This is an adult-pause optional, and its availability is signalled before leaving for the handback.', 'Bound the existing pause to the actually established P02 supervision window.', 'C_CH03_O2')
    replace('script-ch01-r03.ko.md', '**P07 | 진새벽 [S_CH01_03_0012]**', '### Common test authorization — both Q01 states\n\n**P07 | 진새벽 [S_CH01_03_0012]**', 'Early Q01 correction must not skip the authorization used by the partition test.', 'C_CH01_03')
    line('ch01', 'S_CH01_04_0024', '맞습니다. 목격 자체를 없애지 않고, 그 두 번이 무엇까지 증명하는지만 묻겠습니다.', '맞습니다. 두 번의 목격은 그대로 남기고, 그 범위는 아까 정정한 기록대로 두겠습니다.', 'Do not reopen an already corrected testimony in its completed branch.')
    replace('script-ch01-r03.ko.md', '*만실 씨 목격 진술 추궁의 표준 북쪽 창 시야/의자에 걸린 재킷+행사 전 칸막이 이동 결론 경로가 열린다.*', '- Author state: the standard E06/E07+K02 proof route is available only if Q01 remains unresolved; the existing correction persists otherwise.', 'Do not present a second interrogation as newly required after early correction.', 'C_CH01_04')
    replace('script-sys-r03.ko.md', '*같은 D/Q 답안 화면으로 돌아가며 `확정 제출`이 다시 활성화된다.*', '*작성하던 답안 화면으로 돌아가며 `확정 제출`이 다시 활성화된다.*', 'Remove internal task notation from displayed direction.', 'C_SYS_01')
    replace('script-sys-r03.ko.md', '- 선택: `이 이름으로 시작` → Branch B의 확정 대사 `S_SYS_04_0021..0024`를 사용\n- 선택: `다시 입력` → Branch B의 재입력 대사 `S_SYS_04_0025..0026`를 사용', '- Author choice binding: `이 이름으로 시작` uses S_SYS_04_0021 through S_SYS_04_0024; `다시 입력` uses S_SYS_04_0025 through S_SYS_04_0026. Only the Korean labels are displayed.', 'Distinguish reusable script selection metadata from visible choices.', 'C_SYS_04')
    canonical = {
        'Q05': {'demand_guessed_coat_color': '0033'},
        'D22': {'open_gate_proves_push': '0032', 'test_is_record_of_past': '0033'},
        'D23': {'outage_alone_dates_death': '0032', 'recorded_voice_proves_alive_2030': '0033'},
        'D24': {'later_holder_is_actor': '0032', 'silhouette_identifies_red': '0033'},
        'D25': {'disputed_copy_already_identifies_actor': '0032'},
        'D19': {'rudeness_makes_all_motives_equal': '0032', 'note_predicts_exact_murder': '0033'},
        'D20': {'only_one_person_at_fault': '0032', 'finance_papers_prove_push': '0033'},
        'D26': {'original_label_or_profession_suffices': '0032'},
        'D27': {'printer_shifts_values_seven_minutes': '0032', 'all_pages_forged': '0033'},
        'Q06': {'custodian_saw_murder': '0032', 'original_clock_inherently_false': '0033'},
        'D28': {'walking_speed_exclusion': '0032', 'two_copy_accounts_are_independent': '0033'},
        'D29': {'culprit_name_only': '0032', 'motive_only': '0033', 'copy_edit_only': '0033', 'unsupported_all_witness_conspiracy': '0034'},
        'D30': {'missing_act_support': '0021', 'wrong_interval': '0032', 'wearer_equals_holder': '0033', 'one_origin_corroboration': '0034', 'unsupported_complicity': '0035', 'erased_collateral_responsibility': '0035'},
    }
    for task, bindings in canonical.items():
        c = 'C_H_' + task
        file = next(n for n, t in texts.items() if re.search(r'^## '+c+r'\b', t, re.M))
        scene = re.search(r'(?m)^## '+c+r'\b[\s\S]*?(?=^## |\Z)', texts[file])[0]
        for key, value in bindings.items():
            assert '### B_'+task+'_err_'+key in texts[file], (task, key)
            assert '[S_H_'+task+'_'+value+']' in scene, (task, value)
        marker = '#### Deterministic selector (normative)\n'
        extra = '- Canonical error binding (all prerequisites held, requested H3 only): ' + '; '.join('`B_'+task+'_err_'+k+'` → `S_H_'+task+'_'+v+'`' for k, v in bindings.items()) + '. These exact branch IDs take precedence over descriptive aliases below.\n'
        replace(file, scene, scene.replace(marker, marker+extra), 'Bind actual authored wrong-claim keys to the existing matching H3 response.', 'canonical-hint-bindings-'+task)

for file, t in texts.items():
    original = (raw/file).read_text()
    ids = lambda s: re.findall(r'^\*\*[^\n]+\[(S_[^\]]+)\]\*\*$', s, re.M)
    assert ids(t) == ids(original), file
    (out/file).write_text(t)
record['operations'] = ops
for f in record['files']:
    f['working_sha256'] = hashlib.sha256((out/f['file']).read_bytes()).hexdigest()
log.write_text(json.dumps(record, ensure_ascii=False, indent=2)+'\n')
print(f'PASS: exact replay, raw hashes, unchanged line IDs/order; {len(ops)} nonempty operations.')
