# 命名规则

## user_ID命名
- 从10001起递增
- 纯数字，5位
- 示例：10001、10002、10003

## 用户目录命名
- 直接使用`<user_ID>`
- 示例：`data/10001/`

## basename命名
- 格式：`<user_ID>_<company>_<position>_resume`
- 公司与岗位用下划线连接
- 示例：`10001_bytedance_product_resume.md`

## 打分文档命名
- 格式：`<basename>_score.md`
- 示例：`10001_bytedance_product_resume_score.md`
- 位置：与`<basename>.md`同一岗位目录，规则见[resume-scoring.md](resume-scoring.md)

## CV文件命名
- 按语言分文件：`cv_CN.md`（中文）、`cv_EN.md`（英文）
- 同一候选人的中英文事实需保持一致，不得互相矛盾

## 岗位目录命名
- 格式：`<公司中文名>-<岗位中文名>`
- 公司与岗位用连字符连接
- 示例：`data/10001/jobs/字节跳动-产品经理/`、`data/10001/jobs/阿里巴巴-数据分析/`

## 面经文件命名
### 公共面经库
- 格式：`<company>_<position>.md`
- 示例：`data/interview_library/bytedance_product.md`

### 个人面经
- 格式：`interview_<YYYYMMDD>_<type>.md`
- 从模板[assets/templates/interview_record_template.md](../assets/templates/interview_record_template.md)复制创建
- 时间前缀确保按时间顺序排列
- type包括：
  - `ai` - AI面试
  - `oa` - 在线测评/笔试
  - `round1` / `round2` / `round3` - 一面/二面/三面（适用于文商科等非技术岗）
  - `tech1` / `tech2` / `tech3` - 技术面（技术岗）
  - `group` - 群面
  - `director` - 总监面
  - `hr` - HR面
  - `final` - 终面
- 同一天多场面试可在时间后加序号：`interview_20261015_1_round1.md`、`interview_20261015_2_tech1.md`
- 示例：`interview_20261015_ai.md`、`interview_20261018_round1.md`
- **核心板块：** "面试官补充信息"，记录反问环节获得的岗位细节（实际工作内容、技术栈、团队构成、考核重点、与JD的差异），优先级最高

## 经历素材库命名
- 格式：`<project_name>.md`
- 示例：`data/experience_library/user_growth_analysis.md`

## 文件覆写规则
- 同一岗位的简历只保留一份Markdown和一份DOCX
- 修改时直接覆写，不做历史版本追踪
