"use client";

import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const values = [
    {
      title: "Ethics first",
      desc: "Confidentiality, consent and professional boundaries guide everything we do.",
      quote: "Ethical boundaries are not paperwork; they are the foundation of all clinical trust.",
    },
    {
      title: "Learning by doing",
      desc: "Practice, feedback and supervision matter more than slides.",
      quote: "You cannot learn to conduct a Mental Status Examination by memorizing a textbook.",
    },
    {
      title: "Accessible to all",
      desc: "Programs designed for school students through to working professionals.",
      quote: "High-standard clinical training belongs in the hands of every aspiring student.",
    },
    {
      title: "Compassion",
      desc: "Mental health work starts with care for people.",
      quote: "Behind every clinical test score and case formulation is an individual seeking understanding.",
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
              <span>About Us · Clinical Leadership & Principles</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#114B43] dark:text-emerald-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#114B43] dark:bg-emerald-400" />
              <span>RCI Registration: CRR A111440</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight leading-[1.12]">
              About The Psych Co.
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-open-sans">
              Bridging the gap between academic theory and real clinical practice through structured, expert-led training and ethical care.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Story & Mission/Vision ───────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 font-open-sans">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
                  The Founding Premise
                </span>
                <h2 className="text-3xl font-outfit font-bold text-foreground">
                  Our story
                </h2>
                <p>
                  Many psychology students finish their degrees knowing the theory but having little chance to practise it. Clinical skills like case history taking, psychological assessment and report writing are often learnt late, or only on the job.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">The Psych Co.</strong> was started to close that gap by offering structured, practical, expert-led training that students can access online, at their own pace and at their own level.
                </p>
              </div>

              {/* Mission & Vision Manifesto Plate */}
              <div className="pt-4 grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#114B43] dark:text-emerald-300">
                    Mandate
                  </span>
                  <h3 className="font-outfit font-bold text-base text-foreground">
                    Our mission
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    To make quality clinical psychology training and mental health care accessible, practical and ethical.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C2613B]">
                    Horizon
                  </span>
                  <h3 className="font-outfit font-bold text-base text-foreground">
                    Our vision
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    To build a generation of confident, skilled and compassionate psychology professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* What We Do Summary Docket */}
            <div className="lg:col-span-5 bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] rounded-2xl p-8 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
                Practice Scope
              </span>
              <h3 className="text-2xl font-outfit font-bold text-foreground">
                What we do
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-open-sans">
                We run online internships and certification courses for students and professionals, and we offer psychotherapy with a qualified clinician. All our training and sessions are led by an RCI-registered Clinical Psychologist.
              </p>

              <div className="space-y-2.5 text-xs text-foreground/80 border-t border-border/70 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-300 shrink-0" />
                  <span>Supervised 30 & 60 day clinical internships</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-300 shrink-0" />
                  <span>Six specialized skill certification modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-300 shrink-0" />
                  <span>Confidential one-on-one psychotherapy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet Our Clinical Psychologist ─────────────────── */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              Clinical Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              Meet our clinical psychologist
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Direct supervision and training from an accredited practitioner.
            </p>
          </div>

          <div className="bg-card border-2 border-[#114B43]/20 rounded-2xl p-8 sm:p-10 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-border/80">
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-foreground">
                  Rishabh Jain
                </h3>
                <p className="text-sm font-semibold text-[#114B43] dark:text-emerald-300">
                  RCI-registered Clinical Psychologist
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Rehabilitation Council of India Registry · CRR: A111440
                </p>
              </div>

              <span className="text-xs font-mono font-semibold px-3 py-1 rounded bg-[#E8F3F1] dark:bg-[#133D36] text-[#114B43] dark:text-emerald-300 border border-[#114B43]/20 shrink-0">
                Verified Clinical Supervisor
              </span>
            </div>

            <blockquote className="text-base sm:text-lg text-foreground/85 leading-relaxed font-serif italic border-l-2 border-[#114B43] pl-5 py-1">
              &ldquo;Clinical training requires mentorship in a room, not recorded videos. We ensure students work through actual cases, practice structured interviews, and receive candid clinical feedback.&rdquo;
            </blockquote>

            <p className="text-sm text-muted-foreground leading-relaxed font-open-sans">
              Dedicated to making practical clinical psychology understandable, compassionate, and ethical. Oversees all internship curriculums, case reviews, role play supervision, and one-on-one psychotherapy sessions.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-foreground/80">
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-muted border border-border">
                Clinical Assessments & MSE
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-muted border border-border">
                Cognitive Behavioral Therapy
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-muted border border-border">
                Supervised Case Formulations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Ethical Charter
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              Our values
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              What guides every training cohort, case discussion, and therapy session we conduct.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-muted-foreground block">
                    Principle 0{i + 1}
                  </span>
                  <h3 className="text-lg font-outfit font-bold text-foreground">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {val.desc}
                  </p>
                </div>
                <p className="text-[11px] font-serif italic text-foreground/75 pt-3 border-t border-border/50">
                  &ldquo;{val.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 flex justify-center">
            <Button
              asChild
              className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-8 py-3 text-sm shadow-xs"
            >
              <Link href="/#internships" className="flex items-center gap-2">
                Explore Our Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
