"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/layout/container";

export default function ProcessSection({ section }) {
  const { title, subtitle, content } = section;
  const steps = content?.steps || [];

  const wrapperRef = useRef(null);
  const measureRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Detect if content overflows the wrapper (only then animate)
  useEffect(() => {
    if (!wrapperRef.current || !measureRef.current) return;

    const checkOverflow = () => {
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const contentWidth = measureRef.current.scrollWidth;
      setShouldAnimate(contentWidth > wrapperWidth + 20);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(wrapperRef.current);

    return () => resizeObserver.disconnect();
  }, [steps]);

  const handleMouseEnter = (e) => {
    if (shouldAnimate) e.currentTarget.style.animationPlayState = "paused";
  };
  const handleMouseLeave = (e) => {
    if (shouldAnimate) e.currentTarget.style.animationPlayState = "running";
  };

  if (!steps.length) return null;

  const stepClass =
    "inline-flex shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-white px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] sm:px-6 sm:py-3.5 sm:text-base";

  return (
    <section className="relative overflow-hidden bg-[var(--muted)] py-14 sm:py-16 md:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {title}
          </p>
          {subtitle && (
            <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Marquee (all breakpoints) — animates only if overflowing */}
        <div
          ref={wrapperRef}
          className={`mt-8 ${shouldAnimate ? "marquee-wrapper" : ""}`}
        >
          {shouldAnimate ? (
            <div
              className="marquee-track"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {steps.map((step, i) => (
                <div key={`a-${i}`} className={stepClass}>
                  {step}
                </div>
              ))}
              {steps.map((step, i) => (
                <div key={`b-${i}`} aria-hidden="true" className={stepClass}>
                  {step}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {steps.map((step, i) => (
                <div key={i} className={stepClass}>
                  {step}
                </div>
              ))}
            </div>
          )}

          {/* Hidden measurement element */}
          <div
            ref={measureRef}
            className="pointer-events-none invisible absolute -z-10 flex gap-3 sm:gap-4"
            aria-hidden="true"
          >
            {steps.map((step, i) => (
              <div key={`m-${i}`} className={stepClass}>
                {step}
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style jsx>{`
        .marquee-wrapper {
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: marquee 25s linear infinite;
        }

        @media (min-width: 640px) {
          .marquee-track {
            gap: 16px;
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 6px));
          }
        }

        @media (min-width: 640px) {
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-50% - 8px));
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}