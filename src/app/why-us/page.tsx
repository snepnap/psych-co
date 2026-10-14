"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhyUsPage() {
  const differentiators = [
    {
      highlight: "Clinical Leadership",
      title: "Led by an RCI-registered Clinical Psychologist",
      desc: "You learn from, and are supported by, a clinician registered with the Rehabilitation Council of India (CRR: A111440), not from recorded theory alone.",
    },
    {
      highlight: "Hands-on Practice",
      title: "Learn by doing",
      desc: "Case history taking, assessment, scoring, report writing, role plays and mock sessions. You practise the real work and get feedback.",
    },
    {
      highlight: "Accessible Schedule",
      title: "Flexible and online",
      desc: "Thirty and sixty day internships and short courses that fit comfortably around your school, college or clinical work.",
    },
    {
      highlight: "Academic Continuity",
      title: "Programs for every stage",
      desc: "From Class 11-12 students exploring psychology to professionals sharpening their skills, there is a clear starting point for everyone.",
    },
    {
      highlight: "Integrated Care",
      title: "Training and therapy under one roof",
      desc: "Our clinical experience in therapy shapes how we teach, so what you learn directly reflects active, real-world practice.",
    },
    {
      highlight: "Ethical Standards",
      title: "Ethical, confidential practice",
      desc: "We follow strict professional ethics in every session, role play, and conversation with you. No outcome promises or cure claims.",
    },
  ];

  return (
    <div className="relative w-full text-foreground selection:bg-[#114B43]/15 selection:text-[#114B43]">
      {/* ── Page Masthead ───────────────────────────────────── */}
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-24 bg-[#FAF8F5] dark:bg-[#0B1917] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-b border-[#114B43]/15 dark:border-emerald-900/40 pb-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground tracking-wider uppercase">The Psych Co.</span>
              <span className="text-muted-foreground/40">/</span>
              <span>Why Us · Clinical Mentorship Model</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#114B43] dark:text-emerald-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#114B43] dark:bg-emerald-400" />
              <span>RCI Registration: CRR A111440</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight leading-[1.12]">
              Why The Psych Co.
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-open-sans">
              Practical training and care, led by a qualified clinician.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6 Differentiators ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              Core Distinctions
            </span>
            <h2 className="text-3xl font-outfit font-bold text-foreground">
              What sets our clinical training apart
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Moving beyond textbook rote memorization to active clinical competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#114B43] dark:text-emerald-300">
                    {diff.highlight}
                  </span>
                  <h3 className="text-lg font-outfit font-bold text-foreground leading-snug">
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-open-sans">
                    {diff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach (Understand -> Practise -> Reflect) ─ */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Pedagogical Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              Our approach
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              A 3-step continuous cycle designed for deep clinical retention and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-card p-6 sm:p-7 rounded-2xl border border-[#E5DFD5] space-y-2.5 shadow-xs">
              <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">Phase 01</span>
              <h3 className="font-outfit font-bold text-lg text-foreground">1. Understand</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-open-sans">
                Build the concepts and the reasoning behind clinical decisions.
              </p>
            </div>
            <div className="bg-card p-6 sm:p-7 rounded-2xl border border-[#E5DFD5] space-y-2.5 shadow-xs">
              <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">Phase 02</span>
              <h3 className="font-outfit font-bold text-lg text-foreground">2. Practise</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-open-sans">
                Apply them through real-style cases, role plays and mock sessions.
              </p>
            </div>
            <div className="bg-card p-6 sm:p-7 rounded-2xl border border-[#E5DFD5] space-y-2.5 shadow-xs">
              <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">Phase 03</span>
              <h3 className="font-outfit font-bold text-lg text-foreground">3. Reflect</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-open-sans">
                Receive individual clinician feedback and refine your skills under supervision.
              </p>
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <Button
              asChild
              className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-8 py-3 text-sm shadow-xs"
            >
              <Link href="/#contact" className="flex items-center gap-2">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
