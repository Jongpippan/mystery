import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const canonical = resolve(root, '../game-plan/scripts');
const snapshots = resolve(root, 'content/source');
const sourceDir = existsSync(canonical) ? canonical : snapshots;
const files = readdirSync(sourceDir).filter((name) => name.endsWith('.ko.md')).sort();
const digest = (text) => createHash('sha256').update(text).digest('hex');
const corpus = { edition: 'accepted-full-r03-c01', sources: [], scenes: {}, utterances: {}, evidence: {} };
mkdirSync(snapshots, { recursive: true });

for (const file of files) {
  const text = readFileSync(resolve(sourceDir, file), 'utf8');
  if (sourceDir !== snapshots) writeFileSync(resolve(snapshots, file), text);
  corpus.sources.push({ file, sha256: digest(text) });
  const chunks = [...text.replace(/\r\n/g,'\n').matchAll(/^## (C_\w+) — ([^\n]+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)];
  for (const match of chunks) {
    const [, id, title, body] = match;
    if (corpus.scenes[id]) throw new Error(`Duplicate scene ${id}`);
    const scene = { id, title, file, context: '', nodes: [] };
    const lines = body.split('\n');
    let section = [], condition = '', serial = 0, inContext = false, evidence = null;
    const add = (node) => scene.nodes.push({ id: `${id}:n${String(++serial).padStart(4, '0')}`, section: [...section], condition, ...node });
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const heading = line.match(/^(#{3,6}) (.+)$/);
      if (heading) {
        const depth = heading[1].length - 3;
        section = section.slice(0, depth); section[depth] = heading[2];
        condition = ''; inContext = heading[2] === 'Context';
        const e = heading[2].match(/^(E\d\d) — (.+)$/);
        evidence = e ? { id: e[1], title: e[2], scene: id, text: '' } : null;
        if (e) {
          if (corpus.evidence[e[1]]) throw new Error(`Duplicate evidence ${e[1]}`);
          corpus.evidence[e[1]] = evidence;
          add({ kind: 'evidence', evidenceId: e[1], text: '' });
        }
        continue;
      }
      if (inContext) { scene.context += line + '\n'; continue; }
      const speaker = line.match(/^\*\*([^\n]+)\[(S_[^\]]+)\]\*\*$/);
      if (speaker) {
        const sid = speaker[2];
        if (corpus.utterances[sid]) throw new Error(`Duplicate line ${sid}`);
        while (i+1 < lines.length && !lines[i+1].trim()) i++;
        const paragraph = [];
        while (i+1 < lines.length && lines[i+1].trim() && !/^#{2,}|^\*\*.+\[S_/.test(lines[i+1])) paragraph.push(lines[++i]);
        const pid = speaker[1].match(/P\d\d/)?.[0] ?? (speaker[1].includes('표문식') ? 'P08' : null);
        const node = { kind: 'speech', id: sid, speaker: pid, label: speaker[1].trim().replace(/\s*\|\s*/, ' · '), text: paragraph.join('\n') };
        if (!node.text.trim()) throw new Error(`Empty line ${sid}`);
        add(node); corpus.utterances[sid] = { ...node, scene: id };
        continue;
      }
      if (/^\*\*If\b|^\*\*Recent error:|^\*\*Route [AB]/.test(line)) { condition = line.replace(/^\*\*|\*\*$/g, ''); continue; }
      if (/^\*[^*].*\*\s*$/.test(line)) {
        add({ kind: 'direction', text: line.trim().slice(1,-1) }); continue;
      }
      if (line.startsWith('>')) {
        const parts = [line.replace(/^> ?/, '')];
        while (i+1 < lines.length && lines[i+1].startsWith('>')) parts.push(lines[++i].replace(/^> ?/, ''));
        const content = parts.join('\n');
        if (evidence) { evidence.text += content; evidence = null; }
        else add({ kind: 'display', text: content });
        continue;
      }
      const label = line.match(/^- Label: \*\*(.+)\*\*$/);
      if (label) add({ kind: 'choice-label', text: label[1] });
    }
    scene.context = scene.context.trim(); corpus.scenes[id] = scene;
  }
}
// The received chapter-one closing line is outside C headings. Bind it explicitly
// to the existing chapter-exit adapter, not to the preceding optional conversation.
const extraText = readFileSync(resolve(sourceDir,'ch01.ko.md'),'utf8');
const closing = extraText.match(/\*\*P00 \| 나여백 \[S_CH01_END_0001\]\*\*\s*\n([^\n]+)/);
if (!closing) throw new Error('Missing authored CH01 closing line');
const closingNode = { id:'S_CH01_END_0001',kind:'speech',speaker:'P00',label:'P00 · 나여백',text:closing[1],section:['Chapter exit'],condition:'K05; after C_CH01_08'};
corpus.scenes.C_CH01_08.nodes.push(closingNode);
corpus.utterances.S_CH01_END_0001 = {...closingNode,scene:'C_CH01_08'};
const expectedLines = files.flatMap(file => [...readFileSync(resolve(sourceDir,file),'utf8').matchAll(/^\*\*[^\n]+\[(S_[^\]]+)\]\*\*$/gm)].map(m=>m[1]));
const missing = expectedLines.filter(id=>!corpus.utterances[id]);
if (missing.length) console.error('Missing imported utterances:',missing);
const counts = { files: files.length, scenes: Object.keys(corpus.scenes).length, utterances: Object.keys(corpus.utterances).length, evidence: Object.keys(corpus.evidence).length };
if (JSON.stringify(counts) !== JSON.stringify({ files:10, scenes:170, utterances:2258, evidence:52 })) throw new Error(`Import coverage failed ${JSON.stringify(counts)}`);
for (const e of Object.values(corpus.evidence)) if (!e.text) throw new Error(`Empty evidence ${e.id}`);
writeFileSync(resolve(root, 'content/screenplay.generated.json'), JSON.stringify(corpus, null, 2)+'\n');
// Runtime looks up utterances from scene nodes. Keep the complete audit corpus
// above; omit duplicate spoken text and unused author contexts from the client.
const runtime={edition:corpus.edition,sources:corpus.sources,scenes:corpus.scenes,evidence:corpus.evidence};
runtime.scenes=Object.fromEntries(Object.entries(corpus.scenes).map(([id,scene])=>[id,{...scene,context:''}]));
writeFileSync(resolve(root,'content/screenplay.runtime.json'),JSON.stringify(runtime)+'\n');
console.log('Imported accepted source:', counts);
