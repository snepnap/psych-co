"use client";

import { useState } from "react";
import { AlertTriangle, PhoneCall, X } from "lucide-react";

export function CrisisBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Crisis Support Helpline" className="bg-[#114B43] text-white py-2 px-4 text-xs sm:text-sm border-b border-[#185e54] relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-200 shrink-0">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
            Immediate Crisis Support:
          </span>
          <span className="text-white/90 shrink-0">
            Our sessions are not an emergency service. In a crisis, call{" "}
            <a
              href="tel:14416"
              className="underline font-bold text-amber-300 hover:text-amber-200 inline-flex items-center gap-1 ml-1"
            >
              <PhoneCall className="h-3 w-3 inline" />
              Tele-MANAS (14416)
            </a>{" "}
            or{" "}
            <a
              href="tel:112"
              className="underline font-bold text-amber-300 hover:text-amber-200"
            >
              112
            </a>
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white p-1 rounded transition-colors shrink-0"
          aria-label="Dismiss crisis banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
