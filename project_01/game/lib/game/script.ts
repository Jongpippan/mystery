import data from '@/content/screenplay.runtime.json';

export type ScriptNode = {
  id: string;
  kind: 'speech' | 'direction' | 'display' | 'evidence' | 'choice-label';
  text: string;
  section: string[];
  condition: string;
  speaker?: string | null;
  label?: string;
  evidenceId?: string;
};
export type ScriptScene = { id:string; title:string; context:string; file:string; nodes:ScriptNode[] };
export type EvidenceSource = { id:string; title:string; scene:string; text:string };
export type Corpus = {
  edition:string;
  sources:{file:string;sha256:string}[];
  scenes:Record<string,ScriptScene>;
  utterances:Record<string,ScriptNode & {scene:string}>;
  evidence:Record<string,EvidenceSource>;
};
export const script = {...data,utterances:Object.fromEntries(Object.values(data.scenes).flatMap(scene=>scene.nodes.filter(node=>node.kind==='speech').map(node=>[node.id,{...node,scene:scene.id}])))} as unknown as Corpus;
export const line = (id:string) => {
  const node=script.utterances[id];
  if (!node) throw new Error(`Unknown accepted utterance ${id}`);
  return node;
};

export function displayText(text:string, playerName:string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g,'$1')
    .replace(/`([^`]+)`/g,'$1')
    .replaceAll('{playerName}',()=>playerName);
}
