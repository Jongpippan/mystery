import {isSave,type GameState} from './state';
import {initialNameSetup,validNameSetup,type NameSetup} from './name-setup';
export const SAVE_STORE_KEY='yeowul-saves-v2';
const LEGACY_KEY='yeowul-save-v1';
export type SaveSlot={id:string;state:GameState|null};
export type SaveStore={version:2;active:string;slots:SaveSlot[]};
type StoragePort=Pick<Storage,'getItem'|'setItem'>;
const NAME_SETUP_KEY='yeowul-name-setup-v1';
const SETTINGS_KEY='yeowul-settings-v1';
export function readSettings(storage:StoragePort){const raw=storage.getItem(SETTINGS_KEY);if(!raw)return null;const s=JSON.parse(raw);return s&&Number.isFinite(s.textScale)&&s.textScale>=1&&s.textScale<=2&&Number.isFinite(s.audioVolume)&&s.audioVolume>=0&&s.audioVolume<=1?s as {textScale:number;audioVolume:number}:null;}
export function saveSettings(storage:StoragePort,state:Pick<GameState,'textScale'|'audioVolume'>){storage.setItem(SETTINGS_KEY,JSON.stringify({textScale:state.textScale,audioVolume:state.audioVolume??.7}));}
export function readNameSetup(storage:StoragePort):NameSetup {const raw=storage.getItem(NAME_SETUP_KEY);if(!raw)return initialNameSetup;const value=JSON.parse(raw);return validNameSetup(value)?value:initialNameSetup;}
export function saveNameSetup(storage:StoragePort,value:NameSetup){if(!validNameSetup(value))throw Error('이름 입력 상태를 저장할 수 없습니다.');storage.setItem(NAME_SETUP_KEY,JSON.stringify(value));}
export function readSaveStore(storage:StoragePort):SaveStore{
 const raw=storage.getItem(SAVE_STORE_KEY);
 if(raw){
  const v=JSON.parse(raw) as SaveStore;
  if(v.version!==2||typeof v.active!=='string'||!Array.isArray(v.slots)||!v.slots.length||v.slots.some(s=>!s||typeof s.id!=='string'||!s.id||s.state!==null&&!isSave(s.state))||new Set(v.slots.map(s=>s.id)).size!==v.slots.length||!v.slots.some(s=>s.id===v.active))throw Error('저장 슬롯을 읽을 수 없습니다. 기존 기록은 보존됩니다.');
  return v;
 }
 const legacy=storage.getItem(LEGACY_KEY),state=legacy?JSON.parse(legacy):null;
 if(state!==null&&!isSave(state))throw Error('이전 저장 기록을 읽을 수 없습니다. 기존 기록은 보존됩니다.');
 return {version:2,active:'first',slots:[{id:'first',state}]};
}
export function saveCurrent(storage:StoragePort,state:GameState):SaveStore{
 if(!isSave(state))throw Error('현재 기록을 저장할 수 없습니다.');
 const store=readSaveStore(storage),next={...store,slots:store.slots.map(s=>s.id===store.active?{...s,state:{...state,savedAt:new Date().toISOString()}}:s)};
 storage.setItem(SAVE_STORE_KEY,JSON.stringify(next));return next;
}
export function createSaveSlot(storage:StoragePort,id:string,current?:GameState):SaveStore{
 const store=current?saveCurrent(storage,current):readSaveStore(storage);
 if(!id||store.slots.some(s=>s.id===id))throw Error('다른 저장 슬롯 이름이 필요합니다.');
 const next:SaveStore={version:2,active:id,slots:[...store.slots,{id,state:null}]};storage.setItem(SAVE_STORE_KEY,JSON.stringify(next));return next;
}
export function activateSaveSlot(storage:StoragePort,id:string,current?:GameState):GameState{
 const store=current?saveCurrent(storage,current):readSaveStore(storage),slot=store.slots.find(s=>s.id===id);
 if(!slot?.state)throw Error('이어 읽을 기록이 없습니다.');
 storage.setItem(SAVE_STORE_KEY,JSON.stringify({...store,active:id}));return slot.state;
}
