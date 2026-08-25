"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Calendar, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: "type", title: "Session Type" },
  { id: "date", title: "Select Date" },
  { id: "details", title: "Confirmation" },
];

const sessionTypes = [
  { id: "therapy", name: "Individual Therapy", price: "$150", icon: <Brain className="h-6 w-6" /> },
  { id: "couples", name: "Couples Therapy", price: "$200", icon: <HeartHandshake className="h-6 w-6" /> },
  { id: "psychiatry", name: "Psychiatry Evaluation", price: "$300", icon: <CheckCircle2 className="h-6 w-6" /> },
];

function HeartHandshake(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  );
}

export default function SessionsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [sessionType, setSessionType] = useState(sessionTypes[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((p) => p + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((p) => p - 1);
    }
  };

  const handleBooking = async () => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({ title: "Authentication required", description: "Please log in to book a session.", variant: "destructive" });
        window.location.href = "/login";
        return;
      }

      const selectedType = sessionTypes.find(t => t.id === sessionType);
      
      const { error } = await supabase.from("appointments").insert({
        user_id: user.id,
        session_type: selectedType?.name,
        session_date: date,
        session_time: time,
        amount: parseFloat(selectedType?.price.replace('$', '') || "0"),
      });

      if (error) throw error;
      
      toast({ title: "Session Booked!", description: "We'll send you a confirmation email shortly." });
      setCurrentStep(0);
      setDate("");
      setTime("");
    } catch (error: any) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-blob animation-delay-2000" />

      <div className="w-full max-w-2xl z-10 relative">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-outfit mb-4">Book a Session</h1>
          <p className="text-muted-foreground">Take the next step in your mental wellness journey.</p>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0" />
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0" 
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          
          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx;
            const isCurrent = currentStep === idx;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "rgba(255,255,255,0.1)",
                    borderColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "rgba(255,255,255,0.2)",
                  }}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                    isCompleted || isCurrent ? "text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.5)]" : "text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                </motion.div>
                <span className="absolute -bottom-6 text-xs font-medium whitespace-nowrap text-muted-foreground">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="glass-panel p-8 md:p-12 min-h-[400px] flex flex-col">
          <div className="flex-1 relative">
            <AnimatePresence mode="popLayout" custom={direction}>
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold font-outfit mb-6">What type of session do you need?</h2>
                  <div className="grid gap-4">
                    {sessionTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSessionType(type.id)}
                        className={`flex items-center p-4 rounded-xl border transition-all duration-300 text-left ${
                          sessionType === type.id 
                            ? "bg-primary/20 border-primary shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]" 
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className={`p-3 rounded-lg mr-4 ${sessionType === type.id ? "bg-primary/40 text-white" : "bg-white/10 text-muted-foreground"}`}>
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold text-lg ${sessionType === type.id ? "text-white" : "text-foreground"}`}>{type.name}</h3>
                          <p className="text-muted-foreground text-sm">{type.price} / 50 min session</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${sessionType === type.id ? "border-primary" : "border-white/20"}`}>
                          {sessionType === type.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold font-outfit mb-6">When would you like to meet?</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input 
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Time</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                              time === t 
                                ? "bg-primary text-white shadow-lg" 
                                : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold font-outfit mb-2">Review your booking</h2>
                    <p className="text-muted-foreground">Please confirm the details below.</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 mt-6">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <Brain className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Type</span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {sessionTypes.find(t => t.id === sessionType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Date</span>
                      </div>
                      <span className="font-semibold text-foreground">{date || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Time</span>
                      </div>
                      <span className="font-semibold text-foreground">{time || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Total</span>
                      </div>
                      <span className="font-bold text-xl text-primary">
                        {sessionTypes.find(t => t.id === sessionType)?.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0 || isSubmitting}
              className="text-muted-foreground hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep} variant="gradient" className="px-8 rounded-full shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]" disabled={currentStep === 1 && (!date || !time)}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleBooking} disabled={isSubmitting} variant="gradient" className="px-8 rounded-full shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]">
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
