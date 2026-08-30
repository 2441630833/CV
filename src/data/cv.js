// All content sourced from CV.pdf + 2026 updates — Tim
export const profile = {
  name: "Tim",
  handle: "tim",
  initials: "T",
  role: "AI Developer & Software Engineer",
  location: "Shanghai, China",
  email: "longzezhu1@outlook.com",
  phone: "+86 18722502660",
  blog: "https://blog.csdn.net/kentturing",
  summary:
    "AI developer and software engineer with a Distinction MSc in Computer Science from the University of Kent. I build AI-powered products and platforms end to end — from front-end experiences to physical-AI world models and embodied-AI cloud infrastructure. 20,000+ designers worldwide use a tool I shipped; I created the world's first predictable physics-fluid world model and contributed back to NVIDIA Isaac Sim.",
};

export const heroRoles = [
  "I build AI-powered products.",
  "Physical AI & world models.",
  "I ship tools people use daily.",
];

export const stats = [
  { value: "1st", label: "Predictable fluid world model" },
  { value: "20k+", label: "Designers using Uigenius" },
  { value: "#755", label: "NVIDIA Isaac Sim contribution" },
  { value: "MSc", label: "CS, Distinction — Kent" },
];

export const experience = [
  {
    company: "Shanghai Suochen Information Technology Co., Ltd.",
    short: "Suochen Information",
    role: "R&D Engineer",
    team: "Embodied AI Group",
    location: "Shanghai",
    period: "May 2026 – Present",
    current: true,
    points: [
      "Principal builder of the new Suochen official website (demxs.com), owning it end to end.",
      "Principal creator of a physical world model that combines GNNs with world models — the world's first predictable physics-fluid world model.",
      "Built the full SimReady Data construction pipeline: from a single image to production USD data assets.",
      "Upgraded WebRTC on the NVIDIA Isaac Sim platform and shipped an upstream fix for the x86 WebRTC livestream frame-rate bug (GitHub issue #755).",
      "Helped build the embodied-AI cloud platform: datasets, models, SimReady USD assets, a self-built simulated training environment, and an integrated deployment pipeline.",
    ],
  },
  {
    company: "CSCSE",
    short: "CSCSE",
    role: "System Engineer",
    team: "Information Network Department",
    location: "Beijing",
    period: "Jul 2025 – May 2026",
    current: false,
    points: [
      "Systems engineering within the Information Network Department.",
      "Designed and operated networked information systems and services.",
    ],
  },
  {
    company: "CRCC",
    short: "CRCC",
    role: "Web Front-End Developer",
    team: "Institute of Geographic Information and Digital Engineering",
    location: "Beijing",
    period: "Mar 2024 – Jul 2025",
    current: false,
    points: [
      "Built front-ends for intranet geospatial platforms: high-precision positioning, smart logistics, and digital surveying & mapping.",
      "Delivered modules for org structure, employee relations, attendance, payroll, and performance management.",
      "Integrated BeiDou/GNSS positioning data and real-time decoding into interactive web applications.",
    ],
  },
];

export const education = [
  {
    school: "University of Kent, UK",
    degree: "MSc Computer Science — Graduated with Distinction",
    location: "Canterbury, Kent, England",
    period: "Sep 2022 – Sep 2023",
    detail:
      "AI Systems Implementation, Data Mining & Knowledge Discovery, Problem Solving with Data & Text, Software Engineering, AI Programming, Cognitive Neural Networks, Natural Computing, Systems Architecture.",
  },
  {
    school: "Tianjin University of Science & Technology",
    degree: "BSc Human Resource Management",
    location: "Tianjin, China",
    period: "Sep 2018 – Jun 2022",
    detail: "",
  },
  {
    school: "University of Lodz, Poland",
    degree: "Exchange — Human Resource Management",
    location: "Łódź, Poland",
    period: "Dec 2019 – Jun 2020",
    detail: "",
  },
];

export const projects = [
  {
    name: "Mobius — Self-Evolving Agentic Development Environment",
    tag: "AI Agents · Creator",
    blurb:
      "A self-evolving agentic development environment (ADE). Mobius gets smarter the more you use it: it observes how you work, distills successful operations into reusable Skills, and automatically matches the most relevant Skill to each task through an intent-recognition recommendation algorithm. The agent's capabilities accumulate with use instead of starting from zero every conversation.",
    links: [
      { label: "github.com/2441630833/Mobius", url: "https://github.com/2441630833/Mobius" },
    ],
    highlights: ["Agentic IDE", "Self-evolving Skills", "Intent recognition"],
  },
  {
    name: "Physical World Model (GNN + World Model)",
    tag: "Embodied AI · Lead",
    blurb:
      "Principal creator. Combines Graph Neural Networks with world models to produce the world's first predictable physics-fluid world model — a physical AI system that forecasts fluid behaviour for embodied-AI training and simulation.",
    links: [],
    highlights: ["Physical AI", "GNN", "Fluid prediction"],
  },
  {
    name: "SimReady Data Pipeline (Image → USD)",
    tag: "Simulation · Lead",
    blurb:
      "Implemented the complete pipeline for constructing SimReady data assets — from a single input image to production-ready USD data assets used to drive simulated training environments.",
    links: [],
    highlights: ["USD assets", "Sim-to-real", "Full pipeline"],
  },
  {
    name: "NVIDIA Isaac Sim WebRTC Upgrade",
    tag: "Open Source · Upstream",
    blurb:
      "Innovated and upgraded WebRTC for the NVIDIA Isaac Sim platform. Diagnosed the x86 WebRTC livestream stuck at ~60 FPS with targetFps=120 + NVENC and contributed the fix to the official NVIDIA Isaac Sim GitHub repository.",
    links: [
      {
        label: "Isaac Sim issue #755",
        url: "https://github.com/isaac-sim/IsaacSim/issues/755",
      },
    ],
    highlights: ["WebRTC", "NVENC", "Upstream fix"],
  },
  {
    name: "Embodied-AI Cloud Platform",
    tag: "Platform · Suochen",
    blurb:
      "Co-created a cloud platform integrating the full embodied-AI training and deployment pipeline: datasets, models, SimReady USD data assets, a self-built simulated training environment (à la Isaac Sim), and an integrated deployment environment.",
    links: [],
    highlights: ["Datasets & models", "Sim training env", "Deploy pipeline"],
  },
  {
    name: "Suochen Official Website",
    tag: "Web · Principal",
    blurb:
      "Principal builder of the new version of the Suochen Information Technology official corporate website.",
    links: [{ label: "demxs.com", url: "https://www.demxs.com/" }],
    highlights: ["Corporate site", "Lead build", "Shipped"],
  },
  {
    name: "Uigenius",
    tag: "AI Product · Lead",
    blurb:
      "AI-powered UX/UI design tool that generates prototypes for apps and websites from simple text descriptions. Over 20,000 designers worldwide use it, with 2,000+ new users visiting every day.",
    links: [
      { label: "uigenius.top", url: "https://uigenius.top" },
      {
        label: "Windows desktop",
        url: "https://apps.microsoft.com/detail/9P7XBXGZN5JS",
      },
    ],
    highlights: ["Text-to-prototype", "20k+ users", "Rapid growth"],
  },
  {
    name: "Longze Video Player",
    tag: "AI Product",
    blurb:
      "A powerful AI video player supporting MP4, WebM and Ogg. Auto-transcription across 10+ languages, translation, audio export and AI summaries. 1k+ daily users averaging 40+ minutes of use.",
    links: [
      {
        label: "Windows app",
        url: "https://apps.microsoft.com/detail/9NQ3W9QGGV2D",
      },
    ],
    highlights: ["Auto transcription", "10+ languages", "AI summaries"],
  },
  {
    name: "longze-vue3-video-player",
    tag: "Open Source · Solo",
    blurb:
      "Independently developed open-source Vue 3 video player component on npm. Shortcuts, playback speed, mirror, dark mode, picture-in-picture, fullscreen and resume-from-time; fixed global import and HLS/MP4 compatibility.",
    links: [
      {
        label: "npm package",
        url: "https://www.npmjs.com/package/longze-vue3-video-player",
      },
    ],
    highlights: ["Vue 3", "npm published", "Solo maintainer"],
  },
];

export const skills = [
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
];

export const interests = ["Football", "Badminton", "Table tennis", "Video games", "Reading"];

export const navLinks = [
  { label: "Profile", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
