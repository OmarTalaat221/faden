"use client";

import Container from "@/components/layout/container";
import LeaderCard from "./leader-card";

export default function MessagesSection({ messages }) {
  if (!messages) return null;

  return (
    <section data-preview-anchor="leaders" className="relative w-full overflow-hidden bg-white py-8 sm:py-10 md:py-14 lg:py-16">
      <Container>
        <div className="relative z-10 flex flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-16">
          {messages.map((msg, i) => (
            <LeaderCard key={i} {...msg} />
          ))}
        </div>
      </Container>
    </section>
  );
}
