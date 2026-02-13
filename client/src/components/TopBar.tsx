import { useState, useEffect } from "react";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { toast } from "sonner";

export default function TopBar({ title, titleEn }: { title: string; titleEn: string }) {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const [notificationCount] = useState(56);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("pdpl_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("pdpl_theme", "light");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("pdpl_theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-[#0d1117] border-b border-gray-200 dark:border-white/5">
      {/* Left Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-xs">●</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">نشط</span>
        </div>
      </div>

      {/* Right - Title */}
      <div className="text-right">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500">{titleEn}</p>
      </div>

      {/* Left Actions */}
      <div className="flex items-center gap-2" style={{ position: "absolute", left: "1.5rem" }}>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a href="#" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
          <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center text-xs font-bold text-teal-700 dark:text-teal-400">
            M
          </div>
        </a>

        <button
          onClick={() => toast("البحث الذكي", { description: "قريباً" })}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          title="البحث الذكي"
        >
          <Search size={18} />
        </button>

        <button
          className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          onClick={() => toast("الإشعارات", { description: `لديك ${notificationCount} إشعار جديد` })}
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
