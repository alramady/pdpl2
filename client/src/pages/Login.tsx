import { useState } from "react";
import { useLocation } from "wouter";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [, setLocation] = useLocation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (userId === "MRUHAILY" && password === "15001500") {
        toast.success("تم تسجيل الدخول بنجاح", { description: "مرحباً Admin Rasid System" });
        onLogin();
        setLocation("/");
      } else {
        toast.error("خطأ في تسجيل الدخول", { description: "تأكد من اسم المستخدم وكلمة المرور" });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1117 50%, #0a0f1e 100%)" }}>
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-4">
            <Shield size={40} className="text-teal-400" />
          </div>
          <h1 className="text-3xl font-bold text-teal-400 mb-1" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
            راصد
          </h1>
          <p className="text-sm text-gray-400">منصة رصد تسريبات البيانات الشخصية</p>
          <p className="text-xs text-gray-600 mt-1">NDMO Personal Data Leak Monitoring Platform</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="rounded-xl p-6 border border-white/5" style={{ background: "#111827" }}>
            <h2 className="text-lg font-semibold text-white mb-4 text-center">تسجيل الدخول</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">معرّف المستخدم</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="User ID"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-teal-500/50 text-left"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 pl-10 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-teal-500/50 text-left"
                    dir="ltr"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "جاري التحقق..." : "دخول"}
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-600">© 2026 NDMO — جميع الحقوق محفوظة</p>
          <p className="text-[10px] text-gray-700 mt-1">الهيئة السعودية للبيانات والذكاء الاصطناعي — سدايا</p>
        </div>
      </div>
    </div>
  );
}
