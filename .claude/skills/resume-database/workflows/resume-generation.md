# 工作流一：简历生成与投递

从建档到投递的主流程。已有CV的候选人投新岗位时从步骤3开始；只需更新某一环节（如岗位画像、面试准备）时直接进入对应步骤。

**首次使用或换电脑时先初始化环境：**[setup.md](../references/setup.md)。仓库里已有`.venv`和`data/user_index.md`时可跳过

## 步骤1：建档/定位用户
**读取细则：** [user-management.md](../references/user-management.md)、[naming-conventions.md](../references/naming-conventions.md)、[directory-structure.md](../references/directory-structure.md)

- 检查`data/user_index.md`是否存在，不存在则从[user_index.md](../assets/templates/user_index.md)复制创建
- 查询用户是否已建档（通过姓名或user_ID）
- 新用户：分配user_ID（从10001递增），创建`data/<user_ID>/`目录，从[cv_CN_template.md](../assets/templates/cv_CN_template.md)和[cv_EN_template.md](../assets/templates/cv_EN_template.md)复制创建`cv_CN.md`和`cv_EN.md`
- 更新`data/user_index.md`记录用户元信息

**产出：** 用户目录`data/<user_ID>/`，初始化的`cv_CN.md`和`cv_EN.md`，更新`data/user_index.md`

## 步骤2：接收用户原始材料，整理结构化CV
**读取细则：** [cv-extraction.md](../references/cv-extraction.md)

- 将候选人提供的原始材料（旧简历、零散描述、草稿、口述经历等）存入`data/<user_ID>/raw/source.md`
- 从原始材料中提取个人信息、教育经历、校园经历、比赛经历、实习经历、项目经历、科研经历、技能与证书等事实信息
- 基于提取的信息填充`cv_CN.md`和`cv_EN.md`，确保中英文事实一致
- 信息不清晰或缺失的地方标注"待补充"或"待核实"

**产出：** `raw/source.md`、`cv_CN.md`、`cv_EN.md`

**可选：** 候选人暂无明确目标岗位时，按[generic-resume.md](../references/generic-resume.md)生成通用简历

**可选：** 候选人经历与目标方向有明显gap时，可先走[经历包装工作流](experience-packaging.md)，产出会写回CV供后续所有简历复用

## 步骤3：建岗位目录，写入JD
**读取细则：** [job-setup.md](../references/job-setup.md)、[naming-conventions.md](../references/naming-conventions.md)

- 创建岗位目录`data/<user_ID>/jobs/<company>-<position>/`
- 将JD原文写入`jd.md`
- 创建`application_tracker.xlsx`（如不存在）

**产出：** `jd.md`，岗位目录

## 步骤4：定位业务线+企业背调
**读取细则：** [company-background.md](../references/company-background.md)

- 先从JD判断岗位归属的业务线/部门，再做深度背调，最后补充公司整体情况
- 结合互联网搜索，岗位要求一律以JD原文为准
- 写入`company_background.md`

**产出：** `company_background.md`

## 步骤5：生成岗位画像
**读取细则：** [job-portrait.md](../references/job-portrait.md)、[interview-library-usage.md](../references/interview-library-usage.md)、[conflict-resolution.md](../references/conflict-resolution.md)

- 读取`jd.md`、`company_background.md`、公共面经库和个人面经（如存在）
- 生成只对这家公司这个岗位有效的画像，不套用通用模板
- 岗位画像是动态文档：用户补充面试经验或找到新信息时及时更新，优先级与差异处理见conflict-resolution.md

**产出：** `job_profile.md`（可多次更新）

## 步骤6：生成定向简历
**读取细则：** [resume-writing.md](../references/resume-writing.md)

- 读取`cv_CN.md`或`cv_EN.md`、`job_profile.md`
- 只使用CV中已有的经历，生成`<basename>.md`；拿不准的内容写入`<basename>_notes.md`
- 如CV中的实习/项目经历与岗位画像仍有明显gap，提示候选人可选走[经历包装工作流](experience-packaging.md)；包装完成、CV更新后回到本步骤重新生成

**产出：** `<basename>.md`、`<basename>_notes.md`

**可选：** 简历生成后，可提示候选人走[简历打分工作流](resume-scoring.md)，评估简历与JD的匹配度

## 步骤7：生成面试准备
**读取细则：** [interview-prep.md](../references/interview-prep.md)

- 基于`<basename>.md`、`job_profile.md`、面经生成自我介绍、预判问题和反问
- 写入`<basename>_interview_prep.md`

**产出：** `<basename>_interview_prep.md`

## 步骤8：生成DOCX
**读取细则：** [docx-generation.md](../references/docx-generation.md)

- 调用`scripts/generate_resume.py`将`<basename>.md`转为`<basename>.docx`，每次导出覆盖旧文件

**产出：** `<basename>.docx`

## 步骤9：记录投递
**读取细则：** [tracker-usage.md](../references/tracker-usage.md)

- 调用`scripts/tracker.py`更新`application_tracker.xlsx`

**产出：** 更新`application_tracker.xlsx`
