import type {ReactNode} from 'react';
import {evidenceIndex} from '@/lib/game/evidence-index';

const ink='#284b46',paper='#fbf5e4',teal='#99b9a8',gold='#cfb477',blue='#527c96',red='#a84e41';
const Sheet=({x=20,y=6,w=56,h=60,children}:{x?:number;y?:number;w?:number;h?:number;children?:ReactNode})=><g><rect x={x} y={y} width={w} height={h} rx="2" fill={paper}/>{children}</g>;
const Lines=({x=28,y=22,w=38,n=3}:{x?:number;y?:number;w?:number;n?:number})=><g>{Array.from({length:n},(_,i)=><path key={i} d={`M${x} ${y+i*9}h${w-(i%2)*8}`}/>)}</g>;
const Person=({x,y=28,color=ink}:{x:number;y?:number;color?:string})=><g stroke={color}><circle cx={x} cy={y} r="4" fill={color}/><path d={`M${x} ${y+5}v18m-8-10 8-7 8 7m-8 10-7 10m7-10 7 10`}/></g>;
const Jacket=({color=blue,x=24,y=8}:{color?:string;x?:number;y?:number})=><g transform={`translate(${x} ${y})`}><path d="M11 4 3 12 0 32 9 35 13 20 13 53 37 53 37 20 41 35 50 32 47 12 39 4 31 0 19 0Z" fill={color}/><path d="M19 0 25 13 31 0M25 13v40M15 32h7M30 32h6" stroke={paper}/></g>;
const Window=({x=8,y=10,w=80,h=46,frost=true}:{x?:number;y?:number;w?:number;h?:number;frost?:boolean})=><g><rect x={x} y={y} width={w} height={h} fill={frost?'#d7dfd1':'#c7e1e4'}/><path d={`M${x} ${y+h*.55}h${w}`}/>{frost&&[.65,.8,.95].map(v=><path key={v} d={`M${x+3} ${y+h*v}h${w-6}`} opacity=".3"/>)}</g>;
const Cart=({opened=false,covered=false}:{opened?:boolean;covered?:boolean})=><g><path d="M10 52H74l8-36h7"/><circle cx="22" cy="61" r="5" fill={gold}/><circle cx="67" cy="61" r="5" fill={gold}/><rect x="16" y="23" width="52" height="28" fill={gold}/>{opened?<><path d="m16 23 7-13h49l-4 13" fill={paper}/><path d="M24 32h36m-36 8h36M42 29v17"/></>:covered?<path d="M10 46 18 20 58 18 75 46Z" fill="#b7b6a3"/>:<path d="M17 30h50M42 23v28"/>}</g>;
const Book=({folded=false,scorched=false}:{folded?:boolean;scorched?:boolean})=><g><path d="M10 12Q30 6 48 15Q69 5 87 12V60Q67 54 48 65Q27 54 10 60Z" fill={scorched?'#bdb395':paper}/><path d="M48 15v50M42 22h12m-12 9h12m-12 9h12m-12 9h12" stroke={teal}/>{folded?<path d="M55 19 78 16 78 51 56 57 65 37Z" fill="#bac8b5"/>:<><Lines x={17} y={23} w={21} n={4}/><Lines x={60} y={24} w={20} n={4}/></>}{scorched&&<path d="m10 12 5 5 6-5 5 5 6-6M11 47l6 4-4 9" stroke="#76634d" strokeWidth="5"/>}</g>;
const Wave=({y=32}:{y?:number})=><path d={`M10 ${y}h8l3-7 3 15 4-23 4 28 4-17 5 4 4-13 4 23 4-16 5 6h22`} stroke={blue}/>;
const Quote=({children}:{children:ReactNode})=><g><path d="M6 6h84v49H39L25 65V55H6Z" fill={paper}/>{children}</g>;
const Text=({x=48,y=30,children,color=ink,size=12}:{x?:number;y?:number;children:ReactNode;color?:string;size?:number})=><text x={x} y={y} textAnchor="middle" fill={color} stroke="none" fontSize={size} fontWeight="700">{children}</text>;
const Seal=({x=72,y=49}:{x?:number;y?:number})=><g><circle cx={x} cy={y} r="10" fill={teal}/><path d={`m${x-5} ${y} 3 4 7-9`}/></g>;
const Copier=({x=30,y=26}:{x?:number;y?:number})=><g transform={`translate(${x} ${y})`}><rect x="0" y="0" width="48" height="29" rx="3" fill={teal}/><path d="M9 0v-13h28V0M10 15h28v25H10Z" fill={paper}/><circle cx="40" cy="7" r="2" fill={ink}/></g>;

function Drawing({id}:{id:string}):ReactNode{
 switch(id){
 case 'E01':return <Sheet><rect x="28" y="13" width="38" height="12" fill={teal}/><Text y={23} size={10}>의뢰</Text><Lines y={33} n={2}/><path d="M30 56h14m9-3 5 4 8-8"/></Sheet>;
 case 'E02':return <><Sheet x={10} w={47}><path d="m19 37 8 8 18-20" strokeWidth="5"/><Text x={34} y={20} size={10}>안전</Text></Sheet><circle cx="74" cy="40" r="17" fill={paper}/><path d="m63 29 23 23" stroke={red} strokeWidth="4"/></>;
 case 'E03':return <><rect x="8" y="25" width="23" height="23" fill={teal}/><rect x="41" y="25" width="19" height="23" fill={gold}/><rect x="69" y="13" width="20" height="36" fill={paper}/><path d="M31 36h10m19 0h9M50 48v17M15 18v-12m-4 5 4-5 4 5"/><Text x={49} y={41} size={9}>현관</Text></>;
 case 'E04':return <Sheet x={10} w={65}><Text x={40} y={23}>19:40</Text><path d="M19 30h48"/><Text x={40} y={47}>정지선 9</Text><circle cx="72" cy="55" r="12" fill={gold}/><path d="M72 45v20m-10-10h20"/></Sheet>;
 case 'E05':return <><rect x="9" y="10" width="78" height="50" fill={paper}/><path d="M9 8h78M47 12v46M68 12v46"/><path d="M49 10h11M25 60h9m34 0h8" stroke={blue} strokeWidth="5"/><Text x={47} y={70} size={10}>6</Text><Text x={68} y={70} size={10}>9</Text></>;
 case 'E06':return <><Window x={4} w={88}/>{[18,48,78].map((x,i)=><g key={x}><path d={`M${x-7} 45V30h14v15m-14-4h14`}/>{i===0?<path d={`M${x-5} 24v9h10`} stroke={blue} strokeWidth="4"/>:<Person x={x} y={i===1?28:18}/>}</g>)}</>;
 case 'E07':return <><path d="M26 22V6h45v62M26 52h45M31 52v16" strokeWidth="4"/><Jacket x={25} y={10}/><rect x="48" y="39" width="13" height="18" fill={paper}/><path d="m50 44 9 0m-9 5h6"/></>;
 case 'E08':return <Quote><Window x={30} y={12} w={36} h={29}/><circle cx="17" cy="32" r="6"/><circle cx="80" cy="32" r="6"/><path d="M24 32h6m36 0h7M22 46h52" strokeDasharray="3 5"/></Quote>;
 case 'E09':return <><path d="M11 55V18h25v24h24V20h21" strokeWidth="5"/><path d="m71 12 10 8-10 8"/><path d="M10 8h24v17H10Z" fill={teal}/><path d="m62 52 8-7 8 7 8-7" stroke={red} strokeWidth="4"/></>;
 case 'E10':return <><rect x="6" y="5" width="84" height="62" fill={paper}/><Jacket color={red} x={31} y={8}/><path d="m61 17 7 10H56Z" fill={gold} stroke={paper}/><rect x="13" y="45" width="29" height="16" fill={teal}/><path d="m24 46 0-8m6 8v-9"/></>;
 case 'E11':return <><rect x="5" y="10" width="86" height="51" rx="4" fill={paper}/><Text y={24}>18:10</Text><Wave y={44}/><path d="M59 32v24" stroke={red} strokeDasharray="2 3"/></>;
 case 'E12':return <Sheet x={13} w={71}><Lines x={22} y={17} w={42} n={5}/><path d="M65 7h19v44l-10 10-9-10Z" fill={gold}/><path d="m74 42 10 9H74Z" fill={paper}/></Sheet>;
 case 'E13':return <><rect x="5" y="12" width="25" height="43" rx="4" fill={ink}/><rect x="9" y="19" width="17" height="25" fill={paper}/>{[47,78].map(x=><g key={x}><circle cx={x} cy="31" r="13" fill={paper}/><path d={`M${x} 22v9l7 5`}/></g>)}<Text y={67}>±1분</Text></>;
 case 'E14':return <><rect x="5" y="4" width="86" height="64" fill={paper}/><Wave y={23}/><Wave y={49}/><path d="M59 8v56" stroke={red} strokeDasharray="3 3"/><path d="M4 36h88" opacity=".4"/></>;
 case 'E15':return <Quote><rect x="15" y="16" width="10" height="20" rx="5" fill={teal}/><path d="M10 28v7q10 14 20 0v-7M20 42v7M35 30h15m-5-5 5 5-5 5"/><rect x="59" y="16" width="24" height="28" fill={paper}/><path d="m66 23 10 7-10 7Z" fill={blue}/></Quote>;
 case 'E16':return <><Sheet x={24} y={12} w={48} h={48}><Text y={31} size={10}>목록 1장</Text><Lines x={33} y={43} w={25} n={2}/></Sheet><path d="M3 35h22m-6-6 6 6-6 6M72 35h20m-7-6 7 6-7 6" stroke={blue}/></>;
 case 'E17':return <Sheet><Text y={22}>20:19</Text><path d="M29 31h13m12 0h13" stroke={red} strokeWidth="4"/><Text y={50}>20:20</Text><path d="M29 58h38" stroke={teal} strokeWidth="4"/></Sheet>;
 case 'E18':return <><rect x="7" y="32" width="44" height="8" fill={gold}/><path d="M12 40v23m35-23v23"/><rect x="17" y="18" width="23" height="14" fill={paper}/><Window x={62} y={11} w={28} h={34} frost={false}/><Person x={76} y={23}/><path d="M10 68h33m23-16h25" stroke={gold} strokeWidth="5"/><path d="m24 60 3-5m45 5 3-5" stroke={gold}/></>;
 case 'E19':return <><path d="M7 21V8h34l9 10h39v47H7Z" fill={gold}/><rect x="22" y="23" width="58" height="34" fill={paper} transform="rotate(-6 51 40)"/><Text x={50} y={45}>약속</Text><path d="M27 49h38"/></>;
 case 'E20':return <><Cart covered/><path d="M65 42h14v10h-8m8-8h11v12H77" fill={ink}/></>;
 case 'E21':return <><path d="M7 59h18V43h19V26h22V10h24" fill="none" strokeWidth="5"/><rect x="6" y="8" width="43" height="18" fill={gold}/><Text x={28} y={21} size={9}>0.72</Text><Text x={64} y={49} size={11}>0.70</Text><path d="M9 68h70" strokeDasharray="3 4"/></>;
 case 'E22':return <Sheet x={9} w={78}><Text y={20}>소품 목록</Text>{[27,53].map(x=><g key={x}><path d={`M${x} 28h10v22h8v8H${x}Z`} fill={gold}/><path d={`m${x-1} 36 12 5m-12-1 12 5`} stroke={teal}/></g>)}</Sheet>;
 case 'E23':return <><Cart opened/><path d="M80 23h6v24h7v8H78V23Z" fill={ink}/></>;
 case 'E24':return <Quote><path d="M14 36h56m-6-6 6 6-6 6" strokeWidth="3"/><rect x="12" y="23" width="20" height="11" fill={gold}/><circle cx="16" cy="39" r="3"/><circle cx="28" cy="39" r="3"/><Person x={49} y={17}/><path d="M60 15h22v17m-5-5 5 5 5-5" strokeDasharray="3 3"/></Quote>;
 case 'E25':return <><path d="m14 11 32 5-3 12 5 7-8 5 4 11-26 0-3-14 3-6Z" fill="#9e967d"/><path d="M20 24h18m-18 8h9"/><path d="m51 43 13-9 18 18-9 8-18-2Z" fill={paper}/><path d="m8 61 7-5 8 7 10-7 9 9 9-6" stroke="#76634d" strokeWidth="5"/></>;
 case 'E26':return <Book scorched/>;
 case 'E27':return <Sheet><Text y={21} size={11}>20:07</Text><Text y={38} size={11}>20:17</Text><rect x="28" y="47" width="38" height="9" fill={ink}/></Sheet>;
 case 'E28':return <><Sheet x={27} y={12} w={58} h={54}/><Sheet x={10} y={4} w={59} h={49}><Text x={39} y={20}>견본 00</Text><Lines x={19} y={29} w={39} n={2}/></Sheet><path d="M12 57h65" strokeDasharray="3 4"/><path d="M77 25v21m-4-4 4 4 4-4"/></>;
 case 'E29':return <><rect x="7" y="9" width="55" height="42" fill={paper}/><rect x="13" y="15" width="43" height="28" fill={gold}/><path d="M33 15v28M13 24h43"/><Sheet x={46} y={25} w={44} h={41}><Text x={68} y={41} size={10}>20:36</Text></Sheet><Seal x={72} y={54}/></>;
 case 'E30':return <><Book folded/><path d="M20 19q-9 12 0 12t0-12m15 17q-7 10 0 10t0-10" fill={blue} stroke="none" opacity=".6"/></>;
 case 'E31':return <Sheet><Text y={23}>대출</Text><path d="M29 32h35M30 40h32"/><circle cx="49" cy="53" r="9" fill={gold}/><Text y={57} size={12}>₩</Text></Sheet>;
 case 'E32':return <><Sheet x={27} y={12} w={53} h={54}/><Sheet x={13} y={4} w={54} h={53}><Text x={40} y={24}>담보</Text><path d="M22 33h35m-32 10h24"/></Sheet><circle cx="70" cy="55" r="12" fill={gold}/><Text x={70} y={60}>2</Text></>;
 case 'E33':return <><Sheet x={13} y={4} w={67} h={31}><Text y={24}>수령 포기</Text></Sheet><path d="m13 41 7-3 8 5 9-5 8 4 9-4 8 4 8-4 10 4v26H13Z" fill={paper}/><path d="M14 37h63" stroke={gold} strokeWidth="6" strokeDasharray="11 5"/><path d="M24 54h24m5 0h17M26 62h36"/></>;
 case 'E34':return <><Sheet x={7} y={10} w={42} h={52}><Text x={28} y={28} size={10}>외부 보관</Text><Lines x={14} y={39} w={26} n={2}/></Sheet><Sheet x={49} y={10} w={41} h={52}><Lines x={58} y={28} w={22} n={3}/></Sheet><path d="M45 19h9m-9 11h9m-9 11h9m-9 11h9" stroke={teal}/></>;
 case 'E35':return <>{[8,36,64].map((x,i)=><Sheet key={x} x={x} y={10+i*5} w={24} h={47}><Text x={x+12} y={28+i*5} size={9}>{['은행','등록','공사'][i]}</Text><Lines x={x+5} y={37+i*5} w={15} n={2}/></Sheet>)}</>;
 case 'E36':return <Quote><rect x="14" y="15" width="30" height="30" fill={teal}/><Text x={29} y={34} size={9}>보관</Text><path d="M49 15v31" strokeDasharray="3 4"/><circle cx="69" cy="30" r="14" fill={gold}/><Text x={69} y={35}>₩</Text></Quote>;
 case 'E37':return <><path d="M6 23h64v40H6Z" fill={gold}/><path d="m6 23 32 24 32-24"/><Sheet x={33} y={5} w={53} h={47}><Text x={59} y={24} size={11}>차이 통지</Text><Lines x={41} y={34} w={34} n={2}/></Sheet><Seal x={74} y={56}/></>;
 case 'E38':return <><path d="M11 10h75v48L74 69H11Z" fill="#e6d6a7"/><path d="M74 58h12L74 69Z" fill={paper}/><Text y={29}>담보 설명</Text><path d="M21 40h52M21 50h39"/><path d="m65 46 10 8" stroke={blue}/></>;
 case 'E39':return <><Sheet x={9} y={9} w={40} h={53}><Text x={29} y={30}>목적</Text><Lines x={17} y={42} w={22} n={2}/></Sheet><Sheet x={50} y={9} w={37} h={53}><Text x={68} y={30}>서명</Text><path d="m57 44 5 3 4-7 8 8 5-5"/></Sheet><path d="M44 3v65m8-65v65" stroke={teal} strokeWidth="4"/></>;
 case 'E40':return <><Window x={5} y={12} w={38} h={47} frost={false}/><Window x={53} y={12} w={38} h={47}/><Person x={24} y={25}/><path d="M70 27q-8 5-6 13m12-13q8 5 6 13" strokeWidth="7" opacity=".3"/></>;
 case 'E41':return <><path d="M12 7h66l9 12v46H12Z" fill={paper}/><path d="M78 7v12h9" fill={gold}/><Text y={26}>둘 · 앞으로</Text><Text y={45}>두 손</Text><path d="M22 55h49" strokeDasharray="2 5"/></>;
 case 'E42':return <><path d="M13 63V7h43v56"/><path d="m56 7 28 16v36L56 63Z" fill={teal}/><path d="M63 18v33m8-28v26m7-21v19"/><path d="M7 60h82" stroke={red} strokeWidth="5" strokeDasharray="8 4"/><path d="m26 21 12 20H14Z" fill={gold}/><Text x={26} y={37}>!</Text></>;
 case 'E43':return <Quote><Window x={14} y={13} w={68} h={35}/><Person x={34} y={25}/><path d="M34 36h19m-2-6 7 6-7 6M61 28l8 17" strokeWidth="4"/><circle cx="60" cy="21" r="4" fill={ink}/></Quote>;
 case 'E44':return <><path d="M13 10h27l-2 11 8 8-8 7 6 11-8 15H13Z" fill={red}/><path d="M51 10h28v52H52l7-15-6-11 7-7-8-8Z" fill={red}/><path d="m23 49 16-26 26 26Z" stroke={gold} strokeWidth="3" strokeDasharray="3 3"/><path d="M44 5h9M44 67h9"/></>;
 case 'E45':return <>{[5,35,65].map((x,i)=><g key={x}><rect x={x} y="9" width="27" height="48" fill={paper}/><path d={`M${x+7} 35l7-${i===0?12:4}m0 0 7 10M${x+6} 44h16`}/><circle cx={x+11} cy={i===0?18:24} r="3" fill={ink}/><Text x={x+14} y={68} size={10}>{['헛디딤','부축','접촉'][i]}</Text></g>)}</>;
 case 'E46':return <><path d="M4 8h39v31H26L15 47v-8H4Z" fill={paper}/><path d="M53 29h39v30H81L70 67v-8H53Z" fill={paper}/><Text x={24} y={24} size={10}>약 :26</Text><Text x={73} y={47} size={9}>:17 이전</Text><path d="m43 46 7-19" stroke={red} strokeWidth="4"/></>;
 case 'E47':return <><path d="M8 9h81M18 9v58m61-58v58" strokeWidth="4"/><Jacket x={25} y={10}/><path d="m33 45-2 7m10-7-2 7m23-6 5 2" stroke={paper}/><path d="m67 29 3 4m-3 4 3 2" stroke="#6a604a" strokeWidth="5"/></>;
 case 'E48':return <><path d="M6 8h27v15H6Z" fill={gold}/><path d="M20 8v-5M9 29h23m-23 8h23m-12-14v14"/><Copier x={41} y={25}/><path d="M32 36h8m-3-4 4 4-4 4"/></>;
 case 'E49':return <><Book/><rect x="56" y="21" width="26" height="26" fill={paper}/><Text x={69} y={32} size={9}>20:14</Text><Text x={69} y={44} size={9}>20:24</Text><rect x="59" y="50" width="20" height="5" fill={ink}/></>;
 case 'E50':return <><path d="M10 9h34v54H10Z" fill={paper}/><path d="M52 9h34v54H52Z" fill={paper}/>{[18,30,42,54].map(y=><g key={y}><circle cx="39" cy={y} r="2"/><circle cx="57" cy={y} r="2"/><path d={`M40 ${y}h16`} stroke={teal} strokeWidth="4"/></g>)}<Text x={24} y={44}>연속</Text><path d="M70 20v36" strokeDasharray="2 4"/></>;
 case 'E51':return <><Sheet x={10} y={6} w={48} h={54}><Text x={33} y={28} size={10}>:14</Text><Text x={33} y={45} size={10}>:24</Text></Sheet><Sheet x={42} y={14} w={45} h={52}><Text x={65} y={33} size={10}>:07</Text><Text x={65} y={50} size={10}>:17</Text><rect x="52" y="55" width="25" height="5" fill={ink}/></Sheet><path d="M36 33h15M36 49h15" stroke={red}/></>;
 case 'E52':return <Quote><Person x={17} y={17}/><Person x={32} y={17}/><path d="M45 12v35" strokeDasharray="3 3"/><g transform="translate(43 6) scale(.5)"><Copier x={12} y={29}/></g><path d="M18 49h52" stroke={teal} strokeWidth="3"/></Quote>;
 default:return null;
 }
}
export function EvidenceThumbnail({id}:{id:string}){
 const meta=evidenceIndex[id];if(!meta)return null;
 return <svg className="evidence-thumbnail" viewBox="0 0 96 72" role="img" aria-label={`자료 식별 그림: ${meta.motif}`} data-evidence-thumbnail={id} stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><Drawing id={id}/></svg>;
}
