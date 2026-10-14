---
name: aghub-frontend-style
description: Repository-specific frontend rules for the aghub Tauri desktop app in crates/desktop. Use when creating, changing, debugging, or reviewing React/TypeScript UI, HeroUI components, Tailwind styles, interaction behavior, motion, queries, local state, routing, forms, accessibility, or i18n under crates/desktop/src.
---

# aghub Desktop Frontend

Apply these rules to `crates/desktop/src/`. The stack is React 19, strict
TypeScript, HeroUI v3, Tailwind CSS v4, Tauri v2, TanStack Query, and `bun`.

## HeroUI source of truth

- Read `crates/desktop/package.json` and the lockfile before choosing component
  anatomy. The current repository baseline is HeroUI 3.2.2 and React Aria
  Components 1.19.0.
- Match the official HeroUI documentation and release notes to the installed
  version, then inspect the installed JavaScript, declarations, and CSS when
  rendered semantics or default spacing remain ambiguous.
- Treat `.heroui-docs/react/` as an optional local cache. If it is absent or
  stale, use the official online documentation and report the mismatch. Do not
  rely on remembered beta APIs or installation examples.

## Resolve the local context first

1. Read the nearest `AGENTS.md`, `.impeccable.md`, executable config, and the
   sibling components at the same DOM level.
2. Treat executable config and installed package source as the final word when
   prose is stale. Report the mismatch.
3. Fetch the matching HeroUI v3 docs with the local `heroui-react` skill before
   writing or changing a HeroUI component. Confirm ambiguous behavior against
   the installed package rather than remembered v2 or earlier v3 anatomy.
4. Inspect the rendered accessibility tree and computed styles. Passing
   TypeScript is not visual or interaction verification.

The product is a dense desktop tool for developers managing agent
configuration. Keep it precise, calm, compact, and transparent about state.
Use structure, alignment, typography, and hairlines before decoration. Follow
the neutral palette and existing accent tokens in `src/styles/theme.css`;
avoid warm coziness, marketing layouts, ornamental copy, and Apple-like
softness. `.impeccable.md` and the current theme disagree about the accent hue,
so do not encode a hue in new rules until the configuration is reconciled.

## Work in a fail-first loop

For every UI bug or interaction regression:

1. Reproduce it in the real page and compare a correct sibling at the same
   hierarchy.
2. Add a focused failing test before the implementation change.
3. Scan the affected page for visual slop, classify hits by intent, and report
   the confirmed issues before editing.
4. Make the smallest change that fixes the ownership or component mistake.
5. Verify behavior, keyboard access, reduced motion, light/dark appearance,
   and the actual desktop viewport.

Prefer role/name assertions. Use computed-style assertions for hover and
background regressions. Guard compound controls against nested interaction
with assertions such as `[role="button"] button` having count zero.

## Surface ownership and page layout

- Let `MainLayout` own the app canvas. It uses a secondary Surface.
- Use the established page shell: `h-full overflow-y-auto`, then a centered
  width-constrained content container with `p-4 sm:p-6` when the page is a
  document-like overview. Match the nearest sibling's `max-w-*`; do not widen
  a single tab or route without a content reason.
- Treat `Tabs.Panel` as the content shell. Compare every sibling panel before
  styling one. When Appearance uses one default Card inside its panel, give a
  settings-heavy sibling one default Surface or Card at the same level; do not
  leave one panel on the secondary canvas while another has an entity surface.
- Use `Surface` for a section-level background/context. Use `Card` for a
  bounded object or independently actionable entity. A layout wrapper is not
  automatically a Card.
- Use Surface variants by layer: `transparent` inherits the parent canvas,
  `default` owns the primary entity layer, `secondary` separates a subordinate
  region, and `tertiary` is reserved for another real nested level.
- Keep one visible surface per region. Inside it, group related settings with
  spacing and `divide-*` or `border-*` hairlines. Keep a nested surface only
  for a genuinely separate object such as a preview, embed, or drag replica.
- Put form controls inside a default Surface on HeroUI's `secondary` field
  variant. This includes `Input`, `Select`, `TextField`, and `NumberField`.
- Use `min-w-0` on shrinking flex/grid children and `shrink-0` only on controls
  that must retain their hit target. Use `Tabs.ListContainer` for overflow;
  it already supplies scroll affordances.
- Space by relationship. Keep labels close to their descriptions and use a
  larger step between settings groups. Do not use one gap token everywhere.
- Preserve primary labels at compact desktop widths. Reduce the responsive
  grid column count or wrap secondary metadata before truncating the label;
  verify the narrowest supported desktop viewport without horizontal overflow.

## Interaction ownership

- Give each target one primary action. If a row navigates, its chevron alone
  expands. If a drag region moves an item, visibility/delete actions are
  sibling buttons outside that drag region.
- Put page-wide or panel-wide actions at that owning level. Do not place a
  global reset beside update/install actions in the first subsection merely
  because it appears first.
- Do not nest interactive semantics. Never place a `button`, link, or another
  `[role="button"]` inside an interactive parent. Stopping propagation does not
  repair invalid semantics.
- Prefer HeroUI controls over hand-built equivalents. Use `Toolbar` for a real
  action group and `isAttached` when the group needs one surface. Use
  `ButtonGroup` only when actions form one control; keep independent actions as
  separate Buttons.
- Use the compound Tooltip anatomy: `Tooltip`, `Tooltip.Trigger`, and
  `Tooltip.Content`, with `Tooltip.Arrow` only when it improves targeting. In
  HeroUI 3.2.2, the default Trigger renders a `div role="button"`; wrapping an
  interactive Button creates nested semantics and two focus targets. For an
  interactive trigger, use the Trigger's polymorphic `render` prop to render
  the one actual control while forwarding its props and ref, or omit the
  Tooltip. Assert that the result has one focus target and no nested button.
- Use `onPress` for HeroUI actions. Use native `onClick` only on intentional
  native elements that cannot be expressed by the library without losing
  semantics.
- Give icon-only actions localized `aria-label` text and a Tooltip when the
  icon is not self-explanatory. Keep the visible icon from Heroicons or an
  existing project icon source; do not use emoji.
- Use Tauri's OS-owned file and folder pickers, native system capability
  prompts, and native alerts for simple OS-owned confirmations. Use HeroUI for
  product operations that need application-managed pending, error, recovery,
  or partial-success states.
- Use the platform's primary modifier for shortcuts (`Meta` on macOS,
  `Control` elsewhere) and the existing platform helpers for displayed labels
  or OS-specific behavior.
- Keep `data-tauri-drag-region` free of interactive descendants. Window
  controls and other actions must remain outside the draggable hit area.

## Hover, focus, disabled state, and motion

- Add hover only to enabled interactive affordances. Non-interactive rows and
  disabled controls must not react to pointer hover.
- Do not add `cursor-pointer` to ordinary desktop rows or Buttons. Use grab and
  grabbing cursors only on the region that actually drags.
- Express row hover with a small semantic surface/color change. Do not fade the
  row, scale it, lift it, glow it, or use `transition-all`.
- Transition only the property that changes, normally color, opacity, transform,
  or `grid-template-rows`, using the project duration/easing variables.
- Preserve focus-visible feedback and keyboard behavior. Do not remove a focus
  ring unless an equal or clearer project-token replacement exists.
- Prefer HeroUI's own enter/exit and pending behavior. Do not add a second FLIP,
  spring, or route fade on top of library motion.
- Animate physical drag/reorder movement when it helps track the object. Keep
  click actions immediate. Rotate only the pending refresh icon through the
  Button `isPending` render state.
- A full fixed-slot layout uses insertion semantics: insert at the hovered
  position, shift following fields, and move only the final overflow field to
  the hidden drawer. Project the result before release; do not ambiguously
  replace the hovered field. Test a right-column target, full capacity, cancel,
  release, and the keyboard path.
- Keep pointer edge auto-scroll available whenever a compatible target can lie
  outside the actual scrollport, including wide but short desktop windows. Do
  not enable or disable it from a responsive breakpoint alone. When a
  side-by-side canvas would otherwise scroll too eagerly, narrow the threshold
  to the scrollport edge and verify both a normal desktop viewport and a wide,
  short viewport. Configure keyboard-sensor scrolling separately; use
  `scrollBehavior: "auto"` for immediate desktop movement and test offscreen
  target reachability. Give every droppable slot a stable identity and
  geometry. Resolve pointer targets from current slot rectangles and keyboard
  targets from directional compatible slots. The live projection, accessible
  announcement, and committed drop must agree. Prefer the live layout
  projection over a post-drop ghost animation; never leave two drag overlays
  visible between consecutive moves.
- Honor `prefers-reduced-motion`. No bounce, hover growth, decorative pulse, or
  full-page transition.

## HeroUI v3 rules

- Use compound anatomy from the fetched docs. Tabs use
  `Tabs.ListContainer`, `Tabs.List`, `Tabs.Tab`, an optional `Tabs.Separator`,
  `Tabs.Indicator`, and sibling `Tabs.Panel` elements. `Tabs.ListContainer`
  owns overflow chevrons and fades in HeroUI 3.2.2; do not add a parallel
  manual scrolling implementation.
- Compose selection controls explicitly. In HeroUI 3.2.2, Switch, Checkbox,
  and Radio use their documented `*.Content` parts alongside their controls
  and indicators. Do not translate a v2 flat-prop example into this codebase.
- Use `ToggleButtonGroup selectionMode="single"` with controlled
  `selectedKeys` for mutually exclusive visual choices such as choosing one
  version to retain. Use `ToggleButton` children with stable IDs; do not
  recreate single-selection keyboard and pressed semantics with plain Buttons.
- Use `Typography`, not the removed `Text` component name.
- Choose variants by context, not by blanket rule. Default Surface/Card creates
  the entity layer; secondary form variants reduce field elevation inside it;
  ghost Buttons are for low-emphasis actions; attached Toolbar owns its own
  group surface.
- For `NumberField`, default to the horizontal anatomy: DecrementButton,
  Input, then IncrementButton in one Group. The documented chevron example is
  an allowed vertical step-button layout when the surrounding control geometry
  calls for it. Use Intl `formatOptions` for units and percentages, align the
  Group with nearby 36px fields, and test usable hit targets, keyboard
  stepping, and narrow-width layout for either form.
- Use `ListBox.Section` for semantic groups and `ListBox.Item` for items. The
  installed theme and computed styles own row padding and gaps; do not copy
  spacing from a virtualizer example or add invisible wrapper indentation.
- Use semantic token classes such as `text-muted`, `text-danger`,
  `border-border`, `bg-surface`, `bg-surface-secondary`, and `bg-accent/10`.
  Do not hard-code framework color scales, pure black/white, gradients, tinted
  icon tiles, or one-hue status boxes.
- Pair foreground tokens with their actual surface. `text-accent-foreground` is
  for a solid accent fill; use `text-accent` or the soft-accent foreground on a
  translucent accent tint, and verify the computed contrast in light and dark
  themes.
- Use `cn` from `src/lib/utils.ts` for conditional classes. Import it with a
  relative path; this repository has no `@/` alias. Do not build class strings
  with template interpolation.
- Use the design-system Alert, Toast, Button, Surface, and other primitives
  instead of recreating their state visuals with generic divs.
- Mount one `Toast.Provider` at the application root. Report ordinary results
  through `toast`, and use `toast.promise` for an operation whose pending,
  success, and failure states share one lifecycle. A persistent pending toast
  may use `timeout: 0`; dismiss or replace it when the operation settles.

## React and state

- Fetch server state with TanStack Query, not `useEffect`.
- Derive state during render. Use `useMemo` for meaningful derivation or stable
  identity, not as a routine performance wrapper; React Compiler handles normal
  memoization.
- Reserve `useEffect` for external synchronization such as Tauri startup,
  window/media listeners, deep links, or third-party controllers. Return
  cleanup when the external system supports it.
- Keep local interaction state at the smallest owner. Use `useReducer` for one
  state machine rather than several coupled booleans. Use discriminated unions
  for polymorphic steps and pure builders for sequences.
- Keep one semantic owner for each setting. Other pages consume or link to that
  setting; they do not mirror another management UI.
- Treat persisted-setting hydration as an explicit state. Do not issue queries,
  enable controls, or persist defaults before the stored value has loaded.
  When a feature is disabled, gate both new queries and rendering of cached
  TanStack Query data.
- Reset child state with lazy initialization plus a semantic `key` when a full
  remount is the intended behavior. Do not synchronize derived child state with
  an effect.
- Use React 19 context syntax: `use(Context)` and `<Context value={...}>`.
  Separate context declarations from provider implementations as established in
  `contexts/` and `providers/`.

## Data access and persistence

For HTTP server state, keep the repository's three layers:

1. `src/lib/api.ts`: resource-grouped `ky` methods, error body promotion, and
   explicit timeouts for slow calls.
2. `src/requests/<resource>.ts`: named `queryOptions`/`mutationOptions`
   factories and centralized invalidation helpers.
3. `src/requests/keys.ts`: hierarchical query-key factories ending in
   `as const`.

Consume them as `useApi()` plus a named options factory. Use generated DTOs as
type-only imports and keep their snake_case fields. Never hand-edit
`src/generated/dto`; when Rust DTOs change, run `bun run generate:dto` and
commit the generated diff. Do not invent parallel request types.

Tauri/plugin diagnostics are local process state, not HTTP API methods. Keep a
one-off local query at the process boundary when it is truly local; extract a
named hook or options factory when reused. Never hide tool/provider failure
behind a silent fallback.

Persist user settings with `@tauri-apps/plugin-store`. Re-export store slices
through `src/lib/store.ts`, save after writes, and add a sequential versioned
migration whenever the stored shape changes. Use `nuqs` for URL-owned tab and
selection state. Do not add another global state library for local UI state.

## Errors, forms, routing, and i18n

- Report mutation results through the root `Toast.Provider` with HeroUI's
  `toast` methods. For a batch of independent operations, preserve successful
  items and run their invalidation even when another item fails.
- If one confirmation presents writes to multiple owners as an atomic
  operation, snapshot the prior state and compensate already-successful writes
  when a later write fails. Await the write and any compensation under one
  pending state. Block duplicate submits and dismissal while pending, close
  only after every write succeeds, and keep the dialog open with the failure
  reported otherwise. Preserve Escape dismissal while idle and disable
  keyboard dismissal only for the pending interval.
- Let the route error boundary handle render failures. Keep validation errors
  next to fields with HeroUI `FieldError`.
- Use react-hook-form plus `Controller` for non-trivial forms, HeroUI `Form`
  with `validationBehavior="aria"`, submit-time validation, and change-time
  revalidation after failure.
- Use wouter and register route pages in `App.tsx`. Use `nuqs` for query-string
  state and `useLocation` for navigation.
- Route every user-visible string, Toast, validation message, Tooltip, and
  `aria-label` through i18next. Add camelCase keys to `en.ts`, `zh-Hans.ts`, and
  `zh-Hant.ts` together.

## Files and TypeScript

- Use kebab-case filenames. Use default exports for route pages and named
  function exports for reusable components and hooks.
- Keep props interfaces beside the component and private unless another module
  has a real caller. Use domain names; avoid generic Manager, Handler, Helper,
  Service, Processor, or Wrapper names.
- Name internal event functions `handleXxx` and callback props `onXxx`. Comment
  current behavior; explain why only for a non-obvious platform or domain
  constraint. Do not narrate a refactor.
- Split a component when it exceeds 300 lines or owns more than five
  `useState` calls. Extract repeated derivation into a domain hook only when it
  has real shared callers. Do not create an abstraction for a single use.
- Use strict types, `import type`, semantic list keys, and `unknown` plus
  narrowing. Do not use `any`, `as any`, `@ts-ignore`, or index keys.
- Import Tauri plugins statically. Use `invoke<T>` for native commands and
  `ky`/TanStack Query for HTTP business calls.

## Repository exemplars

Use these `main` files as intent references, then check their current rendered
behavior and current HeroUI docs:

- `components/resource-group-section.tsx` (AkaraChen): separate navigation,
  expansion, selection, drag, and keyboard ownership.
- `e2e/list-interactions.spec.ts` (AkaraChen): lock interaction intent with
  role-based behavior tests.
- `components/resource-page-toolbar.tsx` and `components/app-sidebar.tsx`
  (danielchim): compact desktop alignment, shrinking content, fixed controls,
  and structural separators.
- `pages/home.tsx` and `components/agent-overview-card.tsx` (danielchim,
  refined by AkaraChen): width-constrained page rhythm, derived summaries,
  quiet loading states, and content-driven card height.

Do not copy an exemplar mechanically. Older call sites can retain outdated
Tooltip anatomy or nested interactive markup. Preserve the design intent while
letting live docs, semantics, and tests decide the implementation.

## Verify before handoff

Run checks proportional to the change:

```bash
cd crates/desktop
bun run typecheck
bunx eslint .
bun run format:check
bun run generate:dto # when Rust DTOs changed
bun run test:e2e -- <focused-spec>
bun run build
```

Also run repository `just fmt` / `just lint` when their configured tooling is
available. If a wrapper such as `nr` is unavailable, run the equivalent `bun`
command and report the configuration mismatch; do not silently skip the check.

Finish with `git diff`, a browser pass over the changed flow and its sibling,
keyboard navigation, reduced motion, and both themes. Fix new warnings at the
source.

Keep diagnostic screenshots in Playwright's per-test output directory with
`testInfo.outputPath()` or omit them when they are not assertions. Never make a
passing test create an untracked repository `artifacts/` directory. Run the
frontend formatter from `crates/desktop` and inspect the resulting diff; root
and package-local formatter versions can differ.

For DnD geometry assertions, read the stable droppable slot wrapper rather than
a child currently moving through a FLIP transition. Assert that preview,
accessible announcement, cancel rollback, and committed order agree.
