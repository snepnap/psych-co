"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = "Dashboard", subtitle }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex h-16 items-center gap-4 glass border-b border-border/50 px-6"
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-bold font-outfit truncate text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>

      {/* Search */}
      <div className="relative hidden md:flex items-center w-64">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          id="header-search"
          placeholder="Search..."
          className="pl-9 h-9 bg-muted/50 border-border/50 focus-visible:ring-1"
          aria-label="Search the platform"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
        </Button>

        {/* User nav */}
        <button
          className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-accent/50 transition-colors duration-200 min-h-[44px] group"
          aria-label="Open user menu"
          aria-haspopup="true"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden sm:block">User</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:rotate-180 transition-transform duration-200" />
        </button>
      </div>
    </motion.header>
  );
}
