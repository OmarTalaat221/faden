"use client";

import Container from "@/components/layout/container";
import {
  AUDIENCES,
  DEFAULT_AUDIENCE,
  audiencesOf,
  servicesFor,
} from "@/lib/services/audience";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * The catalogue, read through whoever is looking at it. The visitor says
 * whether they are a company or a private client and the grid answers with
 * the services open to them — a private owner never has to scroll past a
 * wastewater plant to find the one that is theirs.
 *
 * The lead service runs the full width and the rest sit two to a row, so the
 * page opens on one piece of work rather than a wall of equal tiles.
 */

function AudienceSwitch({ value, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Who the services are for"
      className="relative inline-flex rounded-full border border-[var(--border)] bg-[var(--background)] p-1 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
    >
      {AUDIENCES.map((audience) => {
        const active = audience.key === value;
        return (
          <button
            key={audience.key}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(audience.key)}
            className={cn(
              "relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-300 sm:px-6 sm:py-2.5 sm:text-sm",
              active ? "text-white" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
          >
            {/* The red pill is one element that moves between the tabs, so the
                switch reads as a single control rather than two buttons. */}
            {active && (
              <motion.span
                layoutId="audience-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-[var(--brand-primary)] shadow-[0_6px_18px_rgba(228,36,33,0.35)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{audience.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ServiceCard({ service, index, featured, audience, reduceMotion }) {
  // Worth saying on the card only where it is the exception: in the private
  // list everything is private, so the line would be noise on every card.
  const alsoPrivate =
    audience === "corporate" && audiencesOf(service).includes("individual");

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={featured ? "lg:col-span-2" : ""}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative isolate block h-full overflow-hidden rounded-2xl bg-[var(--foreground)] shadow-[0_18px_44px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(0,0,0,0.22)]"
      >
        <div
          className={cn(
            // h-full as well as the aspect: the aspect sets the card's own
            // height, and h-full makes the photo fill a card the grid row has
            // stretched taller, instead of leaving a dark band under it.
            "relative h-full w-full",
            featured
              ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]"
              : "aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]",
          )}
        >
          <Image
            src={service.img || "/images/faden/our-services-1.webp"}
            alt={service.name}
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
          {/* Two layers: a constant scrim that keeps the name legible on any
              photo, and a second that deepens on hover. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-white/60 tabular-nums sm:text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {alsoPrivate && (
                  <span className="rounded-full border border-white/25 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[11px]">
                    Also for private clients
                  </span>
                )}
              </div>

              <h3
                className={cn(
                  "mt-2 font-semibold leading-tight text-white",
                  featured
                    ? "text-xl sm:text-2xl md:text-[28px] lg:text-[30px]"
                    : "text-lg sm:text-xl md:text-[22px]",
                )}
              >
                {service.name}
              </h3>

              {service.description && (
                <p
                  className={cn(
                    "mt-2 text-[13px] leading-relaxed text-white/75 sm:text-sm",
                    featured ? "max-w-xl" : "max-w-md",
                  )}
                >
                  {service.description}
                </p>
              )}
            </div>

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] sm:h-12 sm:w-12">
              <ArrowUpRight
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-6 sm:w-6"
                strokeWidth={1.75}
              />
            </span>
          </div>

          {/* A rule that draws itself across the card on hover. */}
          <span
            aria-hidden
            className="mt-5 block h-[2px] w-full origin-left scale-x-0 bg-[var(--brand-primary)] transition-transform duration-700 ease-out group-hover:scale-x-100"
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesExplorer({ heading, services = [] }) {
  const [audience, setAudience] = useState(DEFAULT_AUDIENCE);
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () => servicesFor(services, audience),
    [services, audience],
  );

  const caption = AUDIENCES.find((a) => a.key === audience)?.caption;

  if (!services.length) return null;

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-10 md:py-14 lg:py-16">
      {/* The brand texture, kept to the places the content leaves empty: a
          hairline diagonal weave over the whole band, and the triangles in
          the gap beside the counter line. Anything laid under the cards is
          simply not seen. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--brand-primary) 0 1px, transparent 1px 14px)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[var(--brand-primary)] opacity-[0.06] blur-3xl"
      />
      {/* The triangle motif, drawn rather than loaded: the pattern PNGs in
          /images are near-white and vanish on a light band. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-2 hidden h-[190px] w-[190px] text-[var(--brand-primary)] opacity-[0.16] md:block xl:h-[230px] xl:w-[230px]"
        viewBox="0 0 120 120"
        fill="none"
      >
        <defs>
          <pattern
            id="faden-triangles"
            width="20"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <polygon points="10,1 19,17 1,17" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="120" height="120" fill="url(#faden-triangles)" />
      </svg>

      <Container className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
              {heading?.eyebrow || "Our Core Services"}
            </p>
            {heading?.subtitle && (
              <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
                {heading.subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 lg:items-end">
            <AudienceSwitch value={audience} onChange={setAudience} />
            <p className="text-[12px] text-[var(--muted-foreground)] sm:text-[13px] lg:text-right">
              {caption}
            </p>
          </div>
        </div>

        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-10 lg:grid-cols-3 lg:gap-7"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                featured={i === 0}
                audience={audience}
                reduceMotion={reduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 max-w-3xl text-[12px] leading-relaxed text-[var(--muted-foreground)] sm:text-[13px]">
          Showing{" "}
          <span className="font-semibold text-[var(--foreground)]">
            {visible.length}
          </span>{" "}
          of {services.length} services. Companies and public bodies can
          commission everything a private client can; the private list is the
          work we take on for individual owners.
        </p>
      </Container>
    </section>
  );
}
