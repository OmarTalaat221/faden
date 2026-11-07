import Container from "@/components/layout/container";
import { getAboutLeadership } from "./data";
import LeaderCard from "./leader-card";

export default async function MessagesSection() {
  const leadershipData = await getAboutLeadership();
  const { messages } = leadershipData;

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
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
