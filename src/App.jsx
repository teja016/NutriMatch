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

.opt-emoji { font-size: 32px; margin-bottom: 8px; display: block; }
.opt-name {
  font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700;
  color: var(--text); line-height: 1.3; margin-bottom: 14px;
}

/* INGREDIENT TAGS */
.ing-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
.ing-tag {
  font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 20px;
  background: var(--parchment); color: var(--muted); border: 1px solid var(--border);
}

/* DEF TAGS */
.def-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
.def-tag {
  font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  padding: 2px 8px; border-radius: 4px;
  background: rgba(200,134,26,0.08); color: var(--gold); border: 1px solid rgba(200,134,26,0.18);
}

/* EXPAND */
.expand-btn {
  font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
  color: var(--fmid); background: none; border: none;
  font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; padding: 0;
  display: flex; align-items: center; gap: 5px; transition: color 0.15s;
}
.expand-btn:hover { color: var(--forest); }
.opt-expanded { margin-top: 14px; padding-top: 14px; border-top: 1.5px solid var(--parchment); }
.exp-sec-label {
  font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  color: var(--light); margin-bottom: 8px;
}
.ing-list { list-style: none; }
.ing-list li {
  font-size: 11.5px; color: var(--muted); padding: 4px 0;
  border-bottom: 1px solid var(--parchment);
  display: flex; align-items: center; gap: 8px;
}
.ing-list li:last-child { border-bottom: none; }
.ing-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--flight); flex-shrink: 0; }
.prep-list { list-style: none; counter-reset: steps; }
.prep-list li {
  font-size: 11.5px; color: var(--muted); padding: 5px 0 5px 28px;
  position: relative; counter-increment: steps; line-height: 1.55;
  border-bottom: 1px solid var(--parchment);
}
.prep-list li:last-child { border-bottom: none; }
.prep-list li::before {
  content: counter(steps); position: absolute; left: 0; top: 5px;
  width: 18px; height: 18px; border-radius: 4px;
  background: var(--forest); color: #fff;
  font-size: 9px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}

/* ── DAY SUMMARY ── */
.day-summary {
  background: linear-gradient(135deg, rgba(26,71,49,0.06), rgba(45,106,79,0.03));
  border: 2px solid rgba(26,71,49,0.12); border-radius: 20px;
  padding: 24px 28px; margin-top: 8px;
}
.ds-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--forest); margin-bottom: 16px; }
.ds-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; }
@media(max-width:600px){ .ds-grid { grid-template-columns: repeat(3,1fr); } }
.ds-item .dsi-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--light); margin-bottom: 4px; }
.ds-item .dsi-val { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 900; }
.ds-item .dsi-unit { font-size: 10px; color: var(--muted); margin-left: 2px; }

/* ── LOADING ── */
.loading-state {
  min-height: 60vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 20px;
}
.spin { width: 48px; height: 48px; border: 3px solid var(--border); border-top-color: var(--fmid); border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.loading-state p { font-size: 13px; color: var(--muted); }

/* ── MICRONUTRIENT TABLE ── */
.micro-table { margin-top: 12px; }
.micro-row { display: flex; align-items: center; gap: 10px; padding: 5px 0; border-bottom: 1px solid var(--parchment); }
.micro-row:last-child { border-bottom: none; }
.micro-name { font-size: 11px; color: var(--muted); width: 100px; }
.micro-bar { flex: 1; height: 4px; background: var(--parchment); border-radius: 2px; overflow: hidden; }
.micro-fill { height: 100%; border-radius: 2px; background: var(--flight); }
.micro-val { font-size: 11px; font-weight: 700; color: var(--text); width: 60px; text-align: right; }

@media(max-width:700px){
  .bmi-preview { grid-template-columns: 1fr 1fr; }
  .goal-grid { grid-template-columns: 1fr 1fr; }
  .body-grid { grid-template-columns: 1fr; }
  .diet-grid { grid-template-columns: 1fr; }
}
`;

// ─────────────────────────────────────────────────────────────
// FOOD DATABASE — USDA FoodData Central
// ─────────────────────────────────────────────────────────────
const FOODS = [
  { id:"chicken_breast", name:"Chicken Breast", emoji:"🍗", per100g:{cal:165,pro:31,carb:0,fat:3.6,fib:0}, micros:{vitamin_b12:0.3,zinc:1.0,magnesium:29,iron:1.0}, role:"protein", tags:["non-veg","chicken"], allergens:[] },
  { id:"salmon",         name:"Atlantic Salmon", emoji:"🐟", per100g:{cal:208,pro:20,carb:0,fat:13,fib:0}, micros:{vitamin_d:11,vitamin_b12:3.2,omega3:2.3,magnesium:27}, role:"protein", tags:["non-veg","fish"], allergens:["fish"] },
  { id:"tuna_canned",    name:"Canned Tuna",    emoji:"🐡", per100g:{cal:116,pro:25.5,carb:0,fat:1.0,fib:0}, micros:{vitamin_d:4,vitamin_b12:2.5,omega3:0.3,iron:1.3}, role:"protein", tags:["non-veg","fish"], allergens:["fish"] },
  { id:"tilapia",        name:"Tilapia",         emoji:"🐠", per100g:{cal:96,pro:20,carb:0,fat:1.7,fib:0}, micros:{vitamin_b12:1.6,vitamin_d:1.7,zinc:0.4}, role:"protein", tags:["non-veg","fish"], allergens:["fish"] },
  { id:"eggs",           name:"Whole Eggs",      emoji:"🥚", per100g:{cal:155,pro:13,carb:1.1,fat:11,fib:0}, micros:{vitamin_d:2.0,vitamin_b12:1.1,folate:47,zinc:1.3,iron:1.8}, role:"protein", tags:["vegetarian"], allergens:["eggs"] },
  { id:"tofu_firm",      name:"Firm Tofu",       emoji:"🧊", per100g:{cal:76,pro:8.1,carb:1.9,fat:4.2,fib:0.3}, micros:{calcium:350,iron:2.7,magnesium:30,zinc:0.8}, role:"protein", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:["soy"] },
  { id:"tempeh",         name:"Tempeh",          emoji:"🫒", per100g:{cal:193,pro:19,carb:9.4,fat:11,fib:0}, micros:{iron:2.7,magnesium:81,calcium:111,zinc:1.7}, role:"protein", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:["soy"] },
  { id:"lentils",        name:"Red Lentils",     emoji:"🫘", per100g:{cal:116,pro:9,carb:20,fat:0.4,fib:7.9}, micros:{folate:181,iron:3.3,magnesium:36,zinc:1.3}, role:"protein", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"chickpeas",      name:"Chickpeas",       emoji:"🫘", per100g:{cal:164,pro:9,carb:27,fat:2.6,fib:7.6}, micros:{folate:172,iron:2.9,magnesium:48,zinc:1.5,calcium:49}, role:"protein", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"greek_yogurt",   name:"Greek Yogurt",    emoji:"🥛", per100g:{cal:59,pro:10,carb:3.6,fat:0.4,fib:0}, micros:{calcium:110,vitamin_b12:0.75,zinc:0.5}, role:"protein", tags:["vegetarian"], allergens:["dairy"] },
  { id:"cottage_cheese", name:"Cottage Cheese",  emoji:"🧀", per100g:{cal:98,pro:11,carb:3.4,fat:4.3,fib:0}, micros:{calcium:83,vitamin_b12:0.43}, role:"protein", tags:["vegetarian"], allergens:["dairy"] },
  { id:"brown_rice",     name:"Brown Rice",      emoji:"🍚", per100g:{cal:112,pro:2.3,carb:24,fat:0.8,fib:1.6}, micros:{magnesium:43,zinc:0.6,iron:0.5,folate:4}, role:"carb", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"quinoa",         name:"Quinoa",          emoji:"🌾", per100g:{cal:120,pro:4.4,carb:21,fat:1.9,fib:2.8}, micros:{magnesium:64,iron:1.5,zinc:1.1,folate:42}, role:"carb", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"sweet_potato",   name:"Sweet Potato",    emoji:"🍠", per100g:{cal:86,pro:1.6,carb:20,fat:0.1,fib:3.0}, micros:{vitamin_c:19,magnesium:25,folate:6}, role:"carb", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"oats",           name:"Rolled Oats",     emoji:"🌾", per100g:{cal:371,pro:13,carb:67,fat:7,fib:10}, micros:{magnesium:138,iron:4.7,zinc:3.6,folate:56}, role:"carb", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:["gluten"] },
  { id:"whole_wheat_bread", name:"Whole Wheat Bread", emoji:"🍞", per100g:{cal:247,pro:9,carb:46,fat:3.4,fib:6}, micros:{iron:3.3,magnesium:76,zinc:1.8,folate:44}, role:"carb", tags:["vegetarian"], allergens:["gluten"] },
  { id:"banana",         name:"Banana",          emoji:"🍌", per100g:{cal:89,pro:1.1,carb:23,fat:0.3,fib:2.6}, micros:{magnesium:27,vitamin_c:8.7,folate:20}, role:"carb", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"pasta_ww",       name:"Whole Wheat Pasta", emoji:"🍝", per100g:{cal:124,pro:5.3,carb:26,fat:0.5,fib:3.9}, micros:{iron:1.4,magnesium:45,zinc:1.1,folate:12}, role:"carb", tags:["vegetarian"], allergens:["gluten"] },
  { id:"avocado",        name:"Avocado",          emoji:"🥑", per100g:{cal:160,pro:2,carb:9,fat:15,fib:6.7}, micros:{folate:81,magnesium:29,vitamin_c:10}, role:"fat", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"olive_oil",      name:"Olive Oil (EVOO)", emoji:"🫒", per100g:{cal:884,pro:0,carb:0,fat:100,fib:0}, micros:{omega3:0.7}, role:"fat", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"almonds",        name:"Almonds",          emoji:"🥜", per100g:{cal:579,pro:21,carb:22,fat:50,fib:12.5}, micros:{magnesium:270,calcium:264,zinc:3.1,iron:3.7}, role:"fat", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:["nuts"] },
  { id:"walnuts",        name:"Walnuts",          emoji:"🥜", per100g:{cal:654,pro:15,carb:14,fat:65,fib:6.7}, micros:{omega3:9.1,magnesium:158,folate:98,zinc:3.1}, role:"fat", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:["nuts"] },
  { id:"chia_seeds",     name:"Chia Seeds",       emoji:"🌱", per100g:{cal:486,pro:17,carb:42,fat:31,fib:34}, micros:{calcium:631,iron:7.7,magnesium:335,omega3:17.8,zinc:4.6}, role:"fat", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"spinach",        name:"Spinach",          emoji:"🥬", per100g:{cal:23,pro:2.9,carb:3.6,fat:0.4,fib:2.2}, micros:{iron:2.7,folate:194,calcium:99,magnesium:79,vitamin_c:28}, role:"veg", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"broccoli",       name:"Broccoli",         emoji:"🥦", per100g:{cal:34,pro:2.8,carb:7,fat:0.4,fib:2.6}, micros:{vitamin_c:89,folate:63,calcium:47,iron:0.7}, role:"veg", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"kale",           name:"Kale",             emoji:"🥬", per100g:{cal:35,pro:2.9,carb:4.4,fat:0.7,fib:4.1}, micros:{vitamin_c:93,calcium:150,iron:1.5,folate:141}, role:"veg", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"bell_pepper",    name:"Red Bell Pepper",  emoji:"🫑", per100g:{cal:31,pro:1,carb:6,fat:0.3,fib:2.1}, micros:{vitamin_c:128,folate:46,iron:0.4}, role:"veg", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"mushrooms",      name:"Shiitake Mushrooms", emoji:"🍄", per100g:{cal:56,pro:1.6,carb:14,fat:0.2,fib:2.0}, micros:{vitamin_d:1.7,zinc:1.3,iron:0.5}, role:"veg", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
  { id:"tomato",         name:"Tomato",            emoji:"🍅", per100g:{cal:18,pro:0.9,carb:3.9,fat:0.2,fib:1.2}, micros:{vitamin_c:14,folate:15,iron:0.3}, role:"veg", tags:["vegan","vegetarian","non-dairy-vegan"], allergens:[] },
];

// ─────────────────────────────────────────────────────────────
// COOK METHODS
// ─────────────────────────────────────────────────────────────
const COOK = {
  chicken_breast: ["Season with garlic, paprika, herbs, salt & pepper.","Grill or bake at 200°C for 22–26 min until 74°C internal. Rest 5 min, then slice."],
  salmon:         ["Season with lemon zest, dill, salt, pepper.","Bake skin-down at 200°C for 12–15 min until flesh flakes. Squeeze fresh lemon over."],
  tuna_canned:    ["Drain, flake with a fork.","Mix with lemon juice, cracked pepper, a pinch of salt. Ready to serve."],
  tilapia:        ["Season with garlic, thyme, lemon, salt.","Pan-fry 3–4 min per side until golden and cooked through (flesh is opaque)."],
  eggs:           ["Whisk eggs with a pinch of salt.","Scramble: medium heat, stir gently 2 min. Or poach: simmer water, 3–4 min."],
  tofu_firm:      ["Press tofu 10 min. Cube and toss with tamari, garlic, cornstarch.","Pan-fry in a little oil on medium-high, 3 min per side until crispy."],
  tempeh:         ["Slice thin. Marinate in tamari, maple syrup, garlic for 10 min.","Pan-fry until caramelized, 3–4 min per side."],
  lentils:        ["Rinse lentils. Simmer in 2× water with cumin, turmeric, coriander — 20 min.","Season with salt, lemon, fresh herbs."],
  chickpeas:      ["Drain & rinse (if canned). Toss with cumin, paprika, olive oil.","Roast at 200°C for 22–28 min, shaking halfway, until crispy."],
  greek_yogurt:   ["Use straight from fridge as a base.","Top with ingredients for a creamy protein-rich bowl."],
  cottage_cheese: ["Serve at room temperature.","Use as a creamy base or mix with savory/sweet toppings."],
  brown_rice:     ["Rinse. Cook 1:2 with water — bring to boil, simmer 28–32 min covered.","Fluff with fork, rest 5 min before serving."],
  quinoa:         ["Rinse well (removes bitter saponins). Cook 1:2 with water — boil then simmer 15 min.","Fluff and rest 5 min. Season with salt and lemon."],
  sweet_potato:   ["Scrub and cube. Toss with a little oil and seasoning.","Roast at 200°C for 25–30 min, or steam 15 min until fork-tender."],
  oats:           ["Bring 2× volume of water/milk to boil. Stir in oats.","Simmer 4–5 min, stirring, until thick and creamy. Season to taste."],
  whole_wheat_bread: ["Toast to golden brown.","Serve warm — great base for toppings."],
  banana:         ["Peel and slice fresh.","Use as a natural sweetener and carb source in bowls."],
  pasta_ww:       ["Cook in salted boiling water 8–10 min until al dente.","Drain, reserve ¼ cup pasta water for sauces."],
  avocado:        ["Halve, remove pit, scoop out flesh.","Slice or mash. Season with lemon, flaky salt."],
  olive_oil:      ["Use as cooking fat on medium heat, or drizzle raw for best flavor.","Extra virgin retains most nutrients when added to finished dishes."],
  almonds:        ["Dry-toast in a pan 2–3 min for extra flavor.","Roughly chop or use whole as a topping."],
  walnuts:        ["Break apart roughly by hand.","Use raw to preserve omega-3 content."],
  chia_seeds:     ["For pudding: mix 3 tbsp chia with 1 cup liquid, refrigerate overnight.","For crunch: sprinkle dry over any bowl."],
  spinach:        ["Rinse thoroughly.","Wilt in dry pan 1 min, or serve raw. Add at end to preserve nutrients."],
  broccoli:       ["Cut into florets.","Steam 4–5 min until bright green and tender-crisp. Or roast at 200°C for 18–20 min."],
  kale:           ["Remove stems, tear into pieces.","Massage with lemon juice and salt 1 min to soften, or sauté in oil 2–3 min."],
  bell_pepper:    ["Deseed and slice or dice.","Enjoy raw for max vitamin C, or roast at 200°C for 15–18 min."],
  mushrooms:      ["Wipe clean, slice.","Sauté in dry pan on high heat 4–5 min until golden. Season with thyme and garlic."],
  tomato:         ["Slice or halve.","Serve raw for freshness, or roast at 180°C for 20 min for depth."],
};

// ─────────────────────────────────────────────────────────────
// MEAL TEMPLATES — per diet type, 3 options each (protein/carb/fat/veg)
// These define which ingredients to use per option slot
// ─────────────────────────────────────────────────────────────
const TEMPLATES = {
  "Non-Veg (All)": {
    breakfast: [
      { label:"Salmon Plate",    protein:"salmon",         carb:"whole_wheat_bread", fat:"avocado",     veg:["spinach","tomato"] },
      { label:"Chicken Rice",    protein:"chicken_breast", carb:"oats",              fat:"almonds",     veg:["spinach"] },
      { label:"Tuna Bowl",       protein:"tuna_canned",    carb:"quinoa",            fat:"chia_seeds",  veg:["bell_pepper","tomato"] },
    ],
    main: [
      { label:"Chicken Power",   protein:"chicken_breast", carb:"brown_rice",        fat:"olive_oil",   veg:["broccoli","bell_pepper"] },
      { label:"Salmon Bowl",     protein:"salmon",         carb:"quinoa",            fat:"avocado",     veg:["spinach","kale"] },
      { label:"Tuna Plate",      protein:"tuna_canned",    carb:"sweet_potato",      fat:"chia_seeds",  veg:["spinach","tomato"] },
    ],
  },
  "Chicken & Fish Only": {
    breakfast: [
      { label:"Salmon Plate",    protein:"salmon",         carb:"whole_wheat_bread", fat:"avocado",     veg:["spinach","tomato"] },
      { label:"Tilapia Oats",    protein:"tilapia",        carb:"oats",              fat:"chia_seeds",  veg:["spinach","mushrooms"] },
      { label:"Tuna Quinoa",     protein:"tuna_canned",    carb:"quinoa",            fat:"olive_oil",   veg:["bell_pepper","tomato"] },
    ],
    main: [
      { label:"Chicken Bowl",    protein:"chicken_breast", carb:"brown_rice",        fat:"olive_oil",   veg:["broccoli","bell_pepper"] },
      { label:"Salmon Plate",    protein:"salmon",         carb:"quinoa",            fat:"avocado",     veg:["spinach","kale"] },
      { label:"Tilapia Plate",   protein:"tilapia",        carb:"sweet_potato",      fat:"chia_seeds",  veg:["broccoli","tomato"] },
    ],
  },
  "Vegetarian": {
    breakfast: [
      { label:"Egg Oat Bowl",    protein:"eggs",           carb:"oats",              fat:"almonds",     veg:["spinach"] },
      { label:"Yogurt Plate",    protein:"greek_yogurt",   carb:"banana",            fat:"walnuts",     veg:["spinach"] },
      { label:"Egg Toast",       protein:"eggs",           carb:"whole_wheat_bread", fat:"avocado",     veg:["tomato","bell_pepper"] },
    ],
    main: [
      { label:"Egg Rice Bowl",   protein:"eggs",           carb:"brown_rice",        fat:"olive_oil",   veg:["broccoli","spinach"] },
      { label:"Yogurt Quinoa",   protein:"greek_yogurt",   carb:"quinoa",            fat:"almonds",     veg:["kale","tomato"] },
      { label:"Cottage Plate",   protein:"cottage_cheese", carb:"sweet_potato",      fat:"walnuts",     veg:["broccoli","bell_pepper"] },
    ],
  },
  "Vegan": {
    breakfast: [
      { label:"Tofu Oat Bowl",   protein:"tofu_firm",      carb:"oats",              fat:"chia_seeds",  veg:["spinach"] },
      { label:"Tempeh Quinoa",   protein:"tempeh",         carb:"quinoa",            fat:"almonds",     veg:["kale"] },
      { label:"Lentil Plate",    protein:"lentils",        carb:"banana",            fat:"walnuts",     veg:["spinach"] },
    ],
    main: [
      { label:"Tofu Bowl",       protein:"tofu_firm",      carb:"brown_rice",        fat:"olive_oil",   veg:["broccoli","spinach"] },
      { label:"Tempeh Plate",    protein:"tempeh",         carb:"quinoa",            fat:"avocado",     veg:["kale","bell_pepper"] },
      { label:"Lentil Plate",    protein:"lentils",        carb:"sweet_potato",      fat:"chia_seeds",  veg:["spinach","tomato"] },
    ],
  },
  "Non-Dairy Vegan": {
    breakfast: [
      { label:"Tofu Oat Bowl",   protein:"tofu_firm",      carb:"oats",              fat:"chia_seeds",  veg:["spinach"] },
      { label:"Chickpea Plate",  protein:"chickpeas",      carb:"quinoa",            fat:"almonds",     veg:["kale","bell_pepper"] },
      { label:"Lentil Bowl",     protein:"lentils",        carb:"banana",            fat:"walnuts",     veg:["spinach"] },
    ],
    main: [
      { label:"Tofu Bowl",       protein:"tofu_firm",      carb:"brown_rice",        fat:"olive_oil",   veg:["broccoli","spinach"] },
      { label:"Tempeh Plate",    protein:"tempeh",         carb:"quinoa",            fat:"avocado",     veg:["kale","tomato"] },
      { label:"Chickpea Plate",  protein:"chickpeas",      carb:"sweet_potato",      fat:"chia_seeds",  veg:["spinach","bell_pepper"] },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// DEFICIENCY → FOODS MAP
// ─────────────────────────────────────────────────────────────
const DEF_FOODS = {
  "Vitamin D":   ["salmon","tuna_canned","tilapia","eggs","mushrooms"],
  "Vitamin B12": ["salmon","tuna_canned","tilapia","chicken_breast","eggs","greek_yogurt","cottage_cheese"],
  "Vitamin C":   ["bell_pepper","broccoli","kale","tomato","spinach"],
  "Iron":        ["spinach","lentils","chickpeas","tempeh","oats","chia_seeds","kale","tofu_firm"],
  "Calcium":     ["kale","almonds","tofu_firm","greek_yogurt","chia_seeds","tempeh","cottage_cheese"],
  "Zinc":        ["chicken_breast","oats","almonds","tempeh","lentils","quinoa","chia_seeds"],
  "Magnesium":   ["spinach","quinoa","almonds","chia_seeds","oats","avocado","walnuts","tempeh"],
  "Folate":      ["spinach","lentils","chickpeas","avocado","broccoli","kale","oats","quinoa"],
  "Omega-3":     ["salmon","walnuts","chia_seeds","tuna_canned"],
};

// ─────────────────────────────────────────────────────────────
// CALCULATION ENGINE
// ─────────────────────────────────────────────────────────────
function calcBMR(gender, kg, cm, age) {
  const base = 10*kg + 6.25*cm - 5*age;
  return gender === "Male" ? base + 5 : base - 161;
}

function calcBMI(kg, cm) {
  const hm = cm / 100;
  return +(kg / (hm * hm)).toFixed(1);
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label:"Underweight", color:"#3A8FBF" };
  if (bmi < 25)   return { label:"Normal",      color:"#2D6A4F" };
  if (bmi < 30)   return { label:"Overweight",  color:"#E8912A" };
  if (bmi < 35)   return { label:"Obese I",     color:"#D95433" };
  return                  { label:"Obese II+",  color:"#B91C1C" };
}

function calcIdealWeight(gender, cm) {
  const hInch = cm / 2.54;
  const base = gender === "Male" ? 50 : 45.5;
  const ideal = base + 2.3 * (hInch - 60);
  return { min: Math.round(ideal * 0.9), max: Math.round(ideal * 1.1), target: Math.round(ideal) };
}

const ACTIVITY = {
  "Sedentary":          { mult: 1.2,   label:"Desk job, no exercise" },
  "Lightly Active":     { mult: 1.375, label:"Light exercise 1–3×/week" },
  "Moderately Active":  { mult: 1.55,  label:"Exercise 3–5×/week" },
  "Very Active":        { mult: 1.725, label:"Hard exercise 6–7×/week" },
  "Extra Active":       { mult: 1.9,   label:"Athlete / physical job" },
};

const GOALS = {
  "Lose Fat":              { adj:-400, splits:{pro:0.35,carb:0.33,fat:0.32}, label:"-400 kcal/day" },
  "Gentle Cut":            { adj:-200, splits:{pro:0.32,carb:0.38,fat:0.30}, label:"-200 kcal/day" },
  "Maintain Weight":       { adj:0,    splits:{pro:0.25,carb:0.45,fat:0.30}, label:"Maintenance" },
  "Build Muscle":          { adj:+300, splits:{pro:0.30,carb:0.45,fat:0.25}, label:"+300 kcal/day" },
  "Athletic Performance":  { adj:+200, splits:{pro:0.25,carb:0.50,fat:0.25}, label:"+200 kcal/day" },
  "Body Recomposition":    { adj:+50,  splits:{pro:0.35,carb:0.38,fat:0.27}, label:"Slight surplus" },
};

const BODY_TYPE_ADJ = {
  "Ectomorph":  { calAdj:+150, carbBias:+0.05 },
  "Mesomorph":  { calAdj:0,    carbBias:0      },
  "Endomorph":  { calAdj:-100, carbBias:-0.05  },
};

function deriveMacros(form) {
  const { gender, weightKg, heightCm, age, activity, goal, bodyType } = form;
  const bmr  = Math.round(calcBMR(gender, weightKg, heightCm, age));
  const tdee = Math.round(bmr * (ACTIVITY[activity]?.mult || 1.55));
  const gAdj = GOALS[goal]?.adj || 0;
  const bAdj = (BODY_TYPE_ADJ[bodyType]?.calAdj || 0);
  const targetCal = Math.max(1200, tdee + gAdj + bAdj);
  const splits = GOALS[goal]?.splits || GOALS["Maintain Weight"].splits;
  const carbBias = BODY_TYPE_ADJ[bodyType]?.carbBias || 0;
  const proP  = splits.pro;
  const carbP = Math.max(0.20, splits.carb + carbBias);
  const fatP  = Math.max(0.15, splits.fat  - carbBias);
  return {
    calories: targetCal,
    protein:  Math.round((targetCal * proP)  / 4),
    carbs:    Math.round((targetCal * carbP) / 4),
    fats:     Math.round((targetCal * fatP)  / 9),
    fiber:    Math.round(targetCal / 1000 * 14),
    bmr, tdee,
    bmi:          calcBMI(weightKg, heightCm),
    bmiCat:       bmiCategory(calcBMI(weightKg, heightCm)),
    idealWeight:  calcIdealWeight(gender, heightCm),
    proP: Math.round(proP*100),
    carbP: Math.round(carbP*100),
    fatP: Math.round(fatP*100),
  };
}

// ─────────────────────────────────────────────────────────────
// MACRO SOLVER — same targets, different ingredients
// ─────────────────────────────────────────────────────────────
function getFood(id) { return FOODS.find(f => f.id === id); }

function solveMealOption(template, targets) {
  const pF = getFood(template.protein);
  const cF = getFood(template.carb);
  const fF = getFood(template.fat);
  const VEG_G = 50;

  // Start with targets
  let rem = { cal: targets.calories, pro: targets.protein, carb: targets.carbs, fat: targets.fats };

  // Deduct fixed veg portions
  for (const vId of template.veg) {
    const v = getFood(vId);
    if (!v) continue;
    const r = VEG_G / 100;
    rem.cal  -= v.per100g.cal  * r;
    rem.pro  -= v.per100g.pro  * r;
    rem.carb -= v.per100g.carb * r;
    rem.fat  -= v.per100g.fat  * r;
  }
  const clamp = (n) => Math.max(0, n);
  rem = { cal: clamp(rem.cal), pro: clamp(rem.pro), carb: clamp(rem.carb), fat: clamp(rem.fat) };

  // Solve protein source: primarily fills protein target
  const pPro = Math.max(pF.per100g.pro, 0.5);
  const pGrams = Math.round((rem.pro * 100) / pPro);
  rem.cal  -= pF.per100g.cal  * pGrams / 100;
  rem.carb -= pF.per100g.carb * pGrams / 100;
  rem.fat  -= pF.per100g.fat  * pGrams / 100;
  rem = { cal: clamp(rem.cal), pro: clamp(rem.pro), carb: clamp(rem.carb), fat: clamp(rem.fat) };

  // Solve carb source: primarily fills carb target
  const cCarb = Math.max(cF.per100g.carb, 0.5);
  const cGrams = Math.round((rem.carb * 100) / cCarb);
  rem.cal -= cF.per100g.cal  * cGrams / 100;
  rem.fat -= cF.per100g.fat  * cGrams / 100;
  rem = { cal: clamp(rem.cal), fat: clamp(rem.fat), carb: clamp(rem.carb), pro: clamp(rem.pro) };

  // Solve fat source: primarily fills fat target
  const fFat = Math.max(fF.per100g.fat, 0.5);
  const fGrams = Math.round((rem.fat * 100) / fFat);

  return {
    ingredients: [
      { foodId: template.protein,  grams: Math.max(30, pGrams) },
      { foodId: template.carb,     grams: Math.max(20, cGrams) },
      { foodId: template.fat,      grams: Math.max(5,  fGrams) },
      ...template.veg.map(id => ({ foodId: id, grams: VEG_G })),
    ],
    label: template.label,
  };
}

function calcActualNutrition(ingredients) {
  const t = { calories:0, protein:0, carbs:0, fats:0, fiber:0 };
  const micros = {};
  for (const ing of ingredients) {
    const f = getFood(ing.foodId);
    if (!f) continue;
    const r = ing.grams / 100;
    t.calories += f.per100g.cal  * r;
    t.protein  += f.per100g.pro  * r;
    t.carbs    += f.per100g.carb * r;
    t.fats     += f.per100g.fat  * r;
    t.fiber    += f.per100g.fib  * r;
    for (const [k, v] of Object.entries(f.micros || {})) micros[k] = (micros[k]||0) + v*r;
  }
  return {
    calories: Math.round(t.calories), protein: Math.round(t.protein),
    carbs:    Math.round(t.carbs),    fats:    Math.round(t.fats),
    fiber:    Math.round(t.fiber),    micros,
  };
}

// ─────────────────────────────────────────────────────────────
// PLAN GENERATOR
// ─────────────────────────────────────────────────────────────
const MEAL_WEIGHTS = {
  1:[1.0], 2:[0.45,0.55], 3:[0.30,0.40,0.30],
  4:[0.25,0.30,0.30,0.15], 5:[0.20,0.15,0.30,0.15,0.20],
  6:[0.15,0.15,0.25,0.15,0.15,0.15],
};
const MEAL_TIMES = {
  1:["combined"], 2:["breakfast","main"], 3:["breakfast","main","main"],
  4:["breakfast","main","main","main"], 5:["breakfast","main","main","main","main"],
  6:["breakfast","main","main","main","main","main"],
};
const MEAL_LABELS = {
  1:["Full Day Meal"], 2:["Breakfast","Dinner"],
  3:["Breakfast","Lunch","Dinner"], 4:["Breakfast","Lunch","Afternoon","Dinner"],
  5:["Breakfast","Mid-Morning","Lunch","Evening","Dinner"],
  6:["Breakfast","Mid-Morning","Lunch","Afternoon","Evening","Dinner"],
};
const MEAL_EMOJIS = ["🌅","☀️","🌤️","🌆","🌙","⭐"];

function generatePlan(form, macros) {
  const { dietType, deficiencies, allergies, meals } = form;
  const allergySet = new Set((allergies||[]).map(a => a.toLowerCase()));
  const weights = MEAL_WEIGHTS[meals] || MEAL_WEIGHTS[3];
  const times   = MEAL_TIMES[meals]   || MEAL_TIMES[3];
  const labels  = MEAL_LABELS[meals]  || MEAL_LABELS[3];
  const templates = TEMPLATES[dietType] || TEMPLATES["Vegan"];
  const defSet  = new Set((deficiencies||[]).flatMap(d => DEF_FOODS[d]||[]));

  return weights.map((w, i) => {
    const mealTarget = {
      calories: Math.round(macros.calories * w),
      protein:  Math.round(macros.protein  * w),
      carbs:    Math.round(macros.carbs    * w),
      fats:     Math.round(macros.fats     * w),
      fiber:    Math.round(macros.fiber    * w),
    };
    const timeKey = times[i] === "breakfast" ? "breakfast" : "main";
    const tplSet  = templates[timeKey] || templates["main"] || templates[Object.keys(templates)[0]];

    const options = tplSet.map(tpl => {
      // Check allergens
      const allIngIds = [tpl.protein, tpl.carb, tpl.fat, ...tpl.veg];
      const blocked = allIngIds.some(id => {
        const f = getFood(id);
        return f && (f.allergens||[]).some(a => allergySet.has(a.toLowerCase()));
      });
      const useTpl = blocked ? tplSet[0] : tpl; // fallback to first template
      const solved = solveMealOption(useTpl, mealTarget);
      const nutrition = calcActualNutrition(solved.ingredients);
      const defHits = (deficiencies||[]).filter(d =>
        (DEF_FOODS[d]||[]).some(fid => solved.ingredients.some(ing => ing.foodId === fid))
      );
      return { ...solved, nutrition, defHits };
    });

    // Use first option's nutrition as the "shared" display (they're very close)
    const sharedNutrition = mealTarget;

    return { label: labels[i], emoji: MEAL_EMOJIS[i], tag: times[i], targets: mealTarget, sharedNutrition, options };
  });
}

// ─────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────
const VITAMINS  = ["Vitamin D","Vitamin B12","Vitamin C","Iron","Calcium","Zinc","Magnesium","Folate","Omega-3"];
const ALLERGENS = ["Nuts","Peanuts","Gluten","Dairy","Eggs","Soy","Shellfish","Sesame"];
const DIET_TYPES = [
  { id:"Non-Veg (All)",        icon:"🥩", sub:"All meats & fish" },
  { id:"Chicken & Fish Only",  icon:"🍗", sub:"Poultry & seafood" },
  { id:"Vegetarian",           icon:"🥗", sub:"Eggs & dairy OK" },
  { id:"Vegan",                icon:"🌿", sub:"Fully plant-based" },
  { id:"Non-Dairy Vegan",      icon:"🌱", sub:"No dairy or eggs" },
];
const BODY_TYPES = [
  { id:"Ectomorph",  icon:"🏃", name:"Ectomorph",  desc:"Naturally lean, fast metabolism, hard to gain weight" },
  { id:"Mesomorph",  icon:"🏋️", name:"Mesomorph",  desc:"Athletic build, gains muscle & fat proportionately" },
  { id:"Endomorph",  icon:"🤸", name:"Endomorph",  desc:"Stockier build, slower metabolism, gains fat easily" },
];
const GOAL_LIST = [
  { id:"Lose Fat",             icon:"🔥", sub:"-400 kcal/day" },
  { id:"Gentle Cut",           icon:"✂️", sub:"-200 kcal/day" },
  { id:"Maintain Weight",      icon:"⚖️", sub:"Maintenance" },
  { id:"Build Muscle",         icon:"💪", sub:"+300 kcal/day" },
  { id:"Athletic Performance", icon:"⚡", sub:"+200 kcal/day" },
  { id:"Body Recomposition",   icon:"🔄", sub:"Slight surplus" },
];
const OPT_CLS   = ["oa","ob","oc"];
const OPT_BADGE = ["Option A","Option B","Option C"];

// ─────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────
function StepIndicator({ step }) {
  const steps = ["Personal","Body Metrics","Goals","Your Plan"];
  return (
    <div className="stepper">
      {steps.map((s, i) => {
        const n = i + 1;
        const state = n < step ? "done" : n === step ? "active" : "todo";
        return (
          <div key={s} className="step-item">
            <div className="step-wrap">
              <div className={`step-bubble ${state}`}>
                {state === "done" ? "✓" : n}
              </div>
              <div className={`step-label ${state}`}>{s}</div>
            </div>
            {i < steps.length - 1 && <div className={`step-line ${n < step ? "done" : "todo"}`} />}
          </div>
        );
      })}
    </div>
  );
}

function OptionCard({ opt, idx, sharedNutrition }) {
  const [open, setOpen] = useState(false);
  const { ingredients, label, defHits } = opt;

  const ingDetails = ingredients.map(ing => {
    const f = getFood(ing.foodId);
    return { ...ing, food: f, name: f?.name || ing.foodId, emoji: f?.emoji || "🍴" };
  });

  const allPrep = [];
  for (const ing of ingDetails) {
    const steps = COOK[ing.foodId];
    if (steps) {
      allPrep.push({ name: ing.name, steps, grams: ing.grams });
    }
  }

  return (
    <div className={`opt-card ${OPT_CLS[idx] || ""}`}>
      <div className="opt-badge">{OPT_BADGE[idx] || `Option ${idx+1}`}</div>
      <span className="opt-emoji">
        {ingDetails.find(i => getFood(i.foodId)?.role === "protein")?.emoji || "🍽️"}
      </span>
      <div className="opt-name">{label}</div>

      {/* Ingredient tags */}
      <div className="ing-tags">
        {ingDetails.map((ing, i) => (
          <span key={i} className="ing-tag">{ing.emoji} {ing.grams}g {ing.name}</span>
        ))}
      </div>

      {/* Deficiency tags */}
      {defHits?.length > 0 && (
        <div className="def-tags">
          {defHits.map(d => <span key={d} className="def-tag">✦ {d}</span>)}
        </div>
      )}

      <button className="expand-btn" onClick={() => setOpen(!open)}>
        {open ? "▲ Hide prep" : "▼ Ingredients & Prep"}
      </button>

      {open && (
        <div className="opt-expanded">
          <div className="exp-sec-label">Ingredients</div>
          <ul className="ing-list">
            {ingDetails.map((ing, i) => (
              <li key={i}><span className="ing-dot" />{ing.grams}g {ing.name}</li>
            ))}
          </ul>
          <div className="exp-sec-label" style={{ marginTop: 14 }}>Preparation</div>
          <ol className="prep-list">
            {allPrep.flatMap((item, ii) =>
              item.steps.map((step, si) => (
                <li key={`${ii}-${si}`}><strong>{item.name}:</strong> {step}</li>
              ))
            )}
          </ol>
          {defHits?.length > 0 && (
            <div style={{ marginTop: 12, fontSize: 11, color: "var(--gold)", background: "rgba(200,134,26,0.06)", border: "1px solid rgba(200,134,26,0.15)", borderRadius: 6, padding: "8px 12px" }}>
              💊 Targets your {defHits.join(", ")} deficiency through key ingredients.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP COMPONENTS
// ─────────────────────────────────────────────────────────────
function Step1({ data, setData, onNext }) {
  const ok = data.gender && data.age >= 10 && data.age <= 100;
  return (
    <div className="step-container">
      <div className="step-title">Let's build your<br /><em>perfect nutrition plan</em></div>
      <div className="step-subtitle">Tell us a bit about yourself to get started.</div>

      <div className="card">
        <div className="card-label">Gender</div>
        <div className="big-toggle">
          {[{ id:"Male",emoji:"👨",sub:"Male metabolism" },{ id:"Female",emoji:"👩",sub:"Female metabolism" },{ id:"Other",emoji:"🧑",sub:"Neutral formula" }].map(g => (
            <button key={g.id} className={`big-btn ${data.gender===g.id?"on":""}`} onClick={() => setData({...data, gender:g.id})}>
              <span className="bb-icon">{g.emoji}</span>
              <div className="bb-label">{g.id}</div>
              <div className="bb-sub">{g.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-label">Age</div>
        <div className="field" style={{ maxWidth: 200 }}>
          <label>Age (years)</label>
          <input type="number" min={10} max={100} value={data.age||""} placeholder="e.g. 28"
            onChange={e => setData({...data, age: +e.target.value})} />
        </div>
      </div>

      <div className="nav-row">
        <button className="btn-next" onClick={onNext} disabled={!ok}>
          Body Metrics <span>→</span>
        </button>
      </div>
    </div>
  );
}

function Step2({ data, setData, onNext, onBack }) {
  const bmi = data.heightCm && data.weightKg ? calcBMI(data.weightKg, data.heightCm) : null;
  const ideal = data.heightCm && data.gender ? calcIdealWeight(data.gender, data.heightCm) : null;
  const cat = bmi ? bmiCategory(bmi) : null;
  const ok = data.heightCm > 100 && data.weightKg > 20 && data.bodyType && data.activity;

  return (
    <div className="step-container">
      <div className="step-title"><em>Body metrics</em> &<br />activity level</div>
      <div className="step-subtitle">Used to calculate your BMR, TDEE, and ideal weight range.</div>

      {/* HEIGHT & WEIGHT */}
      <div className="card">
        <div className="card-label">Height & Weight</div>
        <div className="input-grid">
          <div className="field">
            <label>Height (cm)</label>
            <input type="number" min={100} max={250} value={data.heightCm||""} placeholder="e.g. 175"
              onChange={e => setData({...data, heightCm: +e.target.value})} />
          </div>
          <div className="field">
            <label>Weight (kg)</label>
            <input type="number" min={20} max={300} value={data.weightKg||""} placeholder="e.g. 78"
              onChange={e => setData({...data, weightKg: +e.target.value})} />
          </div>
        </div>

        {/* LIVE BMI PREVIEW */}
        {bmi && (
          <div className="bmi-preview" style={{ marginTop: 16 }}>
            <div className="bp-item">
              <div className="bp-val">{bmi}</div>
              <div className="bp-label">BMI</div>
              <span className="bp-tag" style={{ background: cat.color + "40" }}>{cat.label}</span>
            </div>
            <div className="bp-item">
              <div className="bp-val">{ideal.min}–{ideal.max}<span style={{ fontSize:14 }}>kg</span></div>
              <div className="bp-label">Ideal Weight Range</div>
            </div>
            <div className="bp-item">
              <div className="bp-val">{Math.round(data.weightKg - ideal.target)>0?"+":""}{Math.round(data.weightKg - ideal.target)}<span style={{ fontSize:14 }}>kg</span></div>
              <div className="bp-label">From Ideal</div>
            </div>
          </div>
        )}
      </div>

      {/* BODY TYPE */}
      <div className="card">
        <div className="card-label">Body Type</div>
        <div className="body-grid">
          {BODY_TYPES.map(bt => (
            <div key={bt.id} className={`body-card ${data.bodyType===bt.id?"on":""}`}
              onClick={() => setData({...data, bodyType: bt.id})}>
              <span className="bc-icon">{bt.icon}</span>
              <div className="bc-name">{bt.name}</div>
              <div className="bc-desc">{bt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVITY */}
      <div className="card">
        <div className="card-label">Activity Level</div>
        <div className="activity-list">
          {Object.entries(ACTIVITY).map(([key, val]) => (
            <div key={key} className={`act-opt ${data.activity===key?"on":""}`}
              onClick={() => setData({...data, activity: key})}>
              <div className={`act-radio`} />
              <div>
                <div className="act-name">{key}</div>
                <div className="act-desc">{val.label}</div>
              </div>
              <span className="act-mult">×{val.mult}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="nav-row">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={onNext} disabled={!ok}>Goals & Diet →</button>
      </div>
    </div>
  );
}

function Step3({ data, setData, onGenerate, onBack }) {
  const toggle = (k, v) => setData(d => ({
    ...d, [k]: d[k]?.includes(v) ? d[k].filter(x=>x!==v) : [...(d[k]||[]), v]
  }));
  const ok = data.goal && data.dietType && data.meals;

  return (
    <div className="step-container">
      <div className="step-title">Goals &<br /><em>diet preferences</em></div>
      <div className="step-subtitle">We'll use this to derive your exact macro targets and filter your meal options.</div>

      {/* GOAL */}
      <div className="card">
        <div className="card-label">Primary Goal</div>
        <div className="goal-grid">
          {GOAL_LIST.map(g => (
            <div key={g.id} className={`goal-card ${data.goal===g.id?"on":""}`}
              onClick={() => setData({...data, goal: g.id})}>
              <span className="gc-icon">{g.icon}</span>
              <div className="gc-name">{g.id}</div>
              <div className="gc-cal">{g.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DIET TYPE */}
      <div className="card">
        <div className="card-label">Diet Type</div>
        <div className="diet-grid">
          {DIET_TYPES.map(d => (
            <div key={d.id} className={`diet-opt ${data.dietType===d.id?"on":""}`}
              onClick={() => setData({...data, dietType: d.id})}>
              <span className="do-icon">{d.icon}</span>
              <div>
                <div className="do-label">{d.id}</div>
                <div style={{ fontSize:10, color:"var(--light)" }}>{d.sub}</div>
              </div>
              <span className="do-radio" />
            </div>
          ))}
        </div>
      </div>

      {/* MEALS PER DAY */}
      <div className="card">
        <div className="card-label">Meals Per Day</div>
        <div className="meals-row">
          {[1,2,3,4,5,6].map(n => (
            <button key={n} className={`ml-btn ${data.meals===n?"on":""}`}
              onClick={() => setData({...data, meals: n})}>{n}</button>
          ))}
        </div>
      </div>

      {/* DEFICIENCIES */}
      <div className="card">
        <div className="card-label">Vitamin / Mineral Deficiencies</div>
        <div className="chips-wrap">
          {VITAMINS.map(v => (
            <div key={v} className={`chip ${(data.deficiencies||[]).includes(v)?"on":""}`}
              onClick={() => toggle("deficiencies", v)}>{v}</div>
          ))}
        </div>
      </div>

      {/* ALLERGIES */}
      <div className="card">
        <div className="card-label">Food Allergies to Exclude</div>
        <div className="chips-wrap">
          {ALLERGENS.map(a => (
            <div key={a} className={`chip ${(data.allergies||[]).includes(a)?"on":""}`}
              onClick={() => toggle("allergies", a)}>{a}</div>
          ))}
        </div>
      </div>

      <div className="nav-row" style={{ flexDirection:"column", alignItems:"stretch" }}>
        <button className="btn-generate" onClick={onGenerate} disabled={!ok}>
          ⚡ Generate My Precision Meal Plan
        </button>
        <div style={{ display:"flex", justifyContent:"flex-start", marginTop: 8 }}>
          <button className="btn-back" onClick={onBack}>← Back</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RESULTS PAGE
// ─────────────────────────────────────────────────────────────
function ResultsPage({ form, macros, plan, onReset }) {
  const macroColors = {
    calories: "#E8912A", protein: "#2D6A4F", carbs: "#3A8FBF", fats: "#D95433", fiber: "#7B5EA7"
  };

  return (
    <div className="results-wrap">
      {/* STATS BANNER */}
      <div className="stats-banner">
        <div className="stats-banner-title">Precision plan for</div>
        <div className="stats-banner-name">
          {form.gender}, {form.age} yrs · {form.bodyType} · {form.goal}
        </div>
        <div className="stats-grid">
          {[
            { label:"BMI", val: macros.bmi, unit:"", badge: macros.bmiCat.label, color: macros.bmiCat.color },
            { label:"Ideal Weight", val: `${macros.idealWeight.min}–${macros.idealWeight.max}`, unit:"kg", badge:"Devine formula" },
            { label:"Daily Target", val: macros.calories, unit:"kcal", badge: GOALS[form.goal]?.label },
            { label:"TDEE", val: macros.tdee, unit:"kcal", badge: form.activity },
            { label:"BMR", val: macros.bmr, unit:"kcal", badge:"Mifflin–St Jeor" },
          ].map(s => (
            <div key={s.label} className="stat-box">
              <div className="stat-label">{s.label}</div>
              <div className="stat-val">{s.val}<span className="stat-unit">{s.unit}</span></div>
              {s.badge && <div className="stat-badge">{s.badge}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* MACRO BLUEPRINT */}
      <div className="macro-blueprint">
        <div className="mb-title">📐 Daily Macro Blueprint</div>
        <div className="macro-bars">
          {[
            { name:"Protein",      val:macros.protein, max:300, unit:"g", pct:`${macros.proP}% of calories`,  color:"#2D6A4F" },
            { name:"Carbohydrates",val:macros.carbs,   max:500, unit:"g", pct:`${macros.carbP}% of calories`, color:"#3A8FBF" },
            { name:"Fats",         val:macros.fats,    max:200, unit:"g", pct:`${macros.fatP}% of calories`,  color:"#D95433" },
            { name:"Fiber",        val:macros.fiber,   max:60,  unit:"g", pct:"~14g per 1000 kcal",           color:"#7B5EA7" },
          ].map(m => (
            <div key={m.name} className="mb-item">
              <div className="mb-row">
                <span className="mb-name">{m.name}</span>
                <span className="mb-nums"><strong>{m.val}</strong>{m.unit}</span>
              </div>
              <div className="mb-track">
                <div className="mb-fill" style={{ width:`${Math.min((m.val/m.max)*100,100)}%`, background:m.color }} />
              </div>
              <div className="mb-sub">{m.pct}</div>
            </div>
          ))}
        </div>
        <div className="macro-summary-row">
          {[
            { label:"Calories",  val:macros.calories, unit:"kcal", bg:"rgba(232,145,42,0.1)",  col:"#C87010" },
            { label:"Protein",   val:macros.protein,  unit:"g",    bg:"rgba(45,106,79,0.1)",   col:"#1A4731" },
            { label:"Carbs",     val:macros.carbs,    unit:"g",    bg:"rgba(58,143,191,0.1)",  col:"#2470A0" },
            { label:"Fats",      val:macros.fats,     unit:"g",    bg:"rgba(217,84,51,0.1)",   col:"#A83220" },
            { label:"Fiber",     val:macros.fiber,    unit:"g",    bg:"rgba(123,94,167,0.1)",  col:"#5B3E8A" },
          ].map(m => (
            <div key={m.label} className="ms-pill" style={{ background:m.bg }}>
              <div className="msp-label" style={{ color: m.col }}>{m.label}</div>
              <div className="msp-val" style={{ color: m.col }}>{m.val}<span className="msp-unit">{m.unit}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* DEFICIENCY NOTE */}
      {(form.deficiencies||[]).length > 0 && (
        <div className="def-notice">
          <strong>💊 Targeting your deficiencies</strong>
          Plan prioritizes ingredients rich in {(form.deficiencies||[]).join(", ")}.
          Meals featuring salmon, eggs, mushrooms, spinach, lentils, chia, and almonds score highest.
          Look for ✦ badges on meal cards to identify which options directly target your needs.
        </div>
      )}

      {/* MEAL SECTIONS */}
      {plan.map((meal, mi) => (
        <div key={mi} className="meal-section">
          <div className="meal-header">
            <div className="meal-num-badge">{meal.emoji}</div>
            <div className="meal-info-col">
              <div className="meal-title">Meal {mi+1} — {meal.label}</div>
              <div className="meal-meta">
                {meal.targets.calories} kcal · {meal.targets.protein}g protein · {meal.targets.carbs}g carbs · {meal.targets.fats}g fat · {meal.targets.fiber}g fiber
              </div>
            </div>
            <div className="meal-time-chip">{meal.tag}</div>
          </div>

          {/* SHARED MACRO BADGE ROW */}
          <div className="shared-macro-row">
            <span className="smr-label">All 3 options provide exactly:</span>
            <span className="smr-pill" style={{ background:"rgba(232,145,42,0.3)" }}>🔥 {meal.sharedNutrition.calories} kcal</span>
            <span className="smr-pill" style={{ background:"rgba(45,106,79,0.35)" }}>💪 {meal.sharedNutrition.protein}g protein</span>
            <span className="smr-pill" style={{ background:"rgba(58,143,191,0.3)" }}>⚡ {meal.sharedNutrition.carbs}g carbs</span>
            <span className="smr-pill" style={{ background:"rgba(217,84,51,0.3)" }}>🫧 {meal.sharedNutrition.fats}g fat</span>
          </div>

          <div className="options-grid">
            {meal.options.map((opt, i) => (
              <OptionCard key={i} opt={opt} idx={i} sharedNutrition={meal.sharedNutrition} />
            ))}
          </div>
        </div>
      ))}

      {/* DAY SUMMARY */}
      <div className="day-summary">
        <div className="ds-title">📊 Your Daily Nutrition Summary</div>
        <div className="ds-grid">
          {[
            { label:"Calories", val:macros.calories, unit:"kcal", col:"#C87010" },
            { label:"Protein",  val:macros.protein,  unit:"g",    col:"#1A4731" },
            { label:"Carbs",    val:macros.carbs,    unit:"g",    col:"#2470A0" },
            { label:"Fats",     val:macros.fats,     unit:"g",    col:"#A83220" },
            { label:"Fiber",    val:macros.fiber,    unit:"g",    col:"#5B3E8A" },
          ].map(d => (
            <div key={d.label} className="ds-item">
              <div className="dsi-label">{d.label}</div>
              <div className="dsi-val" style={{ color: d.col }}>{d.val}<span className="dsi-unit">{d.unit}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 28, display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
        <button className="btn-regen" onClick={onReset}>← Adjust Profile</button>
        <button className="btn-regen" onClick={() => window.location.reload()}>↻ Start Over</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────
export default function NutriEnginePro() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const [s1, setS1] = useState({ gender:"", age:"" });
  const [s2, setS2] = useState({ heightCm:"", weightKg:"", bodyType:"", activity:"" });
  const [s3, setS3] = useState({ goal:"", dietType:"", meals:3, deficiencies:[], allergies:[] });

  const macros = useMemo(() => {
    if (!s1.gender || !s1.age || !s2.heightCm || !s2.weightKg || !s2.bodyType || !s2.activity || !s3.goal) return null;
    return deriveMacros({ ...s1, ...s2, ...s3 });
  }, [s1, s2, s3]);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const form = { ...s1, ...s2, ...s3 };
      const m = deriveMacros(form);
      const p = generatePlan(form, m);
      setPlan({ plan: p, macros: m, form });
      setStep(4);
      setLoading(false);
    }, 700);
  };

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="app">
        {/* HEADER */}
        <header className="site-header">
          <div className="site-header-inner">
            <div className="logo">Nutri<span>Engine</span> <span style={{ fontFamily:"Plus Jakarta Sans", fontWeight:400, fontSize:14, opacity:0.5, marginLeft:4 }}>Pro</span></div>
            <div className="header-tag">Precision Nutrition System</div>
          </div>
        </header>

        {/* STEPPER (steps 1-3) */}
        {step < 4 && <StepIndicator step={step} />}

        {/* STEPS */}
        {step === 1 && <Step1 data={s1} setData={setS1} onNext={() => setStep(2)} />}
        {step === 2 && <Step2 data={{...s1,...s2}} setData={d => { setS1({gender:d.gender,age:d.age}); setS2({heightCm:d.heightCm,weightKg:d.weightKg,bodyType:d.bodyType,activity:d.activity}); }} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && (
          <Step3
            data={s3} setData={setS3}
            onGenerate={handleGenerate}
            onBack={() => setStep(2)}
          />
        )}

        {/* LOADING */}
        {loading && (
          <div className="loading-state">
            <div className="spin" />
            <p>Computing your precision nutrition plan…</p>
          </div>
        )}

        {/* RESULTS */}
        {step === 4 && !loading && plan && (
          <ResultsPage
            form={plan.form}
            macros={plan.macros}
            plan={plan.plan}
            onReset={() => setStep(3)}
          />
        )}

        {/* FOOTER */}
        <footer style={{ borderTop:"1px solid var(--border)", padding:"18px 40px", textAlign:"center", fontSize:11, color:"var(--light)", letterSpacing:"1.5px", textTransform:"uppercase", background:"var(--white)" }}>
          NutriEngine Pro · Mifflin–St Jeor BMR · USDA FoodData Central · Local Algorithm
        </footer>
      </div>
    </>
  );
}
