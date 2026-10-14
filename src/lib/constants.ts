export const APP_NAME = "PSYCH Co.";
export const APP_TAGLINE = "Your mental wellness companion";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Mood Logger", href: "/mood", icon: "Heart" },
  { label: "Assessment", href: "/assessment", icon: "ClipboardList" },
  { label: "Journal", href: "/journal", icon: "BookOpen" },
  { label: "Therapists", href: "/therapists", icon: "Users" },
  { label: "Bookings", href: "/bookings", icon: "Calendar" },
  { label: "Internships", href: "/internships", icon: "GraduationCap" },
  { label: "Certificates", href: "/certificates", icon: "Award" },
  { label: "Profile", href: "/profile", icon: "User" },
] as const;

export const MOOD_LABELS: Record<number, string> = {
  1: "Distressed",
  2: "Sad",
  3: "Down",
  4: "Melancholy",
  5: "Neutral",
  6: "Calm",
  7: "Content",
  8: "Happy",
  9: "Joyful",
  10: "Euphoric",
};

export const MOOD_COLORS: Record<number, string> = {
  1: "#ef4444",
  2: "#f97316",
  3: "#eab308",
  4: "#84cc16",
  5: "#22c55e",
  6: "#10b981",
  7: "#06b6d4",
  8: "#3b82f6",
  9: "#8b5cf6",
  10: "#ec4899",
};
