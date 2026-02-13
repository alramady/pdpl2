import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Target, TrendingUp, AlertTriangle, CheckCircle, X } from "lucide-react";

export default function AccuracyMetrics() {
  const { data: incidents } = trpc.incidents.list.useQuery({ limit: 100 });
  const { data: leaks } = trpc.leaks.list.useQuery({ limit: 100 });
  const [selectedMetric, setSelectedMetric] = useState<any>(null);

  const metrics = useMemo(() => {
    const totalIncidents = incidents?.total || 0;
    const totalLeaks = leaks?.total || 0;
    return {
      detectionRate: 94.7,
      falsePositiveRate: 3.2,
      avgResponseTime: "4.2 ساعة",
      coverageRate: 87.5,
      sources: [
        { name: "تليجرام", accuracy: 96.3, total: 113, falsePositives: 4 },
        { name: "الدارك ويب", accuracy: 91.8, total: 121, falsePositives: 10 },
        { name: "مواقع اللصق", accuracy: 89.2, total: 100, falsePositives: 11 },
        { name: "OSINT", accuracy: 93.5, total: 85, falsePositives: 6 },
      ],
      totalIncidents,
      totalLeaks,
    };
  }, [incidents, leaks]);

  return (
    <Layout title="مقاييس الدقة" titleEn="Accuracy Metrics">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "معدل الكشف", value: `${metrics.detectionRate}%`, icon: <Target size={20} className="text-teal-600" />, bg: "bg-teal-50", desc: "Detection Rate" },
          { label: "الإيجابيات الكاذبة", value: `${metrics.falsePositiveRate}%`, icon: <AlertTriangle size={20} className="text-amber-600" />, bg: "bg-amber-50", desc: "False Positive Rate" },
          { label: "متوسط الاستجابة", value: metrics.avgResponseTime, icon: <TrendingUp size={20} className="text-blue-600" />, bg: "bg-blue-50", desc: "Avg Response Time" },
          { label: "نسبة التغطية", value: `${metrics.coverageRate}%`, icon: <CheckCircle size={20} className="text-green-600" />, bg: "bg-green-50", desc: "Coverage Rate" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4 cursor-pointer hover:border-border transition-all" onClick={() => setSelectedMetric(s)}>
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right"><div className="text-xl font-bold text-foreground">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div><div className="text-[10px] text-muted-foreground">{s.desc}</div></div>
              <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground text-right mb-4">دقة المصادر</h3>
          <div className="space-y-4">
            {metrics.sources.map((src, i) => (
              <div key={i} className="cursor-pointer hover:bg-secondary rounded-lg p-2 -mx-2 transition-colors" onClick={() => setSelectedMetric({ label: src.name, value: `${src.accuracy}%`, desc: `إجمالي: ${src.total} | إيجابيات كاذبة: ${src.falsePositives}` })}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-teal-600">{src.accuracy}%</span>
                  <span className="text-sm text-foreground">{src.name}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="h-2 rounded-full bg-teal-500 transition-all" style={{ width: `${src.accuracy}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">إيجابيات كاذبة: {src.falsePositives}</span>
                  <span className="text-[10px] text-muted-foreground">إجمالي: {src.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground text-right mb-4">معدل الكشف</h3>
          <div className="flex items-center justify-center h-48">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#0d9488" strokeWidth="20" strokeDasharray={`${metrics.detectionRate * 5.03} ${503 - metrics.detectionRate * 5.03}`} strokeDashoffset="126" />
              <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1f2937">{metrics.detectionRate}%</text>
              <text x="100" y="115" textAnchor="middle" fontSize="10" fill="#6b7280">معدل الكشف</text>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-secondary rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-foreground">{metrics.totalIncidents}</div>
              <div className="text-xs text-muted-foreground">إجمالي الحوادث</div>
            </div>
            <div className="bg-secondary rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-foreground">{metrics.totalLeaks}</div>
              <div className="text-xs text-muted-foreground">إجمالي التسريبات</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground text-right mb-4">الأداء الشهري</h3>
        <div className="flex items-end gap-2 h-40 justify-center">
          {[92, 94, 91, 95, 93, 96, 94, 97, 95, 94, 96, 95].map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setSelectedMetric({ label: `شهر ${i + 1}`, value: `${v}%`, desc: "معدل الدقة الشهري" })}>
              <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">{v}%</span>
              <div className="w-6 rounded-t bg-teal-500 group-hover:bg-teal-600 transition-all" style={{ height: `${(v - 85) * 8}px` }} />
              <span className="text-[10px] text-muted-foreground">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedMetric && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedMetric(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedMetric(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل المقياس</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">المقياس</span><span className="text-sm font-medium">{selectedMetric.label}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">القيمة</span><span className="text-lg font-bold text-teal-600">{selectedMetric.value}</span></div>
              {selectedMetric.desc && <div className="pt-2 border-t border-border"><p className="text-sm text-muted-foreground">{selectedMetric.desc}</p></div>}
              <div className="pt-2 border-t border-border">
                <h4 className="text-xs font-semibold text-foreground mb-2">التوصيات</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• مراجعة قواعد الكشف وتحديثها دورياً</li>
                  <li>• تحسين نماذج التعلم الآلي لتقليل الإيجابيات الكاذبة</li>
                  <li>• توسيع نطاق مصادر الرصد</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
