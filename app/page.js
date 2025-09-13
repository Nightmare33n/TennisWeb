"use client";

import MapSection from "../components/sections/MapSection";
import MatchmakingSection from "../components/sections/MatchmakingSection";
import Footer from "../components/layout/Footer";
import CoverSection from "../components/sections/CoverSection";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeaturesSection";

export default function Home() {
  const handleScrollToHero = () => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Cover Section - New Hero */}
      <CoverSection
        title="Conecta con jugadores de tennis en México"
        subtitle="La comunidad más activa para mejorar tu juego"
        buttonText="Empezar"
        onButtonClick={handleScrollToHero}  
      />
      <StatsSection />
      <HeroSection />
      <MapSection />
      <MatchmakingSection />
      <FeaturesSection />
      <Footer />
    </>
  );
}
