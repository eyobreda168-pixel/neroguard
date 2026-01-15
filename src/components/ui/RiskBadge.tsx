import * as React from "react";
import { cn } from "@/lib/utils";
import { Shield, ShieldAlert, ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";

export type RiskLevel = "safe" | "low" | "medium" | "high" | "critical" | "unknown";

interface RiskBadgeProps {
  level: RiskLevel;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const riskConfig: Record<
  RiskLevel,
  {
    label: string;
    icon: React.ElementType;
    colorClass: string;
    bgClass: string;
    glowClass: string;
  }
> = {
  safe: {
    label: "Safe",
    icon: ShieldCheck,
    colorClass: "text-success",
    bgClass: "bg-success/10",
    glowClass: "glow-green",
  },
  low: {
    label: "Low Risk",
    icon: Shield,
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    glowClass: "glow-green",
  },
  medium: {
    label: "Medium Risk",
    icon: AlertTriangle,
    colorClass: "text-warning",
    bgClass: "bg-warning/10",
    glowClass: "glow-amber",
  },
  high: {
    label: "High Risk",
    icon: ShieldAlert,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10",
    glowClass: "glow-red",
  },
  critical: {
    label: "Critical",
    icon: ShieldX,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/20",
    glowClass: "glow-red",
  },
  unknown: {
    label: "Unknown",
    icon: Shield,
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted/50",
    glowClass: "",
  },
};

const sizeConfig = {
  sm: { badge: "px-2 py-1 text-xs gap-1", icon: "w-3 h-3" },
  md: { badge: "px-3 py-1.5 text-sm gap-1.5", icon: "w-4 h-4" },
  lg: { badge: "px-4 py-2 text-base gap-2", icon: "w-5 h-5" },
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  showLabel = true,
  size = "md",
  className,
}) => {
  const config = riskConfig[level];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        config.bgClass,
        config.colorClass,
        "border-current/20",
        sizes.badge,
        className
      )}
    >
      <Icon className={sizes.icon} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

export const RiskIndicator: React.FC<{ level: RiskLevel; className?: string }> = ({
  level,
  className,
}) => {
  const config = riskConfig[level];

  return (
    <span
      className={cn(
        "inline-block w-2.5 h-2.5 rounded-full",
        config.bgClass,
        level === "critical" && "animate-pulse",
        className
      )}
      style={{
        boxShadow:
          level !== "unknown"
            ? `0 0 8px currentColor, 0 0 16px currentColor`
            : undefined,
      }}
    />
  );
};
