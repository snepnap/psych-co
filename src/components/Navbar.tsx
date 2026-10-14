"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ShieldCheck, HeartPulse, Compass } from "lucide-react";
import { Button } from "./ui/button";
import { ApplyModal } from "./shared/ApplyModal";

const navLinks = [
  { name: "Home", href: "/#home", sectionId: "home" },
  { name: "About", href: "/#about", sectionId: "about" },
  { name: "Internships", href: "/#internships", sectionId: "internships" },
  { name: "Courses", href: "/#courses", sectionId: "courses" },
  { name: "Therapy", href: "/#therapy", sectionId: "therapy" },
  { name: "Why Us", href: "/#why-us", sectionId: "why-us" },
  { name: "FAQ", href: "/#faq", sectionId: "faq" },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  // Hide the marketing navbar only when specifically browsing authenticated portal inner tools
  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/mood") ||
    pathname.startsWith("/assessment") ||
    pathname.startsWith("/journal") ||
    pathname.startsWith("/therapists") ||
    pathname.startsWith("/bookings") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/profile");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      if (pathname === "/") {
        const sections = navLinks.map((l) => l.sectionId);
        const scrollPosition = window.scrollY + 120;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (isAppRoute) {
    return null;
  }

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF8F5]/92 dark:bg-[#0B1917]/92 backdrop-blur-md shadow-xs border-b border-border/80 py-3"
            : "bg-[#FAF8F5] dark:bg-[#0B1917] border-b border-border/40 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/#home" onClick={() => handleNavClick("home")} className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-2xl bg-[#114B43] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              <HeartPulse className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-xl sm:text-2xl text-foreground tracking-tight leading-none">
                The Psych Co<span className="text-[#C2613B]">.</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase flex items-center gap-1 mt-0.5">
                <ShieldCheck className="h-2.5 w-2.5 text-emerald-600 inline" />
                RCI-Registered Clinical Practice
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === "/" && activeSection === link.sectionId;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.sectionId)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "text-[#114B43] dark:text-emerald-300 font-semibold bg-[#E8F3F1] dark:bg-[#133D36]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#pathfinder"
              onClick={() => handleNavClick("pathfinder")}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#114B43] dark:text-emerald-300 hover:text-[#C2613B] px-3.5 py-1.5 rounded-full border border-[#114B43]/20 hover:border-[#C2613B]/40 transition-colors"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Path Finder</span>
            </Link>

            <Button
              onClick={() => setApplyModalOpen(true)}
              className="hidden sm:inline-flex bg-[#C2613B] hover:bg-[#a94f2d] text-white font-medium rounded-full px-5 py-2 text-sm shadow-xs transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply Now
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-foreground hover:bg-muted transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="w-full max-w-sm bg-card h-full p-6 flex flex-col justify-between shadow-2xl border-l border-border"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-border/60">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-[#114B43] text-white flex items-center justify-center">
                      <HeartPulse className="h-4 w-4 text-emerald-300" />
                    </div>
                    <span className="font-outfit font-bold text-lg text-foreground">
                      The Psych Co.
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full text-muted-foreground hover:bg-muted"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === "/" && activeSection === link.sectionId;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => handleNavClick(link.sectionId)}
                        className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? "bg-[#E8F3F1] dark:bg-[#133D36] text-[#114B43] dark:text-emerald-300 font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-border/60 space-y-3">
                <Link
                  href="/#pathfinder"
                  onClick={() => handleNavClick("pathfinder")}
                  className="w-full py-2.5 rounded-full border border-[#114B43]/30 bg-[#FAF8F5] dark:bg-[#122522] text-[#114B43] dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#114B43]/10 transition-colors"
                >
                  <Compass className="h-4 w-4" />
                  <span>Interactive Path Finder</span>
                </Link>

                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setApplyModalOpen(true);
                  }}
                  className="w-full bg-[#C2613B] hover:bg-[#a94f2d] text-white font-medium rounded-full py-2.5 shadow-md flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <div className="text-center text-[11px] text-muted-foreground">
                  CRR: A111440 · RCI Registered Clinical Psychologist
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Apply Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </>
  );
}