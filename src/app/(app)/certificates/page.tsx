"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCertificates, useIssueCertificate } from "@/lib/hooks/use-certificates";
import { getProfile } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Award, ShieldCheck, Download, Plus, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PageWrapper } from "@/components/layout/page-wrapper";

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
  } = useCertificates({});

  const issueCertificate = useIssueCertificate();
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipient_id: "",
    issued_by: "",
    template: "internship_completion",
    data: JSON.stringify({ program: "Clinical Psychology Internship", honors: "Distinction" }, null, 2),
  });
  const [issueError, setIssueError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIssueError(null);
    try {
      let parsedData: Record<string, any> = {};
      try {
        parsedData = typeof formData.data === "string" ? JSON.parse(formData.data) : formData.data;
      } catch {
        parsedData = {};
      }

      await issueCertificate.mutateAsync({
        recipient_id: formData.recipient_id,
        issued_by: profile?.id ?? formData.issued_by,
        template: formData.template,
        data: parsedData,
      });
      setIsIssueDialogOpen(false);
      // Reset form
      setFormData({
        recipient_id: "",
        issued_by: "",
        template: "internship_completion",
        data: JSON.stringify({ program: "Clinical Psychology Internship", honors: "Distinction" }, null, 2),
      });
    } catch (err: any) {
      setIssueError(err.message ?? "Failed to issue certificate");
    }
  };

  if (profileLoading) {
    return (
      <PageWrapper title="Accredited Certificates" subtitle="Loading certificates registry...">
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Verifiable Credentials" subtitle="Cryptographically verified certificates & clinical internship honors">
      <div className="space-y-8">
        {/* Top Header Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220]/80 p-6 md:p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Tamper-Proof Verification Engine</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-outfit">
                Accredited Clinical Credentials
              </h1>
              <p className="text-sm text-zinc-400 max-w-xl">
                Explore verifiable internship completion certificates, clinical training records, and professional psychology distinctions issued by certified practitioners.
              </p>
            </div>

            {(profile?.role === "psychologist" || profile?.role === "admin") && (
              <Button
                variant="neumorphism"
                onClick={() => setIsIssueDialogOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-lg shadow-emerald-500/20 self-start md:self-auto"
              >
                <Plus className="mr-2 h-4 w-4" /> Issue Certificate
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error.message}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-white/5 bg-white/5" />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0c1220]/60 p-12 text-center backdrop-blur-xl">
            <Award className="mx-auto h-12 w-12 text-zinc-500 mb-4" />
            <h3 className="text-lg font-semibold text-white font-outfit mb-1">No Certificates Issued Yet</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Complete psychology internships or clinical workshops to earn accredited credentials.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        )}

        {/* Issue Certificate Dialog */}
        {isIssueDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0c1220] p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold font-outfit text-white">
                  Issue New Credential
                </h2>
                <button
                  onClick={() => setIsIssueDialogOpen(false)}
                  className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {issueError && (
                <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                  {issueError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="recipient_id" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Recipient User ID</Label>
                  <Input
                    id="recipient_id"
                    name="recipient_id"
                    value={formData.recipient_id}
                    onChange={handleInputChange}
                    placeholder="Enter recipient UUID"
                    required
                    className="mt-1 border-white/10 bg-black/40 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="template" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Certificate Template</Label>
                  <select
                    id="template"
                    name="template"
                    value={formData.template}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="internship_completion" className="bg-[#0c1220]">Internship Completion</option>
                    <option value="course_completion" className="bg-[#0c1220]">Course Completion</option>
                    <option value="workshop_attendance" className="bg-[#0c1220]">Workshop Attendance</option>
                    <option value="custom" className="bg-[#0c1220]">Custom Distinction</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="data" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Metadata (JSON)</Label>
                  <textarea
                    id="data"
                    name="data"
                    value={formData.data}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-3 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsIssueDialogOpen(false)}
                    className="border-white/10 text-zinc-300 hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="neumorphism"
                    disabled={issueCertificate.isPending}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
                  >
                    {issueCertificate.isPending ? "Issuing..." : "Issue Credential"}
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

export const CertificateCard = ({ certificate }: CertificateCardProps) => {
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
    custom: "Clinical Distinction",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220]/75 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]">
      <div className="flex items-start gap-4">
        {/* Recipient Avatar */}
        <div className="h-11 w-11 flex-shrink-0">
          {certificate.recipient ? (
            <Avatar className="h-11 w-11 border border-white/10">
              <AvatarImage
                src={certificate.recipient.avatar_url ?? undefined}
                alt={certificate.recipient.full_name}
              />
              <AvatarFallback className="bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                {certificate.recipient.full_name?.slice(0, 2).toUpperCase() || "RC"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
              <Award className="h-5 w-5 text-emerald-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {templateMap[certificate.template] || certificate.template}
            </span>
            <span className="text-xs text-zinc-500">
              {formatDate(certificate.issued_at)}
            </span>
          </div>

          <h3 className="text-base font-bold font-outfit text-white truncate">
            {certificate.recipient?.full_name || "Authorized Clinician"}
          </h3>

          <p className="text-xs text-zinc-400 truncate">
            Issued by {certificate.issuer?.full_name || "PSYCH Co. Accreditation Board"}
          </p>

          <div className="pt-3 flex items-center gap-3">
            <Link
              href={`/certificates/${certificate.id}`}
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              Verify Record →
            </Link>

            {certificate.pdf_url && (
              <a
                href={certificate.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
              >
                <Download className="h-3.5 w-3.5" /> PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};