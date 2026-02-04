import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/components/ui/RiskBadge";

interface RiskMeterProps {
  riskLevel: RiskLevel;
  confidence: number;
  className?: string;
}

const riskConfig: Record<RiskLevel, { color: string; rotation: number; label: string }> = {
  safe: { color: "hsl(var(--success))", rotation: -72, label: "SAFE" },
  low: { color: "hsl(var(--accent))", rotation: -36, label: "LOW" },
  medium: { color: "hsl(var(--warning))", rotation: 0, label: "MEDIUM" },
  high: { color: "hsl(var(--destructive))", rotation: 36, label: "HIGH" },
  critical: { color: "hsl(var(--destructive))", rotation: 72, label: "CRITICAL" },
  unknown: { color: "hsl(var(--muted-foreground))", rotation: 0, label: "UNKNOWN" },
};

export const RiskMeter: React.FC<RiskMeterProps> = ({ riskLevel, confidence, className }) => {
  const config = riskConfig[riskLevel];
  
  return (
    <div className={cn("relative w-full max-w-[280px] mx-auto", className)}>
      {/* SVG Gauge */}
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Background arc */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="25%" stopColor="hsl(var(--accent))" />
            <stop offset="50%" stopColor="hsl(var(--warning))" />
            <stop offset="75%" stopColor="hsl(var(--destructive))" />
            <stop offset="100%" stopColor="hsl(var(--destructive))" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="hsl(var(--nero-elevated))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Colored arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Tick marks */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = -180 + (i * 45);
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 68 * Math.cos(rad);
          const y1 = 100 + 68 * Math.sin(rad);
          const x2 = 100 + 58 * Math.cos(rad);
          const y2 = 100 + 58 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
        
        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: config.rotation }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <polygon
            points="100,30 95,100 100,105 105,100"
            fill={config.color}
            filter="url(#glow)"
          />
          <circle cx="100" cy="100" r="8" fill={config.color} />
          <circle cx="100" cy="100" r="4" fill="hsl(var(--nero-deep))" />
        </motion.g>
        
        {/* Center label */}
        <text
          x="100"
          y="85"
          textAnchor="middle"
          className="fill-foreground text-lg font-bold font-orbitron"
          style={{ fontSize: "14px" }}
        >
          {config.label}
        </text>
      </svg>
      
      {/* Confidence bar */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Confidence</span>
          <span className="font-mono">{confidence}%</span>
        </div>
        <div className="h-2 bg-nero-elevated rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: config.color }}
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};
