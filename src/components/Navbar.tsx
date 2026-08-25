"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Menu, X, User } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/supabase";

const links = [
  { name: "Home", href: "/" },
  { name: "Internships", href: "/app/internships" },
  { name: "Certificates", href: "/app/certificates" },
  { name: "Bookings", href: "/app/bookings" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // Fetch profile when session changes
  useEffect(() => {
    if (session?.user?.id) {
      const fetchProfile = async () => {
        try {
          const profileData = await getProfile();
          setProfile(profileData);
          setProfileLoading(false);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          setProfileLoading(false);
        }
      };
      fetchProfile();
    } else {
      setProfile(null);
      setProfileLoading(false);
    }
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // Determine which links to show based on authentication and role
  const getNavLinks = () => {
    const baseLinks = [
      { name: "Home", href: "/" },
      { name: "Internships", href: "/app/internships" },
      { name: "Certificates", href: "/app/certificates" },
      { name: "Bookings", href: "/app/bookings" },
    ];

    if (!profileLoading && profile) {
      // Add profile link for authenticated users
      baseLinks.push({ name: "Profile", href: "/app/profile" });
      // Add admin link if user is admin
      if (profile.role === "admin") {
        baseLinks.push({ name: "Admin", href: "/app/admin" });
      }
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-border shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-transform group-hover:scale-105">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-foreground">PSYCH Co.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4 border-l border-border pl-8">
              {session ? (
                <>
                  <Link href="/app/profile" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Account
                  </Link>
                  <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Log In
                  </Link>
                  <Button asChild className="rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 h-20 border-b border-border">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <span className="font-outfit font-bold text-xl text-foreground">PSYCH Co.</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-outfit font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-sm mt-8 flex flex-col gap-4"
              >
                {session ? (
                  <>
                    <Button asChild size="lg" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/app/profile">Account Profile</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full rounded-full border-border" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" size="lg" className="w-full rounded-full border-border">
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild size="lg" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/sign-up">Sign Up Free</Link>
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}