"use client";

import { useCertificates } from "@/lib/hooks/use-certificates";
import { useIssueCertificate } from "@/lib/hooks/use-certificates";
import { getProfile } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Cp } from "lucide-react"; // We'll need to import an icon for certificate; let's use Award or Trophy
import { Award } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function CertificatesPage() {
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
    data: certificates = [],
    isLoading,
    error,
  } = useCertificates({
    // We can filter later; for now show all
  });

  const issueCertificate = useIssueCertificate();
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipient_id: "",
    issued_by: "", // will be filled from profile
    template: "internship_completion",
    data: JSON.stringify({}, null, 2),
  });
  const [issueError, setIssueError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "data") {
      // Validate JSON
      try {
        JSON.parse(value);
        setFormData((prev) => ({ ...prev, [name]: value }));
      } catch {
        // ignore invalid JSON
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIssueError(null);
    try {
      // Ensure issued_by is set from profile
      const dataToIssue = {
        ...formData,
        issued_by: profile?.id ?? "",
      };
      await issueCertificate.mutateAsync(dataToIssue);
      setIsIssueDialogOpen(false);
      // Reset form
      setFormData({
        recipient_id: "",
        issued_by: "",
        template: "internship_completion",
        data: JSON.stringify({}, null, 2),
      });
    } catch (err: any) {
      setIssueError(err.message ?? "Failed to issue certificate");
    }
  };

  if (profileLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-outfit text-foreground">
          Certificates
        </h1>
        {/* Show issue button only if user is psychologist or admin */}
        {(profile?.role === "psychologist" || profile?.role === "admin") && (
          <Button variant="neumorphism" size="lg" onClick={() => setIsIssueDialogOpen(true)}>
            <Award className="mr-2 h-4 w-4" /> Issue Certificate
          </Button>
        )}
      </div>

      {error && (
        <div className="p-4 mb-4 rounded-lg bg-destructive/20 text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Loading certificates...</div>
      ) : certificates.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No certificates issued yet.
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        </div>
      )}

      {/* Issue Certificate Dialog */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
          isIssueDialogOpen ? "block" : "hidden"
        )}
      >
        <div className="bg-card/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold font-outfit text-foreground mb-4">
            Issue New Certificate
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="recipient_id">Recipient User ID</Label>
              <Input
                id="recipient_id"
                name="recipient_id"
                value={formData.recipient_id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="issued_by">Issued By (User ID)</Label>
              <Input
                id="issued_by"
                name="issued_by"
                value={formData.issued_by}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="template">Certificate Template</Label>
              <select
                id="template"
                name="template"
                value={formData.template}
                onChange={handleInputChange
                className={cn(
                  "neumorphism-input w-full",
                  "h-10"
                )}
              >
                <option value="internship_completion">Internship Completion</option>
                <option value="course_completion">Course Completion</option>
                <option value="workshop_attendance">Workshop Attendance</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <Label htmlFor="data">Certificate Data (JSON)</Label>
              <textarea
                id="data"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                rows={6}
                className={cn(
                  "neumorphism-input w-full",
                  "h-24 resize-none font-mono"
                )}
                placeholder='{"name": "John Doe", "date": "2024-01-01", "score": "95%"}'
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsIssueDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="neumorphism"
                isLoading={issueCertificate.isPending}
                onClick={handleSubmit}
                disabled={issueCertificate.isPending}
              >
                Issue Certificate
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Certificate Card component
interface CertificateCardProps {
  certificate: {
    id: string;
    recipient_id: string;
    issued_by: string;
    template: string;
    data: any;
    pdf_url?: string | null;
    issued_at: string;
    recipient?: {
      id: string;
      full_name: string;
      role: string;
      avatar_url?: string | null;
      bio?: string | null;
      created_at: string;
    };
    issuer?: {
      id: string;
      full_name: string;
      role: string;
      avatar_url?: string | null;
      bio?: string | null;
      created_at: string;
    };
  };
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
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

  return (
    <Link
      href={`/app/certificates/${certificate.id}`}
      passHref
      className={cn(
        "group",
        "neumorphism-card",
        "hover:neumorphism-hover",
        "cursor-pointer"
      )}
    >
      <div className="flex items-start space-x-4">
        {/* Recipient Avatar */}
        <div className="h-10 w-10 flex-shrink-0">
          {certificate.recipient ? (
            <Avatar
              src={certificate.recipient.avatar_url}
              alt={certificate.recipient.full_name}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full neumorphism-light border">
              <Award className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-baseline space-x-3">
            <h3 className="text-xl font-semibold font-outfit text-foreground">
              {templateMap[certificate.template] || certificate.template}
            </h3>
          </div>

          <p className="text-muted-foreground line-clamp-2">
            Awarded to {certificate.recipient?.full_name || "Unknown User"}
          </p>

          <p className="text-muted-foreground line-clamp-1">
            Issued by {certificate.issuer?.full_name || "Unknown Issuer"}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center space-x-2">
              <span className="text-foreground">Issued:</span>
              <span>{formatDate(certificate.issued_at)}</span>
            </div>
          </div>

          {/* If PDF URL exists, show download button */}
          {certificate.pdf_url && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              href={certificate.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CertificateCard;