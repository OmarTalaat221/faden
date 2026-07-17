"use client";

import DecorativePattern from "@/components/common/decorative-pattern";
import ImageModal from "@/components/common/image-modal";
import Container from "@/components/layout/container";
import Image from "next/image";
import { useState } from "react";
import { partnersData } from "./data";

export default function CertificationsSection() {
  const { certifications } = partnersData;
  const [activeIndex, setActiveIndex] = useState(-1);

  const openModal = (i) => setActiveIndex(i);
  const closeModal = () => setActiveIndex(-1);

  const activeCert =
    activeIndex >= 0 ? certifications.items[activeIndex] : null;

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 pb-16 sm:py-12 sm:pb-20 md:py-14 md:pb-24 lg:py-16 lg:pb-28">
      {/* Decorative Pattern - Bottom Right */}
      <DecorativePattern
        variant="trianglesOutlined"
        opacity={0.35}
        className="bottom-0 right-0 h-auto w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px]"
      />

      <Container>
        <div className="relative z-10">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {certifications.eyebrow}
          </p>
          {/* Subtitle - max 24px */}
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {certifications.subtitle}
          </p>

          {/* Certification Cards - Tablet & Desktop: 2 cols | Mobile: 1 col */}
          {/* pt-[X] on grid to leave room for the certificate that hangs above the cards */}
          <div className="mt-8 grid grid-cols-1 gap-y-16 gap-x-4 pt-[55px] sm:grid-cols-2 sm:gap-x-5 md:gap-x-6 md:pt-[80px] lg:gap-x-8">
            {certifications.items.map((cert, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center rounded-md border border-[var(--border)] bg-white px-5 pb-6 pt-[70px] text-center transition-all duration-300 hover:border-[var(--brand-primary)] hover:shadow-lg sm:px-6 sm:pb-7 sm:pt-[80px] md:px-8 md:pb-8 md:pt-[100px]"
              >
                {/* Certificate thumbnail - half inside, half above (centered on top border) */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative h-[110px] w-[110px] md:h-[160px] md:w-[160px]">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 110px, 160px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Title - max 20px */}
                <h3 className="text-base font-semibold text-[var(--foreground)] sm:text-lg md:text-[19px] xl:text-xl">
                  {cert.title}
                </h3>

                {/* Description - max 14px */}
                <p className="mt-2 text-xs font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[13px] lg:text-sm">
                  {cert.description}
                </p>

                {/* View Button - max 14px */}
                <button
                  type="button"
                  onClick={() => openModal(i)}
                  aria-label={`View ${cert.title} certificate`}
                  className="mt-4 inline-flex min-w-[110px] items-center justify-center rounded-md border border-[var(--brand-primary)] px-6 py-2 text-xs font-medium text-[var(--brand-primary)] transition-all duration-300 hover:bg-[var(--brand-primary)] hover:text-white sm:text-[13px] lg:text-sm"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Modal */}
      <ImageModal
        open={activeIndex >= 0}
        onClose={closeModal}
        src={activeCert?.fullImage}
        alt={activeCert?.title || ""}
      />
    </section>
  );
}
