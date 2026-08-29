import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, Mail, Phone, MapPin, Rss } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { profile } from "../data/cv.js";

const TOPICS = ["Job opportunity", "Freelance", "Collaboration", "Just saying hi"];

const easeOut = [0.16, 1, 0.3, 1];

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location, href: null },
  { icon: Rss, label: "Blog", value: "CSDN · kentturing", href: profile.blog },
];

export default function Contact() {
  const [topics, setTopics] = useState([]);

  const toggle = (t) =>
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Let's talk — ${topics.join(", ") || "a project"}`
  )}&body=${encodeURIComponent(
    `Hi Tim,\n\nI'm reaching out about: ${topics.join(", ") || "..."}\n\n`
  )}`;

  return (
    <section id="contact" className="relative px-6 sm:px-10 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="04" label="Contact" title="Let's build something." />

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
              What's on your mind?
            </h3>
            <p className="text-paperlabel mb-7">Select all that apply</p>

            <div className="flex flex-wrap gap-3">
              {TOPICS.map((t) => {
                const active = topics.includes(t);
                return (
                  <motion.button
                    key={t}
                    type="button"
                    onClick={() => toggle(t)}
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
                    {t}
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
                  Please click to select a topic above.
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
                      Ready to talk about:{" "}
                      <span className="font-medium">{topics.join(", ")}</span>
                    </p>
                    <a
                      href={mailto}
                      className="inline-flex items-center gap-2 text-moss-700 uppercase tracking-[0.14em] text-xs font-semibold whitespace-nowrap hover:gap-3 transition-all"
                    >
                      Let's go <ArrowRight size={15} />
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
              Direct channels
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
