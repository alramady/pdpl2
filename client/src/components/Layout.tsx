import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  titleEn: string;
}

export default function Layout({ children, title, titleEn }: LayoutProps) {
  return (
    <div className="min-h-screen flex" style={{ background: "#0a0f1e" }}>
      <Sidebar />
      <div className="flex-1 mr-60 flex flex-col min-h-screen">
        <TopBar title={title} titleEn={titleEn} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
