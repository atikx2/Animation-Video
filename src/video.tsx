import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import '@fontsource/hind-siliguri/400.css';
import '@fontsource/hind-siliguri/600.css';
import '@fontsource/hind-siliguri/700.css';

const fontFamily = 'Hind Siliguri';
export type Part = 1|2|3;
export type Platform = 'youtube'|'facebook';
type Scene = {start:number; kind:string; text:string; tag?:string};
const scenes:Record<Part,Scene[]> = {
  1:[
    {start:0,kind:'departure',text:'সংসার ভাঙল, দোষ পেল মা',tag:'পর্ব ১'},
    {start:7.4,kind:'judgment',text:'তালাকি',tag:'সমাজের বিচার'},
    {start:15.7,kind:'alone',text:'কিছু কথা বুকে রাখতে হয়'},
    {start:23,kind:'motherChild',text:'সন্তানের মন ভাঙতে চায়নি মা'}
  ],
  2:[
    {start:0,kind:'sewing',text:'সেলাই করে ছেলেকে মানুষ করেছে',tag:'পর্ব ২'},
    {start:7.8,kind:'grown',text:'ছেলের যোগ্যতা নয়',tag:'জীবনের বড় দিন'},
    {start:11.7,kind:'judgment2',text:'বিচার হলো মায়ের অতীতের'}
  ],
  3:[
    {start:0,kind:'confront',text:'আবার সমাজের মুখোমুখি',tag:'শেষ পর্ব'},
    {start:9,kind:'together',text:'মাকে দোষ দিয়ে থেমে যাবেন না'},
    {start:20.6,kind:'end',text:'বাপের নাম একটা…\nমায়ের সংগ্রাম হাজারটা।'}
  ]
};
const colors={ink:'#292b35',skin:'#bd8067',skin2:'#db9c7f',gold:'#f2c579',cream:'#fdf0d9'};

const Person:React.FC<{x:number;y:number;scale?:number;role:'mother'|'child'|'father'|'son'|'aunt'|'elder'; mood?:'sad'|'neutral'|'strong';frame:number}> = ({x,y,scale=1,role,mood='neutral',frame}) => {
 const kid=role==='child'; const mother=role==='mother'; const hair=mother?'#34313d':role==='elder'?'#a6a2a2':'#30313b';
 const shirt=mother?'#a65258':role==='son'?'#526a7b':role==='child'?'#d59a53':role==='aunt'?'#8f748b':role==='elder'?'#c7bca7':'#6d7882';
 const bob=Math.sin(frame/19)*3; const blink=frame%104<4;
 return <g transform={`translate(${x} ${y+bob}) scale(${scale})`} stroke={colors.ink} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
  <path d="M-38 165 L-43 240 Q-43 250 -32 250 L-16 250 L-8 175 M38 165 L43 240 Q43 250 32 250 L16 250 L8 175" fill="#4d4a51"/>
  <path d="M-65 80 Q-92 92 -94 153 Q-92 165 -80 162 L-49 115 M65 80 Q92 92 94 153 Q92 165 80 162 L49 115" fill={colors.skin2}/>
  <rect x="-64" y="70" width="128" height="110" rx="22" fill={shirt}/>
  {mother && <path d="M-58 78 L-4 177 L18 177 L-36 75 Z" fill="#e6af8c" opacity=".8"/>}
  <path d="M-50 4 Q-53 -47 0 -48 Q53 -47 50 4 L47 25 Q40 63 0 67 Q-40 63 -47 25 Z" fill={colors.skin2}/>
  <path d="M-50 5 Q-58 -48 0 -51 Q54 -50 50 5 Q28 -20 -3 -23 Q-25 -10 -50 5Z" fill={hair}/>
  {mother && <path d="M-47 -20 Q-70 8 -58 65 L-42 70 L-38 0 M47 -20 Q70 8 58 65 L42 70 L38 0" fill={hair}/>}
  {role==='father' && <path d="M-24 41 Q0 58 24 41 Q19 62 0 64 Q-19 62 -24 41" fill={hair}/>}
  {role==='elder' && <><circle cx="-20" cy="20" r="13" fill="none"/><circle cx="20" cy="20" r="13" fill="none"/><path d="M-7 20 H7" fill="none"/></>}
  <path d={mood==='sad'?'M-31 10 L-13 14 M13 14 L31 10':'M-30 10 L-13 9 M13 9 L30 10'} fill="none"/>
  {blink?<path d="M-26 21 h12 M14 21 h12" fill="none"/>:<><circle cx="-20" cy="21" r="3.5" fill={colors.ink}/><circle cx="20" cy="21" r="3.5" fill={colors.ink}/></>}
  <path d={mood==='sad'?'M-12 45 Q0 38 12 45':mood==='strong'?'M-12 44 H12':'M-12 41 Q0 48 12 41'} fill="none"/>
  {mood==='sad'&&!kid&&<path d="M-31 29 Q-38 40 -31 42 Q-24 40 -31 29Z" fill="#9bd5e3" stroke="none"/>}
 </g>;
};
const SvgText:React.FC<{x:number;y:number;children:React.ReactNode;size?:number;fill?:string}> = ({x,y,children,size=36,fill='#fdf0d9'}) => <text x={x} y={y} textAnchor="middle" fill={fill} fontSize={size} fontWeight="700" fontFamily={fontFamily}>{children}</text>;
const House:React.FC = () => <>
 <rect width="1080" height="1920" fill="#d9b49a"/><rect y="1310" width="1080" height="610" fill="#91765f"/><rect x="62" y="364" width="215" height="380" rx="8" fill="#b77e69" stroke="#4b3e42" strokeWidth="8"/><rect x="88" y="390" width="163" height="326" fill="#6e7682"/><path d="M170 390 V716 M88 550 H251" stroke="#4b3e42" strokeWidth="9"/><rect x="785" y="330" width="185" height="340" rx="8" fill="#ead4b1"/><path d="M800 650 Q880 450 954 650" fill="#8eab90"/><circle cx="876" cy="415" r="48" fill="#f2c579" opacity=".7"/><path d="M0 1306 H1080" stroke="#6d5c53" strokeWidth="12"/>
 </>;
const SceneArt:React.FC<{kind:string;frame:number}> = ({kind,frame}) => {
 const dark=['judgment','judgment2','confront','end'].includes(kind);
 return <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
  {dark?<><rect width="1080" height="1920" fill="#202c3a"/><circle cx="540" cy="850" r="500" fill="#354254"/><path d="M0 1400 Q540 1290 1080 1400 V1920 H0Z" fill="#26313b"/></>:<House/>}
  {kind==='departure'&&<><Person x={340} y={1050} role="mother" mood="sad" scale={2} frame={frame}/><Person x={520} y={1200} role="child" scale={1.2} mood="sad" frame={frame}/><g opacity=".8"><Person x={835+Math.min(frame*.4,60)} y={1040} role="father" scale={1.8} frame={frame}/></g><path d="M930 880 V1240" stroke="#443b3d" strokeWidth="12"/></>}
  {kind==='judgment'&&<><Person x={430} y={1090} role="mother" mood="sad" scale={2.15} frame={frame}/><Person x={800} y={1100} role="aunt" scale={1.5} frame={frame}/><SvgText x={765} y={860} size={100} fill="#e7b47c">?</SvgText></>}
  {kind==='alone'&&<><Person x={540} y={1050} role="mother" mood="sad" scale={2.5} frame={frame}/><path d="M350 790 Q540 685 730 790" fill="none" stroke="#e6c7a9" strokeWidth="6" opacity=".55"/></>}
  {kind==='motherChild'&&<><Person x={415} y={1040} role="mother" mood="sad" scale={2.1} frame={frame}/><Person x={670} y={1190} role="child" scale={1.25} frame={frame}/><path d="M516 1204 Q580 1260 632 1235" fill="none" stroke="#bd8067" strokeWidth="26" strokeLinecap="round"/></>}
  {kind==='sewing'&&<><Person x={360} y={1035} role="mother" scale={1.9} frame={frame}/><rect x="480" y="1260" width="360" height="27" rx="8" fill="#6b544d"/><path d="M530 1260 V1095 Q530 1045 590 1045 H735 Q760 1045 760 1075 V1260 H690 V1120 H605 V1260Z" fill="#41454b" stroke="#292b35" strokeWidth="7"/><circle cx="730" cy="1082" r="20" fill="#e9bc7d"/><path d="M530 1280 L500 1440 M805 1280 L830 1440" stroke="#6b544d" strokeWidth="18"/></>}
  {kind==='grown'&&<><Person x={380} y={1050} role="mother" scale={1.8} frame={frame}/><Person x={680} y={1020} role="son" mood="strong" scale={2.1} frame={frame}/><circle cx="692" cy="795" r="60" fill="#f3c875" opacity=".9"/><SvgText x={692} y={813} size={48} fill="#544632">★</SvgText></>}
  {kind==='judgment2'&&<><Person x={320} y={1080} role="mother" mood="sad" scale={1.8} frame={frame}/><Person x={575} y={1050} role="son" mood="strong" scale={1.8} frame={frame}/><Person x={850} y={1110} role="elder" scale={1.45} frame={frame}/><SvgText x={790} y={880} size={85} fill="#e7b47c">?</SvgText></>}
  {kind==='confront'&&<><Person x={420} y={1050} role="son" mood="strong" scale={2.25} frame={frame}/><Person x={825} y={1120} role="elder" scale={1.6} frame={frame}/><Person x={170} y={1130} role="aunt" scale={1.4} frame={frame}/></>}
  {kind==='together'&&<><Person x={400} y={1030} role="mother" scale={2.1} frame={frame}/><Person x={700} y={1030} role="son" mood="strong" scale={2.1} frame={frame}/><path d="M510 1250 Q555 1200 600 1250" fill="none" stroke="#bd8067" strokeWidth="25" strokeLinecap="round"/></>}
  {kind==='end'&&<><circle cx="540" cy="950" r="330" fill="#d9ab74" opacity=".13"/><Person x={420} y={1080} role="mother" scale={1.5} frame={frame}/><Person x={655} y={1060} role="son" scale={1.55} frame={frame}/></>}
 </svg>;
};
export const Film:React.FC<{part:Part;platform:Platform}> = ({part,platform}) => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const t=f/fps; const current=[...scenes[part]].reverse().find(s=>s.start<=t) || scenes[part][0]; const local=f-current.start*fps;
 const opacity=interpolate(local,[0,9],[0,1],{extrapolateRight:'clamp',extrapolateLeft:'clamp'});
 const isFb=platform==='facebook';
 return <AbsoluteFill style={{backgroundColor:'#202c3a',fontFamily,color:colors.cream,overflow:'hidden'}}>
  <Audio src={staticFile(`audio/porbo-${part}.mp3`)}/>
  <SceneArt kind={current.kind} frame={f}/>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(20,25,32,.58),transparent 30%,transparent 66%,rgba(20,25,32,.66))'}}/>
  <div style={{position:'absolute',left:80,top:105,fontSize:32,letterSpacing:3,fontWeight:700,color:'#f8d7a4'}}>EVERTALE <span style={{fontWeight:400,fontSize:25,letterSpacing:1}}>STORIES</span></div>
  {current.tag && <div style={{position:'absolute',left:80,top:185,background:'#f2c579',color:'#332e32',borderRadius:40,padding:'8px 25px',fontSize:30,fontWeight:700}}>{current.tag}</div>}
  <div style={{position:'absolute',top:isFb?285:310,left:90,right:isFb?190:120,opacity,transform:`translateY(${(1-opacity)*24}px)`,fontSize:current.kind==='end'?72:68,fontWeight:700,lineHeight:1.3,textShadow:'0 4px 16px #18202a',whiteSpace:'pre-line'}}>{current.text}</div>
  <div style={{position:'absolute',bottom:isFb?315:250,left:80,right:180,height:4,background:'rgba(255,255,255,.24)'}}><div style={{width:`${Math.min(100,t/(part===1?29.4:part===2?18.6:26.5)*100)}%`,height:'100%',background:'#f2c579'}}/></div>
 </AbsoluteFill>;
};
export const Cover:React.FC<{part:Part;platform:Platform}> = ({part,platform}) => {
 const lines=part===1?['সংসার ভাঙলো বাপ','দোষ পাইলো মা']:part===2?['ছেলের যোগ্যতা নয়','বিচার মায়ের অতীত']:['বাপের নাম একটা','মায়ের সংগ্রাম হাজারটা'];
 return <AbsoluteFill style={{fontFamily,background:'#202c3a',color:colors.cream}}>
  <SceneArt kind={part===1?'motherChild':part===2?'sewing':'together'} frame={0}/>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(23,30,40,.95),rgba(23,30,40,.25) 70%,rgba(23,30,40,.8))'}}/>
  <div style={{position:'absolute',top:280,left:100,right:100,textAlign:'center'}}><div style={{fontSize:34,color:'#f2c579',letterSpacing:3,fontWeight:700}}>EVERTALE · {part===3?'শেষ পর্ব':`পর্ব ${part===1?'১':'২'}`}</div><div style={{fontSize:78,fontWeight:700,lineHeight:1.3,marginTop:35,textShadow:'0 5px 20px #1b2330'}}>{lines[0]}<br/><span style={{color:'#f2c579'}}>{lines[1]}</span></div><div style={{fontSize:30,marginTop:25}}>{platform==='youtube'?'একটি হৃদয়ছোঁয়া গল্প':'মায়ের গল্প, আমাদের সমাজ'}</div></div>
 </AbsoluteFill>;
};
