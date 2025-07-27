
import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
