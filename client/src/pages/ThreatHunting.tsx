import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Crosshair, Plus, Clock, Play, Pause, Code, X } from "lucide-react";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  "حرج": "bg-red-100 text-red-700",
  "عالي": "bg-amber-100 text-amber-700",
  "متوسط": "bg-blue-100 text-blue-700",
  "منخفض": "bg-green-100 text-green-700",
};

export default function ThreatHunting() {
  const [selected, setSelected] = useState<any>(null);
  const { data: rules, isLoading } = trpc.threatRules.list.useQuery();

  const items = rules || [];
  const activeCount = items.filter((r: any) => r.status === "نشط").length;
  const totalMatches = items.reduce((s: number, r: any) => s + (r.matchCount || 0), 0);

  return (
    <Layout title="قواعد صيد التهديدات" titleEn="Threat Hunting Rules">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          <button onClick={() => toast("إنشاء قاعدة", { description: "قريباً" })} className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm hover:bg-teal-100">
            <Plus size={14} />
            إنشاء قاعدة جديدة
          </button>
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">قواعد صيد التهديدات</h2>
              <p className="text-xs text-gray-500">Threat Hunting Rules (YARA-like)</p>
              <p className="text-sm text-gray-400 mt-1">قواعد كشف متقدمة لاكتشاف البيانات الشخصية المسربة تلقائياً</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 border border-red-100">
              <Crosshair size={24} className="text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 bg-white">
          <div className="text-2xl font-bold text-teal-600">{items.length}</div>
          <div className="text-sm text-gray-500">قواعد مُعرَّفة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 bg-white">
          <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          <div className="text-sm text-gray-500">قواعد نشطة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 bg-white">
          <div className="text-2xl font-bold text-amber-600">{totalMatches}</div>
          <div className="text-sm text-gray-500">إجمالي المطابقات</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 bg-white">
          <div className="text-2xl font-bold text-purple-600">3</div>
          <div className="text-sm text-gray-500">أنواع القواعد</div>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Rules */}
      <div className="space-y-4">
        {items.map((rule: any) => (
          <div key={rule.id} onClick={() => setSelected(rule)} className="rounded-xl p-5 border border-gray-100 hover:border-red-200 transition-all bg-white cursor-pointer hover:shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); toast(rule.status === "نشط" ? "إيقاف القاعدة" : "تشغيل القاعدة"); }}
                  className={`p-1.5 rounded ${rule.status === "نشط" ? "hover:bg-red-50 text-green-500" : "hover:bg-green-50 text-gray-400"}`}
                >
                  {rule.status === "نشط" ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <span className={`text-xs ${rule.status === "نشط" ? "text-green-500" : "text-gray-500"}`}>● {rule.status}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${severityColors[rule.severity] || "bg-gray-100 text-gray-600"}`}>{rule.severity}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{rule.ruleType}</span>
              </div>
              <div className="text-right">
                <h4 className="text-sm font-semibold text-gray-800">{rule.name}</h4>
                <p className="text-xs text-gray-500">{rule.nameEn} · HR-{String(rule.id).padStart(3, "0")}</p>
              </div>
            </div>
            {rule.pattern && (
              <div className="p-3 rounded-lg bg-gray-900 border border-gray-200 mb-3 font-mono text-xs text-teal-400 text-left" dir="ltr">
                <Code size={12} className="inline mr-2 text-gray-500" />
                {String(rule.pattern)}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock size={12} /> {rule.lastRun ? new Date(rule.lastRun).toLocaleDateString("ar-SA") : "لم يتم التشغيل"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">مطابقات:</span>
                <span className="text-sm font-bold text-amber-600">{rule.matchCount || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
              <h3 className="text-lg font-bold text-gray-800">تفاصيل القاعدة</h3>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <h4 className="text-base font-bold text-gray-800 mb-1">{selected.name}</h4>
              <p className="text-sm text-gray-500 mb-4">{selected.nameEn}</p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${severityColors[selected.severity] || "bg-gray-100"}`}>{selected.severity}</div>
                  <div className="text-xs text-gray-500 mt-1">الخطورة</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
                  <div className="text-sm font-bold text-gray-800">{selected.ruleType}</div>
                  <div className="text-xs text-gray-500 mt-1">النوع</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
                  <div className="text-sm font-bold text-amber-600">{selected.matchCount || 0}</div>
                  <div className="text-xs text-gray-500 mt-1">المطابقات</div>
                </div>
              </div>
              {selected.pattern && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">النمط</h5>
                  <pre className="text-xs text-teal-400 bg-gray-900 p-4 rounded-lg border border-gray-200 font-mono" dir="ltr">{String(selected.pattern)}</pre>
                </div>
              )}
              {selected.description && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">الوصف</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">{String(selected.description)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
