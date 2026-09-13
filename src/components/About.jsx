import { motion } from "motion/react";
import { GraduationCap, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading.jsx";
import { profile, education as educationIds } from "../data/cv.js";

const easeOut = [0.16, 1, 0.3, 1];

export default function About() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true });
  const interests = t("interests", { returnObjects: true });

  return (
    <section id="about" className="relative px-6 sm:px-10 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index={t("about.index")}
          label={t("about.label")}
          title={t("about.title")}
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Statement card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeOut}}
            className="paper lg:col-span-3 p-8 sm:p-10"
          >
            <p className="text-2xl sm:text-3xl font-light leading-snug text-paperink">
              {t("profile.summary")}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[13px] font-normal text-paperink/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Education + interests */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
              className="paper p-8 flex-1"
            >
              <div className="flex items-center gap-2.5 text-paperlabel mb-6">
                <GraduationCap size={18} />
                <span className="text-[13px] uppercase tracking-[0.2em]">
                  {t("about.education")}
                </span>
              </div>
              <ol className="space-y-6">
                {educationIds.map((id) => {
                  const e = t(`education.${id}`, { returnObjects: true });
                  return (
                    <li
                      key={id}
                      className="relative pl-5 border-l-2 border-paperink/10"
                    >
                      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sprout-deep" />
                      <p className="font-medium text-paperink leading-snug">
                        {e.school}
                      </p>
                      <p className="text-sm text-paperink/70 mt-0.5">{e.degree}</p>
                      <p className="text-xs text-paperlabel mt-1">{e.period}</p>
                    </li>
                  );
                })}
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.18 }}
              className="rounded-[28px] p-8 bg-moss-600 border border-white/10"
            >
              <div className="flex items-center gap-2.5 text-white/60 mb-5">
                <Sparkles size={18} className="text-sprout" />
                <span className="text-[13px] uppercase tracking-[0.2em]">
                  {t("about.outsideWork")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((i) => (
                  <span
                    key={i}
                    className="pill-dark rounded-full px-3.5 py-1.5 text-[13px]"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
