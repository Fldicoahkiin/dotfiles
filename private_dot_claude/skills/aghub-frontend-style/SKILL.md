---
name: aghub-frontend-style
description: aghub 桌面前端（crates/desktop）编码规约——React 19 + HeroUI v3 + Tailwind v4 + Tauri v2 的本仓库实际风格。写或改 crates/desktop/src 下任何 .tsx/.ts，做 UI/组件/数据请求/状态/i18n/路由时加载。
---

# aghub 前端编码规约

适用于 `crates/desktop/src/`。栈：React 19 + TypeScript 6 + HeroUI v3 + Tailwind CSS v4 + Tauri v2，包管理 **bun**（禁 npm/yarn/pnpm）。

## 改完必须验证

```bash
cd crates/desktop
bun run typecheck     # tsc，strict + noUnusedLocals/Parameters
bun run lint          # eslint --fix（@antfu + @eslint-react + better-tailwindcss）
```
格式由仓库根 `./.prettierrc` 决定：**tab 缩进、tabWidth 4、printWidth 80、双引号、带分号、trailingComma all**。不要手动调格式，交给 prettier。

职责分离：**格式归 prettier、ESLint 只管逻辑规则**（eslint 配置 `stylistic:false`）。别往 eslint 加样式类规则。

## 数据层范式（最一致的骨架，优先遵守）

三层，新代码必须照此分层：
1. `src/lib/api.ts`：`createApi(baseUrl, token)` 返回按资源分组的 ky 方法对象（`agents/skills/mcps/...`）。ky 在 `beforeError` 把后端 `{ error }` body 提到 `error.message`；慢接口显式给 `timeout`。
2. `src/requests/<resource>.ts`：把请求包成工厂函数 `xxxQueryOptions(...)` / `xxxMutationOptions(...)`（用 `queryOptions`/`mutationOptions`），参数走解构对象 `{ api, queryClient, onSuccess? }`。失效逻辑集中成 `invalidateXxxQueries(queryClient)`。
3. query key 全部在 `src/requests/keys.ts` 的 `queryKeys` 嵌套对象里，每个是 `() => [...] as const` 工厂，分 `all()/lists()/list(scope, projectRoot)/detail(...)` 层级，按前缀失效。

组件里：`const api = useApi()` → `useQuery(skillListQueryOptions({ api }))`。

- 本地持久化数据（store）也包一层 react-query（key 用普通数组如 `["projects"]`），用 `setQueryData` 乐观更新后再 `await save`。
- DON'T：组件内联裸 `useQuery({ queryKey, queryFn })`；DON'T：手写请求类型——用生成的 DTO。

## React 19 与 effect 纪律

- **取数不用 `useEffect`**，用 react-query。**派生状态不用 effect**，用 `useMemo` 在 render 期算。**事件**命名 `handleXxx`。
- `useEffect` 只留给真正的外部订阅：`invoke` 启后台服务、`window.addEventListener`/`matchMedia`、deep-link、driver.js——且都返回 cleanup。
- 需要重置子状态时，优先 **lazy initial state**（`useState(() => ...)`）+ 父层给组件加 `key={...}` 重挂载，而不是 effect 同步。
- 复杂多态状态用 `useReducer`，别堆一堆相互依赖的 `useState`。
- context：`contexts/<name>.tsx` 放 `createContext` + value 类型 + props 类型 + 抛错守卫 `useXxxContext`；`providers/<name>.tsx` 放实际 Provider。用 React 19 写法：`use(Context)` 取值、context 直接当 provider（`<ServerContext value={...}>`，**不写 `.Provider`**）。
- 项目装了 **React Compiler**（自动 memoization）。**不要为"防重渲染"手写 `useMemo`/`useCallback`**——编译器接管了；`useMemo` 只用于派生值语义或确需稳定引用时。render 阶段副作用（如 redirect）若被 react-compiler lint 拦，让位于 lint 用 effect，但默认方向是"能不用 effect 就不用"。
- 多态 UI 用**判别联合**（`type Step = FeatureStep | WhatsNewStep | ConsentStep`）+ 纯函数 `buildXxx(ctx)` 构造序列，组件按 `step.type` 渲染，别堆相互依赖的 boolean 标志位。

## 状态与持久化

- 持久化用 Tauri `@tauri-apps/plugin-store`，**状态不引 zustand**（持久化靠 plugin-store，不是状态库；immer 只在个别组件用 `produce` 做局部不可变更新）。`src/lib/store/index.ts` 单例 `Store.load("store.json")`；每个 slice 一个文件导出 async `getXxx/saveXxx`，写完 `await s.save()`。
- `src/lib/store.ts` 是 **barrel**，re-export `lib/store/*` 各 slice；消费方统一 `from "../lib/store"` 引多个 `getXxx/saveXxx`，不直接 import 具体 slice 文件。新 slice 记得挂到 barrel。
- store 结构变更必须加版本迁移：`src/lib/store/migrations/vN-to-vN+1.ts` 一支一文件，`migrations/index.ts` 按 `version <` 串行执行，更新 `store/types.ts` 的 `CURRENT_VERSION`。
- URL 状态用 nuqs `useQueryState`（选中项、tab 放 query string）。`NuqsAdapter` 已在 `App.tsx` 挂好。
- 纯局部 UI 状态就地 `useState`，不要为它引全局 store。
- 表单用 react-hook-form `useForm` + `Controller`，`mode: "onSubmit"` / `reValidateMode: "onChange"`，配 HeroUI `Form validationBehavior="aria"` + `FieldError`，校验消息走 `t(...)`。

## 路由

- 用 **wouter**：`<Router>` 包 `<Switch>` + `<Route path=...>`，页面放 `pages/`、default export、集中在 `App.tsx` 注册。编程式跳转 `const [, setLocation] = useLocation()`；外壳统一 `layouts/main-layout.tsx`。

## HeroUI v3 与样式

- 做任何 UI 前先取 HeroUI v3 API：用 `heroui-react` skill（`.heroui-docs/` 本地可能缺失，别依赖它）。你记忆里的 HeroUI v2 知识对本项目是错的。
- 全部用 **compound components**（点号子组件）：`Modal.Backdrop/Container/Dialog/Header/Heading/Body/Footer`、`Card.Content/Title/Description`、`Tabs.List/Tab/Indicator/Panel`、`Switch.Control/Thumb`、`Tooltip.Trigger/Content`。不用 v2 的 flat props，不需要 `HeroUIProvider`，不用 framer-motion。
- Modal / Card / Surface / Input / 次要按钮加 `variant="secondary"` 提升对比。
- 颜色只用语义 token 类：`text-muted` / `text-danger` / `border-border` / `bg-surface-secondary` / `text-foreground/50` / `bg-accent/10`。**禁硬编码色阶**（`default-200`/`default-600` 这类要换成 `separator`/`muted`），**禁纯黑纯白**。语义 token 定义在 `src/styles/theme.css`。
- 条件类名用 `cn`（`src/lib/utils.ts`，= `twMerge(clsx(...))`），写法 `cn("基础类", cond && "覆盖类")`。**禁用模板字符串拼 className**。`cn` 用**相对路径** import（`from "../lib/utils"`）——本仓库**没有 `@/` 别名**。
- 告警/错误/状态块用设计系统组件（`Alert`、`Button`…），**不手搓 `<div className="border-warning/30 bg-warning/10">`**。

## 错误处理

- 统一走 HeroUI `toast`：`toast.success(t(...))` / `toast.danger(t(...))`（`Toast.Provider` 已全局挂载，勿重复添加）。成功/失败写在 mutation 的 `onSuccess`/`onError`，取消息用 `error instanceof Error ? error.message : String(error)`。
- 批量操作（部分成功部分失败）：用 `onSettled` 或在 `onError` 分支里先 `invalidateXxxQueries` 再 toast，**不能让抛错跳过 `onSuccess` 把成功结果吞掉并停止刷新列表**。
- DON'T：`{error && <div>{error.message}</div>}` 内联错误渲染。路由级渲染错误交给 `components/ui/error-boundary.tsx`（已包在每个 Route，勿重复包）。

## 文件组织、命名、TS

- 文件名一律 **kebab-case**（`agent-card.tsx`、`use-skill-install.ts`），无例外。
- 组件一律 `export function Name()`，路由页 `export default function`；**禁箭头函数组件**（`const X = () => ...`）。hook 导 `useXxx`。
- props 类型用 `interface XxxProps`（不用 `type`），紧贴组件、**不导出**（只有 context props 例外）。逻辑重的页面把 state+mutation+handler 抽进 colocated hook（`use-xxx-actions.ts` / `use-xxx.ts`），组件只渲染。
- 复用组件 named export 放 `components/`；路由页 default export 放 `pages/`；跨页 hook 放 `hooks/`，页面专属 hook 放页面子目录 `hooks/`。纯函数 helper 抽同目录 `*-helpers.ts`（不带 JSX）。
- 命名用领域词，禁 `Manager/Service/Handler/Helper` 泛化名。
- TS：类型导入一律 `import type`；`strict` 全开；**禁 `any`**，不确定用 `unknown`。**尽量不用 `as` 断言绕类型**（`item as XxxResponse`）——优先修类型定义或 `unknown` + 收窄。生成的 DTO 从 `../generated/dto` 只做 type-only import，字段是 snake_case（`source_path`），**照用不改名，且不手改 `generated/`**。
- Tauri 插件用顶部静态 ESM `import`，**禁 `await import("@tauri-apps/...")` 动态导入**。Tauri `invoke<T>("cmd", args)` 直接在调用点写，只用于原生命令；HTTP 业务一律走 ky/react-query，不走 invoke。

## i18n

- i18next + react-i18next，bundle 在 `src/lib/locales/{en,zh-Hans,zh-Hant}.ts`，扁平 `key→string`。组件里 `const { t } = useTranslation()`，key 用 **camelCase 语义化**（`subAgentCreated`、`validationProjectNameRequired`），插值 `t("detectedVia", { sources })`。
- **所有用户可见文案**（含 toast、校验消息、aria-label）都过 `t()`，不硬编码；三个 locale 文件同步加 key。

## 复用优先

- 写新功能前先查现有 crate / 前端是否已具备该能力，**优先复用，别在新位置复制一份实现**。
- DTO/model 只保留有实际消费方的字段，**不为"可能用得上"预留**。
- 重复逻辑抽 hook（如 `use-multi-select`），重复组件合并，大文件按职责拆分，store 模块化。定期用 knip / react-doctor 扫死代码再删。
- 能用平台原生/库标准件就别自造（如用 Tauri 原生窗口而非自绘标题栏）。
- 小工具优先自实现、不为一个小函数拉 dep（如 semver 比较自己写）；纯数据/纯函数放**无 React import** 的 `lib/*.ts`，与组件渲染分离。
