"use client";

import DecorativePattern from "@/components/common/decorative-pattern";
import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import Image from "next/image";
import { useState } from "react";
import AccordionItem from "./accordion-item";

export default function DifferentSection({ visionMissionData }) {
  const { different } = visionMissionData;
  // Single open (first item open by default)
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Decorative Pattern - Bottom Left */}
      <DecorativePattern
        variant="triangles"
        // opacity={0.35}
        className="bottom-0 left-0 "
      />

      <Container>
        <div className="relative z-10">
          {/* Header */}
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {different.eyebrow}
          </p>
          {/* Subtitle - max 24px */}
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {different.subtitle}
          </p>

          {/* Content: Accordion + Image */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
            {/* Accordion */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {different.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  title={item.title}
                  content={item.content}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </div>

            {/* Image */}
            <div className="">
              <RevealImage className="relative aspect-[4/3] w-full overflow-hidden rounded-md md:aspect-auto md:h-full md:min-h-[440px]">
                <Image
                  src={different.image}
                  alt={different.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </RevealImage>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
