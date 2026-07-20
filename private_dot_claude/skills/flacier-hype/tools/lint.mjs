#!/usr/bin/env node
// lint.mjs — 反 AI 味机械检查。词表以本文件为准（say-human.md 只讲判断，不复读词表）。
// 用法: node tools/lint.mjs <稿件.md> [更多文件...]
// 输出: 逐行命中（文件:行号 [组] 命中），末尾统计。有命中退出码 1。
// 只报机械可判项；判断类（价值拔高/无源引用/自我指涉…）走 references/review.md 的诊断。

// ── 词表 ──────────────────────────────────────────────
const GROUPS = {
  网感假口语: [
    '谁懂啊', '绝绝子', '真的会谢', '救命', '狠狠心动', '直接拉满', '我真的会哭',
    '家人们', 'yyds', '泰裤辣', '尊嘟', '气抖冷', '破防了', '拿捏了',
  ],
  开场提示层: ['先说结论', '直接说结论', '先摆结论', '划重点', '敲黑板'],
  总结式收尾: ['综上所述', '归根结底', '总的来说', '总而言之', '本质上来说'],
  赋能式黑话: [
    '赋能', '助力', '抓手', '闭环', '一站式', '降本增效', '心智', '组合拳',
    '护城河', '颗粒度', '拉齐', '破圈', '价值释放', '能力提升', '体验升级', '全链路',
  ],
  全局禁词: ['至关重要', '打磨', '精心', '匠心', '极致体验', '重磅'],
  营销行话: ['痛点', '踩过的坑', '种草', '安利', '引流', '软广', '干货满满', '闭眼入'],
  元标注: ['这是推测', '来源存疑', '未经逐字验证', '仅供参考'],
  翻译腔: ['值得注意的是', '值得一提的是', '不得不说', '毫无疑问', '众所周知', '不难发现', '换句话说'],
};
const PATTERNS = [
  { group: '翻译腔', re: /对于.{1,10}来说/g, label: '「对于…来说」' },
  { group: '翻译腔', re: /随着.{2,14}的(发展|普及|到来)/g, label: '「随着…的发展」' },
  { group: '翻译腔', re: /作为一(个|名).{1,10}[，,]/g, label: '「作为一个…，」开场' },
  { group: '翻译腔', re: /在.{1,14}(的世界|的时代|的浪潮)(里|中|下)/g, label: '「在…的时代中」' },
  { group: '二元对比', re: /不是.{1,18}[，,]?而是/g, label: '「不是…而是…」' },
  { group: '价值拔高骨架', re: /不仅仅是.{1,20}更是/g, label: '「不仅仅是…更是…」' },
];

// ── 实现 ──────────────────────────────────────────────
import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('用法: node tools/lint.mjs <稿件.md> [...]');
  process.exit(2);
}

const EMOJI = /\p{Extended_Pictographic}/gu;
let total = 0;

for (const file of files) {
  let text;
  try { text = readFileSync(file, 'utf8'); } catch (e) { console.error(`${file}: 读不到（${e.code}）`); process.exit(2); }
  const lines = text.split('\n');
  const hits = [];

  lines.forEach((line, i) => {
    const no = i + 1;
    for (const [group, words] of Object.entries(GROUPS))
      for (const w of words)
        if (line.includes(w)) hits.push(`${file}:${no} [${group}] 「${w}」`);
    for (const p of PATTERNS)
      for (const m of line.matchAll(p.re)) hits.push(`${file}:${no} [${p.group}] ${p.label} → “${m[0]}”`);
  });

  // 频率类（整篇）
  const emojiCount = (text.match(EMOJI) || []).length;
  const per500 = emojiCount / Math.max(text.length / 500, 1);
  if (per500 > 3) hits.push(`${file} [emoji密度] ${emojiCount} 个（每500字 ${per500.toFixed(1)}，>3 偏表演）`);
  const jinxing = (text.match(/进行[一-龥]{2}/g) || []).length;
  if (jinxing > 2) hits.push(`${file} [翻译腔] 「进行 XX」共 ${jinxing} 次（>2 次即腔），改成直接动词`);

  // 排比：连续 3 行/句同两字开头（剥掉 markdown 列表符/引用符再判，列表天然同头不算）
  const sents = text.split(/[。！？\n]/)
    .map(s => s.trim().replace(/^([-*>]|\d+[.、])\s*/, ''))
    .filter(s => s.length > 4);
  for (let i = 0; i + 2 < sents.length; i++) {
    const h = sents[i].slice(0, 2);
    if (h && sents[i + 1].startsWith(h) && sents[i + 2].startsWith(h))
      hits.push(`${file} [机械排比] 连续 3 句以「${h}」开头：“${sents[i].slice(0, 12)}…”`);
  }

  // 句长节奏：连续 5 句长度都在均值 ±4 内 → 平
  const lens = sents.map(s => s.length);
  for (let i = 0; i + 4 < lens.length; i++) {
    const w = lens.slice(i, i + 5);
    const avg = w.reduce((a, b) => a + b) / 5;
    if (w.every(l => Math.abs(l - avg) <= 4))
      hits.push(`${file} [句长均匀] 连续 5 句长度 [${w.join('][')}]，没有呼吸感，拆长补短`);
  }

  // 加粗滥用
  const bold = (text.match(/\*\*[^*]+\*\*/g) || []).length;
  if (bold > lines.filter(l => l.trim()).length / 4)
    hits.push(`${file} [加粗滥用] ${bold} 处加粗，超过 1/4 的行在喊`);

  if (hits.length) { console.log(hits.join('\n')); total += hits.length; }
}

console.log(total ? `\n共 ${total} 处命中。词表若误伤（如引用/反例），人判后放行。` : 'lint 过：无机械命中。判断类还得过 review.md。');
process.exit(total ? 1 : 0);
