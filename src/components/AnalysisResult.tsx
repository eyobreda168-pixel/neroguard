import React from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle, 
  Clock, 
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Shield,
  Download,
  Copy,
  Check
} from "lucide-react";
import { GlassPanel } from "./ui/GlassPanel";
import { RiskBadge, type RiskLevel } from "./ui/RiskBadge";
import { NeroButton } from "./ui/NeroButton";
import { cn } from "@/lib/utils";
import { type AnalysisResult as AnalysisResultType, formatTimestamp } from "@/lib/threatAnalysis";
import { RiskMeter } from "./analysis/RiskMeter";
import { ThreatBreakdown } from "./analysis/ThreatBreakdown";
import { SecurityScore } from "./analysis/SecurityScore";
import { AnalysisTimeline } from "./analysis/AnalysisTimeline";

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const riskColors: Record<RiskLevel, string> = {
  safe: "text-success",
  low: "text-accent",
  medium: "text-warning",
  high: "text-destructive",
  critical: "text-destructive",
  unknown: "text-muted-foreground",
};

const glowVariants: Record<RiskLevel, "cyan" | "green" | "amber" | "red" | "none"> = {
  safe: "green",
  low: "green",
  medium: "amber",
  high: "red",
  critical: "red",
  unknown: "none",
};

export const AnalysisResultCard: React.FC<AnalysisResultProps> = ({ result }) => {
  const [showDetails, setShowDetails] = React.useState(true);
  const [showIndicators, setShowIndicators] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const handleCopyReport = () => {
    const report = `NeroGuard Security Report
========================
Risk Level: ${result.riskLevel.toUpperCase()}
Confidence: ${result.confidence}%
Analyzed: ${formatTimestamp(result.timestamp)}
Type: ${result.inputType}

Summary: ${result.summary}

Indicators:
${result.indicators.map(i => `- [${i.severity.toUpperCase()}] ${i.type}: ${i.description}`).join('\n')}

Recommendations:
${result.recommendations.map(r => `• ${r}`).join('\n')}
`;
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Main Result Card */}
      <GlassPanel 
        className="overflow-hidden"
        glow={glowVariants[result.riskLevel]}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <RiskBadge level={result.riskLevel} size="lg" />
                <span className="text-xs text-muted-foreground font-mono">
                  {result.confidence}% confidence
                </span>
              </div>
              <p className={cn("text-lg font-medium", riskColors[result.riskLevel])}>
                {result.summary}
              </p>
            </div>
            <div className="flex gap-2">
              <NeroButton
                variant="ghost"
                size="icon"
                onClick={handleCopyReport}
                title="Copy report"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </NeroButton>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">{formatTimestamp(result.timestamp)}</span>
            <span className="px-2 py-0.5 bg-nero-elevated rounded text-xs uppercase">
              {result.inputType}
            </span>
          </div>
        </div>

        {/* Threat Indicators */}
        {result.indicators.length > 0 && (
          <div className="border-b border-border">
            <button
              onClick={() => setShowIndicators(!showIndicators)}
              className="w-full px-4 md:px-6 py-3 flex items-center justify-between hover:bg-nero-elevated/50 transition-colors"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <Shield className="w-4 h-4 text-primary" />
                Threat Indicators ({result.indicators.length})
              </span>
              {showIndicators ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {showIndicators && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="px-4 md:px-6 pb-4 space-y-3"
              >
                {result.indicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-nero-elevated rounded-lg"
                  >
                    {indicator.severity === "danger" && (
                      <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    )}
                    {indicator.severity === "warning" && (
                      <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    )}
                    {indicator.severity === "info" && (
                      <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {indicator.type}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {indicator.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Analysis Details */}
        <div className="border-b border-border">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full px-4 md:px-6 py-3 flex items-center justify-between hover:bg-nero-elevated/50 transition-colors"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <Info className="w-4 h-4 text-primary" />
              Analysis Details
            </span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          {showDetails && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="px-4 md:px-6 pb-4"
            >
              <ul className="space-y-2">
                {result.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Recommendations */}
        <div className="p-4 md:p-6 bg-nero-elevated/30">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Recommendations</span>
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="flex items-start gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-secondary-foreground">{rec}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Footer disclaimer */}
        <div className="px-4 md:px-6 py-3 border-t border-border bg-nero-deep/50">
          <p className="text-xs text-muted-foreground text-center">
            This analysis is provided for educational and defensive purposes only. 
            Always verify findings through official channels.
          </p>
        </div>
      </GlassPanel>

      {/* Visual Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Meter */}
        <GlassPanel className="p-6">
          <h3 className="text-sm font-semibold mb-4 font-orbitron text-center">Risk Assessment</h3>
          <RiskMeter riskLevel={result.riskLevel} confidence={result.confidence} />
        </GlassPanel>

        {/* Security Score */}
        <SecurityScore
          riskLevel={result.riskLevel}
          inputType={result.inputType}
          indicators={result.indicators}
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Breakdown Chart */}
        <ThreatBreakdown indicators={result.indicators} />

        {/* Analysis Timeline */}
        <AnalysisTimeline
          inputType={result.inputType}
          riskLevel={result.riskLevel}
          indicatorCount={result.indicators.length}
        />
      </div>
    </motion.div>
  );
};
