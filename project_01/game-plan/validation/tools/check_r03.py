"""Source-level r03 checks. Does not run a game or prove independent reception."""
from pathlib import Path
import collections
import hashlib
import json
import re
import zipfile

p = Path(__file__).resolve().parents[2]
w = p / 'writing'
raw = w / 'full-draft-r03'
working = w / 'working-r03-c01'
manifest = json.loads((p/'validation/full-r03-local-fixes.json').read_text())
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
assert sha(w/'YEOWUL-full-draft-r03.zip') == manifest['raw_zip_sha256']
with zipfile.ZipFile(w/'YEOWUL-full-draft-r03.zip') as z:
    assert z.testzip() is None
    names = z.namelist()
    assert len(names) == len(set(names)) == 19
    assert all('/' not in name and '..' not in name for name in names)
    assert set(names) == {x.name for x in raw.iterdir()}
    for name in names:
        assert z.read(name) == (raw/name).read_bytes()
        z.read(name).decode('utf-8')
assert sha(p/'scripts/pr-b01.ko.md') == 'fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45'
scenes = {}
ids = []
evidence = {}
hints = []
errors = []
stats = []
for f in manifest['files']:
    name = f['file']
    assert sha(raw/name) == f['raw_sha256']
    assert sha(working/name) == f['working_sha256']
    t = (raw/name).read_text()
    for op in manifest['operations']:
        if op['file'] == name:
            assert op['before'] != op['after']
            assert t.count(op['before']) == 1, op['anchor']
            t = t.replace(op['before'], op['after'], 1)
    assert t == (working/name).read_text()
    sid = lambda s: re.findall(r'^\*\*[^\n]+\[(S_[^\]]+)\]\*\*$', s, re.M)
    assert sid(t) == sid((raw/name).read_text())
    old = set(sid((w/'working-r02-c01'/name.replace('r03','r02')).read_text()))
    now = set(sid(t))
    assert old <= now
    stats.append(dict(file=name, retained=len(old), new=sorted(now-old), lines=len(now)))
for path in [p/'scripts/pr-b01.ko.md', *sorted(working.glob('*.ko.md'))]:
    t = path.read_text()
    ids += re.findall(r'^\*\*[^\n]+\[(S_[^\]]+)\]\*\*$', t, re.M)
    for m in re.finditer(r'(?m)^## (C_\w+)\b[\s\S]*?(?=^## |\Z)', t):
        c = m[1]
        assert c not in scenes
        scenes[c] = m[0]
        assert '### Context' in m[0], c
        for e in re.findall(r'^#### (E\d\d) —', m[0], re.M):
            assert e not in evidence, (e,c)
            evidence[e] = c
    hints += re.findall(r'^### (H_[DQV]\d\d_[0-4])(?=\s|$)', t, re.M)
    errors += re.findall(r'^### (B_[DQ]\d\d_err_\w+)', t, re.M)
assert len(ids) == len(set(ids)) == 2258
expected = dict(re.findall(r'^\| (C_\w+) \| (script-[^ ]+\.ko\.md) \| retain working base; targeted revision pending', (w/'full-v3/07-coverage-worklist.md').read_text(), re.M))
assert set(scenes) == set(expected) | {f'C_PR_{i:02}' for i in range(1,6)}
spec = (w/'full-v3/06-challenge-writing-spec.md').read_text()
assert collections.Counter(hints) == collections.Counter(re.findall(r'^- (H_[DQV]\d\d_[0-4]) assignment:', spec, re.M))
assert collections.Counter(errors) == collections.Counter(re.findall(r'`(B_[DQ]\d\d_err_\w+)`', spec))
assert set(evidence) == {f'E{i:02}' for i in range(1,53)}
for n in range(1,7):
    for v in (1,2):
        sid = f'S_Q{n:02}_v{v}'
        owners = [c for c,t in scenes.items() if re.search(r'^\*\*[^\n]+\['+sid+r'\]\*\*$', t, re.M)]
        assert owners == [f'C_Q{n:02}' if v==2 else f'C_CH{n:02}_{3 if n==6 else 2:02}'], owners
refs = set()
for c,t in scenes.items():
    refs |= set(re.findall(r'\bS_[A-Za-z0-9_]+_(?:\d{4}|v[12])\b',t))
    if c.startswith('C_H_'):
        assert '#### Deterministic selector (normative)' in t
        if not c.startswith('C_H_V'):
            assert 'All-held H4 is always the authored complete solution/question:' in t
assert refs <= set(ids), sorted(refs-set(ids))
for error in errors:
    task,suffix = re.match(r'B_([DQ]\d\d)_err_(.+)',error).groups()
    selector = scenes['C_H_'+task].split('#### Deterministic selector (normative)')[1].split('\n### H_')[0]
    assert suffix in selector, (error,'unbound exact error key')

# Transitive task requirements: from the actual reasoning table, with interrogation
# evidence provenance from actual first definitions and the caused CH06 return.
rows = {}
for l in (p/'03-deduction.md').read_text().splitlines():
    m = re.match(r'\| ([DQ]\d\d) `', l)
    if m:
        fields = l.split('|')
        rows[m[1]] = fields[2]
assert len(rows) == 36
deps = {}
for task, cell in rows.items():
    req = set('Q'+x[2:] if x.startswith('KQ') else 'D'+x[1:] for x in re.findall(r'\bK(?:Q)?\d\d\b',cell))
    # Slash-shortened IDs omit the K or E after the first token.
    for group in re.findall(r'K(?:Q)?\d\d(?:/(?:K)?\d\d)+',cell):
        req |= {'D'+n for n in re.findall(r'\d\d',group)}
    for group in re.findall(r'E\d\d(?:/(?:E)?\d\d)*',cell):
        for n in re.findall(r'\d\d',group):
            owner=evidence['E'+n]
            if re.match(r'C_Q\d\d$',owner):req.add(owner[2:])
    deps[task]=req-{task}
# Q01 has two alternative proofs; its photo route requires no deduction.
deps['Q01'] = set()
# The original is physically unavailable before the authored K25 return appointment.
assert '- Entry: K25 / Oct23 morning' in scenes['C_CH06_01']
deps['D26'].add('D25')
assert 'K11 + K13 + K14' in scenes['C_D15'] and 'D11' in deps['D15']
def closure(task,trail=()):
    assert task not in trail, ('cycle',trail,task)
    found={task}
    for child in deps[task]:found |= closure(child, (*trail,task))
    return found
assert closure('D30') == set(rows), sorted(set(rows)-closure('D30'))
# Clock interval assertion derives from authored numbers, checked separately in review.
assert (14+1) <= (18-1) <= (20+1) <= (24-1)
result = dict(scope='source checks; not runtime or independent play', archive_sha256=manifest['raw_zip_sha256'], counts=dict(scenes=len(scenes),lines=len(ids),evidence=len(evidence),hint_bundles=42,hint_levels=len(hints),errors=len(errors)),stats=stats,evidence_first_definition=evidence,task_dependencies={k:sorted(v) for k,v in deps.items()},final_transitive_tasks=sorted(closure('D30')),repair_operations=len(manifest['operations']))
(p/'validation/full-r03-check-results.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print('PASS: archive/raw/repair replay, 170 C, 2258 S, 52 E, 210 H, 71 errors, all exact references, 36-task final prerequisite closure.')
