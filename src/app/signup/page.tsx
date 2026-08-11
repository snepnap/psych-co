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
        router.push("/dashboard");
      }
    } catch {
      toast({ title: "An unexpected error occurred", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen bg-background mesh-bg flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/8 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 h-80 w-80 rounded-full bg-secondary/6 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

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
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-outfit gradient-text">PSYCH Co.</h1>
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
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold font-outfit gradient-text">PSYCH Co.</h1>
            </div>

            <Card glass>
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold font-outfit text-foreground">Create your account</h2>
                  <p className="text-sm text-muted-foreground mt-1">Free forever — no credit card required</p>
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
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isLoading || !email || !password || !name}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                    ) : null}
                    {isLoading ? "Creating account..." : "Create Free Account"}
                    {!isLoading && <ArrowRight className="h-4 w-4" />}
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
