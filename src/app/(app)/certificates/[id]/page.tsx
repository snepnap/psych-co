"use client";

import Link from "next/link";
import { useCertificate } from "@/lib/hooks/use-certificates";
import { getProfile } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Calendar, Users, Euro, CheckCircle2, X, Award, Brain } from "lucide-react";

export default function CertificateDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: certificate,
    isLoading,
    error,
  } = useCertificate(id);

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
    return <div className="p-8">Loading certificate details...</div>;
  }

  if (error) {
    return <div className="p-8">Error: {error.message}</div>;
  }

  if (!certificate) {
    return <div className="p-8">Certificate not found.</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const templateMap: Record<string, string> = {
    internship_completion: "Internship Completion",
    course_completion: "Course Completion",
    workshop_attendance: "Workshop Attendance",
    custom: "Custom Certificate",
  };

  // Check if current user is the issuer or recipient
  const isIssuer = profile?.id === certificate.issued_by;
  const isRecipient = profile?.id === certificate.recipient_id;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-outfit text-foreground">
          {templateMap[certificate.template] || certificate.template}
        </h1>
        {/* If issuer, show edit/delete buttons */}
        {isIssuer && (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              // Link to edit page (we'll create later)
              asChild
            >
              <Link href={`/app/certificates/${id}/edit`}>
                Edit
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive"
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
        {/* Left column: certificate info */}
        <div className="space-y-6">
          {/* Certificate preview */}
          <div className="border rounded-xl p-4 neumorphism-light">
            <h3 className="text-lg font-semibold font-outfit text-foreground mb-2">
              Certificate Preview
            </h3>
            {certificate.pdf_url ? (
              <div className="mb-4">
                <a
                  href={certificate.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    View PDF
                  </Button>
                </a>
              </div>
            ) : (
              <div className="text-center p-6">
                <p className="text-muted-foreground">PDF not available</p>
                {/* We could show a preview of the data here */}
                <pre className="bg-muted p-4 rounded mt-2">
                  {JSON.stringify(certificate.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Recipient info */}
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 flex-shrink-0">
              {certificate.recipient ? (
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={certificate.recipient.avatar_url ?? undefined}
                    alt={certificate.recipient.full_name}
                  />
                  <AvatarFallback>
                    {certificate.recipient.full_name?.slice(0, 2).toUpperCase() || "UC"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full neumorphism-light border">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold font-outfit text-foreground">
                {certificate.recipient?.full_name ?? "Unknown Recipient"}
              </h2>
              <p className="text-muted-foreground">
                {certificate.recipient?.role ?? ""}
              </p>
            </div>
          </div>

          {/* Issuer info */}
          <div className="flex items-start space-x-4 mt-4">
            <div className="h-10 w-10 flex-shrink-0">
              {certificate.issuer ? (
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={certificate.issuer.avatar_url ?? undefined}
                    alt={certificate.issuer.full_name}
                  />
                  <AvatarFallback>
                    {certificate.issuer.full_name?.slice(0, 2).toUpperCase() || "IS"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full neumorphism-light border">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold font-outfit text-foreground">
                {certificate.issuer?.full_name ?? "Unknown Issuer"}
              </h2>
              <p className="text-muted-foreground">
                {certificate.issuer?.role ?? ""}
              </p>
            </div>
          </div>
        </div>

        {/* Right column: details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-outfit text-foreground">
            Certificate Details
          </h2>

          <div className="grid gap-4">
            <div className="flex items-center space-x-3 neumorphism-light p-4 rounded-xl">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Template</h3>
                <p className="text-muted-foreground">{templateMap[certificate.template] || certificate.template}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 neumorphism-light p-4 rounded-xl">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Date Issued</h3>
                <p className="text-muted-foreground">{formatDate(certificate.issued_at)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 neumorphism-light p-4 rounded-xl">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Recipient</h3>
                <p className="text-muted-foreground">
                  {certificate.recipient?.full_name || "Unknown"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 neumorphism-light p-4 rounded-xl">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Issuer</h3>
                <p className="text-muted-foreground">
                  {certificate.issuer?.full_name || "Unknown"}
                </p>
              </div>
            </div>
          </div>

          {/* Data JSON */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold font-outfit text-foreground mb-2">
              Certificate Data
            </h3>
            <div className="neumorphism-light p-4 rounded">
              <pre className="text-sm font-mono">
                {JSON.stringify(certificate.data, null, 2)}
              </pre>
            </div>
          </div>

          {/* Actions based on role */}
          {isIssuer || isRecipient ? (
            <div className="mt-6">
              {certificate.pdf_url ? (
                <a
                  href={certificate.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block"
                >
                  <Button
                    variant="neumorphism"
                    size="lg"
                    className="w-full"
                  >
                    Download Certificate PDF
                  </Button>
                </a>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    // TODO: Regenerate PDF
                    alert("PDF regeneration not implemented yet");
                  }}
                >
                  Generate PDF
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}