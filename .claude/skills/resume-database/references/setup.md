# 环境初始化

首次使用本skill，或换了电脑，按下面顺序执行。

**路径约定：**
- 文中的 `~/<agent>/skills/` 指skill的实际安装目录，`<agent>`是占位符，以安装命令的输出为准。例如Claude Code是 `~/.claude/skills/`。执行命令前先把占位符换成真实路径。
- 所有命令在**工作目录**（用户准备存放简历数据的目录）运行，不要在skill目录里运行，因为脚本里的`data/`是相对路径，会生成在当前目录下。

## 1. 检查Python版本

```bash
python --version
```

- 要求 3.9 及以上（`python-docx` 的下限）。低于 3.9 或命令不存在，先让用户安装 Python，不要自行安装
- Windows 下 `python` 不可用时试 `py -3 --version`，后面所有 `python` 都换成 `py -3`

## 2. 建立虚拟环境

虚拟环境放在工作目录的 `.venv`，只服务于当前工作目录，不动用户的全局 Python。

```bash
python -m venv .venv
```

激活（之后每次新开终端都要先激活）：

```bash
# Windows PowerShell
.venv\Scripts\Activate.ps1

# Windows Git Bash
source .venv/Scripts/activate

# macOS / Linux
source .venv/bin/activate
```

- `.venv`已存在则跳过创建，直接激活
- PowerShell 提示"禁止运行脚本"时，不要改用户的执行策略，改用 Git Bash，或不激活、直接调用 `.venv\Scripts\python.exe`
- 工作目录是git仓库且有 `.gitignore` 时，确认其中包含 `.venv/`，没有就提示用户加上

## 3. 安装依赖

| 包 | 用途 | 使用它的脚本 |
|---|---|---|
| `python-docx` | 把简历Markdown生成DOCX | `generate_resume.py` |
| `openpyxl` | 读写投递记录表 | `tracker.py` |
| `Pillow` | 仅在需要生成或处理证件照时用，脚本运行不依赖 | 无 |

```bash
python -m pip install python-docx openpyxl
```

- 已验证可用的版本：`python-docx 1.2.0`、`openpyxl 3.1.2`（Python 3.14）。需要固定版本时写成 `python-docx==1.2.0`
- 不要安装 `reportlab`，脚本里已经没有 PDF 兜底逻辑
- 生成PDF是可选功能，只有用户明确要求时才需要 LibreOffice，初始化阶段不检查

安装后检查：

```bash
python -c "import docx, openpyxl; print('依赖正常')"
```

## 4. 检查字体

简历的字体是 MiSans，字体文件在 `assets/fonts/`。`generate_resume.py` 只在 Word 里**指定字体名**，不会把字体嵌进 DOCX，所以**打开 Word 的那台电脑必须装了 MiSans**，否则 Word 会用替代字体，版式会变。

检查字体文件是否齐全：

```bash
ls ~/<agent>/skills/resume-database/assets/fonts
```

应有 `MiSans-Regular.otf`、`MiSans-Bold.otf` 等。如果用户的电脑没装：
- Windows：选中字体文件，右键"为所有用户安装"
- 让用户装好后重启 Word，再检查生成的DOCX

## 5. 初始化data目录

`data/` 在工作目录下，不放进skill安装目录。目录结构以 [SKILL.md](../SKILL.md) 的"Data目录结构"为准。初始化只创建必需的部分，其余按需创建（见[directory-structure.md](directory-structure.md)）：

1. 创建 `data/` 目录
2. 如果 `data/user_index.md` 不存在，从 [assets/templates/user_index.md](../assets/templates/user_index.md) 复制
3. 不预先创建 `interview_library/`、`experience_library/`，有内容时再建
4. 不预先创建用户目录，用户建档时再建（见[user-management.md](user-management.md)）

```bash
mkdir -p data
cp ~/<agent>/skills/resume-database/assets/templates/user_index.md data/user_index.md
```

- `data/` 已存在时不覆盖任何已有文件，只补缺的部分
- `data/` 里是用户的个人信息，提醒用户不要把它提交到公开仓库

## 6. 验证整条链路

用skill自带模板生成一份DOCX，确认环境能跑通。只在临时目录里做，做完删除，不要留在`data/`里：

```bash
python - <<'EOF'
import tempfile, pathlib, re, subprocess, sys
root = pathlib.Path("~/<agent>/skills/resume-database").expanduser()
text = (root / "assets/templates/resume_output_template.md").read_text(encoding="utf-8")
text = text.replace("[11位手机号，纯数字，不加-或空格]", "13800000000")
text = re.sub(r"^- 证件照：.*\n", "", text, flags=re.M)   # 模板里的证件照是占位说明，验证时去掉
with tempfile.TemporaryDirectory() as d:
    md = pathlib.Path(d) / "check.md"
    md.write_text(text, encoding="utf-8")
    sys.exit(subprocess.call([sys.executable, str(root / "scripts/generate_resume.py"), "--input", str(md)]))
EOF
```

看到 `DOCX created: ...` 即通过。报错按提示处理：
- `ModuleNotFoundError: docx`：第3步没装好，或没激活虚拟环境
- `Markdown 格式错误`：模板被改坏了，对照 [resume-writing.md](resume-writing.md) 的"脚本解析约束"

## 7. 之后的日常使用

- 每次新开终端先激活虚拟环境
- 生成简历：`python ~/<agent>/skills/resume-database/scripts/generate_resume.py --input <简历.md>`，详见[docx-generation.md](docx-generation.md)
- 投递记录：`python ~/<agent>/skills/resume-database/scripts/tracker.py ...`，详见[tracker-usage.md](tracker-usage.md)

## 初始化检查清单

- [ ] Python ≥ 3.9
- [ ] 工作目录有 `.venv`，已激活
- [ ] `python-docx`、`openpyxl` 已安装且能导入
- [ ] MiSans 字体文件齐全，用户电脑已安装
- [ ] `data/` 和 `data/user_index.md` 已创建
- [ ] 模板验证生成 DOCX 通过
