"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/shared/ApplyModal";

export default function TherapyPage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const concerns = [
    { title: "Stress & Anxiety", desc: "Constant worry, panic sensations, feeling overwhelmed or unable to rest." },
    { title: "Low Mood & Exhaustion", desc: "Loss of motivation, persistent heaviness, or emotional burnout." },
    { title: "Academic & Career Pressure", desc: "Exam anxiety, placement stress, imposter feelings, or career crossroads." },
    { title: "Interpersonal & Family Strain", desc: "Communication barriers, boundary setting, relationship ruptures, and loneliness." },
    { title: "Emotional Regulation", desc: "Difficulty managing anger, mood swings, or emotional reactivity." },
    { title: "Grief, Loss & Major Shifts", desc: "Navigating bereavement, relocations, breakups, or life transitions." },
    { title: "Self-Worth & Imposter Doubt", desc: "Chronic harsh inner criticism, perfectionism, and deep-seated self-doubt." },
    { title: "A Safe Room to Unpack", desc: "Simply needing an objective, confidential, and compassionate listener." },
  ];

  const whatToExpect = [
    {
      step: "01",
      title: "Book a session",
      desc: "Choose a time that suits you and share basic details in our secure intake form.",
    },
    {
      step: "02",
      title: "First session",
      desc: "A relaxed conversation to understand your concerns, background and personal goals.",
    },
    {
      step: "03",
      title: "Your plan",
      desc: "Together you agree how to work and how often to meet in a collaborative pace.",
    },
    {
      step: "04",
      title: "Ongoing support",
      desc: "Regular sessions with practical tools and coping strategies you can use in daily life.",
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
              <span>Clinical Psychotherapy & Counselling Suite</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#114B43] dark:text-emerald-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#114B43] dark:bg-emerald-400" />
              <span>RCI Registration: CRR A111440</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight leading-[1.12]">
              Psychotherapy and Counselling
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-open-sans">
              A safe, confidential space to talk, with an RCI-registered Clinical Psychologist.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setApplyModalOpen(true)}
                className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-7 py-3 text-sm shadow-xs font-medium"
              >
                Book a Session
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-7 py-3 text-sm border-border hover:bg-card"
              >
                <Link href="/#contact">Have a Question?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview Section ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
            Therapeutic Environment
          </span>
          <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-foreground">
            A calm, non-judgmental space
          </h2>
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-open-sans">
            Everyone needs support at some point. Our sessions offer a calm, non-judgmental space where you can talk through what you are going through and learn practical ways to cope.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-open-sans">
            Sessions are conducted by a qualified, RCI-registered Clinical Psychologist (CRR: A111440) and are held online with complete professional discretion.
          </p>
        </div>
      </section>

      {/* ── When You May Find Therapy Helpful ─────────────── */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              Areas of Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              You may find therapy helpful if you are experiencing
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Supportive psychological interventions tailored to your unique circumstances and challenges.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {concerns.map((concern, i) => (
              <div
                key={i}
                className="bg-card p-5 rounded-2xl border border-[#E5DFD5] space-y-1.5 shadow-xs"
              >
                <span className="font-semibold text-foreground text-sm block">
                  {concern.title}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed font-open-sans">
                  {concern.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to Expect (4 Steps) ───────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Consultation Cadence
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              What to expect
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToExpect.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-2.5"
              >
                <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-outfit font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clinical Standards & Logistics ──────────────────── */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              Clinical Commitments
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              Our commitment to you
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-[#E5DFD5] space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">Standard 01</span>
              <h3 className="text-lg font-outfit font-bold text-foreground">
                Confidential
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Your information is kept strictly private, within the limits of the law and professional ethics.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-[#E5DFD5] space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">Standard 02</span>
              <h3 className="text-lg font-outfit font-bold text-foreground">
                Qualified
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Sessions are led directly by an RCI-registered Clinical Psychologist (CRR: A111440).
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-[#E5DFD5] space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">Standard 03</span>
              <h3 className="text-lg font-outfit font-bold text-foreground">
                Respectful
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                No judgment, no pressure. You set the pace of what you feel comfortable sharing.
              </p>
            </div>
          </div>

          {/* Session Details Box & Students Under 18 */}
          <div className="p-8 rounded-2xl bg-card border border-[#E5DFD5] space-y-5">
            <h4 className="font-outfit font-bold text-lg text-foreground">
              Session details & logistics
            </h4>
            <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm text-muted-foreground font-mono">
              <div>
                <span className="text-foreground font-semibold block">Duration</span>
                <span>50–60 minutes per session</span>
              </div>
              <div>
                <span className="text-foreground font-semibold block">Mode</span>
                <span>Secure online video or audio</span>
              </div>
              <div>
                <span className="text-foreground font-semibold block">Languages</span>
                <span>English & Hindi</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground font-semibold">For students under 18:</strong> Parent or guardian consent is required prior to initiating psychotherapy sessions to ensure ethical and safe care.
            </div>
          </div>
        </div>
      </section>

      {/* ── Mandatory Emergency Disclaimer Section ──────────── */}
      <section className="py-14 sm:py-16 bg-[#FDF2EC] dark:bg-[#20130d] border-b border-[#C2613B]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="p-3 rounded-2xl bg-[#C2613B]/10 text-[#C2613B] shrink-0">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-outfit font-bold text-lg text-[#8C3A19] dark:text-amber-400">
                Please note: Crisis and Emergency Protocol
              </h4>
              <p className="text-xs sm:text-sm text-[#702F15] dark:text-amber-200/90 leading-relaxed font-open-sans">
                Our sessions are <strong>not an emergency service</strong>. If you or someone you know is in immediate danger or experiencing an acute crisis, please call{" "}
                <a href="tel:112" className="font-bold underline">
                  112
                </a>{" "}
                or the Tele-MANAS helpline at{" "}
                <a href="tel:14416" className="font-bold underline">
                  14416
                </a>
                , or visit the nearest hospital emergency department immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apply / Booking Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultProgram="Psychotherapy / Counselling"
      />
    </div>
  );
}
