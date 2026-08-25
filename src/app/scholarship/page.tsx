"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";

const programs = [
  { id: "cbt", title: "CBT Practitioner", duration: "12 Weeks", price: "$800", icon: <Brain className="h-6 w-6" /> },
  { id: "mindfulness", title: "Mindfulness Coach", duration: "8 Weeks", price: "$600", icon: <HeartHandshake className="h-6 w-6" /> },
  { id: "trauma", title: "Trauma-Informed Care", duration: "16 Weeks", price: "$1200", icon: <ShieldCheck className="h-6 w-6" /> },
];

function Brain(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>; }
function HeartHandshake(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>; }
function ShieldCheck(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.8 0 4.7.8 7 2a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/></svg>; }

export default function ScholarshipPage() {
  const [activeTab, setActiveTab] = useState("programs");
  
  // Form state
  const [selectedProgram, setSelectedProgram] = useState(programs[0].id);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [incomeRange, setIncomeRange] = useState("< $30,000");
  const [statement, setStatement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({ title: "Authentication required", description: "Please log in to apply.", variant: "destructive" });
        window.location.href = "/login";
        return;
      }

      const programName = programs.find(p => p.id === selectedProgram)?.title || "";

      const { error } = await supabase.from("scholarships").insert({
        user_id: user.id,
        program: programName,
        full_name: fullName,
        phone,
        income_range: incomeRange,
        statement,
      });

      if (error) throw error;
      
      toast({ title: "Application Submitted!", description: "We will review your application and contact you soon." });
      setFullName("");
      setPhone("");
      setStatement("");
    } catch (error: any) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 pt-24 pb-20 px-4 relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl mb-6 shadow-xl">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6">Education & Growth</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advance your career with our certified psychology programs. 
              We believe financial constraints shouldn&apos;t limit your potential.
            </p>
          </motion.div>
        </div>

        {/* Custom Animated Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md relative">
            {["programs", "scholarship"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3 rounded-full text-sm font-medium transition-colors z-10 ${
                  activeTab === tab ? "text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab === "programs" ? "Certificate Programs" : "Apply for Scholarship"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === "programs" ? (
              <motion.div
                key="programs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {programs.map((program, i) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6 flex flex-col h-full group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-bold font-outfit mb-2">{program.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {program.duration}</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">{program.price}</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {["Comprehensive curriculum", "Live expert mentorship", "Verifiable certificate"].map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full border-white/20 bg-white/5 hover:bg-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                      Enroll Now
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="scholarship"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <div className="glass-panel p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-outfit">Financial Aid Application</h2>
                      <p className="text-sm text-muted-foreground">Up to 100% tuition coverage for eligible candidates.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Program of Interest</label>
                        <select 
                          value={selectedProgram}
                          onChange={(e) => setSelectedProgram(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
                        >
                          {programs.map(p => (
                            <option key={p.id} value={p.id} className="bg-zinc-900">{p.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Household Income</label>
                        <select 
                          value={incomeRange}
                          onChange={(e) => setIncomeRange(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
                        >
                          <option className="bg-zinc-900">{"< $30,000"}</option>
                          <option className="bg-zinc-900">$30,000 - $50,000</option>
                          <option className="bg-zinc-900">$50,000 - $80,000</option>
                          <option className="bg-zinc-900">{"> $80,000"}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Alex Johnson"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Personal Statement</label>
                      <textarea 
                        required
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        placeholder="Tell us why this program is important for your career..."
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} variant="gradient" size="lg" className="w-full rounded-full shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]">
                      {isSubmitting ? "Submitting..." : "Submit Application"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
