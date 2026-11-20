"use client";

import ContentIcon from "@/components/common/content-icon";
import Container from "@/components/layout/container";
import { DEMO_PARTNER_CONTACT } from "@/lib/contact/partner-contact";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The partner's own details, under FADEN's. Kept as a separate band rather
 * than mixed into the card above, because a visitor on this page is writing
 * to FADEN: putting two sets of numbers in one column would leave them
 * guessing which to use.
 */
export default function PartnerContactSection() {
  const partner = DEMO_PARTNER_CONTACT;
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rise = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: shown ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative overflow-hidden bg-white pb-10 sm:pb-10 md:pb-14 lg:pb-16">
      <Container>
        <div
          ref={ref}
          className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:p-7 md:p-8 lg:p-10"
        >
          <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:gap-14">
            {/* Who this is, and the way out to their own site. */}
            <motion.div {...rise(0)} className="lg:w-[300px] lg:shrink-0">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted-foreground)]/70">
                Our partner
              </p>
              <div className="inline-flex h-[72px] items-center justify-center rounded-[4px] border border-black/[0.08] bg-white px-4 py-3 sm:h-[84px] sm:px-5">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={240}
                  height={96}
                  loading="lazy"
                  className="h-auto max-h-full w-auto max-w-full object-contain sm:max-w-[200px]"
                />
              </div>

              <p className="mt-4 text-sm leading-[1.7] text-[var(--muted-foreground)] sm:text-[15px]">
                {partner.caption}
              </p>

              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] underline decoration-[var(--brand-primary)]/40 underline-offset-[3px] transition-colors hover:decoration-[var(--brand-primary)] sm:text-[15px]"
              >
                {partner.websiteLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>

            {/* The details themselves, on a divided rail so each one is its
                own line to scan rather than a paragraph to read. */}
            <ul className="min-w-0 flex-1 divide-y divide-black/[0.07] border-t border-black/[0.07]">
              {partner.items.map((item, index) => (
                <motion.li
                  key={item.label}
                  {...rise(0.1 + index * 0.08)}
                  className="flex items-start gap-3 py-4 sm:gap-4 sm:py-5"
                >
                  <ContentIcon
                    name={item.icon}
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-primary)]"
                    strokeWidth={2.5}
                    fill="currentColor"
                    fillOpacity={0.15}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)] sm:text-[15px]">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 inline-block whitespace-pre-line text-sm text-[var(--muted-foreground)] underline decoration-1 underline-offset-2 transition-colors hover:text-[var(--brand-primary)] sm:text-[15px]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 whitespace-pre-line text-sm leading-[1.65] text-[var(--muted-foreground)] sm:text-[15px]">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
