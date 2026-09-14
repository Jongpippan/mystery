import {script,type ScriptNode} from './script';
import {type Stage} from './chapter-one';
import type {RuntimeNode,GameState,InvestigationOption} from './state';

export const stages:Record<string,Stage>=Object.fromEntries(['handoff','account','staff','sound','departure','archive'].map((name,i)=>[`ep-${name}`,{scene:`C_EP_0${i+1}`,parts:[]}])) as Record<string,Stage>;
const matches=(heading:string,choices:Record<string,string>)=>[...heading.matchAll(/(B_\w+)=(\w+)/g)].every(([,key,value])=>choices[key]===value);
export const recapNodes=(choices:Record<string,string>)=>script.scenes.C_EP_06.nodes.filter(n=>n.section[0].startsWith('Branch recap')&&matches(n.section[1],choices));
export function stageNodes(stage:string,choices:Record<string,string>,entry:Record<string,string>):RuntimeNode[]{
 const nodes=script.scenes[stages[stage].scene].nodes;
 if(['ep-handoff','ep-account'].includes(stage))return nodes.filter(n=>n.section[0]==='Script');
 if(stage==='ep-staff'){
  const common=nodes.filter(n=>n.section[0]==='Script — common opening'),tail=nodes.filter(n=>n.section[0]==='Common continuation');
  if(entry.B_EXHIBIT)return [...common,...nodes.filter(n=>n.section[0]===`If B_EXHIBIT=${entry.B_EXHIBIT} already`),...tail];
  return [...common,script.utterances.S_EP_03_0011,{id:'B_EXHIBIT',kind:'choice',choice:'B_EXHIBIT',text:'직원 기록을 어떤 방식으로 남길까?',options:[{value:'attributed_accounts',text:'문서마다 작성·결정·책임 주체를 따로 적는다.'},{value:'joint_annotations',text:'당사자별 공동 주석을 같은 문서 옆에 병기한다.'}]},...nodes.filter(n=>n.section[1]===`Choice \`${choices.B_EXHIBIT}\``),...tail];
 }
 if(stage==='ep-sound')return [...nodes.filter(n=>n.section[0]==='Script — common opening'||n.section[0].startsWith('Callback')&&matches(n.section[0],choices)),{id:'B_SOUND',kind:'choice',choice:'B_SOUND',text:'이번 학교 과제에 남길 소리는?',options:[{value:'consented_voices',text:'허락한 사람의 목소리만, 용도를 말하고 새로 받는다.'},{value:'environment_only',text:'이번 과제는 장소 소리만 남긴다.'}]},...nodes.filter(n=>n.section[0]==='Choice B_SOUND'&&n.section[1]===`Option \`${choices.B_SOUND}\``)];
 if(stage==='ep-departure')return nodes.filter(n=>['Script','Common'].includes(n.section[0])||/^S_EP_05_006/.test(n.id)||n.id==='C_EP_05:n0021'||(n.section[0].startsWith('Callback')||n.section[0].startsWith('If B_SOUND'))&&matches(n.section[0],choices));
 return nodes.filter(n=>['Archive opening','Korean sourced summary','Responsibility boundary card'].includes(n.section[0])||recapNodes(choices).some(r=>r.id===n.id)||/^S_EP_06_001/.test(n.id)||n.id==='C_EP_06:n0024');
}
export function options(stage:string,done:string[],known:string[]):InvestigationOption[]{
 const visit=(id:string,label:string):InvestigationOption=>({kind:'visit',id,label});
 if(stage==='ch6-aftermath')return done.includes(stage)&&known.includes('K30')?[visit('ep-handoff','모눈을 봉만실에게 맡기고 현관에서 진새벽에게 기록 인계하기')]:[];
 if(!stage.startsWith('ep-')||stage==='ep-archive')return [];
 const out:InvestigationOption[]=[];
 if(!done.includes('ep-account'))out.push(visit('ep-account','진새벽과 연회장에서 차무록의 현재 설명 남기기'));
 if(!done.includes('ep-staff'))out.push(visit('ep-staff','휴게실 성인 탁자에서 직원 기록의 설명 방식 정리하기'));
 if(out.length)return out;
 if(!done.includes('ep-sound'))return [visit('ep-sound','모눈과 합류해 허가된 음향 부스 가장자리에서 과제 소리 고르기')];
 if(!done.includes('ep-departure'))return [visit('ep-departure','모눈과 현관으로 돌아가 짐과 남길 기록 확인하기')];
 return [visit('ep-archive','여울관을 떠나 이번 사건의 기록 보관함 열기')];
}
export function recordingState(state:GameState):'off'|'recording'|'complete'{
 if(state.investigation?.stage!=='ep-sound')return 'off';
 const nodes=stageNodes('ep-sound',state.choices,{}).slice(0,state.cursor+1);
 const reached=(id:string)=>nodes.some(n=>n.id===id);
 return reached('C_EP_04:n0024')||reached('C_EP_04:n0032')?'complete':reached('C_EP_04:n0022')||reached('C_EP_04:n0031')?'recording':'off';
}
export const archiveComplete=(state:GameState)=>!!state.investigation?.completed.includes('ep-archive');
export const corrections=Array.from({length:6},(_,i)=>{const q=`Q0${i+1}`;return {id:q,before:`S_${q}_v1`,after:`S_${q}_v2`,evidence:['E08','E15','E24','E36','E43','E52'][i]};});
export function heardNode(state:GameState,id:string):ScriptNode|undefined{return state.log.some(l=>l.nodeId===id)?script.utterances[id]:undefined;}
