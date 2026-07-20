# apple-l10n-zh

A Claude Code / Agent Skill for translating macOS & iOS app UI strings into **Simplified Chinese (zh-Hans)** using Apple's official terminology and the Xcode String Catalog (`.xcstrings` / `.xcloc` / `.xliff`) workflow.

## Install

With [`npx skills`](https://github.com/vercel-labs/skills) (no clone needed):

```bash
npx skills add Fldicoahkiin/apple-l10n-zh
```

Or install globally, targeting Claude Code:

```bash
npx skills add Fldicoahkiin/apple-l10n-zh -g -a claude-code
```

Then invoke it in Claude Code with `/apple-l10n-zh`, or let it trigger automatically when you edit `.xliff` / `.xcstrings` files or ask for an Apple-conventional Chinese term.

## Contents

- `SKILL.md` — workflow, hard rules, validation
- `reference/terminology.md` — English → Apple-official zh-Hans glossary
- `reference/pitfalls.md` — traps where the obvious translation is wrong (系列 vs 序列, 文稿 vs 文档, …)
- `reference/sources.md` — authoritative references (Apple Style Guide, String Catalog docs, zh-CN guides)
- `scripts/inject_targets.py` — bulk `<target>` injection + placeholder-parity validation

Built to the [Agent Skills](https://code.claude.com/docs/en/skills) spec.
