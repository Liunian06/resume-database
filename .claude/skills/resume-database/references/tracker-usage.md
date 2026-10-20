# 投递记录表使用说明

## 投递记录表

### 文件位置
`data/<user_ID>/application_tracker.xlsx`

### 表格结构
| 序号 | 企业 | 岗位名称 | 岗位JD | 进度 | 投递链接 | 备注 |
|------|------|----------|--------|------|----------|------|
| 1 | 字节跳动 | 产品实习生 | data/10001/jobs/bytedance-product/jd.md | 待投递 | | |
| 2 | 腾讯 | 用户研究 | data/10001/jobs/tencent-user-research/jd.md | 已投递 | https://... | 2026-10-15投递 |

### 字段说明
- **序号** - 自动递增，从1开始
- **企业** - 公司名称
- **岗位名称** - 岗位名称
- **岗位JD** - JD文件路径（相对于项目根目录）
- **进度** - 投递进度状态（见下文）
- **投递链接** - 招聘网站链接或内推链接
- **备注** - 投递时间、内推人、其他备注

### 进度状态
- 待投递
- 已投递
- 简历筛选中
- 已约面试
- 面试中
- 已拒绝
- 已通过
- 已放弃

## CLI工具：tracker.py

### 脚本位置
`scripts/tracker.py`

### 子命令

#### 1. init - 初始化投递记录表
创建新的投递记录表Excel文件。

```bash
python scripts/tracker.py init --user-id <user_ID>
```

示例：
```bash
python scripts/tracker.py init --user-id 10001
```

输出：
```
投递记录表已创建：data/10001/application_tracker.xlsx
```

错误处理：
- 如文件已存在：`ERROR: 投递记录表已存在`
- 如user_ID目录不存在：`ERROR: 用户目录不存在：data/<user_ID>`

#### 2. add - 添加新投递记录
添加一条新的投递记录。

```bash
python scripts/tracker.py add --user-id <user_ID> --company <公司名称> --position <岗位名称> --jd <JD文件路径> [--status <进度>] [--link <投递链接>] [--note <备注>]
```

示例：
```bash
python scripts/tracker.py add \
  --user-id 10001 \
  --company "字节跳动" \
  --position "产品实习生" \
  --jd "data/10001/jobs/bytedance-product/jd.md" \
  --status "待投递"
```

输出：
```
已添加投递记录：
序号: 1
企业: 字节跳动
岗位名称: 产品实习生
进度: 待投递
```

错误处理：
- 如投递记录表不存在：`ERROR: 投递记录表不存在，请先运行 init`
- 如必填字段缺失：`ERROR: 缺少必填字段：<字段名>`

#### 3. update - 更新投递记录
更新已有投递记录的状态、链接或备注。

```bash
python scripts/tracker.py update --user-id <user_ID> --id <序号> [--status <进度>] [--link <投递链接>] [--note <备注>]
```

示例：
```bash
python scripts/tracker.py update --user-id 10001 --id 1 --status "已投递" --note "2026-10-15投递"
```

输出：
```
已更新投递记录 #1：
企业: 字节跳动
岗位名称: 产品实习生
进度: 已投递
备注: 2026-10-15投递
```

错误处理：
- 如记录不存在：`ERROR: 投递记录 #<id> 不存在`
- 如未提供更新字段：`ERROR: 请至少提供一个更新字段（status/link/note）`

#### 4. query - 查询投递记录
根据条件查询投递记录。

```bash
python scripts/tracker.py query --user-id <user_ID> [--company <公司名称>] [--status <进度>] [--position <岗位名称>]
```

示例：
```bash
python scripts/tracker.py query --user-id 10001 --status "已投递"
```

输出：
```
查询结果（2条）：

#2 | 腾讯 | 用户研究 | 已投递
JD: data/10001/jobs/tencent-user-research/jd.md
链接: https://...
备注: 2026-10-15投递

#3 | 阿里巴巴 | 数据分析 | 已投递
JD: data/10001/jobs/alibaba-data-analyst/jd.md
链接: https://...
备注: 2026-10-16投递
```

空结果：
```
查询结果（0条）
```

错误处理：
- 如投递记录表不存在：`ERROR: 投递记录表不存在`

#### 5. list - 列出所有投递记录
列出用户的所有投递记录。

```bash
python scripts/tracker.py list --user-id <user_ID>
```

输出：
```
投递记录列表（3条）：

#1 | 字节跳动 | 产品实习生 | 待投递
#2 | 腾讯 | 用户研究 | 已投递
#3 | 阿里巴巴 | 数据分析 | 已投递
```

#### 6. --help - 帮助信息
显示CLI工具的帮助信息。

```bash
python scripts/tracker.py --help
```

输出：
```
usage: tracker.py [-h] {init,add,update,query,list} ...

投递记录表管理工具

子命令:
  {init,add,update,query,list}
    init                初始化投递记录表
    add                 添加新投递记录
    update              更新投递记录
    query               查询投递记录
    list                列出所有投递记录

示例:
  python tracker.py init --user-id 10001
  python tracker.py add --user-id 10001 --company "字节跳动" --position "产品实习生" --jd "data/10001/jobs/bytedance-product/jd.md"
  python tracker.py update --user-id 10001 --id 1 --status "已投递"
  python tracker.py query --user-id 10001 --status "已投递"
  python tracker.py list --user-id 10001
```

## 输出格式

### 纯文本输出
所有输出使用纯文本格式，方便AI和人理解。

### 错误格式
```
ERROR: <错误原因>
```

### 成功格式
```
<操作结果描述>
<详细信息>
```

## 使用场景

### 场景1：新用户首次建档
```bash
python scripts/tracker.py init --user-id 10001
```

### 场景2：投递新岗位
```bash
python scripts/tracker.py add \
  --user-id 10001 \
  --company "字节跳动" \
  --position "产品实习生" \
  --jd "data/10001/jobs/bytedance-product/jd.md" \
  --status "待投递"
```

### 场景3：更新投递状态
```bash
python scripts/tracker.py update --user-id 10001 --id 1 --status "已投递" --note "2026-10-15投递"
```

### 场景4：查看所有已投递岗位
```bash
python scripts/tracker.py query --user-id 10001 --status "已投递"
```

### 场景5：查看特定公司的投递记录
```bash
python scripts/tracker.py query --user-id 10001 --company "字节跳动"
```

## 注意事项
- 所有命令必须提供`--user-id`参数
- 不支持批量操作（如批量添加、批量更新）
- 查询条件可组合使用（如`--company "字节跳动" --status "已投递"`）
- 输出格式为纯文本，方便AI解析
