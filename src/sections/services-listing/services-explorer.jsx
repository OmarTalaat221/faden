"use client";

import Container from "@/components/layout/container";
import { AUDIENCES, audiencesOf, servicesFor } from "@/lib/services/audience";
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
  headline,
  caption,
  services,
  showPrivateNote,
  tinted,
  reduceMotion,
}) {
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
        {/* A meta rule across the top, then the sentence broken over two
            columns: the claim on the left, what it means on the right. The
            band is laid out differently from the others rather than simply
            set larger. */}
        <div className="flex items-center gap-4 border-b border-[var(--border)] pb-4">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-[var(--brand-primary)] sm:w-10" />
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)] sm:text-sm">
              {eyebrow}
            </p>
          </div>
          <span aria-hidden className="hidden h-px flex-1 bg-[var(--border)] sm:block" />
          <p className="ml-auto shrink-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)] tabular-nums sm:text-[13px] sm:ml-0">
            {String(services.length).padStart(2, "0")} services
          </p>
        </div>

        <div className="mt-6 grid gap-x-10 gap-y-3 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <h2 className="text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--foreground)] sm:text-2xl md:text-[26px] lg:text-[30px]">
            {headline.lead}
          </h2>

          <div>
            {headline.tail && (
              <p className="text-base font-light leading-relaxed text-[var(--muted-foreground)] sm:text-lg md:text-xl">
                {headline.tail.replace(/^—\s*/, "")}
              </p>
            )}
            {caption && (
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]/80 sm:text-[15px]">
                {caption}
              </p>
            )}
          </div>
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

/** Splits a subtitle on its dash so the two halves can be set differently. */
function splitHeadline(text = "") {
  const at = text.indexOf("—");
  if (at === -1) return { lead: text, tail: "" };
  return { lead: text.slice(0, at).trim(), tail: text.slice(at).trim() };
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

  const corporateCaption = AUDIENCES.find((a) => a.key === "corporate")?.caption;

  if (!services.length) return null;

  return (
    <>
      <ServicesBand
        eyebrow="For Companies & Government"
        headline={splitHeadline(heading?.subtitle)}
        caption={corporateCaption}
        services={corporate}
        showPrivateNote
        reduceMotion={reduceMotion}
      />

      <ServicesBand
        tinted
        eyebrow="For Private Clients"
        headline={splitHeadline(
          "The same senior team, on a house — villas, palaces and private estates, handled end to end.",
        )}
        caption={`${individual.length} of our ${services.length} services are the ones a private owner commissions; the rest are works only a company or a public body can take on.`}
        services={individual}
        reduceMotion={reduceMotion}
      />
    </>
  );
}
