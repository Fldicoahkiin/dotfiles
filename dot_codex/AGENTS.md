# Global Rules

## Instruction Precedence

- Repository-local instructions override this file: `AGENTS.md`, `CLAUDE.md`, `justfile`, `Cargo.toml`, `package.json`, formatter/linter configs.
- When prose documentation conflicts with code or build scripts, trust the executable. Briefly note the mismatch.

## Language

- Respond in Chinese throughout.
- Keep proper nouns in English: API, CLI, JSON, shell, prompt, tool, etc.
- Engineer tone: direct, calm, precise. No hype or self-congratulation.
- Banned words in replies, comments, commits, and PRs — EN: "critical", "essential", "comprehensive", "robust", "seamless", "powerful", "elegant", "leverage", "delve", "in conclusion". ZH: 「至关重要」「核心」「全面」「强大」「优雅」「赋能」「打磨」「精心」.

## Method

- Think first: state assumptions; surface competing interpretations instead of silently picking one; push back when a simpler way exists. If ambiguity would materially change the result, stop and ask. Trivial tasks can skip this ceremony.
- Surgical: every changed line traces to the request. Do not touch adjacent code or formatting; match existing style. Mention unrelated dead code instead of deleting it. Remove only orphans created by the current change.
- Goal-driven: turn vague tasks into verifiable criteria. Every bug fix starts with a failing reproduction test, then is made to pass. For multi-step tasks, state a brief plan and pair each step with a verification check.

## Simplicity First

- Write the minimum code that solves the requested problem.
- Do not add speculative features, abstractions, flexibility, or configurability.
- Do not add error handling for impossible scenarios.
- If an implementation is substantially longer than necessary, simplify it.

## Safety

- Never use `rm` in any form.
- Never read credential directories such as `~/.ssh/`, `~/.aws/`, or `~/.gnupg/`.
- For deletion, use `trash` or confirm before any destructive action.

## Robustness

- `#[allow]`, `eslint-disable`, `noqa`, `type: ignore`, and `@ts-ignore` hide failures instead of fixing them. Resolve the root cause. The exception is FFI with an attached explanation.
- Propagate errors to a boundary such as `main`, a handler, CLI, or tool entry, and handle them once. Do not silently replace cross-boundary errors with defaults.
- Validate untrusted input once at the boundary, then rely on established types and guards.

## Code Consistency

- No simplification of features, data shape, or architecture intent without explicit approval.
- Modify in place. Never create renamed "new version" files or symbols.
- Banned suffixes and prefixes: `_enhanced`, `_improved`, `_v2`, `_fixed`, `_new`, `_better`, `_optimized`, `_refactored`, and Chinese equivalents.
- Avoid generic domain names such as `Manager`, `Handler`, `Helper`, `Util`, `Service`, `Processor`, `Engine`, `Wrapper`, `Base*`, and `Abstract*`.
- Use domain-first naming and preserve the project's established vocabulary.
- No prompt artifacts in identifiers, comments, commit messages, or replies.
- Extract domain magic numbers to named constants and add a comment stating their origin. Never discard them.
- Follow the Rule of Three: tolerate duplication at two occurrences and consider extraction at three or more. New abstractions must eliminate real duplication.
- Do not add speculative `pub` or `export`; a new public item needs a real caller in the same commit unless the public API is the deliverable.

## Comments

- Say what the current code does. Explain why only for non-obvious logic or domain constraints.
- Do not narrate a refactor or compare with an older version.
- Do not add comments to untouched code.

## Architecture

- In registry-, descriptor-, or capability-driven codebases, extend existing tables and wiring points. Do not scatter special cases.
- For user-owned JSON, TOML, or YAML configuration, make minimal non-destructive edits. Preserve unknown fields, ordering, comments, and unrelated sections.
- No silent fallbacks across tool or provider boundaries. Prefer explicit errors or logs.
- Network and process calls must have timeouts. Do not let external instability pollute the build path.

## Validation

Post-change order:

1. If the repository defines a `justfile`, use `just fmt` and `just lint`, or the equivalent targets.
2. Otherwise use language defaults:
   - Rust: `cargo fmt` and `cargo clippy --workspace --all-targets --all-features -- -D warnings`.
   - Frontend: the repository's package-manager lint, typecheck, and build scripts.
3. Verify frontend changes in the browser. A passing build is not sufficient.

Fix warnings at the root. Do not suppress them unless an FFI boundary requires a documented exception.

## Frontend

- Default package manager: `pnpm`. If the repository has an explicit `packageManager` field, `.npmrc`, or lockfile, follow it instead.
- No emoji as icons; use an icon library such as `lucide-react`.
- One component, one responsibility. Split a component when it exceeds 300 lines or five `useState` calls.
- Keep state at the smallest scope that needs it. Use `useReducer` for related state with transition-heavy updates.
- Do not define `const renderXxx = () => <JSX />` inside component bodies.
- List keys must be semantic unique values such as an id, name, or slug, never an array index.
- Compute derived values during render instead of mirroring them into state.
- No `any` or `as any`. Explicit casts require a concrete reason.

## Git

- Use Conventional Commits. One commit should contain one revertible logical change; split mixed concerns with partial staging.
- Mark breaking changes with `!` after the type, for example `refactor!: remove legacy module`.
- Commit when the requested change is ready. Never add `Co-Authored-By` or AI attribution.
- Never push unless explicitly asked.
- After changes, run `git diff`, show `git add` commands grouped by logical change, and provide the commit message as plain multiline text rather than a shell command.
