"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Star, Calendar, MapPin, Clock, Filter, Search,
  CheckCircle, Video, MessageSquare, Globe,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  initials: string;
  gradient: string;
}

const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    title: "Licensed Clinical Psychologist",
    specialties: ["CBT", "Anxiety", "Depression", "Trauma"],
    rating: 4.9,
    reviewCount: 128,
    sessionRate: 150,
    availability: "Available this week",
    location: "New York, NY",
    languages: ["English", "Spanish"],
    isVerified: true,
    nextAvailable: "Tomorrow, 2 PM",
    bio: "Specializing in evidence-based treatments for anxiety and mood disorders, with 10+ years of experience helping adults build resilience and reclaim their wellbeing.",
    initials: "SM",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    id: "2",
    name: "Dr. James Chen",
    title: "Clinical Social Worker, LCSW",
    specialties: ["Mindfulness", "Stress", "Relationships", "ADHD"],
    rating: 4.8,
    reviewCount: 94,
    sessionRate: 120,
    availability: "Available today",
    location: "San Francisco, CA",
    languages: ["English", "Mandarin"],
    isVerified: true,
    nextAvailable: "Today, 5 PM",
    bio: "I blend mindfulness-based techniques with CBT to help clients manage stress, improve relationships, and find balance in their daily lives.",
    initials: "JC",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "3",
    name: "Dr. Amara Osei",
    title: "Psychiatrist, MD",
    specialties: ["Bipolar", "OCD", "Medication Management", "PTSD"],
    rating: 4.95,
    reviewCount: 215,
    sessionRate: 200,
    availability: "Available next week",
    location: "Chicago, IL",
    languages: ["English", "French"],
    isVerified: true,
    nextAvailable: "Mon, Aug 18, 10 AM",
    bio: "Board-certified psychiatrist focused on integrated care combining therapy and medication management for complex mental health conditions.",
    initials: "AO",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: "4",
    name: "Dr. Lucas Moreno",
    title: "Counseling Psychologist",
    specialties: ["Career Stress", "Life Transitions", "Self-esteem", "CBT"],
    rating: 4.7,
    reviewCount: 67,
    sessionRate: 110,
    availability: "Available today",
    location: "Remote only",
    languages: ["English", "Portuguese"],
    isVerified: true,
    nextAvailable: "Today, 7 PM",
    bio: "Helping professionals navigate life's challenges, career transitions, and burnout. Bringing warmth and evidence-based tools to every session.",
    initials: "LM",
    gradient: "from-amber-500 to-orange-600",
  },
];

const specialtyFilters = ["All", "CBT", "Anxiety", "Depression", "Trauma", "Mindfulness", "ADHD", "Relationships"];

export default function TherapistsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [bookingId, setBookingId] = useState<string | null>(null);

  const filtered = therapists.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All" || t.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleBook = (therapist: Therapist) => {
    setBookingId(therapist.id);
    setTimeout(() => {
      setBookingId(null);
      toast({
        title: `Session booked with ${therapist.name}! 🎉`,
        description: `${therapist.nextAvailable} — You'll receive a confirmation email shortly.`,
        variant: "default",
      });
    }, 1200);
  };

  return (
    <PageWrapper title="Therapists" subtitle="Find your perfect mental wellness specialist">
      <div className="space-y-6 max-w-5xl">
        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="therapists-search"
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search therapists"
            />
          </div>
          <Button variant="glass" size="default" aria-label="Open filter options">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Specialty filters */}
        <div className="flex gap-2 flex-wrap">
          {specialtyFilters.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border min-h-[36px]",
                selectedSpecialty === specialty
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-muted/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
              aria-pressed={selectedSpecialty === specialty}
              aria-label={`Filter by ${specialty} specialty`}
            >
              {specialty}
            </button>
          ))}
        </div>

        {/* Therapist cards */}
        <div className="space-y-4">
          {filtered.map((therapist, i) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card glass className="hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" alt={`${therapist.name} profile photo`} />
                        <AvatarFallback className={`bg-gradient-to-br ${therapist.gradient} text-white text-lg font-bold`}>
                          {therapist.initials}
                        </AvatarFallback>
                      </Avatar>
                      {therapist.isVerified && (
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center" title="Verified specialist">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h3 className="text-base font-semibold font-outfit text-foreground">{therapist.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
                          <span className="text-sm font-semibold text-foreground">{therapist.rating}</span>
                          <span className="text-xs text-muted-foreground">({therapist.reviewCount})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{therapist.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                        {therapist.bio}
                      </p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {therapist.specialties.map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          {therapist.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" aria-hidden="true" />
                          {therapist.languages.join(", ")}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {therapist.availability}
                        </span>
                        <span className="flex items-center gap-1">
                          <Video className="h-3 w-3" aria-hidden="true" />
                          Video sessions
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" aria-hidden="true" />
                          Chat available
                        </span>
                      </div>
                    </div>

                    {/* Booking panel */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-4 shrink-0">
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground font-outfit">${therapist.sessionRate}</p>
                        <p className="text-xs text-muted-foreground">per session</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-0.5">Next available</p>
                        <p className="text-xs font-semibold text-foreground">{therapist.nextAvailable}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="glass"
                          size="sm"
                          aria-label={`View ${therapist.name}'s profile`}
                          id={`therapist-view-${therapist.id}`}
                        >
                          Profile
                        </Button>
                        <Button
                          variant="gradient"
                          size="sm"
                          onClick={() => handleBook(therapist)}
                          disabled={bookingId === therapist.id}
                          aria-label={`Book a session with ${therapist.name}`}
                          id={`therapist-book-${therapist.id}`}
                        >
                          {bookingId === therapist.id ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
                            />
                          ) : (
                            <>
                              <Calendar className="h-3.5 w-3.5" />
                              Book
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-40 mb-4" />
            <p className="text-muted-foreground">No therapists found matching your search.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
