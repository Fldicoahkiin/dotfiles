<!-- 语气 2/3 · 钩子 2/3 -->

# aghub · serious 三件套成稿

主线：配置是你的。工具应该帮你把它配好、配稳，而不是接管它、替你保管。
三处统一定位到「增量编辑，不接管你的配置」，事实句替形容词。

---

## ① Product Hunt

### Tagline（51 字符，无 emoji、无夸张词）

```
Configure 22+ AI agents without giving up your config
```

（副标题位放品牌 slogan：`One hub for every AI coding agent`。备选 tagline，50 字符：`Edit your AI agent configs — never hand them over`。）

### Maker first comment（英文，ownership 角度）

> Hey Product Hunt,
>
> I'm Flacier, one of three people behind aghub.
>
> I run Claude Code, Cursor and Codex on the same projects most days. To keep their configs straight I tried a switcher, and it managed them by taking over: it kept the real config in its own database, treated that as the source of truth, and rewrote `settings.json` and `config.toml` in full on every switch. The file in my directory was just an output it overwrote.
>
> After a while I realized I no longer owned my own config. The environment variables I set in my shell stopped taking effect, because Claude Code only read what the tool wrote. I couldn't see what it had changed — the config lived in its database, not in a file I could open and diff. Plugins, MCP servers and permissions I'd added by hand and never imported would quietly go missing on the next switch.
>
> This is the design talking, not one bad release: hold the config, overwrite the files. And a held config is one you're trusting something else to keep safe. I didn't want to trust it. I wanted to hold my own config.
>
> So aghub does the opposite. It reads the config files you already have and edits only the entries you name; everything else stays exactly as it was. It writes no global state, registers no handler, runs no background process. Every change is a diff you can read, and deleting an entry leaves nothing behind. It's a Rust CLI plus a Tauri desktop app, open source, covering 22+ agents right now.
>
> If you juggle more than one coding agent, I'd like to hear where it breaks for you. Repo's linked below.
>
> — Flacier, with @AkaraChen and 〔待补：第三位队友 handle〕

（Open Source tag，挂 GitHub 链接。gallery 首图 = 能独立说清是什么的截图，尾图 = 安装 CTA。）

---

## ② GitHub README 第一屏

```markdown
# aghub

**One hub for every AI coding agent — it edits your config, it never takes it over.**

[![stars](https://img.shields.io/github/stars/akarachen/aghub)](https://github.com/akarachen/aghub/stargazers)
[![release](https://img.shields.io/github/v/release/akarachen/aghub?include_prereleases&label=release)](https://github.com/akarachen/aghub/releases)
[![build](https://img.shields.io/github/actions/workflow/status/akarachen/aghub/ci.yml)](https://github.com/akarachen/aghub/actions)
[![last commit](https://img.shields.io/github/last-commit/akarachen/aghub)](https://github.com/akarachen/aghub/commits/main)
[![license](https://img.shields.io/github/license/akarachen/aghub)](https://github.com/akarachen/aghub/blob/main/LICENSE)

aghub is a Rust + Tauri tool — a CLI and a desktop app — for managing configuration across 22+ AI coding agents (Claude Code, Codex, Cursor, Gemini, OpenCode, Zed…). It reads the config files you already have and edits only the entries you name, leaving everything else exactly as it was. Every change is a diff you can read; deleting an entry leaves nothing behind.

![aghub screenshot](docs/assets/app_screenshot.png)

## Why?

I run several AI coding agents daily, and keeping their configs in sync was the annoying part. The switcher I tried did it by taking over: it held the real config in its own database and treated that copy as the source of truth. The first time I ran an audit through aghub, it surfaced an MCP server I'd added months earlier and forgotten — something the switcher had been silently dropping on every switch, because anything I hadn't imported into its database didn't exist to it.

Once a tool holds your config, it stops being yours. Environment variables set in your shell no longer take effect. You can't diff what actually changed, because the truth is in a database, not a file. A held config is one you're trusting something else to keep safe.

aghub doesn't hold your config — it edits it in place. It touches only the entries you specify, writes no global state, registers no handler, and runs no background process. The files stay yours; aghub just helps you keep them in order.
```

（badge 只留信任向，build 指向已有的 `.github/workflows/ci.yml`。feature 用表格不用 bullet，右列写真实价值——沿用现 README 的表格化方向。）

---

## ③ 官网 Landing hero

**Headline**（9 词，≤10）
```
It edits your config. It never takes it over.
```

**Subheadline**（≤25 词）
```
aghub changes only the entries you name across Claude Code, Codex, Cursor,
Gemini and 18+ more — every other line stays exactly as you wrote it.
```

**主 CTA（单一）**
```
Install the CLI
```
（次 CTA，不与主竞争：`Get the desktop app`）

**社会证明 kicker**
```
Works with 22+ agents · Open source · Edits in place, deletes clean
```

**问题区（紧跟 hero，第二人称）**
```
You run Claude Code, Cursor and Codex — and the last switcher you tried
rewrote your settings.json from a copy it kept in its own database.
```

（feature 分区各配真实截图：① 增量编辑，只改你指定的条目、其余不动、每次变更可 diff → ② MCP 一次配置到全平台 + 跨 agent 审计 → ③ 可移植 Skills（.skill / SHA-256 校验 / skills.sh 市场）→ ④ BYOM，给 Claude / Codex / OpenCode 各自单独选 provider 和模型，key 存 OS 钥匙串 → ⑤ Claude Code 插件市场。涉及本轮新功能处 〔待补：本轮新功能〕。）
