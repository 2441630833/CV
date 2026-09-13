import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.js";
import zhCN from "./locales/zh-CN.js";

export const LOCALES = [
  { code: "en", label: "EN", nativeLabel: "English" },
  { code: "zh-CN", label: "中文", nativeLabel: "简体中文" },
];

const STORAGE_KEY = "cv-lang";

function detectInitialLanguage() {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "zh-CN") return stored;
  const nav = window.navigator.language || "en";
  return nav.toLowerCase().startsWith("zh") ? "zh-CN" : "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "zh-CN": { translation: zhCN },
  },
  lng: detectInitialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng === "zh-CN" ? "zh-CN" : "en";
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lng);
  }
});

// Set <html lang> on first load.
if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language === "zh-CN" ? "zh-CN" : "en";
}

export default i18n;
