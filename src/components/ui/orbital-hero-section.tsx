import * as React from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

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
  const [isInteractive, setIsInteractive] = React.useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Add subtle parallax effect based on mouse movement
      const heroSection = document.querySelector('.orbital-hero-section');
      if (heroSection) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (e.clientX - centerX) / centerX;
        const offsetY = (e.clientY - centerY) / centerY;

        // Apply subtle movement to background layers
        const blobs = heroSection.querySelectorAll('[class*="animate-blob"]');
        blobs.forEach((blob, index) => {
          const speed = 0.02 + index * 0.01;
          blob.style.transform = `translate(${offsetX * speed * 20}px, ${offsetY * speed * 20}px)`;
        });
      }
    };

    const heroSection = document.querySelector('.orbital-hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseenter', () => setIsInteractive(true));
      heroSection.addEventListener('mouseleave', () => setIsInteractive(false));

      return () => {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseenter', () => setIsInteractive(true));
        heroSection.removeEventListener('mouseleave', () => setIsInteractive(false));
      };
    }
  }, []);

  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      data-interactive={isInteractive ? 'true' : 'false'}
    >
      {/* ── Dynamic Background ───────────────────────── */}
      <div className="fixed inset-0 z-[-1] bg-black">
        {/* Premium Aurora background with multiple layers and subtle movement */}
        <div className="absolute inset-0 aurora-bg opacity-20 mix-blend-serif pointer-events-none"
             style={{ animationDelay: '0s' }} />
        <div className="absolute inset-0 aurora-bg opacity-12 mix-blend-screen pointer-events-none"
             style={{ animationDelay: '3000ms' }} />
        <div className="absolute inset-0 aurora-bg opacity-8 mix-blend-overlay pointer-events-none"
             style={{ animationDelay: '6000ms' }} />

        {/* Premium Blob 1 - Indigo with multi-layer glow */}
        <div className="absolute top-1/4 left-1/4 h-[460px] w-[460px] rounded-full bg-[var(--primary)]/22 blur-[130px] animate-blob pointer-events-none"
             style={{ animationDuration: '22s', animationDelay: '0s' }}>
          <div className="absolute inset-0 rounded-full bg-[var(--primary)]/15 blur-[80px]" />
          <div className="absolute inset-0 rounded-full bg-[var(--primary)]/5 blur-[40px]" />
        </div>

        {/* Premium Blob 2 - Emerald with platinum accents and inner light */}
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[var(--secondary)]/18 blur-[110px] animate-blob pointer-events-none"
             style={{ animationDuration: '20s', animationDelay: '2500ms' }}>
          <div className="absolute inset-0 rounded-full bg-[var(--secondary)]/8 blur-[60px]" />
          <div className="absolute inset-0 rounded-full bg-white/3 blur-[30px]" />
        </div>

        {/* Premium Blob 3 - Violet with inner light and sparkle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[540px] rounded-full bg-[var(--tertiary)]/15 blur-[150px] animate-blob pointer-events-none"
             style={{ animationDuration: '24s', animationDelay: '5000ms' }}>
          <div className="absolute inset-0 rounded-full bg-[var(--tertiary)]/10 blur-[90px]" />
          <div className="absolute inset-0 rounded-full bg-white/4 blur-[50px]" />
        </div>

        {/* Premium Warm Flare - Subtle gold with pulsating effect */}
        <div className="absolute top-1/3 left-1/3 h-[70px] w-[70px] rounded-full bg-[var(--secondary)]/20 blur-[70px] animate-blob pointer-events-none"
             style={{ animationDuration: '18s', animationDelay: '1000ms' }}>
          <div className="absolute inset-0 rounded-full bg-white/15 blur-[35px]" />
          <div className="absolute inset-0 rounded-full bg-white/8 blur-[18px]" />
        </div>

        {/* Premium Particle System with varied sizes and speeds */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Layer 1: Larger, slower particles */}
          <div className="absolute top-1/5 left-1/5 h-3 w-3 rounded-full bg-emerald-400/35 animate-float-slow" style={{ animationDuration: '16s', animationDelay: '0s' }} />
          <div className="absolute top-2/5 left-3/5 h-2.5 w-2.5 rounded-full bg-teal-300/30 animate-float-slow" style={{ animationDuration: '18s', animationDelay: '2000ms' }} />
          <div className="absolute top-3/5 left-2/5 h-3 w-3 rounded-full bg-cyan-400/40 animate-float-slow" style={{ animationDuration: '14s', animationDelay: '1000ms' }} />

          {/* Layer 2: Medium particles */}
          <div className="absolute top-1/4 left-2/3 h-2 w-2 rounded-full bg-emerald-400/25 animate-float" style={{ animationDuration: '12s', animationDelay: '500ms' }} />
          <div className="absolute top-3/4 left-1/4 h-1.5 w-1.5 rounded-full bg-teal-300/20 animate-float" style={{ animationDuration: '10s', animationDuration: '1500ms' }} />
          <div className="absolute top-1/3 left-1/2 h-2.5 w-2.5 rounded-full bg-cyan-400/30 animate-float" style={{ animationDuration: '11s', animationDuration: '800ms' }} />

          {/* Layer 3: Small, fast particles (sparkles) */}
          <div className="absolute top-1/6 left-1/2 h-0.5 w-0.5 rounded-full bg-white/30 animate-float" style={{ animationDuration: '6s', animationDelay: '0s' }} />
          <div className="absolute top-2/3 left-1/6 h-0.5 w-0.5 rounded-full bg-white/25 animate-float" style={{ animationDuration: '5s', animationDuration: '1000ms' }} />
          <div className="absolute top-5/6 left-5/6 h-0.5 w-0.5 rounded-full bg-white/35 animate-float" style={{ animationDuration: '7s', animationDuration: '1500ms' }} />
        </div>

        {/* Enhanced Radial scrim for legibility with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/5 pointer-events-none" style={{ opacity: '0.4' }} />

        {/* Subtle vignette for premium feel */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/0 to-black/40 pointer-events-none" />
      </div>

      {/* ── Foreground Content ───────────────────────── */}
      <div className="relative z-0 flex min-h-[90vh] items-center justify-center px-8 pt-28">
        <div className={cn(
          "neumorphism-card",
          "max-w-[960px] w-full p-16 space-y-10 text-center"
        )}>
          <div className="relative isolate">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-white/10 -z-10 pointer-events-none" />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

// We'll also export a default for convenience
export default OrbitalHeroSection;