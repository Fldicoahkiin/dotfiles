<!-- 语气 3 / 钩子 3.5 | build in public，第一人称当下进行时。口径=交给 AkaraChen @object_nullll 发，极简英文、真诚 8:2、😇 点睛别滥用。正文零链接，链接放收尾 reply。angle=ownership：your config stays yours。首推配 GIF，thread 讲托管 vs 增量编辑。 -->

# X · aghub launch thread（交给 AkaraChen @object_nullll 发）

> 首推配 GIF：一个 config 文件，aghub 只改其中一行，文件其余部分逐字不动、一目了然。正文不放链接，链接放最后一条 reply。angle 是 ownership，不用别的平台的 MCP 段子开场。

---

**1/ （钩子推 · 配 GIF，不放链接）**

A tool that edits your config files can do one of two things: take them over, or leave them yours.

That single choice decides most of what the tool is.

aghub picks the second one. 🧵

`[GIF: aghub edits one line in a real config file — that line changes, every other line stays untouched]`

---

**2/ （托管这条路是什么样）**

The usual switcher takes them over. It pulls your provider config into its own database, treats that DB as the source of truth, and rewrites settings.json / config.toml in full on every switch.

The file sitting in your directory is just an output it overwrites.

---

**3/ （接管的后果，具体列）**

After that, you don't really own your config anymore.

Env vars you set in your shell stop counting. You can't diff what it changed — the real state lives in a DB, not text you can open. Plugins, MCP servers, permissions you wrote by hand and never imported can be gone after the next switch.

---

**4/ （aghub 怎么做的）**

aghub edits in place. It reads the config file you already have, changes only the entries you named, and leaves the rest byte-for-byte.

No global state, no handler it registers, nothing left running in the background. Every change is a diff. Remove an entry and there's zero residue.

---

**5/ （连实现都是这原则）**

Same idea all the way down to the code.

Each agent is one static AgentDescriptor — parsing, serializing, paths, capabilities, all hung off function pointers. Adding an agent is one new file plus one line in ALL_AGENTS. No special cases stuffed into the main path.

That's how it carries 22+ agents whose formats don't agree on anything.

---

**6/ （现在能拿到 · 软 CTA，链接放这条）**

Claude Code, Codex, Cursor, Windsurf, Copilot, Gemini, OpenCode, Zed, Warp, Cline, RooCode — 22+ and growing. CLI plus a Tauri 2 desktop app. Rust, cross-platform, open source.

If you'd rather your config stay a file you can open and diff, try it 😇

Repo, downloads, docs 👇
GitHub: github.com/akarachen/aghub
Site: aghub.akr.moe
brew install --cask akarachen/tap/aghub

---
---

# 日常单推（预热 / 非 launch 日，正文零链接）

Your config is a file you wrote. A tool that manages it should keep it that way — a file you can open, read, and diff.

aghub never pulls it into a database of its own. It reads what you have and edits the lines you asked for. Delete an entry, nothing lingers. 😇 #buildinpublic
