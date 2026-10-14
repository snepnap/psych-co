import Link from "next/link";
import { CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Refund Policy — The Psych Co.",
  description: "Enrolment cancellation and refund policy for The Psych Co. internships and courses.",
};

export default function RefundPage() {
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
            <CreditCard className="h-3.5 w-3.5" />
            Billing & Cancellations
          </div>
          <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
            Refund Policy
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Last Updated: October 2026 · The Psych Co.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              1. Internships and Certification Courses
            </h2>
            <p>
              Due to limited cohort sizes and synchronous clinician supervision, registrations for the 30-day and 60-day internships or individual certification courses can be refunded or transferred to an upcoming batch if requested in writing at least 48 hours prior to batch commencement.
            </p>
            <p>
              Once a batch begins and materials are distributed, registrations are non-refundable, though batch transfer credits may be offered on a case-by-case basis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              2. Psychotherapy Sessions
            </h2>
            <p>
              Appointments may be rescheduled or cancelled with at least 24 hours prior notice at no penalty. Sessions missed or cancelled with less than 24 hours notice may incur a standard reservation charge to respect clinician scheduling.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              3. Processing Inquiries
            </h2>
            <p>
              For all payment, invoicing, or refund assistance, write to us at{" "}
              <a href="mailto:connect@psychco.in" className="text-[#114B43] dark:text-emerald-400 font-semibold underline">
                connect@psychco.in
              </a>{" "}
              or message our official WhatsApp at +91 7587030286.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
