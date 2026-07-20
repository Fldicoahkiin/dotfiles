# 官网 / 落地页 · 平台卡（建站模块）

serious.md 管 Landing 的**文案与分区**（headline/CTA/痛点区那套），这张卡管**把站建出来**：视觉判断、动效、栈、部署。核心跟文案同一条命：**别像模板、别像 AI 生成的站。**

## 开工先读场子（一行 Design Read）

写代码前先输出一行：「读成：给〈谁〉的〈产品类型〉落地页，〈调性〉，倾向〈手写 CSS / 某设计系统〉」。独立开发者工具站默认读成：**技术买家 / 克制 / vite + 手写 CSS + 真实截图**。

## 三个视觉刻度（默认档朝克制，别抄 agency 味）

| 刻度 | 默认 | 说明 |
|---|---|---|
| 结构变化 | 4-5 | 段落布局有变化但不炫技；Linear 那档，不是 Awwwards |
| 动效强度 | 2-3 | 入场 reveal + hover 反馈为主 |
| 信息密度 | 2-3 | 留白多，一屏一件事 |

## 反 AI 味视觉雷（两家独立来源收敛的真 tell，一票否决）

- AI 紫/青渐变、暗底发光 accent、gradient text
- cream/beige「假高级」底色
- **三等分 icon+标题+两行字的 feature 卡**（AI 首页默认布局）
- icon 方块叠在标题上方的卡片模板
- italic serif 巨标题 hero（AI 创业公司落地页统一脸）
- 每个 section 顶一个 uppercase eyebrow（上限 `ceil(段数/3)`）
- 卡片单侧粗色条边框、hairline 边框+大扩散阴影、超大圆角（≥24px 万物一软）
- 大数字+小标签+三个支撑数据+渐变点缀的 hero metric 布局
- bounce/elastic 缓动、图片 hover 放大
- 字体默认 Inter / Geist / Space Grotesk / Instrument Serif（挑一个有理由的，别用反射弧字体）
- 一致性锁：全站**一个 accent 色、一套圆角、一个主题**，不中途翻转

**真实视觉是硬约束**：hero 必须放真实产品截图 / demo GIF / 真终端录屏（serious.md 已要求），禁 div 拼假界面、禁纯文字装极简、禁 stock 图。

## 动效

- 默认近零：进场 reveal（IntersectionObserver 或 CSS scroll-driven）+ hover/active 反馈,就够了。
- **每个动画要能一句话说清它传达什么**（层级/反馈/状态切换），说不清就删。到处都动 = 业余。
- GSAP 只留给**至多一个招牌 scroll 时刻**（比如一段 sticky 展示核心卖点）。用则守纪律：react 用 `useGSAP()`，vanilla 用 `gsap.context()` + `ctx.revert()` 清理；禁 `window.addEventListener('scroll')`；只动 `transform`/`opacity`。GSAP 现在全插件免费。
- 不上 GSAP 的话纯 CSS 或 `motion` 足够，别为一个 fade 引大库。

## 栈 + 部署（钉死，不逐案挑）

**vite + bun + Cloudflare Pages，GitHub 连仓自动部署。**

Agent 做：
```bash
bun create vite <name>   # 默认 vanilla-ts；确有组件复杂度才上 react-ts
bun run build            # 产物 dist/，本地必须过
bun run preview          # 浏览器里看过再交
```
- 字体自托管（`@fontsource/*` 或 `@font-face` + `font-display: swap`），图片写死 width/height 防跳动。
- commit 用 Conventional Commits；**push 前给 Flacier 过目，绝不自动发**。

Flacier 做（一次性，之后 push = 自动部署，PR 自动出 preview）：
1. CF dashboard → Workers & Pages → 创建 Pages 项目 → **Connect to Git** 选仓库
2. Framework preset `Vite` · Build command `bun run build` · Output directory `dist`
3. （可选）绑自定义域

## 发站前 checklist

- [ ] Design Read 说过了吗，跟成品一致吗
- [ ] 雷清单逐条过（尤其三等分卡、AI 紫、eyebrow 数量）
- [ ] hero 是真实截图/录屏吗
- [ ] 动效每个都答得出「传达什么」吗
- [ ] 单一主 CTA（serious.md 的规矩）
- [ ] `bun run build` 过 + 浏览器里看过（手机宽度也看）
- [ ] 文案部分过了 lint + review（跟发稿一个标准）
