#!/usr/bin/env node
// gen-image.mjs — 宣发配图 SVG 生成 + rsvg-convert 导 PNG（视觉语言见 references/visual.md）。
// 用法:
//   node tools/gen-image.mjs --preset social|banner|xhs --title <名> \
//     [--subtitle <一句话>] [--accent "#ff6b35"] [--kicker "A CLAUDE CODE SKILL"] \
//     [--pipeline "a>b>c>done"] [--stats "x · y · z"] [--outdir /tmp]
// 产物: <outdir>/<title>-<preset>.svg + .png（rsvg-convert 在的话）。脚本管排版，审美归人。

import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const arg = (k, d) => {
  const i = process.argv.indexOf(`--${k}`);
  return i > -1 ? process.argv[i + 1] : d;
};
const preset = arg('preset', 'social');
const title = arg('title');
if (!title) { console.error('缺 --title'); process.exit(2); }
const subtitle = arg('subtitle', '');
const accent = arg('accent', '#ff6b35');
const kicker = arg('kicker', '');
const pipeline = arg('pipeline', '');
const stats = arg('stats', '');
const outdir = arg('outdir', '/tmp');

const SIZES = { banner: [2560, 800, 2], social: [1280, 640, 1], xhs: [1242, 1660, 1] };
if (!SIZES[preset]) { console.error(`preset 只有 ${Object.keys(SIZES).join('/')}`); process.exit(2); }
const [W, H, scale] = SIZES[preset];
const vw = W / scale, vh = H / scale; // viewBox 坐标
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
// 文本近似宽度（等宽：CJK≈1em，latin≈0.62em）
const tw = (s, fs) => [...s].reduce((w, c) => w + (c.codePointAt(0) > 255 ? fs : fs * 0.62), 0);

const cx = vw / 2;
let body = '';

if (preset === 'xhs') {
  // 竖版大字报：kicker + 大标题（自动换行）+ 副题 + 底部 stats
  const fs = 96;
  const lines = [];
  let cur = '';
  for (const ch of title) {
    if (tw(cur + ch, fs) > vw - 160) { lines.push(cur); cur = ch; } else cur += ch;
  }
  lines.push(cur);
  const startY = vh * 0.32 - ((lines.length - 1) * fs * 1.25) / 2;
  body += kicker ? `<text x="${cx}" y="${vh * 0.16}" text-anchor="middle" font-family="${MONO}" font-size="26" letter-spacing="6" fill="${accent}" fill-opacity="0.9">${esc(kicker)}</text>` : '';
  lines.forEach((l, i) => {
    body += `<text x="${cx}" y="${startY + i * fs * 1.25}" text-anchor="middle" font-family="${MONO}" font-size="${fs}" font-weight="700" fill="${accent}">${esc(l)}</text>`;
  });
  if (subtitle) body += `<text x="${cx}" y="${startY + lines.length * fs * 1.25 + 30}" text-anchor="middle" font-family="${MONO}" font-size="34" fill="#adbac7">${esc(subtitle)}</text>`;
  if (stats) body += `<text x="${cx}" y="${vh - 90}" text-anchor="middle" font-family="${MONO}" font-size="28" fill="#768390">${esc(stats)}</text>`;
} else {
  // 横版：kicker + 标题 + 副题 + 流程胶囊 + stats
  const fs = preset === 'banner' ? 72 : 88;
  body += kicker ? `<text x="${cx}" y="${vh * 0.19}" text-anchor="middle" font-family="${MONO}" font-size="18" letter-spacing="5" fill="${accent}" fill-opacity="0.9">${esc(kicker)}</text>` : '';
  body += `<text x="${cx}" y="${vh * 0.34}" text-anchor="middle" font-family="${MONO}" font-size="${fs}" font-weight="700" fill="${accent}">${esc(title)}</text>`;
  if (subtitle) body += `<text x="${cx}" y="${vh * 0.34 + 52}" text-anchor="middle" font-family="${MONO}" font-size="25" fill="#adbac7">${esc(subtitle)}</text>`;

  if (pipeline) {
    const steps = pipeline.split('>').map(s => s.trim()).filter(Boolean);
    const fsC = 21, hC = 52, gap = 46, padX = 26;
    const widths = steps.map(s => Math.round(tw(s, fsC)) + padX * 2);
    const totalW = widths.reduce((a, b) => a + b, 0) + gap * (steps.length - 1);
    let x = cx - totalW / 2;
    const y = vh * 0.66;
    steps.forEach((s, i) => {
      const last = i === steps.length - 1;
      const stroke = last ? '#3fb950' : accent;
      const fill = last ? '#56d364' : '#d1d5db';
      body += `<rect x="${x}" y="${y}" width="${widths[i]}" height="${hC}" rx="${hC / 2}" fill="#161b22" stroke="${stroke}" stroke-opacity="${last ? 0.8 : 0.5}"/>`;
      body += `<text x="${x + widths[i] / 2}" y="${y + 33}" text-anchor="middle" font-family="${MONO}" font-size="${fsC}" fill="${fill}">${esc(s)}</text>`;
      if (!last) {
        const ax = x + widths[i];
        body += `<line x1="${ax + 8}" y1="${y + hC / 2}" x2="${ax + gap - 10}" y2="${y + hC / 2}" stroke="${accent}" stroke-width="2" marker-end="url(#ah)"/>`;
      }
      x += widths[i] + gap;
    });
  }
  if (stats) body += `<text x="${cx}" y="${vh - 46}" text-anchor="middle" font-family="${MONO}" font-size="20" fill="#768390">${esc(stats)}</text>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" role="img" aria-label="${esc(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1117"/><stop offset="1" stop-color="#11161d"/>
    </linearGradient>
    <marker id="ah" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="${accent}"/>
    </marker>
  </defs>
  <rect width="${vw}" height="${vh}" ${preset === 'banner' ? 'rx="14"' : ''} fill="url(#bg)"/>
  <rect x="1" y="1" width="${vw - 2}" height="${vh - 2}" ${preset === 'banner' ? 'rx="13"' : 'rx="20"'} fill="none" stroke="#ffffff" stroke-opacity="0.06"/>
  ${body}
</svg>`;

const slug = title.toLowerCase().replace(/[^a-z0-9一-鿿]+/g, '-').replace(/^-|-$/g, '');
const svgPath = `${outdir}/${slug}-${preset}.svg`;
const pngPath = `${outdir}/${slug}-${preset}.png`;
writeFileSync(svgPath, svg);
let msg = `svg: ${svgPath}`;
try {
  execFileSync('rsvg-convert', ['-w', String(W), '-h', String(H), svgPath, '-o', pngPath], { stdio: 'pipe', timeout: 30000 });
  msg += `\npng: ${pngPath} (${W}×${H})`;
} catch {
  msg += `\npng: 跳过（rsvg-convert 不可用，brew install librsvg）`;
}
console.log(msg + '\n生成后 Read 那张 PNG 过一遍 references/visual.md 的自查清单。');
