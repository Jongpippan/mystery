export type NameSetup={draft:string;phase:'initial'|'editing'|'confirm'|'ready';lines:string[];heard:string[];confirmed:string};
export const initialNameSetup:NameSetup={draft:'나여백',phase:'initial',lines:['0001','0002'],heard:['0001','0002'],confirmed:''};
export type NameAction={type:'edit';value:string}|{type:'manual'|'check'|'default'|'confirm'|'back'};
export function nameReducer(state:NameSetup,action:NameAction):NameSetup {
  const set=(patch:Partial<NameSetup>,lines:string[])=>({...state,...patch,lines,heard:[...new Set([...state.heard,...lines])]});
  if(action.type==='edit')return {...state,draft:action.value};
  if(action.type==='manual')return set({phase:'editing'},[]);
  if(action.type==='back')return set({phase:'editing'},['0025','0026']);
  if(action.type==='default')return set({phase:'ready',confirmed:'나여백'},state.lines.includes('0031')?['0033','0034']:['0011','0012','0013']);
  if(action.type==='check'){
    const name=state.draft.trim();
    if(!name)return set({phase:'editing'},['0031','0032']);
    if([...name].length>20)return set({phase:'editing'},['0041','0042','0043']);
    return set({phase:'confirm',confirmed:name},name!==state.draft?['0051','0052','0053']:[]);
  }
  if(action.type==='confirm'&&state.phase==='confirm')return set({phase:'ready'},['0021','0022','0023','0024']);
  return state;
}
export function validNameSetup(value:unknown):value is NameSetup {
  if(!value||typeof value!=='object')return false;const s=value as NameSetup;
  const ids=['0001','0002','0011','0012','0013','0021','0022','0023','0024','0025','0026','0031','0032','0033','0034','0041','0042','0043','0051','0052','0053'];
  return typeof s.draft==='string'&&s.draft.length<=10000&&['initial','editing','confirm','ready'].includes(s.phase)&&typeof s.confirmed==='string'&&[...s.confirmed].length<=20&&Array.isArray(s.lines)&&Array.isArray(s.heard)&&[...s.lines,...s.heard].every(id=>ids.includes(id))&&(!['confirm','ready'].includes(s.phase)||!!s.confirmed.trim());
}
