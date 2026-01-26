import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

const LandingPage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("nero_splash_seen");
    if (seen) {
      setShowSplash(false);
      setHasSeenSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("nero_splash_seen", "true");
    setShowSplash(false);
    setHasSeenSplash(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && !hasSeenSplash && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {(!showSplash || hasSeenSplash) && (
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default LandingPage;
