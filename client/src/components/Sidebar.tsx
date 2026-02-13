import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, BarChart3, Map, Brain, Shield, Send, Globe, FileText, Users, Eye,
  Fingerprint, Link2, Crosshair, ChevronDown, ChevronLeft,
  Wrench, Network, Target, ClipboardList, Bell, Calendar, CheckCircle, Settings
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavSection {
  title: string;
  titleEn: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "قيادي",
    titleEn: "Command",
    icon: <LayoutDashboard size={14} />,
    items: [
      { label: "لوحة القيادة", icon: <LayoutDashboard size={16} />, path: "/" },
      { label: "التقارير", icon: <BarChart3 size={16} />, path: "/reports" },
      { label: "خريطة التهديدات", icon: <Map size={16} />, path: "/threat-map" },
      { label: "راصد الذكي", icon: <Brain size={16} />, path: "/smart-rasid" },
    ]
  },
  {
    title: "أدوات الرصد",
    titleEn: "Monitoring Tools",
    icon: <Shield size={14} />,
    items: [
      { label: "التسريبات", icon: <Shield size={16} />, path: "/leaks" },
      { label: "رصد تليجرام", icon: <Send size={16} />, path: "/telegram" },
      { label: "الدارك ويب", icon: <Globe size={16} />, path: "/darkweb" },
      { label: "مواقع اللصق", icon: <FileText size={16} />, path: "/paste-sites" },
      { label: "ملفات البائعين", icon: <Users size={16} />, path: "/vendor-files" },
      { label: "الرصد المباشر", icon: <Eye size={16} />, path: "/live-monitoring" },
    ]
  },
  {
    title: "تنفيذي",
    titleEn: "Operational",
    icon: <Target size={14} />,
    items: [
      { label: "مصنّف PII", icon: <Fingerprint size={16} />, path: "/pii-classifier" },
      { label: "سلسلة الأدلة", icon: <Link2 size={16} />, path: "/evidence-chain" },
      { label: "قواعد صيد التهديدات", icon: <Crosshair size={16} />, path: "/threat-hunting" },
    ]
  },
  {
    title: "متقدم",
    titleEn: "Advanced",
    icon: <Wrench size={14} />,
    items: [
      { label: "أدوات OSINT", icon: <Wrench size={16} />, path: "/osint-tools" },
      { label: "رسم المعرفة", icon: <Network size={16} />, path: "/knowledge-graph" },
      { label: "مقاييس الدقة", icon: <Target size={16} />, path: "/accuracy-metrics" },
    ]
  },
  {
    title: "النظام",
    titleEn: "System",
    icon: <Settings size={14} />,
    items: [
      { label: "مهام الرصد", icon: <ClipboardList size={16} />, path: "/monitoring-tasks" },
      { label: "قنوات التنبيه", icon: <Bell size={16} />, path: "/alert-channels" },
      { label: "التقارير المجدولة", icon: <Calendar size={16} />, path: "/scheduled-reports" },
      { label: "التحقق من التوثيق", icon: <CheckCircle size={16} />, path: "/verification" },
    ]
  }
];

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const [location] = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "قيادي": true,
    "أدوات الرصد": false,
    "تنفيذي": false,
    "متقدم": false,
    "النظام": false,
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // Auto-open section containing active route
  const getActiveSection = () => {
    for (const section of navSections) {
      for (const item of section.items) {
        if (location === item.path) return section.title;
      }
    }
    return null;
  };

  const activeSection = getActiveSection();

  return (
    <aside className={`fixed top-0 right-0 h-screen bg-card border-l border-border flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-16" : "w-60"}`}>
      {/* Logo */}
      <div className="p-4 border-b border-border">
        {!collapsed ? (
          <div className="text-center relative">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-green-500 pulse-dot" />
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663296955420/tSiomIdoNdNFAtOB.png" 
              alt="منصة راصد" 
              className="h-16 mx-auto" 
            />
          </div>
        ) : (
          <div className="text-center relative">
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-500 pulse-dot" />
            <span className="text-xl font-black bg-gradient-to-l from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent" style={{ fontFamily: "serif" }}>ر</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navSections.map((section) => {
          const isOpen = openSections[section.title] || (activeSection === section.title);
          return (
            <div key={section.title} className="mb-1">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors rounded"
              >
                {!collapsed && (
                  <>
                    <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`} />
                    <div className="flex items-center gap-1.5 mr-auto">
                      <span className="text-[10px] text-muted-foreground/60">{section.titleEn}</span>
                      <span className={activeSection === section.title ? "text-primary font-medium" : ""}>{section.title}</span>
                      <span className={activeSection === section.title ? "text-primary" : ""}>{section.icon}</span>
                    </div>
                  </>
                )}
              </button>

              {(isOpen || collapsed) && (
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = location === item.path;
                    return (
                      <Link key={item.path} href={item.path}>
                        <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        } ${collapsed ? "justify-center" : "justify-end"}`}
                        >
                          {!collapsed && <span className="truncate">{item.label}</span>}
                          <span className={isActive ? "text-primary" : ""}>
                            {item.icon}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Info at Bottom */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2 justify-end">
            <div className="text-right">
              <p className="text-xs font-medium text-foreground">Muhammed ALRuhaily</p>
              <p className="text-[10px] text-muted-foreground">شبكي (مسؤول)</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400">
              M
            </div>
          </div>
        </div>
      )}

      {/* Collapse Button */}
      <button
        onClick={onToggle}
        className="absolute bottom-4 -left-3 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm"
      >
        <ChevronLeft size={12} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
      </button>
    </aside>
  );
}
