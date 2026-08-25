import Link from "next/link";
import { Brain, Globe, Mail, MessageSquare, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

const footerLinks = {
  platform: [
    { name: "Internships", href: "/app/internships" },
    { name: "Certificates", href: "/app/certificates" },
    { name: "Bookings", href: "/app/bookings" },
    { name: "Sessions", href: "/app/sessions" }, // keep existing if needed
    { name: "Pricing", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "HIPAA", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <span className="font-outfit font-bold text-xl text-foreground">PSYCH Co.</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The premier platform for mental wellness, connecting you with certified professionals through a deeply personalized, secure experience.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
                <Globe className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
                <Mail className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
                <MessageSquare className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 py-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} PSYCH Co. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Ready to start?</span>
            <Button asChild variant="outline" className="rounded-full border-border hover:bg-muted">
              <Link href="/sign-up">
                Join Now <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}