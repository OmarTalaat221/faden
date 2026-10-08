"use client";

import Container from "@/components/layout/container";
import { useState } from "react";

function Dot() {
  return (
    <span
      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--foreground)]"
      aria-hidden="true"
    />
  );
}

function InfoList({ items = [] }) {
  return (
    <ul className="space-y-3 p-5 sm:p-6">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-6 sm:text-[15px]">
          <Dot />
          {item.children ? (
            <div>
              <span className="font-semibold text-[var(--foreground)]">
                {item.label} :
              </span>
              <ul className="mt-2 space-y-2">
                {item.children.map((child, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Dot />
                    <span className="text-[var(--muted-foreground)]">
                      <span className="font-semibold text-[var(--foreground)]">
                        {child.label} :
                      </span>{" "}
                      {child.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span className="text-[var(--muted-foreground)]">
              <span className="font-semibold text-[var(--foreground)]">
                {item.label} :
              </span>{" "}
              {item.value}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectInfoSection({ tabs }) {
  const [active, setActive] = useState("details");

  if (!tabs) return null;
  const hasComposition = Boolean(tabs.composition);
  const current = tabs[active] || tabs.details;
  if (!current) return null;

  return (
    <section className="relative bg-white pb-10 sm:pb-12 md:pb-14">
      <Container>
        <div className="overflow-hidden rounded-lg border border-[var(--border)]">
          {hasComposition ? (
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setActive("details")}
                className={`px-5 py-3 text-center text-sm font-semibold transition-colors sm:text-[15px] ${
                  active === "details"
                    ? "bg-[var(--brand-primary)] text-white"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                }`}
              >
                Project Details
              </button>
              <button
                type="button"
                onClick={() => setActive("composition")}
                className={`px-5 py-3 text-center text-sm font-semibold transition-colors sm:text-[15px] ${
                  active === "composition"
                    ? "bg-[var(--brand-primary)] text-white"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                }`}
              >
                Architectural Composition
              </button>
            </div>
          ) : (
            <div className="bg-[var(--brand-primary)] px-5 py-3 text-center text-sm font-semibold text-white sm:text-[15px]">
              Project Details
            </div>
          )}

          <div className="grid grid-cols-1 divide-y divide-[var(--border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <InfoList items={current.left} />
            <InfoList items={current.right} />
          </div>
        </div>
      </Container>
    </section>
  );
}
