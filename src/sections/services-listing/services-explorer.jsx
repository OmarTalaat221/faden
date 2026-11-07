"use client";

import Container from "@/components/layout/container";
import { audiencesOf, servicesFor } from "@/lib/services/audience";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

/**
 * The catalogue, split by who it is for. A company and a private owner do not
 * want to read the same list, so each gets a band of its own instead of
 * sharing one behind a switch.
 *
 * The two are not symmetric on purpose: a company can commission anything a
 * private client can, so the corporate band is the whole catalogue, while the
 * private band is the subset we take on for individual owners.
 */

function ServiceCard({ service, index, showPrivateNote, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
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
        <div className="relative aspect-[4/3] h-full w-full sm:aspect-[5/4] lg:aspect-[4/3]">
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

        {showPrivateNote && (
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

/** One audience, one band. */
function ServicesBand({
  eyebrow,
  subtitle,
  services,
  showPrivateNote,
  tinted,
  reduceMotion,
}) {
  // The dash splits the claim from what it means; without one the whole line
  // is simply the claim.
  const at = (subtitle ?? "").indexOf("—");
  const lead = at === -1 ? subtitle : subtitle.slice(0, at).trim();
  const tail = at === -1 ? "" : subtitle.slice(at + 1).trim();

  if (!services.length) return null;

  return (
    <section
      className={
        tinted
          ? "relative overflow-hidden bg-[var(--muted)] py-10 sm:py-10 md:py-14 lg:py-16"
          : "relative overflow-hidden bg-white py-10 sm:py-10 md:py-14 lg:py-16"
      }
    >
      <Container>
        {/* A red rail down the side of the heading block: the same two
            lines, but marked instead of floating on the surface. */}
        <div className="max-w-4xl border-l-[3px] border-[var(--brand-primary)] pl-4 sm:pl-5 md:pl-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)] sm:text-[13px]">
            {eyebrow}
          </p>
          {/* The line is the heading here, so it is set like one: large and
              bold, with the half after the dash picked out in brand red and
              italic so the sentence has a turn the eye can follow. */}
          <p className="mt-2 text-xl font-bold leading-[1.2] tracking-[-0.01em] text-[var(--foreground)] sm:text-2xl md:text-[28px] lg:text-[32px]">
            {lead}
            {tail && (
              <>
                {" "}
                <span className="font-medium italic text-[var(--brand-primary)]">
                  {tail}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-10 lg:grid-cols-3 lg:gap-7">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              showPrivateNote={
                showPrivateNote && audiencesOf(service).includes("individual")
              }
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function ServicesExplorer({ heading, services = [] }) {
  const reduceMotion = useReducedMotion();

  const corporate = useMemo(
    () => servicesFor(services, "corporate"),
    [services],
  );
  const individual = useMemo(
    () => servicesFor(services, "individual"),
    [services],
  );

  if (!services.length) return null;

  return (
    <>
      <ServicesBand
        eyebrow="For Companies & Government"
        subtitle={heading?.subtitle}
        services={corporate}
        showPrivateNote
        reduceMotion={reduceMotion}
      />

      <ServicesBand
        tinted
        eyebrow="For Private Clients"
        subtitle="The same senior team, on a house — villas, palaces and private estates, handled end to end."
        services={individual}
        reduceMotion={reduceMotion}
      />
    </>
  );
}
