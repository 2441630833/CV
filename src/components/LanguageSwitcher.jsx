import { useTranslation } from "react-i18next";
import { LOCALES } from "../i18n/index.js";

/**
 * Compact EN / 中文 toggle. Persisted via i18n's languageChanged handler
 * (localStorage key "cv-lang"); initial language auto-detected from the
 * browser or stored preference.
 */
export default function LanguageSwitcher({ variant = "dock" }) {
  const { i18n } = useTranslation();
  const current = i18n.language === "zh-CN" ? "zh-CN" : "en";

  const dark = variant === "dark";

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-lg p-0.5 ${
        dark ? "bg-white/8 border border-white/12" : "bg-black/5"
      }`}
    >
      {LOCALES.map((locale) => {
        const active = current === locale.code;
        return (
          <button
            key={locale.code}
            type="button"
            onClick={() => i18n.changeLanguage(locale.code)}
            aria-pressed={active}
            lang={locale.code === "zh-CN" ? "zh-CN" : "en"}
            className={`h-8 min-w-[2.4rem] px-2 rounded-md text-[11px] font-medium tracking-[0.08em] transition-colors duration-200 ${
              dark
                ? active
                  ? "bg-[#f2f3ef] text-[#23261f]"
                  : "text-white/55 hover:text-white"
                : active
                  ? "bg-moss-700 text-white"
                  : "text-paperink/55 hover:text-paperink"
            }`}
          >
            {locale.label}
          </button>
        );
      })}
    </div>
  );
}
