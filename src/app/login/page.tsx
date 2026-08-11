"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast({ title: "An unexpected error occurred", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@psych.co");
    setPassword("demo123456");
    toast({ title: "Demo credentials filled!", description: "Click Sign In to continue." });
  };

  return (
    <div className="min-h-screen bg-background mesh-bg flex items-center justify-center p-4">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/8 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-secondary/6 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 h-48 w-48 rounded-full bg-violet-500/5 blur-2xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl glow-primary mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-outfit gradient-text">PSYCH Co.</h1>
            <p className="text-sm text-muted-foreground mt-1">Your mental wellness companion</p>
          </div>

          <Card glass>
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold font-outfit text-foreground">Welcome back</h2>
                <p className="text-sm text-muted-foreground mt-1">Sign in to continue your wellness journey</p>
              </div>

              <form id="login-form" onSubmit={handleLogin} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="login-email">Email address</Label>
                  <Input
                    id="login-email"
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline underline-offset-4">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      aria-label="Password"
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
                </div>

                <Button
                  type="submit"
                  id="login-submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : null}
                  {isLoading ? "Signing in..." : "Sign In"}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                id="login-demo"
                variant="glass"
                size="lg"
                className="w-full"
                onClick={handleDemoLogin}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                Try Demo Account
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary font-medium hover:underline underline-offset-4">
                  Sign up free
                </Link>
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            By signing in, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline underline-offset-4">Terms</Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline underline-offset-4">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
