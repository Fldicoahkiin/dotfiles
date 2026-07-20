#!/usr/bin/env node
// platform-check.mjs — 平台硬约束检查（pass/warn/fail）。规则来自 references/platforms/*.md 的「格式硬约束」。
// 用法: node tools/platform-check.mjs <平台> <稿件.md>
// 约定: 标题行写成 `标题：xxx`（或首个 `# ` 一级标题当标题）；推特多条用 `---` 分块；标签行以 # 开头或含 \#tag。
// 表里没有的平台只报字数与 emoji，提示去平台卡录入硬约束。

import { readFileSync } from 'node:fs';

const RULES = {
  xiaohongshu: { titleMax: 20, tags: [3, 5], note: '封面竖版 3:4 1242×1660；图 5-9 张' },
  twitter: { blockMax: 280, hashtagsMax: 2, linkInBody: false, note: '链接放 reply；每条挂原生视频/GIF' },
  bilibili: { titleMax: 40, note: '前 15 秒留人；标题封面先行' },
  jike: { note: '短动态体，一屏内说完最好' },
};

const [platform, file] = process.argv.slice(2);
if (!platform || !file) { console.error('用法: node tools/platform-check.mjs <平台> <稿件.md>'); process.exit(2); }
const text = readFileSync(file, 'utf8');
const r = RULES[platform];
const out = [];
const level = { pass: '✓', warn: '△', fail: '✗' };
const say = (lv, msg) => out.push(`${level[lv]} ${msg}`);

// 标题
const mTitle = text.match(/^标题[:：]\s*(.+)$/m) || text.match(/^#\s+(.+)$/m);
const title = mTitle ? mTitle[1].trim() : null;
if (r?.titleMax) {
  if (!title) say('warn', `没找到标题行（写成「标题：xxx」）`);
  else say(title.length <= r.titleMax ? 'pass' : 'fail', `标题 ${title.length} 字 / 上限 ${r.titleMax}：「${title}」`);
}

// 标签
if (r?.tags) {
  const tags = (text.match(/(^|\s)#[^\s#][^\s]*/g) || []).length;
  const [lo, hi] = r.tags;
  say(tags >= lo && tags <= hi ? 'pass' : 'fail', `标签 ${tags} 个 / 要求 ${lo}-${hi}`);
}

// 推特分块字数 + 正文链接
if (r?.blockMax) {
  const blocks = text.split(/^---$/m).map(b => b.trim()).filter(Boolean);
  blocks.forEach((b, i) => {
    const body = b.replace(/^#.*$/gm, '').trim();
    if (!body) return;
    say(body.length <= r.blockMax ? 'pass' : 'fail', `第 ${i + 1} 块 ${body.length} 字符 / ${r.blockMax}`);
  });
  const hs = (text.match(/(^|\s)#[a-zA-Z]\w*/g) || []).length;
  if (hs > (r.hashtagsMax ?? 99)) say('fail', `hashtag ${hs} 个 > ${r.hashtagsMax}（5 个以上触发压制）`);
}
if (r && r.linkInBody === false) {
  const firstBlock = text.split(/^---$/m)[0] || '';
  if (/https?:\/\//.test(firstBlock)) say('fail', '正文含外链——放 reply，别放正文（算法压制）');
}

// 通用
const emoji = (text.match(/\p{Extended_Pictographic}/gu) || []).length;
say('pass', `全文 ${text.replace(/\s/g, '').length} 字，emoji ${emoji} 个`);
if (!r) say('warn', `「${platform}」还没录硬约束——从 references/platforms/${platform}.md 的格式硬约束补进本脚本 RULES 表`);
if (r?.note) out.push(`· 另需人工核：${r.note}`);

console.log(out.join('\n'));
process.exit(out.some(l => l.startsWith('✗')) ? 1 : 0);
