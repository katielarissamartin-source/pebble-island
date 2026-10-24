(function(){const set=(id,i,code)=>{if(CURR[id]&&CURR[id][i])CURR[id][i][1]=code};
const sci=["F–Y1 Science: AC9SFU01, AC9SFI02","Y1 Science: AC9S1U01, AC9S1U02, AC9SFU03","Y1–3 Science: AC9S1U03, AC9S3U01, AC9S4U02","Y3 Science: AC9S3U04, AC9S3U03, AC9S6U02","Y4–6 Science: AC9S4U01, AC9S4U03, AC9S5U02, AC9S6U04","Y5 Science: AC9S5U01, AC9S5U03, AC9S5U04, AC9S2U01","Y6 Science: AC9S6U01, AC9S6U02, AC9S6U03, AC9S6U04","Y5–6 Science inquiry: AC9S5I02, AC9S6I02, AC9S6I05"];
sci.forEach((c,i)=>set("sci",i,c));
set("nums",6,"Y3 Maths: AC9M3N03");set("nums",7,"Y3–4 Maths: AC9M3N03, AC9M4N06");set("nums",8,"Y3–4 Maths: AC9M3N06, AC9M4N08");
set("times",7,"Y3 Maths: AC9M3N04");set("times",8,"Y4–5 Maths: AC9M4N06, AC9M5N06");set("times",9,"Y5 Maths: AC9M5N07");
set("pv",7,"Y3 Maths: AC9M3N01");set("pv",8,"Y4 Maths: AC9M4N07");
set("frac",6,"Y4 Maths: AC9M4N03");set("frac",7,"Y5 Maths: AC9M5N05");set("frac",8,"Y4 Maths: AC9M4N01, AC9M4N03");
set("read",6,"Y3–5 English: AC9E3LY05, AC9E4LY05, AC9E5LY05");set("read",7,"Y4–5 English: AC9E4LA02, AC9E5LY03, AC9E5LE04");
})();
