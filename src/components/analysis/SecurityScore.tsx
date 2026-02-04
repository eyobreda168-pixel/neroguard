import React from "react";
import { motion } from "framer-motion";
import { Shield, ShieldCheck, ShieldAlert, ShieldX, Lock, Globe, FileWarning, Eye } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { RiskLevel } from "@/components/ui/RiskBadge";
import { cn } from "@/lib/utils";

interface SecurityScoreProps {
  riskLevel: RiskLevel;
  inputType: "url" | "domain" | "text";
  indicators: Array<{ severity: string }>;
}

const securityMetrics = [
  { id: "ssl", label: "SSL/TLS", icon: Lock },
  { id: "domain", label: "Domain Trust", icon: Globe },
  { id: "content", label: "Content Safety", icon: FileWarning },
  { id: "privacy", label: "Privacy Risk", icon: Eye },
];

const riskToScore: Record<RiskLevel, number> = {
  safe: 95,
  low: 80,
  medium: 55,
  high: 30,
  critical: 10,
  unknown: 50,
};

export const SecurityScore: React.FC<SecurityScoreProps> = ({
  riskLevel,
  inputType,
  indicators,
}) => {
  const overallScore = riskToScore[riskLevel];
  const criticalCount = indicators.filter((i) => i.severity === "danger").length;
  const warningCount = indicators.filter((i) => i.severity === "warning").length;

  // Calculate individual metric scores based on risk and indicators
  const getMetricScore = (metric: string): number => {
    const baseScore = overallScore;
    const penalty = criticalCount * 15 + warningCount * 5;
    
    switch (metric) {
      case "ssl":
        return inputType === "text" ? 100 : Math.max(20, baseScore + 10 - penalty / 2);
      case "domain":
        return inputType === "text" ? 100 : Math.max(10, baseScore - penalty);
      case "content":
        return Math.max(15, baseScore - criticalCount * 20);
      case "privacy":
        return Math.max(25, baseScore + 5 - warningCount * 10);
      default:
        return baseScore;
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-accent";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getBarColor = (score: number): string => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-accent";
    if (score >= 40) return "bg-warning";
    return "bg-destructive";
  };

  const getOverallIcon = () => {
    if (overallScore >= 80) return ShieldCheck;
    if (overallScore >= 50) return Shield;
    if (overallScore >= 30) return ShieldAlert;
    return ShieldX;
  };

  const OverallIcon = getOverallIcon();

  return (
    <GlassPanel className="p-6">
      <h3 className="text-sm font-semibold mb-4 font-orbitron">Security Score</h3>
      
      {/* Overall Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="hsl(var(--nero-elevated))"
              strokeWidth="10"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke={overallScore >= 60 ? "hsl(var(--success))" : overallScore >= 40 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 56}
              initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - overallScore / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <OverallIcon className={cn("w-8 h-8 mb-1", getScoreColor(overallScore))} />
            </motion.div>
            <motion.span
              className={cn("text-2xl font-bold font-mono", getScoreColor(overallScore))}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {overallScore}
            </motion.span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
      </div>

      {/* Individual Metrics */}
      <div className="space-y-4">
        {securityMetrics.map((metric, index) => {
          const score = getMetricScore(metric.id);
          const Icon = metric.icon;
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{metric.label}</span>
                </div>
                <span className={cn("text-sm font-mono font-medium", getScoreColor(score))}>
                  {score}%
                </span>
              </div>
              <div className="h-1.5 bg-nero-elevated rounded-full overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", getBarColor(score))}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassPanel>
  );
};
