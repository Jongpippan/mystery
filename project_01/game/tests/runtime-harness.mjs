import {build} from 'esbuild';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve,dirname,basename} from 'node:path';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const temp=mkdtempSync(join(tmpdir(),'yeowul-ch02-')),require=createRequire(import.meta.url);
for(const entry of ['state','case','presentation','script','save-store','epilogue','evidence-index','record-index','site','travel','revisits','name-setup','systems'])await build({entryPoints:[`lib/game/${entry}.ts`],bundle:true,platform:'node',format:'cjs',outfile:join(temp,`${entry}.cjs`),alias:{'@':resolve('.')},logLevel:'silent'});
const {initialState,gameReducer:r,currentNode,taskNode,isSave,investigationOptions,acquiredPending,heldFacts,cargoProgress}=require(join(temp,'state.cjs'));
const {challenges,judge,hintLine,chapterTwoVisitHint,chapterThreeVisitHint,chapterFourVisitHint,chapterFiveVisitHint,chapterSixVisitHint,finalProofGroups,stageNodes}=require(join(temp,'case.cjs'));
const {presentation}=require(join(temp,'presentation.cjs'));
export const saveStore=require(join(temp,'save-store.cjs'));
export const recordIndex=require(join(temp,'record-index.cjs'));
export const site=require(join(temp,'site.cjs'));
export const travel=require(join(temp,'travel.cjs'));
export const revisits=require(join(temp,'revisits.cjs'));
export const nameSetup=require(join(temp,'name-setup.cjs'));
export const systems=require(join(temp,'systems.cjs'));
export const evidenceIndex=require(join(temp,'evidence-index.cjs'));
export const epilogue=require(join(temp,'epilogue.cjs'));
const {script}=require(join(temp,'script.cjs'));
assert.equal(dirname(resolve(temp)),resolve(tmpdir()));assert.ok(basename(temp).startsWith('yeowul-ch02-'));rmSync(temp,{recursive:true,force:true});
const answers={
 D01:{evidence:['E03','E05'],fields:{x6:'east',x9:'west',fixed:'boundary'}},
 D02:{evidence:['E04','E05'],fields:{history:'work'}},
 Q01:{evidence:['E06','E07'],fields:{statement:'S_Q01_v1',route:'sightline',scope:'limited'}},
 D03:{evidence:['E08','E07'],fields:{route:'sightline',scope:'limited'}},
 D04:{evidence:['E09'],fields:{first:'guest',second:'junction',third:'boundary',scope:'feasible'}},
 D05:{evidence:[],fields:{work:'preparation',witness:'overclaim',beneficiary:'weak',route:'open'}},
 D06:{evidence:['E11','E12','E14'],fields:{feature:'aligned',origin:'one'}},
 Q02:{evidence:['E12','E14'],fields:{statement:'S_Q02_v1',reason:'recorded'}},
 D07:{evidence:['E11','E15','E12'],fields:{created:'rehearsal',played:'output',presence:'unknown'}},
 D08:{evidence:['E16','E13'],fields:{contact:'receipt',scope:'moment'}},
 D09:{evidence:['E12','E17','E18'],fields:{first:'cue',second:'reset',third:'playback',support:'observed',precision:'minute'}},
 D10:{evidence:[],fields:{gap:'open',scope:'investigate'}}
};
for(const d of Object.values(answers))d.note='';
const fixtures={};
function restored(s){assert.ok(isSave(s),`invalid save ${s.sceneId}/${s.cursor}/${JSON.stringify(s.investigation?.task)}`);return r(initialState,{type:'restore',state:JSON.parse(JSON.stringify(s))});}
function pending(s){const id=acquiredPending(s);if(!id)return null;fixtures[`acquire-${id}`]=s;assert.equal(s.views.at(-1).detail,id);s=r(s,{type:'acknowledge',id});return r(s,{type:'viewBack'});}
function finishScene(s,choices={}){for(let n=0;n<1000;n++){
 s=restored(s);const ack=pending(s);if(ack){s=ack;continue;}
 const node=currentNode(s);assert.ok(node);
 if(s.investigation?.stage==='ch3-opening')fixtures[`cargo-${cargoProgress(s)}`]=s;
 if(['C_CH02_01:n0015','C_CH02_01:n0017','C_CH02_02:n0021','S_CH02_02_0007'].includes(node.id))fixtures[`event-${node.id.split(':').at(-1)}`]=s;
 if(['C_CH05_01:n0001','C_CH05_01:n0009','C_CH05_04:n0004','C_CH05_04:n0006','C_CH05_04:n0008','C_CH05_08:n0011'].includes(node.id))fixtures[`event-${node.id}`]=s;
 if(s.investigation?.stage.startsWith('ch6-')||s.investigation?.stage.startsWith('ep-'))fixtures[`event-${node.id}`]??=s;
 if(node.kind==='investigation'){if(s.investigation.stage==='ch2-sources'&&!s.investigation.knowledge.some(k=>['K08','K09'].includes(k)))fixtures.sourcesHub=s;return s;}
 if(node.kind==='speech'&&node.speaker==='P01')assert.equal(presentation(s).companion,node.id!=='S_CH03_05_0012',`child location ${node.id}`);
 if(node.kind==='choice'){fixtures[`choice-${node.choice}`]=s;s=r(s,{type:'choose',choice:node.choice,value:choices[node.choice]??node.options[0].value});}
 else s=r(s,{type:'advance'});
 }assert.fail('scene loop');}
function finishTask(s){for(let n=0;n<200;n++){
 s=restored(s);const t=s.investigation.task;if(!t||t.phase==='answer')return s;
 const node=taskNode(s);if(node?.speaker==='P01')assert.equal(presentation(s).companion,true,`task child absent ${node.id}`);
 const ack=pending(s);if(ack){s=ack;continue;}s=r(s,{type:'taskNext'});
 }assert.fail('task loop');}
function solve(s,id,photo=false){
 s=finishTask(r(s,{type:'task',id}));assert.equal(s.investigation.task?.id,id);fixtures[`task-${id}`]=s;
 const draft=photo&&id==='Q01'?{...answers.Q01,evidence:['E10','E18'],fields:{...answers.Q01.fields,route:'photo'}}:answers[id];
 s=r(s,{type:'draft',id,draft});const before=s.investigation.knowledge.length;
 const action={type:'submit',id,attempt:`solve-${id}`};s=r(s,action);assert.equal(s.investigation.task.result.kind,'success',id);assert.equal(s.investigation.knowledge.length,before);assert.equal(r(s,action),s);
 return finishTask(s);
}
function chapterOne(photo,prior,openingChoices={}){let s=finishScene(r(initialState,{type:'start',name:'나여백'}),{B_PR_02:prior,...openingChoices});
 for(let n=0;n<100;n++){
  s=finishScene(s);if(s.investigation.stage==='departure')return s;
  const options=investigationOptions(s);
  const option=(photo&&!s.evidence.includes('E10')?options.find(o=>o.id==='photo'):null)??options.find(o=>o.kind==='task'&&(o.id!=='Q01'||photo&&s.evidence.includes('E10')||s.investigation.completed.includes('wall')))??options.find(o=>o.kind==='visit'&&o.id!=='photo'&&!o.id.startsWith('personal'));
  assert.ok(option,`CH01 deadlock ${s.investigation.stage}`);s=option.kind==='visit'?r(s,{type:'visit',stage:option.id}):solve(s,option.id,photo);
 }assert.fail('CH01 loop');}

export {r,initialState,currentNode,taskNode,isSave,investigationOptions,acquiredPending,heldFacts,cargoProgress,challenges,judge,hintLine,chapterTwoVisitHint,chapterThreeVisitHint,chapterFourVisitHint,chapterFiveVisitHint,chapterSixVisitHint,finalProofGroups,stageNodes,presentation,script,answers,fixtures,restored,pending,finishScene,finishTask,solve,chapterOne};

Object.assign(answers,{
 D11:{evidence:['E20','E22'],fields:{shape:'rival'},note:''},
 D12:{evidence:['E21','E03'],fields:{route:'ramp',scope:'cart'},note:''},
 Q03:{evidence:['E20','E27'],fields:{statement:'S_Q03_v1',claim:'participation'},note:''},
 D13:{evidence:['E23','E24','E29'],fields:{chain:'custody',escort:'two'},note:''},
 D14:{evidence:['E25','E26'],fields:{layers:'separate'},note:''},
 D15:{evidence:['E24','E26','E27','E30'],fields:{responsibility:'separate',next:'originals'},note:''}
});

export function throughChapterThree(photo=false){let s=chapterOne(photo,'environment_first');for(let n=0;n<150;n++){s=finishScene(s,{B_PLAYBACK_RESPONSE:'need_time'});if(s.investigation.stage==='ch3-departure')return s;const o=investigationOptions(s).find(o=>!o.id.includes('personal'));assert.ok(o);s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);}assert.fail('prior chapters loop');}

Object.assign(answers,{
 D16:{evidence:['E31','E32','E33','E34'],fields:{E31:'loan',E32:'pledge',E33:'waiver',E34:'storage',scope:'distinct'},note:''},
 D17:{evidence:['E33','E34','E26'],fields:{comparison:'edges',scope:'reuse'},note:''},
 Q04:{evidence:['E31','E34'],fields:{statement:'S_Q04_v1',scope:'limited'},note:''},
 D18:{evidence:['E35','E37','E36'],fields:{movement:'bank',authority:'outside',origins:'independent'},note:''},
 D19:{evidence:['E19','E37','E38','E39'],fields:{pressure:'exposure',meeting:'intention'},note:''},
 D20:{evidence:[],fields:{P02:'loan',P06:'pledge',P03:'diversion',act:'open'},note:''}
});

export function throughChapterFour(photo=false){let s=throughChapterThree(photo);for(let n=0;n<100;n++){s=finishScene(s);if(s.investigation.stage==='ch4-departure')return s;const o=investigationOptions(s).find(o=>!o.id.includes('personal'));assert.ok(o);s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);}assert.fail('CH04 loop');}

Object.assign(answers,{
 D21:{evidence:['E40','E42'],fields:{visible:'motion',identity:'unknown'},note:''},
 Q05:{evidence:['E41'],fields:{statement:'S_Q05_v1',source:'one',request:'movement'},note:''},
 D22:{evidence:['E42','E43','E45'],fields:{fit:'push',basis:'witness'},note:''},
 D23:{evidence:['E43','E13','E17','E18'],fields:{before:'cue',after:'reset',margin:'outward',scope:'incident'},note:''},
 D24:{evidence:['E44','E46','E47','E10'],fields:{match:'coat',witness:'unknown'},note:''},
 D25:{evidence:['E27','E30'],fields:{remaining:'both',next:'custody'},note:''}
});

export function throughChapterFive(photo=false){let s=throughChapterFour(photo);for(let n=0;n<100;n++){s=finishScene(s);if(s.investigation.stage==='ch5-departure')return s;const o=investigationOptions(s).find(o=>!o.id.includes('personal'));assert.ok(o);s=o.kind==='visit'?r(s,{type:'visit',stage:o.id}):solve(s,o.id);}assert.fail('CH05 loop');}

Object.assign(answers,{
 D26:{evidence:['E49','E50','E29','E28'],fields:{basis:'continuity',scope:'object'},note:''},
 D27:{evidence:['E27','E48','E49','E51'],fields:{change:'fields',author:'unknown'},note:''},
 Q06:{evidence:['E28','E51'],fields:{statement:'S_Q06_v1',question:'copying'},note:''},
 D28:{evidence:['E49','E52','E13'],fields:{basis:'continuous',coverage:'15-23',scope:'actor'},note:''},
 D29:{evidence:['E10','E19','E46','E18'],fields:{person:'P03',reason:'roles'},note:''},
 D30:{evidence:[],fields:{order:'chronology_first',meeting:'originals',act:'supported',interval:'17-21',coat:'chain',copy:'access',origins:'one',responsibility:'separate'},roleEvidence:Object.fromEntries(finalProofGroups.map(g=>[g.id,[...g.sourceSets[0]]])),roleNotes:Object.fromEntries(finalProofGroups.map(g=>[g.id,'preserved '+g.id])),note:''}
});
