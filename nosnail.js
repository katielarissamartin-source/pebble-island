(function(){const sw={"snail":["train","🚂"],"shell":["shirt","👕"]};PICS.forEach(p=>{if(sw[p[0]]){const n=sw[p[0]];p[0]=n[0];p[1]=n[1]}});
delete LOOKALIKE.snail;delete LOOKALIKE.shell;LOOKALIKE.train=["rain","trail","tram"];LOOKALIKE.shirt=["short","skirt","shift"];
SKINS.forEach(k=>{if(k.deco)k.deco=k.deco.replace(/\u{1F40C}/gu,"").replace(/\u{1F41A}/gu,"\u{1F42C}")});})();
