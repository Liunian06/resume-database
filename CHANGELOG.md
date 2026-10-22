# 更新日志

本文件记录 resume-database skill 的版本变更。版本号与 `SKILL.md` 中的 `version` 保持一致，GitHub Release 的更新说明从这里读取。

## [1.0.6] - 2026-10-23

### 变更
- 测试性更新：仅升级版本号，用于排查自动发布流程是否能被 push 正常触发，skill 内容无变化

## [1.0.5] - 2026-10-23

### 修复
- 修正 `SKILL.md` 与 `introduction.md` 中 data 目录结构与实际不符的地方：投递记录表为 `data/<user_ID>/application_tracker.xlsx`（原写作 `data/tracker.xlsx`）；公共面经库为 `data/interview_library/<company>_<position>.md`（原多了一层 `companies/`）
- `SKILL.md` 目录树补充 `<basename>_notes.md`

## [1.0.4] - 2026-10-23

### 新增
- 版本更新检测：`generate_resume.py` 和 `tracker.py` 运行结束时自动检查是否有新版本，有则提示更新命令；查询失败（断网、超时、仓库不可访问等）时不提示，不影响脚本正常运行
- 可设置环境变量 `RESUME_DATABASE_NO_UPDATE_CHECK=1` 关闭检测

## [1.0.3] - 2026-10-22

### 变更
- 安装方式改为全局安装（`npx skills add ... -g`），不再绑定特定的 AI 编程助手
- skill 内所有 `.claude/skills` 路径改为通用的 `~/<agent>/skills/`
- `setup.md` 新增路径约定：命令在工作目录运行，`data/` 生成在工作目录下，不在 skill 安装目录内

### 文档
- README 快速开始拆分为「AI 一键安装」和「手动安装」两种方式

## [1.0.2] - 2026-10-22

### 变更
- 开源协议更新为 CC BY-NC-SA 4.0，并增加对「非商业性使用」的补充说明

### 文档
- 新增 README

## [1.0.1] - 2026-10-21

### 修复
- 修正字体依赖：使用 MiSans-Bold 替换 MiSans-Demibold

## [1.0.0] - 2026-10-20

### 新增
- 初始版本：大学生简历快速生成与面试准备工具
