import { useState } from "react";
import { Search, Bell, Sun, Moon, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function TopBar({ title, titleEn }: { title: string; titleEn: string }) {
  const [isDark, setIsDark] = useState(true);
  const [notificationCount] = useState(46);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-white/5" style={{ background: "rgba(10,15,30,0.8)", backdropFilter: "blur(10px)" }}>
      {/* Page Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs">●</span>
          <span className="text-xs text-gray-400">نشط</span>
        </div>
      </div>

      {/* Center - Title */}
      <div className="text-center">
        <h1 className="text-lg font-semibold text-gray-100">{title}</h1>
        <p className="text-xs text-gray-500">{titleEn}</p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => toast("البحث الذكي", { description: "قريباً" })}
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          title="البحث الذكي"
        >
          <Search size={18} />
        </button>

        <button
          className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          onClick={() => toast("الإشعارات", { description: `لديك ${notificationCount} إشعار جديد` })}
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setIsDark(!isDark);
            toast(isDark ? "الوضع الفاتح" : "الوضع الداكن", { description: "تم تغيير المظهر" });
          }}
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
