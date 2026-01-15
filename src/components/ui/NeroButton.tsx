import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neroButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-lg",
        ghost:
          "hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg",
        outline:
          "border border-primary/50 text-primary bg-transparent hover:bg-primary/10 hover:border-primary rounded-lg",
        danger:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        terminal:
          "font-mono text-sm bg-nero-elevated border border-border text-primary hover:bg-nero-surface hover:glow-cyan rounded-md",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-md",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface NeroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neroButtonVariants> {
  asChild?: boolean;
}

const NeroButton = React.forwardRef<HTMLButtonElement, NeroButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(neroButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NeroButton.displayName = "NeroButton";

export { NeroButton, neroButtonVariants };
