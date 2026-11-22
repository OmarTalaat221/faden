"use client";

import Container from "@/components/layout/container";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

/**
 * The markets FADEN builds in.
 *
 * This was a grid of photo tiles sitting directly under the service cards,
 * which are also a grid of photo tiles. Lightening it and moving the name
 * out of the image was not enough: both were still the same layout family,
 * and a visitor read the page as one long gallery either way.
 *
 * So the family changes, not the skin. The services are a grid of cards you
 * click into. A sector is a market we work in, with nothing behind it, and
 * that is a list. It is read as a list, down the right, with one large frame
 * on the left showing whichever name you are on.
 *
 * The photographs end up larger than they were, not smaller.
 */
export default function SectorsSection({ sectors }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  if (!sectors || !sectors.items?.length) return null;

  const items = sectors.items;

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

        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-start lg:gap-14">
          {/* The frame, on screens wide enough to show it beside the list.
              It follows whichever name is being read. */}
          <div className="hidden lg:order-2 lg:block lg:sticky lg:top-28">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[4px] bg-[var(--foreground)]/5">
              {/* All of them are drawn, stacked, and only the opacity moves.
                  Mounting one at a time left the frame empty for as long as
                  the next photograph took to arrive, which on a hover list is
                  every time the reader moves. */}
              {items.map((sector, i) => (
                <motion.div
                  key={sector.title ?? i}
                  aria-hidden={i !== active}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  {sector.image && (
                    <Image
                      src={sector.image}
                      alt={i === active ? sector.title : ""}
                      fill
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* The list itself. Rows, not tiles. */}
          <ul className="border-t border-[var(--foreground)]/12 md:grid md:grid-cols-2 md:gap-x-8 lg:order-1 lg:block">
            {items.map((sector, i) => {
              const isActive = i === active;

              return (
                <li key={sector.title ?? i}>
                  <button
                    type="button"
                    // Reading a name is what selects it. These lead nowhere,
                    // so a click has nothing to do and the button exists to
                    // make the list reachable by keyboard.
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex w-full items-center gap-4 border-b border-[var(--foreground)]/12 py-4 text-left sm:gap-6 lg:gap-0 lg:py-6"
                  >
                    {/* Below the frame's breakpoint this photograph is the
                        only one there is, so it is sized to be looked at
                        rather than to sit politely beside the name. */}
                    <span className="relative aspect-[4/3] w-[132px] shrink-0 overflow-hidden rounded-[4px] bg-[var(--foreground)]/5 sm:w-[168px] md:w-[150px] lg:hidden">
                      {sector.image && (
                        <Image
                          src={sector.image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 150px, (min-width: 640px) 168px, 132px"
                          className="object-cover"
                        />
                      )}
                    </span>

                    <span
                      aria-hidden
                      className={[
                        "hidden h-px shrink-0 bg-[var(--brand-primary)] transition-all duration-500 ease-out lg:block",
                        isActive ? "w-7 opacity-100" : "w-0 opacity-0",
                      ].join(" ")}
                    />

                    <span
                      className={[
                        "min-w-0 flex-1 font-semibold leading-[1.2] transition-all duration-500 ease-out",
                        "text-[15px] tracking-[-0.01em] sm:text-[17px] md:text-[19px]",
                        // The name is the design on a wide screen, so it is
                        // set at display size rather than list size.
                        "lg:text-[30px] lg:tracking-[-0.02em] xl:text-[36px]",
                        // Only where the frame is drawn: on a phone there
                        // is nothing for the mark to point at, and a red row
                        // with no reason reads as an error.
                        isActive
                          ? "text-[var(--foreground)] lg:pl-4 lg:text-[var(--brand-primary)]"
                          : "text-[var(--foreground)] lg:pl-0",
                      ].join(" ")}
                    >
                      {sector.title}
                    </span>

                    <span
                      aria-hidden
                      className={[
                        "absolute inset-x-0 bottom-[-1px] h-px origin-left bg-[var(--brand-primary)] transition-transform duration-500 ease-out",
                        isActive ? "scale-x-0 lg:scale-x-100" : "scale-x-0",
                      ].join(" ")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
