# dotfiles

用 [chezmoi](https://www.chezmoi.io) 管理可迁移的本机静态配置。

- **source 仓库**（配置的真相）：`~/WorkSpace/Fldicoahkiin_Github/chezmoi`，路径由 `~/.config/chezmoi/chezmoi.toml` 指定。
- **target**（实际生效）：`$HOME`。
- **远端**：`github.com/Fldicoahkiin/dotfiles`。

无论仓库可见性如何，都不明文保存密钥。敏感文件使用 `chezmoi add --encrypt`，或在模板里从密码管理器读取。

## 管理边界

chezmoi 只管理人为维护、需要跨机器迁移的静态文件。不要把应用运行目录整体加入仓库：

- 管理：`~/.gitconfig`、`~/.codex/AGENTS.md`，以及后续逐项确认过的配置。
- 不管理：认证文件、API key、会话、日志、缓存、SQLite、设备状态、临时文件。
- 不要递归添加整个 `~/.codex` 或 `~/.claude`。
- 独立 skill 只有在需要单独发布或复用时才建立自己的仓库；安装入口和静态配置仍由 dotfiles 记录。

当前纳管列表以 `chezmoi managed` 为准，不以目录是否存在 Git 仓库为准。

## 心智模型

```
家目录 $HOME  ──add──▶  source(~/WorkSpace/.../chezmoi)  ──push──▶  GitHub
     ▲                          │
     └────────apply─────────────┘
```

文件名编码（source 里这样存，apply 后还原）：`dot_zshrc` → `~/.zshrc`；`*.tmpl` → 模板；`private_*` → 权限 0600；`encrypted_*` → 加密。

## 安装

```bash
brew install chezmoi
```

其他平台使用 chezmoi 官方发布的 package，并校验 release checksum；不要直接执行未经检查的远端 shell 脚本。

## 新机器拉起

```bash
brew install chezmoi
mkdir -p ~/WorkSpace/Fldicoahkiin_Github
git clone https://github.com/Fldicoahkiin/dotfiles.git ~/WorkSpace/Fldicoahkiin_Github/chezmoi
chezmoi -S ~/WorkSpace/Fldicoahkiin_Github/chezmoi init
chezmoi diff
chezmoi apply -v
```

私有仓库需要先配置 GitHub HTTPS 或 SSH 认证。`init` 会根据仓库中的 `.chezmoi.toml.tmpl` 生成本机配置；机器特有值继续保存在 `~/.config/chezmoi/chezmoi.toml`，不进入 Git。

## 纳入管理（add）

```bash
chezmoi add ~/.zshrc                  # 单个文件
chezmoi add ~/.gitconfig ~/.config/starship.toml
chezmoi add -r ~/.config/nvim         # 递归整个目录
chezmoi add --template ~/.gitconfig   # 作为模板纳入（需按机器区分时）
chezmoi add --encrypt ~/.ssh/config   # 加密纳入（敏感文件，需先配 age/gpg）
```

## 查看 / 应用

```bash
chezmoi diff             # 看 apply 会改什么
chezmoi apply -v         # 落地到 $HOME
chezmoi apply -n -v      # dry-run，只看不改
chezmoi status           # 哪些文件有差异
chezmoi managed          # 列出所有被管理的路径
chezmoi unmanaged        # 列出 $HOME 里还没纳管的文件
```

## 编辑

```bash
chezmoi edit ~/.zshrc           # 改 source（不要直接改家目录里的）
chezmoi edit --apply ~/.zshrc   # 改完立即 apply
chezmoi re-add                  # 手改过家目录后，把改动吸回 source
chezmoi cd                      # 进 source 仓库（exit 退出）
```

## 同步（git）

```bash
# 拉取：先审查，再应用
git -C ~/WorkSpace/Fldicoahkiin_Github/chezmoi pull --ff-only
chezmoi diff
chezmoi apply -v

# 提交：只提交明确文件
chezmoi git -- status
chezmoi git -- diff
chezmoi git -- add dot_codex/AGENTS.md dot_gitconfig.tmpl
chezmoi git -- commit -m "..."
chezmoi git -- push
```

`chezmoi update -v` 等于拉取后立即应用，适合已经稳定的配置；需要审查差异时使用上面的分步链路。`chezmoi cd` 可以进入 source 仓库后直接使用 Git。

## 移除

```bash
chezmoi forget ~/.zshrc    # 不再管理，但保留家目录里的文件
chezmoi destroy ~/.zshrc   # 从 source 和家目录都删（危险，先想清楚）
```

## 模板 / 多机器差异

- 模板文件后缀 `.tmpl`，用 Go template 语法。
- 每台机器自己的变量放 `~/.config/chezmoi/chezmoi.toml` 的 `[data]`（**此文件不进仓库**）：
  ```toml
  [data]
  email = "you@example.com"
  machine = "personal"
  ```
- 内置变量：`{{ .chezmoi.os }}`（darwin/linux/windows）、`{{ .chezmoi.hostname }}`、`{{ .chezmoi.arch }}`。
- 条件示例（`dot_zshrc.tmpl` 内）：
  ```gotmpl
  {{- if eq .chezmoi.os "darwin" }}
  # 只在 mac 生效
  {{- end }}
  ```
- 只给某些机器的整文件：模板化 `.chezmoiignore`（反逻辑——"不是这台就忽略"）：
  ```gotmpl
  {{- if ne .machine "work" }}
  .config/work-only.conf
  {{- end }}
  ```
- 调试模板：
  ```bash
  chezmoi data                          # 看所有可用变量
  chezmoi cat ~/.gitconfig              # 看模板渲染后的结果
  chezmoi execute-template < file.tmpl  # 直接试某段模板
  ```

## 密钥处理（本库 public，务必）

```bash
chezmoi add --encrypt <file>   # 加密纳入，存成 encrypted_，apply 时解密（需先配 age 或 gpg）
```
或在模板里从密码管理器取值（1Password / Bitwarden 等），apply 时拉取。已纳入的文件里**不要写明文 token/key**。

## 自动化脚本（顺带管软件安装）

放在 source 仓库里，apply 时按规则执行：

- `run_once_*.sh.tmpl`：只跑一次（如装 Homebrew 包）。
- `run_onchange_*.sh.tmpl`：脚本内容变了才重跑。
- 例：`run_onchange_before_install-packages.sh.tmpl` 里 `brew bundle --file=...`。

## 诊断

```bash
chezmoi doctor          # 检查环境/配置是否正常
chezmoi source-path     # 打印 source 目录路径
chezmoi target-path ~/.zshrc
chezmoi --version
```
