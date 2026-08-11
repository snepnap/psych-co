"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Calendar, Shield,
  Bell, Palette, Lock, Edit, Save, Camera,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const profileStats = [
  { label: "Days Active", value: "47", icon: Calendar, color: "text-primary" },
  { label: "Check-ins", value: "89", icon: Bell, color: "text-secondary" },
  { label: "Journals", value: "23", icon: Edit, color: "text-violet-400" },
  { label: "Assessments", value: "5", icon: Shield, color: "text-emerald-400" },
];

const wellnessGoals = [
  { label: "Daily Mood Logging", progress: 85, color: "text-primary" },
  { label: "Weekly Assessment", progress: 60, color: "text-secondary" },
  { label: "Journal Entries (12/month)", progress: 75, color: "text-violet-400" },
  { label: "Therapy Sessions", progress: 50, color: "text-emerald-400" },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    bio: "Focused on mental wellness, mindfulness, and building healthier daily habits.",
    dob: "1990-06-15",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSaving(false);
    setIsEditing(false);
    toast({ title: "Profile updated!", description: "Your changes have been saved." });
  };

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <PageWrapper title="Profile" subtitle="Manage your wellness account">
      <div className="max-w-5xl space-y-6">
        {/* Profile header card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card glass className="overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-primary/30 via-secondary/20 to-violet-500/20 relative">
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle at 20% 50%, hsl(243,75%,59%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(152,45%,43%) 0%, transparent 50%)"
                }} />
            </div>
            <CardContent className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-6">
                <div className="relative w-fit">
                  <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
                    <AvatarImage src="" alt={`${form.name} profile photo`} />
                    <AvatarFallback className="text-2xl font-bold">AJ</AvatarFallback>
                  </Avatar>
                  <button
                    className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors duration-150"
                    aria-label="Change profile photo"
                  >
                    <Camera className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <h2 className="text-xl font-bold font-outfit text-foreground">{form.name}</h2>
                      <p className="text-sm text-muted-foreground">{form.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                          Premium Member
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                          47 Day Streak 🔥
                        </span>
                      </div>
                    </div>
                    <Button
                      id="profile-edit-toggle"
                      variant={isEditing ? "glass" : "gradient"}
                      size="sm"
                      onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                    >
                      <Edit className="h-3.5 w-3.5" />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {profileStats.map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-muted/30">
                    <stat.icon className={`h-5 w-5 mx-auto mb-1.5 ${stat.color}`} aria-hidden="true" />
                    <p className="text-2xl font-bold font-outfit text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card glass>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Full Name", field: "name", icon: User, type: "text", id: "profile-name" },
                  { label: "Email Address", field: "email", icon: Mail, type: "email", id: "profile-email" },
                  { label: "Phone Number", field: "phone", icon: Phone, type: "tel", id: "profile-phone" },
                  { label: "Location", field: "location", icon: MapPin, type: "text", id: "profile-location" },
                  { label: "Date of Birth", field: "dob", icon: Calendar, type: "date", id: "profile-dob" },
                ].map(({ label, field, icon: Icon, type, id }) => (
                  <div key={field} className="space-y-1.5">
                    <Label htmlFor={id} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {label}
                    </Label>
                    {isEditing ? (
                      <Input
                        id={id}
                        type={type}
                        value={form[field as keyof typeof form]}
                        onChange={(e) => updateField(field, e.target.value)}
                        aria-label={label}
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
                        <Icon className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                        <span className="text-sm text-foreground">{form[field as keyof typeof form]}</span>
                      </div>
                    )}
                  </div>
                ))}

                <div className="space-y-1.5">
                  <Label htmlFor="profile-bio" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bio</Label>
                  {isEditing ? (
                    <textarea
                      id="profile-bio"
                      value={form.bio}
                      onChange={(e) => updateField("bio", e.target.value)}
                      className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                      aria-label="Profile bio"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground px-3 py-2 rounded-lg bg-muted/30 leading-relaxed">{form.bio}</p>
                  )}
                </div>

                {isEditing && (
                  <Button id="profile-save" variant="gradient" className="w-full" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Wellness goals + settings */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card glass>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    <CardTitle className="text-base">Wellness Goals</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wellnessGoals.map((goal) => (
                    <div key={goal.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground text-xs">{goal.label}</span>
                        <span className={`text-xs font-semibold ${goal.color}`}>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-1.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card glass>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-violet-400" />
                    <CardTitle className="text-base">Preferences</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Email Notifications", id: "pref-email-notif", default: true },
                    { label: "Daily Mood Reminders", id: "pref-mood-reminder", default: true },
                    { label: "Weekly Progress Report", id: "pref-weekly-report", default: false },
                    { label: "Therapist Recommendations", id: "pref-therapist-recs", default: true },
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors duration-150">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <Label htmlFor={pref.id} className="text-sm font-medium cursor-pointer">
                          {pref.label}
                        </Label>
                      </div>
                      <input
                        type="checkbox"
                        id={pref.id}
                        defaultChecked={pref.default}
                        className="h-4 w-4 accent-primary rounded cursor-pointer"
                        aria-label={pref.label}
                      />
                    </div>
                  ))}

                  <div className="pt-2 border-t border-border/50">
                    <Button
                      id="profile-change-password"
                      variant="glass"
                      size="sm"
                      className="w-full text-muted-foreground"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
