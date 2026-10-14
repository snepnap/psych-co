"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQItem {
  q: string;
  a: string;
  category: "internships" | "courses" | "therapy" | "general";
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    // Internships
    {
      category: "internships",
      q: "Who can join the internship?",
      a: "Students in Class 11-12, bachelor's and master's students of psychology, and working professionals who want to improve their clinical skills.",
    },
    {
      category: "internships",
      q: "Do I need prior experience?",
      a: "No. Programs are designed for different levels, and we guide you from where you are.",
    },
    {
      category: "internships",
      q: "What is the difference between the 30 and 60 day programs?",
      a: "The 30 day program is a focused introduction to core clinical skills. The 60 day program gives more time for depth, practice and feedback, including more case discussions, role plays and mock sessions.",
    },
    {
      category: "internships",
      q: "Is the internship fully online?",
      a: "Yes. All sessions are held online, so you can join from anywhere with a stable internet connection.",
    },
    {
      category: "internships",
      q: "Will I receive a certificate?",
      a: "Yes. A verifiable certificate of completion detailing your training hours and clinical competencies is awarded upon successful completion.",
    },

    // Courses
    {
      category: "courses",
      q: "Can I take just one course?",
      a: "Yes. Each certification course stands on its own, and you can also combine several to fit your learning goals.",
    },
    {
      category: "courses",
      q: "Which course should I start with?",
      a: "If you are new to clinical work, Case History and MSE is a good starting point. Not sure? Write to us and we will suggest one based on your level and goals.",
    },

    // Therapy
    {
      category: "therapy",
      q: "Who conducts the sessions?",
      a: "All sessions are conducted by an RCI-registered Clinical Psychologist (CRR: A111440).",
    },
    {
      category: "therapy",
      q: "Is what I share confidential?",
      a: "Yes. Your information is kept strictly confidential, within the limits of the law and professional ethics.",
    },
    {
      category: "therapy",
      q: "Are sessions online?",
      a: "Yes. Sessions are conducted online via encrypted video or audio, allowing you to speak comfortably from your own space.",
    },
    {
      category: "therapy",
      q: "Is therapy suitable for school students?",
      a: "Students can access counselling. For those under 18, parent or guardian consent is required prior to commencing sessions.",
    },
    {
      category: "therapy",
      q: "Is this an emergency service?",
      a: "No. In an acute crisis or emergency, please call 112 or Tele-MANAS at 14416, or go directly to the nearest hospital.",
    },

    // General
    {
      category: "general",
      q: "How do I enrol or book?",
      a: "Fill in the form on the Contact page or message us on WhatsApp or email. We will reply within 24 hours.",
    },
    {
      category: "general",
      q: "What are the payment options?",
      a: "We support UPI, bank transfers, and major debit/credit cards with secure digital invoicing.",
    },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesQuery =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="relative w-full text-foreground selection:bg-[#114B43]/15 selection:text-[#114B43]">
      {/* ── Page Masthead ───────────────────────────────────── */}
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-24 bg-[#FAF8F5] dark:bg-[#0B1917] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-b border-[#114B43]/15 dark:border-emerald-900/40 pb-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground tracking-wider uppercase">The Psych Co.</span>
              <span className="text-muted-foreground/40">/</span>
              <span>Information & Guidance · FAQ</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#114B43] dark:text-emerald-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#114B43] dark:bg-emerald-400" />
              <span>RCI Registration: CRR A111440</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight leading-[1.12]">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-open-sans">
              Everything you need to know about our internships, certification courses, psychotherapy sessions, and policies.
            </p>

            {/* Search Input */}
            <div className="pt-4 max-w-md relative">
              <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search a question or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#114B43] shadow-xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main FAQ Accordion ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Questions" },
              { id: "internships", label: "Internships" },
              { id: "courses", label: "Courses" },
              { id: "therapy", label: "Therapy" },
              { id: "general", label: "General" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#114B43] text-white"
                    : "bg-[#FAF8F5] dark:bg-[#122522] text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="divide-y divide-[#E5DFD5] border-y border-[#E5DFD5]">
            {filteredFaqs.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">
                No matching questions found. Try another search term or write to us directly.
              </div>
            ) : (
              filteredFaqs.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-left flex items-center justify-between gap-4 font-outfit font-semibold text-base text-foreground hover:text-[#114B43] dark:hover:text-emerald-300 py-1 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <p className="pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-open-sans">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Still Have Questions Box */}
          <div className="p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-outfit font-bold text-foreground text-base">
                Still have a question?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We are happy to advise you on program fit, academic levels, or psychotherapy consultations.
              </p>
            </div>
            <Button
              asChild
              className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-6 py-2.5 text-xs font-semibold shadow-xs shrink-0"
            >
              <Link href="/#contact" className="flex items-center gap-1.5">
                Contact Our Team
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
