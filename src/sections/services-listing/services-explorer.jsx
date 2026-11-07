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
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * The catalogue, read through whoever is looking at it. The visitor says
 * whether they are a company or a private client and the grid answers with
 * the services open to them — a private owner never has to scroll past a
 * wastewater plant to find the one that is theirs.
 */

function AudienceSwitch({ value, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Who the services are for"
      className="inline-flex rounded-full border border-[var(--border)] bg-[var(--background)] p-1 shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
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
              "rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-300 sm:px-6 sm:py-2.5 sm:text-sm",
              active
                ? "bg-[var(--brand-primary)] text-white shadow-[0_6px_18px_rgba(228,36,33,0.35)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
          >
            {audience.label}
          </button>
        );
      })}
    </div>
  );
}

function ServiceCard({ service, index, featured, audience }) {
  // Worth saying on the card only where it is the exception: in the private
  // list everything is private, so the line would be noise on every card.
  const alsoPrivate =
    audience === "corporate" && audiencesOf(service).includes("individual");

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl bg-[var(--foreground)]",
        featured ? "lg:col-span-2" : "",
      )}
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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Two layers: a constant scrim that keeps the name legible on any
            photo, and a second that deepens on hover so the copy below can
            come up without fighting the image. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-white/55 tabular-nums sm:text-xs">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={cn(
                "mt-1.5 font-semibold leading-tight text-white",
                featured
                  ? "text-xl sm:text-2xl md:text-[26px] lg:text-[28px]"
                  : "text-lg sm:text-xl md:text-[22px]",
              )}
            >
              {service.name}
            </h3>

            {/* Held back until hover so the grid reads as a row of names
                first, and gives a reason to look closer second. */}
            <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
              <div className="overflow-hidden">
                {service.description && (
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/80 sm:text-sm">
                    {service.description}
                  </p>
                )}
                {alsoPrivate && (
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    Also for private clients
                  </p>
                )}
              </div>
            </div>
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 group-hover:border-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] sm:h-11 sm:w-11">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>

        {/* A rule that draws itself across the card on hover. */}
        <span
          aria-hidden
          className="mt-4 block h-px w-full origin-left scale-x-0 bg-[var(--brand-primary)] transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>
    </Link>
  );
}

export default function ServicesExplorer({ heading, services = [] }) {
  const [audience, setAudience] = useState(DEFAULT_AUDIENCE);

  const visible = useMemo(
    () => servicesFor(services, audience),
    [services, audience],
  );

  const caption = AUDIENCES.find((a) => a.key === audience)?.caption;

  if (!services.length) return null;

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-10 md:py-14 lg:py-16">
      <Container>
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

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mt-10 lg:grid-cols-3 lg:gap-6">
          {visible.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              featured={i === 0}
              audience={audience}
            />
          ))}
        </div>

        <p className="mt-5 max-w-3xl text-[12px] leading-relaxed text-[var(--muted-foreground)] sm:text-[13px]">
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
