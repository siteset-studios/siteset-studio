import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import PricingSection from "../components/PricingSection";
import ProblemSolution from "../components/ProblemSolution";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <BeforeAfterSlider />
      <ProblemSolution />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
