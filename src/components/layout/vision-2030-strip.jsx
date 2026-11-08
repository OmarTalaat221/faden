"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The Vision 2030 mark, on its own strip between the footer columns and the
 * copyright bar.
 *
 * It is set apart from FADEN's own identity on purpose — its own rule, its own
 * row, and a line that says alignment rather than endorsement — so the page
 * never reads as if the programme is a partner or a client.
 *
 * The mark is wiped in from the left the first time the strip is scrolled to,
 * which is the one movement allowed on it: the artwork itself is never
 * recoloured, rotated or distorted.
 */
export default function Vision2030Strip() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-t border-[var(--border)]/60 py-6 sm:py-7">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <motion.div
          // Driven by an observer of our own rather than whileInView: a
          // wrapper that starts fully clipped reports no intersection, so the
          // reveal never fired and the mark stayed invisible.
          initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={shown ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          // Large enough for the Arabic and English lockup under the mark to
          // stay legible, as the identity guide requires.
          className="relative h-[76px] w-[112px] shrink-0 sm:h-[92px] sm:w-[136px]"
        >
          <Image
            src="/images/faden/vision-2030.png"
            alt="Saudi Vision 2030"
            fill
            sizes="136px"
            // Loaded up front: a clipped wrapper never triggers lazy loading,
            // so the mark would arrive blank.
            priority
            className="object-contain"
          />
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md text-center text-[12px] leading-relaxed text-[var(--muted-foreground)] sm:text-left sm:text-[13px]"
        >
          Building in line with the goals of Saudi Vision 2030.
        </motion.p>
      </div>
    </div>
  );
}
