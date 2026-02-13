import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Eye, Wifi, Activity, Shield, AlertTriangle, Clock, RefreshCw, Zap } from "lucide-react";

const liveEvents = [
  { time: "14:32:15", type: "تسريب جديد", source: "تليجرام", channel: "Gulf_Hackers_Team", severity: "عالي", description: "رصد منشور جديد يحتوي على بيانات شخصية سعودية" },
  { time: "14:28:42", type: "فحص مكتمل", source: "مواقع لصق", channel: "Pastebin.com", severity: "معلومات", description: "اكتمل فحص Pastebin — لا تسريبات جديدة" },
  { time: "14:25:08", type: "تنبيه", source: "دارك ويب", channel: "BreachForums", severity: "متوسط", description: "عرض بيع جديد لبيانات سعودية على BreachForums" },
  { time: "14:20:33", type: "تحليل AI", source: "راصد الذكي", channel: "AI Engine", severity: "معلومات", description: "تم تصنيف 15 سجل PII جديد تلقائياً" },
  { time: "14:15:19", type: "تسريب جديد", source: "تليجرام", channel: "KSA_Data_Market", severity: "عالي", description: "رصد قاعدة بيانات عملاء مطروحة للبيع" },
  { time: "14:10:55", type: "فحص مكتمل", source: "دارك ويب", channel: "XSS.is", severity: "معلومات", description: "اكتمل فحص XSS Forum — 2 منشورات جديدة" },
  { time: "14:05:27", type: "تنبيه", source: "تليجرام", channel: "Saudi_InfoStealer_Logs", severity: "عالي", description: "نشاط مكثف في قناة InfoStealer — 8 منشورات خلال ساعة" },
  { time: "14:00:44", type: "تحليل AI", source: "راصد الذكي", channel: "AI Engine", severity: "معلومات", description: "تم اكتشاف نمط تسريب متكرر من نفس المصدر" },
  { time: "13:55:12", type: "تسريب جديد", source: "مواقع لصق", channel: "Ghostbin.com", severity: "متوسط", description: "رصد لصق يحتوي على بيانات اعتماد سعودية" },
  { time: "13:50:38", type: "فحص مكتمل", source: "تليجرام", channel: "All Channels", severity: "معلومات", description: "اكتمل فحص دوري لجميع قنوات تليجرام المراقبة" }
];

const severityColors: Record<string, string> = {
  "عالي": "bg-red-500/20 text-red-400 border-r-red-500",
  "متوسط": "bg-amber-500/20 text-amber-400 border-r-amber-500",
  "معلومات": "bg-blue-500/20 text-blue-400 border-r-blue-500"
};

const sourceIcons: Record<string, string> = {
  "تليجرام": "📱",
  "دارك ويب": "🌐",
  "مواقع لصق": "📋",
  "راصد الذكي": "🤖"
};

export default function LiveMonitoring() {
  const [isLive, setIsLive] = useState(true);
  const [eventCount, setEventCount] = useState(liveEvents.length);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setEventCount(prev => prev + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <Layout title="الرصد المباشر" titleEn="Live Monitoring">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-white/5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #0d2117 50%, #0d1117 100%)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${isLive ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"}`}
            >
              {isLive ? "● مباشر" : "○ متوقف"}
            </button>
          </div>
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">الرصد المباشر</h2>
              <p className="text-xs text-gray-500">Live Monitoring Feed</p>
              <p className="text-sm text-gray-400 mt-1">تتبع الأحداث والتنبيهات في الوقت الفعلي</p>
            </div>
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <Activity size={24} className="text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center gap-2 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">32</div>
              <div className="text-sm text-gray-400">قنوات نشطة</div>
            </div>
            <Wifi size={20} className="text-green-400" />
          </div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center gap-2 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-400">{eventCount}</div>
              <div className="text-sm text-gray-400">أحداث اليوم</div>
            </div>
            <Activity size={20} className="text-teal-400" />
          </div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center gap-2 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-400">5</div>
              <div className="text-sm text-gray-400">تنبيهات عالية</div>
            </div>
            <AlertTriangle size={20} className="text-red-400" />
          </div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center gap-2 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-400">15</div>
              <div className="text-sm text-gray-400">PII مصنف تلقائياً</div>
            </div>
            <Zap size={20} className="text-amber-400" />
          </div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: "#111827" }}>
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 hover:bg-white/10">
            <RefreshCw size={12} />
            تحديث
          </button>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
            <span className="text-sm font-semibold text-white">البث المباشر</span>
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {liveEvents.map((event, i) => (
            <div key={i} className={`p-4 hover:bg-white/[0.02] transition-colors cursor-pointer border-r-2 ${
              event.severity === "عالي" ? "border-r-red-500" : event.severity === "متوسط" ? "border-r-amber-500" : "border-r-blue-500"
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    event.severity === "عالي" ? "bg-red-500/20 text-red-400" :
                    event.severity === "متوسط" ? "bg-amber-500/20 text-amber-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>{event.type}</span>
                  <span className="text-xs text-gray-500">{event.source}</span>
                  <span className="text-xs text-gray-600 font-mono">{event.time}</span>
                </div>
                <div className="text-right flex-1 mr-4">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm text-gray-200">{event.description}</span>
                    <span>{sourceIcons[event.source]}</span>
                  </div>
                  <span className="text-xs text-gray-500">{event.channel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
