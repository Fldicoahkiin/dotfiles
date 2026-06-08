# Global Rules

## Language

- Respond in Chinese. Keep proper nouns in English: API, CLI, JSON, shell, prompt, tool, etc.
- Tone: direct, calm, precise. Banned words in replies, comments, commits, PRs — EN: "critical", "essential", "comprehensive", "robust", "seamless", "powerful", "elegant", "leverage", "delve", "in conclusion". ZH: 「至关重要」「核心」「全面」「强大」「优雅」「赋能」「打磨」「精心」.

## Method

- Think first: state assumptions; surface competing interpretations instead of silently picking one; push back when a simpler way exists; unclear → stop, name what's confusing, ask. Trivial tasks: skip the ceremony.
- Surgical: every changed line traces to the request. Don't touch adjacent code or formatting; match existing style even if you'd do it differently. Unrelated dead code → mention, don't delete. Remove only orphans your own change created.
- Goal-driven: turn vague tasks into verifiable criteria; every bug fix starts with a failing repro test, then made to pass; loop until they hold. Multi-step tasks: state a brief plan, each step paired with its verify check (`step → verify`).

## Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## Safety

- Never use `rm` in any form. For deletion use `trash`, or confirm before any destructive action.
- Never read credential dirs: `~/.ssh/`, `~/.aws/`, `~/.gnupg/`, etc.

## Robustness

- `#[allow]` / `eslint-disable` / `noqa` / `type: ignore` / `@ts-ignore` are anaesthetic, not fixes. Resolve the root cause. Exception: FFI with an explanation comment.
- Errors propagate to a boundary (main / handler / CLI / tool entry) via `?`, handled once. No mid-pipeline `match err => default` swallowing.
- No over-defensive code. Validate untrusted input once at the boundary, then trust it inward — don't re-check what the type system or an upstream guard already guarantees.

## Code Consistency

- Modify in-place. Never create renamed "new version" files or symbols. Banned suffixes: `_enhanced`, `_improved`, `_v2`, `_fixed`, `_new`, `_better`, `_optimized`, `_refactored` (and ZH equivalents).
- Banned generic names: `Manager`, `Handler`, `Helper`, `Util`, `Service`, `Processor`, `Engine`, `Wrapper`, `Base*`, `Abstract*`. Name things in domain terms.
- Rule of Three: tolerate duplication at 2 occurrences, consider extraction at 3+. Default to inline when unsure.
- No speculative `pub`/`export` — a new public item needs a real caller in the same commit. Exception: a library's public API is the deliverable.
- Don't drop features, data shape, or architecture intent without explicit approval.

## Comments

- Say what the code does; explain *why* only for non-obvious logic or domain constraints. No refactor narration. Don't comment untouched code.

## Architecture

- Registry-/descriptor-/capability-driven codebases: extend existing tables and wiring points, don't scatter special cases.
- User-owned config (JSON/TOML/YAML): minimal, non-destructive edits. Preserve unknown fields, ordering, comments.
- No silent fallbacks across tool/provider boundaries — explicit errors or logs.
- Network and process calls need timeouts.

## Validation

- After changes: if a `justfile` exists, use `just fmt` / `just lint`. Else — Rust: `cargo fmt` + `cargo clippy --workspace --all-targets --all-features -- -D warnings`; Frontend: the repo's lint/typecheck/build scripts.
- Verify frontend changes in the browser — build passing is not enough. Fix warnings at the root.

## Frontend

- Package manager: `bun`, fallback `pnpm` — unless repo config (`packageManager` field, lockfile, `.npmrc`) says otherwise.
- No emoji as icons (use lucide-react). No `any`/`as any` without a concrete reason.
- Split a component at >300 lines or >5 `useState`. State at smallest scope. List keys: semantic ids, never array index. Derived values computed at render, not mirrored into state.

## Git

- Conventional Commits. One commit = one revertible logical change; split mixed concerns (`git add -p`). Breaking: `!` after type.
- Never add `Co-Authored-By` or any AI attribution. Never push unless asked. Commit body uses `-` bullets.
- After changes: `git diff` → output `git add` grouped by logical change → commit message as plain multiline text, never as a shell command.
