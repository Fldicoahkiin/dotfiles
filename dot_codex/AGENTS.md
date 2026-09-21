# Global defaults

Repository and subdirectory AGENTS.md files override conflicting defaults here. Follow executable project configuration when prose is stale, and note the mismatch. Keep model, reasoning, sandbox, approval, MCP, and feature settings in ~/.codex/config.toml.

## Working style

- Be direct, calm, and precise. Avoid promotional language. Banned words: "critical", "essential", "comprehensive", "robust", "seamless", "powerful", "elegant", "leverage", "delve", "in conclusion"; 「至关重要」「核心」「全面」「强大」「优雅」「赋能」「打磨」「精心」.
- Make the smallest change that completes the request. Preserve existing conventions, user edits, features, and data contracts. Avoid speculative features and abstractions.
- Resolve ordinary implementation choices yourself. Ask when missing information changes scope, authorization, or the intended outcome; continue independent work meanwhile.
- Complete implementation, relevant verification, and fixes within the authorized scope. Report what was actually tested and what remains unverified.

## Files and code

- Never use `rm`; use `trash` for deletion. Never read credential directories such as ~/.ssh, ~/.aws, or ~/.gnupg.
- Preserve unknown fields, ordering, and comments in user-owned configuration. Do not overwrite unrelated changes.
- Modify existing code in place. Use domain-specific names; follow framework naming where required. Avoid renamed copies with suffixes such as `_enhanced`, `_improved`, `_v2`, `_fixed`, `_new`, `_better`, `_optimized`, or `_refactored`.
- Extend existing registries and capability tables. Do not add public APIs without an actual caller, except when the library API itself is the deliverable.
- Fix causes instead of suppressing diagnostics. Explain unavoidable FFI exceptions. Do not silently swallow errors or switch providers; report failures at the appropriate boundary. Give network and process calls timeouts.
- Comments explain non-obvious constraints or behavior; omit narration and comments on untouched code.

## Verification

- Use repository-defined checks. If a justfile defines fmt/lint recipes, use them. Otherwise use the project's language and package scripts; keep project-specific commands in its AGENTS.md.
- For a bug, establish a failing reproduction and verify the fix. Automate the regression when it protects meaningful behavior; a visual or environment issue may need a browser reproduction.
- Verify changed UI behavior in the browser. Use relevant lint/typecheck/build checks for code changes. Do not repeat successful checks unless another change, failure, or unresolved concern warrants it.
- Prefer deterministic tests for known behavior. Use `jev-browser` for bounded DOM-based browser exploration and E2E execution; retain a reasoning model for planning, code changes, failure diagnosis, and unsupported native or visual interactions. Report a Jev blocker before switching execution methods.

## Frontend defaults

- Follow packageManager, lockfiles, and repository configuration; otherwise prefer bun, then pnpm.
- Use the project's icon library instead of emoji icons; prefer lucide-react in a compatible new React project. Avoid `any` or `as any` without a concrete reason.
- Keep state at its smallest scope; compute derived values during render. Use stable semantic list keys. Split components by responsibility when their size or state makes them hard to follow.

## Skill dependencies

- Keep one installed copy of each upstream skill. Reference its name and GitHub source; load only the parts needed for the current task.
- A link does not install a dependency. When a required skill is missing, retrieve its entrypoint and necessary references or scripts outside auto-discovered skill directories. Use pinned refs when reproducibility matters, and report unavailable dependencies.

## TypeSafe credentials

- For authorized Jev/TypeSafe work, use an existing `TYPESAFE_API_KEY` first. Otherwise, on macOS read only the Keychain item with service `typesafe.ai` and account `TYPESAFE_API_KEY`. If that item does not exist, or on other platforms, load `~/.config/typesafe/.env` (the user's home directory on every platform). This is a scoped exception to the credential-directory restriction above.
- Capture credentials directly into the execution process; never print them, open the .env in a preview, or copy them into a repository. A locked/denied Keychain read is a blocker, not permission to bypass it. The .env is plaintext, owner-only on macOS/Linux; when rotating the key, update both stores explicitly.

## Cloudflare

- Production Workers must connect to their GitHub repository and deploy automatically from the production branch. Direct deployment is for initial verification or incident response; establish the Git connection before handoff. Align the name in wrangler.jsonc with the connected Cloudflare project.

## Git

- Use Conventional Commits; one commit per revertible logical change. Mark breaking changes with `!`. Commit bodies use `-` bullets; add no Co-Authored-By trailer or AI attribution.
- After repository changes, inspect the diff, stage only the intended changes, and commit. Never push unless asked.
- Use `Flacier <Flacier@outlook.com>` as the author. Before any GitHub write, verify `gh api user --jq .login` returns `Fldicoahkiin`; do not write using another account.
