"use client";

import FadenLogo from "@/components/common/faden-logo";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The two marks in the footer's first column: FADEN's own, and the Vision 2030
 * mark under it at the same width.
 *
 * No caption under either — the marks stand alone, so nothing on the page can
 * be read as a claim of partnership or endorsement. The Vision artwork is the
 * official black version, used as supplied: never recoloured, tilted or
 * cropped.
 *
 * Both wipe in from the left the first time the footer is reached, FADEN
 * first. The reveal is driven by an observer of our own rather than
 * whileInView: a wrapper that starts fully clipped reports no intersection, so
 * whileInView never fired and the marks stayed invisible.
 */
export default function FooterMarks() {
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

  const wipe = (delay) => ({
    initial: reduceMotion
      ? false
      : { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    animate: shown ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : undefined,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div ref={ref}>
      <motion.div {...wipe(0)}>
        <FadenLogo
          width={186}
          height={125}
          className="w-[150px] sm:w-[170px] lg:w-[186px]"
        />
      </motion.div>

      <motion.div
        {...wipe(0.25)}
        // The same width as the FADEN mark above it, with the artwork's own
        // proportions kept. The file is the official black PNG with its
        // transparent margin trimmed off — the mark was drawn inside a wide
        // empty frame, so at a matched box it rendered visibly smaller than
        // FADEN's and sat further away than the spacing said.
        className="relative mt-4 aspect-[1554/1046] w-[150px] sm:w-[170px] lg:w-[186px]"
      >
        <Image
          src="/images/faden/vision-2030.png"
          alt="Saudi Vision 2030"
          fill
          sizes="186px"
          // Loaded up front: a clipped wrapper never triggers lazy loading, so
          // the mark would arrive blank.
          priority
          className="object-contain object-left"
        />
      </motion.div>
    </div>
  );
}
