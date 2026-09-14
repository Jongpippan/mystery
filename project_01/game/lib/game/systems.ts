import type {GameState} from './state';
import {setupNodes} from './case';
import {presentation} from './presentation';
import {script} from './script';
export function recoveryLines(state:GameState){
  const child=presentation(state).companion,t=state.investigation?.task;
  const officer=!!t&&setupNodes(t.id).some(n=>n.speaker==='P07');
  const repeated=state.log.some(l=>l.nodeId==='S_SYS_01_0031');
  const ids=repeated?['0041',...(child?['0042']:officer?['0043']:[])]:['0001',...(child?['0011','0012']:officer?['0021','0022']:[])];
  return ids.map(id=>script.utterances[`S_SYS_01_${id}`]);
}
