import Container from "@/components/layout/container";

export default function BulletListSection({ data, columns = 1, muted = false }) {
  if (!data) return null;
  const { label, caption, items = [] } = data;

  return (
    <section
      className={`relative py-10 sm:py-12 md:py-14 ${
        muted ? "bg-[var(--muted)]" : "bg-white"
      }`}
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px]">
            {label}
          </p>
          {caption && (
            <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl">
              {caption}
            </p>
          )}
        </div>

        <ul
          className={`mt-6 grid grid-cols-1 gap-x-8 gap-y-3 ${
            columns === 2 ? "md:grid-cols-2" : ""
          }`}
        >
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[var(--foreground)] sm:text-base md:text-[17px]"
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
