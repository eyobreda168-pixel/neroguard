import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "NeroGuard has completely transformed how I approach online security. The real-time threat detection is incredibly accurate and has saved me from countless phishing attempts.",
    author: "Sarah Chen",
    role: "Software Engineer",
    company: "TechCorp",
    rating: 5,
    avatar: "SC",
  },
  {
    id: 2,
    quote: "As a small business owner, protecting my customers' data is crucial. NeroGuard provides enterprise-level security at an accessible price point. Highly recommended!",
    author: "Marcus Johnson",
    role: "CEO",
    company: "Digital Solutions Inc.",
    rating: 5,
    avatar: "MJ",
  },
  {
    id: 3,
    quote: "The AI-powered analysis is impressive. It caught a sophisticated phishing email that bypassed my other security tools. This is next-level protection.",
    author: "Emily Rodriguez",
    role: "IT Security Manager",
    company: "FinanceHub",
    rating: 5,
    avatar: "ER",
  },
  {
    id: 4,
    quote: "Clean interface, fast scanning, and reliable results. NeroGuard is now an essential part of my daily workflow. The sandbox feature is particularly useful.",
    author: "David Kim",
    role: "Freelance Developer",
    company: "Independent",
    rating: 5,
    avatar: "DK",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nero-deep" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">What Our </span>
            <span className="text-primary text-glow-cyan">Users Say</span>
          </h2>
          <p className="font-heading text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who trust NeroGuard for their online security.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="p-8 md:p-12 rounded-2xl bg-nero-card border border-border/50"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary/40" />
                </div>

                {/* Quote */}
                <p className="font-heading text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-display text-lg font-bold text-primary">
                      {testimonials[currentIndex].avatar}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-semibold text-foreground">
                      {testimonials[currentIndex].author}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-nero-surface border border-border hover:border-primary/50 
                  hover:bg-nero-elevated transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-nero-surface border border-border hover:border-primary/50 
                  hover:bg-nero-elevated transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by leading organizations worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
            {["TechCorp", "SecureNet", "DataGuard", "CyberShield", "SafeWeb"].map((company) => (
              <span
                key={company}
                className="font-display text-lg md:text-xl font-bold text-muted-foreground"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
