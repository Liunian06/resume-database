# 工作流三：简历打分

评估某个岗位的定向简历与该岗位JD的匹配度，输出score文档。只打定向简历，不打通用简历和CV，因为只有基于具体JD才有评判标准。默认只打分不改简历。

**读取细则：** [resume-scoring.md](../references/resume-scoring.md)

## 入口

- 从[简历生成工作流](resume-generation.md)步骤6之后跳入，或候选人直接要求给某份简历打分
- 前提：岗位目录下已有`jd.md`和`<basename>.md`，缺少`<basename>.md`时先回简历生成工作流

## 步骤1：读取输入

- 读取`jd.md`和`<basename>.md`
- 如存在`job_profile.md`，一并读取，用于理解JD背后的实际要求

## 步骤2：逐维度打分

- 按reference中的维度和标准逐项打分，写明扣分原因
- 评判只依据JD，不评价与JD无关的内容

## 步骤3：输出score文档

- 按[resume_score_template.md](../assets/templates/resume_score_template.md)写入`<basename>_score.md`
- 已有score文档直接覆写

**产出：** `<basename>_score.md`

## 步骤4：处理修改建议

- 默认：把score文档交给候选人，由候选人决定是否修改
- 用户明确要求自动修改时：
  - 能通过调整表述、排序、关键词解决的扣分点，按[resume-writing.md](../references/resume-writing.md)的规则改写`<basename>.md`
  - 需要补充真实经历才能解决的扣分点不自动改，提示候选人可选走[经历包装工作流](experience-packaging.md)
  - 改写后回到步骤2重新打分，更新score文档
