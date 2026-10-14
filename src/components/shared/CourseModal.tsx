"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, GraduationCap, ShieldCheck, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CourseDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  idealFor: string;
  modules: string[];
  duration?: string;
  format?: string;
}

interface CourseModalProps {
  course: CourseDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onEnrol: (courseTitle: string) => void;
}

export function CourseModal({ course, isOpen, onClose, onEnrol }: CourseModalProps) {
  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl bg-card border border-border/80 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header Accent Bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#114B43] via-[#C2613B] to-[#114B43]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto pr-1 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-2">
                  <GraduationCap className="h-3.5 w-3.5 text-emerald-700" />
                  Certification Course · Clinical Skills
                </div>
                <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-foreground">
                  {course.title}
                </h2>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                  {course.shortDesc}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 py-3 border-y border-border/60">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-[#114B43]" />
                  <span>Led by RCI-registered Clinical Psychologist</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-4 w-4 text-[#C2613B]" />
                  <span>Flexible online schedule & interactive practice</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-2">
                  Course Overview
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {course.fullDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/50 border border-border/60">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Target Audience & Prerequisites
                </h4>
                <p className="text-sm text-muted-foreground font-medium">
                  {course.idealFor}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#114B43]" />
                  What You Will Learn & Practice
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {course.modules.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                      <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60">
                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  Certificate of completion provided upon successful training and evaluation.
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 sm:flex-none rounded-full"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      onClose();
                      onEnrol(course.title);
                    }}
                    className="flex-1 sm:flex-none bg-[#114B43] hover:bg-[#0d3b34] text-white rounded-full px-6 shadow-md"
                  >
                    Enrol Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
