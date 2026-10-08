import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";

export default function OverviewSection({ overview }) {
  if (!overview) return null;
  const { label, caption, paragraphs = [] } = overview;

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 md:py-14">
      <DecorativePattern
        variant="trianglesRight"
        className="pointer-events-none right-0 top-0 w-[220px] sm:w-[260px] lg:w-[300px]"
      />

      <Container className="relative z-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px]">
          {label}
        </p>
        {caption && (
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl">
            {caption}
          </p>
        )}

        <div className="mt-6  space-y-4">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-7 text-[var(--foreground)] sm:text-base md:text-[17px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
