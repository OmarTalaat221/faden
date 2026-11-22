"use client";

import Container from "@/components/layout/container";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

/**
 * The catalogue. One list: everything FADEN does, for whoever is asking.
 *
 * It was split into a band for companies and a band for private clients. The
 * split stays on the projects page, where a visitor is scanning a long list
 * and narrowing it genuinely helps; five services are a short enough list to
 * read whole, and splitting them only made a private client wonder what they
 * were not being shown.
 */

function ServiceCard({ service, index, reduceMotion }) {
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


/**
 * A brush-stroke highlight behind a word: an uneven, hand-cut shape rather
 * than a rectangle, with the word knocked out on top of it. It paints itself
 * in from the left the first time it is scrolled to, the way the stroke would
 * be drawn.
 */
function BrushHighlight({ children, reduceMotion }) {
  // The stroke and the white copy of the word are cut by the same expanding
  // box and share one transition, so a letter turns from red to white at the
  // exact moment the paint reaches it.
  const sweep = {
    initial: reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    transition: { duration: 0.9, ease: [0.645, 0.045, 0.355, 1], delay: 0.25 },
  };

  return (
    <span className="relative isolate inline-block px-[0.55em] py-[0.12em] align-baseline">
      <motion.svg
        aria-hidden
        viewBox="0 0 300 80"
        preserveAspectRatio="none"
        className="absolute inset-0 -z-10 h-full w-full -rotate-[0.8deg]"
        {...sweep}
      >
        {/* Hand-cut rather than a lens: the edges wander, the left end is
            thinner than the right, and a lighter second pass sits inside the
            way a wide marker leaves a darker rim. */}
        <path
          d="M5,43 C16,27 44,18 84,13 C122,8 170,7 208,11 C242,14 274,21 293,31 C301,35 300,44 292,51 C277,62 238,70 192,74 C142,78 86,77 47,70 C24,66 8,57 5,50 Z"
          fill="var(--brand-primary)"
        />
        <path
          d="M22,40 C44,28 92,21 150,21 C206,21 256,27 282,36"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>

      {/* The word before the paint arrives. */}
      <span className="relative text-[var(--brand-primary)]">{children}</span>

      {/* The same word in white, revealed by the same sweep. */}
      <motion.span
        aria-hidden
        className="absolute inset-0 px-[0.55em] py-[0.12em] text-white"
        {...sweep}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** The list of services, under its heading. */
function ServicesBand({ eyebrow, subtitle, services, reduceMotion }) {
  // A short opening word reads better set apart from the noun it qualifies,
  // and the noun is what goes on the brush stroke. A one-word heading stays
  // whole.
  const words = (eyebrow ?? "").trim().split(/\s+/);
  const hasLead = words.length > 1 && words[0].length <= 4;
  const titleLead = hasLead ? words[0] : "";
  const titleMain = hasLead ? words.slice(1).join(" ") : eyebrow;

  if (!services.length) return null;

  return (
    <section
      data-preview-anchor="items"
      className="relative overflow-hidden bg-white py-10 sm:py-10 md:py-14 lg:py-16"
    >
      <Container>
        <div className="max-w-4xl">
          {/* The audience is the title: the preposition steps back and the
              audience itself sits on a brush stroke. */}
          <h2
            className="text-2xl font-bold leading-[1.5] tracking-[-0.02em] text-[var(--foreground)] sm:text-[30px] md:text-[36px] lg:text-[42px]"
          >
            {titleLead && (
              <span className="font-light text-[var(--muted-foreground)]">
                {titleLead}{" "}
              </span>
            )}
            <BrushHighlight reduceMotion={reduceMotion}>
              {titleMain}
            </BrushHighlight>
          </h2>

          <p
            className="mt-4 max-w-3xl text-sm font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[17px]"
          >
            {subtitle}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-10 lg:grid-cols-3 lg:gap-7">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
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

  if (!services.length) return null;

  return (
    <ServicesBand
      eyebrow={heading?.eyebrow}
      subtitle={heading?.subtitle}
      services={services}
      reduceMotion={reduceMotion}
    />
  );
}
