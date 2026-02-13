import Layout from "@/components/Layout";
import { Calendar, FileText, Clock, Send, CheckCircle } from "lucide-react";

const reports = [
  { name: "تقرير التسريبات الأسبوعي", frequency: "أسبوعياً", nextRun: "الأحد القادم", recipients: "prog.muhammed@gmail.com", status: "مجدول", format: "PDF" },
  { name: "ملخص الحوادث اليومي", frequency: "يومياً", nextRun: "غداً 8:00 ص", recipients: "فريق الأمن", status: "مجدول", format: "PDF" },
  { name: "تقرير مقاييس الدقة", frequency: "شهرياً", nextRun: "1 مارس 2026", recipients: "الإدارة", status: "مجدول", format: "Excel" },
  { name: "تقرير القطاعات المتأثرة", frequency: "أسبوعياً", nextRun: "الخميس القادم", recipients: "مكتب إدارة البيانات", status: "مجدول", format: "PDF" },
  { name: "تقرير تحليل التهديدات", frequency: "شهرياً", nextRun: "15 مارس 2026", recipients: "فريق التحليل", status: "مجدول", format: "PDF" },
];

export default function ScheduledReports() {
  return (
    <Layout title="التقارير المجدولة" titleEn="Scheduled Reports">
      <div className="rounded-xl p-6 mb-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">5</div>
              <div className="text-xs text-gray-500">تقارير مجدولة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">127</div>
              <div className="text-xs text-gray-500">تم إرسالها</div>
            </div>
          </div>
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800 dark:text-white">التقارير المجدولة</h2>
              <p className="text-xs text-gray-400">Scheduled & Automated Reports</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
              <Calendar size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5 overflow-hidden">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-100 dark:border-white/5 text-right">
              <th className="p-3 text-xs text-gray-500 font-medium">التقرير</th>
              <th className="p-3 text-xs text-gray-500 font-medium">التكرار</th>
              <th className="p-3 text-xs text-gray-500 font-medium">التشغيل القادم</th>
              <th className="p-3 text-xs text-gray-500 font-medium">المستلمون</th>
              <th className="p-3 text-xs text-gray-500 font-medium">الصيغة</th>
              <th className="p-3 text-xs text-gray-500 font-medium">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-b border-gray-50 dark:border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-50 dark:bg-white/[0.02]">
                <td className="p-3 text-gray-700 dark:text-gray-200 font-medium">
                  <div className="flex items-center gap-2 justify-end">
                    {r.name}
                    <FileText size={14} className="text-gray-400" />
                  </div>
                </td>
                <td className="p-3 text-gray-500">{r.frequency}</td>
                <td className="p-3 text-gray-500">{r.nextRun}</td>
                <td className="p-3 text-gray-500 text-xs">{r.recipients}</td>
                <td className="p-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">{r.format}</span>
                </td>
                <td className="p-3">
                  <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                    <Clock size={12} />
                    {r.status}
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
