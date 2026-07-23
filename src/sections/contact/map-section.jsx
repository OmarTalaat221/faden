import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";

export default function MapSection({ map }) {
  if (!map) return null;

  return (
    <section className="relative overflow-hidden bg-white pb-14 sm:pb-16 md:pb-20 lg:pb-24">
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.35}
        className="pointer-events-none absolute bottom-0 left-0 w-[180px] sm:w-[220px] md:w-[260px]"
      />

      <Container>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {map.eyebrow}
          </p>
          {map.subtitle && (
            <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              {map.subtitle}
            </p>
          )}
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-[var(--border)] md:mt-8">
          <iframe
            src={map.embedUrl}
            title="FADEN office location on Google Maps"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full"
          />
        </div>
      </Container>
    </section>
  );
}
