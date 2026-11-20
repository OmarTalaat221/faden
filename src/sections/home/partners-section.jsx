"use client";

import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * The strategic partner, summarised. Same record the /partners page reads, so
 * editing the partner in the dashboard updates both. The photo is optional —
 * without one the copy runs the full width instead of leaving a gap.
 *
 * The band opens on a lockup of the two marks rather than the partner's logo
 * alone, because a partnership is the thing being announced and one logo on
 * its own does not say it. Each mark sits on its own white tile: the logos
 * come from two different sources and arrive at different proportions, and a
 * tile sized by height keeps a square upload as legible as a wide one.
 */
export default function PartnersSection({ partner }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  // An observer of our own rather than whileInView: the tiles start clipped
  // and a clipped element reports no intersection, so whileInView never fires.
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
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!partner) return null;

  const hasImage = Boolean(partner.image);
  const bullets = Array.isArray(partner.bullets) ? partner.bullets : [];

  /** One step of the opening stagger. */
  const rise = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: shown ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-[#F9FAFB] py-10 sm:py-14 lg:py-16"
      aria-labelledby="partners-heading"
    >
      <Container>
        {/* Header: eyebrow + subtitle + link out, like the other home bands */}
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[16px]">
              {partner.eyebrow || "Partners"}
            </p>
            <h2
              id="partners-heading"
              className="mt-3 text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl md:text-[22px] lg:text-2xl xl:text-[24px]"
            >
              {partner.subtitle}
            </h2>
          </div>
          <div className="shrink-0">
            <ButtonLink
              href="/partners"
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              View Details
            </ButtonLink>
          </div>
        </div>

        <div
          ref={ref}
          className={
            hasImage
              ? "relative z-10 mt-10 grid items-start gap-10 sm:mt-12 md:grid-cols-[1.05fr_0.95fr] lg:gap-16"
              : "relative z-10 mt-10 sm:mt-12"
          }
        >
          <div className="min-w-0">
            {/* The lockup: FADEN, then the partner, on a line of their own. */}
            <div className="flex items-stretch gap-3 sm:gap-4">
              <motion.div {...rise(0)} className="min-w-0 flex-1 sm:flex-none">
                <LogoTile
                  src="/images/faden/logo.webp"
                  alt="FADEN Contracting Company"
                />
              </motion.div>

              <motion.span
                aria-hidden
                initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                animate={shown ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-4 shrink-0 items-center justify-center text-[20px] font-light leading-none text-[var(--muted-foreground)]/45 sm:w-5 sm:text-[22px]"
              >
                &times;
              </motion.span>

              <motion.div {...rise(0.22)} className="min-w-0 flex-1 sm:flex-none">
                <LogoTile src={partner.logo} alt={partner.logoAlt} />
              </motion.div>
            </div>

            <motion.h3
              {...rise(0.34)}
              className="mt-6 text-lg font-semibold tracking-[-0.01em] text-[var(--foreground)] sm:text-xl md:text-2xl lg:text-[26px]"
            >
              {partner.title}
            </motion.h3>

            <motion.p
              {...rise(0.4)}
              className="mt-2 text-xs font-normal text-[var(--muted-foreground)] sm:text-[13px] lg:text-sm"
            >
              {partner.badge}
            </motion.p>

            <motion.p
              {...rise(0.46)}
              className="mt-4 text-sm font-normal leading-[1.75] text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[17px]"
            >
              {partner.description}
            </motion.p>

            {/* What the partner brings, in their own words from the dashboard.
                The same list the /partners page carries, kept here because the
                description alone leaves the column short beside the photo and
                says nothing a procurement reader can weigh. */}
            {bullets.length > 0 && (
              <ul className="mt-7 divide-y divide-black/[0.07] border-t border-black/[0.07]">
                {bullets.map((bullet, index) => (
                  <motion.li
                    key={bullet}
                    {...rise(0.54 + index * 0.08)}
                    className="flex gap-3 py-3.5 text-[13px] leading-[1.65] text-[var(--muted-foreground)] sm:text-sm"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-[var(--brand-primary)]"
                    />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {hasImage && (
            // Taller than it is wide, so the frame reads as a portrait of one
            // building rather than a wide stock band.
            <RevealImage
              delay={180}
              className="mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-[4px] shadow-[0_24px_60px_rgba(0,0,0,0.10)] md:mx-0 md:aspect-[4/4.8] md:max-w-[430px] md:justify-self-end"
            >
              <Image
                src={partner.image}
                alt={partner.imageAlt || partner.title}
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 430px"
                className="object-cover"
              />
            </RevealImage>
          )}
        </div>
      </Container>
    </section>
  );
}

/**
 * One mark on a white tile. Sized by height with the width left to the
 * artwork, so a square logo and a wide lockup both come out legible without
 * either being stretched.
 */
function LogoTile({ src, alt }) {
  if (!src) return null;

  return (
    <div className="flex h-[76px] items-center justify-center rounded-[4px] border border-black/[0.06] bg-white px-3 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:h-[104px] sm:px-6 sm:py-4">
      <Image
        src={src}
        alt={alt || ""}
        width={240}
        height={96}
        loading="lazy"
        className="h-auto max-h-full w-auto max-w-full object-contain sm:max-w-[215px]"
      />
    </div>
  );
}
