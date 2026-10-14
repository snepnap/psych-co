"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Star,
  Calendar,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  Video,
  MessageSquare,
  Globe,
  Sparkles,
  ShieldCheck,
  X,
  CreditCard,
  Check,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  sessionRate: number;
  availability: string;
  location: string;
  languages: string[];
  isVerified: boolean;
  nextAvailable: string;
  bio: string;
  avatarUrl: string;
  focusArea: string;
}

const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell, Psy.D",
    title: "Licensed Clinical Psychologist",
    specialties: ["CBT", "Anxiety", "Depression", "Trauma"],
    rating: 4.9,
    reviewCount: 128,
    sessionRate: 150,
    availability: "Available Today",
    location: "New York, NY (Tele-Health)",
    languages: ["English", "Spanish"],
    isVerified: true,
    nextAvailable: "Today, 2:30 PM",
    bio: "Specializing in evidence-based treatments for anxiety and mood disorders, with 10+ years helping high-agency individuals restore nervous system equilibrium.",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
    focusArea: "Anxiety & Stress",
  },
  {
    id: "2",
    name: "Dr. Aris Thorne, Ph.D",
    title: "Clinical Neuropsychologist",
    specialties: ["Cognitive Neuroscience", "Executive Dysfunction", "ADHD", "Sleep"],
    rating: 4.95,
    reviewCount: 184,
    sessionRate: 180,
    availability: "Available Tomorrow",
    location: "Boston, MA (Tele-Health)",
    languages: ["English"],
    isVerified: true,
    nextAvailable: "Tomorrow, 11:00 AM",
    bio: "Integrating clinical neuropsychology and biofeedback protocols to treat burnout, cognitive fog, and executive dysfunction.",
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
    focusArea: "CBT",
  },
  {
    id: "3",
    name: "Dr. Elena Rostova, LMFT",
    title: "Licensed Marriage & Trauma Specialist",
    specialties: ["EMDR", "Trauma & PTSD", "Couples Therapy", "Attachment"],
    rating: 4.88,
    reviewCount: 96,
    sessionRate: 165,
    availability: "Available This Week",
    location: "San Francisco, CA (Tele-Health)",
    languages: ["English", "Russian"],
    isVerified: true,
    nextAvailable: "Thursday, 4:00 PM",
    bio: "Certified EMDR trauma therapist focusing on nervous system de-escalation, relational rupture repair, and somatic grounding.",
    avatarUrl: "https://images.unsplash.com/photo-1594824813583-4a6f81e3a1d9?w=300&auto=format&fit=crop&q=80",
    focusArea: "Trauma & PTSD",
  },
  {
    id: "4",
    name: "Dr. Marcus Vance, LCSW",
    title: "Senior Somatic & Behavioral Specialist",
    specialties: ["Mindfulness", "Somatic Experiencing", "Stress", "Men's Mental Health"],
    rating: 4.85,
    reviewCount: 112,
    sessionRate: 140,
    availability: "Available Today",
    location: "Austin, TX (Tele-Health)",
    languages: ["English"],
    isVerified: true,
    nextAvailable: "Today, 5:00 PM",
    bio: "Blends polyvagal body-oriented awareness with cognitive restructuring to dismantle chronic stress loops and somatic tension.",
    avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80",
    focusArea: "Mindfulness",
  },
];

const specialtiesList = [
  "All",
  "Anxiety & Stress",
  "CBT",
  "Trauma & PTSD",
  "Mindfulness",
  "Couples Therapy",
];

const timeSlots = [
  "09:00 AM - 09:50 AM",
  "11:00 AM - 11:50 AM",
  "02:30 PM - 03:20 PM",
  "04:00 PM - 04:50 PM",
  "05:30 PM - 06:20 PM",
];

export default function TherapistsPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [activeModalTherapist, setActiveModalTherapist] = useState<Therapist | null>(null);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[2]);
  const [sessionType, setSessionType] = useState<"individual" | "couples" | "evaluation">("individual");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filtered = therapists.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesSpecialty =
      selectedSpecialty === "All" ||
      t.focusArea === selectedSpecialty ||
      t.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  const handleOpenBooking = (therapist: Therapist) => {
    setActiveModalTherapist(therapist);
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    toast({
      title: "Tele-Health Session Confirmed! 🎉",
      description: `Your appointment with ${activeModalTherapist?.name} on ${selectedSlot} has been scheduled.`,
    });
  };

  return (
    <PageWrapper title="Clinical Directory" subtitle="Book certified psychologists & tele-health sessions">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ============================================================== */}
        {/* 1. DIRECTORY HEADER & SPECIALTY FILTER PILLS                   */}
        {/* ============================================================== */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Verified Licensed Practitioners</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight font-outfit">
                Find Your Clinical Care Partner
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Connect with doctoral-level licensed clinicians specializing in evidence-based therapy.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, symptom, or CBT..."
                className="w-full bg-slate-950/80 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all"
              />
            </div>
          </div>

          {/* Specialty Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            {specialtiesList.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                  selectedSpecialty === spec
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25 scale-105"
                    : "bg-slate-950/60 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. FEATURED PRACTITIONER BANNER (Dr. Sarah Mitchell)          */}
        {/* ============================================================== */}
        {selectedSpecialty === "All" && (
          <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-indigo-950/40 border border-emerald-500/30 p-6 md:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-3 flex justify-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=320&auto=format&fit=crop&q=80"
                    alt="Dr. Sarah Mitchell"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover ring-2 ring-emerald-400/50 shadow-2xl"
                  />
                  <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    Featured
                  </span>
                </div>
              </div>

              <div className="md:col-span-6 space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
                  <span>4.9 / 5.0 (128 verified clinical reviews)</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white font-outfit">
                  Dr. Sarah Mitchell, Psy.D
                </h3>
                <p className="text-xs text-emerald-400 font-medium">Licensed Clinical Psychologist • 10+ Years</p>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  Leading expert in somatic cognitive reframing, acute anxiety de-escalation, and mindfulness stabilization. Accepting new virtual tele-health patients today.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 justify-center md:justify-start">
                  {["CBT", "Anxiety Mastery", "Trauma Recovery", "Somatic Grounding"].map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center space-y-3">
                <div className="text-center md:text-right">
                  <p className="text-2xl font-black text-white font-outfit">$150</p>
                  <p className="text-[11px] text-slate-400">per 50-min session</p>
                </div>
                <Button
                  onClick={() => handleOpenBooking(therapists[0])}
                  className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-lg shadow-emerald-500/25"
                >
                  <Video className="h-4 w-4 mr-1.5" />
                  Book Video Session
                </Button>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Next available: Today, 2:30 PM
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. THERAPIST DIRECTORY GRID                                    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((therapist) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 p-6 shadow-xl backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={therapist.avatarUrl}
                      alt={therapist.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-emerald-400/50 transition-all shadow-md"
                    />
                    {therapist.isVerified && (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-0.5 rounded-full ring-2 ring-slate-900">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                        {therapist.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-white">{therapist.rating}</span>
                        <span className="text-[10px] text-slate-400">({therapist.reviewCount})</span>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-400/90 font-medium">{therapist.title}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {therapist.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {therapist.languages.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {therapist.bio}
                </p>

                {/* Specialties Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {therapist.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 border border-white/5 text-slate-300 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Rate & Booking CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-white font-outfit">${therapist.sessionRate}</span>
                  <span className="text-[10px] text-slate-400"> / session</span>
                  <p className="text-[10px] text-emerald-400 font-medium mt-0.5">{therapist.availability}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleOpenBooking(therapist)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs h-9 px-4 rounded-xl shadow-md"
                  >
                    <Video className="h-3.5 w-3.5 mr-1.5" />
                    Book Session
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE 3-STEP BOOKING MODAL                            */}
      {/* ============================================================== */}
      <AnimatePresence>
        {activeModalTherapist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0d121d] border border-white/15 p-6 shadow-2xl space-y-5 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalTherapist(null)}
                className="absolute top-5 right-5 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {!bookingConfirmed ? (
                <>
                  <div className="flex items-center gap-3.5">
                    <img
                      src={activeModalTherapist.avatarUrl}
                      alt={activeModalTherapist.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-400"
                    />
                    <div>
                      <h3 className="text-lg font-bold font-outfit text-white">
                        Book with {activeModalTherapist.name}
                      </h3>
                      <p className="text-xs text-emerald-400">{activeModalTherapist.title}</p>
                      <p className="text-xs text-slate-400 font-medium">${activeModalTherapist.sessionRate} • 50 Minutes Tele-Health</p>
                    </div>
                  </div>

                  {/* Step 1: Session Format */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      1. Select Session Modality
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSessionType("individual")}
                        className={cn(
                          "p-2.5 rounded-xl border text-left transition-all",
                          sessionType === "individual"
                            ? "bg-emerald-500/20 border-emerald-400 text-white"
                            : "bg-slate-900 border-white/10 text-slate-400 hover:border-white/20"
                        )}
                      >
                        <p className="text-xs font-bold">Individual</p>
                        <p className="text-[10px] text-slate-400">1-on-1 Focus</p>
                      </button>
                      <button
                        onClick={() => setSessionType("couples")}
                        className={cn(
                          "p-2.5 rounded-xl border text-left transition-all",
                          sessionType === "couples"
                            ? "bg-emerald-500/20 border-emerald-400 text-white"
                            : "bg-slate-900 border-white/10 text-slate-400 hover:border-white/20"
                        )}
                      >
                        <p className="text-xs font-bold">Couples</p>
                        <p className="text-[10px] text-slate-400">Relational</p>
                      </button>
                      <button
                        onClick={() => setSessionType("evaluation")}
                        className={cn(
                          "p-2.5 rounded-xl border text-left transition-all",
                          sessionType === "evaluation"
                            ? "bg-emerald-500/20 border-emerald-400 text-white"
                            : "bg-slate-900 border-white/10 text-slate-400 hover:border-white/20"
                        )}
                      >
                        <p className="text-xs font-bold">Clinical Eval</p>
                        <p className="text-[10px] text-slate-400">Diagnostic</p>
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Available Slots */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      2. Available Time Slots (Live Synchronized)
                    </label>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all",
                            selectedSlot === slot
                              ? "bg-emerald-500/15 border-emerald-400 text-white font-bold"
                              : "bg-slate-950/60 border-white/5 text-slate-400 hover:bg-slate-900"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-emerald-400" />
                            {slot}
                          </span>
                          {selectedSlot === slot && <Check className="h-4 w-4 text-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Confirmation Summary */}
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CreditCard className="h-4 w-4 text-emerald-400" />
                      <span>Fee: ${activeModalTherapist.sessionRate} (Insurance / Card)</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">Instant Tele-Health Link</span>
                  </div>

                  <Button
                    onClick={handleConfirmBooking}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/30"
                  >
                    Confirm & Schedule Appointment
                  </Button>
                </>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-outfit text-white">
                      Appointment Confirmed!
                    </h3>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
                      You are confirmed with {activeModalTherapist.name} for {selectedSlot}. A secure encrypted video room has been provisioned.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button
                      onClick={() => setActiveModalTherapist(null)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 rounded-xl"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
