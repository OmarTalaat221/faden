"use client";

import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { services } from "./data";

import "swiper/css";
import "swiper/css/pagination";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#F9FAFB] py-16 sm:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <Container>
        {/* Header: Title + Description + Button */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[16px]">
              Our Services
            </p>
            <h2
              id="services-heading"
              className="mt-3 text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl md:text-[22px] lg:text-2xl xl:text-[24px]"
            >
              At FADEN, we offer comprehensive contracting and construction
              services tailored to client needs, ensuring smooth project
              delivery from start to handover.
            </h2>
          </div>

          <div className="shrink-0">
            <ButtonLink
              href="#services"
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              View Details
            </ButtonLink>
          </div>
        </div>

        {/* Services Swiper */}
        <div className="mt-10 sm:mt-12 lg:mt-14">
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "faden-bullet",
              bulletActiveClass: "faden-bullet-active",
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
            className="!pb-12"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id}>
                <article className="group flex flex-col">
                  <RevealImage
                    delay={index * 150}
                    className="aspect-[4/3] w-full overflow-hidden rounded-[6px]"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </RevealImage>
                  <h3 className="mt-5 text-base font-semibold text-[var(--foreground)] sm:text-lg lg:text-xl">
                    {service.title}
                  </h3>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      {/* Custom pagination styles */}
      <style jsx global>{`
        .faden-bullet {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin: 0 5px;
          border-radius: 9999px;
          background-color: #d4d4d4;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .faden-bullet-active {
          background-color: var(--brand-primary);
          width: 12px;
          height: 12px;
        }
        .swiper-pagination {
          position: absolute;
          bottom: 0 !important;
          text-align: center;
        }
      `}</style>
    </section>
  );
}
