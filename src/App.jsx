import { useState, useMemo, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Syne:wght@700;800&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #06070D; --bg2: #0A0B14; --bg3: #0E1020;
  --g1: rgba(255,255,255,0.04); --g2: rgba(255,255,255,0.06); --g3: rgba(255,255,255,0.1);
  --b1: rgba(255,255,255,0.07); --b2: rgba(255,255,255,0.12); --b3: rgba(255,255,255,0.20);
  --gr: #10B981; --grd: #059669; --grg: rgba(16,185,129,0.12); --grb: rgba(16,185,129,0.22);
  --vi: #8B5CF6; --vig: rgba(139,92,246,0.12);
  --am: #F59E0B; --co: #EF4444; --sk: #3B82F6; --pk: #EC4899; --te: #14B8A6;
  --tx: #E8EDF8; --mu: #6B7899; --li: #252D45; --xl: #1A2035;
}
html, body { background: var(--bg); color: var(--tx); font-family: 'Inter', sans-serif;
  line-height: 1.55; -webkit-font-smoothing: antialiased; min-height: 100vh; overflow-x: hidden; }
::selection { background: var(--gr); color: #000; }
::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: var(--li); border-radius: 2px; }

.mesh { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.ga { position: absolute; width: 600px; height: 600px; background: var(--gr); top: -200px;
  left: -200px; border-radius: 50%; filter: blur(120px); opacity: .055; }
.gb { position: absolute; width: 500px; height: 500px; background: var(--vi); bottom: -150px;
  right: -150px; border-radius: 50%; filter: blur(120px); opacity: .055; }

.hdr { position: sticky; top: 0; z-index: 100; background: rgba(6,7,13,0.92);
  backdrop-filter: blur(20px); border-bottom: 1px solid var(--b1); padding: 0 16px; }
.hdr-in { max-width: 480px; margin: 0 auto; height: 52px; display: flex; align-items: center; justify-content: space-between; }
.logo { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 800;
  background: linear-gradient(135deg, var(--gr), var(--vi)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.avi { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--gr), var(--vi));
  display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800;
  color: #000; cursor: pointer; border: none; transition: transform .2s; flex-shrink: 0; }
.avi:hover { transform: scale(1.08); }

.page { position: relative; z-index: 1; max-width: 480px; margin: 0 auto; padding: 20px 16px 88px; }
.page-w { position: relative; z-index: 1; max-width: 960px; margin: 0 auto; padding: 20px 16px 88px; }
.auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px 16px; position: relative; z-index: 1; }
.auth-card { width: 100%; max-width: 340px; background: var(--g2); backdrop-filter: blur(24px); border: 1px solid var(--b2); border-radius: 20px; padding: 28px 22px; }
.logo-big { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800;
  background: linear-gradient(135deg, var(--gr), var(--vi)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  text-align: center; margin-bottom: 3px; }
.tagline { text-align: center; font-size: 11px; color: var(--mu); margin-bottom: 24px; }

.pg-title { font-family: 'Syne', sans-serif; font-size: clamp(20px, 5vw, 26px); font-weight: 800;
  line-height: 1.1; letter-spacing: -.5px; margin-bottom: 4px; }
.grad { background: linear-gradient(135deg, var(--gr), var(--vi)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.pg-sub { font-size: 11px; color: var(--mu); margin-bottom: 20px; line-height: 1.65; }

.sec-hdr { font-size: 7px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  color: var(--mu); margin-bottom: 12px; display: flex; align-items: center; gap: 7px; }
.sec-hdr::after { content: ''; flex: 1; height: 1px; background: var(--b1); }

.fld { display: flex; flex-direction: column; gap: 5px; margin-bottom: 11px; }
.fld label { font-size: 8px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mu); }
.fld input, .fld select, .fld textarea { background: var(--g1); border: 1.5px solid var(--b1);
  border-radius: 9px; padding: 10px 12px; color: var(--tx); font-size: 13px; font-family: 'Inter', sans-serif;
  outline: none; transition: border-color .14s, box-shadow .14s; width: 100%; }
.fld input:focus, .fld select:focus, .fld textarea:focus { border-color: var(--gr); box-shadow: 0 0 0 3px var(--grg); }
.fld input::placeholder, .fld textarea::placeholder { color: var(--li); }
.fld textarea { resize: vertical; min-height: 64px; }
select option { background: #0A0B14; }
.ip { position: relative; } .ip span { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--mu); font-size: 13px; pointer-events: none; } .ip input { padding-left: 38px; }
.r2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.btn-p { width: 100%; padding: 13px; border: none; border-radius: 10px;
  background: linear-gradient(135deg, var(--gr), var(--grd)); color: #000; font-size: 13px;
  font-weight: 700; font-family: 'Inter', sans-serif; cursor: pointer; transition: all .18s; letter-spacing: .2px; }
.btn-p:hover { transform: translateY(-1px); box-shadow: 0 8px 20px var(--grg); }
.btn-p:disabled { opacity: .35; cursor: not-allowed; transform: none; box-shadow: none; }
.btn-s { padding: 10px 18px; border: 1.5px solid var(--b2); border-radius: 9px; background: var(--g1);
  color: var(--mu); font-size: 12px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all .14s; }
.btn-s:hover { border-color: var(--b3); color: var(--tx); }
.btn-gh { padding: 8px 14px; border: none; border-radius: 99px; background: transparent;
  color: var(--mu); font-size: 11px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; }
.btn-gh:hover { color: var(--tx); }
.btn-pill { padding: 6px 13px; border-radius: 99px; border: 1.5px solid var(--b2); background: transparent;
  color: var(--mu); font-size: 10px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all .14s; }
.btn-pill:hover { border-color: var(--gr); color: var(--gr); }
.navrow { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }

.card { background: var(--g2); border: 1px solid var(--b1); border-radius: 14px; padding: 16px; margin-bottom: 11px; }
.card-g { background: var(--g2); border: 1px solid rgba(16,185,129,.22); border-radius: 14px; padding: 16px; margin-bottom: 11px; }
.card-v { background: var(--g2); border: 1px solid rgba(139,92,246,.22); border-radius: 14px; padding: 16px; margin-bottom: 11px; }

.prof-stepper { display: flex; align-items: stretch; background: var(--g1); border: 1px solid var(--b1); border-radius: 10px; overflow: hidden; margin-bottom: 18px; }
.ps-item { flex: 1; padding: 10px 8px; text-align: center; cursor: pointer; border-right: 1px solid var(--b1); transition: all .14s; position: relative; }
.ps-item:last-child { border-right: none; }
.ps-item.done { background: var(--grg); }
.ps-item.active { background: linear-gradient(135deg, var(--grg), var(--vig)); }
.ps-item.todo { opacity: .5; }
.ps-n { font-size: 14px; margin-bottom: 2px; }
.ps-l { font-size: 8px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; }
.ps-item.done .ps-l { color: var(--gr); }
.ps-item.active .ps-l { color: var(--tx); }
.ps-item.todo .ps-l { color: var(--mu); }
.ps-check { position: absolute; top: 5px; right: 7px; font-size: 10px; color: var(--gr); }

.stepper { display: flex; align-items: center; justify-content: center; padding: 12px 16px 0; gap: 0; max-width: 480px; margin: 0 auto; }
.si { display: flex; align-items: center; } .sw { display: flex; flex-direction: column; align-items: center; }
.sb { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; transition: all .3s; }
.sb.d { background: var(--grd); color: #000; } .sb.a { background: linear-gradient(135deg, var(--gr), var(--vi)); color: #000; box-shadow: 0 0 0 3px var(--grg); } .sb.t { background: var(--g1); color: var(--li); border: 1.5px solid var(--b1); }
.sl { font-size: 7px; font-weight: 700; letter-spacing: .3px; margin-top: 3px; } .sl.d { color: var(--grd); } .sl.a { color: var(--gr); } .sl.t { color: var(--li); }
.sline { width: 30px; height: 1.5px; margin: 0 3px 11px; } .sline.d { background: var(--grd); } .sline.t { background: var(--b1); }

.tgrid { display: grid; gap: 7px; } .tg2 { grid-template-columns: 1fr 1fr; } .tg3 { grid-template-columns: 1fr 1fr 1fr; }
.titem { padding: 12px 8px; border-radius: 9px; border: 1.5px solid var(--b1); background: var(--g1); cursor: pointer; transition: all .14s; text-align: center; }
.titem:hover { border-color: var(--b2); } .titem.on { border-color: var(--gr); background: var(--grg); }
.ti-i { font-size: 20px; margin-bottom: 4px; display: block; } .ti-n { font-size: 10px; font-weight: 700; color: var(--tx); } .ti-s { font-size: 8px; color: var(--mu); margin-top: 1px; line-height: 1.35; }
.titem.on .ti-n { color: var(--gr); }

.rlist { display: flex; flex-direction: column; gap: 6px; }
.ropt { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px; border: 1.5px solid var(--b1); background: var(--g1); cursor: pointer; transition: all .14s; }
.ropt:hover { border-color: var(--b2); } .ropt.on { border-color: var(--gr); background: var(--grg); }
.rdot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--b2); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all .14s; }
.ropt.on .rdot { border-color: var(--gr); background: var(--gr); } .ropt.on .rdot::after { content: ''; width: 4px; height: 4px; background: #000; border-radius: 50%; }
.rn { font-size: 11px; font-weight: 600; } .rs { font-size: 9px; color: var(--mu); } .ropt.on .rn { color: var(--gr); } .rr { margin-left: auto; font-size: 10px; font-weight: 700; color: var(--gr); }

.mlrow { display: flex; gap: 5px; }
.mlbtn { flex: 1; padding: 11px 3px; border-radius: 8px; border: 1.5px solid var(--b1); background: var(--g1); cursor: pointer; font-size: 15px; font-weight: 800; font-family: 'Inter', sans-serif; color: var(--mu); text-align: center; transition: all .14s; }
.mlbtn:hover { border-color: var(--b2); color: var(--tx); } .mlbtn.on { border-color: var(--gr); background: var(--grg); color: var(--gr); }

.spgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 7px; }
.spcard { padding: 11px 7px; border-radius: 9px; border: 1.5px solid var(--b1); background: var(--g1); cursor: pointer; transition: all .14s; text-align: center; }
.spcard:hover { border-color: var(--b2); } .spcard.on { border-color: var(--gr); background: var(--grg); }
.spdots { display: flex; justify-content: center; gap: 3px; margin-bottom: 6px; flex-wrap: wrap; }
.spdot { width: 20px; height: 20px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 10px; }
.spdot.nv { background: rgba(239,68,68,.15); } .spdot.vg { background: var(--grg); }
.spl { font-size: 9px; font-weight: 700; } .sps { font-size: 7px; color: var(--mu); margin-top: 1px; } .spcard.on .spl { color: var(--gr); }

.chips { display: flex; flex-wrap: wrap; gap: 5px; }
.chip { font-size: 9px; font-weight: 600; padding: 4px 10px; border-radius: 99px; border: 1.5px solid var(--b1); background: var(--g1); color: var(--mu); cursor: pointer; transition: all .13s; user-select: none; }
.chip:hover { border-color: var(--b2); color: var(--tx); } .chip.on { background: var(--grg); border-color: var(--gr); color: var(--gr); } .chip.onr { background: rgba(239,68,68,.09); border-color: var(--co); color: var(--co); }

.bmi-strip { background: linear-gradient(135deg, var(--grg), var(--vig)); border: 1px solid var(--b2); border-radius: 11px; padding: 14px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 9px; margin-top: 12px; }
.bmi-v { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; } .bmi-l { font-size: 7px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mu); margin-bottom: 2px; }
.bmi-t { display: inline-block; margin-top: 2px; font-size: 7px; font-weight: 700; padding: 1px 6px; border-radius: 99px; }

.sbn { background: linear-gradient(135deg, var(--grg), var(--vig)); border: 1px solid rgba(16,185,129,.2); border-radius: 16px; padding: 18px; margin-bottom: 14px; }
.sbn-tag { font-size: 7px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--gr); margin-bottom: 3px; }
.sbn-name { font-family: 'Syne', sans-serif; font-size: clamp(13px, 4vw, 18px); font-weight: 800; margin-bottom: 15px; }
.sbn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
@media(max-width:380px){.sbn-grid{grid-template-columns:1fr 1fr;}}
.sbi-l { font-size: 6px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mu); margin-bottom: 2px; }
.sbi-v { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; } .sbi-u { font-size: 8px; color: var(--mu); }
.sbi-b { display: inline-block; margin-top: 2px; font-size: 7px; font-weight: 700; padding: 1px 6px; border-radius: 99px; background: rgba(255,255,255,.07); }

.pbrow { display: flex; justify-content: space-between; margin-bottom: 3px; } .pbl { font-size: 10px; font-weight: 600; color: var(--mu); } .pbv { font-size: 10px; font-weight: 700; }
.pbar { height: 3px; background: var(--b1); border-radius: 99px; overflow: hidden; margin-bottom: 12px; } .pbf { height: 100%; border-radius: 99px; transition: width .5s; }
.mprow { display: flex; gap: 5px; flex-wrap: wrap; }
.mpill { flex: 1; min-width: 48px; padding: 8px 5px; border-radius: 8px; text-align: center; }
.mp-v { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800; } .mp-u { font-size: 6px; opacity: .5; } .mp-l { font-size: 6px; letter-spacing: 1px; text-transform: uppercase; opacity: .6; margin-top: 1px; }

.meal-prog { display: flex; gap: 5px; justify-content: center; padding: 10px 0 4px; }
.mp-dot { width: 7px; height: 7px; border-radius: 50%; transition: all .25s; }
.mp-dot.dn { background: var(--grd); } .mp-dot.ac { background: var(--gr); box-shadow: 0 0 5px var(--gr); width: 20px; border-radius: 3px; } .mp-dot.td { background: var(--b1); }

.optgrid { display: grid; grid-template-columns: 1fr; gap: 9px; }
@media(min-width:640px) { .optgrid { grid-template-columns: 1fr 1fr 1fr; } }
.ocard { background: var(--g1); border: 2px solid var(--b1); border-radius: 12px; padding: 14px; cursor: pointer; transition: all .16s; position: relative; overflow: hidden; }
.ocard:hover { border-color: var(--b2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.4); }
.ocard.sel { border-color: var(--gr); background: var(--grg); }
.ocard::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; opacity: 0; transition: opacity .16s; }
.ocard:hover::before, .ocard.sel::before { opacity: 1; }
.oa::before { background: linear-gradient(90deg, var(--gr), var(--vi)); } .ob::before { background: linear-gradient(90deg, var(--am), var(--co)); } .oc::before { background: linear-gradient(90deg, var(--pk), var(--vi)); }
.oa:hover, .ocard.sel.oa { border-color: rgba(16,185,129,.45); } .ob:hover { border-color: rgba(245,158,11,.4); } .oc:hover { border-color: rgba(236,72,153,.4); }
.obdg { font-size: 7px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 3px; padding: 2px 5px; margin-bottom: 6px; display: inline-block; }
.oa .obdg { color: var(--gr); background: var(--grg); } .ob .obdg { color: var(--am); background: rgba(245,158,11,.1); } .oc .obdg { color: var(--pk); background: rgba(236,72,153,.08); }
.oemo { font-size: 24px; margin-bottom: 4px; display: block; } .oname { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; line-height: 1.3; margin-bottom: 10px; } .ocard.sel .oname { color: var(--gr); }

.nutrbox { background: var(--g2); border: 1px solid var(--b1); border-radius: 8px; padding: 8px 9px; margin-bottom: 9px; }
.nrow { display: flex; gap: 3px; flex-wrap: wrap; margin-bottom: 6px; }
.npill { flex: 1; min-width: 36px; padding: 4px 2px; border-radius: 5px; text-align: center; }
.np-v { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 800; } .np-l { font-size: 6px; letter-spacing: .3px; text-transform: uppercase; opacity: .6; margin-top: 1px; }
.mgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 6px; }
.mcr { display: flex; align-items: center; gap: 4px; padding: 1.5px 0; }
.mcr-n { font-size: 8px; color: var(--mu); flex: 1; } .mcr-b { width: 28px; height: 2px; background: var(--b1); border-radius: 1px; overflow: hidden; flex-shrink: 0; } .mcr-f { height: 100%; border-radius: 1px; } .mcr-v { font-size: 8px; font-weight: 700; width: 24px; text-align: right; flex-shrink: 0; }

.sum-meal { background: var(--g2); border: 1.5px solid var(--b1); border-radius: 12px; padding: 14px; margin-bottom: 9px; display: flex; align-items: center; gap: 12px; }
.sum-emo { font-size: 28px; flex-shrink: 0; } .sum-info { flex: 1; }
.sum-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px; margin-bottom: 2px; }
.sum-opt-name { font-size: 12px; color: var(--gr); font-weight: 600; margin-bottom: 4px; }
.sum-meta { font-size: 9px; color: var(--mu); }
.sum-edit { font-size: 10px; color: var(--vi); font-weight: 600; cursor: pointer; flex-shrink: 0; padding: 5px 10px; border-radius: 99px; border: 1px solid rgba(139,92,246,.25); background: var(--vig); }

.mfull { display: flex; flex-direction: column; }
.mfrow { display: flex; align-items: center; gap: 6px; padding: 5px 0; border-bottom: 1px solid var(--b1); }
.mfrow:last-child { border-bottom: none; }
.mf-i { font-size: 10px; width: 15px; text-align: center; flex-shrink: 0; } .mf-n { font-size: 9px; color: var(--mu); flex: 1; }
.mf-b { width: 48px; height: 3px; background: var(--b1); border-radius: 1px; overflow: hidden; flex-shrink: 0; } .mf-f { height: 100%; border-radius: 1px; }
.mf-v { font-size: 9px; font-weight: 700; text-align: right; min-width: 40px; } .mf-r { font-size: 7px; color: var(--li); }
.mf-t { font-size: 7px; font-weight: 700; padding: 1px 5px; border-radius: 99px; }
.tg { color: #34D399; background: rgba(52,211,153,.1); } .tw { color: var(--am); background: rgba(245,158,11,.1); } .tl { color: var(--co); background: rgba(239,68,68,.1); }

.expbtn { font-size: 9px; font-weight: 700; color: var(--gr); background: none; border: none; font-family: 'Inter', sans-serif; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 2px; }
.oexp { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--b1); }
.elbl { font-size: 7px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--li); margin-bottom: 6px; }
.ilist { list-style: none; } .ilist li { font-size: 9px; color: var(--mu); padding: 2px 0; border-bottom: 1px solid var(--b1); display: flex; align-items: center; gap: 5px; } .ilist li:last-child { border-bottom: none; } .idot { width: 3px; height: 3px; border-radius: 50%; background: var(--gr); flex-shrink: 0; }
.plist { list-style: none; counter-reset: s; }
.plist li { font-size: 9px; color: var(--mu); padding: 2px 0 2px 18px; position: relative; counter-increment: s; line-height: 1.5; border-bottom: 1px solid var(--b1); }
.plist li:last-child { border-bottom: none; }
.plist li::before { content: counter(s); position: absolute; left: 0; top: 3px; width: 13px; height: 13px; border-radius: 3px; background: var(--gr); color: #000; font-size: 7px; font-weight: 800; display: flex; align-items: center; justify-content: center; }

.phero { background: linear-gradient(135deg, var(--grg), var(--vig)); border: 1px solid var(--b2); border-radius: 14px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 13px; }
.pav { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--gr), var(--vi)); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #000; flex-shrink: 0; }
.pname { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; } .pmeta { font-size: 9px; color: var(--mu); margin-top: 2px; }
.pedit { margin-left: auto; padding: 6px 12px; border-radius: 99px; border: 1.5px solid var(--b2); background: var(--g1); color: var(--mu); font-size: 9px; font-weight: 600; cursor: pointer; transition: all .13s; font-family: 'Inter', sans-serif; flex-shrink: 0; }
.pedit:hover { border-color: var(--gr); color: var(--gr); }

.ptabs { display: flex; background: var(--g1); border: 1px solid var(--b1); border-radius: 8px; padding: 3px; margin-bottom: 12px; }
.ptab { flex: 1; padding: 7px 4px; border-radius: 5px; font-size: 9px; font-weight: 700; font-family: 'Inter', sans-serif; text-align: center; cursor: pointer; transition: all .13s; color: var(--mu); border: none; background: none; }
.ptab.on { background: var(--g2); color: var(--tx); box-shadow: 0 1px 4px rgba(0,0,0,.3); }

.igrid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.iitem { background: var(--g1); border: 1px solid var(--b1); border-radius: 8px; padding: 10px 12px; }
.ii-l { font-size: 7px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mu); margin-bottom: 3px; }
.ii-v { font-size: 12px; font-weight: 600; } .ifl { grid-column: 1/-1; }
.taglist { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 4px; }
.tagitem { font-size: 8px; font-weight: 600; padding: 2px 7px; border-radius: 99px; background: var(--g2); color: var(--mu); border: 1px solid var(--b1); }

.br-zone { border: 2px dashed var(--b2); border-radius: 11px; padding: 20px; text-align: center; cursor: pointer; transition: border-color .14s; }
.br-zone:hover { border-color: var(--gr); }
.br-zone-active { border-color: var(--gr); background: var(--grg); }
.br-result { background: var(--g2); border: 1px solid rgba(16,185,129,.2); border-radius: 11px; padding: 14px; margin-top: 11px; }
.br-marker { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid var(--b1); }
.br-marker:last-child { border-bottom: none; }
.br-mk-n { font-size: 10px; color: var(--mu); flex: 1; } .br-mk-v { font-size: 11px; font-weight: 700; min-width: 70px; }
.br-mk-r { font-size: 8px; color: var(--li); }
.br-tag { font-size: 7px; font-weight: 700; padding: 1px 6px; border-radius: 99px; }
.br-n { color: #34D399; background: rgba(52,211,153,.1); } .br-b { color: var(--am); background: rgba(245,158,11,.1); } .br-l { color: var(--co); background: rgba(239,68,68,.1); }

.smbar { background: var(--g2); border: 1px solid var(--b1); border-radius: 8px; padding: 8px 12px; margin-bottom: 9px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.smbar-l { font-size: 7px; letter-spacing: 1.3px; text-transform: uppercase; color: var(--mu); margin-right: 3px; }
.smp { padding: 2px 8px; border-radius: 99px; font-size: 9px; font-weight: 700; }
.mbadge { font-size: 7px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; padding: 3px 8px; border-radius: 99px; }
.bnv { color: var(--co); background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.18); }
.bvg { color: var(--gr); background: var(--grg); border: 1px solid rgba(16,185,129,.18); }

.otp-box { background: var(--grg); border: 1px solid rgba(16,185,129,.25); border-radius: 9px; padding: 10px; margin: 10px 0; text-align: center; }
.otp-code { font-size: 26px; font-weight: 800; letter-spacing: 7px; color: var(--gr); }
.err { font-size: 10px; color: var(--co); margin-bottom: 8px; }

.medc { background: var(--g1); border: 1px solid var(--b1); border-radius: 10px; padding: 13px; margin-bottom: 8px; }
.medtop { display: flex; align-items: flex-start; gap: 7px; margin-bottom: 5px; }
.medbadge { font-size: 7px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 2px 6px; border-radius: 99px; background: var(--vig); color: var(--vi); }
.meddate { font-size: 9px; color: var(--mu); } .medtitle { font-size: 12px; font-weight: 700; margin-bottom: 2px; }

.toast { position: fixed; bottom: 74px; left: 50%; transform: translateX(-50%); background: var(--g3); backdrop-filter: blur(20px); border: 1px solid var(--b2); border-radius: 99px; padding: 8px 16px; font-size: 11px; font-weight: 600; z-index: 9999; animation: tin .28s; white-space: nowrap; }
@keyframes tin { from { opacity: 0; transform: translateX(-50%) translateY(6px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
@keyframes fup { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.fup { animation: fup .3s ease both; }
@keyframes spin { to { transform: rotate(360deg); } }

.bnav { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; background: rgba(6,7,13,.95); backdrop-filter: blur(20px); border-top: 1px solid var(--b1); padding: 5px 0 max(5px, env(safe-area-inset-bottom)); }
.bnav-in { max-width: 480px; margin: 0 auto; display: flex; justify-content: space-around; }
.bni { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 5px 12px; border: none; background: none; cursor: pointer; }
.bni-i { font-size: 18px; } .bni-l { font-size: 7px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--mu); }
.bni.active .bni-l { color: var(--gr); } .bni.active .bni-i { filter: drop-shadow(0 0 5px var(--gr)); }
.divider { height: 1px; background: var(--b1); margin: 14px 0; }
@media(max-width:380px) { .tg3 { grid-template-columns: 1fr 1fr; } .r2 { grid-template-columns: 1fr; } }
`;

// ── FOOD DATABASE ─────────────────────────────────────────────
const FOODS = [
  {id:"chicken_breast",name:"Chicken Breast",emoji:"🍗",per100g:{cal:165,pro:31,carb:0,fat:3.6,fib:0},micros:{vitamin_b12:0.3,zinc:1.0,magnesium:29,iron:1.0,potassium:256,selenium:27},role:"protein",tags:["non-veg"],allergens:[]},
  {id:"salmon",name:"Atlantic Salmon",emoji:"🐟",per100g:{cal:208,pro:20,carb:0,fat:13,fib:0},micros:{vitamin_d:11,vitamin_b12:3.2,omega3:2.3,magnesium:27,potassium:363,selenium:37},role:"protein",tags:["non-veg","fish"],allergens:["fish"]},
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
  {id:"ww_bread",name:"WW Bread",emoji:"🍞",per100g:{cal:247,pro:9,carb:46,fat:3.4,fib:6},micros:{iron:3.3,magnesium:76,zinc:1.8,folate:44},role:"carb",tags:["vegetarian"],allergens:["gluten"]},
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
  {id:"mushrooms",name:"Mushrooms",emoji:"🍄",per100g:{cal:56,pro:1.6,carb:14,fat:0.2,fib:2.0},micros:{vitamin_d:1.7,zinc:1.3,iron:0.5,selenium:5.7},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
  {id:"tomato",name:"Tomato",emoji:"🍅",per100g:{cal:18,pro:0.9,carb:3.9,fat:0.2,fib:1.2},micros:{vitamin_c:14,folate:15,iron:0.3,potassium:237},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
  {id:"cucumber",name:"Cucumber",emoji:"🥒",per100g:{cal:15,pro:0.7,carb:3.6,fat:0.1,fib:0.5},micros:{vitamin_c:2.8,potassium:147},role:"veg",tags:["vegan","vegetarian"],allergens:[]},
];
const gf = id => FOODS.find(f => f.id === id);

const COOK = {
  chicken_breast:["Season with garlic, paprika, herbs, salt & pepper.","Grill or bake 200°C for 22-26 min until 74°C internal. Rest 5 min, slice."],
  salmon:["Season with lemon zest, dill, salt.","Bake skin-down 200°C 12-15 min until flesh flakes easily."],
  tuna_canned:["Drain and flake with fork.","Season with lemon juice and pepper. Ready in 2 min."],
  tilapia:["Season with garlic, thyme, lemon.","Pan-fry 3-4 min each side until golden and opaque."],
  shrimp:["Peel and devein.","Saute with garlic in butter 2-3 min per side until pink."],
  eggs:["Whisk with salt and pepper.","Scramble on medium heat 2-3 min. Or poach in simmering water 3-4 min."],
  tofu_firm:["Press 10 min. Cube, toss with tamari, garlic, cornstarch.","Pan-fry medium-high 3 min per side until crispy."],
  tempeh:["Slice thin. Marinate in tamari, maple syrup, garlic 10 min.","Pan-fry until caramelised, 3-4 min per side."],
  lentils:["Rinse. Simmer 2x water with cumin, turmeric 20 min.","Season with salt, lemon, fresh herbs."],
  chickpeas:["Drain and rinse. Toss with cumin, paprika, olive oil.","Roast 200°C 25-28 min, shaking halfway."],
  greek_yogurt:["Use cold from fridge.","Spoon as base and layer toppings."],
  brown_rice:["Rinse. Bring 1:2 with water to boil.","Simmer covered 30 min. Fluff and rest 5 min."],
  quinoa:["Rinse well. Bring 1:2 with water to boil.","Simmer 15 min until tails appear. Fluff."],
  sweet_potato:["Scrub and cube.","Toss with oil, roast 200°C 25-30 min until caramelised."],
  oats:["Bring 2x water to boil. Add oats.","Simmer 4-5 min stirring until thick and creamy."],
  ww_bread:["Slice as needed.","Toast to golden brown."],
  banana:["Peel and slice.","No prep needed - natural sweetener."],
  avocado:["Halve, remove stone, scoop flesh.","Slice or mash. Season with lemon and salt."],
  olive_oil:["For cooking: heat to medium.","For dressing: drizzle raw over finished dishes."],
  almonds:["Toast in dry pan 2-3 min.","Chop or use whole as topping."],
  walnuts:["Break apart by hand.","Use raw to preserve omega-3."],
  chia_seeds:["For pudding: mix 3 tbsp + 1 cup liquid, refrigerate overnight.","For crunch: sprinkle dry over bowls."],
  spinach:["Rinse thoroughly.","Wilt 60 sec in dry pan or serve raw."],
  broccoli:["Cut into florets.","Steam 4-5 min or roast 200°C 18 min."],
  kale:["Remove stems, tear leaves.","Massage with lemon and salt, or saute 2-3 min."],
  bell_pepper:["Deseed and slice.","Raw for max vitamin C, or roast 200°C 15 min."],
  mushrooms:["Wipe clean and slice.","Saute in dry pan on high heat 4-5 min until golden."],
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
  vitamin_d:{name:"Vit D",icon:"☀️",unit:"mcg",rm:15,rf:15,color:"#F59E0B"},
  vitamin_b12:{name:"B12",icon:"🔴",unit:"mcg",rm:2.4,rf:2.4,color:"#EF4444"},
  vitamin_c:{name:"Vit C",icon:"🍊",unit:"mg",rm:90,rf:75,color:"#F97316"},
  vitamin_e:{name:"Vit E",icon:"🌻",unit:"mg",rm:15,rf:15,color:"#EAB308"},
  iron:{name:"Iron",icon:"⚙️",unit:"mg",rm:8,rf:18,color:"#8B5CF6"},
  calcium:{name:"Calcium",icon:"🦴",unit:"mg",rm:1000,rf:1000,color:"#3B82F6"},
  zinc:{name:"Zinc",icon:"⚡",unit:"mg",rm:11,rf:8,color:"#14B8A6"},
  magnesium:{name:"Magnesium",icon:"🔋",unit:"mg",rm:420,rf:320,color:"#10B981"},
  folate:{name:"Folate",icon:"🌿",unit:"mcg",rm:400,rf:400,color:"#22C55E"},
  omega3:{name:"Omega-3",icon:"🐟",unit:"g",rm:1.6,rf:1.1,color:"#06B6D4"},
  potassium:{name:"Potassium",icon:"🍌",unit:"mg",rm:3400,rf:2600,color:"#F59E0B"},
  selenium:{name:"Selenium",icon:"🛡️",unit:"mcg",rm:55,rf:55,color:"#A855F7"},
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
  const age = f.age || (f.dob ? Math.floor((Date.now() - new Date(f.dob)) / 31557600000) : 25);
  const bmr = Math.round((10 * f.weightKg) + (6.25 * f.heightCm) - (5 * age) + (f.gender === "Male" ? 5 : -161));
  const tdee = Math.round(bmr * (ACT_LEVELS[f.activity]?.m || 1.55));
  const g = GOALS_M[f.goal] || GOALS_M["Maintain"];
  const bt = BT_ADJ[f.bodyType] || BT_ADJ.Mesomorph;
  const cal = Math.max(1200, tdee + g.adj + bt.c);
  const cp = Math.max(.20, g.sp.carb + bt.cb), fp = Math.max(.15, g.sp.fat - bt.cb), pp = g.sp.pro;
  const bmi = +(f.weightKg / ((f.heightCm / 100) ** 2)).toFixed(1);
  const bmiC = bmi < 18.5 ? {l:"Underweight",c:"#3B82F6"} : bmi < 25 ? {l:"Normal",c:"#10B981"} : bmi < 30 ? {l:"Overweight",c:"#F59E0B"} : {l:"Obese",c:"#EF4444"};
  const hi = f.heightCm / 2.54, base = f.gender === "Male" ? 50 : 45.5, iw = base + 2.3 * (hi - 60);
  return {
    calories: cal, protein: Math.round(cal * pp / 4), carbs: Math.round(cal * cp / 4), fats: Math.round(cal * fp / 9), fiber: Math.round(cal / 1000 * 14),
    bmr, tdee, proP: Math.round(pp * 100), carbP: Math.round(cp * 100), fatP: Math.round(fp * 100),
    bmi, bmiC, idealWt: {min: Math.round(iw * .9), max: Math.round(iw * 1.1), t: Math.round(iw)},
  };
}

function calcNutr(ings) {
  const t = {cal:0,pro:0,carb:0,fat:0,fib:0}; const mc = {};
  for (const ing of ings) {
    const f = gf(ing.foodId); if (!f) continue; const r = ing.grams / 100;
    t.cal += f.per100g.cal * r; t.pro += f.per100g.pro * r; t.carb += f.per100g.carb * r; t.fat += f.per100g.fat * r; t.fib += f.per100g.fib * r;
    for (const [k, v] of Object.entries(f.micros || {})) mc[k] = (mc[k] || 0) + v * r;
  }
  return {calories: Math.round(t.cal), protein: Math.round(t.pro), carbs: Math.round(t.carb), fats: Math.round(t.fat), fiber: Math.round(t.fib), micros: Object.fromEntries(Object.entries(mc).map(([k,v]) => [k, +v.toFixed(2)]))};
}

function solveMeal(tpl, targets, allergySet) {
  const safe = [tpl.protein, tpl.carb, tpl.fat, ...tpl.veg].every(id => { const f = gf(id); return f && !(f.allergens || []).some(a => allergySet.has(a.toLowerCase())); });
  const t = safe ? tpl : {...tpl, fat: "olive_oil"};
  const VG = 55; const cl = n => Math.max(0, n);
  let rem = {pro: targets.protein, carb: targets.carbs, fat: targets.fats};
  for (const id of t.veg) { const f = gf(id); if (!f) continue; const r = VG / 100; rem.pro -= f.per100g.pro * r; rem.carb -= f.per100g.carb * r; rem.fat -= f.per100g.fat * r; }
  rem = {pro: cl(rem.pro), carb: cl(rem.carb), fat: cl(rem.fat)};
  const pF = gf(t.protein), pG = Math.max(40, Math.round(rem.pro * 100 / Math.max(pF.per100g.pro, .5)));
  rem.carb = cl(rem.carb - pF.per100g.carb * pG / 100); rem.fat = cl(rem.fat - pF.per100g.fat * pG / 100);
  const cF = gf(t.carb), cG = Math.max(20, Math.round(rem.carb * 100 / Math.max(cF.per100g.carb, .5)));
  rem.fat = cl(rem.fat - cF.per100g.fat * cG / 100);
  const fF = gf(t.fat), fG = Math.max(5, Math.round(rem.fat * 100 / Math.max(fF.per100g.fat, .5)));
  const ings = [{foodId:t.protein,grams:pG},{foodId:t.carb,grams:cG},{foodId:t.fat,grams:fG},...t.veg.map(id => ({foodId:id,grams:VG}))];
  return {label: t.label, ingredients: ings, nutrition: calcNutr(ings)};
}

function buildMealOptions(mealIdx, form, macros) {
  const meals = form.meals || 3;
  const weights = MW[meals] || MW[3];
  const w = weights[mealIdx] || .33;
  const targets = {calories: Math.round(macros.calories * w), protein: Math.round(macros.protein * w), carbs: Math.round(macros.carbs * w), fats: Math.round(macros.fats * w), fiber: Math.round(macros.fiber * w)};
  const allergySet = new Set((form.allergies || []).map(a => a.toLowerCase()));
  const isNV = NON_VEG_DIETS.includes(form.dietType);
  const nvSet = buildNVSet(form);
  const mType = isNV && nvSet.has(mealIdx) ? "nv" : "vg";
  const isBfast = mealIdx === 0 || (meals >= 5 && mealIdx === 1 && w < .2);
  let tplSet;
  if (mType === "nv") { tplSet = isBfast ? TPL_NV_BFAST : TPL_NV_MAIN; }
  else {
    const base = isBfast ? TPL_VG_BFAST : TPL_VG_MAIN;
    const isVegan = ["Vegan","Non-Dairy Vegan"].includes(form.dietType);
    tplSet = isVegan ? base.filter(tt => gf(tt.protein)?.tags?.includes("vegan")) : base;
    if (!tplSet.length) tplSet = base;
  }
  const deficiencies = form.deficiencies || [];
  const options = tplSet.map(tpl => {
    const solved = solveMeal(tpl, targets, allergySet);
    const defHits = deficiencies.filter(d => (DEF_FOODS[d] || []).some(fid => solved.ingredients.some(ing => ing.foodId === fid)));
    return {...solved, defHits};
  });
  return {label: (ML[meals] || ML[3])[mealIdx], emoji: ME[mealIdx], mealType: mType, targets, options};
}

function buildNVSet(form) {
  const meals = form.meals || 3;
  const isNV = NON_VEG_DIETS.includes(form.dietType);
  const nvCount = isNV ? (form.mealSplit?.nv ?? meals) : 0;
  const weights = MW[meals] || MW[3];
  const nvSet = new Set();
  if (nvCount > 0) { const sorted = weights.map((w,i) => ({w,i})).sort((a,b) => b.w - a.w); for (let k = 0; k < nvCount && k < sorted.length; k++) nvSet.add(sorted[k].i); }
  return nvSet;
}

function sumMealsNutr(selectedMeals) {
  const tot = {calories:0,protein:0,carbs:0,fats:0,fiber:0}; const mc = {};
  for (const sm of selectedMeals) {
    const n = sm.option.nutrition;
    tot.calories += n.calories; tot.protein += n.protein; tot.carbs += n.carbs; tot.fats += n.fats; tot.fiber += n.fiber;
    for (const [k,v] of Object.entries(n.micros || {})) mc[k] = (mc[k] || 0) + v;
  }
  return {...tot, micros: Object.fromEntries(Object.entries(mc).map(([k,v]) => [k, +v.toFixed(2)]))};
}

const LS = {
  get: k => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// SIMULATED BLOOD REPORT ANALYSIS
function analyzeBloodReport(fileName) {
  const patterns = [
    {marker:"Vitamin D (25-OH)",value:"14.2 ng/mL",ref:"30-100 ng/mL",status:"low",deficiency:"Vitamin D"},
    {marker:"Vitamin B12",value:"198 pg/mL",ref:"200-900 pg/mL",status:"borderline",deficiency:"Vitamin B12"},
    {marker:"Serum Iron",value:"52 mcg/dL",ref:"60-170 mcg/dL",status:"low",deficiency:"Iron"},
    {marker:"Hemoglobin",value:"11.8 g/dL",ref:"13.5-17.5 g/dL",status:"low",deficiency:"Iron"},
    {marker:"Calcium",value:"8.9 mg/dL",ref:"8.5-10.5 mg/dL",status:"normal"},
    {marker:"Magnesium",value:"1.6 mg/dL",ref:"1.7-2.2 mg/dL",status:"borderline",deficiency:"Magnesium"},
    {marker:"Zinc",value:"68 mcg/dL",ref:"70-120 mcg/dL",status:"borderline",deficiency:"Zinc"},
    {marker:"Folate",value:"3.2 ng/mL",ref:"3.1-20 ng/mL",status:"borderline",deficiency:"Folate"},
    {marker:"Total Cholesterol",value:"185 mg/dL",ref:"<200 mg/dL",status:"normal"},
    {marker:"HbA1c",value:"5.4%",ref:"<5.7%",status:"normal"},
    {marker:"TSH",value:"2.8 mIU/L",ref:"0.4-4.0 mIU/L",status:"normal"},
    {marker:"Ferritin",value:"11 ng/mL",ref:"12-300 ng/mL",status:"low",deficiency:"Iron"},
  ];
  const detected = patterns.filter(p => p.status !== "normal");
  const deficiencies = [...new Set(detected.filter(p => p.deficiency).map(p => p.deficiency))];
  return {markers: patterns, detected, deficiencies, fileName};
}

// ── MICRO BAR ─────────────────────────────────────────────────
function MicroBar({id, val, gender, compact}) {
  const m = MICRO_META[id]; if (!m) return null;
  const rda = gender === "Female" ? m.rf : m.rm;
  const pct = Math.min((val / rda) * 100, 100);
  const st = pct >= 80 ? "g" : pct >= 40 ? "w" : "l";
  const lbl = {g:"✓",w:"⚠",l:"↓"}[st];
  const cls = {g:"tg",w:"tw",l:"tl"}[st];
  if (compact) return (
    <div className="mcr"><span className="mcr-n">{m.name}</span><div className="mcr-b"><div className="mcr-f" style={{width:`${pct}%`,background:m.color}}/></div><span className="mcr-v" style={{color:m.color}}>{val < 10 ? val.toFixed(1) : Math.round(val)}</span></div>
  );
  return (
    <div className="mfrow"><span className="mf-i">{m.icon}</span><span className="mf-n">{m.name}</span>
      <div className="mf-b"><div className="mf-f" style={{width:`${pct}%`,background:m.color}}/></div>
      <span className="mf-v" style={{color:m.color}}>{val < 10 ? val.toFixed(1) : Math.round(val)}<span className="mf-r"> {m.unit}</span></span>
      <span className={`mf-t ${cls}`}>{lbl}</span>
    </div>
  );
}

// ── OPTION CARD ───────────────────────────────────────────────
function OptionCard({opt, idx, gender, selected, onSelect}) {
  const [open, setOpen] = useState(false);
  const {label, ingredients, nutrition, defHits} = opt;
  const ingDet = ingredients.map(i => ({...i, food: gf(i.foodId)}));
  const mainEmo = ingDet.find(i => i.food?.role === "protein")?.food?.emoji || "🍽️";
  const mkeys = Object.keys(nutrition.micros || {}).filter(k => MICRO_META[k]);
  const OC = ["oa","ob","oc"], OL = ["Option A","Option B","Option C"];
  return (
    <div className={`ocard ${OC[idx]||""} ${selected?"sel":""}`} onClick={onSelect}>
      <div className="obdg">{OL[idx]||`Opt ${idx+1}`} {selected&&"✓"}</div>
      <span className="oemo">{mainEmo}</span>
      <div className="oname">{label}</div>
      <div className="nutrbox">
        <div className="nrow">
          {[{v:nutrition.calories,l:"kcal",bg:"rgba(245,158,11,.12)",c:"#F59E0B"},
            {v:nutrition.protein,l:"pro",bg:"var(--grg)",c:"var(--gr)"},
            {v:nutrition.carbs,l:"carb",bg:"rgba(59,130,246,.1)",c:"#3B82F6"},
            {v:nutrition.fats,l:"fat",bg:"rgba(239,68,68,.1)",c:"#EF4444"},
            {v:nutrition.fiber,l:"fiber",bg:"rgba(139,92,246,.1)",c:"#8B5CF6"},
          ].map(({v,l,bg,c}) => (
            <div key={l} className="npill" style={{background:bg}}>
              <div className="np-v" style={{color:c}}>{v}</div>
              <div className="np-l" style={{color:c}}>{l}</div>
            </div>
          ))}
        </div>
        {mkeys.length > 0 && <div className="mgrid">{mkeys.slice(0, 6).map(k => <MicroBar key={k} id={k} val={nutrition.micros[k]} gender={gender} compact/>)}</div>}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:8}}>
        {ingDet.map((i,ii) => i.food && <span key={ii} style={{fontSize:8,fontWeight:600,padding:"2px 7px",borderRadius:99,background:"var(--g2)",color:"var(--mu)",border:"1px solid var(--b1)"}}>{i.food.emoji} {i.grams}g {i.food.name}</span>)}
      </div>
      {defHits?.length > 0 && <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:7}}>{defHits.map(d => <span key={d} style={{fontSize:7,fontWeight:700,padding:"2px 6px",borderRadius:3,background:"rgba(245,158,11,.1)",color:"var(--am)",border:"1px solid rgba(245,158,11,.2)"}}>✦ {d}</span>)}</div>}
      <button className="expbtn" onClick={e=>{e.stopPropagation();setOpen(!open)}}>{open?"▲ Hide":"▼ Full nutrition & prep"}</button>
      {open && (
        <div className="oexp" onClick={e => e.stopPropagation()}>
          <div className="elbl">Macronutrients</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 11px",marginBottom:11}}>
            {[{l:"Calories",v:nutrition.calories,u:"kcal",c:"#F59E0B"},{l:"Protein",v:nutrition.protein,u:"g",c:"var(--gr)"},{l:"Carbs",v:nutrition.carbs,u:"g",c:"#3B82F6"},{l:"Fat",v:nutrition.fats,u:"g",c:"#EF4444"},{l:"Fiber",v:nutrition.fiber,u:"g",c:"#8B5CF6"}].map(({l,v,u,c}) => (
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:"1px solid var(--b1)"}}>
                <span style={{fontSize:9,color:"var(--mu)"}}>{l}</span>
                <span style={{fontSize:11,fontWeight:800,color:c,fontFamily:"Syne,sans-serif"}}>{v}<span style={{fontSize:7,color:"var(--li)",marginLeft:1}}>{u}</span></span>
              </div>
            ))}
          </div>
          {mkeys.length > 0 && <><div className="elbl">Micronutrients vs RDA</div><div className="mfull" style={{marginBottom:11}}>{mkeys.map(k => <MicroBar key={k} id={k} val={nutrition.micros[k]} gender={gender}/>)}</div></>}
          <div className="elbl">Ingredients</div>
          <ul className="ilist">{ingDet.map((i,ii) => i.food && <li key={ii}><span className="idot"/>{i.grams}g {i.food.name}</li>)}</ul>
          <div className="elbl" style={{marginTop:10}}>Preparation</div>
          <ol className="plist">{ingDet.flatMap((i,ii) => { const s = COOK[i.foodId]; if (!s) return []; return s.map((st,si) => <li key={`${ii}-${si}`}><strong style={{color:"var(--tx)"}}>{i.food?.name}:</strong> {st}</li>); })}</ol>
          {defHits?.length > 0 && <div style={{marginTop:8,fontSize:9,color:"var(--am)",background:"rgba(245,158,11,.07)",border:"1px solid rgba(245,158,11,.18)",borderRadius:7,padding:"6px 9px",lineHeight:1.5}}>💊 Targets your <strong>{defHits.join(", ")}</strong> deficiency.</div>}
        </div>
      )}
    </div>
  );
}

// ── OTP LOGIN ─────────────────────────────────────────────────
function OTPLogin({onLogin}) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(null);
  const [stage, setStage] = useState("phone");
  const [err, setErr] = useState("");
  const sendOTP = () => { if (phone.length < 10) { setErr("Enter valid 10-digit number"); return; } const c = Math.floor(100000 + Math.random() * 900000).toString(); setSent(c); setStage("otp"); setErr(""); };
  const verify = () => { if (otp === sent) { const u = LS.get("nm_u_" + phone) || {phone, createdAt: new Date().toISOString()}; LS.set("nm_u_" + phone, u); LS.set("nm_cur", phone); onLogin(u); } else setErr("Incorrect OTP. Try again."); };
  return (
    <div className="auth-wrap">
      <div className="mesh"><div className="ga"/><div className="gb"/></div>
      <div className="auth-card fup">
        <div className="logo-big">NutriMatch</div>
        <div className="tagline">Precision nutrition, personalised for you ✦</div>
        {stage === "phone" ? (
          <>
            <p style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:13,marginBottom:4}}>Welcome 👋</p>
            <p style={{fontSize:11,color:"var(--mu)",marginBottom:16,lineHeight:1.65}}>Enter your mobile number to get started.</p>
            <div className="fld"><label>Mobile Number</label><div className="ip"><span>+91</span><input type="tel" placeholder="98765 43210" value={phone} maxLength={10} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))}/></div></div>
            {err && <p className="err">{err}</p>}
            <button className="btn-p" onClick={sendOTP} disabled={phone.length < 10}>Send OTP →</button>
          </>
        ) : (
          <>
            <p style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:13,marginBottom:4}}>Verify OTP 🔐</p>
            <p style={{fontSize:11,color:"var(--mu)",marginBottom:8}}>Sent to +91 {phone}</p>
            <div className="otp-box"><div style={{fontSize:9,color:"var(--mu)",marginBottom:2}}>Demo — Your OTP:</div><div className="otp-code">{sent}</div><div style={{fontSize:9,color:"var(--mu)",marginTop:3}}>In production this arrives via SMS</div></div>
            <div className="fld"><label>Enter OTP</label><input type="tel" placeholder="• • • • • •" value={otp} maxLength={6} onChange={e=>setOtp(e.target.value.replace(/\D/g,""))} style={{letterSpacing:8,fontSize:20,textAlign:"center"}}/></div>
            {err && <p className="err">{err}</p>}
            <button className="btn-p" onClick={verify} disabled={otp.length < 6}>Verify & Enter →</button>
            <button className="btn-gh" style={{width:"100%",marginTop:6}} onClick={()=>setStage("phone")}>← Change number</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── PROFILE SETUP WIZARD ──────────────────────────────────────
const PROF_STEPS = ["General","Health","Medical"];

function ProfileSetup({phone, existing, onComplete}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState({phone, name:"", dob:"", gender:"", email:"", location:"", heightCm:"", weightKg:"", bodyType:"", activity:"", conditions:[], medicalReports:[], bloodAnalysis:null, ...(existing||{})});
  const [toast, setToast] = useState("");
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2400); };
  const tog = (k, v) => setDraft(d => ({...d, [k]: d[k]?.includes(v) ? d[k].filter(x => x !== v) : [...(d[k]||[]),v]}));
  const save = () => { LS.set("nm_p_" + phone, draft); onComplete(draft); };

  // Computed fields from DOB
  const age = draft.dob ? Math.floor((Date.now() - new Date(draft.dob)) / 31557600000) : null;
  const bmi = draft.heightCm && draft.weightKg ? +(draft.weightKg / ((draft.heightCm / 100) ** 2)).toFixed(1) : null;
  const bmiCat = bmi ? (bmi < 18.5 ? {l:"Underweight",c:"#3B82F6"} : bmi < 25 ? {l:"Normal",c:"#10B981"} : bmi < 30 ? {l:"Overweight",c:"#F59E0B"} : {l:"Obese",c:"#EF4444"}) : null;

  const stepOk = [
    draft.name && draft.dob && draft.gender,
    draft.heightCm > 100 && draft.weightKg > 20 && draft.bodyType && draft.activity,
    true,
  ];

  return (
    <div className="page fup">
      {toast && <div className="toast">{toast}</div>}
      <div className="pg-title">Set up your <span className="grad">profile</span></div>
      <div className="pg-sub">Complete your profile once — your meal plans are fully personalised from here.</div>

      {/* Step tabs */}
      <div className="prof-stepper">
        {PROF_STEPS.map((s, i) => {
          const st = i < step ? "done" : i === step ? "active" : "todo";
          return (
            <div key={s} className={`ps-item ${st}`} onClick={() => i < step && setStep(i)}>
              {st === "done" && <span className="ps-check">✓</span>}
              <div className="ps-n">{["👤","🏋️","🩺"][i]}</div>
              <div className="ps-l">{s}</div>
            </div>
          );
        })}
      </div>

      {/* STEP 0 — GENERAL */}
      {step === 0 && (
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
            {age && <div style={{background:"var(--grg)",border:"1px solid rgba(16,185,129,.2)",borderRadius:8,padding:"8px 12px",fontSize:11,color:"var(--gr)",marginBottom:11}}>Age derived: <strong>{age} years</strong> · Gender: <strong>{draft.gender}</strong> — will be used in your nutrition calculations.</div>}
            <div className="fld"><label>Email (optional)</label><input type="email" value={draft.email} placeholder="you@email.com" onChange={e=>setDraft({...draft,email:e.target.value})}/></div>
            <div className="fld"><label>Location (optional)</label><input value={draft.location} placeholder="City, Country" onChange={e=>setDraft({...draft,location:e.target.value})}/></div>
          </div>
          <div className="navrow"><button className="btn-p" style={{maxWidth:180}} onClick={()=>setStep(1)} disabled={!stepOk[0]}>Next: Health →</button></div>
        </div>
      )}

      {/* STEP 1 — HEALTH */}
      {step === 1 && (
        <div className="fup">
          <div className="card-g">
            <div className="sec-hdr">Height & Weight</div>
            <div className="r2">
              <div className="fld"><label>Height (cm)</label><input type="number" min={100} max={250} value={draft.heightCm} placeholder="175" onChange={e=>setDraft({...draft,heightCm:+e.target.value})}/></div>
              <div className="fld"><label>Weight (kg)</label><input type="number" min={20} max={300} value={draft.weightKg} placeholder="70" onChange={e=>setDraft({...draft,weightKg:+e.target.value})}/></div>
            </div>
            {bmi && (
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
              {[{id:"Ectomorph",e:"🏃",s:"Lean, fast metabolism"},{id:"Mesomorph",e:"🏋️",s:"Athletic, balanced"},{id:"Endomorph",e:"🤸",s:"Broader, slower metabolism"}].map(bt => (
                <div key={bt.id} className={`titem ${draft.bodyType===bt.id?"on":""}`} onClick={()=>setDraft({...draft,bodyType:bt.id})}>
                  <span className="ti-i">{bt.e}</span><div className="ti-n">{bt.id}</div><div className="ti-s">{bt.s}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-g">
            <div className="sec-hdr">Activity Level</div>
            <div className="rlist">
              {Object.entries(ACT_LEVELS).map(([k,v]) => (
                <div key={k} className={`ropt ${draft.activity===k?"on":""}`} onClick={()=>setDraft({...draft,activity:k})}>
                  <div className="rdot"/><div><div className="rn">{k}</div><div className="rs">{v.l}</div></div>
                  <span className="rr">×{v.m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-g">
            <div className="sec-hdr">Medical Conditions (optional)</div>
            <div className="chips">{CONDITIONS.map(c => <div key={c} className={`chip ${(draft.conditions||[]).includes(c)?"on":""}`} onClick={()=>tog("conditions",c)}>{c}</div>)}</div>
          </div>
          <div style={{display:"flex",gap:8,marginTop:20}}>
            <button className="btn-s" onClick={()=>setStep(0)}>← Back</button>
            <button className="btn-p" style={{flex:1}} onClick={()=>setStep(2)} disabled={!stepOk[1]}>Next: Medical History →</button>
          </div>
        </div>
      )}

      {/* STEP 2 — MEDICAL HISTORY */}
      {step === 2 && (
        <MedicalStep draft={draft} setDraft={setDraft} onBack={()=>setStep(1)} onFinish={save} showToast={showToast}/>
      )}
    </div>
  );
}

// ── MEDICAL HISTORY STEP ──────────────────────────────────────
function MedicalStep({draft, setDraft, onBack, onFinish, showToast}) {
  const [showAdd, setShowAdd] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [medForm, setMedForm] = useState({date:"",type:"Checkup",condition:"",doctor:"",notes:""});
  const fileRef = useRef(null);

  const addReport = () => {
    const r = [...(draft.medicalReports||[]), {...medForm, id:Date.now()}];
    setDraft({...draft, medicalReports:r});
    setMedForm({date:"",type:"Checkup",condition:"",doctor:"",notes:""});
    setShowAdd(false);
    showToast("✓ Report added");
  };
  const delReport = id => setDraft({...draft, medicalReports:(draft.medicalReports||[]).filter(r=>r.id!==id)});

  const handleFile = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setAnalyzing(true);
    setTimeout(() => {
      const analysis = analyzeBloodReport(file.name);
      setDraft(d => ({...d, bloodAnalysis: analysis, deficiencies: analysis.deficiencies}));
      setAnalyzing(false);
      showToast("✓ Blood report analysed — " + analysis.deficiencies.length + " flags found");
    }, 2200);
  };

  return (
    <div className="fup">
      {/* Blood Report Upload */}
      <div className="card-v">
        <div className="sec-hdr">Blood Report Upload</div>
        <p style={{fontSize:11,color:"var(--mu)",marginBottom:12,lineHeight:1.65}}>Upload your blood test report (PDF or image). Our AI will extract your markers, flag deficiencies and borderline values, and automatically populate your nutrition plan to address them.</p>
        {!draft.bloodAnalysis && !analyzing && (
          <>
            <div className="br-zone" onClick={()=>fileRef.current?.click()}>
              <div style={{fontSize:28,marginBottom:6}}>🩸</div>
              <div style={{fontSize:12,fontWeight:700,marginBottom:3}}>Upload Blood Report</div>
              <div style={{fontSize:10,color:"var(--mu)"}}>PDF · JPG · PNG — tap to browse</div>
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={handleFile}/>
          </>
        )}
        {analyzing && (
          <div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{width:32,height:32,border:"2px solid var(--b1)",borderTopColor:"var(--gr)",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto 10px"}}/>
            <div style={{fontSize:11,color:"var(--mu)"}}>Analysing your report…</div>
          </div>
        )}
        {draft.bloodAnalysis && (
          <div className="br-result">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11}}>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:"var(--gr)",letterSpacing:".5px"}}>✓ Report Analysed</div>
                <div style={{fontSize:9,color:"var(--mu)",marginTop:2}}>📄 {draft.bloodAnalysis.fileName}</div>
              </div>
              <button className="btn-pill" onClick={()=>setDraft(d=>({...d,bloodAnalysis:null,deficiencies:[]}))}>Remove</button>
            </div>
            {draft.bloodAnalysis.detected.length > 0 && (
              <div style={{background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.2)",borderRadius:8,padding:"9px 11px",marginBottom:11}}>
                <div style={{fontSize:8,fontWeight:800,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--co)",marginBottom:7}}>⚠ Flags Found ({draft.bloodAnalysis.detected.length})</div>
                {draft.bloodAnalysis.detected.map((m,i) => (
                  <div key={i} className="br-marker">
                    <span className="br-mk-n">{m.marker}</span>
                    <span className="br-mk-v" style={{color:m.status==="low"?"var(--co)":"var(--am)"}}>{m.value}</span>
                    <span className="br-mk-r">ref: {m.ref}</span>
                    <span className={`br-tag ${m.status==="low"?"br-l":"br-b"}`}>{m.status==="low"?"Low":"Borderline"}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{background:"var(--grg)",border:"1px solid rgba(16,185,129,.2)",borderRadius:8,padding:"9px 11px",marginBottom:11}}>
              <div style={{fontSize:8,fontWeight:800,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--gr)",marginBottom:7}}>✓ Normal Markers</div>
              {draft.bloodAnalysis.markers.filter(m=>m.status==="normal").map((m,i) => (
                <div key={i} className="br-marker">
                  <span className="br-mk-n">{m.marker}</span>
                  <span className="br-mk-v" style={{color:"var(--gr)"}}>{m.value}</span>
                  <span className="br-mk-r">ref: {m.ref}</span>
                  <span className="br-tag br-n">Normal</span>
                </div>
              ))}
            </div>
            <div style={{background:"var(--vig)",border:"1px solid rgba(139,92,246,.2)",borderRadius:8,padding:"9px 11px"}}>
              <div style={{fontSize:8,fontWeight:800,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--vi)",marginBottom:5}}>💊 Nutrition Plan Will Target</div>
              <div className="chips">{draft.bloodAnalysis.deficiencies.map(d => <span key={d} className="chip on">{d}</span>)}</div>
              <div style={{fontSize:9,color:"var(--mu)",marginTop:7,lineHeight:1.55}}>Your meal plan will automatically include foods rich in these nutrients. No need to select them manually.</div>
            </div>
          </div>
        )}
      </div>

      {/* Manual Medical Records */}
      <div className="card">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div className="sec-hdr" style={{margin:0}}>Other Medical Records</div>
          <button className="btn-pill" onClick={()=>setShowAdd(!showAdd)}>+ Add</button>
        </div>
        {showAdd && (
          <div style={{background:"var(--g1)",border:"1px solid rgba(16,185,129,.18)",borderRadius:10,padding:12,marginBottom:12}}>
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
            <div className="fld"><label>Notes</label><textarea value={medForm.notes} placeholder="Additional notes..." onChange={e=>setMedForm({...medForm,notes:e.target.value})}/></div>
            <div style={{display:"flex",gap:7}}>
              <button className="btn-p" style={{flex:1}} onClick={addReport} disabled={!medForm.condition||!medForm.date}>Save</button>
              <button className="btn-s" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        )}
        {(draft.medicalReports||[]).length === 0 && !showAdd && (
          <div style={{textAlign:"center",padding:"20px 0",color:"var(--mu)"}}>
            <div style={{fontSize:28,marginBottom:7}}>📋</div>
            <div style={{fontSize:11,fontWeight:600,marginBottom:3}}>No records yet</div>
            <div style={{fontSize:10,lineHeight:1.6}}>Add your medical records, prescriptions, or checkup notes.</div>
          </div>
        )}
        {(draft.medicalReports||[]).map(r => (
          <div key={r.id} className="medc">
            <div className="medtop">
              <span className="medbadge">{r.type}</span>
              <span className="meddate">{r.date ? new Date(r.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : ""}</span>
              <button onClick={()=>delReport(r.id)} style={{border:"none",background:"none",color:"var(--li)",cursor:"pointer",fontSize:14,marginLeft:"auto",padding:0}}>×</button>
            </div>
            <div className="medtitle">{r.condition}</div>
            {r.doctor && <div style={{fontSize:9,color:"var(--mu)",marginBottom:2}}>👨‍⚕️ {r.doctor}</div>}
            {r.notes && <div style={{fontSize:10,color:"var(--mu)",lineHeight:1.5}}>{r.notes}</div>}
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:8,marginTop:20}}>
        <button className="btn-s" onClick={onBack}>← Back</button>
        <button className="btn-p" style={{flex:1}} onClick={onFinish}>Complete Profile →</button>
      </div>
    </div>
  );
}

// ── PROFILE VIEW SCREEN ───────────────────────────────────────
function ProfileScreen({profile, onEdit, onStartPlan}) {
  const [tab, setTab] = useState("general");
  const age = profile.dob ? Math.floor((Date.now() - new Date(profile.dob)) / 31557600000) : null;
  const bmi = profile.heightCm && profile.weightKg ? +(profile.weightKg / ((profile.heightCm / 100) ** 2)).toFixed(1) : null;
  const bmiCat = bmi ? (bmi < 18.5 ? {l:"Underweight",c:"#3B82F6"} : bmi < 25 ? {l:"Normal",c:"#10B981"} : bmi < 30 ? {l:"Overweight",c:"#F59E0B"} : {l:"Obese",c:"#EF4444"}) : null;
  const initials = (profile.name || "?").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="page fup">
      <div className="phero">
        <div className="pav">{initials}</div>
        <div>
          <div className="pname">{profile.name || "—"}</div>
          <div className="pmeta">📱 {profile.phone}{age ? " · " + age + " yrs" : ""}</div>
        </div>
        <button className="pedit" onClick={onEdit}>Edit</button>
      </div>
      <div className="ptabs">
        {["general","health","medical"].map(t => (
          <button key={t} className={`ptab ${tab===t?"on":""}`} onClick={()=>setTab(t)}>
            {t==="general"?"👤 General":t==="health"?"🏋️ Health":"🩺 Medical"}
          </button>
        ))}
      </div>
      {tab === "general" && (
        <div className="card">
          <div className="igrid">
            <div className="iitem"><div className="ii-l">Name</div><div className="ii-v">{profile.name||"—"}</div></div>
            <div className="iitem"><div className="ii-l">Gender</div><div className="ii-v">{profile.gender||"—"}</div></div>
            <div className="iitem"><div className="ii-l">Age</div><div className="ii-v">{age ? age + " yrs" : "—"}</div></div>
            <div className="iitem"><div className="ii-l">Mobile</div><div className="ii-v">{profile.phone}</div></div>
            <div className="iitem ifl"><div className="ii-l">Email</div><div className="ii-v">{profile.email||"—"}</div></div>
            <div className="iitem ifl"><div className="ii-l">Location</div><div className="ii-v">{profile.location||"—"}</div></div>
          </div>
        </div>
      )}
      {tab === "health" && (
        <>
          {bmi && (
            <div className="card">
              <div className="sec-hdr">Body Stats</div>
              <div className="bmi-strip">
                <div><div className="bmi-l">BMI</div><div className="bmi-v">{bmi}</div><div className="bmi-t" style={{background:bmiCat.c+"22",color:bmiCat.c}}>{bmiCat.l}</div></div>
                <div><div className="bmi-l">Height</div><div className="bmi-v">{profile.heightCm}<span style={{fontSize:10}}>cm</span></div></div>
                <div><div className="bmi-l">Weight</div><div className="bmi-v">{profile.weightKg}<span style={{fontSize:10}}>kg</span></div></div>
              </div>
            </div>
          )}
          <div className="card">
            <div className="igrid">
              <div className="iitem"><div className="ii-l">Body Type</div><div className="ii-v">{profile.bodyType||"—"}</div></div>
              <div className="iitem"><div className="ii-l">Activity</div><div className="ii-v">{profile.activity||"—"}</div></div>
              <div className="iitem ifl"><div className="ii-l">Conditions</div>
                <div className="taglist">{(profile.conditions||[]).length>0?(profile.conditions||[]).map(c=><span key={c} className="tagitem">{c}</span>):<span style={{fontSize:10,color:"var(--mu)"}}>None</span>}</div>
              </div>
            </div>
          </div>
        </>
      )}
      {tab === "medical" && (
        <>
          {profile.bloodAnalysis && (
            <div className="card-g" style={{marginBottom:11}}>
              <div className="sec-hdr">Blood Report Analysis</div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:18}}>🩸</span>
                <div><div style={{fontSize:11,fontWeight:700}}>📄 {profile.bloodAnalysis.fileName}</div><div style={{fontSize:9,color:"var(--mu)"}}>Analysed · {profile.bloodAnalysis.deficiencies.length} flags found</div></div>
              </div>
              <div className="chips">{(profile.bloodAnalysis.deficiencies||[]).map(d=><span key={d} className="chip on">{d}</span>)}</div>
            </div>
          )}
          {(profile.medicalReports||[]).length === 0 && !profile.bloodAnalysis && (
            <div style={{textAlign:"center",padding:"28px 0",color:"var(--mu)"}}>
              <div style={{fontSize:28,marginBottom:7}}>📋</div>
              <div style={{fontSize:12,fontWeight:600,marginBottom:3}}>No records</div>
              <div style={{fontSize:10,lineHeight:1.6}}>Edit profile to add medical records.</div>
            </div>
          )}
          {(profile.medicalReports||[]).map(r => (
            <div key={r.id} className="medc">
              <div className="medtop"><span className="medbadge">{r.type}</span><span className="meddate">{r.date?new Date(r.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):""}</span></div>
              <div className="medtitle">{r.condition}</div>
              {r.doctor && <div style={{fontSize:9,color:"var(--mu)",marginBottom:2}}>👨‍⚕️ {r.doctor}</div>}
              {r.notes && <div style={{fontSize:10,color:"var(--mu)",lineHeight:1.5}}>{r.notes}</div>}
            </div>
          ))}
        </>
      )}
      <div style={{marginTop:16}}>
        <button className="btn-p" onClick={onStartPlan}>⚡ Generate My Meal Plan</button>
      </div>
    </div>
  );
}

// ── PLAN WIZARD — STEP INDICATOR ──────────────────────────────
function Stepper({step, total}) {
  const steps = total <= 2 ? ["Goal","Diet"] : total <= 4 ? ["Goal","Diet","Meals","Summary"] : ["Goal","Diet","Meals","Split","Summary"];
  const shown = ["Goal","Diet","Split","Summary"].slice(0,4);
  return (
    <div className="stepper">
      {shown.map((s, i) => {
        const n = i + 1, st = n < step ? "d" : n === step ? "a" : "t";
        return (
          <div key={s} className="si">
            <div className="sw"><div className={`sb ${st}`}>{st==="d"?"✓":n}</div><div className={`sl ${st}`}>{s}</div></div>
            {i < shown.length - 1 && <div className={`sline ${n < step ? "d" : "t"}`}/>}
          </div>
        );
      })}
    </div>
  );
}

// ── PLAN STEP A — GOAL ────────────────────────────────────────
function GoalStep({data, setData, profile, onNext}) {
  const GOAL_LIST = [{id:"Lose Fat",e:"🔥",s:"-400 kcal"},{id:"Gentle Cut",e:"✂️",s:"-200 kcal"},{id:"Maintain",e:"⚖️",s:"Maintenance"},{id:"Build Muscle",e:"💪",s:"+300 kcal"},{id:"Performance",e:"⚡",s:"+200 kcal"},{id:"Recomposition",e:"🔄",s:"Slight surplus"}];
  const ok = data.goal;
  return (
    <div className="page fup">
      <div className="pg-title">Your <span className="grad">goal</span></div>
      <div className="pg-sub">What are you training towards right now?</div>
      {profile?.name && <div style={{background:"var(--grg)",border:"1px solid rgba(16,185,129,.18)",borderRadius:8,padding:"8px 12px",fontSize:10,color:"var(--gr)",marginBottom:14}}>📊 Using your profile: <strong>{profile.gender}, {profile.dob?Math.floor((Date.now()-new Date(profile.dob))/31557600000):"?"}y</strong> · <strong>{profile.heightCm}cm / {profile.weightKg}kg</strong> · <strong>{profile.activity}</strong></div>}
      <div className="card">
        <div className="tgrid tg3">
          {GOAL_LIST.map(g => (
            <div key={g.id} className={`titem ${data.goal===g.id?"on":""}`} onClick={()=>setData({...data,goal:g.id})}>
              <span className="ti-i">{g.e}</span><div className="ti-n">{g.id}</div><div className="ti-s">{g.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="navrow"><button className="btn-p" style={{maxWidth:180}} onClick={onNext} disabled={!ok}>Next →</button></div>
    </div>
  );
}

// ── PLAN STEP B — DIET TYPE + MEALS ──────────────────────────
function DietStep({data, setData, profile, onNext, onBack}) {
  const tog = (k, v) => setData(d => ({...d,[k]:d[k]?.includes(v)?d[k].filter(x=>x!==v):[...(d[k]||[]),v]}));
  const isNV = NON_VEG_DIETS.includes(data.dietType);
  const hasBloodReport = !!profile?.bloodAnalysis;
  const ok = data.dietType && data.meals;
  const DIET_TYPES = [{id:"Non-Veg (All)",e:"🥩",s:"All meats & fish"},{id:"Chicken & Fish Only",e:"🍗",s:"Poultry & seafood"},{id:"Vegetarian",e:"🥗",s:"Eggs & dairy OK"},{id:"Vegan",e:"🌿",s:"Fully plant-based"},{id:"Non-Dairy Vegan",e:"🌱",s:"No dairy or eggs"}];
  return (
    <div className="page fup">
      <div className="pg-title">Diet & <span className="grad">meals</span></div>
      <div className="pg-sub">Set your diet type, number of meals, and any allergies.</div>
      <div className="card">
        <div className="sec-hdr">Diet Type</div>
        <div className="rlist">{DIET_TYPES.map(d => (
          <div key={d.id} className={`ropt ${data.dietType===d.id?"on":""}`} onClick={()=>setData({...data,dietType:d.id,mealSplit:null})}>
            <div className="rdot"/><span style={{fontSize:17}}>{d.e}</span><div><div className="rn">{d.id}</div><div className="rs">{d.s}</div></div>
          </div>
        ))}</div>
      </div>
      <div className="card">
        <div className="sec-hdr">Meals Per Day</div>
        <div className="mlrow">{[1,2,3,4,5,6].map(n => <button key={n} className={`mlbtn ${data.meals===n?"on":""}`} onClick={()=>setData({...data,meals:n,mealSplit:null})}>{n}</button>)}</div>
      </div>
      {isNV && data.meals > 0 && (
        <div className="card-v" style={{border:"1px solid rgba(139,92,246,.22)"}}>
          <div className="sec-hdr">Meal Composition Split</div>
          <p style={{fontSize:10,color:"var(--mu)",marginBottom:11,lineHeight:1.65}}>How many of your <strong style={{color:"var(--tx)"}}>{data.meals} meals</strong> should be <span style={{color:"var(--co)",fontWeight:700}}>Non-Veg 🥩</span> vs <span style={{color:"var(--gr)",fontWeight:700}}>Veg 🥗</span>?</p>
          <div className="spgrid">
            {Array.from({length:data.meals+1},(_,i)=>({nv:i,vg:data.meals-i})).map(({nv,vg}) => (
              <div key={nv} className={`spcard ${data.mealSplit?.nv===nv?"on":""}`} onClick={()=>setData({...data,mealSplit:{nv,vg}})}>
                <div className="spdots">
                  {Array.from({length:nv}).map((_,i)=><div key={"n"+i} className="spdot nv">🥩</div>)}
                  {Array.from({length:vg}).map((_,i)=><div key={"v"+i} className="spdot vg">🥗</div>)}
                </div>
                <div className="spl">{nv===0?"All Veg":vg===0?"All NV":`${nv}NV+${vg}Veg`}</div>
                <div className="sps">{nv===0?"Max plant nutrients":vg===0?"Max B12/omega-3":"Best diversity"}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {hasBloodReport ? (
        <div className="card-g">
          <div className="sec-hdr">Deficiencies</div>
          <div style={{background:"var(--grg)",border:"1px solid rgba(16,185,129,.2)",borderRadius:8,padding:"9px 11px",marginBottom:8}}>
            <div style={{fontSize:9,fontWeight:700,color:"var(--gr)",marginBottom:5}}>✓ Auto-detected from your blood report</div>
            <div className="chips">{(profile.bloodAnalysis.deficiencies||[]).map(d=><span key={d} className="chip on">{d}</span>)}</div>
          </div>
          <div style={{fontSize:9,color:"var(--mu)"}}>Want to add more?</div>
          <div className="chips" style={{marginTop:6}}>{VITAMINS.filter(v=>!(profile.bloodAnalysis.deficiencies||[]).includes(v)).map(v=><div key={v} className={`chip ${(data.extraDeficiencies||[]).includes(v)?"on":""}`} onClick={()=>tog("extraDeficiencies",v)}>{v}</div>)}</div>
        </div>
      ) : (
        <div className="card">
          <div className="sec-hdr">Known Deficiencies (optional)</div>
          <div className="chips">{VITAMINS.map(v=><div key={v} className={`chip ${(data.deficiencies||[]).includes(v)?"on":""}`} onClick={()=>tog("deficiencies",v)}>{v}</div>)}</div>
        </div>
      )}
      <div className="card">
        <div className="sec-hdr">Food Allergies / Exclusions</div>
        <div className="chips">{ALLERGENS.map(a=><div key={a} className={`chip ${(data.allergies||[]).includes(a)?"onr":""}`} onClick={()=>tog("allergies",a)}>{a}</div>)}</div>
      </div>
      <div style={{display:"flex",gap:8,marginTop:20}}>
        <button className="btn-s" onClick={onBack}>← Back</button>
        <button className="btn-p" style={{flex:1}} onClick={onNext} disabled={!ok || (isNV && !data.mealSplit && data.meals > 1)}>Generate Plan →</button>
      </div>
    </div>
  );
}

// ── MEAL SELECTION PAGE ───────────────────────────────────────
function MealSelectPage({mealIdx, mealData, gender, onSelect, onBack, totalMeals, selectedSoFar}) {
  const [chosen, setChosen] = useState(null);
  const isLast = mealIdx === totalMeals - 1;
  return (
    <div className="page-w fup">
      {/* Progress dots */}
      <div className="meal-prog">
        {Array.from({length:totalMeals}).map((_,i) => {
          const cls = i < mealIdx ? "dn" : i === mealIdx ? "ac" : "td";
          return <div key={i} className={`mp-dot ${cls}`}/>;
        })}
      </div>
      <div style={{textAlign:"center",marginBottom:18}}>
        <div style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(18px,5vw,22px)",fontWeight:800,marginBottom:3}}>{mealData.emoji} Meal {mealIdx+1} — {mealData.label}</div>
        <div style={{fontSize:10,color:"var(--mu)"}}>Pick one option · {mealData.targets.calories} kcal · {mealData.targets.protein}g protein · <span style={{color:mealData.mealType==="nv"?"var(--co)":"var(--gr)"}}>{mealData.mealType==="nv"?"🥩 Non-Veg":"🥗 Veg"}</span></div>
      </div>
      <div className="smbar">
        <span className="smbar-l">All options:</span>
        <span className="smp" style={{background:"rgba(245,158,11,.12)",color:"#F59E0B"}}>🔥 {mealData.targets.calories}kcal</span>
        <span className="smp" style={{background:"var(--grg)",color:"var(--gr)"}}>💪 {mealData.targets.protein}g</span>
        <span className="smp" style={{background:"rgba(59,130,246,.1)",color:"#3B82F6"}}>⚡ {mealData.targets.carbs}g</span>
        <span className="smp" style={{background:"rgba(239,68,68,.1)",color:"#EF4444"}}>🫧 {mealData.targets.fats}g</span>
      </div>
      <div className="optgrid">
        {mealData.options.map((opt, i) => (
          <OptionCard key={i} opt={opt} idx={i} gender={gender} selected={chosen===i} onSelect={()=>setChosen(i)}/>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginTop:20}}>
        {(mealIdx > 0 || selectedSoFar.length > 0) && <button className="btn-s" onClick={onBack}>← Back</button>}
        <button className="btn-p" style={{flex:1}} onClick={()=>onSelect(mealData.options[chosen])} disabled={chosen===null}>
          {isLast ? "See Summary →" : `Choose & Next Meal →`}
        </button>
      </div>
    </div>
  );
}


// ── SUMMARY PAGE ──────────────────────────────────────────────
function SummaryPage({form, macros, allMeals, selectedMeals, onEdit, gender}) {
  const dayNutr = useMemo(() => sumMealsNutr(selectedMeals), [selectedMeals]);
  const microKeys = Object.keys(MICRO_META).filter(k => dayNutr.micros?.[k] > 0);
  return (
    <div className="page-w fup">
      <div className="sbn">
        <div className="sbn-tag">Your Personalised Plan · NutriMatch</div>
        <div className="sbn-name">{form.gender}, {form.age || (form.dob ? Math.floor((Date.now()-new Date(form.dob))/31557600000) : "?")}y · {form.bodyType} · {form.goal}</div>
        <div className="sbn-grid">
          {[
            {l:"Target Cal",v:macros.calories,u:"kcal",b:GOALS_M[form.goal]?.l},
            {l:"BMI",v:macros.bmi,u:"",b:macros.bmiC?.l},
            {l:"Ideal Wt",v:`${macros.idealWt?.min}-${macros.idealWt?.max}`,u:"kg",b:"Devine"},
            {l:"TDEE",v:macros.tdee,u:"kcal",b:form.activity},
            {l:"BMR",v:macros.bmr,u:"kcal",b:"Mifflin"},
            {l:"Meals",v:allMeals.length,u:"",b:form.dietType?.split(" ")[0]},
          ].map(s => (
            <div key={s.l}><div className="sbi-l">{s.l}</div><div className="sbi-v">{s.v}<span className="sbi-u">{s.u}</span></div>{s.b&&<div className="sbi-b">{s.b}</div>}</div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sec-hdr">Daily Macro Blueprint</div>
        {[{n:"Protein",v:macros.protein,max:300,u:"g",p:`${macros.proP}%`,c:"var(--gr)"},{n:"Carbohydrates",v:macros.carbs,max:500,u:"g",p:`${macros.carbP}%`,c:"#3B82F6"},{n:"Fats",v:macros.fats,max:200,u:"g",p:`${macros.fatP}%`,c:"#EF4444"},{n:"Fiber",v:macros.fiber,max:60,u:"g",p:"14g/1000kcal",c:"#8B5CF6"}].map(m => (
          <div key={m.n}>
            <div className="pbrow"><span className="pbl">{m.n}</span><span className="pbv" style={{color:m.c}}>{m.v}{m.u} <span style={{fontSize:8,color:"var(--mu)"}}>({m.p})</span></span></div>
            <div className="pbar"><div className="pbf" style={{width:`${Math.min((m.v/m.max)*100,100)}%`,background:m.c}}/></div>
          </div>
        ))}
        <div className="mprow" style={{marginTop:6}}>
          {[{l:"Cal",v:macros.calories,u:"kcal",bg:"rgba(245,158,11,.12)",c:"#F59E0B"},{l:"Protein",v:macros.protein,u:"g",bg:"var(--grg)",c:"var(--gr)"},{l:"Carbs",v:macros.carbs,u:"g",bg:"rgba(59,130,246,.1)",c:"#3B82F6"},{l:"Fat",v:macros.fats,u:"g",bg:"rgba(239,68,68,.1)",c:"#EF4444"},{l:"Fiber",v:macros.fiber,u:"g",bg:"rgba(139,92,246,.1)",c:"#8B5CF6"}].map(m => (
            <div key={m.l} className="mpill" style={{background:m.bg}}>
              <div className="mp-v" style={{color:m.c}}>{m.v}<span className="mp-u">{m.u}</span></div>
              <div className="mp-l" style={{color:m.c}}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-g" style={{marginBottom:14}}>
        <div className="sec-hdr">Your Selected Meals</div>
        {selectedMeals.map((sm, i) => (
          <div key={i} className="sum-meal">
            <div className="sum-emo">{allMeals[i]?.emoji}</div>
            <div className="sum-info">
              <div className="sum-title">Meal {i+1} — {allMeals[i]?.label}</div>
              <div className="sum-opt-name">{sm.option.label}</div>
              <div className="sum-meta">
                {sm.option.nutrition.calories}kcal · {sm.option.nutrition.protein}g protein · {sm.option.nutrition.carbs}g carbs · {sm.option.nutrition.fats}g fat
                <span style={{marginLeft:5,padding:"1px 6px",borderRadius:99,fontSize:7,fontWeight:700,background:allMeals[i]?.mealType==="nv"?"rgba(239,68,68,.1)":"var(--grg)",color:allMeals[i]?.mealType==="nv"?"var(--co)":"var(--gr)"}}>{allMeals[i]?.mealType==="nv"?"🥩 NV":"🥗 Veg"}</span>
              </div>
            </div>
            <div className="sum-edit" onClick={()=>onEdit(i)}>✏ Edit</div>
          </div>
        ))}
        <div style={{background:"var(--g1)",border:"1px solid var(--b2)",borderRadius:10,padding:"11px 14px",marginTop:4,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:8,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--mu)"}}>Day Total:</span>
          {[{l:"Calories",v:dayNutr.calories,u:"kcal",c:"#F59E0B"},{l:"Protein",v:dayNutr.protein,u:"g",c:"var(--gr)"},{l:"Carbs",v:dayNutr.carbs,u:"g",c:"#3B82F6"},{l:"Fat",v:dayNutr.fats,u:"g",c:"#EF4444"},{l:"Fiber",v:dayNutr.fiber,u:"g",c:"#8B5CF6"}].map(d=>(
            <span key={d.l} style={{padding:"3px 9px",borderRadius:99,fontSize:9,fontWeight:700,background:"var(--g2)",color:d.c}}>{d.v}<span style={{fontSize:7,marginLeft:1,opacity:.7}}>{d.u}</span></span>
          ))}
        </div>
      </div>

      {microKeys.length > 0 && (
        <div className="card">
          <div className="sec-hdr">Daily Micronutrients vs RDA</div>
          <div className="mfull">{microKeys.map(k => <MicroBar key={k} id={k} val={dayNutr.micros[k]} gender={gender}/>)}</div>
        </div>
      )}

      <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:18,flexWrap:"wrap"}}>
        <button className="btn-s" onClick={()=>onEdit(selectedMeals.length-1)}>← Adjust Last Meal</button>
        <button className="btn-s" onClick={()=>window.location.reload()}>↻ Start Over</button>
      </div>
    </div>
  );
}

// ── HOME SCREEN ───────────────────────────────────────────────
function HomeScreen({profile, onStartPlan}) {
  const age = profile?.dob ? Math.floor((Date.now() - new Date(profile.dob)) / 31557600000) : null;
  const bmi = profile?.heightCm && profile?.weightKg ? +(profile.weightKg / ((profile.heightCm / 100) ** 2)).toFixed(1) : null;
  const bmiCat = bmi ? (bmi < 18.5 ? {l:"Underweight",c:"#3B82F6"} : bmi < 25 ? {l:"Normal",c:"#10B981"} : bmi < 30 ? {l:"Overweight",c:"#F59E0B"} : {l:"Obese",c:"#EF4444"}) : null;
  return (
    <div className="page fup">
      <div className="pg-title">Hey, <span className="grad">{profile?.name?.split(" ")[0] || "there"}</span> 👋</div>
      <div className="pg-sub">Welcome to NutriMatch — your precision nutrition companion.</div>
      {bmi && (
        <div className="sbn" style={{marginBottom:14}}>
          <div className="sbn-tag">Health Overview</div>
          <div className="bmi-strip">
            <div><div className="bmi-l">BMI</div><div className="bmi-v">{bmi}</div><div className="bmi-t" style={{background:bmiCat.c+"22",color:bmiCat.c}}>{bmiCat.l}</div></div>
            <div><div className="bmi-l">Height</div><div className="bmi-v">{profile.heightCm}<span style={{fontSize:10}}>cm</span></div></div>
            <div><div className="bmi-l">Weight</div><div className="bmi-v">{profile.weightKg}<span style={{fontSize:10}}>kg</span></div></div>
          </div>
        </div>
      )}
      <div className="card-g">
        <div className="sec-hdr">Ready to plan?</div>
        <p style={{fontSize:11,color:"var(--mu)",marginBottom:13,lineHeight:1.65}}>Generate your personalised meal plan with exact macros, micronutrients, and step-by-step meal choices.</p>
        <button className="btn-p" onClick={onStartPlan}>⚡ Generate Meal Plan</button>
      </div>
      {profile?.bloodAnalysis && (
        <div className="card">
          <div className="sec-hdr">Blood Report Flags</div>
          <div className="chips">{(profile.bloodAnalysis.deficiencies||[]).map(d=><span key={d} className="chip on">{d}</span>)}</div>
          <div style={{fontSize:9,color:"var(--mu)",marginTop:7}}>Your meal plan will automatically address these.</div>
        </div>
      )}
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────
export default function App() {
  const [authUser, setAuthUser] = useState(() => {
    const p = LS.get("nm_cur"); if (!p) return null;
    return LS.get("nm_u_" + p) || null;
  });
  const [profile, setProfile] = useState(() => {
    const p = LS.get("nm_cur"); if (!p) return null;
    return LS.get("nm_p_" + p) || null;
  });
  const [profileSetupDone, setProfileSetupDone] = useState(() => {
    const p = LS.get("nm_cur"); if (!p) return false;
    const pr = LS.get("nm_p_" + p); return !!(pr && pr.name && pr.heightCm && pr.weightKg);
  });
  const [tab, setTab] = useState("home");
  const [editingProfile, setEditingProfile] = useState(false);

  // Plan state
  const [planStage, setPlanStage] = useState("goal"); // goal | diet | meals | summary
  const [planGoalData, setPlanGoalData] = useState({goal: ""});
  const [planDietData, setPlanDietData] = useState({dietType: "", meals: 3, mealSplit: null, deficiencies: [], extraDeficiencies: [], allergies: []});
  const [macros, setMacros] = useState(null);
  const [allMeals, setAllMeals] = useState([]);       // all meal slot configs
  const [mealIdx, setMealIdx] = useState(0);           // current meal being selected
  const [selectedMeals, setSelectedMeals] = useState([]); // [{mealIdx, option}]

  const handleLogin = user => {
    setAuthUser(user);
    const saved = LS.get("nm_p_" + user.phone);
    setProfile(saved || {...user});
    setProfileSetupDone(!!(saved && saved.name && saved.heightCm && saved.weightKg));
  };

  const handleProfileComplete = p => {
    setProfile(p);
    LS.set("nm_p_" + p.phone, p);
    setProfileSetupDone(true);
    setEditingProfile(false);
    setTab("home");
  };

  const logout = () => {
    LS.set("nm_cur", null);
    setAuthUser(null);
    setProfile(null);
    setProfileSetupDone(false);
  };

  const initials = profile?.name ? profile.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

  const startPlan = () => {
    setPlanStage("goal");
    setPlanGoalData({goal: ""});
    setPlanDietData({dietType: "", meals: 3, mealSplit: null, deficiencies: [], extraDeficiencies: [], allergies: []});
    setMacros(null); setAllMeals([]); setMealIdx(0); setSelectedMeals([]);
    setTab("plan");
  };

  const handleGoalNext = () => setPlanStage("diet");
  const handleDietBack = () => setPlanStage("goal");

  const handleDietNext = () => {
    // Build macros and all meal configs
    const age = profile?.dob ? Math.floor((Date.now() - new Date(profile.dob)) / 31557600000) : (profile?.age || 25);
    const form = {
      gender: profile?.gender || "Male",
      age,
      dob: profile?.dob,
      heightCm: profile?.heightCm || 170,
      weightKg: profile?.weightKg || 70,
      bodyType: profile?.bodyType || "Mesomorph",
      activity: profile?.activity || "Moderately Active",
      goal: planGoalData.goal,
      dietType: planDietData.dietType,
      meals: planDietData.meals,
      mealSplit: planDietData.mealSplit,
      allergies: planDietData.allergies || [],
      deficiencies: profile?.bloodAnalysis
        ? [...(profile.bloodAnalysis.deficiencies || []), ...(planDietData.extraDeficiencies || [])]
        : (planDietData.deficiencies || []),
    };
    const m = deriveMacros(form);
    const meals = Array.from({length: form.meals}, (_, i) => buildMealOptions(i, form, m));
    setMacros(m);
    setAllMeals(meals);
    setMealIdx(0);
    setSelectedMeals([]);
    setPlanStage("meals");
  };

  const handleMealSelect = (option) => {
    const next = mealIdx + 1;
    const updated = [...selectedMeals.slice(0, mealIdx), {mealIdx, option}];
    setSelectedMeals(updated);
    if (next >= allMeals.length) {
      setPlanStage("summary");
    } else {
      setMealIdx(next);
    }
  };

  const handleMealBack = () => {
    if (mealIdx === 0) { setPlanStage("diet"); }
    else { setMealIdx(mealIdx - 1); setSelectedMeals(sm => sm.slice(0, mealIdx - 1)); }
  };

  const handleEditMeal = (idx) => {
    setMealIdx(idx);
    setSelectedMeals(sm => sm.slice(0, idx));
    setPlanStage("meals");
  };

  const planForm = {
    gender: profile?.gender || "Male",
    age: profile?.dob ? Math.floor((Date.now() - new Date(profile.dob)) / 31557600000) : 25,
    dob: profile?.dob,
    heightCm: profile?.heightCm,
    weightKg: profile?.weightKg,
    bodyType: profile?.bodyType,
    activity: profile?.activity,
    goal: planGoalData.goal,
    dietType: planDietData.dietType,
    meals: planDietData.meals,
    mealSplit: planDietData.mealSplit,
  };

  if (!authUser) return (
    <><style>{FONTS}{CSS}</style><div className="mesh"><div className="ga"/><div className="gb"/></div><OTPLogin onLogin={handleLogin}/></>
  );

  if (!profileSetupDone || editingProfile) return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="mesh"><div className="ga"/><div className="gb"/></div>
      <header className="hdr"><div className="hdr-in"><div className="logo">NutriMatch</div><button onClick={logout} style={{background:"none",border:"none",color:"var(--mu)",fontSize:10,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Log out</button></div></header>
      <ProfileSetup phone={authUser.phone} existing={profile} onComplete={handleProfileComplete}/>
    </>
  );

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="mesh"><div className="ga"/><div className="gb"/></div>

      <header className="hdr">
        <div className="hdr-in">
          <div className="logo">NutriMatch</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {tab === "profile" && <button onClick={logout} style={{background:"none",border:"none",color:"var(--mu)",fontSize:10,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Log out</button>}
            <button className="avi" onClick={()=>{setTab("profile");setEditingProfile(false);}}>{initials}</button>
          </div>
        </div>
      </header>

      {/* HOME */}
      {tab === "home" && <HomeScreen profile={profile} onStartPlan={startPlan}/>}

      {/* PLAN */}
      {tab === "plan" && (
        <>
          {planStage === "goal" && <GoalStep data={planGoalData} setData={setPlanGoalData} profile={profile} onNext={handleGoalNext}/>}
          {planStage === "diet" && <DietStep data={planDietData} setData={setPlanDietData} profile={profile} onNext={handleDietNext} onBack={handleDietBack}/>}
          {planStage === "meals" && allMeals[mealIdx] && (
            <MealSelectPage
              mealIdx={mealIdx}
              mealData={allMeals[mealIdx]}
              gender={profile?.gender || "Male"}
              totalMeals={allMeals.length}
              selectedSoFar={selectedMeals}
              onSelect={handleMealSelect}
              onBack={handleMealBack}
            />
          )}
          {planStage === "summary" && macros && (
            <SummaryPage
              form={planForm}
              macros={macros}
              allMeals={allMeals}
              selectedMeals={selectedMeals}
              gender={profile?.gender || "Male"}
              onEdit={handleEditMeal}
            />
          )}
        </>
      )}

      {/* PROFILE */}
      {tab === "profile" && !editingProfile && (
        <ProfileScreen
          profile={profile}
          onEdit={() => setEditingProfile(true)}
          onStartPlan={() => { startPlan(); setTab("plan"); }}
        />
      )}
      {tab === "profile" && editingProfile && (
        <ProfileSetup phone={authUser.phone} existing={profile} onComplete={handleProfileComplete}/>
      )}

      {/* BOTTOM NAV */}
      <nav className="bnav">
        <div className="bnav-in">
          {[{id:"home",icon:"🏠",label:"Home"},{id:"plan",icon:"⚡",label:"Plan"},{id:"profile",icon:"👤",label:"Profile"}].map(n => (
            <button key={n.id} className={`bni ${tab===n.id?"active":""}`} onClick={()=>{setTab(n.id);setEditingProfile(false);if(n.id==="plan")startPlan();}}>
              <span className="bni-i">{n.icon}</span>
              <span className="bni-l">{n.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
