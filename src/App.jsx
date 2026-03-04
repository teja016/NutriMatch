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

.ptabs{display:flex;gap:3px;background:var(--g1);border:1px solid var(--b1);border-radius:10px;padding:3px;margin-bottom:14px;}
.ptab{flex:1;padding:8px 5px;border-radius:7px;font-size:10px;font-weight:700;font-family:'DM Sans',sans-serif;text-align:center;cursor:pointer;transition:all .15s;color:var(--mu);border:none;background:none;}
.ptab.on{background:var(--g2);color:var(--tx);box-shadow:0 1px 5px rgba(0,0,0,.3);}

.igrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.iitem{background:var(--g1);border:1px solid var(--b1);border-radius:10px;padding:11px 13px;}
.iitem-l{font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);margin-bottom:4px;}
.iitem-v{font-size:13px;font-weight:600;}
.ifl{grid-column:1/-1;}
.taglist{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px;}
.tagitem{font-size:9px;font-weight:600;padding:3px 9px;border-radius:99px;background:var(--g2);color:var(--mu);border:1px solid var(--b1);}

.medc{background:var(--g1);border:1px solid var(--b1);border-radius:10px;padding:13px 15px;margin-bottom:8px;}
.medtop{display:flex;align-items:flex-start;gap:8px;margin-bottom:5px;}
.medbadge{font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 7px;border-radius:99px;background:var(--blueg);color:var(--blue);}
.meddate{font-size:9px;color:var(--mu);}
.medtitle{font-size:13px;font-weight:700;margin-bottom:3px;}
.mednotes{font-size:10px;color:var(--mu);line-height:1.55;}

.toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--g3);backdrop-filter:blur(20px);border:1px solid var(--b2);border-radius:99px;padding:9px 18px;font-size:12px;font-weight:600;z-index:9999;animation:tin .3s ease;white-space:nowrap;}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(8px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

@keyframes fup{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
.fup{animation:fup .35s ease both;}

.bnav{position:fixed;bottom:0;left:0;right:0;z-index:100;background:rgba(8,9,15,0.94);backdrop-filter:blur(20px);border-top:1px solid var(--b1);padding:6px 0 max(6px,env(safe-area-inset-bottom));}
.bnav-in{max-width:480px;margin:0 auto;display:flex;justify-content:space-around;}
.bni{display:flex;flex-direction:column;align-items:center;gap:2px;padding:5px 14px;border:none;background:none;cursor:pointer;transition:all .15s;}
.bni-icon{font-size:19px;}
.bni-l{font-size:8px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--mu);}
.bni.active .bni-l{color:var(--mint);}
.bni.active .bni-icon{filter:drop-shadow(0 0 6px var(--mint));}

.divider{height:1px;background:var(--b1);margin:16px 0;}
.err{font-size:11px;color:var(--coral);margin-bottom:10px;}

@media(max-width:400px){.tg3{grid-template-columns:1fr 1fr;}.row2{grid-template-columns:1fr;}}
`;

// ── FOOD DATABASE ─────────────────────────────────────────────
const FOODS = [
  {id:"chicken_breast",name:"Chicken Breast",emoji:"🍗",per100g:{cal:165,pro:31,carb:0,fat:3.6,fib:0},micros:{vitamin_b12:0.3,zinc:1.0,magnesium:29,iron:1.0,potassium:256,selenium:27},role:"protein",tags:["non-veg","chicken"],allergens:[]},
  {id:"salmon",name:"Atlantic Salmon",emoji:"🐟",per100g:{cal:208,pro:20,carb:0,fat:13,fib:0},micros:{vitamin_d:11,vitamin_b12:3.2,omega3:2.3,magnesium:27,potassium:363,selenium:37},role:"protein",tags:["non-veg","fish"],allergens:["fish"]},
  {id:"tuna_canned",name:"Canned Tuna",emoji:"🐡",per100g:{cal:116,pro:25.5,carb:0,fat:1.0,fib:0},micros:{vitamin_d:4,vitamin_b12:2.5,omega3:0.3,iron:1.3,selenium:80},role:"protein",tags:["non-veg","fish"],allergens:["fish"]},
  {id:"tilapia",name:"Tilapia",emoji:"🐠",per100g:{cal:96,pro:20,carb:0,fat:1.7,fib:0},micros:{vitamin_b12:1.6,vitamin_d:1.7,zinc:0.4,potassium:302},role:"protein",tags:["non-veg","fish"],allergens:["fish"]},
  {id:"shrimp",name:"Shrimp",emoji:"🦐",per100g:{cal:85,pro:20,carb:0,fat:0.9,fib:0},micros:{vitamin_b12:1.3,selenium:38,zinc:1.1,omega3:0.5},role:"protein",tags:["non-veg","fish"],allergens:["shellfish"]},
  {id:"eggs",name:"Whole Eggs",emoji:"🥚",per100g:{cal:155,pro:13,carb:1.1,fat:11,fib:0},micros:{vitamin_d:2.0,vitamin_b12:1.1,folate:47,zinc:1.3,iron:1.8},role:"protein",tags:["vegetarian"],allergens:["eggs"]},
  {id:"tofu_firm",name:"Firm Tofu",emoji:"🧊",per100g:{cal:76,pro:8.1,carb:1.9,fat:4.2,fib:0.3},micros:{calcium:350,iron:2.7,magnesium:30,zinc:0.8},role:"protein",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:["soy"]},
  {id:"tempeh",name:"Tempeh",emoji:"🫒",per100g:{cal:193,pro:19,carb:9.4,fat:11,fib:0},micros:{iron:2.7,magnesium:81,calcium:111,zinc:1.7},role:"protein",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:["soy"]},
  {id:"lentils",name:"Red Lentils",emoji:"🫘",per100g:{cal:116,pro:9,carb:20,fat:0.4,fib:7.9},micros:{folate:181,iron:3.3,magnesium:36,zinc:1.3,potassium:369},role:"protein",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"chickpeas",name:"Chickpeas",emoji:"🫛",per100g:{cal:164,pro:9,carb:27,fat:2.6,fib:7.6},micros:{folate:172,iron:2.9,magnesium:48,zinc:1.5,calcium:49},role:"protein",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"greek_yogurt",name:"Greek Yogurt",emoji:"🥛",per100g:{cal:59,pro:10,carb:3.6,fat:0.4,fib:0},micros:{calcium:110,vitamin_b12:0.75,zinc:0.5,potassium:141},role:"protein",tags:["vegetarian"],allergens:["dairy"]},
  {id:"brown_rice",name:"Brown Rice",emoji:"🍚",per100g:{cal:112,pro:2.3,carb:24,fat:0.8,fib:1.6},micros:{magnesium:43,zinc:0.6,iron:0.5,folate:4},role:"carb",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"quinoa",name:"Quinoa",emoji:"🌾",per100g:{cal:120,pro:4.4,carb:21,fat:1.9,fib:2.8},micros:{magnesium:64,iron:1.5,zinc:1.1,folate:42},role:"carb",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"sweet_potato",name:"Sweet Potato",emoji:"🍠",per100g:{cal:86,pro:1.6,carb:20,fat:0.1,fib:3.0},micros:{vitamin_c:19,magnesium:25,folate:6,potassium:337},role:"carb",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"oats",name:"Rolled Oats",emoji:"🌾",per100g:{cal:371,pro:13,carb:67,fat:7,fib:10},micros:{magnesium:138,iron:4.7,zinc:3.6,folate:56},role:"carb",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:["gluten"]},
  {id:"ww_bread",name:"WW Bread",emoji:"🍞",per100g:{cal:247,pro:9,carb:46,fat:3.4,fib:6},micros:{iron:3.3,magnesium:76,zinc:1.8,folate:44},role:"carb",tags:["vegetarian"],allergens:["gluten"]},
  {id:"banana",name:"Banana",emoji:"🍌",per100g:{cal:89,pro:1.1,carb:23,fat:0.3,fib:2.6},micros:{magnesium:27,vitamin_c:8.7,folate:20,potassium:358},role:"carb",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"avocado",name:"Avocado",emoji:"🥑",per100g:{cal:160,pro:2,carb:9,fat:15,fib:6.7},micros:{folate:81,magnesium:29,vitamin_c:10,potassium:485},role:"fat",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"olive_oil",name:"Olive Oil",emoji:"🫒",per100g:{cal:884,pro:0,carb:0,fat:100,fib:0},micros:{vitamin_e:14,omega3:0.7},role:"fat",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"almonds",name:"Almonds",emoji:"🥜",per100g:{cal:579,pro:21,carb:22,fat:50,fib:12.5},micros:{magnesium:270,calcium:264,zinc:3.1,iron:3.7,vitamin_e:25},role:"fat",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:["nuts"]},
  {id:"walnuts",name:"Walnuts",emoji:"🥜",per100g:{cal:654,pro:15,carb:14,fat:65,fib:6.7},micros:{omega3:9.1,magnesium:158,folate:98,zinc:3.1},role:"fat",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:["nuts"]},
  {id:"chia_seeds",name:"Chia Seeds",emoji:"🌱",per100g:{cal:486,pro:17,carb:42,fat:31,fib:34},micros:{calcium:631,iron:7.7,magnesium:335,omega3:17.8,zinc:4.6},role:"fat",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"spinach",name:"Spinach",emoji:"🥬",per100g:{cal:23,pro:2.9,carb:3.6,fat:0.4,fib:2.2},micros:{iron:2.7,folate:194,calcium:99,magnesium:79,vitamin_c:28},role:"veg",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"broccoli",name:"Broccoli",emoji:"🥦",per100g:{cal:34,pro:2.8,carb:7,fat:0.4,fib:2.6},micros:{vitamin_c:89,folate:63,calcium:47,iron:0.7},role:"veg",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"kale",name:"Kale",emoji:"🥬",per100g:{cal:35,pro:2.9,carb:4.4,fat:0.7,fib:4.1},micros:{vitamin_c:93,calcium:150,iron:1.5,folate:141},role:"veg",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"bell_pepper",name:"Bell Pepper",emoji:"🫑",per100g:{cal:31,pro:1,carb:6,fat:0.3,fib:2.1},micros:{vitamin_c:128,folate:46,iron:0.4},role:"veg",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"mushrooms",name:"Mushrooms",emoji:"🍄",per100g:{cal:56,pro:1.6,carb:14,fat:0.2,fib:2.0},micros:{vitamin_d:1.7,zinc:1.3,iron:0.5,selenium:5.7},role:"veg",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"tomato",name:"Tomato",emoji:"🍅",per100g:{cal:18,pro:0.9,carb:3.9,fat:0.2,fib:1.2},micros:{vitamin_c:14,folate:15,iron:0.3,potassium:237},role:"veg",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
  {id:"cucumber",name:"Cucumber",emoji:"🥒",per100g:{cal:15,pro:0.7,carb:3.6,fat:0.1,fib:0.5},micros:{vitamin_c:2.8,potassium:147},role:"veg",tags:["vegan","vegetarian","non-dairy-vegan"],allergens:[]},
];
const gf = id => FOODS.find(f => f.id === id);

const COOK = {
  chicken_breast:["Season with garlic, paprika, herbs, salt & pepper.","Grill or bake 200°C for 22–26 min until 74°C internal. Rest 5 min, slice."],
  salmon:["Season with lemon zest, dill, salt.","Bake skin-down 200°C for 12–15 min until flesh flakes. Add lemon."],
  tuna_canned:["Drain and flake with a fork.","Season with lemon juice and pepper. Ready in 2 min."],
  tilapia:["Season with garlic, thyme, lemon.","Pan-fry 3–4 min each side in oil until golden and opaque."],
  shrimp:["Peel and devein.","Sauté with garlic in butter 2–3 min per side until pink."],
  eggs:["Whisk with salt and pepper.","Scramble on medium heat 2–3 min. Or poach in simmering water 3–4 min."],
  tofu_firm:["Press 10 min. Cube, toss with tamari, garlic, cornstarch.","Pan-fry medium-high 3 min per side until crispy."],
  tempeh:["Slice thin. Marinate in tamari, maple syrup, garlic 10 min.","Pan-fry until caramelised, 3–4 min per side."],
  lentils:["Rinse. Simmer 2x water with cumin, turmeric 20 min.","Season with salt, lemon, fresh herbs."],
  chickpeas:["Drain and rinse. Toss with cumin, paprika, olive oil.","Roast 200°C for 25–28 min, shaking halfway."],
  greek_yogurt:["Use cold from fridge.","Spoon as base and layer toppings."],
  brown_rice:["Rinse. Bring 1:2 with water to boil.","Simmer covered 30 min. Fluff and rest 5 min."],
  quinoa:["Rinse well. Bring 1:2 with water to boil.","Simmer 15 min until tails appear. Fluff."],
  sweet_potato:["Scrub and cube.","Toss with oil, roast 200°C for 25–30 min until caramelised."],
  oats:["Bring 2x water to boil. Add oats.","Simmer 4–5 min stirring until thick and creamy."],
  ww_bread:["Slice as needed.","Toast to golden brown."],
  banana:["Peel and slice.","No prep needed — natural sweetener."],
  avocado:["Halve, remove stone, scoop flesh.","Slice or mash. Season with lemon and salt."],
  olive_oil:["For cooking: heat medium heat.","For dressing: drizzle raw over finished dishes."],
  almonds:["Toast in dry pan 2–3 min.","Chop or use whole as topping."],
  walnuts:["Break apart by hand.","Use raw to preserve omega-3."],
  chia_seeds:["For pudding: mix 3 tbsp + 1 cup liquid, refrigerate overnight.","For crunch: sprinkle dry over bowls."],
  spinach:["Rinse thoroughly.","Wilt 60 sec in dry pan or serve raw."],
  broccoli:["Cut into florets.","Steam 4–5 min or roast 200°C for 18 min."],
  kale:["Remove stems, tear leaves.","Massage with lemon and salt, or sauté 2–3 min."],
  bell_pepper:["Deseed and slice.","Raw for max vitamin C, or roast 200°C 15 min."],
  mushrooms:["Wipe clean and slice.","Sauté in dry pan on high heat 4–5 min until golden."],
  tomato:["Slice or halve.","Serve raw or roast 180°C for 20 min."],
  cucumber:["Rinse and slice.","Serve raw for freshness."],
};

const TPL_NV_BFAST = [
  {label:"Salmon Power Plate",protein:"salmon",carb:"ww_bread",fat:"avocado",veg:["spinach","tomato"]},
  {label:"Chicken Oat Bowl",protein:"chicken_breast",carb:"oats",fat:"almonds",veg:["spinach","banana"]},
  {label:"Tuna Quinoa Bowl",protein:"tuna_canned",carb:"quinoa",fat:"chia_seeds",veg:["cucumber","tomato"]},
];
const TPL_NV_MAIN = [
  {label:"Grilled Chicken Bowl",protein:"chicken_breast",carb:"brown_rice",fat:"olive_oil",veg:["broccoli","bell_pepper"]},
  {label:"Baked Salmon Plate",protein:"salmon",carb:"quinoa",fat:"avocado",veg:["spinach","kale"]},
  {label:"Tilapia Sweet Potato",protein:"tilapia",carb:"sweet_potato",fat:"chia_seeds",veg:["broccoli","tomato"]},
];
const TPL_VG_BFAST = [
  {label:"Egg Avocado Toast",protein:"eggs",carb:"ww_bread",fat:"avocado",veg:["tomato","spinach"]},
  {label:"Yogurt Oat Bowl",protein:"greek_yogurt",carb:"oats",fat:"almonds",veg:["banana"]},
  {label:"Tofu Scramble",protein:"tofu_firm",carb:"quinoa",fat:"chia_seeds",veg:["spinach","mushrooms"]},
];
const TPL_VG_MAIN = [
  {label:"Lentil Dal & Rice",protein:"lentils",carb:"brown_rice",fat:"olive_oil",veg:["spinach","tomato"]},
  {label:"Chickpea Buddha Bowl",protein:"chickpeas",carb:"quinoa",fat:"avocado",veg:["kale","bell_pepper"]},
  {label:"Tempeh Stir Fry",protein:"tempeh",carb:"sweet_potato",fat:"walnuts",veg:["broccoli","cucumber"]},
];

const DEF_FOODS = {
  "Vitamin D":["salmon","tuna_canned","tilapia","eggs","mushrooms"],
  "Vitamin B12":["salmon","tuna_canned","tilapia","chicken_breast","shrimp","eggs","greek_yogurt"],
  "Vitamin C":["bell_pepper","broccoli","kale","tomato","spinach","cucumber"],
  "Iron":["spinach","lentils","chickpeas","tempeh","oats","chia_seeds","kale","tofu_firm"],
  "Calcium":["kale","almonds","tofu_firm","greek_yogurt","chia_seeds","tempeh"],
  "Zinc":["chicken_breast","oats","almonds","tempeh","lentils","quinoa","chia_seeds","shrimp"],
  "Magnesium":["spinach","quinoa","almonds","chia_seeds","oats","avocado","walnuts","tempeh"],
  "Folate":["spinach","lentils","chickpeas","avocado","broccoli","kale","oats","quinoa"],
  "Omega-3":["salmon","walnuts","chia_seeds","tuna_canned","shrimp"],
};

const MICRO_META = {
  vitamin_d:{name:"Vit D",icon:"☀️",unit:"mcg",rm:15,rf:15,color:"#FBBF24"},
  vitamin_b12:{name:"B12",icon:"🔴",unit:"mcg",rm:2.4,rf:2.4,color:"#FB7185"},
  vitamin_c:{name:"Vit C",icon:"🍊",unit:"mg",rm:90,rf:75,color:"#F97316"},
  vitamin_e:{name:"Vit E",icon:"🌻",unit:"mg",rm:15,rf:15,color:"#EAB308"},
  iron:{name:"Iron",icon:"⚙️",unit:"mg",rm:8,rf:18,color:"#A78BFA"},
  calcium:{name:"Calcium",icon:"🦴",unit:"mg",rm:1000,rf:1000,color:"#60A5FA"},
  zinc:{name:"Zinc",icon:"⚡",unit:"mg",rm:11,rf:8,color:"#2DD4BF"},
  magnesium:{name:"Magnesium",icon:"🔋",unit:"mg",rm:420,rf:320,color:"#34EAA0"},
  folate:{name:"Folate",icon:"🌿",unit:"mcg",rm:400,rf:400,color:"#4ADE80"},
  omega3:{name:"Omega-3",icon:"🐟",unit:"g",rm:1.6,rf:1.1,color:"#38BDF8"},
  potassium:{name:"Potassium",icon:"🍌",unit:"mg",rm:3400,rf:2600,color:"#FBBF24"},
  selenium:{name:"Selenium",icon:"🛡️",unit:"mcg",rm:55,rf:55,color:"#C084FC"},
};

const ACT_LEVELS = {
  "Sedentary":{m:1.2,l:"Desk job, no exercise"},
  "Lightly Active":{m:1.375,l:"Light exercise 1-3x/week"},
  "Moderately Active":{m:1.55,l:"Exercise 3-5x/week"},
  "Very Active":{m:1.725,l:"Hard exercise 6-7x/week"},
  "Extra Active":{m:1.9,l:"Athlete / physical job"},
};
const GOALS_M = {
  "Lose Fat":{adj:-400,sp:{pro:.35,carb:.33,fat:.32},l:"-400 kcal"},
  "Gentle Cut":{adj:-200,sp:{pro:.32,carb:.38,fat:.30},l:"-200 kcal"},
  "Maintain":{adj:0,sp:{pro:.25,carb:.45,fat:.30},l:"Maintenance"},
  "Build Muscle":{adj:300,sp:{pro:.30,carb:.45,fat:.25},l:"+300 kcal"},
  "Performance":{adj:200,sp:{pro:.25,carb:.50,fat:.25},l:"+200 kcal"},
  "Recomposition":{adj:50,sp:{pro:.35,carb:.38,fat:.27},l:"Slight surplus"},
};
const BT_ADJ = {Ectomorph:{c:150,cb:.05},Mesomorph:{c:0,cb:0},Endomorph:{c:-100,cb:-.05}};
const NON_VEG_DIETS = ["Non-Veg (All)","Chicken & Fish Only"];
const VITAMINS = ["Vitamin D","Vitamin B12","Vitamin C","Iron","Calcium","Zinc","Magnesium","Folate","Omega-3"];
const ALLERGENS = ["Nuts","Peanuts","Gluten","Dairy","Eggs","Soy","Shellfish","Sesame"];
const CONDITIONS = ["Diabetes","Hypertension","Thyroid","PCOS","High Cholesterol","Asthma","IBS","Anemia","Kidney Disease","None"];
const MW = {1:[1.0],2:[.45,.55],3:[.30,.40,.30],4:[.25,.30,.30,.15],5:[.20,.15,.30,.15,.20],6:[.15,.15,.25,.15,.15,.15]};
const ML = {1:["Full Day"],2:["Breakfast","Dinner"],3:["Breakfast","Lunch","Dinner"],4:["Breakfast","Lunch","Afternoon","Dinner"],5:["Breakfast","Mid-Morning","Lunch","Evening","Dinner"],6:["Breakfast","Mid-Morning","Lunch","Afternoon","Evening","Dinner"]};
const ME = ["🌅","☀️","🌤️","🌆","🌙","⭐"];

function deriveMacros(f) {
  const bmr = Math.round((10*f.weightKg)+(6.25*f.heightCm)-(5*f.age)+(f.gender==="Male"?5:-161));
  const tdee = Math.round(bmr*(ACT_LEVELS[f.activity]?.m||1.55));
  const g = GOALS_M[f.goal]||GOALS_M["Maintain"];
  const bt = BT_ADJ[f.bodyType]||BT_ADJ.Mesomorph;
  const cal = Math.max(1200,tdee+g.adj+bt.c);
  const cp = Math.max(.20,g.sp.carb+bt.cb), fp = Math.max(.15,g.sp.fat-bt.cb), pp = g.sp.pro;
  const bmi = +(f.weightKg/((f.heightCm/100)**2)).toFixed(1);
  const bmiC = bmi<18.5?{l:"Underweight",c:"#60A5FA"}:bmi<25?{l:"Normal",c:"#34EAA0"}:bmi<30?{l:"Overweight",c:"#FBBF24"}:{l:"Obese",c:"#FB7185"};
  const hi = f.heightCm/2.54, base = f.gender==="Male"?50:45.5, iw = base+2.3*(hi-60);
  return {
    calories:cal,protein:Math.round(cal*pp/4),carbs:Math.round(cal*cp/4),fats:Math.round(cal*fp/9),fiber:Math.round(cal/1000*14),
    bmr,tdee,proP:Math.round(pp*100),carbP:Math.round(cp*100),fatP:Math.round(fp*100),
    bmi,bmiC,idealWt:{min:Math.round(iw*.9),max:Math.round(iw*1.1),t:Math.round(iw)},
  };
}

function calcNutr(ings) {
  const t={cal:0,pro:0,carb:0,fat:0,fib:0}; const mc={};
  for(const ing of ings){
    const f=gf(ing.foodId); if(!f) continue; const r=ing.grams/100;
    t.cal+=f.per100g.cal*r; t.pro+=f.per100g.pro*r; t.carb+=f.per100g.carb*r; t.fat+=f.per100g.fat*r; t.fib+=f.per100g.fib*r;
    for(const[k,v] of Object.entries(f.micros||{})) mc[k]=(mc[k]||0)+v*r;
  }
  return {calories:Math.round(t.cal),protein:Math.round(t.pro),carbs:Math.round(t.carb),fats:Math.round(t.fat),fiber:Math.round(t.fib),micros:Object.fromEntries(Object.entries(mc).map(([k,v])=>[k,+v.toFixed(2)]))};
}

function solveMeal(tpl, targets, allergySet) {
  const safe = [tpl.protein,tpl.carb,tpl.fat,...tpl.veg].every(id=>{const f=gf(id);return f&&!(f.allergens||[]).some(a=>allergySet.has(a.toLowerCase()));});
  const t = safe?tpl:{...tpl,fat:"olive_oil"};
  const VG=55; const cl=n=>Math.max(0,n);
  let rem={cal:targets.calories,pro:targets.protein,carb:targets.carbs,fat:targets.fats};
  for(const id of t.veg){const f=gf(id);if(!f)continue;const r=VG/100;rem.cal-=f.per100g.cal*r;rem.pro-=f.per100g.pro*r;rem.carb-=f.per100g.carb*r;rem.fat-=f.per100g.fat*r;}
  rem={cal:cl(rem.cal),pro:cl(rem.pro),carb:cl(rem.carb),fat:cl(rem.fat)};
  const pF=gf(t.protein),pG=Math.max(40,Math.round(rem.pro*100/Math.max(pF.per100g.pro,.5)));
  rem.cal-=pF.per100g.cal*pG/100;rem.carb-=pF.per100g.carb*pG/100;rem.fat-=pF.per100g.fat*pG/100;
  rem={cal:cl(rem.cal),carb:cl(rem.carb),fat:cl(rem.fat)};
  const cF=gf(t.carb),cG=Math.max(20,Math.round(rem.carb*100/Math.max(cF.per100g.carb,.5)));
  rem.fat=cl(rem.fat-cF.per100g.fat*cG/100);
  const fF=gf(t.fat),fG=Math.max(5,Math.round(rem.fat*100/Math.max(fF.per100g.fat,.5)));
  const ings=[{foodId:t.protein,grams:pG},{foodId:t.carb,grams:cG},{foodId:t.fat,grams:fG},...t.veg.map(id=>({foodId:id,grams:VG}))];
  return {label:t.label,ingredients:ings,nutrition:calcNutr(ings)};
}

function buildPlan(form, macros) {
  const {meals,dietType,mealSplit,deficiencies,allergies} = form;
  const allergySet = new Set((allergies||[]).map(a=>a.toLowerCase()));
  const weights = MW[meals]||MW[3];
  const isNV = NON_VEG_DIETS.includes(dietType);
  const nvCount = isNV?(mealSplit?.nv??meals):0;
  const nvSet = new Set();
  if(nvCount>0){const sorted=weights.map((w,i)=>({w,i})).sort((a,b)=>b.w-a.w);for(let k=0;k<nvCount&&k<sorted.length;k++)nvSet.add(sorted[k].i);}
  const isVegan = ["Vegan","Non-Dairy Vegan"].includes(dietType);
  return weights.map((w,i) => {
    const t={calories:Math.round(macros.calories*w),protein:Math.round(macros.protein*w),carbs:Math.round(macros.carbs*w),fats:Math.round(macros.fats*w),fiber:Math.round(macros.fiber*w)};
    const isBfast = i===0||(meals>=5&&i===1&&w<.2);
    const mType = isNV&&nvSet.has(i)?"nv":"vg";
    let tplSet;
    if(mType==="nv"){tplSet=isBfast?TPL_NV_BFAST:TPL_NV_MAIN;}
    else{const base=isBfast?TPL_VG_BFAST:TPL_VG_MAIN;tplSet=isVegan?base.filter(tt=>gf(tt.protein)?.tags?.includes("vegan")):base;if(!tplSet.length)tplSet=base;}
    const options=tplSet.map(tpl=>{const solved=solveMeal(tpl,t,allergySet);const defHits=(deficiencies||[]).filter(d=>(DEF_FOODS[d]||[]).some(fid=>solved.ingredients.some(ing=>ing.foodId===fid)));return{...solved,defHits};});
    return {label:(ML[meals]||ML[3])[i],emoji:ME[i],mealType:mType,targets:t,options};
  });
}

function sumDayMicros(plan){const totals={};for(const m of plan){const n=m.options[0]?.nutrition;if(!n)continue;for(const[k,v] of Object.entries(n.micros||{}))totals[k]=(totals[k]||0)+v;}return totals;}

const LS = {
  get:(k)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}},
};

function MicroBar({id,val,gender,compact}){
  const m=MICRO_META[id];if(!m)return null;
  const rda=gender==="Female"?m.rf:m.rm;
  const pct=Math.min((val/rda)*100,100);
  const st=pct>=80?"g":pct>=40?"w":"l";
  const c={g:"#34D399",w:"#FBBF24",l:"#FB7185"}[st];
  const lbl={g:"✓ Good",w:"⚠ Low",l:"↓ Low"}[st];
  const cls={g:"tg",w:"tw",l:"tl"}[st];
  if(compact)return(<div className="mcr"><span className="mcr-n">{m.name}</span><div className="mcr-b"><div className="mcr-f" style={{width:`${pct}%`,background:m.color}}/></div><span className="mcr-v">{val<10?val.toFixed(1):Math.round(val)}</span></div>);
  return(<div className="mfrow"><span className="mf-icon">{m.icon}</span><span className="mf-name">{m.name}</span><div className="mf-bar"><div className="mf-fill" style={{width:`${pct}%`,background:m.color}}/></div><span className="mf-val">{val<10?val.toFixed(1):Math.round(val)}<span className="mf-rda"> {m.unit}</span></span><span className={`mf-tag ${cls}`}>{lbl}</span></div>);
}

function OptionCard({opt,idx,gender}){
  const [open,setOpen]=useState(false);
  const {label,ingredients,nutrition,defHits}=opt;
  const ingDet=ingredients.map(i=>({...i,food:gf(i.foodId)}));
  const mainEmo=ingDet.find(i=>i.food?.role==="protein")?.food?.emoji||"🍽️";
  const mkeys=Object.keys(nutrition.micros||{}).filter(k=>MICRO_META[k]);
  const OC=["oa","ob","oc"],OL=["Option A","Option B","Option C"];
  return(
    <div className={`ocard ${OC[idx]||""}`}>
      <div className="obdg">{OL[idx]||`Opt ${idx+1}`}</div>
      <span className="oemo">{mainEmo}</span>
      <div className="oname">{label}</div>
      <div className="nutr-box">
        <div className="nrow">
          {[{v:nutrition.calories,l:"kcal",bg:"rgba(251,191,36,.12)",c:"#FBBF24"},
            {v:nutrition.protein,l:"pro",bg:"rgba(52,234,160,.1)",c:"#34EAA0"},
            {v:nutrition.carbs,l:"carb",bg:"rgba(96,165,250,.1)",c:"#60A5FA"},
            {v:nutrition.fats,l:"fat",bg:"rgba(251,113,133,.1)",c:"#FB7185"},
            {v:nutrition.fiber,l:"fiber",bg:"rgba(167,139,250,.1)",c:"#A78BFA"},
          ].map(({v,l,bg,c})=>(
            <div key={l} className="npill" style={{background:bg}}>
              <div className="np-v" style={{color:c}}>{v}</div>
              <div className="np-l" style={{color:c}}>{l}</div>
            </div>
          ))}
        </div>
        {mkeys.length>0&&<div className="mgrid">{mkeys.slice(0,6).map(k=><MicroBar key={k} id={k} val={nutrition.micros[k]} gender={gender} compact/>)}</div>}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
        {ingDet.map((i,ii)=>i.food&&<span key={ii} style={{fontSize:9,fontWeight:600,padding:"2px 8px",borderRadius:99,background:"var(--g2)",color:"var(--mu)",border:"1px solid var(--b1)"}}>{i.food.emoji} {i.grams}g {i.food.name}</span>)}
      </div>
      {defHits?.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:8}}>{defHits.map(d=><span key={d} style={{fontSize:8,fontWeight:700,padding:"2px 7px",borderRadius:4,background:"rgba(251,191,36,.1)",color:"var(--amber)",border:"1px solid rgba(251,191,36,.2)"}}>✦ {d}</span>)}</div>}
      <button className="expbtn" onClick={()=>setOpen(!open)}>{open?"▲ Hide":"▼ Full nutrition & prep"}</button>
      {open&&(
        <div className="oexp">
          <div className="elbl">Macronutrients</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px",marginBottom:12}}>
            {[{l:"Calories",v:nutrition.calories,u:"kcal",c:"#FBBF24"},{l:"Protein",v:nutrition.protein,u:"g",c:"#34EAA0"},{l:"Carbs",v:nutrition.carbs,u:"g",c:"#60A5FA"},{l:"Fat",v:nutrition.fats,u:"g",c:"#FB7185"},{l:"Fiber",v:nutrition.fiber,u:"g",c:"#A78BFA"}].map(({l,v,u,c})=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:"1px solid var(--b1)"}}>
                <span style={{fontSize:10,color:"var(--mu)"}}>{l}</span>
                <span style={{fontSize:12,fontWeight:800,color:c,fontFamily:"Syne,sans-serif"}}>{v}<span style={{fontSize:8,color:"var(--li)",marginLeft:1}}>{u}</span></span>
              </div>
            ))}
          </div>
          {mkeys.length>0&&<><div className="elbl">Micronutrients vs RDA</div><div className="mfull" style={{marginBottom:12}}>{mkeys.map(k=><MicroBar key={k} id={k} val={nutrition.micros[k]} gender={gender}/>)}</div></>}
          <div className="elbl">Ingredients</div>
          <ul className="ilist">{ingDet.map((i,ii)=>i.food&&<li key={ii}><span className="idot"/>{i.grams}g {i.food.name}</li>)}</ul>
          <div className="elbl" style={{marginTop:11}}>Preparation</div>
          <ol className="plist">{ingDet.flatMap((i,ii)=>{const s=COOK[i.foodId];if(!s)return[];return s.map((st,si)=><li key={`${ii}-${si}`}><strong style={{color:"var(--tx)"}}>{i.food?.name}:</strong> {st}</li>);})}</ol>
          {defHits?.length>0&&<div className="defnote">💊 Targets your <strong>{defHits.join(", ")}</strong> deficiency through key ingredients.</div>}
        </div>
      )}
    </div>
  );
}

function OTPLogin({onLogin}){
  const [phone,setPhone]=useState("");
  const [otp,setOtp]=useState("");
  const [sentOtp,setSentOtp]=useState(null);
  const [stage,setStage]=useState("phone");
  const [err,setErr]=useState("");
  const sendOTP=()=>{if(phone.length<10){setErr("Enter valid 10-digit number");return;}const code=Math.floor(100000+Math.random()*900000).toString();setSentOtp(code);setStage("otp");setErr("");};
  const verify=()=>{if(otp===sentOtp){const user=LS.get("ne_u_"+phone)||{phone,createdAt:new Date().toISOString()};LS.set("ne_u_"+phone,user);LS.set("ne_cur",phone);onLogin(user);}else setErr("Incorrect OTP. Try again.");};
  return(
    <div className="auth-wrap">
      <div className="mesh"><div className="blob b1c"/><div className="blob b2c"/><div className="blob b3c"/></div>
      <div className="auth-card fup">
        <div className="auth-logo">NutriEngine</div>
        <div className="auth-tagline">Your precision nutrition companion ✦</div>
        {stage==="phone"?(
          <>
            <p style={{fontSize:13,fontFamily:"Syne,sans-serif",fontWeight:700,marginBottom:4}}>Welcome 👋</p>
            <p style={{fontSize:12,color:"var(--mu)",marginBottom:18,lineHeight:1.65}}>Enter your mobile number. We'll send a 6-digit OTP to verify.</p>
            <div className="fld"><label>Mobile Number</label><div className="ip"><span>+91</span><input type="tel" placeholder="98765 43210" value={phone} maxLength={10} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))}/></div></div>
            {err&&<p className="err">{err}</p>}
            <button className="btn-p" onClick={sendOTP} disabled={phone.length<10}>Send OTP →</button>
          </>
        ):(
          <>
            <p style={{fontSize:13,fontFamily:"Syne,sans-serif",fontWeight:700,marginBottom:4}}>Verify OTP 🔐</p>
            <p style={{fontSize:12,color:"var(--mu)",marginBottom:10}}>Sent to +91 {phone}</p>
            <div className="otp-box"><div style={{fontSize:10,color:"var(--mu)",marginBottom:3}}>Demo — Your OTP is:</div><div className="otp-code">{sentOtp}</div><div className="otp-hint">In production this arrives via SMS (Twilio / Firebase)</div></div>
            <div className="fld"><label>Enter OTP</label><input type="tel" placeholder="• • • • • •" value={otp} maxLength={6} onChange={e=>setOtp(e.target.value.replace(/\D/g,""))} style={{letterSpacing:8,fontSize:20,textAlign:"center"}}/></div>
            {err&&<p className="err">{err}</p>}
            <button className="btn-p" onClick={verify} disabled={otp.length<6}>Verify & Enter →</button>
            <button className="btn-ghost" style={{width:"100%",marginTop:6}} onClick={()=>setStage("phone")}>← Change number</button>
          </>
        )}
      </div>
    </div>
  );
}

function ProfileScreen({profile,setProfile,onStartPlan}){
  const [tab,setTab]=useState("general");
  const [editing,setEditing]=useState(!profile.name);
  const [draft,setDraft]=useState({...profile});
  const [showAddMed,setShowAddMed]=useState(false);
  const [medDraft,setMedDraft]=useState({date:"",type:"Checkup",condition:"",doctor:"",notes:""});
  const [toast,setToast]=useState("");
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2400);};
  const tog=(k,v)=>setDraft(d=>({...d,[k]:d[k]?.includes(v)?d[k].filter(x=>x!==v):[...(d[k]||[]),v]}));
  const initials=(draft.name||"?").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  const save=()=>{const u={...draft,lastUpdated:new Date().toISOString()};setProfile(u);LS.set("ne_p_"+profile.phone,u);setEditing(false);showToast("✓ Profile saved");};
  const addMed=()=>{const r=[...(profile.medicalReports||[]),{...medDraft,id:Date.now()}];const u={...profile,medicalReports:r};setProfile(u);setDraft(u);LS.set("ne_p_"+profile.phone,u);setShowAddMed(false);setMedDraft({date:"",type:"Checkup",condition:"",doctor:"",notes:""});showToast("✓ Report added");};
  const delMed=id=>{const r=(profile.medicalReports||[]).filter(r=>r.id!==id);const u={...profile,medicalReports:r};setProfile(u);LS.set("ne_p_"+profile.phone,u);showToast("Report removed");};
  return(
    <div className="page fup">
      {toast&&<div className="toast">{toast}</div>}
      <div className="phero">
        <div className="pav">{initials}</div>
        <div><div className="pname">{draft.name||"Set up profile"}</div><div className="pmeta">📱 {profile.phone}{draft.dob&&" · "+new Date(draft.dob).getFullYear()}</div></div>
        <button className="pedit" onClick={()=>setEditing(!editing)}>{editing?"Cancel":"Edit"}</button>
      </div>
      <div className="ptabs">
        {["general","health","diet","medical"].map(t=>(
          <button key={t} className={`ptab ${tab===t?"on":""}`} onClick={()=>setTab(t)}>
            {t==="general"?"👤":t==="health"?"🏥":t==="diet"?"🥗":"📋"} {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      {tab==="general"&&(editing?(
        <div className="card">
          <div className="ctitle">Personal Info</div>
          <div className="fld"><label>Full Name</label><input value={draft.name||""} placeholder="Your name" onChange={e=>setDraft({...draft,name:e.target.value})}/></div>
          <div className="row2">
            <div className="fld"><label>Date of Birth</label><input type="date" value={draft.dob||""} onChange={e=>setDraft({...draft,dob:e.target.value})}/></div>
            <div className="fld"><label>Gender</label><select value={draft.gender||""} onChange={e=>setDraft({...draft,gender:e.target.value})}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
          </div>
          <div className="fld"><label>Email</label><input type="email" value={draft.email||""} placeholder="you@email.com" onChange={e=>setDraft({...draft,email:e.target.value})}/></div>
          <div className="fld"><label>Location</label><input value={draft.location||""} placeholder="City, Country" onChange={e=>setDraft({...draft,location:e.target.value})}/></div>
          <button className="btn-p" onClick={save}>Save Profile</button>
        </div>
      ):(
        <div className="card">
          <div className="ctitle">Personal Info</div>
          <div className="igrid">
            <div className="iitem"><div className="iitem-l">Name</div><div className="iitem-v">{draft.name||"—"}</div></div>
            <div className="iitem"><div className="iitem-l">Gender</div><div className="iitem-v">{draft.gender||"—"}</div></div>
            <div className="iitem"><div className="iitem-l">Date of Birth</div><div className="iitem-v">{draft.dob?new Date(draft.dob).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"—"}</div></div>
            <div className="iitem"><div className="iitem-l">Mobile</div><div className="iitem-v">{profile.phone}</div></div>
            <div className="iitem ifl"><div className="iitem-l">Email</div><div className="iitem-v">{draft.email||"—"}</div></div>
            <div className="iitem ifl"><div className="iitem-l">Location</div><div className="iitem-v">{draft.location||"—"}</div></div>
          </div>
        </div>
      ))}
      {tab==="health"&&(editing?(
        <div className="card">
          <div className="ctitle">Health Metrics</div>
          <div className="row2">
            <div className="fld"><label>Height (cm)</label><input type="number" value={draft.heightCm||""} placeholder="175" onChange={e=>setDraft({...draft,heightCm:+e.target.value})}/></div>
            <div className="fld"><label>Weight (kg)</label><input type="number" value={draft.weightKg||""} placeholder="70" onChange={e=>setDraft({...draft,weightKg:+e.target.value})}/></div>
          </div>
          <div className="fld"><label>Body Type</label><select value={draft.bodyType||""} onChange={e=>setDraft({...draft,bodyType:e.target.value})}><option value="">Select</option><option>Ectomorph</option><option>Mesomorph</option><option>Endomorph</option></select></div>
          <div className="fld"><label>Activity Level</label><select value={draft.activity||""} onChange={e=>setDraft({...draft,activity:e.target.value})}><option value="">Select</option>{Object.keys(ACT_LEVELS).map(k=><option key={k}>{k}</option>)}</select></div>
          <div className="fld"><label>Medical Conditions</label><div className="chips" style={{marginTop:4}}>{CONDITIONS.map(c=><div key={c} className={`chip ${(draft.conditions||[]).includes(c)?"on":""}`} onClick={()=>tog("conditions",c)}>{c}</div>)}</div></div>
          <button className="btn-p" onClick={save}>Save Health Info</button>
        </div>
      ):(
        <>
          {draft.heightCm&&draft.weightKg&&(()=>{const bmi=+(draft.weightKg/((draft.heightCm/100)**2)).toFixed(1);const cat=bmi<18.5?{l:"Underweight",c:"#60A5FA"}:bmi<25?{l:"Normal",c:"#34EAA0"}:bmi<30?{l:"Overweight",c:"#FBBF24"}:{l:"Obese",c:"#FB7185"};return(<div className="card"><div className="ctitle">Body Stats</div><div className="bmi-strip"><div><div className="bmi-l">BMI</div><div className="bmi-v">{bmi}</div><div className="bmi-t" style={{background:cat.c+"22",color:cat.c}}>{cat.l}</div></div><div><div className="bmi-l">Height</div><div className="bmi-v">{draft.heightCm}<span style={{fontSize:11}}>cm</span></div></div><div><div className="bmi-l">Weight</div><div className="bmi-v">{draft.weightKg}<span style={{fontSize:11}}>kg</span></div></div></div></div>);})()}
          <div className="card">
            <div className="ctitle">Health Profile</div>
            <div className="igrid">
              <div className="iitem"><div className="iitem-l">Body Type</div><div className="iitem-v">{draft.bodyType||"—"}</div></div>
              <div className="iitem"><div className="iitem-l">Activity</div><div className="iitem-v">{draft.activity||"—"}</div></div>
              <div className="iitem ifl"><div className="iitem-l">Conditions</div><div className="taglist">{(draft.conditions||[]).length>0?(draft.conditions||[]).map(c=><span key={c} className="tagitem">{c}</span>):<span style={{fontSize:11,color:"var(--mu)"}}>None reported</span>}</div></div>
            </div>
          </div>
        </>
      ))}
      {tab==="diet"&&(editing?(
        <div className="card">
          <div className="ctitle">Diet Preferences</div>
          <div className="fld"><label>Diet Type</label><select value={draft.dietType||""} onChange={e=>setDraft({...draft,dietType:e.target.value})}><option value="">Select</option>{["Non-Veg (All)","Chicken & Fish Only","Vegetarian","Vegan","Non-Dairy Vegan"].map(d=><option key={d}>{d}</option>)}</select></div>
          <div className="fld"><label>Goal</label><select value={draft.goal||""} onChange={e=>setDraft({...draft,goal:e.target.value})}><option value="">Select</option>{Object.keys(GOALS_M).map(k=><option key={k}>{k}</option>)}</select></div>
          <div className="fld"><label>Deficiencies</label><div className="chips" style={{marginTop:4}}>{VITAMINS.map(v=><div key={v} className={`chip ${(draft.deficiencies||[]).includes(v)?"on":""}`} onClick={()=>tog("deficiencies",v)}>{v}</div>)}</div></div>
          <div className="fld"><label>Allergies</label><div className="chips" style={{marginTop:4}}>{ALLERGENS.map(a=><div key={a} className={`chip ${(draft.allergies||[]).includes(a)?"onp":""}`} onClick={()=>tog("allergies",a)}>{a}</div>)}</div></div>
          <button className="btn-p" onClick={save}>Save Diet Info</button>
        </div>
      ):(
        <div className="card">
          <div className="ctitle">Diet Plan</div>
          <div className="igrid">
            <div className="iitem"><div className="iitem-l">Diet Type</div><div className="iitem-v">{draft.dietType||"—"}</div></div>
            <div className="iitem"><div className="iitem-l">Goal</div><div className="iitem-v">{draft.goal||"—"}</div></div>
            <div className="iitem ifl"><div className="iitem-l">Deficiencies</div><div className="taglist">{(draft.deficiencies||[]).length>0?(draft.deficiencies||[]).map(d=><span key={d} className="tagitem">{d}</span>):<span style={{fontSize:11,color:"var(--mu)"}}>None</span>}</div></div>
            <div className="iitem ifl"><div className="iitem-l">Allergies</div><div className="taglist">{(draft.allergies||[]).length>0?(draft.allergies||[]).map(a=><span key={a} className="tagitem" style={{borderColor:"rgba(251,113,133,.25)",color:"var(--coral)"}}>{a}</span>):<span style={{fontSize:11,color:"var(--mu)"}}>None</span>}</div></div>
          </div>
          <button className="btn-p" style={{marginTop:14}} onClick={onStartPlan}>⚡ Generate My Meal Plan</button>
        </div>
      ))}
      {tab==="medical"&&(
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{fontSize:13,fontWeight:700}}>Medical History</span>
            <button className="btn-pill" onClick={()=>setShowAddMed(!showAddMed)}>+ Add Report</button>
          </div>
          {showAddMed&&(
            <div className="card" style={{border:"1px solid rgba(52,234,160,.2)"}}>
              <div className="ctitle">Add Medical Report</div>
              <div className="row2">
                <div className="fld"><label>Date</label><input type="date" value={medDraft.date} onChange={e=>setMedDraft({...medDraft,date:e.target.value})}/></div>
                <div className="fld"><label>Type</label><select value={medDraft.type} onChange={e=>setMedDraft({...medDraft,type:e.target.value})}>{["Checkup","Lab Report","Prescription","Scan","Vaccination","Other"].map(t=><option key={t}>{t}</option>)}</select></div>
              </div>
              <div className="fld"><label>Condition / Diagnosis</label><input value={medDraft.condition} placeholder="e.g. Vitamin D deficiency" onChange={e=>setMedDraft({...medDraft,condition:e.target.value})}/></div>
              <div className="fld"><label>Doctor / Hospital</label><input value={medDraft.doctor} placeholder="Dr. Name / Hospital" onChange={e=>setMedDraft({...medDraft,doctor:e.target.value})}/></div>
              <div className="fld"><label>Notes</label><textarea value={medDraft.notes} placeholder="Additional notes..." onChange={e=>setMedDraft({...medDraft,notes:e.target.value})}/></div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn-p" style={{flex:1}} onClick={addMed} disabled={!medDraft.condition||!medDraft.date}>Save</button>
                <button className="btn-s" onClick={()=>setShowAddMed(false)}>Cancel</button>
              </div>
            </div>
          )}
          {(profile.medicalReports||[]).length===0&&!showAddMed&&(
            <div style={{textAlign:"center",padding:"40px 20px",color:"var(--mu)"}}>
              <div style={{fontSize:36,marginBottom:10}}>📋</div>
              <div style={{fontSize:13,fontWeight:700,marginBottom:5}}>No reports yet</div>
              <div style={{fontSize:11,lineHeight:1.65}}>Add medical reports, lab results, and prescriptions to keep everything in one place.</div>
            </div>
          )}
          {(profile.medicalReports||[]).map(r=>(
            <div key={r.id} className="medc">
              <div className="medtop"><span className="medbadge">{r.type}</span><span className="meddate">{r.date?new Date(r.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):""}</span><button onClick={()=>delMed(r.id)} style={{border:"none",background:"none",color:"var(--li)",cursor:"pointer",fontSize:15,marginLeft:"auto",padding:0}}>×</button></div>
              <div className="medtitle">{r.condition}</div>
              {r.doctor&&<div style={{fontSize:10,color:"var(--mu)",marginBottom:3}}>👨‍⚕️ {r.doctor}</div>}
              {r.notes&&<div className="mednotes">{r.notes}</div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function Stepper({step}){
  const steps=["Profile","Body","Goals","Plan"];
  return(
    <div className="stepper">
      {steps.map((s,i)=>{const n=i+1,st=n<step?"done":n===step?"active":"todo";return(
        <div key={s} className="si">
          <div className="sw"><div className={`sb ${st}`}>{st==="done"?"✓":n}</div><div className={`sl ${st}`}>{s}</div></div>
          {i<steps.length-1&&<div className={`sline ${n<step?"done":"todo"}`}/>}
        </div>
      );})}
    </div>
  );
}

function PlanStep1({data,setData,onNext}){
  const ok=data.gender&&data.age>=10&&data.age<=100;
  return(
    <div className="page fup">
      <div className="pg-title">Your <span className="grad">basics</span></div>
      <div className="pg-sub">Pre-filled from profile. Adjust if needed.</div>
      <div className="card"><div className="ctitle">Gender</div>
        <div className="tgrid tg3">
          {[{id:"Male",e:"👨"},{id:"Female",e:"👩"},{id:"Other",e:"🧑"}].map(g=>(
            <div key={g.id} className={`titem ${data.gender===g.id?"on":""}`} onClick={()=>setData({...data,gender:g.id})}>
              <span className="ti-i">{g.e}</span><div className="ti-n">{g.id}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card"><div className="ctitle">Age</div>
        <div className="fld" style={{maxWidth:170}}><label>Age (years)</label><input type="number" min={10} max={100} value={data.age||""} placeholder="e.g. 28" onChange={e=>setData({...data,age:+e.target.value})}/></div>
      </div>
      <div className="navrow"><button className="btn-p" style={{maxWidth:180}} onClick={onNext} disabled={!ok}>Next →</button></div>
    </div>
  );
}

function PlanStep2({data,setData,onNext,onBack}){
  const bmi=data.heightCm&&data.weightKg?+(data.weightKg/((data.heightCm/100)**2)).toFixed(1):null;
  const cat=bmi?(bmi<18.5?{l:"Underweight",c:"#60A5FA"}:bmi<25?{l:"Normal",c:"#34EAA0"}:bmi<30?{l:"Overweight",c:"#FBBF24"}:{l:"Obese",c:"#FB7185"}):null;
  const hi=data.heightCm/2.54,base=data.gender==="Male"?50:45.5,iwt=base+2.3*(hi-60);
  const ok=data.heightCm>100&&data.weightKg>20&&data.bodyType&&data.activity;
  return(
    <div className="page fup">
      <div className="pg-title">Body & <span className="grad">activity</span></div>
      <div className="pg-sub">Used to calculate your BMR, TDEE, and ideal weight.</div>
      <div className="card"><div className="ctitle">Height & Weight</div>
        <div className="row2">
          <div className="fld"><label>Height (cm)</label><input type="number" min={100} max={250} value={data.heightCm||""} placeholder="175" onChange={e=>setData({...data,heightCm:+e.target.value})}/></div>
          <div className="fld"><label>Weight (kg)</label><input type="number" min={20} max={300} value={data.weightKg||""} placeholder="70" onChange={e=>setData({...data,weightKg:+e.target.value})}/></div>
        </div>
        {bmi&&(<div className="bmi-strip">
          <div><div className="bmi-l">BMI</div><div className="bmi-v">{bmi}</div><div className="bmi-t" style={{background:cat.c+"22",color:cat.c}}>{cat.l}</div></div>
          <div><div className="bmi-l">Ideal</div><div className="bmi-v">{Math.round(iwt*.9)}–{Math.round(iwt*1.1)}<span style={{fontSize:10}}>kg</span></div></div>
          <div><div className="bmi-l">Diff</div><div className="bmi-v" style={{color:data.weightKg>iwt*1.1?"#FB7185":data.weightKg<iwt*.9?"#60A5FA":"#34EAA0"}}>{data.weightKg>iwt?"+":""}{Math.round(data.weightKg-iwt)}<span style={{fontSize:10}}>kg</span></div></div>
        </div>)}
      </div>
      <div className="card"><div className="ctitle">Body Type</div>
        <div className="tgrid tg3">
          {[{id:"Ectomorph",e:"🏃",s:"Lean, fast metabolism"},{id:"Mesomorph",e:"🏋️",s:"Athletic, balanced"},{id:"Endomorph",e:"🤸",s:"Stocky, slower"}].map(bt=>(
            <div key={bt.id} className={`titem ${data.bodyType===bt.id?"on":""}`} onClick={()=>setData({...data,bodyType:bt.id})}>
              <span className="ti-i">{bt.e}</span><div className="ti-n">{bt.id}</div><div className="ti-s">{bt.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card"><div className="ctitle">Activity Level</div>
        <div className="rlist">
          {Object.entries(ACT_LEVELS).map(([k,v])=>(
            <div key={k} className={`ropt ${data.activity===k?"on":""}`} onClick={()=>setData({...data,activity:k})}>
              <div className="rdot"/><div><div className="rn">{k}</div><div className="rs">{v.l}</div></div>
              <span className="rr">×{v.m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="navrow">
        <button className="btn-s" onClick={onBack}>← Back</button>
        <button className="btn-p" style={{flex:1,maxWidth:200}} onClick={onNext} disabled={!ok}>Next →</button>
      </div>
    </div>
  );
}

function PlanStep3({data,setData,onGenerate,onBack}){
  const tog=(k,v)=>setData(d=>({...d,[k]:d[k]?.includes(v)?d[k].filter(x=>x!==v):[...(d[k]||[]),v]}));
  const isNV=NON_VEG_DIETS.includes(data.dietType);
  const meals=data.meals||3;
  const splitOpts=Array.from({length:meals+1},(_,i)=>({nv:i,vg:meals-i}));
  const ok=data.goal&&data.dietType&&data.meals&&(!isNV||data.mealSplit!=null);
  const DIET_TYPES=[{id:"Non-Veg (All)",e:"🥩",s:"All meats & fish"},{id:"Chicken & Fish Only",e:"🍗",s:"Poultry & seafood"},{id:"Vegetarian",e:"🥗",s:"Eggs & dairy OK"},{id:"Vegan",e:"🌿",s:"Fully plant-based"},{id:"Non-Dairy Vegan",e:"🌱",s:"No dairy or eggs"}];
  const GOAL_LIST=[{id:"Lose Fat",e:"🔥",s:"-400 kcal"},{id:"Gentle Cut",e:"✂️",s:"-200 kcal"},{id:"Maintain",e:"⚖️",s:"Maintenance"},{id:"Build Muscle",e:"💪",s:"+300 kcal"},{id:"Performance",e:"⚡",s:"+200 kcal"},{id:"Recomposition",e:"🔄",s:"Slight surplus"}];
  return(
    <div className="page fup">
      <div className="pg-title">Goals & <span className="grad">diet</span></div>
      <div className="pg-sub">We'll calculate your exact macros from your body data.</div>
      <div className="card"><div className="ctitle">Primary Goal</div>
        <div className="tgrid tg3">{GOAL_LIST.map(g=><div key={g.id} className={`titem ${data.goal===g.id?"on":""}`} onClick={()=>setData({...data,goal:g.id})}><span className="ti-i">{g.e}</span><div className="ti-n">{g.id}</div><div className="ti-s">{g.s}</div></div>)}</div>
      </div>
      <div className="card"><div className="ctitle">Diet Type</div>
        <div className="rlist">{DIET_TYPES.map(d=><div key={d.id} className={`ropt ${data.dietType===d.id?"on":""}`} onClick={()=>setData({...data,dietType:d.id,mealSplit:null})}><div className="rdot"/><span style={{fontSize:17}}>{d.e}</span><div><div className="rn">{d.id}</div><div className="rs">{d.s}</div></div></div>)}</div>
      </div>
      <div className="card"><div className="ctitle">Meals Per Day</div>
        <div className="mlrow">{[1,2,3,4,5,6].map(n=><button key={n} className={`mlbtn ${meals===n?"on":""}`} onClick={()=>setData({...data,meals:n,mealSplit:null})}>{n}</button>)}</div>
      </div>
      {isNV&&(
        <div className="card" style={{border:"1px solid rgba(251,113,133,.2)"}}>
          <div className="ctitle" style={{color:"var(--coral)"}}>Meal Composition Split</div>
          <p style={{fontSize:11,color:"var(--mu)",marginBottom:12,lineHeight:1.65}}>
            <strong style={{color:"var(--tx)"}}>{meals} meals</strong> · <strong style={{color:"var(--tx)"}}>{data.dietType}</strong>. How many should be <span style={{color:"var(--coral)",fontWeight:700}}>Non-Veg 🥩</span> vs <span style={{color:"var(--mint)",fontWeight:700}}>Veg 🥗</span>?
          </p>
          <div className="spgrid">
            {splitOpts.map(({nv,vg})=>(
              <div key={nv} className={`spcard ${data.mealSplit?.nv===nv?"on":""}`} onClick={()=>setData({...data,mealSplit:{nv,vg}})}>
                <div className="spdots">
                  {Array.from({length:nv}).map((_,i)=><div key={"n"+i} className="spdot nv">🥩</div>)}
                  {Array.from({length:vg}).map((_,i)=><div key={"v"+i} className="spdot vg">🥗</div>)}
                </div>
                <div className="spl">{nv===0?"All Veg":vg===0?"All NV":`${nv} NV + ${vg} Veg`}</div>
                <div className="sps">{nv===0?"Max plant nutrients":vg===0?"Max B12 & omega-3":"Best diversity"}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="card"><div className="ctitle">Deficiencies to Address</div><div className="chips">{VITAMINS.map(v=><div key={v} className={`chip ${(data.deficiencies||[]).includes(v)?"on":""}`} onClick={()=>tog("deficiencies",v)}>{v}</div>)}</div></div>
      <div className="card"><div className="ctitle">Food Allergies / Exclusions</div><div className="chips">{ALLERGENS.map(a=><div key={a} className={`chip ${(data.allergies||[]).includes(a)?"onp":""}`} onClick={()=>tog("allergies",a)}>{a}</div>)}</div></div>
      <div className="navrow" style={{flexDirection:"column",gap:8}}>
        <button className="btn-p" onClick={onGenerate} disabled={!ok}>⚡ Generate My Plan</button>
        <button className="btn-s" style={{alignSelf:"flex-start"}} onClick={onBack}>← Back</button>
      </div>
    </div>
  );
}

function ResultsPage({form,macros,plan,onReset,gender}){
  const dayMicros=useMemo(()=>sumDayMicros(plan),[plan]);
  const isNV=NON_VEG_DIETS.includes(form.dietType);
  return(
    <div className="page-wide fup">
      <div className="sbn">
        <div className="sbn-tag">Your Precision Plan</div>
        <div className="sbn-name">{form.gender}, {form.age} yrs · {form.bodyType} · {form.goal}</div>
        <div className="sbn-grid">
          {[{l:"BMI",v:macros.bmi,u:"",b:macros.bmiC.l},{l:"Ideal Wt",v:`${macros.idealWt.min}–${macros.idealWt.max}`,u:"kg",b:"Devine"},{l:"Target Cal",v:macros.calories,u:"kcal",b:GOALS_M[form.goal]?.l},{l:"TDEE",v:macros.tdee,u:"kcal",b:form.activity},{l:"BMR",v:macros.bmr,u:"kcal",b:"Mifflin"},{l:"Meals",v:plan.length,u:"",b:isNV&&form.mealSplit?`${form.mealSplit.nv}NV+${form.mealSplit.vg}Veg`:"—"}].map(s=>(
            <div key={s.l}><div className="sbi-l">{s.l}</div><div className="sbi-v">{s.v}<span className="sbi-u">{s.u}</span></div>{s.b&&<div className="sbi-b">{s.b}</div>}</div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="ctitle">Daily Macro Blueprint</div>
        {[{n:"Protein",v:macros.protein,max:300,u:"g",p:`${macros.proP}%`,c:"#34EAA0"},{n:"Carbohydrates",v:macros.carbs,max:500,u:"g",p:`${macros.carbP}%`,c:"#60A5FA"},{n:"Fats",v:macros.fats,max:200,u:"g",p:`${macros.fatP}%`,c:"#FB7185"},{n:"Fiber",v:macros.fiber,max:60,u:"g",p:"14g/1000kcal",c:"#A78BFA"}].map(m=>(
          <div key={m.n} style={{marginBottom:14}}>
            <div className="pbrow"><span className="pbl">{m.n}</span><span className="pbv">{m.v}{m.u} <span style={{fontSize:9,color:"var(--mu)"}}>({m.p})</span></span></div>
            <div className="pbar"><div className="pbf" style={{width:`${Math.min((m.v/m.max)*100,100)}%`,background:m.c}}/></div>
          </div>
        ))}
        <div className="mprow">
          {[{l:"Cal",v:macros.calories,u:"kcal",bg:"rgba(251,191,36,.12)",c:"#FBBF24"},{l:"Protein",v:macros.protein,u:"g",bg:"rgba(52,234,160,.1)",c:"#34EAA0"},{l:"Carbs",v:macros.carbs,u:"g",bg:"rgba(96,165,250,.1)",c:"#60A5FA"},{l:"Fat",v:macros.fats,u:"g",bg:"rgba(251,113,133,.1)",c:"#FB7185"},{l:"Fiber",v:macros.fiber,u:"g",bg:"rgba(167,139,250,.1)",c:"#A78BFA"}].map(m=>(
            <div key={m.l} className="mpill" style={{background:m.bg}}>
              <div className="mp-v" style={{color:m.c}}>{m.v}<span className="mp-u">{m.u}</span></div>
              <div className="mp-l" style={{color:m.c}}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {(form.deficiencies||[]).length>0&&(
        <div style={{background:"rgba(251,191,36,.07)",border:"1px solid rgba(251,191,36,.2)",borderRadius:12,padding:"12px 15px",marginBottom:14,fontSize:12,color:"var(--amber)",lineHeight:1.65}}>
          <strong style={{display:"block",fontSize:8,letterSpacing:"2px",textTransform:"uppercase",marginBottom:5,opacity:.8}}>💊 Deficiency Targeting Active</strong>
          Plan prioritises foods rich in {(form.deficiencies||[]).join(", ")}. Look for ✦ badges on meal cards.
        </div>
      )}

      {isNV&&form.mealSplit&&(
        <div style={{background:"var(--g2)",border:"1px solid var(--b1)",borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <span style={{fontSize:9,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--mu)"}}>SPLIT:</span>
          {plan.map((m,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:m.mealType==="nv"?"rgba(251,113,133,.12)":"var(--mintg)",color:m.mealType==="nv"?"var(--coral)":"var(--mint)",border:`1px solid ${m.mealType==="nv"?"rgba(251,113,133,.2)":"rgba(52,234,160,.2)"}`}}>
              {m.emoji} {m.label} {m.mealType==="nv"?"🥩":"🥗"}
            </span>
          ))}
        </div>
      )}

      {plan.map((meal,mi)=>(
        <div key={mi} className="msec">
          <div className="mhdr">
            <div className="mnum">{meal.emoji}</div>
            <div className="mic">
              <div className="mtitle">Meal {mi+1} — {meal.label}</div>
              <div className="mmeta">{meal.targets.calories} kcal · {meal.targets.protein}g protein · {meal.targets.carbs}g carbs · {meal.targets.fats}g fat</div>
            </div>
            <span className={`mbadge ${meal.mealType==="nv"?"bnv":"bvg"}`}>{meal.mealType==="nv"?"🥩 NV":"🥗 Veg"}</span>
          </div>
          <div className="smbar">
            <span className="smbar-l">All 3 options =</span>
            <span className="smp" style={{background:"rgba(251,191,36,.2)",color:"#FBBF24"}}>🔥 {meal.targets.calories}kcal</span>
            <span className="smp" style={{background:"rgba(52,234,160,.18)",color:"#34EAA0"}}>💪 {meal.targets.protein}g</span>
            <span className="smp" style={{background:"rgba(96,165,250,.18)",color:"#60A5FA"}}>⚡ {meal.targets.carbs}g</span>
            <span className="smp" style={{background:"rgba(251,113,133,.18)",color:"#FB7185"}}>🫧 {meal.targets.fats}g</span>
          </div>
          <div className="optgrid">
            {meal.options.map((opt,i)=><OptionCard key={i} opt={opt} idx={i} gender={gender||form.gender}/>)}
          </div>
        </div>
      ))}

      <div className="daysum">
        <div className="ds-title">📊 Full Day Summary</div>
        <div className="ds-sub">Aggregated across all {plan.length} meals · Option A baseline</div>
        <div className="dsmacs">
          {[{l:"Calories",v:macros.calories,u:"kcal",c:"#FBBF24"},{l:"Protein",v:macros.protein,u:"g",c:"#34EAA0"},{l:"Carbs",v:macros.carbs,u:"g",c:"#60A5FA"},{l:"Fats",v:macros.fats,u:"g",c:"#FB7185"},{l:"Fiber",v:macros.fiber,u:"g",c:"#A78BFA"}].map(d=>(
            <div key={d.l} className="dsmc"><div className="dsmc-l">{d.l}</div><div className="dsmc-v" style={{color:d.c}}>{d.v}<span className="dsmc-u"> {d.u}</span></div></div>
          ))}
        </div>
        <div style={{height:1,background:"var(--b1)",margin:"14px 0"}}/>
        <div style={{fontSize:9,fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:"var(--mu)",marginBottom:12}}>Daily Micronutrients vs RDA</div>
        <div className="mfull">{Object.keys(MICRO_META).filter(k=>dayMicros[k]>0).map(k=><MicroBar key={k} id={k} val={dayMicros[k]} gender={form.gender}/>)}</div>
        <div style={{height:1,background:"var(--b1)",margin:"14px 0"}}/>
        <div style={{fontSize:9,fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:"var(--mu)",marginBottom:10}}>Caloric Distribution</div>
        <div className="cald">
          {[{l:"Protein",p:macros.proP,c:"#34EAA0",bg:"rgba(52,234,160,.1)"},{l:"Carbohydrates",p:macros.carbP,c:"#60A5FA",bg:"rgba(96,165,250,.1)"},{l:"Fats",p:macros.fatP,c:"#FB7185",bg:"rgba(251,113,133,.1)"}].map(m=>(
            <div key={m.l} className="cdi" style={{background:m.bg}}>
              <div className="cdi-l" style={{color:m.c}}>{m.l}</div>
              <div className="cdi-v" style={{color:m.c}}>{m.p}<span style={{fontSize:13}}>%</span></div>
              <div className="pbar" style={{marginTop:6}}><div className="pbf" style={{width:`${m.p}%`,background:m.c}}/></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:22,flexWrap:"wrap"}}>
        <button className="btn-s" onClick={onReset}>← Adjust Plan</button>
        <button className="btn-s" onClick={()=>window.location.reload()}>↻ Start Over</button>
      </div>
    </div>
  );
}

export default function App(){
  const [authUser,setAuthUser]=useState(()=>{ const p=LS.get("ne_cur"); if(!p)return null; const u=LS.get("ne_u_"+p); return u||null; });
  const [profile,setProfile]=useState(()=>{ const p=LS.get("ne_cur"); if(!p)return null; return LS.get("ne_p_"+p)||LS.get("ne_u_"+p)||null; });
  const [tab,setTab]=useState("home");
  const [planStep,setPlanStep]=useState(1);
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [s1,setS1]=useState({gender:profile?.gender||"",age:profile?.age||""});
  const [s2,setS2]=useState({heightCm:profile?.heightCm||"",weightKg:profile?.weightKg||"",bodyType:profile?.bodyType||"",activity:profile?.activity||""});
  const [s3,setS3]=useState({goal:profile?.goal||"",dietType:profile?.dietType||"",meals:3,mealSplit:null,deficiencies:profile?.deficiencies||[],allergies:profile?.allergies||[]});

  const handleLogin=user=>{setAuthUser(user);const saved=LS.get("ne_p_"+user.phone);setProfile(saved||{...user});};
  const handleProfileUpdate=p=>{setProfile(p);if(authUser)LS.set("ne_p_"+authUser.phone,p);};
  const handleStartPlan=()=>setTab("plan");
  const handleGenerate=()=>{setLoading(true);setTimeout(()=>{const form={...s1,...s2,...s3};const macros=deriveMacros(form);const plan=buildPlan(form,macros);setResult({form,macros,plan});setPlanStep(4);setLoading(false);},600);};
  const setS2m=d=>{setS1({gender:d.gender,age:d.age});setS2({heightCm:d.heightCm,weightKg:d.weightKg,bodyType:d.bodyType,activity:d.activity});};
  const initials=profile?.name?(profile.name).split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2):"?";
  const logout=()=>{LS.set("ne_cur",null);setAuthUser(null);setProfile(null);};

  if(!authUser) return(<><style>{FONTS}{CSS}</style><div className="mesh"><div className="blob b1c"/><div className="blob b2c"/><div className="blob b3c"/></div><OTPLogin onLogin={handleLogin}/></>);

  return(
    <>
      <style>{FONTS}{CSS}</style>
      <div className="mesh"><div className="blob b1c"/><div className="blob b2c"/><div className="blob b3c"/></div>

      <header className="hdr">
        <div className="hdr-in">
          <div className="logo">NutriEngine</div>
          <div className="hdr-right">
            {tab==="profile"&&<button onClick={logout} className="btn-ghost" style={{fontSize:11}}>Log out</button>}
            <div className="avatar-btn" onClick={()=>setTab("profile")}>{initials}</div>
          </div>
        </div>
      </header>

      {tab==="home"&&(
        <div className="page fup">
          <div className="pg-title">Good day, <span className="grad">{profile?.name?.split(" ")[0]||"there"}</span> 👋</div>
          <div className="pg-sub">Your precision nutrition dashboard.</div>
          {profile?.heightCm&&profile?.weightKg&&(()=>{const bmi=+(profile.weightKg/((profile.heightCm/100)**2)).toFixed(1);const cat=bmi<18.5?{l:"Underweight",c:"#60A5FA"}:bmi<25?{l:"Normal",c:"#34EAA0"}:bmi<30?{l:"Overweight",c:"#FBBF24"}:{l:"Obese",c:"#FB7185"};return(<div className="sbn" style={{marginBottom:14}}><div className="sbn-tag">Health Overview</div><div className="bmi-strip"><div><div className="bmi-l">BMI</div><div className="bmi-v">{bmi}</div><div className="bmi-t" style={{background:cat.c+"22",color:cat.c}}>{cat.l}</div></div><div><div className="bmi-l">Height</div><div className="bmi-v">{profile.heightCm}<span style={{fontSize:10}}>cm</span></div></div><div><div className="bmi-l">Weight</div><div className="bmi-v">{profile.weightKg}<span style={{fontSize:10}}>kg</span></div></div></div></div>);})()}
          <div className="card" style={{border:"1px solid rgba(52,234,160,.2)"}}>
            <div className="ctitle">Ready to plan?</div>
            <p style={{fontSize:12,color:"var(--mu)",marginBottom:14,lineHeight:1.65}}>Generate your personalised meal plan with exact macros, micronutrients, and meal composition split.</p>
            <button className="btn-p" onClick={()=>{setTab("plan");setPlanStep(1);}}>⚡ Generate Meal Plan</button>
          </div>
          {profile?.goal&&<div className="card"><div className="ctitle">Current Goal</div><div style={{fontSize:16,fontWeight:800,fontFamily:"Syne,sans-serif"}}>{profile.goal}</div><div style={{fontSize:11,color:"var(--mu)",marginTop:3}}>{GOALS_M[profile.goal]?.l||""}</div></div>}
          {(profile?.deficiencies||[]).length>0&&<div className="card"><div className="ctitle">Tracked Deficiencies</div><div className="chips">{(profile.deficiencies||[]).map(d=><span key={d} className="chip on">{d}</span>)}</div></div>}
        </div>
      )}

      {tab==="plan"&&(
        <>
          {planStep<4&&<Stepper step={planStep}/>}
          {planStep===1&&<PlanStep1 data={{...s1}} setData={d=>setS1(d)} onNext={()=>setPlanStep(2)}/>}
          {planStep===2&&<PlanStep2 data={{...s1,...s2}} setData={setS2m} onNext={()=>setPlanStep(3)} onBack={()=>setPlanStep(1)}/>}
          {planStep===3&&<PlanStep3 data={s3} setData={setS3} onGenerate={handleGenerate} onBack={()=>setPlanStep(2)}/>}
          {loading&&<div style={{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,position:"relative",zIndex:1}}><div style={{width:40,height:40,border:"3px solid var(--b1)",borderTopColor:"var(--mint)",borderRadius:"50%",animation:"spin .7s linear infinite"}}/><p style={{fontSize:11,color:"var(--mu)",letterSpacing:1}}>COMPUTING YOUR PLAN...</p><style>{"@keyframes spin{to{transform:rotate(360deg);}}"}</style></div>}
          {planStep===4&&!loading&&result&&<ResultsPage form={result.form} macros={result.macros} plan={result.plan} gender={s1.gender} onReset={()=>setPlanStep(3)}/>}
        </>
      )}

      {tab==="profile"&&<ProfileScreen profile={profile||authUser} setProfile={handleProfileUpdate} onStartPlan={handleStartPlan}/>}

      <nav className="bnav">
        <div className="bnav-in">
          {[{id:"home",icon:"🏠",label:"Home"},{id:"plan",icon:"⚡",label:"Plan"},{id:"profile",icon:"👤",label:"Profile"}].map(n=>(
            <button key={n.id} className={`bni ${tab===n.id?"active":""}`} onClick={()=>{setTab(n.id);if(n.id==="plan"&&planStep===4)setPlanStep(1);}}>
              <span className="bni-icon">{n.icon}</span>
              <span className="bni-l">{n.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
