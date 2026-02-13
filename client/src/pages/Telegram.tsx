import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Send, Shield, AlertTriangle, Eye, Search, ChevronLeft, ChevronRight, X, Users } from "lucide-react";

const threatColors: Record<string, string> = {
  "حرج": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  "عالي": "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
  "متوسط": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  "منخفض": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
};

export default function Telegram() {
  const [page, setPage] = useState(0);
  const [threatLevel, setThreatLevel] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const limit = 20;

  const { data, isLoading } = trpc.telegram.list.useQuery({
    limit,
    offset: page * limit,
    threatLevel: threatLevel || undefined,
    status: statusFilter || undefined,
  });

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <Layout title="رصد تليجرام" titleEn="Telegram Monitoring">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{total}</div>
              <div className="text-sm text-gray-500">إجمالي الرصد</div>
            </div>
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10"><Send size={20} className="text-teal-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel("حرج"); setPage(0); }} className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">حرج</div>
              <div className="text-sm text-gray-500">تهديدات حرجة</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10"><AlertTriangle size={20} className="text-red-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel("عالي"); setPage(0); }} className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">عالي</div>
              <div className="text-sm text-gray-500">تهديدات عالية</div>
            </div>
            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-500/10"><Shield size={20} className="text-orange-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel(""); setStatusFilter(""); setPage(0); }} className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">الكل</div>
              <div className="text-sm text-gray-500">عرض الكل</div>
            </div>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-500/10"><Eye size={20} className="text-green-500" /></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 mb-6 flex items-center gap-4 flex-wrap bg-white dark:bg-[#111827]">
        <select value={threatLevel} onChange={(e) => { setThreatLevel(e.target.value); setPage(0); }} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300">
          <option value="">جميع المستويات</option>
          <option value="حرج">حرج</option>
          <option value="عالي">عالي</option>
          <option value="متوسط">متوسط</option>
          <option value="منخفض">منخفض</option>
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300">
          <option value="">جميع الحالات</option>
          <option value="نشط">نشط</option>
          <option value="مراقب">مراقب</option>
          <option value="محظور">محظور</option>
        </select>
        {(threatLevel || statusFilter) && (
          <button onClick={() => { setThreatLevel(""); setStatusFilter(""); setPage(0); }} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"><X size={12} /> مسح الفلاتر</button>
        )}
        <div className="mr-auto text-sm text-gray-500">{total} نتيجة</div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Items */}
      <div className="space-y-3">
        {items.map((item: any) => (
          <div key={item.id} onClick={() => setSelected(item)} className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] hover:border-teal-300 dark:hover:border-teal-500/30 transition-all cursor-pointer hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString("ar-SA")}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${threatColors[item.threatLevel] || "bg-gray-100 text-gray-600"}`}>{item.threatLevel}</span>
              </div>
              <div className="text-right flex-1 mr-3">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{item.channelName}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.description ? String(item.description).slice(0, 100) : "بدون وصف"}...</p>
                <div className="flex items-center gap-3 mt-1 justify-end text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Users size={10} /> {Number(item.memberCount).toLocaleString()} عضو</span>
                  <span>{item.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 hover:bg-gray-50 text-gray-600"><ChevronRight size={16} /></button>
          <span className="text-sm text-gray-500">{page + 1} / {totalPages}</span>
          <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 hover:bg-gray-50 text-gray-600"><ChevronLeft size={16} /></button>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 w-full max-w-2xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5">
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">تفاصيل القناة</h3>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-500/10"><Send size={24} className="text-teal-600" /></div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">{selected.channelName}</h4>
                  <p className="text-sm text-gray-500">{selected.channelUrl ? String(selected.channelUrl) : "رابط غير متاح"}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 text-center">
                  <div className="text-xl font-bold text-gray-800 dark:text-white">{Number(selected.memberCount).toLocaleString()}</div>
                  <div className="text-xs text-gray-500">عضو</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${threatColors[selected.threatLevel] || "bg-gray-100 text-gray-600"}`}>{selected.threatLevel}</div>
                  <div className="text-xs text-gray-500 mt-1">مستوى التهديد</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 text-center">
                  <div className="text-sm font-bold text-gray-800 dark:text-white">{selected.status}</div>
                  <div className="text-xs text-gray-500 mt-1">الحالة</div>
                </div>
              </div>
              {selected.description && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">الوصف</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{String(selected.description)}</p>
                </div>
              )}
              {selected.keywords && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">الكلمات المفتاحية</h5>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selected.keywords) ? selected.keywords : []).map((kw: string, i: number) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-xs text-gray-400 mt-4">تاريخ الإضافة: {new Date(selected.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
