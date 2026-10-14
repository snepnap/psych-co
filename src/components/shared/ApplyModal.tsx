"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  validateEmail,
  validatePhone,
  validateFullName,
  validateMessage,
  sanitizeText,
} from "@/lib/validation";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
  defaultCourse?: string;
}

export function ApplyModal({
  isOpen,
  onClose,
  defaultProgram = "Online Internship (30 days)",
  defaultCourse = "",
}: ApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Bachelor's student",
    program: defaultProgram,
    course: defaultCourse || "Case History and MSE",
    message: "",
    consent: true,
  });

  // Anti-bot honeypot field
  const [honeypot, setHoneypot] = useState("");

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot verification (silently block bot scrapers)
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    // 2. Strict input validation
    const errors: Record<string, string> = {};

    const nameCheck = validateFullName(formData.fullName);
    if (!nameCheck.isValid && nameCheck.error) {
      errors.fullName = nameCheck.error;
    }

    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.isValid && emailCheck.error) {
      errors.email = emailCheck.error;
    }

    const phoneCheck = validatePhone(formData.phone);
    if (!phoneCheck.isValid && phoneCheck.error) {
      errors.phone = phoneCheck.error;
    }

    const messageCheck = validateMessage(formData.message);
    if (!messageCheck.isValid && messageCheck.error) {
      errors.message = messageCheck.error;
    }

    if (!formData.consent) {
      errors.consent = "Please agree to the contact consent before submitting.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmitting(true);

    // Simulate reactive sanitized payload submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormErrors({});
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      role: "Bachelor's student",
      program: defaultProgram,
      course: defaultCourse || "Case History and MSE",
      message: "",
      consent: true,
    });
    onClose();
  };

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
            className="fixed inset-0 bg-[#0B1917]/70 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative w-full max-w-xl bg-card border border-[#E5DFD5] rounded-2xl shadow-xl p-6 sm:p-8 z-10 my-8 overflow-hidden"
          >
            {/* Top Pine Brand Border */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[#114B43]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-[#FAF8F5] transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="h-12 w-12 mx-auto rounded-full bg-[#E8F3F1] text-[#114B43] flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-foreground">
                  Application Received
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed font-open-sans">
                  Thank you, <span className="font-semibold text-foreground">{sanitizeText(formData.fullName)}</span>. We have received your application for{" "}
                  <span className="font-semibold text-[#114B43]">{formData.program}</span>. Our admissions desk reviews each applicant and responds within 24 hours.
                </p>
                <div className="pt-2 flex justify-center">
                  <Button
                    onClick={handleReset}
                    className="bg-[#114B43] text-white hover:bg-[#0c3933] rounded-full px-8 py-2.5 text-xs font-semibold shadow-xs"
                  >
                    Close Window
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="text-[#C2613B] font-bold uppercase tracking-wider">The Psych Co.</span>
                    <span>/</span>
                    <span>Admissions</span>
                  </div>
                  <h2 className="text-2xl font-outfit font-bold text-foreground tracking-tight">
                    Apply for a Program
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Supervised by an RCI-registered Clinical Psychologist (CRR: A111440).
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs sm:text-sm">
                  {/* Invisible Honeypot Field */}
                  <input
                    type="text"
                    name="bot_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1 font-mono">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priyanshu Sharma"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          formErrors.fullName
                            ? "border-red-500 bg-red-50/20 text-red-900"
                            : "border-border bg-[#FAF8F5] dark:bg-muted text-foreground focus:ring-1 focus:ring-[#114B43]"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 inline" /> {formErrors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1 font-mono">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="priyanshu@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          formErrors.email
                            ? "border-red-500 bg-red-50/20 text-red-900"
                            : "border-border bg-[#FAF8F5] dark:bg-muted text-foreground focus:ring-1 focus:ring-[#114B43]"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 inline" /> {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1 font-mono">
                        Phone or WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          formErrors.phone
                            ? "border-red-500 bg-red-50/20 text-red-900"
                            : "border-border bg-[#FAF8F5] dark:bg-muted text-foreground focus:ring-1 focus:ring-[#114B43]"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 inline" /> {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1 font-mono">
                        Academic Level *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-[#FAF8F5] dark:bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                      >
                        <option value="Class 11-12 student">Class 11-12 student</option>
                        <option value="Bachelor's student">Bachelor's student</option>
                        <option value="Master's student">Master's student</option>
                        <option value="Working professional">Working professional</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1 font-mono">
                        Program Choice *
                      </label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-[#FAF8F5] dark:bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                      >
                        <option value="Online Internship (30 days)">Online Internship (30 days)</option>
                        <option value="Online Internship (60 days)">Online Internship (60 days)</option>
                        <option value="Certification Course">Certification Course</option>
                        <option value="Psychotherapy / Counselling">Psychotherapy / Counselling</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>

                    {formData.program === "Certification Course" && (
                      <div>
                        <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1 font-mono">
                          Select Course *
                        </label>
                        <select
                          value={formData.course}
                          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-[#FAF8F5] dark:bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                        >
                          <option value="Case History and MSE">Case History and MSE</option>
                          <option value="Draw-A-Person Test (DAPT)">Draw-A-Person Test (DAPT)</option>
                          <option value="Supportive Counselling Techniques">Supportive Counselling Techniques</option>
                          <option value="Emergency Support and Resourcefulness Skills">Emergency Support & Resourcefulness</option>
                          <option value="Cognitive Behavioral Therapy (CBT)">Cognitive Behavioral Therapy (CBT)</option>
                          <option value="Rorschach Test">Rorschach Test</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1 font-mono">
                      Message / Questions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      maxLength={1000}
                      placeholder="Share your academic background or specific learning goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-[#FAF8F5] dark:bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43] resize-none"
                    />
                  </div>

                  <div className="pt-1">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="apply-consent"
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData({ ...formData, consent: e.target.checked });
                          if (formErrors.consent) setFormErrors({ ...formErrors, consent: "" });
                        }}
                        className="mt-1 h-3.5 w-3.5 rounded border-border text-[#114B43] focus:ring-[#114B43]"
                      />
                      <label htmlFor="apply-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-open-sans">
                        I agree to be contacted regarding my application. Information is held confidentially within clinical ethics.
                      </label>
                    </div>
                    {formErrors.consent && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 inline" /> {formErrors.consent}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4 border-t border-border/70">
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Mon–Fri Cohorts · RCI Supervised
                    </span>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#114B43] hover:bg-[#0c3933] text-white font-medium rounded-full px-6 py-2.5 text-xs shadow-xs flex items-center gap-2"
                    >
                      {submitting ? "Validating..." : "Submit Application"}
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
