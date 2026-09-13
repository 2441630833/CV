import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, Mail, Phone, MapPin, Rss } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading.jsx";
import { profile } from "../data/cv.js";

const TOPIC_KEYS = ["job", "freelance", "collaboration", "hello"];

const easeOut = [0.16, 1, 0.3, 1];

export default function Contact() {
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);

  const toggle = (key) =>
    setTopics((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );

  const topicLabels = topics.map((key) => t(`contact.topics.${key}`));
  const joined = topicLabels.join(", ");

  const subject =
    topics.length > 0
      ? t("contact.mail.subject", { topics: joined })
      : t("contact.mail.subjectFallback");
  const body =
    topics.length > 0
      ? t("contact.mail.body", { topics: joined })
      : t("contact.mail.bodyFallback");

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const channels = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: t("profile.location"),
      href: null,
    },
    {
      icon: Rss,
      label: t("contact.blog"),
      value: profile.blogLabel,
      href: profile.blog,
    },
  ];

  return (
    <section id="contact" className="relative px-6 sm:px-10 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index={t("contact.index")}
          label={t("contact.label")}
          title={t("contact.title")}
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Inquiry card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="paper lg:col-span-3 p-8 sm:p-10"
          >
            <h3 className="text-2xl font-normal tracking-tight text-paperink mb-2">
              {t("contact.heading")}
            </h3>
            <p className="text-paperlabel mb-7">{t("contact.selectHint")}</p>

            <div className="flex flex-wrap gap-3">
              {TOPIC_KEYS.map((key) => {
                const active = topics.includes(key);
                return (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => toggle(key)}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-200 ${
                      active
                        ? "bg-moss-700 text-white shadow-md shadow-emerald-950/30"
                        : "bg-white text-paperink border border-black/10 hover:bg-black/5"
                    }`}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {active && (
                        <motion.span
                          key="check"
                          initial={{ opacity: 0, scale: 0.3, y: -8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: { type: "spring", stiffness: 300, damping: 20 },
                          }}
                          exit={{ opacity: 0, scale: 0.3 }}
                          className="inline-flex"
                        >
                          <Check size={16} className="text-sprout" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {t(`contact.topics.${key}`)}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {topics.length === 0 ? (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 }}
                  exit={{ opacity: 0 }}
                  className="italic text-xs text-paperink mt-8"
                >
                  {t("contact.placeholder")}
                </motion.p>
              ) : (
                <motion.div
                  key="banner"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white border border-black/10 px-5 py-4">
                    <p className="text-[15px] text-paperink">
                      {t("contact.ready")}{" "}
                      <span className="font-medium">{joined}</span>
                    </p>
                    <a
                      href={mailto}
                      className="inline-flex items-center gap-2 text-moss-700 uppercase tracking-[0.14em] text-xs font-semibold whitespace-nowrap hover:gap-3 transition-all"
                    >
                      {t("contact.letsGo")} <ArrowRight size={15} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.12 }}
            className="lg:col-span-2 rounded-[28px] p-8 sm:p-10 bg-moss-600 border border-white/10 flex flex-col"
          >
            <h3 className="text-sm uppercase tracking-[0.24em] text-white/50 mb-7">
              {t("contact.directChannels")}
            </h3>
            <ul className="space-y-5 flex-1">
              {channels.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <>
                    <span className="w-10 h-10 rounded-full bg-white/8 border border-white/12 grid place-items-center shrink-0">
                      <Icon size={17} className="text-sprout" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-white/40">
                        {c.label}
                      </span>
                      <span className="block text-[15px] text-white/90 mt-0.5 break-all">
                        {c.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-4 group"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
