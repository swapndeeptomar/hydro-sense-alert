import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PreventionSection from "@/components/landing/PreventionSection";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <div id="about">
        <FeaturesSection />
      </div>
      <div id="prevention">
        <PreventionSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;