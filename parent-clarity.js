/* Parent screen readability + cloud connection instructions.
   Applies only to Grown-ups. Child-facing island colours and lessons untouched. */
(function(){
"use strict";
const css=String.raw; // placeholder overwritten below for compatibility
const style=document.createElement("style");style.id="pebble-parent-clarity";
style.textContent=[
'body.pi-parent-view #app{background:linear-gradient(180deg,#f7fcfe 0%,#e7f3f8 100%)!important;border:2px solid #bedce6!important;border-radius:26px!important;padding:clamp(15px,2.5vw,26px)!important;box-shadow:0 9px 22px rgba(20,70,97,.1)!important;color:#173e51!important;max-width:1120px}',
'body.pi-parent-view #app>*{animation:none!important;opacity:1!important;transform:none!important;filter:none!important}',
'body.pi-parent-view #app>.top{align-items:center!important;gap:12px!important}',
'body.pi-parent-view #app>.top h1{color:#12394e!important;-webkit-text-fill-color:#12394e!important;background:none!important;text-shadow:none!important;font-size:clamp(1.8rem,3.4vw,2.7rem)!important;line-height:1.15!important}',
'body.pi-parent-view #app>.top #back{background:#175d7a!important;border:2px solid #175d7a!important;color:#fff!important;-webkit-text-fill-color:#fff!important;min-height:52px!important;box-shadow:0 3px 0 #99bfce!important;font-weight:800!important}',
'body.pi-parent-view #app>p.lede{background:#fff!important;color:#36596b!important;-webkit-text-fill-color:#36596b!important;padding:14px 18px!important;border:1px solid #cbdde5!important;border-radius:16px!important;font-size:clamp(.94rem,1.6vw,1.05rem)!important;line-height:1.55!important;max-width:none!important;text-shadow:none!important}',
'body.pi-parent-view #app .parent{width:100%;display:grid;gap:13px;color:#173e51!important}',
'body.pi-parent-view #app .parent .prow{min-width:0;background:#fff!important;border:2px solid #d1e1e8!important;box-shadow:0 2px 0 rgba(61,115,130,.1)!important;padding:clamp(13px,2vw,19px)!important;border-radius:18px!important;color:#173e51!important;gap:14px!important}',
'body.pi-parent-view #app .parent .prow>span{font-size:clamp(.98rem,1.9vw,1.08rem)!important;line-height:1.55!important;color:#1c4659!important;-webkit-text-fill-color:#1c4659!important}',
'body.pi-parent-view #app .parent .prow .stat{color:#315d70!important;-webkit-text-fill-color:#315d70!important;line-height:1.65!important;font-size:clamp(.83rem,1.4vw,.96rem)!important;overflow-wrap:anywhere!important}',
'body.pi-parent-view #app .parent input,body.pi-parent-view #app .parent select{background:#fff!important;border:2px solid #8eb0c2!important;color:#173e51!important;-webkit-text-fill-color:#173e51!important;border-radius:12px!important;min-height:54px!important;padding:11px 13px!important;font-size:clamp(1rem,1.9vw,1.1rem)!important;box-shadow:0 1px 0 #e2e9ed!important;max-width:100%!important}',
'body.pi-parent-view #app .parent input::placeholder{color:#547381!important;opacity:1!important;-webkit-text-fill-color:#547381!important}',
'body.pi-parent-view #app .parent .switch{background:#eaf4f7!important;border:2px solid #80a9bb!important;color:#153f53!important;-webkit-text-fill-color:#153f53!important;min-height:52px!important;padding:10px 17px!important;font-size:clamp(.95rem,1.5vw,1rem)!important;font-weight:800!important;box-shadow:none!important}',
'body.pi-parent-view #app .parent .switch[aria-pressed=true]{background:#196e76!important;border-color:#196e76!important;color:#fff!important;-webkit-text-fill-color:#fff!important}',
'body.pi-parent-view #app .parent .switch:focus-visible,body.pi-parent-view #app .parent input:focus-visible,body.pi-parent-view #app .parent select:focus-visible{outline:4px solid #f5bf58!important;outline-offset:3px!important}',
'body.pi-parent-view #app .pi-settings-title{font:800 clamp(1.15rem,2.6vw,1.5rem)/1.25 var(--display,system-ui)!important;color:#123b52!important;-webkit-text-fill-color:#123b52!important;margin:4px 0 0!important}',
'body.pi-parent-view #app .pi-family-section{background:#e0f5f3;border:2px solid #9dcfce;border-radius:22px;padding:clamp(13px,2vw,20px);display:grid;gap:13px}',
'body.pi-parent-view #app .pi-family-section>.pi-family-intro{margin:0;color:#31596a;font-size:clamp(.94rem,1.7vw,1.05rem);line-height:1.55}',
'body.pi-parent-view #app .pi-family-section .prow{border:2px solid #a9d2d1!important;background:#fff!important;margin:0!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:end!important;gap:18px!important}',
'body.pi-parent-view #app .pi-family-fields{display:grid!important;grid-template-columns:minmax(190px,1.3fr) minmax(155px,1fr);gap:12px;min-width:0}',
'body.pi-parent-view #app .pi-family-field{display:grid;gap:6px;min-width:0;font-size:.92rem;font-weight:800;line-height:1.35;color:#234a5c;-webkit-text-fill-color:#234a5c}',
'body.pi-parent-view #app .pi-family-field input{width:100%!important;min-width:0!important;font-family:var(--body,system-ui)!important}',
'body.pi-parent-view #app #famgo{align-self:end;background:#165e79!important;border-color:#165e79!important;color:#fff!important;-webkit-text-fill-color:#fff!important;min-width:142px!important;min-height:54px!important;white-space:normal!important}',
'body.pi-parent-view #app .pi-connect-state{display:flex;align-items:flex-start;gap:9px;background:#fff;border:1px solid #b5cfd9;border-radius:13px;padding:12px 14px;line-height:1.5;color:#244d60;font-size:.91rem;font-weight:700}',
'body.pi-parent-view #app .pi-connect-state[data-state=error]{border-color:#d78e7a;background:#fff4ed;color:#763e2d}',
'body.pi-parent-view #app .pi-connect-state[data-state=ok]{border-color:#7cbea0;background:#f1fff5;color:#21543a}',
'body.pi-parent-view #app .pi-family-tip{font-size:.88rem;color:#395e6d;line-height:1.5;margin:0}',
'body.pi-parent-view #app .pi-settings-sectionhead{margin:14px 0 1px;color:#284e63;font:800 1.22rem var(--display,system-ui)}',
'@media(max-width:800px){body.pi-parent-view #app .pi-family-section .prow{grid-template-columns:minmax(0,1fr)!important}body.pi-parent-view #app #famgo{width:100%;min-width:0!important}body.pi-parent-view #app .pi-family-fields{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}',
'@media(max-width:560px){body.pi-parent-view #app{border-radius:16px!important;padding:12px!important}body.pi-parent-view #app .pi-family-fields{grid-template-columns:1fr}body.pi-parent-view #app .pi-family-section{padding:13px}body.pi-parent-view #app .parent .prow{padding:12px!important}}'
].join("\n");
document.head.appendChild(style);
function improve(){
 const app=document.getElementById("app");if(!app)return;
 const parentScreen=!!(app.querySelector(".parent")&&app.querySelector(".top h1")?.textContent.trim()==="Grown-ups");
 document.body.classList.toggle("pi-parent-view",parentScreen);
 if(!parentScreen)return;
 const container=app.querySelector(".parent");
 if(!container||container.querySelector(".pi-family-section"))return;
 const famInput=container.querySelector("#famkey");
 const familyRow=famInput?.closest(".prow");
 if(!familyRow)return;
 const section=document.createElement("section");section.className="pi-family-section";section.setAttribute("aria-label","Connect the children's tablets");
 section.innerHTML='<h2 class="pi-settings-title">Connect the children’s tablets</h2><p class="pi-family-intro">Enter the <strong>same registered family code</strong> on every tablet to connect reports and messages. Give each tablet a different name.</p>';
 familyRow.before(section);section.appendChild(familyRow);
 const status=document.createElement("div");status.className="pi-connect-state";status.setAttribute("role","status");status.setAttribute("aria-live","polite");
 const connected=!!(typeof S!=="undefined"&&S.family);
 status.dataset.state=connected?"ok":"info";
 status.textContent=connected?"✓ Family cloud connected on this tablet.":"Not connected yet. A code must be registered in the family cloud before you can use it here.";
 section.appendChild(status);
 const tip=document.createElement("p");tip.className="pi-family-tip";
 tip.textContent="Don't have a registered code yet? Ask the family-cloud administrator to create one. The placeholder PEBBLE-XXXX-XXXX-XXXX is not a working code.";
 section.append(tip);
 const inputs=document.createElement("div");inputs.className="pi-family-fields";
 const codeInput=document.getElementById("famkey"),tabletInput=document.getElementById("devname");
 for(const [el,title] of [[codeInput,"Family connection code"],[tabletInput,"Tablet name"]]){
  if(!el)continue;
  const wrapper=document.createElement("label");wrapper.className="pi-family-field";
  const cap=document.createElement("span");cap.textContent=title;
  wrapper.append(cap,el);inputs.append(wrapper);
  el.setAttribute("autocomplete","off");el.setAttribute("spellcheck","false");
 }
 const fieldGroup=familyRow.firstElementChild;
 if(fieldGroup){fieldGroup.replaceWith(inputs)}
 // Keep the original authenticated Connect handler and its server-side code check.
 const submit=familyRow.querySelector("#famgo");
 if(submit){
  const notice=new MutationObserver(()=>{
   const v=submit.textContent.trim().toLowerCase();
   if(v==="code not found"){status.dataset.state="error";status.textContent="That code isn't registered. Please use a family code created in the cloud database.";submit.textContent="Try again"}
   else if(v==="no internet?"){status.dataset.state="error";status.textContent="Could not reach the family cloud. Check the tablet's internet connection, then try again.";submit.textContent="Retry connection"}
   else if(v==="checking…"){status.dataset.state="info";status.textContent="Checking the code with the family cloud…"}
  });
  notice.observe(submit,{childList:true,characterData:true,subtree:true});
 }
 const settingsTitle=document.createElement("h2");settingsTitle.className="pi-settings-sectionhead";settingsTitle.textContent="Learners and settings";
 section.after(settingsTitle);
}
const app=document.getElementById("app");
if(app){new MutationObserver(()=>improve()).observe(app,{childList:true,subtree:false})}
if(typeof parent==="function"){
 const original=parent;
 parent=function(){const result=original.apply(this,arguments);improve();return result};
}
improve();
window.PEBBLE_PARENT_CLARITY={refresh:improve,version:1};
})();