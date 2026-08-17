(() => {
"use strict";
const $=id=>document.getElementById(id);
const POS=["C","PF","SF","SG","PG"], POSNAME={C:"中鋒",PF:"大前鋒",SF:"小前鋒",SG:"得分後衛",PG:"控球後衛"};
const BASE=["運球","彈跳","投籃","傳球","籃板"], FIXED=["人際關係","情商","球商","知名度"], ALL=[...BASE,...FIXED];
const MAX_ACTIONS=5;
const schools=["東海高中","海線高中","中山高中","南湖高中","青雲高中","光華高中","新星高中","海岳高中","龍騰高中","明德高中"];
const collegeTW=["台灣青鋒大學","中華體育大學","東海城大","南島大學","新北科技大學","台中競技大學"];
const collegeUS=["North Valley University","Pacific State University","Great Lakes College","Metro Tech","Western Plains University","Atlantic Heights"];
const TRAIN=[
 ["運球","交叉步突破訓練","你在半場反覆進行變向、急停與換手，教練要求每一次突破都保持低重心與節奏變化。"],
 ["彈跳","助跑彈跳訓練","你進行助跑摸高、單腳與雙腳起跳訓練，教練針對起跳角度與落地動作逐組修正。"],
 ["投籃","移動接球投籃","隊友從不同角度持續餵球，你必須快速完成接球、腳步調整與出手。"],
 ["傳球","擋拆閱讀訓練","教練安排擋拆與二打一判斷，你需要快速閱讀協防並找到最佳傳球路線。"],
 ["籃板","卡位與衝搶訓練","禁區內持續進行身體對抗，你必須先卡位，再判斷落點完成籃板。"]
];
const EVENTS=[
 {t:"隊友突然邀你加練",o:["留下來陪他完成投籃訓練","婉拒邀請，準備明天的重要課程","提議改成一起研究比賽影片","鼓勵他自己練習並給出幾個建議"],r:["人際關係","球商"]},
 {t:"地方媒體想採訪你",o:["接受採訪並分享球隊的團隊故事","婉拒採訪，把焦點留給全隊","謹慎回答並詢問教練意見","主動談論自己的成長與目標"],r:["知名度","情商"]},
 {t:"比賽前發現戰術似乎有漏洞",o:["立刻告訴教練並提出替代方案","先觀察對手再決定是否反應","和隊友討論後一起向教練反映","完全照原戰術執行避免影響士氣"],r:["球商","人際關係"]},
 {t:"球隊舉辦公益活動",o:["主動報名並帶隊參加","只完成球隊要求的部分","邀請隊友一起策劃活動","以訓練安排為理由不參加活動"],r:["知名度","人際關係"]},
 {t:"經紀人試探你是否想提前規劃未來",o:["認真討論長期職涯與風險","先拒絕，等成績更穩定再說","請他分析不同聯賽的差異","表示只在乎當下比賽不考慮未來"],r:["情商","知名度"]},
 {t:"重要比賽前隊友與你發生爭執",o:["先冷靜聽完對方再尋找共識","直接要求對方不要影響比賽","請隊長協助雙方把問題說清楚","先道歉讓全隊專注於比賽"],r:["人際關係","情商"]}
];
const LEAGUE_AWARDS={
 "台灣高中甲級":["年度MVP","冠軍賽MVP","最佳五人","最佳防守球員","籃板王","助攻王","得分王"],
 "台灣高中乙級":["年度MVP","冠軍賽MVP","最佳五人","最佳防守球員","籃板王","助攻王","得分王"],
 "台灣大專聯賽":["年度MVP","冠軍賽MVP","最佳五人","最佳防守球員","新人王","助攻王","得分王"],
 "美國大學一級聯賽":["年度最佳球員","Final Four MOP","All-American 第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "美國大學二級聯賽":["年度最佳球員","冠軍賽MOP","All-American 第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "美國大學三級聯賽":["年度最佳球員","冠軍賽MOP","All-American 第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "美國職業聯盟":["年度MVP","總冠軍賽MVP","年度第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "美國發展聯盟":["年度MVP","總冠軍賽MVP","年度第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "中國C聯盟":["年度MVP","總冠軍賽MVP","年度第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "日本B聯盟":["年度MVP","總冠軍賽MVP","年度第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "韓國K聯盟":["年度MVP","總冠軍賽MVP","最佳五人","最佳防守球員","年度新人","助攻王","得分王"],
 "台灣T聯盟":["年度MVP","總冠軍賽MVP","年度第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "台灣P聯盟":["年度MVP","總冠軍賽MVP","年度第一隊","最佳防守球員","年度新人","助攻王","得分王"],
 "台灣S聯盟":["年度MVP","總冠軍賽MVP","年度第一隊","最佳防守球員","年度新人","助攻王","得分王"]
};

/* 2025-26 / 2026-27 近期現實賽制基準。
   HBL因晉級階段不同，實際出賽場數不固定，遊戲會依晉級階段調整。 */
const LEAGUE_CONFIG={
 "台灣高中甲級":{teams:16,games:3,difficulty:58,playoff:12,postMax:14},
 "台灣高中乙級":{teams:32,games:5,difficulty:48,playoff:8,postMax:8},
 "台灣大專聯賽":{teams:16,games:15,difficulty:64,playoff:8},
 "美國大學一級聯賽":{teams:365,games:32,difficulty:80,playoff:68},
 "美國大學二級聯賽":{teams:300,games:26,difficulty:69,playoff:64},
 "美國大學三級聯賽":{teams:400,games:25,difficulty:60,playoff:64},
 "美國職業聯盟":{teams:30,games:82,difficulty:96,playoff:16},
 "美國發展聯盟":{teams:31,games:50,difficulty:84,playoff:16,note:"14場Tip-Off Tournament＋至少36場後續賽程"},
 "中國C聯盟":{teams:20,games:42,difficulty:83,playoff:12},
 "日本B聯盟":{teams:26,games:60,difficulty:86,playoff:8},
 "韓國K聯盟":{teams:10,games:54,difficulty:82,playoff:6},
 "台灣T聯盟":{teams:7,games:36,difficulty:76,playoff:5},
 "台灣P聯盟":{teams:4,games:24,difficulty:74,playoff:4},
 "台灣S聯盟":{teams:5,games:28,difficulty:66,playoff:4}
};

const PRO_DEF={
 US:{league:"美國職業聯盟",count:30,places:["紐約","洛杉磯","芝加哥","休士頓","鳳凰城","費城","聖安東尼奧","達拉斯","丹佛","波士頓","西雅圖","波特蘭","奧蘭多","邁阿密","亞特蘭大","克里夫蘭","底特律","印第安納","夏洛特","華盛頓","布魯克林","多倫多","明尼蘇達","奧克拉荷馬","曼菲斯","紐奧良","沙加緬度","猶他","密爾瓦基","拉斯維加斯"]},
 GL:{league:"美國發展聯盟",count:31,places:["奧斯汀","伯明罕","布魯克林","首都城","克里夫蘭","大學公園","特拉華","底特律","伊利","大急流城","格林斯博羅","愛荷華","長島","緬因","曼菲斯","墨西哥城","奧西歐拉","里奧格蘭德","鹽湖城","聖克魯茲","蘇福爾斯","南灣","斯托克頓","德州","威斯康辛","印第安納","俄克拉荷馬","波特蘭","聖地牙哥","鳳凰城","多倫多"]},
 CN:{league:"中國C聯盟",count:20,places:["北京","上海","廣東","遼寧","浙江","新疆","山東","山西","吉林","天津","江蘇","福建","深圳","廣州","南京","寧波","四川","青島","北控","廣廈"]},
 JP:{league:"日本B聯盟",count:26,places:["北海道","仙台","秋田","茨城","宇都宮","群馬","越谷","千葉","東京","澀谷","川崎","橫濱","富山","三河","名古屋","滋賀","京都","大阪","島根","廣島","佐賀","長崎","琉球","神戶","福岡","靜岡"]},
 KR:{league:"韓國K聯盟",count:10,places:["首爾","釜山","大邱","蔚山","水原","原州","安養","昌原","高陽","仁川"]},
 TP:{league:"台灣T聯盟",count:7,places:["台北","新北","桃園","新竹","台中","台南","高雄"]},
 PL:{league:"台灣P聯盟",count:4,places:["台北","桃園","台南","新竹"]},
 SBL:{league:"台灣S聯盟",count:5,places:["台北","新北","基隆","桃園","彰化"]}
};

/* 每支職業隊都存在培育/二隊系統；美國職業聯盟的二軍統一歸 美國發展聯盟。 */
const SECOND_TEAM_LEAGUE={
 US:"美國發展聯盟",CN:"中國C聯盟二隊",JP:"日本B聯盟二隊",KR:"韓國K聯盟二隊",
 TP:"台灣T聯盟二隊",PL:"台灣P聯盟二隊",SBL:"台灣S聯盟二隊",GL:"美國發展聯盟"
};

const MASCOTS=["獵鷹","暴風","海狼","黑熊","猛虎","雷霆","巨鯊","火箭","戰馬","飛龍","銀狐","鐵鷹","海神","野牛","山貓","烈焰","戰斧","彗星","騎士","巨人","毒蜂","雪豹","犀牛","雄獅","獵犬","火鳥","戰車","鐵鎚","箭矢","鯨魚","獵豹","野狼"];

let G=null;


/* V8.8.5：獎項顯示年份，例如「2026 新人王」 */
function awardLabelV856(award, year){
  const y = Number(year || G.year || new Date().getFullYear());
  const text = String(award || "").trim();
  if(!text) return text;
  if(/^\d{4}\s*年?\s*/.test(text)) return text;
  return `${y} ${text}`;
}
function normalizeAwardHistoryV856(){
  if(!G) return;
  const containers=[G.awards,G.careerAwards,G.modern?.awards,G.modern?.careerAwards];
  containers.forEach(arr=>{
    if(!Array.isArray(arr)) return;
    arr.forEach(x=>{
      if(x && typeof x==="object"){
        if(!x.year) x.year=G.year;
        if(x.name && !x.label) x.label=awardLabelV856(x.name,x.year);
        if(x.award && !x.label) x.label=awardLabelV856(x.award,x.year);
      }
    });
  });
}

function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function pick(a){return a[Math.floor(Math.random()*a.length)]}

function applyReferenceScaleV594(){
  const baseW=1536, baseH=1024;
  const vw=window.innerWidth, vh=window.innerHeight;
  const scale=Math.min(vw/baseW,vh/baseH);
  document.documentElement.style.setProperty("--reference-scale",String(scale));
  document.documentElement.style.setProperty("--reference-offset-x",`${Math.max(0,(vw-baseW*scale)/2)}px`);
  document.documentElement.style.setProperty("--reference-offset-y",`${Math.max(0,(vh-baseH*scale)/2)}px`);
}
window.addEventListener("resize",applyReferenceScaleV594);

function clamp(v,a=0,b=100){return Math.max(a,Math.min(b,v))}
function calendarYearV44(y){
  if(G && Number.isFinite(G.absoluteCalendarYear))return G.absoluteCalendarYear;
  const careerYear=y||G.year||1;
  return (G.startYear||2026)+Math.max(0,careerYear-1);
}
function avg(){return BASE.reduce((s,k)=>s+(G.stats[k]||0),0)/BASE.length}
function legacyAgeV61(){
 if(G.phase==="高中")return 16+G.year-1;
 if(G.phase==="大學")return 19+G.year-1;
 if(G.phase==="職業")return 23+G.year-1;
 if(G.phase==="教練")return (G.coachStartAge||34)+G.year-1;
 return G.finalAge||34;
}
function ageNow(){
 if(G && Number.isFinite(G.absoluteAge))return G.absoluteAge;
 return legacyAgeV61();
}
function leagueName(){
 if(G.phase==="高中")return G.hblDivision||"台灣高中甲級";
 if(G.phase==="大學")return G.collegeDivision||(collegeUS.includes(G.school)?"美國大學一級聯賽":"台灣大專聯賽");
 if(G.phase==="職業")return G.proLeague||"美國職業聯盟";
 if(G.phase==="教練")return G.coachLeague||"美國職業聯盟";
 return "生涯結算";
}

const CONTRACT_RULES={
 US:{league:"美國職業聯盟",currency:"USD_M",unit:"年薪",min:1.27,mid:14.1,star:40,max:70,years:[1,4],note:"依美國頂級職業聯盟薪資帽與市場層級模擬。"},
 GL:{league:"美國發展聯盟",currency:"USD",unit:"年薪",min:40000,mid:55000,star:100000,max:250000,years:[1,2],note:"發展聯盟基礎薪資遠低於美國頂級聯盟，雙向/轉換合約另計。"},
 CN:{league:"中國C聯盟",currency:"CNY",unit:"年薪",min:150000,mid:1000000,star:6000000,max:6000000,years:[1,3],note:"國內球員頂薪以約600萬元人民幣層級模擬。"},
 JP:{league:"日本B聯盟",currency:"JPY",unit:"年薪",min:8000000,mid:40000000,star:150000000,max:220000000,years:[1,3],note:"B.PREMIER最低年薪800萬日圓、明星級更高。"},
 KR:{league:"韓國K聯盟",currency:"KRW",unit:"年薪",min:40000000,mid:150000000,star:450000000,max:700000000,years:[1,3],note:"依K聯盟薪資帽與高階球員市場層級模擬。"},
 TP:{league:"台灣T聯盟",currency:"TWD",unit:"月薪",min:50000,mid:180000,star:450000,max:900000,years:[1,3],note:"本土新人最低薪資與國家隊保障條件依現行規章層級模擬。"},
 PL:{league:"台灣P聯盟",currency:"TWD",unit:"月薪",min:40000,mid:150000,star:400000,max:800000,years:[1,3],note:"新人選秀最低月薪約4萬至9萬元起，依順位與能力上升。"},
 SBL:{league:"台灣S聯盟",currency:"TWD",unit:"月薪",min:35000,mid:90000,star:220000,max:400000,years:[1,2],note:"半職業/培育層級，薪資低於台灣兩大職業聯盟。"}
};

function moneyTextV49(key,value){
  if(key==="US")return `US$${Number(value).toFixed(2)}M / 年`;
  if(key==="GL")return `US$${Math.round(value).toLocaleString()} / 年`;
  if(["TP","PL","SBL"].includes(key))return `NT$${Math.round(value).toLocaleString()} / 月`;
  if(key==="CN")return `¥${Math.round(value).toLocaleString()} / 年`;
  if(key==="JP")return `¥${Math.round(value/10000).toLocaleString()}萬 / 年`;
  if(key==="KR")return `₩${Math.round(value/1000000).toLocaleString()}M / 年`;
  return String(value);
}

function contractOfferV49(key,team,marketType="meeting"){
  const r=CONTRACT_RULES[key]||CONTRACT_RULES.US;
  const ability=avg(), fame=G.stats["知名度"]||30;
  const score=clamp(ability*.88+fame*.12+rnd(-7,7),35,125);
  const t=clamp((score-50)/55,0,1);
  let salary;
  if(key==="US"){
    salary=score<65?r.min+rnd(0,250)/100:
      score<78?rnd(400,1200)/100:
      score<90?rnd(1200,2800)/100:
      rnd(2800,Math.round(r.max*100))/100;
  }else{
    salary=Math.round(r.min+(r.max-r.min)*Math.pow(t,1.7));
    salary=Math.max(r.min,Math.min(r.max,salary+rnd(-Math.round((r.max-r.min)*.05),Math.round((r.max-r.min)*.05))));
  }
  const years=rnd(r.years[0],r.years[1]);
  const guarantee=score>=82?"保障合約":(Math.random()<.55?"保障合約":"部分保障");
  const role=score>=90?"核心球員":score>=78?"主要輪替":score>=65?"輪替球員":"板凳 / 培養";
  const interest=clamp(Math.round(30+(ability-60)*1.4+(fame-30)*.25+rnd(-12,12)),5,99);
  return {key,league:r.league,team,salary,years,guarantee,role,interest,marketType};
}

function marketOffersV49(mode="meeting"){
  if(G.phase!=="職業")return [];

  const ability=avg();
  const result=[];

  Object.keys(PRO_DEF).forEach(key=>{
    let pool=makeProTeams(key).filter(t=>!(key===(G.proKey||"US") && t===G.team));
    if(!pool.length)return;

    // 每個聯賽獨立判斷是否有人要。能力越高，跨聯賽市場越熱。
    const leagueDifficulty={US:96,JP:86,KR:82,TP:76}[key]||60;
    const leagueInterest=clamp(65+(ability-leagueDifficulty)*2.2+(G.stats["知名度"]||30)*.22+(G.stats["情商"]||30)*.10,10,98);

    if(Math.random()*100>leagueInterest)return;

    // 有興趣時至少顯示 2 支；高能力可到 4~5 支。
    let count=ability>=88?rnd(3,5):ability>=72?rnd(2,4):rnd(2,3);
    count=Math.min(count,pool.length);

    pool.sort(()=>Math.random()-.5).slice(0,count).forEach(team=>{
      result.push(contractOfferV49(key,team,mode));
    });
  });

  return result.sort((a,b)=>b.interest-a.interest);
}

function contractCardV49(o,i,actionLabel){
  return `<div class="offer market-offer">
    <div class="market-offer-head">
      <div><span class="league-chip">${CONTRACT_RULES[o.key].league}</span><br><b>${o.team}</b></div>
      <button data-market="${i}">${actionLabel}</button>
    </div>
    <div class="contract-grid">
      <span>待遇</span><b>${moneyTextV49(o.key,o.salary)}</b>
      <span>年限</span><b>${o.years} 年</b>
      <span>保障</span><b>${o.guarantee}</b>
      <span>角色</span><b>${o.role}</b>
      <span>興趣度</span><b>${o.interest}%</b>
    </div>
    <small>${o.note}</small>
  </div>`;
}

function acceptMarketOfferV49(o,source){
  const oldTeam=G.team;
  G.proKey=o.key;
  G.proLeague=CONTRACT_RULES[o.key].league;
  G.team=o.team;
  recordTeamChangeV52(oldTeam,o.team,"signedMove");
  G.contract={
    league:G.proLeague,
    team:o.team,
    salary:o.salary,
    salaryText:moneyTextV49(o.key,o.salary),
    years:o.years,
    guarantee:o.guarantee,
    role:o.role,
    signedYear:calendarYearV44(G.year)
  };
  G.history.unshift(`${ageNow()}歲與 ${o.team} 簽下 ${o.years} 年合約（${moneyTextV49(o.key,o.salary)}）。`);
  closeModal();
  addLog(`你透過${source}與 <span class="delta">${o.team}</span> 達成協議，加入 ${G.proLeague}。合約：${o.years} 年、${moneyTextV49(o.key,o.salary)}、${o.guarantee}，預計角色為 ${o.role}。`,"success",`${source}結果`);
}

function makeProTeams(key){const d=PRO_DEF[key]||PRO_DEF.US, used=new Set();return d.places.slice(0,d.count).map((p,i)=>{let m=MASCOTS[(i*7+3)%MASCOTS.length];while(used.has(m))m=pick(MASCOTS);used.add(m);return `${p}${m}`})}
function currentTeamPool(){if(G.phase!=="職業")return [];let key=G.proKey||"US";return makeProTeams(key)}

const WEALTH_FX_V50={USD:32.0,CNY:4.4,JPY:0.22,KRW:0.024,TWD:1};

function annualContractIncomeTWDV50(){
  if(!G.contract||G.phase!=="職業")return 0;
  const key=G.proKey||"US", salary=Number(G.contract.salary)||0;
  if(key==="US")return Math.round(salary*1000000*WEALTH_FX_V50.USD);
  if(key==="GL")return Math.round(salary*WEALTH_FX_V50.USD);
  if(["TP","PL","SBL"].includes(key))return Math.round(salary*12);
  if(key==="CN")return Math.round(salary*WEALTH_FX_V50.CNY);
  if(key==="JP")return Math.round(salary*WEALTH_FX_V50.JPY);
  if(key==="KR")return Math.round(salary*WEALTH_FX_V50.KRW);
  return 0;
}

function coachAnnualIncomeTWDV50(){
  if(G.phase!=="教練")return 0;
  if(Number.isFinite(G.coachSalaryTWD))return G.coachSalaryTWD;
  const fit=(G.stats["人際關係"]+G.stats["情商"]+G.stats["球商"])/3;
  G.coachSalaryTWD=Math.round((1200000 + fit*90000 + rnd(-300000,500000))/10000)*10000;
  return Math.max(600000,G.coachSalaryTWD);
}

function settleAnnualIncomeV50(){
  if(!Number.isFinite(G.wealthTWD))G.wealthTWD=0;
  let income=0, source="";
  if(G.phase==="職業" && G.contract){
    income=annualContractIncomeTWDV50();
    source=`${G.team} 球員薪資`;
  }else if(G.phase==="教練"){
    income=coachAnnualIncomeTWDV50();
    source=`${G.team} 教練薪資`;
  }
  if(income>0){
    G.wealthTWD+=income;
    addLog(`年度收入結算：${source} 約 <span class="delta">NT$${income.toLocaleString()}</span>，目前累積財富約 NT$${G.wealthTWD.toLocaleString()}。`,"success","財富結算");
  }
}

function wealthTextV50(){
  const v=Math.max(0,Math.round(G.wealthTWD||0));
  if(v>=100000000)return `NT$${(v/100000000).toFixed(2)} 億`;
  if(v>=10000)return `NT$${(v/10000).toFixed(1)} 萬`;
  return `NT$${v.toLocaleString()}`;
}


function ensureCareerMetricsV52(){
  if(!G.careerMetrics)G.careerMetrics={};
  const d={
    teamChanges:0,nbaTrades:0,signedMoves:0,injuryEvents:0,healthySeasons:0,
    playoffSeasons:0,titles:0,breakthroughWins:0,breakthroughFails:0
  };
  Object.keys(d).forEach(k=>{if(!Number.isFinite(G.careerMetrics[k]))G.careerMetrics[k]=d[k]});
  if(!G.teamStints)G.teamStints={};
}
function recordTeamChangeV52(oldTeam,newTeam,kind="move"){
  ensureCareerMetricsV52();
  if(oldTeam&&newTeam&&oldTeam!==newTeam){
    G.careerMetrics.teamChanges++;
    if(kind==="nbaTrade")G.careerMetrics.nbaTrades++;
    else G.careerMetrics.signedMoves++;
  }
}
function playerTagsV52(){
  ensureCareerMetricsV52();
  const t=[],m=G.careerMetrics,seasons=(G.seasons||[]).filter(s=>!s.coach),aw=G.awards||[];
  const teamYears={};seasons.forEach(s=>teamYears[s.team]=(teamYears[s.team]||0)+1);
  const longest=Math.max(0,...Object.values(teamYears));
  const titles=seasons.filter(s=>s.rank===1).length;
  const po=seasons.filter(s=>s.regularRank && s.rank && s.rank<=16).length;

  if(m.teamChanges>=5)t.push(["聯盟浪人","negative","生涯頻繁更換球隊，長期穩定性受到質疑。"]);
  else if(m.teamChanges>=3)t.push(["頻繁交易","negative","多次轉隊，球隊評估長期規劃時會更謹慎。"]);
  if(m.nbaTrades>=3)t.push(["交易市場常客","negative","多次成為 NBA 交易案主角。"]);
  if(longest>=4&&m.teamChanges<=1)t.push(["忠誠核心","positive","長時間效力同一支球隊。"]);
  if(longest>=7&&m.teamChanges===0)t.push(["一人一城","positive","幾乎整段職業生涯都效力同一隊。"]);
  if(m.injuryEvents>=3)t.push(["傷病疑慮","negative","多次出現傷病紀錄。"]);
  if(m.healthySeasons>=4&&m.injuryEvents<=1)t.push(["健康鐵人","positive","長期健康出勤穩定。"]);
  if(titles>=1)t.push(["冠軍球員","positive","曾拿下聯賽冠軍。"]);
  if(titles>=3)t.push(["冠軍常客","positive","多次奪冠。"]);
  if(po>=5)t.push(["季後賽常客","positive","長期出現在季後賽舞台。"]);
  if(aw.length>=5)t.push(["獎項收割者","positive","累積大量個人獎項。"]);
  if(aw.some(a=>/MVP|最佳球員|MOP/.test(a.award)))t.push(["明星級球員","positive","曾拿過聯盟頂級個人榮譽。"]);
  if((G.stats["知名度"]||0)>=80)t.push(["高人氣球星","positive","市場知名度極高。"]);
  if((G.stats["人際關係"]||0)>=80)t.push(["更衣室領袖","positive","隊友關係與團隊凝聚力突出。"]);
  if((G.stats["情商"]||0)>=80)t.push(["成熟領袖","positive","高壓情境與談判能力突出。"]);
  if((G.stats["球商"]||0)>=90&&G.phase==="教練")t.push(["戰術大師","positive","教練時期戰術理解頂尖。"]);
  if(m.breakthroughWins>=3)t.push(["極限突破者","positive","多次成功突破能力上限。"]);
  if(m.breakthroughFails>=3)t.push(["冒險訓練派","negative","多次挑戰突破失敗，訓練風格偏冒險。"]);
  if(!t.length)t.push(["尚待定型","neutral","生涯仍在發展中，尚未形成明顯標籤。"]);
  return t.slice(0,8).map(x=>({name:x[0],tone:x[1],desc:x[2]}));
}
function renderPlayerTagsV52(){
  return playerTagsV52().map(x=>`<span class="player-tag ${x.tone}" title="${x.desc}">${x.name}</span>`).join("");
}


const TEAMMATE_FIRST=["阿哲","志豪","柏翰","冠宇","俊傑","宇翔","家豪","承恩","子軒","彥廷","浩然","嘉佑","Kevin","Ryan","Marcus","Jordan","Ethan","Dylan"];
const TEAMMATE_LAST=["林","陳","張","黃","李","王","吳","劉","蔡","楊","Brown","Smith","Johnson","Williams","Miller","Davis"];

function ensureRosterV54(){
  if(!G.rosters)G.rosters={};
  reconcileAwardHistoryV584();
  if(!Array.isArray(G._seasonAwardRowsV55))G._seasonAwardRowsV55=[];

  const currentLeague=leagueName();
  const isNBA=/美國職業聯盟/i.test(currentLeague) || G.proKey==="US";
  const key=`${G.phase}|${G.proKey||G.coachLeague||currentLeague}|${G.team||G.school||"team"}`;

  // NBA：教練看到完整 18 人；球員看到除了自己以外的 17 名隊友。
  let targetCount=12;
  if(G.phase==="職業"||G.phase==="教練")targetCount=15;
  if(isNBA && G.phase==="教練")targetCount=18;
  if(isNBA && G.phase==="職業")targetCount=17;

  let roster=Array.isArray(G.rosters[key])?G.rosters[key]:[];

  // 舊存檔自動補足人數。
  while(roster.length<targetCount){
    const i=roster.length;
    const pos=POS[i%POS.length];
    const base=G.phase==="高中"?rnd(38,68):G.phase==="大學"?rnd(48,78):rnd(58,91);
    const stats={};
    BASE.forEach(k=>stats[k]=clamp(base+rnd(-10,10),20,99));
    roster.push({
      id:`${Date.now()}_${i}_${rnd(100,999)}`,
      name:`${pick(TEAMMATE_LAST)}${pick(TEAMMATE_FIRST)}`,
      pos,
      age:G.phase==="高中"?rnd(15,18):G.phase==="大學"?rnd(18,23):rnd(20,35),
      stats,
      relation:rnd(35,75),
      star:false,
      rosterType:"正式名單",
      role:"替補"
    });
  }

  // 若舊版 NBA 名單比新規則多，只顯示目前規則需要的人數。
  if(isNBA && roster.length>targetCount)roster=roster.slice(0,targetCount);

  roster.sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a));

  // NBA 最後 3 名設為雙向合約；正式名單不包含雙向球員。
  if(isNBA && roster.length>=3){
    const twoWayStart=roster.length-3;
    roster.forEach((p,i)=>{
      p.rosterType=i>=twoWayStart?"雙向合約":"正式名單";
    });
  }else{
    roster.forEach(p=>p.rosterType=p.rosterType||"正式名單");
  }

  // 依位置各選一名總評最高的正式球員組成先發五人。
  const starters=new Set();
  ["PG","SG","SF","PF","C"].forEach(pos=>{
    const c=roster
      .filter(p=>p.pos===pos&&p.rosterType!=="雙向合約"&&!starters.has(p.id))
      .sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a))[0];
    if(c)starters.add(c.id);
  });

  // 若某位置沒人，依總評補足五名先發。
  roster
    .filter(p=>p.rosterType!=="雙向合約"&&!starters.has(p.id))
    .sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a))
    .forEach(p=>{if(starters.size<5)starters.add(p.id)});

  roster.forEach(p=>{
    p.role=starters.has(p.id)?"先發":(p.rosterType==="雙向合約"?"雙向":"替補");
  });

  if(roster[0])roster[0].star=true;
  G.rosters[key]=roster;
  return roster;
}
function rosterOverallV54(p){
  return Math.round(BASE.reduce((s,k)=>s+(p.stats[k]||0),0)/BASE.length);
}
function teamRosterAverageV54(){
  const r=ensureRosterV54();
  return r.length?r.reduce((s,p)=>s+rosterOverallV54(p),0)/r.length:60;
}
function teammateRelationBonusV54(){
  const relation=G.stats["人際關係"]||30;
  const roster=ensureRosterV54();
  return clamp((relation-30)*.08 + (roster.reduce((s,p)=>s+(p.relation||50),0)/(roster.length||1)-50)*.04,-5,8);
}

function currentPlayerRosterRowV841(){
  if(!G || G.phase==="教練" || G.careerEnded)return null;

  let role="替補";
  let pos=G.pos1||"SF";

  try{
    if(typeof coachRolePreviewV46==="function"){
      const preview=coachRolePreviewV46();
      if(preview){
        role=preview.role||role;
        pos=preview.position||pos;
      }
    }
  }catch(e){}

  if(G.modern && G.modern.rotation){ const r=G.modern.rotation; role=r==="先發"?"先發":"板凳"; }

  const stats={};
  BASE.forEach(k=>stats[k]=Number(G.stats[k]||0));

  return {
    id:"__PLAYER_SELF_V841__",
    number:G.number,
    name:G.name,
    pos,
    age:ageNow(),
    stats,
    relation:"本人",
    star:false,
    rosterType:(G.phase==="職業" && G.squadLevel==="二隊")?"二隊名單":"正式名單",
    role,
    isPlayer:true
  };
}

function renderRosterPageV54(){
  const box=$("teammateInline");
  if(!box)return;

  const roster=ensureRosterV54();
  const selfRow=currentPlayerRosterRowV841();

  // 只改「畫面顯示」：原本的隊友資料與球隊計算維持不變，
  // 玩家本人另外加入列表，避免影響交易、教練訓練與舊存檔。
  const displayRoster=selfRow?[...roster,selfRow]:[...roster];
  displayRoster.sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a));

  // 顯示用球星標記：玩家若為全隊最高總評，同樣可顯示星號。
  const topOverall=displayRoster.length?Math.max(...displayRoster.map(p=>rosterOverallV54(p))):0;

  const starters=displayRoster.filter(p=>p.role==="先發").length;
  const bench=Math.max(0,displayRoster.length-starters);

  if($("teamAverageInfo")){
    $("teamAverageInfo").textContent=`球員名單：${displayRoster.length} 人（先發 ${starters} 人 / 板凳 ${bench} 人）`;
  }

  box.innerHTML=`
    <div class="teammate-table-wrap">
      <table class="result-table teammate-table">
        <thead>
          <tr>
            <th>#</th><th>球員</th><th>位置</th><th>年齡</th><th>角色</th><th>名單</th><th>總評</th>
            ${BASE.map(k=>`<th>${k}</th>`).join("")}
            <th>關係</th>
          </tr>
        </thead>
        <tbody>
          ${displayRoster.map((p,i)=>`<tr class="${p.isPlayer?"player-self-row-v841":""}">
            <td>${p.number??((i*7+23)%100)}</td>
            <td class="player-name-cell">${p.isPlayer?'<span class="self-badge-v841">本人</span> ':((p.star||rosterOverallV54(p)===topOverall)?"⭐ ":"")}${p.name}</td>
            <td>${p.pos}</td>
            <td>${p.age}</td>
            <td><span class="role-chip role-${p.role==="先發"?"先發":"板凳"}">${p.role==="先發"?"先發":"板凳"}</span></td>
            <td>${p.rosterType||"正式名單"}</td>
            <td class="overall-cell"><b>${rosterOverallV54(p)}</b></td>
            ${BASE.map(k=>`<td>${p.stats[k]}</td>`).join("")}
            <td>${p.isPlayer?"—":p.relation}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}
function showMainPageV54(){}
function showMainPageV54(){}
function coachTrainPlayerV54(){
  if(G.phase!=="教練")return;
  const roster=ensureRosterV54();
  const candidates=[...roster].sort(()=>Math.random()-.5).slice(0,6);
  modal(`<h2>訓練球員</h2>
    <p>不消耗年度動作次數。選擇一名球員與訓練項目；成功率 80%，成功 +3～7，失敗 -1～2。</p>
    <div class="choices">${candidates.map((p,i)=>`<button class="choice" data-playertrain="${i}"><b>${p.name}｜${p.pos}｜${p.role||"替補"}｜總評 ${rosterOverallV54(p)}</b><small>${p.rosterType||"正式名單"}${p.star?"｜球隊核心":""}</small></button>`).join("")}</div>`);
  [...document.querySelectorAll("[data-playertrain]")].forEach((b,i)=>b.onclick=()=>{
    const p=candidates[i];
    modal(`<h2>訓練 ${p.name}</h2><div class="choices">${BASE.map(k=>`<button class="choice" data-playerstat="${k}"><b>${k}</b><small>目前 ${p.stats[k]}</small></button>`).join("")}</div>`);
    [...document.querySelectorAll("[data-playerstat]")].forEach(bb=>bb.onclick=()=>{
      const stat=bb.dataset.playerstat;
      const ok=Math.random()<.8;
      const d=ok?rnd(3,7):-rnd(1,2);
      const old=p.stats[stat];
      p.stats[stat]=clamp(old+d,20,120);
      p.relation=clamp(p.relation+(ok?rnd(1,3):0),0,100);
      closeModal();
      addLog(`你安排 ${p.name} 進行 ${stat} 訓練，結果${ok?"成功":"不理想"}。${stat} ${old} → <span class="delta">${p.stats[stat]}</span>，目前總評 ${rosterOverallV54(p)}。`,"coach",ok?"球員訓練成功":"球員訓練失敗");
      actionDone();
    });
  });
}
function coachTacticsV54(){
  const iq=G.stats["球商"]||30;
  const rosterAvg=teamRosterAverageV54();
  const choices=[
    ["均衡輪轉","依球員整體能力平均分配球權與輪換。",1.0,1.0],
    ["核心持球","將進攻集中在隊內最高能力球員。",1.12,.88],
    ["外線空間","投籃能力高的陣容受益最大。",1.18,.80],
    ["禁區壓制","籃板與彈跳能力高的陣容受益最大。",1.10,.94],
    ["高球商臨場調整","高度依賴教練球商，臨場上限高。",.92,1.22]
  ];
  return choices.map(x=>{
    const rosterBonus=(rosterAvg-60)*x[2]*.10;
    const iqBonus=(iq-50)*x[3]*.12;
    return [...x,rosterBonus+iqBonus];
  });
}
function coachJobMarketV587(){
  if(G.phase!=="教練")return;

  const iq=G.stats["球商"]||30;
  const eq=G.stats["情商"]||30;
  const rel=G.stats["人際關係"]||30;
  const honors=(G.awards||[]).filter(a=>/最佳教練|總冠軍教練|冠軍/.test(a.award)).length;
  const reputation=clamp(iq*.45+eq*.30+rel*.25+honors*6,20,120);

  const offers=[];
  ["US","GL","CN","JP","KR","TP","PL","SBL"].forEach(key=>{
    const leagueNameText=CONTRACT_RULES[key]?.league||PRO_DEF[key]?.league||key;
    const leagueDifficulty={US:96,GL:84,CN:83,JP:86,KR:82,TP:76,PL:74,SBL:66}[key]||70;
    const appear=clamp(48+(reputation-leagueDifficulty)*1.1,8,96);
    if(Math.random()*100>appear)return;

    makeProTeams(key)
      .filter(t=>t!==G.team)
      .sort(()=>Math.random()-.5)
      .slice(0,reputation>=85?rnd(2,4):rnd(1,3))
      .forEach(team=>{
        const interest=clamp(Math.round(appear+eq*.12+rnd(-12,12)),10,99);
        const salary=Math.max(
          800000,
          Math.round((1200000+reputation*105000+leagueDifficulty*30000+rnd(-600000,1600000))/10000)*10000
        );
        offers.push({key,team,league:leagueNameText,interest,salary});
      });
  });

  if(!offers.length){
    modal(`<h2>教練交易／跳槽市場</h2>
      <p>目前沒有其他球隊願意正式邀請你跳槽。提升球商、情商、人際關係或累積教練獎項後，市場機會會增加。</p>`);
    return;
  }

  offers.sort((a,b)=>b.interest-a.interest);
  modal(`<h2>教練交易／跳槽</h2>
    <p>這裡的「交易」代表你本人更換執教球隊。接受後會直接離開現任球隊並加入新球隊，不消耗年度行動次數。</p>
    ${offers.map((o,i)=>`<div class="offer">
      <button data-coachjump="${i}">接受邀請</button>
      <b>${o.team}</b><br>
      ${o.league}｜年薪 NT$${o.salary.toLocaleString()}｜球隊興趣 ${o.interest}%
    </div>`).join("")}`);

  [...document.querySelectorAll("[data-coachjump]")].forEach(b=>b.onclick=()=>{
    const o=offers[+b.dataset.coachjump];if(!o)return;
    const oldTeam=G.team;
    const oldLeague=G.coachLeague||leagueName();
    G.team=o.team;
    G.coachLeague=o.league;
    G.proKey=o.key;
    G.coachSalaryTWD=o.salary;

    // 新球隊使用自己的獨立 roster key，不沿用前一隊名單。
    ensureRosterV54();
    closeModal();
    addLog(`你接受 ${o.team} 的跳槽邀請，從 ${oldLeague} 的 ${oldTeam} 轉往 <span class="delta">${o.league}｜${o.team}</span> 執教。新年薪約 NT$${o.salary.toLocaleString()}，球隊名單已同步切換。`,"success","教練跳槽完成");
  });
}
function coachPoachV54(){
  return coachJobMarketV587();
}

function markSaveVersionV60(){if(G)G.saveVersion="8.8.5";}
function normalize(){
 if(!G.logs)G.logs=[];if(!G.history)G.history=[];if(!G.awards)G.awards=[];if(!G.hof)G.hof=[];if(!G.seasons)G.seasons=[];
 if(G.careerEnded==null)G.careerEnded=false;if(!G.max)G.max={};if(!G.breakthrough)G.breakthrough={};
 ALL.forEach(k=>{if(G.max[k]==null)G.max[k]=100;if(G.breakthrough[k]==null)G.breakthrough[k]=0});
 if(G.actions==null)G.actions=0;if(G.actions>MAX_ACTIONS)G.actions=MAX_ACTIONS;
 if(G.leagueUsed==null)G.leagueUsed=false;if(G.injury==null)G.injury=0;if(G.contract==null)G.contract=null;if(!Number.isFinite(G.wealthTWD))G.wealthTWD=0;if(G.coachSalaryTWD==null)G.coachSalaryTWD=null;ensureCareerMetricsV52();if(!G.rosters)G.rosters={};
 
 if(!Number.isFinite(G.absoluteAge))G.absoluteAge=legacyAgeV61();
 if(!Number.isFinite(G.absoluteCalendarYear)){
   const loggedYears=(G.logs||[]).map(x=>Number(x&&x.calendarYear)).filter(Number.isFinite);
   G.absoluteCalendarYear=loggedYears.length?Math.max(...loggedYears):(G.startYear||2026)+Math.max(0,(G.seasons||[]).length);
 }

 if(!G.nationality)G.nationality="台灣";
 if(G.phase==="高中"&&!G.hblDivision)G.hblDivision="台灣高中甲級";
 if(G.phase==="大學"&&!G.collegeDivision)G.collegeDivision=collegeUS.includes(G.school)?"美國大學一級聯賽":"台灣大專聯賽";
 const oldLeagueMap={"NBA":"美國職業聯盟","日本 B.LEAGUE PREMIER":"日本B聯盟","日本 B1 聯賽":"日本B聯盟","韓國 KBL":"韓國K聯盟","台灣職業聯賽":"台灣T聯盟"};
 if(oldLeagueMap[G.proLeague])G.proLeague=oldLeagueMap[G.proLeague];
 const oldKeyMap={NBA:"US",TW:"TP"};
 if(oldKeyMap[G.proKey])G.proKey=oldKeyMap[G.proKey];
 if(G.phase==="職業"&&G.proKey){
   const expectedSecondLeague=SECOND_TEAM_LEAGUE[G.proKey]||`${G.proLeague}二隊`;
   const expectedSecondTeam=G.proKey==="GL"?G.team:`${G.team}二隊`;
   G.secondLeague=expectedSecondLeague;
   G.secondTeam=expectedSecondTeam;
   G.squadLevel=G.squadLevel||"一隊";
 }
 if(!Array.isArray(G.nationalHistory))G.nationalHistory=[];
}
function save(){markSaveVersionV60();localStorage.setItem("basketballLifeSave",JSON.stringify(G))}
function load(){try{G=JSON.parse(localStorage.getItem("basketballLifeSave"));if(G)normalize()}catch(e){G=null}return !!G}
function heightModifiers(){
 if(!G.breakthrough)G.breakthrough={};
 ALL.forEach(k=>{if(G.breakthrough[k]==null)G.breakthrough[k]=0});

 const baseMax={};
 ALL.forEach(k=>baseMax[k]=100);
 baseMax["籃板"]=clamp(100+Math.round((G.height-205)/55*20)+Math.round((G.weight-90)/50*20),80,140);
 baseMax["彈跳"]=clamp(100-Math.round((G.weight-90)/50*20)-Math.round((G.height-205)/55*10),80,120);
 baseMax["運球"]=clamp(100-Math.round((G.height-205)/55*20),80,120);

 ALL.forEach(k=>{
   const computed=baseMax[k]+(G.breakthrough[k]||0);
   // 已經練成的能力不因成長後上限重新計算而被強制扣除。
   G.max[k]=Math.max(computed,G.stats&&Number.isFinite(G.stats[k])?G.stats[k]:0);
 });
}
function addLog(text,type="event",title="事件結果",extra={}){G.logs.unshift({text,type,title,year:G.year,calendarYear:calendarYearV44(G.year),age:ageNow(),phase:G.phase,league:leagueName(),...extra});G.logs=G.logs.slice(0,60);save();render()}
function addTable(title,headers,rows,type="league",text=""){
  // 相容舊版誤把 rows / headers 傳反的情況，避免整個遊戲因表格渲染而卡住。
  if(Array.isArray(headers) && headers.length && Array.isArray(headers[0]) &&
     Array.isArray(rows) && (rows.length===0 || !Array.isArray(rows[0]))){
    const tmp=headers; headers=rows; rows=tmp;
  }
  if(!Array.isArray(headers)) headers=["項目","數值"];
  if(!Array.isArray(rows)) rows=[];
  G.logs.unshift({
    type,title,text,year:G.year,calendarYear:calendarYearV44(G.year),
    age:ageNow(),phase:G.phase,league:leagueName(),table:{headers,rows}
  });
  G.logs=G.logs.slice(0,60);
  save();
  render();
}

function uiIconV593(name){
  const icons={
    training:`<svg viewBox="0 0 24 24"><path d="M6 7v10M18 7v10M3 9v6M21 9v6M8 12h8"/></svg>`,
    rest:`<svg viewBox="0 0 24 24"><path d="M3 18V8M3 14h18v4M7 14V9h5a3 3 0 0 1 3 3v2"/></svg>`,
    league:`<svg viewBox="0 0 24 24"><path d="m8 5 4-2 4 2v5a6 6 0 0 1-8 0V5ZM5 6H3v2a4 4 0 0 0 4 4M19 6h2v2a4 4 0 0 1-4 4M12 16v4M8 20h8"/></svg>`,
    position:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>`,
    trade:`<svg viewBox="0 0 24 24"><path d="M4 7h13l-3-3M20 17H7l3 3M17 7l-3 3M7 17l3-3"/></svg>`,
    awards:`<svg viewBox="0 0 24 24"><path d="M8 3h8v5a4 4 0 0 1-8 0V3ZM6 4H3v2a5 5 0 0 0 5 5M18 4h3v2a5 5 0 0 1-5 5M12 12v5M8 21h8M9 17h6"/></svg>`,
    coach:`<svg viewBox="0 0 24 24"><path d="M4 20h16M6 20V7l6-3 6 3v13M9 10h2M13 10h2M9 14h2M13 14h2"/></svg>`,
    player:`<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"/><path d="M5 21c1-5 3-8 7-8s6 3 7 8"/></svg>`,
    comeback:`<svg viewBox="0 0 24 24"><path d="M8 7H4v-4M4 7a8 8 0 1 1-1 7"/></svg>`,
    retire:`<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM9 8h6M9 12h6M9 16h4"/></svg>`,
    handshake:`<svg viewBox="0 0 24 24"><path d="m8 12 3 3c1 1 2 1 3 0l5-5M3 11l5-5 4 3M21 11l-5-5-3 2M4 15l2 2M7 14l3 3M10 15l2 2"/></svg>`,
    basketball:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9M12 3C9 6 8 9 8 12s1 6 4 9"/></svg>`,
    injury:`<svg viewBox="0 0 24 24"><path d="M8 3h8v5h5v8h-5v5H8v-5H3V8h5V3Z"/></svg>`,
    event:`<svg viewBox="0 0 24 24"><path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/></svg>`
  };
  return `<span class="svg-icon">${icons[name]||icons.event}</span>`;
}
function feedEmojiV595(x){
  const t=String((x&&x.title)||"");
  if(/訓練/.test(t))return "🏀";
  if(/挖角|會面|交易|跳槽|邀請/.test(t))return "🤝";
  if(/退役後執教|教練|執教/.test(t))return "🏢";
  if(/退役|履歷/.test(t))return "📋";
  if(/聯賽|賽季|獎項|冠軍|排名/.test(t))return "🏆";
  if(/受傷|傷勢/.test(t))return "🩹";
  if(/休息/.test(t))return "🛏️";
  if(/位置/.test(t))return "🎯";
  return "📌";
}
function feedIconNameV593(x){
  const t=String((x&&x.title)||"");
  if(/訓練/.test(t))return "basketball";
  if(/挖角|會面|交易|跳槽/.test(t))return "handshake";
  if(/退役|執教|教練/.test(t))return "coach";
  if(/國家隊|世界盃|奧運|洲際國家盃/.test(t))return "league";
  if(/聯賽|賽季|獎項|冠軍/.test(t))return "league";
  if(/受傷|傷勢/.test(t))return "injury";
  return "event";
}
function menuIconNameV593(label){
  if(label==="訓練")return "training";
  if(label==="休息")return "rest";
  if(label==="聯賽開始")return "league";
  if(label==="位置")return "position";
  if(label==="交易"||label==="球員交易"||label==="會面")return "trade";
  if(label==="各聯賽獎項"||label==="生涯獎項"||label==="各聯賽名人堂")return "awards";
  if(label==="教練能力訓練")return "coach";
  if(label==="訓練球員")return "player";
  if(label==="復出")return "comeback";
  if(label==="退役"||label==="完全退役")return "retire";
  if(label==="選秀")return "league";
  return "event";
}

function renderFeed(x){
  if(typeof x==="string"){
    return `<div class="feed-card event feed-with-icon">
      <div class="feed-big-icon"><span class="event-emoji">📌</span></div>
      <div class="feed-main">
        <div class="feed-title">舊版紀錄</div>
        <div class="feed-text">${x}</div>
      </div>
    </div>`;
  }

  const hasTable=!!x.table;
  let h=`<div class="feed-card ${x.type||"event"} ${hasTable?"feed-table-card":"feed-with-icon"}">`;

  if(!hasTable){
    h+=`<div class="feed-big-icon"><span class="event-emoji">${feedEmojiV595(x)}</span></div><div class="feed-main">`;
  }else{
    h+=`<div class="feed-main feed-main-full">`;
  }

  h+=`<div class="feed-card-head">
    <div class="feed-title">${x.title||"事件結果"}</div>
    <div class="feed-meta">
      <span class="meta-age">${x.age} 歲</span>
      <span class="meta-league">${x.league}</span>
      <span class="meta-year">第 ${x.year} 年</span>
    </div>
  </div>`;

  if(x.text)h+=`<div class="feed-text">${x.text}</div>`;
  if(x.table)h+=`<div class="result-table-wrap"><table class="result-table"><thead><tr>${x.table.headers.map(v=>`<th>${v}</th>`).join("")}</tr></thead><tbody>${x.table.rows.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  h+=`</div></div>`;
  return h;
}
function initPlayer(d){
 G={name:d.name,nationality:d.nationality||"台灣",height:+d.height,weight:+d.weight,number:+d.number,hand:d.hand,pos1:d.pos1,pos2:d.pos2,phase:"高中",hblDivision:null,year:1,startYear:d.startYear||2026,absoluteAge:16,absoluteCalendarYear:d.startYear||2026,actions:0,injury:0,leagueUsed:false,storyCount:0,logs:[],history:[],awards:[],hof:[],seasons:[],stats:{},max:{},breakthrough:{},school:pick(schools),team:null,theme:"theme-sport",careerEnded:false,proKey:null,proLeague:null,wealthTWD:0,coachSalaryTWD:null,careerMetrics:{teamChanges:0,nbaTrades:0,signedMoves:0,injuryEvents:0,healthySeasons:0,playoffSeasons:0,titles:0,breakthroughWins:0,breakthroughFails:0},teamStints:{},rosters:{}};
 // V8.8.5：五項基礎能力各自隨機 50～70，且平均至少 60。
 // 不再額外贈送 10 點初始配點。
 let initialBaseStats={};
 let initialBaseAvg=0;
 do{
   initialBaseStats={};
   BASE.forEach(k=>initialBaseStats[k]=rnd(50,70));
   initialBaseAvg=BASE.reduce((sum,k)=>sum+initialBaseStats[k],0)/BASE.length;
 }while(initialBaseAvg<60);
 BASE.forEach(k=>G.stats[k]=initialBaseStats[k]);
 FIXED.forEach(k=>G.stats[k]=30);

 G.hblDivision=avg()>=60?"台灣高中甲級":"台灣高中乙級";
 FIXED.forEach(k=>G.max[k]=100);
 heightModifiers();
 G.team=G.school+"籃球隊";G.history.unshift(`16歲加入 ${G.school}，開始高中籃球人生。`);addLog(`你以 ${G.height}cm、${G.weight}kg 的身材加入「${G.school}」，球衣 #${G.number}。每年共有 ${MAX_ACTIONS} 次行動，而且每一年都必須完成聯賽安排。`,"success","球員誕生")
}

function renderEventItemV44(x){
  if(typeof x==="string"){
    return `<div class="event-box event-box-with-icon"><div class="event-side-icon"><span class="event-emoji">📌</span></div><div class="event-content"><div class="event-title">事件結果</div><div class="event-text">${x}</div></div></div>`;
  }
  const hasTable=!!x.table;
  let html=`<div class="event-box ${hasTable?"event-box-table":"event-box-with-icon"}">`;
  if(!hasTable){
    html+=`<div class="event-side-icon"><span class="event-emoji">${feedEmojiV595(x)}</span></div><div class="event-content">`;
  }else{
    html+=`<div class="event-content event-content-full">`;
  }
  html+=`<div class="event-head">
      <div class="event-title">${x.title||"事件結果"}</div>
      <div class="event-meta">
        <span>${x.age??ageNow()} 歲</span>
        <span>${x.league||leagueName()}</span>
        <span>第 ${x.year||G.year} 年</span>
      </div>
    </div>`;
  if(x.text) html+=`<div class="event-text">${x.text}</div>`;
  if(x.table){
    html+=`<div class="result-table-wrap"><table class="result-table"><thead><tr>${x.table.headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>`;
    html+=x.table.rows.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join("")}</tr>`).join("");
    html+=`</tbody></table></div>`;
  }
  return html+`</div></div>`;
}

function stageLabelV45(x){
  const phase=(x && x.phase) || G.phase || "";
  const y=(x && x.year) || G.year || 1;
  if(phase==="高中"){
    const labels=["高一","高二","高三","高中延長年"];
    return labels[Math.min(Math.max(y-1,0),labels.length-1)];
  }
  if(phase==="大學"){
    const labels=["大一","大二","大三","大四"];
    return labels[Math.min(Math.max(y-1,0),labels.length-1)];
  }
  if(phase==="職業") return `職業第 ${y} 年`;
  if(phase==="教練") return `執教第 ${y} 年`;
  if(phase==="退役") return "完全退役";
  return `第 ${y} 年`;
}
function displayLeagueV45(x){
  const phase=(x && x.phase) || G.phase || "";
  const stored=(x && x.league) || "";
  if(phase==="高中") return "台灣高中聯賽";
  if(phase==="大學"){
    if(stored) return stored;
    return "大學聯賽";
  }
  if(phase==="職業") return stored || "職業聯賽";
  if(phase==="教練") return stored || "教練聯賽";
  return stored || "生涯紀錄";
}

function renderEventLogV44(){
  // G.logs 原本是最新在前；顯示時反轉，讓最新事件固定在最下面。
  const items=[...(G.logs||[])].reverse();
  let lastYear=null;
  let out="";
  items.forEach(x=>{
    let y;
    if(x && typeof x==="object"){
      y=x.calendarYear || calendarYearV44(x.year||1);
    }else{
      y=calendarYearV44(1);
    }
    // 某年度的第一篇事件前，只顯示一次年份。
    if(y!==lastYear){
      out+=`<div class="event-year-heading"><span>${y} 年</span><b>${(x&&x.age)??ageNow()} 歲</b><b>${stageLabelV45(x)}</b><b>${displayLeagueV45(x)}</b></div>`;
      lastYear=y;
    }
    out+=renderEventItemV44(x);
  });
  $("log").innerHTML=out;
  scrollEventLogToBottom();
}


function scrollEventLogToBottom(){
  requestAnimationFrame(()=>{
    const box=$("log");
    if(box) box.scrollTop=box.scrollHeight;
  });
}

function careerLabelV57(){
  if(G.phase==="高中")return "高中球員";
  if(G.phase==="大學")return "大學球員";
  if(G.phase==="職業")return "職業球員";
  if(G.phase==="教練")return "籃球教練";
  if(G.phase==="退役")return "退役球員";
  return `${G.phase||"球員"}`;
}


function legalNoticeV611(){
  return `<div class="legal-notice-v611">
    本作為原創、非官方籃球生涯模擬遊戲。遊戲中的聯盟、球隊、球員、賽事與品牌名稱均為虛構或泛稱；
    與任何現實職業聯盟、學校體育組織、國際體育組織、球隊或球員均無隸屬、授權或合作關係。
  </div>`;
}


/* ================= V7.0 現代籃球系統 ================= */
const ADV_KEYS=["三分","中距離","籃下終結","罰球","外線防守","內線防守","抄截","阻攻","速度","體力","力量"];
const TACTICS=["Pace & Space","5-Out","Pick & Roll","Motion","Post-up","Small Ball","防守反擊","區域防守","換防體系"];
const ARCHETYPES=["持球核心","3&D","雙能衛","空間型四號","組織前鋒","護框中鋒","Stretch 5","吃餅型中鋒","第六人砍分手","防守工兵"];
const FORM_STATES=["火熱","普通","低潮","疲勞","帶傷","士氣低落","合約年爆發","季後賽爆發"];

function ensureModernV7(){
  G.advanced=G.advanced||{};
  const s=G.stats||{}, h=Number(G.height||190);
  const seed={
    "三分":s["投籃"],"中距離":s["投籃"],"籃下終結":Math.round(((s["彈跳"]||50)+(s["運球"]||50))/2),
    "罰球":s["投籃"],"外線防守":Math.round(((s["運球"]||50)+(s["球商"]||50))/2),
    "內線防守":Math.round(((s["籃板"]||50)+(s["彈跳"]||50)+(h-170)*.7)/3),
    "抄截":Math.round(((s["運球"]||50)+(s["球商"]||50))/2),"阻攻":Math.round(((s["彈跳"]||50)+(s["籃板"]||50)+(h-170))/3),
    "速度":Math.round(((s["運球"]||50)+(s["彈跳"]||50))/2),"體力":65,"力量":Math.round(45+(Number(G.weight||80)-60)*.55)
  };
  ADV_KEYS.forEach(k=>{if(!Number.isFinite(G.advanced[k]))G.advanced[k]=clamp(Number(seed[k]||50),0,100)});
  G.modern=G.modern||{};
  const m=G.modern;
  if(!m.form)m.form="普通";
  if(!m.tactic)m.tactic=pick(TACTICS);
  if(!m.potential)m.potential=clamp(Math.round(avg()+rnd(5,22)),45,99);
  if(!m.relations)m.relations={隊友:50,教練:50,管理層:50,球星招募:40,球迷支持:50};
  if(!m.agent)m.agent=null;
  if(!m.injury)m.injury=null;
  if(!m.contractType)m.contractType="一般合約";
  if(!m.national)m.national={stage:"未進入候選",caps:0,points:0};
  if(!m.devTeam)m.devTeam={status:"一隊",games:0};
  updateModernV7();
}
function advancedOverallV7(){ensureModernBareV7();return Math.round(ADV_KEYS.reduce((a,k)=>a+(G.advanced[k]||0),0)/ADV_KEYS.length)}
function ensureModernBareV7(){G.advanced=G.advanced||{};ADV_KEYS.forEach(k=>{if(!Number.isFinite(G.advanced[k]))G.advanced[k]=50});G.modern=G.modern||{}}
function archetypeV7(){
  ensureModernBareV7(); const a=G.advanced,s=G.stats||{},p=G.pos1||"";
  const scores={
    "持球核心":(s["運球"]||0)*.35+(s["傳球"]||0)*.35+a["三分"]*.15+a["速度"]*.15,
    "3&D":a["三分"]*.42+a["外線防守"]*.42+a["抄截"]*.16,
    "雙能衛":(s["運球"]||0)*.25+(s["傳球"]||0)*.25+a["三分"]*.25+a["籃下終結"]*.25,
    "空間型四號":a["三分"]*.4+a["內線防守"]*.25+(s["籃板"]||0)*.25+a["力量"]*.1,
    "組織前鋒":(s["傳球"]||0)*.38+(s["球商"]||0)*.3+a["籃下終結"]*.16+a["外線防守"]*.16,
    "護框中鋒":a["阻攻"]*.42+a["內線防守"]*.33+(s["籃板"]||0)*.25,
    "Stretch 5":a["三分"]*.4+a["內線防守"]*.25+(s["籃板"]||0)*.2+a["力量"]*.15,
    "吃餅型中鋒":a["籃下終結"]*.4+(s["彈跳"]||0)*.25+(s["籃板"]||0)*.2+a["力量"]*.15,
    "第六人砍分手":a["三分"]*.3+a["中距離"]*.3+a["籃下終結"]*.25+(s["運球"]||0)*.15,
    "防守工兵":a["外線防守"]*.3+a["內線防守"]*.25+a["抄截"]*.2+a["阻攻"]*.15+a["體力"]*.1
  };
  return Object.entries(scores).sort((x,y)=>y[1]-x[1])[0][0];
}
function tacticFitV7(){
  ensureModernBareV7(); const a=G.advanced,s=G.stats||{},t=G.modern.tactic||"Motion";
  const map={
   "Pace & Space":[a["速度"],a["三分"],s["傳球"]],"5-Out":[a["三分"],s["傳球"],s["球商"]],
   "Pick & Roll":[s["運球"],s["傳球"],a["籃下終結"]],"Motion":[s["傳球"],s["球商"],a["體力"]],
   "Post-up":[a["力量"],a["內線防守"],a["中距離"]],"Small Ball":[a["速度"],a["三分"],a["外線防守"]],
   "防守反擊":[a["速度"],a["抄截"],a["體力"]],"區域防守":[s["球商"],a["內線防守"],a["阻攻"]],
   "換防體系":[a["外線防守"],a["內線防守"],a["速度"]]
  }; return clamp(Math.round((map[t]||[50,50,50]).reduce((x,y)=>x+(y||0),0)/3),0,100);
}
function marketValueV7(){
 const age=ageNow(),ov=(avg()+advancedOverallV7())/2,m=G.modern;
 return Math.max(1,Math.round(ov*1.15+m.potential*.55+Math.max(0,30-age)*1.8+(G.stats["知名度"]||0)*.25-(m.injury?10:0)));
}
function rotationV7(){
 const fit=tacticFitV7(),ov=(avg()+advancedOverallV7())/2,form={"火熱":8,"普通":0,"低潮":-7,"疲勞":-9,"帶傷":-14,"士氣低落":-6,"合約年爆發":7,"季後賽爆發":9}[G.modern.form]||0;
 const x=ov*.68+fit*.32+form+moodPerformanceV71();
 if(G.modern.devTeam.status==="二隊")return ["二隊",28];
 if(x>=83)return ["先發",rnd(31,38)]; if(x>=76)return ["第六人",rnd(25,32)]; if(x>=68)return ["主要替補",rnd(18,27)];
 if(x>=60)return ["輪替",rnd(10,19)]; return ["板凳",rnd(2,10)];
}
function updateModernV7(){
 ensureModernBareV7(); G.modern.archetype=archetypeV7(); G.modern.fit=tacticFitV7(); G.modern.market=marketValueV7();
 const r=rotationV7();G.modern.rotation=r[0];G.modern.mpg=r[1];
}
function seasonStatsV7(){
 updateModernV7();const a=G.advanced,m=G.modern,mpg=m.mpg,form={"火熱":1.12,"普通":1,"低潮":.88,"疲勞":.84,"帶傷":.78,"士氣低落":.9,"合約年爆發":1.1,"季後賽爆發":1.13}[m.form]||1;
 const moodMult=1+moodPerformanceV71()/100;
 const ppg=Math.max(0,((a["三分"]+a["中距離"]+a["籃下終結"])/300)*mpg*.72*form*moodMult);
 const rpg=Math.max(0,((G.stats["籃板"]||0)+a["力量"])/200*mpg*.30*moodMult);
 const apg=Math.max(0,((G.stats["傳球"]||0)+(G.stats["運球"]||0))/200*mpg*.25*moodMult);
 const spg=a["抄截"]/100*mpg*.055,bpg=a["阻攻"]/100*mpg*.06;
 const fg=clamp(34+(a["中距離"]+a["籃下終結"])/200*25,30,68),tp=clamp(22+a["三分"]*.22,18,48),ft=clamp(45+a["罰球"]*.45,45,95);
 const ts=clamp(fg*.65+tp*.2+ft*.15,35,75),usage=clamp(12+ppg*.8,10,38),per=clamp(5+ppg*.55+rpg*.3+apg*.45+spg*1.8+bpg*1.8,3,35);
 return {PPG:ppg.toFixed(1),RPG:rpg.toFixed(1),APG:apg.toFixed(1),SPG:spg.toFixed(1),BPG:bpg.toFixed(1),"FG%":fg.toFixed(1),"3P%":tp.toFixed(1),"FT%":ft.toFixed(1),MPG:mpg,"USG%":usage.toFixed(1),"TS%":ts.toFixed(1),PER:per.toFixed(1),"+/-":(per-15).toFixed(1)};
}
function modernDashboardV7(){
 ensureModernV7();updateModernV7();const st=seasonStatsV7(),m=G.modern;
 modal(`<h2>🏀 現代籃球詳細資料</h2><div class="resume-section"><h3>球員定位</h3><p><b>${m.archetype}</b>｜${m.rotation}｜預估 ${m.mpg} MPG｜狀態：${m.form}</p><p>球隊戰術：${m.tactic}｜戰術適性 ${m.fit}%｜市場價值指數 ${m.market}｜潛力 ${m.potential}</p></div>
 <div class="resume-section"><h3>進階能力</h3><div class="modern-grid">${ADV_KEYS.map(k=>`<span>${k}<b>${G.advanced[k]}</b></span>`).join("")}</div></div>
 <div class="resume-section"><h3>賽季數據預估</h3><div class="modern-grid">${Object.entries(st).map(([k,v])=>`<span>${k}<b>${v}</b></span>`).join("")}</div></div>
 <div class="resume-section"><h3>關係網</h3><div class="modern-grid">${Object.entries(m.relations).map(([k,v])=>`<span>${k}<b>${v}</b></span>`).join("")}</div></div>
 <div class="resume-section"><h3>合約／經紀人／國家隊／發展隊</h3><p>${m.contractType}｜經紀人：${m.agent||"尚未簽約"}｜國家隊：${m.national.stage}｜${m.devTeam.status}</p></div>
 <div class="choices"><button type="button" id="modernAgentBtnV848">選擇經紀人</button><button type="button" id="modernSocialBtnV848">社群／輿論事件</button><button type="button" id="modernInjuryBtnV848">傷病中心</button></div>`);

 const agentBtn=document.getElementById("modernAgentBtnV848");
 const socialBtn=document.getElementById("modernSocialBtnV848");
 const injuryBtn=document.getElementById("modernInjuryBtnV848");

 if(agentBtn)agentBtn.onclick=()=>randomStoryThenV876("modern",()=>chooseAgentV7(),"進入經紀人功能");
 if(socialBtn)socialBtn.onclick=()=>randomStoryThenV876("modern",()=>socialEventV7(),"進入社群／輿論");
 if(injuryBtn)injuryBtn.onclick=()=>randomStoryThenV876("modern",()=>injuryCenterV7(),"進入傷病中心");
}


/* ===== V8.8.5 隨機劇情引擎 ===== */
const STORY_POOLS_V857={
 modern:[
  {title:"更衣室風波",icon:"🏀",text:"球隊近期戰績不穩，一名隊友受訪時暗示「有人太在意個人數據」。媒體開始猜測他是在影射你。",
   choices:[
    ["私下找隊友談","你在訓練後找到對方。對方坦承最近因上場時間減少而不滿。",["安慰並一起加練","直接談球場分工","保持距離"],"人際關係"],
    ["公開回應媒體","你的回應立刻成為體育節目討論焦點。",["緩和語氣","堅持立場","交給經紀人處理"],"知名度"],
    ["先不回應","你選擇把注意力放回球場，但外界仍持續猜測。",["用比賽表現回應","請教練協調","之後再談"],"球商"]
   ]},
  {title:"戰術角色調整",icon:"📋",text:"教練準備改變進攻體系，你可能獲得更多持球權，也可能被要求轉為無球角色。",
   choices:[
    ["主動爭取持球","教練要求你在訓練中證明決策能力。",["接受挑戰","提出折衷方案","改練無球"],"球商"],
    ["配合球隊安排","教練對你的態度表示肯定，但你的個人數據可能改變。",["研究新戰術","找隊友磨合","額外看影片"],"人際關係"],
    ["請經紀人了解定位","經紀人與管理層交換了對你未來角色的看法。",["接受目前定位","要求明確承諾","觀察交易市場"],"知名度"]
   ]},
  {title:"突然的交易傳聞",icon:"🔄",text:"記者爆料有其他球隊詢問你的交易價值，休息室氣氛開始變得微妙。",
   choices:[
    ["詢問管理層","管理層表示目前只是市場探詢，尚未有正式報價。",["表達想留下","保持開放","要求被交易"],"人際關係"],
    ["交給經紀人","你的經紀人開始蒐集各隊對你的評價。",["優先爭取強隊","優先爭取大角色","暫不動作"],"知名度"],
    ["專心打球","你拒絕在賽前談交易，希望用表現控制輿論。",["加強訓練","和隊友溝通","賽後再回應"],"球商"]
   ]}
 ],
 life:[
  {title:"難得的休假夜晚",icon:"🌙",text:"連續比賽後終於出現完整休假。朋友邀你去夜店，也有人提議低調吃飯放鬆。",
   choices:[
    ["去夜店狂歡","現場有人認出你並開始拍攝，氣氛比預期更高調。",["提早離開","留下同樂","請朋友避免拍照"],"心情"],
    ["和朋友吃飯","你久違地和圈外朋友聊天，暫時忘掉球場壓力。",["聊生活","聊籃球煩惱","早點回家休息"],"壓力"],
    ["留在家休息","安靜的晚上讓身體獲得恢復，但你也有些孤單。",["看電影","打電動","聯絡朋友"],"體力"]
   ]},
  {title:"意外的邂逅",icon:"❤️",text:"朋友聚會上，你認識了一位聊得很投緣的人。對方知道你是職業球員，但似乎不太在意你的名氣。",
   choices:[
    ["主動交換聯絡方式","你們之後持續聊天，彼此印象不錯。",["約下一次見面","慢慢觀察","先當朋友"],"心情"],
    ["保持低調","你擔心感情影響賽季，因此沒有急著推進關係。",["之後再聯絡","專注球季","詢問朋友看法"],"壓力"],
    ["直接表達好感","對方對你的直接有些意外，但願意繼續了解。",["安排約會","保持自然","避免媒體知道"],"知名度"]
   ]},
  {title:"家人的來電",icon:"🏠",text:"家人發現你最近壓力很大，打電話問你是否需要回家休息幾天。",
   choices:[
    ["抽時間陪家人","你短暫離開籃球環境，心情逐漸穩定。",["一起吃飯","談最近壓力","什麼都不談"],"心情"],
    ["表示自己沒事","你不希望家人擔心，但情緒仍需要自己消化。",["找朋友聊","獨處","提早睡覺"],"壓力"],
    ["邀家人來看球","你希望把生活與籃球重新連結起來。",["安排好座位","賽後聚餐","低調處理"],"人際關係"]
   ]}
 ],
 finance:[
  {title:"大型品牌突然來電",icon:"📣",text:"經紀人通知你，一家大型品牌希望在本週內決定代言人，但同時還在接觸另一位明星球員。",
   choices:[
    ["積極爭取","你參加品牌簡報，對方要求你提出個人形象方向。",["強調球場專業","強調生活風格","讓經紀人主導"],"知名度"],
    ["要求提高報價","經紀人把你的市場數據交給品牌，希望換取更好的條件。",["堅持價格","加入績效獎金","接受折衷"],"財富"],
    ["暫時不接","你擔心商業活動影響球季準備。",["保留未來合作","推薦其他球員","完全婉拒"],"球商"]
   ]},
  {title:"投資邀請",icon:"💰",text:"一位熟人介紹新創投資案，預期報酬很高，但經紀團隊提醒風險也不低。",
   choices:[
    ["請專業人士評估","財務顧問發現計畫有潛力，但現金流仍不穩。",["小額投入","繼續觀察","放棄投資"],"財富"],
    ["直接投入","你的決定很快，市場卻在幾天後出現波動。",["停損","長期持有","追加資金"],"財富"],
    ["拒絕熟人","你選擇把友情與投資分開。",["解釋原因","不多說","改做公益"],"人際關係"]
   ]},
  {title:"代言形象危機",icon:"⚠️",text:"你代言的品牌突然陷入公關爭議，媒體開始詢問你是否繼續合作。",
   choices:[
    ["要求品牌說明","經紀人安排緊急會議，品牌承諾提出改善方案。",["暫停宣傳","繼續合作","要求解約條款"],"知名度"],
    ["立刻切割","你的聲明獲得部分球迷支持，但也可能造成合約糾紛。",["公開聲明","低調處理","交給律師"],"財富"],
    ["先保持沉默","媒體持續追問，你需要決定下一步。",["隔天回應","讓經紀人發言","等事件降溫"],"球商"]
   ]}
 ],
 world:[
  {title:"明星球員公開招募",icon:"🌍",text:"另一隊的明星球員在節目中公開稱讚你的打法，甚至表示「很想有一天一起打球」。",
   choices:[
    ["公開友善回應","球迷立刻開始製作你們同隊的假想陣容。",["稱讚對方","開玩笑帶過","強調目前球隊"],"知名度"],
    ["私下聯絡","你們聊到彼此的球風與未來目標。",["保持聯絡","談合作可能","只聊籃球"],"人際關係"],
    ["完全不回應","外界把你的沉默解讀成各種不同意思。",["之後澄清","繼續沉默","請經紀人處理"],"球商"]
   ]},
  {title:"自由市場震撼消息",icon:"📰",text:"聯盟一名頂級球星突然拒絕續約，整個自由市場的球隊策略可能被重新洗牌。",
   choices:[
    ["關注市場變化","經紀人整理出幾支可能因此改變補強方向的球隊。",["研究強隊","研究需要你的位置","不受影響"],"球商"],
    ["聯絡好友打聽","你從球員圈聽到一些尚未公開的市場消息。",["繼續追問","保持秘密","告訴經紀人"],"人際關係"],
    ["專注自己球隊","你不希望外界誤會你有離隊意圖。",["公開表忠","保持低調","和管理層談"],"知名度"]
   ]},
  {title:"國際賽邀請風聲",icon:"🏅",text:"媒體報導國家隊正在擴大觀察名單，你的名字也被球迷頻繁討論。",
   choices:[
    ["公開表達意願","國家隊話題快速升溫，球迷反應熱烈。",["強調榮譽","保持謙虛","專注聯賽"],"知名度"],
    ["私下詢問狀況","經紀人確認你確實在觀察範圍內，但尚未正式入選。",["準備集訓","保持正常節奏","加強體能"],"球商"],
    ["暫不考慮","你希望先處理俱樂部賽季與身體狀況。",["說明原因","不公開回應","之後再評估"],"體力"]
   ]}
 ]
};
function storyValueV857(stat){
 if(stat==="心情")return G.life?.mood??50;
 if(stat==="壓力")return 100-(G.life?.stress??50);
 if(stat==="體力")return G.life?.energy??50;
 if(stat==="財富")return Math.min(100,Math.floor((G.finance?.wealth||0)/1000000)+40);
 return Number(G[stat]??G.stats?.[stat]??G.modern?.relations?.[stat]??50);
}
function applyStoryEffectV857(stat,good){
 const d=good?rnd(2,6):rnd(-4,-1);
 if(stat==="心情"&&G.life)G.life.mood=clamp((G.life.mood||50)+d,0,100);
 else if(stat==="壓力"&&G.life)G.life.stress=clamp((G.life.stress||50)-d,0,100);
 else if(stat==="體力"&&G.life)G.life.energy=clamp((G.life.energy||50)+d,0,100);
 else if(stat==="財富"&&G.finance)G.finance.wealth=Math.max(0,(G.finance.wealth||0)+(good?rnd(1,8)*10000:-rnd(1,5)*10000));
 else if(G.modern?.relations && stat in G.modern.relations)G.modern.relations[stat]=clamp((G.modern.relations[stat]||50)+d,0,100);
 else if(typeof G[stat]==="number")G[stat]=Math.max(0,G[stat]+d);
 return d;
}
function randomStoryV857(type){
 const pool=STORY_POOLS_V857[type]||STORY_POOLS_V857.modern;
 const ev=pick(pool);
 modal(`<h2>${ev.icon} ${ev.title}</h2><div class="resume-section story-scene-v857"><small>隨機事件</small><p>${ev.text}</p></div>
 <h3>你要怎麼做？</h3><div class="choices">${ev.choices.map((c,i)=>`<button type="button" data-story-choice-v857="${i}">${c[0]}</button>`).join("")}</div>`);
 document.querySelectorAll("[data-story-choice-v857]").forEach(b=>b.onclick=()=>storyStage2V857(type,ev,+b.dataset.storyChoiceV857));
}
function storyStage2V857(type,ev,idx){
 const c=ev.choices[idx];
 modal(`<h2>${ev.icon} ${ev.title}</h2>
 <div class="resume-section story-scene-v857"><small>事情發展</small><p>你選擇了「<b>${c[0]}</b>」。</p><p>${c[1]}</p></div>
 <h3>接下來呢？</h3><div class="choices">${c[2].map((x,i)=>`<button type="button" data-story-follow-v857="${i}">${x}</button>`).join("")}</div>`);
 document.querySelectorAll("[data-story-follow-v857]").forEach(b=>b.onclick=()=>storyResolveV857(type,ev,c,+b.dataset.storyFollowV857));
}
function storyResolveV857(type,ev,c,follow){
 const action=c[2][follow],base=storyValueV857(c[3]);
 const roll=rnd(1,100),success=roll<=Math.min(88,45+Math.floor(base*.35));
 const delta=applyStoryEffectV857(c[3],success);
 const result=success
  ?`你的處理方式得到正面回應，事情逐漸往有利方向發展。`
  :`事情沒有完全照預期發展，你需要承擔一些後續影響。`;
 addLog(`${ev.title}：你先選擇「${c[0]}」，之後決定「${action}」。${result}`,"event","隨機劇情");
 save();render();
 modal(`<h2>${success?"✅":"⚠️"} ${ev.title}・結果</h2>
 <div class="resume-section"><small>最終發展</small><p>${result}</p><p><b>你的決定：</b>${c[0]} → ${action}</p><p><b>影響：</b>${c[3]} ${delta>=0?"+":""}${delta}</p></div>
 <div class="choices"><button id="storyAgainV857">再看看有沒有新事件</button><button id="storyCloseV857">結束</button></div>`);
 document.getElementById("storyAgainV857").onclick=()=>randomStoryV857(type);
 document.getElementById("storyCloseV857").onclick=()=>closeModal();
}


function randomStoryThenV876(type,nextFn,nextLabel="繼續"){
 const pool=STORY_POOLS_V857[type]||STORY_POOLS_V857.modern;
 const ev=pick(pool);
 modal(`<h2>${ev.icon} ${ev.title}</h2>
  <div class="resume-section"><h3>事情經過</h3><p>${lifeThirtyTextV875(ev.text)}</p></div>
  <h3>你要怎麼做？</h3><div class="choices">${ev.choices.map((c,i)=>`<button type="button" data-v876-first="${i}">${c[0]}</button>`).join("")}</div>`);
 document.querySelectorAll('[data-v876-first]').forEach(b=>b.onclick=()=>{
   const c=ev.choices[+b.dataset.v876First];
   modal(`<h2>${ev.icon} ${ev.title}</h2>
    <div class="resume-section"><h3>過程</h3><p>${lifeThirtyTextV875(c[1])}</p></div>
    <h3>後續選擇</h3><div class="choices">${c[2].map((x,i)=>`<button type="button" data-v876-follow="${i}">${x}</button>`).join("")}</div>`);
   document.querySelectorAll('[data-v876-follow]').forEach(f=>f.onclick=()=>{
     const action=c[2][+f.dataset.v876Follow],base=storyValueV857(c[3]);
     const success=rnd(1,100)<=Math.min(88,45+Math.floor(base*.35));
     const delta=applyStoryEffectV857(c[3],success);
     const result=success?'你的處理得到正面回應，局勢逐漸穩定，也替後續行動留下更多空間。':'事情沒有完全照預期發展，你承受一些影響，也必須重新調整接下來的做法。';
     addLog(`${ev.title}：${c[0]} → ${action}。${result}`,'event','隨機劇情');
     save();render();
     processResultDialogV854(`${ev.icon} ${ev.title}`,
       lifeThirtyTextV875(`${c[1]}你接著選擇「${action}」。`),
       `${lifeThirtyTextV875(result)}<br><span class="delta">${c[3]} ${delta>=0?'+':''}${delta}</span>`,
       [{label:nextLabel,fn:()=>{if(typeof nextFn==='function')nextFn();}}]
     );
   });
 });
}

function processResultDialogV854(title,processText,resultText,buttons=[]){
  modal(`<h2>${title}</h2>
    <div class="resume-section process-step-v854">
      <h3>過程</h3>
      <p>${processText}</p>
    </div>
    <div class="resume-section result-step-v854">
      <h3>結果</h3>
      <p>${resultText}</p>
    </div>
    <div class="choices">
      ${buttons.map((b,i)=>`<button type="button" data-process-next-v854="${i}">${b.label}</button>`).join("")}
      <button type="button" id="processCloseV854">關閉</button>
    </div>`);
  document.querySelectorAll("[data-process-next-v854]").forEach(b=>b.onclick=()=>{
    const item=buttons[+b.dataset.processNextV854];
    if(item&&typeof item.fn==="function"){ closeModal(); item.fn(); }
  });
  const close=document.getElementById("processCloseV854");
  if(close)close.onclick=()=>closeModal();
}


const AGENTS_V855=[
 {id:"ethan_cole",name:"Ethan Cole",specialty:"合約談判",type:"談薪型",tier:"菁英",commission:4,
  skills:{談薪:94,商業:62,球隊人脈:76,國際資源:55},
  desc:"擅長薪資、續約、球員選項與獎金條款。",perk:"合約報價與續約談判更有利。"},
 {id:"sophia_bennett",name:"Sophia Bennett",specialty:"品牌與代言",type:"商業型",tier:"菁英",commission:5,
  skills:{談薪:72,商業:96,球隊人脈:68,國際資源:77},
  desc:"擅長品牌合作、個人形象與大型商業案。",perk:"提高代言邀約品質與商業收入。"},
 {id:"marcus_reed",name:"Marcus Reed",specialty:"球隊關係",type:"球隊關係型",tier:"資深",commission:4,
  skills:{談薪:78,商業:60,球隊人脈:95,國際資源:58},
  desc:"與球隊管理層、教練與球探圈關係深厚。",perk:"轉隊、交易協調與球隊邀約更有利。"},
 {id:"daniel_kim",name:"Daniel Kim",specialty:"國際市場",type:"國際型",tier:"資深",commission:5,
  skills:{談薪:73,商業:82,球隊人脈:70,國際資源:97},
  desc:"熟悉亞洲、歐洲與國際賽市場及跨國品牌。",perk:"增加海外球隊、國際品牌與跨國機會。"},
 {id:"olivia_hart",name:"Olivia Hart",specialty:"新秀發展",type:"新秀型",tier:"新銳",commission:3,
  skills:{談薪:76,商業:67,球隊人脈:82,國際資源:61},
  desc:"擅長替年輕球員規劃選秀、試訓與第一份職業合約。",perk:"年輕階段更容易取得試訓與發展機會。"},
 {id:"noah_grant",name:"Noah Grant",specialty:"全方位生涯規劃",type:"全能型",tier:"頂級",commission:6,
  skills:{談薪:90,商業:89,球隊人脈:91,國際資源:86},
  desc:"頂級全能經紀人，客戶門檻高，但能同時處理競技與商業生涯。",perk:"各類經紀人事件都有穩定加成。"}
];

function ensureAgentStateV855(){
 G.modern=G.modern||{};
 if(!G.modern.agentProfile){
   const old=G.modern.agent;
   const map={"談薪型":"ethan_cole","商業型":"sophia_bennett","球隊關係型":"marcus_reed","國際型":"daniel_kim"};
   if(old && map[old]){
     const a=AGENTS_V855.find(x=>x.id===map[old]);
     G.modern.agentProfile={id:a.id,name:a.name,specialty:a.specialty,type:a.type,tier:a.tier,commission:a.commission,trust:60,years:1};
   }
 }
 return G.modern.agentProfile||null;
}
function agentByIdV855(id){return AGENTS_V855.find(x=>x.id===id)||null}
function currentAgentV855(){const p=ensureAgentStateV855();return p?agentByIdV855(p.id):null}
function agentAvailabilityV855(a){
 const fame=Number(G.fame||G.stats?.fame||G.modern?.marketValue||30);
 if(a.tier==="頂級" && fame<65)return {ok:false,text:"需要較高知名度／市場價值"};
 if(a.tier==="菁英" && fame<40)return {ok:false,text:"目前仍在觀察你的發展"};
 return {ok:true,text:"可洽談"};
}
function agentSkillBarV855(label,val){
 return `<div class="agent-skill-v855"><span>${label}</span><b>${val}</b><div><i style="width:${val}%"></i></div></div>`;
}
function agentDetailV855(id){
 const a=agentByIdV855(id); if(!a)return;
 const av=agentAvailabilityV855(a), cur=ensureAgentStateV855();
 modal(`<h2>🤝 ${a.name}</h2>
 <div class="resume-section agent-profile-v855">
   <div class="agent-head-v855"><div><b>${a.specialty}</b><small>${a.tier}經紀人｜${a.type}</small></div><span>抽成 ${a.commission}%</span></div>
   <p>${a.desc}</p><p><b>特色：</b>${a.perk}</p>
   ${agentSkillBarV855("談薪",a.skills.談薪)}
   ${agentSkillBarV855("商業",a.skills.商業)}
   ${agentSkillBarV855("球隊人脈",a.skills.球隊人脈)}
   ${agentSkillBarV855("國際資源",a.skills.國際資源)}
 </div>
 <div class="choices">
   <button type="button" id="agentSignV855" ${av.ok?"":"disabled"}>${cur&&cur.id===a.id?"目前經紀人":av.ok?`與 ${a.name} 簽約`:av.text}</button>
   <button type="button" id="agentBackV855">查看其他經紀人</button>
 </div>`);
 const sign=document.getElementById("agentSignV855");
 if(sign&&av.ok&&!(cur&&cur.id===a.id))sign.onclick=()=>signAgentV855(a.id);
 const back=document.getElementById("agentBackV855"); if(back)back.onclick=()=>chooseAgentV7();
}
function signAgentV855(id){
 const a=agentByIdV855(id); if(!a)return;
 const old=ensureAgentStateV855();
 G.modern.agent=a.name;
 G.modern.agentProfile={id:a.id,name:a.name,specialty:a.specialty,type:a.type,tier:a.tier,commission:a.commission,trust:60,years:1};
 addLog(`你與 ${a.name} 簽約。專長：${a.specialty}，經紀抽成 ${a.commission}%。`,"event","經紀人");
 save();render();
 processResultDialogV854("🤝 經紀人簽約",
  `${old?`你先與原經紀人 ${old.name} 結束合作，之後`:``}你和 ${a.name} 完成會談，討論生涯方向、服務範圍與抽成比例。`,
  `新經紀人：${a.name}｜專長：${a.specialty}｜抽成：${a.commission}%｜信任度：60。`,
  [{label:"經紀人中心",fn:()=>agentCenterV855()},{label:"代言與財富",fn:()=>endorsementCenterV73()}]);
}
function fireAgentV855(){
 const p=ensureAgentStateV855(); if(!p)return chooseAgentV7();
 modal(`<h2>解除經紀合約</h2><p>確定與 <b>${p.name}</b> 結束合作？更換經紀人可能短暫降低業界關係與談判穩定度。</p>
 <div class="choices"><button id="agentFireConfirmV855">確認解約</button><button id="agentFireCancelV855">取消</button></div>`);
 document.getElementById("agentFireConfirmV855").onclick=()=>{
   G.modern.agent=null;G.modern.agentProfile=null;
   G.modern.relations=G.modern.relations||{};
   G.modern.relations.管理層=clamp((G.modern.relations.管理層||50)-2,0,100);
   addLog(`你與 ${p.name} 結束經紀合作。`,"event","經紀人");save();render();
   processResultDialogV854("經紀合約結束","雙方完成合約終止與客戶資料交接。","你目前沒有經紀人，可重新尋找適合的合作對象。",[{label:"尋找新經紀人",fn:()=>chooseAgentV7()}]);
 };
 document.getElementById("agentFireCancelV855").onclick=()=>agentCenterV855();
}
function agentCenterV855(){
 const p=ensureAgentStateV855(),a=currentAgentV855();
 if(!p||!a)return chooseAgentV7();
 modal(`<h2>💼 經紀人中心</h2>
 <div class="resume-section">
  <h3>${a.name}｜${a.specialty}</h3>
  <p>${a.tier}經紀人｜抽成 ${p.commission}%｜合作第 ${p.years||1} 年｜信任度 ${p.trust??60}/100</p>
  <p>${a.perk}</p>
  ${agentSkillBarV855("談薪",a.skills.談薪)}${agentSkillBarV855("商業",a.skills.商業)}
  ${agentSkillBarV855("球隊人脈",a.skills.球隊人脈)}${agentSkillBarV855("國際資源",a.skills.國際資源)}
 </div>
 <div class="choices">
  <button id="agentMeetingV855">📋 生涯會議</button>
  <button id="agentOffersV855">📨 查看經紀人帶來的機會</button>
  <button id="agentChangeV855">🔄 更換經紀人</button>
  <button id="agentFireV855">解除合約</button>
 </div>`);
 document.getElementById("agentMeetingV855").onclick=()=>agentCareerMeetingV855();
 document.getElementById("agentOffersV855").onclick=()=>agentOpportunityV855();
 document.getElementById("agentChangeV855").onclick=()=>chooseAgentV7();
 document.getElementById("agentFireV855").onclick=()=>fireAgentV855();
}
function agentCareerMeetingV855(){
 const p=ensureAgentStateV855(),a=currentAgentV855(); if(!a)return;
 const opts=[
  ["爭取更大角色","球隊人脈","希望經紀人向球隊表達你想要更重要的戰術地位。"],
  ["優先談高薪","談薪","要求下一份合約以薪資與保障年限為優先。"],
  ["擴大商業曝光","商業","把更多資源投入品牌、媒體與商業合作。"],
  ["探索國際機會","國際資源","評估海外聯賽、國際品牌與跨國活動。"]
 ];
 modal(`<h2>📋 與 ${a.name} 的生涯會議</h2><p>選擇目前最希望經紀團隊處理的方向。</p><div class="choices">${opts.map((o,i)=>`<button data-agent-plan-v855="${i}">${o[0]}</button>`).join("")}</div>`);
 document.querySelectorAll("[data-agent-plan-v855]").forEach(b=>b.onclick=()=>{
   const o=opts[+b.dataset.agentPlanV855],score=a.skills[o[1]],success=Math.random()*100<Math.min(92,45+score*.45);
   p.trust=clamp((p.trust||60)+2,0,100);p.focus=o[0];
   addLog(`經紀人生涯會議：${o[0]}。${success?"經紀團隊取得正面進展。":"目前仍需等待更合適的時機。"}`,"event","經紀人");
   save();render();
   processResultDialogV854("📋 生涯會議結果",`${o[2]} ${a.name} 隨後聯絡相關球隊、品牌或合作夥伴。`,
    `${success?"本次溝通取得正面回應。":"暫時沒有立即成果，但經紀團隊會持續追蹤。"}｜經紀人信任度 ${p.trust}`,
    [{label:"返回經紀人中心",fn:()=>agentCenterV855()},{label:"查看經紀人機會",fn:()=>agentOpportunityV855()}]);
 });
}
function agentOpportunityV855(){
 const p=ensureAgentStateV855(),a=currentAgentV855(); if(!a)return;
 const pool=[
  {key:"談薪",title:"合約條款諮詢",text:"有球隊願意先和經紀團隊交換下一份合約的條件。"},
  {key:"商業",title:"品牌合作接觸",text:"一個品牌透過經紀人詢問你的合作意願。"},
  {key:"球隊人脈",title:"球隊角色會談",text:"管理層願意討論你的輪替角色與未來定位。"},
  {key:"國際資源",title:"國際市場邀請",text:"海外活動與國際品牌希望了解你的檔期。"}
 ];
 const best=pool.slice().sort((x,y)=>a.skills[y.key]-a.skills[x.key])[0];
 const chance=Math.min(90,30+a.skills[best.key]*.55+(p.trust||60)*.1);
 const hit=Math.random()*100<chance;
 modal(`<h2>📨 經紀人帶來的機會</h2><div class="resume-section"><h3>${hit?best.title:"目前沒有新的正式邀約"}</h3><p>${hit?best.text:`${a.name} 正在持續接觸市場，目前尚未出現值得你立即決定的新案子。`}</p></div>
 <div class="choices">${hit?`<button id="agentOppDiscussV855">與經紀人討論</button>`:""}<button id="agentOppBackV855">返回經紀人中心</button></div>`);
 if(hit)document.getElementById("agentOppDiscussV855").onclick=()=>{
   p.trust=clamp((p.trust||60)+1,0,100);save();
   processResultDialogV854("📨 機會評估",`${a.name} 向你說明風險、收益與對生涯的影響。`,`你決定先讓經紀團隊繼續接洽「${best.title}」。這不消耗年度動作次數。`,[{label:"返回經紀人中心",fn:()=>agentCenterV855()}]);
 };
 document.getElementById("agentOppBackV855").onclick=()=>agentCenterV855();
}

function chooseAgentV7(){
 const cur=ensureAgentStateV855();
 modal(`<h2>經紀人</h2>
   ${cur?`<div class="resume-section"><b>目前經紀人：${cur.name}</b><p>專長：${cur.specialty}｜${cur.tier}｜抽成 ${cur.commission}%｜信任度 ${cur.trust??60}</p><button type="button" id="agentCenterOpenV855">進入經紀人中心</button></div>`:`<p>選擇經紀人。每位經紀人都有姓名、專長、能力、抽成與客戶門檻。</p>`}
   <div class="agent-grid-v855">
   ${AGENTS_V855.map(a=>{const av=agentAvailabilityV855(a);return `<button type="button" class="agent-card-v855" data-agent-detail-v855="${a.id}">
      <b>${a.name}</b><span>${a.specialty}</span><small>${a.tier}｜抽成 ${a.commission}%</small><em>${av.text}</em>
   </button>`}).join("")}
   </div>`);
 document.querySelectorAll("[data-agent-detail-v855]").forEach(b=>b.onclick=()=>agentDetailV855(b.dataset.agentDetailV855));
 const c=document.getElementById("agentCenterOpenV855");if(c)c.onclick=()=>agentCenterV855();
}

function socialEventV7(){
 const opts=[["公開道歉",{球迷支持:4,教練:3}],["堅持立場",{球迷支持:2,管理層:-5}],["不回應",{球迷支持:-1}],["私下溝通",{教練:6,隊友:3}]];
 modal(`<h2>社群輿論</h2><p>賽後你的發言引起討論，你要怎麼處理？</p><div class="choices">${opts.map((x,i)=>`<button data-social-v7="${i}">${x[0]}</button>`).join("")}</div>`);
 document.querySelectorAll("[data-social-v7]").forEach(b=>b.onclick=()=>{
   const o=opts[+b.dataset.socialV7];
   const before={...G.modern.relations};
   Object.entries(o[1]).forEach(([k,v])=>G.modern.relations[k]=clamp((G.modern.relations[k]||50)+v,0,100));
   addLog(`社群事件：你選擇「${o[0]}」，關係網因此改變。`,"event","輿論");
   save();render();
   const changes=Object.keys(o[1]).map(k=>`${k} ${before[k]??50} → ${G.modern.relations[k]}`).join("｜");
   processResultDialogV854("📱 社群／輿論處理",
     `賽後言論持續發酵，你和團隊討論後選擇「${o[0]}」。媒體與球迷開始重新解讀你的態度。`,
     `${changes||"輿論暫時沒有明顯變化"}。`,
     [{label:"查看媒體輿論",fn:()=>mediaCenterV82("頭條")},{label:"再處理一個社群事件",fn:()=>socialEventV7()},{label:"返回現代籃球",fn:()=>modernDashboardV7()}]
   );
 });
}
function injuryCenterV7(){
 if(!G.modern.injury){modal(`<h2>傷病中心</h2><p>目前沒有傷病。</p>`);return}
 const inj=G.modern.injury;
 modal(`<h2>傷病中心</h2><p>${inj.name}｜嚴重度 ${inj.level}</p><div class="choices"><button data-inj-v7="play">輕傷上陣</button><button data-inj-v7="rest">休養</button><button data-inj-v7="rehab">復健</button><button data-inj-v7="surgery">手術</button></div>`);
 document.querySelectorAll("[data-inj-v7]").forEach(b=>b.onclick=()=>{
   const x=b.dataset.injV7;
   const label=x==="play"?"輕傷上陣":x==="rest"?"休養":x==="rehab"?"復健":"手術";
   const oldInjury=G.modern.injury?G.modern.injury.name:"無";
   if(x==="rest"||x==="rehab")G.modern.form="疲勞";
   if(x==="surgery"||x==="play")G.modern.form="帶傷";
   if((x==="rest"||x==="rehab")&&Math.random()<.7)G.modern.injury=null;
   addLog(`傷病處理：${label}。`,"event","傷病");save();render();
   processResultDialogV854("🩹 傷病處理",
     `醫療團隊評估「${oldInjury}」後，你選擇「${label}」。球隊依你的決定調整訓練與出賽計畫。`,
     `${G.modern.injury?`目前傷勢仍為「${G.modern.injury.name}」，狀態：${G.modern.form}。`:`恢復狀況良好，目前已沒有登記中的傷病。`}`,
     [{label:"返回傷病中心",fn:()=>injuryCenterV7()},{label:"返回現代籃球",fn:()=>modernDashboardV7()}]
   );
 });
}
function annualModernV7(){
 ensureModernV7();
 G.modern.form=pick(FORM_STATES);
 if(G.phase==="球員"){
   const age=ageNow(),ov=(avg()+advancedOverallV7())/2;
   if(age<=23)G.modern.contractType="新秀合約";
   else if(ov>=88)G.modern.contractType=pick(["頂薪","頂薪＋球員選項","提前續約"]);
   else if(ov>=72)G.modern.contractType=pick(["一般合約","球隊選項","球員選項","提前續約"]);
   else G.modern.contractType=pick(["短約","底薪","自由球員","受限制自由球員"]);
 }

 if(Math.random()<.13 && !G.modern.injury){
   G.modern.injury={name:pick(["腳踝扭傷","腿後肌拉傷","膝部傷勢","手指傷勢","背部傷勢"]),level:pick(["輕微","中等","嚴重"])};
   G.modern.form="帶傷";
 }
 if(G.phase==="球員" && ageNow()<=25 && avg()<62 && Math.random()<.22)G.modern.devTeam.status="二隊";
 else if(G.modern.devTeam.status==="二隊" && avg()+advancedOverallV7()>125){G.modern.devTeam.status="一隊";addLog("你在發展隊表現出色，被召回一隊。","event","發展隊召回")}
 const natScore=(avg()+advancedOverallV7())/2+(G.stats["知名度"]||0)*.12+(G.modern.form==="火熱"?8:0)-(G.modern.injury?12:0);
 if(natScore>=82)G.modern.national.stage="12人正式名單";
 else if(natScore>=72)G.modern.national.stage="集訓";
 else if(natScore>=64)G.modern.national.stage="候選名單";
 else G.modern.national.stage="未進入候選";
 updateModernV7();
}
function draftProcessV7(){
 ensureModernV7();const score=(avg()+advancedOverallV7())/2+G.modern.potential*.25+(G.stats["知名度"]||0)*.12;
 const projection=score>=105?"首輪前段":score>=92?"首輪":score>=80?"次輪":score>=68?"邊緣選秀":"可能落選";
 modal(`<h2>選秀流程</h2><p>選秀預測：<b>${projection}</b></p><p>流程：選秀預測 → 球探報告 → 聯合測試 → 球隊試訓 → 選秀夜</p><p>即使落選，仍可從美國發展聯盟或海外職業聯賽繼續生涯。</p>`);
}


/* ================= V7.1 心境・休閒・感情系統 ================= */
const MOOD_LABELS=[
  [90,"非常幸福"],[75,"心情很好"],[60,"穩定"],[45,"普通"],[30,"低落"],[15,"很差"],[0,"崩潰"]
];
function ensureLifeV71(){
  G.life=G.life||{};
  const L=G.life;
  if(!Number.isFinite(L.mood))L.mood=65;
  if(!Number.isFinite(L.stress))L.stress=25;
  if(!Number.isFinite(L.energy))L.energy=75;
  if(!Number.isFinite(L.loneliness))L.loneliness=25;
  if(!Number.isFinite(L.leisureCount))L.leisureCount=0;
  if(!L.relationship)L.relationship={status:"單身",partner:null,intimacy:0,stability:50,years:0,marriedYears:0,scandals:0,infidelityHistory:0};
  if(!Number.isFinite(L.relationship.marriedYears))L.relationship.marriedYears=0;
  if(!Number.isFinite(L.relationship.scandals))L.relationship.scandals=0;
  if(!Number.isFinite(L.relationship.infidelityHistory))L.relationship.infidelityHistory=0;
  if(!Array.isArray(L.memories))L.memories=[];
}
function moodNameV71(){ensureLifeV71();return MOOD_LABELS.find(x=>G.life.mood>=x[0])[1]}
function moodPerformanceV71(){
  ensureLifeV71();
  const L=G.life;
  let bonus=(L.mood-50)*.10-(L.stress-40)*.07+(L.energy-60)*.05;
  if(L.relationship.status!=="單身")bonus+=(L.relationship.stability-50)*.025;
  return clamp(Math.round(bonus),-10,10);
}
function changeLifeV71(d,reason){
  ensureLifeV71();const L=G.life;
  for(const [k,v] of Object.entries(d)){
    if(k==="mood")L.mood=clamp(L.mood+v,0,100);
    if(k==="stress")L.stress=clamp(L.stress+v,0,100);
    if(k==="energy")L.energy=clamp(L.energy+v,0,100);
    if(k==="loneliness")L.loneliness=clamp(L.loneliness+v,0,100);
  }
  if(reason)L.memories.unshift({age:ageNow(),text:reason});
  L.memories=L.memories.slice(0,20);
}
function lifeThirtyTextV875(text){
  const s=String(text||"").replace(/\s+/g,"").trim();
  return s.length>34?s.slice(0,34)+"…":s;
}
const LEISURE_EVENTS_V875=[
 {title:"夜市臨時邀約",icon:"🍢",process:"朋友突然約你逛夜市，難得不用談比賽，你開始考慮今晚要多放鬆。",
  choices:[
   {label:"一起吃宵夜",effect:{mood:8,stress:-6,energy:-3,loneliness:-5},result:"你和朋友一路吃到深夜，笑聲讓壓力散去，但隔天稍微有些疲累。"},
   {label:"只逛一下就回家",effect:{mood:5,stress:-4,energy:1,loneliness:-3},result:"你短暫享受人群與美食後提早返家，心情變好也保留了充足體力。"},
   {label:"婉拒邀約在家休息",effect:{mood:2,stress:-5,energy:8,loneliness:2},result:"你選擇安靜待在家恢復體力，雖然有點孤單，但身體得到完整休息。"}
  ]},
 {title:"臨時小旅行",icon:"🚗",process:"兩天沒有球隊行程，朋友提議開車去近郊走走，你得決定是否暫時離開球場。",
  choices:[
   {label:"立刻出發",effect:{mood:11,stress:-9,energy:2,loneliness:-6},result:"你在陌生景色中暫時忘記比賽壓力，回程時心情明顯輕鬆許多。"},
   {label:"安排半日行程",effect:{mood:7,stress:-6,energy:3,loneliness:-4},result:"你只排半天散心，既享受到旅行氣氛，也沒有打亂原本的休息節奏。"},
   {label:"留在球隊附近",effect:{mood:3,stress:-3,energy:5},result:"你沒有遠行，只在附近散步吃飯，行程平淡卻讓身體得到穩定恢復。"}
  ]},
 {title:"夜店朋友聚會",icon:"🪩",process:"幾位朋友包廂慶生並邀你到夜店同樂，現場可能有球迷與媒體認出你。",
  choices:[
   {label:"低調參加一小時",effect:{mood:8,stress:-6,energy:-5,loneliness:-4},result:"你和朋友短暫同樂後提前離場，成功放鬆心情，也沒有引起太多注意。"},
   {label:"一路玩到深夜",effect:{mood:13,stress:-9,energy:-15,loneliness:-7},result:"你盡情狂歡到很晚，心情大幅提升，但隔天精神與體力明顯受到影響。",nightclub:true},
   {label:"改約安靜餐廳",effect:{mood:7,stress:-5,energy:-2,loneliness:-5},result:"你把聚會改到安靜餐廳，朋友雖然意外，但最後大家聊天聊得很開心。"}
  ]},
 {title:"熱門遊戲上市",icon:"🎮",process:"期待很久的新遊戲正式上市，隊友也在線上揪團，你開始猶豫要不要熬夜玩。",
  choices:[
   {label:"玩兩小時就睡",effect:{mood:7,stress:-5,energy:-2},result:"你和隊友玩了幾場就準時休息，既滿足娛樂需求，也沒有影響隔天狀態。"},
   {label:"直接玩到天亮",effect:{mood:10,stress:-7,energy:-16},result:"你沉迷遊戲不知不覺玩到天亮，雖然非常開心，但隔天訓練精神很差。"},
   {label:"先睡覺改天再玩",effect:{mood:2,stress:-2,energy:9},result:"你忍住想玩的衝動提早休息，隔天精神很好，但仍惦記著還沒玩的內容。"}
  ]},
 {title:"演唱會門票",icon:"🎤",process:"朋友臨時多出一張熱門演唱會門票，距離開場只剩幾小時，你必須馬上決定。",
  choices:[
   {label:"一起去現場",effect:{mood:12,stress:-8,energy:-6,loneliness:-5},result:"現場氣氛讓你完全投入音樂，回家後仍很興奮，壓力也明顯下降不少。"},
   {label:"只看前半場",effect:{mood:8,stress:-6,energy:-3},result:"你看完喜歡的曲目便提早離場，既享受到演出，也沒有過度消耗體力。"},
   {label:"把票讓給別人",effect:{mood:1,stress:-2,energy:7},result:"你把難得的門票讓給朋友，雖然有些可惜，但換來一個安靜完整的休息夜。"}
  ]},
 {title:"家人突然來訪",icon:"🏠",process:"家人臨時到你住處探望，希望一起吃飯聊天，也想知道你最近過得好不好。",
  choices:[
   {label:"陪家人吃飯",effect:{mood:10,stress:-6,loneliness:-8,energy:1},result:"一頓家常飯讓你重新感到安心，家人的支持也讓近期壓力逐漸被消化。"},
   {label:"帶家人逛附近",effect:{mood:9,stress:-5,energy:-3,loneliness:-7},result:"你陪家人四處走走拍照，行程雖然有些累，但彼此關係變得更加親近。"},
   {label:"說明太累改天再聚",effect:{mood:2,stress:-3,energy:7,loneliness:1},result:"家人理解你需要休息並提早離開，你得到充足睡眠，但心裡仍有些歉意。"}
  ]}
];

function leisureV71(){
  ensureLifeV71();
  const ev=pick(LEISURE_EVENTS_V875);
  modal(`<h2>${ev.icon} 休閒事件｜${ev.title}</h2>
    <div class="resume-section"><h3>事情經過</h3><p>${lifeThirtyTextV875(ev.process)}</p></div>
    <h3>你要怎麼做？</h3>
    <div class="choices">${ev.choices.map((c,i)=>`<button type="button" data-leisure-story-v875="${i}">${c.label}</button>`).join("")}</div>`);
  document.querySelectorAll("[data-leisure-story-v875]").forEach(b=>b.onclick=()=>{
    const c=ev.choices[+b.dataset.leisureStoryV875];
    changeLifeV71(c.effect,c.result);
    G.life.leisureCount=(G.life.leisureCount||0)+1;

    let extra="";
    if(c.nightclub){
      const fame=G.stats["知名度"]||30;
      const chance=clamp(8+Math.round(fame*.28)+(G.phase==="職業"?10:0),8,55);
      if(Math.random()*100<chance){
        G.stats["知名度"]=clamp(fame+rnd(1,4),0,G.max["知名度"]||100);
        extra=" 有球迷拍到你的夜生活，社群上開始出現討論。";
      }
    }

    addLog(`${ev.title}：${c.label}。${c.result}${extra}`,"event","生活｜休閒");
    save();render();

    processResultDialogV854(`${ev.icon} ${ev.title}`,
      lifeThirtyTextV875(ev.process),
      `${lifeThirtyTextV875(c.result)}${extra}<br><span class="delta">心情 ${G.life.mood}｜壓力 ${G.life.stress}｜體力 ${G.life.energy}｜孤獨 ${G.life.loneliness}</span>`,
      [{label:"再看看新的休閒事件",fn:()=>leisureV71()},{label:"返回心境與生活",fn:()=>lifeDashboardV71()}]
    );
  });
}

function relationshipNewsChanceV72(severity=1){
  ensureLifeV71();
  const fame=G.stats["知名度"]||30;
  const leagueBoost=G.phase==="職業"?12:(G.phase==="大學"?5:0);
  return clamp(Math.round(8+fame*.42+leagueBoost+severity*10),5,92);
}

function publishRelationshipNewsV72(title,body,severity=1){
  ensureLifeV71();
  const chance=relationshipNewsChanceV72(severity);
  const published=Math.random()*100<chance;
  if(!published){
    addLog(`${body}<br><span class="muted">這件事目前沒有被媒體大幅報導。</span>`,"event",title);
    return false;
  }

  G.life.relationship.scandals=(G.life.relationship.scandals||0)+1;
  const fameDelta=severity>=3?rnd(5,10):rnd(2,6);
  G.stats["知名度"]=clamp((G.stats["知名度"]||30)+fameDelta,0,G.max["知名度"]||100);

  if(severity>=3){
    G.life.mood=clamp(G.life.mood-rnd(8,15),0,100);
    G.life.stress=clamp(G.life.stress+rnd(10,18),0,100);
    G.modern.relations.球迷支持=clamp((G.modern.relations.球迷支持||50)-rnd(5,14),0,100);
    G.modern.relations.管理層=clamp((G.modern.relations.管理層||50)-rnd(3,10),0,100);
  }

  addLog(
    `<b>媒體新聞：</b>${body}<br><span class="delta">新聞曝光率判定 ${chance}%｜知名度 +${fameDelta}</span>`,
    severity>=3?"injury":"event",
    `📰 ${title}`
  );
  return true;
}

function marriageV72(){
  ensureLifeV71();
  const R=G.life.relationship;
  if(R.status!=="交往中")return;

  const chance=clamp(Math.round(20+R.intimacy*.35+R.stability*.35+R.years*4),10,92);
  modal(`<h2>💍 結婚</h2>
    <p>你和 ${R.partner} 已交往 ${R.years} 年。是否考慮進入婚姻？</p>
    <p>目前關係：親密 ${R.intimacy}｜穩定 ${R.stability}｜婚姻成功評估 ${chance}%</p>
    <div class="choices"><button id="marryYesV72">求婚／結婚</button><button id="marryNoV72">暫時維持交往</button></div>`);

  document.getElementById("marryNoV72").onclick=()=>{closeModal();};
  document.getElementById("marryYesV72").onclick=()=>{
    closeModal();
    if(Math.random()*100<chance){
      R.status="已婚";R.marriedYears=0;R.stability=clamp(R.stability+12,0,100);R.intimacy=clamp(R.intimacy+8,0,100);
      changeLifeV71({mood:16,stress:-6,loneliness:-15},`你和 ${R.partner} 正式結婚。`);
      publishRelationshipNewsV72("球星婚訊",`${G.name} 宣布與 ${R.partner} 結婚，消息受到球迷與媒體關注。`,1);
    }else{
      R.stability=clamp(R.stability-7,0,100);
      changeLifeV71({mood:-5,stress:5},"你提出結婚想法，但雙方認為目前時機還不成熟。");
      addLog("你提出結婚的想法，但雙方討論後決定暫緩。","event","感情｜婚姻討論");
    }
    actionDone();save();render();
  };
}

function divorceV72(){
  ensureLifeV71();
  const R=G.life.relationship;
  if(R.status!=="已婚")return;
  modal(`<h2>💔 婚姻危機</h2>
    <p>你與 ${R.partner} 的婚姻目前穩定度為 ${R.stability}。是否要做出離婚決定？</p>
    <div class="choices"><button id="divorceYesV72">決定離婚</button><button id="divorceTalkV72">嘗試挽救婚姻</button><button id="divorceNoV72">維持現狀</button></div>`);
  document.getElementById("divorceNoV72").onclick=closeModal;
  document.getElementById("divorceTalkV72").onclick=()=>{
    closeModal();
    const ok=Math.random()*100<clamp(35+(G.stats["情商"]||30)*.4+R.intimacy*.25,20,90);
    if(ok){R.stability=clamp(R.stability+rnd(8,16),0,100);changeLifeV71({mood:6,stress:-8},"你們成功進行一次坦白溝通，婚姻關係得到改善。");}
    else{R.stability=clamp(R.stability-rnd(4,9),0,100);changeLifeV71({mood:-6,stress:7},"婚姻溝通沒有順利解決問題。");}
    addLog(`婚姻溝通${ok?"取得進展":"沒有明顯改善"}。`,"event","感情｜婚姻溝通");actionDone();save();render();
  };
  document.getElementById("divorceYesV72").onclick=()=>{
    const old=R.partner;closeModal();
    publishRelationshipNewsV72("球星離婚",`${G.name} 與 ${old} 宣布離婚，外界開始討論這段關係對球員狀態的影響。`,2);
    G.life.relationship={status:"單身",partner:null,intimacy:0,stability:50,years:0,marriedYears:0,scandals:R.scandals||0,infidelityHistory:R.infidelityHistory||0};
    changeLifeV71({mood:-18,stress:14,loneliness:18},"婚姻正式結束。");
    actionDone();save();render();
  };
}

function infidelityEventV72(){
  ensureLifeV71();
  const R=G.life.relationship;
  if(!["交往中","已婚"].includes(R.status))return false;

  // 外遇是低機率突發事件，關係越差、壓力越高，機率越高。
  const base=clamp(1.5+(100-R.stability)*.055+G.life.stress*.025,1,9);
  if(Math.random()*100>=base)return false;

  const actor=Math.random()<.5?"player":"partner";
  R.infidelityHistory=(R.infidelityHistory||0)+1;

  if(actor==="player"){
    modal(`<h2>⚠️ 突發感情事件</h2>
      <p>你在一段脆弱的關係期間，與其他人產生了超出界線的互動。這件事尚未完全公開，但存在被發現與登上新聞的風險。</p>
      <div class="choices">
        <button data-affair-v72="confess">主動坦白</button>
        <button data-affair-v72="end">立刻結束並保持沉默</button>
        <button data-affair-v72="continue">繼續隱瞞</button>
      </div>`);
    document.querySelectorAll("[data-affair-v72]").forEach(b=>b.onclick=()=>{
      const x=b.dataset.affairV72;closeModal();
      if(x==="confess"){
        R.stability=clamp(R.stability-rnd(18,30),0,100);R.intimacy=clamp(R.intimacy-rnd(10,22),0,100);
        changeLifeV71({mood:-10,stress:12},"你主動向伴侶坦白越界行為。");
        publishRelationshipNewsV72("感情風波",`${G.name} 的感情爭議被媒體得知，球迷與球隊開始關注事件發展。`,3);
      }else if(x==="end"){
        R.stability=clamp(R.stability-rnd(7,15),0,100);changeLifeV71({mood:-5,stress:8},"你停止了越界關係，但心理壓力仍然存在。");
        if(Math.random()<.35)publishRelationshipNewsV72("感情傳聞",`${G.name} 被傳出曾有感情界線爭議，當事人沒有進一步回應。`,2);
      }else{
        R.stability=clamp(R.stability-rnd(10,20),0,100);changeLifeV71({mood:-6,stress:16},"你選擇繼續隱瞞，壓力明顯上升。");
        if(Math.random()<.65)publishRelationshipNewsV72("外遇風波",`${G.name} 被媒體揭露感情不忠傳聞，引起大量討論。`,4);
      }
      save();render();
    });
  }else{
    R.stability=clamp(R.stability-rnd(22,38),0,100);R.intimacy=clamp(R.intimacy-rnd(18,32),0,100);
    changeLifeV71({mood:-18,stress:16,loneliness:12},"你意外得知伴侶可能有不忠行為。");
    publishRelationshipNewsV72("感情危機",`${G.name} 的伴侶被傳出感情不忠，媒體開始追蹤兩人的關係狀況。`,3);
    modal(`<h2>💔 感情危機</h2><p>你得知伴侶可能有不忠行為。你打算怎麼處理？</p>
      <div class="choices"><button data-betray-v72="talk">先溝通</button><button data-betray-v72="break">結束關係</button><button data-betray-v72="space">暫時分開</button></div>`);
    document.querySelectorAll("[data-betray-v72]").forEach(b=>b.onclick=()=>{
      const x=b.dataset.betrayV72;closeModal();
      if(x==="talk"){R.stability=clamp(R.stability+rnd(0,10),0,100);changeLifeV71({stress:-4},"你決定先釐清事情經過。");}
      if(x==="space"){R.stability=clamp(R.stability-5,0,100);changeLifeV71({mood:-5,stress:-2},"你們決定暫時分開冷靜。");}
      if(x==="break"){
        const old=R.partner;
        G.life.relationship={status:"單身",partner:null,intimacy:0,stability:50,years:0,marriedYears:0,scandals:R.scandals||0,infidelityHistory:R.infidelityHistory||0};
        changeLifeV71({mood:-12,stress:8,loneliness:16},`你和 ${old} 結束關係。`);
      }
      save();render();
    });
  }
  return true;
}

const LOVE_SINGLE_EVENTS_V875=[
 {title:"朋友介紹新朋友",icon:"💬",process:"朋友聚餐時特別安排你和一位新朋友坐在一起，兩人聊天意外地很有話題。",
  choices:[
   {label:"主動交換聯絡方式",kind:"meet",result:"你們交換聯絡方式後持續聊天，彼此都願意再約時間單獨見面認識對方。"},
   {label:"先當普通朋友",kind:"friend",result:"你沒有急著推進關係，只保持自然聯絡，氣氛舒服也沒有造成任何壓力。"},
   {label:"婉拒進一步認識",kind:"focus",result:"你禮貌結束這次認識，把心力留給自己與籃球，情緒反而更加穩定。"}
  ]},
 {title:"咖啡店偶遇",icon:"☕",process:"休息日下午你獨自到咖啡店，鄰桌的人認出你卻沒有打擾，離開前主動打招呼。",
  choices:[
   {label:"留下來多聊一下",kind:"meet",result:"你們從籃球聊到生活興趣，談話自然流暢，最後互相留下聯絡方式繼續認識。"},
   {label:"保持禮貌距離",kind:"friend",result:"你簡單聊了幾句便離開，雙方留下不錯印象，但目前沒有進一步發展關係。"},
   {label:"直接離開",kind:"focus",result:"你選擇維持私人空間，雖然錯過可能的緣分，但也避免被外界過度關注。"}
  ]},
 {title:"社群私訊",icon:"📱",process:"一位長期關注你的網友傳來私訊，內容不像一般球迷，更像真心想認識生活中的你。",
  choices:[
   {label:"回覆並慢慢聊天",kind:"meet",result:"你們從簡單回覆開始聊起，互動越來越自然，彼此都對下一次對話有所期待。"},
   {label:"只禮貌回覆一次",kind:"friend",result:"你保持友善但不主動拉近距離，對方也尊重你的界線，關係停留在普通交流。"},
   {label:"完全不回應",kind:"focus",result:"你沒有回覆陌生私訊，把私人生活與球員身分分開，心裡也感到比較踏實。"}
  ]}
];

const LOVE_REL_EVENTS_V875=[
 {title:"重要約會撞上行程",icon:"🕒",process:"伴侶期待已久的約會日期突然撞上球隊活動，你們必須在有限時間內重新安排。",
  choices:[
   {label:"先陪伴侶再去球隊",mood:6,intimacy:8,stability:5,result:"你努力兼顧兩邊行程，雖然整天很趕，但伴侶感受到你有把關係放在心上。"},
   {label:"向伴侶說明改期",mood:2,intimacy:2,stability:3,result:"你耐心說明球隊安排並重新約時間，伴侶雖失望，最後仍願意理解你的職業需求。"},
   {label:"直接取消約會",mood:-5,intimacy:-8,stability:-7,result:"你只用訊息取消原本約會，伴侶覺得自己不被重視，兩人的氣氛明顯變得僵硬。"}
  ]},
 {title:"緋聞照片出現",icon:"📸",process:"媒體刊出你與異性朋友吃飯的照片，伴侶看到新聞後沉默許久，等你主動解釋。",
  choices:[
   {label:"立刻坦白說明",mood:1,intimacy:6,stability:8,result:"你完整說明前因後果並願意給對方看訊息，伴侶逐漸放下疑慮並恢復信任。"},
   {label:"認為沒必要解釋",mood:-4,intimacy:-7,stability:-9,result:"你認為只是普通聚餐不必解釋，伴侶卻覺得你態度冷淡，爭執因此持續擴大。"},
   {label:"請經紀人澄清",mood:0,intimacy:2,stability:3,result:"經紀團隊發布簡短澄清降低輿論熱度，但伴侶仍希望你能私下給出更多說明。"}
  ]},
 {title:"伴侶情緒低落",icon:"🌧️",process:"伴侶最近工作與生活都不順，今天突然打電話給你，希望你能抽時間陪他聊聊。",
  choices:[
   {label:"放下事情陪伴",mood:5,intimacy:10,stability:6,result:"你花了一晚耐心傾聽並陪伴對方，雖然自己有些疲累，兩人的關係卻更加靠近。"},
   {label:"先通話再安排見面",mood:3,intimacy:6,stability:5,result:"你先用電話安撫對方並約好見面時間，伴侶感受到你願意努力兼顧彼此生活。"},
   {label:"請對方自己冷靜",mood:-3,intimacy:-6,stability:-6,result:"你因為疲累沒有多談，伴侶只能自己消化情緒，兩人之間因此多出一些距離。"}
  ]}
];

const LOVE_MARRIED_EVENTS_V875=[
 {title:"家庭行程衝突",icon:"🏠",process:"家人早已安排週末聚餐，但球隊臨時增加活動，伴侶希望你至少出席一部分時間。",
  choices:[
   {label:"兩邊都出席",mood:4,intimacy:7,stability:6,result:"你在兩個行程之間趕場，雖然很累，家人與伴侶都感受到你願意為家庭付出。"},
   {label:"以家庭為優先",mood:7,intimacy:9,stability:7,result:"你向球隊說明並完整陪伴家人，伴侶非常感動，家庭氣氛也比最近更加溫暖。"},
   {label:"以球隊為優先",mood:-3,intimacy:-6,stability:-5,result:"你選擇留在球隊處理工作，伴侶表面接受，心裡卻開始擔心家庭總是排在後面。"}
  ]},
 {title:"婚姻需要溝通",icon:"💍",process:"伴侶坦白最近覺得你把太多注意力放在籃球，兩人的生活逐漸只剩下行程安排。",
  choices:[
   {label:"認真談一整晚",mood:4,intimacy:8,stability:9,result:"你們把累積的不滿一次說開，雖然談話不輕鬆，最後卻重新理解彼此真正需求。"},
   {label:"安排固定約會日",mood:6,intimacy:9,stability:7,result:"你們決定每週保留專屬時間，不談工作與籃球，婚姻重新找回穩定的生活節奏。"},
   {label:"先拖到賽季後",mood:-4,intimacy:-7,stability:-8,result:"你希望等賽季結束再處理感情問題，伴侶感到失望，關係中的壓力繼續累積。"}
  ]}
];

function relationshipV71(){
  ensureLifeV71();
  const R=G.life.relationship;
  const pool=R.status==="單身"?LOVE_SINGLE_EVENTS_V875:(R.status==="已婚"?LOVE_MARRIED_EVENTS_V875:LOVE_REL_EVENTS_V875);
  const ev=pick(pool);

  modal(`<h2>${ev.icon} 感情事件｜${ev.title}</h2>
    <div class="resume-section"><h3>事情經過</h3><p>${lifeThirtyTextV875(ev.process)}</p></div>
    <p class="muted">目前：${R.status}${R.partner?`｜${R.partner}｜親密 ${R.intimacy}｜穩定 ${R.stability}`:""}</p>
    <h3>你要怎麼做？</h3>
    <div class="choices">${ev.choices.map((c,i)=>`<button type="button" data-love-story-v875="${i}">${c.label}</button>`).join("")}</div>
    ${R.status==="交往中"&&R.years>=1?'<button type="button" id="marriageBtnV875">💍 討論結婚</button>':""}
    ${R.status==="已婚"?'<button type="button" id="divorceBtnV875">💔 婚姻／離婚</button>':""}`);

  const mb=document.getElementById("marriageBtnV875");
  if(mb)mb.onclick=marriageV72;
  const db=document.getElementById("divorceBtnV875");
  if(db)db.onclick=divorceV72;

  document.querySelectorAll("[data-love-story-v875]").forEach(b=>b.onclick=()=>{
    const c=ev.choices[+b.dataset.loveStoryV875];

    if(R.status==="單身"){
      if(c.kind==="meet"){
        const chance=clamp(45+(G.stats["人際關係"]||50)*.3+(G.stats["知名度"]||0)*.08,35,85);
        if(Math.random()*100<chance){
          R.status="交往中";
          R.partner=pick(["小晴","雨欣","子涵","庭安","品妍","若彤","語晨","以安"]);
          R.intimacy=55;R.stability=55;
          changeLifeV71({mood:11,loneliness:-13},c.result);
        }else{
          changeLifeV71({mood:1,loneliness:-2},"互動愉快，但目前仍只是朋友，彼此決定先慢慢認識。");
        }
      }else if(c.kind==="friend"){
        changeLifeV71({mood:4,stress:-2,loneliness:-3},c.result);
      }else{
        changeLifeV71({mood:3,stress:-4},c.result);
      }
    }else{
      R.intimacy=clamp(R.intimacy+(c.intimacy||0),0,100);
      R.stability=clamp(R.stability+(c.stability||0),0,100);
      changeLifeV71({mood:c.mood||0,stress:(c.mood||0)<0?3:-2},c.result);
    }

    addLog(`${ev.title}：${c.label}。${c.result}`,"event","感情");
    save();render();

    const R2=G.life.relationship;
    processResultDialogV854(`${ev.icon} ${ev.title}`,
      lifeThirtyTextV875(ev.process),
      `${lifeThirtyTextV875(c.result)}<br><span class="delta">目前：${R2.status}${R2.partner?`｜${R2.partner}`:""}｜親密 ${R2.intimacy||0}｜穩定 ${R2.stability||0}｜心情 ${G.life.mood}</span>`,
      [{label:"再看看新的感情事件",fn:()=>relationshipV71()},{label:"返回心境與生活",fn:()=>lifeDashboardV71()}]
    );
  });
}

function lifeDashboardV71(){
 ensureLifeV71();const L=G.life,R=L.relationship,b=moodPerformanceV71();
 modal(`<h2>🌿 心境與生活</h2>
 <div class="resume-section"><h3>目前心境</h3><div class="modern-grid"><span>心情<b>${L.mood}</b></span><span>壓力<b>${L.stress}</b></span><span>體力<b>${L.energy}</b></span><span>孤獨感<b>${L.loneliness}</b></span></div>
 <p><b>${moodNameV71()}</b>｜目前球場表現修正：<b>${b>=0?"+":""}${b}%</b></p></div>
 <div class="resume-section"><h3>感情</h3><p>${R.status}${R.partner?`｜${R.partner}｜親密 ${R.intimacy}｜穩定 ${R.stability}`:""}${R.status==="已婚"?`｜結婚 ${R.marriedYears||0} 年`:""}</p><p class="muted">感情新聞事件 ${R.scandals||0} 次｜重大感情風波 ${R.infidelityHistory||0} 次</p></div>
 <div class="choices"><button type="button" id="lifeLeisureBtnV847">☕ 休閒活動</button><button type="button" id="lifeRelationshipBtnV847">❤️ 感情生活</button></div>`);

 // V8.4.7：不要使用 HTML inline onclick，避免 modal 重繪或瀏覽器環境造成按鈕無反應。
 const leisureBtn=document.getElementById("lifeLeisureBtnV847");
 const relationshipBtn=document.getElementById("lifeRelationshipBtnV847");
 if(leisureBtn)leisureBtn.onclick=()=>{
   leisureV71();
 };
 if(relationshipBtn)relationshipBtn.onclick=()=>{
   relationshipV71();
 };
}
function annualLifeV71(){
 ensureLifeV71();const L=G.life,R=L.relationship;
 changeLifeV71({stress:rnd(3,8),energy:-rnd(2,7),mood:rnd(-4,2),loneliness:R.status==="單身"?rnd(0,4):-rnd(1,4)});
 if(L.leisureCount===0)changeLifeV71({mood:-7,stress:8,energy:-5},"這一年幾乎只有籃球，長期沒有安排休閒，心理疲勞開始累積。");
 if(R.status!=="單身"){
   R.years++;
   if(R.status==="已婚")R.marriedYears=(R.marriedYears||0)+1;
   R.stability=clamp(R.stability+rnd(-5,4),0,100);

   // 突如其來的外遇／不忠事件屬低機率突發事件。
   infidelityEventV72();

   if(R.stability<20&&Math.random()<.35){
     const old=R.partner;
     if(R.status==="已婚"){
       publishRelationshipNewsV72("婚姻破裂",`${G.name} 與 ${old} 的婚姻因長期不穩定而走向結束。`,2);
     }else{
       publishRelationshipNewsV72("分手消息",`${G.name} 與 ${old} 結束交往。`,1);
     }
     G.life.relationship={status:"單身",partner:null,intimacy:0,stability:50,years:0,marriedYears:0,scandals:R.scandals||0,infidelityHistory:R.infidelityHistory||0};
     changeLifeV71({mood:-15,stress:12,loneliness:16},`你和 ${old} 因長期關係不穩定而分開。`);
   }
 }
 L.leisureCount=0;
}


/* ================= V7.3 代言・財富系統 ================= */
const ENDORSEMENT_BRANDS_V73=[
 ["運動鞋品牌","球鞋／運動服飾",1.35],["機能飲料品牌","飲料",0.72],["運動器材品牌","運動用品",0.82],
 ["手機科技品牌","科技",1.08],["汽車品牌","汽車",1.18],["休閒服飾品牌","時尚",0.92],
 ["連鎖餐飲品牌","餐飲",0.62],["遊戲娛樂品牌","娛樂",0.78],["金融品牌","金融",1.02],["精品品牌","精品",1.28]
];
function ensureFinanceV73(){
 G.finance=G.finance||{};
 const F=G.finance;
 if(!Number.isFinite(F.wealth))F.wealth=Number(G.money||0);
 if(!Number.isFinite(F.endorsementIncome))F.endorsementIncome=0;
 if(!Number.isFinite(F.careerEndorsementIncome))F.careerEndorsementIncome=0;
 if(!Array.isArray(F.endorsements))F.endorsements=[];
 if(!Array.isArray(F.offers))F.offers=[];
 if(!Number.isFinite(F.spending))F.spending=0;
 if(!Number.isFinite(F.investmentReturn))F.investmentReturn=0;
}
function moneyFmtV73(v){v=Math.round(Number(v)||0);return v>=100000000?`${(v/100000000).toFixed(2)}億`:v>=10000?`${(v/10000).toFixed(1)}萬`:v.toLocaleString()}
function endorsementScoreV73(){
 ensureModernV7();ensureLifeV71();ensureFinanceV73();
 const fame=G.stats["知名度"]||0, social=G.modern.relations?.球迷支持||50, mood=G.life.mood||50;
 const performance=(avg()+advancedOverallV7())/2;
 return clamp(Math.round(fame*.42+performance*.27+social*.20+mood*.06+(G.stats["人際關係"]||50)*.05),0,100);
}
function generateEndorsementOffersV73(){
 ensureFinanceV73();
 const score=endorsementScoreV73();
 if(score<38){G.finance.offers=[];return}
 const count=score>=85?rnd(2,4):score>=65?rnd(1,3):rnd(0,2);
 G.finance.offers=[];
 const used=new Set();
 for(let i=0;i<count;i++){
   let brand=pick(ENDORSEMENT_BRANDS_V73);
   let guard=0;while(used.has(brand[0])&&guard++<20)brand=pick(ENDORSEMENT_BRANDS_V73);
   used.add(brand[0]);
   const years=rnd(1,3);
   const leagueMult=G.phase==="職業"?1:G.phase==="大學"?.28:.12;
   const annual=Math.max(30000,Math.round((score*score*1500)*brand[2]*leagueMult/10000)*10000);
   G.finance.offers.push({brand:brand[0],type:brand[1],annual,years,bonus:rnd(0,1)?Math.round(annual*.12):0});
 }
}

function signEndorsementOfferV850(index,fromPrompt=false){
  ensureFinanceV73();
  const F=G.finance;
  const x=F.offers[index];
  if(!x)return;

  // 品牌已經正式提出邀約，玩家選擇接受後直接簽約，不再做第二次隨機錄取。
  F.endorsements.push({...x,remaining:x.years});
  F.offers.splice(index,1);
  F.pendingOfferPrompt=false;
  F.lastOfferPromptYear=calendarYearV44(G.year);

  closeModal();
  addLog(`你接受了 ${x.brand} 的代言邀約，簽下 ${x.years} 年合約，每年可獲得 ${moneyFmtV73(x.annual)}${x.bonus?`，另有最高 ${moneyFmtV73(x.bonus)} 的表現獎金`:""}。`,"event","💼 新代言");
  if(typeof publishMediaV82==="function"){
    publishMediaV82(`${G.name} 宣布與 ${x.brand} 簽下 ${x.years} 年代言合約，商業價值受到關注。`,"球員代言");
  }
  save();render();
  processResultDialogV854("📣 代言簽約完成",
    `${x.brand} 的團隊與你的經紀人完成最後條件確認，你正式接受這份 ${x.years} 年合作案。`,
    `每年收入 ${moneyFmtV73(x.annual)}${x.bonus?`｜表現獎金最高 ${moneyFmtV73(x.bonus)}`:""}。品牌將從本年度開始出現在你的商業合作紀錄中。`,
    [{label:"查看代言與財富",fn:()=>endorsementCenterV73()},{label:"查看媒體反應",fn:()=>mediaCenterV82("頭條")}]
  );
}

function endorsementOfferPromptV850(){
  ensureFinanceV73();
  const F=G.finance;
  if(!F.pendingOfferPrompt || !F.offers.length)return;
  if(!$("modal").classList.contains("hidden"))return;

  modal(`<h2>📣 收到品牌代言邀約</h2>
    <p>有品牌主動向你提出合作。你可以選擇其中一項立即接受，也可以暫時不簽，之後再到「代言與財富」查看。</p>
    <div class="choices">
      ${F.offers.map((x,i)=>`<button type="button" data-offer-prompt-v850="${i}">
        <b>${x.brand}｜${x.type}</b>
        <small>每年 ${moneyFmtV73(x.annual)} × ${x.years} 年${x.bonus?`｜表現獎金最高 ${moneyFmtV73(x.bonus)}`:""}</small>
      </button>`).join("")}
    </div>
    <button type="button" id="endorsementLaterV850">暫時不接受</button>`);

  document.querySelectorAll("[data-offer-prompt-v850]").forEach(b=>b.onclick=()=>{
    signEndorsementOfferV850(+b.dataset.offerPromptV850,true);
  });
  const later=document.getElementById("endorsementLaterV850");
  if(later)later.onclick=()=>{
    F.pendingOfferPrompt=false;
    F.lastOfferPromptYear=calendarYearV44(G.year);
    save();closeModal();
  };
}

function financeActionConfirmV850(action){
  ensureFinanceV73();
  const F=G.finance;
  const cfg={
    save:["保守儲蓄","將目前資產採取保守配置，本次資產約增加 1%。"],
    invest:["投資理財","投入約目前財富的 8% 進行投資，結果可能獲利也可能虧損。"],
    luxury:["高額消費","進行高額消費以改善生活品質，會支出部分財富並提升心情。"],
    charity:["公益活動","投入部分財富參與公益，提升知名度、球迷支持與社會形象。"]
  }[action];
  if(!cfg)return;

  modal(`<h2>💰 ${cfg[0]}</h2><p>${cfg[1]}</p>
    <p>目前財富：<b>${moneyFmtV73(F.wealth)}</b></p>
    <div class="choices">
      <button type="button" id="financeConfirmV850">確定執行</button>
      <button type="button" id="financeCancelV850">取消</button>
    </div>`);

  document.getElementById("financeCancelV850").onclick=()=>{closeModal();endorsementCenterV73();};
  document.getElementById("financeConfirmV850").onclick=()=>{
    let text="";
    if(action==="save"){
      const gain=Math.max(0,Math.round(F.wealth*.01));
      F.wealth+=gain;
      text=`你採取保守財務策略，資產增加 ${moneyFmtV73(gain)}。`;
    }
    if(action==="invest"){
      const stake=Math.min(F.wealth,Math.max(50000,Math.round(F.wealth*.08)));
      if(F.wealth<=0){
        text="目前沒有可投入的資金，因此本次無法進行投資。";
      }else{
        const realStake=Math.min(F.wealth,stake);
        const ret=Math.round(realStake*(Math.random()*.34-.10));
        F.wealth+=ret;F.investmentReturn+=ret;
        text=`你投入 ${moneyFmtV73(realStake)} 進行投資，本次結果 ${ret>=0?"+":""}${moneyFmtV73(ret)}。`;
      }
    }
    if(action==="luxury"){
      if(F.wealth<=0){
        text="目前財富不足，無法進行高額消費。";
      }else{
        const cost=Math.min(F.wealth,Math.max(30000,Math.round(F.wealth*.035)));
        F.wealth-=cost;
        changeLifeV71({mood:5,stress:-2},`你花費 ${moneyFmtV73(cost)} 改善生活品質。`);
        text=`你進行高額消費，支出 ${moneyFmtV73(cost)}，心情小幅提升。`;
      }
    }
    if(action==="charity"){
      if(F.wealth<=0){
        text="目前財富不足，暫時無法進行捐款型公益活動。";
      }else{
        const cost=Math.min(F.wealth,Math.max(20000,Math.round(F.wealth*.015)));
        F.wealth-=cost;
        G.stats["知名度"]=clamp((G.stats["知名度"]||0)+2,0,G.max["知名度"]||100);
        G.modern.relations.球迷支持=clamp((G.modern.relations.球迷支持||50)+4,0,100);
        text=`你投入 ${moneyFmtV73(cost)} 參與公益活動，球迷支持與社會形象提升。`;
      }
    }

    addLog(text,"event","💰 財富管理");
    actionDone();save();render();
    processResultDialogV854(`💰 ${cfg[0]}`,
      `你確認執行「${cfg[0]}」，財務團隊依照目前資產狀況完成本次安排。`,
      `${text}<br>目前財富：<b>${moneyFmtV73(F.wealth)}</b>`,
      [{label:"繼續財富管理",fn:()=>endorsementCenterV73()},{label:"查看心境生活",fn:()=>lifeDashboardV71()}]
    );
  };
}

function endorsementCenterV73(){
 ensureFinanceV73();
 const F=G.finance,score=endorsementScoreV73();
 const active=F.endorsements.length?F.endorsements.map((x,i)=>`<div class="endorsement-card-v73"><b>${x.brand}</b>｜${x.type}<br>年收入 ${moneyFmtV73(x.annual)}｜剩餘 ${x.remaining} 年${x.bonus?`｜獎金 ${moneyFmtV73(x.bonus)}`:""}</div>`).join(""):"<p>目前沒有代言合約。</p>";
 const offers=F.offers.length?F.offers.map((x,i)=>`<button type="button" class="choice" data-endorse-v850="${i}"><b>${x.brand}｜${x.type}</b><small>每年 ${moneyFmtV73(x.annual)} × ${x.years} 年${x.bonus?`｜獎金 ${moneyFmtV73(x.bonus)}`:""}</small></button>`).join(""):"<p>目前沒有新的品牌邀約。提高知名度、球場表現與球迷支持可增加機會。</p>";
 modal(`<h2>💼 代言與財富</h2><div class="resume-section"><h3>財務狀況</h3><div class="modern-grid"><span>目前財富<b>${moneyFmtV73(F.wealth)}</b></span><span>本年代言收入<b>${moneyFmtV73(F.endorsementIncome)}</b></span><span>生涯代言收入<b>${moneyFmtV73(F.careerEndorsementIncome)}</b></span><span>商業吸引力<b>${score}</b></span></div></div>
 <div class="resume-section"><h3>現有代言</h3>${active}</div>
 <div class="resume-section"><h3>品牌邀約</h3><div class="choices">${offers}</div><button type="button" id="refreshOffersV850">查看本年品牌邀約</button></div>
 <div class="resume-section"><h3>財富管理</h3><div class="choices">
   <button type="button" id="financeSaveV850">保守儲蓄</button>
   <button type="button" id="financeInvestV850">投資理財</button>
   <button type="button" id="financeLuxuryV850">高額消費</button>
   <button type="button" id="financeCharityV850">公益活動</button>
 </div></div>`);

 const refresh=document.getElementById("refreshOffersV850");
 if(refresh)refresh.onclick=()=>randomStoryThenV876("finance",()=>{generateEndorsementOffersV73();endorsementCenterV73();},"查看品牌邀約");

 document.querySelectorAll("[data-endorse-v850]").forEach(b=>b.onclick=()=>{const idx=+b.dataset.endorseV850;randomStoryThenV876("finance",()=>signEndorsementOfferV850(idx,false),"處理這份代言");});

 const bind=(id,action)=>{
   const b=document.getElementById(id);
   if(b)b.onclick=()=>randomStoryThenV876("finance",()=>financeActionConfirmV850(action),"繼續財富操作");
 };
 bind("financeSaveV850","save");
 bind("financeInvestV850","invest");
 bind("financeLuxuryV850","luxury");
 bind("financeCharityV850","charity");
}

function annualFinanceV73(){
 ensureFinanceV73();const F=G.finance;
 F.endorsementIncome=0;
 F.endorsements.forEach(x=>{
   const income=x.annual+(x.bonus&&Math.random()<.35?x.bonus:0);
   F.wealth+=income;F.endorsementIncome+=income;F.careerEndorsementIncome+=income;x.remaining--;
 });
 const expired=F.endorsements.filter(x=>x.remaining<=0);
 expired.forEach(x=>addLog(`${x.brand} 的代言合約到期。`,"event","代言到期"));
 F.endorsements=F.endorsements.filter(x=>x.remaining>0);
 // 日常生活成本：財富越高，支出略高，但不會吞掉職業收入。
 const living=Math.min(F.wealth,Math.max(12000,Math.round(F.wealth*.012)));
 F.wealth-=living;F.spending+=living;
 const beforeOfferCountV850=F.offers.length;
 generateEndorsementOffersV73();
 if(F.offers.length>beforeOfferCountV850){
   F.pendingOfferPrompt=true;
 }
 if(F.endorsementIncome>0)addLog(`本年度代言共帶來 ${moneyFmtV73(F.endorsementIncome)} 收入。`,"event","💰 年度代言收入");
}


/* ================= V8.0 籃球世界・完整人生系統 ================= */
const PERSONALITIES_V8=["冷靜","好勝","領袖型","內向","情緒化","愛玩","工作狂","家庭型","野心家"];
const TEAM_DIRECTIONS_V8=["爭冠","季後賽競爭","培養新人","重建"];
function ensureWorldV8(){
 G.world=G.world||{};const W=G.world;
 if(!G.personality)G.personality=pick(PERSONALITIES_V8);
 if(!Number.isFinite(W.legacy))W.legacy=0;
 if(!Array.isArray(W.news))W.news=[];
 if(!Array.isArray(W.friends))W.friends=[];
 if(!Array.isArray(W.rivals))W.rivals=[];
 if(!Array.isArray(W.players))W.players=[];
 if(!Array.isArray(W.freeAgencyOffers))W.freeAgencyOffers=[];
 if(!W.teamDirection)W.teamDirection=pick(TEAM_DIRECTIONS_V8);
 if(!W.family)W.family={children:0,home:"租屋",car:"一般交通",familyTime:50};
 if(!Number.isFinite(W.haters))W.haters=10;
 if(!Number.isFinite(W.fanSupport))W.fanSupport=G.modern?.relations?.球迷支持||50;
 if(!Number.isFinite(W.careerSalary))W.careerSalary=0;
 if(!Number.isFinite(W.peakWealth))W.peakWealth=G.finance?.wealth||0;
 if(!Number.isFinite(W.totalPoints))W.totalPoints=0;
 if(!Number.isFinite(W.totalRebounds))W.totalRebounds=0;
 if(!Number.isFinite(W.totalAssists))W.totalAssists=0;
 if(W.players.length<24)for(let i=W.players.length;i<24;i++)W.players.push(makeWorldPlayerV8());
}
function makeWorldPlayerV8(){
 const first=["子豪","冠宇","柏翰","承恩","俊傑","浩宇","品睿","宇辰","家豪","哲維","昱翔","博文"];
 const last=["林","陳","張","王","李","黃","吳","劉","蔡","楊"];
 return {name:pick(last)+pick(first),age:rnd(18,34),ovr:rnd(58,94),potential:rnd(65,98),team:pick(["東岸獵鷹","西岸風暴","北城騎士","海港巨浪","首都星火","山城雷霆"]),status:"現役"};
}
function addNewsV8(title,text,heat=1){
 ensureWorldV8();G.world.news.unshift({year:G.year||"",age:ageNow(),title,text,heat});G.world.news=G.world.news.slice(0,60);
 addLog(text,"event",`📰 ${title}`);
}
function legacyNameV8(){
 const x=G.world.legacy;return x>=900?"歷史級傳奇":x>=600?"傳奇巨星":x>=350?"聯盟巨星":x>=180?"球隊名將":x>=70?"知名球員":"職業球員";
}
function personalityEffectV8(){
 ensureWorldV8();const p=G.personality,L=G.life;
 if(p==="好勝"&&G.modern.form==="低潮")L.stress=clamp(L.stress+3,0,100);
 if(p==="冷靜")L.stress=clamp(L.stress-2,0,100);
 if(p==="家庭型"&&G.life.relationship.status!=="單身")L.mood=clamp(L.mood+2,0,100);
 if(p==="工作狂"){L.energy=clamp(L.energy-2,0,100);G.modern.potential=clamp(G.modern.potential+1,0,99);}
 if(p==="愛玩"){L.mood=clamp(L.mood+2,0,100);L.energy=clamp(L.energy-2,0,100);}
}
function newsCenterV8(){
 ensureWorldV8();const n=G.world.news;
 modal(`<h2>📰 籃球新聞中心</h2><p>聯盟與你的場內外事件都會被記錄。</p><div class="news-list-v8">${n.length?n.map(x=>`<div class="news-v8"><b>${x.title}</b><small>${x.year||""}｜${x.age}歲</small><p>${x.text}</p></div>`).join(""):"目前沒有重大新聞。"}</div>`);
}
function relationshipsV8(){
 ensureWorldV8();const W=G.world;
 if(!W.friends.length)W.friends.push({name:makeWorldPlayerV8().name,value:rnd(55,85)});
 if(!W.rivals.length&&Math.random()<.7)W.rivals.push({name:makeWorldPlayerV8().name,value:rnd(55,90)});
 modal(`<h2>🤝 好友與宿敵</h2><div class="resume-section"><h3>好友</h3>${W.friends.map(x=>`<p>❤️ ${x.name}｜友情 ${x.value}</p>`).join("")}</div><div class="resume-section"><h3>宿敵</h3>${W.rivals.length?W.rivals.map(x=>`<p>🔥 ${x.name}｜競爭強度 ${x.value}</p>`).join(""):"<p>目前沒有明確宿敵。</p>"}</div>`);
}
function familyCenterV8(){
 ensureWorldV8();const F=G.world.family,R=G.life.relationship;
 let choices=`<button data-family-v8="time">陪伴家人</button><button data-family-v8="home">改善住宅</button><button data-family-v8="car">購買／升級汽車</button>`;
 if(R.status==="已婚")choices+=`<button data-family-v8="child">討論生小孩</button>`;
 modal(`<h2>🏠 家庭與生活品質</h2><p>住宅：${F.home}｜交通：${F.car}｜孩子：${F.children}｜家庭時間 ${F.familyTime}</p><div class="choices">${choices}</div>`);
 document.querySelectorAll("[data-family-v8]").forEach(b=>b.onclick=()=>{
   const x=b.dataset.familyV8,fin=G.finance;
   if(x==="time"){F.familyTime=clamp(F.familyTime+12,0,100);changeLifeV71({mood:7,stress:-5,energy:-2},"你安排時間陪伴家人。");}
   if(x==="home"){let cost=F.home==="租屋"?800000:F.home==="自有住宅"?3500000:9000000;if(fin.wealth>=cost){fin.wealth-=cost;F.home=F.home==="租屋"?"自有住宅":F.home==="自有住宅"?"高級住宅":"豪宅";changeLifeV71({mood:6,stress:-2},"你改善了居住環境。");}else addLog("目前財富不足以升級住宅。","event","財務");}
   if(x==="car"){let cost=F.car==="一般交通"?500000:F.car==="一般汽車"?1800000:5000000;if(fin.wealth>=cost){fin.wealth-=cost;F.car=F.car==="一般交通"?"一般汽車":F.car==="一般汽車"?"豪華汽車":"收藏級汽車";changeLifeV71({mood:4},"你升級了交通工具。");}else addLog("目前財富不足。","event","財務");}
   if(x==="child"&&R.status==="已婚"){if(Math.random()<.55){F.children++;changeLifeV71({mood:14,stress:4},"家庭迎來新成員。");addNewsV8("家庭喜訊",`${G.name} 的家庭迎來新成員。`,1)}else changeLifeV71({mood:1,stress:1},"你們討論家庭計畫，目前沒有新的變化。");}
   actionDone();save();render();
   const label=x==="time"?"陪伴家人":x==="home"?"改善住宅":x==="car"?"購買／升級汽車":"討論生小孩";
   processResultDialogV854("🏠 家庭生活",
     `你和家人討論後執行了「${label}」。這項決定會影響家庭時間、生活品質、財富或心境。`,
     `住宅：${F.home}｜交通：${F.car}｜孩子：${F.children}｜家庭時間 ${F.familyTime}｜目前財富 ${moneyFmtV73(G.finance.wealth)}。`,
     [{label:"繼續家庭生活",fn:()=>familyCenterV8()},{label:"返回籃球世界",fn:()=>worldCenterV8()}]
   );
 });
}
function freeAgencyV8(){
 ensureWorldV8();const W=G.world;
 if(!W.freeAgencyOffers.length){
   const roles=["球隊核心","先發","第六人","主要輪替"];const cities=["東岸獵鷹","西岸風暴","北城騎士","海港巨浪","首都星火"];
   for(let i=0;i<3;i++){const years=rnd(1,4),annual=Math.round((avg()+advancedOverallV7())*rnd(35000,90000)/10000)*10000;W.freeAgencyOffers.push({team:pick(cities),years,annual,role:pick(roles),direction:pick(TEAM_DIRECTIONS_V8)});}
 }
 modal(`<h2>📑 自由市場</h2><p>比較薪資、角色與球隊方向後選擇下一站。</p><div class="choices">${W.freeAgencyOffers.map((o,i)=>`<button data-fa-v8="${i}">${o.team}<br>${o.years}年／每年 ${moneyFmtV73(o.annual)}｜${o.role}｜${o.direction}</button>`).join("")}</div>`);
 document.querySelectorAll("[data-fa-v8]").forEach(b=>b.onclick=()=>{
   const o=W.freeAgencyOffers[+b.dataset.faV8];
   const oldTeam=G.team;
   G.team=o.team;W.teamDirection=o.direction;G.contract={league:"職業聯盟",years:o.years,annual:o.annual};W.freeAgencyOffers=[];
   addNewsV8("自由市場簽約",`${G.name} 選擇加盟 ${o.team}，角色為${o.role}。`,2);save();render();
   processResultDialogV854("📑 自由市場簽約",
     `你和 ${o.team} 進行會面，討論球隊方向、預期角色與合約年限，最後雙方完成簽約。`,
     `${oldTeam||"原球隊"} → ${o.team}｜${o.years} 年｜每年 ${moneyFmtV73(o.annual)}｜預期角色 ${o.role}｜球隊方向 ${o.direction}。`,
     [{label:"查看世界新聞",fn:()=>newsCenterV8()},{label:"返回籃球世界",fn:()=>worldCenterV8()}]
   );
 });
}
function tradeRequestV8(){
 const reasons=["想爭冠","上場時間不足","和教練不合","薪資問題","想換環境","想和球星合作"];
 modal(`<h2>🔄 提出交易要求</h2><p>公開要求交易可能影響管理層與媒體評價。</p><div class="choices">${reasons.map((x,i)=>`<button data-tr-v8="${i}">${x}</button>`).join("")}</div>`);
 document.querySelectorAll("[data-tr-v8]").forEach(b=>b.onclick=()=>{
   const reason=reasons[+b.dataset.trV8],oldTeam=G.team;
   const accept=Math.random()*100<(25+(G.modern.relations.管理層||50)*.35);
   G.modern.relations.管理層=clamp(G.modern.relations.管理層-6,0,100);
   addNewsV8("交易要求",`${G.name} 因「${reason}」向球隊提出交易要求。球隊${accept?"願意開始尋找交易方案":"暫時拒絕要求"}。`,3);
   let traded=false;
   if(accept&&Math.random()<.55){G.team=pick(["東岸獵鷹","西岸風暴","海港巨浪","首都星火"]);traded=G.team!==oldTeam;addNewsV8("交易完成",`${G.name} 被交易至 ${G.team}。`,3)}
   actionDone();save();render();
   processResultDialogV854("🔄 交易要求進展",
     `你以「${reason}」為理由正式向管理層提出交易要求。球隊召開內部會議評估市場報價與你的合約價值。`,
     `${!accept?"球隊暫時拒絕交易要求。":traded?`球隊找到方案，你從 ${oldTeam} 被交易到 ${G.team}。`:"球隊願意探索交易，但目前還沒有完成交換。"} 管理層關係：${G.modern.relations.管理層}。`,
     [{label:"查看世界新聞",fn:()=>newsCenterV8()},{label:"再次查看交易",fn:()=>tradeRequestV8()},{label:"返回籃球世界",fn:()=>worldCenterV8()}]
   );
 });
}
function worldCenterV8(){
 ensureWorldV8();const W=G.world;
 modal(`<h2>🌍 籃球世界</h2><div class="modern-grid"><span>人格<b>${G.personality}</b></span><span>歷史地位<b>${legacyNameV8()}</b></span><span>聲望<b>${W.legacy}</b></span><span>球隊方向<b>${W.teamDirection}</b></span><span>球迷支持<b>${W.fanSupport}</b></span><span>黑粉指數<b>${W.haters}</b></span></div>
 <div class="choices">
   <button type="button" id="worldNewsBtnV853">📰 新聞中心</button>
   <button type="button" id="worldRelationsBtnV853">🤝 好友／宿敵</button>
   <button type="button" id="worldFamilyBtnV853">🏠 家庭生活</button>
   <button type="button" id="worldFreeAgencyBtnV853">📑 自由市場</button>
   <button type="button" id="worldTradeBtnV853">🔄 要求交易</button>
   <button type="button" id="worldPlayersBtnV853">🌐 世界球員</button>
 </div>`);

 const bindWorldV853=(id,fn)=>{
   const b=document.getElementById(id);
   if(b)b.onclick=fn;
 };
 bindWorldV853("worldNewsBtnV853",()=>randomStoryThenV876("world",()=>newsCenterV8(),"進入新聞中心"));
 bindWorldV853("worldRelationsBtnV853",()=>randomStoryThenV876("world",()=>relationshipsV8(),"查看好友／宿敵"));
 bindWorldV853("worldFamilyBtnV853",()=>randomStoryThenV876("world",()=>familyCenterV8(),"進入家庭生活"));
 bindWorldV853("worldFreeAgencyBtnV853",()=>randomStoryThenV876("world",()=>freeAgencyV8(),"進入自由市場"));
 bindWorldV853("worldTradeBtnV853",()=>randomStoryThenV876("world",()=>tradeRequestV8(),"處理交易要求"));
 bindWorldV853("worldPlayersBtnV853",()=>randomStoryThenV876("world",()=>worldPlayersV8(),"查看世界球員"));
}
function worldPlayersV8(){
 ensureWorldV8();const rows=G.world.players.filter(x=>x.status==="現役").sort((a,b)=>b.ovr-a.ovr).slice(0,30);
 modal(`<h2>🌐 世界球員動態</h2><p>點選球員可查看詳細互動。</p><div class="news-list-v8">${rows.map((x,i)=>`<button type="button" class="news-v8 world-player-btn-v854" data-world-player-v854="${i}"><b>${x.name}</b><small>${x.age}歲｜${x.team}</small><p>能力 ${x.ovr}｜潛力 ${x.potential}</p></button>`).join("")}</div>`);
 document.querySelectorAll("[data-world-player-v854]").forEach(b=>b.onclick=()=>{
   const p=rows[+b.dataset.worldPlayerV854];
   processResultDialogV854("🌐 球員觀察",
     `你透過球探報告、比賽影片與媒體資料了解 ${p.name} 最近的狀況。`,
     `${p.name}｜${p.age} 歲｜${p.team}｜能力 ${p.ovr}｜潛力 ${p.potential}｜狀態 ${p.status}。`,
     [{label:"加入好友觀察名單",fn:()=>{if(!G.world.friends.some(x=>x.name===p.name))G.world.friends.push({name:p.name,value:rnd(40,65)});save();relationshipsV8();}},{label:"返回世界球員",fn:()=>worldPlayersV8()},{label:"返回籃球世界",fn:()=>worldCenterV8()}]
   );
 });
}
function annualWorldV8(){
 ensureWorldV8();const W=G.world;personalityEffectV8();
 const st=seasonStatsV7();W.totalPoints+=Math.round(parseFloat(st.PPG||0)*82);W.totalRebounds+=Math.round(parseFloat(st.RPG||0)*82);W.totalAssists+=Math.round(parseFloat(st.APG||0)*82);
 W.legacy+=Math.max(0,Math.round((parseFloat(st.PER||0)-10)*.7));
 W.fanSupport=clamp(G.modern.relations.球迷支持||W.fanSupport,0,100);W.haters=clamp(Math.round((G.stats["知名度"]||0)*.35+(100-W.fanSupport)*.25),0,100);
 W.peakWealth=Math.max(W.peakWealth,G.finance.wealth||0);
 W.family.familyTime=clamp(W.family.familyTime-rnd(2,7),0,100);
 if(W.family.familyTime<25&&G.life.relationship.status!=="單身"){G.life.relationship.stability=clamp(G.life.relationship.stability-rnd(3,8),0,100);changeLifeV71({stress:3,mood:-2},"忙碌賽季讓家庭相處時間減少。")}
 W.players.forEach(p=>{if(p.status!=="現役")return;p.age++;if(p.age<=25)p.ovr=clamp(p.ovr+rnd(0,3),40,p.potential);else if(p.age>=32)p.ovr=clamp(p.ovr-rnd(0,3),35,99);if(p.age>=36&&Math.random()<.3)p.status="退休";if(Math.random()<.12)p.team=pick(["東岸獵鷹","西岸風暴","北城騎士","海港巨浪","首都星火","山城雷霆"]);});
 const retired=W.players.filter(p=>p.status==="退休").length;
 while(W.players.filter(p=>p.status==="現役").length<24)W.players.push(makeWorldPlayerV8());
 if(parseFloat(st.PPG)>=25)addNewsV8("得分焦點",`${G.name} 本季平均 ${st.PPG} 分，成為聯盟焦點之一。`,2);
 if(Math.random()<.15){const rival=pick(W.players.filter(p=>p.status==="現役"));if(rival&&!W.rivals.some(x=>x.name===rival.name)){W.rivals.push({name:rival.name,value:rnd(55,88)});addNewsV8("新宿敵形成",`${G.name} 與 ${rival.name} 的多次對決逐漸成為媒體話題。`,2)}}
}
function retirementSummaryV8(){
 ensureWorldV8();const W=G.world;
 modal(`<h2>🏆 生涯總結</h2><p><b>${G.name}</b>｜${legacyNameV8()}</p><div class="modern-grid"><span>歷史聲望<b>${W.legacy}</b></span><span>生涯得分<b>${W.totalPoints}</b></span><span>生涯籃板<b>${W.totalRebounds}</b></span><span>生涯助攻<b>${W.totalAssists}</b></span><span>生涯代言<b>${moneyFmtV73(G.finance.careerEndorsementIncome)}</b></span><span>最高財富<b>${moneyFmtV73(W.peakWealth)}</b></span><span>孩子<b>${W.family.children}</b></span><span>人格<b>${G.personality}</b></span></div><p>${W.legacy>=600?"你獲得進入「籃球榮耀殿堂」的資格。":"你的籃球人生留下了屬於自己的紀錄。"}</p>`);
}

function render(){
  ensureModernV7();
  ensureLifeV71();
  ensureFinanceV73();
  ensureWorldV8();
  ensureMediaV82();
  ensureTeamDatabaseV83();
  syncMediaFromHistoryV82();
  if(G && G.phase==="教練")ensureCoachSimpleV81();
  let modernBtn=document.getElementById("modernBtnV7");
  if(modernBtn)modernBtn.remove();
  modernBtn=null;
  let lifeBtn=document.getElementById("lifeBtnV71");
  if(lifeBtn)lifeBtn.remove();
  lifeBtn=null;
  let financeBtn=document.getElementById("financeBtnV73");
  if(financeBtn)financeBtn.remove();
  financeBtn=null;
  let worldBtn=document.getElementById("worldBtnV8");
  if(worldBtn)worldBtn.remove();
  worldBtn=null;
  let legal=document.getElementById("legalNoticeV611");
  if(!legal){
    legal=document.createElement("div");
    legal.id="legalNoticeV611";
    legal.innerHTML=legalNoticeV611();
    const top=document.querySelector(".topbar");
    if(top&&top.parentNode)top.parentNode.insertBefore(legal,top.nextSibling);
    else document.body.insertBefore(legal,document.body.firstChild);
  }
 if(!G)return;
 if(!G.max)G.max={};
 ALL.forEach(k=>{if(!Number.isFinite(G.max[k]))G.max[k]=100;});normalize();
 document.body.className=`layout-v590 reference-canvas-v594 ${G.theme||"theme-sport"}`;
 // V8.8.5：render 主流程只做安全的 data-theme 同步，避免主題函式錯誤中斷整個遊戲資料渲染。
 const themeMapV862={"theme-sport":"court","theme-court":"wood","theme-neon":"neon","theme-paper":"paper"};
 const safeThemeV862=themeMapV862[G.theme||"theme-sport"]||"court";
 document.body.setAttribute("data-theme",safeThemeV862);
 document.documentElement.setAttribute("data-theme",safeThemeV862);
 $("seasonLabel").textContent=G.careerEnded?`籃球人生已結束｜${G.finalAge||ageNow()} 歲`:`${calendarYearV44(G.year)} 年｜${G.phase}｜第 ${G.year} 年｜${ageNow()} 歲｜${G.team||G.school||""}`;
 if($("phaseBadge"))$("phaseBadge").textContent=G.careerEnded?"生涯結束":G.phase;
 $("seasonInfo").innerHTML=G.careerEnded?`<span class="meta-year">最終履歷</span><span class="meta-age">${G.finalAge||ageNow()} 歲</span>`:`<span class="meta-year">第 ${G.year} 年</span><span class="meta-age">${ageNow()} 歲</span><span class="meta-league">${leagueName()}</span>`;
 $("profile").innerHTML=`<div class="left-collapse-v838">
  <button type="button" class="left-collapse-head-v838" aria-expanded="true"><span>個人資料</span><b>−</b></button>
  <div class="left-collapse-body-v838">姓名：${G.name}<br>國籍：${G.nationality||"台灣"}<br>職業：${careerLabelV57()}<br>身高：${G.height} cm<br>體重：${G.weight} kg<br>背號：#${G.number}<br>慣用手：${G.hand}<br>希望位置：${POSNAME[G.pos1]} / ${POSNAME[G.pos2]}<br>球隊：${G.team||"—"}${G.phase==="職業"&&G.squadLevel==="二隊"&&G.secondTeam?`<br><span class="second-team-active-v840">目前下放：${G.secondTeam}（${G.secondLeague}）</span>`:""}<br><span class="wealth-line">財富：${wealthTextV50()}</span><div class="player-tags-wrap">${renderPlayerTagsV52()}</div></div>
</div>`;
 const profileCollapse=$("profile").querySelector(".left-collapse-head-v838");
 if(profileCollapse){
   const savedCollapsed=localStorage.getItem("basketball_profile_collapsed_v838")==="1";
   const box=profileCollapse.closest(".left-collapse-v838");
   const applyCollapsed=(collapsed)=>{
     box.classList.toggle("is-collapsed",collapsed);
     profileCollapse.setAttribute("aria-expanded",collapsed?"false":"true");
     profileCollapse.querySelector("b").textContent=collapsed?"+":"−";
   };
   applyCollapsed(savedCollapsed);
   profileCollapse.onclick=()=>{
     const collapsed=!box.classList.contains("is-collapsed");
     applyCollapsed(collapsed);
     localStorage.setItem("basketball_profile_collapsed_v838",collapsed?"1":"0");
   };
 }
 $("stats").innerHTML=ALL.map(k=>{
  const cap=(G.max && Number.isFinite(G.max[k]))?G.max[k]:100;
  const val=G.stats[k]??0;
  return `<div class="stat"><span>${k}</span><b><span class="stat-now">${val}</span><span class="stat-cap"> / ${cap}</span></b><div class="bar"><i style="width:${Math.min(100,val/cap*100)}%"></i></div></div>`;
 }).join("");
 $("stats").insertAdjacentHTML("beforeend",`<div class="stat-rule-note">${G.phase==="教練"?"教練聯賽：球商＋隊友能力影響勝率；人際關係影響球員關係，情商提高挖角與招募成功率。":"球員聯賽：僅運球、彈跳、投籃、傳球、籃板影響球隊強度。"}</div>`);
 $("injury").textContent=G.injury+"%";$("actions").textContent=G.careerEnded?0:MAX_ACTIONS-G.actions;
 renderEventLogV44();$("history").innerHTML=G.history.slice(0,30).map(x=>`<div>• ${x}</div>`).join("");renderRosterPageV54();
 ["modernBtnV7","lifeBtnV71","financeBtnV73","worldBtnV8"].forEach(id=>{
   const b=document.getElementById(id);
   if(b)b.remove();
 });
 // V8.3.4：各隊球員、媒體輿論、教練中心已整合進右側面板，不再使用右下角浮動按鈕。
 ["mediaBtnV82","teamsBtnV83","coachBtnV81"].forEach(id=>{
   const oldBtn=document.getElementById(id);
   if(oldBtn)oldBtn.remove();
 });
 renderMenu();
 if(G.finance&&G.finance.pendingOfferPrompt&&G.finance.offers&&G.finance.offers.length){
   setTimeout(()=>{
     const m=document.getElementById("modal");
     if(m&&m.classList.contains("hidden"))endorsementOfferPromptV850();
   },80);
 }
}


/* ================= V8.1 專業・簡易教練模式 =================
   僅在球員退役並選擇「退役後執教」後啟用。
   原則：複雜計算留在後台，玩家只做重要決策。
*/
function ensureCoachSimpleV81(){
  if(!G || G.phase!=="教練")return;
  G.coachV81=G.coachV81||{};
  const C=G.coachV81;
  if(!C.offense)C.offense=clamp(Math.round((G.stats["球商"]||50)*.75+(G.stats["情商"]||50)*.25),30,99);
  if(!C.defense)C.defense=clamp(Math.round((G.stats["球商"]||50)*.8+(G.stats["人際關係"]||50)*.2),30,99);
  if(!C.clutch)C.clutch=clamp(Math.round((G.stats["球商"]||50)*.7+(G.stats["情商"]||50)*.3),30,99);
  if(!C.develop)C.develop=clamp(Math.round((G.stats["人際關係"]||50)*.55+(G.stats["球商"]||50)*.45),30,99);
  if(!C.manage)C.manage=clamp(Math.round((G.stats["人際關係"]||50)*.55+(G.stats["情商"]||50)*.45),30,99);
  if(!C.offenseStyle)C.offenseStyle="均衡進攻";
  if(!C.defenseStyle)C.defenseStyle="人盯人";
  if(!C.rotationMode)C.rotationMode="助教自動";
  if(!C.developmentMode)C.developmentMode="助教自動";
  if(!C.teamMood)C.teamMood=72;
  if(!C.boardTrust)C.boardTrust=70;
  if(!C.goal)C.goal=G.world?.teamDirection==="爭冠"?"挑戰冠軍":G.world?.teamDirection==="重建"?"培養年輕球員":"進入季後賽";
}
function coachGradeV81(){
  ensureCoachSimpleV81();const C=G.coachV81;
  const x=(C.offense+C.defense+C.clutch+C.develop+C.manage)/5;
  return x>=90?"S":x>=82?"A":x>=74?"B+":x>=66?"B":x>=58?"C+":"C";
}
function coachFitTextV81(){
  ensureCoachSimpleV81();const C=G.coachV81;
  const roster=ensureRosterV54?ensureRosterV54():[];
  const avgO=roster.length?roster.reduce((s,p)=>s+(rosterOverallV54(p)||60),0)/roster.length:60;
  let fit=Math.round((avgO*.55+C.offense*.18+C.defense*.17+C.manage*.10));
  return fit>=82?"非常適合":fit>=72?"適合":fit>=62?"普通":"需要調整";
}
function coachDashboardV81(){
  ensureCoachSimpleV81();const C=G.coachV81;
  modal(`<div class="coach-v81">
    <div class="coach-v81-head"><div><h2>🏀 教練中心</h2><p>${G.coachLeague||leagueName()}｜${G.team}</p></div><div class="coach-grade">教練評價<b>${coachGradeV81()}</b></div></div>
    <div class="coach-summary-v81">
      <span>🎯 管理層目標<b>${C.goal}</b></span>
      <span>😊 更衣室<b>${C.teamMood>=80?"非常好":C.teamMood>=65?"良好":C.teamMood>=50?"普通":"緊張"}</b></span>
      <span>🤝 管理層信任<b>${C.boardTrust}</b></span>
      <span>📋 戰術適性<b>${coachFitTextV81()}</b></span>
    </div>
    <h3>教練能力</h3>
    <div class="coach-skills-v81">
      <span>進攻<b>${C.offense}</b></span><span>防守<b>${C.defense}</b></span><span>臨場<b>${C.clutch}</b></span><span>培養<b>${C.develop}</b></span><span>管理<b>${C.manage}</b></span>
    </div>
    <p class="muted">新手不用調複雜數值。只要決定陣容、戰術與重要球員事件，其餘由助教自動處理。</p>
    <div class="coach-main-actions-v81">
      <button onclick="closeModal();coachSeasonStartV833()">▶ 賽季開始<small>模擬本季正式賽事</small></button>
      <button onclick="closeModal();coachSeasonStartV833()">🧑‍🏫 開始執教<small>進入本季執教與臨場安排</small></button>
      <button onclick="coachLineupV81()">🏀 陣容<small>角色與輪替</small></button>
      <button onclick="coachTacticsSimpleV81()">📋 戰術<small>進攻＋防守</small></button>
      <button onclick="coachPlayersSimpleV81()">🤝 球員<small>培養與更衣室</small></button>
      <button onclick="coachReinforceV81()">🔄 補強<small>交易與球隊需求</small></button>
    </div>
  </div>`);
}

function coachSeasonStartV833(){
  if(G.phase!=="教練")return;
  if(G.leagueUsed){
    modal(`<h2>本季賽事已完成</h2><p>本年度聯賽已經結束，請完成其他行動後進入下一年。</p>`);
    return;
  }
  ensureCoachSimpleV81();
  ensureRosterV54();

  const C=G.coachV81;
  const tactics=[
    ["均衡攻防","最穩定，適合大多數陣容。",1.0,1.0],
    ["快速轉換","提高節奏，適合速度與體力較好的球隊。",1.10,.90],
    ["外線空間","重視投射與空間，適合外線能力好的陣容。",1.15,.82],
    ["禁區優先","重視籃板、力量與禁區終結。",1.08,.94],
    ["臨場調度","更依賴教練球商與臨場能力。",.92,1.20]
  ].map(x=>{
    const rosterBonus=(teamRosterAverageV54()-60)*x[2]*.10;
    const iqBonus=((G.stats["球商"]||50)-50)*x[3]*.12;
    const coachBonus=((C.clutch||60)-60)*.06;
    return [...x,rosterBonus+iqBonus+coachBonus];
  });

  modal(`<h2>🏀 賽季開始</h2>
    <p>選擇本季主要戰術即可。其餘輪替、分鐘與細節由助教自動處理。</p>
    <div class="coach-summary-v81">
      <span>🎯 管理層目標<b>${C.goal}</b></span>
      <span>😊 更衣室<b>${C.teamMood>=80?"非常好":C.teamMood>=65?"良好":C.teamMood>=50?"普通":"緊張"}</b></span>
      <span>📋 目前進攻<b>${C.offenseStyle}</b></span>
      <span>🛡️ 目前防守<b>${C.defenseStyle}</b></span>
    </div>
    <div class="choices">
      ${tactics.map((t,i)=>`<button class="choice" data-coach-season-v833="${i}"><b>${t[0]}</b><small>${t[1]}</small></button>`).join("")}
    </div>`);

  document.querySelectorAll("[data-coach-season-v833]").forEach((b,i)=>b.onclick=()=>{
    try{
      const pre=tactics[i];
      closeModal();
      resolveRegularSeasonV461(false,null,pre,tactics);
      save();
      render();
    }catch(err){
      console.error("教練賽季開始錯誤",err);
      closeModal();
      modal(`<h2>賽季啟動失敗</h2><p>系統已攔截錯誤並保留存檔。請重新嘗試；若持續發生，請提供此畫面。</p>`);
    }
  });
}

function coachLineupV81(){
  ensureCoachSimpleV81();const C=G.coachV81, roster=ensureRosterV54?ensureRosterV54():[];
  const sorted=[...roster].sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a));
  const roles=["先發","先發","先發","先發","先發","第六人","主要替補","主要替補","輪替","輪替"];
  modal(`<h2>🏀 陣容與輪替</h2><p>目前：<b>${C.rotationMode}</b>。系統會依能力、狀態與戰術自動安排分鐘，新手不需要逐一設定。</p>
    <div class="coach-roster-v81">${sorted.slice(0,10).map((p,i)=>`<div><b>${p.name}</b><span>${p.pos||""}｜總評 ${rosterOverallV54(p)}</span><em>${roles[i]||"板凳"}</em></div>`).join("")}</div>
    <div class="choices"><button id="coachAutoLineupV81">✨ AI 自動最佳陣容</button><button id="coachManualLineupV81">🛠️ 切換為手動輪替</button></div>`);
  $("coachAutoLineupV81").onclick=()=>{C.rotationMode="助教自動";closeModal();addLog("助教已依球員能力、狀態與戰術適性重新整理輪替。","coach","自動最佳陣容");save();render()};
  $("coachManualLineupV81").onclick=()=>{C.rotationMode=C.rotationMode==="助教自動"?"簡易手動":"助教自動";closeModal();addLog(`輪替模式切換為「${C.rotationMode}」。簡易手動仍會由系統自動分配合理分鐘。`,"coach","輪替設定");save();render()};
}
function coachTacticsSimpleV81(){
  ensureCoachSimpleV81();const C=G.coachV81;
  const offense=[["均衡進攻","最穩定，適合新手"],["快速進攻","提高節奏，重視速度與體力"],["外線進攻","增加三分與空間"],["擋拆進攻","重視持球與傳球"],["禁區進攻","重視力量、籃板與終結"]];
  const defense=[["人盯人","穩定且容易執行"],["換防體系","適合機動型陣容"],["區域防守","保護禁區並節省體力"],["護框優先","壓縮禁區、可能放外線"]];
  modal(`<h2>📋 戰術設定</h2><p>不用調整複雜參數，每邊只選一種主要風格。</p>
    <h3>進攻｜目前：${C.offenseStyle}</h3><div class="choices">${offense.map((x,i)=>`<button data-coff="${i}"><b>${x[0]}</b><small>${x[1]}</small></button>`).join("")}</div>
    <h3>防守｜目前：${C.defenseStyle}</h3><div class="choices">${defense.map((x,i)=>`<button data-cdef="${i}"><b>${x[0]}</b><small>${x[1]}</small></button>`).join("")}</div>
    <p class="coach-tip-v81">助教評估：目前球隊與戰術的整體適性為 <b>${coachFitTextV81()}</b>。</p>`);
  document.querySelectorAll("[data-coff]").forEach((b,i)=>b.onclick=()=>{C.offenseStyle=offense[i][0];save();coachTacticsSimpleV81()});
  document.querySelectorAll("[data-cdef]").forEach((b,i)=>b.onclick=()=>{C.defenseStyle=defense[i][0];save();coachTacticsSimpleV81()});
}
function coachPlayersSimpleV81(){
  ensureCoachSimpleV81();const C=G.coachV81;
  modal(`<h2>🤝 球員管理</h2><div class="coach-summary-v81"><span>😊 更衣室<b>${C.teamMood}</b></span><span>🌱 培養能力<b>${C.develop}</b></span><span>🧠 管理能力<b>${C.manage}</b></span></div>
    <p>只處理重要事情；一般球員溝通、分鐘微調與日常培養由助教處理。</p>
    <div class="choices"><button id="coachTrainOneV81">🌱 重點培養球員</button><button id="coachSkillV81">🎓 提升教練能力</button><button id="coachRoomV81">💬 更衣室會談</button></div>`);
  $("coachTrainOneV81").onclick=()=>{closeModal();coachTrainPlayerV54()};
  $("coachSkillV81").onclick=()=>{closeModal();coachTrainingSimpleV81()};
  $("coachRoomV81").onclick=()=>{C.teamMood=clamp(C.teamMood+rnd(3,8),0,100);C.manage=clamp(C.manage+1,0,99);closeModal();addLog("你召開簡短的更衣室會談，聽取主力、替補與年輕球員的需求，團隊氣氛有所改善。","coach","更衣室管理");actionDone();save();render()};
}
function coachTrainingSimpleV81(){
  ensureCoachSimpleV81();const C=G.coachV81;
  const opts=[["進攻","offense"],["防守","defense"],["臨場","clutch"],["培養","develop"],["管理","manage"]];
  modal(`<h2>🎓 教練能力訓練</h2><p>選一項專長，本次使用 1 次行動。成功時提升 2～5 點。</p><div class="choices">${opts.map((x,i)=>`<button data-cskill="${i}">${x[0]}<small>目前 ${C[x[1]]}</small></button>`).join("")}</div>`);
  document.querySelectorAll("[data-cskill]").forEach((b,i)=>b.onclick=()=>{let k=opts[i][1],d=rnd(2,5);C[k]=clamp(C[k]+d,0,99);closeModal();addLog(`你完成${opts[i][0]}教練課程，${opts[i][0]}能力 +${d}。`,"coach","教練進修");actionDone();save();render()});
}
function coachReinforceV81(){
  const roster=ensureRosterV54?ensureRosterV54():[];
  const positions={PG:0,SG:0,SF:0,PF:0,C:0};
  roster.forEach(p=>{if(positions[p.pos]!=null)positions[p.pos]++});
  const need=Object.entries(positions).sort((a,b)=>a[1]-b[1])[0]?.[0]||"側翼";
  modal(`<h2>🔄 球隊補強</h2><p>助教分析目前最需要補強：<b>${need}</b>。你不需要自己研究整個聯盟。</p>
    <div class="choices"><button id="coachTradeV81">🔄 查看推薦交易</button><button id="coachJobsV81">💼 教練工作邀請</button></div>
    <p class="muted">交易仍會由對方球隊依球員價值與你的談判能力判斷，不保證成功。</p>`);
  $("coachTradeV81").onclick=()=>{closeModal();coachPlayerTradeMarketV587()};
  $("coachJobsV81").onclick=()=>{closeModal();coachJobMarketV587()};
}
function coachCareerOptionsV81(){
  modal(`<h2>🏆 教練生涯</h2><p>這裡放低頻率功能，避免主畫面太複雜。</p><div class="choices">
    <button id="coachComebackV81">↩️ 復出當球員</button>
    <button id="coachAwardsV81">🏆 生涯獎項</button>
    <button id="coachRetireV81">📋 完全退役</button>
  </div>`);
  $("coachComebackV81").onclick=()=>{closeModal();comeback()};
  $("coachAwardsV81").onclick=()=>{closeModal();showAwards()};
  $("coachRetireV81").onclick=()=>{closeModal();fullRetire()};
}


/* ================= V8.2 媒體輿論・八卦・球迷留言 ================= */
const MEDIA_V82=[
 {name:"籃壇快報",icon:"📰",tone:"專業",bias:0},
 {name:"球場內幕",icon:"🎙️",tone:"分析",bias:0},
 {name:"爆料籃球",icon:"🔥",tone:"八卦",bias:-1},
 {name:"今日體育",icon:"📺",tone:"主流",bias:0},
 {name:"籃球鄉民台",icon:"💬",tone:"網路",bias:1},
 {name:"國際籃壇",icon:"🌏",tone:"國際",bias:0}
];
function ensureMediaV82(){
 G.mediaV82=G.mediaV82||{};
 const M=G.mediaV82;
 if(!Array.isArray(M.stories))M.stories=[];
 if(!Array.isArray(M.comments))M.comments=[];
 if(!Number.isFinite(M.sentiment))M.sentiment=50;
 if(!Number.isFinite(M.heat))M.heat=0;
 if(!Number.isFinite(M.pressTrust))M.pressTrust=55;
 if(!M.lastHistoryKey)M.lastHistoryKey="";
}
function mediaClassV82(s){return s>=70?"正面":s>=45?"中立":"負面"}
function inferMediaMoodV82(text){
 text=String(text||"");
 let score=0, heat=1;
 const pos=["冠軍","MVP","獲獎","成功","續約","簽約","勝","爆發","入選","公益","結婚","喜訊","最佳","紀錄","晉級"];
 const neg=["外遇","離婚","爭執","衝突","批評","受傷","落敗","輸","低潮","交易要求","拒絕","危機","醜聞","踢出","釋出"];
 pos.forEach(x=>{if(text.includes(x))score+=12});
 neg.forEach(x=>{if(text.includes(x)){score-=13;heat++}});
 if(text.includes("外遇")||text.includes("醜聞"))heat+=3;
 if(text.includes("冠軍")||text.includes("MVP"))heat+=2;
 return {score:clamp(50+score,5,95),heat:clamp(heat,1,5)};
}
function mediaHeadlineV82(text,media,mood){
 const n=G.name||"球員", positive=mood>=60, negative=mood<42;
 if(media.tone==="八卦"){
   if(negative)return `🔥 ${n} 再掀話題！場外風波引爆討論`;
   if(positive)return `🔥 ${n} 人氣狂升，最新動向成為焦點`;
   return `🔥 ${n} 又有新動向，球迷吵翻了`;
 }
 if(media.tone==="分析")return positive?`${n} 近期表現獲肯定，影響力持續上升`:negative?`${n} 面臨壓力，下一步選擇成焦點`:`解析 ${n} 最新動向與後續影響`;
 if(media.tone==="網路")return positive?`鄉民熱議：${n} 這波真的可以！`:negative?`留言區炸鍋：${n} 的決定引發兩派論戰`:`球迷討論：你怎麼看 ${n} 這次的選擇？`;
 return positive?`${n} 傳出好消息，球迷給予高度肯定`:negative?`${n} 捲入爭議，球團與球迷持續關注`:`${n} 最新消息：生涯發展出現新變化`;
}
const FAN_FIRST_NAMES_V842=["Alex","Jordan","Chris","Taylor","Ryan","Kevin","Jason","Eric","Daniel","Michael","Ethan","Noah","Liam","Lucas","Dylan","Marcus","Brandon","Justin","Nathan","Aaron","Emily","Olivia","Emma","Sophia","Mia","Chloe","Grace","Hannah","Ashley","Rachel","Megan","Samantha","Nicole","Lauren","Kayla","Zoe","Avery","Cameron","Logan","Tyler"];
const FAN_LAST_NAMES_V842=["Smith","Johnson","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Lewis","Walker","Hall","Allen","Young","King","Wright","Scott","Green","Baker","Adams"];
function randomFanNameV842(){return `${pick(FAN_FIRST_NAMES_V842)} ${pick(FAN_LAST_NAMES_V842)}`;}
function fanCommentsForV82(text,mood){
 const n=G.name||"他";
 const good=[`這選擇我支持，${n} 繼續加油！`,`最近真的越打越好了。`,`有實力就會被看見。`,`希望他保持健康，期待下一場。`,`這才是職業球員該有的態度。`];
 const mid=[`先觀察吧，現在還不好說。`,`我比較想看接下來球場上的表現。`,`每個人都有自己的選擇。`,`球隊怎麼處理也很重要。`,`感覺事情沒有媒體寫得那麼簡單。`];
 const bad=[`這次真的不太能接受。`,`先把球打好比較重要吧。`,`最近場外新聞是不是有點多？`,`管理層應該要處理一下。`,`支持歸支持，但這件事做得不好。`];
 const troll=[`留言區準備開戰 😂`,`今天又有瓜可以吃了。`,`等等，這劇情比比賽還精彩。`,`我只想知道下一場會不會爆發。`];
 let pool=mood>=62?good:mood<42?bad:mid;
 let out=[]; for(let i=0;i<4;i++)out.push(pick(pool));
 if(Math.random()<.55)out.push(pick(troll));
 return [...new Set(out)].slice(0,5);
}
function publishMediaV82(text,title){
 ensureMediaV82();const M=G.mediaV82, inf=inferMediaMoodV82(text);
 const media=pick(MEDIA_V82), shift=(media.bias||0)*5, mood=clamp(inf.score+shift,5,95);
 const story={year:G.year||"",age:ageNow(),media:media.name,icon:media.icon,tone:media.tone,
   title:mediaHeadlineV82(text,media,mood),body:text,mood,heat:inf.heat,comments:fanCommentsForV82(text,mood)};
 M.stories.unshift(story);M.stories=M.stories.slice(0,80);
 M.comments.unshift(...story.comments.map(c=>({year:G.year||"",name:randomFanNameV842(),text:c,mood:mood>=60?"good":mood<42?"bad":"mid"})));
 M.comments=M.comments.slice(0,120);
 M.sentiment=clamp(Math.round(M.sentiment*.7+mood*.3),0,100);
 M.heat=clamp(M.heat+inf.heat,0,100);
 if(G.world){G.world.fanSupport=clamp((G.world.fanSupport||50)+Math.round((mood-50)/12),0,100);G.world.haters=clamp((G.world.haters||10)+Math.round((50-mood)/15),0,100);}
}
function syncMediaFromHistoryV82(){
 ensureMediaV82();const M=G.mediaV82;
 const h=(G.history||[])[0]; if(!h||h===M.lastHistoryKey)return;
 M.lastHistoryKey=h;

 // V8.4.4：純遊戲進度訊息不屬於真實媒體新聞，不再發布。
 const mechanical=/完成\s*5\s*次行動|完成\s*\d+\s*次行動|本年剩餘動作|第\s*\d+\s*年完成|年度行動/.test(h);
 if(mechanical)return;

 if(Math.random()<.62 || /冠軍|MVP|結婚|離婚|外遇|交易|簽約|續約|受傷|衝突|批評|代言|國家隊|入選|踢出|釋出|轉校|選秀|得分|紀錄|季後賽/.test(h))publishMediaV82(h);
}
function mediaCenterV82(tab="頭條"){
 ensureMediaV82();syncMediaFromHistoryV82();const M=G.mediaV82;
 const mediaMechanicalV844=/完成\s*5\s*次行動|完成\s*\d+\s*次行動|本年剩餘動作|年度行動/;
 const oldStoryLenV844=M.stories.length;
 M.stories=M.stories.filter(s=>!mediaMechanicalV844.test(String(s.body||"")));
 if(M.stories.length!==oldStoryLenV844)save();
 const stories=M.stories
   .filter(s=>!/完成\s*5\s*次行動|完成\s*\d+\s*次行動|本年剩餘動作|年度行動/.test(String(s.body||"")))
   .slice(0,18);
 const tabs=["頭條","八卦","球迷留言","輿論"];
 let body="";
 if(tab==="球迷留言"){
   body=`<div class="fan-comments-v82">${M.comments.length?M.comments.slice(0,30).map((x,i)=>`<div class="fan-comment-v82 ${x.mood}"><span class="fan-avatar-v82">👤</span><div><b>${x.name||(x.name=randomFanNameV842())}</b><p>${x.text}</p></div></div>`).join(""):"<p>目前還沒有球迷留言。</p>"}</div>`;
 }else if(tab==="輿論"){
   body=`<div class="sentiment-v82"><div><b>${M.sentiment}</b><span>整體輿論</span></div><div class="sent-bar-v82"><i style="width:${M.sentiment}%"></i></div><p>${M.sentiment>=70?"目前媒體與球迷普遍支持你。":M.sentiment>=45?"目前評價有好有壞，球場表現會很快改變風向。":"目前正處於輿論壓力期，後續選擇與表現非常重要。"}</p></div>
   <div class="media-metrics-v82"><span>🔥 話題熱度<b>${M.heat}</b></span><span>📰 媒體信任<b>${M.pressTrust}</b></span><span>❤️ 球迷支持<b>${G.world?.fanSupport||50}</b></span><span>😈 黑粉指數<b>${G.world?.haters||10}</b></span></div>`;
 }else{
   let list=tab==="八卦"?stories.filter(x=>x.tone==="八卦"||x.heat>=3):stories;
   body=`<div class="media-feed-v82">${list.length?list.map((s,i)=>`<article class="media-card-v82 mood-${mediaClassV82(s.mood)}"><header><span>${s.icon} ${s.media}</span><small>${s.year}｜${s.age}歲｜${mediaClassV82(s.mood)}</small></header><h3>${s.title}</h3><p>${s.body}</p><footer>🔥 熱度 ${s.heat}/5　💬 ${s.comments.length} 則留言</footer></article>`).join(""):"<p>目前沒有相關報導。</p>"}</div>`;
 }
 modal(`<div class="media-center-v82"><div class="media-title-v82"><div><h2>📡 媒體與球迷</h2><p>你的選擇、球場表現與場外事件會改變報導角度與留言風向。</p></div><b>${mediaClassV82(M.sentiment)}</b></div>
 <nav class="media-tabs-v82">${tabs.map(x=>`<button data-media-tab="${x}" class="${x===tab?"active":""}">${x}</button>`).join("")}</nav>${body}</div>`);
 document.querySelectorAll("[data-media-tab]").forEach(b=>b.onclick=()=>mediaCenterV82(b.dataset.mediaTab));
}


/* ================= V8.3 各隊球員資訊・球員地位 ================= */
const PLAYER_STATUS_V83=[
 "頭號球星","二當家","主力控球核心","主要得分手","外線核心","防守核心",
 "禁區核心","先發主力","第六人","主要替補","輪替球員","潛力新星","老將領袖","二隊培養"
];
function playerStatusV83(p,rank,total){
 const pos=p.pos||"";
 const o=Number(p.ovr||p.overall||rosterOverallV54?.(p)||60);
 if(rank===0)return "頭號球星";
 if(rank===1&&o>=78)return "二當家";
 if((pos==="PG"||pos==="SG")&&(p.pass||p["傳球"]||o)>=82)return "主力控球核心";
 if((p.shoot||p["投籃"]||o)>=86)return "主要得分手";
 if((p.three||p["三分"]||0)>=82)return "外線核心";
 if((p.defense||p["外線防守"]||p["內線防守"]||0)>=82)return "防守核心";
 if((pos==="C"||pos==="PF")&&(p.rebound||p["籃板"]||0)>=82)return "禁區核心";
 if(rank<5)return "先發主力";
 if(rank===5)return "第六人";
 if(rank<8)return "主要替補";
 if((p.age||25)<=22&&o>=68)return "潛力新星";
 if((p.age||25)>=32&&o>=70)return "老將領袖";
 if(rank>=Math.max(10,total-2))return "二隊培養";
 return "輪替球員";
}
function makeLeagueTeamV83(league,index){
 const names={
  "台灣高中甲級":["東海高中","中山高中","南湖高中","青雲高中","光華高中","新星高中"],
  "台灣高中乙級":["海線高中","海岳高中","龍騰高中","明德高中","北城高中","南港高中"],
  "美國職業聯盟":["東岸獵鷹","西岸風暴","北城騎士","海港巨浪","首都星火","山城雷霆","沙漠毒蛇","湖城巨人"],
  "美國發展聯盟":["奧斯汀火焰","海灣衝鋒","首都飛人","北岸藍鯨","中央鐵騎","南灣閃電"],
  "中國C聯盟":["北京雄獅","上海海潮","廣東飛虎","遼寧戰狼","浙江金鷹","新疆雪豹"],
  "日本B聯盟":["東京雷霆","大阪浪潮","名古屋飛龍","北海道雪熊","橫濱海神","琉球烈焰"],
  "韓國K聯盟":["首爾閃電","釜山海鷹","蔚山巨鯨","水原戰馬","原州黑熊","安養火鳥"],
  "台灣T聯盟":["台北戰神","新北國王","桃園雷霆","新竹獵鷹","台中太陽","台南海神","高雄鋼鐵"],
  "台灣P聯盟":["台北勇士","桃園領航","新竹攻城","台南夢想"],
  "台灣S聯盟":["台北白鯨","新北烈火","基隆海盜","桃園飛豹","彰化巨人"]
 };
 const arr=names[league]||["東岸獵鷹","西岸風暴","首都星火","海港巨浪"];
 return arr[index%arr.length];
}
function makeTeamRosterV83(team,league){
 const first=["子豪","冠宇","柏翰","承恩","俊傑","浩宇","品睿","宇辰","家豪","哲維","昱翔","博文","志強","冠廷","承翰"];
 const last=["林","陳","張","王","李","黃","吳","劉","蔡","楊","周","鄭"];
 const pos=["PG","SG","SF","PF","C"];
 const isHS=league==="台灣高中甲級"||league==="台灣高中乙級";
 const size=isHS?12:(league==="美國職業聯盟"?15:league==="美國發展聯盟"?12:14);
 let arr=[];
 for(let i=0;i<size;i++){
   const baseTop=league==="台灣高中甲級"?82:league==="台灣高中乙級"?72:88;
   const floor=league==="台灣高中乙級"?38:48;
   const ovr=Math.max(floor,Math.min(96,Math.round(baseTop-i*(isHS?2.1:2.2)+rnd(-5,5))));
   arr.push({
    name:pick(last)+pick(first),pos:pos[i%5],age:isHS?rnd(15,18):rnd(19,35),ovr,
    shoot:clamp(ovr+rnd(-8,8),35,99),pass:clamp(ovr+rnd(-10,10),35,99),
    rebound:clamp(ovr+rnd(-12,12),35,99),defense:clamp(ovr+rnd(-10,10),35,99),
    three:clamp(ovr+rnd(-12,10),30,99),team,league
   });
 }
 arr.sort((a,b)=>b.ovr-a.ovr);
 arr.forEach((p,i)=>p.status=playerStatusV83(p,i,arr.length));
 return arr;
}
function ensureTeamDatabaseV83(){
 G.teamDBV83=G.teamDBV83||{};
 const leagues=["台灣高中甲級","台灣高中乙級","美國職業聯盟","美國發展聯盟","中國C聯盟","日本B聯盟","韓國K聯盟","台灣T聯盟","台灣P聯盟","台灣S聯盟"];
 leagues.forEach(lg=>{
   if(!Array.isArray(G.teamDBV83[lg])||!G.teamDBV83[lg].length){
     const count=lg==="美國職業聯盟"?8:lg==="台灣T聯盟"?7:(lg==="台灣高中甲級"||lg==="台灣高中乙級"?6:6);
     G.teamDBV83[lg]=Array.from({length:count},(_,i)=>{
       const team=makeLeagueTeamV83(lg,i);
       return {team,league:lg,roster:makeTeamRosterV83(team,lg)};
     });
   }
 });
}
function teamBrowserV83(league=null,teamIndex=0){
 ensureTeamDatabaseV83();
 if(!league)league=G.phase==="高中"?(G.hblDivision||"台灣高中甲級"):"美國職業聯盟";
 const leagues=Object.keys(G.teamDBV83);
 const teams=G.teamDBV83[league]||[];
 const t=teams[teamIndex]||teams[0];
 if(!t)return;
 const roster=[...t.roster].sort((a,b)=>b.ovr-a.ovr);
 const avg=Math.round(roster.reduce((s,p)=>s+p.ovr,0)/roster.length);
 modal(`<div class="team-browser-v83">
 <div class="team-browser-head-v83"><div><h2>🏀 各隊球員資訊</h2><p>查看聯盟、球隊陣容與每位球員在隊內的地位。</p></div><div class="team-power-v83">球隊平均<b>${avg}</b></div></div>
 <div class="team-selectors-v83"><select id="leagueSelectV83">${leagues.map(x=>`<option ${x===league?"selected":""}>${x}</option>`).join("")}</select><select id="teamSelectV83">${teams.map((x,i)=>`<option value="${i}" ${i===teamIndex?"selected":""}>${x.team}</option>`).join("")}</select></div>
 <div class="team-meta-v83"><b>${t.team}</b><span>${league}</span><span>球員 ${roster.length} 人</span></div>
 <div class="team-roster-v83">
   <div class="team-roster-header-v83"><span>球員</span><span>位置</span><span>年齡</span><span>總評</span><span>球員地位</span><span>功能</span></div>
   ${roster.map((p,i)=>`<div class="team-player-v83 ${i<2?"star":""}">
     <span class="name"><b>${i===0?"⭐ ":""}${p.name}</b><small>${p.team}</small></span>
     <span>${p.pos}</span><span>${p.age}</span><span class="ovr">${p.ovr}</span>
     <span><em class="status-v83 status-${p.status.replace(/\s/g,"")}">${p.status}</em></span>
     <span><button data-player-v83="${i}">查看</button></span>
   </div>`).join("")}
 </div></div>`);
 $("leagueSelectV83").onchange=e=>teamBrowserV83(e.target.value,0);
 $("teamSelectV83").onchange=e=>teamBrowserV83(league,+e.target.value);
 document.querySelectorAll("[data-player-v83]").forEach(b=>b.onclick=()=>playerDetailV83(roster[+b.dataset.playerV83]));
}
function playerDetailV83(p){
 modal(`<h2>👤 ${p.name}</h2>
 <div class="player-detail-v83"><div class="player-status-big-v83">${p.status}</div>
 <div class="modern-grid"><span>球隊／學校<b>${p.team}</b></span><span>位置<b>${p.pos}</b></span><span>年齡<b>${p.age}</b></span><span>總評<b>${p.ovr}</b></span>
 <span>投射<b>${p.shoot}</b></span><span>傳球<b>${p.pass}</b></span><span>籃板<b>${p.rebound}</b></span><span>防守<b>${p.defense}</b></span><span>三分<b>${p.three}</b></span></div>
 <p class="muted">「球員地位」會依能力、位置、隊內排名與角色自動判定，不是固定標籤。</p></div>`);
}

function coachPlayerTradeMarketV587(){
  if(G.phase!=="教練")return;

  const renderTradeHub=()=>{
    modal(`<h2>球員交易</h2>
      <div class="trade-tabs">
        <button id="tradeTabMarket" class="active">可交易球員</button>
        <button id="tradeTabRelease">將球員踢出</button>
      </div>
      <div id="tradeHubContent"></div>`);

    $("tradeTabMarket").onclick=()=>{
      $("tradeTabMarket").classList.add("active");
      $("tradeTabRelease").classList.remove("active");
      renderAvailablePlayers();
    };
    $("tradeTabRelease").onclick=()=>{
      $("tradeTabRelease").classList.add("active");
      $("tradeTabMarket").classList.remove("active");
      renderReleasePlayers();
    };

    renderAvailablePlayers();
  };

  const renderAvailablePlayers=()=>{
    const eq=G.stats["情商"]||30;
    const rel=G.stats["人際關係"]||30;
    const iq=G.stats["球商"]||30;
    const candidates=[];

    const leagueCfg={
      US:{label:"美國職業聯盟",base:[72,99]},
      GL:{label:"美國發展聯盟",base:[62,90]},
      CN:{label:"中國C聯盟",base:[60,91]},
      JP:{label:"日本B聯盟",base:[62,92]},
      KR:{label:"韓國K聯盟",base:[60,89]},
      TP:{label:"台灣T聯盟",base:[52,85]},
      PL:{label:"台灣P聯盟",base:[50,83]},
      SBL:{label:"台灣S聯盟",base:[45,76]}
    };

    ["US","GL","CN","JP","KR","TP","PL","SBL"].forEach(key=>{
      const cfg=leagueCfg[key];
      const teams=makeProTeams(key).sort(()=>Math.random()-.5).slice(0,3);
      teams.forEach(team=>{
        const overall=rnd(cfg.base[0],cfg.base[1]);
        const pos=pick(POS);
        const stats={};
        BASE.forEach(k=>stats[k]=clamp(overall+rnd(-9,9),35,105));

        const isStar=overall>=86;
        const recruitChance=clamp(
          22 + eq*.48 + rel*.18 + iq*.08 - (isStar?24:0) + rnd(-8,8),
          8,95
        );

        candidates.push({
          key,
          league:cfg.label,
          team,
          name:`${pick(TEAMMATE_LAST)}${pick(TEAMMATE_FIRST)}`,
          age:rnd(20,34),
          pos,
          stats,
          overall:rosterOverallV54({stats}),
          isStar,
          recruitChance,
          salaryLevel:isStar?"明星合約":overall>=75?"主力合約":"輪替合約"
        });
      });
    });

    candidates.sort((a,b)=>b.overall-a.overall);

    $("tradeHubContent").innerHTML=`
      <p>從不同聯賽挖角球員。情商越高，明星球員加盟機率越高；人際關係會增加球員對你的信任。</p>
      <div class="market-player-list">
        ${candidates.map((p,i)=>`<div class="offer trade-player-card">
          <button data-playertrade="${i}">嘗試挖角</button>
          <b>${p.isStar?"⭐ ":""}${p.name}</b>｜${p.pos}｜總評 ${p.overall}<br>
          ${p.league}｜${p.team}｜${p.age}歲｜${p.salaryLevel}<br>
          招募成功率 ${Math.round(p.recruitChance)}%
          <div class="muted">運球 ${p.stats["運球"]}｜彈跳 ${p.stats["彈跳"]}｜投籃 ${p.stats["投籃"]}｜傳球 ${p.stats["傳球"]}｜籃板 ${p.stats["籃板"]}</div>
        </div>`).join("")}
      </div>`;

    [...document.querySelectorAll("[data-playertrade]")].forEach(b=>b.onclick=()=>{
      const p=candidates[+b.dataset.playertrade];if(!p)return;
      const ok=Math.random()*100<p.recruitChance;

      if(!ok){
        addLog(`你嘗試從 ${p.league} 的 ${p.team} 挖角 ${p.name}，但球員最終拒絕加盟。`,"event","球員挖角失敗");
        renderTradeHub();
        return;
      }

      const roster=ensureRosterV54();
      const newPlayer={
        id:`poach_${Date.now()}_${rnd(100,999)}`,
        name:p.name,pos:p.pos,age:p.age,
        stats:{...p.stats},
        relation:clamp(45+Math.round(rel*.25)+rnd(-5,8),35,90),
        star:p.isStar,
        rosterType:"正式名單",
        role:"替補",
        sourceLeague:p.league,
        sourceTeam:p.team
      };

      const isNBA=/美國職業聯盟/i.test(leagueName())||G.proKey==="US";
      const maxRoster=isNBA?18:15;
      if(roster.length>=maxRoster){
        closeModal();
        addLog(`你與 ${p.name} 已談妥加盟意願，但 ${G.team} 的名單已滿（${roster.length}/${maxRoster}）。請先進入「球員交易 → 將球員踢出」釋出名額，再重新進行招募。`,"event","名單已滿｜交易未完成");
        return;
      }

      roster.push(newPlayer);
      roster.sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a));
      let released=null;

      if(isNBA){
        roster.sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a));
        roster.forEach((x,i)=>x.rosterType=i>=Math.max(0,roster.length-3)?"雙向合約":"正式名單");
      }else{
        roster.forEach(x=>x.rosterType=x.rosterType||"正式名單");
      }

      const starters=new Set();
      ["PG","SG","SF","PF","C"].forEach(pos=>{
        const c=roster.filter(x=>x.pos===pos&&x.rosterType!=="雙向合約")
          .sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a))[0];
        if(c)starters.add(c.id);
      });
      roster.filter(x=>x.rosterType!=="雙向合約"&&!starters.has(x.id))
        .sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a))
        .forEach(x=>{if(starters.size<5)starters.add(x.id)});
      roster.forEach(x=>x.role=starters.has(x.id)?"先發":(x.rosterType==="雙向合約"?"雙向":"替補"));

      const key=`${G.phase}|${G.proKey||G.coachLeague||leagueName()}|${G.team||G.school||"team"}`;
      G.rosters[key]=roster;

      addLog(`你成功從 ${p.league} 的 ${p.team} 挖角 <span class="delta">${p.name}</span>（${p.pos}／總評 ${p.overall}）加盟 ${G.team}。`,"success","球員交易成功");
      renderTradeHub();
    });
  };

  const renderReleasePlayers=()=>{
    const roster=ensureRosterV54();
    const sorted=[...roster].sort((a,b)=>rosterOverallV54(b)-rosterOverallV54(a));

    $("tradeHubContent").innerHTML=`
      <p>選擇要從目前球隊名單中移除的球員。此操作不消耗年度行動次數。</p>
      <div class="market-player-list">
        ${sorted.map((p,i)=>`<div class="offer trade-player-card release-player-card">
          <button class="danger-btn" data-releaseplayer="${i}">踢出球隊</button>
          <b>${p.star?"⭐ ":""}${p.name}</b>｜${p.role||"替補"}｜${p.pos}｜總評 ${rosterOverallV54(p)}<br>
          ${p.rosterType||"正式名單"}｜${p.age}歲｜關係 ${p.relation}
          <div class="muted">運球 ${p.stats["運球"]}｜彈跳 ${p.stats["彈跳"]}｜投籃 ${p.stats["投籃"]}｜傳球 ${p.stats["傳球"]}｜籃板 ${p.stats["籃板"]}</div>
        </div>`).join("")}
      </div>`;

    [...document.querySelectorAll("[data-releaseplayer]")].forEach(b=>b.onclick=()=>{
      const p=sorted[+b.dataset.releaseplayer];if(!p)return;

      modal(`<h2>確認踢出球員</h2>
        <p>確定要將 <b>${p.name}</b>（${p.pos}／總評 ${rosterOverallV54(p)}）移出 ${G.team} 嗎？</p>
        <button id="confirmReleasePlayer" class="danger-btn">確認踢出</button>
        <button id="cancelReleasePlayer">取消</button>`);

      $("cancelReleasePlayer").onclick=renderTradeHub;
      $("confirmReleasePlayer").onclick=()=>{
        const current=ensureRosterV54();
        const idx=current.findIndex(x=>x.id===p.id);
        if(idx>=0)current.splice(idx,1);

        const key=`${G.phase}|${G.proKey||G.coachLeague||leagueName()}|${G.team||G.school||"team"}`;
        G.rosters[key]=current;

        addLog(`你決定將 ${p.name} 移出球隊名單。球隊目前剩餘 ${current.length} 名球員。`,"event","球員離隊");
        renderTradeHub();
        $("tradeTabRelease").click();
      };
    });
  };

  renderTradeHub();
}

function renderMenu(){
 const forceLeague=(G.actions===MAX_ACTIONS-1 && !G.leagueUsed);

 if(G.careerEnded){
   const endItems=[
     ["查看籃球人生履歷",showResume,false],
     ["各聯賽名人堂",showHallOfFame,false],
     ["生涯獎項",showAwards,false]
   ];
   $("menu").innerHTML=`<div class="menu-grid">${endItems.map((x,i)=>`<button data-endmenu="${i}">${uiIconV593(menuIconNameV593(x[0]))}<span>${x[0]}</span></button>`).join("")}</div>`;
   [...$("menu").querySelectorAll("[data-endmenu]")].forEach((b,i)=>b.onclick=endItems[i][1]);
   return;
 }

 const mustLeague=!G.leagueUsed&&G.actions>=MAX_ACTIONS-1;
 let items=[
  ["訓練",training,G.actions>=MAX_ACTIONS||mustLeague],
  ["休息",rest,G.actions>=MAX_ACTIONS||mustLeague],
  ["聯賽開始",league,G.actions>=MAX_ACTIONS||G.leagueUsed],
  ["位置",position,false],
  ["交易",trade,false],
  ["各聯賽獎項",showAwards,false],
  ["現代籃球",modernDashboardV7,false],
  ["心境生活",lifeDashboardV71,false],
  ["代言財富",endorsementCenterV73,false],
  ["籃球世界",worldCenterV8,false],
  ["各隊球員",()=>teamBrowserV83(),false],
  ["媒體輿論",()=>mediaCenterV82("頭條"),false]
 ];
 if(G.phase==="高中"){
   const tradeItem=items.find(x=>x[0]==="交易"); if(tradeItem)tradeItem[0]="轉校";
   const teamsItem=items.find(x=>x[0]==="各隊球員"); if(teamsItem)teamsItem[0]="各校球員";
 }
 if(G.phase==="大學")items.push(["選秀",draft,false],["退役",retire,false]);
 if(G.phase==="職業")items.push(["會面",meeting,false],["退役",retire,false]);
 if(G.phase==="教練"){
   items=[
     ["訓練",coachSelfTrainingV845,G.actions>=MAX_ACTIONS||mustLeague],
     ["賽季開始",coachSeasonStartV833,G.actions>=MAX_ACTIONS||G.leagueUsed],
     ["陣容",coachLineupV81,false],
     ["戰術",coachTacticsSimpleV81,false],
     ["球員",coachPlayersSimpleV81,false],
     ["補強",coachReinforceV81,false],
     ["各隊球員",()=>teamBrowserV83(),false],
     ["媒體輿論",()=>mediaCenterV82("頭條"),false],
     ["教練中心",coachDashboardV81,false],
     ["教練生涯",coachCareerOptionsV81,false]
   ];
 }

 const secondaryLabels = G.phase==="教練"
   ? ["各隊球員","媒體輿論","教練中心","教練生涯"]
   : ["各聯賽獎項","現代籃球","心境生活","代言財富","籃球世界","各隊球員","各校球員","媒體輿論"];

 const primaryIndexes=[], secondaryIndexes=[];
 items.forEach((x,i)=>(secondaryLabels.includes(x[0])?secondaryIndexes:primaryIndexes).push(i));

 const renderMenuButton=(i,compact=false)=>{
   const x=items[i];
   return `<button data-menu="${i}" class="${compact?"menu-compact":""}" ${x[2]?"disabled":""}>${uiIconV593(menuIconNameV593(x[0]))}<span>${x[0]}</span></button>`;
 };

 $("menu").innerHTML=`
   ${mustLeague?'<div class="mandatory-note">本年最後一次行動必須完成聯賽。</div>':''}
   <div class="menu-section-title">主要操作</div>
   <div class="menu-grid menu-core-v837">${primaryIndexes.map(i=>renderMenuButton(i,false)).join("")}</div>
   ${secondaryIndexes.length?`
     <details class="menu-more-v837">
       <summary>更多功能 <span>${secondaryIndexes.length}</span></summary>
       <div class="menu-grid menu-secondary-v837">${secondaryIndexes.map(i=>renderMenuButton(i,true)).join("")}</div>
     </details>`:""}
 `;

 [...$("menu").querySelectorAll("[data-menu]")].forEach(b=>b.onclick=()=>{
   if(b.disabled)return;
   const i=+b.dataset.menu;
   try{
     const fn=items[i]&&items[i][1];
     if(typeof fn==="function")fn();
   }catch(err){
     console.error("操作執行錯誤",items[i]?.[0],err);
     closeModal();
     addLog(`「${items[i]?.[0]||"功能"}」執行時遇到資料異常，系統已保留存檔並重新載入操作介面。`,"event","操作自動修復");
     save();
     render();
   }
 });
}
function modal(h){$("modalContent").innerHTML=h;$("modal").classList.remove("hidden")}
function closeModal(){$("modal").classList.add("hidden")}
$("modalClose").onclick=closeModal;
function setup(){modal(`<h2>建立你的籃球人生</h2><p class="muted">基礎能力隨機50～70，各項數值不固定；五項基礎能力平均至少60。初始身高最高210公分；高中到大學期間每年有不固定的成長機會。</p><div class="form-grid"><label class="field">姓名<input id="fName" maxlength="16" value="新秀"></label>
 <label class="field">國籍<select id="fNationality"><option>台灣</option><option>美國</option><option>中國</option><option>日本</option><option>韓國</option></select></label><label class="field">遊戲起始年份<input id="fStartYear" type="number" min="1950" max="2100" value="2026"></label><label class="field">初始身高 160～210<input id="fHeight" type="number" min="160" max="210" value="190"></label><label class="field">體重 60～150<input id="fWeight" type="number" min="60" max="150" value="85"></label><label class="field">球衣背號<input id="fNum" type="number" min="0" max="99" value="23"></label><label class="field">慣用手<select id="fHand"><option>右手</option><option>左手</option></select></label><label class="field">希望位置1<select id="fPos1">${POS.map(p=>`<option value="${p}">${POSNAME[p]}</option>`).join("")}</select></label><label class="field">希望位置2<select id="fPos2">${POS.map(p=>`<option value="${p}" ${p==="PF"?"selected":""}>${POSNAME[p]}</option>`).join("")}</select></label></div><br><button id="startBtn">開始籃球人生</button>`);$("startBtn").onclick=()=>{let d={name:$("fName").value.trim()||"新秀",nationality:$("fNationality").value,startYear:+$("fStartYear").value||2026,height:+$("fHeight").value,weight:+$("fWeight").value,number:+$("fNum").value,hand:$("fHand").value,pos1:$("fPos1").value,pos2:$("fPos2").value};if(d.pos1===d.pos2)return alert("兩個位置不可相同。");if(d.height<160||d.height>210||d.weight<60||d.weight>150)return alert("初始身高必須在160～210公分，體重必須在60～150公斤。");closeModal();initPlayer(d)}}
function actionDone(consumeAction=false){
  // V8.5.2：只有「訓練」與「休息」會消耗年度動作次數。
  // 其他操作仍會存檔與更新畫面，但不會減少剩餘動作。
  if(!consumeAction){
    save();
    render();
    return;
  }

  G.actions=Number.isFinite(Number(G.actions))?Number(G.actions)+1:1;
  G.storyCount=Number.isFinite(Number(G.storyCount))?Number(G.storyCount)+1:1;

  if(G.actions>=MAX_ACTIONS){
    G.actions=MAX_ACTIONS;
    save();
    render();
    endYear();
    return;
  }

  if(G.storyCount%2===0){
    randomStory();
  }

  save();
  render();
}
function annualHeightGrowth(){
 if(!["高中","大學"].includes(G.phase) || G.height>=250)return;

 const old=G.height;
 let growth=0;
 const roll=Math.random();

 // 每年不固定成長：可能不長，也可能遇到明顯成長期。
 if(roll<0.18) growth=0;
 else if(roll<0.68) growth=rnd(1,4);
 else if(roll<0.92) growth=rnd(5,8);
 else growth=rnd(9,14);

 G.height=Math.min(250,G.height+growth);
 heightModifiers();

 if(growth===0){
   addLog(`年度身高檢查：今年身高維持在 ${G.height} cm，沒有明顯增長。`,"event","身高成長");
 }else{
   addLog(`年度身高成長：你從 ${old} cm 成長到 <span class="delta">${G.height} cm</span>，增加 ${G.height-old} cm。身高變化也重新影響部分能力上限。`,"success","身高成長");
 }
}


function coachSkillDeclineV64(){
  if(G.phase!=="教練")return;
  const changes=[];
  BASE.forEach(stat=>{
    const old=G.stats[stat]||0;
    G.stats[stat]=Math.max(0,old-2);
    changes.push(`${stat} ${old} → ${G.stats[stat]}`);
  });
  addLog(
    `教練時期年度球員能力退化：因長期離開職業球員訓練與正式比賽，運球、彈跳、投籃、傳球、籃板本年度各下降 <span class="delta">2 點</span>。<br>${changes.join("｜")}<br>這些數值會直接影響未來選擇「復出」時的試訓與錄取機率。`,
    "event",
    "教練時期能力退化"
  );
}

function playerAgingDeclineV53(){
  if(G.phase!=="職業")return;

  const age=ageNow();
  if(age<36)return;

  const decline=age-33; // 36:-3, 37:-4, 38:-5...
  const changes=[];
  BASE.forEach(k=>{
    const old=G.stats[k]||0;
    G.stats[k]=Math.max(0,old-decline);
    changes.push(`${k} ${old}→${G.stats[k]}`);
  });

  addLog(`年齡退化：你目前 ${age} 歲，本年度運球、彈跳、投籃、傳球、籃板各下降 <span class="delta">${decline} 點</span>。<br>${changes.join("｜")}<br>人際關係、情商、球商與知名度不受年齡退化影響。`,"event","球員年齡退化");
}


const NATIONAL_TEAM_CFG={
 "台灣":{team:"中華台北代表隊",region:"亞洲",threshold:68},
 "美國":{team:"美國代表隊",region:"美洲",threshold:86},
 "中國":{team:"中國代表隊",region:"亞洲",threshold:75},
 "日本":{team:"日本代表隊",region:"亞洲",threshold:76},
 "韓國":{team:"韓國代表隊",region:"亞洲",threshold:74}
};

function nationalCompetitionV62(year){
  if((year-2027)%4===0)return {name:"世界國家盃",min:5,max:8};
  if((year-2028)%4===0)return {name:"世界綜合運動會籃球賽",min:3,max:6};
  if((year-2029)%4===0)return {name:"洲際國家盃",min:3,max:6};
  return {name:"國際資格賽窗口",min:2,max:2};
}

function nationalTeamCallUpV62(done){
  if(!G||!["大學","職業"].includes(G.phase)){done();return;}
  if(!G.nationality||!NATIONAL_TEAM_CFG[G.nationality]){done();return;}
  const cfg=NATIONAL_TEAM_CFG[G.nationality];
  const score=avg()*.82+(G.stats["球商"]||30)*.10+(G.stats["知名度"]||30)*.08;
  const chance=clamp(18+(score-cfg.threshold)*3.1,2,96);
  if(Math.random()*100>chance){done();return;}

  const comp=nationalCompetitionV62(calendarYearV44());
  modal(`<h2>🌐 國家隊徵召</h2>
    <p><b>${cfg.team}</b> 向你發出正式徵召。國際正式大賽最終名單以12人為基準，本次你被列入12人正式名單候選。</p>
    <div class="offer">
      賽事：${comp.name}<br>
      所屬區域：${cfg.region}<br>
      預計出賽：${comp.min===comp.max?comp.min:`${comp.min}～${comp.max}`} 場<br>
      國家隊評估：${Math.round(score)}
    </div>
    <button id="nationalAccept">接受徵召</button>
    <button id="nationalDecline">婉拒本次徵召</button>`);

  $("nationalDecline").onclick=()=>{
    closeModal();
    addLog(`你婉拒了 ${cfg.team} 本次 ${comp.name} 徵召，留在球隊準備下一個賽季。`,"event","國家隊徵召｜婉拒");
    done();
  };
  $("nationalAccept").onclick=()=>{
    closeModal();
    const power=score+rnd(-10,10);
    let games=comp.min;
    if(comp.max>comp.min){
      const progress=clamp((power-65)/35,0,1);
      games=clamp(Math.round(comp.min+(comp.max-comp.min)*progress+rnd(-1,1)),comp.min,comp.max);
    }
    const winRate=clamp(Math.round(30+(power-60)*.9+rnd(-8,8)),15,90);
    const wins=Math.round(games*winRate/100), losses=games-wins;
    const medal=(comp.name!=="國際資格賽窗口"&&wins>=Math.ceil(games*.75))?(wins===games?"金牌":"獎牌圈"):null;
    G.injury=clamp(G.injury+5,0,100);
    G.stats["知名度"]=clamp((G.stats["知名度"]||30)+rnd(2,6),0,G.max["知名度"]||100);
    G.stats["球商"]=clamp((G.stats["球商"]||30)+rnd(1,4),0,G.max["球商"]||100);
    if(!Array.isArray(G.nationalHistory))G.nationalHistory=[];
    G.nationalHistory.push({year:calendarYearV44(),team:cfg.team,competition:comp.name,games,wins,losses,medal});
    G.history.unshift(`${calendarYearV44()}年入選 ${cfg.team}，參加 ${comp.name}（${wins}勝${losses}敗）。`);
    addTable("國家隊賽事結果",["項目","結果","項目","結果"],[
      ["國家隊",cfg.team,"賽事",comp.name],
      ["出賽場數",`${games} 場`,"戰績",`${wins} 勝 ${losses} 敗`],
      ["最終成果",medal||"完成本次國際賽","受傷機率","+5%"]
    ],"award");
    addLog(`你接受 ${cfg.team} 徵召並完成 ${comp.name}。國際賽經驗使球商與知名度獲得提升。`,"success","國家隊徵召完成");
    done();
  };
}


function syncSecondTeamContextV846(){
  if(!G || G.phase!=="職業" || !G.proKey)return;
  const expectedLeague=SECOND_TEAM_LEAGUE[G.proKey]||`${G.proLeague}二隊`;
  const expectedTeam=G.proKey==="GL"?G.team:`${G.team}二隊`;
  // Fix old saves where second-team fields belonged to a previous league (e.g. US -> Taiwan S).
  if(G.secondLeague!==expectedLeague)G.secondLeague=expectedLeague;
  if(G.secondTeam!==expectedTeam)G.secondTeam=expectedTeam;
}

function proSecondTeamEvaluationV62(){
  if(G.phase!=="職業"||!G.proKey||G.proKey==="GL")return;
  syncSecondTeamContextV846();
  const cfg=LEAGUE_CONFIG[G.proLeague];
  if(!cfg)return;
  const score=avg()+rnd(-7,7);
  if(G.squadLevel==="二隊"&&score>=cfg.difficulty-4){
    G.squadLevel="一隊";
    addLog(`${G.proLeague}球團完成年度發展評估後，決定把你從 ${G.secondLeague}／${G.secondTeam} 的培育名單正式升上 ${G.team} 一隊。`,"success","二隊升一隊");
  }else if(G.squadLevel!=="二隊"&&score<cfg.difficulty-15&&Math.random()<.45){
    G.squadLevel="二隊";
    addLog(`球團認為你目前需要更多上場時間，因此暫時安排你到 ${G.secondLeague}／${G.secondTeam} 培養。`,"event","下放二隊");
  }
}

function endYear(){
  settleAnnualIncomeV50();
  playerAgingDeclineV53();
  coachSkillDeclineV64();
  annualModernV7();
  annualLifeV71();
  annualFinanceV73();
  annualWorldV8();
  annualHeightGrowth();
  proSecondTeamEvaluationV62();

  nationalTeamCallUpV62(()=>{
    G.actions=0;
    G.leagueUsed=false;
    G.injury=Math.max(0,G.injury-2);
    G.absoluteAge=ageNow()+1;
    G.absoluteCalendarYear=calendarYearV44()+1;
    G.year++;

    if(G.phase==="高中" && G.year>3){collegeOffers();return;}
    if(G.phase==="大學" && G.year>4){proChoice();return;}

    addLog(`新的一年開始。你重新獲得 ${MAX_ACTIONS} 次行動，本年仍必須完成一次聯賽。`,"normal","新年度開始");
    save();render();
  });
}
function breakthroughPrompt(stat,onDone){
  const currentCap=G.max[stat]||100;
  modal(`<h2>能力極限｜${stat}</h2>
    <p>你的 <b>${stat}</b> 已經到達目前極限 <b>${G.stats[stat]} / ${currentCap}</b>。</p>
    <div class="offer">
      <b>突破挑戰結果機率</b><br>
      70%：突破成功，${stat}能力上限永久 +20<br>
      30%：突破失敗並受傷，受傷機率額外 +10%，且該能力 -5
    </div>
    <p>是否要挑戰突破？</p>
    <button id="breakTry">挑戰突破</button>
    <button id="breakCancel">暫不突破</button>`);

  $("breakCancel").onclick=()=>{
    closeModal();
    addLog(`${stat} 已達目前上限 ${currentCap}，你決定暫時不挑戰突破。`,"event","突破暫緩");
    onDone();
  };

  $("breakTry").onclick=()=>{
    const success=Math.random()<0.7;
    closeModal();
    if(success){
      if(!G.breakthrough)G.breakthrough={};
      G.breakthrough[stat]=(G.breakthrough[stat]||0)+20;ensureCareerMetricsV52();G.careerMetrics.breakthroughWins++;
      G.max[stat]=currentCap+20;
      addLog(`你挑戰 ${stat} 能力極限並成功突破！<span class="delta">${stat} 上限 ${currentCap} → ${G.max[stat]}</span>。`,"success","極限突破成功");
    }else{
      const old=G.injury;
      const oldStat=G.stats[stat];
      G.injury=clamp(G.injury+10,0,100);
      G.stats[stat]=Math.max(0,G.stats[stat]-5);ensureCareerMetricsV52();G.careerMetrics.breakthroughFails++;G.careerMetrics.injuryEvents++;
      addLog(`你挑戰 ${stat} 極限時突破失敗並受傷。受傷機率由 ${old}% 增加至 <span class="delta">${G.injury}%</span>；${stat} 由 ${oldStat} 降至 <span class="delta">${G.stats[stat]}</span>（-5），能力上限仍維持 ${currentCap}。`,"injury","極限突破受傷");
    }
    save();
    render();
    onDone();
  };
}
function training(){
 let choices=[...TRAIN].sort(()=>Math.random()-.5).slice(0,4);
 modal(`<h2>選擇訓練方式</h2><p>使用1次行動。訓練本身<strong>不增加受傷機率</strong>；成功率80%，成功+5～10，失敗-1～2。當能力到達目前上限時，可選擇挑戰極限突破。</p><div class="choices">${choices.map((x,i)=>`<button class="choice" data-tr="${i}"><b>${x[1]}</b><small>主要能力：${x[0]}</small></button>`).join("")}</div>`);

 [...document.querySelectorAll("[data-tr]")].forEach((b,i)=>b.onclick=()=>{
   const x=choices[i];
   const stat=x[0];
   const ok=Math.random()<.8;
   const d=ok?rnd(5,10):-rnd(1,2);
   const capBefore=G.max[stat]||100;
   const old=G.stats[stat];

   G.stats[stat]=clamp(G.stats[stat]+d,0,capBefore);
   const actual=G.stats[stat]-old;
   closeModal();

   addLog(`${x[2]} 最終結果為${ok?"訓練成功":"訓練失敗"}，<span class="delta">${stat} ${actual>=0?"+":""}${actual}</span>。本次訓練沒有增加受傷機率。`,ok?"success":"event",ok?"訓練成功":"訓練失敗");

   // 成功訓練後剛好到達上限，跳出突破挑戰視窗。
   if(ok && G.stats[stat]>=capBefore){
     breakthroughPrompt(stat,()=>actionDone(true));
   }else{
     actionDone(true);
   }
 });
}


function coachSelfTrainingV845(){
  if(!G || G.phase!=="教練")return;

  const physical=BASE.filter(k=>(G.stats[k]||0)>0);
  if(!physical.length){
    return modal(`<h2>🏀 自我訓練</h2><p>你的運球、彈跳、投籃、傳球、籃板已全部歸零，依目前生涯規則已無法再以球員身分復出，因此無法進行球員自我訓練。</p>`);
  }

  const choices=[...TRAIN].filter(x=>(G.stats[x[0]]||0)>0).sort(()=>Math.random()-.5).slice(0,4);
  modal(`<h2>🏀 復出準備・自我訓練</h2>
    <p>你目前雖然是教練，仍可利用空檔維持球員狀態。使用 1 次行動；成功率 80%，成功 +3～7，失敗 -1～2。此訓練只提升你的球員五項能力，不是訓練隊上球員，也不是提升教練能力。</p>
    <p><small>教練生涯每年結束時，運球、彈跳、投籃、傳球、籃板仍會依原規則各下降 2 點；自我訓練可用來抵銷部分退化，為未來復出做準備。</small></p>
    <div class="choices">${choices.map((x,i)=>`<button class="choice" data-selftrain-v845="${i}"><b>${x[1]}</b><small>${x[0]}：${G.stats[x[0]]||0} / ${G.max[x[0]]||100}</small></button>`).join("")}</div>`);

  [...document.querySelectorAll("[data-selftrain-v845]")].forEach((b,i)=>b.onclick=()=>{
    const x=choices[i], stat=x[0];
    const ok=Math.random()<.8;
    const d=ok?rnd(3,7):-rnd(1,2);
    const cap=G.max[stat]||100, old=G.stats[stat]||0;
    G.stats[stat]=clamp(old+d,0,cap);
    const actual=G.stats[stat]-old;
    closeModal();
    addLog(`教練時期自我訓練：${x[2]} <span class="delta">${stat} ${actual>=0?"+":""}${actual}</span>。你持續維持球員身體與技術狀態，為可能的復出做準備。`,ok?"success":"event","復出準備");
    actionDone(true);
  });
}

const COACH_TRAIN_V50=[
  ["人際關係","更衣室溝通訓練","你安排一對一談話、隊內會議與衝突模擬，練習在不同個性球員之間建立信任與合作。"],
  ["人際關係","球員關係經營","你主動了解先發、替補與年輕球員的需求，並嘗試改善更衣室氣氛與團隊凝聚力。"],
  ["情商","高壓情境溝通","你模擬連敗、媒體質疑與球員不滿等狀況，訓練如何控制情緒並做出讓團隊接受的回應。"],
  ["情商","球星管理課程","你研究明星球員的角色需求、合約心理與休息安排，學習在戰績與個人期待之間取得平衡。"],
  ["球商","戰術影片研究","你長時間分析比賽影片、輪換與攻防對位，嘗試找出不同陣容在關鍵回合中的最佳解法。"],
  ["球商","臨場決策演練","助理教練不斷給你不同比分與剩餘時間，你必須快速決定暫停、換人、犯規與最後一擊戰術。"]
];

function coachTrainingV50(){
  if(G.phase!=="教練"){
    return addLog("教練能力訓練只有在教練時期才能使用。","event","教練訓練");
  }

  const choices=[...COACH_TRAIN_V50].sort(()=>Math.random()-.5).slice(0,4);
  modal(`<h2>教練能力訓練</h2>
    <p>不消耗年度動作次數。成功率 80%，成功 +5～10，失敗 -1～2；訓練本身不增加受傷機率。</p>
    <div class="choices">${choices.map((x,i)=>`
      <button class="choice" data-coachtrain="${i}">
        <b>${x[1]}</b>
        <small>主要能力：${x[0]}</small>
      </button>`).join("")}</div>`);

  [...document.querySelectorAll("[data-coachtrain]")].forEach((b,i)=>b.onclick=()=>{
    const x=choices[i];
    const stat=x[0];
    const ok=Math.random()<.8;
    const delta=ok?rnd(5,10):-rnd(1,2);
    const cap=G.max[stat]||100;
    const old=G.stats[stat];
    G.stats[stat]=clamp(old+delta,0,cap);
    const actual=G.stats[stat]-old;
    closeModal();

    addLog(`${x[2]} 最終${ok?"訓練成功":"訓練失敗"}，<span class="delta">${stat} ${actual>=0?"+":""}${actual}</span>。`,
      ok?"success":"event",
      ok?"教練訓練成功":"教練訓練失敗");

    if(ok && G.stats[stat]>=cap){
      breakthroughPrompt(stat,()=>actionDone());
    }else{
      actionDone();
    }
  });
}

function rest(){
  const old=G.injury;
  G.injury=clamp(G.injury-20,0,100);
  const reduced=old-G.injury;
  addLog(`你把這次行動用於完整休息、睡眠、復健與恢復性保養。受傷機率由 ${old}% 降為 <span class="delta">${G.injury}%</span>，本次實際降低 ${reduced}%。`,"success","休息回報");
  actionDone(true);
}
function tactics(stage){return stage==="pre"?[["快速轉換","開季先提高節奏，利用速度與早攻建立優勢。",6,2],["半場控制","降低節奏、重視失誤控制與戰術執行。",4,5],["禁區優先","強調籃板與禁區攻防，適合高大陣容。",5,4],["外線空間","拉開空間增加三分比重，波動較大。",7,1]]:[["季後賽防守壓迫","縮短輪換並提高防守強度，關鍵戰較穩定。",5,7],["球星單打","把關鍵球交給核心，明星能力越高效果越好。",7,2],["擋拆決勝","大量使用擋拆讀秒，仰賴球商與傳球。",6,5],["籃板絞殺","放慢節奏、控制籃板與二次進攻。",4,6]]}
function teamAbility(){return clamp(avg()*.65+G.stats["球商"]*.18+G.stats["人際關係"]*.06+rnd(-6,6),20,100)}

function coachRolePreviewV46(){
  const ability=avg();
  const preferred=[G.pos1,G.pos2].filter(Boolean);
  const posScores={
    PG:G.stats["運球"]*.32+G.stats["傳球"]*.34+G.stats["球商"]*.22+G.stats["投籃"]*.12,
    SG:G.stats["投籃"]*.38+G.stats["運球"]*.24+G.stats["彈跳"]*.16+G.stats["球商"]*.14+G.stats["傳球"]*.08,
    SF:G.stats["投籃"]*.24+G.stats["運球"]*.18+G.stats["彈跳"]*.18+G.stats["籃板"]*.20+G.stats["球商"]*.20,
    PF:G.stats["籃板"]*.34+G.stats["彈跳"]*.22+G.stats["投籃"]*.12+G.stats["球商"]*.20+G.stats["傳球"]*.12,
    C:G.stats["籃板"]*.42+G.stats["彈跳"]*.20+G.stats["球商"]*.18+G.stats["傳球"]*.08+G.stats["投籃"]*.12
  };
  preferred.forEach((p,i)=>{ if(posScores[p]!=null) posScores[p]+=i===0?6:3; });
  const position=Object.entries(posScores).sort((a,b)=>b[1]-a[1])[0][0];

  let starterThreshold=55;
  if(G.phase==="大學") starterThreshold=(G.school && collegeUS.includes(G.school))?60:50;
  if(G.phase==="職業") starterThreshold=68;
  const starterScore=ability + rnd(-5,5);
  const role=starterScore>=starterThreshold?"先發":"候補";
  const minutes=role==="先發"?rnd(26,36):rnd(10,24);

  return {role,position,minutes,starterScore,starterThreshold};
}
function league(){
  const coachMode=G.phase==="教練";
  const role=coachMode?null:coachRolePreviewV46();

  if(!coachMode){
    modal(`<h2>聯賽前教練談話</h2>
      <p>教練在賽季開始前先告知你目前的球隊定位。這會依你的能力、球商、位置適性與球隊需求決定。</p>
      <div class="offer">
        <b>本季定位：${role.role}</b><br>
        預計上場位置：${POSNAME[role.position]}（${role.position}）<br>
        預估場均上場時間：${role.minutes} 分鐘<br>
        教練評語：${role.role==="先發"?"你目前具備穩定輪替與先發條件，球隊期待你在主要陣容中發揮。":"你目前會從板凳出發，仍有機會依臨場表現提高上場時間與角色。"}
      </div>
      <p>你要參與本季賽程嗎？出賽會累積受傷機率；不出賽仍視為完成球隊賽季，但不會留下個人比賽數據。</p>
      <button id="leaguePlay">參與賽程</button>
      <button id="leagueSkip">不參與賽程</button>`);
    $("leaguePlay").onclick=()=>{closeModal();leagueTacticsV46(true,role)};
    $("leagueSkip").onclick=()=>{closeModal();leagueTacticsV46(false,role)};
  }else{
    leagueTacticsV46(false,null);
  }
}

function leagueTacticsV46(willPlay,role){
  const coachMode=G.phase==="教練";
  const tactics = coachMode ? coachTacticsV54() : [
    ["均衡攻防","以穩定輪轉與半場攻防為主，風險較低。",2,2],
    ["快攻轉換","提高節奏、轉換與早攻比例，爆發力高但波動也較大。",4,-1],
    ["禁區強攻","強調籃板與禁區終結，適合高籃板與彈跳能力。",3,1],
    ["外線火力","增加三分與空間型進攻，命中順時上限高。",4,-2],
    ["擋拆控制","以運球、傳球與半場閱讀製造好機會。",3,2]
  ];

  modal(`<h2>季前戰術</h2>
    <p>${coachMode?"教練戰術效果只依你的球商與目前隊友能力值判斷；人際關係與情商不直接增加比賽勝率。":"先選擇例行賽主要打法。"}只有晉級季後賽後才會出現季後賽戰術。</p>
    <div class="choices">${tactics.map((t,i)=>`<button class="choice" data-pre="${i}"><b>${t[0]}</b><small>${t[1]}</small></button>`).join("")}</div>`);

  [...document.querySelectorAll("[data-pre]")].forEach((b,i)=>b.onclick=()=>{
    const pre=tactics[i];
    closeModal();
    resolveRegularSeasonV461(willPlay,role,pre,tactics);
  });
}

function leagueInjuryCheckV482(willPlay){
  // 教練時期或沒有實際出賽，不進行球員受傷判定。
  if(G.phase==="教練" || !willPlay)return;

  const chance=clamp(G.injury||0,0,100);
  const injured=(Math.random()*100)<chance;

  if(injured){
    ensureCareerMetricsV52();G.careerMetrics.injuryEvents++;
    const changes=[];
    BASE.forEach(stat=>{
      const old=G.stats[stat];
      G.stats[stat]=Math.max(0,old-3);
      changes.push(`${stat} ${old} → ${G.stats[stat]}`);
    });
    addLog(`聯賽結束後進行受傷判定。本次受傷機率為 ${chance}%，系統判定你在賽季中受到傷勢影響。運球、彈跳、投籃、傳球、籃板全部下降 3 點。<br><span class="delta">${changes.join("｜")}</span>`,"injury","聯賽受傷");
  }else{
    ensureCareerMetricsV52();G.careerMetrics.healthySeasons++;
    addLog(`聯賽結束後進行受傷判定。本次受傷機率為 ${chance}%，你順利完成賽季，沒有受到需要影響能力值的傷勢。`,"success","聯賽健康完賽");
  }
}
function resolveRegularSeasonV461(willPlay,role,pre,tactics){
  const coachMode=G.phase==="教練";
  const skill=avg(); // 僅 BASE：運球、彈跳、投籃、傳球、籃板
  const iq=G.stats["球商"];
  const relation=G.stats["人際關係"];
  const eq=G.stats["情商"];
  const reb=G.stats["籃板"];
  const pass=G.stats["傳球"];
  const shooting=G.stats["投籃"];

  const cfg=LEAGUE_CONFIG[leagueName()]||{teams:16,games:30,difficulty:70,playoff:8};
  let difficulty=cfg.difficulty;
  if(G.phase==="職業"&&G.squadLevel==="二隊"){
    difficulty=Math.max(55,difficulty-10);
  }

  const preSynergy = G.phase==="教練"
    ? (pre[4]||0) + iq*.025 + (teamRosterAverageV54()-60)*.10
    : pre[2]
      + (pre[0].includes("擋拆") ? G.stats["運球"]*.02 + pass*.025 : 0)
      + (pre[0].includes("禁區") ? reb*.035 + G.stats["彈跳"]*.015 : 0)
      + (pre[0].includes("外線") ? shooting*.035 : 0)
      + (pre[0].includes("快攻") ? G.stats["運球"]*.02 + G.stats["彈跳"]*.015 : 0);

  // 球員時期：聯賽強度只由 5 項籃球能力 + 戰術影響。
  // 教練時期：聯賽勝率改由人際關係、情商、球商 + 戰術影響。
  const playerPower =
    (G.stats["運球"] + G.stats["彈跳"] + G.stats["投籃"] + G.stats["傳球"] + G.stats["籃板"]) / 5;

  const coachPower =
    teamRosterAverageV54()*.68 + iq*.32;

  const teamPower = G.phase==="教練"
    ? coachPower + preSynergy + rnd(-10,10)
    : playerPower + preSynergy + rnd(-10,10);

  let teamCount=cfg.teams||16;

  const relative=teamPower-difficulty;
  let regularRank=Math.round(teamCount*(0.58-relative/95));
  regularRank+=rnd(-Math.max(1,Math.round(teamCount*.08)),Math.max(1,Math.round(teamCount*.10)));
  regularRank=Math.max(1,Math.min(teamCount,regularRank));

  let playoffSlots=cfg.playoff||Math.min(8,teamCount);
  const madePlayoffs=regularRank<=playoffSlots;

  let games=cfg.games||30;
  // HBL場數依實際晉級階段而異：預賽先計固定場次，後續晉級再增加。
  if(leagueName()==="台灣高中甲級"){
    games=3+(regularRank<=12?5:0)+(regularRank<=8?7:0)+(regularRank<=4?2:0);
  }else if(leagueName()==="台灣高中乙級"){
    games=cfg.games+(regularRank<=8?3:0)+(regularRank<=4?2:0);
  }
  const winRate=clamp(50+relative*.65+preSynergy*.5+rnd(-8,8),18,82);
  const wins=Math.round(games*winRate/100);
  const losses=games-wins;

  G.leagueUsed=true;
  if(willPlay && !coachMode){
    G.injury=clamp(G.injury+10,0,100);
  }

  addLog(`例行賽採用「${pre[0]}」戰術。球隊完成例行賽後排名第 ${regularRank} 名，戰績 ${wins} 勝 ${losses} 敗，${madePlayoffs?"成功取得季後賽資格":"未取得季後賽資格"}。`,
      "league","例行賽結果");

  addTable("聯賽表現｜例行賽",
  ["項目","數值","項目","數值"],[
    ["聯盟隊伍數",teamCount,"例行賽排名",`第 ${regularRank} 名`],
    ["戰績",`${wins} 勝 ${losses} 敗`,"勝率",`${Math.round(winRate)}%`],
    ["季後賽資格",madePlayoffs?"晉級":"未晉級","季前戰術",pre[0]]
  ],"league");

  let personalRank=null;
  if(!coachMode && willPlay){
    const starterBonus=role && role.role==="先發"?4:-2;
    const pts=Math.max(2,Math.round(skill*.22+shooting*.10+starterBonus+rnd(-4,5)));
    const rebStat=Math.max(1,Math.round(reb*.10+(role&&["PF","C"].includes(role.position)?2:0)+rnd(-2,3)));
    const ast=Math.max(0,Math.round(pass*.09+(role&&role.position==="PG"?2:0)+rnd(-2,3)));
    const fg=clamp(Math.round(36+shooting*.42+rnd(-7,6)),28,68);

    addTable("聯賽表現｜例行賽個人數據",
    ["項目","數值","項目","數值"],[
      ["球隊定位",role.role,"上場位置",`${POSNAME[role.position]}（${role.position}）`],
      ["場均時間",`${role.minutes} 分鐘`,"場均得分",pts],
      ["場均籃板",rebStat,"場均助攻",ast],
      ["投籃命中率",`${fg}%`,"季後賽",madePlayoffs?"有":"無"]
    ],"league");
    personalRank=personalLeagueRankingV54({played:true,coach:false,rating:teamPower,pts,reb:rebStat,ast});
    if(personalRank)addTable("聯賽表現｜個人排名",["項目","結果","項目","結果"],[
      ["個人綜合排名",`第 ${personalRank.rank} 名`,"個人評分",personalRank.score],
      ["參考依據","場均數據＋能力＋球隊表現","獎項機率","已提高"]
    ],"league");

    const awardRows=awardRaceRankingV55({played:true,coach:false,rating:teamPower,pts,reb:rebStat,ast});
    G._seasonAwardRowsV55=awardRows;
  } else if(!coachMode && !willPlay){
    addLog("你決定本季不參與賽程，因此不會產生個人比賽數據，也不累積本次聯賽的受傷機率。球隊賽季仍照常完成。",
        "normal","未參與賽程");
  }

  if(!madePlayoffs){
    addLog(`球隊例行賽排名第 ${regularRank} 名，未取得季後賽資格，因此本季不會進入季後賽戰術選擇。`,
        "normal","賽季結束");
    publishSeasonRankingsV55({
      teamRank:regularRank,
      teamCount,
      personal:personalRank,
      awardRows:G._seasonAwardRowsV55||[],
      coach:coachMode
    });
    if(coachMode)coachAwardCheckV63({finalRank:regularRank,regularRank,teamCount,madePlayoffs:false,champion:false});
    G._seasonAwardRowsV55=[];
    leagueInjuryCheckV482(willPlay);
    actionDone();
    return;
  }

  modal(`<h2>晉級季後賽｜選擇季後賽戰術</h2>
    <p>球隊已成功取得季後賽資格。請決定季後賽主要戰術；這次選擇會影響淘汰賽表現與最終名次。</p>
    <div class="choices">${tactics.map((t,i)=>`<button class="choice" data-post="${i}"><b>${t[0]}</b><small>${t[1]}</small></button>`).join("")}</div>`);

  [...document.querySelectorAll("[data-post]")].forEach((b,i)=>b.onclick=()=>{
    const post=tactics[i];
    closeModal();
    resolvePlayoffsV461(willPlay,role,pre,post,regularRank,teamCount,wins,losses);
  });
}

function resolvePlayoffsV461(willPlay,role,pre,post,regularRank,teamCount,wins,losses){
  const coachMode=G.phase==="教練";
  const skill=avg();
  const iq=G.stats["球商"];
  const reb=G.stats["籃板"];
  const pass=G.stats["傳球"];
  const shooting=G.stats["投籃"];

  const postSynergy = G.phase==="教練"
    ? (post[4]||0) + (pre[0]===post[0]?2:0)
      + G.stats["球商"]*.035 + (teamRosterAverageV54()-60)*.10
    : post[2] + (pre[0]===post[0]?2:0)
      + (post[0].includes("擋拆") ? G.stats["運球"]*.02 + pass*.025 : 0)
      + (post[0].includes("禁區") ? reb*.04 + G.stats["彈跳"]*.015 : 0)
      + (post[0].includes("外線") ? shooting*.04 : 0)
      + (post[0].includes("快攻") ? G.stats["運球"]*.02 + G.stats["彈跳"]*.015 : 0);

  const playerPlayoffPower =
    (G.stats["運球"] + G.stats["彈跳"] + G.stats["投籃"] + G.stats["傳球"] + G.stats["籃板"]) / 5;
  const coachPlayoffPower =
    teamRosterAverageV54()*.65 + G.stats["球商"]*.35;
  const playoffPower = G.phase==="教練"
    ? coachPlayoffPower + postSynergy + rnd(-12,12)
    : playerPlayoffPower + postSynergy + rnd(-12,12);
  let advancement=Math.round((playoffPower-50)/12)+rnd(-1,1);
  advancement=Math.max(0,Math.min(4,advancement));

  let finalRank;
  if(advancement>=4) finalRank=1;
  else if(advancement===3) finalRank=rnd(2,4);
  else if(advancement===2) finalRank=rnd(3,8);
  else if(advancement===1) finalRank=rnd(5,12);
  else finalRank=Math.max(regularRank,rnd(Math.min(teamCount,9),Math.min(teamCount,16)));

  addLog(`季後賽採用「${post[0]}」戰術。球隊在淘汰賽階段完成征戰，最終名次為第 ${finalRank} 名。`,
      "league","季後賽結果");

  addTable("聯賽表現｜季後賽",
  ["項目","數值","項目","數值"],[
    ["例行賽排名",`第 ${regularRank} 名`,"季後賽戰術",post[0]],
    ["最終名次",`第 ${finalRank} 名`,"賽季戰績",`${wins} 勝 ${losses} 敗`]
  ],"league");

  if(coachMode){
    addLog(`本季帶隊最終名次第 ${finalRank} 名。這筆成績會計入你的教練生涯履歷。`,
        "success","教練帶隊成績");
  }

  let personalRank=null;
  if(!coachMode && willPlay){
    const lastPlayerTable=(G.logs||[]).find(x=>x.title==="聯賽表現｜個人排名");
    if(lastPlayerTable && lastPlayerTable.table && lastPlayerTable.table.rows && lastPlayerTable.table.rows[0]){
      const txt=String(lastPlayerTable.table.rows[0][1]||"");
      const m=txt.match(/(\d+)/);
      if(m)personalRank={rank:+m[1]};
    }
  }

  publishSeasonRankingsV55({
    teamRank:finalRank,
    teamCount,
    personal:personalRank,
    awardRows:G._seasonAwardRowsV55||[],
    coach:coachMode
  });
  if(coachMode)coachAwardCheckV63({finalRank,regularRank,teamCount,madePlayoffs:true,champion:finalRank===1});
  G._seasonAwardRowsV55=[];

  leagueInjuryCheckV482(willPlay);
  actionDone();
}
function choosePreseason(play,coach){let ts=tactics("pre");modal(`<h2>聯賽｜季前戰術</h2><p>第一階段選擇會影響例行賽排名、球隊化學與季後賽種子。</p><div class="choices">${ts.map((t,i)=>`<button class="choice" data-pre="${i}"><b>${t[0]}</b><small>${t[1]}</small></button>`).join("")}</div>`);[...document.querySelectorAll("[data-pre]")].forEach((b,i)=>b.onclick=()=>choosePostseason(play,coach,ts[i]))}
function choosePostseason(play,coach,pre){let ts=tactics("post");modal(`<h2>聯賽｜季後戰術</h2><p>第二階段戰術會與季前戰術形成組合。兩次戰術、隊員能力、聯賽難度與隨機狀態共同決定最終名次。</p><div class="choices">${ts.map((t,i)=>`<button class="choice" data-post="${i}"><b>${t[0]}</b><small>${t[1]}</small></button>`).join("")}</div>`);[...document.querySelectorAll("[data-post]")].forEach((b,i)=>b.onclick=()=>simulateLeague(play,coach,pre,ts[i]))}
function simulatedOpponentNames(count){let names=[];if(G.phase==="職業")names=currentTeamPool().filter(x=>x!==G.team);else{for(let i=1;i<count;i++)names.push(`${leagueName()}球隊 ${String(i).padStart(2,"0")}`)}while(names.length<count-1)names.push(`${leagueName()}球隊 ${names.length+1}`);return names.slice(0,count-1)}
function simulateLeague(play,coach,pre,post){
 closeModal();let lg=leagueName(),cfg=LEAGUE_CONFIG[lg]||LEAGUE_CONFIG["教練聯賽"],count=cfg.teams;
 let core=teamAbility(),fit=(pre[2]+post[2])+G.stats["球商"]*.08,def=(pre[3]+post[3])+G.stats["籃板"]*.04;
 let strength=clamp(core+fit+def-cfg.difficulty*.34+rnd(-12,12),15,96);
 let teams=[{name:G.team||"你的球隊",rating:strength,isUser:true},...simulatedOpponentNames(count).map(n=>({name:n,rating:clamp(rnd(cfg.difficulty-18,cfg.difficulty+16),25,99),isUser:false}))];
 teams.forEach(t=>t.seasonScore=t.rating+rnd(-18,18));teams.sort((a,b)=>b.seasonScore-a.seasonScore);let regularRank=teams.findIndex(t=>t.isUser)+1;
 let madePlayoffs=regularRank<=cfg.playoff;let playoffBoost=post[2]+post[3]+G.stats["球商"]*.05+rnd(-10,10);let finalRank=regularRank;
 if(madePlayoffs){let seedFactor=(cfg.playoff-regularRank+1)*2;let playoffScore=strength+playoffBoost+seedFactor;let contenders=teams.slice(0,cfg.playoff).map(t=>({t,score:(t.isUser?playoffScore:t.rating+rnd(-8,12))})).sort((a,b)=>b.score-a.score);finalRank=contenders.findIndex(x=>x.t.isUser)+1}
 else finalRank=regularRank;
 let winPct=clamp(Math.round(78-finalRank/count*58+rnd(-5,5)),12,82),wins=Math.round(cfg.games*winPct/100),losses=cfg.games-wins;
 let injuryGain=0,injuryEvent="";
 if(play&&!coach){injuryGain=rnd(8,14);G.injury=clamp(G.injury+injuryGain);if(Math.random()*100<G.injury)injuryEvent=` 本季中途曾出現身體狀況，醫療團隊安排你短暫休養。`}
 G.leagueUsed=true;
 let summaryRows=[["聯賽球隊數",count,"例行賽",`${wins}勝${losses}敗`],["例行賽排名",`第${regularRank}名`,"季後賽",madePlayoffs?"晉級":"未晉級"],["最終名次",`第${finalRank}名`,"聯賽難度",cfg.difficulty],["季前戰術",pre[0],"季後戰術",post[0]]];
 addLog(`季前採用「${pre[0]}」，季後採用「${post[0]}」。本季由球隊能力 ${Math.round(core)}、戰術適配、聯賽難度與臨場波動共同計算，最終排名第 <span class="delta">${finalRank}</span> 名。${play&&!coach?`你選擇出賽，受傷機率增加 ${injuryGain}% 至 ${G.injury}%。`:coach?"你以教練身份帶隊，所有結果只計入教練履歷。":"你選擇不出賽，因此沒有增加受傷機率。"}${injuryEvent}`,coach?"coach":"league","聯賽戰術組合結果");
 addTable(coach?"教練帶隊｜聯賽總表":"聯賽表現｜球隊總表",["項目","數值","項目","數值"],summaryRows,coach?"coach":"league");
 let standings=teams.slice(0,Math.min(count,16)).map((t,i)=>[i+1,t.name,Math.round(t.rating),t.isUser?"你的球隊":""]);if(regularRank>16)standings.push([regularRank,G.team,Math.round(strength),"你的球隊"]);addTable(`聯賽排名表｜共 ${count} 隊`,["排名","球隊","戰力","備註"],standings,"league");
 let playerStats=null;
 if(play&&!coach){let pts=Math.max(2,Math.round(G.stats["投籃"]*.17+G.stats["運球"]*.08+pre[2]*.3+rnd(-4,5))),reb=Math.max(1,Math.round(G.stats["籃板"]*.10+post[3]*.25+rnd(-2,3))),ast=Math.max(1,Math.round(G.stats["傳球"]*.09+G.stats["球商"]*.025+rnd(-1,3))),fg=clamp(Math.round(29+G.stats["投籃"]*.42+rnd(-5,6)),25,68);playerStats={pts,reb,ast,fg};addTable("聯賽表現｜個人數據",["項目","數值","項目","數值"],[["場均得分",pts,"場均籃板",reb],["場均助攻",ast,"投籃命中率",`${fg}%`],["主要位置",POSNAME[G.pos1],"出賽狀態","本季出賽"]],"league")}
 G.seasons.push({league:lg,year:G.year,age:ageNow(),team:G.team,coach,played:play,rank:finalRank,regularRank,wins,losses,pre:pre[0],post:post[0],playerStats});
 if(coach)awardCheck({rank:finalRank,rating:strength,coach:true,played:true});else if(play)awardCheck({rank:finalRank,rating:strength,coach:false,played:true,...playerStats});
 let reward=coach?0:Math.max(1,Math.round((count-finalRank+1)/count*8));if(play&&!coach)leagueReward(reward,finalRank);else{if(!play&&!coach)addLog("你本季選擇不出賽，因此沒有個人聯賽配點獎勵。","event","未出賽結算");actionDone()}
}
function leagueReward(reward,rank){modal(`<h2>聯賽能力獎勵</h2><p>依照第 ${rank} 名與你的出賽表現，獲得 ${reward} 點自由配點。</p><div class="choices">${BASE.map(k=>`<button class="choice" data-r="${k}">${k} +1</button>`).join("")}</div><p id="remain">剩餘 ${reward}</p><button id="finishReward">完成</button>`);let left=reward;[...document.querySelectorAll("[data-r]")].forEach(b=>b.onclick=()=>{if(left<=0)return;let k=b.dataset.r;G.stats[k]=clamp(G.stats[k]+1,0,G.max[k]);left--;$("remain").textContent=`剩餘 ${left}`});$("finishReward").onclick=()=>{if(left)return alert("請先分配完全部點數。");closeModal();addLog(`本季聯賽獎勵共 ${reward} 點已分配完成。`,"success","聯賽獎勵");actionDone()}}


function awardRaceRankingV55(s){
  if(!s||!s.played||s.coach)return [];
  const pool=LEAGUE_AWARDS[leagueName()]||[];
  const rows=[];

  const perf=(s.rating||60)*.55+(s.pts||0)*1.1+(s.reb||0)*.85+(s.ast||0)*1.0;
  const amateur=G.phase==="高中"||G.phase==="大學";
  const topRank=(score)=>{
    if(amateur){
      // 高中、大學的候選人更多，避免能力稍高就長期固定第2名。
      if(score>=112)return rnd(1,7);
      if(score>=102)return rnd(3,12);
      if(score>=92)return rnd(6,20);
      if(score>=82)return rnd(10,30);
      if(score>=72)return rnd(16,42);
      return rnd(25,60);
    }
    if(score>=105)return rnd(1,3);
    if(score>=95)return rnd(2,6);
    if(score>=85)return rnd(4,12);
    if(score>=75)return rnd(8,20);
    return rnd(15,40);
  };

  const mvp=pool[0];
  if(mvp)rows.push([mvp,`第 ${topRank(perf+rnd(-4,6))} 名`]);

  if(pool[2])rows.push([pool[2],`第 ${topRank(perf+rnd(-8,4))} 名`]);

  if(pool.includes("得分王"))rows.push(["得分王",`第 ${topRank((s.pts||0)*4.3+rnd(-6,6))} 名`]);
  if(pool.includes("助攻王"))rows.push(["助攻王",`第 ${topRank((s.ast||0)*10+rnd(-6,6))} 名`]);
  if(pool.includes("籃板王"))rows.push(["籃板王",`第 ${topRank((s.reb||0)*8+rnd(-6,6))} 名`]);

  if(pool.includes("最佳防守球員")){
    rows.push(["最佳防守球員",`第 ${topRank((s.rating||60)+ (s.reb||0)*2 + rnd(-8,8))} 名`]);
  }

  if(G.year===1){
    const rookie=pool.find(a=>/新人|年度新人/.test(a));
    if(rookie)rows.push([rookie,`第 ${topRank(perf+rnd(-5,8))} 名`]);
  }

  return rows.slice(0,6);
}


function syncAwardRankWinnersV583(awardRows){
  if(!Array.isArray(awardRows)||!awardRows.length)return [];
  const won=[];
  awardRows.forEach(row=>{
    if(!row||row.length<2)return;
    const award=row[0];
    const rankText=String(row[1]||"");
    if(!/第\s*1\s*名/.test(rankText))return;

    const exists=(G.awards||[]).some(a=>
      a.league===leagueName() &&
      a.award===award &&
      a.year===G.year &&
      a.age===ageNow()
    );
    if(!exists){
      G.awards.push({
        league:leagueName(),
        award,
        year:G.year,
        age:ageNow(),
        phase:G.phase
      });
    }
    won.push(award);
  });

  if(won.length){
    addLog(
      `獎項排名正式結算：你在 <span class="delta">${won.join("、")}</span> 排名第 1，正式獲得該獎項，已加入籃球人生履歷與「各聯賽獎項」。`,
      "award",
      "獎項正式公布"
    );
  }
  return won;
}


const COACH_AWARDS_V63=[
 "年度最佳教練","總冠軍教練","最佳進步球隊教練","最佳例行賽教練",
 "最佳季後賽教練","年度戰術教練","年度球員發展教練"
];

function coachAwardCheckV63({finalRank,regularRank,teamCount,madePlayoffs,champion=false}){
 if(G.phase!=="教練")return [];
 const iq=G.stats["球商"]||30, roster=teamRosterAverageV54();
 const seasonScore=(teamCount-regularRank+1)/Math.max(1,teamCount)*45+
   (teamCount-finalRank+1)/Math.max(1,teamCount)*35+iq*.12+roster*.08;
 const candidates=[];
 if(champion||finalRank===1)candidates.push(["總冠軍教練",1]);
 if(regularRank===1)candidates.push(["最佳例行賽教練",.82]);
 if(madePlayoffs&&finalRank<=Math.max(2,Math.ceil(teamCount*.12)))candidates.push(["最佳季後賽教練",.58]);
 if(seasonScore>=66)candidates.push(["年度最佳教練",clamp(.30+(seasonScore-66)*.018,.30,.88)]);
 if(regularRank<=Math.max(5,Math.ceil(teamCount*.30)))candidates.push(["最佳進步球隊教練",.42]);
 if(iq>=78)candidates.push(["年度戰術教練",clamp(.30+(iq-78)*.018,.30,.72)]);
 if(roster>=72)candidates.push(["年度球員發展教練",clamp(.24+(roster-72)*.015,.24,.60)]);
 const won=[];
 candidates.forEach(([name,chance])=>{
   if(Math.random()>=chance)return;
   const exists=(G.awards||[]).some(a=>a.league===leagueName()&&a.award===name&&a.year===G.year&&a.age===ageNow()&&a.phase==="教練");
   if(!exists)G.awards.push({league:leagueName(),award:name,year:G.year,age:ageNow(),phase:"教練",source:"coach-award-v63"});
   won.push(name);
 });
 if(won.length){
   addTable("教練獎項公布",["獎項","結果"],won.map(a=>[a,"🏆 獲獎"]),"award");
   addLog(`本季教練獎項公布：你獲得 <span class="delta">${won.join("、")}</span>。已加入教練生涯履歷。`,"award","教練獎項");
 }else addLog("本季教練獎項公布：你有進入部分獎項討論，但最終沒有獲獎。","coach","教練獎項");
 return won;
}

function publishSeasonRankingsV55({teamRank,teamCount,personal,awardRows,coach=false}){
  const rows=[
    ["球隊賽季排名",`第 ${teamRank} / ${teamCount} 名`],
    ["個人賽季排名",coach?"教練模式不計球員個人排名":(personal?`第 ${personal.rank} 名`:"未出賽")]
  ];
  addTable("賽季排名公布",["項目","排名"],rows,coach?"coach":"league");

  if(!coach && awardRows && awardRows.length){
    addTable("獎項排名",["獎項","最終排名"],awardRows,"award");
    syncAwardRankWinnersV583(awardRows);
  }
}

function personalLeagueRankingV54(s){
  if(!s||!s.played||s.coach)return null;
  const score=(s.rating||60)*.55+(s.pts||0)*.9+(s.reb||0)*.8+(s.ast||0)*1.0+rnd(-6,6);
  let rank=1;
  if(score<55)rank=rnd(35,80);
  else if(score<65)rank=rnd(20,45);
  else if(score<75)rank=rnd(10,28);
  else if(score<85)rank=rnd(4,15);
  else rank=rnd(1,6);
  return {rank,score:Math.round(score)};
}

function awardCheck(s){
  let pool=LEAGUE_AWARDS[leagueName()]||[],won=[];
  if(s.coach){
    if(s.rank===1)won.push("總冠軍教練");
    if(s.rating>=74&&Math.random()<.78)won.push("年度最佳教練");
    if(s.rank<=5&&Math.random()<.62)won.push("最佳進步球隊教練");
  }else if(s.played){
    // 高中、大學獎項競爭更激烈；職業維持較高獎項機率。
    const amateur=G.phase==="高中"||G.phase==="大學";
    const titleP=amateur?.38:.85;
    const mvpP=amateur?.30:.76;
    const teamP=amateur?.38:.72;
    const leaderP=amateur?.28:.62;
    const defenseP=amateur?.24:.52;
    const rookieP=amateur?.28:.62;

    if(s.rank===1&&Math.random()<titleP)won.push(pool[1]);
    if(s.rating>=76&&Math.random()<mvpP)won.push(pool[0]);
    if(s.rating>=68&&Math.random()<teamP)won.push(pool[2]);
    if(s.pts>=18&&pool.includes("得分王")&&Math.random()<leaderP)won.push("得分王");
    if(s.ast>=5&&pool.includes("助攻王")&&Math.random()<leaderP)won.push("助攻王");
    if(s.reb>=8&&pool.includes("籃板王")&&Math.random()<leaderP)won.push("籃板王");
    if(s.rating>=74&&pool.includes("最佳防守球員")&&Math.random()<defenseP)won.push("最佳防守球員");
    if(G.year===1){
      const rookieAward=pool.find(a=>/新人|年度新人/.test(a));
      if(rookieAward&&s.rating>=70&&Math.random()<rookieP)won.push(rookieAward);
    }
  }
  won=[...new Set(won.filter(Boolean))];
  won.forEach(a=>{
    const exists=(G.awards||[]).some(x=>
      x.league===leagueName()&&x.award===a&&x.year===G.year&&x.age===ageNow()
    );
    if(!exists)G.awards.push({league:leagueName(),award:a,year:G.year,age:ageNow(),phase:G.phase});
  });
  if(won.length)addLog(`本季你獲得：<span class="delta">${won.join("、")}</span>。榮譽已加入籃球人生履歷。`,"award","聯賽獎項");
}
function calculateHOF(){G.hof=[];const leagues=[...new Set(G.awards.map(a=>a.league))];leagues.forEach(lg=>{let a=G.awards.filter(x=>x.league===lg),major=a.filter(x=>/MVP|最佳球員|最佳教練|總冠軍|MOP/.test(x.award)).length,seasons=G.seasons.filter(s=>s.league===lg).length,titles=G.seasons.filter(s=>s.league===lg&&s.rank===1).length;if(a.length>=5||major>=2||titles>=2&&seasons>=4)G.hof.push({league:lg,age:G.finalAge||ageNow(),reason:`生涯 ${seasons} 季、${a.length} 項獎項、重大榮譽 ${major} 項、冠軍 ${titles} 次`})})}

function reconcileAwardHistoryV584(){
  if(!G.awards)G.awards=[];
  if(!Array.isArray(G.logs))return 0;
  let added=0;

  G.logs.forEach(log=>{
    if(!log || log.title!=="獎項排名" || !log.table || !Array.isArray(log.table.rows))return;
    log.table.rows.forEach(row=>{
      if(!Array.isArray(row)||row.length<2)return;
      const award=String(row[0]||"").trim();
      const rankText=String(row[1]||"");
      if(!award || !/第\s*1\s*名/.test(rankText))return;

      const league=log.league||leagueName();
      const year=Number.isFinite(Number(log.year))?Number(log.year):G.year;
      const age=Number.isFinite(Number(log.age))?Number(log.age):ageNow();
      const phase=log.phase||G.phase;

      const exists=G.awards.some(a=>
        a.league===league &&
        a.award===award &&
        Number(a.year)===year &&
        Number(a.age)===age
      );
      if(!exists){
        G.awards.push({league,award,year,age,phase,source:"award-ranking"});
        added++;
      }
    });
  });
  if(added)save();
  return added;
}

function showAwards(){
 reconcileAwardHistoryV584();
 const coachWon=(G.awards||[]).filter(x=>x.phase==="教練");
 const coachSection=`<div class="resume-section"><h3>🏆 教練生涯獎項</h3><div>${COACH_AWARDS_V63.map(a=>`<span class="tag">${a}</span>`).join("")}</div><p>你的教練獎項：${coachWon.map(x=>`${x.award}｜${x.league}（${x.age}歲）`).join("、")||"尚無"}</p></div>`;
 let groups=Object.keys(LEAGUE_AWARDS).map(lg=>`<div class="resume-section"><h3>${lg}</h3><div>${LEAGUE_AWARDS[lg].map(a=>`<span class="tag">${a}</span>`).join("")}</div><p>你的已獲獎項：${G.awards.filter(x=>x.league===lg).map(x=>`${x.award}（${x.age}歲）`).join("、")||"尚無"}</p></div>`).join("");
 modal(`<h2>各聯賽獎項</h2><div class="resume">${coachSection}${groups}</div>`);
}
function showHallOfFame(){if(!G.careerEnded)return alert("各聯賽名人堂會在正式完全退役後才進行評選與公開。");let leagues=Object.keys(LEAGUE_AWARDS);modal(`<h2>各聯賽名人堂｜退役評選</h2><p>名人堂只在完全退役後依生涯獎項、重大榮譽、冠軍與效力年資評選一次。</p>${leagues.map(lg=>{let h=G.hof.find(x=>x.league===lg);return `<div class="resume-section"><h3>${lg}</h3>${h?`<span class="hof-badge">★ 正式入選名人堂</span><p>${h.reason}</p>`:`<p class="muted">本次退役評選未入選。</p>`}</div>`}).join("")}`)}
function position(){modal(`<h2>位置設定</h2><div class="form-grid"><label class="field">順序1<select id="p1">${POS.map(p=>`<option value="${p}" ${p===G.pos1?"selected":""}>${POSNAME[p]}</option>`).join("")}</select></label><label class="field">順序2<select id="p2">${POS.map(p=>`<option value="${p}" ${p===G.pos2?"selected":""}>${POSNAME[p]}</option>`).join("")}</select></label></div><br><button id="savePos">儲存</button>`);$("savePos").onclick=()=>{if($("p1").value===$("p2").value)return alert("位置不可相同。");G.pos1=$("p1").value;G.pos2=$("p2").value;closeModal();addLog(`你把位置偏好調整為 ${POSNAME[G.pos1]} → ${POSNAME[G.pos2]}。教練仍會依照能力與球隊需求決定實際上場位置。`,"event","位置調整")}}

const NBA_TRADE_LIMITS_V52={
  cap:164.961,
  tax:200.428,
  firstApron:209.015,
  secondApron:221.686
};

function nbaPlayerSalaryMV52(){
  if(G.contract&&G.proKey==="US"&&Number.isFinite(Number(G.contract.salary)))return Number(G.contract.salary);
  const a=avg();
  if(a<65)return 2.5;
  if(a<75)return 8;
  if(a<85)return 18;
  if(a<95)return 32;
  return 48;
}
function ensureNBATradeContractV52(){
  if(G.proKey!=="US")return;
  if(!G.contract||G.contract.league!=="美國職業聯盟"){
    const s=nbaPlayerSalaryMV52();
    G.contract={league:"美國職業聯盟",team:G.team,salary:s,salaryText:`US$${s.toFixed(2)}M / 年`,years:rnd(1,3),guarantee:"保障合約",role:avg()>=88?"核心球員":avg()>=76?"主要輪替":"輪替球員",signedYear:calendarYearV44(G.year)};
  }
}
function nbaSalaryMatchingMaxV52(outgoing,payroll){
  if(payroll<NBA_TRADE_LIMITS_V52.cap){
    return outgoing+(NBA_TRADE_LIMITS_V52.cap-payroll)+0.1;
  }
  if(payroll>=NBA_TRADE_LIMITS_V52.secondApron){
    return outgoing; // 二層稅線：遊戲採「不可接回高於送出薪資」簡化
  }
  if(payroll>=NBA_TRADE_LIMITS_V52.tax){
    return outgoing*1.25+0.1;
  }
  // 非繳稅球隊採現行薪資匹配概念做分段簡化
  if(outgoing<=7.5)return outgoing+7.5;
  if(outgoing<=29)return outgoing*1.75+0.1;
  return outgoing*1.25+0.1;
}
function nbaTradeProposalsV52(){
  ensureNBATradeContractV52();
  const salary=nbaPlayerSalaryMV52();
  const teams=makeProTeams("US").filter(t=>t!==G.team);
  const offers=[];
  teams.sort(()=>Math.random()-.5).slice(0,rnd(6,10)).forEach(team=>{
    const payroll=rnd(150000,225000)/1000;
    const apron=payroll>=NBA_TRADE_LIMITS_V52.secondApron?"第二層稅線":
      payroll>=NBA_TRADE_LIMITS_V52.firstApron?"第一層稅線":
      payroll>=NBA_TRADE_LIMITS_V52.tax?"豪華稅區":"一般區";

    // 二層稅線球隊不可用多份薪資聚合來換進球員，因此只生成單一主要合約。
    const outgoingCount=apron==="第二層稅線"?1:rnd(1,3);
    let outgoing=Math.max(1,rnd(Math.max(100,Math.round(salary*82)),Math.max(150,Math.round(salary*130)))/100);
    const maxIncoming=nbaSalaryMatchingMaxV52(outgoing,payroll);
    const salaryLegal=salary<=maxIncoming+0.001;
    const projected=payroll-outgoing+salary;
    const apronLegal=!(apron==="第二層稅線"&&projected>NBA_TRADE_LIMITS_V52.secondApron);
    const legal=salaryLegal&&apronLegal;

    let firsts=0,seconds=0;
    if(avg()>=92){firsts=rnd(1,3);seconds=rnd(0,2)}
    else if(avg()>=82){firsts=rnd(0,2);seconds=rnd(0,3)}
    else {firsts=rnd(0,1);seconds=rnd(0,2)}

    const pieces=[];
    for(let i=0;i<outgoingCount;i++)pieces.push(`匹配薪資球員${i+1}`);
    if(firsts)pieces.push(`${firsts}枚首輪籤`);
    if(seconds)pieces.push(`${seconds}枚次輪籤`);

    offers.push({team,payroll,apron,outgoing,maxIncoming,legal,firsts,seconds,pieces});
  });
  return offers.filter(x=>x.legal).slice(0,5);
}
function nbaTradeCardV52(o,i){
  return `<div class="offer nba-trade-card">
    <div class="market-offer-head"><div><span class="league-chip">美國職業聯盟交易提案</span><br><b>${o.team}</b></div><button data-nbatrade="${i}">同意交易</button></div>
    <div class="contract-grid">
      <span>你的合約</span><b>US$${nbaPlayerSalaryMV52().toFixed(2)}M / 年</b>
      <span>對方送出薪資</span><b>US$${o.outgoing.toFixed(2)}M</b>
      <span>可接回上限</span><b>US$${o.maxIncoming.toFixed(2)}M</b>
      <span>對方薪資狀態</span><b>${o.apron}</b>
      <span>交易資產</span><b>${o.pieces.join("、")||"球員交換"}</b>
    </div>
    <small>交易成立後你的原合約會跟著你到新球隊，不會因交易自動重簽。第二層稅線球隊在本遊戲中套用不可聚合多份薪資、不可接回高於送出薪資等限制。</small>
  </div>`;
}
function nbaTradeMarketV52(){
  ensureNBATradeContractV52();
  const offers=nbaTradeProposalsV52();
  if(!offers.length){
    modal(`<h2>美國職業聯盟交易市場</h2><p>目前沒有符合 聯盟薪資匹配與 apron 限制的交易提案。</p><p class="muted">你的原合約仍留在目前球隊；聯盟交易不是重新簽自由球員合約。</p>`);
    return;
  }
  modal(`<h2>美國職業聯盟球員交易</h2>
    <p>交易會依你的現有合約薪資、交易對手的球隊總薪資、薪資匹配與第一／第二層稅線限制判斷是否合法。</p>
    ${offers.map(nbaTradeCardV52).join("")}`);
  [...document.querySelectorAll("[data-nbatrade]")].forEach(b=>b.onclick=()=>{
    const o=offers[+b.dataset.nbatrade];if(!o)return;
    const old=G.team;
    G.team=o.team;
    if(G.contract){G.contract.team=o.team}
    recordTeamChangeV52(old,o.team,"nbaTrade");
    G.history.unshift(`${ageNow()}歲被美國職業聯盟球隊交易：${old} → ${o.team}。`);
    closeModal();
    addLog(`美國職業聯盟交易正式完成：<span class="delta">${old} → ${o.team}</span>。你的原合約（${G.contract?G.contract.salaryText:`US$${nbaPlayerSalaryMV52().toFixed(2)}M / 年`}）隨交易轉移到新球隊，不會因交易自動改薪。對方交易包裹包含：${o.pieces.join("、")||"球員交換"}。`,"success","NBA交易完成");
  });
}


function highSchoolTransferV835(){
  if(G.phase!=="高中")return;
  ensureTeamDatabaseV83();

  const currentDiv=G.hblDivision||"台灣高中甲級";
  const divisions=["台灣高中甲級","台灣高中乙級"];
  const allSchools=divisions.flatMap(div=>(G.teamDBV83[div]||[]).map(x=>({...x,division:div})))
    .filter(x=>x.team!==G.school && x.team!==G.team && x.team!==(G.school+"籃球隊"));

  const playerRating=Math.round((avg()+(G.stats["球商"]||50)*.25+(G.stats["人際關係"]||50)*.10));
  const offers=allSchools.map(s=>{
    const teamAvg=Math.round(s.roster.reduce((a,p)=>a+p.ovr,0)/s.roster.length);
    const divisionNeed=s.division==="台灣高中甲級"?66:54;
    const interest=clamp(Math.round(42+(playerRating-divisionNeed)*1.25+(G.stats["知名度"]||30)*.18+rnd(-12,12)),5,96);
    const role=playerRating>=teamAvg+10?"核心球員":playerRating>=teamAvg+3?"先發競爭":playerRating>=teamAvg-5?"主要輪替":"替補競爭";
    return {...s,teamAvg,interest,role};
  }).sort((a,b)=>b.interest-a.interest);

  modal(`<h2>🏫 高中轉校市場</h2>
    <p>高中階段的「交易」改為轉校／轉隊制度。你可以查看其他學校對你的興趣，再決定是否申請轉校。</p>
    <p class="muted">轉校成功率會參考你的能力、球商、知名度、對方球隊強度與角色需求。成功轉校會使用 1 次年度行動。</p>
    <div class="hs-transfer-list-v835">
    ${offers.map((o,i)=>`<div class="offer">
      <button data-hs-transfer-v835="${i}">申請轉校</button>
      <b>${o.team}</b>｜${o.division}<br>
      球隊平均 ${o.teamAvg}｜預估角色：${o.role}｜學校興趣 ${o.interest}%
    </div>`).join("")}
    </div>`);

  document.querySelectorAll("[data-hs-transfer-v835]").forEach(b=>b.onclick=()=>{
    const o=offers[+b.dataset.hsTransferV835]; if(!o)return;
    const eq=(G.stats["情商"]||30);
    const rel=(G.stats["人際關係"]||30);
    const successChance=clamp(Math.round(o.interest+eq*.08+rel*.06+rnd(-8,8)),5,95);
    closeModal();

    if(Math.random()*100<successChance){
      const old=G.school||G.team;
      G.school=o.team;
      G.team=o.team+"籃球隊";
      G.hblDivision=o.division;
      addLog(`你提出轉校申請並獲得 ${o.team} 接受，從 ${old} 轉往 <span class="delta">${o.team}</span>。新球隊預估角色為「${o.role}」。`,"success","高中轉校成功");
      if(typeof publishMediaV82==="function")publishMediaV82(`${G.name} 高中階段完成轉校，從 ${old} 轉往 ${o.team}，新環境與上場角色成為球迷討論焦點。`,"高中轉校");
      G.history.unshift(`${ageNow()}歲高中轉校：${old} → ${o.team}（${o.division}）。`);
    }else{
      addLog(`${o.team} 評估後暫時沒有接受你的轉校申請。你的球員能力與對方陣容需求仍有差距。`,"event","高中轉校未成功");
    }
    actionDone(); save(); render();
  });
}

function highSchoolTeamBrowserV835(){
  const div=G.hblDivision||"台灣高中甲級";
  teamBrowserV83(div,0);
}

function trade(){
  if(G.phase==="教練"){
    return coachJobMarketV587();
  }
  if(G.phase==="高中"){
    return highSchoolTransferV835();
  }
  if(G.phase!=="職業"){
    return addLog("目前階段沒有正式職業球員交易市場，球隊異動仍需透過升學、選秀或職涯事件發生。","event","交易市場");
  }

  if((G.proKey||"US")==="US"){
    return nbaTradeMarketV52();
  }

  const offers=marketOffersV49("trade").filter(o=>o.key!=="US");
  if(!offers.length){
    modal(`<h2>交易 / 球隊邀請</h2><p>目前沒有其他職業聯賽球隊提出正式邀請。</p>`);
    return;
  }

  const grouped=["TW","JP","KR"].map(key=>{
    const list=offers.filter(o=>o.key===key);
    if(!list.length)return "";
    return `<div class="market-league-section"><h3>${CONTRACT_RULES[key].league}｜${list.length} 支球隊有意</h3>
      ${list.map(o=>contractCardV49(o,offers.indexOf(o),"接受合約")).join("")}</div>`;
  }).join("");

  modal(`<h2>職業球隊異動 / 合約邀請</h2>
    <p>其他職業聯賽沿用合約邀請制度；美國職業聯盟球員交易則另外套用 聯盟薪資匹配與 apron 規則。</p>${grouped}`);

  [...document.querySelectorAll("[data-market]")].forEach(b=>{
    b.onclick=()=>{const o=offers[+b.dataset.market];if(o)acceptMarketOfferV49(o,"球隊異動")};
  });
}
function collegeOffers(){
 G.phase="大學";G.year=1;G.actions=0;G.leagueUsed=false;
 const a=avg();
 const offers=[...collegeTW,...collegeUS].sort(()=>Math.random()-.5).slice(0,7).map(n=>{
   const us=collegeUS.includes(n);
   let division="台灣大專聯賽",need=50;
   if(us){
     const roll=a+rnd(-8,8);
     division=roll>=72?"美國大學一級聯賽":roll>=61?"美國大學二級聯賽":"美國大學三級聯賽";
     need=division==="美國大學一級聯賽"?68:division==="美國大學二級聯賽"?58:50;
   }
   return {n,us,division,
     champ:clamp(Math.round(20+(a-need)*1.1+rnd(-8,8)),3,80),
     play:clamp(Math.round((a/need)*58+rnd(-12,10)),5,98),
     sch:rnd(us?12:6,us?40:20)};
 });
 modal(`<h2>高中畢業｜大學 Offer</h2><p>美國大學依實力分為 美國大學三級聯賽、美國大學二級聯賽、美國大學一級聯賽；美國大學一級聯賽 強度最高。</p>
 ${offers.map((o,i)=>`<div class="offer"><button data-c="${i}">選擇</button><b>${o.n}</b> ${o.us?"🇺🇸":"🇹🇼"}<br>${o.division}｜奪冠機率 ${o.champ}%｜上場機率 ${o.play}%｜獎學金 ${o.sch}萬/年</div>`).join("")}`);
 [...document.querySelectorAll("[data-c]")].forEach((b,i)=>b.onclick=()=>{
   const o=offers[i];G.school=o.n;G.team=o.n+"籃球隊";G.collegeDivision=o.division;
   G.history.unshift(`高中畢業，進入 ${o.n}（${o.division}）。`);
   closeModal();addLog(`你接受 ${o.n} 的 Offer，正式進入 <span class="delta">${o.division}</span>。`,"success","升學結果");
 });
}
function proChoice(){
 modal(`<h2>大學畢業｜職業選擇</h2>
 <p>各聯賽強度、賽程與薪資層級依近期現實制度模擬。</p>
 <div class="choices">
   <button class="choice" id="d">美國職業聯盟選秀</button>
   <button class="choice" data-pro="GL">美國發展聯盟</button>
   <button class="choice" data-pro="CN">中國C聯盟</button>
   <button class="choice" data-pro="JP">日本B聯盟</button>
   <button class="choice" data-pro="KR">韓國K聯盟</button>
   <button class="choice" data-pro="TP">台灣T聯盟</button>
   <button class="choice" data-pro="PL">台灣P聯盟</button>
   <button class="choice" data-pro="SBL">台灣S聯盟</button>
 </div>`);
 $("d").onclick=draft;
 [...document.querySelectorAll("[data-pro]")].forEach(b=>b.onclick=()=>enterPro(b.dataset.pro));
}
function enterPro(key){
 G.phase="職業";G.year=1;G.actions=0;G.leagueUsed=false;G.proKey=key;
 G.proLeague=PRO_DEF[key].league;G.team=pick(makeProTeams(key));
 G.secondLeague=SECOND_TEAM_LEAGUE[key]||`${G.proLeague}二隊`;
 G.secondTeam=key==="GL"?G.team:`${G.team}二隊`;
 G.squadLevel=(key!=="GL"&&avg()<LEAGUE_CONFIG[G.proLeague].difficulty-5)?"二隊":"一隊";
 closeModal();
 G.history.unshift(`進入 ${G.proLeague}，加入 ${G.team}${G.squadLevel==="二隊"?"二隊":""}。`);
 addLog(`你選擇加入 ${G.proLeague}，球隊為 <span class="delta">${G.team}</span>。聯盟共有 ${PRO_DEF[key].count} 支球隊，例行/正式賽季基準 ${LEAGUE_CONFIG[G.proLeague].games} 場。${G.squadLevel==="二隊"?`目前先從 ${G.secondLeague}／${G.secondTeam} 培養。`:""}`,"success","進入職業");
}
function draft(){
 const rank=clamp(Math.round(65-(avg()+G.stats["球商"]*.2+G.stats["知名度"]*.1)+rnd(-8,8)),1,60);
 G.phase="職業";G.year=1;G.actions=0;G.leagueUsed=false;G.proKey="US";G.proLeague="美國職業聯盟";
 const teams=makeProTeams("US");G.team=teams[(rank-1)%teams.length];
 G.secondLeague="美國發展聯盟";G.secondTeam=`${G.team} 美國發展聯盟附屬隊`;
 G.squadLevel=(rank>45||avg()<72)?"二隊":"一隊";
 closeModal();
 G.history.unshift(`美國職業聯盟選秀第${rank}順位，加入 ${G.team}。`);
 addLog(`選秀夜揭曉：你在第 <span class="delta">${rank}</span> 順位被選中，加入 ${G.team}。美國職業聯盟共有30支球隊；${G.squadLevel==="二隊"?`球團先安排你到 <span class="delta">美國發展聯盟</span> 培養。`:"你直接進入一隊名單。"}`,"success","選秀結果");
}
function meeting(){
  if(G.phase!=="職業"){
    return addLog("只有職業球員時期可以與其他職業聯賽球隊進行正式私下會面。","event","球隊會面");
  }

  const offers=marketOffersV49("meeting");
  if(!offers.length){
    modal(`<h2>球隊私下會面</h2>
      <p>經紀團隊本次沒有收到任何職業球隊的正式會面邀請。</p>
      <p class="muted">這代表目前沒有球隊願意進入合約談判，並非一定每次都會有報價。</p>`);
    return;
  }

  const grouped=["US","GL","CN","JP","KR","TP","PL","SBL"].map(key=>{
    const list=offers.filter(o=>o.key===key);
    if(!list.length)return "";
    return `<div class="market-league-section"><h3>${CONTRACT_RULES[key].league}｜${list.length} 支球隊邀請會面</h3>
      ${list.map(o=>contractCardV49(o,offers.indexOf(o),"進行會面")).join("")}</div>`;
  }).join("");

  modal(`<h2>球隊私下會面</h2>
    <p>你可以查看不同國家聯賽的球隊報價，再決定與哪一支球隊談判。會面不保證一定簽約。</p>
    ${grouped}`);

  [...document.querySelectorAll("[data-market]")].forEach(b=>{
    b.onclick=()=>{
      const o=offers[+b.dataset.market];
      if(!o)return;

      const negotiation=clamp(
        Math.round(o.interest + (G.stats["情商"]||30)*.28 + rnd(-10,12)),
        10,99
      );
      const ok=Math.random()*100<negotiation;

      if(ok){
        acceptMarketOfferV49(o,"會面");
      }else{
        closeModal();
        addLog(`你與 ${o.team} 進行會面，對方原先提出 ${o.years} 年、${moneyTextV49(o.key,o.salary)} 的合約框架，但談判後雙方未能達成協議。`,"event","會面未簽約");
      }
    };
  });
}
function retire(){modal(`<h2>確認退役</h2><p>是否結束球員生涯？你可以完全退役，或轉任教練。</p><button id="coachR">退役後執教</button> <button id="fullR">完全退役</button> <button id="cancelR">取消</button>`);$("cancelR").onclick=closeModal;$("coachR").onclick=startCoach;$("fullR").onclick=fullRetire}
function startCoach(){
  try{
    const fit=Math.round(((G.stats["人際關係"]||0)+(G.stats["情商"]||0)+(G.stats["球商"]||0))/3);
    G.coachStartAge=ageNow();
    G.phase="教練";
    G.year=1;
    G.actions=0;
    G.leagueUsed=false;

    // V8.3.2：舊版仍殘留 TW key，但目前聯賽代碼已改成 TP。
    // 這會讓 PRO_DEF["TW"] 為 undefined，導致按下「退役後執教」沒有反應。
    let key="TP";
    if(fit>=82)key="US";
    else if(fit>=68)key=Math.random()<.55?"JP":"KR";
    else if(fit>=55)key=Math.random()<.6?"TP":"KR";

    if(!PRO_DEF[key])key="TP";
    G.proKey=key;
    G.coachLeague=(CONTRACT_RULES[key]&&CONTRACT_RULES[key].league) || (PRO_DEF[key]&&PRO_DEF[key].league) || "台灣T聯盟";
    const coachTeams=makeProTeams(key);
    G.team=(coachTeams&&coachTeams.length)?pick(coachTeams):"台北戰神";

    const leagueMult={US:2.2,JP:1.45,KR:1.3,TP:1,CN:1.25,PL:.95,SBL:.75,GL:1.15}[key]||1;
    G.coachSalaryTWD=Math.max(
      600000,
      Math.round((1200000+fit*90000+rnd(-300000,500000))*leagueMult/10000)*10000
    );

    ensureCoachSimpleV81();
    closeModal();
    G.history.unshift(`${G.coachStartAge}歲結束球員生涯，開始執教 ${G.coachLeague} 的 ${G.team}。`);
    addLog(`你正式結束球員生涯，受聘於 <span class="delta">${G.coachLeague}｜${G.team}</span>。教練年薪約 NT$${G.coachSalaryTWD.toLocaleString()}。教練聯賽勝率只使用球商、隊員能力與戰術組合判定；人際關係影響球員關係，情商影響招募與談判。`,"coach","退役後執教");
    save();
    render();
    setTimeout(()=>{ if(typeof coachDashboardV81==="function" && G.phase==="教練") coachDashboardV81(); },50);
  }catch(err){
    console.error("退役後執教錯誤",err);
    // 若初始化意外失敗，避免畫面完全無反應。
    G.phase="職業";
    closeModal();
    modal(`<h2>教練模式初始化失敗</h2><p>系統已保留你的球員狀態，請重新嘗試。錯誤已被攔截，不會破壞存檔。</p>`);
  }
}
function canComebackV65(){
  return BASE.some(stat=>(G.stats[stat]||0)>0);
}

function comeback(){
  if(G.phase!=="教練")return;

  if(!canComebackV65()){
    modal(`<h2>無法再復出</h2>
      <p>你的運球、彈跳、投籃、傳球、籃板已經全部降至 <b>0</b>。</p>
      <p>球員能力完全歸零後，正式結束所有球員復出的可能，只能繼續教練生涯或完全退役。</p>`);
    return;
  }

  const ability=avg();
  const age=ageNow();
  const leagueCfg={
    US:{label:"美國職業聯盟",difficulty:96},GL:{label:"美國發展聯盟",difficulty:84},
    CN:{label:"中國C聯盟",difficulty:83},JP:{label:"日本B聯盟",difficulty:86},
    KR:{label:"韓國K聯盟",difficulty:82},TP:{label:"台灣T聯盟",difficulty:76},
    PL:{label:"台灣P聯盟",difficulty:74},SBL:{label:"台灣S聯盟",difficulty:66}
  };

  modal(`<h2>選擇復出聯賽</h2>
    <p>你可以自由選擇想復出的聯賽，再挑選想去的球隊。是否能加入仍要看對方球隊是否有意願。</p>
    <div class="offer">
      <b>目前復出能力</b><br>
      運球 ${G.stats["運球"]}｜彈跳 ${G.stats["彈跳"]}｜投籃 ${G.stats["投籃"]}｜傳球 ${G.stats["傳球"]}｜籃板 ${G.stats["籃板"]}<br>
      五項平均：${Math.round(avg())}<br>
      <span class="muted">教練時期每完成一年，以上五項能力各 -2。只要五項能力尚未全部歸零，就可以繼續申請復出；能力越低只會降低球隊意願與試訓成功率。五項全部為 0 時才永久無法復出。</span>
    </div>
    <div class="choices">
      ${Object.entries(leagueCfg).map(([key,cfg])=>`
        <button class="choice" data-comeback-league="${key}">
          <b>${cfg.label}</b>
          <small>目前能力平均 ${Math.round(ability)}｜競爭強度 ${cfg.difficulty}</small>
        </button>`).join("")}
    </div>`);

  [...document.querySelectorAll("[data-comeback-league]")].forEach(btn=>btn.onclick=()=>{
    const key=btn.dataset.comebackLeague;
    const cfg=leagueCfg[key];
    const teams=makeProTeams(key);

    // 每支球隊各自判定意願，玩家仍可看到全部隊伍。
    const offers=teams.map(team=>{
      const agePenalty=Math.max(0,age-35)*1.8;
      const fame=(G.stats["知名度"]||30)*.12;
      const iq=(G.stats["球商"]||30)*.08;
      const base=42+(ability-cfg.difficulty)*1.75+fame+iq-agePenalty+rnd(-14,14);
      // 不論能力多少，只要五項能力尚未全部歸零，就保留至少 8% 的球隊試訓意願。
      const interest=clamp(Math.round(base),8,96);
      return {
        team,
        interest,
        willing:Math.random()*100<interest
      };
    });

    modal(`<h2>${cfg.label}｜選擇想去的球隊</h2>
      <p>你可以自由挑選任何球隊申請試訓。球隊若主動有意願，錄取機率較高；沒有主動邀請仍可自行爭取試訓。</p>
      <div class="comeback-team-list">
        ${offers.map((o,i)=>`<div class="offer comeback-team-card">
          <button data-comeback-team="${i}">
            ${o.willing?"參加試訓":"主動申請試訓"}
          </button>
          <b>${o.team}</b><br>
          球隊意願：${o.willing?`有意願（${o.interest}%）`:`未主動邀請（${o.interest}%）`}
        </div>`).join("")}
      </div>
      <button id="backComebackLeague">返回選聯賽</button>`);

    $("backComebackLeague").onclick=comeback;

    [...document.querySelectorAll("[data-comeback-team]")].forEach(b=>b.onclick=()=>{
      const o=offers[+b.dataset.comebackTeam];
      if(!o)return;

      // 任何非全零能力都可以申請復出；能力低、年齡高或球隊未主動邀請時，
      // 只會讓錄取率降低，不會禁止玩家嘗試。
      let trialBase=
        28+(ability-cfg.difficulty)*2.1+
        (G.stats["球商"]||30)*.12+
        (G.stats["知名度"]||30)*.08-
        Math.max(0,age-35)*2+
        rnd(-8,8);

      if(!o.willing)trialBase-=12;
      const trialChance=clamp(Math.round(trialBase),1,95);
      const ok=Math.random()*100<trialChance;

      if(!ok){
        closeModal();
        addLog(`你選擇前往 ${cfg.label} 的 ${o.team} 試訓。球隊原本有意願，但正式試訓後評估未通過，因此你繼續教練生涯。`,"event","復出試訓失敗");
        return;
      }

      G.phase="職業";
      G.year=1;
      G.actions=0;
      G.leagueUsed=false;
      G.proKey=key;
      G.proLeague=cfg.label;
      G.team=o.team;
      G.coachSalaryTWD=null;

      const contract=contractOfferV49(key,o.team,"comeback");
      G.contract={
        league:cfg.label,
        team:o.team,
        salary:contract.salary,
        salaryText:moneyTextV49(key,contract.salary),
        years:contract.years,
        guarantee:contract.guarantee,
        role:contract.role,
        signedYear:calendarYearV44(G.year)
      };

      closeModal();
      G.history.unshift(`${ageNow()}歲成功復出，加入 ${cfg.label} 的 ${o.team}。`);
      addLog(`你自由選擇 ${cfg.label} 的 ${o.team} 進行試訓，最終成功通過並正式復出。合約：${G.contract.years} 年、${G.contract.salaryText}、${G.contract.guarantee}，預計角色為 ${G.contract.role}。`,"success","復出成功");
    });
  });
}
function fullRetire(){if(!confirm("完全退役後，籃球人生將正式結束。名人堂會在此刻一次進行正式評選。確定嗎？"))return;G.finalAge=ageNow();G.careerEnded=true;G.phase="完全退役";G.actions=MAX_ACTIONS;G.history.unshift(`${G.finalAge}歲完全退役，籃球人生結束。`);calculateHOF();closeModal();addLog(`你在 ${G.finalAge} 歲正式完全退役。遊戲結束，系統已完成各聯賽名人堂最終評選，並產生完整籃球人生履歷。`,"retire","完全退役｜遊戲結束");save();render();showResume()}
function resumeHTML(){let playerSeasons=G.seasons.filter(s=>!s.coach),coachSeasons=G.seasons.filter(s=>s.coach),titles=G.awards.filter(a=>/MVP|MOP|最佳球員|最佳教練|總冠軍/.test(a.award));return `<div class="resume"><div class="resume-section"><h3>🏀 基本資料</h3><div class="resume-grid"><div>姓名：${G.name}</div><div>最終年齡：${G.finalAge||ageNow()}歲</div><div>身高 / 體重：${G.height}cm / ${G.weight}kg</div><div>位置：${POSNAME[G.pos1]} / ${POSNAME[G.pos2]}</div><div>球衣：#${G.number}</div><div>慣用手：${G.hand}</div><div>累積財富：${wealthTextV50()}</div><div>球員標籤：${playerTagsV52().map(t=>t.name).join("、")}</div></div></div><div class="resume-section"><h3>📊 生涯總覽</h3><div class="resume-grid"><div>球員聯賽季數：${playerSeasons.length}</div><div>教練帶隊季數：${coachSeasons.length}</div><div>累積獎項：${G.awards.length}</div><div>重大榮譽：${titles.length}</div><div>名人堂：${G.hof.length} 個聯賽</div><div>最終球隊：${G.team||"—"}</div></div></div><div class="resume-section"><h3>🏆 生涯獎項</h3><p>${G.awards.map(a=>`${a.age}歲｜${a.league}｜${a.award}`).join("<br>")||"生涯沒有獲得正式獎項。"}</p></div><div class="resume-section"><h3>⭐ 退役後名人堂評選</h3><p>${G.hof.map(h=>`<span class="hof-badge">${h.league}</span> ${h.reason}<br>`).join("")||"本次正式退役評選未入選任何聯賽名人堂。"}</p></div><div class="resume-section"><h3>📋 歷季成績</h3><p>${G.seasons.map(s=>`${s.age}歲｜${s.league}｜${s.team}｜${s.wins}勝${s.losses}敗｜第${s.rank}名｜季前：${s.pre}／季後：${s.post}${s.played===false?"｜未出賽":""}`).join("<br>")||"尚無聯賽紀錄。"}</p></div><div class="resume-section"><h3>📝 籃球人生時間線</h3><p>${G.history.slice().reverse().join("<br>")}</p></div></div>`}
function showResume(){modal(`<h2>籃球人生履歷</h2>${resumeHTML()}`);if(G.careerEnded&&!G.resumePosted){G.resumePosted=true;G.logs.unshift({type:"retire",title:"籃球人生履歷",text:`<b>${G.name}</b> 的籃球人生正式結束。球員聯賽 ${G.seasons.filter(s=>!s.coach).length} 季、教練帶隊 ${G.seasons.filter(s=>s.coach).length} 季、累積 ${G.awards.length} 項獎項、正式入選 ${G.hof.length} 個聯賽名人堂。`,year:G.year,age:G.finalAge||ageNow(),league:"生涯結算"});G.logs=G.logs.slice(0,60);save();render()}}
function randomStory(){
  const e=pick(EVENTS);
  const story=`${e.t}。這件事情發生在球隊日常裡，看似只是一次普通選擇，卻可能影響隊友信任、教練評價、媒體觀感與你未來的發展。你需要在有限時間內做出決定，而且結果未必完全符合預期。`;
  modal(`<h2>隨機劇情</h2><p>${story}</p><div class="choices">${e.o.map((x,i)=>`<button class="choice" data-ev="${i}">${x}</button>`).join("")}</div>`);
  [...document.querySelectorAll("[data-ev]")].forEach((b,i)=>b.onclick=()=>{
    try{
      let total=rnd(1,10),keys=[...new Set(e.r)],parts=[];
      keys.forEach((k,j)=>{
        let v=j===keys.length-1?total:rnd(0,total);
        total-=v;
        const cap=(G.max&&Number.isFinite(G.max[k]))?G.max[k]:100;
        G.stats[k]=clamp((G.stats[k]||0)+v,0,cap);
        parts.push(`${k}+${v}`);
      });
      closeModal();
      addLog(`事件「${e.t}」中，你選擇「${e.o[i]}」。事情經過一段時間後逐漸平息，你的處理方式被隊友與教練記住，也改變了未來互動方式。<br><span class="delta">${parts.join("、")}</span>`,"event","事件卡｜選擇結果");
      save();
      render();
    }catch(err){
      console.error("隨機事件錯誤",err);
      closeModal();
      addLog(`本次隨機事件發生資料錯誤，系統已自動略過並保留你的進度。`,"event","事件系統自動修復");
    }
  });
}

$("restartBtn").onclick=()=>{if(confirm("確定刪除目前存檔並重新開始？")){localStorage.removeItem("basketballLifeSave");G=null;setup()}};
function applyThemeV843(theme){
  if(!G)return;
  const map={
    "theme-sport":"theme-sport",
    "theme-court":"theme-court",
    "theme-neon":"theme-neon",
    "theme-paper":"theme-paper"
  };
  if(!map[theme])return;
  G.theme=map[theme];
  const fullMap={
    "theme-sport":"court",
    "theme-court":"wood",
    "theme-neon":"neon",
    "theme-paper":"paper"
  };
  try{localStorage.setItem("basketballLifeTheme",fullMap[G.theme]);}catch(e){}
  save();
  render();
  setTimeout(()=>{try{applyFullThemeV859(fullMap[G.theme])}catch(e){console.warn(e)}},0);
}
$("styleBtn").onclick=()=>modal(`<h2>面板風格</h2><div class="choices">${[
 ["theme-sport","🏀 球場綠"],["theme-court","🔥 木地板"],
 ["theme-neon","🌌 霓虹"],["theme-paper","📋 報紙卡片"]
].map(x=>`<button type="button" class="choice theme-choice-v843" data-theme="${x[0]}">${x[1]}${G&&G.theme===x[0]?" ✓":""}</button>`).join("")}</div>`);
document.addEventListener("click",function(e){
  const btn=e.target.closest&&e.target.closest(".theme-choice-v843");
  if(!btn)return;
  e.preventDefault();
  e.stopPropagation();
  const theme=btn.getAttribute("data-theme");
  closeModal();
  applyThemeV843(theme);
});
applyReferenceScaleV594();if(!load())setup();else render();
})();


function patchAwardYearsV856(){
  const year=Number(G.year||new Date().getFullYear());
  const awardWords=["新人王","年度最佳球員","MVP","最佳第六人","最佳防守球員","最佳進步球員","得分王","籃板王","助攻王","抄截王","阻攻王","最佳陣容","最佳防守陣容","明星賽","總決賽MVP","冠軍"];
  document.querySelectorAll('[data-award],.award,.award-card,.award-item,.career-award,.honor-item').forEach(el=>{
    if(el.children.length===0){
      const t=el.textContent.trim();
      if(awardWords.some(w=>t.includes(w)) && !/^\d{4}\s*年?\s*/.test(t)) el.textContent=`${year} ${t}`;
    }
  });
}


document.addEventListener("DOMContentLoaded",()=>{
  normalizeAwardHistoryV856();
  setTimeout(patchAwardYearsV856,0);
});


/* V8.8.5：完整主題套用與即時重繪 */
function applyFullThemeV859(theme){
  try{
    const allowed=["court","wood","neon","paper"];
    const t=allowed.includes(theme)?theme:"paper";
    if(document.body)document.body.setAttribute("data-theme",t);
    if(document.documentElement)document.documentElement.setAttribute("data-theme",t);
    try{localStorage.setItem("basketballLifeTheme",t)}catch(e){}
  }catch(e){
    console.warn("Theme apply skipped:",e);
  }
}
document.addEventListener("DOMContentLoaded",()=>{
  let t="paper";
  try{t=localStorage.getItem("basketballLifeTheme")||document.body.dataset.theme||"paper"}catch(e){}
  applyFullThemeV859(t);
});

document.addEventListener("click",(e)=>{
 const b=e.target.closest("button");
 if(!b)return;
 const txt=(b.textContent||"").trim();
 const map={"🏀 球場綠":"court","🔥 木地板":"wood","🌌 霓虹":"neon","📰 報紙卡片":"paper",
            "球場綠":"court","木地板":"wood","霓虹":"neon","報紙卡片":"paper"};
 for(const [k,v] of Object.entries(map)){
   if(txt.startsWith(k)){setTimeout(()=>applyFullThemeV859(v),0);break;}
 }
},true);

(function(){
  function mobileCanvasFixV882(){
    if(window.matchMedia("(max-width: 900px)").matches){
      document.documentElement.style.setProperty("--reference-scale","1");
      document.documentElement.style.setProperty("--reference-offset-x","0px");
      document.documentElement.style.setProperty("--reference-offset-y","0px");
    }
  }
  window.addEventListener("resize",mobileCanvasFixV882,{passive:true});
  window.addEventListener("orientationchange",()=>setTimeout(mobileCanvasFixV882,80),{passive:true});
  document.addEventListener("DOMContentLoaded",mobileCanvasFixV882);
  setTimeout(mobileCanvasFixV882,0);
})();


/* ================= V8.8.5 手機導覽 ================= */
(function mobileUiV883(){
  function isMobile(){return window.matchMedia && window.matchMedia("(max-width:900px)").matches}

  function scrollToTarget(id){
    const el=document.getElementById(id);
    if(!el)return;
    const card=el.closest(".card,.mini,.result-section,.teammate-inline-section")||el;
    card.scrollIntoView({behavior:"smooth",block:"start"});
  }

  document.addEventListener("click",function(e){
    const nav=e.target.closest("[data-mobile-target-v883]");
    if(nav&&isMobile()){
      scrollToTarget(nav.getAttribute("data-mobile-target-v883"));
      document.querySelectorAll("[data-mobile-target-v883]").forEach(x=>x.classList.remove("active"));
      nav.classList.add("active");
      return;
    }

    const menuBtn=e.target.closest("#mobileMenuBtnV883");
    if(menuBtn&&isMobile()){
      const q=document.getElementById("mobileQuickMenuV883");
      if(q)q.classList.toggle("hidden");
      return;
    }

    if(e.target.closest("#mobileCloseV883")){
      const q=document.getElementById("mobileQuickMenuV883");
      if(q)q.classList.add("hidden");
      return;
    }

    if(e.target.closest("#mobileStyleV883")){
      const q=document.getElementById("mobileQuickMenuV883");
      if(q)q.classList.add("hidden");
      const b=document.getElementById("styleBtn");
      if(b)b.click();
      return;
    }

    if(e.target.closest("#mobileRestartV883")){
      const q=document.getElementById("mobileQuickMenuV883");
      if(q)q.classList.add("hidden");
      const b=document.getElementById("restartBtn");
      if(b)b.click();
      return;
    }
  });
})();

/* V8.8.5 手機底部導覽固定與選取狀態 */
(function(){document.addEventListener('click',function(e){const btn=e.target.closest('[data-mobile-target-v883]');if(!btn)return;document.querySelectorAll('[data-mobile-target-v883]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');});})();
