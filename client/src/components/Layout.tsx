import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  titleEn: string;
}

export default function Layout({ children, title, titleEn }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f5f6fa] dark:bg-[#0a0f1e]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? "mr-16" : "mr-60"}`}>
        <TopBar title={title} titleEn={titleEn} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
