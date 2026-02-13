import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Activity, Wifi, WifiOff, Clock, AlertTriangle, X, Zap, RefreshCw } from "lucide-react";

interface LogEntry {
  id: number;
  timestamp: string;
  source: string;
  type: string;
  message: string;
  severity: string;
  details: string;
  channel: string;
}

const severityColors: Record<string, string> = {
  "حرج": "bg-red-100 text-red-700",
  "عالي": "bg-orange-100 text-orange-700",
  "متوسط": "bg-amber-100 text-amber-700",
  "منخفض": "bg-green-100 text-green-700",
  "معلومات": "bg-blue-100 text-blue-700",
};

const sourceIcons: Record<string, string> = {
  "تليجرام": "📱",
  "دارك ويب": "🌐",
  "مواقع لصق": "📋",
  "منتديات": "💬",
  "النظام": "⚙️",
  "راصد الذكي": "🤖",
};

const initialLogs: LogEntry[] = [
  { id: 1, timestamp: new Date().toISOString(), source: "تليجرام", type: "تسريب جديد", channel: "Gulf_Hackers_Team", message: "رصد منشور جديد يحتوي على بيانات شخصية سعودية — 5,200 عنوان بريد", severity: "حرج", details: "تم رصد نشر قائمة بريد إلكتروني تحتوي على 5,200 عنوان بريد حكومي سعودي على قناة تليجرام. القائمة تشمل عناوين من وزارات متعددة." },
  { id: 2, timestamp: new Date(Date.now() - 60000).toISOString(), source: "دارك ويب", type: "عرض بيع", channel: "BreachForums", message: "عرض بيع قاعدة بيانات عملاء بنك سعودي — 120,000 سجل", severity: "حرج", details: "تم رصد إعلان على BreachForums لبيع قاعدة بيانات تحتوي على 120,000 سجل عميل لبنك سعودي. السعر المطلوب 5,000 دولار." },
  { id: 3, timestamp: new Date(Date.now() - 120000).toISOString(), source: "مواقع لصق", type: "تسريب جديد", channel: "Pastebin.com", message: "نشر أرقام هوية وطنية على Pastebin — 3,400 رقم", severity: "عالي", details: "تم اكتشاف نشر 3,400 رقم هوية وطنية سعودية على Pastebin مع أرقام هواتف مرتبطة." },
  { id: 4, timestamp: new Date(Date.now() - 180000).toISOString(), source: "النظام", type: "فحص مكتمل", channel: "All Sources", message: "اكتمال فحص دوري — 12 مصدر", severity: "معلومات", details: "تم إكمال الفحص الدوري لجميع المصادر المراقبة (12 مصدر). لم يتم اكتشاف تسريبات جديدة في هذا الفحص." },
  { id: 5, timestamp: new Date(Date.now() - 240000).toISOString(), source: "تليجرام", type: "نشاط مشبوه", channel: "KSA_Data_Market", message: "نشاط مشبوه في قناة KSA_Data_Market — عرض بيع جديد", severity: "متوسط", details: "تم رصد نشاط متزايد في قناة KSA_Data_Market على تليجرام. تم نشر 3 رسائل تشير إلى بيع بيانات عملاء." },
  { id: 6, timestamp: new Date(Date.now() - 300000).toISOString(), source: "منتديات", type: "ثغرة", channel: "XSS.is", message: "نشر ثغرة XSS في موقع حكومي سعودي", severity: "عالي", details: "تم نشر تفاصيل ثغرة XSS في موقع حكومي سعودي على منتدى XSS Forum." },
  { id: 7, timestamp: new Date(Date.now() - 360000).toISOString(), source: "راصد الذكي", type: "تحليل AI", channel: "AI Engine", message: "تم تصنيف 15 سجل PII جديد تلقائياً", severity: "معلومات", details: "محرك الذكاء الاصطناعي صنّف 15 سجل بيانات شخصية جديد من مصادر متعددة." },
  { id: 8, timestamp: new Date(Date.now() - 420000).toISOString(), source: "دارك ويب", type: "تسريب جديد", channel: "BreachForums", message: "تسريب بيانات اعتماد VPN لشركة سعودية — 850 سجل", severity: "حرج", details: "تم تسريب 850 بيانات اعتماد VPN لشركة اتصالات سعودية كبرى." },
];

const newMessages = [
  "اكتشاف بيانات شخصية مسربة جديدة — أرقام هوية وطنية",
  "رصد نشاط مشبوه في قناة مراقبة جديدة",
  "اكتمال فحص مصدر جديد — لا تسريبات",
  "تحديث حالة حادثة — تم التوثيق",
  "رصد عرض بيع بيانات سعودية — قطاع الصحة",
  "اكتشاف ثغرة أمنية جديدة في تطبيق حكومي",
  "تم تصنيف 8 سجلات PII جديدة تلقائياً",
  "رصد نشاط في قناة Gulf_Hackers_Team",
];

export default function LiveMonitoring() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [isLive, setIsLive] = useState(true);
  const [selected, setSelected] = useState<LogEntry | null>(null);

  useEffect(() => {
    if (!isLive) return;
    const sources = Object.keys(sourceIcons);
    const types = ["تسريب جديد", "عرض بيع", "نشاط مشبوه", "فحص مكتمل", "تنبيه", "تحليل AI"];
    const severities = ["حرج", "عالي", "متوسط", "منخفض", "معلومات"];
    const channels = ["Gulf_Hackers_Team", "BreachForums", "Pastebin.com", "KSA_Data_Market", "XSS.is", "AI Engine"];

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        source: sources[Math.floor(Math.random() * sources.length)],
        type: types[Math.floor(Math.random() * types.length)],
        channel: channels[Math.floor(Math.random() * channels.length)],
        message: newMessages[Math.floor(Math.random() * newMessages.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        details: "تفاصيل إضافية حول هذا الحدث. يتم تحديث البيانات في الوقت الفعلي من مصادر متعددة.",
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 5000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <Layout title="الرصد المباشر" titleEn="Live Monitoring">
      {/* Header */}
      <div className="rounded-xl p-5 mb-6 bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsLive(!isLive)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isLive ? "bg-green-100 text-green-700 border border-green-200" : "bg-secondary text-muted-foreground border border-border"}`}>
              {isLive ? <Wifi size={14} /> : <WifiOff size={14} />}
              {isLive ? "● مباشر" : "○ متوقف"}
            </button>
            {isLive && <span className="flex items-center gap-1 text-xs text-green-600"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> يتم التحديث كل 5 ثوانٍ</span>}
          </div>
          <div className="text-right flex items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 justify-end">الرصد المباشر <Activity size={20} className="text-green-500" /></h2>
              <p className="text-sm text-muted-foreground">تتبع الأحداث والتنبيهات في الوقت الفعلي</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-teal-600">{logs.length}</div>
          <div className="text-sm text-muted-foreground">أحداث مسجلة</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-red-600">{logs.filter(l => l.severity === "حرج").length}</div>
          <div className="text-sm text-muted-foreground">حرجة</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-orange-600">{logs.filter(l => l.severity === "عالي").length}</div>
          <div className="text-sm text-muted-foreground">عالية</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-green-600">{logs.filter(l => l.severity === "معلومات").length}</div>
          <div className="text-sm text-muted-foreground">معلومات</div>
        </div>
      </div>

      {/* Log Stream */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <button onClick={() => setLogs(initialLogs)} className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-xs text-muted-foreground hover:bg-gray-200"><RefreshCw size={12} /> تحديث</button>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            <span className="text-sm font-semibold text-foreground">البث المباشر</span>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {logs.map((log) => (
            <div key={log.id} onClick={() => setSelected(log)} className={`p-4 hover:bg-secondary transition-colors cursor-pointer border-r-2 ${
              log.severity === "حرج" ? "border-r-red-500" : log.severity === "عالي" ? "border-r-orange-500" : log.severity === "متوسط" ? "border-r-amber-500" : "border-r-blue-500"
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded ${severityColors[log.severity] || "bg-secondary text-muted-foreground"}`}>{log.type}</span>
                  <span className="text-xs text-muted-foreground">{log.source}</span>
                  <span className="text-xs text-muted-foreground font-mono">{new Date(log.timestamp).toLocaleTimeString("ar-SA")}</span>
                </div>
                <div className="text-right flex-1 mr-4">
                  <span className="text-sm text-foreground">{sourceIcons[log.source]} {log.message}</span>
                  <div className="text-xs text-muted-foreground mt-0.5">{log.channel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل الحدث</h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${severityColors[selected.severity]}`}>{selected.severity}</div>
                  <div className="text-xs text-muted-foreground mt-1">الخطورة</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-sm">{sourceIcons[selected.source]} {selected.source}</div>
                  <div className="text-xs text-muted-foreground mt-1">المصدر</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-xs font-bold text-foreground">{selected.channel}</div>
                  <div className="text-xs text-muted-foreground mt-1">القناة</div>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">{selected.message}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{selected.details}</p>
              <div className="text-xs text-muted-foreground">{new Date(selected.timestamp).toLocaleString("ar-SA")}</div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
