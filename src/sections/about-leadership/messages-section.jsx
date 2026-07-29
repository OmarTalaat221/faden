import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import { leadershipData } from "./data";
import LeaderCard from "./leader-card";

export default function MessagesSection() {
  const { messages } = leadershipData;

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Decorative Pattern - Top Right */}
      <DecorativePattern
        variant="triangles"
        // opacity={0.35}
        className="top-0 right-0"
      />
      {/* Decorative Pattern - Bottom Left */}
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.35}
        className="bottom-8 left-0"
      />

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
