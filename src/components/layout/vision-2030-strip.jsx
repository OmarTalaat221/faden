"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The Vision 2030 mark, under FADEN's own in the footer's logo column —
 * where identity marks belong, rather than on a strip of its own.
 *
 * No caption: the mark stands alone, so nothing on the page can be read as a
 * claim of partnership or endorsement.
 *
 * It wipes in from the left the first time the footer is scrolled to. The
 * artwork itself is never recoloured, tilted or cropped; swap the file for
 * another official variant if the surface changes.
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
    <div ref={ref} className="mt-6 sm:mt-7">
      <motion.div
        // Driven by an observer of our own rather than whileInView: a
        // wrapper that starts fully clipped reports no intersection, so the
        // reveal never fired and the mark stayed invisible.
        initial={
          reduceMotion ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
        }
        animate={
          shown ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : undefined
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        // Large enough for the Arabic and English lockup under the mark to
        // stay legible, as the identity guide requires.
        className="relative h-[72px] w-[106px] sm:h-[84px] sm:w-[124px]"
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
    </div>
  );
}
