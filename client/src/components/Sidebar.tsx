import { useState } from "react";
import { Link, useLocation } from "wouter";
import { adminUser, sidebarNavigation } from "@/lib/data";
import {
  LayoutDashboard, BarChart3, Map, Bot, Shield, Send, Globe, FileText,
  Users, Eye, Fingerprint, Link2, Crosshair, ChevronDown, ChevronLeft
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={18} />,
  reports: <BarChart3 size={18} />,
  map: <Map size={18} />,
  ai: <Bot size={18} />,
  leaks: <Shield size={18} />,
  telegram: <Send size={18} />,
  darkweb: <Globe size={18} />,
  paste: <FileText size={18} />,
  vendor: <Users size={18} />,
  live: <Eye size={18} />,
  pii: <Fingerprint size={18} />,
  evidence: <Link2 size={18} />,
  hunting: <Crosshair size={18} />
};

export default function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    command: true,
    operational: true,
    advanced: true
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { key: "command", ...sidebarNavigation.command },
    { key: "operational", ...sidebarNavigation.operational },
    { key: "advanced", ...sidebarNavigation.advanced }
  ];

  return (
    <aside
      className={`fixed top-0 right-0 h-screen z-50 transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-60"
      }`}
      style={{ background: "#0d1117", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center gap-3 border-b border-white/5">
        {!collapsed && (
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-400" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
              راصد
            </div>
            <div className="text-xs text-gray-400 mt-0.5">منصة راصد</div>
            <div className="text-[10px] text-gray-500">حماية البيانات الوطنية</div>
          </div>
        )}
        {collapsed && (
          <div className="text-xl font-bold text-teal-400">ر</div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {sections.map((section) => (
          <div key={section.key} className="mb-1">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              {!collapsed && (
                <>
                  <span className="flex items-center gap-2">
                    <span>{section.label}</span>
                    <span className="text-[10px] text-gray-600">{section.labelEn}</span>
                  </span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${openSections[section.key] ? "rotate-0" : "-rotate-90"}`}
                  />
                </>
              )}
            </button>

            {(openSections[section.key] || collapsed) && (
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      <span className={isActive ? "text-teal-400" : "text-gray-500"}>
                        {iconMap[item.icon]}
                      </span>
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-white/5">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {adminUser.avatar}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-200 truncate">{adminUser.name}</div>
              <div className="text-xs text-gray-500 truncate">{adminUser.role}</div>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-1/2 -left-3 w-6 h-6 bg-gray-800 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft size={12} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
      </button>
    </aside>
  );
}
