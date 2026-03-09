import { useState, useMemo, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');`;

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#07080E;--bg2:#0B0C18;
  --g1:rgba(255,255,255,0.04);--g2:rgba(255,255,255,0.07);--g3:rgba(255,255,255,0.12);
  --b1:rgba(255,255,255,0.07);--b2:rgba(255,255,255,0.13);--b3:rgba(255,255,255,0.22);
  --gr:#22C55E;--grd:#16A34A;--grg:rgba(34,197,94,0.12);--grb:rgba(34,197,94,0.22);
  --ind:#818CF8;--indg:rgba(129,140,248,0.12);
  --amb:#F59E0B;--cor:#F87171;--pur:#A78BFA;--tea:#34D399;
  --tx:#EDF0FF;--mu:#6B7694;--li:#2A3050;
}
html,body{background:var(--bg);color:var(--tx);font-family:'Outfit',sans-serif;line-height:1.58;-webkit-font-smoothing:antialiased;min-height:100vh;overflow-x:hidden;}
::selection{background:var(--gr);color:#000;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:var(--li);}::-webkit-scrollbar-track{background:transparent;}

.mesh{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
.ga{position:absolute;width:560px;height:560px;background:var(--gr);top:-180px;left:-180px;border-radius:50%;filter:blur(120px);opacity:.08;}
.gb{position:absolute;width:480px;height:480px;background:var(--ind);bottom:-140px;right:-140px;border-radius:50%;filter:blur(120px);opacity:.07;}

.hdr{position:sticky;top:0;z-index:100;background:rgba(7,8,14,.92);backdrop-filter:blur(24px);border-bottom:1px solid var(--b1);padding:0 18px;}
.hdr-in{max-width:480px;margin:0 auto;height:54px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--gr),var(--ind));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.avi{width:33px;height:33px;border-radius:50%;background:linear-gradient(135deg,var(--gr),var(--ind));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#000;cursor:pointer;border:none;flex-shrink:0;transition:all .2s;}
.avi:hover{transform:scale(1.08);box-shadow:0 0 20px rgba(34,197,94,.3);}

.page{position:relative;z-index:1;max-width:480px;margin:0 auto;padding:22px 18px 96px;}
.page-w{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:22px 18px 96px;}
.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:22px 18px;position:relative;z-index:1;}
.auth-card{width:100%;max-width:360px;background:var(--g2);backdrop-filter:blur(28px);border:1px solid var(--b2);border-radius:22px;padding:32px 26px;box-shadow:0 24px 60px rgba(0,0,0,.5);}
.logo-big{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;background:linear-gradient(135deg,var(--gr),var(--ind));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-align:center;margin-bottom:4px;}
.tagline{text-align:center;font-size:12px;color:var(--mu);margin-bottom:26px;letter-spacing:.2px;}

.pg-title{font-family:'Syne',sans-serif;font-size:clamp(22px,5.5vw,28px);font-weight:800;line-height:1.15;letter-spacing:-.4px;margin-bottom:6px;}
.grad{background:linear-gradient(135deg,var(--gr),var(--ind));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.pg-sub{font-size:13px;color:var(--mu);margin-bottom:22px;line-height:1.68;}
.sec-hdr{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--mu);margin-bottom:13px;display:flex;align-items:center;gap:8px;}
.sec-hdr::after{content:'';flex:1;height:1px;background:var(--b1);}

.fld{display:flex;flex-direction:column;gap:5px;margin-bottom:13px;}
.fld label{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);}
.fld input,.fld select,.fld textarea{background:var(--g1);border:1.5px solid var(--b1);border-radius:10px;padding:11px 14px;color:var(--tx);font-size:14px;font-family:'Outfit',sans-serif;outline:none;transition:border-color .14s,box-shadow .14s;width:100%;}
.fld input:focus,.fld select:focus,.fld textarea:focus{border-color:var(--gr);box-shadow:0 0 0 3px var(--grg);}
.fld input::placeholder,.fld textarea::placeholder{color:var(--li);}
.fld textarea{resize:vertical;min-height:68px;}
select option{background:#0B0C18;}
.ip{position:relative;}.ip span{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--mu);font-size:14px;pointer-events:none;}.ip input{padding-left:38px;}
.r2{display:grid;grid-template-columns:1fr 1fr;gap:11px;}

.btn-p{width:100%;padding:13px 20px;border:none;border-radius:10px;background:linear-gradient(135deg,var(--gr),var(--grd));color:#000;font-size:14px;font-weight:700;font-family:'Outfit',sans-serif;cursor:pointer;transition:all .2s;letter-spacing:-.1px;}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(34,197,94,.3);}
.btn-p:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none;}
.btn-s{padding:11px 20px;border:1.5px solid var(--b2);border-radius:10px;background:var(--g1);color:var(--mu);font-size:13px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;transition:all .14s;}
.btn-s:hover{border-color:var(--b3);color:var(--tx);}
.btn-gh{padding:8px 14px;border:none;border-radius:99px;background:transparent;color:var(--mu);font-size:12px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;}
.btn-gh:hover{color:var(--tx);}
.btn-pill{padding:6px 14px;border-radius:99px;border:1.5px solid var(--b2);background:var(--g1);color:var(--mu);font-size:11px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;transition:all .14s;}
.btn-pill:hover{border-color:var(--gr);color:var(--gr);}
.navrow{display:flex;gap:9px;justify-content:flex-end;margin-top:22px;}

.card{background:var(--g2);border:1px solid var(--b1);border-radius:16px;padding:18px;margin-bottom:12px;}
.card-g{background:var(--g2);border:1px solid rgba(34,197,94,.22);border-radius:16px;padding:18px;margin-bottom:12px;}
.card-v{background:var(--g2);border:1px solid rgba(129,140,248,.22);border-radius:16px;padding:18px;margin-bottom:12px;}

.prof-stepper{display:flex;background:var(--g1);border:1px solid var(--b1);border-radius:14px;overflow:hidden;margin-bottom:20px;}
.ps-item{flex:1;padding:13px 8px;text-align:center;cursor:pointer;border-right:1px solid var(--b1);transition:all .15s;position:relative;}
.ps-item:last-child{border-right:none;}
.ps-item.done{background:var(--grg);}
.ps-item.active{background:linear-gradient(135deg,var(--grg),var(--indg));}
.ps-item.todo{opacity:.4;}
.ps-n{font-size:20px;margin-bottom:4px;}
.ps-l{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
.ps-item.done .ps-l{color:var(--gr);}
.ps-item.active .ps-l{color:var(--tx);}
.ps-item.todo .ps-l{color:var(--mu);}
.ps-check{position:absolute;top:5px;right:7px;font-size:10px;color:var(--gr);}

.tgrid{display:grid;gap:8px;}.tg2{grid-template-columns:1fr 1fr;}.tg3{grid-template-columns:1fr 1fr 1fr;}
.titem{padding:14px 10px;border-radius:10px;border:1.5px solid var(--b1);background:var(--g1);cursor:pointer;transition:all .14s;text-align:center;}
.titem:hover{border-color:var(--b2);background:var(--g2);}
.titem.on{border-color:var(--gr);background:var(--grg);box-shadow:0 0 0 1px var(--grb) inset;}
.ti-i{font-size:22px;margin-bottom:6px;display:block;}
.ti-n{font-size:11px;font-weight:700;color:var(--tx);}
.ti-s{font-size:9px;color:var(--mu);margin-top:2px;line-height:1.4;}
.titem.on .ti-n{color:var(--gr);}

.rlist{display:flex;flex-direction:column;gap:7px;}
.ropt{display:flex;align-items:center;gap:11px;padding:12px 14px;border-radius:10px;border:1.5px solid var(--b1);background:var(--g1);cursor:pointer;transition:all .14s;}
.ropt:hover{border-color:var(--b2);background:var(--g2);}
.ropt.on{border-color:var(--gr);background:var(--grg);}
.rdot{width:15px;height:15px;border-radius:50%;border:2px solid var(--b2);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .14s;}
.ropt.on .rdot{border-color:var(--gr);background:var(--gr);}
.ropt.on .rdot::after{content:'';width:5px;height:5px;background:#000;border-radius:50%;}
.rn{font-size:13px;font-weight:600;color:var(--tx);}
.rs{font-size:10px;color:var(--mu);margin-top:2px;}
.ropt.on .rn{color:var(--gr);}
.rr{margin-left:auto;font-size:11px;font-weight:700;color:var(--gr);}

.mlrow{display:flex;gap:6px;}
.mlbtn{flex:1;padding:13px 4px;border-radius:9px;border:1.5px solid var(--b1);background:var(--g1);cursor:pointer;font-size:18px;font-weight:800;font-family:'Outfit',sans-serif;color:var(--mu);text-align:center;transition:all .14s;}
.mlbtn:hover{border-color:var(--b2);color:var(--tx);}
.mlbtn.on{border-color:var(--gr);background:var(--grg);color:var(--gr);}

.spgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(102px,1fr));gap:7px;}
.spcard{padding:12px 7px;border-radius:10px;border:1.5px solid var(--b1);background:var(--g1);cursor:pointer;transition:all .14s;text-align:center;}
.spcard:hover{border-color:var(--b2);background:var(--g2);}
.spcard.on{border-color:var(--gr);background:var(--grg);}
.spdots{display:flex;justify-content:center;gap:3px;margin-bottom:6px;flex-wrap:wrap;}
.spdot{width:20px;height:20px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;}
.spdot.nv{background:rgba(248,113,113,.16);}
.spdot.vg{background:var(--grg);}
.spl{font-size:10px;font-weight:700;color:var(--tx);}
.sps{font-size:8px;color:var(--mu);margin-top:2px;}
.spcard.on .spl{color:var(--gr);}

.chips{display:flex;flex-wrap:wrap;gap:6px;}
.chip{font-size:10px;font-weight:600;padding:5px 12px;border-radius:99px;border:1.5px solid var(--b1);background:var(--g1);color:var(--mu);cursor:pointer;transition:all .13s;user-select:none;}
.chip:hover{border-color:var(--b2);color:var(--tx);}
.chip.on{background:var(--grg);border-color:var(--gr);color:var(--gr);}
.chip.onr{background:rgba(248,113,113,.10);border-color:var(--cor);color:var(--cor);}

.bmi-strip{background:linear-gradient(135deg,var(--grg),var(--indg));border:1px solid var(--b2);border-radius:12px;padding:16px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px;margin-top:13px;}
.bmi-v{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;}
.bmi-l{font-size:8px;letter-spacing:1.3px;text-transform:uppercase;color:var(--mu);margin-bottom:2px;}
.bmi-t{display:inline-block;margin-top:3px;font-size:8px;font-weight:700;padding:2px 7px;border-radius:99px;}

.sbn{background:linear-gradient(135deg,var(--grg),var(--indg));border:1px solid rgba(34,197,94,.22);border-radius:18px;padding:20px;margin-bottom:16px;box-shadow:0 8px 32px rgba(0,0,0,.4);}
.sbn-tag{font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--gr);margin-bottom:4px;}
.sbn-name{font-family:'Syne',sans-serif;font-size:clamp(15px,4vw,20px);font-weight:800;margin-bottom:16px;letter-spacing:-.3px;}
.sbn-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;}
@media(max-width:380px){.sbn-grid{grid-template-columns:1fr 1fr;}}
.sbi-l{font-size:7px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);margin-bottom:3px;}
.sbi-v{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;}
.sbi-u{font-size:9px;color:var(--mu);}
.sbi-b{display:inline-block;margin-top:3px;font-size:8px;font-weight:700;padding:2px 8px;border-radius:99px;background:rgba(255,255,255,.08);}

.pbrow{display:flex;justify-content:space-between;margin-bottom:4px;}
.pbl{font-size:11px;font-weight:600;color:var(--mu);}
.pbv{font-size:11px;font-weight:700;}
.pbar{height:4px;background:var(--b1);border-radius:99px;overflow:hidden;margin-bottom:13px;}
.pbf{height:100%;border-radius:99px;transition:width .5s;}
.mprow{display:flex;gap:6px;flex-wrap:wrap;}
.mpill{flex:1;min-width:50px;padding:10px 5px;border-radius:10px;text-align:center;}
.mp-v{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;}
.mp-u{font-size:7px;opacity:.5;font-weight:600;}
.mp-l{font-size:7px;letter-spacing:1px;text-transform:uppercase;opacity:.65;margin-top:2px;}

.meal-prog{display:flex;gap:5px;justify-content:center;padding:14px 0 7px;}
.mp-dot{width:8px;height:8px;border-radius:50%;transition:all .28s;}
.mp-dot.dn{background:var(--grd);}
.mp-dot.ac{background:var(--gr);box-shadow:0 0 8px rgba(34,197,94,.5);width:22px;border-radius:4px;}
.mp-dot.td{background:var(--b1);}

.optgrid{display:grid;grid-template-columns:1fr;gap:10px;}
@media(min-width:640px){.optgrid{grid-template-columns:1fr 1fr 1fr;}}
.ocard{background:var(--g1);border:2px solid var(--b1);border-radius:14px;padding:16px;cursor:pointer;transition:all .18s;position:relative;overflow:hidden;}
.ocard:hover{border-color:var(--b2);transform:translateY(-3px);box-shadow:0 12px 30px rgba(0,0,0,.5);}
.ocard.sel{border-color:var(--gr);background:var(--grg);transform:translateY(-3px);box-shadow:0 0 0 2px var(--grb),0 12px 30px rgba(0,0,0,.5);}
.ocard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;opacity:0;transition:opacity .18s;}
.ocard:hover::before,.ocard.sel::before{opacity:1;}
.oa::before{background:linear-gradient(90deg,var(--gr),var(--ind));}
.ob::before{background:linear-gradient(90deg,var(--amb),var(--cor));}
.oc::before{background:linear-gradient(90deg,#F471B5,var(--pur));}
.oa:hover,.oa.sel{border-color:rgba(34,197,94,.55);}
.ob:hover,.ob.sel{border-color:rgba(245,158,11,.45);}
.oc:hover,.oc.sel{border-color:rgba(167,139,250,.45);}
.obdg{font-size:8px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;border-radius:4px;padding:3px 7px;margin-bottom:8px;display:inline-block;}
.oa .obdg{color:var(--gr);background:var(--grg);}
.ob .obdg{color:var(--amb);background:rgba(245,158,11,.12);}
.oc .obdg{color:#F471B5;background:rgba(244,113,181,.10);}
.oemo{font-size:26px;margin-bottom:5px;display:block;}
.oname{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;line-height:1.3;margin-bottom:11px;letter-spacing:-.2px;}
.ocard.sel .oname{color:var(--gr);}

.nutrbox{background:var(--g2);border:1px solid var(--b1);border-radius:9px;padding:9px 11px;margin-bottom:9px;}
.nrow{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:7px;}
.npill{flex:1;min-width:38px;padding:5px 3px;border-radius:6px;text-align:center;}
.np-v{font-family:'Syne',sans-serif;font-size:13px;font-weight:800;}
.np-l{font-size:7px;letter-spacing:.4px;text-transform:uppercase;opacity:.6;margin-top:2px;}
.mgrid{display:grid;grid-template-columns:1fr 1fr;gap:3px 7px;}
.mcr{display:flex;align-items:center;gap:4px;padding:2px 0;}
.mcr-n{font-size:9px;color:var(--mu);flex:1;font-weight:500;}
.mcr-b{width:28px;height:2px;background:var(--b1);border-radius:1px;overflow:hidden;flex-shrink:0;}
.mcr-f{height:100%;border-radius:1px;}
.mcr-v{font-size:9px;font-weight:700;width:24px;text-align:right;flex-shrink:0;}

.sum-meal{background:var(--g2);border:1px solid var(--b1);border-radius:13px;padding:15px;margin-bottom:10px;display:flex;align-items:flex-start;gap:12px;transition:all .14s;}
.sum-meal:hover{border-color:var(--b2);background:var(--g3);}
.sum-emo{font-size:28px;flex-shrink:0;}
.sum-info{flex:1;}
.sum-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;margin-bottom:2px;letter-spacing:-.2px;}
.sum-opt-name{font-size:12px;color:var(--gr);font-weight:600;margin-bottom:5px;}
.sum-meta{font-size:10px;color:var(--mu);line-height:1.65;}
.sum-edit{font-size:10px;color:var(--ind);font-weight:700;cursor:pointer;flex-shrink:0;padding:5px 12px;border-radius:99px;border:1px solid rgba(129,140,248,.25);background:var(--indg);transition:all .14s;}
.sum-edit:hover{border-color:rgba(129,140,248,.5);}

.mfull{display:flex;flex-direction:column;}
.mfrow{display:flex;align-items:center;gap:7px;padding:5px 0;border-bottom:1px solid var(--b1);}
.mfrow:last-child{border-bottom:none;}
.mf-i{font-size:11px;width:16px;text-align:center;flex-shrink:0;}
.mf-n{font-size:10px;color:var(--mu);flex:1;font-weight:500;}
.mf-b{width:46px;height:3px;background:var(--b1);border-radius:1px;overflow:hidden;flex-shrink:0;}
.mf-f{height:100%;border-radius:1px;}
.mf-v{font-size:10px;font-weight:700;text-align:right;min-width:40px;}
.mf-r{font-size:8px;color:var(--li);}
.mf-t{font-size:8px;font-weight:700;padding:2px 6px;border-radius:99px;}
.tg{color:#34D399;background:rgba(34,197,94,.12);}
.tw{color:var(--amb);background:rgba(245,158,11,.12);}
.tl{color:var(--cor);background:rgba(248,113,113,.12);}

.expbtn{font-size:10px;font-weight:700;color:var(--gr);background:none;border:none;font-family:'Outfit',sans-serif;cursor:pointer;padding:0;display:flex;align-items:center;gap:3px;}
.oexp{margin-top:12px;padding-top:12px;border-top:1px solid var(--b1);}
.elbl{font-size:8px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:var(--li);margin-bottom:7px;}
.ilist{list-style:none;}
.ilist li{font-size:10px;color:var(--mu);padding:3px 0;border-bottom:1px solid var(--b1);display:flex;align-items:center;gap:6px;font-weight:500;}
.ilist li:last-child{border-bottom:none;}
.idot{width:4px;height:4px;border-radius:50%;background:var(--gr);flex-shrink:0;}
.plist{list-style:none;counter-reset:s;}
.plist li{font-size:10px;color:var(--mu);padding:3px 0 3px 19px;position:relative;counter-increment:s;line-height:1.55;border-bottom:1px solid var(--b1);font-weight:500;}
.plist li:last-child{border-bottom:none;}
.plist li::before{content:counter(s);position:absolute;left:0;top:5px;width:13px;height:13px;border-radius:3px;background:var(--gr);color:#000;font-size:8px;font-weight:800;display:flex;align-items:center;justify-content:center;}

.phero{background:linear-gradient(135deg,var(--grg),var(--indg));border:1px solid var(--b2);border-radius:16px;padding:18px;margin-bottom:13px;display:flex;align-items:center;gap:13px;}
.pav{width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,var(--gr),var(--ind));display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#000;flex-shrink:0;}
.pname{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;letter-spacing:-.3px;}
.pmeta{font-size:10px;color:var(--mu);margin-top:3px;}
.pedit{margin-left:auto;padding:6px 13px;border-radius:99px;border:1.5px solid var(--b2);background:var(--g1);color:var(--mu);font-size:10px;font-weight:600;cursor:pointer;transition:all .13s;font-family:'Outfit',sans-serif;flex-shrink:0;}
.pedit:hover{border-color:var(--gr);color:var(--gr);}

.ptabs{display:flex;background:var(--g1);border:1px solid var(--b1);border-radius:10px;padding:3px;margin-bottom:13px;}
.ptab{flex:1;padding:8px 4px;border-radius:7px;font-size:10px;font-weight:700;font-family:'Outfit',sans-serif;text-align:center;cursor:pointer;transition:all .13s;color:var(--mu);border:none;background:none;}
.ptab.on{background:var(--g2);color:var(--tx);box-shadow:0 1px 5px rgba(0,0,0,.35);}

.igrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.iitem{background:var(--g1);border:1px solid var(--b1);border-radius:10px;padding:11px 13px;}
.ii-l{font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--mu);margin-bottom:4px;}
.ii-v{font-size:13px;font-weight:600;}
.ifl{grid-column:1/-1;}
.taglist{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;}
.tagitem{font-size:9px;font-weight:600;padding:3px 9px;border-radius:99px;background:var(--grg);color:var(--gr);border:1px solid rgba(34,197,94,.2);}

.br-zone{border:2px dashed var(--b2);border-radius:13px;padding:26px;text-align:center;cursor:pointer;transition:all .15s;background:var(--g1);}
.br-zone:hover{border-color:var(--gr);background:var(--grg);}
.br-result{background:var(--g1);border:1px solid rgba(34,197,94,.2);border-radius:13px;padding:15px;margin-top:13px;}
.br-marker{display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--b1);}
.br-marker:last-child{border-bottom:none;}
.br-mk-n{font-size:11px;color:var(--mu);flex:1;font-weight:500;}
.br-mk-v{font-size:12px;font-weight:700;min-width:68px;}
.br-mk-r{font-size:9px;color:var(--li);}
.br-tag{font-size:8px;font-weight:700;padding:2px 7px;border-radius:99px;}
.br-n{color:#34D399;background:rgba(34,197,94,.12);}
.br-b{color:var(--amb);background:rgba(245,158,11,.12);}
.br-l{color:var(--cor);background:rgba(248,113,113,.12);}
.br-h{color:var(--cor);background:rgba(248,113,113,.12);}

.smbar{background:var(--g2);border:1px solid var(--b1);border-radius:9px;padding:9px 13px;margin-bottom:10px;display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
.smbar-l{font-size:8px;letter-spacing:1.3px;text-transform:uppercase;color:var(--mu);margin-right:4px;font-weight:600;}
.smp{padding:2px 9px;border-radius:99px;font-size:10px;font-weight:700;}
.bnv{color:var(--cor);background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.2);}
.bvg{color:var(--gr);background:var(--grg);border:1px solid rgba(34,197,94,.2);}

.otp-box{background:var(--grg);border:1.5px solid rgba(34,197,94,.28);border-radius:11px;padding:16px;margin:12px 0;text-align:center;}
.otp-code{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;letter-spacing:8px;color:var(--gr);}
.err{font-size:11px;color:var(--cor);margin-bottom:8px;font-weight:600;}

.medc{background:var(--g1);border:1px solid var(--b1);border-radius:11px;padding:13px;margin-bottom:9px;}
.medtop{display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;}
.medbadge{font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 8px;border-radius:99px;background:var(--indg);color:var(--ind);}
.meddate{font-size:10px;color:var(--mu);}
.medtitle{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;margin-bottom:4px;letter-spacing:-.2px;}

.toast{position:fixed;bottom:76px;left:50%;transform:translateX(-50%);background:var(--g3);backdrop-filter:blur(22px);border:1px solid var(--b2);border-radius:99px;padding:9px 20px;font-size:12px;font-weight:600;z-index:9999;animation:tin .28s;white-space:nowrap;box-shadow:0 8px 24px rgba(0,0,0,.5);}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(7px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
@keyframes fup{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
.fup{animation:fup .3s ease both;}
@keyframes spin{to{transform:rotate(360deg);}}

.bnav{position:fixed;bottom:0;left:0;right:0;z-index:100;background:rgba(7,8,14,.96);backdrop-filter:blur(24px);border-top:1px solid var(--b1);padding:5px 0 max(5px,env(safe-area-inset-bottom));}
.bnav-in{max-width:480px;margin:0 auto;display:flex;justify-content:space-around;}
.bni{display:flex;flex-direction:column;align-items:center;gap:2px;padding:5px 14px;border:none;background:none;cursor:pointer;transition:all .14s;}
.bni-i{font-size:20px;}
.bni-l{font-size:8px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--mu);}
.bni.active .bni-l{color:var(--gr);}
.bni.active .bni-i{filter:drop-shadow(0 0 6px rgba(34,197,94,.55));}
.divider{height:1px;background:var(--b1);margin:14px 0;}
@media(max-width:380px){.tg3{grid-template-columns:1fr 1fr;}.r2{grid-template-columns:1fr;}}
`;

// ── SCROLL TO TOP HOOK ────────────────────────────────────────
function useScrollTop(dep) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [dep]);
}

// ── FOOD DATABASE ─────────────────────────────────────────────
const FOODS = [
  {id:"chicken_breast",name:"Chicken Breast",emoji:"🍗",per100g:{cal:165,pro:31,carb:0,fat:3.6,fib:0},micros:{vitamin_b12:0.3,zinc:1.0,magnesium:29,iron:1.0,potassium:256,selenium:27},role:"protein",tags:["non-veg"],allergens:[]},
  {id:"salmon",name:"Salmon",emoji:"🐟",per100g:{cal:208,pro:20,carb:0,fat:13,fib:0},micros:{vitamin_d:11,vitamin_b12:3.2,omega3:2.3,magnesium:27,potassium:363,selenium:37},role:"protein",tags:["non-veg","fish"],allergens:["fish"]},
  {id:"tuna_canned",name:"Canned Tuna",emoji:"🐡",per100g:{cal:116,pro:25.5,carb:0,fat:1.0,fib:0},micros:{vitamin_d:4,vitamin_b12:2.5,omega3:0.3,iron:1.3,selenium:80},role:"protein",tags:["non-veg","fish"],allergens:["fish"]},
  {id:"tilapia",name:"Tilapia",emoji:"🐠",per100g:{cal:96,pro:20,carb:0,fat:1.7,fib:0},micros:{vitamin_b12:1.6,vitamin_d:1.7,zinc:0.4,potassium:302},role:"protein",tags:["non-veg","fish"],allergens:["fish"]},
  {id:"shrimp",name:"Shrimp",emoji:"🦐",per100g:{cal:85,pro:20,carb:0,fat:0.9,fib:0},micros:{vitamin_b12:1.3,selenium:38,zinc:1.1,omega3:0.5},role:"protein",tags:["non-veg","fish"],allergens:["shellfish"]},
  {id:"eggs",name:"Whole Eggs",emoji:"🥚",per100g:{cal:155,pro:13,carb:1.1,fat:11,fib:0},micros:{vitamin_d:2.0,vitamin_b12:1.1,folate:47,zinc:1.3,iron:1.8},role:"protein",tags:["vegetarian"],allergens:["eggs"]},
  {id:"tofu_firm",name:"Firm Tofu",emoji:"🧊",per100g:{cal:76,pro:8.1,carb:1.9,fat:4.2,fib:0.3},micros:{calcium:350,iron:2.7,magnesium:30,zinc:0.8},role:"protein",tags:["vegan","vegetarian"],allergens:["soy"]},
  {id:"tempeh",name:"Tempeh",emoji:"🫒",per100g:{cal:193,pro:19,carb:9.4,fat:11,fib:0},micros:{iron:2.7,magnesium:81,calcium:111,zinc:1.7},role:"protein",tags:["vegan","vegetarian"],allergens:["soy"]},
  {id:"lentils",name:"Red Lentils",emoji:"🫘",per100g:{cal:116,pro:9,carb:20,fat:0.4,fib:7.9},micros:{folate:181,iron:3.3,magnesium:36,zinc:1.3,potassium:369},role:"protein",tags:["vegan","vegetarian"],allergens:[]},
  {id:"chickpeas",name:"Chickpeas",emoji:"🫛",per100g:{cal:164,pro:9,carb:27,fat:2.6,fib:7.6},micros:{folate:172,iron:2.9,magnesium:48,zinc:1.5,calcium:49},role:"protein",tags:["vegan","vegetarian"],allergens:[]},
  {id:"greek_yogurt",name:"Greek Yogurt",emoji:"🥛",per100g:{cal:59,pro:10,carb:3.6,fat:0.4,fib:0},micros:{calcium:110,vitamin_b12:0.75,zinc:0.5,potassium:141},role:"protein",tags:["vegetarian"],allergens:["dairy"]},
  {id:"brown_rice",name:"Brown Rice",emoji:"🍚",per100g:{cal:112,pro:2.3,carb:24,fat:0.8,fib:1.6},micros:{magnesium:43,zinc:0.6,iron:0.5,folate:4},role:"carb",tags:["vegan","vegetarian"],allergens:[]},
  {id:"quinoa",name:"Quinoa",emoji:"🌾",per100g:{cal:120,pro:4.4,carb:21,fat:1.9,fib:2.8},micros:{magnesium:64,iron:1.5,zinc:1.1,folate:42},role:"carb",tags:["vegan","vegetarian"],allergens:[]},
  {id:"sweet_potato",name:"Sweet Potato",emoji:"🍠",per100g:{cal:86,pro:1.6,carb:20,fat:0.1,fib:3.0},micros:{vitamin_c:19,magnesium:25,folate:6,potassium:337},role:"carb",tags:["vegan","vegetarian"],allergens:[]},
  {id:"oats",name:"Rolled Oats",emoji:"🌾",per100g:{cal:371,pro:13,carb:67,fat:7,fib:10},micros:{magnesium:138,iron:4.7,zinc:3.6,folate:56},role:"carb",tags:["vegan","vegetarian"],allergens:["gluten"]},
  {id:"ww_bread",name:"Wholegrain Bread",emoji:"🍞",per100g:{cal:247,pro:9,carb:46,fat:3.4,fib:6},micros:{iron:3.3,magnesium:76,zinc:1.8,folate:44},role:"carb",tags:["vegetarian"],allergens:["gluten"]},
  {id:"banana",name:"Banana",emoji:"🍌",per100g:{cal:89,pro:1.1,carb:23,fat:0.3,fib:2.6},micros:{magnesium:27,vitamin_c:8.7,folate:20,potassium:358},role:"carb",tags:["vegan","vegetarian"],allergens:[]},
  {id:"avocado",name:"Avocado",emoji:"🥑",per100g:{cal:160,pro:2,carb:9,fat:15,fib:6.7},micros:{folate:81,magnesium:29,vitamin_c:10,potassium:485},role:"fat",tags:["vegan","vegetarian"],allergens:[]},
  {id:"olive_oil",name:"Olive Oil",emoji:"🫒",per100g:{cal:884,pro:0,carb:0,fat:100,fib:0},micros:{vitamin_e:14,omega3:0.7},role:"fat",tags:["vegan","vegetarian"],allergens:[]},
  {id:"almonds",name:"Almonds",emoji:"🥜",per100g:{cal:579,pro:21,carb:22,fat:50,fib:12.5},micros:{magnesium:270,calcium:264,zinc:3.1,iron:3.7,vitamin_e:25},role:"fat",tags:["vegan","vegetarian"],allergens:["nuts"]},
  {id:"walnuts",name:"Walnuts",emoji:"🥜",per100g:{cal:654,pro:15,carb:14,fat:65,fib:6.7},micros:{omega3:9.1,magnesium:158,folate:98,zinc:3.1},role:"fat",tags:["vegan","vegetarian"],allergens:["nuts"]},
  {id:"chia_seeds",name:"Chia Seeds",emoji:"🌱",per100g:{cal:486,pro:17,carb:42,fat:31,fib:34},micros:{calcium:631,iron:7.7,magnesium:335,omega3:17.8,zinc:4.6},role:"fat",tags:["vegan","vegetarian"],allergens:[]},
  {id:"spinach",name:"Spinach",emoji:"🥬",per100g:{cal:23,pro:2.9,carb:3.6,fat:0.4,fib:2.2},micros:{iron:2.7,folate:194,calcium:99,magnesium:79,vitamin_c:28},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
  {id:"broccoli",name:"Broccoli",emoji:"🥦",per100g:{cal:34,pro:2.8,carb:7,fat:0.4,fib:2.6},micros:{vitamin_c:89,folate:63,calcium:47,iron:0.7},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
  {id:"kale",name:"Kale",emoji:"🥬",per100g:{cal:35,pro:2.9,carb:4.4,fat:0.7,fib:4.1},micros:{vitamin_c:93,calcium:150,iron:1.5,folate:141},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
  {id:"bell_pepper",name:"Bell Pepper",emoji:"🫑",per100g:{cal:31,pro:1,carb:6,fat:0.3,fib:2.1},micros:{vitamin_c:128,folate:46,iron:0.4},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
  {id:"mushrooms",name:"Mushrooms",emoji:"🍄",per100g:{cal:22,pro:3.1,carb:3.3,fat:0.3,fib:1.0},micros:{vitamin_d:1.7,zinc:1.3,iron:0.5,selenium:5.7},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
  {id:"tomato",name:"Tomato",emoji:"🍅",per100g:{cal:18,pro:0.9,carb:3.9,fat:0.2,fib:1.2},micros:{vitamin_c:14,folate:15,iron:0.3,potassium:237},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
  {id:"cucumber",name:"Cucumber",emoji:"🥒",per100g:{cal:15,pro:0.7,carb:3.6,fat:0.1,fib:0.5},micros:{vitamin_c:2.8,potassium:147},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
];
const gf = id => FOODS.find(f => f.id === id);

const COOK = {
  chicken_breast:["Season with garlic, paprika, herbs, salt & pepper.","Grill or bake 200°C 22-26 min until 74°C internal. Rest 5 min, slice."],
  salmon:["Season with lemon zest, dill, salt.","Bake skin-down 200°C 12-15 min until flesh flakes."],
  tuna_canned:["Drain and flake with fork.","Season with lemon juice, pepper. Ready in 2 min."],
  tilapia:["Season with garlic, thyme, lemon.","Pan-fry 3-4 min each side until golden and opaque."],
  shrimp:["Peel and devein.","Sauté with garlic in butter 2-3 min per side until pink."],
  eggs:["Whisk with salt and pepper.","Scramble on medium 2-3 min, or poach in simmering water 3-4 min."],
  tofu_firm:["Press 10 min. Cube, toss with tamari, garlic, cornstarch.","Pan-fry medium-high 3 min per side until crispy."],
  tempeh:["Slice thin. Marinate in tamari, maple, garlic 10 min.","Pan-fry until caramelised, 3-4 min per side."],
  lentils:["Rinse. Add to 2x water with cumin, turmeric.","Simmer 20 min. Season with salt, lemon, herbs."],
  chickpeas:["Drain and rinse. Toss with cumin, paprika, olive oil.","Roast 200°C 25-28 min, shaking halfway."],
  greek_yogurt:["Use cold from fridge.","Spoon as base and layer toppings."],
  brown_rice:["Rinse. Bring 1:2 water to boil.","Simmer covered 30 min. Fluff, rest 5 min."],
  quinoa:["Rinse well. Bring 1:2 water to boil.","Simmer 15 min until tails appear. Fluff."],
  sweet_potato:["Scrub and cube 2cm pieces.","Toss with oil, roast 200°C 25-30 min until caramelised."],
  oats:["Bring 2x water to boil. Add oats.","Simmer 4-5 min stirring until thick and creamy."],
  ww_bread:["Slice as needed.","Toast to golden brown."],
  banana:["Peel and slice.","No prep needed — natural sweetener."],
  avocado:["Halve, remove stone, scoop flesh.","Slice or mash with lemon and salt."],
  olive_oil:["Use for cooking at medium heat.","Or drizzle raw over finished dishes."],
  almonds:["Toast in dry pan 2-3 min.","Chop or use whole as topping."],
  walnuts:["Break apart by hand.","Use raw to preserve omega-3."],
  chia_seeds:["For pudding: mix 3 tbsp + 1 cup liquid, refrigerate overnight.","For crunch: sprinkle dry over bowls."],
  spinach:["Rinse thoroughly.","Wilt 60 sec in dry pan, or serve raw."],
  broccoli:["Cut into florets.","Steam 4-5 min, or roast 200°C 18 min."],
  kale:["Remove stems, tear leaves.","Massage with lemon and salt, or sauté 2-3 min."],
  bell_pepper:["Deseed and slice.","Serve raw for max vitamin C, or roast 200°C 15 min."],
  mushrooms:["Wipe clean and slice.","Sauté in dry pan on high heat 4-5 min until golden."],
  tomato:["Slice or halve.","Serve raw, or roast 180°C 20 min."],
  cucumber:["Rinse and slice.","Serve raw for freshness."],
};

// Templates — each option just specifies WHICH foods to use; grams are calculated to hit exact targets
const TPL_NV_BFAST = [
  {label:"Salmon Power Plate",protein:"salmon",carb:"ww_bread",fat:"avocado",veg:["spinach","tomato"]},
  {label:"Chicken Oat Bowl",protein:"chicken_breast",carb:"oats",fat:"almonds",veg:["spinach"]},
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
  "Vitamin C":["bell_pepper","broccoli","kale","tomato","spinach"],
  "Iron":["spinach","lentils","chickpeas","tempeh","oats","chia_seeds","kale","tofu_firm"],
  "Calcium":["kale","almonds","tofu_firm","greek_yogurt","chia_seeds","tempeh"],
  "Zinc":["chicken_breast","oats","almonds","tempeh","lentils","quinoa","chia_seeds","shrimp"],
  "Magnesium":["spinach","quinoa","almonds","chia_seeds","oats","avocado","walnuts","tempeh"],
  "Folate":["spinach","lentils","chickpeas","avocado","broccoli","kale","oats","quinoa"],
  "Omega-3":["salmon","walnuts","chia_seeds","tuna_canned","shrimp"],
};

const MICRO_META = {
  vitamin_d:{name:"Vit D",icon:"☀️",unit:"mcg",rm:15,rf:15,color:"#D97706"},
  vitamin_b12:{name:"B12",icon:"🔴",unit:"mcg",rm:2.4,rf:2.4,color:"#E11D48"},
  vitamin_c:{name:"Vit C",icon:"🍊",unit:"mg",rm:90,rf:75,color:"#EA580C"},
  vitamin_e:{name:"Vit E",icon:"🌻",unit:"mg",rm:15,rf:15,color:"#CA8A04"},
  iron:{name:"Iron",icon:"⚙️",unit:"mg",rm:8,rf:18,color:"#7C3AED"},
  calcium:{name:"Calcium",icon:"🦴",unit:"mg",rm:1000,rf:1000,color:"#2563EB"},
  zinc:{name:"Zinc",icon:"⚡",unit:"mg",rm:11,rf:8,color:"#0891B2"},
  magnesium:{name:"Magnesium",icon:"🔋",unit:"mg",rm:420,rf:320,color:"#059669"},
  folate:{name:"Folate",icon:"🌿",unit:"mcg",rm:400,rf:400,color:"var(--gr)"},
  omega3:{name:"Omega-3",icon:"🐟",unit:"g",rm:1.6,rf:1.1,color:"#0284C7"},
  potassium:{name:"Potassium",icon:"🍌",unit:"mg",rm:3400,rf:2600,color:"var(--amb)"},
  selenium:{name:"Selenium",icon:"🛡️",unit:"mcg",rm:55,rf:55,color:"#7C3AED"},
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
const CONDITIONS = ["Diabetes","Hypertension","Thyroid","PCOS","High Cholesterol","Asthma","IBS","Anemia","None"];
const MW = {1:[1.0],2:[.45,.55],3:[.30,.40,.30],4:[.25,.30,.30,.15],5:[.20,.15,.30,.15,.20],6:[.15,.15,.25,.15,.15,.15]};
const ML = {1:["Full Day"],2:["Breakfast","Dinner"],3:["Breakfast","Lunch","Dinner"],4:["Breakfast","Lunch","Afternoon","Dinner"],5:["Breakfast","Mid-Morning","Lunch","Evening","Dinner"],6:["Breakfast","Mid-Morning","Lunch","Afternoon","Evening","Dinner"]};
const ME = ["🌅","☀️","🌤️","🌆","🌙","⭐"];

function deriveMacros(f) {
  const age = f.age || (f.dob ? Math.floor((Date.now()-new Date(f.dob))/31557600000) : 25);
  const bmr = Math.round((10*f.weightKg)+(6.25*f.heightCm)-(5*age)+(f.gender==="Male"?5:-161));
  const tdee = Math.round(bmr*(ACT_LEVELS[f.activity]?.m||1.55));
  const g = GOALS_M[f.goal]||GOALS_M["Maintain"];
  const bt = BT_ADJ[f.bodyType]||BT_ADJ.Mesomorph;
  const cal = Math.max(1200,tdee+g.adj+bt.c);
  const cp = Math.max(.20,g.sp.carb+bt.cb), fp = Math.max(.15,g.sp.fat-bt.cb), pp = g.sp.pro;
  const bmi = +(f.weightKg/((f.heightCm/100)**2)).toFixed(1);
  const bmiC = bmi<18.5?{l:"Underweight",c:"#5A90A8"}:bmi<25?{l:"Normal",c:"#6E9B7E"}:bmi<30?{l:"Overweight",c:"#C4854A"}:{l:"Obese",c:"#A87070"};
  const hi=f.heightCm/2.54, base=f.gender==="Male"?50:45.5, iw=base+2.3*(hi-60);
  return {
    calories:cal,protein:Math.round(cal*pp/4),carbs:Math.round(cal*cp/4),fats:Math.round(cal*fp/9),fiber:Math.round(cal/1000*14),
    bmr,tdee,proP:Math.round(pp*100),carbP:Math.round(cp*100),fatP:Math.round(fp*100),
    bmi,bmiC,idealWt:{min:Math.round(iw*.9),max:Math.round(iw*1.1)},
  };
}

function calcNutr(ings) {
  const t={cal:0,pro:0,carb:0,fat:0,fib:0}; const mc={};
  for (const ing of ings) {
    const f=gf(ing.foodId); if(!f) continue; const r=ing.grams/100;
    t.cal+=f.per100g.cal*r; t.pro+=f.per100g.pro*r; t.carb+=f.per100g.carb*r; t.fat+=f.per100g.fat*r; t.fib+=f.per100g.fib*r;
    for (const [k,v] of Object.entries(f.micros||{})) mc[k]=(mc[k]||0)+v*r;
  }
  return {calories:Math.round(t.cal),protein:Math.round(t.pro),carbs:Math.round(t.carb),fats:Math.round(t.fat),fiber:Math.round(t.fib),
    micros:Object.fromEntries(Object.entries(mc).map(([k,v])=>[k,+v.toFixed(2)]))};
}

// ── FIXED NUTRITION SOLVER ────────────────────────────────────
// All 3 options hit IDENTICAL macro targets. Only which food changes.
// Strategy: veg grams are fixed (50g each). Protein/carb/fat foods are
// scaled to meet remaining targets after veg is subtracted.
function solveMeal(tpl, targets, allergySet) {
  // Safety — swap fat to olive_oil if allergen conflict
  let t = {...tpl};
  if ((gf(t.fat)?.allergens||[]).some(a=>allergySet.has(a.toLowerCase()))) t = {...t, fat:"olive_oil"};
  if ((gf(t.protein)?.allergens||[]).some(a=>allergySet.has(a.toLowerCase()))) {
    // fallback protein
    const fallbacks = ["chicken_breast","lentils","tofu_firm","eggs"];
    t = {...t, protein: fallbacks.find(id=>!(gf(id)?.allergens||[]).some(a=>allergySet.has(a.toLowerCase())))||"lentils"};
  }

  const VEG_G = 50;
  const cl = n => Math.max(0, n);

  // Step 1: subtract veg contribution
  let remPro = targets.protein, remCarb = targets.carbs, remFat = targets.fats, remCal = targets.calories;
  for (const id of t.veg) {
    const f = gf(id); if (!f) continue;
    remPro -= f.per100g.pro * VEG_G/100;
    remCarb -= f.per100g.carb * VEG_G/100;
    remFat -= f.per100g.fat * VEG_G/100;
    remCal -= f.per100g.cal * VEG_G/100;
  }
  remPro = cl(remPro); remCarb = cl(remCarb); remFat = cl(remFat); remCal = cl(remCal);

  // Step 2: protein food — drive by protein target
  const pF = gf(t.protein);
  const pG = Math.max(40, Math.round(remPro * 100 / Math.max(pF.per100g.pro, 1)));
  remCarb = cl(remCarb - pF.per100g.carb * pG/100);
  remFat = cl(remFat - pF.per100g.fat * pG/100);
  remCal = cl(remCal - pF.per100g.cal * pG/100);

  // Step 3: carb food — drive by carb target
  const cF = gf(t.carb);
  const cG = Math.max(20, Math.round(remCarb * 100 / Math.max(cF.per100g.carb, 1)));
  remFat = cl(remFat - cF.per100g.fat * cG/100);
  remCal = cl(remCal - cF.per100g.cal * cG/100);

  // Step 4: fat food — drive by fat target
  const fF = gf(t.fat);
  const fG = Math.max(4, Math.round(remFat * 100 / Math.max(fF.per100g.fat, 1)));

  const ings = [
    {foodId:t.protein,grams:pG},
    {foodId:t.carb,grams:cG},
    {foodId:t.fat,grams:fG},
    ...t.veg.map(id=>({foodId:id,grams:VEG_G})),
  ];

  // Step 5: scale all non-veg grams so total calories hits target exactly
  const rawNutr = calcNutr(ings);
  if (rawNutr.calories > 0 && Math.abs(rawNutr.calories - targets.calories) > 30) {
    const scale = targets.calories / rawNutr.calories;
    // Only scale the main items (not veg)
    ings[0].grams = Math.max(30, Math.round(pG * scale));
    ings[1].grams = Math.max(15, Math.round(cG * scale));
    ings[2].grams = Math.max(3, Math.round(fG * scale));
  }

  const nutrition = calcNutr(ings);
  return {label:t.label, ingredients:ings, nutrition};
}

function buildNVSet(form) {
  const meals=form.meals||3, isNV=NON_VEG_DIETS.includes(form.dietType);
  const nvCount=isNV?(form.mealSplit?.nv??meals):0;
  const weights=MW[meals]||MW[3], nvSet=new Set();
  if(nvCount>0){const sorted=weights.map((w,i)=>({w,i})).sort((a,b)=>b.w-a.w);for(let k=0;k<nvCount&&k<sorted.length;k++)nvSet.add(sorted[k].i);}
  return nvSet;
}

function buildMealOptions(mealIdx, form, macros) {
  const meals=form.meals||3, weights=MW[meals]||MW[3], w=weights[mealIdx]||.33;
  // Use exact proportional slice of daily targets
  const targets={
    calories: Math.round(macros.calories*w),
    protein: Math.round(macros.protein*w),
    carbs: Math.round(macros.carbs*w),
    fats: Math.round(macros.fats*w),
    fiber: Math.round(macros.fiber*w),
  };
  const allergySet=new Set((form.allergies||[]).map(a=>a.toLowerCase()));
  const isNV=NON_VEG_DIETS.includes(form.dietType);
  const nvSet=buildNVSet(form);
  const mType=isNV&&nvSet.has(mealIdx)?"nv":"vg";
  const isBfast=mealIdx===0||(meals>=5&&mealIdx===1&&w<.2);
  let tplSet;
  if(mType==="nv"){tplSet=isBfast?TPL_NV_BFAST:TPL_NV_MAIN;}
  else{
    const base=isBfast?TPL_VG_BFAST:TPL_VG_MAIN;
    const isVegan=["Vegan","Non-Dairy Vegan"].includes(form.dietType);
    tplSet=isVegan?base.filter(tt=>gf(tt.protein)?.tags?.includes("vegan")):base;
    if(!tplSet.length)tplSet=base;
  }
  const deficiencies=form.deficiencies||[];
  // All 3 options are solved with the SAME targets → identical macros, different foods
  const options=tplSet.map(tpl=>{
    const solved=solveMeal(tpl,targets,allergySet);
    const defHits=deficiencies.filter(d=>(DEF_FOODS[d]||[]).some(fid=>solved.ingredients.some(ing=>ing.foodId===fid)));
    return{...solved,defHits};
  });
  return{label:(ML[meals]||ML[3])[mealIdx],emoji:ME[mealIdx],mealType:mType,targets,options};
}

function sumMealsNutr(selectedMeals) {
  const tot={calories:0,protein:0,carbs:0,fats:0,fiber:0}; const mc={};
  for(const sm of selectedMeals){
    const n=sm.option.nutrition;
    tot.calories+=n.calories;tot.protein+=n.protein;tot.carbs+=n.carbs;tot.fats+=n.fats;tot.fiber+=n.fiber;
    for(const[k,v] of Object.entries(n.micros||{})) mc[k]=(mc[k]||0)+v;
  }
  return{...tot,micros:Object.fromEntries(Object.entries(mc).map(([k,v])=>[k,+v.toFixed(2)]))};
}

const LS={
  get:k=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}},
};

// ── BLOOD REPORT ANALYSIS via Claude API ─────────────────────
async function analyzeBloodReportWithAI(fileObj) {
  // Convert file to base64
  const toBase64 = f => new Promise((res,rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("Read failed"));
    r.readAsDataURL(f);
  });

  const base64Data = await toBase64(fileObj);
  const isPDF = fileObj.type === "application/pdf";
  const mediaType = isPDF ? "application/pdf" : fileObj.type || "image/jpeg";

  const prompt = `You are a clinical pathologist reviewing a blood test report. 
Analyse EVERY marker visible in this report. Return ONLY a JSON object — no markdown, no explanation.

Format:
{
  "markers": [
    {
      "name": "marker name as shown",
      "value": "numeric value with unit",
      "referenceRange": "reference range as shown",
      "status": "normal" | "low" | "high" | "borderline_low" | "borderline_high",
      "deficiency": "Vitamin D" | "Vitamin B12" | "Vitamin C" | "Iron" | "Calcium" | "Zinc" | "Magnesium" | "Folate" | "Omega-3" | null
    }
  ],
  "summary": "2-sentence clinical summary of key findings"
}

Rules:
- status "low" = below reference minimum by >10%
- status "borderline_low" = within 10% below reference minimum  
- status "high" = above reference maximum by >10%
- status "borderline_high" = within 10% above reference maximum
- status "normal" = within reference range
- Set deficiency field only if the marker directly indicates a nutritional deficiency
- Include ALL markers you can read, not just abnormal ones`;

  const contentItem = isPDF
    ? {type:"document",source:{type:"base64",media_type:"application/pdf",data:base64Data}}
    : {type:"image",source:{type:"base64",media_type:mediaType,data:base64Data}};

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens:1500,
      messages:[{role:"user",content:[contentItem,{type:"text",text:prompt}]}],
    }),
  });

  const data = await response.json();
  const text = data.content?.map(c=>c.text||"").join("") || "";
  // Strip any markdown fences
  const clean = text.replace(/```json|```/g,"").trim();
  return JSON.parse(clean);
}

// ── MICRO BAR ─────────────────────────────────────────────────
function MicroBar({id, val, gender, compact}) {
  const m=MICRO_META[id]; if(!m) return null;
  const rda=gender==="Female"?m.rf:m.rm;
  const pct=Math.min((val/rda)*100,100);
  const st=pct>=80?"g":pct>=40?"w":"l";
  const cls={g:"tg",w:"tw",l:"tl"}[st];
  if(compact) return(
    <div className="mcr"><span className="mcr-n">{m.name}</span><div className="mcr-b"><div className="mcr-f" style={{width:`${pct}%`,background:m.color}}/></div><span className="mcr-v" style={{color:m.color}}>{val<10?val.toFixed(1):Math.round(val)}</span></div>
  );
  return(
    <div className="mfrow"><span className="mf-i">{m.icon}</span><span className="mf-n">{m.name}</span>
      <div className="mf-b"><div className="mf-f" style={{width:`${pct}%`,background:m.color}}/></div>
      <span className="mf-v" style={{color:m.color}}>{val<10?val.toFixed(1):Math.round(val)}<span className="mf-r"> {m.unit}</span></span>
      <span className={`mf-t ${cls}`}>{pct>=80?"✓":pct>=40?"⚠":"↓"}</span>
    </div>
  );
}

// ── OPTION CARD ───────────────────────────────────────────────
function OptionCard({opt, idx, gender, selected, onSelect}) {
  const [open,setOpen]=useState(false);
  const {label,ingredients,nutrition,defHits}=opt;
  const ingDet=ingredients.map(i=>({...i,food:gf(i.foodId)}));
  const mainEmo=ingDet.find(i=>i.food?.role==="protein")?.food?.emoji||"🍽️";
  const mkeys=Object.keys(nutrition.micros||{}).filter(k=>MICRO_META[k]);
  const OC=["oa","ob","oc"],OL=["Option A","Option B","Option C"];
  return(
    <div className={`ocard ${OC[idx]||""} ${selected?"sel":""}`} onClick={onSelect}>
      <div className="obdg">{OL[idx]||`Opt ${idx+1}`}{selected?" ✓":""}</div>
      <span className="oemo">{mainEmo}</span>
      <div className="oname">{label}</div>
      <div className="nutrbox">
        <div className="nrow">
          {[{v:nutrition.calories,l:"kcal",bg:"rgba(34,197,94,.12)",c:"var(--grd)"},
            {v:nutrition.protein,l:"pro",bg:"rgba(34,197,94,.12)",c:"var(--grd)"},
            {v:nutrition.carbs,l:"carb",bg:"rgba(90,144,168,.12)",c:"var(--ind)"},
            {v:nutrition.fats,l:"fat",bg:"rgba(239,68,68,.1)",c:"var(--cor)"},
            {v:nutrition.fiber,l:"fiber",bg:"rgba(167,139,250,.1)",c:"var(--pur)"},
          ].map(({v,l,bg,c})=>(
            <div key={l} className="npill" style={{background:bg}}>
              <div className="np-v" style={{color:c}}>{v}</div>
              <div className="np-l" style={{color:c}}>{l}</div>
            </div>
          ))}
        </div>
        {mkeys.length>0&&<div className="mgrid">{mkeys.slice(0,6).map(k=><MicroBar key={k} id={k} val={nutrition.micros[k]} gender={gender} compact/>)}</div>}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:8}}>
        {ingDet.map((i,ii)=>i.food&&<span key={ii} style={{fontSize:8,fontWeight:500,padding:"2px 7px",borderRadius:99,background:"var(--g1)",color:"var(--mu)",border:"1px solid var(--b1)"}}>{i.food.emoji} {i.grams}g {i.food.name}</span>)}
      </div>
      {defHits?.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:7}}>{defHits.map(d=><span key={d} style={{fontSize:7,fontWeight:600,padding:"2px 6px",borderRadius:3,background:"rgba(34,197,94,.1)",color:"var(--grd)",border:"1px solid rgba(34,197,94,.2)"}}>✦ {d}</span>)}</div>}
      <button className="expbtn" onClick={e=>{e.stopPropagation();setOpen(!open)}}>{open?"▲ Hide details":"▼ Full nutrition & prep"}</button>
      {open&&(
        <div className="oexp" onClick={e=>e.stopPropagation()}>
          <div className="elbl">Macronutrients</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px",marginBottom:12}}>
            {[{l:"Calories",v:nutrition.calories,u:"kcal",c:"var(--grd)"},{l:"Protein",v:nutrition.protein,u:"g",c:"var(--grd)"},{l:"Carbs",v:nutrition.carbs,u:"g",c:"var(--ind)"},{l:"Fat",v:nutrition.fats,u:"g",c:"var(--cor)"},{l:"Fiber",v:nutrition.fiber,u:"g",c:"var(--pur)"}].map(({l,v,u,c})=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:"1px solid var(--b1)"}}>
                <span style={{fontSize:9,color:"var(--mu)",fontWeight:400}}>{l}</span>
                <span style={{fontSize:12,fontWeight:700,color:c,fontFamily:"Outfit,sans-serif"}}>{v}<span style={{fontSize:8,color:"var(--li)",marginLeft:1}}>{u}</span></span>
              </div>
            ))}
          </div>
          {mkeys.length>0&&<><div className="elbl">Micronutrients vs RDA</div><div className="mfull" style={{marginBottom:12}}>{mkeys.map(k=><MicroBar key={k} id={k} val={nutrition.micros[k]} gender={gender}/>)}</div></>}
          <div className="elbl">Ingredients</div>
          <ul className="ilist">{ingDet.map((i,ii)=>i.food&&<li key={ii}><span className="idot"/>{i.grams}g {i.food.name}</li>)}</ul>
          <div className="elbl" style={{marginTop:11}}>Preparation</div>
          <ol className="plist">{ingDet.flatMap((i,ii)=>{const s=COOK[i.foodId];if(!s)return[];return s.map((st,si)=><li key={`${ii}-${si}`}><strong style={{color:"var(--tx)"}}>{i.food?.name}:</strong> {st}</li>);})}</ol>
          {defHits?.length>0&&<div style={{marginTop:9,fontSize:9,color:"var(--grd)",background:"rgba(34,197,94,.07)",border:"1px solid rgba(34,197,94,.2)",borderRadius:7,padding:"7px 10px",lineHeight:1.55}}>✦ Targets your <strong>{defHits.join(", ")}</strong> deficiency.</div>}
        </div>
      )}
    </div>
  );
}

// ── OTP LOGIN ─────────────────────────────────────────────────
function OTPLogin({onLogin}) {
  const [phone,setPhone]=useState("");
  const [otp,setOtp]=useState("");
  const [sent,setSent]=useState(null);
  const [stage,setStage]=useState("phone");
  const [err,setErr]=useState("");
  useScrollTop(stage);
  const sendOTP=()=>{if(phone.length<10){setErr("Enter valid 10-digit number");return;}const c=Math.floor(100000+Math.random()*900000).toString();setSent(c);setStage("otp");setErr("");};
  const verify=()=>{if(otp===sent){const u=LS.get("nm_u_"+phone)||{phone,createdAt:new Date().toISOString()};LS.set("nm_u_"+phone,u);LS.set("nm_cur",phone);onLogin(u);}else setErr("Incorrect OTP. Try again.");};
  return(
    <div className="auth-wrap">
      <div className="mesh"><div className="ga"/><div className="gb"/></div>
      <div className="auth-card fup">
        <div className="logo-big">NutriMatch</div>
        <div className="tagline">Your body. Your data. Your perfect plan.</div>
        {stage==="phone"?(
          <>
            <p style={{fontFamily:"Outfit,sans-serif",fontWeight:600,fontSize:15,marginBottom:4}}>Welcome back 👋</p>
            <p style={{fontSize:11,color:"var(--mu)",marginBottom:18,lineHeight:1.7,fontWeight:400}}>Your AI nutrition coach is ready.</p>
            <div className="fld"><label>Mobile Number</label><div className="ip"><span>+91</span><input type="tel" placeholder="98765 43210" value={phone} maxLength={10} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))}/></div></div>
            {err&&<p className="err">{err}</p>}
            <button className="btn-p" onClick={sendOTP} disabled={phone.length<10}>Send OTP →</button>
          </>
        ):(
          <>
            <p style={{fontFamily:"Outfit,sans-serif",fontWeight:600,fontSize:15,marginBottom:4}}>Verify OTP</p>
            <p style={{fontSize:11,color:"var(--mu)",marginBottom:9,fontWeight:400}}>Sent to +91 {phone}</p>
            <div className="otp-box"><div style={{fontSize:9,color:"var(--mu)",marginBottom:2,letterSpacing:"1px",textTransform:"uppercase"}}>Demo code</div><div className="otp-code">{sent}</div><div style={{fontSize:9,color:"var(--mu)",marginTop:4,fontWeight:400}}>Production: delivered via SMS</div></div>
            <div className="fld"><label>Enter OTP</label><input type="tel" placeholder="· · · · · ·" value={otp} maxLength={6} onChange={e=>setOtp(e.target.value.replace(/\D/g,""))} style={{letterSpacing:9,fontSize:22,textAlign:"center",fontFamily:"Outfit,sans-serif"}}/></div>
            {err&&<p className="err">{err}</p>}
            <button className="btn-p" onClick={verify} disabled={otp.length<6}>Verify & Enter →</button>
            <button className="btn-gh" style={{width:"100%",marginTop:6}} onClick={()=>setStage("phone")}>← Change number</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── PROFILE SETUP WIZARD ──────────────────────────────────────
function ProfileSetup({phone, existing, onComplete}) {
  const [step,setStep]=useState(0);
  const [draft,setDraft]=useState({phone,name:"",dob:"",gender:"",email:"",location:"",heightCm:"",weightKg:"",bodyType:"",activity:"",conditions:[],medicalReports:[],bloodAnalysis:null,...(existing||{})});
  const [toast,setToast]=useState("");
  useScrollTop(step);
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2400);};
  const tog=(k,v)=>setDraft(d=>({...d,[k]:d[k]?.includes(v)?d[k].filter(x=>x!==v):[...(d[k]||[]),v]}));
  const finish=()=>{const u={...draft,lastUpdated:new Date().toISOString()};LS.set("nm_p_"+phone,u);onComplete(u);};
  const age=draft.dob?Math.floor((Date.now()-new Date(draft.dob))/31557600000):null;
  const bmi=draft.heightCm&&draft.weightKg?+(draft.weightKg/((draft.heightCm/100)**2)).toFixed(1):null;
  const bmiCat=bmi?(bmi<18.5?{l:"Underweight",c:"#5A90A8"}:bmi<25?{l:"Normal",c:"#6E9B7E"}:bmi<30?{l:"Overweight",c:"#C4854A"}:{l:"Obese",c:"#A87070"}):null;
  const stepOk=[
    draft.name&&draft.dob&&draft.gender,
    draft.heightCm>100&&draft.weightKg>20&&draft.bodyType&&draft.activity,
    true,
  ];
  const STEPS=["General","Health","Medical"];

  return(
    <div className="page fup">
      {toast&&<div className="toast">{toast}</div>}
      <div className="pg-title">Build your <span className="grad">profile</span></div>
      <div className="pg-sub">One-time setup. Every plan tailored precisely to you, forever.</div>
      <div className="prof-stepper">
        {STEPS.map((s,i)=>{
          const st=i<step?"done":i===step?"active":"todo";
          return(
            <div key={s} className={`ps-item ${st}`} onClick={()=>i<step&&setStep(i)}>
              {st==="done"&&<span className="ps-check">✓</span>}
              <div className="ps-n">{["👤","🏋️","🩺"][i]}</div>
              <div className="ps-l">{s}</div>
            </div>
          );
        })}
      </div>

      {step===0&&(
        <div className="fup">
          <div className="card-g">
            <div className="sec-hdr">Personal Information</div>
            <div className="fld"><label>Full Name</label><input value={draft.name} placeholder="Your full name" onChange={e=>setDraft({...draft,name:e.target.value})}/></div>
            <div className="r2">
              <div className="fld"><label>Date of Birth</label><input type="date" value={draft.dob} onChange={e=>setDraft({...draft,dob:e.target.value})}/></div>
              <div className="fld"><label>Gender</label>
                <select value={draft.gender} onChange={e=>setDraft({...draft,gender:e.target.value})}>
                  <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            {age&&<div style={{background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.2)",borderRadius:9,padding:"8px 12px",fontSize:11,color:"var(--grd)",marginBottom:12}}>Age derived: <strong>{age} years</strong> · Gender: <strong>{draft.gender}</strong> — used in your nutrition calculations.</div>}
            <div className="fld"><label>Email (optional)</label><input type="email" value={draft.email} placeholder="you@email.com" onChange={e=>setDraft({...draft,email:e.target.value})}/></div>
            <div className="fld"><label>Location (optional)</label><input value={draft.location} placeholder="City, Country" onChange={e=>setDraft({...draft,location:e.target.value})}/></div>
          </div>
          <div className="navrow"><button className="btn-p" style={{maxWidth:190}} onClick={()=>setStep(1)} disabled={!stepOk[0]}>Next: Health →</button></div>
        </div>
      )}

      {step===1&&(
        <div className="fup">
          <div className="card-g">
            <div className="sec-hdr">Height & Weight</div>
            <div className="r2">
              <div className="fld"><label>Height (cm)</label><input type="number" min={100} max={250} value={draft.heightCm} placeholder="175" onChange={e=>setDraft({...draft,heightCm:+e.target.value})}/></div>
              <div className="fld"><label>Weight (kg)</label><input type="number" min={20} max={300} value={draft.weightKg} placeholder="70" onChange={e=>setDraft({...draft,weightKg:+e.target.value})}/></div>
            </div>
            {bmi&&(
              <div className="bmi-strip">
                <div><div className="bmi-l">BMI</div><div className="bmi-v">{bmi}</div><div className="bmi-t" style={{background:bmiCat.c+"22",color:bmiCat.c}}>{bmiCat.l}</div></div>
                <div><div className="bmi-l">Height</div><div className="bmi-v">{draft.heightCm}<span style={{fontSize:10}}>cm</span></div></div>
                <div><div className="bmi-l">Weight</div><div className="bmi-v">{draft.weightKg}<span style={{fontSize:10}}>kg</span></div></div>
              </div>
            )}
          </div>
          <div className="card-g">
            <div className="sec-hdr">Body Type</div>
            <div className="tgrid tg3">
              {[{id:"Ectomorph",e:"🏃",s:"Lean, fast metabolism"},{id:"Mesomorph",e:"🏋️",s:"Athletic, balanced"},{id:"Endomorph",e:"🤸",s:"Broader, slower metabolism"}].map(bt=>(
                <div key={bt.id} className={`titem ${draft.bodyType===bt.id?"on":""}`} onClick={()=>setDraft({...draft,bodyType:bt.id})}>
                  <span className="ti-i">{bt.e}</span><div className="ti-n">{bt.id}</div><div className="ti-s">{bt.s}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-g">
            <div className="sec-hdr">Activity Level</div>
            <div className="rlist">
              {Object.entries(ACT_LEVELS).map(([k,v])=>(
                <div key={k} className={`ropt ${draft.activity===k?"on":""}`} onClick={()=>setDraft({...draft,activity:k})}>
                  <div className="rdot"/><div><div className="rn">{k}</div><div className="rs">{v.l}</div></div>
                  <span className="rr">×{v.m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-g">
            <div className="sec-hdr">Medical Conditions (optional)</div>
            <div className="chips">{CONDITIONS.map(c=><div key={c} className={`chip ${(draft.conditions||[]).includes(c)?"on":""}`} onClick={()=>tog("conditions",c)}>{c}</div>)}</div>
          </div>
          <div style={{display:"flex",gap:9,marginTop:22}}>
            <button className="btn-s" onClick={()=>setStep(0)}>← Back</button>
            <button className="btn-p" style={{flex:1}} onClick={()=>setStep(2)} disabled={!stepOk[1]}>Next: Medical →</button>
          </div>
        </div>
      )}

      {step===2&&<MedicalStep draft={draft} setDraft={setDraft} onBack={()=>setStep(1)} onFinish={finish} showToast={showToast}/>}
    </div>
  );
}

// ── MEDICAL STEP ──────────────────────────────────────────────
function MedicalStep({draft, setDraft, onBack, onFinish, showToast}) {
  const [showAdd,setShowAdd]=useState(false);
  const [analyzing,setAnalyzing]=useState(false);
  const [analyzeErr,setAnalyzeErr]=useState("");
  const [medForm,setMedForm]=useState({date:"",type:"Checkup",condition:"",doctor:"",notes:""});
  const fileRef=useRef(null);

  const addReport=()=>{
    const r=[...(draft.medicalReports||[]),{...medForm,id:Date.now()}];
    setDraft({...draft,medicalReports:r});
    setMedForm({date:"",type:"Checkup",condition:"",doctor:"",notes:""});
    setShowAdd(false);
    showToast("✓ Report added");
  };
  const delReport=id=>setDraft({...draft,medicalReports:(draft.medicalReports||[]).filter(r=>r.id!==id)});

  const handleFile=async(e)=>{
    const file=e.target.files?.[0]; if(!file) return;
    setAnalyzing(true); setAnalyzeErr("");
    try{
      const result=await analyzeBloodReportWithAI(file);
      const deficiencies=[...new Set(result.markers.filter(m=>m.deficiency&&m.status!=="normal").map(m=>m.deficiency))];
      setDraft(d=>({...d,bloodAnalysis:{...result,deficiencies,fileName:file.name}}));
      showToast("✓ Blood report analysed — "+result.markers.filter(m=>m.status!=="normal").length+" flags found");
    }catch(err){
      setAnalyzeErr("Could not parse report: "+err.message+". Please try a clearer image or PDF.");
    }finally{setAnalyzing(false);}
    e.target.value="";
  };

  return(
    <div className="fup">
      <div className="card-v">
        <div className="sec-hdr">Blood Report Analysis</div>
        <p style={{fontSize:11,color:"var(--mu)",marginBottom:14,lineHeight:1.72,fontWeight:400}}>Drop your blood report here. Claude AI reads every marker, flags anything off, and wires it directly into your meal plan — zero manual input.</p>
        {!draft.bloodAnalysis&&!analyzing&&(
          <>
            <div className="br-zone" onClick={()=>fileRef.current?.click()}>
              <div style={{fontSize:30,marginBottom:7}}>🩸</div>
              <div style={{fontSize:12,fontWeight:600,marginBottom:3,fontFamily:"Outfit,sans-serif"}}>Upload Blood Report</div>
              <div style={{fontSize:10,color:"var(--mu)",fontWeight:400}}>PDF · JPG · PNG — tap to browse</div>
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={handleFile}/>
          </>
        )}
        {analyzeErr&&<div style={{marginTop:10,padding:"9px 12px",background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.22)",borderRadius:9,fontSize:10,color:"var(--cor)",lineHeight:1.6}}>{analyzeErr}</div>}
        {analyzing&&(
          <div style={{textAlign:"center",padding:"28px 0"}}>
            <div style={{width:32,height:32,border:"2px solid var(--b1)",borderTopColor:"var(--grd)",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto 11px"}}/>
            <div style={{fontSize:11,color:"var(--mu)",fontWeight:400,letterSpacing:".5px"}}>Claude AI is reading your report…</div>
          </div>
        )}
        {draft.bloodAnalysis&&(
          <div className="br-result">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13}}>
              <div>
                <div style={{fontSize:10,fontWeight:600,color:"var(--grd)",letterSpacing:".5px"}}>✓ Report Analysed</div>
                <div style={{fontSize:9,color:"var(--mu)",marginTop:2,fontWeight:400}}>📄 {draft.bloodAnalysis.fileName}</div>
              </div>
              <button className="btn-pill" onClick={()=>{setDraft(d=>({...d,bloodAnalysis:null}));setAnalyzeErr("");}}>Remove</button>
            </div>
            {draft.bloodAnalysis.summary&&<div style={{fontSize:11,color:"var(--tx)",background:"var(--bg)",border:"1px solid var(--b1)",borderRadius:9,padding:"9px 12px",marginBottom:13,lineHeight:1.65,fontWeight:400}}>{draft.bloodAnalysis.summary}</div>}
            {draft.bloodAnalysis.markers.filter(m=>m.status!=="normal").length>0&&(
              <div style={{background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.18)",borderRadius:9,padding:"10px 12px",marginBottom:12}}>
                <div style={{fontSize:8,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"var(--cor)",marginBottom:8}}>Flagged Markers</div>
                {draft.bloodAnalysis.markers.filter(m=>m.status!=="normal").map((m,i)=>(
                  <div key={i} className="br-marker">
                    <span className="br-mk-n">{m.name}</span>
                    <span className="br-mk-v" style={{color:m.status.includes("low")?"var(--cor)":"var(--amb)"}}>{m.value}</span>
                    <span className="br-mk-r">ref: {m.referenceRange}</span>
                    <span className={`br-tag ${m.status.includes("low")?"br-l":m.status.includes("high")?"br-h":"br-b"}`}>{m.status.replace("_"," ")}</span>
                  </div>
                ))}
              </div>
            )}
            {draft.bloodAnalysis.markers.filter(m=>m.status==="normal").length>0&&(
              <div style={{background:"rgba(34,197,94,.06)",border:"1px solid rgba(34,197,94,.18)",borderRadius:9,padding:"10px 12px",marginBottom:12}}>
                <div style={{fontSize:8,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"var(--grd)",marginBottom:8}}>Normal Markers</div>
                {draft.bloodAnalysis.markers.filter(m=>m.status==="normal").map((m,i)=>(
                  <div key={i} className="br-marker">
                    <span className="br-mk-n">{m.name}</span>
                    <span className="br-mk-v" style={{color:"var(--grd)"}}>{m.value}</span>
                    <span className="br-mk-r">ref: {m.referenceRange}</span>
                    <span className="br-tag br-n">Normal</span>
                  </div>
                ))}
              </div>
            )}
            {draft.bloodAnalysis.deficiencies?.length>0&&(
              <div style={{background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.2)",borderRadius:9,padding:"10px 12px"}}>
                <div style={{fontSize:8,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"var(--grd)",marginBottom:7}}>✦ Nutrition Plan Will Target</div>
                <div className="chips">{draft.bloodAnalysis.deficiencies.map(d=><span key={d} className="chip on">{d}</span>)}</div>
                <div style={{fontSize:9,color:"var(--mu)",marginTop:8,fontWeight:400,lineHeight:1.6}}>Your meals will automatically include foods rich in these nutrients.</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13}}>
          <div className="sec-hdr" style={{margin:0}}>Other Medical Records</div>
          <button className="btn-pill" onClick={()=>setShowAdd(!showAdd)}>+ Add</button>
        </div>
        {showAdd&&(
          <div style={{background:"var(--bg)",border:"1px solid rgba(34,197,94,.18)",borderRadius:10,padding:14,marginBottom:13}}>
            <div className="r2">
              <div className="fld"><label>Date</label><input type="date" value={medForm.date} onChange={e=>setMedForm({...medForm,date:e.target.value})}/></div>
              <div className="fld"><label>Type</label>
                <select value={medForm.type} onChange={e=>setMedForm({...medForm,type:e.target.value})}>
                  {["Checkup","Lab Report","Prescription","Scan","Vaccination","Other"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="fld"><label>Condition / Diagnosis</label><input value={medForm.condition} placeholder="e.g. Vitamin D deficiency" onChange={e=>setMedForm({...medForm,condition:e.target.value})}/></div>
            <div className="fld"><label>Doctor / Hospital</label><input value={medForm.doctor} placeholder="Dr. Name / Hospital" onChange={e=>setMedForm({...medForm,doctor:e.target.value})}/></div>
            <div className="fld"><label>Notes</label><textarea value={medForm.notes} placeholder="Additional notes…" onChange={e=>setMedForm({...medForm,notes:e.target.value})}/></div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn-p" style={{flex:1}} onClick={addReport} disabled={!medForm.condition||!medForm.date}>Save</button>
              <button className="btn-s" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        )}
        {(draft.medicalReports||[]).length===0&&!showAdd&&(
          <div style={{textAlign:"center",padding:"22px 0",color:"var(--mu)"}}>
            <div style={{fontSize:28,marginBottom:7}}>📋</div>
            <div style={{fontSize:12,fontFamily:"Outfit,sans-serif",fontWeight:600,marginBottom:3}}>No records yet</div>
            <div style={{fontSize:10,lineHeight:1.65,fontWeight:400}}>Add prescriptions, checkup notes, or scan results.</div>
          </div>
        )}
        {(draft.medicalReports||[]).map(r=>(
          <div key={r.id} className="medc">
            <div className="medtop"><span className="medbadge">{r.type}</span><span className="meddate">{r.date?new Date(r.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):""}</span>
              <button onClick={()=>delReport(r.id)} style={{border:"none",background:"none",color:"var(--li)",cursor:"pointer",fontSize:15,marginLeft:"auto",padding:0}}>×</button>
            </div>
            <div className="medtitle">{r.condition}</div>
            {r.doctor&&<div style={{fontSize:9,color:"var(--mu)",marginBottom:2,fontWeight:400}}>👨‍⚕️ {r.doctor}</div>}
            {r.notes&&<div style={{fontSize:10,color:"var(--mu)",lineHeight:1.55,fontWeight:400}}>{r.notes}</div>}
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:9,marginTop:22}}>
        <button className="btn-s" onClick={onBack}>← Back</button>
        <button className="btn-p" style={{flex:1}} onClick={onFinish}>Complete Profile →</button>
      </div>
    </div>
  );
}

// ── PROFILE VIEW ──────────────────────────────────────────────
function ProfileScreen({profile, onEdit, onStartPlan}) {
  const [tab,setTab]=useState("general");
  useScrollTop(tab);
  const age=profile.dob?Math.floor((Date.now()-new Date(profile.dob))/31557600000):null;
  const bmi=profile.heightCm&&profile.weightKg?+(profile.weightKg/((profile.heightCm/100)**2)).toFixed(1):null;
  const bmiCat=bmi?(bmi<18.5?{l:"Underweight",c:"#5A90A8"}:bmi<25?{l:"Normal",c:"#6E9B7E"}:bmi<30?{l:"Overweight",c:"#C4854A"}:{l:"Obese",c:"#A87070"}):null;
  const initials=(profile.name||"?").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  return(
    <div className="page fup">
      <div className="phero">
        <div className="pav">{initials}</div>
        <div><div className="pname">{profile.name||"—"}</div><div className="pmeta">📱 {profile.phone}{age?" · "+age+" yrs":""}</div></div>
        <button className="pedit" onClick={onEdit}>Edit</button>
      </div>
      <div className="ptabs">
        {["general","health","medical"].map(t=>(
          <button key={t} className={`ptab ${tab===t?"on":""}`} onClick={()=>setTab(t)}>
            {t==="general"?"👤 General":t==="health"?"🏋️ Health":"🩺 Medical"}
          </button>
        ))}
      </div>
      {tab==="general"&&(
        <div className="card">
          <div className="igrid">
            <div className="iitem"><div className="ii-l">Name</div><div className="ii-v">{profile.name||"—"}</div></div>
            <div className="iitem"><div className="ii-l">Gender</div><div className="ii-v">{profile.gender||"—"}</div></div>
            <div className="iitem"><div className="ii-l">Age</div><div className="ii-v">{age?age+" yrs":"—"}</div></div>
            <div className="iitem"><div className="ii-l">Mobile</div><div className="ii-v">{profile.phone}</div></div>
            <div className="iitem ifl"><div className="ii-l">Email</div><div className="ii-v">{profile.email||"—"}</div></div>
            <div className="iitem ifl"><div className="ii-l">Location</div><div className="ii-v">{profile.location||"—"}</div></div>
          </div>
        </div>
      )}
      {tab==="health"&&(
        <>
          {bmi&&<div className="card"><div className="sec-hdr">Body Stats</div><div className="bmi-strip">
            <div><div className="bmi-l">BMI</div><div className="bmi-v">{bmi}</div><div className="bmi-t" style={{background:bmiCat.c+"22",color:bmiCat.c}}>{bmiCat.l}</div></div>
            <div><div className="bmi-l">Height</div><div className="bmi-v">{profile.heightCm}<span style={{fontSize:10}}>cm</span></div></div>
            <div><div className="bmi-l">Weight</div><div className="bmi-v">{profile.weightKg}<span style={{fontSize:10}}>kg</span></div></div>
          </div></div>}
          <div className="card"><div className="igrid">
            <div className="iitem"><div className="ii-l">Body Type</div><div className="ii-v">{profile.bodyType||"—"}</div></div>
            <div className="iitem"><div className="ii-l">Activity</div><div className="ii-v">{profile.activity||"—"}</div></div>
            <div className="iitem ifl"><div className="ii-l">Conditions</div>
              <div className="taglist">{(profile.conditions||[]).length>0?(profile.conditions||[]).map(c=><span key={c} className="tagitem">{c}</span>):<span style={{fontSize:10,color:"var(--mu)",fontWeight:400}}>None reported</span>}</div>
            </div>
          </div></div>
        </>
      )}
      {tab==="medical"&&(
        <>
          {profile.bloodAnalysis&&(
            <div className="card-g" style={{marginBottom:12}}>
              <div className="sec-hdr">Blood Report</div>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:11}}>
                <span style={{fontSize:18}}>🩸</span>
                <div><div style={{fontSize:11,fontWeight:600}}>📄 {profile.bloodAnalysis.fileName}</div><div style={{fontSize:9,color:"var(--mu)",fontWeight:400,marginTop:2}}>{profile.bloodAnalysis.deficiencies?.length||0} deficiencies flagged</div></div>
              </div>
              <div className="chips">{(profile.bloodAnalysis.deficiencies||[]).map(d=><span key={d} className="chip on">{d}</span>)}</div>
            </div>
          )}
          {(profile.medicalReports||[]).length===0&&!profile.bloodAnalysis&&(
            <div style={{textAlign:"center",padding:"30px 0",color:"var(--mu)"}}>
              <div style={{fontSize:28,marginBottom:7}}>📋</div>
              <div style={{fontSize:12,fontFamily:"Outfit,sans-serif",fontWeight:600,marginBottom:3}}>No records</div>
              <div style={{fontSize:10,lineHeight:1.65,fontWeight:400}}>Edit profile to add medical records.</div>
            </div>
          )}
          {(profile.medicalReports||[]).map(r=>(
            <div key={r.id} className="medc">
              <div className="medtop"><span className="medbadge">{r.type}</span><span className="meddate">{r.date?new Date(r.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):""}</span></div>
              <div className="medtitle">{r.condition}</div>
              {r.doctor&&<div style={{fontSize:9,color:"var(--mu)",marginBottom:2,fontWeight:400}}>👨‍⚕️ {r.doctor}</div>}
              {r.notes&&<div style={{fontSize:10,color:"var(--mu)",lineHeight:1.55,fontWeight:400}}>{r.notes}</div>}
            </div>
          ))}
        </>
      )}
      <div style={{marginTop:16}}><button className="btn-p" onClick={onStartPlan}>⚡ ✦ Build My Plan</button></div>
    </div>
  );
}

// ── PLAN STEPS ────────────────────────────────────────────────
function GoalStep({data, setData, profile, onNext}) {
  useScrollTop("goal");
  const GOALS=[{id:"Lose Fat",e:"🔥",s:"-400 kcal"},{id:"Gentle Cut",e:"✂️",s:"-200 kcal"},{id:"Maintain",e:"⚖️",s:"Maintenance"},{id:"Build Muscle",e:"💪",s:"+300 kcal"},{id:"Performance",e:"⚡",s:"+200 kcal"},{id:"Recomposition",e:"🔄",s:"Slight surplus"}];
  return(
    <div className="page fup">
      <div className="pg-title">What's your <span className="grad">goal?</span></div>
      <div className="pg-sub">Be honest — your plan adapts completely around this.</div>
      {profile?.name&&<div style={{background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.18)",borderRadius:9,padding:"8px 12px",fontSize:10,color:"var(--grd)",marginBottom:15,fontWeight:500}}>Plan for <strong>{profile.gender}, {profile.dob?Math.floor((Date.now()-new Date(profile.dob))/31557600000):"?"}y</strong> · <strong>{profile.heightCm}cm / {profile.weightKg}kg</strong> · <strong>{profile.activity}</strong></div>}
      <div className="card">
        <div className="tgrid tg3">{GOALS.map(g=><div key={g.id} className={`titem ${data.goal===g.id?"on":""}`} onClick={()=>setData({...data,goal:g.id})}><span className="ti-i">{g.e}</span><div className="ti-n">{g.id}</div><div className="ti-s">{g.s}</div></div>)}</div>
      </div>
      <div className="navrow"><button className="btn-p" style={{maxWidth:190}} onClick={onNext} disabled={!data.goal}>Next →</button></div>
    </div>
  );
}

function DietStep({data, setData, profile, onNext, onBack}) {
  useScrollTop("diet");
  const tog=(k,v)=>setData(d=>({...d,[k]:d[k]?.includes(v)?d[k].filter(x=>x!==v):[...(d[k]||[]),v]}));
  const isNV=NON_VEG_DIETS.includes(data.dietType);
  const hasBlood=!!profile?.bloodAnalysis;
  const DTYPE=[{id:"Non-Veg (All)",e:"🥩",s:"All meats & fish"},{id:"Chicken & Fish Only",e:"🍗",s:"Poultry & seafood"},{id:"Vegetarian",e:"🥗",s:"Eggs & dairy OK"},{id:"Vegan",e:"🌿",s:"Fully plant-based"},{id:"Non-Dairy Vegan",e:"🌱",s:"No dairy or eggs"}];
  return(
    <div className="page fup">
      <div className="pg-title">Diet & <span className="grad">structure</span></div>
      <div className="pg-sub">Choose your eating style and how many meals fit your day.</div>
      <div className="card">
        <div className="sec-hdr">Diet Type</div>
        <div className="rlist">{DTYPE.map(d=><div key={d.id} className={`ropt ${data.dietType===d.id?"on":""}`} onClick={()=>setData({...data,dietType:d.id,mealSplit:null})}><div className="rdot"/><span style={{fontSize:17}}>{d.e}</span><div><div className="rn">{d.id}</div><div className="rs">{d.s}</div></div></div>)}</div>
      </div>
      <div className="card">
        <div className="sec-hdr">Meals Per Day</div>
        <div className="mlrow">{[1,2,3,4,5,6].map(n=><button key={n} className={`mlbtn ${data.meals===n?"on":""}`} onClick={()=>setData({...data,meals:n,mealSplit:null})}>{n}</button>)}</div>
      </div>
      {isNV&&data.meals>0&&(
        <div className="card-v">
          <div className="sec-hdr">Meal Composition Split</div>
          <p style={{fontSize:10,color:"var(--mu)",marginBottom:12,lineHeight:1.7,fontWeight:400}}>How many of your <strong style={{color:"var(--tx)"}}>{data.meals} meals</strong> should be <span style={{color:"var(--cor)",fontWeight:600}}>Non-Veg 🥩</span> vs <span style={{color:"var(--grd)",fontWeight:600}}>Veg 🥗</span>?</p>
          <div className="spgrid">{Array.from({length:data.meals+1},(_,i)=>({nv:i,vg:data.meals-i})).map(({nv,vg})=>(
            <div key={nv} className={`spcard ${data.mealSplit?.nv===nv?"on":""}`} onClick={()=>setData({...data,mealSplit:{nv,vg}})}>
              <div className="spdots">{Array.from({length:nv}).map((_,i)=><div key={"n"+i} className="spdot nv">🥩</div>)}{Array.from({length:vg}).map((_,i)=><div key={"v"+i} className="spdot vg">🥗</div>)}</div>
              <div className="spl">{nv===0?"All Veg":vg===0?"All NV":`${nv}NV+${vg}Veg`}</div>
              <div className="sps">{nv===0?"Max plant nutrients":vg===0?"Max B12 & omega-3":"Optimal diversity"}</div>
            </div>
          ))}</div>
        </div>
      )}
      {hasBlood?(
        <div className="card-g">
          <div className="sec-hdr">Deficiencies (from blood report)</div>
          <div style={{background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.2)",borderRadius:9,padding:"9px 12px",marginBottom:9}}>
            <div style={{fontSize:9,fontWeight:600,color:"var(--grd)",marginBottom:6}}>✓ Auto-detected from your report</div>
            <div className="chips">{(profile.bloodAnalysis.deficiencies||[]).map(d=><span key={d} className="chip on">{d}</span>)}</div>
          </div>
          <div style={{fontSize:9,color:"var(--mu)",marginBottom:7,fontWeight:400}}>Add more if needed:</div>
          <div className="chips">{VITAMINS.filter(v=>!(profile.bloodAnalysis.deficiencies||[]).includes(v)).map(v=><div key={v} className={`chip ${(data.extraDeficiencies||[]).includes(v)?"on":""}`} onClick={()=>tog("extraDeficiencies",v)}>{v}</div>)}</div>
        </div>
      ):(
        <div className="card">
          <div className="sec-hdr">Known Deficiencies (optional)</div>
          <div className="chips">{VITAMINS.map(v=><div key={v} className={`chip ${(data.deficiencies||[]).includes(v)?"on":""}`} onClick={()=>tog("deficiencies",v)}>{v}</div>)}</div>
        </div>
      )}
      <div className="card">
        <div className="sec-hdr">Allergies & Exclusions</div>
        <div className="chips">{ALLERGENS.map(a=><div key={a} className={`chip ${(data.allergies||[]).includes(a)?"onr":""}`} onClick={()=>tog("allergies",a)}>{a}</div>)}</div>
      </div>
      <div style={{display:"flex",gap:9,marginTop:22}}>
        <button className="btn-s" onClick={onBack}>← Back</button>
        <button className="btn-p" style={{flex:1}} onClick={onNext} disabled={!data.dietType||!data.meals||(isNV&&!data.mealSplit&&data.meals>1)}>Generate Plan →</button>
      </div>
    </div>
  );
}

// ── MEAL SELECTION ────────────────────────────────────────────
function MealSelectPage({mealIdx, mealData, gender, onSelect, onBack, totalMeals}) {
  const [chosen,setChosen]=useState(null);
  useScrollTop(mealIdx);
  const isLast=mealIdx===totalMeals-1;
  return(
    <div className="page-w fup">
      <div className="meal-prog">{Array.from({length:totalMeals}).map((_,i)=><div key={i} className={`mp-dot ${i<mealIdx?"dn":i===mealIdx?"ac":"td"}`}/>)}</div>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontFamily:"Outfit,sans-serif",fontSize:"clamp(20px,5vw,26px)",fontWeight:600,marginBottom:4}}>{mealData.emoji} Meal {mealIdx+1} — {mealData.label}</div>
        <div style={{fontSize:10,color:"var(--mu)",fontWeight:400}}>
          Pick your option &nbsp;·&nbsp; <span style={{fontWeight:600,color:"var(--grd)"}}>{mealData.targets.calories} kcal</span> &nbsp;·&nbsp; {mealData.targets.protein}g protein
          &nbsp;·&nbsp;<span style={{color:mealData.mealType==="nv"?"var(--cor)":"var(--grd)",fontWeight:500}}>{mealData.mealType==="nv"?"🥩 Non-Veg":"🥗 Veg"}</span>
        </div>
      </div>
      <div style={{background:"rgba(34,197,94,.06)",border:"1px solid rgba(34,197,94,.15)",borderRadius:9,padding:"7px 13px",marginBottom:13,fontSize:9,color:"var(--mu)",fontWeight:400}}>
        All 3 options provide identical nutrition — only ingredients differ.
        &nbsp;<strong style={{color:"var(--grd)"}}>{mealData.targets.calories} kcal · {mealData.targets.protein}g pro · {mealData.targets.carbs}g carbs · {mealData.targets.fats}g fat</strong>
      </div>
      <div className="optgrid">{mealData.options.map((opt,i)=><OptionCard key={i} opt={opt} idx={i} gender={gender} selected={chosen===i} onSelect={()=>setChosen(i)}/>)}</div>
      <div style={{display:"flex",gap:9,marginTop:22}}>
        <button className="btn-s" onClick={onBack}>← Back</button>
        <button className="btn-p" style={{flex:1}} onClick={()=>onSelect(mealData.options[chosen])} disabled={chosen===null}>{isLast?"View Summary →":"Next Meal →"}</button>
      </div>
    </div>
  );
}

// ── SUMMARY PAGE ──────────────────────────────────────────────
function SummaryPage({form, macros, allMeals, selectedMeals, onEdit, gender}) {
  useScrollTop("summary");
  const dayNutr=useMemo(()=>sumMealsNutr(selectedMeals),[selectedMeals]);
  const microKeys=Object.keys(MICRO_META).filter(k=>dayNutr.micros?.[k]>0);
  return(
    <div className="page-w fup">
      <div className="sbn">
        <div className="sbn-tag">✦ Your NutriMatch Plan</div>
        <div className="sbn-name">{form.gender}, {form.age||(form.dob?Math.floor((Date.now()-new Date(form.dob))/31557600000):"?")}y · {form.bodyType} · <em>{form.goal}</em></div>
        <div className="sbn-grid">
          {[{l:"Target Cal",v:macros.calories,u:"kcal",b:GOALS_M[form.goal]?.l},{l:"BMI",v:macros.bmi,u:"",b:macros.bmiC?.l},{l:"Ideal Wt",v:`${macros.idealWt?.min}-${macros.idealWt?.max}`,u:"kg",b:"Devine"},{l:"TDEE",v:macros.tdee,u:"kcal",b:form.activity},{l:"BMR",v:macros.bmr,u:"kcal",b:"Mifflin"},{l:"Meals",v:allMeals.length,u:"",b:form.dietType?.split(" ")[0]}].map(s=>(
            <div key={s.l}><div className="sbi-l">{s.l}</div><div className="sbi-v">{s.v}<span className="sbi-u"> {s.u}</span></div>{s.b&&<div className="sbi-b">{s.b}</div>}</div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sec-hdr">Daily Macro Blueprint</div>
        {[{n:"Protein",v:macros.protein,max:300,u:"g",p:`${macros.proP}%`,c:"var(--grd)"},{n:"Carbohydrates",v:macros.carbs,max:500,u:"g",p:`${macros.carbP}%`,c:"var(--ind)"},{n:"Fats",v:macros.fats,max:200,u:"g",p:`${macros.fatP}%`,c:"var(--cor)"},{n:"Fiber",v:macros.fiber,max:60,u:"g",p:"14g/1000kcal",c:"var(--pur)"}].map(m=>(
          <div key={m.n}>
            <div className="pbrow"><span className="pbl">{m.n}</span><span className="pbv" style={{color:m.c}}>{m.v}{m.u} <span style={{fontSize:8,color:"var(--mu)"}}>({m.p})</span></span></div>
            <div className="pbar"><div className="pbf" style={{width:`${Math.min((m.v/m.max)*100,100)}%`,background:m.c}}/></div>
          </div>
        ))}
        <div className="mprow" style={{marginTop:7}}>
          {[{l:"Cal",v:macros.calories,u:"kcal",bg:"rgba(34,197,94,.12)",c:"var(--grd)"},{l:"Protein",v:macros.protein,u:"g",bg:"rgba(34,197,94,.12)",c:"var(--grd)"},{l:"Carbs",v:macros.carbs,u:"g",bg:"rgba(90,144,168,.12)",c:"var(--ind)"},{l:"Fat",v:macros.fats,u:"g",bg:"rgba(239,68,68,.1)",c:"var(--cor)"},{l:"Fiber",v:macros.fiber,u:"g",bg:"rgba(167,139,250,.1)",c:"var(--pur)"}].map(m=>(
            <div key={m.l} className="mpill" style={{background:m.bg}}>
              <div className="mp-v" style={{color:m.c}}>{m.v}<span className="mp-u">{m.u}</span></div>
              <div className="mp-l" style={{color:m.c}}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-g">
        <div className="sec-hdr">Selected Meals</div>
        {selectedMeals.map((sm,i)=>(
          <div key={i} className="sum-meal">
            <div className="sum-emo">{allMeals[i]?.emoji}</div>
            <div className="sum-info">
              <div className="sum-title">Meal {i+1} — {allMeals[i]?.label}</div>
              <div className="sum-opt-name">{sm.option.label}</div>
              <div className="sum-meta">
                {sm.option.nutrition.calories} kcal &nbsp;·&nbsp; {sm.option.nutrition.protein}g pro &nbsp;·&nbsp; {sm.option.nutrition.carbs}g carb &nbsp;·&nbsp; {sm.option.nutrition.fats}g fat
                &nbsp;<span style={{padding:"1px 6px",borderRadius:99,fontSize:7,fontWeight:600,background:allMeals[i]?.mealType==="nv"?"rgba(239,68,68,.1)":"rgba(34,197,94,.12)",color:allMeals[i]?.mealType==="nv"?"var(--cor)":"var(--grd)"}}>{allMeals[i]?.mealType==="nv"?"🥩 NV":"🥗 Veg"}</span>
              </div>
            </div>
            <div className="sum-edit" onClick={()=>onEdit(i)}>✏ Edit</div>
          </div>
        ))}
        <div style={{background:"var(--bg)",border:"1px solid var(--li)",borderRadius:10,padding:"11px 14px",marginTop:6,display:"flex",gap:9,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:8,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"var(--mu)"}}>Day Total:</span>
          {[{l:"Calories",v:dayNutr.calories,u:"kcal",c:"var(--grd)"},{l:"Protein",v:dayNutr.protein,u:"g",c:"var(--grd)"},{l:"Carbs",v:dayNutr.carbs,u:"g",c:"var(--ind)"},{l:"Fat",v:dayNutr.fats,u:"g",c:"var(--cor)"},{l:"Fiber",v:dayNutr.fiber,u:"g",c:"var(--pur)"}].map(d=>(
            <span key={d.l} style={{padding:"3px 9px",borderRadius:99,fontSize:9,fontWeight:600,background:"var(--g1)",color:d.c}}>{d.v}<span style={{fontSize:7,marginLeft:1,opacity:.7}}>{d.u}</span></span>
          ))}
        </div>
      </div>

      {microKeys.length>0&&<div className="card"><div className="sec-hdr">Full Day Micronutrients vs RDA</div><div className="mfull">{microKeys.map(k=><MicroBar key={k} id={k} val={dayNutr.micros[k]} gender={gender}/>)}</div></div>}

      <div style={{display:"flex",gap:9,justifyContent:"center",marginTop:20,flexWrap:"wrap"}}>
        <button className="btn-s" onClick={()=>onEdit(selectedMeals.length-1)}>← Adjust Last Meal</button>
        <button className="btn-s" onClick={()=>window.location.reload()}>↻ Start Over</button>
      </div>
    </div>
  );
}

// ── HOME SCREEN ───────────────────────────────────────────────
function HomeScreen({profile, onStartPlan}) {
  useScrollTop("home");
  const bmi=profile?.heightCm&&profile?.weightKg?+(profile.weightKg/((profile.heightCm/100)**2)).toFixed(1):null;
  const bmiCat=bmi?(bmi<18.5?{l:"Underweight",c:"#5A90A8"}:bmi<25?{l:"Normal",c:"#6E9B7E"}:bmi<30?{l:"Overweight",c:"#C4854A"}:{l:"Obese",c:"#A87070"}):null;
  return(
    <div className="page fup">
      <div className="pg-title">Hey, <span className="grad">{profile?.name?.split(" ")[0]||"there"}</span> 👋</div>
      <div className="pg-sub">Your AI nutrition companion — plans built from your blood, body & goals.</div>
      {bmi&&<div className="sbn" style={{marginBottom:14}}><div className="sbn-tag">Health Overview</div><div className="bmi-strip">
        <div><div className="bmi-l">BMI</div><div className="bmi-v">{bmi}</div><div className="bmi-t" style={{background:bmiCat.c+"22",color:bmiCat.c}}>{bmiCat.l}</div></div>
        <div><div className="bmi-l">Height</div><div className="bmi-v">{profile.heightCm}<span style={{fontSize:10}}>cm</span></div></div>
        <div><div className="bmi-l">Weight</div><div className="bmi-v">{profile.weightKg}<span style={{fontSize:10}}>kg</span></div></div>
      </div></div>}
      <div className="card-g">
        <div className="sec-hdr">Ready to plan?</div>
        <p style={{fontSize:11,color:"var(--mu)",marginBottom:14,lineHeight:1.72,fontWeight:400}}>Generate your personalised meal plan — step-by-step meal selection with full nutrition breakdown.</p>
        <button className="btn-p" onClick={onStartPlan}>⚡ Generate Meal Plan</button>
      </div>
      {profile?.bloodAnalysis&&<div className="card"><div className="sec-hdr">Blood Report Flags</div><div className="chips">{(profile.bloodAnalysis.deficiencies||[]).map(d=><span key={d} className="chip on">{d}</span>)}</div><div style={{fontSize:9,color:"var(--mu)",marginTop:8,fontWeight:400}}>Your meals will be automatically optimised for these.</div></div>}
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────
export default function App() {
  const [authUser,setAuthUser]=useState(()=>{const p=LS.get("nm_cur");if(!p)return null;return LS.get("nm_u_"+p)||null;});
  const [profile,setProfile]=useState(()=>{const p=LS.get("nm_cur");if(!p)return null;return LS.get("nm_p_"+p)||null;});
  const [profileDone,setProfileDone]=useState(()=>{const p=LS.get("nm_cur");if(!p)return false;const pr=LS.get("nm_p_"+p);return!!(pr&&pr.name&&pr.heightCm&&pr.weightKg);});
  const [tab,setTab]=useState("home");
  const [editingProfile,setEditingProfile]=useState(false);

  // Plan state
  const [planStage,setPlanStage]=useState("goal");
  const [planGoal,setPlanGoal]=useState({goal:""});
  const [planDiet,setPlanDiet]=useState({dietType:"",meals:3,mealSplit:null,deficiencies:[],extraDeficiencies:[],allergies:[]});
  const [macros,setMacros]=useState(null);
  const [allMeals,setAllMeals]=useState([]);
  const [mealIdx,setMealIdx]=useState(0);
  const [selectedMeals,setSelectedMeals]=useState([]);

  const handleLogin=user=>{
    setAuthUser(user);
    const saved=LS.get("nm_p_"+user.phone);
    setProfile(saved||{...user});
    setProfileDone(!!(saved&&saved.name&&saved.heightCm&&saved.weightKg));
  };

  const handleProfileComplete=p=>{
    setProfile(p);
    LS.set("nm_p_"+p.phone,p);
    setProfileDone(true);
    setEditingProfile(false);
    setTab("home");
  };

  const logout=()=>{LS.set("nm_cur",null);setAuthUser(null);setProfile(null);setProfileDone(false);};

  const initials=profile?.name?profile.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2):"?";

  const startPlan=()=>{
    setPlanStage("goal");
    setPlanGoal({goal:""});
    setPlanDiet({dietType:"",meals:3,mealSplit:null,deficiencies:[],extraDeficiencies:[],allergies:[]});
    setMacros(null);setAllMeals([]);setMealIdx(0);setSelectedMeals([]);
  };

  const buildForm=()=>({
    gender:profile?.gender||"Male",
    age:profile?.dob?Math.floor((Date.now()-new Date(profile.dob))/31557600000):25,
    dob:profile?.dob,
    heightCm:profile?.heightCm||170,
    weightKg:profile?.weightKg||70,
    bodyType:profile?.bodyType||"Mesomorph",
    activity:profile?.activity||"Moderately Active",
    goal:planGoal.goal,
    dietType:planDiet.dietType,
    meals:planDiet.meals,
    mealSplit:planDiet.mealSplit,
    allergies:planDiet.allergies||[],
    deficiencies:profile?.bloodAnalysis
      ?[...(profile.bloodAnalysis.deficiencies||[]),...(planDiet.extraDeficiencies||[])]
      :(planDiet.deficiencies||[]),
  });

  const handleDietNext=()=>{
    const form=buildForm();
    const m=deriveMacros(form);
    const meals=Array.from({length:form.meals},(_,i)=>buildMealOptions(i,form,m));
    setMacros(m);setAllMeals(meals);setMealIdx(0);setSelectedMeals([]);
    setPlanStage("meals");
  };

  const handleMealSelect=option=>{
    const next=mealIdx+1;
    const updated=[...selectedMeals.slice(0,mealIdx),{mealIdx,option}];
    setSelectedMeals(updated);
    if(next>=allMeals.length){setPlanStage("summary");}
    else{setMealIdx(next);}
  };

  const handleMealBack=()=>{
    if(mealIdx===0){setPlanStage("diet");}
    else{setMealIdx(mealIdx-1);setSelectedMeals(sm=>sm.slice(0,mealIdx-1));}
  };

  const handleEditMeal=idx=>{setMealIdx(idx);setSelectedMeals(sm=>sm.slice(0,idx));setPlanStage("meals");};

  if(!authUser) return(
    <><style>{FONTS}{CSS}</style><div className="mesh"><div className="ga"/><div className="gb"/></div><OTPLogin onLogin={handleLogin}/></>
  );

  if(!profileDone||editingProfile) return(
    <>
      <style>{FONTS}{CSS}</style>
      <div className="mesh"><div className="ga"/><div className="gb"/></div>
      <header className="hdr"><div className="hdr-in"><div className="logo">NutriMatch</div><button onClick={logout} style={{background:"none",border:"none",color:"var(--mu)",fontSize:10,cursor:"pointer",fontFamily:"Outfit,sans-serif",fontWeight:500}}>Log out</button></div></header>
      <ProfileSetup phone={authUser.phone} existing={profile} onComplete={handleProfileComplete}/>
    </>
  );

  return(
    <>
      <style>{FONTS}{CSS}</style>
      <div className="mesh"><div className="ga"/><div className="gb"/></div>
      <header className="hdr">
        <div className="hdr-in">
          <div className="logo">NutriMatch</div>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            {tab==="profile"&&<button onClick={logout} style={{background:"none",border:"none",color:"var(--mu)",fontSize:10,cursor:"pointer",fontFamily:"Outfit,sans-serif",fontWeight:500}}>Log out</button>}
            <button className="avi" onClick={()=>{setTab("profile");setEditingProfile(false);}}>{initials}</button>
          </div>
        </div>
      </header>

      {tab==="home"&&<HomeScreen profile={profile} onStartPlan={()=>{startPlan();setTab("plan");}}/>}

      {tab==="plan"&&(
        <>
          {planStage==="goal"&&<GoalStep data={planGoal} setData={setPlanGoal} profile={profile} onNext={()=>setPlanStage("diet")}/>}
          {planStage==="diet"&&<DietStep data={planDiet} setData={setPlanDiet} profile={profile} onNext={handleDietNext} onBack={()=>setPlanStage("goal")}/>}
          {planStage==="meals"&&allMeals[mealIdx]&&(
            <MealSelectPage mealIdx={mealIdx} mealData={allMeals[mealIdx]} gender={profile?.gender||"Male"} totalMeals={allMeals.length} onSelect={handleMealSelect} onBack={handleMealBack}/>
          )}
          {planStage==="summary"&&macros&&(
            <SummaryPage form={{...buildForm(),goal:planGoal.goal}} macros={macros} allMeals={allMeals} selectedMeals={selectedMeals} gender={profile?.gender||"Male"} onEdit={handleEditMeal}/>
          )}
        </>
      )}

      {tab==="profile"&&!editingProfile&&<ProfileScreen profile={profile} onEdit={()=>setEditingProfile(true)} onStartPlan={()=>{startPlan();setTab("plan");}}/>}
      {tab==="profile"&&editingProfile&&<ProfileSetup phone={authUser.phone} existing={profile} onComplete={handleProfileComplete}/>}

      <nav className="bnav">
        <div className="bnav-in">
          {[{id:"home",icon:"🏠",label:"Home"},{id:"plan",icon:"⚡",label:"Plan"},{id:"profile",icon:"👤",label:"Profile"}].map(n=>(
            <button key={n.id} className={`bni ${tab===n.id?"active":""}`} onClick={()=>{setTab(n.id);setEditingProfile(false);if(n.id==="plan"){startPlan();}}}>
              <span className="bni-i">{n.icon}</span>
              <span className="bni-l">{n.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
