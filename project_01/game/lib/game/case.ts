import * as ep from './epilogue';
import * as six from './chapter-six';
import * as five from './chapter-five';
import * as one from './chapter-one';
import * as two from './chapter-two';
import * as three from './chapter-three';
import * as four from './chapter-four';
export type {Draft,Judgment,Field,Challenge} from './chapter-one';
export const taskIds=[...one.taskIds,...two.taskIds,...three.taskIds,...four.taskIds,...five.taskIds,...six.taskIds] as const;
export type TaskId=typeof taskIds[number];
export const challenges={...one.challenges,...two.challenges,...three.challenges,...four.challenges,...five.challenges,...six.challenges};
export const stages={...one.stages,...two.stages,...three.stages,...four.stages,...five.stages,...six.stages,...ep.stages};
export const uiFeedback:Record<string,string>={...one.uiFeedback,...two.uiFeedback,...three.uiFeedback,...four.uiFeedback,...five.uiFeedback,...six.uiFeedback};
const isTwo=(id:TaskId):id is two.TaskId=>two.taskIds.includes(id as two.TaskId);
const isThree=(id:TaskId):id is three.TaskId=>three.taskIds.includes(id as three.TaskId);
const isFour=(id:TaskId):id is four.TaskId=>four.taskIds.includes(id as four.TaskId);
const isFive=(id:TaskId):id is five.TaskId=>five.taskIds.includes(id as five.TaskId);
const isSix=(id:TaskId):id is six.TaskId=>six.taskIds.includes(id as six.TaskId);
export const judge=(id:TaskId,d:one.Draft,held:string[])=>isSix(id)?six.judge(id,d,held):isFive(id)?five.judge(id,d,held):isFour(id)?four.judge(id,d,held):isThree(id)?three.judge(id,d,held):isTwo(id)?two.judge(id,d,held):one.judge(id,d,held);
export const setupNodes=(id:TaskId)=>isSix(id)?six.setupNodes(id):isFive(id)?five.setupNodes(id):isFour(id)?four.setupNodes(id):isThree(id)?three.setupNodes(id):isTwo(id)?two.setupNodes(id):one.setupNodes(id);
export const responseNodes=(id:TaskId,r:one.Judgment)=>isSix(id)?six.responseNodes(id,r):isFive(id)?five.responseNodes(id,r):isFour(id)?four.responseNodes(id,r):isThree(id)?three.responseNodes(id,r):isTwo(id)?two.responseNodes(id,r):one.responseNodes(id,r);
export const hintLine=(id:TaskId,level:number,held:string[],draft:one.Draft,error?:string,interrupted=false)=>isSix(id)?six.hintLine(id,level,held,draft,error,interrupted):isFive(id)?five.hintLine(id,level,held,draft,error,interrupted):isFour(id)?four.hintLine(id,level,held,draft,error,interrupted):isThree(id)?three.hintLine(id,level,held,draft,error,interrupted):isTwo(id)?two.hintLine(id,level,held,draft,error,interrupted):one.hintLine(id,level,held,draft,error);
export const stageNodes=(stage:string,known:string[],choices:Record<string,string>,entry:Record<string,string>={})=>stage.startsWith('ep-')?ep.stageNodes(stage,choices,entry):stage.startsWith('ch6-')?six.stageNodes(stage,known):stage.startsWith('ch5-')?five.stageNodes(stage,known):stage.startsWith('ch4-')?four.stageNodes(stage,known,choices):stage.startsWith('ch3-')?three.stageNodes(stage,known):stage.startsWith('ch2-')?two.stageNodes(stage,known,choices):one.stageNodes(stage,known,choices);
export const isOptionalStage=(stage:string)=>['photo','personal1','personal2','personal3','ch3-props'].includes(stage)||/^ch[23456]-personal/.test(stage);
export const chapterTwoOptions=two.options;
export const chapterTwoVisitHint=two.visitHint;

export const chapterThreeOptions=three.options;
export const chapterThreeVisitHint=three.visitHint;

export const chapterFourOptions=four.options;
export const chapterFourVisitHint=four.visitHint;

export const chapterFiveOptions=five.options;
export const chapterFiveVisitHint=five.visitHint;

export const chapterSixOptions=six.options;
export const chapterSixVisitHint=six.visitHint;
export const finalProofGroups=six.finalProofGroups;
export const finalErrorRole=six.finalErrorRole;
