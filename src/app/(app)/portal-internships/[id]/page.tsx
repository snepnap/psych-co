"use client";

import Link from "next/link";
import { useInternship } from "@/lib/hooks/use-internships";
import { useEnrollInternship } from "@/lib/hooks/use-internships";
import { getProfile } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Calendar, Users, Euro, CheckCircle2, X, Brain } from "lucide-react";

export default function InternshipDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: internship,
    isLoading,
    error,
  } = useInternship(id);

  const enrollInternship = useEnrollInternship();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

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

  if (profileLoading) {
    return <div className="p-8">Loading profile...</div>;
  }

  if (isLoading) {
    return <div className="p-8">Loading internship details...</div>;
  }

  if (error) {
    return <div className="p-8">Error: {error.message}</div>;
  }

  if (!internship) {
    return <div className="p-8">Internship not found.</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isFree = !internship.price_cents || internship.price_cents === 0;
  const priceDisplay = isFree ? "Free" : `€${(internship.price_cents ?? 0) / 100}`;

  // Check if current user is the psychologist
  const isPsychologist = profile?.id === internship.psychologist_id;
  // Check if user is already enrolled (we would need to fetch enrollments; for simplicity, we'll skip)
  // We'll assume we have a way to check enrollment status; we'll leave it as not enrolled for now.
  const isEnrolled = false; // placeholder

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-outfit text-foreground">
          {internship.title}
        </h1>
        {/* If psychologist, show edit/delete buttons */}
        {isPsychologist && (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              // Link to edit page
              // We'll create an edit page later: /app/(app)/internships/[id]/edit
              asChild
            >
              <Link href={`/app/internships/${id}/edit`}>
                Edit
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive"
              // We'll implement delete via a modal or redirect to a delete action
              // For now, we'll just show a placeholder
              onClick={() => {
                // Implement delete functionality
                alert("Delete not implemented yet");
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {/* Left column: image/info */}
        <div className="space-y-6">
          {/* Psychologist info */}
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 flex-shrink-0">
              {internship.psychologist ? (
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={internship.psychologist.avatar_url ?? undefined}
                    alt={internship.psychologist.full_name}
                  />
                  <AvatarFallback>
                    {internship.psychologist.full_name?.slice(0, 2).toUpperCase() || "DR"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full neumorphism-light border">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold font-outfit text-foreground">
                {internship.psychologist?.full_name ?? "Psychologist"}
              </h2>
              <p className="text-muted-foreground">
                {internship.psychologist?.bio ?? "No bio available"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="border rounded-xl p-4 neumorphism-light">
            <h3 className="text-lg font-semibold font-outfit text-foreground mb-2">
              Description
            </h3>
            <p className="text-muted-foreground">
              {internship.description ?? "No description provided."}
            </p>
          </div>

          {/* Details */}
          <div className="grid gap-4">
            <div className="flex items-center space-x-3 neumorphism-light p-4 rounded-xl">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Dates</h3>
                <p className="text-muted-foreground">
                  {formatDate(internship.start_date)} – {formatDate(internship.end_date)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 neumorphism-light p-4 rounded-xl">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Capacity</h3>
                <p className="text-muted-foreground">
                  {internship.max_participants} participants
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 neumorphism-light p-4 rounded-xl">
              <Euro className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Price</h3>
                <p className="text-muted-foreground">{priceDisplay}</p>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Status:</span>
            <Badge
              variant={
                internship.status === "active"
                  ? "success"
                  : internship.status === "completed"
                  ? "secondary"
                  : internship.status === "draft"
                  ? "tertiary"
                  : "warning"
              }
            >
              {internship.status
                .split("_")
                .map((w: string) => w[0] + w.slice(1).toLowerCase())
                .join(" ")}
            </Badge>
          </div>
        </div>

        {/* Right column: enrollment */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-outfit text-foreground">
            Join this Internship
          </h2>
          <p className="text-muted-foreground mb-4">
            Secure your spot and start your journey with this professional development opportunity.
          </p>

          {/* Enroll button */}
          <Button
            variant="neumorphism"
            size="lg"
            className="w-full"
            disabled={isEnrolling || !profile}
            onClick={async () => {
              setIsEnrolling(true);
              setEnrollError(null);
              try {
                await enrollInternship.mutateAsync(id);
                // Enrollment successful
                // We could show a success message or redirect
                alert("Enrollment successful! You are now enrolled.");
                // Optionally, refetch internship data to update enrolled count
              } catch (err: any) {
                setEnrollError(err.message ?? "Failed to enroll");
              } finally {
                setIsEnrolling(false);
              }
            }}
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
          </Button>

          {enrollError && (
            <p className="mt-2 text-destructive text-sm">
              {enrollError}
            </p>
          )}

          {/* If already enrolled, show a message */}
          {isEnrolled && (
            <div className="mt-4 p-4 rounded-xl bg-secondary/20 text-secondary">
              <CheckCircle2 className="h-4 w-4 text-secondary mr-2" /> You are already enrolled in this internship.
            </div>
          )}

          {/* If user is the psychologist, show enrollment list (optional) */}
          {isPsychologist && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold font-outfit text-foreground mb-2">
                Enrolled Participants
              </h3>
              {/* We would fetch enrollments here and display a list */}
              <p className="text-muted-italic">Enrollment list not implemented yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}