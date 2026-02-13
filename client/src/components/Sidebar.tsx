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
    title: "تنفيذي",
    titleEn: "Operational",
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
    title: "متقدم",
    titleEn: "Advanced",
    icon: <Target size={14} />,
    items: [
      { label: "مصنّف PII", icon: <Fingerprint size={16} />, path: "/pii-classifier" },
      { label: "سلسلة الأدلة", icon: <Link2 size={16} />, path: "/evidence-chain" },
      { label: "قواعد صيد التهديدات", icon: <Crosshair size={16} />, path: "/threat-hunting" },
      { label: "أدوات OSINT", icon: <Wrench size={16} />, path: "/osint-tools" },
      { label: "رسم المعرفة", icon: <Network size={16} />, path: "/knowledge-graph" },
      { label: "مقاييس الدقة", icon: <Target size={16} />, path: "/accuracy-metrics" },
    ]
  },
  {
    title: "إداري",
    titleEn: "Management",
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
    "تنفيذي": true,
    "متقدم": true,
    "إداري": true,
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className={`fixed top-0 right-0 h-screen bg-white dark:bg-[#0d1117] border-l border-gray-200 dark:border-white/5 flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-16" : "w-60"}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-100 dark:border-white/5">
        {!collapsed ? (
          <div className="text-center relative">
            {/* Green dot indicator */}
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-500" />
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663296955420/tSiomIdoNdNFAtOB.png" alt="منصة راصد - مكتب إدارة البيانات الوطنية" className="h-16 mx-auto" />
          </div>
        ) : (
          <div className="text-center relative">
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xl font-black bg-gradient-to-l from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent" style={{ fontFamily: "serif" }}>ر</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 scrollbar-thin">
        {navSections.map((section) => (
          <div key={section.title} className="mb-1">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {!collapsed && (
                <>
                  <ChevronDown size={12} className={`transition-transform ${openSections[section.title] ? "" : "-rotate-90"}`} />
                  <div className="flex items-center gap-1.5 mr-auto">
                    <span className="text-[10px] text-gray-400 dark:text-gray-600">{section.titleEn}</span>
                    <span>{section.title}</span>
                    {section.icon}
                  </div>
                </>
              )}
            </button>

            {(openSections[section.title] || collapsed) && (
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <Link key={item.path} href={item.path}>
                      <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                        isActive
                          ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-gray-200"
                      } ${collapsed ? "justify-center" : "justify-end"}`}
                      >
                        {!collapsed && <span className="truncate">{item.label}</span>}
                        <span className={isActive ? "text-teal-600 dark:text-teal-400" : "text-gray-400 dark:text-gray-500"}>
                          {item.icon}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Info at Bottom */}
      {!collapsed && (
        <div className="p-3 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 justify-end">
            <div className="text-right">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-200">ALRuhaily</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">مكتب إدارة البيانات الوطنية</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-400">
              M
            </div>
          </div>
        </div>
      )}

      {/* Collapse Button */}
      <button
        onClick={onToggle}
        className="absolute bottom-4 -left-3 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors shadow-sm"
      >
        <ChevronLeft size={12} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
      </button>
    </aside>
  );
}
