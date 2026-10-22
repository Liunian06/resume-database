<div align="center">

# Resume Database Skill

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-5A4FCF.svg)](https://claude.com/claude-code)

</div>

## 芝士什么

这是一个面向大学生的一站式简历管理工具，包含从海投场景的简历制作到企业背调与面试准备的全链路支持，帮助每个大学生更好的own自己的秋招。

## 它能做什么

- 将杂乱的经历整理成结构化的中英文 CV
- 针对具体公司和岗位，做企业背调、生成岗位画像，再改写出定向简历
- 生成面试准备：自我介绍、20 个预判问题、3 个反问
- 导出 DOCX 简历
- 用 Excel 记录投递进度

## 快速开始

### 方式一：AI 一键安装

把下面这段提示词发给你的 AI 编程助手（如 Claude Code），它会自动完成安装和环境初始化：

```text
请帮我安装 resume-database 这个 skill，仓库地址：https://github.com/Liunian06/resume-database

1. 检查 Node.js 版本是否 >= 22.20，Python 版本是否 >= 3.9。任何一项不满足，先告诉我，不要自行安装。
2. 在当前项目目录执行：npx skills add Liunian06/resume-database --skill resume-database -a claude-code
3. 安装完成后，阅读 .claude/skills/resume-database/references/setup.md，按其中的步骤初始化环境：建立 .venv、安装 python-docx 和 openpyxl、检查 MiSans 字体文件、创建 data/ 目录。
4. 全部完成后，告诉我安装结果，然后阅读 .claude/skills/resume-database/references/introduction.md，向我介绍这个 skill 的功能和使用流程，并问我想先做什么。

注意：不要修改我的全局 Python 环境和系统执行策略。
```

### 方式二：手动安装

需要 [Node.js](https://nodejs.org/) 22.20 及以上、[Claude Code](https://claude.com/claude-code) 和 Python 3.9 及以上。

1. 在你的项目目录安装 skill：

```bash
npx skills add Liunian06/resume-database --skill resume-database -a claude-code
```

2. 初始化环境。命令都在项目根目录运行，详见 [setup.md](.claude/skills/resume-database/references/setup.md)：

```bash
python -m venv .venv
python -m pip install python-docx openpyxl
```

### 开始使用

安装完成后，在 Claude Code 里直接说需求，例如：

- 我想投字节跳动的产品实习，帮我准备简历和面试材料
- 我是 10001 号候选人，想投腾讯的数据分析岗

首次使用建议先读[使用指南](.claude/skills/resume-database/references/introduction.md)。

## 工作流程

```
建档 → 整理 CV → 写入 JD → 企业背调 → 岗位画像 → 定向简历 → 面试准备 → 导出 DOCX → 记录投递
```

每一步的详细规则在 `.claude/skills/resume-database/references/` 下，入口是 [SKILL.md](.claude/skills/resume-database/SKILL.md)。

## 目录结构

```
.claude/skills/resume-database/
├── SKILL.md        # skill 定义和工作流
├── assets/         # 模板、改写示例、MiSans 字体
├── references/     # 各步骤的操作细则
└── scripts/        # generate_resume.py、tracker.py
data/               # 你的个人数据，运行后自动生成，不会提交到仓库
```

## 使用原则

- 教育经历必须真实，本工具不协助编造或修改学校、学历、专业和时间
- 实习和项目经历遵循"先做再写"：参考他人案例时，要自己真实动手尝试，再把真实产出写成自己的经历
- `data/` 里是你的个人信息，不要上传到公开仓库

## 交流群

遇到问题、想反馈建议或交流求职经验，欢迎扫码进群。

<p align="center">
  <img src="docs/qrcode.png" width="240" alt="交流群二维码">
</p>

二维码过期或扫码失败时，请在 [Issues](../../issues) 留言。

## 许可协议

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议。

- 允许：个人使用、学习、研究，以及非营利的分享
- 要求：保留署名和原仓库链接，修改后的版本使用相同协议
- 禁止：商用，包括出售、作为付费服务的一部分、用作引流赠品等情形，具体解释见 [LICENSE](LICENSE) 的补充说明

如需商业授权，请通过交流群或 Issues 联系作者。

## 致谢

简历字体使用小米 [MiSans](https://hyperos.mi.com/font/)，字体版权归小米科技有限责任公司所有，不适用上述协议。

Copyright © 2026 [Liunian06](https://github.com/Liunian06)
