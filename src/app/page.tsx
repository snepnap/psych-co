"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Brain, ArrowRight, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrbitalHeroSection } from "@/components/ui/orbital-hero-section";
import { useRef } from "react";

const features = [
  {
    icon: <Brain className="h-6 w-6 text-primary" />,
    title: "Internship Programs",
    description: "Discover and join prestigious internship opportunities tailored for psychology students and professionals.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Professional Certificates",
    description: "Earn and share verifiable certificates that showcase your expertise and continuous learning.",
  },
  {
    icon: <Zap className="h-6 w-6 text-amber-400" />,
    title: "Book Sessions",
    description: "Seamlessly book and manage sessions with certified psychologists, all in one secure platform.",
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Stagger variants for the hero
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <div className="relative w-full">
      {/* ── Orbital Hero Section ─────────────────────────────── */}
      <OrbitalHeroSection className="">
        <motion.div
          style={{ y, opacity }}
          className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            >
              <HeartHandshake className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Elevate Your Psychology Practice
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-light font-outfit tracking-[-0.03em] mb-6"
            >
              Transforming <br />
              <span className="premium-gradient-text bg-clip-text text-transparent relative">
                Mental Health Care
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-[120px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            >
              A comprehensive platform for psychologists to offer internships, issue certificates, and book sessions — all with enterprise-grade security and privacy.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
            >
              <Button
                asChild
                size="lg"
                variant="neumorphism"
              >
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="neumorphism-outline"
              >
                <Link href="/internships">
                  Explore Internships
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </OrbitalHeroSection>

      {/* ── Features Section ─────────────────────────── */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-light font-outfit tracking-[-0.03em] mb-6">
              Why Choose <br />
              <span className="premium-gradient-text bg-clip-text text-transparent relative">
                PsyCH SaaS
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-[140px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              An all-in-one solution designed for psychology professionals and their clients, combining innovation with trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="neumorphism-card p-8 group relative overflow-hidden"
              >
                {/* Subtle animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-[var(--neomorphism-light)/20] border border-[var(--neomorphism-light)/30] opacity-0 group-hover:opacity-10 transition-opacity duration-600" />
                <div className="h-14 w-14 rounded-xl bg-muted border border-border flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold font-outfit mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}