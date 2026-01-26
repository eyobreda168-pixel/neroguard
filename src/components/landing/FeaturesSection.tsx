import React from "react";
import { motion } from "framer-motion";
import { Shield, Search, Bell, LayoutDashboard, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Phishing Protection",
    description: "AI-powered detection of phishing attempts, fake websites, and social engineering attacks in real-time.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(174_100%_50%_/_0.2)]",
  },
  {
    icon: Search,
    title: "Malware Scanner",
    description: "Deep analysis of URLs and domains to identify potential malware, viruses, and malicious payloads.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(350_89%_55%_/_0.2)]",
  },
  {
    icon: Bell,
    title: "Threat Alerts",
    description: "Instant notifications and detailed reports when suspicious activity or threats are detected.",
    color: "text-warning",
    bgColor: "bg-warning/10",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(38_92%_50%_/_0.2)]",
  },
  {
    icon: LayoutDashboard,
    title: "Secure Dashboard",
    description: "Comprehensive security overview with history, analytics, and actionable insights at your fingertips.",
    color: "text-success",
    bgColor: "bg-success/10",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(160_84%_45%_/_0.2)]",
  },
  {
    icon: Globe,
    title: "Safe Browsing",
    description: "Sandboxed environment to safely preview suspicious websites without risking your device.",
    color: "text-neon-blue",
    bgColor: "bg-neon-blue/10",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(210_100%_55%_/_0.2)]",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data stays private. No tracking, no selling data, just pure security protection.",
    color: "text-neon-purple",
    bgColor: "bg-neon-purple/10",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(270_80%_60%_/_0.2)]",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nero-deep" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Complete </span>
            <span className="text-primary text-glow-cyan">Security Suite</span>
          </h2>
          <p className="font-heading text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to protect yourself from online threats, 
            powered by advanced AI and real-time threat intelligence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`group h-full p-6 md:p-8 rounded-2xl bg-nero-card border border-border/50 
                  transition-all duration-300 ${feature.glowColor}`}
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-5`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Line */}
                <div className="mt-6 h-0.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${feature.bgColor.replace('/10', '')}`}
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
