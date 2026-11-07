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

function ServiceCard({ service, index, audience, reduceMotion }) {
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
            "relative h-full w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]",
          )}
        >
          <Image
            src={service.img || "/images/faden/our-services-1.webp"}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
          {/* One scrim, held to the bottom of the frame: the name has to be
              legible on any photo, but the photo is the point. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
          />
        </div>

        {alsoPrivate && (
          <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm sm:left-5 sm:top-5">
            Private clients too
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl md:text-[22px]">
                {service.name}
              </h3>

              {/* The description is the detail, not the headline: it opens on
                  hover so the photo and the name carry the card at rest. */}
              {service.description && (
                <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/80">
                      {service.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] sm:h-11 sm:w-11">
              <ArrowUpRight
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </span>
          </div>

          {/* A rule that draws itself across the card on hover. */}
          <span
            aria-hidden
            className="mt-3 block h-[2px] w-full origin-left scale-x-0 bg-[var(--brand-primary)] transition-transform duration-700 ease-out group-hover:scale-x-100"
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

  // The heading reads as one sentence with a turn in it. Setting the half
  // after the dash lighter lets the first half carry the weight; a subtitle
  // without one simply stays whole.
  const headline = useMemo(() => {
    const text = heading?.subtitle ?? "";
    const at = text.indexOf("—");
    if (at === -1) return { lead: text, tail: "" };
    return { lead: text.slice(0, at).trim(), tail: text.slice(at).trim() };
  }, [heading?.subtitle]);

  if (!services.length) return null;

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-10 md:py-14 lg:py-16">
      <Container className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="relative max-w-2xl">
            <div className="relative flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-8 bg-[var(--brand-primary)] sm:w-10"
              />
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)] sm:text-sm md:text-[15px]">
                {heading?.eyebrow || "Our Core Services"}
              </p>
            </div>

            {heading?.subtitle && (
              <h2 className="relative mt-3 text-xl font-semibold leading-[1.25] text-[var(--foreground)] sm:text-2xl md:text-[28px] lg:text-[32px]">
                {headline.lead}
                {headline.tail && (
                  <>
                    {" "}
                    <span className="font-normal text-[var(--muted-foreground)]">
                      {headline.tail}
                    </span>
                  </>
                )}
              </h2>
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
