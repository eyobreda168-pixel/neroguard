import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Info, Clock } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";

interface TimelineStep {
  id: string;
  label: string;
  status: "complete" | "warning" | "danger" | "info";
  detail: string;
}

interface AnalysisTimelineProps {
  inputType: "url" | "domain" | "text";
  riskLevel: string;
  indicatorCount: number;
}

export const AnalysisTimeline: React.FC<AnalysisTimelineProps> = ({
  inputType,
  riskLevel,
  indicatorCount,
}) => {
  // Generate timeline steps based on analysis
  const getSteps = (): TimelineStep[] => {
    const steps: TimelineStep[] = [
      {
        id: "input",
        label: "Input Validation",
        status: "complete",
        detail: `Validated ${inputType} format`,
      },
      {
        id: "pattern",
        label: "Pattern Analysis",
        status: indicatorCount > 3 ? "danger" : indicatorCount > 0 ? "warning" : "complete",
        detail: `${indicatorCount} patterns detected`,
      },
    ];

    if (inputType === "url" || inputType === "domain") {
      steps.push({
        id: "domain",
        label: "Domain Reputation",
        status: riskLevel === "safe" || riskLevel === "low" ? "complete" : "warning",
        detail: "Checked against known databases",
      });
      steps.push({
        id: "ssl",
        label: "SSL/TLS Check",
        status: "complete",
        detail: "Certificate validation complete",
      });
    }

    steps.push({
      id: "content",
      label: "Content Analysis",
      status: riskLevel === "critical" ? "danger" : riskLevel === "high" ? "warning" : "complete",
      detail: "Scanned for malicious patterns",
    });

    steps.push({
      id: "risk",
      label: "Risk Assessment",
      status: riskLevel === "safe" || riskLevel === "low" ? "complete" : 
              riskLevel === "medium" ? "info" : "warning",
      detail: `Risk level: ${riskLevel.toUpperCase()}`,
    });

    return steps;
  };

  const steps = getSteps();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "danger":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "info":
        return <Info className="w-5 h-5 text-primary" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getLineColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-success";
      case "warning":
        return "bg-warning";
      case "danger":
        return "bg-destructive";
      case "info":
        return "bg-primary";
      default:
        return "bg-muted-foreground";
    }
  };

  return (
    <GlassPanel className="p-6">
      <h3 className="text-sm font-semibold mb-6 font-orbitron flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        Analysis Timeline
      </h3>
      
      <div className="relative">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative flex items-start gap-4 pb-6 last:pb-0"
          >
            {/* Vertical line */}
            {index < steps.length - 1 && (
              <motion.div
                className={cn("absolute left-[10px] top-7 w-0.5 h-full", getLineColor(step.status))}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: index * 0.15 + 0.1, duration: 0.3 }}
                style={{ transformOrigin: "top" }}
              />
            )}
            
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.15, type: "spring" }}
              className="relative z-10 shrink-0"
            >
              {getStatusIcon(step.status)}
            </motion.div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm font-medium text-foreground">{step.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
};
