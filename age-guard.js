(function(){
"use strict";
let G=null;try{G=GEN}catch(e){}
if(!G||typeof G.hist!=="function")return;
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
const age=k=>{try{return Number(S.kids[k].age)||7}catch(e){return 7}};
function histCap(k){
 if(k===null)return 8;
 const a=age(k);
 return a<=6?1:a<=7?3:a<=8?4:a<=9?5:a<=10?6:a<=11?7:8;
}
const orig=G.hist;
G.hist=function(l){return orig.call(this,Math.max(1,Math.min(Number(l)||1,histCap(who()))))};
window.PEBBLE_AGE_GUARD={histCap};
})();
