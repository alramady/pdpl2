import Layout from "@/components/Layout";
import { reportsData } from "@/lib/data";
import { FileText, AlertTriangle, Lightbulb, Building2, Download, Calendar } from "lucide-react";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  "عاجل": "bg-red-500/20 text-red-400",
  "مهم": "bg-amber-500/20 text-amber-400",
  "متوسط": "bg-blue-500/20 text-blue-400"
};

const sectorColors: Record<string, string> = {
  "صحة": "bg-green-500/20 text-green-400",
  "اتصالات": "bg-purple-500/20 text-purple-400",
  "عام": "bg-gray-500/20 text-gray-400",
  "حكومة": "bg-blue-500/20 text-blue-400"
};

const typeColors: Record<string, string> = {
  "خاص": "bg-purple-500/20 text-purple-400",
  "شهري": "bg-teal-500/20 text-teal-400",
  "ربع سنوي": "bg-blue-500/20 text-blue-400"
};

export default function Reports() {
  const riskData = [
    { name: "اتصالات", value: 85 },
    { name: "صحة", value: 72 },
    { name: "بنوك", value: 65 },
    { name: "حكومة", value: 58 },
    { name: "تعليم", value: 42 },
    { name: "تجزئة", value: 35 }
  ];

  const monthlyRecords = [
    { name: "سبتمبر", value: 45000 },
    { name: "أكتوبر", value: 32000 },
    { name: "نوفمبر", value: 68000 },
    { name: "ديسمبر", value: 25000 },
    { name: "يناير", value: 89000 },
    { name: "فبراير", value: 112000 }
  ];

  return (
    <Layout title="التقارير" titleEn="Reports">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-white/5" style={{ background: "linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d2137 100%)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => toast("إنشاء تقرير", { description: "قريباً" })} className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg text-sm hover:bg-teal-500/30 transition-colors">
              إنشاء تقرير مخصص
            </button>
            <button onClick={() => toast("تصدير", { description: "قريباً" })} className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm hover:bg-white/10 transition-colors">
              تصدير سريع
            </button>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-white">التقارير والتوصيات</h2>
            <p className="text-sm text-gray-400">تقارير دورية لصناع القرار وتوصيات تحديث السياسات</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-white/5 cursor-pointer hover:border-white/10 transition-all" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-teal-400">{reportsData.stats.published}</div>
          <div className="text-sm text-gray-400">تقارير منشورة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5 cursor-pointer hover:border-white/10 transition-all" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-amber-400">{reportsData.stats.policyGaps}</div>
          <div className="text-sm text-gray-400">فجوات سياسات</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5 cursor-pointer hover:border-white/10 transition-all" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-blue-400">{reportsData.stats.activeRecommendations}</div>
          <div className="text-sm text-gray-400">توصيات نشطة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5 cursor-pointer hover:border-white/10 transition-all" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-purple-400">{reportsData.stats.monitoredSectors}</div>
          <div className="text-sm text-gray-400">قطاعات مراقبة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Risk Level by Sector */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <h3 className="text-base font-semibold text-white mb-1">مستوى المخاطر حسب القطاع</h3>
          <p className="text-xs text-gray-500 mb-4">اضغط للتفاصيل</p>
          <div className="space-y-3">
            {riskData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-16 text-right">{item.name}</span>
                <div className="flex-1 h-4 rounded bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-1000"
                    style={{
                      width: `${item.value}%`,
                      background: item.value > 70 ? "#ef4444" : item.value > 50 ? "#f59e0b" : "#14b8a6"
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-8">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Exposed Records */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <h3 className="text-base font-semibold text-white mb-1">السجلات المكشوفة شهرياً</h3>
          <p className="text-xs text-gray-500 mb-4">اضغط للتفاصيل</p>
          <div className="space-y-3">
            {monthlyRecords.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-16 text-right">{item.name}</span>
                <div className="flex-1 h-4 rounded bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-1000"
                    style={{
                      width: `${(item.value / 112000) * 100}%`,
                      background: "linear-gradient(90deg, #14b8a6, #06b6d4)"
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-12">{(item.value / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Gaps */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">فجوات السياسات المكتشفة</h3>
        <div className="space-y-4">
          {reportsData.policyGaps.map((gap, i) => (
            <div key={i} className="rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all cursor-pointer" style={{ background: "#111827" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${severityColors[gap.severity]}`}>{gap.severity}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${sectorColors[gap.sector]}`}>{gap.sector}</span>
                </div>
                <div className="text-right">
                  <h4 className="text-base font-semibold text-white">{gap.title}</h4>
                  <p className="text-xs text-gray-500">{gap.titleEn}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3 text-right">{gap.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">اضغط للتفاصيل والتوصيات ←</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">التقدم:</span>
                  <div className="w-48 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${gap.progress}%`,
                        background: gap.progress < 30 ? "#ef4444" : gap.progress < 50 ? "#f59e0b" : "#14b8a6"
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{gap.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Reports */}
      <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText size={18} className="text-teal-400" />
          التقارير المُنشأة
        </h3>
        <div className="space-y-2">
          {reportsData.generatedReports.map((report, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <button onClick={() => toast("تحميل", { description: "قريباً" })} className="p-1.5 rounded hover:bg-white/5 text-gray-400">
                  <Download size={14} />
                </button>
                <span className={`text-xs px-2 py-0.5 rounded ${typeColors[report.type] || "bg-gray-500/20 text-gray-400"}`}>{report.type}</span>
                {report.pages > 0 && <span className="text-xs text-gray-500">{report.pages} صفحة</span>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-200">{report.title}</span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar size={12} />
                  {report.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
