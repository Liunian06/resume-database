# 更新日志

本文件记录 resume-database skill 的版本变更。版本号与 `SKILL.md` 中的 `version` 保持一致，GitHub Release 的更新说明从这里读取。

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
