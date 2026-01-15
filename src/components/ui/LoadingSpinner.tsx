import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
  label,
}) => {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <motion.div
        className={cn(
          "rounded-full border-2 border-muted border-t-primary",
          sizeClasses[size]
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {label && (
        <span className="text-sm text-muted-foreground font-mono">{label}</span>
      )}
    </div>
  );
};

export const ScanningAnimation: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn("relative w-full h-24 overflow-hidden rounded-lg", className)}>
      <div className="absolute inset-0 bg-nero-surface/50 border border-border rounded-lg" />
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{ y: [0, 96, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-sm text-primary animate-pulse">
          SCANNING...
        </span>
      </div>
    </div>
  );
};

export const PulseRing: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/50"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/50"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      <div className="relative w-full h-full rounded-full bg-primary/20 border border-primary/50" />
    </div>
  );
};
