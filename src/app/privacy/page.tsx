import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy — The Psych Co.",
  description: "Privacy policy and clinical data confidentiality standards for The Psych Co.",
};

export default function PrivacyPage() {
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
            <ShieldCheck className="h-3.5 w-3.5" />
            Confidentiality & Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Last Updated: October 2026 · The Psych Co.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              1. Commitment to Confidentiality
            </h2>
            <p>
              At <strong>The Psych Co.</strong>, we recognize the sensitive nature of psychological training and clinical psychotherapy. We uphold rigorous professional and ethical codes mandated by the Rehabilitation Council of India (RCI). All personal information, enquiry details, and session notes are treated with absolute confidentiality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              2. Information We Collect
            </h2>
            <p>
              When you submit an enquiry, apply for an internship, or register for a certification course or therapy session, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details: Name, email address, and phone / WhatsApp number.</li>
              <li>Academic and professional level: (e.g., Class 11-12, Bachelor's, Master's, Working Professional).</li>
              <li>Learning preferences, program selections, and voluntary introductory notes.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              3. Limits of Confidentiality in Psychotherapy
            </h2>
            <p>
              Under Indian law and clinical ethics, confidentiality between a client and clinical psychologist is maintained except in rare circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Where there is a clear, immediate risk of serious physical harm to the individual or others.</li>
              <li>Where required by statutory disclosure or a formal court order.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-outfit font-bold text-foreground">
              4. Contact for Privacy Inquiries
            </h2>
            <p>
              If you have any questions regarding how your data is handled or wish to update your details, please reach out directly to{" "}
              <a href="mailto:connect@psychco.in" className="text-[#114B43] dark:text-emerald-400 font-semibold underline">
                connect@psychco.in
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
