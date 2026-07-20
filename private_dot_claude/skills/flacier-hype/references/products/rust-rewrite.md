# 产品底料：rust-rewrite

文案的事实来源。写任何平台的稿都从这里取料——数字、卖点、链接、边界一律以此为准，不临场编。

> ⚠️ 数字大多来自 Bun 的真实重写，**标清「这是 Bun 的战绩」**，不能让人误以为是 rust-rewrite 这个 skill 自己跑出来的。skill 做的是把 Bun 的方法固化成可复用件。

## 一句话

把一个代码库从 Zig / C / C++ / Go / TS 重写成 Rust 的 Claude Code skill——内化了 Bun 自我重写用的那套真实多 phase 工作流。

## 要说的那一件事（主线，先有观点再写）

**值钱的不是「AI 会写代码」，是那套让 AI 不出错的护栏。** 测试当唯一裁判、最难的所有权先分类落表、每个文件被独立 agent 当成错的来审。Bun 把驱动这一切的 `.claude/workflows/*.js` 编排脚本公开在了 commit 里，我把它拆开、内化成一个能跑的 skill。一句话：**护栏 > AI 魔法。**

## 背景（不是开场）

2026 年 5 月，Bun（前端圈很火的 JS 运行时）用 Claude 把自己从 Zig 重写成 Rust，11 天、535,496 行、峰值 64 个 Claude 并行。博客 + commit 全公开。我扒了那个 commit 里的真实 workflow 脚本，内化成这个 skill。别从「AI 好厉害」开场——主线是护栏。

## 是什么

- Claude Code skill：`SKILL.md` + 9 个 references + workflow 脚本骨架。
- 真实 **7 phase**：classify → draft port → tier+gate → proper port → panic swarm → test swarm → unsafe audit。
- 内化的是 Bun 真实脚本的**逻辑和 prompt**（不是二手转述）——draft 带 stub、靠门控编译、proper port 破循环、swarm 收敛。

## 可晒的数字（都是 Bun 的，务必标清）

- 535,496 行 Zig → Rust · 11 天 · 6,502 commit
- 峰值 64 个 Claude（4 worktree × 16）
- ~16,000 编译错误跨 ~100 crate
- 972 个失败测试文件 → 0
- $165,000 API · 0 测试跳过/删除
- 11 类所有权 taxonomy · 1,386,826 个 `expect()`

## 差异化（最抓人的那点）

市面上已有**通用对抗 review skill**（`dementev-dev/adversarial-review`、`wan-huiyan/agent-review-panel`），但**没有「端到端 Rust 迁移管线」的 skill**。rust-rewrite 是完整迁移流程，对抗 review 只是第 3 步。
- **别吹「首个 AI Rust 重写工具」**——dynamic workflows 是通用能力、Bun 先例在前。
- 诚实且更稳的定位：**「把 Bun 公开验证过的那套方法，固化成你能直接跑的 skill」**。

## 能接住的质疑

- **「AI 迁移 = 一堆 unsafe 安全债」**（报道爱引「13,044 个 unsafe 块」）——skill 有 unsafe-audit phase（查 aliasing-UB、修法菜单、纪律约束），主动提这条反而显得想得周到。
- **二手报道数字乱**（960K / 6 天等）——一律以 blog 官方为准：535,496 / 11 天 / 6,502。

## 链接

- repo：https://github.com/Fldicoahkiin/rust-rewrite
- Bun 博客：https://bun.com/blog/bun-in-rust
- PR：https://github.com/oven-sh/bun/pull/30412
- 落地 commit：https://github.com/oven-sh/bun/commit/23427dbc12fdcff30c23a96a3d6a66d62fdc091d

## 配图（已做，`assets/` 本地，不进 repo）

- banner 2560×800（README 顶部，走 GitHub 附件）· social preview 1280×640（Settings）· icon（头像）。
- 视觉语言：深色 `#0d1117` + Rust 橙 `#ff6b35` + Ferris 渐变蟹 + `classify→draft→gate→proper→swarm→green` pipeline。

## 平台口径

- **推特/X**：Flacier 第一人称自己发（@F1acier），**不走** AkaraChen 的号（那是 aghub 的）。
- 已产出：[twitter.md](../../drafts/rust-rewrite/twitter.md)、[xiaohongshu.md](../../drafts/rust-rewrite/xiaohongshu.md)。

## slogan 候选

- Rewrite a codebase into Rust the way Bun did.
- 护栏 > AI 魔法：把 Bun 验证过的 Rust 迁移方法，做成能跑的 skill。
