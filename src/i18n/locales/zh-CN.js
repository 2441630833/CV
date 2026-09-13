// 简体中文翻译目录。键名与 src/data/cv.js 中的稳定 id 对应。
export default {
  meta: {
    description:
      "Tim —— 位于上海的 AI 开发者与软件工程师。端到端打造物理 AI 世界模型、具身智能云平台与 AI 产品。",
    title: "Tim® — AI 开发者与软件工程师",
  },

  profile: {
    role: "AI 开发者与软件工程师",
    location: "中国 · 上海",
    summary:
      "AI 开发者与软件工程师，英国肯特大学计算机科学理学硕士（Distinction 优异成绩）。我端到端打造 AI 驱动的产品与平台——从前端体验到物理 AI 世界模型，再到具身智能云基础设施。我交付的一款工具已被全球 2 万多名设计师使用；我创造了全球首个可预测的物理流体世界模型，并向 NVIDIA Isaac Sim 回馈了贡献。",
  },

  hero: {
    headline: "我将 AI 带入\n物理世界。",
    lede: "我是 {{name}} —— 一名 AI 开发者与软件工程师。我交付 AI 产品、构建物理 AI 世界模型，并搭建用于训练与部署它们的具身智能云平台。",
    roles: [
      "我打造 AI 驱动的产品。",
      "物理 AI 与世界模型。",
      "我交付人们每天都在用的工具。",
    ],
    ctaWork: "查看作品",
    ctaTouch: "取得联系",
    discover: "向下探索",
  },

  stats: [
    { value: "首个", label: "可预测的流体世界模型" },
    { value: "2万+", label: "使用 Uigenius 的设计师" },
    { value: "#755", label: "NVIDIA Isaac Sim 贡献" },
    { value: "硕士", label: "计算机科学，Distinction — 肯特大学" },
  ],

  nav: {
    profile: "个人简介",
    experience: "工作经历",
    projects: "项目作品",
    contact: "联系方式",
    getInTouch: "取得联系",
    toggleMenu: "切换菜单",
  },

  language: {
    label: "语言",
  },

  about: {
    index: "01",
    label: "个人简介",
    title: "让作品说话。",
    education: "教育背景",
    outsideWork: "工作之外",
  },

  skills: [
    "AI / 大语言模型",
    "智能体 AI",
    "物理 AI",
    "世界模型",
    "图神经网络 GNN",
    "Python",
    "JavaScript",
    "Vue",
    "WebRTC",
    "NVIDIA Isaac Sim",
    "USD / SimReady",
    "Java",
    "Spring",
    "Flask",
    "MongoDB",
    "MySQL",
    "Redis",
    "Keras",
    "Docker",
    "Jenkins",
    "Maven",
  ],

  interests: ["足球", "羽毛球", "乒乓球", "电子游戏", "阅读"],

  education: {
    kent: {
      school: "肯特大学（英国）",
      degree: "计算机科学理学硕士 — 以 Distinction 优异成绩毕业",
      location: "英国英格兰肯特郡坎特伯雷",
      period: "2022年9月 – 2023年9月",
      detail:
        "AI 系统实现、数据挖掘与知识发现、数据与文本问题求解、软件工程、AI 编程、认知神经网络、自然计算、系统架构。",
    },
    tust: {
      school: "天津科技大学",
      degree: "人力资源管理理学学士",
      location: "中国天津",
      period: "2018年9月 – 2022年6月",
      detail: "",
    },
    lodz: {
      school: "罗兹大学（波兰）",
      degree: "交换生 — 人力资源管理",
      location: "波兰罗兹",
      period: "2019年12月 – 2020年6月",
      detail: "",
    },
  },

  experience: {
    index: "02",
    label: "工作经历",
    title: "我的成长轨迹。",
    current: "在职",
    visit: "访问 demxs.com",
    suochen: {
      company: "上海索辰信息科技有限公司",
      short: "索辰信息",
      role: "研发工程师",
      team: "具身智能组",
      location: "上海",
      period: "2026年5月 – 至今",
      points: [
        "索辰新官网（demxs.com）的主要构建者，端到端独立负责。",
        "物理世界模型的主要创造者，将图神经网络（GNN）与世界模型相结合——全球首个可预测的物理流体世界模型。",
        "构建了完整的 SimReady 数据生产流水线：从单张图像到生产级 USD 数据资产。",
        "升级了 NVIDIA Isaac Sim 平台上的 WebRTC，并为 x86 WebRTC 直播帧率 bug（GitHub issue #755）提交了上游修复。",
        "参与构建具身智能云平台：数据集、模型、SimReady USD 资产、自建仿真训练环境以及一体化部署流水线。",
      ],
    },
    cscse: {
      company: "中国留学服务中心（CSCSE）",
      short: "CSCSE",
      role: "系统工程师",
      team: "信息网络部门",
      location: "北京",
      period: "2025年7月 – 2026年5月",
      points: [
        "在信息网络部门从事系统工程相关工作。",
        "设计并运维网络化信息系统与服务。",
      ],
    },
    crcc: {
      company: "中国铁建（CRCC）",
      short: "CRCC",
      role: "Web 前端开发工程师",
      team: "地理信息与数字化工程研究院",
      location: "北京",
      period: "2024年3月 – 2025年7月",
      points: [
        "为内网地理空间平台构建前端：高精度定位、智慧物流以及数字化测绘。",
        "交付了组织架构、员工关系、考勤、薪酬与绩效管理等模块。",
        "将北斗 / GNSS 定位数据与实时解码集成到交互式 Web 应用中。",
      ],
    },
  },

  projects: {
    index: "03",
    label: "项目作品",
    title: "我交付过的东西。",
    mobius: {
      name: "Mobius —— 自进化的智能体开发环境",
      tag: "AI 智能体 · 创作者",
      blurb:
        "一个自进化的智能体开发环境（ADE）。Mobius 越用越聪明：它观察你的工作方式，将成功的操作提炼为可复用的技能（Skills），并通过意图识别推荐算法为每个任务自动匹配最相关的技能。智能体的能力随使用不断积累，而不是每次对话都从零开始。",
      highlights: ["智能体 IDE", "自进化技能", "意图识别"],
    },
    physicalWorldModel: {
      name: "物理世界模型（GNN + 世界模型）",
      tag: "具身智能 · 负责人",
      blurb:
        "主要创造者。将图神经网络与世界模型相结合，打造出全球首个可预测的物理流体世界模型——一套为具身智能训练与仿真预测流体行为的物理 AI 系统。",
      highlights: ["物理 AI", "GNN", "流体预测"],
    },
    simreadyPipeline: {
      name: "SimReady 数据流水线（图像 → USD）",
      tag: "仿真 · 负责人",
      blurb:
        "实现了构建 SimReady 数据资产的完整流水线——从单张输入图像，到用于驱动仿真训练环境、可用于生产的 USD 数据资产。",
      highlights: ["USD 资产", "仿真到现实", "完整流水线"],
    },
    isaacSimWebrtc: {
      name: "NVIDIA Isaac Sim WebRTC 升级",
      tag: "开源 · 上游贡献",
      blurb:
        "为 NVIDIA Isaac Sim 平台创新并升级了 WebRTC。诊断了在 targetFps=120 + NVENC 下 x86 WebRTC 直播卡在约 60 FPS 的问题，并将修复贡献到 NVIDIA Isaac Sim 官方 GitHub 仓库。",
      highlights: ["WebRTC", "NVENC", "上游修复"],
    },
    embodiedCloud: {
      name: "具身智能云平台",
      tag: "平台 · 索辰",
      blurb:
        "参与共创了一个集成完整具身智能训练与部署流水线的云平台：数据集、模型、SimReady USD 数据资产、自建仿真训练环境（类似 Isaac Sim）以及一体化部署环境。",
      highlights: ["数据集与模型", "仿真训练环境", "部署流水线"],
    },
    suochenWebsite: {
      name: "索辰官网",
      tag: "网站 · 主要负责人",
      blurb: "索辰信息科技新版企业官网的主要构建者。",
      highlights: ["企业官网", "主导构建", "已上线"],
    },
    studyAbroadAssistant: {
      name: "出国留学助手",
      tag: "政务平台 · 主要负责人",
      blurb:
        "中国留学服务中心（CSCSE）官方平台。我在 CSCSE 任职期间主导了该项目——这是一个旗舰级留学服务平台，已服务数十万名留学生，为出国留学的中国学生提供咨询、申请支持与跨境留学服务。",
      highlights: ["CSCSE 旗舰项目", "数十万用户", "主导构建"],
    },
    uigenius: {
      name: "Uigenius",
      tag: "AI 产品 · 负责人",
      blurb:
        "一款 AI 驱动的 UX/UI 设计工具，可根据简单的文字描述生成 App 与网站原型。全球超过 2 万名设计师在使用，每天有 2000+ 新用户访问。",
      highlights: ["文本生成原型", "2万+ 用户", "快速增长"],
    },
    longzePlayer: {
      name: "Longze 视频播放器",
      tag: "AI 产品",
      blurb:
        "一款强大的 AI 视频播放器，支持 MP4、WebM 与 Ogg。支持 10+ 语言自动转录、翻译、音频导出与 AI 摘要。日活用户 1000+，人均使用时长 40 分钟以上。",
      highlights: ["自动转录", "10+ 语言", "AI 摘要"],
    },
    longzeVuePlayer: {
      name: "longze-vue3-video-player",
      tag: "开源 · 独立开发",
      blurb:
        "独立开发的开源 Vue 3 视频播放器组件，已发布于 npm。支持快捷键、播放速度、镜像、深色模式、画中画、全屏与断点续播；修复了全局导入及 HLS/MP4 兼容性问题。",
      highlights: ["Vue 3", "npm 已发布", "独立维护者"],
    },
    copyrightGenerator: {
      name: "Longze-copyright-code-generator",
      tag: "开源 · 独立开发",
      blurb:
        "一款自动化工具，用于生成中国软件著作权登记所需的软件著作权源代码文档，大幅减少手工制作源代码设计文件的工作量。",
      highlights: ["软著文档", "自动化", "独立维护者"],
    },
  },

  contact: {
    index: "04",
    label: "联系方式",
    title: "一起创造点什么吧。",
    heading: "你想聊点什么？",
    selectHint: "可多选",
    placeholder: "请点击上方选择一个主题。",
    ready: "准备聊一聊：",
    letsGo: "出发",
    directChannels: "直接联系渠道",
    email: "邮箱",
    phone: "电话",
    location: "所在地",
    blog: "博客",
    topics: {
      job: "工作机会",
      freelance: "自由职业 / 外包",
      collaboration: "合作",
      hello: "只是打个招呼",
    },
    mail: {
      subject: "想和你聊聊 — {{topics}}",
      subjectFallback: "想和你聊聊 — 一个项目",
      body: "Tim 你好，\n\n我联系你是想聊：{{topics}}\n\n",
      bodyFallback: "Tim 你好，\n\n我联系你是想聊：...\n\n",
    },
  },

  footer: {
    rights: "© {{year}} {{name}} · {{role}} · {{location}}",
  },
};
