import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  elevated?: boolean;
  glow?: "cyan" | "green" | "amber" | "red" | "none";
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, elevated = false, glow = "none", children, ...props }, ref) => {
    const glowClasses = {
      cyan: "glow-cyan",
      green: "glow-green",
      amber: "glow-amber",
      red: "glow-red",
      none: "",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "backdrop-blur-xl border rounded-xl",
          "bg-nero-surface/70 border-border/50",
          elevated && "shadow-elevated",
          glowClasses[glow],
          className
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
