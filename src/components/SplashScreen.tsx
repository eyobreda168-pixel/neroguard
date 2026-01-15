import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import neroEmblem from "@/assets/nero-emblem.png";

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDuration = 2500,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing...");

  useEffect(() => {
    const statusMessages = [
      "Initializing...",
      "Loading threat database...",
      "Configuring analysis engine...",
      "Ready.",
    ];

    let currentStep = 0;
    const stepDuration = minDuration / statusMessages.length;

    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / statusMessages.length) * 100);
      
      if (currentStep < statusMessages.length) {
        setStatusText(statusMessages[currentStep]);
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-nero-deep flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-nero-glow opacity-30" />

      {/* Logo container */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(187 100% 50% / 0.2) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Emblem */}
        <motion.img
          src={neroEmblem}
          alt="NERO Security"
          className="w-32 h-32 md:w-40 md:h-40 relative z-10"
          animate={{ 
            filter: ["drop-shadow(0 0 10px hsl(187 100% 50% / 0.5))", "drop-shadow(0 0 20px hsl(187 100% 50% / 0.7))", "drop-shadow(0 0 10px hsl(187 100% 50% / 0.5))"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Brand name */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] text-foreground mb-2">
          NERO
        </h1>
        <p className="text-sm md:text-base tracking-[0.3em] text-primary font-mono uppercase">
          Security
        </p>
      </motion.div>

      {/* Loading section */}
      <motion.div
        className="w-64 md:w-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Progress bar container */}
        <div className="h-1 bg-nero-elevated rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Status text */}
        <div className="flex items-center justify-center gap-2">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="font-mono text-xs text-muted-foreground">
            {statusText}
          </span>
        </div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30" />
    </motion.div>
  );
};
