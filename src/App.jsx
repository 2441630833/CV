import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import { profile } from "./data/cv.js";

const easeOut = [0.16, 1, 0.3, 1];

function usePointerParallax(ref) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let raf = null;

    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      smooth.x += (target.x - smooth.x) * 0.06;
      smooth.y += (target.y - smooth.y) * 0.06;
      const el = ref.current;
      if (el) {
        el.style.setProperty("--px", smooth.x.toFixed(3));
        el.style.setProperty("--py", smooth.y.toFixed(3));
      }
      if (Math.abs(target.x - smooth.x) > 0.001 || Math.abs(target.y - smooth.y) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

export default function App() {
  const rootRef = useRef(null);
  usePointerParallax(rootRef);

  return (
    <div
      ref={rootRef}
      className="ground grain relative min-h-screen font-sans text-white antialiased overflow-x-hidden selection:bg-sprout/30 selection:text-white"
    >
      <Navbar />

      {/* column guides */}
      <div
        className="column-guides pointer-events-none fixed inset-0 z-0 hidden lg:block"
        aria-hidden="true"
      >
        <i className="absolute top-0 bottom-0 left-1/4 w-px" />
        <i className="absolute top-0 bottom-0 left-2/4 w-px" />
        <i className="absolute top-0 bottom-0 left-3/4 w-px" />
      </div>

      {/* ghost wordmark */}
      <div
        className="ghost-word pointer-events-none fixed -bottom-6 left-0 z-0 hidden lg:block text-[16rem] font-light leading-none whitespace-nowrap"
        aria-hidden="true"
      >
        TIM
        </div>

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="relative z-10 border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="text-xl tracking-tight text-white font-medium">
              {profile.name}&reg;
            </span>
            <span className="text-sprout text-lg leading-none">✳</span>
          </div>
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} {profile.name} · {profile.role} ·{" "}
            {profile.location}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="text-sm text-sprout/90 font-medium hover:text-sprout transition-colors"
          >
            {profile.email}
          </a>
        </div>
      </motion.footer>
    </div>
  );
}
