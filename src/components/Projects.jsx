import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { projects } from "../data/cv.js";

const easeOut = [0.16, 1, 0.3, 1];

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 sm:px-10 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" label="Builds" title="Things I've shipped." />

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: easeOut, delay: (i % 2) * 0.08 }}
              whileHover={{ y: -6 }}
              className="paper p-7 sm:p-8 flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-paperlabel">
                  {p.tag}
                </span>
                <span className="w-9 h-9 rounded-full bg-moss-700 text-sprout grid place-items-center shrink-0">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <h3 className="text-xl sm:text-[22px] font-normal tracking-tight text-paperink leading-snug mb-3">
                {p.name}
              </h3>
              <p className="text-[15px] leading-relaxed text-paperink/70 mb-5">
                {p.blurb}
              </p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-paperink/70"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                {p.links.length > 0 && (
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    {p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-moss-700 hover:text-sprout-deep transition-colors"
                      >
                        {l.label} <ArrowUpRight size={13} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
