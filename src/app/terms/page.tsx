import Link from "next/link";
import { FileText, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms and Conditions — The Psych Co.",
  description: "Terms of service, clinical ethics disclaimers, and educational training guidelines for The Psych Co.",
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
            <Link href="/" className="flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F3F1] dark:bg-[#133D36] text-[#0E443C] dark:text-emerald-300 border border-[#114B43]/20 mb-3">
            <FileText className="h-3.5 w-3.5" />
            Terms of Service & Clinical Disclaimer
          </div>
          <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
            Terms and Conditions
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Last Updated: October 2026 · The Psych Co.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section className="p-4 rounded-2xl bg-[#FDF2EC] dark:bg-[#2a170f] border border-[#C2613B]/20 text-xs sm:text-sm text-[#702F15] dark:text-amber-200">
            <strong>Mandatory Non-Emergency Notice:</strong> Our educational programs and psychotherapy consultations do not constitute an emergency medical or psychiatric crisis service. In an acute crisis, users must call national helplines: <strong>112</strong> or <strong>Tele-MANAS (14416)</strong>, or visit a hospital.
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              1. Nature of Services
            </h2>
            <p>
              The Psych Co. delivers supervised educational internships, skill-building certification courses, and online psychotherapy facilitated by an RCI-registered Clinical Psychologist (CRR: A111440).
            </p>
            <p>
              <strong>No Cure or Outcome Guarantees:</strong> In strict alignment with medical ethics, The Psych Co. makes no promises of cure, guaranteed symptom eradication, or automatic academic placements. Progress in therapy and clinical skill acquisition is individualized.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              2. Student and Participant Conduct
            </h2>
            <p>
              Interns and course attendees are bound by peer confidentiality. Case discussions, mock sessions, and client materials examined during training are educational simulations and must not be distributed, recorded, or shared externally without written consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              3. Minors Under 18 Years
            </h2>
            <p>
              Individuals under the age of 18 seeking counselling must have explicit consent from a parent or legal guardian prior to consultation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
