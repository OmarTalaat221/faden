"use client";

import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { formatNewsDate } from "@/lib/news/data";

import "swiper/css";
import "swiper/css/pagination";

/**
 * The latest news on the homepage.
 *
 * A slider, as asked for, and built on the same Swiper the services band
 * already uses so the two scroll the same way. What is on a slide is
 * deliberately not what is on a service card: a date, a headline and a
 * sentence, with the picture in 16:9 rather than 4:3. A reader should be able
 * to tell at a glance that one band is what the company does and the other is
 * what it did this month.
 *
 * There is nothing to pick in the dashboard here. The band shows the newest
 * stories and keeps showing the newest ones, which is the only behaviour that
 * stays right without somebody remembering to come back and change it.
 */
export default function NewsSection({ news = [] }) {
  if (!news.length) return null;

  return (
    <section
      data-preview-anchor="news"
      id="news"
      className="relative overflow-hidden bg-[#F9FAFB] py-10 sm:py-14 lg:py-16"
      aria-labelledby="home-news-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[16px]">
              Latest News
            </p>
            <h2
              id="home-news-heading"
              className="mt-3 max-w-[60ch] text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl md:text-[22px] lg:text-2xl xl:text-[24px]"
            >
              Awards, milestones and what the sites are doing this month.
            </h2>
          </div>

          <div className="shrink-0">
            <ButtonLink
              href="/news"
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              All News
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "faden-news-bullet",
              bulletActiveClass: "faden-news-bullet-active",
            }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            // Room for the dots. With three stories or fewer there is
            // nothing to page through on a wide screen, so Swiper hides them
            // and the room would be an empty strip above the contact band.
            className={news.length > 3 ? "!pb-10" : "!pb-10 lg:!pb-0"}
          >
            {news.map((item) => {
              const date = formatNewsDate(item);

              return (
                <SwiperSlide key={item.id ?? item.slug} className="!h-auto">
                  <Link
                    href={`/news/${item.slug}`}
                    className="group flex h-full flex-col"
                  >
                    {/* 16:9, because that is the shape the news page gives
                        these photographs too — the same picture must not be
                        cropped two different ways on one site. */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-[6px] bg-[var(--foreground)]/5">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title || ""}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {date && (
                      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                        {date}
                      </p>
                    )}

                    <h3 className="mt-2 text-base font-semibold leading-snug text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--brand-primary)] sm:text-lg lg:text-xl">
                      {item.title}
                    </h3>

                    {item.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {item.excerpt}
                      </p>
                    )}
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Container>

      {/* Named apart from the services band's bullets on purpose: these
          styles ship with this section, and reusing that band's class names
          would leave the dots unstyled whenever it is switched off. */}
      <style jsx global>{`
        .faden-news-bullet {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin: 0 5px;
          border-radius: 9999px;
          background-color: #d4d4d4;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .faden-news-bullet-active {
          background-color: var(--brand-primary);
          width: 12px;
          height: 12px;
        }
        #news .swiper-pagination {
          position: absolute;
          bottom: 0 !important;
          text-align: center;
        }
      `}</style>
    </section>
  );
}
