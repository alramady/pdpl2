import Layout from "@/components/Layout";
import { reportsData } from "@/lib/data";
import { FileText, AlertTriangle, TrendingUp, Building2, Download, Calendar, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  "عاجل": "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
  "مهم": "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  "متوسط": "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
};

const sectorColors: Record<string, string> = {
  "صحة": "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
  "اتصالات": "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
  "عام": "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400",
  "حكومة": "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
};

const typeColors: Record<string, string> = {
  "خاص": "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
  "شهري": "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400",
  "ربع سنوي": "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
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
      <div className="rounded-xl p-5 mb-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => toast("إنشاء تقرير", { description: "قريباً" })} className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors flex items-center gap-2">
              <Calendar size={14} />
              إنشاء تقرير مخصص
            </button>
            <button onClick={() => toast("تصدير", { description: "قريباً" })} className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center gap-2">
              <Download size={14} />
              تصدير سريع
            </button>
          </div>
          <div className="text-right flex items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 justify-end">
                التقارير والتوصيات
                <BarChart3 size={20} className="text-teal-600 dark:text-teal-400" />
              </h2>
              <p className="text-sm text-gray-500">تقارير دورية لصناع القرار وتوصيات تحديث السياسات</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { value: reportsData.stats.published, label: "تقارير منشورة", icon: <FileText size={20} className="text-teal-600 dark:text-teal-400" />, bg: "bg-teal-50 dark:bg-teal-500/10" },
          { value: reportsData.stats.policyGaps, label: "فجوات سياسات", icon: <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />, bg: "bg-amber-50 dark:bg-amber-500/10" },
          { value: reportsData.stats.activeRecommendations, label: "توصيات نشطة", icon: <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />, bg: "bg-blue-50 dark:bg-blue-500/10" },
          { value: reportsData.stats.monitoredSectors, label: "قطاعات مراقبة", icon: <Building2 size={20} className="text-purple-600 dark:text-purple-400" />, bg: "bg-purple-50 dark:bg-purple-500/10" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl p-4 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 cursor-pointer hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white text-right">{stat.value}</div>
            <div className="text-sm text-gray-500 text-right">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-1 text-right">اضغط للتفاصيل ←</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Risk Level by Sector - Spider/Radar chart representation */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 cursor-pointer">اضغط للتفاصيل</span>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">مستوى المخاطر حسب القطاع</h3>
          </div>
          {/* Radar chart visualization */}
          <div className="relative w-64 h-64 mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Background rings */}
              {[80, 60, 40, 20].map((r) => (
                <polygon key={r} points={riskData.map((_, i) => {
                  const angle = (Math.PI * 2 * i) / riskData.length - Math.PI / 2;
                  return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                }).join(" ")} fill="none" stroke="#e5e7eb" className="dark:stroke-white/10" strokeWidth="0.5" />
              ))}
              {/* Axis lines */}
              {riskData.map((_, i) => {
                const angle = (Math.PI * 2 * i) / riskData.length - Math.PI / 2;
                return <line key={i} x1="100" y1="100" x2={100 + 80 * Math.cos(angle)} y2={100 + 80 * Math.sin(angle)} stroke="#e5e7eb" className="dark:stroke-white/10" strokeWidth="0.5" />;
              })}
              {/* Data polygon */}
              <polygon points={riskData.map((d, i) => {
                const angle = (Math.PI * 2 * i) / riskData.length - Math.PI / 2;
                const r = (d.value / 100) * 80;
                return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
              }).join(" ")} fill="rgba(13,148,136,0.15)" stroke="#0d9488" strokeWidth="1.5" className="dark:fill-teal-500/15 dark:stroke-teal-400" />
              {/* Data points */}
              {riskData.map((d, i) => {
                const angle = (Math.PI * 2 * i) / riskData.length - Math.PI / 2;
                const r = (d.value / 100) * 80;
                return <circle key={i} cx={100 + r * Math.cos(angle)} cy={100 + r * Math.sin(angle)} r="3" fill="#0d9488" className="dark:fill-teal-400" />;
              })}
              {/* Labels */}
              {riskData.map((d, i) => {
                const angle = (Math.PI * 2 * i) / riskData.length - Math.PI / 2;
                const labelR = 95;
                return (
                  <text key={i} x={100 + labelR * Math.cos(angle)} y={100 + labelR * Math.sin(angle)} textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-gray-500 dark:fill-gray-400" style={{ fontSize: "8px" }}>
                    {d.name}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Monthly Exposed Records - Bar chart */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 cursor-pointer">اضغط للتفاصيل</span>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">السجلات المكشوفة شهرياً</h3>
          </div>
          <div className="flex items-end justify-between gap-3 h-48 px-2">
            {monthlyRecords.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-[10px] text-gray-400">{(item.value / 1000).toFixed(0)}K</span>
                <div className="w-full rounded-t-md bg-teal-100 dark:bg-teal-500/10 relative" style={{ height: `${(item.value / 120000) * 100}%` }}>
                  <div className="absolute inset-0 rounded-t-md bg-gradient-to-t from-teal-500 to-teal-400 dark:from-teal-600 dark:to-teal-400 opacity-80" />
                </div>
                <span className="text-[10px] text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Gaps */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2 justify-end">
          فجوات السياسات المكتشفة
          <AlertTriangle size={18} className="text-amber-500" />
        </h3>
        <div className="space-y-3">
          {reportsData.policyGaps.map((gap, i) => (
            <div key={i} className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${severityColors[gap.severity]}`}>{gap.severity}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${sectorColors[gap.sector]}`}>{gap.sector}</span>
                </div>
                <div className="text-right">
                  <h4 className="text-base font-semibold text-gray-800 dark:text-white">{gap.title}</h4>
                  <p className="text-xs text-gray-400">{gap.titleEn}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3 text-right">{gap.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-600 dark:text-teal-400">اضغط للتفاصيل والتوصيات ←</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">التقدم:</span>
                  <div className="w-48 h-2 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${gap.progress}%`,
                        background: gap.progress < 30 ? "#ef4444" : gap.progress < 50 ? "#f59e0b" : "#14b8a6"
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{gap.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Reports */}
      <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4 text-right">التقارير المُنشأة</h3>
        <div className="space-y-2">
          {reportsData.generatedReports.map((report, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded ${typeColors[report.type] || "bg-gray-100 text-gray-500"}`}>{report.type}</span>
                {report.pages > 0 && <span className="text-xs text-gray-400">{report.pages} صفحة</span>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 dark:text-gray-200">{report.title}</span>
                <div className="flex items-center gap-1 text-xs text-gray-400">
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
