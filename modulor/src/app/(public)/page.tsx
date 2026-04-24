import { HeroSection }        from "@/components/home/HeroSection";
import { StatsSection }        from "@/components/home/StatsSection";
import { DomainsSection }      from "@/components/home/DomainsSection";
import { FormationsSection }   from "@/components/home/FormationsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection }   from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <DomainsSection />
      <FormationsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
