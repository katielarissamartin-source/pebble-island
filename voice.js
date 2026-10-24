(function(){
const st=S.settings;
const rank=v=>{let s=0;const n=v.name;
  if(/natural|neural|online/i.test(n))s+=40;if(/enhanced|premium/i.test(n))s+=30;if(/google/i.test(n))s+=18;if(/samsung|sfx/i.test(n))s+=12;
  if(/en[-_]AU/i.test(v.lang))s+=10;else if(/en[-_](GB|NZ|IE)/i.test(v.lang))s+=7;else if(/en[-_]US/i.test(v.lang))s+=4;
  if(/natasha|karen|catherine|libby|sonia|serena|samantha|female|jenny|aria/i.test(n))s+=6;
  if(/compact|novelty|whisper|bells|zarvox|trinoids|albert|bad news|bahh|boing|bubbles|cellos|jester|organ|superstar|wobble|grandma|grandpa|rocko|shelley|flo|eddy|reed|sandy/i.test(n))s-=60;
  if(v.localService===false)s+=3;return s};
const list=()=>window.speechSynthesis?speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang)).sort((a,b)=>rank(b)-rank(a)):[];
function pickV(){const vs=list();if(!vs.length)return;VOICE=(st.voiceName&&vs.find(v=>v.name===st.voiceName))||vs[0]}
if(window.speechSynthesis){pickV();speechSynthesis.addEventListener&&speechSynthesis.addEventListener("voiceschanged",pickV);setTimeout(pickV,800)}
const calmText=t=>String(t)
  .replace(/\p{Extended_Pictographic}|️|‍/gu,"")
  .replace(/\b(Woohoo|Boom|Ka-pow|Whoa|Wheee|Ooh|Yay|Boop)!?\s*/gi,"")
  .replace(/!+/g,".").replace(/\.\s*\./g,".").replace(/\s+/g," ").trim();

speak=function(t,mood){if(!st.voice||!window.speechSynthesis)return;try{speechSynthesis.cancel();
  const text=calmText(t);if(!text)return;
  const parts=text.match(/[^.?]+[.?]?/g)||[text];
  const r=(st.voiceRate||.92)*(mood==="soft"?.94:1),p=mood==="happy"?1.06:1.0;
  parts.forEach((s,i)=>{const u=new SpeechSynthesisUtterance(s.trim());if(VOICE){u.voice=VOICE;u.lang=VOICE.lang}else u.lang="en-AU";u.rate=r;u.pitch=p;u.volume=.95;
    const b=$("#say");if(b&&i===0)b.classList.add("talking");if(b&&i===parts.length-1)u.onend=u.onerror=()=>b.classList.remove("talking");speechSynthesis.speak(u)})}catch(e){}};
const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;const vs=list();
  const row=document.createElement("div");row.className="prow";
  row.innerHTML=`<span>Reading voice (best ones are listed first: “Natural”, “Enhanced” or Google voices sound most human)</span><span style="display:flex;gap:6px;flex-wrap:wrap"><select id="vsel" style="font:inherit;padding:8px;border-radius:10px;max-width:280px">${vs.slice(0,25).map(v=>`<option value="${v.name}" ${VOICE&&VOICE.name===v.name?"selected":""}>${v.name.replace(/Microsoft |Google /,"")} (${v.lang})</option>`).join("")||"<option>Default</option>"}</select>
   <select id="vrate" style="font:inherit;padding:8px;border-radius:10px">${[[.8,"Slow"],[.92,"Calm"],[1,"Normal"],[1.1,"Quick"]].map(([v,n])=>`<option value="${v}" ${(st.voiceRate||.92)===v?"selected":""}>${n}</option>`).join("")}</select><button class="switch" id="vtest">▶ Try</button></span>`;
  box.appendChild(row);
  $("#vsel").onchange=e=>{st.voiceName=e.target.value;save();pickV()};$("#vrate").onchange=e=>{st.voiceRate=+e.target.value;save()};
  $("#vtest").onclick=()=>speak("Hi there. Let's learn something new together. You're doing a great job.","soft")};
})();
