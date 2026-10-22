<div align="center">

# Resume Database Skill

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](LICENSE)

面向大学生海投场景的简历与面试准备工具。为每个岗位生成定向简历和面试材料，并记录投递进度。

</div>

> 本项目源码公开，采用 CC BY-NC-SA 4.0 协议授权：可免费用于个人求职、学习和研究，禁止商用。详见[许可协议](#许可协议)。

## 它能做什么

- 把旧简历、草稿、口述经历整理成结构化的中英文 CV
- 没有目标岗位时，生成按亮点排序的通用简历
- 针对具体公司和岗位，做企业背调、生成岗位画像，再改写出定向简历
- 生成面试准备：自我介绍、20 个预判问题、3 个反问
- 导出 DOCX 简历（MiSans 字体）
- 用 Excel 记录投递进度

## 快速开始

### 1. 准备环境

需要 [Claude Code](https://claude.com/claude-code) 和 Python 3.9 及以上。

### 2. 安装 skill

把本仓库的 `.claude/skills/resume-database/` 目录复制到你自己项目的 `.claude/skills/` 下，或者直接在本仓库根目录使用。

```bash
git clone https://github.com/Liunian06/resume-database.git
cd resume-database
```

### 3. 初始化

按 [setup.md](.claude/skills/resume-database/references/setup.md) 建立虚拟环境、安装依赖、检查字体。命令都在仓库根目录运行。

```bash
python -m venv .venv
python -m pip install python-docx openpyxl
```

### 4. 开始使用

在 Claude Code 里直接说需求，例如：

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
