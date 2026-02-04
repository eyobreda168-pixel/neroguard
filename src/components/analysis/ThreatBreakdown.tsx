import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { ThreatIndicator } from "@/lib/threatAnalysis";

interface ThreatBreakdownProps {
  indicators: ThreatIndicator[];
}

const severityColors = {
  danger: "hsl(var(--destructive))",
  warning: "hsl(var(--warning))",
  info: "hsl(var(--primary))",
};

export const ThreatBreakdown: React.FC<ThreatBreakdownProps> = ({ indicators }) => {
  // Group indicators by severity
  const severityCounts = indicators.reduce(
    (acc, ind) => {
      acc[ind.severity] = (acc[ind.severity] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = [
    { name: "Critical", value: severityCounts.danger || 0, color: severityColors.danger },
    { name: "Warning", value: severityCounts.warning || 0, color: severityColors.warning },
    { name: "Info", value: severityCounts.info || 0, color: severityColors.info },
  ].filter((d) => d.value > 0);

  // If no indicators, show empty state
  if (indicators.length === 0) {
    return (
      <GlassPanel className="p-6">
        <h3 className="text-sm font-semibold mb-4 font-orbitron">Threat Breakdown</h3>
        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          No threats detected
        </div>
      </GlassPanel>
    );
  }

  // Group by type for category breakdown
  const typeGroups = indicators.reduce(
    (acc, ind) => {
      acc[ind.type] = (acc[ind.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const typeData = Object.entries(typeGroups).map(([name, value], i) => ({
    name,
    value,
    color: `hsl(${200 + i * 30}, 70%, 50%)`,
  }));

  return (
    <GlassPanel className="p-6">
      <h3 className="text-sm font-semibold mb-4 font-orbitron">Threat Breakdown</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Severity Pie Chart */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 text-center">By Severity</p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--nero-surface))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px" }}
                  formatter={(value) => <span className="text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Bars */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 text-center">By Category</p>
          <div className="space-y-3">
            {typeData.slice(0, 5).map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-1"
              >
                <div className="flex justify-between text-xs">
                  <span className="text-foreground truncate max-w-[150px]">{type.name}</span>
                  <span className="text-muted-foreground">{type.value}</span>
                </div>
                <div className="h-2 bg-nero-elevated rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: type.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(type.value / indicators.length) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <motion.p
            className="text-2xl font-bold text-destructive font-mono"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {severityCounts.danger || 0}
          </motion.p>
          <p className="text-xs text-muted-foreground">Critical</p>
        </div>
        <div className="text-center">
          <motion.p
            className="text-2xl font-bold text-warning font-mono"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            {severityCounts.warning || 0}
          </motion.p>
          <p className="text-xs text-muted-foreground">Warnings</p>
        </div>
        <div className="text-center">
          <motion.p
            className="text-2xl font-bold text-primary font-mono"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            {severityCounts.info || 0}
          </motion.p>
          <p className="text-xs text-muted-foreground">Info</p>
        </div>
      </div>
    </GlassPanel>
  );
};
