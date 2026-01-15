import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";
import Dashboard from "./Dashboard";

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  useEffect(() => {
    // Check if user has seen splash in this session
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
      
      {(!showSplash || hasSeenSplash) && <Dashboard />}
    </>
  );
};

export default Index;
