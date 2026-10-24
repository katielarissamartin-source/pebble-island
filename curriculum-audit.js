/* QCAA reference audit, not a claim of certification or endorsement. */
(function(){
"use strict";
const B=window.PEBBLE_QCAA_LESSONS;if(!B)return;
const range=(pre,a,b)=>Array.from({length:b-a+1},(_,i)=>pre+String(a+i).padStart(2,"0"));
const src="https://www.qcaa.qld.edu.au/downloads/aciqv9/";
const source={
 maths:["Mathematics","mathematics/curriculum/ac9_maths_yr6_as_cd_alignment.pdf",[...range("AC9M6N",1,9),...range("AC9M6A",1,3),...range("AC9M6M",1,4),...range("AC9M6SP",1,3),...range("AC9M6ST",1,3),...range("AC9M6P",1,2)]],
 english:["English","english/curriculum/ac9_english_yr6_as_cd_alignment.pdf",[...range("AC9E6LA",1,9),...range("AC9E6LE",1,5),...range("AC9E6LY",1,9)]],
 science:["Science","science/curriculum/ac9_science_yr6_as_cd_alignment.pdf",[...range("AC9S6U",1,4),...range("AC9S6H",1,2),...range("AC9S6I",1,6)]],
 hass:["HASS","humanities-and-social-sciences/curriculum/ac9_hass_yr6_as_cd_alignment.pdf",[...range("AC9HS6K",1,8),...range("AC9HS6S",1,7)]],
 technologies:["Technologies","technologies/curriculum/ac9_tech_yr5-6_as_cd_alignment.pdf",[...range("AC9TDE6K",2,5),...range("AC9TDE6P",1,5),...range("AC9TDI6K",1,4),...range("AC9TDI6P",1,10)]]
};
const E=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function status(area){
 const m=source[area],items=B[6]?.[area]||[],linked=new Set(items.flatMap(l=>String(l.code||"").match(/AC9[A-Z0-9]+/g)||[]));
 return{area,name:m[0],lessons:items.length,total:m[2].length,present:m[2].filter(c=>linked.has(c)),missing:m[2].filter(c=>!linked.has(c)),unknown:[...linked].filter(c=>!m[2].includes(c)),url:src+m[1]};
}
function render(){
 const cols=Object.keys(source).map(status);
 const trs=cols.map(x=>'<tr><th scope="row">'+E(x.name)+'</th><td>'+x.lessons+'</td><td>'+x.present.length+' / '+x.total+'</td><td>'+x.missing.length+'</td><td><a href="'+x.url+'" target="_blank" rel="noopener noreferrer">QCAA reference</a></td></tr>').join("");
 const gaps=cols.map(x=>'<details><summary>'+E(x.name)+': '+x.missing.length+' codes without a lesson reference</summary><p>These codes need a mapped lesson. Referenced codes ALSO require fuller teaching and assessment review.</p><div class="audit-codes">'+x.missing.map(c=>'<code>'+c+'</code>').join("")+'</div>'+(x.unknown.length?'<p>Check these identifiers: '+E(x.unknown.join(", "))+'</p>':"")+'</details>').join("");
 const years=Object.keys(B).sort((a,b)=>a-b).map(y=>'<tr><th scope="row">'+(y==="0"?"Prep":"Year "+y)+'</th><td>'+Object.values(B[y]).flat().length+'</td><td>'+E(Object.entries(B[y]).map(([k,v])=>k+" "+v.length).join(", "))+'</td><td>'+(y==="6"?"Code cross-check done; achievement review outstanding":"Full curriculum mapping and assessment audit pending")+'</td></tr>').join("");
 return '<div class="pebble-curriculum-audit"><h2>Official curriculum mapping</h2><div class="audit-warning"><strong>Accreditation status: NOT endorsed or accredited.</strong><p>ACARA does not endorse third-party products. These independently produced lessons reference the officially endorsed Australian Curriculum v9.0, but the program is not yet comprehensive or externally approved.</p></div>'+
 '<h3>Year 6 reference-code inventory</h3><p>This counts content-description identifiers mentioned in lessons. A code mention is not proof that the full description or achievement standard has been taught or assessed.</p>'+
 '<div class="audit-table"><table><thead><tr><th>Area</th><th>Lessons</th><th>Referenced codes</th><th>Unreferenced</th><th>Source</th></tr></thead><tbody>'+trs+'</tbody></table></div>'+gaps+
 '<h3>Prep–Year 6 lesson inventory</h3><div class="audit-table"><table><thead><tr><th>Year</th><th>Lessons</th><th>Areas</th><th>Curriculum status</th></tr></thead><tbody>'+years+'</tbody></table></div>'+
 '<h3>What is still required</h3><p>The Arts, Languages and Health and Physical Education do not have complete year-level learning pathways. Existing subjects also need all content descriptions taught, writing and oral work, scientific investigations and practical assessment, achievement-standard rubrics, and qualified educator review.</p>'+
 '<p><strong>Curriculum learning:</strong> My Learning Path and Curiosity Lab (in development). <strong>Additional practice:</strong> Islands, optional exploration and review. Completing an existing Pebble Island lesson does not demonstrate completion of a whole year-level curriculum.</p>'+
 '<p><a href="https://www.australiancurriculum.edu.au/copyright-and-terms-of-use/" target="_blank" rel="noopener noreferrer">ACARA third-party product policy</a> · <a href="https://www.australiancurriculum.edu.au/help/learning-areas/about-the-curriculum-content-elements" target="_blank" rel="noopener noreferrer">Achievement standards explained</a></p></div>';
}
const css=document.createElement("style");css.textContent=[
".pebble-curriculum-audit{display:grid;gap:15px;color:var(--ink);line-height:1.5}",
".pebble-curriculum-audit .audit-warning{background:#fff4dc!important;color:#342914!important;border:2px solid #bd9645;border-radius:14px;padding:15px}",
".pebble-curriculum-audit .audit-warning *{color:#342914!important}",
".pebble-curriculum-audit .audit-table{overflow-x:auto;max-width:100%;border:1px solid var(--line);border-radius:12px}",
".pebble-curriculum-audit table{border-collapse:collapse;width:100%;min-width:580px;font-size:.9rem}",
".pebble-curriculum-audit th,.pebble-curriculum-audit td{padding:10px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}",
".pebble-curriculum-audit details{border:1px solid var(--line);border-radius:12px;padding:11px 13px;background:var(--panel)}",
".pebble-curriculum-audit summary{font-weight:750;cursor:pointer}",
".pebble-curriculum-audit .audit-codes{display:flex;flex-wrap:wrap;gap:5px;margin:10px 0}",
".pebble-curriculum-audit code{padding:5px;border:1px solid var(--line);border-radius:5px;font:600 .76rem ui-monospace,monospace}"
].join("\n");document.head.append(css);
window.PEBBLE_CURRICULUM_AUDIT=Object.freeze({version:"2026-10-24",status,render,source});
})();