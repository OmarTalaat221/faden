"use client";

import ImageModal from "@/components/common/image-modal";
import Container from "@/components/layout/container";
import Image from "next/image";
import { useState } from "react";
import { certificationsData } from "./data";

export default function OtherCertificationsSection() {
  const { otherCertifications } = certificationsData;

  const [activeIndex, setActiveIndex] = useState(-1);

  const activeCert =
    activeIndex >= 0 ? otherCertifications.items[activeIndex] : null;

  const landscapeItems = otherCertifications.items
    .map((item, index) => ({
      ...item,
      originalIndex: index,
    }))
    .filter((item) => item.orientation === "landscape");

  const portraitItems = otherCertifications.items
    .map((item, index) => ({
      ...item,
      originalIndex: index,
    }))
    .filter((item) => item.orientation === "portrait");

  const openModal = (index) => {
    setActiveIndex(index);
  };

  const closeModal = () => {
    setActiveIndex(-1);
  };

  const renderCertificate = (cert) => {
    const isPortrait = cert.orientation === "portrait";

    return (
      <article
        key={`${cert.title}-${cert.originalIndex}`}
        className={`relative w-full ${isPortrait ? "h-[520px]" : "h-[265px]"}`}
      >
        <div className="absolute inset-x-0 bottom-0 h-[180px] rounded-[4px] border border-[#dedede] bg-white">
          <button
            type="button"
            onClick={() => openModal(cert.originalIndex)}
            aria-label={`View ${cert.title} certificate`}
            className="absolute bottom-[15px] left-1/2 z-20 flex h-[34px] w-[104px] -translate-x-1/2 items-center justify-center rounded-[4px] border border-[var(--brand-primary)] bg-white text-[12px] font-semibold text-[var(--brand-primary)] transition-colors duration-300 hover:bg-[var(--brand-primary)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
          >
            View
          </button>
        </div>

        <div
          className={`absolute left-1/2 top-0 z-10 w-full max-w-[317px] -translate-x-1/2 ${
            isPortrait ? "aspect-[317/447]" : "aspect-[317/193]"
          }`}
        >
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            sizes="317px"
            className="object-contain object-top"
            loading="lazy"
          />
        </div>
      </article>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-8 sm:py-10 md:py-12">
      <Container>
        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.03em] text-[var(--brand-primary)] sm:text-xs">
            {otherCertifications.eyebrow}
          </p>

          <p className="mt-2 text-base font-normal leading-7 text-[var(--muted-foreground)] sm:text-[17px] md:text-lg">
            {otherCertifications.subtitle}
          </p>

          {landscapeItems.length > 0 && (
            <div className="mt-8 grid grid-cols-1 items-start gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
              {landscapeItems.map(renderCertificate)}
            </div>
          )}

          {portraitItems.length > 0 && (
            <div className="mt-12 grid grid-cols-1 items-start gap-x-4 gap-y-10 sm:mt-14 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
              {portraitItems.map(renderCertificate)}
            </div>
          )}
        </div>
      </Container>

      <ImageModal
        open={activeIndex >= 0}
        onClose={closeModal}
        src={activeCert?.fullImage}
        alt={activeCert?.title || ""}
      />
    </section>
  );
}
