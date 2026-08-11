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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, APP_NAME } from "@/lib/constants";

const iconMap = {
  LayoutDashboard,
  Heart,
  ClipboardList,
  BookOpen,
  Users,
  User,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-sidebar fixed left-0 top-0 h-full w-64 z-40 flex flex-col py-6 px-4">
      {/* Logo */}
      <div className="px-3 mb-8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg glow-primary">
            <Brain className="h-5 w-5 text-white" />
            <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-secondary border-2 border-background">
              <Sparkles className="h-1.5 w-1.5 text-white m-auto mt-[1px]" />
            </div>
          </div>
          <div>
            <p className="text-base font-bold gradient-text font-outfit leading-none">
              PSYCH Co.
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Wellness Platform
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1" aria-label="Main navigation">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-3">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group min-h-[44px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/15 to-secondary/10 border border-primary/20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">
                <Icon
                  className={cn(
                    "h-4.5 w-4.5 transition-transform duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
                  )}
                  aria-hidden="true"
                />
              </span>
              <span className="relative z-10">{item.label}</span>
              {isActive && (
                <div className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="pt-4 border-t border-border/50">
        <div className="glass-card rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold text-foreground">Daily Tip</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Take 5 deep breaths to reset your nervous system.
          </p>
        </div>
      </div>
    </aside>
  );
}
