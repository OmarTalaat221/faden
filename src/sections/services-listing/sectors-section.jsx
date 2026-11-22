"use client";

import Container from "@/components/layout/container";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The markets FADEN builds in.
 *
 * Two things set this layout, and both come from the photographs rather than
 * from taste. Every sector image is 786 by 441: exactly 16:9, and no wider
 * than 786. So the frame is 16:9 and never asked to be anything else, and it
 * is capped near 786 across. Earlier versions cropped these to a square, to a
 * portrait and to a letterbox strip, and stretched the strip to 1260 across.
 * That is why none of them looked right: the subject was cut and the pixels
 * were invented.
 *
 * The rest follows. A 16:9 frame is wide and short, so the names sit beside
 * it rather than under it, and the frame is fixed in size, so a name can be
 * read by hovering without the page moving under the cursor.
 *
 * It is a frame and an index, which the service cards above are not. GSAP
 * crossfades the photographs; Motion is deliberately absent from this file,
 * since the two fight over the same frames.
 */
export default function SectorsSection({ sectors }) {
  const framesRef = useRef([]);
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);

  const items = sectors?.items ?? [];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      framesRef.current.forEach((frame, i) => {
        if (!frame) return;
        gsap.to(frame, {
          opacity: i === active ? 1 : 0,
          duration: reduce ? 0 : 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    }, root);

    return () => ctx.revert();
  }, [active, items.length]);

  if (!sectors || !items.length) return null;

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

        <div
          ref={rootRef}
          className="mt-8 grid gap-7 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14"
        >
          {/* 16:9 because the photographs are, and capped near their own
              width so none of this is upscaled. Above the list on a phone,
              beside it once there is room. */}
          <div className="relative aspect-video w-full max-w-[760px] overflow-hidden rounded-[4px] bg-[var(--foreground)]/5">
            {items.map((sector, i) => (
              <div
                key={sector.title ?? i}
                ref={(el) => {
                  framesRef.current[i] = el;
                }}
                aria-hidden={i !== active}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {sector.image && (
                  <Image
                    src={sector.image}
                    alt={i === active ? sector.title : ""}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          <ul className="border-t border-[var(--foreground)]/12">
            {items.map((sector, i) => {
              const isActive = i === active;

              return (
                <li key={sector.title ?? i}>
                  <button
                    type="button"
                    // Safe on hover: the frame never changes size, so nothing
                    // moves under the cursor as the reader goes down the list.
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className="flex w-full items-center gap-3 border-b border-[var(--foreground)]/12 py-3 text-left sm:gap-4 sm:py-3.5"
                  >
                    <span
                      aria-hidden
                      className={[
                        "h-px shrink-0 bg-[var(--brand-primary)] transition-all duration-400 ease-out",
                        isActive
                          ? "w-6 opacity-100 sm:w-8"
                          : "w-2.5 opacity-30 sm:w-3",
                      ].join(" ")}
                    />

                    <span
                      className={[
                        "min-w-0 flex-1 font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300",
                        "text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px]",
                        isActive
                          ? "text-[var(--brand-primary)]"
                          : "text-[var(--foreground)]",
                      ].join(" ")}
                    >
                      {sector.title}
                    </span>
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
