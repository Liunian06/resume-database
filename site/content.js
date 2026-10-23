/**
 * 全站唯一文案来源。电脑版与手机版都从这里渲染，禁止在 desktop/、mobile/ 里硬编码文案。
 * version 与 changelog 由发版流程在构建时注入，这里的值仅用于本地开发。
 */
window.SITE_CONTENT = {
  meta: {
    title: "resume-database · 大学生海投简历与面试准备",
    description: "一份个人经历库，自动为每个岗位定制简历、准备面试题、追踪投递进度。",
  },
  repo: "Liunian06/resume-database",
  version: "1.0.5",
  install: {
    command: "npx skills add Liunian06/resume-database --skill resume-database -g",
    zipUrl: "https://github.com/Liunian06/resume-database/releases/latest",
  },
  screens: [
    {
      id: "hero",
      title: "海投不该是体力活",
      subtitle: "一份经历库，一个岗位一份简历。",
      cta: { label: "查看安装方式", target: "install" },
    },
    {
      id: "pain",
      title: "同一份简历，投给 50 家公司",
      subtitle: "每个 JD 要求不同，手改又慢又容易漏。",
      points: ["反复复制粘贴", "版本散落一地", "投完就忘了进度"],
    },
    {
      id: "flow",
      title: "从 JD 到定制简历",
      subtitle: "贴上岗位描述，剩下的交给 skill。",
      steps: ["粘贴 JD", "提取岗位画像", "匹配经历库", "生成定制简历"],
    },
    {
      id: "interview",
      title: "面试题，按岗位准备",
      subtitle: "结合你的简历和岗位要求，预演会被问到的问题。",
      cards: ["项目深挖", "岗位技能", "行为面试", "反问环节"],
    },
    {
      id: "tracker",
      title: "投递进度，一目了然",
      subtitle: "每家公司一行，状态随进展推进。",
      states: ["已投递", "笔试", "一面", "二面", "Offer"],
    },
    {
      id: "install",
      title: "一行命令装好",
      subtitle: "支持主流 AI 编程助手，装完直接对话使用。",
      copyLabel: "复制命令",
      copiedLabel: "已复制",
    },
    {
      id: "changelog",
      title: "持续更新",
      subtitle: "每次更新都有记录，交流群里可以直接反馈。",
      qrcode: "assets/qrcode.png",
      changelog: [
        { version: "1.0.5", date: "2026-10-23", items: ["修正 data 目录结构的文档描述"] },
        { version: "1.0.4", date: "2026-10-23", items: ["新增脚本末尾的版本更新检测"] },
      ],
    },
  ],
};
