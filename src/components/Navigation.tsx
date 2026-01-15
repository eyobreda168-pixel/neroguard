import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, Search, Globe, History, Info } from "lucide-react";
import neroEmblem from "@/assets/nero-emblem.png";

const navItems = [
  { path: "/", label: "Dashboard", icon: Shield },
  { path: "/analyze", label: "Analyze", icon: Search },
  { path: "/sandbox", label: "Sandbox", icon: Globe },
  { path: "/history", label: "History", icon: History },
  { path: "/about", label: "About", icon: Info },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-6 bg-nero-surface/80 backdrop-blur-xl border-r border-border z-40">
        {/* Logo */}
        <Link to="/" className="mb-8">
          <motion.img
            src={neroEmblem}
            alt="NERO"
            className="w-10 h-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        </Link>

        {/* Nav items */}
        <div className="flex flex-col items-center gap-2 flex-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="relative group"
              >
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-nero-elevated"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.div>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-nero-elevated border border-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  <span className="text-xs font-medium">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-nero-surface/95 backdrop-blur-xl border-t border-border z-40 px-2 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-full max-w-md mx-auto">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center gap-1 py-2 px-3"
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground"
                  )}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
