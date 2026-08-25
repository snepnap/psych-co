"use client";

import { useBookings } from "@/lib/hooks/use-bookings";
import { usePsychologists } from "@/lib/hooks/use-psychologists";
import { getProfile } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { SessionCard } from "@/components/session-card";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "next/link";
import { cn } from "@/lib/utils";

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
        setPsychologists(data);
      } catch (err: any) {
        console.error("Failed to fetch psychologists:", err);
      } finally {
        setPsychologistsLoading(false);
      }
    };
    fetchPsychologists();
  }, []);

  // Fetch bookings for the current user
  const [bookingsData, setBookingsData] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  useEffect(() => {
    if (!profileLoading && profile) {
      const fetchBookings = async () => {
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
          setBookingsData(data);
        } catch (err: any) {
          setBookingsError(err.message ?? "Failed to fetch bookings");
        } finally {
          setBookingsLoading(false);
        }
      };
      fetchBookings();
    } else {
      setBookingsData([]);
      setBookingsLoading(false);
    }
  }, [profileLoading, profile]);

  // State for create booking dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    psychologistId: "",
    clientId: "",
    date: "",
    startTime: "",
    endTime: "",
    priceCents: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    // Basic validation
    if (!formData.psychologistId || !formData.clientId || !formData.date || !formData.startTime || !formData.endTime) {
      setCreateError("Please fill in all required fields");
      return;
    }
    try {
      // Combine date and time into ISO strings
      const startsAt = new Date(`${formData.date}T${formData.startTime}`).toISOString();
      const endsAt = new Date(`${formData.date}T${formData.endTime}`).toISOString();
      // Call the Supabase function to create booking (we'll use the API route)
      // We'll use the useCreateBooking hook? We haven't created it yet.
      // For now, we'll do a direct insert via supabase.
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            psychologist_id: formData.psychologistId,
            client_id: formData.clientId,
            starts_at: startsAt,
            ends_at: endsAt,
            price_cents: formData.priceCents ? parseInt(formData.priceCents, 10) : null,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      // Close dialog and reset form
      setIsCreateDialogOpen(false);
      setFormData({
        psychologistId: "",
        clientId: "",
        date: "",
        startTime: "",
        endTime: "",
        priceCents: "",
      });
      // Refetch bookings
      // We'll trigger a refetch by setting a temporary state or we can rely on the useEffect that runs on profile change?
      // We'll just set a flag to refetch; we'll do a simple refetch by calling the fetchBookings function again.
      // We'll do it after a short delay to avoid infinite loop.
      setTimeout(() => {
        fetchBookings();
      }, 1000);
    } catch (err: any) {
      setCreateError(err.message ?? "Failed to create booking");
    }
  };

  if (profileLoading) {
    return <div className="p-8">Loading...</div>;
  }

  // Determine the other party for the dropdown: if user is client, show psychologists; if user is psychologist, show clients? We'll keep simple: always show psychologists for now.
  // We'll filter out the current user if they are a psychologist.
  const psychologistOptions = psychologists
    .filter((p: any) => p.id !== profile?.id)
    .map((p: any) => ({
      value: p.id,
      label: p.full_name,
      avatar: p.avatar_url,
    }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-outfit text-foreground">
          My Bookings
        </h1>
        <Button
          variant="neumorphism"
          size="lg"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Book Session
        </Button>
      </div>

      {bookingsError && (
        <div className="p-4 mb-4 rounded-lg bg-destructive/20 text-destructive">
          {bookingsError}
        </div>
      )}

      {bookingsLoading ? (
        <div className="p-8 text-center text-muted-foreground">Loading bookings...</div>
      ) : bookingsData.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No bookings yet.
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookingsData.map((booking) => (
              <SessionCard
                key={booking.id}
                booking={booking}
                showActions={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Create Booking Dialog */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
          isCreateDialogOpen ? "block" : "hidden"
        )}
      >
        <div className="bg-card/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold font-outfit text-foreground mb-4">
            Book a Session
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Psychologist
              </label>
              <select
                id="psychologistId"
                name="psychologistId"
                value={formData.psychologistId}
                onChange={handleInputChange}
                required
                className={cn(
                  "neumorphism-input w-full",
                  "h-10"
                )}
              >
                <option value="">Select psychologist</option>
                {psychologistOptions.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {psychologistsLoading && (
                <p className="text-xs text-muted-foreground mt-1">Loading psychologists...</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className={cn("neumorphism-input w-full", "h-10")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Time
                </label>
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className={cn("neumorphism-input w-full", "h-10")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Time
                </label>
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className={cn("neumorphism-input w-full", "h-10")}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price (cents) - optional
              </label>
              <input
                id="priceCents"
                name="priceCents"
                type="number"
                min="0"
                value={formData.priceCents}
                onChange={handleInputChange}
                className={cn("neumorphism-input w-full", "h-10")}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="neumorphism"
                isLoading={false} // we could set a loading state
                onClick={handleSubmit}
              >
                Book Session
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}