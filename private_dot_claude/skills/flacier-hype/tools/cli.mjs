#!/usr/bin/env node
// flacier — tools/ 的统一入口。零依赖：子命令直通脚本，裸跑进极简 TUI。
// 用法:
//   flacier lint <稿件.md> [...]           → tools/lint.mjs
//   flacier check <平台> <稿件.md>          → tools/platform-check.mjs
//   flacier image --preset ... --title ... → tools/gen-image.mjs
//   flacier                                 → 交互菜单

import { execFileSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SCRIPTS = {
  lint: { file: 'lint.mjs', desc: '反 AI 味机械检查', ask: ['稿件路径'] },
  check: { file: 'platform-check.mjs', desc: '平台硬约束 pass/warn/fail', ask: ['平台（xiaohongshu/twitter/…）', '稿件路径'] },
  image: { file: 'gen-image.mjs', desc: '配图生成（banner/social/xhs）', ask: null },
};

const run = (name, args) => {
  try {
    execFileSync(process.execPath, [join(HERE, SCRIPTS[name].file), ...args], { stdio: 'inherit' });
  } catch (e) {
    process.exit(e.status ?? 1);
  }
};

const [cmd, ...rest] = process.argv.slice(2);

if (cmd && SCRIPTS[cmd]) {
  run(cmd, rest);
} else if (cmd) {
  console.error(`不认识「${cmd}」。子命令：${Object.keys(SCRIPTS).join(' / ')}`);
  process.exit(2);
} else {
  // 极简 TUI
  console.log('flacier — 宣发工具\n');
  const keys = Object.keys(SCRIPTS);
  keys.forEach((k, i) => console.log(`  ${i + 1}. ${k.padEnd(6)} ${SCRIPTS[k].desc}`));
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const pick = (await rl.question('\n选一个（数字或名字，回车退出）: ')).trim();
  const name = SCRIPTS[pick] ? pick : keys[Number(pick) - 1];
  if (!name) { rl.close(); process.exit(0); }
  const spec = SCRIPTS[name];
  const args = [];
  if (spec.ask) {
    for (const q of spec.ask) {
      const a = (await rl.question(`${q}: `)).trim();
      if (a) args.push(a);
    }
  } else {
    const a = (await rl.question('参数（照脚本用法，如 --preset social --title x）: ')).trim();
    if (a) args.push(...a.split(/\s+/));
  }
  rl.close();
  run(name, args);
}
