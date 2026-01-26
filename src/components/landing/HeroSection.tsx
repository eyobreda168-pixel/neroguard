import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ChevronRight, Lock, Zap, Eye } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI-Powered Security</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-foreground">Protect Your</span>
            <br />
            <span className="text-primary text-glow-cyan">Online World</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Advanced threat detection powered by artificial intelligence. 
            Scan URLs, detect phishing, and stay safe from cyber threats.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/analyze">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-neon px-8 py-4 rounded-xl text-nero-deep text-lg font-heading font-semibold flex items-center gap-3 pulse-glow"
              >
                <Shield className="w-5 h-5" />
                <span>Start Scanning</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <button
              onClick={() => document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-xl border border-border bg-nero-surface/50 hover:bg-nero-elevated transition-colors text-foreground font-heading font-medium flex items-center gap-2"
            >
              <span>Explore Features</span>
            </button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {[
              { icon: Lock, text: "End-to-End Secure" },
              { icon: Zap, text: "Real-Time Analysis" },
              { icon: Eye, text: "24/7 Monitoring" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-nero-surface/50 border border-border/50"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
