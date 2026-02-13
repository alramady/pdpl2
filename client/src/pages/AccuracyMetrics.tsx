import Layout from "@/components/Layout";
import { Target, TrendingUp, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const metrics = [
  { label: "دقة التصنيف", value: "94.2%", trend: "+2.1%", icon: <Target size={18} />, color: "teal" },
  { label: "معدل الإيجابيات الكاذبة", value: "3.8%", trend: "-0.5%", icon: <AlertTriangle size={18} />, color: "amber" },
  { label: "معدل الاكتشاف", value: "97.1%", trend: "+1.3%", icon: <CheckCircle size={18} />, color: "green" },
  { label: "السلبيات الكاذبة", value: "2.9%", trend: "-0.8%", icon: <XCircle size={18} />, color: "red" },
];

const sources = [
  { name: "تليجرام", accuracy: 96.5, total: 1240, correct: 1197 },
  { name: "دارك ويب", accuracy: 93.8, total: 890, correct: 835 },
  { name: "مواقع اللصق", accuracy: 91.2, total: 650, correct: 593 },
  { name: "ملفات البائعين", accuracy: 89.7, total: 320, correct: 287 },
];

export default function AccuracyMetrics() {
  return (
    <Layout title="مقاييس الدقة" titleEn="Accuracy Metrics">
      <div className="rounded-xl p-6 mb-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800 dark:text-white">مقاييس الدقة</h2>
              <p className="text-xs text-gray-400">Detection Accuracy & Performance Metrics</p>
              <p className="text-sm text-gray-500 mt-1">قياس أداء ودقة أنظمة الرصد والتصنيف</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
              <Target size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl p-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs ${m.trend.startsWith('+') && m.color !== 'amber' && m.color !== 'red' ? 'text-green-500' : m.trend.startsWith('-') && (m.color === 'amber' || m.color === 'red') ? 'text-green-500' : 'text-red-500'}`}>{m.trend}</span>
              <span className="text-gray-400">{m.icon}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-800 dark:text-white text-right">{m.value}</div>
            <div className="text-xs text-gray-500 text-right mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-100 dark:border-white/5">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-800 dark:text-white text-right">دقة المصادر</h3>
        </div>
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-100 dark:border-white/5 text-right">
              <th className="p-3 text-xs text-gray-500 font-medium">المصدر</th>
              <th className="p-3 text-xs text-gray-500 font-medium">الدقة</th>
              <th className="p-3 text-xs text-gray-500 font-medium">إجمالي</th>
              <th className="p-3 text-xs text-gray-500 font-medium">صحيحة</th>
              <th className="p-3 text-xs text-gray-500 font-medium">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.name} className="border-b border-gray-50 dark:border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-50 dark:bg-white/[0.02]">
                <td className="p-3 text-gray-700 dark:text-gray-200 font-medium">{s.name}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-gray-100 dark:bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${s.accuracy}%` }} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{s.accuracy}%</span>
                  </div>
                </td>
                <td className="p-3 text-gray-500">{s.total.toLocaleString()}</td>
                <td className="p-3 text-gray-500">{s.correct.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${s.accuracy > 93 ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                    {s.accuracy > 93 ? 'ممتاز' : 'جيد'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
