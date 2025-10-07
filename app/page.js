"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import MapSection from "@/components/sections/MapSection";
import MatchmakingSection from "@/components/sections/MatchmakingSection";
import FooterTennis from "@/components/tennis/FooterTennis";
import CoverSection from "@/components/sections/CoverSection";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import GoogleCallback from "@/components/auth/GoogleCallback";
import HeaderTennis from "@/components/tennis/HeaderTennis";

function HomeContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // If we have Google OAuth parameters, show the callback component
  if (code && (state === 'register' || state === 'login')) {
    return <GoogleCallback />;
  }

  const handleScrollToHero = () => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeaderTennis />
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
      <FooterTennis />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <HomeContent />
    </Suspense>
  );
}
