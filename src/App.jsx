import { useState, useEffect, useRef } from "react";

const VIBES = [
  {id:"hikes",label:"Hikes",icon:"⛰"},{id:"beaches",label:"Beaches",icon:"🏖"},
  {id:"museums",label:"Museums",icon:"🏛"},{id:"food",label:"Food Crawl",icon:"🍜"},
  {id:"markets",label:"Markets",icon:"🛍"},{id:"movies",label:"Movies",icon:"🎬"},
  {id:"music",label:"Live Music",icon:"🎵"},{id:"art",label:"Art & Galleries",icon:"🎨"},
  {id:"sports",label:"Sports",icon:"🏟"},{id:"nature",label:"Nature",icon:"🌿"},
  {id:"comedy",label:"Comedy",icon:"😂"},{id:"yolo",label:"YOLO",icon:"🎲"},
];
const TIME_OPTIONS = [
  {id:"1hr",label:"1 Hour",sub:"Quick & fun"},
  {id:"2hr",label:"2 Hours",sub:"Mini adventure"},
  {id:"halfday",label:"Half Day",sub:"4–5 hours"},
  {id:"fullday",label:"Full Day",sub:"All in"},
];
const MODES = [
  {id:"solo",label:"Solo",icon:"🙋"},
  {id:"date",label:"Date Night",icon:"💑"},
  {id:"friends",label:"Friends",icon:"👯"},
  {id:"family",label:"Family",icon:"👨‍👩‍👧"},
];

const BG0="#1C1714", BG1="#231E1A", BG2="#2C2621", BG3="#362F29";
const BR="#44392F", BR2="#574840";
const T1="#F2EBE3", T2="#B8A99A", T3="#7A6A5E";
const P="#FF6B4A", PL="#2E1A12";
const NIGHT="#9B7FE8", NIGHTL="#1E1830";
const DAY="#E8A838", DAYL="#271E08";
const GREEN="#5DB87A", GREENL="#0E2018";

function AbstractBg({color=P, opacity=0.07, seed=0}) {
  const lines=Array.from({length:10},(_,i)=>{
    const a=((i*37+seed*13)*Math.PI)/180;
    return {x1:50+80*Math.cos(a),y1:50+80*Math.sin(a)};
  });
  const dots=Array.from({length:8},(_,i)=>{
    const a=((i*45+seed*7)*Math.PI)/180;
    const r=28+(i%3)*14;
    return {cx:50+r*Math.cos(a),cy:50+r*Math.sin(a),r:i%2===0?2.5:1.2};
  });
  return (
    <svg viewBox="0 0 100 100" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity,pointerEvents:"none"}}>
      {lines.map((l,i)=><line key={i} x1="50" y1="50" x2={l.x1} y2={l.y1} stroke={color} strokeWidth={i%2===0?0.8:0.4}/>)}
      {dots.map((d,i)=><circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={color}/>)}
      {[8,18,30,42].map((r,i)=><circle key={i} cx="50" cy="50" r={r} fill="none" stroke={i%2===0?color:NIGHT} strokeWidth="0.3" strokeDasharray={i%2===0?"3 3":"1.5 4"}/>)}
      <circle cx="50" cy="50" r="5" fill={color} fillOpacity="0.4"/>
    </svg>
  );
}

function AbstractStar({size=180}) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={P} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={P} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#g1)"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{
        const rad=(a*Math.PI)/180;
        return <line key={i} x1="100" y1="100" x2={100+85*Math.cos(rad)} y2={100+85*Math.sin(rad)} stroke={P} strokeWidth={i%2===0?1.5:0.7} strokeOpacity={i%2===0?0.75:0.25}/>;
      })}
      {[0,45,90,135,180,225,270,315].map((a,i)=>{
        const r=58+(i%3)*10,rad=(a*Math.PI)/180;
        return <circle key={i} cx={100+r*Math.cos(rad)} cy={100+r*Math.sin(rad)} r={i%2===0?3:1.5} fill={P} fillOpacity={i%2===0?0.7:0.35}/>;
      })}
      {[0,60,120,180,240,300].map((a,i)=>{
        const r=40,rad=(a*Math.PI)/180,rad2=((a+60)*Math.PI)/180;
        return <line key={i} x1={100+r*Math.cos(rad)} y1={100+r*Math.sin(rad)} x2={100+r*Math.cos(rad2)} y2={100+r*Math.sin(rad2)} stroke={NIGHT} strokeWidth="1" strokeOpacity="0.45"/>;
      })}
      {[20,40,62,80].map((r,i)=>(
        <circle key={i} cx="100" cy="100" r={r} fill="none" stroke={i%2===0?P:NIGHT} strokeWidth="0.5" strokeOpacity={0.1+i*0.04} strokeDasharray={i%2===0?"4 4":"2 6"}/>
      ))}
      <circle cx="100" cy="100" r="10" fill={P} fillOpacity="0.85"/>
      <circle cx="100" cy="100" r="5" fill={T1} fillOpacity="0.9"/>
    </svg>
  );
}

function MiniStar({color=P,size=60,seed=0}) {
  const pts=Array.from({length:8},(_,i)=>{
    const a=((i*45+seed)*Math.PI)/180;
    const r=i%2===0?size*0.44:size*0.2;
    return `${size/2+r*Math.cos(a)},${size/2+r*Math.sin(a)}`;
  }).join(" ");
  const rings=[0.18,0.32,0.44].map((f,i)=>({r:size*f,dash:i%2===0?"3 3":"1.5 4",stroke:i%2===0?color:NIGHT}));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{opacity:0.85,flexShrink:0}}>
      {rings.map((r,i)=><circle key={i} cx={size/2} cy={size/2} r={r.r} fill="none" stroke={r.stroke} strokeWidth="0.6" strokeDasharray={r.dash} strokeOpacity="0.5"/>)}
      {Array.from({length:6},(_,i)=>{
        const a=(i*60*Math.PI)/180;
        return <line key={i} x1={size/2} y1={size/2} x2={size/2+size*0.43*Math.cos(a)} y2={size/2+size*0.43*Math.sin(a)} stroke={color} strokeWidth="0.7" strokeOpacity="0.6"/>;
      })}
      <polygon points={pts} fill={color} fillOpacity="0.12" stroke={color} strokeWidth="0.8"/>
      <circle cx={size/2} cy={size/2} r={size*0.07} fill={color} fillOpacity="0.85"/>
    </svg>
  );
}

function PhoneFrame({children}) {
  return (
    <div style={{display:"flex",justifyContent:"center",padding:"1.5rem 1rem 2rem"}}>
      <div style={{width:375,minHeight:720,background:BG0,borderRadius:40,border:`1px solid ${BR}`,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{height:44,background:BG0,display:"flex",alignItems:"center",justifyContent:"center",paddingTop:8,flexShrink:0}}>
          <div style={{width:120,height:32,background:BG1,borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:80,height:8,background:BG2,borderRadius:4}}/>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>{children}</div>
      </div>
    </div>
  );
}

function PrimaryBtn({onClick,children,disabled,color=P,style={}}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:"100%",padding:"14px",borderRadius:14,border:"none",
      background:disabled?BG2:color,color:disabled?T3:T1,
      fontWeight:700,fontSize:15,cursor:disabled?"not-allowed":"pointer",
      letterSpacing:"0.3px",transition:"all 0.15s",...style,
    }}>{children}</button>
  );
}

function OutlineBtn({onClick,children,style={}}) {
  return (
    <button onClick={onClick} style={{
      width:"100%",padding:"13px",borderRadius:14,border:`1px solid ${BR2}`,
      background:"transparent",color:T2,fontWeight:500,fontSize:14,cursor:"pointer",...style,
    }}>{children}</button>
  );
}

function ScreenHeader({step,title,sub,color=P}) {
  return (
    <div style={{background:BG0,padding:"1rem 1.25rem 1.25rem",position:"relative",overflow:"hidden",flexShrink:0}}>
      <AbstractBg color={color} opacity={0.1} seed={step*17}/>
      <div style={{position:"relative",zIndex:1}}>
        {step&&<div style={{fontSize:10,color:color,letterSpacing:2,textTransform:"uppercase",marginBottom:4,fontWeight:700}}>Step {step}</div>}
        <div style={{fontSize:20,fontWeight:700,color:T1,lineHeight:1.2}}>{title}</div>
        {sub&&<div style={{fontSize:13,color:T2,marginTop:4}}>{sub}</div>}
      </div>
    </div>
  );
}

function SectionLabel({children}) {
  return <div style={{fontSize:10,fontWeight:700,color:T3,marginBottom:8,textTransform:"uppercase",letterSpacing:1.5}}>{children}</div>;
}

function TabBar({tab,onChange}) {
  const tabs=[
    {id:"explore",label:"Explore",d:"M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"},
    {id:"vault",label:"Past Dates",d:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"},
  ];
  return (
    <div style={{display:"flex",borderTop:`1px solid ${BR}`,background:BG0,flexShrink:0}}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>onChange(t.id)} style={{flex:1,padding:"10px 0 14px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tab===t.id?P:T3} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={t.d}/></svg>
          <span style={{fontSize:11,color:tab===t.id?P:T3,fontWeight:tab===t.id?700:400}}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function SplashScreen({onStart}) {
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",gap:"1.5rem",background:BG0}}>
      <AbstractStar/>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:30,fontWeight:700,color:T1,letterSpacing:"-0.5px"}}>Spontaneous</div>
        <div style={{fontSize:30,fontWeight:700,color:P,letterSpacing:"-0.5px"}}>Adventure</div>
        <div style={{fontSize:14,color:T3,marginTop:10}}>One adventure. Zero planning.</div>
      </div>
      <button onClick={onStart} style={{marginTop:"0.5rem",padding:"15px 52px",borderRadius:16,border:"none",background:P,color:T1,fontWeight:700,fontSize:16,cursor:"pointer"}}>
        Let's go
      </button>
    </div>
  );
}

function LocationScreen({onDone}) {
  const [zip,setZip]=useState("");
  const canContinue=zip.trim().length>=3;
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:BG1}}>
      <ScreenHeader step={1} title="Where are you?" sub="Enter your city or zip code" color={P}/>
      <div style={{flex:1,padding:"1rem 1.25rem",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{position:"relative",overflow:"hidden",background:BG2,borderRadius:14,padding:"1rem",border:`1px solid ${BR}`}}>
          <AbstractBg color={P} opacity={0.07} seed={3}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{fontSize:12,color:T3,marginBottom:8}}>We'll find what's actually happening near you</div>
            <input placeholder="e.g. Orlando, FL or 32803" value={zip} onChange={e=>setZip(e.target.value)} autoFocus
              style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${zip.length>=3?P+"88":BR2}`,background:BG1,color:T1,fontSize:15,boxSizing:"border-box",outline:"none",transition:"border 0.2s"}}/>
          </div>
        </div>
        <div style={{marginTop:"auto"}}><PrimaryBtn disabled={!canContinue} onClick={()=>onDone(zip.trim())}>Continue →</PrimaryBtn></div>
      </div>
    </div>
  );
}

function OnboardingScreen({onDone}) {
  const [age,setAge]=useState("");
  const [mode,setMode]=useState(null);
  const [vibes,setVibes]=useState([]);
  const toggle=id=>setVibes(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:BG1}}>
      <ScreenHeader step={2} title="About you" sub="We'll personalize every adventure" color={P}/>
      <div style={{flex:1,padding:"1rem 1.25rem",display:"flex",flexDirection:"column",gap:16,overflowY:"auto"}}>
        <div>
          <SectionLabel>Your age</SectionLabel>
          <input type="number" placeholder="e.g. 28" value={age} onChange={e=>setAge(e.target.value)}
            style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1px solid ${BR2}`,background:BG2,color:T1,fontSize:15,boxSizing:"border-box",outline:"none"}}/>
        </div>
        <div>
          <SectionLabel>Who's going?</SectionLabel>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {MODES.map(m=>(
              <button key={m.id} onClick={()=>setMode(m.id)} style={{padding:"12px 8px",borderRadius:14,border:`1.5px solid ${mode===m.id?P+"88":BR}`,background:mode===m.id?PL:BG2,color:mode===m.id?P:T2,fontSize:13,fontWeight:mode===m.id?700:400,cursor:"pointer",transition:"all 0.15s",position:"relative",overflow:"hidden"}}>
                {mode===m.id&&<AbstractBg color={P} opacity={0.08} seed={m.id.length}/>}
                <div style={{position:"relative",zIndex:1}}>
                  <div style={{fontSize:20,marginBottom:4}}>{m.icon}</div>{m.label}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>Your vibe — pick all that fit</SectionLabel>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {VIBES.map(v=>(
              <button key={v.id} onClick={()=>toggle(v.id)} style={{padding:"7px 13px",borderRadius:20,border:`1.5px solid ${vibes.includes(v.id)?P+"88":BR}`,background:vibes.includes(v.id)?PL:BG2,color:vibes.includes(v.id)?P:T2,fontSize:12,fontWeight:vibes.includes(v.id)?700:400,cursor:"pointer",transition:"all 0.15s"}}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{paddingBottom:"0.75rem"}}>
          <PrimaryBtn disabled={!age||!mode||!vibes.length} onClick={()=>onDone({age,mode,vibes})}>Continue →</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function PlanScreen({onStart}) {
  const today=new Date();
  const fmt=d=>d.toISOString().split("T")[0];
  const [date,setDate]=useState(fmt(today));
  const [timeOfDay,setTimeOfDay]=useState("day");
  const [duration,setDuration]=useState(null);
  const isToday=date===fmt(today);
  const displayDate=isToday?"Today":new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
  const ac=timeOfDay==="night"?NIGHT:DAY;
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:BG1}}>
      <ScreenHeader step={3} title="Plan your adventure" sub="When and how long?" color={ac}/>
      <div style={{flex:1,padding:"1rem 1.25rem",display:"flex",flexDirection:"column",gap:16,overflowY:"auto"}}>
        <div>
          <SectionLabel>Date</SectionLabel>
          <div style={{position:"relative",overflow:"hidden",background:BG2,borderRadius:12,padding:"10px 14px",border:`1.5px solid ${ac}44`,marginBottom:8}}>
            <AbstractBg color={ac} opacity={0.08} seed={5}/>
            <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:16,fontWeight:700,color:ac}}>{displayDate}</span>
              <span style={{fontSize:12,color:T3}}>tap to change ↓</span>
            </div>
          </div>
          <input type="date" value={date} min={fmt(today)} onChange={e=>setDate(e.target.value)}
            style={{width:"100%",padding:"9px 14px",borderRadius:10,border:`1px solid ${BR}`,background:BG2,color:T2,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
        </div>
        <div>
          <SectionLabel>Time of day</SectionLabel>
          <div style={{display:"flex",gap:8}}>
            {[{id:"day",label:"Daytime",icon:"☀️",sub:"Parks · brunch · culture",color:DAY,light:DAYL},{id:"night",label:"Nighttime",icon:"🌙",sub:"Bars · shows · dinners",color:NIGHT,light:NIGHTL}].map(t=>(
              <button key={t.id} onClick={()=>setTimeOfDay(t.id)} style={{flex:1,padding:"12px 8px",borderRadius:14,border:`1.5px solid ${timeOfDay===t.id?t.color+"88":BR}`,background:timeOfDay===t.id?t.light:BG2,color:timeOfDay===t.id?t.color:T2,textAlign:"center",cursor:"pointer",transition:"all 0.15s",position:"relative",overflow:"hidden"}}>
                {timeOfDay===t.id&&<AbstractBg color={t.color} opacity={0.1} seed={t.id.length*7}/>}
                <div style={{position:"relative",zIndex:1}}>
                  <div style={{fontSize:24,marginBottom:6}}>{t.icon}</div>
                  <div style={{fontSize:13,fontWeight:timeOfDay===t.id?700:500}}>{t.label}</div>
                  <div style={{fontSize:10,color:timeOfDay===t.id?t.color+"cc":T3,marginTop:4,lineHeight:1.4}}>{t.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>How long?</SectionLabel>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {TIME_OPTIONS.map(t=>(
              <button key={t.id} onClick={()=>setDuration(t)} style={{padding:"12px 16px",borderRadius:12,border:`1.5px solid ${duration?.id===t.id?ac+"88":BR}`,background:duration?.id===t.id?`${ac}18`:BG2,color:duration?.id===t.id?ac:T2,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.15s",position:"relative",overflow:"hidden"}}>
                {duration?.id===t.id&&<AbstractBg color={ac} opacity={0.08} seed={t.id.length*11}/>}
                <div style={{position:"relative",zIndex:1}}>
                  <div style={{fontWeight:duration?.id===t.id?700:500,fontSize:14}}>{t.label}</div>
                  <div style={{fontSize:11,color:duration?.id===t.id?`${ac}99`:T3,marginTop:1}}>{t.sub}</div>
                </div>
                {duration?.id===t.id&&<div style={{width:20,height:20,borderRadius:"50%",background:ac,display:"flex",alignItems:"center",justifyContent:"center",color:T1,fontSize:12,fontWeight:700,flexShrink:0,position:"relative"}}>✓</div>}
              </button>
            ))}
          </div>
        </div>
        <div style={{paddingBottom:"0.75rem"}}>
          <PrimaryBtn disabled={!duration} onClick={()=>onStart({duration,date,timeOfDay})} color={ac}>Build my adventure ✨</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

async function generateAdventure(location,profile,plan) {
  const dateObj=new Date(plan.date+"T12:00:00");
  const dateStr=dateObj.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const stopCount=plan.duration.id==="1hr"?"1-2":plan.duration.id==="2hr"?"2-3":plan.duration.id==="halfday"?"3-4":"4-5";
  const tod=plan.timeOfDay==="night"?"evening/nighttime (dinner spots, bars, live music, late shows, rooftop venues, comedy clubs)":"daytime (brunch spots, parks, markets, museums, trails, matinees, outdoor activities)";
  const familyNote=profile.mode==="family"?" This is a family outing — include kid-friendly spots.":"";
  const prompt=`You are a spontaneous adventure planner. The adventure date is ${dateStr}.
Location: ${location}, Age: ${profile.age}, Group: ${profile.mode}, Duration: ${plan.duration.label}
Time: ${tod}, Vibes: ${profile.vibes.join(", ")}${familyNote}
Build ONE ${plan.timeOfDay==="night"?"evening":"daytime"} adventure with ${stopCount} stops using REAL places in ${location}. Use real names and addresses. For shows/movies/concerts set eventTime. For all stops include website if confident.
Respond ONLY with raw JSON no markdown:
{"title":"...","tagline":"...","stops":[{"num":1,"emoji":"🎨","type":"...","name":"...","detail":"...","duration":"...","distance":"...","map":"...","eventTime":null,"website":null}]}`;

  // calls our serverless proxy instead of Anthropic directly
  const res=await fetch("/api/claude",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]}),
  });
  if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error?.message||`API error ${res.status}`);}
  const data=await res.json();
  const tb=data.content?.find(b=>b.type==="text");
  if(!tb?.text) throw new Error("Empty AI response");
  let txt=tb.text.trim().replace(/```json|```/g,"").trim();
  const s=txt.indexOf("{"),e=txt.lastIndexOf("}");
  if(s===-1||e===-1) throw new Error("Could not parse response");
  return JSON.parse(txt.slice(s,e+1));
}

function LoadingScreen({location,profile,plan,onReady,onError}) {
  const [step,setStep]=useState(0);
  const tod=plan?.timeOfDay==="night";
  const steps=[`Scanning ${location}...`,tod?"Finding tonight's best spots...":"Finding today's top spots...","Matching your vibes...","Crafting your adventure..."];
  useEffect(()=>{
    const t=setInterval(()=>setStep(s=>Math.min(s+1,steps.length-1)),1400);
    generateAdventure(location,profile,plan).then(onReady).catch(onError);
    return()=>clearInterval(t);
  },[]);
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",gap:"1.5rem",background:BG0}}>
      <AbstractStar/>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:18,fontWeight:700,color:T1,marginBottom:8}}>Building your adventure</div>
        <div style={{fontSize:14,color:T3,minHeight:20}}>{steps[step]}</div>
      </div>
      <div style={{display:"flex",gap:6}}>{steps.map((_,i)=><div key={i} style={{width:i<=step?22:6,height:6,borderRadius:3,background:i<=step?P:BG3,transition:"all 0.3s"}}/>)}</div>
    </div>
  );
}

function InviteModal({onClose}) {
  const [code]=useState(()=>Math.random().toString(36).slice(2,8).toUpperCase());
  const [friendCode,setFriendCode]=useState("");
  const [matched,setMatched]=useState(false);
  return (
    <div style={{position:"absolute",inset:0,background:"rgba(20,15,12,0.85)",display:"flex",alignItems:"flex-end",zIndex:100}}>
      <div style={{width:"100%",background:BG1,borderRadius:"22px 22px 0 0",padding:"1.25rem",boxSizing:"border-box",border:`1px solid ${BR}`,position:"relative",overflow:"hidden"}}>
        <AbstractBg color={P} opacity={0.07} seed={9}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{width:36,height:4,background:BR2,borderRadius:2,margin:"0 auto 1.25rem"}}/>
          <div style={{fontSize:17,fontWeight:700,color:T1,marginBottom:4}}>Invite someone</div>
          <div style={{fontSize:13,color:T2,marginBottom:16}}>Share your code or enter theirs</div>
          <div style={{background:BG2,borderRadius:12,padding:"1rem",marginBottom:14,textAlign:"center",border:`1px solid ${BR}`}}>
            <div style={{fontSize:10,color:T3,marginBottom:6,letterSpacing:1}}>YOUR CODE</div>
            <div style={{fontSize:30,fontWeight:700,letterSpacing:10,color:P}}>{code}</div>
          </div>
          <input placeholder="Enter their code" value={friendCode} onChange={e=>setFriendCode(e.target.value.toUpperCase())}
            style={{width:"100%",padding:"11px 14px",borderRadius:10,border:`1px solid ${BR2}`,background:BG2,color:T1,fontSize:15,letterSpacing:6,marginBottom:10,boxSizing:"border-box",outline:"none"}}/>
          {matched?(
            <div style={{padding:"13px",borderRadius:12,background:GREENL,color:GREEN,fontWeight:700,fontSize:14,textAlign:"center",marginBottom:10}}>Vibes matched!</div>
          ):(
            <PrimaryBtn onClick={()=>setMatched(true)} disabled={friendCode.length<6} style={{marginBottom:8}}>Match vibes</PrimaryBtn>
          )}
          <OutlineBtn onClick={onClose}>Close</OutlineBtn>
        </div>
      </div>
    </div>
  );
}

function AdventureScreen({adventure,plan,onReroll,rerollsLeft,onComplete}) {
  const [revealed,setRevealed]=useState(1);
  const [agreed,setAgreed]=useState(false);
  const [showInvite,setShowInvite]=useState(false);
  const isNight=plan?.timeOfDay==="night";
  const ac=isNight?NIGHT:P;
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",position:"relative",background:BG1}}>
      <div style={{background:BG0,padding:"1.25rem",position:"relative",overflow:"hidden",flexShrink:0}}>
        <AbstractBg color={ac} opacity={0.1} seed={42}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <span style={{background:isNight?NIGHTL:DAYL,color:isNight?NIGHT:DAY,fontSize:10,padding:"3px 10px",borderRadius:20,fontWeight:700}}>{isNight?"🌙 Night":"☀️ Day"}</span>
            <span style={{background:BG2,color:T3,fontSize:10,padding:"3px 10px",borderRadius:20}}>{plan?.duration?.label}</span>
          </div>
          <div style={{fontSize:20,fontWeight:700,color:T1,lineHeight:1.2}}>{adventure.title}</div>
          <div style={{fontSize:12,color:T2,marginTop:5}}>{adventure.tagline}</div>
          <div style={{display:"flex",gap:8,marginTop:12}}>
            <button onClick={()=>setShowInvite(true)} style={{flex:1,padding:"9px",borderRadius:10,border:`1px solid ${BR}`,background:BG2,color:T2,fontSize:12,cursor:"pointer",fontWeight:500}}>Invite someone +</button>
            <button onClick={()=>setAgreed(true)} style={{flex:1,padding:"9px",borderRadius:10,border:"none",background:agreed?GREENL:ac,color:agreed?GREEN:T1,fontSize:12,cursor:"pointer",fontWeight:700}}>
              {agreed?"✓ Let's go!":"Let's go! 🎉"}
            </button>
          </div>
        </div>
      </div>
      <div style={{flex:1,padding:"0.875rem 1rem",display:"flex",flexDirection:"column",gap:10,overflowY:"auto"}}>
        {adventure.stops.map((stop,i)=>{
          const isRev=i<revealed,isCur=i===revealed-1,isLocked=!isRev;
          return (
            <div key={i} style={{borderRadius:16,border:`1.5px solid ${isCur?ac+"66":BR}`,background:BG2,opacity:isLocked?0.35:1,transition:"all 0.3s",overflow:"hidden",position:"relative"}}>
              {isCur&&<AbstractBg color={ac} opacity={0.07} seed={i*13}/>}
              {isLocked?(
                <div style={{padding:"0.875rem 1rem",display:"flex",alignItems:"center",gap:10,position:"relative",zIndex:1}}>
                  <MiniStar color={BR2} size={34}/>
                  <div><div style={{fontSize:12,fontWeight:600,color:T3}}>Stop {stop.num}</div><div style={{fontSize:11,color:T3}}>Arrive to unlock</div></div>
                </div>
              ):(
                <div style={{position:"relative",zIndex:1}}>
                  {isCur&&<div style={{height:3,background:ac}}/>}
                  <div style={{padding:"0.875rem 1rem"}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
                      <MiniStar color={isCur?ac:T3} size={40} seed={i*7}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10,color:isCur?ac:T3,fontWeight:700,marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>Stop {stop.num} · {stop.type}</div>
                        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                          {stop.website?(
                            <a href={stop.website} target="_blank" rel="noreferrer" style={{fontSize:15,fontWeight:700,color:T1,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:5}}>
                              {stop.name}
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                          ):(
                            <div style={{fontSize:15,fontWeight:700,color:T1}}>{stop.name}</div>
                          )}
                          <a href={`https://maps.google.com/?q=${encodeURIComponent(stop.map)}`} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",textDecoration:"none",flexShrink:0}}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div style={{fontSize:13,color:T2,lineHeight:1.6,marginBottom:10}}>{stop.detail}</div>
                    <div style={{display:"flex",gap:7,marginBottom:isCur?10:0,flexWrap:"wrap"}}>
                      <span style={{fontSize:11,color:T3,background:BG3,padding:"4px 9px",borderRadius:20,border:`1px solid ${BR}`}}>⏱ {stop.duration}</span>
                      <span style={{fontSize:11,color:T3,background:BG3,padding:"4px 9px",borderRadius:20,border:`1px solid ${BR}`}}>📍 {stop.distance}</span>
                      {stop.eventTime&&<span style={{fontSize:11,color:T1,background:ac,padding:"4px 10px",borderRadius:20,fontWeight:700}}>🎟 {stop.eventTime}</span>}
                    </div>
                    {isCur&&i<adventure.stops.length-1&&(
                      <button onClick={()=>setRevealed(r=>r+1)} style={{width:"100%",padding:"11px",borderRadius:10,border:"none",background:ac,color:T1,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                        I'm here — reveal next stop →
                      </button>
                    )}
                    {isCur&&i===adventure.stops.length-1&&(
                      <button onClick={onComplete} style={{width:"100%",padding:"11px",borderRadius:10,border:"none",background:GREEN,color:T1,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                        Adventure complete — recap the day 🎉
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{padding:"0.875rem 1rem 1.25rem",borderTop:`1px solid ${BR}`,background:BG0}}>
        <button onClick={onReroll} disabled={rerollsLeft===0} style={{width:"100%",padding:"12px",borderRadius:12,border:`1.5px solid ${rerollsLeft===0?BR:ac+"55"}`,background:"transparent",color:rerollsLeft===0?T3:ac,fontSize:13,fontWeight:700,cursor:rerollsLeft===0?"not-allowed":"pointer"}}>
          🎲 Different adventure ({rerollsLeft} rerolls left)
        </button>
      </div>
      {showInvite&&<InviteModal onClose={()=>setShowInvite(false)}/>}
    </div>
  );
}

function RecapScreen({adventure,onSave}) {
  const [rating,setRating]=useState(0);
  const [saved,setSaved]=useState(false);
  const [photos,setPhotos]=useState([]);
  const journalRef=useRef("");
  const [journalLen,setJournalLen]=useState(0);
  const fileInputRef=useRef(null);
  const handleChange=e=>{journalRef.current=e.target.value;setJournalLen(e.target.value.length);};
  const handlePhoto=e=>{
    Array.from(e.target.files||[]).forEach(f=>{
      const r=new FileReader();
      r.onload=ev=>setPhotos(p=>[...p,ev.target.result]);
      r.readAsDataURL(f);
    });
  };
  const save=()=>{
    if(!rating) return;
    setSaved(true);
    setTimeout(()=>onSave({adventure,journal:journalRef.current,rating,photos,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}),1500);
  };
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:BG1}}>
      <div style={{background:BG0,padding:"1rem 1.25rem 1.25rem",position:"relative",overflow:"hidden",flexShrink:0}}>
        <AbstractBg color={GREEN} opacity={0.09} seed={22}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,color:GREEN,letterSpacing:2,textTransform:"uppercase",marginBottom:6,fontWeight:700}}>Recap</div>
          <div style={{fontSize:20,fontWeight:700,color:T1,lineHeight:1.2}}>{adventure?.title}</div>
          <div style={{fontSize:13,color:T2,marginTop:4}}>Today · How'd it go?</div>
        </div>
      </div>
      <div style={{flex:1,padding:"1rem 1.25rem",display:"flex",flexDirection:"column",gap:16,overflowY:"auto"}}>
        <div>
          <SectionLabel>Rate the adventure</SectionLabel>
          <div style={{display:"flex",gap:7}}>
            {[1,2,3,4,5].map(s=>(
              <button key={s} onClick={()=>setRating(s)} style={{flex:1,padding:"10px 0",borderRadius:10,border:`1.5px solid ${rating>=s?P+"88":BR}`,background:rating>=s?PL:BG2,fontSize:18,cursor:"pointer",transition:"all 0.15s",position:"relative",overflow:"hidden"}}>
                {rating>=s&&<AbstractBg color={P} opacity={0.09} seed={s*3}/>}
                <span style={{position:"relative",zIndex:1}}>⭐</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>Photos</SectionLabel>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {photos.map((src,i)=>(
              <div key={i} style={{width:60,height:60,borderRadius:10,overflow:"hidden",border:`1px solid ${BR}`,flexShrink:0}}>
                <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
            ))}
            <button onClick={()=>fileInputRef.current?.click()} style={{width:60,height:60,borderRadius:10,background:BG2,border:`1.5px dashed ${BR2}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,flexShrink:0}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span style={{fontSize:9,color:T3,fontWeight:600}}>ADD</span>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhoto} style={{display:"none"}}/>
          </div>
        </div>
        <div>
          <SectionLabel>Journal</SectionLabel>
          <textarea onChange={handleChange} placeholder="How was it? Any highlights or moments worth remembering?"
            style={{display:"block",width:"100%",minHeight:100,padding:"11px",borderRadius:12,border:`1px solid ${BR2}`,background:BG2,color:T1,fontSize:14,lineHeight:1.6,resize:"none",boxSizing:"border-box",fontFamily:"inherit",outline:"none"}}/>
          {journalLen>0&&<div style={{fontSize:10,color:T3,marginTop:4,textAlign:"right"}}>{journalLen} chars</div>}
        </div>
        {saved?(
          <div style={{padding:"13px",borderRadius:12,background:GREENL,color:GREEN,fontWeight:700,fontSize:14,textAlign:"center",border:`1px solid ${GREEN}44`}}>Saved to your vault! 🎉</div>
        ):(
          <PrimaryBtn onClick={save} disabled={!rating} color={GREEN} style={{marginBottom:"0.5rem"}}>Save to vault</PrimaryBtn>
        )}
      </div>
    </div>
  );
}

function VaultScreen({pastAdventures,onNewAdventure}) {
  const [selected,setSelected]=useState(null);
  const a=selected!=null?pastAdventures[selected]:null;
  if(a) return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:BG1}}>
      <div style={{background:BG0,padding:"1rem 1.25rem",display:"flex",alignItems:"center",gap:10,position:"relative",overflow:"hidden",flexShrink:0}}>
        <AbstractBg color={P} opacity={0.08} seed={selected*7}/>
        <button onClick={()=>setSelected(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:T2,fontSize:20,position:"relative",zIndex:1}}>←</button>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:T1}}>{a.adventure.title}</div>
          <div style={{fontSize:11,color:T3}}>{a.date}</div>
        </div>
      </div>
      <div style={{flex:1,padding:"1.25rem",overflowY:"auto",display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          <span style={{fontSize:11,background:PL,color:P,padding:"4px 10px",borderRadius:20,fontWeight:700}}>{a.adventure.stops.length} stops</span>
          <span style={{fontSize:11,background:BG2,color:T2,padding:"4px 10px",borderRadius:20,border:`1px solid ${BR}`}}>{"⭐".repeat(a.rating)}</span>
        </div>
        {a.photos?.length>0&&(
          <div>
            <SectionLabel>Photos</SectionLabel>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {a.photos.map((src,i)=>(
                <div key={i} style={{width:70,height:70,borderRadius:10,overflow:"hidden",border:`1px solid ${BR}`}}>
                  <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {a.journal&&(
          <div>
            <SectionLabel>Journal</SectionLabel>
            <div style={{fontSize:14,lineHeight:1.7,color:T2,background:BG2,padding:"0.875rem",borderRadius:12,border:`1px solid ${BR}`}}>{a.journal}</div>
          </div>
        )}
        <div>
          <SectionLabel>Stops</SectionLabel>
          {a.adventure.stops.map((s,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",paddingBottom:12,marginBottom:12,borderBottom:i<a.adventure.stops.length-1?`1px solid ${BR}`:"none"}}>
              <MiniStar color={P} size={34} seed={i*9}/>
              <div><div style={{fontSize:14,fontWeight:700,color:T1}}>{s.name}</div><div style={{fontSize:11,color:T3,marginTop:2}}>{s.type} · {s.duration}</div></div>
            </div>
          ))}
        </div>
        <OutlineBtn onClick={()=>setSelected(null)}>← Back to vault</OutlineBtn>
      </div>
    </div>
  );
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:BG1}}>
      <div style={{background:BG0,padding:"1rem 1.25rem 1.25rem",position:"relative",overflow:"hidden",flexShrink:0}}>
        <AbstractBg color={P} opacity={0.09} seed={99}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:22,fontWeight:700,color:T1}}>Your adventure vault</div>
          <div style={{fontSize:13,color:T2,marginTop:4}}>Every adventure, preserved</div>
          {pastAdventures.length>0&&(
            <div style={{display:"flex",gap:8,marginTop:14}}>
              {[[pastAdventures.length,"Adventures"],[pastAdventures.reduce((a,x)=>a+x.adventure.stops.length,0),"Stops"],[Math.round(pastAdventures.reduce((a,x)=>a+x.rating,0)/pastAdventures.length)+"★","Avg"]].map(([n,l])=>(
                <div key={l} style={{flex:1,background:BG2,borderRadius:10,padding:"8px",textAlign:"center",border:`1px solid ${BR}`,position:"relative",overflow:"hidden"}}>
                  <AbstractBg color={P} opacity={0.06} seed={l.length*3}/>
                  <div style={{fontSize:17,fontWeight:700,color:P,position:"relative",zIndex:1}}>{n}</div>
                  <div style={{fontSize:10,color:T3,marginTop:2,position:"relative",zIndex:1}}>{l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{flex:1,padding:"1rem",display:"flex",flexDirection:"column",gap:8,overflowY:"auto"}}>
        {pastAdventures.length===0?(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,paddingBottom:"3rem"}}>
            <AbstractStar size={100}/>
            <div style={{fontSize:15,fontWeight:700,color:T3}}>No adventures yet</div>
            <div style={{fontSize:12,color:BR2}}>Complete your first one to see it here</div>
          </div>
        ):(
          pastAdventures.map((a,i)=>(
            <button key={i} onClick={()=>setSelected(i)} style={{padding:"0.875rem 1rem",borderRadius:14,border:`1px solid ${BR}`,background:BG2,textAlign:"left",cursor:"pointer",display:"flex",gap:12,alignItems:"center",position:"relative",overflow:"hidden"}}>
              <AbstractBg color={P} opacity={0.04} seed={i*11}/>
              <MiniStar color={P} size={44} seed={i*13}/>
              <div style={{flex:1,position:"relative",zIndex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:T1,marginBottom:2}}>{a.adventure.title}</div>
                <div style={{fontSize:11,color:T3}}>{a.date}</div>
                <div style={{fontSize:11,color:BR2,marginTop:3}}>{"⭐".repeat(a.rating)} · {a.adventure.stops.length} stops</div>
              </div>
              <span style={{color:BR2,fontSize:16,position:"relative",zIndex:1}}>→</span>
            </button>
          ))
        )}
      </div>
      <div style={{padding:"0.875rem 1rem 1.25rem",borderTop:`1px solid ${BR}`}}>
        <PrimaryBtn onClick={onNewAdventure}>Plan a new adventure ✨</PrimaryBtn>
      </div>
    </div>
  );
}

export default function App() {
  const [screen,setScreen]=useState("splash");
  const [tab,setTab]=useState("explore");
  const [profile,setProfile]=useState(null);
  const [location,setLocation]=useState(null);
  const [plan,setPlan]=useState(null);
  const [adventure,setAdventure]=useState(null);
  const [rerollsLeft,setRerollsLeft]=useState(3);
  const [pastAdventures,setPastAdventures]=useState([]);
  const [aiError,setAiError]=useState(null);
  const showTabs=["adventure","vault","recap"].includes(screen);
  const handleTabChange=t=>{
    setTab(t);
    if(t==="vault") setScreen("vault");
    else setScreen(profile?"plan":"onboarding");
  };
  const handleReroll=()=>{
    if(rerollsLeft>0){setRerollsLeft(r=>r-1);setAdventure(null);setAiError(null);setScreen("loading");}
  };
  return (
    <PhoneFrame>
      <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
          {screen==="splash"&&<SplashScreen onStart={()=>setScreen("location")}/>}
          {screen==="location"&&<LocationScreen onDone={loc=>{setLocation(loc);setScreen("onboarding");}}/>}
          {screen==="onboarding"&&<OnboardingScreen onDone={p=>{setProfile(p);setScreen("plan");}}/>}
          {screen==="plan"&&<PlanScreen onStart={p=>{setPlan(p);setScreen("loading");}}/>}
          {screen==="loading"&&<LoadingScreen location={location} profile={profile} plan={plan} onReady={adv=>{setAdventure(adv);setScreen("adventure");}} onError={err=>{setAiError(err.message);setScreen("adventure");}}/>}
          {screen==="adventure"&&(
            aiError?(
              <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",gap:16,textAlign:"center",background:BG1}}>
                <MiniStar color={T3} size={70}/>
                <div style={{fontSize:17,fontWeight:700,color:T1}}>Couldn't load adventure</div>
                <div style={{fontSize:13,color:T2,maxWidth:280}}>{aiError}</div>
                <PrimaryBtn onClick={()=>{setAiError(null);setScreen("loading");}}>Try again</PrimaryBtn>
              </div>
            ):adventure?<AdventureScreen adventure={adventure} plan={plan} rerollsLeft={rerollsLeft} onReroll={handleReroll} onComplete={()=>setScreen("recap")}/>:null
          )}
          {screen==="recap"&&<RecapScreen adventure={adventure} onSave={entry=>{setPastAdventures(p=>[entry,...p]);setTab("vault");setScreen("vault");}}/>}
          {screen==="vault"&&<VaultScreen pastAdventures={pastAdventures} onNewAdventure={()=>{setTab("explore");setScreen("plan");}}/>}
        </div>
        {showTabs&&<TabBar tab={tab} onChange={handleTabChange}/>}
      </div>
    </PhoneFrame>
  );
}
