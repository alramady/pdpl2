import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Activity, CheckCircle, XCircle, Clock, X, Play, Pause, RefreshCw } from "lucide-react";

export default function MonitoringTasks() {
  const { data: tasks, isLoading } = trpc.monitoringTasks.list.useQuery();
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const statusColors: Record<string, string> = { "نشط": "bg-green-100 text-green-700", "متوقف": "bg-red-100 text-red-700", "معلق": "bg-amber-100 text-amber-700" };
  const statusIcons: Record<string, any> = { "نشط": <CheckCircle size={14} />, "متوقف": <XCircle size={14} />, "معلق": <Clock size={14} /> };

  const activeCount = tasks?.filter((t: any) => t.status === "نشط").length || 0;
  const pausedCount = tasks?.filter((t: any) => t.status === "متوقف").length || 0;
  const pendingCount = tasks?.filter((t: any) => t.status === "معلق").length || 0;

  return (
    <Layout title="مهام الرصد" titleEn="Monitoring Tasks">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "إجمالي المهام", value: tasks?.length || 0, icon: <Activity size={20} className="text-teal-600" />, bg: "bg-teal-50", color: "text-foreground" },
          { label: "نشط", value: activeCount, icon: <CheckCircle size={20} className="text-green-600" />, bg: "bg-green-50", color: "text-green-600" },
          { label: "متوقف", value: pausedCount, icon: <XCircle size={20} className="text-red-600" />, bg: "bg-red-50", color: "text-red-600" },
          { label: "معلق", value: pendingCount, icon: <Clock size={20} className="text-amber-600" />, bg: "bg-amber-50", color: "text-amber-600" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right"><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
              <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center"><div className="animate-spin w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full mx-auto" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-secondary border-b border-border text-right">
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">إجراءات</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">الحالة</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">التكرار</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">النوع</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">اسم المهمة</th>
            </tr></thead>
            <tbody>
              {tasks?.map((task: any) => (
                <tr key={task.id} onClick={() => setSelectedTask(task)} className="border-b border-gray-50 hover:bg-secondary cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded hover:bg-green-50 text-green-600" onClick={e => e.stopPropagation()}><Play size={14} /></button>
                      <button className="p-1 rounded hover:bg-amber-50 text-amber-600" onClick={e => e.stopPropagation()}><Pause size={14} /></button>
                      <button className="p-1 rounded hover:bg-blue-50 text-blue-600" onClick={e => e.stopPropagation()}><RefreshCw size={14} /></button>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded inline-flex items-center gap-1 ${statusColors[task.status] || "bg-secondary text-foreground"}`}>{statusIcons[task.status]}{task.status}</span></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{task.frequency}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{task.taskType}</td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{task.nameAr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedTask(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedTask(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل المهمة</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">اسم المهمة</span><span className="text-sm font-medium">{selectedTask.nameAr}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">النوع</span><span className="text-sm font-medium">{selectedTask.taskType}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">التكرار</span><span className="text-sm font-medium">{selectedTask.frequency}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الحالة</span><span className={`text-xs px-2 py-0.5 rounded ${statusColors[selectedTask.status] || "bg-secondary text-foreground"}`}>{selectedTask.status}</span></div>
              {selectedTask.target && <div className="flex justify-between"><span className="text-sm text-muted-foreground">الهدف</span><span className="text-sm font-medium">{selectedTask.target}</span></div>}
              {selectedTask.lastRun && <div className="flex justify-between"><span className="text-sm text-muted-foreground">آخر تشغيل</span><span className="text-sm font-medium">{new Date(selectedTask.lastRun).toLocaleString("ar-SA")}</span></div>}
              {selectedTask.nextRun && <div className="flex justify-between"><span className="text-sm text-muted-foreground">التشغيل القادم</span><span className="text-sm font-medium">{new Date(selectedTask.nextRun).toLocaleString("ar-SA")}</span></div>}
              <div className="pt-3 border-t border-border flex gap-2">
                <button className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 flex items-center justify-center gap-1"><Play size={14} /> تشغيل</button>
                <button className="flex-1 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm hover:bg-amber-100 flex items-center justify-center gap-1"><Pause size={14} /> إيقاف</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
