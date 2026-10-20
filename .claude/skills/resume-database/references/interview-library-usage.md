# 面经库使用规则

## 面经来源与录入方式

### 公共面经录入流程
1. **用户提供素材**：用户通过小红书、牛客网、知乎等平台找到面经帖，截图或复制文本提供给我
2. **我整理入库**：我从用户提供的素材中提取问题、轮次、追问、来源等结构化信息
3. **写入面经库**：按模板[assets/templates/interview_library_public_template.md](../assets/templates/interview_library_public_template.md)格式写入`data/interview_library/<company>_<position>.md`
4. **标注来源**：记录原始来源（如"小红书用户@XXX，2026年秋招"）

### 个人面经录入流程
1. **用户面试后提供**：用户完成面试后，口述或文字记录面试内容
2. **我整理成文档**：按模板[assets/templates/interview_record_template.md](../assets/templates/interview_record_template.md)格式整理
3. **写入个人目录**：存入`data/<user_ID>/jobs/<company>-<position>/interview_<YYYYMMDD>_<type>.md`
4. **更新岗位画像**：如有"面试官补充信息"，立即更新`job_profile.md`

## 面经库结构

### 公共面经库
```
data/interview_library/
  <company>_<position>.md
```

示例：
- `data/interview_library/bytedance_product.md`
- `data/interview_library/tencent_user-research.md`

### 个人面经
```
data/<user_ID>/jobs/<company>-<position>/
  interview_<YYYYMMDD>_<type>.md
```

示例：
- `interview_20261015_ai.md` - AI面试
- `interview_20261018_round1.md` - 一面
- `interview_20261020_tech2.md` - 技术二面
- `interview_20261022_director.md` - 总监面
- `interview_20261025_hr.md` - HR面

## 读取优先级

1. **必读JD** - `jd.md`，且JD优先级最高
2. **读取公司岗位面经** - `data/interview_library/<company>_<position>.md`
3. **读取个人面经** - `data/<user_ID>/jobs/<company>-<position>/interview_*.md`（所有面经文件）
4. **如无面经** - 在文档中写明"未找到公共面经和个人面经，仅依据JD判断"

## 面经用途

### 用于岗位画像
- 提取该公司该岗位的面试风格
- 识别面试官重视的能力点
- 补充JD未明确但面试常考的内容

### 用于面试准备
- 预测可能的面试问题
- 准备问题的回答思路
- 生成追问方向

### 不用于
- **不作为候选人事实来源** - 面经只用于预测问题，不能直接写进简历
- **不替代JD** - 面经与JD冲突时，以JD为准
- **不跨公司泛化** - 不要用字节的面经推测腾讯的面试

## 面经内容规范

### 公共面经应包含
从模板[assets/templates/interview_library_public_template.md](../assets/templates/interview_library_public_template.md)复制创建，包含：
- 问题原文或类似表述
- 问题类型（行为问题、案例分析、技术问题等）
- 面试轮次（一面、二面、HR面等）
- 面试官角色（技术面试官、产品总监、HR等）
- 追问方向
- 来源（小红书用户、牛客网、知乎、内部分享等）
- 时间标注（YYYY年春招/秋招）

### 个人面经应包含
从模板[assets/templates/interview_record_template.md](../assets/templates/interview_record_template.md)复制创建，包含：
- 候选人真实面试经历
- 面试时间、轮次、面试官信息
- 被问到的问题
- 候选人的回答（简要记录）
- **面试官补充信息**（核心板块，优先级最高）
- 卡点、反馈和复盘

## 记录原则

### 公共面经
- **尽可能保留所有问题、追问、轮次、来源、上下文和原始表述**
- 可以提炼"高频问题"，但不删除完整问题记录
- 多个来源的相同问题合并时，在"来源"字段列出所有来源
- 示例参考模板[assets/templates/interview_library_public_template.md](../assets/templates/interview_library_public_template.md)

### 个人面经
- 记录候选人真实面试经历
- 真实回答、卡点、反馈和复盘
- **"面试官补充信息"板块优先级最高**，用于更新岗位画像
- 可跨该候选人的多个岗位复用
- 示例参考模板[assets/templates/interview_record_template.md](../assets/templates/interview_record_template.md)

## 去重与合并

### 相同问题判断
- 公司、岗位、轮次、问题原文高度相似
- 保留信息更完整的一条
- 把不同来源合并到"来源"或"原始表述"

### 不确定时
- 不确定是否重复时不要删除
- 保留为独立问题并补充标签

### 可信度标注
- 来源不明或可信度低的内容可以进入面经库
- 但标注"可信度：待验证"

## 错误处理
- 面经库不存在：在岗位画像中标注"未找到面经"
- 面经内容不完整：使用可用部分，标注"信息有限"
- 面经与JD严重冲突：以JD为准，面经作为参考
