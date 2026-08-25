"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const benefits = [
  "Unlimited mood tracking & analytics",
  "Clinical-grade psychological assessments",
  "Private encrypted journal",
  "Connect with licensed therapists",
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else {
        toast({
          title: "Account created! 🎉",
          description: "Please check your email to verify your account.",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast({ title: "An unexpected error occurred", description: error.message || "Unknown error", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  const passwordStrength = password.length === 0 ? 0 :
    password.length < 6 ? 25 :
    password.length < 8 ? 50 :
    /[A-Z]/.test(password) && /[0-9]/.test(password) ? 100 : 75;

  const strengthLabel = passwordStrength === 0 ? "" :
    passwordStrength <= 25 ? "Weak" :
    passwordStrength <= 50 ? "Fair" :
    passwordStrength <= 75 ? "Good" : "Strong";

  const strengthColor = passwordStrength <= 25 ? "bg-red-500" :
    passwordStrength <= 50 ? "bg-amber-500" :
    passwordStrength <= 75 ? "bg-blue-500" : "bg-emerald-500";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Left: Benefits */}
          <div className="hidden md:block">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-outfit text-primary">PSYCH Co.</h1>
                <p className="text-xs text-muted-foreground">Mental Wellness Platform</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold font-outfit text-foreground mb-4 leading-tight">
              Start your wellness journey today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Join thousands of people who use PSYCH Co. to understand their mental health, 
              track their mood, and connect with professionals.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary shrink-0" aria-hidden="true" />
                  <p className="text-sm text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:hidden">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold font-outfit text-primary">PSYCH Co.</h1>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold font-outfit text-foreground">Create your account</h2>
                  <p className="text-sm text-muted-foreground mt-1">Free forever — no credit card required</p>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center gap-2 border-border text-foreground hover:bg-muted/50"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Continue with Google
                  </Button>
                  
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground uppercase tracking-wider">or sign up with email</span>
                    <div className="flex-grow border-t border-border"></div>
                  </div>
                </div>

                <form id="signup-form" onSubmit={handleSignup} className="space-y-4" noValidate>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Alex Johnson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                      aria-label="Full name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      aria-label="Email address"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        aria-label="Password"
                        aria-describedby="password-strength"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {password && (
                      <div id="password-strength" aria-live="polite">
                        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Password strength: <span className="font-medium text-foreground">{strengthLabel}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    id="signup-submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isLoading || !email || !password || !name}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                      />
                    ) : null}
                    {isLoading ? "Creating account..." : "Create Free Account"}
                    {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline underline-offset-4">
                    Sign in
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
