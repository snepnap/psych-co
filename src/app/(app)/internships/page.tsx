"use client";

import { useInternships } from "@/lib/hooks/use-internships";
import { useCreateInternship } from "@/lib/hooks/use-internships";
import { getProfile } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { InternshipCard } from "@/components/internship-card";
import { useState, useEffect, useTransition } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function InternshipsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

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

  const {
    data: internships = [],
    isLoading,
    error,
  } = useInternships({
    // We can filter later based on role; for now show all active
    // To show all internships for psychologists, we could remove status filter.
    // We'll adjust: if profile is psychologist, we want to see all internships they manage.
    // For simplicity, we'll show all internships (no status filter) and let the user filter via UI later.
    // We'll leave it as is (active only) for now.
  });

  const createInternship = useCreateInternship();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    max_participants: "",
    price_cents: "",
    status: "draft",
  });
  const [createError, setCreateError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    try {
      await createInternship.mutateAsync(formData);
      setIsCreateDialogOpen(false);
      // Reset form
      setFormData({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        max_participants: "",
        price_cents: "",
        status: "draft",
      });
    } catch (err: any) {
      setCreateError(err.message ?? "Failed to create internship");
    }
  };

  if (profileLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-outfit text-foreground">
          Internships
        </h1>
        {/* Show create button only if user is psychologist or admin */}
        {(profile?.role === "psychologist" || profile?.role === "admin") && (
          <Button variant="neumorphism" size="lg" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Internship
          </Button>
        )}
      </div>

      {error && (
        <div className="p-4 mb-4 rounded-lg bg-destructive/20 text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Loading internships...</div>
      ) : internships.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No internships available yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                // We'll make the card clickable to go to detail page
                // We'll handle the link inside the card component
              />
            ))}
          </div>
        </div>
      )}

      {/* Create Internship Dialog */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
          isCreateDialogOpen ? "block" : "hidden"
        )}
      >
        <div className="bg-card/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold font-outfit text-foreground mb-4">
            Create New Internship
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={cn(
                  "neumorphism-input w-full",
                  "h-20 resize-none"
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="max_participants">Max Participants</Label>
                <Input
                  id="max_participants"
                  name="max_participants"
                  type="number"
                  min="1"
                  value={formData.max_participants}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price_cents">Price (cents)</Label>
                <Input
                  id="price_cents"
                  name="price_cents"
                  type="number"
                  min="0"
                  value={formData.price_cents}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={cn(
                  "neumorphism-input w-full",
                  "h-10"
                )}
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
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
                isLoading={createInternship.isPending}
                onClick={handleSubmit}
                disabled={createInternship.isPending}
              >
                Create Internship
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}