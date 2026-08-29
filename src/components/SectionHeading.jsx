import { motion } from "motion/react";

const easeOut = [0.16, 1, 0.3, 1];

export default function SectionHeading({ index, label, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-sprout/80">
          {index}
        </span>
        <span className="h-px w-10 bg-white/20" />
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">
          {label}
        </span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white">
        {title}
      </h2>
    </motion.div>
  );
}
