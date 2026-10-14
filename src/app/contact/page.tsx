"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Check,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateMessage,
  sanitizeText,
} from "@/lib/validation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Bachelor's student",
    interest: "Online Internship (30 days)",
    course: "Case History and MSE",
    message: "",
    consent: true,
  });

  // Anti-bot honeypot field
  const [honeypot, setHoneypot] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot verification (silently block bot crawlers)
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
      interest: "Online Internship (30 days)",
      course: "Case History and MSE",
      message: "",
      consent: true,
    });
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
              <span>Admissions & Intake Desk</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#114B43] dark:text-emerald-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#114B43] dark:bg-emerald-400" />
              <span>RCI Registration: CRR A111440</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight leading-[1.12]">
              Let&apos;s Talk
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-open-sans">
              Questions about a program, a course or a session? Write to us and we will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ──────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] rounded-2xl p-8 sm:p-10 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-[#114B43]" />

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-12 w-12 mx-auto rounded-full bg-[#E8F3F1] text-[#114B43] flex items-center justify-center">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-outfit font-bold text-foreground">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-foreground">{sanitizeText(formData.fullName)}</span>. We have received your details for{" "}
                    <span className="font-semibold text-[#114B43]">{formData.interest}</span>. Our desk will reply within <strong>24 hours</strong>.
                  </p>
                  <Button
                    onClick={handleReset}
                    className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-6 py-2 text-xs font-semibold shadow-xs"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="mb-6 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2613B] block">
                      Direct Intake Form
                    </span>
                    <h2 className="text-2xl font-outfit font-bold text-foreground">
                      Send an enquiry
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      All communications are strictly confidential within clinical ethical guidelines.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs sm:text-sm">
                    {/* Invisible Honeypot Field */}
                    <input
                      type="text"
                      name="contact_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          formErrors.fullName
                            ? "border-red-500 bg-red-50/20 text-red-900"
                            : "border-border bg-card text-foreground focus:ring-1 focus:ring-[#114B43]"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="h-3 w-3 inline" /> {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email and Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                            formErrors.email
                              ? "border-red-500 bg-red-50/20 text-red-900"
                              : "border-border bg-card text-foreground focus:ring-1 focus:ring-[#114B43]"
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle className="h-3 w-3 inline" /> {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                          Phone or WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 75870 30286"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                            formErrors.phone
                              ? "border-red-500 bg-red-50/20 text-red-900"
                              : "border-border bg-card text-foreground focus:ring-1 focus:ring-[#114B43]"
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle className="h-3 w-3 inline" /> {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* I am a Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                        I am a *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                      >
                        <option value="Class 11-12 student">Class 11-12 student</option>
                        <option value="Bachelor's student">Bachelor's student</option>
                        <option value="Master's student">Master's student</option>
                        <option value="Working professional">Working professional</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* I am interested in Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                        I am interested in *
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                      >
                        <option value="Online Internship (30 days)">Online Internship (30 days)</option>
                        <option value="Online Internship (60 days)">Online Internship (60 days)</option>
                        <option value="Certification Course">Certification Course</option>
                        <option value="Psychotherapy / Counselling">Psychotherapy / Counselling</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>

                    {/* Conditional: If course, which one */}
                    {formData.interest === "Certification Course" && (
                      <div>
                        <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                          If course, which one
                        </label>
                        <select
                          value={formData.course}
                          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                        >
                          <option value="Case History and MSE">Case History and MSE</option>
                          <option value="DAPT">DAPT (Draw-A-Person Test)</option>
                          <option value="Supportive Counselling Techniques">Supportive Counselling Techniques</option>
                          <option value="Emergency Support and Resourcefulness Skills">Emergency Support and Resourcefulness Skills</option>
                          <option value="CBT">CBT (Cognitive Behavioral Therapy)</option>
                          <option value="Rorschach Test">Rorschach Test</option>
                        </select>
                      </div>
                    )}

                    {/* Message (Optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                        Message (optional)
                      </label>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        placeholder="Tell us what you'd like to learn or any questions you have..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) setFormErrors({ ...formErrors, message: "" });
                        }}
                        className={`w-full px-3.5 py-2 rounded-xl border bg-card text-foreground text-sm focus:outline-none resize-none ${
                          formErrors.message
                            ? "border-red-500 bg-red-50/20 text-red-900"
                            : "border-border focus:ring-1 focus:ring-[#114B43]"
                        }`}
                      />
                      {formErrors.message && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="h-3 w-3 inline" /> {formErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="pt-1">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="consent-checkbox"
                          checked={formData.consent}
                          onChange={(e) => {
                            setFormData({ ...formData, consent: e.target.checked });
                            if (formErrors.consent) setFormErrors({ ...formErrors, consent: "" });
                          }}
                          className="mt-1 h-3.5 w-3.5 rounded border-border text-[#114B43] focus:ring-[#114B43]"
                        />
                        <label htmlFor="consent-checkbox" className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-open-sans">
                          I agree to be contacted about my enquiry. Information is held confidentially within clinical ethics.
                        </label>
                      </div>
                      {formErrors.consent && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="h-3 w-3 inline" /> {formErrors.consent}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full py-3 text-xs font-semibold shadow-xs flex items-center justify-center gap-2"
                      >
                        {submitting ? "Validating..." : "Send Enquiry"}
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Direct Contact Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2613B] block">
                  Office Communications
                </span>
                <h3 className="font-outfit font-bold text-lg text-foreground">
                  Contact details
                </h3>
                <p className="text-xs text-muted-foreground">
                  We welcome queries from aspiring students, trainees, and individuals looking for psychological care.
                </p>

                <div className="space-y-3.5 text-xs sm:text-sm pt-2">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0" />
                    <a href="mailto:connect@psychco.in" className="hover:underline text-foreground">
                      connect@psychco.in
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0" />
                    <a href="tel:+917587030286" className="hover:underline text-foreground">
                      +91 7587030286 (Phone / WhatsApp)
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.4 10.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline text-foreground">
                      The Psych Co. on LinkedIn
                    </a>
                  </div>

                  <div className="pt-2 border-t border-border/70 text-xs text-muted-foreground font-mono">
                    <span className="font-semibold text-foreground block">Working hours:</span>
                    <span>9:00 AM – 7:00 PM IST · Monday to Saturday</span>
                  </div>
                </div>
              </div>

              {/* RCI Registry Plate */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#114B43] dark:text-emerald-400" />
                  Clinical Registration Verification
                </span>
                <p className="leading-relaxed">
                  Led by Rishabh Jain, Clinical Psychologist registered with the Rehabilitation Council of India (CRR: A111440).
                </p>
              </div>

              {/* Emergency Hotline Notice */}
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-600/20 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider font-mono">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Emergency & Crisis Notice</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  If you or someone you know is in acute distress or experiencing an immediate psychiatric emergency, please contact <strong>Tele-MANAS (14416)</strong> or <strong>National Emergency (112)</strong>. This intake portal is monitored during standard working hours and does not provide immediate crisis intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
