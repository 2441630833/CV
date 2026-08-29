import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navLinks } from "../data/cv.js";

const sectionIds = navLinks.map((l) => l.href.slice(1));

function Mark({ size = 18 }) {
  // sprout / asterisk mark, echoing the Sylva glyph
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.4 2.4-6.2 5.7-6.2.3 3.7-2.3 6.6-5.7 6.2Z" />
      <path d="M12 15.4c-.2-4-2.4-6.2-5.2-6.2-.2 3.1 2.1 5.4 5.2 6.2Z" />
    </svg>
  );
}

function useScrollSpy() {
  const [active, setActive] = useState(navLinks[0].href);

  const compute = useCallback(() => {
    const offset = 140;
    let current = navLinks[0].href;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top - offset <= 0) current = "#" + id;
    }
    // scrolled to the very bottom -> last section (contact)
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4
    ) {
      current = navLinks[navLinks.length - 1].href;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [compute]);

  return active;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy();

  return (
    <>
      {/* Floating glass dock */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4"
      >
        <nav
          className="dock flex items-center gap-1 sm:gap-1.5 rounded-2xl p-1.5"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`dock-item hidden sm:inline-flex items-center rounded-lg border border-transparent px-3.5 h-9 sm:h-10 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
                  isActive
                    ? "bg-[#f2f3ef] text-[#23261f]"
                    : "text-white/45 hover:text-white/90"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href="#contact"
            className="dock-item inline-flex items-center gap-2 rounded-lg border border-sprout/40 bg-sprout/15 text-sprout px-3.5 h-9 sm:h-10 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-sprout/25"
          >
            <span className="hidden sm:inline">Get in touch</span>
            <span className="sm:hidden">Contact</span>
          </a>

          {/* mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden dock-item flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg border border-transparent"
          >
            <span
              className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 sm:hidden bg-moss-800/97 backdrop-blur-md flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const isActive = active === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                    aria-current={isActive ? "true" : undefined}
                    className={`text-4xl font-light py-2 border-b border-white/10 transition-colors ${
                      isActive ? "text-sprout" : "text-white/70"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + navLinks.length * 0.07, duration: 0.4 }}
                className="mt-6 inline-flex items-center gap-3 text-sprout text-xl"
              >
                Get in touch <Mark size={20} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
