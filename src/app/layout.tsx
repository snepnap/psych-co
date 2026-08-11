import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PSYCH Co. | Mental Wellness Platform",
    template: "%s | PSYCH Co.",
  },
  description:
    "Your comprehensive mental wellness companion — track mood, complete assessments, journal your thoughts, and connect with specialists.",
  keywords: [
    "mental health",
    "psychology",
    "mood tracker",
    "wellness",
    "therapy",
    "mental wellness",
  ],
  authors: [{ name: "PSYCH Co." }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "PSYCH Co. | Mental Wellness Platform",
    description: "Your comprehensive mental wellness companion.",
    siteName: "PSYCH Co.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
