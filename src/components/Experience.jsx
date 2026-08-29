import { motion } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { experience } from "../data/cv.js";

const easeOut = [0.16, 1, 0.3, 1];

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 sm:px-10 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="02" label="Experience" title="Where I've grown." />

        <div className="space-y-5">
          {experience.map((job, i) => (
            <motion.article
              key={job.company + job.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.05 }}
              className="paper p-7 sm:p-9 relative overflow-hidden"
            >
              {job.current && (
                <span className="absolute top-7 right-7 sm:top-9 sm:right-9 inline-flex items-center gap-2 rounded-full bg-moss-700 text-sprout px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-sprout animate-pulse" />
                  Current
                </span>
              )}

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <h3 className="text-2xl sm:text-[27px] font-normal tracking-tight text-paperink pr-24 sm:pr-0">
                  {job.short || job.company}
                </h3>
                <span className="text-sm text-paperlabel whitespace-nowrap">
                  {job.period}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-paperink/70 mb-5">
                <span className="font-medium text-paperink">{job.role}</span>
                {job.team && <span className="text-paperlabel">· {job.team}</span>}
                <span className="inline-flex items-center gap-1 text-paperlabel">
                  <MapPin size={13} />
                  {job.location}
                </span>
              </div>

              <ul className="space-y-2.5">
                {job.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-paperink/75">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sprout-deep shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {job.short === "Suochen Information" && (
                <div className="mt-10 mb-2">
                  <a
                    href="https://www.demxs.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-moss-700/25 bg-moss-700/5 px-5 py-2.5 text-sm font-medium text-moss-700 transition-all hover:bg-moss-700 hover:text-sprout hover:border-moss-700 hover:gap-3"
                  >
                    Visit demxs.com <ArrowUpRight size={15} />
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
