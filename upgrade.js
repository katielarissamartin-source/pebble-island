(function enhance(){
  "use strict";
  let selectedArea="all";
  const category={reading:["words","read","think"],maths:["nums","pv","times","frac","shapes","time","money","data"],discover:["sci","geo","hist","feel"],games:["mix","review"]};
  const group=id=>Object.keys(category).find(k=>category[k].includes(id))||"discover";
  const baseMap=map;
  map=function(){
    baseMap();
    const app=document.getElementById("app"),list=app.querySelector(".map");
    if(!list||kid===null)return;
    const cards=[...list.querySelectorAll(".world[data-w]")];
    const last=(S.lastWorld||{})[kid];
    const nextCard=cards.find(b=>b.dataset.w===last)||cards.find(b=>b.dataset.w==="words")||cards[0];
    if(nextCard){
      const w=WORLDS.find(x=>x.id===nextCard.dataset.w);
      const intro=document.createElement("section");intro.className="dashboard-intro";
      const copy=document.createElement("div");copy.className="dashboard-copy";
      const eyebrow=document.createElement("p");eyebrow.className="eyebrow";eyebrow.textContent="PEBBLE ISLAND";
      const headline=document.createElement("h2");headline.textContent="Ready to explore, "+S.kids[kid].name+"?";
      const detail=document.createElement("p");detail.textContent="Learn something new, then make time to play.";
      copy.append(eyebrow,headline,detail);
      const start=document.createElement("button");start.className="big continue-btn";start.type="button";
      const primary=document.createElement("span");primary.textContent=last?"Continue learning":"Start exploring";
      const sub=document.createElement("small");sub.textContent=w?w.ico+" "+w.name:"";
      start.append(primary,sub);
      start.onclick=()=>nextCard.click();
      intro.append(copy,start);
      const top=app.querySelector(".top");if(top)top.insertAdjacentElement("afterend",intro);
    }
    const h=list.previousElementSibling;
    if(h&&h.tagName==="H2"){h.textContent="Choose an island";h.classList.add("island-title")}
    const filters=document.createElement("nav");filters.className="island-filters";filters.setAttribute("aria-label","Learning island categories");
    const choices=[["all","All islands"],["reading","Reading"],["maths","Maths"],["discover","Discover"],["games","Games"]];
    function filter(val){
      selectedArea=val;
      cards.forEach(b=>b.hidden=val!=="all"&&group(b.dataset.w)!==val);
      filters.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.cat===val)));
    }
    choices.forEach(([id,label])=>{
      if(id!=="all"&&!cards.some(c=>group(c.dataset.w)===id))return;
      const btn=document.createElement("button");btn.type="button";btn.className="filter-tab";btn.dataset.cat=id;btn.textContent=label;btn.setAttribute("aria-pressed","false");btn.onclick=()=>filter(id);filters.append(btn);
    });
    list.before(filters);filter(selectedArea);
    const top=app.querySelector(".top"),bar=app.querySelector(".mapbar");
    if(top&&bar){
      top.classList.add("map-top");bar.classList.add("compact-stats");
      const wrap=document.createElement("div");wrap.className="more-wrap";
      const button=document.createElement("button");button.className="pill more-toggle";button.type="button";button.textContent="Menu";button.setAttribute("aria-expanded","false");
      const menu=document.createElement("div");menu.className="more-menu";menu.hidden=true;
      ["skn","stk","shopbtn","buildbtn","gamebtn","chatbtn","calmbtn","questbtn","badgebtn","streakpill","goalpill"].forEach(id=>{
        const el=document.getElementById(id);if(el)menu.append(el);
      });
      button.onclick=()=>{menu.hidden=!menu.hidden;button.setAttribute("aria-expanded",String(!menu.hidden))};
      menu.addEventListener("click",e=>{if(e.target.closest("button")){menu.hidden=true;button.setAttribute("aria-expanded","false")}});
      wrap.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.hidden=true;button.setAttribute("aria-expanded","false");button.focus()}});
      wrap.append(button,menu);top.append(wrap);
    }
  };
  const baseHome=home;
  home=function(){
    baseHome();const lead=document.querySelector("#app .lede");
    if(lead){lead.textContent="Choose your explorer to start learning and playing.";lead.classList.add("home-intro")}
  };
  const basePlay=play;
  play=function(){
    basePlay();const msg=document.getElementById("msg");
    if(msg){msg.setAttribute("role","status");msg.setAttribute("aria-live","polite");msg.setAttribute("aria-atomic","true")}
  };
  document.addEventListener("click",e=>{
    const world=e.target.closest(".world[data-w]");
    if(world&&kid!==null){
      S.lastWorld=S.lastWorld||{};
      S.lastWorld[kid]=world.dataset.w;
      save();
    }
  },{passive:true});
  if(typeof confetti==="function"){
    const original=confetti;
    confetti=function(x,y,n){if(!document.hidden)original(x,y,Math.min(n||70,36))};
  }
  if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}),{once:true});
  if(typeof render==="function")render();
})();