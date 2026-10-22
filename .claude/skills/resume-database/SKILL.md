---
name: resume-database
version: 1.0.6
updated: 2026-10-23
description: 大学生简历快速生成与面试准备工具。管理候选人CV、岗位JD、企业背调、面经库和经历素材,生成通用简历(按亮眼程度排序)或针对特定公司岗位的定向简历和面试准备文档,支持经历包装（先做再写）和投递记录追踪。适用于需要快速生成简历、海投策略、为每个岗位定制简历的求职场景。触发条件：用户要求生成简历(通用或定向)、为特定岗位定制简历、管理多个候选人求职材料、生成岗位定向面试准备、记录投递进度、从零散材料整理结构化CV、参考他人经历包装实习/项目经历。不触发：简历投递/岗位爬取/ATS对接、在线服务/图形界面、修改教育经历真实性。主要生成DOCX,如需PDF可用其他工具转换。
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
├── SKILL.md                    # 本文件：skill定义和工作流
├── LICENSE                     # 版权声明和许可协议
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
│   ├── experience-rewriting.md # 经历包装指南
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
│           └── <user_ID>_<company>_<role>_interview_prep.md  # 面试准备
├── interview_library/        # 公共面经库
│   └── <company>_<position>.md  # 某公司某岗位面经
├── experience_library/       # 公共经历素材库
│   └── <experience-slug>.md # 可复用的经历案例
```

## Workflow

**首次使用请先阅读：**[references/introduction.md](references/introduction.md) - 了解Skill功能、工作流程和使用场景

**首次使用或换电脑时先初始化环境：**[references/setup.md](references/setup.md) - 检查Python版本、建立虚拟环境、安装依赖、初始化`data/`目录。仓库里已有`.venv`和`data/user_index.md`时可跳过

### 步骤1：建档/定位用户
**读取细则：** [references/user-management.md](references/user-management.md), [references/naming-conventions.md](references/naming-conventions.md), [references/directory-structure.md](references/directory-structure.md)

- 检查`data/user_index.md`是否存在，不存在则从[assets/templates/user_index.md](assets/templates/user_index.md)复制创建
- 查询用户是否已建档（通过姓名或user_ID）
- 新用户：分配user_ID（从10001递增），创建`data/<user_ID>/`目录，从[assets/templates/cv_CN_template.md](assets/templates/cv_CN_template.md)和[assets/templates/cv_EN_template.md](assets/templates/cv_EN_template.md)复制创建`cv_CN.md`和`cv_EN.md`
- 更新`data/user_index.md`记录用户元信息

**产出：** 用户目录`data/<user_ID>/`，初始化的`cv_CN.md`和`cv_EN.md`，更新`data/user_index.md`

### 步骤2：接收用户原始材料，整理结构化CV
**读取细则：** [references/cv-extraction.md](references/cv-extraction.md)

- 将候选人提供的原始材料（旧简历、零散描述、草稿、口述经历等）存入`data/<user_ID>/raw/source.md`
- 从原始材料中提取个人信息、教育经历、校园经历、比赛经历、实习经历、项目经历、科研经历、技能与证书等事实信息
- 基于提取的信息填充`data/<user_ID>/cv_CN.md`和`data/<user_ID>/cv_EN.md`
- 确保中英文CV事实保持一致，不得互相矛盾
- 信息不清晰或缺失的地方标注"待补充"或"待核实"

**产出：** `raw/source.md`、`cv_CN.md`、`cv_EN.md`

**可选：** 如候选人暂无明确目标岗位，可按[references/generic-resume.md](references/generic-resume.md)生成通用简历（按经历亮眼程度排序，供日常使用或快速投递）

### 步骤3：建岗位目录，写入JD
**读取细则：** [references/job-setup.md](references/job-setup.md), [references/naming-conventions.md](references/naming-conventions.md)

- 创建岗位目录`data/<user_ID>/jobs/<company>-<position>/`
- 将JD原文写入`jd.md`
- 创建`application_tracker.xlsx`（如不存在）

**产出：** `jd.md`，岗位目录

### 步骤4：定位业务线+企业背调
**读取细则：** [references/company-background.md](references/company-background.md)

- 先从JD判断该岗位归属哪条业务线/部门，标注可信度（已确认/高置信推断/待确认）
- 针对已定位的业务线做深度背调（产品形态、商业模式、考核指标、近期动态、团队节奏、风险）
- 再补充公司整体概况、业务线地图、文化和招聘偏好
- 结合互联网搜索，不归纳为行业共性，岗位要求一律以JD原文为准
- 将背调信息写入`company_background.md`

**产出：** `company_background.md`，其中首节为岗位归属定位

### 步骤5：生成岗位画像
**读取细则：** [references/job-portrait.md](references/job-portrait.md), [references/interview-library-usage.md](references/interview-library-usage.md), [references/conflict-resolution.md](references/conflict-resolution.md)

- 读取`jd.md`、`company_background.md`
- 读取公共面经库`data/interview_library/<company>_<position>.md`
- 读取个人面经（如存在）`data/<user_ID>/jobs/<company>-<position>/interview_*.md`
- 结合JD、背调、面经生成只对这家公司这个岗位有效的画像
- 不套用跨公司的通用岗位模板
- **岗位画像是动态文档**：每当用户补充面试经验（特别是"面试官补充信息"板块）、找到新的面经或互联网信息时，及时更新画像
- 更新优先级：面试官提供的信息 > JD原文 > 企业背调 > 面经
- 如面试官说法与JD有出入（如实际技术栈、工作内容），以面试官为准并在画像中标注差异

**产出：** `job_profile.md`（可多次更新）

### 步骤6：生成定向简历
**读取细则：** [references/resume-writing.md](references/resume-writing.md), [references/experience-rewriting.md](references/experience-rewriting.md)（按需）

- 读取`cv_CN.md`或`cv_EN.md`、`job_profile.md`
- 对于实习和项目经历，如需包装：
  - 读取`data/experience_library/<project_name>.md`参考素材
  - 引导候选人先按参考经历完成对应的真实尝试和产出
  - 将真实尝试写成自己的经历（不直接移植他人描述）
- 用STAR或产品化表达改写bullet
- 生成`<basename>.md`（basename = `<user_ID>_<company>_<position>_resume`）
- 拿不准或需补充的内容写入`<basename>_notes.md`
- 同一岗位的简历直接覆写，不做历史版本追踪

**产出：** `<basename>.md`、`<basename>_notes.md`

### 步骤7：生成面试准备
**读取细则：** [references/interview-prep.md](references/interview-prep.md)

- 基于`<basename>.md`、`job_profile.md`、面经
- 生成简单自我介绍（1-2分钟）
- 生成20个预判问题（覆盖面经预判与简历深挖）
- 生成3个反问
- 写入`<basename>_interview_prep.md`

**产出：** `<basename>_interview_prep.md`

### 步骤8：生成DOCX
**读取细则：** [references/docx-generation.md](references/docx-generation.md)

- 调用`scripts/generate_resume.py`将`<basename>.md`转为DOCX
- 使用MiSans字体和预设模板
- 输出`<basename>.docx`
- 每次导出覆盖旧DOCX文件

**产出：** `<basename>.docx`

### 步骤9：记录投递
**读取细则：** [references/tracker-usage.md](references/tracker-usage.md)

- 调用`scripts/tracker.py`更新`application_tracker.xlsx`
- 记录序号、企业、岗位名称、岗位JD路径、进度、投递链接、备注

**产出：** 更新`application_tracker.xlsx`

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
1. 触发本skill
2. 读取`data/experience_library/`中的数据分析项目素材
3. 引导候选人先按参考经历完成真实尝试（实际跑数据、做可视化、写报告）
4. 将候选人的真实尝试写成项目经历
5. 更新`cv_CN.md`和`cv_EN.md`

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

所有详细规则在`references/`目录下，按工作流步骤组织：

**环境初始化（首次使用）：**
- [setup.md](references/setup.md) - 检查Python版本、建立虚拟环境、安装依赖、检查字体、初始化data目录

**基础规则（多步骤复用）：**
- [naming-conventions.md](references/naming-conventions.md) - 命名规则
- [directory-structure.md](references/directory-structure.md) - 目录结构规范
- [conflict-resolution.md](references/conflict-resolution.md) - 优先级规则

**工作流各步骤专用：**
- [user-management.md](references/user-management.md) - 步骤1：建档、维护索引
- [cv-extraction.md](references/cv-extraction.md) - 步骤2：从raw提取CV
- [job-setup.md](references/job-setup.md) - 步骤3：建岗位目录、存JD
- [company-background.md](references/company-background.md) - 步骤4：企业背调
- [job-portrait.md](references/job-portrait.md) - 步骤5：生成岗位画像
- [interview-library-usage.md](references/interview-library-usage.md) - 步骤5：面经库使用
- [resume-writing.md](references/resume-writing.md) - 步骤6：简历写作规则
- [experience-rewriting.md](references/experience-rewriting.md) - 步骤6：经历改写与包装
- [interview-prep.md](references/interview-prep.md) - 步骤7：面试准备文档生成
- [docx-generation.md](references/docx-generation.md) - 步骤8：Markdown转DOCX规则
- [tracker-usage.md](references/tracker-usage.md) - 步骤9：投递记录表使用说明

**静态资源：**
- `assets/templates/` - Markdown模板（用户索引、CV中英文、JD、企业背调、岗位画像、面试记录、面经库、简历输出、投递记录表）
- `assets/examples/` - 非填空式参考示例（如bullet改写示例）
- `assets/fonts/` - MiSans字体文件（免费商用）

**工具脚本：**
- `scripts/generate_resume.py` - 简历Markdown转DOCX，依赖python-docx
- `scripts/tracker.py` - 投递记录表CLI工具（init/add/update/query/list），依赖openpyxl
- `scripts/check_update.py` - 检测 GitHub 上是否有新版本，仅用标准库。上面两个脚本结束时会自动调用：查不到就不提示；有新版本时在 stderr 输出更新命令，需要把提示转告用户，由用户决定是否更新。设置环境变量 `RESUME_DATABASE_NO_UPDATE_CHECK=1` 可关闭
