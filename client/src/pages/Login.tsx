import { useState } from "react";
import { Lock, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useTheme } from "../contexts/ThemeContext";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663296955420/tSiomIdoNdNFAtOB.png";
const CHARACTER_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663296955420/qoUheMlVnqPiZdQe.png";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" dir="rtl">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 left-6 z-10 p-2.5 rounded-full bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Character Image */}
      <img
        src={CHARACTER_URL}
        alt="راصد"
        className="absolute bottom-0 right-0 w-48 h-auto opacity-20 pointer-events-none select-none"
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
              background: isDark
                ? `rgba(20, 184, 166, ${0.15 + Math.random() * 0.25})`
                : `rgba(99, 102, 241, ${0.15 + Math.random() * 0.25})`,
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

        <p className="text-sm text-muted-foreground mb-6">منصة رصد تسريبات البيانات الشخصية</p>

        {/* Login Card */}
        <div className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border p-8 relative">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-foreground">تسجيل الدخول</h2>
            <Lock size={20} className="text-muted-foreground" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 text-right">اسم المستخدم</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 text-right">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-3 pr-4 pl-12 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right"
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button type="button" className="text-sm text-primary hover:text-primary/80">
                نسيت كلمة المرور؟
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-muted-foreground">تذكرني</span>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl bg-gradient-to-l from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary"
            >
              <span>{loading ? "جاري التحقق..." : "دخول"}</span>
              <Lock size={16} />
            </button>
          </form>
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-center max-w-md leading-relaxed">
          هذا النظام مخصص للمستخدمين المصرح لهم فقط. أي محاولة وصول غير مصرح بها ستتم مراقبتها وتسجيلها.
        </p>

        <p className="text-xs text-muted-foreground mt-4">
          مكتب إدارة البيانات الوطنية — منصة راصد
        </p>
      </div>
    </div>
  );
}
