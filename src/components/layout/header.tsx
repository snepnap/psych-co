"use client";

import { Bell, Search, Video, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = "Dashboard", subtitle }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 bg-[#0d121d]/85 dark:bg-[#0d121d]/85 backdrop-blur-2xl border-b border-white/10 px-6 shadow-sm"
    >
      {/* Page title & breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <div>
          <h1 className="text-lg font-bold font-outfit tracking-tight text-white truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-400 truncate hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="relative hidden lg:flex items-center w-80">
        <Search className="absolute left-3.5 h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        <input
          id="header-search"
          type="text"
          placeholder="Search records, symptoms, therapists... [⌘K]"
          className="w-full bg-slate-900/60 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all"
          aria-label="Search clinical platform"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Emergency SOS Badge */}
        <a
          href="tel:988"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 transition-all text-xs font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
          <span>Emergency Line</span>
        </a>

        {/* Telehealth Quick Action */}
        <Link
          href="/therapists"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all transform hover:-translate-y-0.5"
        >
          <Video className="h-3.5 w-3.5" />
          <span>Tele-Health</span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800"
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        </Button>

        {/* Authenticated Profile Capsule */}
        <Link
          href="/profile"
          className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 transition-all shadow-sm group"
        >
          <Avatar className="h-7 w-7 ring-1 ring-emerald-400/50">
            <AvatarImage
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Julian Vance"
            />
            <AvatarFallback className="bg-emerald-600 text-white text-[10px]">JV</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-white leading-tight">Julian Vance</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Week 6 • Active
            </span>
          </div>
        </Link>
      </div>
    </motion.header>
  );
}
