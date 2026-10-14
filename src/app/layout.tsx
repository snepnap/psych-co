import type { Metadata } from "next";
import { Inter, Outfit, Open_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/query-provider";
import { CrisisBanner } from "@/components/shared/CrisisBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Psych Co. — Learn Psychology the Practical Way",
  description:
    "The Psych Co. offers online psychology internships, certification courses and psychotherapy with an RCI-registered Clinical Psychologist, for students and professionals.",
  keywords: [
    "Psychology internships online",
    "Clinical psychology certification",
    "RCI registered clinical psychologist",
    "Psychotherapy online India",
    "CBT certification",
    "Rorschach course",
    "MSE training",
    "The Psych Co",
  ],
  authors: [{ name: "The Psych Co." }],
  openGraph: {
    title: "The Psych Co. — Learn Psychology the Practical Way",
    description:
      "Online internships, certification courses and psychotherapy, led by an RCI-registered Clinical Psychologist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${newsreader.variable} font-inter antialiased bg-background min-h-screen flex flex-col overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <CrisisBanner />
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}