"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  HeartHandshake,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Users,
  Compass,
  FileText,
  BadgeCheck,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgramDecisionMatrixProps {
  onSelectProgram: (programName: string, courseTitle?: string) => void;
  onOpenCourseModal?: (courseId: string) => void;
}

export function ProgramDecisionMatrix({
  onSelectProgram,
  onOpenCourseModal,
}: ProgramDecisionMatrixProps) {
  // Mode: "explore" (tabs) or "advisor" (quick diagnostic quiz)
  const [activeTab, setActiveTab] = useState<"internships" | "courses" | "therapy">("internships");
  const [quizOpen, setQuizOpen] = useState(false);

  // Diagnostic Quiz State
  const [quizRole, setQuizRole] = useState("bachelor");
  const [quizGoal, setQuizGoal] = useState("internship_practical");

  // Determine recommendation based on user answers
  const getRecommendation = () => {
    if (quizRole === "therapy_seeker" || quizGoal === "personal_therapy") {
      return {
        title: "Confidential Psychotherapy & Counselling",
        tag: "Individual Clinical Care",
        desc: "One-on-one psychotherapy sessions with RCI-registered Clinical Psychologist Rishabh Jain. Safe, non-judgmental space for anxiety, mood, burnout, or life transitions.",
        duration: "50–60 Minutes / Session (Online)",
        actionText: "Book a Consultation",
        programValue: "Psychotherapy / Counselling",
        courseValue: "",
      };
    }
    if (quizRole === "school" || (quizRole === "bachelor" && quizGoal === "internship_foundational")) {
      return {
        title: "30-Day Foundation Internship",
        tag: "Core Clinical Introduction",
        desc: "Ideal starting point to understand Case History taking, Mental Status Examination (MSE), introductory scoring, and ethical boundaries with live daily supervision.",
        duration: "30 Days · Mon–Fri, 1 hr/day (Online)",
        actionText: "Apply for 30-Day Foundation",
        programValue: "Online Internship (30 days)",
        courseValue: "",
      };
    }
    if (quizRole === "master" || (quizRole === "bachelor" && quizGoal === "internship_practical") || quizGoal === "case_formulation") {
      return {
        title: "60-Day Comprehensive Residency",
        tag: "Advanced Clinical Practice",
        desc: "Full clinical depth: Case History, MSE, simulated client role-plays, mock intake sessions, report writing formulations, and detailed supervisor debriefs.",
        duration: "60 Days · Mon–Fri, 1 hr/day (Online)",
        actionText: "Apply for 60-Day Residency",
        programValue: "Online Internship (60 days)",
        courseValue: "",
      };
    }
    if (quizGoal === "cbt_skills") {
      return {
        title: "Cognitive Behavioral Therapy (CBT)",
        tag: "Certification Masterclass · PSY-301",
        desc: "Master the cognitive model, automatic thoughts, core beliefs, collaborative empiricism, and evidence-based interventions for practical clinical use.",
        duration: "Structured Live Masterclass",
        actionText: "Enrol in CBT Masterclass",
        programValue: "Certification Course",
        courseValue: "CBT",
      };
    }
    if (quizGoal === "assessment_tests") {
      return {
        title: "Case History & MSE or Rorschach Test",
        tag: "Clinical Assessment Series",
        desc: "Build competency in structured diagnostic observations, behavioral notes, and projective test interpretation under direct clinician supervision.",
        duration: "Focused Intensive Course",
        actionText: "Explore Assessment Courses",
        programValue: "Certification Course",
        courseValue: "Case History and MSE",
      };
    }
    // Default fallback
    return {
      title: "60-Day Comprehensive Residency",
      tag: "Recommended for In-Depth Practice",
      desc: "Our most thorough clinical internship covering patient interviews, MSE, assessment scoring, and supervised report drafting.",
      duration: "60 Days · Mon–Fri, 1 hr/day (Online)",
      actionText: "Apply for 60-Day Residency",
      programValue: "Online Internship (60 days)",
      courseValue: "",
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="w-full bg-card border border-[#E5DFD5] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
      {/* Top Pine Brand Accent Rule */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-[#114B43]" />

      {/* Header & Sub-Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5DFD5]">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C2613B]">
            <Compass className="h-3.5 w-3.5" />
            <span>Interactive Program Navigator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-foreground tracking-tight">
            Find the right path for your stage
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Whether you need hands-on supervised clinical hours, a focused test certification, or confidential individual therapy, choose your intent below.
          </p>
        </div>

        {/* Quick Quiz Toggle Button */}
        <div className="shrink-0">
          <button
            onClick={() => setQuizOpen(!quizOpen)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all border ${
              quizOpen
                ? "bg-[#114B43] text-white border-[#114B43] shadow-xs"
                : "bg-[#FAF8F5] dark:bg-[#132A26] text-[#114B43] dark:text-emerald-300 border-[#114B43]/30 hover:bg-[#114B43]/10"
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>{quizOpen ? "Return to Program Tabs" : "Need help choosing? Take 15-sec guide"}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: 15-Second Interactive Diagnostic Quiz */}
      <AnimatePresence mode="wait">
        {quizOpen ? (
          <motion.div
            key="quiz-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="pt-8 space-y-8"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Questions Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Step 1: Background */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    Step 1 · Where are you currently situated?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: "school", label: "Class 11–12 Student", sub: "Exploring psychology as a career" },
                      { id: "bachelor", label: "Bachelor's Student", sub: "Building practical clinical basics" },
                      { id: "master", label: "Master's / Trainee", sub: "Preparing for placements & hospitals" },
                      { id: "professional", label: "Working Professional", sub: "Upskilling clinical assessments" },
                      { id: "therapy_seeker", label: "Individual Seeking Therapy", sub: "Looking for personal mental health care" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setQuizRole(opt.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          quizRole === opt.id
                            ? "bg-[#E8F3F1] dark:bg-[#133D36] border-[#114B43] ring-1 ring-[#114B43]"
                            : "bg-[#FAF8F5] dark:bg-[#122522] border-[#E5DFD5] hover:border-[#114B43]/40"
                        }`}
                      >
                        <span className="font-outfit font-bold text-sm block text-foreground">
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Primary Goal */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    Step 2 · What is your main priority right now?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: "internship_foundational", label: "Understand Case History & MSE", sub: "Structured observation drills" },
                      { id: "internship_practical", label: "Full Simulated Residency (60 Days)", sub: "Role plays, mock sessions & reports" },
                      { id: "cbt_skills", label: "CBT Techniques & Intervention", sub: "Evidence-based practice skills" },
                      { id: "assessment_tests", label: "Psychological Testing (DAPT / Rorschach)", sub: "Scoring & projective interpretation" },
                      { id: "personal_therapy", label: "Confidential Personal Therapy", sub: "Individual care for stress/anxiety" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setQuizGoal(opt.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          quizGoal === opt.id
                            ? "bg-[#FDF2EC] dark:bg-[#321B13] border-[#C2613B] ring-1 ring-[#C2613B]"
                            : "bg-[#FAF8F5] dark:bg-[#122522] border-[#E5DFD5] hover:border-[#C2613B]/40"
                        }`}
                      >
                        <span className="font-outfit font-bold text-sm block text-foreground">
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Outcome Card */}
              <div className="lg:col-span-5 bg-[#FAF8F5] dark:bg-[#122522] border-2 border-[#114B43] rounded-2xl p-6 sm:p-7 space-y-5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#C2613B]">
                    Recommended Match
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E8F3F1] dark:bg-[#133D36] text-[#114B43] dark:text-emerald-300 font-medium">
                    RCI Supervised
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground font-mono block">
                    {recommendation.tag}
                  </span>
                  <h3 className="text-2xl font-outfit font-bold text-foreground">
                    {recommendation.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {recommendation.desc}
                  </p>
                </div>

                <div className="py-3 border-y border-[#E5DFD5] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Clock className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0" />
                    <span>Schedule: {recommendation.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-[#C2613B] shrink-0" />
                    <span>Direct mentorship by Rishabh Jain (CRR: A111440)</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Button
                    onClick={() =>
                      onSelectProgram(recommendation.programValue, recommendation.courseValue)
                    }
                    className="w-full bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full py-3 text-xs font-semibold shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>{recommendation.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground mt-2">
                    Review and finalize your details on the next step.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* VIEW 2: Segmented Tabs (Internships vs Courses vs Therapy) */
          <motion.div
            key="tabs-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="pt-8 space-y-8"
          >
            {/* Tab Controls Bar */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] rounded-2xl">
              {[
                { id: "internships", label: "Clinical Internships (30 & 60 Days)", icon: GraduationCap },
                { id: "courses", label: "Certification Masterclasses (6 Modules)", icon: BookOpen },
                { id: "therapy", label: "Psychotherapy & Counselling (Online)", icon: HeartHandshake },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-card text-foreground shadow-xs border border-[#E5DFD5] text-[#114B43] dark:text-emerald-300"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#114B43] dark:text-emerald-300" : "text-muted-foreground"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT 1: INTERNSHIPS (Side-by-Side Comparison Matrix) */}
            {activeTab === "internships" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                  {/* 30-Day Foundation */}
                  <div className="bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#114B43] dark:text-emerald-300 font-bold">
                          Core Foundation
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-card border border-[#E5DFD5] text-muted-foreground font-mono">
                          30 Days · Mon–Fri
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-outfit font-bold text-foreground">
                          30-Day Foundation Internship
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                          A focused, rigorous introduction to clinical skills, psychiatric history taking, and Mental Status Examination (MSE).
                        </p>
                      </div>

                      <div className="space-y-2.5 text-xs text-foreground/90 pt-2 border-t border-[#E5DFD5]">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Structured Case History elicitation & demographic charting</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Conducting and recording Mental Status Examination (MSE)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Introductory psychological assessment & scoring rules</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Live Google Meet cohorts: 1 hour/day with daily clinician Q&A</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Verifiable RCI-supervised certificate with accredited hours</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E5DFD5]">
                      <div className="text-[11px] font-mono text-muted-foreground mb-3">
                        Ideal for: Class 11–12 and early Bachelor&apos;s students wanting practical grounding.
                      </div>
                      <Button
                        onClick={() => onSelectProgram("Online Internship (30 days)")}
                        className="w-full bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full py-2.5 text-xs font-semibold shadow-xs"
                      >
                        Apply for 30-Day Track
                      </Button>
                    </div>
                  </div>

                  {/* 60-Day Comprehensive Residency */}
                  <div className="bg-card border-2 border-[#114B43] rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative shadow-md">
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#C2613B] text-white">
                        Full Clinical Depth
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#C2613B] font-bold block mb-1">
                          Comprehensive Residency
                        </span>
                        <h3 className="text-2xl font-outfit font-bold text-foreground">
                          60-Day Comprehensive Internship
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                          In-depth clinical formulation, simulated role plays, mock intake sessions, diagnostic report writing, and supervisor debriefs.
                        </p>
                      </div>

                      <div className="space-y-2.5 text-xs text-foreground/90 pt-2 border-t border-[#E5DFD5]">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong>Everything in 30-Day Foundation</strong> + advanced diagnostic drills</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Simulated patient role plays & clinical questioning practice</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Full mock clinical intake sessions with constructive supervisor debrief</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Professional psychological report drafting & formulation templates</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Verifiable Advanced Clinical Certificate detailing 60-day practical competency</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E5DFD5]">
                      <div className="text-[11px] font-mono text-muted-foreground mb-3">
                        Ideal for: Final-year Bachelor&apos;s, Master&apos;s students, and trainees preparing for hospital postings.
                      </div>
                      <Button
                        onClick={() => onSelectProgram("Online Internship (60 days)")}
                        className="w-full bg-[#C2613B] hover:bg-[#a94f2d] text-white rounded-full py-2.5 text-xs font-semibold shadow-xs"
                      >
                        Apply for 60-Day Track
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <a
                    href="#internships"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#114B43] dark:text-emerald-300 hover:text-[#C2613B] transition-colors"
                  >
                    <span>View complete 8-module syllabus breakdown & curriculum timetable</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: CERTIFICATION MASTERCLASSES */}
            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: "mse",
                      code: "PSY-101",
                      title: "Case History and MSE",
                      cat: "Clinical Assessment",
                      desc: "The clinical bedrock: learning what to ask, how to observe, and how to record findings clearly.",
                    },
                    {
                      id: "dapt",
                      code: "PSY-102",
                      title: "Draw-A-Person Test (DAPT)",
                      cat: "Projective Testing",
                      desc: "Standard administration, scoring, and cautious interpretation of projective drawing.",
                    },
                    {
                      id: "counselling",
                      code: "PSY-201",
                      title: "Supportive Counselling Skills",
                      cat: "Therapeutic Skills",
                      desc: "Active listening, empathy, rapport building, clinical questioning, and containing distress.",
                    },
                    {
                      id: "emergency",
                      code: "PSY-202",
                      title: "Emergency Support & Crisis",
                      cat: "Crisis Protocols",
                      desc: "Psychological first aid, de-escalation, safety planning, and referral to 112/14416.",
                    },
                    {
                      id: "cbt",
                      code: "PSY-301",
                      title: "Cognitive Behavioral Therapy (CBT)",
                      cat: "Interventions",
                      desc: "Automatic thoughts, core beliefs, cognitive distortions, and structured behavioral experiments.",
                    },
                    {
                      id: "rorschach",
                      code: "PSY-302",
                      title: "Rorschach Inkblot Test",
                      cat: "Advanced Psychodiagnostics",
                      desc: "Standardized administration, determinants, location scoring, and ethical report integration.",
                    },
                  ].map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] flex flex-col justify-between hover:border-[#114B43]/50 transition-colors space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-[#114B43] dark:text-emerald-300">{c.code}</span>
                          <span className="text-muted-foreground">{c.cat}</span>
                        </div>
                        <h4 className="font-outfit font-bold text-base text-foreground leading-snug">
                          {c.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {c.desc}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#E5DFD5]/80">
                        {onOpenCourseModal && (
                          <button
                            onClick={() => onOpenCourseModal(c.id)}
                            className="text-xs text-muted-foreground hover:text-foreground font-semibold"
                          >
                            View Syllabus
                          </button>
                        )}
                        <Button
                          onClick={() => onSelectProgram("Certification Course", c.title)}
                          className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-4 py-1.5 text-xs font-semibold shadow-xs"
                        >
                          Enrol
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <a
                    href="#courses"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#114B43] dark:text-emerald-300 hover:text-[#C2613B] transition-colors"
                  >
                    <span>Browse complete course catalog with detailed syllabi</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: PSYCHOTHERAPY & COUNSELLING */}
            {activeTab === "therapy" && (
              <div className="bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2613B] font-bold block">
                      Confidential Clinical Care
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-foreground">
                      Psychotherapy & Counselling with Rishabh Jain
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Safe, non-judgmental, one-on-one psychotherapy sessions held securely online. For individuals dealing with persistent anxiety, emotional heaviness, academic pressure, career crossroads, relationship stress, or grief.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-3 pt-3 text-xs">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground block">Session Duration</span>
                        <span className="text-muted-foreground">50 to 60 Minutes</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground block">Modality</span>
                        <span className="text-muted-foreground">Secure Online Video</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground block">Ethical Mandate</span>
                        <span className="text-muted-foreground">RCI Code of Ethics</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-card border border-[#E5DFD5] rounded-2xl p-5 space-y-4 shadow-xs">
                    <div className="text-xs space-y-1">
                      <span className="font-bold text-foreground block">Initial Consultation</span>
                      <p className="text-muted-foreground">
                        Book a first exploratory session to discuss your concerns and establish therapeutic goals.
                      </p>
                    </div>

                    <Button
                      onClick={() => onSelectProgram("Psychotherapy / Counselling")}
                      className="w-full bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full py-2.5 text-xs font-semibold shadow-xs"
                    >
                      Book a Session
                    </Button>

                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-600/20 text-[11px] text-muted-foreground leading-relaxed">
                      <strong>Crisis Note:</strong> Not an emergency service. In acute distress, call Tele-MANAS (14416) or 112.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
