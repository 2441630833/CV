// English translation catalog.
// Keys are stable ids shared with src/data/cv.js.
export default {
  meta: {
    description:
      "Tim — AI Developer & Software Engineer in Shanghai. Building physical-AI world models, embodied-AI cloud platforms and AI products end to end.",
    title: "Tim® — AI Developer & Software Engineer",
  },

  profile: {
    role: "AI Developer & Software Engineer",
    location: "Shanghai, China",
    summary:
      "AI developer and software engineer with a Distinction MSc in Computer Science from the University of Kent. I build AI-powered products and platforms end to end — from front-end experiences to physical-AI world models and embodied-AI cloud infrastructure. 20,000+ designers worldwide use a tool I shipped; I created the world's first predictable physics-fluid world model and contributed back to NVIDIA Isaac Sim.",
  },

  hero: {
    headline: "I build AI into\nthe physical world.",
    lede: "I'm {{name}} — an AI developer and software engineer. I ship AI products, build physical-AI world models, and stand up the embodied-AI cloud platforms that train and deploy them.",
    roles: [
      "I build AI-powered products.",
      "Physical AI & world models.",
      "I ship tools people use daily.",
    ],
    ctaWork: "Explore the work",
    ctaTouch: "Get in touch",
    discover: "Discover",
  },

  stats: [
    { value: "1st", label: "Predictable fluid world model" },
    { value: "20k+", label: "Designers using Uigenius" },
    { value: "#755", label: "NVIDIA Isaac Sim contribution" },
    { value: "MSc", label: "CS, Distinction — Kent" },
  ],

  nav: {
    profile: "Profile",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    getInTouch: "Get in touch",
    toggleMenu: "Toggle menu",
  },

  language: {
    label: "Language",
  },

  about: {
    index: "01",
    label: "Profile",
    title: "Let the work lead.",
    education: "Education",
    outsideWork: "Outside work",
  },

  skills: [
    "AI / LLMs",
    "Agentic AI",
    "Physical AI",
    "World Models",
    "GNN",
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

  interests: ["Football", "Badminton", "Table tennis", "Video games", "Reading"],

  education: {
    kent: {
      school: "University of Kent, UK",
      degree: "MSc Computer Science — Graduated with Distinction",
      location: "Canterbury, Kent, England",
      period: "Sep 2022 – Sep 2023",
      detail:
        "AI Systems Implementation, Data Mining & Knowledge Discovery, Problem Solving with Data & Text, Software Engineering, AI Programming, Cognitive Neural Networks, Natural Computing, Systems Architecture.",
    },
    tust: {
      school: "Tianjin University of Science & Technology",
      degree: "BSc Human Resource Management",
      location: "Tianjin, China",
      period: "Sep 2018 – Jun 2022",
      detail: "",
    },
    lodz: {
      school: "University of Lodz, Poland",
      degree: "Exchange — Human Resource Management",
      location: "Łódź, Poland",
      period: "Dec 2019 – Jun 2020",
      detail: "",
    },
  },

  experience: {
    index: "02",
    label: "Experience",
    title: "Where I've grown.",
    current: "Current",
    visit: "Visit demxs.com",
    suochen: {
      company: "Shanghai Suochen Information Technology Co., Ltd.",
      short: "Suochen Information",
      role: "R&D Engineer",
      team: "Embodied AI Group",
      location: "Shanghai",
      period: "May 2026 – Present",
      points: [
        "Principal builder of the new Suochen official website (demxs.com), owning it end to end.",
        "Principal creator of a physical world model that combines GNNs with world models — the world's first predictable physics-fluid world model.",
        "Built the full SimReady Data construction pipeline: from a single image to production USD data assets.",
        "Upgraded WebRTC on the NVIDIA Isaac Sim platform and shipped an upstream fix for the x86 WebRTC livestream frame-rate bug (GitHub issue #755).",
        "Helped build the embodied-AI cloud platform: datasets, models, SimReady USD assets, a self-built simulated training environment, and an integrated deployment pipeline.",
      ],
    },
    cscse: {
      company: "CSCSE",
      short: "CSCSE",
      role: "System Engineer",
      team: "Information Network Department",
      location: "Beijing",
      period: "Jul 2025 – May 2026",
      points: [
        "Systems engineering within the Information Network Department.",
        "Designed and operated networked information systems and services.",
      ],
    },
    crcc: {
      company: "CRCC",
      short: "CRCC",
      role: "Web Front-End Developer",
      team: "Institute of Geographic Information and Digital Engineering",
      location: "Beijing",
      period: "Mar 2024 – Jul 2025",
      points: [
        "Built front-ends for intranet geospatial platforms: high-precision positioning, smart logistics, and digital surveying & mapping.",
        "Delivered modules for org structure, employee relations, attendance, payroll, and performance management.",
        "Integrated BeiDou/GNSS positioning data and real-time decoding into interactive web applications.",
      ],
    },
  },

  projects: {
    index: "03",
    label: "Builds",
    title: "Things I've shipped.",
    mobius: {
      name: "Mobius — Self-Evolving Agentic Development Environment",
      tag: "AI Agents · Creator",
      blurb:
        "A self-evolving agentic development environment (ADE). Mobius gets smarter the more you use it: it observes how you work, distills successful operations into reusable Skills, and automatically matches the most relevant Skill to each task through an intent-recognition recommendation algorithm. The agent's capabilities accumulate with use instead of starting from zero every conversation.",
      highlights: ["Agentic IDE", "Self-evolving Skills", "Intent recognition"],
    },
    physicalWorldModel: {
      name: "Physical World Model (GNN + World Model)",
      tag: "Embodied AI · Lead",
      blurb:
        "Principal creator. Combines Graph Neural Networks with world models to produce the world's first predictable physics-fluid world model — a physical AI system that forecasts fluid behaviour for embodied-AI training and simulation.",
      highlights: ["Physical AI", "GNN", "Fluid prediction"],
    },
    simreadyPipeline: {
      name: "SimReady Data Pipeline (Image → USD)",
      tag: "Simulation · Lead",
      blurb:
        "Implemented the complete pipeline for constructing SimReady data assets — from a single input image to production-ready USD data assets used to drive simulated training environments.",
      highlights: ["USD assets", "Sim-to-real", "Full pipeline"],
    },
    isaacSimWebrtc: {
      name: "NVIDIA Isaac Sim WebRTC Upgrade",
      tag: "Open Source · Upstream",
      blurb:
        "Innovated and upgraded WebRTC for the NVIDIA Isaac Sim platform. Diagnosed the x86 WebRTC livestream stuck at ~60 FPS with targetFps=120 + NVENC and contributed the fix to the official NVIDIA Isaac Sim GitHub repository.",
      highlights: ["WebRTC", "NVENC", "Upstream fix"],
    },
    embodiedCloud: {
      name: "Embodied-AI Cloud Platform",
      tag: "Platform · Suochen",
      blurb:
        "Co-created a cloud platform integrating the full embodied-AI training and deployment pipeline: datasets, models, SimReady USD data assets, a self-built simulated training environment (à la Isaac Sim), and an integrated deployment environment.",
      highlights: ["Datasets & models", "Sim training env", "Deploy pipeline"],
    },
    suochenWebsite: {
      name: "Suochen Official Website",
      tag: "Web · Principal",
      blurb:
        "Principal builder of the new version of the Suochen Information Technology official corporate website.",
      highlights: ["Corporate site", "Lead build", "Shipped"],
    },
    studyAbroadAssistant: {
      name: "Study Abroad Assistant",
      tag: "Gov Platform · Principal",
      blurb:
        "Official platform of the Chinese Service Center for Scholarly Exchange (CSCSE). I led this project during my time at CSCSE — a flagship study-abroad service platform that has already served hundreds of thousands of students, covering consultation, application support and cross-border study services for Chinese students studying abroad.",
      highlights: ["CSCSE flagship", "Hundreds of thousands of users", "Lead build"],
    },
    uigenius: {
      name: "Uigenius",
      tag: "AI Product · Lead",
      blurb:
        "AI-powered UX/UI design tool that generates prototypes for apps and websites from simple text descriptions. Over 20,000 designers worldwide use it, with 2,000+ new users visiting every day.",
      highlights: ["Text-to-prototype", "20k+ users", "Rapid growth"],
    },
    longzePlayer: {
      name: "Longze Video Player",
      tag: "AI Product",
      blurb:
        "A powerful AI video player supporting MP4, WebM and Ogg. Auto-transcription across 10+ languages, translation, audio export and AI summaries. 1k+ daily users averaging 40+ minutes of use.",
      highlights: ["Auto transcription", "10+ languages", "AI summaries"],
    },
    longzeVuePlayer: {
      name: "longze-vue3-video-player",
      tag: "Open Source · Solo",
      blurb:
        "Independently developed open-source Vue 3 video player component on npm. Shortcuts, playback speed, mirror, dark mode, picture-in-picture, fullscreen and resume-from-time; fixed global import and HLS/MP4 compatibility.",
      highlights: ["Vue 3", "npm published", "Solo maintainer"],
    },
    copyrightGenerator: {
      name: "Longze-copyright-code-generator",
      tag: "Open Source · Solo",
      blurb:
        "An automated tool for generating the software-copyright source-code documents required for software-copyright registration in China, cutting the manual effort of producing source-code design files.",
      highlights: ["Soft-copyright docs", "Automation", "Solo maintainer"],
    },
  },

  contact: {
    index: "04",
    label: "Contact",
    title: "Let's build something.",
    heading: "What's on your mind?",
    selectHint: "Select all that apply",
    placeholder: "Please click to select a topic above.",
    ready: "Ready to talk about:",
    letsGo: "Let's go",
    directChannels: "Direct channels",
    email: "Email",
    phone: "Phone",
    location: "Location",
    blog: "Blog",
    topics: {
      job: "Job opportunity",
      freelance: "Freelance",
      collaboration: "Collaboration",
      hello: "Just saying hi",
    },
    mail: {
      subject: "Let's talk — {{topics}}",
      subjectFallback: "Let's talk — a project",
      body: "Hi Tim,\n\nI'm reaching out about: {{topics}}\n\n",
      bodyFallback: "Hi Tim,\n\nI'm reaching out about: ...\n\n",
    },
  },

  footer: {
    rights: "© {{year}} {{name}} · {{role}} · {{location}}",
  },
};
