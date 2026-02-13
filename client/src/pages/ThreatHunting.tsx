import Layout from "@/components/Layout";
import { Crosshair, Plus, Search, Shield, AlertTriangle, CheckCircle2, Clock, Play, Pause, Code } from "lucide-react";
import { toast } from "sonner";

const huntingRules = [
  { id: "HR-001", name: "كشف أرقام الهوية الوطنية", nameEn: "National ID Detection", status: "نشط", type: "Regex", matches: 196, lastRun: "قبل 5 دقائق", pattern: '/\\b[12]\\d{9}\\b/', severity: "حرج" },
  { id: "HR-002", name: "كشف أرقام IBAN السعودية", nameEn: "Saudi IBAN Detection", status: "نشط", type: "Regex", matches: 55, lastRun: "قبل 5 دقائق", pattern: '/\\bSA\\d{22}\\b/', severity: "حرج" },
  { id: "HR-003", name: "كشف بطاقات الائتمان", nameEn: "Credit Card Detection", status: "نشط", type: "Regex + Luhn", matches: 39, lastRun: "قبل 5 دقائق", pattern: '/\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5]...)/', severity: "حرج" },
  { id: "HR-004", name: "كشف أرقام الجواز السعودي", nameEn: "Saudi Passport Detection", status: "نشط", type: "Regex", matches: 38, lastRun: "قبل 10 دقائق", pattern: '/\\b[A-Z]\\d{8}\\b/', severity: "عالي" },
  { id: "HR-005", name: "كشف البريد الحكومي", nameEn: "Gov Email Detection", status: "نشط", type: "Regex", matches: 85, lastRun: "قبل 5 دقائق", pattern: '/\\b[\\w.]+@(?:gov|moe|moh)\\.sa\\b/', severity: "عالي" },
  { id: "HR-006", name: "كشف أرقام الإقامة", nameEn: "Iqama Number Detection", status: "نشط", type: "Regex", matches: 32, lastRun: "قبل 10 دقائق", pattern: '/\\b2\\d{9}\\b/', severity: "حرج" },
  { id: "HR-007", name: "كشف كلمات مفتاحية سعودية", nameEn: "Saudi Keyword Detection", status: "نشط", type: "Keyword", matches: 312, lastRun: "قبل 2 دقائق", pattern: 'سعودي|أبشر|نفاذ|توكلنا|...', severity: "متوسط" },
  { id: "HR-008", name: "كشف بيانات VPN مسربة", nameEn: "VPN Credential Detection", status: "متوقف", type: "Regex + ML", matches: 18, lastRun: "قبل ساعة", pattern: '/vpn|credential|login.*sa\\b/', severity: "عالي" }
];

const severityColors: Record<string, string> = {
  "حرج": "bg-red-500/20 text-red-400",
  "عالي": "bg-amber-500/20 text-amber-400",
  "متوسط": "bg-blue-500/20 text-blue-400"
};

export default function ThreatHunting() {
  return (
    <Layout title="قواعد صيد التهديدات" titleEn="Threat Hunting Rules">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-gray-100 dark:border-white/5 relative overflow-hidden bg-white dark:bg-[#111827]">
        <div className="flex items-center justify-between">
          <button onClick={() => toast("إنشاء قاعدة", { description: "قريباً" })} className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded-lg text-sm hover:bg-teal-500/30">
            <Plus size={14} />
            إنشاء قاعدة جديدة
          </button>
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">قواعد صيد التهديدات</h2>
              <p className="text-xs text-gray-500">Threat Hunting Rules (YARA-like)</p>
              <p className="text-sm text-gray-400 mt-1">قواعد كشف متقدمة لاكتشاف البيانات الشخصية المسربة تلقائياً</p>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <Crosshair size={24} className="text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{huntingRules.length}</div>
          <div className="text-sm text-gray-400">قواعد مُعرَّفة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-green-400">{huntingRules.filter(r => r.status === "نشط").length}</div>
          <div className="text-sm text-gray-400">قواعد نشطة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-amber-400">{huntingRules.reduce((s, r) => s + r.matches, 0)}</div>
          <div className="text-sm text-gray-400">إجمالي المطابقات</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-purple-400">3</div>
          <div className="text-sm text-gray-400">أنواع القواعد</div>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-4">
        {huntingRules.map((rule) => (
          <div key={rule.id} className="rounded-xl p-5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:border-white/10 transition-all bg-white dark:bg-[#111827]">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toast(rule.status === "نشط" ? "إيقاف القاعدة" : "تشغيل القاعدة")}
                  className={`p-1.5 rounded ${rule.status === "نشط" ? "hover:bg-red-500/10 text-green-400" : "hover:bg-green-500/10 text-gray-400"}`}
                >
                  {rule.status === "نشط" ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <span className={`text-xs ${rule.status === "نشط" ? "text-green-400" : "text-gray-500"}`}>
                  ● {rule.status}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${severityColors[rule.severity]}`}>{rule.severity}</span>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded">{rule.type}</span>
              </div>
              <div className="text-right">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{rule.name}</h4>
                <p className="text-xs text-gray-500">{rule.nameEn} · {rule.id}</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-black/30 border border-gray-100 dark:border-white/5 mb-3 font-mono text-xs text-teal-600 dark:text-teal-400 text-left" dir="ltr">
              <Code size={12} className="inline mr-2 text-gray-500" />
              {rule.pattern}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock size={12} /> {rule.lastRun}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">مطابقات:</span>
                <span className="text-sm font-bold text-amber-400">{rule.matches}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
