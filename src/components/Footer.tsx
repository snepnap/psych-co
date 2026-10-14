"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, Mail, Phone, AlertCircle, ShieldCheck } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/mood") ||
    pathname.startsWith("/assessment") ||
    pathname.startsWith("/journal") ||
    pathname.startsWith("/therapists") ||
    pathname.startsWith("/bookings") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/profile");

  if (isAppRoute) {
    return null;
  }

  return (
    <footer className="bg-[#FAF8F5] dark:bg-[#081412] border-t border-border/80 text-foreground">
      {/* Top Helpline Alert Strip */}
      <div className="bg-[#114B43]/5 dark:bg-[#114B43]/20 border-b border-border/60 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-center sm:text-left">
          <div className="flex items-center gap-2 text-foreground/90">
            <AlertCircle className="h-4 w-4 text-[#C2613B] shrink-0" />
            <span>
              <strong>Crisis Disclaimer:</strong> Our sessions are not an emergency service. In a crisis, please call{" "}
              <a href="tel:112" className="font-bold underline text-[#114B43] dark:text-emerald-400">
                112
              </a>{" "}
              or the Tele-MANAS helpline at{" "}
              <a href="tel:14416" className="font-bold underline text-[#114B43] dark:text-emerald-400">
                14416
              </a>
              .
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 dark:bg-emerald-950/80 text-[#0E443C] dark:text-emerald-300 shrink-0">
            <ShieldCheck className="h-3.5 w-3.5" />
            RCI Registration: CRR A111440
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#114B43] text-white flex items-center justify-center shadow-sm">
                <HeartPulse className="h-5 w-5 text-emerald-300" />
              </div>
              <span className="font-outfit font-bold text-2xl text-foreground tracking-tight">
                The Psych Co<span className="text-[#C2613B]">.</span>
              </span>
            </Link>
            <p className="text-sm font-semibold text-[#114B43] dark:text-emerald-400">
              Practical psychology training and care.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              The Psych Co. offers online psychology internships, certification courses and psychotherapy with an RCI-registered Clinical Psychologist.
            </p>

            <div className="pt-2 text-xs text-muted-foreground space-y-1">
              <p>Clinical Lead: <span className="font-semibold text-foreground">Rishabh Jain</span> (RCI-registered Clinical Psychologist)</p>
              <p>Rehabilitation Council of India Registration: <span className="font-semibold text-foreground">CRR: A111440</span></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-bold text-sm text-foreground uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#home" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#internships" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Certification Courses
                </Link>
              </li>
              <li>
                <Link href="/#therapy" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Therapy & Counselling
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Offerings */}
          <div>
            <h4 className="font-outfit font-bold text-sm text-foreground uppercase tracking-wider mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#internships" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  30-Day Clinical Internship
                </Link>
              </li>
              <li>
                <Link href="/#internships" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  60-Day Clinical Internship
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  CBT Certification
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Rorschach Inkblot Test
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Draw-A-Person Test (DAPT)
                </Link>
              </li>
              <li>
                <Link href="/#therapy" className="text-muted-foreground hover:text-[#114B43] dark:hover:text-emerald-300 transition-colors">
                  Confidential Psychotherapy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-outfit font-bold text-sm text-foreground uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 mt-0.5" />
                <a href="mailto:connect@psychco.in" className="hover:text-foreground transition-colors">
                  connect@psychco.in
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 mt-0.5" />
                <a href="tel:+917587030286" className="hover:text-foreground transition-colors">
                  +91 7587030286
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <svg className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 mt-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.4 10.74v-8.37H5.06v8.37h2.8z"/>
                </svg>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  The Psych Co. on LinkedIn
                </a>
              </div>
              <div className="pt-2 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Working Hours:</p>
                <p>9:00 AM – 7:00 PM, Mon – Sat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 pt-8 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 The Psych Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}