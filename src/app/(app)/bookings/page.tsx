"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getProfile, supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { SessionCard } from "@/components/session-card";
import { Plus, Calendar, Clock, Video, UserCheck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PageWrapper } from "@/components/layout/page-wrapper";
import type { Booking } from "@/lib/types";

export default function BookingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [psychologists, setPsychologists] = useState<any[]>([]);
  const [psychologistsLoading, setPsychologistsLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    getProfile()
      .then((p) => {
        setProfile(p);
        setProfileLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setProfileLoading(false);
      });
  }, []);

  // Fetch psychologists for the dropdown
  useEffect(() => {
    const fetchPsychologists = async () => {
      setPsychologistsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id,full_name,avatar_url")
          .eq("role", "psychologist")
          .order("full_name");

        if (error) throw error;
        setPsychologists(data ?? []);
      } catch (err: any) {
        console.error("Failed to fetch psychologists:", err);
      } finally {
        setPsychologistsLoading(false);
      }
    };
    fetchPsychologists();
  }, []);

  // Fetch bookings for the current user
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!profile) return;
    setBookingsLoading(true);
    setBookingsError(null);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          psychologist:profiles(id,full_name,avatar_url),
          client:profiles(id,full_name,avatar_url)
        `)
        .or(`psychologist_id.eq.${profile.id},client_id.eq.${profile.id}`)
        .order("starts_at", { ascending: true });

      if (error) throw error;
      setBookingsData((data as any) ?? []);
    } catch (err: any) {
      setBookingsError(err.message ?? "Failed to fetch bookings");
    } finally {
      setBookingsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (!profileLoading && profile) {
      fetchBookings();
    } else if (!profileLoading && !profile) {
      setBookingsData([]);
      setBookingsLoading(false);
    }
  }, [profileLoading, profile, fetchBookings]);

  // State for create booking dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    psychologistId: "",
    clientId: "",
    date: "",
    startTime: "",
    endTime: "",
    priceCents: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    const clientId = profile?.role === "client" ? profile?.id : formData.clientId || profile?.id;
    const psychologistId = formData.psychologistId;

    if (!psychologistId || !clientId || !formData.date || !formData.startTime || !formData.endTime) {
      setCreateError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const startsAt = new Date(`${formData.date}T${formData.startTime}`).toISOString();
      const endsAt = new Date(`${formData.date}T${formData.endTime}`).toISOString();

      const { error } = await supabase
        .from("bookings")
        .insert([
          {
            psychologist_id: psychologistId,
            client_id: clientId,
            starts_at: startsAt,
            ends_at: endsAt,
            price_cents: formData.priceCents ? parseInt(formData.priceCents, 10) : 12000,
            status: "pending",
          },
        ]);

      if (error) throw error;
      setIsCreateDialogOpen(false);
      setFormData({
        psychologistId: "",
        clientId: "",
        date: "",
        startTime: "",
        endTime: "",
        priceCents: "",
      });
      await fetchBookings();
    } catch (err: any) {
      setCreateError(err.message ?? "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (profileLoading) {
    return (
      <PageWrapper title="Tele-Health Sessions" subtitle="Loading your clinical schedule...">
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      </PageWrapper>
    );
  }

  const psychologistOptions = psychologists.map((p) => ({
    value: p.id,
    label: p.full_name || "Specialist",
  }));

  return (
    <PageWrapper title="Tele-Health Bookings" subtitle="Encrypted HIPAA-compliant tele-consultations & appointment tracking">
      <div className="space-y-8">
        {/* Top Header Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220]/80 p-6 md:p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Synchronous Care Portal</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-outfit">
                Clinical Consultations & Sessions
              </h1>
              <p className="text-sm text-zinc-400 max-w-xl">
                Review your upcoming tele-sessions, join secure end-to-end encrypted video rooms, and schedule priority slots with verified doctors.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="neumorphism"
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-lg shadow-emerald-500/20"
              >
                <Plus className="mr-2 h-4 w-4" /> Book New Session
              </Button>
            </div>
          </div>
        </div>

        {bookingsError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {bookingsError}
          </div>
        )}

        {bookingsLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl border border-white/5 bg-white/5" />
            ))}
          </div>
        ) : bookingsData.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0c1220]/60 p-12 text-center backdrop-blur-xl">
            <Video className="mx-auto h-12 w-12 text-zinc-500 mb-4" />
            <h3 className="text-lg font-semibold text-white font-outfit mb-1">No Scheduled Consultations</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              You currently don&apos;t have any active appointments. Connect with our vetted psychologists to start your journey.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(true)}
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <Plus className="mr-2 h-4 w-4" /> Schedule First Session
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookingsData.map((booking: Booking) => (
              <SessionCard
                key={booking.id}
                booking={booking}
                showActions={true}
              />
            ))}
          </div>
        )}

        {/* Modal Dialog for Scheduling */}
        {isCreateDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
            <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c1220] p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold font-outfit text-white">
                  Schedule Clinical Consultation
                </h2>
                <button
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {createError && (
                <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                  {createError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Select Specialist
                  </label>
                  <select
                    id="psychologistId"
                    name="psychologistId"
                    value={formData.psychologistId}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Select psychologist...</option>
                    {psychologistOptions.map((opt: any) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0c1220] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Consultation Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Start Time
                    </label>
                    <input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      End Time
                    </label>
                    <input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Session Fee (cents)
                  </label>
                  <input
                    id="priceCents"
                    name="priceCents"
                    type="number"
                    min="0"
                    placeholder="12000 (standard €120.00)"
                    value={formData.priceCents}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-white/10 text-zinc-300 hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="neumorphism"
                    disabled={isSubmitting}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
                  >
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}