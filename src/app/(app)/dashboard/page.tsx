"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Heart,
  Brain,
  Video,
  Clock,
  ArrowRight,
  Activity,
  BookOpen,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Wind,
  Smile,
  Compass,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/page-wrapper";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 7-day neuro-emotional valence & somatic energy data
const valenceData = [
  { day: "Mon", balance: 6.8, focus: 6.2, tooltip: "Mon: Baseline Stability • 6.8" },
  { day: "Tue", balance: 7.4, focus: 7.1, tooltip: "Tue: Grounded State • 7.4" },
  { day: "Wed", balance: 6.1, focus: 5.9, tooltip: "Wed: Mid-week Fatigue • 6.1" },
  { day: "Thu", balance: 8.0, focus: 7.5, tooltip: "Thu: Resilience Rebound • 8.0" },
  { day: "Fri", balance: 9.2, focus: 8.8, tooltip: "Fri: Peak Clarity • 9.2" },
  { day: "Sat", balance: 8.7, focus: 8.4, tooltip: "Sat: Restful Flow • 8.7" },
  { day: "Sun", balance: 8.4, focus: 8.1, tooltip: "Sun: Equilibrium • 8.4" },
];

const reflections = [
  {
    title: "Cognitive Reframing of Workplace Pressure",
    category: "CBT Exercise",
    categoryColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    time: "Today, 8:45 AM",
    snippet: "Identified catastrophic forecasting thought patterns and replaced with probabilistic reality checks.",
  },
  {
    title: "Gratitude & Somatic Awareness Journal",
    category: "Mindfulness",
    categoryColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    time: "Yesterday, 9:20 PM",
    snippet: "Noted deep tension release in upper shoulders following 10-minute vagal breathwork pacing.",
  },
  {
    title: "Triggers & De-escalation Protocol",
    category: "Anxiety Plan",
    categoryColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    time: "2 days ago",
    snippet: "Reviewed behavioral grounding cues with Dr. Mitchell during regular bi-weekly review.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("week");
  const [breathingActive, setBreathingActive] = useState(false);

  return (
    <PageWrapper title="Clinical Suite" subtitle="HIPAA Encrypted Patient Sanctum">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6 max-w-7xl mx-auto"
      >
        {/* ============================================================== */}
        {/* 1. HERO BANNER: MINDFULNESS GREETING & STREAK HUD            */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Welcome & Grounding Greeting (8 cols) */}
          <div className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-[#121826]/90 p-6 md:p-8 border border-white/10 shadow-2xl backdrop-blur-2xl">
            <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -right-16 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>HIPAA Encrypted Patient Sanctum</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2 font-outfit">
                  Good morning, Julian.{" "}
                  <span className="italic font-normal text-emerald-400 font-serif">You are in a safe space.</span>
                </h1>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Biometric vagal indicators show balanced equilibrium. Your next clinical evaluation session with Dr. Mitchell is scheduled for today.
                </p>
              </div>

              {/* Grounding Quote Plaque */}
              <div className="pt-4 border-t border-white/10 flex items-start gap-3.5">
                <div className="w-1 h-11 rounded-full bg-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm md:text-base italic text-slate-200 font-serif">
                    “The curious paradox is that when I accept myself just as I am, then I can change.”
                  </p>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-1 font-sans font-medium">
                    — Carl Rogers, On Becoming a Person
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Gamified Consistency Streak Badge (4 cols) */}
          <div className="lg:col-span-4 relative overflow-hidden rounded-3xl bg-slate-900/80 p-6 border border-white/10 shadow-2xl flex flex-col justify-between backdrop-blur-2xl">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Therapeutic Rhythm
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                Optimal
              </span>
            </div>

            {/* Central Progress Ring */}
            <div className="my-3 flex items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-slate-800"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                  />
                  <circle
                    className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="currentColor"
                    strokeDasharray="251.2"
                    strokeDashoffset="35"
                    strokeLinecap="round"
                    strokeWidth="6.5"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-white tracking-tight font-outfit">14</span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Days Active</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 rounded-2xl p-3 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🔥</span>
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">Mindfulness Streak</p>
                  <p className="text-[11px] text-emerald-400">Unbroken consistency</p>
                </div>
              </div>
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 2. BENTO GRID: MOOD CHART + UPCOMING SESSION                   */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Neuro-Emotional Valence Chart (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-white/10 p-6 shadow-xl backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Neuro-Emotional Valence
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    8.4 / 10 • High Resilience
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Longitudinal somatic equilibrium and focus tracking
                </p>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-white/10 self-start">
                <button
                  onClick={() => setTimeRange("week")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    timeRange === "week"
                      ? "bg-slate-800 text-emerald-400 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setTimeRange("month")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    timeRange === "month"
                      ? "bg-slate-800 text-emerald-400 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimeRange("quarter")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    timeRange === "quarter"
                      ? "bg-slate-800 text-emerald-400 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Quarter
                </button>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-56 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={valenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d121d",
                      borderColor: "rgba(52,211,153,0.3)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="focus"
                    name="Cognitive Focus"
                    stroke="#818cf8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#focusGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    name="Somatic Balance"
                    stroke="#34d399"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#balanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Somatic Indicators Footer */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Restful Sleep</p>
                <p className="text-sm font-semibold text-white mt-0.5">8.2 hrs</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-medium">HRV Coherence</p>
                <p className="text-sm font-semibold text-emerald-400 mt-0.5">78 ms (High)</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Equilibrium</p>
                <p className="text-sm font-semibold text-indigo-400 mt-0.5">92% Stable</p>
              </div>
            </div>
          </div>

          {/* Upcoming Therapy Session Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/30 p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Upcoming Tele-Session
                  </span>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  In 45 mins
                </span>
              </div>

              {/* Therapist Profile Row */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&auto=format&fit=crop&q=80"
                  alt="Dr. Sarah Mitchell"
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-lg"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white truncate">Dr. Sarah Mitchell, Psy.D</h4>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-300">Licensed Clinical Psychologist</p>
                  <p className="text-[11px] text-emerald-400/90 mt-0.5">Topic: Cognitive Reappraisal</p>
                </div>
              </div>

              {/* Pre-Session Checklist */}
              <div className="space-y-1.5 mb-5 text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Session Readiness
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Morning mood check-in recorded</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>CBT journal prompt tagged for discussion</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                href="/therapists"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Video className="h-4 w-4" />
                <span>Join Video Session</span>
              </Link>
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs h-9"
                >
                  <Link href="/bookings">View Details</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs h-9"
                >
                  <Link href="/journal">Prep Notes</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 3. QUICK SOMATIC ACTIONS DOCK                                   */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Immediate Somatic & Cognitive Grounding
            </h3>
            <span className="text-xs text-emerald-400">Clinical Grade Tools</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Action 1: Log Mood */}
            <Link
              href="/mood"
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-200 group flex items-start gap-3.5 shadow-lg"
            >
              <div className="h-10 w-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Heart className="h-5 w-5 text-rose-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Log Mood Check-In
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Track emotional valence & somatic sensations.
                </p>
              </div>
            </Link>

            {/* Action 2: Box Breathing */}
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-200 group flex items-start gap-3.5 shadow-lg text-left"
            >
              <div className="h-10 w-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Wind className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  5-Min Box Breathing
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {breathingActive ? "Pacing: Inhale 4s • Hold 4s" : "Reset vagal tone & parasympathetic drive."}
                </p>
              </div>
            </button>

            {/* Action 3: Take Clinical Assessment */}
            <Link
              href="/assessment"
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-200 group flex items-start gap-3.5 shadow-lg"
            >
              <div className="h-10 w-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Brain className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Clinical Assessment
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  PHQ-9 & GAD-7 standardized evaluations.
                </p>
              </div>
            </Link>

            {/* Action 4: Reflect in Journal */}
            <Link
              href="/journal"
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-200 group flex items-start gap-3.5 shadow-lg"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <BookOpen className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  Reflect in Journal
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Structured prompts for thought cognitive reframing.
                </p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 4. RECENT CLINICAL REFLECTIONS & ACCREDITATIONS                  */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Reflections List (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-900/80 border border-white/10 p-6 shadow-xl backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-white">Recent Clinical Reflections</h3>
                <p className="text-xs text-slate-400">Private insights analyzed with your clinical care team</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-xs text-emerald-400 hover:text-emerald-300">
                <Link href="/journal">
                  <span>View All Journal</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {reflections.map((ref) => (
                <div
                  key={ref.title}
                  className="p-3.5 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${ref.categoryColor}`}>
                      {ref.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{ref.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{ref.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{ref.snippet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Programs & Verifiable Credential Card (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950/90 border border-indigo-500/25 p-6 shadow-xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
                <Compass className="h-3 w-3" />
                <span>Internships & Accreditations</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Psychology Fellowship</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Join accredited supervised internship hours, participate in clinical seminars, and earn verifiable on-chain certificates.
              </p>

              <div className="bg-slate-950/60 p-3 rounded-2xl border border-white/5 space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Clinical Hours Completed</span>
                  <span className="font-bold text-emerald-400">120 / 200 hrs</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full rounded-full w-[60%]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                asChild
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold h-9 rounded-xl shadow-md"
              >
                <Link href="/internships">Explore Internships</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent border-white/10 text-slate-300 hover:text-white text-xs h-9 rounded-xl"
              >
                <Link href="/certificates">View Issued Certificates</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
