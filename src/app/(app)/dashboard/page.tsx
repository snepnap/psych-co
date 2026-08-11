"use client";

import { motion, type Variants } from "framer-motion";
import {
  Heart,
  Brain,
  TrendingUp,
  Calendar,
  Sparkles,
  ArrowRight,
  Activity,
  BookOpen,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageWrapper } from "@/components/layout/page-wrapper";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moodData = [
  { day: "Mon", mood: 6.2, energy: 5.8 },
  { day: "Tue", mood: 7.1, energy: 6.5 },
  { day: "Wed", mood: 5.4, energy: 4.9 },
  { day: "Thu", mood: 8.0, energy: 7.2 },
  { day: "Fri", mood: 7.5, energy: 6.8 },
  { day: "Sat", mood: 9.0, energy: 8.5 },
  { day: "Sun", mood: 8.2, energy: 7.9 },
];

const recentActivities = [
  { icon: Heart, label: "Mood Check-In", time: "Today, 9:00 AM", color: "text-rose-400" },
  { icon: BookOpen, label: "Journal Entry", time: "Today, 8:30 AM", color: "text-violet-400" },
  { icon: Brain, label: "Assessment Completed", time: "Yesterday, 5:00 PM", color: "text-indigo-400" },
  { icon: Users, label: "Therapist Session", time: "Mon, 3:00 PM", color: "text-emerald-400" },
];

const statsCards = [
  {
    label: "Weekly Mood Avg",
    value: "7.3",
    unit: "/ 10",
    icon: Heart,
    trend: "+0.8",
    color: "from-rose-500/20 to-pink-500/10",
    iconColor: "text-rose-400",
    progress: 73,
  },
  {
    label: "Streak Days",
    value: "12",
    unit: "days",
    icon: Activity,
    trend: "+3",
    color: "from-indigo-500/20 to-violet-500/10",
    iconColor: "text-indigo-400",
    progress: 80,
  },
  {
    label: "Assessments Done",
    value: "5",
    unit: "total",
    icon: Brain,
    trend: "+1",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    progress: 50,
  },
  {
    label: "Next Session",
    value: "2",
    unit: "days",
    icon: Calendar,
    trend: "Fri 3PM",
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    progress: 60,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function DashboardPage() {
  return (
    <PageWrapper title="Dashboard" subtitle="Your mental wellness at a glance">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Welcome banner */}
        <motion.div variants={item}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/15 border border-primary/20 p-6">
            <div className="absolute top-0 right-0 -translate-y-4 translate-x-4">
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 blur-2xl" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-primary">Good evening</p>
              </div>
              <h2 className="text-2xl font-bold font-outfit text-foreground mb-1">
                How are you feeling today?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Your consistency streak is at 12 days. Keep it up — you're building great habits!
              </p>
              <div className="flex gap-3">
                <Button asChild variant="gradient" size="sm" id="dashboard-log-mood">
                  <Link href="/mood">
                    <Heart className="h-4 w-4" />
                    Log Mood
                  </Link>
                </Button>
                <Button asChild variant="glass" size="sm" id="dashboard-start-journal">
                  <Link href="/journal">
                    <BookOpen className="h-4 w-4" />
                    Start Journal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {statsCards.map((stat) => (
            <Card
              key={stat.label}
              glass
              className="hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <CardContent className="p-5">
                <div className={`inline-flex rounded-xl p-2.5 bg-gradient-to-br ${stat.color} mb-3`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} aria-hidden="true" />
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-bold font-outfit text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground mb-0.5">{stat.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{stat.label}</p>
                <Progress value={stat.progress} className="h-1.5 mb-2" />
                <p className="text-xs text-primary font-medium">
                  {stat.trend.startsWith("+") ? "↑ " : ""}{stat.trend} this week
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Charts + Activity row */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood chart */}
          <Card glass className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Weekly Mood Trends</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                    Mood
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-secondary inline-block" />
                    Energy
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={moodData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(243, 75%, 59%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(243, 75%, 59%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 45%, 43%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(152, 45%, 43%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(243, 75%, 59%)"
                    strokeWidth={2}
                    fill="url(#moodGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="energy"
                    stroke="hsl(152, 45%, 43%)"
                    strokeWidth={2}
                    fill="url(#energyGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card glass>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-primary h-7">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.label}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent/50 transition-colors duration-150"
                >
                  <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <activity.icon className={`h-4.5 w-4.5 ${activity.color}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}

              <Button asChild variant="glass" size="sm" className="w-full mt-2" id="dashboard-view-all-activity">
                <Link href="/mood">
                  View full history
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick actions row */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/assessment" id="dashboard-quick-assessment">
            <Card glass className="hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Brain className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Take Assessment</p>
                  <p className="text-xs text-muted-foreground">15 min · Clinical grade</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform duration-200" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/therapists" id="dashboard-quick-therapists">
            <Card glass className="hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Find Therapist</p>
                  <p className="text-xs text-muted-foreground">Book a session</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform duration-200" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/journal" id="dashboard-quick-journal">
            <Card glass className="hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">View Progress</p>
                  <p className="text-xs text-muted-foreground">Your wellness journey</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform duration-200" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
