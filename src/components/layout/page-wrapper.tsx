import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageWrapper({ children, title, subtitle }: PageWrapperProps) {
  return (
    <div className="flex min-h-screen bg-background mesh-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-64">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 p-6 overflow-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
