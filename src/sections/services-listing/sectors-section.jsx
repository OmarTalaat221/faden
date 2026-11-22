"use client";

import Container from "@/components/layout/container";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

/**
 * The markets FADEN builds in.
 *
 * This sat directly under the service cards and was built the same way: a
 * dark tile, a photo behind it, the name in white on a scrim, the same
 * rounded corner. Two bands with the same anatomy read as one long gallery,
 * and a visitor stopped being able to tell which was which.
 *
 * Every one of those signals is inverted here. The services are the page's
 * destinations, so they stay photo-led and dark with the name inside the
 * image. A sector is a label with a picture beside it, nothing to click, so
 * it is text-led and light, with the name under the photo in the page's own
 * ink. Nothing has been taken away; the two just no longer look like the
 * same thing twice.
 */
export default function SectorsSection({ sectors }) {
  const reduceMotion = useReducedMotion();

  if (!sectors || !sectors.items?.length) return null;

  return (
    <section
      data-preview-anchor="sectors"
      className="relative overflow-hidden bg-[var(--muted)] py-10 sm:py-10 md:py-14 lg:py-16"
    >
      <Container>
        <div className="max-w-4xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {sectors.eyebrow}
          </p>
          {sectors.subtitle && (
            <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              {sectors.subtitle}
            </p>
          )}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:mt-10 lg:grid-cols-4 lg:gap-x-8">
          {sectors.items.map((sector, i) => (
            <motion.li
              key={sector.title ?? i}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              {/* Wider than it is tall, and squared off, so it cannot be
                  mistaken for a service card at a glance. */}
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[4px] bg-[var(--foreground)]/5">
                {sector.image && (
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                )}
              </div>

              {/* The name sits on the page, in the page's ink, under a rule
                  that draws itself on hover. */}
              <span
                aria-hidden
                className="mt-4 block h-px w-full bg-[var(--foreground)]/12"
              >
                <span className="block h-px w-full origin-left scale-x-0 bg-[var(--brand-primary)] transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>

              <h3 className="mt-3 text-[13px] font-semibold leading-snug tracking-[-0.01em] text-[var(--foreground)] sm:text-sm md:text-[15px] lg:text-base">
                {sector.title}
              </h3>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
