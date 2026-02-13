import { useState } from "react";
import Layout from "@/components/Layout";
import { Bot, Send, Volume2, VolumeX, Save, Download, History, Plus, BarChart3, AlertTriangle, Link2, Shield, Users, Map, FileText, Crosshair, ChevronLeft } from "lucide-react";

const capabilities = [
  { name: "تحليل لوحة القيادة", desc: "إحصائيات وتقارير شاملة", icon: <BarChart3 size={16} /> },
  { name: "البحث في التسريبات", desc: "بحث متقدم بكل الفلاتر", icon: <Shield size={16} /> },
  { name: "حماية البيانات", desc: "نظام PDPL والتوصيات", icon: <Shield size={16} /> },
  { name: "الدارك ويب واللصق", desc: "رصد المصادر المظلمة", icon: <AlertTriangle size={16} /> },
  { name: "البائعون والتهديدات", desc: "ملفات تعريف المهددين", icon: <Users size={16} /> },
  { name: "تحليل الارتباطات", desc: "ربط البيانات واكتشاف الأنماط", icon: <Link2 size={16} /> },
  { name: "مراقبة الأنشطة", desc: "تتبع نشاط الموظفين", icon: <Users size={16} /> },
  { name: "قاعدة المعرفة", desc: "مقالات وسياسات وإرشادات", icon: <FileText size={16} /> },
  { name: "إدارة الملفات", desc: "جلب التقارير والمستندات", icon: <FileText size={16} /> },
  { name: "رسم المعرفة", desc: "شبكة العلاقات والروابط", icon: <Link2 size={16} /> },
  { name: "المراقبة والتنبيهات", desc: "حالة مهام الرصد", icon: <Shield size={16} /> },
  { name: "تحليل الاتجاهات", desc: "أنماط زمنية وتوزيعات", icon: <BarChart3 size={16} /> },
  { name: "صيد التهديدات", desc: "قواعد YARA-like", icon: <Crosshair size={16} /> },
  { name: "سلسلة الأدلة", desc: "توثيق وحفظ الأدلة", icon: <Link2 size={16} /> },
  { name: "الشخصية التفاعلية", desc: "ترحيب ذكي واحترام القادة", icon: <Bot size={16} /> }
];

const quickCommands = [
  "ملخص لوحة المعلومات",
  "تسريبات واسعة النطاق",
  "تحليل ارتباطات",
  "حالة الحماية",
  "نشاط المستخدمين",
  "خريطة التهديدات",
  "التقارير والمستندات",
  "قواعد الكشف"
];

const tabs = ["RASID", "تنفيذي", "تحليلات", "مراجعة", "معرفة", "ملفات", "شخصية"];

export default function SmartRasid() {
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  return (
    <Layout title="راصد الذكي" titleEn="Smart Rasid">
      {/* Top Bar */}
      <div className="rounded-xl p-4 mb-4 border border-white/5 flex items-center justify-between" style={{ background: "#111827" }}>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-teal-500/20 text-teal-400 rounded-lg text-xs hover:bg-teal-500/30">
            <Plus size={12} />
            NEW_SESSION
          </button>
          <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400" title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}>
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400" title="حفظ المحادثة">
            <Save size={16} />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400" title="تصدير المحادثة">
            <Download size={16} />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400" title="سجل المحادثات">
            <History size={16} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">26 أداة</span>
          <span className="text-xs text-gray-500">|</span>
          <span className="flex items-center gap-1 text-xs text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            ONLINE
          </span>
          <span className="text-xs text-gray-500">SMART_RASID // 26 TOOLS · 7 AGENTS · ACTIVE</span>
          <span className="text-sm font-bold text-teal-400">راصد الذكي</span>
          <span className="text-xs text-gray-500 bg-teal-500/10 px-2 py-0.5 rounded">v6.0</span>
        </div>
      </div>

      {/* Quick Commands Scrollbar */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => setMessage(cmd)}
            className="flex-shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:bg-white/10 hover:border-teal-500/30 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: "#111827" }}>
        {/* AI Avatar & Info */}
        <div className="p-8 text-center border-b border-white/5" style={{ background: "linear-gradient(180deg, #0d1117 0%, #111827 100%)" }}>
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-2 border-teal-500/30 flex items-center justify-center mx-auto">
              <Bot size={40} className="text-teal-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#111827] flex items-center justify-center">
              <span className="text-[8px] text-white">✓</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">راصد الذكي</h2>
          <p className="text-xs text-gray-500 mb-2">_ SMART RASID AI ASSISTANT _</p>
          <p className="text-sm text-gray-400 mb-4">كبير محللي حماية البيانات الشخصية — يحلل، يستنتج، يربط، وينفذ</p>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {tabs.map((tab, i) => (
              <span key={tab} className={`text-xs px-3 py-1 rounded-full ${i === 0 ? "bg-teal-500/20 text-teal-400" : "text-gray-500 hover:text-gray-300"} cursor-pointer transition-colors`}>
                {tab}
              </span>
            ))}
          </div>

          {/* Capabilities Grid */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm font-semibold text-white">قدرات راصد الذكي</span>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">26 TOOLS · 7 AGENTS</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {capabilities.slice(0, 15).map((cap) => (
                <div key={cap.name} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-teal-500/20 transition-colors cursor-pointer text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <span className="text-xs font-medium text-gray-200">{cap.name}</span>
                    <span className="text-gray-500">{cap.icon}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-white/5">
          <p className="text-xs text-gray-500 text-center mb-3">// ابدأ بأحد هذه الأوامر أو اكتب أي سؤال</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {quickCommands.slice(0, 4).map((cmd) => (
              <button
                key={cmd}
                onClick={() => setMessage(cmd)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-teal-500/10 hover:border-teal-500/30 hover:text-teal-400 transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-teal-400 text-sm font-mono">{">_"}</span>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=""
              className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim()) {
                  setMessage("");
                }
              }}
            />
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>SMART_RASID v6.0 // 26 TOOLS · 7 AGENTS</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-gray-600">Enter ↵ · Shift+Enter ⏎</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
