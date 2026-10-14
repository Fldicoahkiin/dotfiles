# Global Rules

A project's own CLAUDE.md / AGENTS.md overrides conflicting defaults here.

## Language

- Tone: direct, calm, precise. Banned words in replies, comments, commits, PRs — EN: "critical", "essential", "comprehensive", "robust", "seamless", "powerful", "elegant", "leverage", "delve", "in conclusion". ZH: 「至关重要」「核心」「全面」「强大」「优雅」「赋能」「打磨」「精心」.

## Method

- Smallest change that completes the request: every changed line traces to it. No unrequested features, abstractions, or configurability. Don't touch adjacent code or formatting; match existing style even if you'd do it differently. Unrelated dead code → mention, don't delete. Remove only orphans your own change created.
- Make routine implementation choices yourself. Ask only when different readings of the request would lead to materially different work, or when scope or authorization is unclear; meanwhile continue with whatever doesn't depend on the answer. If the request looks mistaken or a simpler way exists, say so in a sentence.
- Bugs: reproduce the failure before fixing, then verify the fix against that reproduction. Keep it as a regression test when it protects real behavior; visual or environment bugs may need a browser reproduction instead.
- Report what was actually tested and what remains unverified.
- When the advisor tool is available, consult it before committing to a large plan, when the same error recurs, and before declaring a long task done.

## Safety

- Never use `rm` in any form; delete with `trash`.
- Never read credential dirs: `~/.ssh/`, `~/.aws/`, `~/.gnupg/`, etc.

## Code

- `#[allow]` / `eslint-disable` / `noqa` / `type: ignore` / `@ts-ignore` are anaesthetic, not fixes. Resolve the root cause. Exception: FFI with an explanation comment.
- Errors propagate to a boundary (main / handler / CLI / tool entry) and are handled once. No swallowing an error into a default mid-pipeline; no silent fallbacks across tool/provider boundaries — explicit errors or logs.
- Validate untrusted input once at the boundary, then trust it inward — don't re-check what the type system or an upstream guard already guarantees.
- Modify in place; no renamed copies of files or symbols (`_v2`, `_new`, `_fixed`, …).
- Name things in domain terms rather than generic roles (`Manager`, `Helper`, `Util`, `Wrapper`, …), unless the framework or surrounding code requires the name.
- Rule of Three: tolerate duplication at 2 occurrences, consider extraction at 3+. Default to inline when unsure.
- No speculative `pub`/`export` — a new public item needs a real caller in the same commit. Exception: a library's public API is the deliverable.
- Don't drop features, data shape, or architecture intent without explicit approval.
- Registry-/descriptor-/capability-driven codebases: extend existing tables and wiring points, don't scatter special cases.
- User-owned config (JSON/TOML/YAML): minimal, non-destructive edits. Preserve unknown fields, ordering, comments.
- Network and process calls need timeouts.
- Comments: say what the code does; explain *why* only for non-obvious logic or domain constraints. No refactor narration. Don't comment untouched code.

## Validation

- Run the repository's own checks for what changed: `just fmt` / `just lint` when a `justfile` defines them, otherwise its lint/typecheck/build scripts. Don't rerun a check that already passed unless something changed since.
- Verify changed UI behavior in the browser — build passing is not enough. Fix warnings at the root.

## Frontend

- Package manager: follow repo config (`packageManager` field, lockfile, `.npmrc`); otherwise `bun`, fallback `pnpm`.
- No emoji as icons — use the project's icon library (lucide-react in a new React project). No `any`/`as any` without a concrete reason.
- Split a component when its size or state makes it hard to follow, not at a fixed line count.

## Git

- Conventional Commits. One commit = one revertible logical change; split mixed concerns (`git add -p`). Breaking: `!` after type.
- Never add `Co-Authored-By` or any AI attribution. Never push unless asked. Commit body uses `-` bullets.
- After changes: `git diff`, then `git add` grouped by logical change and commit directly with a plain multiline message. Still never push unless asked.
- Before any GitHub write, verify `gh api user --jq .login` returns `Fldicoahkiin`; don't write from another account.
