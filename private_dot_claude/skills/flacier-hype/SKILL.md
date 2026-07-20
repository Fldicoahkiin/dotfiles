---
name: flacier-hype
description: Flacier 个人专属的产品宣发 skill。当 Flacier 要为自己的项目（aghub、rust-rewrite 等）做宣发——写小红书、LinuxDo、小黑盒、即刻、知乎、公众号、B站、抖音、Reddit、推特/X、Product Hunt、GitHub README 的文案，做封面图/banner/social preview 配图，建官网落地页，出 demo 视频口径时使用。多平台差异化文风、去 AI 味、克制但到位的独立开发者调性。触发词：宣发、推广、炒作、发小红书、发帖、文案、launch、release note、readme 文案、官网、落地页、建站、封面图、配图、social preview、demo 视频。
---

# flacier-hype

Flacier 的私人宣发 skill。目标：既要流量，又要独立开发者的真诚。取舍原则一句话——**克制的是姿态，不是钩子**。

## 宣发流程（每步只加载该步的文件，别一次全读）

| 步 | 干什么 | 用什么 |
|---|---|---|
| 0 定主线 | 过两道闸：底料够不够、观点是哪一件事。**没料拒绝写** | [argument-spine.md](references/argument-spine.md) + `references/products/<产品>.md` |
| 1 写稿 | 每个平台一篇，稿子头部标自标签：`主线 / 钩子类型 / 选题 / 语气档·钩子档` | 该平台卡 + [voice-dna.md](references/voice-dna.md) + [dial-system.md](references/dial-system.md)，句子门槛 [say-human.md](references/say-human.md) |
| 2 质检 | 机械 → 诊断 → 整波，三道全过才算过 | `node tools/lint.mjs` + `node tools/platform-check.mjs` + [review.md](references/review.md)（写完才加载） |
| 3 配图 | 封面 / banner / social preview / 流程图 | [visual.md](references/visual.md) + `node tools/gen-image.mjs` |
| 4 建站 | 落地页/官网：vite + bun + CF Pages，push 即部署 | [platforms/website.md](references/platforms/website.md)（文案分区仍看 [serious.md](references/platforms/serious.md)） |
| 5 视频 | 出分镜/旁白口径，制作交给独立 skill | [demo-video-skill](https://github.com/Fldicoahkiin/demo-video-skill)（B站/抖音卡的脚本结构是它的输入） |
| 6 发布节奏 | 先发哪、后发哪、哪些主阵地哪些捞边际流量 | 平台清单 + 各平台卡的发布窗口 |

日常单平台按需走 0→1→2（+3）；集中宣发那波走全流程，一次产全平台包。

## 分层铁律（从下往上，过不了下层就别谈上层）

**最高层 — 先有观点**：读 [argument-spine.md](references/argument-spine.md)。这一篇要让人信的**那一个观点**是什么？观点住在 `products/<产品>.md` 的「要说的那一件事」里，写哪个产品用哪条。结构 = 观点的展开，不是套路拼装；没有观点先别写。

**Layer 0 — 说人话（句子硬门槛）**：读 [say-human.md](references/say-human.md)。像不像一个具体的人、在这个场景、随口说这件事。机械雷（词表）由 `tools/lint.mjs` 管，判断雷靠读。**过不了 Layer 0，后面全不算数。提高钩子只能靠更具体的真事。**

**Layer 1 — 声音是 Flacier**：读 [voice-dna.md](references/voice-dna.md)。三人团队 + 个人视角（aghub），个人项目第一人称；技术诚实到会自己拆台，具体数字代替抽象拔高。

**Layer 2 — 事实只从产品底料取**：数字、卖点、链接、边界一律查 `references/products/<产品>.md`，不临场编。没有的标「待补」。每宣发一个新产品，先建它的底料文件。

**Layer 3 — 平台档位**：见 [dial-system.md](references/dial-system.md)。档位只在「已经像人」的空间里调。

## 两个尺度：语气 和 钩子

**语气**（话说得多收）和**钩子**（开头抓不抓人）分开看，各平台默认档位见 [dial-system.md](references/dial-system.md)。Flacier 整体语气偏低（收着），钩子偏高（选题必须狠）。

## 平台清单

每个平台一份文风卡在 `references/platforms/`，写该平台时**只读对应那一份**（连同 voice-dna + dial-system）。

- **主阵地（认真经营）**：[小红书](references/platforms/xiaohongshu.md)、[LinuxDo](references/platforms/linuxdo.md)、[小黑盒](references/platforms/xiaoheihe.md)、[即刻](references/platforms/jike.md)、[B站](references/platforms/bilibili.md)、[抖音](references/platforms/douyin.md)
- **正经三件套**：[Product Hunt / GitHub README / 官网 Landing](references/platforms/serious.md)，建站落地看 [website.md](references/platforms/website.md)
- **批量捞边际流量**：[知乎](references/platforms/zhihu.md)、[公众号](references/platforms/gongzhonghao.md)、[Reddit](references/platforms/reddit.md)（复用改写也要过反 AI 味）
- **推特/X**：[twitter.md](references/platforms/twitter.md) —— aghub 由 AkaraChen（@object_nullll）发（他的产品）；Flacier 自己的项目用第一人称自己发

参考账号打法见 [reference-accounts.md](references/reference-accounts.md)。原始平台调研留档在 `references/_research/`。

> B站 / 抖音卡带**视频脚本结构**（钩子、节奏、时长、标题封面）——它们是 [demo-video-skill](https://github.com/Fldicoahkiin/demo-video-skill) 的输入：这边出分镜/旁白，那边录制合成。

## 工具（机械活交脚本，判断留给人）

```bash
node tools/lint.mjs <稿件.md>                    # 反 AI 味机械检查，词表以脚本为准
node tools/platform-check.mjs <平台> <稿件.md>    # 平台硬约束 pass/warn/fail
node tools/gen-image.mjs --preset social|banner|xhs --title ... # 配图生成，产物在 /tmp
```

装成命令也行：仓库根 `npm install -g .` 后，`flacier lint/check/image` 直通上面三个，裸跑 `flacier` 进交互菜单。

## 发稿前 checklist

- [ ] **有主线吗？** 每段第一句连起来是一条论证线吗？没有那个「你真信的观点」贯穿就重写
- [ ] **两个脚本跑了吗？** lint 命中修了没，platform-check 有没有 ✗
- [ ] **过 [review.md](references/review.md) 三道了吗？** 机械 → 诊断 → 整波（同一个梗别出现在超过 2 个平台）
- [ ] 钩子到位吗？标题/首句单拎出来，路人会不会停？——靠具体真事，不是情绪词
- [ ] 事实/链接都来自产品底料吗？竞品的负面断言每条都背得住吗？
- [ ] 发布前给 Flacier 过目——**永不自动发**
