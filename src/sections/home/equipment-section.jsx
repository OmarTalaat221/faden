"use client";

import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { equipment } from "./data";

import "swiper/css";

export default function EquipmentSection() {
  return (
    <section
      id="equipment"
      className="relative overflow-hidden bg-[#F9FAFB] py-16 sm:py-20 lg:py-24"
      aria-labelledby="equipment-heading"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[16px]">
              Our Equipment
            </p>
            <h2
              id="equipment-heading"
              className="mt-3 text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl md:text-[22px] lg:text-2xl xl:text-[24px]"
            >
              FADEN uses advanced technology and equipment to deliver efficient,
              safe projects.
            </h2>
          </div>

          <div className="shrink-0">
            <ButtonLink
              href="/equipment"
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              View Details
            </ButtonLink>
          </div>
        </div>

        {/* Equipment Swiper — width auto */}
        <div className="mt-10 sm:mt-12 lg:mt-14">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView="auto"
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            allowTouchMove={true}
            className="equipment-swiper"
          >
            {equipment.map((item) => (
              <SwiperSlide key={item.id} className="!w-auto">
                <div className="flex h-14 items-center justify-center whitespace-nowrap rounded-[4px] border border-[var(--border)] px-6 text-center text-sm font-medium text-[#444444] shadow-sm transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] sm:h-16 sm:px-8 sm:text-[15px]">
                  {item.name}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
