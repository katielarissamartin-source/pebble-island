(function(){
const css=`body.adult{background:#f6f7f9!important}
body.adult .scene,body.adult #mascot,body.adult #bubble,body.adult .deco,body.adult #fx{display:none!important}
body.adult #app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif!important;color:#1d2433}
.hub{max-width:960px;padding:24px 16px 48px;color:#1d2433;font-family:inherit}
.hub *{font-family:inherit!important;animation:none!important}
.hub h2{font-size:26px;font-weight:650;margin:8px 0 4px;letter-spacing:-.01em}
.hub h3{font-size:17px;font-weight:600;margin:0 0 12px}
.hub .hc{border-radius:10px;box-shadow:none;border:1px solid #e3e6ea;padding:20px;margin:16px 0}
.hub .top .pill{font-size:14px;padding:8px 14px;border-radius:8px;box-shadow:none;border:1px solid #d5d9df;background:#fff;color:#1d2433}
.hub .tabs{gap:0;border-bottom:1px solid #e3e6ea}
.hub .tabs button{border:0;border-bottom:2px solid transparent;border-radius:0;background:none;color:#5b6576;font-size:15px;padding:10px 14px;font-weight:500}
.hub .tabs button.on{background:none;color:#1d2433;border-bottom-color:#1d2433}
.hub .tabs.kids{border:0;gap:8px;margin:12px 0 4px}
.hub .tabs.kids button{border:1px solid #d5d9df;border-radius:8px;padding:8px 16px}
.hub .tabs.kids button.on{background:#1d2433;color:#fff;border-color:#1d2433}
.hub table{font-size:14px}.hub th{color:#5b6576;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:.03em}
.hub td,.hub th{padding:10px 8px;border-bottom:1px solid #eef0f3;vertical-align:top}
.hub .kpi div{background:#f6f7f9;border-radius:8px;padding:14px;color:#5b6576;font-size:13px}.hub .kpi b{color:#1d2433;font-size:24px;font-weight:650;margin-bottom:2px}
.hub .bar{height:8px;background:#eef0f3}.hub .bar i{background:#2f6f5e}
.hub .explain{color:#5b6576;font-size:14px;margin:12px 0 0;line-height:1.5}
.hub .big{font-size:15px;padding:10px 18px;border-radius:8px;box-shadow:none}
.pwgate{max-width:380px;margin:12vh auto;background:#fff;border:1px solid #e3e6ea;border-radius:12px;padding:28px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#1d2433}
.pwgate h2{font-size:22px;margin:0 0 6px}.pwgate p{color:#5b6576;margin:0 0 16px;font-size:15px}
.pwgate input{width:100%;box-sizing:border-box;font-size:17px;padding:12px;border:1px solid #c9ced6;border-radius:8px;margin-bottom:12px}
.pwgate .err{color:#b42318;font-size:14px;min-height:20px}
.pwgate .row{display:flex;gap:8px}.pwgate button{flex:1;font-size:16px;padding:12px;border-radius:8px;border:1px solid #1d2433;background:#1d2433;color:#fff}
.pwgate button.ghost{background:#fff;color:#1d2433;border-color:#c9ced6}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const EXPLAIN={overview:"A quick summary of the last 7 days and the three things most worth focusing on.",sessions:"Each block of play, with time and accuracy. Gaps of more than 10 minutes start a new session.",learning:"Current level on each island, what they're working on (with its curriculum code) and how accurate they've been on their last 20 answers.",skills:"Curriculum outcomes they've demonstrated by passing a level.",next:"What to focus on next for each island, most urgent first.",plan:"Which learning areas were covered this week, plus a suggested Monday–Friday plan including subjects the app doesn't cover.",chat:"Messages between Ivy and Hayden.",report:"A summary you can print or save as a PDF for your records."};
const strip=t=>t.replace(/^[^\p{L}\p{N}]+/u,"").trim();
function tidy(){const h=document.querySelector(".hub");if(!h||h.dataset.tidy)return;h.dataset.tidy=1;document.body.classList.add("adult");
  const t=h.querySelectorAll(".tabs");if(t[0])t[0].classList.add("kids");
  h.querySelectorAll(".tabs:not(.kids) button").forEach(b=>b.textContent=strip(b.textContent));
  const h2=h.querySelector(":scope > h2");if(h2)h2.textContent="Audrey's Hub";
  const on=h.querySelector("[data-tab].on");if(on&&t[1])t[1].insertAdjacentHTML("afterend",`<p class="explain">${EXPLAIN[on.dataset.tab]||""}</p>`);
  const kp=h.querySelector("#hchat");if(kp&&!S.family){}
}
new MutationObserver(()=>{if(document.querySelector(".hub"))tidy();else document.body.classList.remove("adult")}).observe(document.getElementById("app"),{childList:true});
const orig=window.openHub;
window.openHub=function(){document.body.classList.add("adult");
  $("#app").innerHTML=`<div class="pwgate"><h2>Audrey's Hub</h2><p>Enter the password to see learning reports.</p><input id="pw" type="password" autocomplete="off" aria-label="Password" placeholder="Password"><div class="err" id="pwerr"></div><div class="row"><button class="ghost" id="pwx">Back</button><button id="pwok">Open</button></div></div>`;
  const go=()=>{if($("#pw").value.trim().toLowerCase()!=="password"){$("#pwerr").textContent="That's not right. Try again.";$("#pw").value="";return}
    orig();const m=($("#app").innerText.match(/(\d+) × (\d+)/));if(m){$("#gate").value=(+m[1])*(+m[2]);$("#gok").click()}};
  $("#pwok").onclick=go;$("#pw").onkeydown=e=>{if(e.key==="Enter")go()};$("#pwx").onclick=()=>{document.body.classList.remove("adult");render()};setTimeout(()=>$("#pw")&&$("#pw").focus(),50)};
})();
