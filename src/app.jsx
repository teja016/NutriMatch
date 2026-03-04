import { useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────────────────────
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
`;

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:   #F5F0E8;
  --parchment: #EDE7DA;
  --white:   #FFFFFF;
  --forest:  #1A4731;
  --fmid:    #2D6A4F;
  --flight:  #52B788;
  --gold:    #C8861A;
  --amber:   #E8912A;
  --coral:   #D95433;
  --sky:     #3A8FBF;
  --plum:    #7B5EA7;
  --text:    #1C1916;
  --muted:   #7A7068;
  --light:   #A89F94;
  --border:  #DED8CE;
  --shadow1: 0 2px 12px rgba(26,71,49,0.07);
  --shadow2: 0 8px 32px rgba(26,71,49,0.1);
  --shadow3: 0 20px 60px rgba(26,71,49,0.13);
}

html { scroll-behavior: smooth; }
body {
  background: var(--cream);
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--flight); color: #fff; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--parchment); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

/* ── LAYOUT ── */
.app { min-height: 100vh; }

/* ── HEADER ── */
.site-header {
  background: var(--forest);
  padding: 0 40px;
  position: sticky; top: 0; z-index: 100;
  box-shadow: 0 2px 20px rgba(0,0,0,0.2);
}
.site-header-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}
.logo {
  font-family: 'Fraunces', serif;
  font-size: 22px; font-weight: 900;
  color: #fff; letter-spacing: -0.5px;
}
.logo span { color: var(--flight); }
.header-tag {
  font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  color: rgba(255,255,255,0.4); font-weight: 500;
}

/* ── STEPPER ── */
.stepper {
  display: flex; align-items: center; justify-content: center;
  gap: 0; padding: 28px 20px 0;
}
.step-item {
  display: flex; align-items: center; gap: 0;
}
.step-bubble {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  transition: all 0.3s ease;
  position: relative; z-index: 1;
}
.step-bubble.done   { background: var(--fmid); color: #fff; }
.step-bubble.active { background: var(--forest); color: #fff; box-shadow: 0 0 0 4px rgba(26,71,49,0.15); }
.step-bubble.todo   { background: var(--white); color: var(--light); border: 2px solid var(--border); }
.step-label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
  margin-top: 6px; text-align: center;
  transition: color 0.3s;
}
.step-label.active { color: var(--forest); }
.step-label.done   { color: var(--fmid); }
.step-label.todo   { color: var(--light); }
.step-wrap { display: flex; flex-direction: column; align-items: center; gap: 0; }
.step-line {
  width: 80px; height: 2px; margin: 0 4px;
  transition: background 0.3s;
  margin-bottom: 24px;
}
.step-line.done   { background: var(--fmid); }
.step-line.todo   { background: var(--border); }

/* ── STEP CONTAINER ── */
.step-container {
  max-width: 780px; margin: 32px auto 60px;
  padding: 0 24px;
  animation: fadeUp 0.4s ease both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.step-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 900; line-height: 1.1; letter-spacing: -1px;
  color: var(--forest); margin-bottom: 8px;
}
.step-title em { font-style: italic; color: var(--fmid); }
.step-subtitle {
  font-size: 14px; color: var(--muted); margin-bottom: 36px; line-height: 1.6;
}

/* ── CARDS ── */
.card {
  background: var(--white); border-radius: 20px;
  padding: 32px; box-shadow: var(--shadow1);
  border: 1px solid var(--border);
  margin-bottom: 20px;
}
.card-label {
  font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--fmid);
  margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
}
.card-label::after { content:''; flex:1; height:1px; background: var(--border); }

/* ── INPUTS ── */
.input-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.input-grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.input-full  { grid-column: 1 / -1; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field label {
  font-size: 11px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: var(--muted);
}
.field input, .field select {
  background: var(--cream); border: 1.5px solid var(--border);
  border-radius: 10px; padding: 12px 14px;
  color: var(--text); font-size: 15px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  outline: none; transition: border-color 0.15s, box-shadow 0.15s;
  width: 100%;
}
.field input:focus, .field select:focus {
  border-color: var(--fmid);
  box-shadow: 0 0 0 3px rgba(45,106,79,0.1);
  background: #fff;
}
.field input::placeholder { color: var(--light); }
select option { background: #fff; }

/* ── UNIT TOGGLE ── */
.unit-row { display: flex; gap: 12px; align-items: flex-end; }
.unit-row .field { flex: 1; }
.unit-tog {
  display: flex; border: 1.5px solid var(--border); border-radius: 8px;
  overflow: hidden; height: 46px; flex-shrink: 0;
}
.unit-btn {
  padding: 0 14px; font-size: 12px; font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer; transition: all 0.15s;
  background: var(--cream); color: var(--muted); border: none;
}
.unit-btn.on { background: var(--forest); color: #fff; }

/* ── BIG TOGGLE (gender etc.) ── */
.big-toggle { display: flex; gap: 10px; }
.big-btn {
  flex: 1; padding: 16px 12px;
  border-radius: 12px; border: 2px solid var(--border);
  background: var(--cream); cursor: pointer;
  transition: all 0.18s; text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.big-btn:hover { border-color: var(--fmid); background: rgba(45,106,79,0.05); }
.big-btn.on {
  border-color: var(--fmid);
  background: rgba(45,106,79,0.08);
  box-shadow: 0 0 0 3px rgba(45,106,79,0.1);
}
.big-btn .bb-icon { font-size: 24px; margin-bottom: 6px; display: block; }
.big-btn .bb-label { font-size: 13px; font-weight: 700; color: var(--text); }
.big-btn .bb-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
.big-btn.on .bb-label { color: var(--forest); }

/* ── BODY TYPE CARDS ── */
.body-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.body-card {
  padding: 16px; border-radius: 12px; border: 2px solid var(--border);
  background: var(--cream); cursor: pointer; transition: all 0.18s; text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.body-card:hover { border-color: var(--fmid); }
.body-card.on { border-color: var(--forest); background: rgba(26,71,49,0.06); }
.bc-icon { font-size: 32px; margin-bottom: 8px; display: block; }
.bc-name { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.bc-desc { font-size: 10px; color: var(--muted); line-height: 1.5; }
.body-card.on .bc-name { color: var(--forest); }

/* ── ACTIVITY SELECTOR ── */
.activity-list { display: flex; flex-direction: column; gap: 8px; }
.act-opt {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px; border-radius: 10px;
  border: 1.5px solid var(--border); background: var(--cream);
  cursor: pointer; transition: all 0.15s;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.act-opt:hover { border-color: var(--fmid); background: rgba(45,106,79,0.04); }
.act-opt.on { border-color: var(--fmid); background: rgba(45,106,79,0.07); }
.act-radio {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid var(--border); flex-shrink: 0;
  transition: all 0.15s; background: #fff;
  display: flex; align-items: center; justify-content: center;
}
.act-opt.on .act-radio { border-color: var(--fmid); background: var(--fmid); }
.act-opt.on .act-radio::after { content:''; width: 6px; height: 6px; background:#fff; border-radius:50%; }
.act-name { font-size: 13px; font-weight: 700; color: var(--text); }
.act-desc { font-size: 11px; color: var(--muted); }
.act-mult { margin-left: auto; font-size: 12px; font-weight: 700; color: var(--fmid); }

/* ── BMI PREVIEW ── */
.bmi-preview {
  background: linear-gradient(135deg, var(--forest), var(--fmid));
  border-radius: 16px; padding: 24px; color: #fff;
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;
}
.bp-item { text-align: center; }
.bp-val {
  font-family: 'Fraunces', serif;
  font-size: 28px; font-weight: 900; color: #fff;
  margin-bottom: 4px;
}
.bp-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.7; }
.bp-tag {
  display: inline-block; margin-top: 6px;
  font-size: 10px; font-weight: 700; letter-spacing: 1px;
  padding: 3px 10px; border-radius: 20px;
  background: rgba(255,255,255,0.18); color: #fff;
}

/* ── GOAL GRID ── */
.goal-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.goal-card {
  padding: 16px 12px; border-radius: 12px; border: 2px solid var(--border);
  background: var(--cream); cursor: pointer; transition: all 0.18s; text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.goal-card:hover { border-color: var(--fmid); }
.goal-card.on { border-color: var(--forest); background: rgba(26,71,49,0.06); }
.gc-icon { font-size: 26px; margin-bottom: 7px; display: block; }
.gc-name { font-size: 12px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.gc-cal { font-size: 10px; color: var(--muted); }
.goal-card.on .gc-name { color: var(--forest); }

/* ── DIET TYPE ── */
.diet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.diet-opt {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--border);
  background: var(--cream); cursor: pointer; transition: all 0.15s;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.diet-opt:hover { border-color: var(--fmid); }
.diet-opt.on { border-color: var(--fmid); background: rgba(45,106,79,0.07); }
.do-icon { font-size: 20px; }
.do-label { font-size: 12px; font-weight: 700; color: var(--text); }
.diet-opt.on .do-label { color: var(--forest); }
.do-radio { margin-left: auto; width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--border); flex-shrink:0; background:#fff; }
.diet-opt.on .do-radio { border-color: var(--fmid); background: var(--fmid); }

/* ── MEALS TOGGLE ── */
.meals-row { display: flex; gap: 6px; }
.ml-btn {
  flex: 1; padding: 10px 6px; border-radius: 8px;
  border: 1.5px solid var(--border); background: var(--cream);
  cursor: pointer; font-size: 14px; font-weight: 700;
  font-family: 'Plus Jakarta Sans', sans-serif; color: var(--muted);
  text-align: center; transition: all 0.15s;
}
.ml-btn:hover { border-color: var(--fmid); color: var(--text); }
.ml-btn.on { border-color: var(--forest); background: rgba(26,71,49,0.07); color: var(--forest); }

/* ── CHIPS ── */
.chips-wrap { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  font-size: 11px; font-weight: 600; padding: 6px 13px; border-radius: 20px;
  border: 1.5px solid var(--border); background: var(--cream); color: var(--muted);
  cursor: pointer; transition: all 0.15s; user-select: none;
}
.chip:hover { border-color: var(--fmid); color: var(--text); }
.chip.on { background: var(--forest); border-color: var(--forest); color: #fff; }

/* ── NAV BUTTONS ── */
.nav-row { display: flex; gap: 12px; justify-content: flex-end; margin-top: 28px; }
.btn-back {
  padding: 14px 28px; border-radius: 10px;
  border: 1.5px solid var(--border); background: var(--white);
  color: var(--muted); font-size: 14px; font-weight: 700;
  font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all 0.15s;
}
.btn-back:hover { border-color: var(--fmid); color: var(--forest); }
.btn-next {
  padding: 14px 36px; border-radius: 10px; border: none;
  background: var(--forest); color: #fff;
  font-size: 14px; font-weight: 700;
  font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; gap: 8px;
}
.btn-next:hover { background: var(--fmid); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,71,49,0.3); }
.btn-next:active { transform: translateY(0); }
.btn-generate {
  padding: 16px 48px; border-radius: 12px; border: none;
  background: linear-gradient(135deg, var(--forest), var(--fmid));
  color: #fff; font-size: 15px; font-weight: 800;
  font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all 0.2s;
  letter-spacing: 0.5px; box-shadow: 0 8px 24px rgba(26,71,49,0.3);
  width: 100%; margin-top: 8px;
}
.btn-generate:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(26,71,49,0.35); }
.btn-regen {
  padding: 10px 24px; border-radius: 8px; border: 1.5px solid var(--border);
  background: var(--white); color: var(--muted); font-size: 12px; font-weight: 700;
  font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all 0.15s;
}
.btn-regen:hover { border-color: var(--forest); color: var(--forest); }

/* ── RESULTS PAGE ── */
.results-wrap { max-width: 1200px; margin: 32px auto 60px; padding: 0 24px; animation: fadeUp .4s ease; }

/* ── STATS BANNER ── */
.stats-banner {
  background: linear-gradient(135deg, var(--forest) 0%, var(--fmid) 100%);
  border-radius: 24px; padding: 32px 36px; margin-bottom: 28px;
  color: #fff; position: relative; overflow: hidden;
}
.stats-banner::before {
  content: '';
  position: absolute; top: -60px; right: -60px;
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
}
.stats-banner-title {
  font-family: 'Fraunces', serif;
  font-size: 14px; font-weight: 400; font-style: italic;
  opacity: 0.7; margin-bottom: 6px; letter-spacing: 0.5px;
}
.stats-banner-name {
  font-family: 'Fraunces', serif;
  font-size: clamp(24px,3vw,36px); font-weight: 900; margin-bottom: 28px; letter-spacing: -0.5px;
}
.stats-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 20px; }
@media(max-width:800px){ .stats-grid { grid-template-columns: repeat(3,1fr); } }
.stat-box { }
.stat-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.6; margin-bottom: 5px; }
.stat-val {
  font-family: 'Fraunces', serif; font-size: 26px; font-weight: 900;
  line-height: 1; color: #fff;
}
.stat-unit { font-size: 12px; opacity: 0.6; margin-left: 2px; }
.stat-badge {
  display: inline-block; margin-top: 5px; font-size: 10px; font-weight: 700;
  padding: 2px 9px; border-radius: 20px; background: rgba(255,255,255,0.15);
}

/* ── MACRO BLUEPRINT ── */
.macro-blueprint {
  background: var(--white); border-radius: 20px; padding: 28px 32px;
  margin-bottom: 28px; box-shadow: var(--shadow1); border: 1px solid var(--border);
}
.mb-title {
  font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700;
  color: var(--forest); margin-bottom: 22px; letter-spacing: -0.3px;
}
.macro-bars { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media(max-width:600px){ .macro-bars { grid-template-columns: 1fr; } }
.mb-item { }
.mb-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 7px; }
.mb-name { font-size: 12px; font-weight: 700; color: var(--text); }
.mb-nums { font-size: 12px; color: var(--muted); }
.mb-nums strong { color: var(--text); font-size: 16px; font-family: 'Fraunces', serif; font-weight: 700; }
.mb-track { height: 8px; background: var(--parchment); border-radius: 4px; overflow: hidden; }
.mb-fill { height: 100%; border-radius: 4px; transition: width .6s ease; }
.mb-sub { font-size: 10px; color: var(--light); margin-top: 5px; }

.macro-summary-row {
  display: flex; gap: 12px; margin-top: 22px; flex-wrap: wrap;
}
.ms-pill {
  flex: 1; min-width: 120px; padding: 12px 16px; border-radius: 10px;
  display: flex; flex-direction: column; gap: 2px;
}
.msp-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.7; }
.msp-val { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 900; }
.msp-unit { font-size: 11px; opacity: 0.6; }

/* ── DEFICIENCY NOTICE ── */
.def-notice {
  background: rgba(200,134,26,0.08); border: 1.5px solid rgba(200,134,26,0.25);
  border-radius: 12px; padding: 14px 18px; margin-bottom: 24px;
  font-size: 12.5px; color: var(--gold); line-height: 1.6;
}
.def-notice strong { display: block; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; opacity: 0.8; }

/* ── MEAL SECTION ── */
.meal-section { margin-bottom: 40px; }
.meal-header {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 8px;
}
.meal-num-badge {
  width: 40px; height: 40px; border-radius: 12px;
  background: var(--forest); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces', serif; font-size: 16px; font-weight: 900;
  flex-shrink: 0;
}
.meal-info-col { flex: 1; }
.meal-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: var(--forest); }
.meal-meta { font-size: 11px; color: var(--muted); margin-top: 2px; }
.meal-time-chip {
  font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--fmid); background: rgba(45,106,79,0.1);
  border: 1px solid rgba(45,106,79,0.2); border-radius: 6px; padding: 4px 12px;
}

/* SHARED MACRO ROW */
.shared-macro-row {
  background: var(--forest); border-radius: 10px;
  padding: 14px 20px; margin-bottom: 14px;
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
}
.smr-label {
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: rgba(255,255,255,0.55); margin-right: 4px;
}
.smr-pill {
  padding: 4px 12px; border-radius: 20px;
  font-size: 12px; font-weight: 700; color: #fff;
}

/* ── OPTIONS GRID ── */
.options-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
@media(max-width:1000px){ .options-grid { grid-template-columns: 1fr 1fr; } }
@media(max-width:640px)  { .options-grid { grid-template-columns: 1fr; } }

/* ── OPTION CARD ── */
.opt-card {
  background: var(--white); border-radius: 16px;
  border: 2px solid var(--border); padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  position: relative; overflow: hidden;
}
.opt-card:hover { transform: translateY(-3px); box-shadow: var(--shadow2); }
.opt-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
}
.opt-card.oa { border-color: rgba(26,71,49,0.2); }
.opt-card.ob { border-color: rgba(218,145,42,0.25); }
.opt-card.oc { border-color: rgba(58,143,191,0.25); }
.opt-card.oa::before { background: linear-gradient(90deg, #1A4731, #2D6A4F); }
.opt-card.ob::before { background: linear-gradient(90deg, #D4A017, #E8912A); }
.opt-card.oc::before { background: linear-gradient(90deg, #3A8FBF, #52B4E8); }
.opt-card.oa:hover { border-color: var(--fmid); }
.opt-card.ob:hover { border-color: var(--gold); }
.opt-card.oc:hover { border-color: var(--sky); }

.opt-badge {
  font-size: 9px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
  border-radius: 4px; padding: 3px 8px; margin-bottom: 10px; display: inline-block;
}
.oa .opt-badge { color: var(--forest); background: rgba(26,71,49,0.08); }
.ob .opt-badge { color: var(--gold); background: rgba(200,134,26,0.08); }
.oc .opt-badge { color: var(--sky); background: rgba(58,143,191,0.08); }

.opt-emoji { font-size: 32px; margin-bottom: 8
