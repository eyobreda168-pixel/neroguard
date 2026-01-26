import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Shield, Users, Zap } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="counter-value">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  {
    icon: Shield,
    value: 2500000,
    suffix: "+",
    label: "Links Scanned",
    description: "URLs analyzed for threats",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: TrendingUp,
    value: 150000,
    suffix: "+",
    label: "Threats Blocked",
    description: "Malicious content stopped",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
  },
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Active Users",
    description: "Protected worldwide",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
  },
  {
    icon: Zap,
    value: 99,
    suffix: ".9%",
    label: "Uptime",
    description: "Always-on protection",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            By The Numbers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Trusted by </span>
            <span className="text-accent text-glow-red">Thousands</span>
          </h2>
          <p className="font-heading text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time statistics showcasing our commitment to keeping users safe online.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`h-full p-6 md:p-8 rounded-2xl bg-nero-card/80 backdrop-blur-sm 
                  border ${stat.borderColor} transition-all duration-300
                  hover:shadow-[0_0_40px_hsl(var(--neon-cyan)_/_0.1)]`}
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                  <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                </div>

                {/* Value */}
                <div className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Live Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">Live Data</span>
          </div>
          <span className="text-sm text-muted-foreground">Updated in real-time</span>
        </motion.div>
      </div>
    </section>
  );
};
