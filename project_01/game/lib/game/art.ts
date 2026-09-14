import type {GameState} from './state';
// Neutral portraits remain the people index's stable identity image. Current
// expressions use the already presented scene, never hidden responsibility.
export function portraitPath(id:string,state?:GameState){
  if(!/^P0[0-9]$/.test(id))return null;
  const stage=state?.investigation?.stage??'';
  const variant=id==='P00'&&state?.investigation&&!stage.startsWith('ep-')?'-serious'
    :id==='P01'&&state?.revisit?.id.startsWith('rest-')?'-reflective'
    :id==='P02'&&state?.investigation&&!stage.startsWith('ep-')?'-concerned'
    :id==='P03'&&stage==='ep-account'?'-strained':'';
  return `/art/${id.toLowerCase()}${variant}.webp`;
}
// These are atmospheric current-place paintings. Exact experiment geometry,
// evidence wording and changing objects remain deterministic foregrounds.
export function locationPath(place:string,state?:GameState){
  if(/게스트하우스|내려가는 길|숙소로/.test(place))return null;
  const id=/현관/.test(place)?'l01':/휴게실/.test(place)?'l02'
    :/연회장.*동쪽 기록/.test(place)&&!state?.investigation?'l03-east'
    :/북쪽/.test(place)?'l04':/음향 부스/.test(place)&&!place.startsWith('연회장')?'l07'
    :/서비스/.test(place)?'l08':/수영장 상부/.test(place)&&state?.evidence.includes('E42')?'l09'
    :/주방/.test(place)?'l05-v2':/적재/.test(place)?'l06':/경사로/.test(place)?'l11'
    :/호숫가 보관 창고/.test(place)?'l12'
    :/연회장/.test(place)&&!(/동쪽|기록실/.test(place))&&(!!state?.investigation||Number(state?.sceneId.slice(-2))>=12)?'l03-v2':null;
  return id?`/art/${id}.webp`:null;
}
