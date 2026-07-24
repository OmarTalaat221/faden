import Link from "next/link";
import Container from "@/components/layout/container";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28 md:py-32">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)]">
            404
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
            Image Not Found
          </h1>
          <p className="mt-3 text-sm text-[var(--muted-foreground)] sm:text-base">
            The gallery image you're looking for doesn't exist.
          </p>
          <Link
            href="/gallery"
            className="mt-6 inline-flex items-center rounded-md bg-[var(--brand-primary)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--brand-primary-hover)]"
          >
            Back to Gallery
          </Link>
        </div>
      </Container>
    </section>
  );
}