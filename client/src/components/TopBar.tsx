import { useState } from "react";
import { Search, Bell, Sun, Moon, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../contexts/ThemeContext";

export default function TopBar({ title, titleEn }: { title: string; titleEn: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [notificationCount] = useState(16);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border relative">
      {/* Right - Title & Status */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">{titleEn}</p>
        </div>
      </div>

      {/* Center - Live Status & Refresh */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-accent text-sm text-foreground transition-colors"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          <span>تحديث</span>
        </button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>آخر تحديث: الآن</span>
          <span className="text-muted-foreground">·</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">مباشر</span>
        </div>
      </div>

      {/* Left Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => toast("البحث الذكي", { description: "ابحث في جميع البيانات والتسريبات" })}
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="البحث الذكي"
        >
          <Search size={18} />
        </button>

        <button
          className="relative p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => toast("الإشعارات", { description: `لديك ${notificationCount} إشعار جديد` })}
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {notificationCount}
            </span>
          )}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a href="#" className="p-2 rounded-lg hover:bg-accent transition-colors">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
            M
          </div>
        </a>
      </div>
    </header>
  );
}
