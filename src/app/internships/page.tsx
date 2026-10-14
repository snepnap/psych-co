"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/shared/ApplyModal";

export default function InternshipsPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("Online Internship (30 days)");

  const handleApply = (program: string) => {
    setSelectedProgram(program);
    setApplyModalOpen(true);
  };

  const curriculum = [
    {
      num: "01",
      code: "MOD-MSE",
      title: "Case History Taking and Mental Status Examination (MSE)",
      desc: "How to gather a structured history and assess a client's mental state in clinical practice.",
      competency: "Eliciting clinical milestones, evaluating orientation, affect, thought process, and insight.",
    },
    {
      num: "02",
      code: "MOD-PSY",
      title: "Psychological Assessment",
      desc: "Understanding, scoring and interpreting commonly used psychological tests.",
      competency: "Test administration rules, standardized norms, objective scoring, and cautious clinical inference.",
    },
    {
      num: "03",
      code: "MOD-REP",
      title: "Report Writing",
      desc: "How to turn assessment findings into a clear, professional, clinically sound report.",
      competency: "Formulating referral questions, behavioral summaries, diagnostic integration, and recommendations.",
    },
    {
      num: "04",
      code: "MOD-CAS",
      title: "Case Discussions",
      desc: "Work through real-style cases with an experienced clinician and learn how decisions are made.",
      competency: "Differential diagnosis reasoning, hypothesis generation, and clinical debriefing.",
    },
    {
      num: "05",
      code: "MOD-ROL",
      title: "Role Plays",
      desc: "Practise clinical conversations and therapeutic questions in a safe, guided setting.",
      competency: "Simulated client encounters, therapeutic empathy, managing resistance, and verbal pacing.",
    },
    {
      num: "06",
      code: "MOD-SKL",
      title: "Clinical Skills Training",
      desc: "Build core competencies and ethical boundaries used in everyday clinical practice.",
      competency: "Informed consent protocols, therapeutic frame management, and dual-relationship ethics.",
    },
    {
      num: "07",
      code: "MOD-MCK",
      title: "Mock Sessions",
      desc: "Rehearse full sessions and receive constructive clinician feedback.",
      competency: "Conducting an entire intake interview from beginning to end under supervisor observation.",
    },
    {
      num: "08",
      code: "MOD-ENH",
      title: "Skills Enhancement Training",
      desc: "Strengthen and refine your existing skills with advanced techniques and supervisory insights.",
      competency: "Refining diagnostic precision, handling complex presentations, and supervised clinical writing.",
    },
  ];

  const targetAudiences = [
    "Class 11-12 students exploring psychology as a career",
    "Bachelor's students who want practical exposure beyond the syllabus",
    "Master's students preparing for clinical work, placements and assessments",
    "Working professionals looking to upskill or revisit clinical fundamentals",
  ];

  const steps = [
    {
      num: "1",
      title: "Apply online",
      desc: "Fill in a short application form with your academic level and schedule preference.",
    },
    {
      num: "2",
      title: "Batch & schedule confirmation",
      desc: "We confirm your batch, cohort level and timing (Monday to Friday, 1 hr/day).",
    },
    {
      num: "3",
      title: "Attend, practise & feedback",
      desc: "Participate in interactive online sessions, complete case worksheets and receive live feedback.",
    },
    {
      num: "4",
      title: "Complete the program",
      desc: "Graduate with verified clinical competencies and a Certificate of Completion.",
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
              <span>Clinical Residency · Online Internships</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#114B43] dark:text-emerald-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#114B43] dark:bg-emerald-400" />
              <span>RCI Registration: CRR A111440</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight leading-[1.12]">
              Psychology Online Internship
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-open-sans">
              Gain practical clinical exposure, directly from an RCI-registered Clinical Psychologist.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => handleApply("Online Internship (30 days)")}
                className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-7 py-3 text-sm shadow-xs font-medium"
              >
                Apply for Internship
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-7 py-3 text-sm border-border hover:bg-card"
              >
                <Link href="/#contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview Section ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
            Clinical Rationale
          </span>
          <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-foreground">
            Going beyond the textbook
          </h2>
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-open-sans">
            Our online internship takes you beyond the textbook. Over 30 or 60 days, you learn how clinical psychologists actually work: how they take a case history, assess a client, interpret test results, write reports and conduct sessions.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-open-sans">
            Everything is delivered online via live cohorts, so you can learn from anywhere while maintaining your academic schedule.
          </p>
        </div>
      </section>

      {/* ── Choose Your Duration ────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              Cohort Structure
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              Choose your duration
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Structured live cohorts running Monday to Friday, 1 hour per day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 30-Day Card */}
            <div className="bg-card border border-[#E5DFD5] rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Foundation Fellowship
                  </span>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#114B43]" /> Mon–Fri, 1 hr/day
                  </span>
                </div>

                <h3 className="text-2xl font-outfit font-bold text-foreground">
                  30-Day Program
                </h3>

                <div className="space-y-2 py-3 border-y border-border/70 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium text-foreground">Online, live Google Meet cohort</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span className="font-medium text-foreground">Monday to Friday, 1 hr/day</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Best for:</span>
                    <span className="font-medium text-foreground text-right max-w-[220px]">
                      A focused introduction to core clinical skills
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Ideal for students starting out who need a fast, high-impact orientation to case histories, MSE, and basic testing fundamentals.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/70">
                <Button
                  onClick={() => handleApply("Online Internship (30 days)")}
                  className="w-full bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full py-2.5 text-xs font-semibold shadow-xs"
                >
                  Apply for 30-Day Program
                </Button>
              </div>
            </div>

            {/* 60-Day Card */}
            <div className="bg-card border-2 border-[#114B43]/30 rounded-2xl p-8 shadow-xs flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C2613B]">
                    Advanced Clinical Residency
                  </span>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#C2613B]" /> Mon–Fri, 1 hr/day
                  </span>
                </div>

                <h3 className="text-2xl font-outfit font-bold text-foreground">
                  60-Day Program
                </h3>

                <div className="space-y-2 py-3 border-y border-border/70 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium text-foreground">Online, extensive case work & mock sessions</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span className="font-medium text-foreground">Monday to Friday, 1 hr/day</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Best for:</span>
                    <span className="font-medium text-foreground text-right max-w-[220px]">
                      A deeper, more extensive training experience
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Includes in-depth case studies, multiple role play scenarios, extensive mock sessions, and individualised reporting reviews.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/70">
                <Button
                  onClick={() => handleApply("Online Internship (60 days)")}
                  className="w-full bg-[#C2613B] hover:bg-[#a74f2d] text-white rounded-full py-2.5 text-xs font-semibold shadow-xs"
                >
                  Apply for 60-Day Program
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum Syllabus Index (8 Modules) ───────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Curriculum Syllabus
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              What you will learn
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Eight key practical competencies taught through interactive clinical simulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculum.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>Module {item.num}</span>
                    <span className="text-[#114B43] dark:text-emerald-300 font-bold">{item.code}</span>
                  </div>
                  <h3 className="font-outfit font-bold text-base text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-border/60 text-[11px] text-foreground/75">
                  <span className="font-semibold block mb-0.5">Competency:</span>
                  <span>{item.competency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Is It For? ───────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              Target Candidates
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              Who is it for?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {targetAudiences.map((aud, i) => (
              <div
                key={i}
                className="bg-card p-6 rounded-2xl border border-[#E5DFD5] flex items-start gap-4 shadow-xs"
              >
                <Check className="h-5 w-5 text-[#114B43] dark:text-emerald-300 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">
                  {aud}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works (4 Steps) ───────────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Onboarding Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              How it works
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-2.5"
              >
                <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">
                  Step 0{st.num}
                </span>
                <h3 className="text-lg font-outfit font-bold text-foreground">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* What you need box */}
          <div className="p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-outfit font-bold text-foreground text-base">
                What you need to begin
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                A laptop or phone, a stable internet connection and a genuine interest in learning.
              </p>
            </div>

            <Button
              onClick={() => handleApply("Online Internship (30 days)")}
              className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-7 py-3 text-xs font-semibold shadow-xs shrink-0"
            >
              Apply for Internship
            </Button>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultProgram={selectedProgram}
      />
    </div>
  );
}
