"use client";

import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { clients } from "./data";

import "swiper/css";

export default function ClientsSection() {
  return (
    <section
      id="clients"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="clients-heading"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[16px]">
              Our Clients
            </p>
            <h2
              id="clients-heading"
              className="mt-3 text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl md:text-[22px] lg:text-2xl xl:text-[24px]"
            >
              Our clients’ trust is a testament to our consistent delivery of
              exceptional construction solutions.{" "}
            </h2>
          </div>

          <div className="shrink-0">
            <ButtonLink
              href="#clients"
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              View Details
            </ButtonLink>
          </div>
        </div>

        {/* Clients Swiper — width auto + ملونين */}
        <div className="mt-10 sm:mt-12 lg:mt-14">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView="auto"
            loop={true}
            speed={2500}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            allowTouchMove={true}
            className="!py-4"
          >
            {clients.map((client) => (
              <SwiperSlide key={client.id} className="!w-auto">
                <div className="flex h-20 items-center justify-center px-4 sm:h-24 sm:px-6">
                  <div className="relative h-full w-[140px] transition-transform duration-300 hover:scale-105 sm:w-[160px] lg:w-[180px]">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="180px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
