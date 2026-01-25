import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Eye, 
  Heart, 
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { GlassPanel } from "@/components/ui/GlassPanel";
import neroEmblem from "@/assets/nero-emblem.png";

const features = [
  {
    icon: Shield,
    title: "Defensive Intelligence",
    description: "Analyze URLs, domains, and text for potential threats without ever engaging in offensive activities.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "All analysis runs locally on your device. No data is transmitted to external servers.",
  },
  {
    icon: Eye,
    title: "Educational Focus",
    description: "Learn to recognize common threat patterns and protect yourself from online dangers.",
  },
];

const principles = [
  "We analyze, never attack",
  "We educate, never exploit",
  "We protect, never compromise",
  "We inform, never alarm",
];

const About: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <motion.img
            src={neroEmblem}
            alt="NERO Security"
            className="w-24 h-24 mx-auto mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
          <h1 className="text-3xl font-bold tracking-tight mb-2">NERO Security</h1>
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            AI-Powered Defensive Intelligence
          </p>
          <p className="text-muted-foreground max-w-md mx-auto">
            A digital guardian designed to help users navigate a dangerous internet 
            with confidence and clarity.
          </p>
        </motion.div>

        {/* Mission */}
        <GlassPanel className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Our Mission</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NERO Security exists to empower individuals with the knowledge and tools 
                to identify online threats before they cause harm. We believe that cybersecurity 
                should be accessible, educational, and always ethical. Our platform focuses 
                exclusively on defense—analyzing and explaining risks rather than enabling attacks.
              </p>
            </div>
          </div>
        </GlassPanel>

        {/* Features */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
            Core Principles
          </h2>
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <GlassPanel className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-nero-elevated">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ethics Statement */}
        <GlassPanel className="p-6 border-accent/20 bg-accent/5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-accent" />
            <h2 className="font-semibold">Ethical Commitment</h2>
          </div>
          <ul className="space-y-2">
            {principles.map((principle, index) => (
              <motion.li
                key={principle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-secondary-foreground">{principle}</span>
              </motion.li>
            ))}
          </ul>
        </GlassPanel>

        {/* Disclaimer */}
        <GlassPanel className="p-4 border-warning/20 bg-warning/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning mb-1">Legal Disclaimer</p>
              <p className="text-xs text-muted-foreground">
                NERO Security is provided for educational and defensive purposes only. 
                This tool does not perform any form of hacking, exploitation, intrusion, 
                or illegal activity. Analysis results are based on heuristic patterns 
                and should not be considered definitive security assessments. Users 
                should verify findings through official channels and consult security 
                professionals for critical decisions.
              </p>
            </div>
          </div>
        </GlassPanel>

        {/* Creator Section */}
        <GlassPanel className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="font-semibold">Meet the Creator</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NERO Security is created by <span className="text-foreground font-medium">Eyob Reda</span>, 
                a 17-year-old passionate about technology with skills in cybersecurity, programming, 
                and design. Building tools that make the internet safer for everyone.
              </p>
              <div className="pt-2 space-y-2">
                <p className="text-sm text-accent font-medium">Open to Collaboration</p>
                <p className="text-sm text-muted-foreground">
                  Interested in working together? I welcome anyone who wants to collaborate on 
                  security projects, development, or design work.
                </p>
              </div>
              <div className="pt-3 space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Get in Touch</p>
                <div className="flex flex-col gap-1.5">
                  <a 
                    href="mailto:eyobreda168@gmail.com" 
                    className="text-sm text-primary hover:underline flex items-center gap-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    eyobreda168@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground font-mono">
                    📞 +251 900 915 449
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    📞 +251 918 183 861
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-4 space-y-2"
        >
          <p className="text-xs text-muted-foreground font-mono">
            Version 1.0.0 • Built with care by Eyob Reda
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 NERO Security. All rights reserved.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
