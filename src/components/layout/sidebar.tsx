"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Heart,
  ClipboardList,
  BookOpen,
  Users,
  User,
  Brain,
  Sparkles,
  Calendar,
  GraduationCap,
  Award,
  Shield,
  PhoneCall,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

const iconMap = {
  LayoutDashboard,
  Heart,
  ClipboardList,
  BookOpen,
  Users,
  Calendar,
  GraduationCap,
  Award,
  User,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-sidebar fixed left-0 top-0 h-full w-64 z-40 flex flex-col justify-between py-5 px-3 bg-[#0d121d]/90 dark:bg-[#0d121d]/90 backdrop-blur-2xl border-r border-white/10 shadow-2xl">
      {/* Top Section */}
      <div className="flex flex-col gap-5">
        {/* Logo */}
        <div className="px-2 pt-1 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Brain className="h-5 w-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0d121d] animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0d121d]" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-white font-outfit leading-none">
                PSYCH Co.
              </p>
              <p className="text-[10px] text-emerald-400/90 font-medium tracking-wide uppercase mt-0.5">
                Clinical Suite
              </p>
            </div>
          </Link>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            PRO
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 mt-1" aria-label="Main navigation">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2.5 mb-2">
            Clinical Platform
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium transition-all duration-200 group min-h-[38px]",
                  isActive
                    ? "text-emerald-300 font-semibold bg-white/[0.07] border border-emerald-500/30 shadow-sm shadow-emerald-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    isActive
                      ? "text-emerald-400 scale-105"
                      : "text-slate-400 group-hover:text-white group-hover:scale-110"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: 24/7 Crisis Hotline Box */}
      <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-3 border border-red-500/25 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                24/7 Priority Desk
              </span>
            </div>
            <Shield className="h-3.5 w-3.5 text-rose-400" />
          </div>
          <p className="text-[11px] font-semibold text-white mb-0.5">Crisis Support</p>
          <p className="text-[10px] text-slate-400 mb-2 leading-tight">
            Immediate distress triage & certified counselor line.
          </p>
          <a
            href="tel:988"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-[11px] font-medium border border-rose-500/30 transition-all group"
          >
            <PhoneCall className="h-3 w-3 group-hover:scale-110 transition-transform" />
            <span>Call Hotline (988)</span>
          </a>
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <Link href="/profile" className="hover:text-white flex items-center gap-1 transition-colors">
            <HelpCircle className="h-3 w-3" />
            <span>Help</span>
          </Link>
          <Link href="/login" className="hover:text-rose-400 flex items-center gap-1 transition-colors">
            <LogOut className="h-3 w-3" />
            <span>Exit</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
