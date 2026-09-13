// Structural / non-translatable data only.
// All user-facing copy lives in src/i18n/locales/{en,zh-CN}.js keyed by the
// stable ids defined here, so the site is fully bilingual (English / 简体中文).

export const profile = {
  name: "Tim",
  handle: "tim",
  initials: "T",
  email: "longzezhu1@outlook.com",
  phone: "+86 18722502660",
  blog: "https://blog.csdn.net/kentturing",
  blogLabel: "CSDN · kentturing",
};

// Section navigation — labels come from i18n: ui.nav.<id>
export const navSections = [
  { id: "profile", href: "#about" },
  { id: "experience", href: "#experience" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
];

// Experience order + flags. Text keyed by id under `experience.<id>`.
export const experience = [
  {
    id: "suochen",
    current: true,
    links: [{ label: "demxs.com", url: "https://www.demxs.com/" }],
  },
  { id: "cscse", current: false, links: [] },
  { id: "crcc", current: false, links: [] },
];

// Education order. Text keyed by id under `education.<id>`.
export const education = ["kent", "tust", "lodz"];

// Projects order + links (URLs are language-independent). Text keyed by id
// under `projects.<id>`.
export const projects = [
  {
    id: "mobius",
    links: [
      { label: "github.com/2441630833/Mobius", url: "https://github.com/2441630833/Mobius" },
    ],
  },
  { id: "physicalWorldModel", links: [] },
  { id: "simreadyPipeline", links: [] },
  {
    id: "isaacSimWebrtc",
    links: [
      {
        label: "Isaac Sim issue #755",
        url: "https://github.com/isaac-sim/IsaacSim/issues/755",
      },
    ],
  },
  { id: "embodiedCloud", links: [] },
  {
    id: "suochenWebsite",
    links: [{ label: "demxs.com", url: "https://www.demxs.com/" }],
  },
  {
    id: "studyAbroadAssistant",
    links: [{ label: "cglxzs.cscse.edu.cn", url: "https://cglxzs.cscse.edu.cn/" }],
  },
  {
    id: "uigenius",
    links: [
      { label: "uigenius.top", url: "https://uigenius.top" },
      {
        label: "Windows desktop",
        url: "https://apps.microsoft.com/detail/9P7XBXGZN5JS",
      },
    ],
  },
  {
    id: "longzePlayer",
    links: [
      {
        label: "Windows app",
        url: "https://apps.microsoft.com/detail/9NQ3W9QGGV2D",
      },
    ],
  },
  {
    id: "longzeVuePlayer",
    links: [
      {
        label: "npm package",
        url: "https://www.npmjs.com/package/longze-vue3-video-player",
      },
    ],
  },
  {
    id: "copyrightGenerator",
    links: [
      {
        label: "github.com/2441630833/Longze-copyright-code-generator",
        url: "https://github.com/2441630833/Longze-copyright-code-generator",
      },
    ],
  },
];
