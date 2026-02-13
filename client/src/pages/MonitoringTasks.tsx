import Layout from "@/components/Layout";
import { ClipboardList, Play, Pause, CheckCircle, Clock, AlertCircle } from "lucide-react";

const tasks = [
  { name: "رصد قنوات تليجرام الرئيسية", status: "نشط", frequency: "كل 5 دقائق", lastRun: "منذ 2 دقيقة", icon: <Play size={14} />, statusColor: "green" },
  { name: "فحص منتديات الدارك ويب", status: "نشط", frequency: "كل 15 دقيقة", lastRun: "منذ 8 دقائق", icon: <Play size={14} />, statusColor: "green" },
  { name: "مسح مواقع اللصق", status: "نشط", frequency: "كل 10 دقائق", lastRun: "منذ 3 دقائق", icon: <Play size={14} />, statusColor: "green" },
  { name: "تحليل ملفات البائعين", status: "متوقف", frequency: "يومياً", lastRun: "منذ يومين", icon: <Pause size={14} />, statusColor: "amber" },
  { name: "فحص تسريبات البريد الإلكتروني", status: "نشط", frequency: "كل ساعة", lastRun: "منذ 45 دقيقة", icon: <Play size={14} />, statusColor: "green" },
  { name: "رصد أسواق البيانات", status: "نشط", frequency: "كل 30 دقيقة", lastRun: "منذ 12 دقيقة", icon: <Play size={14} />, statusColor: "green" },
  { name: "تحديث قاعدة بيانات التهديدات", status: "مجدول", frequency: "أسبوعياً", lastRun: "منذ 3 أيام", icon: <Clock size={14} />, statusColor: "blue" },
  { name: "مراجعة القواعد التلقائية", status: "مكتمل", frequency: "شهرياً", lastRun: "منذ أسبوع", icon: <CheckCircle size={14} />, statusColor: "teal" },
];

export default function MonitoringTasks() {
  return (
    <Layout title="مهام الرصد" titleEn="Monitoring Tasks">
      <div className="rounded-xl p-6 mb-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">8</div>
              <div className="text-xs text-gray-500">إجمالي المهام</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
              <div className="text-xs text-gray-500">نشطة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">1</div>
              <div className="text-xs text-gray-500">متوقفة</div>
            </div>
          </div>
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800 dark:text-white">مهام الرصد</h2>
              <p className="text-xs text-gray-400">Monitoring Tasks & Schedules</p>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20">
              <ClipboardList size={24} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5 overflow-hidden">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{task.lastRun}</span>
              <span className="text-xs text-gray-400">{task.frequency}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-gray-700 dark:text-gray-200">{task.name}</div>
              </div>
              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-${task.statusColor}-50 dark:bg-${task.statusColor}-500/10 text-${task.statusColor}-600 dark:text-${task.statusColor}-400`}>
                {task.icon}
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
