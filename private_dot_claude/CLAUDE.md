# Global Rules

## Instruction Precedence

- Repository-local instructions override this file: `AGENTS.md`, `CLAUDE.md`, `justfile`, `Cargo.toml`, `package.json`, formatter/linter configs.
- When prose documentation conflicts with code or build scripts, trust the executable. Briefly note the mismatch.

## Language

- Respond in Chinese throughout.
- Keep proper nouns in English: API, CLI, JSON, shell, prompt, tool, etc.
- Engineer tone: direct, calm, precise. No hype, no self-congratulation.

## Safety

- Never use `rm` in any form.
- Never read credential dirs: `~/.ssh/`, `~/.aws/`, `~/.gnupg/`, etc.
- For deletion, use `trash` or confirm before any destructive action.

## Code Consistency

- No simplification of features, data shape, or architecture intent without explicit approval.
- Modify in-place. Never create renamed "new version" files or symbols.
- Banned suffixes/prefixes: `_enhanced`, `_improved`, `_v2`, `_fixed`, `_new`, `_better`, `_optimized`, `_refactored`, and Chinese equivalents.
- Domain-first naming. Preserve the project's established vocabulary.
- No prompt artifacts in identifiers, comments, commit messages, or replies.
- Magic numbers from domain knowledge: extract to named constants, add a comment on origin. Never discard.
- No speculative abstractions. New abstractions must eliminate real duplication, not anticipated duplication.

## Comments

- Say what the current code does. Explain why only for non-obvious logic or domain constraints.
- No narration of the refactor or comparison with the previous version.
- Don't add comments to untouched code.

## Architecture

- In registry-, descriptor-, or capability-driven codebases, extend existing tables and wiring points. Don't scatter special cases.
- For user-owned config files (JSON, TOML, YAML): minimal, non-destructive edits. Preserve unknown fields, ordering, comments, and unrelated sections.
- No silent fallbacks across tool or provider boundaries. Prefer explicit errors or logs.
- Network and process calls must have timeouts. Don't let external instability pollute the build path.

## Validation

Post-change order:

1. Check if the repo defines a `justfile` — if yes, use `just fmt` and `just lint` (or equivalent targets).
2. Otherwise use language defaults:
   - Rust: `cargo fmt` + `cargo clippy --workspace --all-targets --all-features -- -D warnings`
   - Frontend: the repo's package manager lint, typecheck, build scripts
3. Verify in browser after frontend changes. Build passing is not enough.

Zero warnings policy: fix at the root. Never suppress with `#[allow(...)]` unless FFI with explanation attached.

## Frontend

- Default package manager: `bun`, fallback `pnpm`. If the repo has an explicit package manager config (`packageManager` field, `.npmrc`, lockfile), follow that instead.
- No emoji as icons — use an icon library (e.g. lucide-react).
- One component, one responsibility. Split when > 300 lines or > 5 `useState`.
- State at the smallest scope that needs it. Related transition-heavy state → `useReducer`.
- No `const renderXxx = () => <JSX/>` inside component bodies.
- List keys: semantic unique values (id / name / slug), never array index.
- Derived values computed at render time, not mirrored into state.
- No `any` or `as any`. Explicit casts require a concrete reason.
- Fix lint warnings at root; don't suppress with comments.

## Git

- Conventional Commits format.
- Breaking changes: `!` after type, e.g. `refactor!: remove legacy module`.
- Commit when ready; never add `Co-Authored-By` or any AI attribution to commit messages.
- Never push unless explicitly asked.
- Commit body uses `-` bullet points, not paragraph prose.
- After changes: run `git diff` → output `git add` commands grouped by logical change → output commit message as plain multiline text, never as a shell command.
