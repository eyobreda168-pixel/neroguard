import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDuration = 2500,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing systems...");

  useEffect(() => {
    const statusMessages = [
      "Initializing systems...",
      "Loading threat intelligence...",
      "Configuring AI engine...",
      "Ready to protect.",
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
        setTimeout(onComplete, 400);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(240 25% 4%) 0%, hsl(240 20% 6%) 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Glow orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "hsl(174 100% 50% / 0.1)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "hsl(350 89% 55% / 0.08)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Logo container */}
      <motion.div
        className="relative mb-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(174 100% 50% / 0.3) 0%, transparent 60%)",
            filter: "blur(30px)",
            scale: 2,
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "hsl(174 100% 50% / 0.2)",
            filter: "blur(20px)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Shield Icon */}
        <motion.div
          className="relative z-10 p-6 rounded-2xl bg-nero-surface/50 backdrop-blur-xl border border-primary/20"
          animate={{ 
            boxShadow: [
              "0 0 30px hsl(174 100% 50% / 0.3)",
              "0 0 50px hsl(174 100% 50% / 0.5)",
              "0 0 30px hsl(174 100% 50% / 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-16 h-16 md:w-20 md:h-20 text-primary" />
        </motion.div>
      </motion.div>

      {/* Brand name */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider mb-2">
          <span className="text-primary text-glow-cyan">NERO</span>
          <span className="text-foreground">GUARD</span>
        </h1>
        <p className="font-heading text-sm md:text-base tracking-widest text-muted-foreground uppercase">
          AI-Powered Cybersecurity
        </p>
      </motion.div>

      {/* Loading section */}
      <motion.div
        className="w-72 md:w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Progress bar container */}
        <div className="h-1.5 bg-nero-surface rounded-full overflow-hidden mb-4 border border-border/30">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(174 100% 50%), hsl(174 80% 35%))",
              width: `${progress}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Status text */}
        <div className="flex items-center justify-center gap-3">
          <motion.div
            className="flex gap-1"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          </motion.div>
          <span className="font-mono text-xs text-muted-foreground">
            {statusText}
          </span>
        </div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};
