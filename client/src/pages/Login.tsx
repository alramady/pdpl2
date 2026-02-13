import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663296955420/tSiomIdoNdNFAtOB.png";
const CHARACTER_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663296955420/qoUheMlVnqPiZdQe.png";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pdpl_theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Redirect to OAuth login
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#0a0f1e] relative overflow-hidden" dir="rtl">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 left-6 z-10 p-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Character Image */}
      <img
        src={CHARACTER_URL}
        alt="راصد"
        className="absolute bottom-0 right-0 w-48 h-auto opacity-30 pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />

      {/* Floating Dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              top: `${15 + Math.random() * 40}%`,
              right: `${30 + Math.random() * 40}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `rgba(99, 102, 241, ${0.15 + Math.random() * 0.25})`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
        {/* Logo */}
        <div className="mb-4">
          <img src={LOGO_URL} alt="منصة راصد" className="h-28 mx-auto" />
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">منصة رصد تسريبات البيانات الشخصية</p>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white dark:bg-[#111827] rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 p-8 relative">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">تسجيل الدخول</h2>
            <Lock size={20} className="text-gray-500 dark:text-gray-400" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">اسم المستخدم</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 transition-all text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-3 pr-4 pl-12 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 transition-all text-right"
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button type="button" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                نسيت كلمة المرور؟
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-600 dark:text-gray-400">تذكرني</span>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)" }}
            >
              <span>{loading ? "جاري التحقق..." : "دخول"}</span>
              <Lock size={16} />
            </button>
          </form>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center max-w-md leading-relaxed">
          هذا النظام مخصص للمستخدمين المصرح لهم فقط. أي محاولة وصول غير مصرح بها ستتم مراقبتها وتسجيلها.
        </p>

        <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
          مكتب إدارة البيانات الوطنية — منصة راصد
        </p>
      </div>
    </div>
  );
}
