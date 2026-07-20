# 配图（封面 / banner / social preview / 流程图）

一套做法：**SVG 手写或脚本生成 → `rsvg-convert` 导 PNG → Read 那张 PNG 自查**。SVG 是源（可改字改色），PNG 是交付物。生成后必须自己看一遍图——文字出框、间距不齐、比例错都靠看，别只信代码。

## 尺寸表（错了会被平台裁）

| 用途 | 尺寸 | 比例 | 去哪 |
|---|---|---|---|
| GitHub README banner | 2560×800 | 3.2:1 | README 顶部（传 GitHub 附件，repo 不放 assets） |
| GitHub social preview | 1280×640 | 2:1 | 仓库 Settings → Social preview，分享卡片用 |
| 小红书封面 | 1242×1660 | 3:4 竖版 | 首图=点击率，大字报「效果词+适用人群」 |
| 推特配图 | 1200×675 | 16:9 | 挂原生图/视频比纯文字互动高 |

## 视觉语言（rust-rewrite 那套已验证，可参数化复用）

- 深底 `#0d1117 → #11161d` 渐变 + 细描边 `#ffffff` 6% 透明。
- 一个产品一个主色（rust-rewrite 用 Rust 橙 `#ff6b35`），全图只这一个 accent。
- 等宽字体 `ui-monospace, SFMono-Regular, Menlo`（技术产品的可信度锚）。
- 流程胶囊：深填充 `#161b22` + accent 50% 描边，**六个一套规格**，终点用绿 `#3fb950` 区分。
- 底部一行硬数字（真实的，标清来源）。
- 命令行框：圆角深框 + `$` 绿提示符，命令整体居中（SVG 里空格会被折叠，`$` 和命令之间用 `dx` 加间距，别用空格字符）。

## 生成

```bash
node tools/gen-image.mjs --preset social --title rust-rewrite \
  --subtitle "Rewrite a codebase into Rust the way Bun did." \
  --accent "#ff6b35" --pipeline "classify>draft>gate>proper>swarm>green" \
  --stats "535,496 lines · 11 days · 64 agents"
# 产物写到 /tmp，报出 svg + png 路径；要精修就改 svg 再手动 rsvg-convert
```

预设：`banner`（2560×800）/ `social`（1280×640）/ `xhs`（1242×1660 竖版大字报）。脚本管排版和比例，审美决策（配色、文案、要不要吉祥物）还是人来。产品吉祥物这类独有元素在导出的 SVG 上手工加。

## 自查清单（Read 导出的 PNG 逐条看）

- [ ] 文字没顶到框边（左右留白对称）
- [ ] 同类元素同规格（胶囊等高、间距均匀）
- [ ] 只有一个 accent 色
- [ ] 数字是真的、来源标得清
- [ ] 缩到手机宽度看，标题还认得出

## 流程图 / 架构图

GitHub README 里用**原生 mermaid**（`flowchart LR`），别贴图——可维护、跟主题。配色跟上面一致：节点 `fill:#161b22,stroke:<accent>`，终点 `fill:#0f2417,stroke:#3fb950`。博客/长文里嵌不了 mermaid 的场合才导 SVG。
