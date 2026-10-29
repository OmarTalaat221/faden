"use client";

import Image from "next/image";
import { useState } from "react";

// Temporary review page. The screenshots in /public/shades were captured from
// a real build with each candidate surface injected, so what they show is what
// the site renders. Delete this folder, /app/shades and /public/shades once a
// shade is signed off.

const SHADES = [
  {
    file: "0-current",
    name: "الحالي",
    surface: "#ffffff",
    alt: "#F9FAFB",
    note: "اللي الموقع نزل بيه",
  },
  {
    file: "1-cool",
    name: "رمادي بارد خفيف",
    surface: "#f3f5f7",
    alt: "#e9edf1",
    note: "بالكاد تحس بيه",
  },
  {
    file: "2-deep",
    name: "رمادي بارد",
    surface: "#eceef1",
    alt: "#e1e5ea",
    note: "المطبّق حالياً على الموقع",
  },
  {
    file: "3-greige",
    name: "بيچ دافي",
    surface: "#f3f1ee",
    alt: "#eae6e0",
    note: "إحساس أدفى",
  },
  {
    file: "4-stone",
    name: "Stone",
    surface: "#eeebe7",
    alt: "#e4dfd8",
    note: "أدفى درجة",
  },
];

const APPLIED = [
  { file: "applied-home-services", label: "الرئيسية — الخدمات" },
  { file: "applied-home-projects", label: "الرئيسية — المشاريع" },
  { file: "applied-projects", label: "صفحة المشاريع" },
  { file: "applied-services", label: "صفحة الخدمات" },
];

const APPLIED_INDEX = 2;

export default function ShadesCompare() {
  const [active, setActive] = useState(APPLIED_INDEX);
  const shade = SHADES[active];

  return (
    // The site header sits over the page, so everything here starts below it.
    <div
      dir="rtl"
      className="min-h-screen bg-[#0f1a24] pt-[72px] text-[#eef2f6] sm:pt-[84px] lg:pt-[96px]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="pt-10 pb-5 sm:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f5514d]">
            FADEN · مراجعة تصميم
          </p>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
            درجة خلفية الصفحات
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-[#94a7b6]">
            الموقع كان خلفيته بيضا، فالكروت البيضا مكانتش بتبان فوقها والأحمر كان
            شايل الشغل لوحده. دي أربع درجات رمادي مقترحة، كل واحدة متصوّرة من نفس
            المكان في الصفحة الرئيسية. الكروت فاضلة بيضا في كل الحالات عشان تبرز
            فوق الخلفية.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="درجات الخلفية"
          className="sticky top-[72px] z-10 -mx-4 flex flex-wrap gap-2 border-b border-[#273845] bg-[#0f1a24] px-4 py-3 sm:-mx-6 sm:top-[84px] sm:px-6 lg:-mx-8 lg:top-[96px] lg:px-8"
        >
          {SHADES.map((s, i) => (
            <button
              key={s.file}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={[
                "inline-flex items-center gap-2.5 rounded-full border bg-[#17242f] py-1.5 pl-2.5 pr-3.5 text-sm font-medium transition-colors",
                i === active
                  ? "border-[#f5514d] shadow-[inset_0_0_0_1px_#f5514d]"
                  : "border-[#273845] hover:border-[#94a7b6]",
              ].join(" ")}
            >
              <span className="flex" aria-hidden="true">
                <span
                  className="h-4 w-4 rounded-r-sm border border-black/25"
                  style={{ background: s.surface }}
                />
                <span
                  className="h-4 w-4 rounded-l-sm border border-l-0 border-black/25"
                  style={{ background: s.alt }}
                />
              </span>
              <span>{s.name}</span>
              {i === APPLIED_INDEX && (
                <span className="text-[11px] tracking-wide text-[#f5514d]">
                  المختار
                </span>
              )}
            </button>
          ))}
        </div>

        <main className="pt-6">
          <figure>
            <div className="overflow-hidden rounded-2xl border border-[#273845] bg-[#17242f] p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
              <Image
                src={`/shades/${shade.file}.jpg`}
                alt={`الصفحة الرئيسية بدرجة ${shade.name}`}
                width={1440}
                height={1000}
                priority
                className="h-auto w-full rounded-lg"
              />
            </div>
            <figcaption className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-4">
              <span className="font-semibold">{shade.name}</span>
              <span dir="ltr" className="font-mono text-sm text-[#94a7b6]">
                {shade.surface} / {shade.alt}
              </span>
              <span className="text-sm text-[#94a7b6]">{shade.note}</span>
            </figcaption>
          </figure>

          <p className="pt-3 text-sm text-[#94a7b6]">
            كل درجة فيها لونين بيتبادلوا على طول الصفحة: الأساسي والأغمق منه
            شوية.
          </p>
        </main>

        <section className="pt-12 pb-14">
          <h2 className="text-xl font-bold">الدرجة المطبّقة على باقي الصفحات</h2>
          <p className="mt-1.5 max-w-2xl text-[#94a7b6]">
            صور من البيلد بعد ما اتطبّقت الدرجة المختارة — رمادي بارد.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {APPLIED.map((a) => (
              <figure key={a.file} className="min-w-0">
                <div className="overflow-hidden rounded-xl border border-[#273845] bg-[#17242f] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
                  <Image
                    src={`/shades/${a.file}.jpg`}
                    alt={a.label}
                    width={1440}
                    height={1000}
                    loading="lazy"
                    className="h-auto w-full rounded-md"
                  />
                </div>
                <figcaption className="pt-2.5 text-sm text-[#94a7b6]">
                  {a.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
