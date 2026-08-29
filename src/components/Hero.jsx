import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter.js";
import { profile, stats } from "../data/cv.js";
import SylvaMoss from "./SylvaMoss.jsx";

const HEADLINE = "I build AI into\nthe physical world.";

function StatMark() {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className="w-8 h-8 text-white/35 shrink-0"
      aria-hidden="true"
    >
      <circle cx="15" cy="15" r="10.5" strokeDasharray="0.6 3.6" />
      <circle cx="15" cy="15" r="5.6" strokeDasharray="0.6 3.2" />
      <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const easeOut = [0.16, 1, 0.3, 1];

export default function Hero() {
  const { displayed, done } = useTypewriter(HEADLINE, 34, 700);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-32 pb-24 overflow-hidden"
    >
      {/* procedural moss-root world (Three.js) */}
      <SylvaMoss />

      {/* readability scrim so the headline stays legible over the moss */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(56,59,52,0.92) 0%, rgba(56,59,52,0.62) 34%, rgba(56,59,52,0.12) 62%, rgba(56,59,52,0) 80%), linear-gradient(0deg, rgba(56,59,52,0.55) 0%, rgba(56,59,52,0) 30%)",
        }}
      />

      {/* drifting light pool */}
      <div
        className="animate-drift pointer-events-none absolute -top-20 -right-24 w-[36rem] h-[36rem] rounded-full opacity-60 z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,230,184,0.14) 0%, rgba(207,230,184,0) 70%)",
        }}
      />

      <div className="relative z-[2] max-w-6xl mx-auto w-full">
        {/* identity badge */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          className="par-layer flex flex-wrap items-center gap-3 mb-8 text-sm"
          style={{ "--pd": 8, "--pr": 1 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-white/80">
            <MapPin size={14} className="text-sprout" />
            {profile.location}
          </span>
          <span className="inline-flex items-center rounded-full border border-sprout/30 bg-sprout/10 px-3.5 py-1.5 text-sprout">
            {profile.role}
          </span>
        </motion.div>

        {/* typewriter headline */}
        <div className="par-layer" style={{ "--pd": 18, "--pr": 1.2 }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
            className="text-[clamp(2.6rem,7vw,5.4rem)] font-extralight leading-[1.04] tracking-tight text-white whitespace-pre-wrap"
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[3px] h-[0.92em] bg-sprout align-middle ml-1 animate-blink" />
            )}
          </motion.h1>
        </div>

        {/* lede + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.55 }}
          className="par-layer mt-8 max-w-2xl"
          style={{ "--pd": 14, "--pr": 1 }}
        >
          <p className="text-lg sm:text-xl leading-relaxed text-white/65 font-light">
            I'm {profile.name.split(" ")[0]} — an AI developer and software
            engineer. I ship AI products, build physical-AI world models, and
            stand up the embodied-AI cloud platforms that train and deploy
            them.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="glass-pill inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white"
            >
              Explore the work
              <ArrowUpRight size={17} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors border-b border-white/25 hover:border-sprout pb-1"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        {/* stats */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.75 }}
          className="par-layer mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ "--pd": 11, "--pr": 0.8 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <StatMark />
              <div>
                <dd className="text-xl font-semibold text-white leading-tight">
                  {s.value}
                </dd>
                <dt className="text-[13px] text-white/55 font-light leading-snug mt-1">
                  {s.label}
                </dt>
              </div>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/45 hover:text-white transition-colors"
      >
        <span className="[writing-mode:vertical-rl]">Discover</span>
        <span className="relative w-px h-12 bg-white/15 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-2/5 bg-white/75 animate-trickle" />
        </span>
        <ArrowDown size={13} />
      </motion.a>
    </section>
  );
}
