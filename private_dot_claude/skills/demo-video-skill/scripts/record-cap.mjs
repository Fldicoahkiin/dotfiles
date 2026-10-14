#!/usr/bin/env node
// record-cap.mjs — Screen Studio look via Cap CLI: record window → drive real input →
// cluster clicks into auto-zoom segments → apply look template → export mp4.
// Prereqs: cap CLI (curl -fsSL https://cap.so/install-cli.sh | sh), cliclick (brew install cliclick),
//          playwright chromium, macOS screen-recording permission granted to the terminal.
// Usage: APP=http://localhost:5173 node scripts/record-cap.mjs
// Edit `scenes` like record.mjs — same choreography idea, but acts run through realClick/realType.

import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const APP = process.env.APP || 'http://localhost:5173';
const SIZE = { width: 1440, height: 900 };
const OUT = 'out/cap-demo.mp4';

// ── cap helpers ───────────────────────────────────────────────
const cap = (args, opts = {}) => {
  const r = execFileSync('cap', [...args, '--json'], { encoding: 'utf8', timeout: 120000, ...opts });
  try { return JSON.parse(r); } catch { return { raw: r }; }
};

// ── real input (Cap's cursor hook only sees the OS cursor) ────
const clickAbs = (x, y) => execFileSync('cliclick', [`m:${x},${y}`, 'w:120', `c:${x},${y}`], { timeout: 10000 });
const typeText = t => execFileSync('cliclick', ['t:' + t], { timeout: 30000 });

async function screenPoint(page, selector) {
  const box = await page.locator(selector).first().boundingBox();
  if (!box) throw new Error(`no box for ${selector}`);
  const o = await page.evaluate(() => ({
    sx: window.screenX, sy: window.screenY,
    chromeH: window.outerHeight - window.innerHeight,
  }));
  return { x: Math.round(o.sx + box.x + box.width / 2), y: Math.round(o.sy + o.chromeH + box.y + box.height / 2) };
}

const events = [];
async function realClick(page, selector) {
  const p = await screenPoint(page, selector);
  // frac = target area / viewport area → drives semantic zoom (small target = detail worth zooming)
  const box = await page.locator(selector).first().boundingBox();
  const vp = page.viewportSize() || SIZE;
  const frac = box ? (box.width * box.height) / (vp.width * vp.height) : 1;
  clickAbs(p.x, p.y);
  events.push({ type: 'click', selector, frac, ...p, t: Date.now() });
  await page.waitForTimeout(400);
}
// explicit overrides for the choreography: force a push-in on a region, or force back to overview
const focusOn = (page, selector) => screenPoint(page, selector).then(p => events.push({ type: 'focus', selector, frac: 0.02, ...p, t: Date.now() }));
const overview = () => events.push({ type: 'overview', t: Date.now() });

// ── scenes: replace with your choreography (glide → pause → act → hold) ──
// Each scene gets (page, H) — use H.realClick / H.typeText, NOT page.click:
// synthetic clicks don't move the OS cursor, and Cap records the OS cursor.
// Zoom is driven by the choreography's semantics (see zoom rules below); override
// explicitly with H.focusOn (force push-in) / H.overview (force back to full view)
// after a navigation, a dialog, or when a full-screen result appears.
const H = { realClick, typeText, focusOn, overview };
const scenes = [
  async (page, { realClick: _rc, typeText: _tt, overview: _ov }) => {
    await page.goto(APP);
    await page.waitForTimeout(1200);
    // await _rc(page, 'text=Get Started');       // small target → auto zoom-in
    // _tt('hello'); events.push({ type: 'type', t: Date.now() });
    // await page.waitForSelector('text=Done');
    // _ov();                                     // full-screen result → back to overview
    await page.waitForTimeout(1500);
  },
];

// ── main ──────────────────────────────────────────────────────
const doctor = cap(['doctor']);
if (doctor.raw && /error|denied/i.test(doctor.raw)) { console.error('cap doctor 不干净：', doctor.raw); process.exit(1); }

const browser = await chromium.launch({ headless: false, args: [`--window-size=${SIZE.width},${SIZE.height}`, '--window-position=80,60'] });
const page = await browser.newPage({ viewport: null });
await page.goto(APP);
await page.waitForTimeout(800);

// pick the chromium window from cap targets (fall back: print list, let the agent pick)
const targets = cap(['targets']);
const list = targets.windows || targets.targets || [];
const win = list.find(w => /chromium|chrome/i.test(w.title || w.owner || ''));
if (!win) { console.error('在 cap targets 里没认出 Chromium 窗口，自己挑一个 id：\n', JSON.stringify(list, null, 2)); await browser.close(); process.exit(1); }

const t0 = Date.now();
cap(['record', 'start', '--window', String(win.id), '--detach']);
console.log(`recording window ${win.id}…`);

for (const scene of scenes) await scene(page, H);

const stop = cap(['record', 'stop']);
await browser.close();
const proj = stop.project || stop.path || stop.output;
if (!proj || !existsSync(proj)) { console.error('record stop 没给出 .cap 工程路径，输出：', JSON.stringify(stop)); process.exit(1); }
writeFileSync('out/events.json', JSON.stringify(events, null, 2));

// ── zoom: SEMANTIC — driven by what the choreography did, not guesswork ──
// rules: target <8% of viewport → detail, zoom 2.0 · 8–25% → panel, zoom 1.5 ·
// >25% → no zoom (it IS the overview) · 'overview' event → close any open segment
// (navigation / dialog / full-screen result = pull back) · gaps <3s merge (no twitching)
const segs = [];
for (const e of events) {
  const t = (e.t - t0) / 1000;
  if (e.type === 'overview') {
    const open = segs[segs.length - 1];
    if (open && open.end > t) open.end = Math.max(open.start + 0.8, t); // pull back now
    continue;
  }
  if (e.frac === undefined || e.frac > 0.25) continue;                  // big target: stay wide
  const amount = e.frac < 0.08 ? 2.0 : 1.5;
  const last = segs[segs.length - 1];
  if (last && t - last._last <= 3 && last.amount === amount) { last.end = t + 1.5; last._last = t; }
  else segs.push({ start: Math.max(0, t - 0.5), end: t + 1.5, amount, mode: 'auto', _last: t });
}
segs.forEach(s => delete s._last);

// ── look template: merge over current config (field names follow the installed Cap) ──
const cfg = cap(['project', 'config', 'get', proj]);
const merged = {
  ...cfg,
  background: { ...(cfg.background || {}), padding: 12, rounding: 12, shadow: 60 },
  cursor: { ...(cfg.cursor || {}), motion_blur: 0.5 },
  timeline: { ...(cfg.timeline || {}), zoomSegments: segs },
};
try {
  cap(['project', 'config', 'set', proj, JSON.stringify(merged)]);
} catch (e) {
  console.error('config set 被 Cap 校验拒了（字段名随版本变）。先 `cap project config get` 看 schema，手动合并这份再 set：');
  console.error(JSON.stringify({ background: merged.background, cursor: merged.cursor, zoomSegments: segs }, null, 2));
  process.exit(1);
}

cap(['export', proj, '--output', OUT, '--settings-json', JSON.stringify({ format: 'Mp4', fps: 60, resolution_base: { x: 1920, y: 1080 } })]);
console.log(`done → ${OUT}\nzoom segments: ${segs.length}（events.json 已留档）\n下一步照旧：tts → transcribe → captions → compose（把 ${OUT} 当 clip 用）`);
