---
name: resume-database
version: 1.1.0
updated: 2026-10-23
description: 大学生简历快速生成与面试准备工具。管理候选人CV、岗位JD、企业背调、面经库和经历素材,生成通用简历(按亮眼程度排序)或针对特定公司岗位的定向简历和面试准备文档,支持经历包装（先做再写）、简历与JD匹配度打分和投递记录追踪。适用于需要快速生成简历、海投策略、为每个岗位定制简历的求职场景。触发条件：用户要求生成简历(通用或定向)、为特定岗位定制简历、管理多个候选人求职材料、生成岗位定向面试准备、记录投递进度、从零散材料整理结构化CV、参考他人经历包装实习/项目经历、给定向简历打分。不触发：简历投递/岗位爬取/ATS对接、在线服务/图形界面、修改教育经历真实性。主要生成DOCX,如需PDF可用其他工具转换。
---

# Resume Database Skill

> **许可协议：** 本skill源码公开，采用 CC BY-NC-SA 4.0 协议授权（禁止商用，需署名，相同方式共享），MiSans 字体除外。Copyright © 2026 [Liunian06](https://github.com/Liunian06)。完整协议与补充说明见 [LICENSE](LICENSE)。

## 背景

大学生就业竞争压力大,海投是提高面试机会的常见策略。海投需要为每个岗位定制匹配简历和准备岗位定向的面试,但手动改写简历、查询面经、准备回答非常耗时,候选人难以在数十上百个岗位中保持高质量产出。

另一方面,大学生在校期间积累的实习和项目经历往往有限,直接写成简历难以匹配多样化的岗位要求。校招HR背调的核心是教育经历（学校、学历、专业、时间）,这些信息必须真实；而实习和项目经历的背调成本高,校招阶段通常不会深入核实。因此,候选人可以参考他人的优秀经历进行"包装",但必须遵循"Fake it until you make it"原则：不是直接背诵、移植他人的描述,而是按参考经历实际尝试操作、工具、分析或产出,先让自己看起来像做过,再通过真实尝试把"假装会"变成"真的会",最后把真实尝试写成自己的经历。这样既能丰富简历内容,又能在面试中真实回答相关问题。

本skill帮助大学生快速完成简历与岗位的匹配改写、生成岗位定向的面试准备,并在实习和项目经历包装环节引导候选人践行"Fake it until you make it",用更少时间、更高质量地支撑海投策略。

## Skill文件结构

```
~/<agent>/skills/resume-database/
├── SKILL.md                    # 本文件：skill定义和工作流路由
├── LICENSE                     # 版权声明和许可协议
├── workflows/                 # 工作流（只编排步骤，细则在references）
│   ├── resume-generation.md    # 简历生成与投递
│   ├── experience-packaging.md # 经历包装
│   └── resume-scoring.md       # 简历打分
├── assets/
│   ├── fonts/                  # MiSans字体文件（用于DOCX生成）
│   │   ├── MiSans-Regular.otf
│   │   ├── MiSans-Bold.otf
│   │   └── ...
│   ├── examples/                # 改写示例（非填空模板）
│   │   ├── bullet_rewrite_examples.md      # Bullet改写示例
│   │   ├── education_format_examples.md    # 教育经历两种写法示例
│   │   ├── experience_rewriting_examples.md # 经历包装示例
│   │   └── interview_prep_examples.md      # 面试准备格式示例
│   └── templates/              # 初始化模板
│       ├── user_index.md       # 用户索引表格模板
│       ├── cv_CN_template.md   # 中文CV模板
│       ├── cv_EN_template.md   # 英文CV模板
│       ├── jd_template.md      # 岗位JD模板
│       ├── company_background_template.md  # 企业背调模板
│       ├── job_profile_template.md         # 岗位画像模板
│       ├── interview_record_template.md    # 面试记录模板
│       ├── interview_library_public_template.md  # 公共面经模板
│       ├── resume_output_template.md       # 简历输出模板
│       ├── resume_notes_template.md        # 简历补充信息模板
│       ├── resume_score_template.md        # 简历打分文档模板
│       └── application_tracker_template.xlsx  # 投递记录表模板
├── references/                 # 操作细则和规范
│   ├── introduction.md        # 新用户使用指南
│   ├── setup.md               # 环境初始化（Python、虚拟环境、依赖、data目录）
│   ├── naming-conventions.md   # 文件命名规范
│   ├── directory-structure.md  # 目录结构说明
│   ├── conflict-resolution.md  # 冲突解决规则
│   ├── user-management.md      # 用户建档和管理
│   ├── cv-extraction.md        # CV提取和整理规则
│   ├── generic-resume.md      # 通用简历生成（无目标岗位时）
│   ├── job-setup.md           # 岗位目录创建
│   ├── company-background.md   # 企业背调方法
│   ├── job-portrait.md        # 岗位画像构建
│   ├── interview-library-usage.md  # 面经库使用
│   ├── resume-writing.md      # 简历改写规则（针对特定岗位）
│   ├── experience-rewriting.md # 经历包装规则
│   ├── resume-scoring.md      # 简历打分规则
│   ├── interview-prep.md      # 面试准备文档
│   ├── docx-generation.md     # DOCX生成规范
│   └── tracker-usage.md       # 投递追踪工具
└── scripts/                   # 工具脚本
    ├── generate_resume.py     # 简历DOCX生成
    ├── tracker.py            # 投递追踪CLI
    └── check_update.py       # 版本更新检测（由上面两个脚本在结束时调用）
```

## Data目录结构

```
data/                          # 数据目录（在工作目录下，不在skill安装目录内）
├── user_index.md             # 全局用户索引
├── <user_ID>/                # 单个候选人目录
│   ├── raw/                  # 原始材料
│   │   └── source.md        # 候选人提供的零散材料
│   ├── photo.jpg            # 证件照（可选，所有简历复用；jpg/jpeg/png均可，文件名固定为photo）
│   ├── cv_CN.md             # 结构化中文CV
│   ├── cv_EN.md             # 结构化英文CV
│   ├── generic_resume_CN.md # 通用简历Markdown（中文）
│   ├── generic_resume_CN.docx # 通用简历DOCX（中文）
│   ├── generic_resume_EN.md # 通用简历Markdown（英文）
│   ├── generic_resume_EN.docx # 通用简历DOCX（英文）
│   ├── application_tracker.xlsx # 投递记录表（由tracker.py创建）
│   └── jobs/                # 岗位目录
│       └── <company>-<role>/ # 单个岗位目录
│           ├── jd.md        # 岗位JD
│           ├── company_background.md  # 企业背调
│           ├── job_profile.md        # 岗位画像
│           ├── <user_ID>_<company>_<role>_resume.md    # 定制简历Markdown
│           ├── <user_ID>_<company>_<role>_resume_notes.md  # 待确认或需补充的内容（按需）
│           ├── <user_ID>_<company>_<role>_resume.docx  # 定制简历DOCX
│           ├── <user_ID>_<company>_<role>_resume_score.md  # 简历打分（按需）
│           └── <user_ID>_<company>_<role>_interview_prep.md  # 面试准备
├── interview_library/        # 公共面经库
│   └── <company>_<position>.md  # 某公司某岗位面经
├── experience_library/       # 公共经历素材库
│   └── <experience-slug>.md # 可复用的经历案例
```

## Workflow

**首次使用请先阅读：**[references/introduction.md](references/introduction.md) - 了解Skill功能、工作流程和使用场景

按用户需求选择工作流，只读取选中工作流的文件：

| 工作流 | 何时使用 | 文件 |
|---|---|---|
| 简历生成与投递 | 建档、整理CV、为某个岗位生成定向简历和面试准备、导出DOCX、记录投递、面试后更新画像 | [workflows/resume-generation.md](workflows/resume-generation.md) |
| 经历包装 | 实习/项目经历不足，需参考他人经历、先做再写，结果写回CV | [workflows/experience-packaging.md](workflows/experience-packaging.md) |
| 简历打分 | 评估某份定向简历与岗位JD的匹配度，输出score文档 | [workflows/resume-scoring.md](workflows/resume-scoring.md) |

工作流之间可以跳转：简历生成发现经历gap时提示可选包装，包装完成后回到简历生成；简历生成后可选打分，打分发现需补经历时提示可选包装。

## 案例

### 正向案例1：新候选人首次投递
**用户请求：** "我想投字节跳动的产品实习，帮我准备简历和面试材料"

**处理：**
1. 触发本skill
2. 建档（分配user_ID 10001）
3. 引导用户提供旧简历和JD，整理CV
4. 企业背调字节跳动产品团队
5. 生成岗位画像、定向简历、面试准备
6. 导出DOCX，记录投递

### 正向案例2：已有候选人新岗位投递
**用户请求：** "10001号候选人要投腾讯的用户研究岗位"

**处理：**
1. 触发本skill
2. 定位用户10001
3. 读取已有`cv_CN.md`
4. 建新岗位目录，写入腾讯用户研究JD
5. 企业背调、生成画像、定向简历、面试准备
6. 导出DOCX，记录投递

### 正向案例3：包装项目经历
**用户请求：** "我想包装一个数据分析项目到我的简历里"

**处理：**
1. 触发本skill，进入经历包装工作流
2. 诊断gap，读取`data/experience_library/`中的数据分析项目素材
3. 引导候选人先按参考经历完成真实尝试（实际跑数据、做可视化、写报告）
4. 将候选人的真实尝试写成项目经历，同时更新`cv_CN.md`和`cv_EN.md`

### 正向案例4：给定向简历打分
**用户请求：** "帮我看看给字节产品岗的简历匹配度怎么样"

**处理：**
1. 触发本skill，进入简历打分工作流
2. 读取该岗位的`jd.md`和定向简历
3. 按JD逐维度打分，输出`<basename>_score.md`
4. 默认只给出分数和修改建议，用户要求时才自动改写

### 负向案例1：简历投递自动化
**用户请求：** "帮我自动投递100个岗位"

**处理：** 不触发。本skill不做简历投递、岗位爬取或ATS对接，只管理简历生成和投递记录。

### 负向案例2：生成PDF
**用户请求：** "把简历导出为PDF"

**处理：** 本skill默认只生成DOCX，不主动生成PDF。用户明确要求时，可在脚本上加`--pdf`（需已安装LibreOffice），或用Word等工具自行另存为PDF。

### 负向案例3：修改教育经历真实性
**用户请求：** "把我的学校改成清华大学"

**处理：** 不触发。教育经历（学校、学历、专业、时间）必须真实，本skill绝不协助编造或修改教育经历。

## 资源引用

所有详细规则在`references/`目录下，由各工作流按步骤引用，不需要预先全部阅读：

**环境与基础规则：**
- [setup.md](references/setup.md) - 环境初始化
- [naming-conventions.md](references/naming-conventions.md) - 命名规则
- [directory-structure.md](references/directory-structure.md) - 目录结构规范
- [conflict-resolution.md](references/conflict-resolution.md) - 优先级规则

**简历生成与投递：**
- [user-management.md](references/user-management.md) - 建档、维护索引
- [cv-extraction.md](references/cv-extraction.md) - 从raw提取CV
- [generic-resume.md](references/generic-resume.md) - 通用简历
- [job-setup.md](references/job-setup.md) - 建岗位目录、存JD
- [company-background.md](references/company-background.md) - 企业背调
- [job-portrait.md](references/job-portrait.md) - 岗位画像
- [interview-library-usage.md](references/interview-library-usage.md) - 面经库使用
- [resume-writing.md](references/resume-writing.md) - 简历写作规则
- [interview-prep.md](references/interview-prep.md) - 面试准备文档
- [docx-generation.md](references/docx-generation.md) - Markdown转DOCX
- [tracker-usage.md](references/tracker-usage.md) - 投递记录表

**经历包装：**
- [experience-rewriting.md](references/experience-rewriting.md) - 包装规则

**简历打分：**
- [resume-scoring.md](references/resume-scoring.md) - 评分维度与score文档规则

**问题反馈：**
- [qa.md](references/qa.md) - 出现无法解决的错误或未知错误时，引导梳理问题并联系开发者

**静态资源：**
- `assets/templates/` - Markdown模板（用户索引、CV中英文、JD、企业背调、岗位画像、面试记录、面经库、简历输出、投递记录表）
- `assets/examples/` - 非填空式参考示例（如bullet改写示例）
- `assets/fonts/` - MiSans字体文件（免费商用）
- `assets/qrcode.png` - 交流群二维码，用于联系开发者

**工具脚本：**
- `scripts/generate_resume.py` - 简历Markdown转DOCX，依赖python-docx
- `scripts/tracker.py` - 投递记录表CLI工具（init/add/update/query/list），依赖openpyxl
- `scripts/check_update.py` - 检测 GitHub 上是否有新版本，仅用标准库。上面两个脚本结束时会自动调用：查不到就不提示；有新版本时在 stderr 输出更新命令，需要把提示转告用户，由用户决定是否更新。设置环境变量 `RESUME_DATABASE_NO_UPDATE_CHECK=1` 可关闭
