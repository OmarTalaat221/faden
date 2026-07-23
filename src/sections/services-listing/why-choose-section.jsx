import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";

export default function WhyChooseSection({ whyChoose }) {
  if (!whyChoose || !whyChoose.items?.length) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.35}
        className="pointer-events-none absolute bottom-0 left-0 w-[180px] sm:w-[220px] md:w-[260px]"
      />

      <Container>
        <div className="max-w-4xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {whyChoose.eyebrow}
          </p>
          {whyChoose.subtitle && (
            <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              {whyChoose.subtitle}
            </p>
          )}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2 md:gap-y-4">
          {whyChoose.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[var(--foreground)] sm:text-base md:text-[17px] lg:text-lg"
            >
              <span
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--foreground)]"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
