import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, Menu, X, ChevronRight } from "lucide-react";
const navLinks = [{
  href: "#features",
  label: "Features"
}, {
  href: "#stats",
  label: "Stats"
}, {
  href: "#testimonials",
  label: "Testimonials"
}, {
  href: "#contact",
  label: "Contact"
}];
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };
  return <>
      <motion.nav initial={{
      y: -100
    }} animate={{
      y: 0
    }} transition={{
      duration: 0.6,
      ease: "easeOut"
    }} className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-nero-deep/90 backdrop-blur-xl border-b border-border/50 shadow-lg" : "bg-transparent")}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{
              scale: 1.05,
              rotate: 5
            }} transition={{
              type: "spring",
              stiffness: 400,
              damping: 17
            }} className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
                <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary relative z-10" />
              </motion.div>
              <span className="font-display text-xl md:text-2xl font-bold tracking-wider">
                <span className="text-primary text-glow-cyan">NERO</span>
                <span className="text-foreground">GUARD</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => <button key={link.href} onClick={() => scrollToSection(link.href)} className="relative font-heading text-sm font-medium transition-colors group text-orange-400 border-double shadow-md">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>)}
              <Link to="/analyze">
                <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="btn-neon px-6 py-2.5 rounded-lg text-nero-deep flex items-center gap-2">
                  <span>Launch App</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.2
      }} className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-nero-deep/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="relative pt-24 px-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => <motion.button key={link.href} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.1 + index * 0.05
            }} onClick={() => scrollToSection(link.href)} className="text-left font-heading text-lg font-medium text-foreground py-3 border-b border-border/30">
                    {link.label}
                  </motion.button>)}
                <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.3
            }} className="pt-4">
                  <Link to="/analyze" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="btn-neon w-full px-6 py-3 rounded-lg text-nero-deep flex items-center justify-center gap-2">
                      <span>Launch App</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
};