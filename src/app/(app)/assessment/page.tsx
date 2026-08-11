"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle, ArrowRight, ArrowLeft, BarChart3, AlertCircle, Info } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const questions = [
  {
    id: 1,
    category: "Mood & Affect",
    question: "Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 2,
    category: "Mood & Affect",
    question: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 3,
    category: "Sleep & Energy",
    question: "How often have you had trouble falling or staying asleep, or slept too much?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 4,
    category: "Sleep & Energy",
    question: "How often have you felt tired or had little energy?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 5,
    category: "Anxiety",
    question: "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 6,
    category: "Anxiety",
    question: "How often have you not been able to stop or control worrying?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 7,
    category: "Concentration",
    question: "How often have you had trouble concentrating on things such as reading or watching TV?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 8,
    category: "Self & Social",
    question: "How often have you felt bad about yourself — or that you are a failure?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 9,
    category: "Self & Social",
    question: "How often have you been bothered by moving or speaking so slowly, or being unusually restless?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
  },
];

function getInterpretation(score: number) {
  if (score <= 4) return { label: "Minimal", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", description: "Your responses suggest minimal symptoms. Continue your healthy habits!" };
  if (score <= 9) return { label: "Mild", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", description: "You show some mild symptoms. Consider self-care strategies and monitoring." };
  if (score <= 14) return { label: "Moderate", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", description: "Moderate symptoms detected. We recommend speaking with a mental health professional." };
  if (score <= 19) return { label: "Moderately Severe", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", description: "Moderately severe symptoms. Please consult with a therapist or physician soon." };
  return { label: "Severe", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20", description: "Severe symptoms detected. Please reach out to a mental health professional immediately." };
}

const categoryColors: Record<string, string> = {
  "Mood & Affect": "from-violet-500/20 to-indigo-500/10",
  "Sleep & Energy": "from-blue-500/20 to-cyan-500/10",
  "Anxiety": "from-amber-500/20 to-orange-500/10",
  "Concentration": "from-emerald-500/20 to-teal-500/10",
  "Self & Social": "from-rose-500/20 to-pink-500/10",
};

export default function AssessmentPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);

  const progress = (currentQ / questions.length) * 100;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const interpretation = getInterpretation(totalScore);

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [questions[currentQ].id]: score };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 300);
    } else {
      setTimeout(() => {
        setCompleted(true);
        toast({ title: "Assessment complete!", description: "Your results are ready.", variant: "default" });
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQ(0);
    setCompleted(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <PageWrapper title="Assessment" subtitle="Clinical-grade psychological screening">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card glass className="overflow-hidden">
              <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/5 p-8">
                <div className="flex justify-center mb-6">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl glow-primary animate-float">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold font-outfit text-center text-foreground mb-2">
                  PHQ-9 Wellbeing Assessment
                </h2>
                <p className="text-center text-muted-foreground mb-6 max-w-md mx-auto">
                  This clinically validated questionnaire helps screen for symptoms of depression and anxiety.
                  Results are private and confidential.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "9 Questions", icon: BarChart3, color: "text-primary" },
                    { label: "~5 Minutes", icon: Info, color: "text-secondary" },
                    { label: "Clinical Grade", icon: CheckCircle, color: "text-emerald-400" },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-3 rounded-xl bg-muted/30">
                      <item.icon className={`h-5 w-5 mx-auto mb-1 ${item.color}`} />
                      <p className="text-xs font-medium text-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6 flex gap-3">
                  <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs text-amber-400/90">
                    This assessment is for informational purposes only and is not a substitute for professional
                    medical advice, diagnosis, or treatment.
                  </p>
                </div>

                <Button
                  id="assessment-start"
                  variant="gradient"
                  size="xl"
                  className="w-full"
                  onClick={() => setStarted(true)}
                >
                  Begin Assessment
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  if (completed) {
    const categoryScores = questions.reduce<Record<string, number>>((acc, q) => {
      const cat = q.category;
      acc[cat] = (acc[cat] || 0) + (answers[q.id] || 0);
      return acc;
    }, {});

    return (
      <PageWrapper title="Assessment Results" subtitle="Your wellbeing profile">
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            {/* Score card */}
            <Card glass className={`border ${interpretation.bg} mb-6`}>
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <CheckCircle className={`h-12 w-12 mx-auto mb-3 ${interpretation.color}`} />
                  <div className="text-5xl font-bold font-outfit text-foreground mb-1">{totalScore}</div>
                  <div className="text-sm text-muted-foreground">/ 27 total score</div>
                </div>
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border mb-4 ${interpretation.bg} ${interpretation.color}`}>
                  {interpretation.label} Symptoms
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{interpretation.description}</p>
              </CardContent>
            </Card>

            {/* Category breakdown */}
            <Card glass>
              <CardHeader>
                <CardTitle className="text-base">Score Breakdown by Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(categoryScores).map(([cat, score]) => {
                  const maxScore = questions.filter((q) => q.category === cat).length * 3;
                  const pct = (score / maxScore) * 100;
                  return (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{cat}</span>
                        <span className="text-muted-foreground">{score}/{maxScore}</span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card glass>
              <CardHeader>
                <CardTitle className="text-base">Recommended Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {totalScore > 4 && (
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-sm text-foreground">
                    <p className="font-medium mb-1">💬 Talk to a Specialist</p>
                    <p className="text-muted-foreground text-xs">Consider scheduling a session with one of our licensed therapists.</p>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20 text-sm text-foreground">
                  <p className="font-medium mb-1">📓 Daily Journaling</p>
                  <p className="text-muted-foreground text-xs">Writing about your thoughts can help process emotions and track patterns.</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground">
                  <p className="font-medium mb-1">🔄 Reassess in 2 Weeks</p>
                  <p className="text-muted-foreground text-xs">Track your progress by retaking the assessment after implementing changes.</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button id="assessment-restart" variant="glass" className="flex-1" onClick={handleRestart}>
                Retake Assessment
              </Button>
              <Button id="assessment-find-therapist" variant="gradient" className="flex-1">
                Find a Therapist
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  const q = questions[currentQ];
  const bgGrad = categoryColors[q.category] || "from-primary/10 to-secondary/5";

  return (
    <PageWrapper title="Assessment" subtitle="PHQ-9 Wellbeing Screening">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Question {currentQ + 1} of {questions.length}</span>
            <span className="text-primary font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-all duration-300",
                  i < currentQ ? "bg-primary" : i === currentQ ? "bg-primary/60" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Card glass className="overflow-hidden">
              <div className={`bg-gradient-to-br ${bgGrad} p-6 pb-4`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2 py-0.5 rounded-full bg-muted/50">
                    {q.category}
                  </span>
                </div>
                <p className="text-lg font-semibold font-outfit text-foreground leading-snug">
                  {q.question}
                </p>
              </div>
              <CardContent className="pt-4 space-y-3">
                {q.options.map((option, i) => {
                  const isSelected = answers[q.id] === q.scores[i];
                  return (
                    <button
                      key={option}
                      id={`assessment-option-${currentQ}-${i}`}
                      onClick={() => handleAnswer(q.scores[i])}
                      className={cn(
                        "w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150 border min-h-[44px] flex items-center gap-3",
                        isSelected
                          ? "bg-primary/15 border-primary/40 text-primary"
                          : "bg-muted/40 border-border/50 text-foreground hover:bg-primary/8 hover:border-primary/25 hover:text-primary"
                      )}
                      aria-pressed={isSelected}
                    >
                      <div className={cn(
                        "h-4 w-4 rounded-full border-2 shrink-0 transition-all duration-150",
                        isSelected ? "bg-primary border-primary" : "border-muted-foreground/50"
                      )} />
                      {option}
                    </button>
                  );
                })}

                <div className="flex items-center justify-between pt-2">
                  <Button
                    id="assessment-back"
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    disabled={currentQ === 0}
                    aria-label="Previous question"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <p className="text-xs text-muted-foreground">Click an option to continue</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
