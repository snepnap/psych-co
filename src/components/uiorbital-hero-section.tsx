import * as React from "react";
import { cn } from "@/lib/utils";

interface OrbitalHeroSectionProps {
  className?: string;
  children: React.ReactNode;
  // Optional: focus points for canvas (for future use)
  focus?: [number, number];
}

export const OrbitalHeroSection = ({
  className,
  children,
  focus = [0.5, 0.5], // default center
}: OrbitalHeroSectionProps) => {
  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      {/* ── Dynamic Background ───────────────────────── */}
      <div className="fixed inset-0 z-[-1] bg-black">
        {/* Aurora background */}
        <div className="absolute inset-0 aurora-bg opacity-30 mix-blend-screen pointer-events-none" />
        {/* Blob 1 */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[128px] animate-blob pointer-events-none" />
        {/* Blob 2 */}
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[128px] animate-blob animation-delay-2000 pointer-events-none" />
        {/* Blob 3 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[128px] animate-blob animation-delay-4000 pointer-events-none" />
        {/* Radial scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/0 pointer-events-none" />
      </div>

      {/* ── Foreground Content ───────────────────────── */}
      <div className="relative z-0 flex min-h-[90vh] items-center justify-center px-4 pt-20">
        <div className={cn(
          "glass-card",
          "max-w-4xl w-full p-8 space-y-6 text-center",
          "border border-white/10 bg-white/5 backdrop-blur-md",
          "shadow-xl shadow-emerald-500/20"
        )}>
          {children}
        </div>
      </div>
    </section>
  );
};

// We'll also export a default for convenience
export default OrbitalHeroSection;