import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { FileText, Calendar, Clock, X, CheckCircle, Download } from "lucide-react";

export default function ScheduledReports() {
  const { data: reports, isLoading } = trpc.reports.list.useQuery({ limit: 50 });
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const severityColors: Record<string, string> = { "حرج": "bg-red-100 text-red-700", "عالي": "bg-orange-100 text-orange-700", "متوسط": "bg-amber-100 text-amber-700", "منخفض": "bg-green-100 text-green-700" };

  return (
    <Layout title="التقارير المجدولة" titleEn="Scheduled Reports">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "إجمالي التقارير", value: reports?.total || 0, icon: <FileText size={20} className="text-teal-600" />, bg: "bg-teal-50" },
          { label: "مكتملة", value: reports?.items?.filter((r: any) => r.status === "مكتمل").length || 0, icon: <CheckCircle size={20} className="text-green-600" />, bg: "bg-green-50" },
          { label: "قيد المعالجة", value: reports?.items?.filter((r: any) => r.status === "قيد المعالجة").length || 0, icon: <Clock size={20} className="text-amber-600" />, bg: "bg-amber-50" },
          { label: "هذا الشهر", value: reports?.items?.filter((r: any) => { const d = new Date(r.createdAt); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).length || 0, icon: <Calendar size={20} className="text-blue-600" />, bg: "bg-blue-50" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right"><div className="text-2xl font-bold text-foreground">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
              <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center"><div className="animate-spin w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full mx-auto" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm" dir="rtl">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="p-3 text-xs text-muted-foreground font-medium text-right">العنوان</th>
                <th className="p-3 text-xs text-muted-foreground font-medium text-right">النوع</th>
                <th className="p-3 text-xs text-muted-foreground font-medium text-right">الخطورة</th>
                <th className="p-3 text-xs text-muted-foreground font-medium text-right">الحالة</th>
                <th className="p-3 text-xs text-muted-foreground font-medium text-right">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {reports?.items?.map((report: any) => (
                <tr key={report.id} onClick={() => setSelectedReport(report)} className="border-b border-gray-50 last:border-0 hover:bg-secondary cursor-pointer transition-colors">
                  <td className="p-3 text-foreground font-medium">{report.title}</td>
                  <td className="p-3 text-muted-foreground">{report.type}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${severityColors[report.severity] || "bg-secondary text-muted-foreground"}`}>{report.severity}</span></td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${report.status === "مكتمل" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{report.status}</span></td>
                  <td className="p-3 text-muted-foreground text-xs">{new Date(report.createdAt).toLocaleDateString("ar-SA")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedReport(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedReport(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل التقرير</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">العنوان</span><span className="text-sm font-medium">{selectedReport.title}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">النوع</span><span className="text-sm font-medium">{selectedReport.type}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الخطورة</span><span className={`text-xs px-2 py-0.5 rounded ${severityColors[selectedReport.severity] || "bg-secondary text-muted-foreground"}`}>{selectedReport.severity}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الحالة</span><span className={`text-xs px-2 py-0.5 rounded ${selectedReport.status === "مكتمل" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{selectedReport.status}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">التاريخ</span><span className="text-sm text-muted-foreground">{new Date(selectedReport.createdAt).toLocaleDateString("ar-SA")}</span></div>
              {selectedReport.summary && <div className="pt-2 border-t border-border"><span className="text-sm text-muted-foreground block mb-1">الملخص</span><p className="text-sm text-foreground bg-secondary rounded-lg p-3">{selectedReport.summary}</p></div>}
              {selectedReport.recommendations && <div className="pt-2 border-t border-border"><span className="text-sm text-muted-foreground block mb-1">التوصيات</span><p className="text-sm text-foreground bg-secondary rounded-lg p-3">{selectedReport.recommendations}</p></div>}
              <div className="pt-3 border-t border-border flex gap-2">
                <button className="flex-1 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm hover:bg-teal-100 flex items-center justify-center gap-2"><Download size={14} /> تصدير PDF</button>
                <button className="flex-1 py-2 bg-secondary text-foreground rounded-lg text-sm hover:bg-secondary">مشاركة</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
