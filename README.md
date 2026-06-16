# dotfiles

用 [chezmoi](https://www.chezmoi.io) 管理本机配置。

- **source 仓库**（配置的真相）：`~/.local/share/chezmoi`，也就是这个 git 仓库本体。
- **target**（实际生效）：`$HOME`。
- **远端**：`github.com/Fldicoahkiin/dotfiles`（public）。

> ⚠️ 本库公开，**绝不明文存密钥**。敏感文件用 `chezmoi add --encrypt` 加密，或在模板里从密码管理器取。

## 心智模型

```
家目录 $HOME  ──add──▶  source(~/.local/share/chezmoi)  ──push──▶  GitHub
     ▲                          │
     └────────apply─────────────┘
```

文件名编码（source 里这样存，apply 后还原）：`dot_zshrc` → `~/.zshrc`；`*.tmpl` → 模板；`private_*` → 权限 0600；`encrypted_*` → 加密。

## 安装

```bash
brew install chezmoi                      # macOS
sh -c "$(curl -fsLS get.chezmoi.io)"      # 无 brew 时
```

## 新机器一键拉起

```bash
chezmoi init --apply Fldicoahkiin
# 等价显式写法：
chezmoi init --apply https://github.com/Fldicoahkiin/dotfiles.git
```

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
chezmoi update -v               # = git pull + apply（拉取并应用远端最新，最常用）
chezmoi git -- status
chezmoi git -- add .
chezmoi git -- commit -m "..."
chezmoi git -- push
# 或：chezmoi cd 进仓库后正常用 git，完了 exit
```

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
