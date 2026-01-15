import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  Globe, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  Activity
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeroButton } from "@/components/ui/NeroButton";
import { TerminalPrompt, TerminalCursor } from "@/components/ui/TerminalText";
import neroEmblem from "@/assets/nero-emblem.png";

const quickActions = [
  {
    title: "Analyze URL",
    description: "Check links for phishing, malware, and scam indicators",
    icon: Search,
    path: "/analyze",
    color: "text-primary",
  },
  {
    title: "Sandbox Browser",
    description: "Safely preview web content in an isolated environment",
    icon: Globe,
    path: "/sandbox",
    color: "text-accent",
  },
];

const threatStats = [
  { label: "URLs Analyzed", value: "—", trend: null },
  { label: "Threats Detected", value: "—", trend: null },
  { label: "Protection Level", value: "Active", trend: "up" },
];

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <img src={neroEmblem} alt="NERO" className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">NERO Security</h1>
            <p className="text-muted-foreground text-sm">
              AI-Powered Defensive Intelligence
            </p>
          </div>
        </motion.div>

        {/* Terminal status */}
        <GlassPanel className="p-4 overflow-hidden">
          <div className="font-mono text-sm space-y-2">
            <div className="flex items-center gap-2">
              <TerminalPrompt />
              <span className="text-muted-foreground">status</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Activity className="w-4 h-4" />
              <span>System operational • All services running</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-primary">$</span>
              <TerminalCursor />
            </div>
          </div>
        </GlassPanel>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {threatStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <GlassPanel className="p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-lg font-bold">{stat.value}</span>
                  {stat.trend === "up" && (
                    <TrendingUp className="w-4 h-4 text-accent" />
                  )}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Quick Actions
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link to={action.path}>
                  <GlassPanel
                    elevated
                    className="p-4 hover:bg-nero-elevated/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-lg bg-nero-elevated ${action.color}`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </GlassPanel>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GlassPanel className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Security Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Always verify unexpected links before clicking. Hover over URLs to see 
                  their true destination, and be suspicious of urgent requests for personal information.
                </p>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-4"
        >
          <Link to="/analyze">
            <NeroButton size="lg" className="w-full md:w-auto">
              <Shield className="w-5 h-5" />
              Start Security Analysis
            </NeroButton>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
