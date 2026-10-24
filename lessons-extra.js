/* Registers extra lessons. Each row: [id, plain, ivy, hayden]
   plain  = [title, icon, code, goal, teach, example, tryIt, items]
   ivy / hayden = [title, icon, teach, example, tryIt, items]   (Ivy = kid 0, Hayden = kid 1)
   items  = [[prompt, answer, wrong1, wrong2, explain], ...]  (answers are shuffled on screen) */
(function(){
const B=window.PEBBLE_QCAA_LESSONS;if(!B)return;
const TH=window.PEBBLE_THEMES=window.PEBBLE_THEMES||{};TH[0]=TH[0]||{};TH[1]=TH[1]||{};
const qs=items=>items.map(([prompt,a,b,c,explain,hint])=>({prompt,choices:[a,b,c],correct:0,explain,hint:hint||"Take your time and look again."}));
window.PEBBLE_EXTRA=function(year,area,rows){
  const y=B[year]||(B[year]={}),list=y[area]||(y[area]=[]);
  rows.forEach(([id,p,iv,hy])=>{
    if(!list.some(l=>l.id===id)){
      const [title,icon,code,goal,teach,example,tryIt,items]=p;
      list.push({id,title,icon,code,goal,teach,example,tryIt,hint:"Take your time and look again.",learningStage:"extended",unit:area+" "+(year?"Year "+year:"Prep"),estimatedMinutes:5,questions:qs(items)});
    }
    const key=year+"."+area+"."+id;
    [[0,iv],[1,hy]].forEach(([k,t])=>{if(!t)return;const [title,icon,teach,example,tryIt,items]=t;TH[k][key]={title,icon,teach,example,tryIt,questions:qs(items)}});
  });
};
})();
