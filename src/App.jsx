import { useState, useMemo } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');`;

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#08090F;--bg2:#0D0E1A;--bg3:#11122A;
  --g1:rgba(255,255,255,0.04);--g2:rgba(255,255,255,0.07);--g3:rgba(255,255,255,0.11);
  --b1:rgba(255,255,255,0.07);--b2:rgba(255,255,255,0.13);--b3:rgba(255,255,255,0.22);
  --mint:#34EAA0;--mintd:#1DC87E;--mintg:rgba(52,234,160,0.14);
  --pink:#F471B5;--pinkg:rgba(244,113,181,0.14);
  --blue:#60A5FA;--blueg:rgba(96,165,250,0.14);
  --amber:#FBBF24;--coral:#FB7185;--purple:#A78BFA;--teal:#2DD4BF;
  --tx:#EEF2FF;--mu:#7A84A0;--li:#3E4760;
  --sh1:0 2px 16px rgba(0,0,0,0.4);--sh2:0 8px 32px rgba(0,0,0,0.5);
}
html,body{background:var(--bg);color:var(--tx);font-family:'DM Sans',sans-serif;line-height:1.55;-webkit-font-smoothing:antialiased;min-height:100vh;}
::selection{background:var(--mint);color:#000;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:var(--li);border-radius:2px;}

.mesh{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
.blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:.1;}
.b1c{width:500px;height:500px;background:var(--mint);top:-100px;left:-150px;animation:drift 12s ease-in-out infinite alternate;}
.b2c{width:400px;height:400px;background:var(--pink);bottom:-80px;right:-100px;animation:drift 14s ease-in-out infinite alternate-reverse;}
.b3c{width:280px;height:280px;background:var(--blue);top:45%;left:35%;animation:drift 10s ease-in-out infinite alternate;}
@keyframes drift{from{transform:translate(0,0);}to{transform:translate(30px,20px);}}

.hdr{position:sticky;top:0;z-index:100;background:rgba(8,9,15,0.88);backdrop-filter:blur(20px);border-bottom:1px solid var(--b1);padding:0 18px;}
.hdr-in{max-width:480px;margin:0 auto;height:56px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--mint),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.avatar-btn{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--mint),var(--blue));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#000;cursor:pointer;border:none;transition:transform .2s;}
.avatar-btn:hover{transform:scale(1.1);}

.page{position:relative;z-index:1;max-width:480px;margin:0 auto;padding:22px 18px 88px;}
.page-wide{position:relative;z-index:1;max-width:980px;margin:0 auto;padding:22px 18px 88px;}

.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 18px;position:relative;z-index:1;}
.auth-card{width:100%;max-width:360px;background:var(--g2);backdrop-filter:blur(24px);border:1px solid var(--b2);border-radius:24px;padding:34px 26px;}
.auth-logo{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;background:linear-gradient(135deg,var(--mint),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;margin-bottom:4px;}
.auth-tagline{text-align:center;font-size:12px;color:var(--mu);margin-bottom:28px;}
.otp-box{background:var(--mintg);border:1px solid rgba(52,234,160,.3);border-radius:10px;padding:12px 14px;margin:12px 0;text-align:center;}
.otp-code{font-size:28px;font-weight:800;letter-spacing:8px;color:var(--mint);}
.otp-hint{font-size:10px;color:var(--mu);margin-top:4px;}

.fld{display:flex;flex-direction:column;gap:7px;margin-bottom:13px;}
.fld label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);}
.fld input,.fld select,.fld textarea{background:var(--g1);border:1.5px solid var(--b1);border-radius:12px;padding:12px 15px;color:var(--tx);font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .15s,box-shadow .15s;width:100%;}
.fld input:focus,.fld select:focus,.fld textarea:focus{border-color:var(--mint);box-shadow:0 0 0 3px var(--mintg);}
.fld input::placeholder,.fld textarea::placeholder{color:var(--li);}
.fld textarea{resize:vertical;min-height:72px;}
select option{background:#1a1b2e;}
.ip{position:relative;}
.ip span{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--mu);font-size:14px;pointer-events:none;}
.ip input{padding-left:40px;}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

.btn-p{width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,var(--mint),var(--mintd));color:#000;font-size:14px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .2s;letter-spacing:.3px;}
.btn-p:hover{transform:translateY(-1px);box-shadow:0 8px 24px var(--mintg);}
.btn-p:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none;}
.btn-s{padding:12px 22px;border:1.5px solid var(--b2);border-radius:12px;background:var(--g1);color:var(--mu);font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .15s;}
.btn-s:hover{border-color:var(--b3);color:var(--tx);}
.btn-ghost{padding:10px 18px;border:none;border-radius:99px;background:transparent;color:var(--mu);font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;}
.btn-ghost:hover{color:var(--tx);}
.btn-pill{padding:8px 18px;border-radius:99px;border:1.5px solid var(--b2);background:var(--g1);color:var(--mu);font-size:12px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .15s;}
.btn-pill:hover{border-color:var(--mint);color:var(--mint);}
.navrow{display:flex;gap:10px;justify-content:flex-end;margin-top:26px;}

.card{background:var(--g2);border:1px solid var(--b1);border-radius:20px;padding:20px;margin-bottom:14px;}
.ctitle{font-size:9px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:var(--mu);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.ctitle::after{content:'';flex:1;height:1px;background:var(--b1);}

.pg-title{font-family:'Syne',sans-serif;font-size:clamp(22px,6vw,30px);font-weight:800;line-height:1.1;letter-spacing:-.5px;margin-bottom:6px;}
.grad{background:linear-gradient(135deg,var(--mint),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.pg-sub{font-size:12px;color:var(--mu);margin-bottom:24px;line-height:1.65;}

.stepper{display:flex;align-items:center;justify-content:center;padding:18px 16px 0;gap:0;max-width:480px;margin:0 auto;}
.si{display:flex;align-items:center;}
.sw{display:flex;flex-direction:column;align-items:center;}
.sb{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;transition:all .3s;}
.sb.done{background:var(--mintd);color:#000;}
.sb.active{background:linear-gradient(135deg,var(--mint),var(--blue));color:#000;box-shadow:0 0 0 4px var(--mintg);}
.sb.todo{background:var(--g1);color:var(--li);border:1.5px solid var(--b1);}
.sl{font-size:8px;font-weight:700;letter-spacing:.5px;margin-top:4px;}
.sl.done{color:var(--mintd);}
.sl.active{color:var(--mint);}
.sl.todo{color:var(--li);}
.sline{width:40px;height:2px;margin:0 4px 14px;transition:background .3s;}
.sline.done{background:var(--mintd);}
.sline.todo{background:var(--b1);}

.tgrid{display:grid;gap:9px;}
.tg2{grid-template-columns:1fr 1fr;}
.tg3{grid-template-columns:1fr 1fr 1fr;}
.titem{padding:14px 10px;border-radius:12px;border:1.5px solid var(--b1);background:var(--g1);cursor:pointer;transition:all .18s;text-align:center;}
.titem:hover{border-color:var(--b2);}
.titem.on{border-color:var(--mint);background:var(--mintg);}
.ti-i{font-size:22px;margin-bottom:5px;display:block;}
.ti-n{font-size:11px;font-weight:700;color:var(--tx);}
.ti-s{font-size:9px;color:var(--mu);margin-top:2px;line-height:1.4;}
.titem.on .ti-n{color:var(--mint);}

.rlist{display:flex;flex-direction:column;gap:7px;}
.ropt{display:flex;align-items:center;gap:11px;padding:12px 14px;border-radius:12px;border:1.5px solid var(--b1);background:var(--g1);cursor:pointer;transition:all .15s;}
.ropt:hover{border-color:var(--b2);}
.ropt.on{border-color:var(--mint);background:var(--mintg);}
.rdot{width:15px;height:15px;border-radius:50%;border:2px solid var(--b2);background:var(--g1);flex-shrink:0;transition:all .15s;display:flex;align-items:center;justify-content:center;}
.ropt.on .rdot{border-color:var(--mint);background:var(--mint);}
.ropt.on .rdot::after{content:'';width:5px;height:5px;background:#000;border-radius:50%;}
.rn{font-size:13px;font-weight:600;color:var(--tx);}
.rs{font-size:10px;color:var(--mu);}
.ropt.on .rn{color:var(--mint);}
.rr{margin-left:auto;font-size:11px;font-weight:700;color:var(--mint);}

.mlrow{display:flex;gap:5px;}
.mlbtn{flex:1;padding:11px 4px;border-radius:8px;border:1.5px solid var(--b1);background:var(--g1);cursor:pointer;font-size:15px;font-weight:800;font-family:'DM Sans',sans-serif;color:var(--mu);text-align:center;transition:all .15s;}
.mlbtn:hover{border-color:var(--b2);color:var(--tx);}
.mlbtn.on{border-color:var(--mint);background:var(--mintg);color:var(--mint);}

.spgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;}
.spcard{padding:12px 8px;border-radius:12px;border:1.5px solid var(--b1);background:var(--g1);cursor:pointer;transition:all .18s;text-align:center;}
.spcard:hover{border-color:var(--b2);}
.spcard.on{border-color:var(--mint);background:var(--mintg);}
.spdots{display:flex;justify-content:center;gap:3px;margin-bottom:7px;flex-wrap:wrap;}
.spdot{width:22px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;}
.spdot.nv{background:rgba(251,113,133,.18);}
.spdot.vg{background:rgba(52,234,160,.12);}
.spl{font-size:10px;font-weight:700;color:var(--tx);}
.sps{font-size:9px;color:var(--mu);margin-top:2px;line-height:1.4;}
.spcard.on .spl{color:var(--mint);}

.chips{display:flex;flex-wrap:wrap;gap:6px;}
.chip{font-size:10px;font-weight:600;padding:5px 12px;border-radius:99px;border:1.5px solid var(--b1);background:var(--g1);color:var(--mu);cursor:pointer;transition:all .15s;user-select:none;}
.chip:hover{border-color:var(--b2);color:var(--tx);}
.chip.on{background:var(--mintg);border-color:var(--mint);color:var(--mint);}
.chip.onp{background:var(--pinkg);border-color:var(--pink);color:var(--pink);}

.bmi-strip{background:linear-gradient(135deg,rgba(52,234,160,.1),rgba(96,165,250,.09));border:1px solid var(--b2);border-radius:14px;padding:16px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:13px;}
.bmi-v{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;}
.bmi-l{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);margin-bottom:2px;}
.bmi-t{display:inline-block;margin-top:3px;font-size:8px;font-weight:700;padding:2px 7px;border-radius:99px;}

.sbn{background:linear-gradient(135deg,rgba(52,234,160,.1),rgba(96,165,250,.07));border:1px solid rgba(52,234,160,.2);border-radius:20px;padding:22px;margin-bottom:18px;}
.sbn-tag{font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--mint);margin-bottom:4px;}
.sbn-name{font-family:'Syne',sans-serif;font-size:clamp(16px,4vw,22px);font-weight:800;color:var(--tx);margin-bottom:18px;letter-spacing:-.3px;}
.sbn-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
@media(max-width:380px){.sbn-grid{grid-template-columns:1fr 1fr;}}
.sbi-l{font-size:7px;letter-spacing:2px;text-transform:uppercase;color:var(--mu);margin-bottom:2px;}
.sbi-v{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;}
.sbi-u{font-size:9px;color:var(--mu);margin-left:2px;}
.sbi-b{display:inline-block;margin-top:3px;font-size:8px;font-weight:700;padding:2px 8px;border-radius:99px;background:rgba(255,255,255,.08);}

.mprow{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px;}
.mpill{flex:1;min-width:55px;padding:9px 7px;border-radius:10px;text-align:center;}
.mp-v{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;}
.mp-u{font-size:8px;opacity:.6;margin-left:1px;}
.mp-l{font-size:7px;letter-spacing:1.5px;text-transform:uppercase;opacity:.65;margin-top:2px;}

.pbar{height:4px;background:var(--b1);border-radius:99px;overflow:hidden;}
.pbf{height:100%;border-radius:99px;transition:width .6s ease;}
.pbrow{display:flex;justify-content:space-between;margin-bottom:4px;}
.pbl{font-size:11px;font-weight:600;color:var(--mu);}
.pbv{font-size:11px;font-weight:700;color:var(--tx);}

.smbar{background:var(--g2);border:1px solid var(--b1);border-radius:10px;padding:10px 14px;margin-bottom:10px;display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
.smbar-l{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);margin-right:3px;}
.smp{padding:3px 9px;border-radius:99px;font-size:10px;font-weight:700;}

.msec{margin-bottom:28px;}
.mhdr{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.mnum{width:38px;height:38px;border-radius:10px;background:var(--g2);border:1px solid var(--b1);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
.mic{flex:1;}
.mtitle{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:var(--tx);}
.mmeta{font-size:9px;color:var(--mu);margin-top:2px;}
.mbadge{font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 9px;border-radius:99px;}
.bnv{color:var(--coral);background:rgba(251,113,133,.12);border:1px solid rgba(251,113,133,.2);}
.bvg{color:var(--mint);background:var(--mintg);border:1px solid rgba(52,234,160,.2);}

.optgrid{display:grid;grid-template-columns:1fr;gap:10px;}
@media(min-width:680px){.optgrid{grid-template-columns:1fr 1fr 1fr;}}
.ocard{background:var(--g1);border:1.5px solid var(--b1);border-radius:14px;padding:15px;transition:border-color .2s,transform .2s;position:relative;overflow:hidden;}
.ocard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;opacity:0;transition:opacity .2s;}
.ocard:hover{transform:translateY(-2px);box-shadow:var(--sh2);}
.ocard:hover::before{opacity:1;}
.oa::before{background:linear-gradient(90deg,var(--mint),var(--blue));}
.ob::before{background:linear-gradient(90deg,var(--amber),var(--coral));}
.oc::before{background:linear-gradient(90deg,var(--pink),var(--purple));}
.oa:hover{border-color:rgba(52,234,160,.35);}
.ob:hover{border-color:rgba(251,191,36,.35);}
.oc:hover{border-color:rgba(244,113,181,.35);}
.obdg{font-size:7px;font-weight:800;letter-spacing:2px;text-transform:uppercase;border-radius:4px;padding:2px 6px;margin-bottom:7px;display:inline-block;}
.oa .obdg{color:var(--mint);background:var(--mintg);}
.ob .obdg{color:var(--amber);background:rgba(251,191,36,.1);}
.oc .obdg{color:var(--pink);background:var(--pinkg);}
.oemo{font-size:26px;margin-bottom:5px;display:block;}
.oname{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--tx);line-height:1.3;margin-bottom:10px;}

.nutr-box{background:var(--g2);border:1px solid var(--b1);border-radius:8px;padding:9px 10px;margin-bottom:10px;}
.nrow{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:7px;}
.npill{flex:1;min-width:40px;padding:5px 3px;border-radius:7px;text-align:center;}
.np-v{font-family:'Syne',sans-serif;font-size:12px;font-weight:800;}
.np-u{font-size:7px;opacity:.5;}
.np-l{font-size:7px;letter-spacing:1px;text-transform:uppercase;opacity:.6;margin-top:1px;}
.mgrid{display:grid;grid-template-columns:1fr 1fr;gap:2px 7px;}
.mcr{display:flex;align-items:center;gap:4px;padding:2px 0;}
.mcr-n{font-size:9px;color:var(--mu);flex:1;}
.mcr-b{width:32px;height:2.5px;background:var(--b1);border-radius:1px;overflow:hidden;flex-shrink:0;}
.mcr-f{height:100%;border-radius:1px;}
.mcr-v{font-size:9px;font-weight:700;color:var(--tx);width:26px;text-align:right;flex-shrink:0;}

.expbtn{font-size:10px;font-weight:700;color:var(--mint);background:none;border:none;font-family:'DM Sans',sans-serif;cursor:pointer;padding:0;display:flex;align-items:center;gap:3px;}
.expbtn:hover{opacity:.7;}
.oexp{margin-top:12px;padding-top:12px;border-top:1px solid var(--b1);}
.elbl{font-size:7px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--li);margin-bottom:7px;}
.ilist{list-style:none;}
.ilist li{font-size:10px;color:var(--mu);padding:3px 0;border-bottom:1px solid var(--b1);display:flex;align-items:center;gap:6px;}
.ilist li:last-child{border-bottom:none;}
.idot{width:4px;height:4px;border-radius:50%;background:var(--mint);flex-shrink:0;}
.plist{list-style:none;counter-reset:s;}
.plist li{font-size:10px;color:var(--mu);padding:3px 0 3px 20px;position:relative;counter-increment:s;line-height:1.5;border-bottom:1px solid var(--b1);}
.plist li:last-child{border-bottom:none;}
.plist li::before{content:counter(s);position:absolute;left:0;top:4px;width:14px;height:14px;border-radius:3px;background:var(--mint);color:#000;font-size:7px;font-weight:800;display:flex;align-items:center;justify-content:center;}
.defnote{margin-top:8px;font-size:10px;color:var(--amber);background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.18);border-radius:7px;padding:6px 9px;line-height:1.5;}

.mfull{display:flex;flex-direction:column;}
.mfrow{display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid var(--b1);}
.mfrow:last-child{border-bottom:none;}
.mf-icon{font-size:12px;width:18px;text-align:center;flex-shrink:0;}
.mf-name{font-size:11px;color:var(--mu);flex:1;}
.mf-bar{width:56px;height:4px;background:var(--b1);border-radius:2px;overflow:hidden;flex-shrink:0;}
.mf-fill{height:100%;border-radius:2px;}
.mf-val{font-size:11px;font-weight:700;color:var(--tx);text-align:right;min-width:44px;}
.mf-rda{font-size:8px;color:var(--li);}
.mf-tag{font-size:8px;font-weight:700;padding:1px 6px;border-radius:99px;}
.tg{color:#34D399;background:rgba(52,211,153,.1);}
.tw{color:var(--amber);background:rgba(251,191,36,.1);}
.tl{color:var(--coral);background:rgba(251,113,133,.1);}

.daysum{background:var(--g2);border:1px solid var(--b2);border-radius:20px;padding:22px;margin-top:8px;}
.ds-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;margin-bottom:3px;}
.ds-sub{font-size:11px;color:var(--mu);margin-bottom:18px;}
.dsmacs{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--b1);border-radius:10px;overflow:hidden;margin-bottom:20px;}
@media(max-width:360px){.dsmacs{grid-template-columns:repeat(3,1fr);}}
.dsmc{background:var(--bg2);padding:12px 5px;text-align:center;}
.dsmc-l{font-size:7px;letter-spacing:1.5px;text-transform:uppercase;color:var(--li);margin-bottom:3px;}
.dsmc-v{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;}
.dsmc-u{font-size:8px;color:var(--mu);}
.cald{display:flex;gap:7px;flex-wrap:wrap;margin-top:14px;}
.cdi{flex:1;min-width:75px;background:var(--g1);border:1px solid var(--b1);border-radius:10px;padding:11px 13px;}
.cdi-l{font-size:7px;letter-spacing:1.5px;text-transform:uppercase;opacity:.6;margin-bottom:3px;}
.cdi-v{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;}

.phero{background:linear-gradient(135deg,rgba(52,234,160,.09),rgba(96,165,250,.07));border:1px solid var(--b2);border-radius:18px;padding:20px;margin-bottom:14px;display:flex;align-items:center;gap:14px;}
.pav{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,var(--mint),var(--blue));display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#000;flex-shrink:0;}
.pname{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;}
.pmeta{font-size:11px;color:var(--mu);margin-top:3px;}
.pedit{margin-left:auto;padding:7px 14px;border-radius:99px;border:1.5px solid var(--b2);background:var(--g1);color:var(--mu);font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;flex-shrink:0;}
.pedit:hover{border-color:var(--mint);color:var(--mint);}

.ptabs{display:flex;gap:3px;bac
