/* Learning-island subject names — Pebble Island */
(function(){
"use strict";
const subjects={
 words:["English","Spelling"],read:["English","Reading"],
 think:["English","Clues & comprehension"],nums:["Maths","Numbers"],
 pv:["Maths","Place value"],times:["Maths","Times tables"],
 frac:["Maths","Fractions"],shapes:["Maths","Shapes & patterns"],
 time:["Maths","Time"],money:["Maths","Money"],
 data:["Maths","Graphs & data"],sci:["Science","Living things & forces"],
 geo:["HASS","Geography"],hist:["HASS","History"],
 feel:["Health & PE","Feelings & wellbeing"],
 review:["Review","All subjects"],mix:["Mixed practice","All subjects"],
 sail:["Health & PE","Movement"],sailing:["Health & PE","Movement"]
};
const zones={home:"Home",math:"Maths",reading:"English",cave:"Discovery",treasure:"Rewards"};
const st=document.createElement("style");st.textContent=[
 '#app .world .pi-subject{display:block;width:max-content;max-width:100%;margin:8px 0 6px;padding:5px 9px;background:#fff9de!important;border:1px solid #fff7ec;border-radius:11px;color:#173a4e!important;font:800 clamp(.72rem,1.6vw,.86rem)/1.25 var(--display,system-ui)!important;white-space:normal;overflow-wrap:anywhere;text-shadow:none!important;box-shadow:0 2px 0 #1d516b44}',
 '#app .pi-landmark-label .pi-zone-subject{display:block;font-size:.70em;line-height:1.2;margin-top:2px;color:#fff!important;-webkit-text-fill-color:#fff!important}',
 '@media(max-width:500px){#app .world .pi-subject{font-size:.73rem!important;margin:5px 0;padding:5px 7px}#app .pi-landmark-label .pi-zone-subject{font-size:.64em}}'
].join("\n");document.head.appendChild(st);
function annotate(){
 const app=document.getElementById("app");if(!app)return;
 for(const card of app.querySelectorAll(".world[data-w]")){
  const m=subjects[card.dataset.w],heading=card.querySelector("b");
  if(!m||!heading||heading.querySelector(".pi-subject"))continue;
  const label=document.createElement("span");label.className="pi-subject";
  label.textContent="("+m[0]+" · "+m[1]+")";heading.append(label);
 }
 for(const btn of app.querySelectorAll(".pi-landmark[data-zone]")){
  const m=zones[btn.dataset.zone],label=btn.querySelector(".pi-landmark-label");
  if(!m||!label||label.querySelector(".pi-zone-subject"))continue;
  const tag=document.createElement("span");tag.className="pi-zone-subject";
  tag.textContent="("+m+")";label.append(tag);
 }
}
if(typeof map==="function"){const old=map;map=function(){const result=old.apply(this,arguments);annotate();return result}}
annotate();
window.PEBBLE_SUBJECTS={version:1,subjects,annotate};
})();