import { motion } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading.jsx";
import { experience as jobs } from "../data/cv.js";

const easeOut = [0.16, 1, 0.3, 1];

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="relative px-6 sm:px-10 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index={t("experience.index")}
          label={t("experience.label")}
          title={t("experience.title")}
        />

        <div className="space-y-5">
          {jobs.map((job, i) => {
            const d = t(`experience.${job.id}`, { returnObjects: true });
            return (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: easeOut, delay: i * 0.05 }}
                className="paper p-7 sm:p-9 relative overflow-hidden"
              >
                {job.current && (
                  <span className="absolute top-7 right-7 sm:top-9 sm:right-9 inline-flex items-center gap-2 rounded-full bg-moss-700 text-sprout px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-sprout animate-pulse" />
                    {t("experience.current")}
                  </span>
                )}

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="text-2xl sm:text-[27px] font-normal tracking-tight text-paperink pr-24 sm:pr-0">
                    {d.short || d.company}
                  </h3>
                  <span className="text-sm text-paperlabel whitespace-nowrap">
                    {d.period}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-paperink/70 mb-5">
                  <span className="font-medium text-paperink">{d.role}</span>
                  {d.team && <span className="text-paperlabel">· {d.team}</span>}
                  <span className="inline-flex items-center gap-1 text-paperlabel">
                    <MapPin size={13} />
                    {d.location}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {d.points.map((p, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed text-paperink/75"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sprout-deep shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {job.id === "suochen" && job.links?.length > 0 && (
                  <div className="mt-10 mb-2">
                    <a
                      href={job.links[0].url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-moss-700/25 bg-moss-700/5 px-5 py-2.5 text-sm font-medium text-moss-700 transition-all hover:bg-moss-700 hover:text-sprout hover:border-moss-700 hover:gap-3"
                    >
                      {t("experience.visit")} <ArrowUpRight size={15} />
                    </a>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
