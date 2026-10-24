/**
 * 全站唯一文案来源。电脑版与手机版都从这里渲染，禁止在 desktop/、mobile/ 里硬编码文案。
 * version 与 changelog 由发版流程在构建时注入（inject_site.py 依赖 id 为 changelog 的 screen），
 * 这里的值仅用于本地开发。
 */
window.SITE_CONTENT = {
  meta: {
    title: "Resume Database · 大学生简历快速生成与面试准备工具",
    description: "一份个人经历库，自动为每个岗位定制简历、准备面试题、追踪投递进度。",
  },
  repo: "Liunian06/resume-database",
  version: "1.0.5",
  nav: [
    { id: "home", label: "首页", hash: "#/" },
    { id: "guide", label: "使用指南", hash: "#/guide" },
    { id: "changelog", label: "更新日志", hash: "#/changelog" },
  ],
  install: {
    command: "npx skills add Liunian06/resume-database --skill resume-database -g",
    zipUrl: "https://github.com/Liunian06/resume-database/releases/latest",
    copyLabel: "复制",
    copiedLabel: "已复制",
  },
  pain: {
    inboxTitle: "收件箱",
    unread: "128封未读",
    mails: [
      { from: "字节跳动校园招聘", subject: "【在线测评】请于48小时内完成职业性格测评", tag: "测评", kind: "warn", time: "09:12" },
      { from: "腾讯招聘", subject: "AI面试邀请：产品经理（2027届校招）", tag: "AI面试", kind: "warn", time: "08:47" },
      { from: "美团招聘", subject: "【一面通知】数据分析实习生 · 明天14:00视频面试", tag: "一面", kind: "warn", time: "昨天" },
      { from: "阿里巴巴集团", subject: "感谢您投递阿里巴巴，我们已收到您的简历", tag: "已投递", kind: "info", time: "昨天" },
      { from: "百度校园招聘", subject: "感谢参与百度2027届校园招聘", tag: "校招", kind: "info", time: "周二" },
      { from: "京东招聘", subject: "很遗憾，您的背景与该岗位暂不匹配", tag: "暂不匹配", kind: "bad", time: "周二" },
      { from: "小红书招聘", subject: "【笔试提醒】请于今晚20:00前完成在线笔试", tag: "笔试", kind: "warn", time: "周一" },
      { from: "网易招聘", subject: "感谢投递，您的简历暂不匹配当前岗位要求", tag: "暂不匹配", kind: "bad", time: "周一" },
    ],
    narration: "改不完的简历，数不完的网申、测评、面试通知……每天都在和时间赛跑。",
  },
  agent: {
    appName: "AI 助手",
    prompt: "帮我生成字节跳动产品岗位的简历",
    thinking: "正在处理",
    newChat: "新对话",
    recents: ["字节跳动产品岗简历", "腾讯数据分析面试准备", "美团投递记录整理", "整理我的 CV"],
    model: "Claude",
    skill: "resume-database",
    tools: [
      { verb: "读取", target: "jd.md" },
      { verb: "搜索", target: "字节跳动 产品 业务线" },
      { verb: "写入", target: "company_background.md" },
      { verb: "写入", target: "job_profile.md" },
    ],
    reply: "已完成岗位分析，目录结构如下：",
    placeholder: "回复…",
    tree: [
      { name: "data/10001/jobs/字节跳动-产品/", dir: true },
      { name: "jd.md" },
      { name: "company_background.md" },
      { name: "job_profile.md" },
    ],
    narration1: "只需一句话，Resume Database 就能帮你搞定一切。",
    narration2: "自动读取岗位 JD，完成企业背调，生成岗位画像……",
  },
  generate: {
    jdTitle: "岗位 JD",
    jdLines: [
      "负责产品的数据分析与效果复盘",
      "推动 **用户增长** 相关策略落地",
      "设计并跟进 **A/B测试**，沉淀方法论",
      "具备 **数据分析** 能力，熟悉 SQL",
    ],
    resumeTitle: "10001_字节跳动_产品_resume.docx",
    resumeLines: [
      "字节跳动 · 产品实习生（目标岗位）",
      "基于 **数据分析** 定位增长瓶颈，转化率提升 18%",
      "主导 2 轮 **A/B测试**，沉淀复盘文档",
      "围绕 **用户增长** 设计拉新活动方案",
    ],
    previews: [
      { file: "岗位画像.md", body: ["## 核心能力要求", "- 数据分析与指标拆解", "- 用户增长策略", "- A/B 测试设计"] },
      { file: "10001_字节跳动_产品_resume.docx", body: ["张同学 · 产品实习生", "某互联网公司 · 产品实习", "- 搭建漏斗看板，定位流失节点"] },
      { file: "10001_字节跳动_产品_interview_prep.md", body: ["## 预判问题", "1. 请介绍一次你主导的 A/B 测试", "2. 如何拆解增长指标", "3. 你如何判断实验结果显著"] },
    ],
    narration: "一键生成定向简历和面试准备文档，每个 bullet 都精准匹配岗位要求。",
    words: ["自动生成", "精准匹配", "面试准备", "经历包装"],
  },
  pack: {
    reply: "检测到您的项目经历与岗位有 gap，可以参考经历库中的「数据分析项目A」进行包装。建议先完成真实尝试：",
    steps: ["用公开数据集完成一次漏斗分析", "写出 2 条可验证的结论", "再把真实结果写进简历"],
    toast: "experience_library/数据分析项目A.md",
    narration: "还能参考他人经历包装项目，先做再写，让简历更有竞争力。",
  },
  brand: {
    name: "Resume Database",
    tagline: "大学生简历快速生成与面试准备工具",
    narration: "让简历生成回归高效，把时间留给真正重要的准备。",
    cta: "查看使用指南",
  },
  guide: {
    title: "使用指南",
    intro: "一个候选人，一份结构化 CV，多个岗位，每个岗位一份定制简历。",
    sections: [
      { h: "适合谁用", p: ["需要海投的大学生（校招、实习）", "有多段经历，需要针对不同岗位调整呈现方式", "需要系统化管理多个岗位投递进度"] },
      { h: "安装", p: ["需要 Node.js 22.20 及以上、Python 3.9 及以上，以及支持 Skills 的 AI 编程助手（如 Claude Code）。", "推荐直接把仓库 README 里的安装提示词发给你的助手，它会自动安装并初始化环境。"], code: "npx skills add Liunian06/resume-database --skill resume-database -g" },
      { h: "初始化环境", p: ["在准备存放简历数据的工作目录运行："], code: "python -m venv .venv\npython -m pip install python-docx openpyxl" },
      { h: "使用流程", steps: [
        ["建档", "说出想投的岗位，系统分配 user_ID 并创建候选人目录"],
        ["整理 CV", "提供旧简历或零散材料，生成结构化 cv_CN.md"],
        ["提供 JD", "粘贴 JD 原文或链接，写入 jd.md"],
        ["企业背调", "定位业务线、深挖业务、补充公司背景"],
        ["岗位画像", "结合 JD、背调、面经生成 job_profile.md"],
        ["定向简历", "按匹配度排序经历，输出 Markdown 与 DOCX"],
        ["面试准备", "自我介绍、每轮 20 个预判问题、3 个反问"],
        ["记录投递", "用 Excel 追踪每个岗位的进度与时间线"],
      ] },
      { h: "经历包装", p: ["当 CV 与岗位有 gap 时，可参考他人经历。核心原则是先做再写：按参考经历实际操作，再把真实尝试写成自己的经历，结果写回 CV，之后所有简历复用。"] },
      { h: "简历打分", p: ["给某个岗位的定向简历打分，只看简历与该岗位 JD 的匹配度，输出各维度分数、扣分原因和修改建议。默认只打分，需要时再让助手自动修改。"] },
      { h: "开始对话", p: ["安装完成后，直接在助手里说需求，例如：", "「我想投字节跳动的产品实习，帮我准备简历和面试材料」", "「我是 10001 号候选人，想投腾讯的数据分析岗」"] },
    ],
    community: { text: "遇到问题或想交流求职经验，扫码进群。", qrcode: "assets/qrcode.png" },
  },
  screens: [
    {
      id: "changelog",
      title: "更新日志",
      subtitle: "每次更新都有记录。",
      changelog: [
        { version: "1.0.5", date: "2026-10-23", items: ["修正 data 目录结构的文档描述"] },
        { version: "1.0.4", date: "2026-10-23", items: ["新增脚本末尾的版本更新检测"] },
      ],
    },
  ],
};
