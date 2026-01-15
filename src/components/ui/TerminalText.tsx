import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TerminalTextProps {
  children: React.ReactNode;
  className?: string;
  prefix?: string;
  animate?: boolean;
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const variantStyles = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
  info: "text-primary",
};

export const TerminalText: React.FC<TerminalTextProps> = ({
  children,
  className,
  prefix = ">",
  animate = false,
  variant = "default",
}) => {
  return (
    <motion.div
      className={cn(
        "font-mono text-sm flex items-start gap-2",
        variantStyles[variant],
        className
      )}
      initial={animate ? { opacity: 0, x: -5 } : undefined}
      animate={animate ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <span className="text-primary shrink-0">{prefix}</span>
      <span className="break-all">{children}</span>
    </motion.div>
  );
};

export const TerminalLine: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  return (
    <motion.div
      className={cn("font-mono text-sm text-muted-foreground", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
};

export const TerminalCursor: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <span
      className={cn(
        "inline-block w-2 h-4 bg-primary animate-terminal-blink ml-0.5",
        className
      )}
    />
  );
};

export const TerminalPrompt: React.FC<{
  user?: string;
  path?: string;
  className?: string;
}> = ({ user = "nero", path = "~", className }) => {
  return (
    <span className={cn("font-mono text-sm", className)}>
      <span className="text-accent">{user}</span>
      <span className="text-muted-foreground">@</span>
      <span className="text-primary">security</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-secondary-foreground">{path}</span>
      <span className="text-muted-foreground">$</span>
    </span>
  );
};
