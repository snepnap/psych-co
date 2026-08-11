"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Calendar, TrendingUp, Smile, Frown, Meh } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MOOD_LABELS, MOOD_COLORS } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const moodHistory = [
  { date: "Aug 5", mood: 6.5, energy: 5.8, stress: 4.2 },
  { date: "Aug 6", mood: 7.2, energy: 6.5, stress: 3.5 },
  { date: "Aug 7", mood: 5.8, energy: 5.0, stress: 6.1 },
  { date: "Aug 8", mood: 8.1, energy: 7.5, stress: 2.8 },
  { date: "Aug 9", mood: 7.4, energy: 6.8, stress: 3.3 },
  { date: "Aug 10", mood: 6.9, energy: 6.2, stress: 4.7 },
  { date: "Aug 11", mood: 8.3, energy: 7.9, stress: 2.1 },
];

const radarData = [
  { metric: "Mood", value: 75 },
  { metric: "Energy", value: 68 },
  { metric: "Focus", value: 82 },
  { metric: "Sleep", value: 60 },
  { metric: "Social", value: 71 },
  { metric: "Calm", value: 79 },
];

const emotionTags = [
  "😊 Happy", "😌 Calm", "😔 Sad", "😰 Anxious",
  "😤 Frustrated", "🥰 Grateful", "😴 Tired", "🎯 Focused",
  "💪 Motivated", "😕 Confused", "🌟 Excited", "😤 Stressed",
];

export default function MoodPage() {
  const [mood, setMood] = useState([7]);
  const [energy, setEnergy] = useState([6]);
  const [stress, setStress] = useState([4]);
  const [note, setNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLogging, setIsLogging] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const moodValue = mood[0];
  const moodColor = MOOD_COLORS[Math.round(moodValue)] || "#6366f1";
  const moodLabel = MOOD_LABELS[Math.round(moodValue)] || "Neutral";

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleLogMood = async () => {
    setIsLogging(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLogging(false);
    setShowForm(false);
    setNote("");
    setSelectedTags([]);
    toast({
      title: "Mood logged! 🎉",
      description: `You're feeling ${moodLabel.toLowerCase()} today. Keep checking in!`,
      variant: "default",
    });
  };

  const getMoodIcon = (value: number) => {
    if (value <= 3) return <Frown className="h-8 w-8" />;
    if (value <= 6) return <Meh className="h-8 w-8" />;
    return <Smile className="h-8 w-8" />;
  };

  return (
    <PageWrapper title="Mood Logger" subtitle="Track your emotional wellbeing daily">
      <div className="space-y-6 max-w-6xl">
        {/* Today's check-in card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card glass className="overflow-hidden">
            <div
              className="absolute inset-0 opacity-5 transition-all duration-1000"
              style={{ backgroundColor: moodColor }}
            />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Today&apos;s Check-In</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(new Date(), "EEEE, MMMM do")}
                  </p>
                </div>
                <Button
                  id="mood-new-checkin"
                  variant="gradient"
                  size="sm"
                  onClick={() => setShowForm(!showForm)}
                >
                  <Plus className="h-4 w-4" />
                  {showForm ? "Cancel" : "Log Now"}
                </Button>
              </div>
            </CardHeader>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="space-y-6 pt-0">
                    {/* Mood score display */}
                    <div className="flex items-center justify-center gap-4 py-4">
                      <motion.div
                        key={moodValue}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center gap-2"
                        style={{ color: moodColor }}
                      >
                        {getMoodIcon(moodValue)}
                        <div className="text-center">
                          <span className="text-5xl font-bold font-outfit" style={{ color: moodColor }}>
                            {moodValue}
                          </span>
                          <span className="text-sm text-muted-foreground ml-1">/10</span>
                          <p className="text-base font-medium mt-1" style={{ color: moodColor }}>
                            {moodLabel}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Mood slider */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mood-slider" className="text-sm font-semibold">
                          Overall Mood
                        </Label>
                        <span className="text-sm font-bold" style={{ color: moodColor }}>
                          {moodValue}/10
                        </span>
                      </div>
                      <Slider
                        id="mood-slider"
                        min={1}
                        max={10}
                        step={1}
                        value={mood}
                        onValueChange={setMood}
                        aria-label="Mood rating from 1 (distressed) to 10 (euphoric)"
                        className="py-2"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Distressed</span>
                        <span>Neutral</span>
                        <span>Euphoric</span>
                      </div>
                    </div>

                    {/* Energy slider */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="energy-slider" className="text-sm font-semibold">
                          Energy Level
                        </Label>
                        <span className="text-sm font-bold text-secondary">{energy[0]}/10</span>
                      </div>
                      <Slider
                        id="energy-slider"
                        min={1}
                        max={10}
                        step={1}
                        value={energy}
                        onValueChange={setEnergy}
                        aria-label="Energy level from 1 to 10"
                        className="py-2"
                      />
                    </div>

                    {/* Stress slider */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="stress-slider" className="text-sm font-semibold">
                          Stress Level
                        </Label>
                        <span className="text-sm font-bold text-rose-400">{stress[0]}/10</span>
                      </div>
                      <Slider
                        id="stress-slider"
                        min={1}
                        max={10}
                        step={1}
                        value={stress}
                        onValueChange={setStress}
                        aria-label="Stress level from 1 to 10"
                        className="py-2"
                      />
                    </div>

                    {/* Emotion tags */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">How are you feeling? (select all that apply)</Label>
                      <div className="flex flex-wrap gap-2">
                        {emotionTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 min-h-[36px] border ${
                              selectedTags.includes(tag)
                                ? "bg-primary/15 border-primary/40 text-primary"
                                : "bg-muted/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                            aria-pressed={selectedTags.includes(tag)}
                            aria-label={`Toggle ${tag} emotion tag`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Note */}
                    <div className="space-y-2">
                      <Label htmlFor="mood-note" className="text-sm font-semibold">
                        Additional notes (optional)
                      </Label>
                      <Textarea
                        id="mood-note"
                        placeholder="What's on your mind today? Any specific events affecting your mood?"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[80px]"
                        aria-label="Notes about your current mood"
                      />
                    </div>

                    <Button
                      id="mood-submit-log"
                      variant="gradient"
                      className="w-full"
                      size="lg"
                      onClick={handleLogMood}
                      disabled={isLogging}
                    >
                      {isLogging ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4" />
                          Save Today&apos;s Check-In
                        </>
                      )}
                    </Button>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>

            {!showForm && (
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Last check-in: 7.3 / Calm</p>
                    <p className="text-xs text-muted-foreground">Today, 9:00 AM</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-emerald-400 text-xs font-medium">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +0.8 this week
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* History chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card glass>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">7-Day History</CardTitle>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary inline-block" />Mood</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary inline-block" />Energy</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-400 inline-block" />Stress</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={moodHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="moodG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(243, 75%, 59%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(243, 75%, 59%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="energyG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(152, 45%, 43%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(152, 45%, 43%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="mood" stroke="hsl(243,75%,59%)" strokeWidth={2} fill="url(#moodG)" />
                    <Area type="monotone" dataKey="energy" stroke="hsl(152,45%,43%)" strokeWidth={2} fill="url(#energyG)" />
                    <Area type="monotone" dataKey="stress" stroke="hsl(0,84%,60%)" strokeWidth={2} fill="none" strokeDasharray="4 2" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card glass>
              <CardHeader>
                <CardTitle className="text-base">Wellness Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <Radar
                      name="Wellness"
                      dataKey="value"
                      stroke="hsl(243, 75%, 59%)"
                      fill="hsl(243, 75%, 59%)"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* History timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card glass>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Mood Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodHistory.slice().reverse().map((entry, idx) => {
                  const color = MOOD_COLORS[Math.round(entry.mood)] || "#6366f1";
                  return (
                    <div key={entry.date} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors duration-150">
                      <div className="h-10 w-10 rounded-full border-2 flex items-center justify-center shrink-0 text-sm font-bold"
                        style={{ borderColor: color, color }}>
                        {entry.mood}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{entry.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {MOOD_LABELS[Math.round(entry.mood)]} · Energy {entry.energy} · Stress {entry.stress}
                        </p>
                      </div>
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${entry.mood * 10}%`, backgroundColor: color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
