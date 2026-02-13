import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { FileCode, ChevronLeft, ChevronRight, X, AlertTriangle, Eye } from "lucide-react";

const threatColors: Record<string, string> = {
  "حرج": "bg-red-100 text-red-700",
  "عالي": "bg-orange-100 text-orange-700",
  "متوسط": "bg-amber-100 text-amber-700",
  "منخفض": "bg-green-100 text-green-700",
};

export default function PasteSites() {
  const [page, setPage] = useState(0);
  const [threatLevel, setThreatLevel] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const limit = 20;

  const { data, isLoading } = trpc.paste.list.useQuery({
    limit,
    offset: page * limit,
    threatLevel: threatLevel || undefined,
  });

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <Layout title="مواقع اللصق" titleEn="Paste Sites">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 bg-white">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{total}</div>
              <div className="text-sm text-gray-500">إجمالي المراقبة</div>
            </div>
            <div className="p-2 rounded-lg bg-teal-50"><FileCode size={20} className="text-teal-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel("حرج"); setPage(0); }} className="rounded-xl p-4 border border-gray-100 bg-white cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">حرج</div>
              <div className="text-sm text-gray-500">تهديدات حرجة</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50"><AlertTriangle size={20} className="text-red-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel("عالي"); setPage(0); }} className="rounded-xl p-4 border border-gray-100 bg-white cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">عالي</div>
              <div className="text-sm text-gray-500">تهديدات عالية</div>
            </div>
            <div className="p-2 rounded-lg bg-orange-50"><AlertTriangle size={20} className="text-orange-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel(""); setPage(0); }} className="rounded-xl p-4 border border-gray-100 bg-white cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">الكل</div>
              <div className="text-sm text-gray-500">عرض الكل</div>
            </div>
            <div className="p-2 rounded-lg bg-green-50"><Eye size={20} className="text-green-500" /></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4 border border-gray-100 mb-6 flex items-center gap-4 flex-wrap bg-white">
        <select value={threatLevel} onChange={(e) => { setThreatLevel(e.target.value); setPage(0); }} className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-600">
          <option value="">جميع المستويات</option>
          <option value="حرج">حرج</option>
          <option value="عالي">عالي</option>
          <option value="متوسط">متوسط</option>
          <option value="منخفض">منخفض</option>
        </select>
        {threatLevel && (
          <button onClick={() => { setThreatLevel(""); setPage(0); }} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"><X size={12} /> مسح</button>
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
          <div key={item.id} onClick={() => setSelected(item)} className="rounded-xl p-5 border border-gray-100 bg-white hover:border-teal-300 transition-all cursor-pointer hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{new Date(item.detectedAt).toLocaleDateString("ar-SA")}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${threatColors[item.threatLevel] || "bg-gray-100 text-gray-600"}`}>{item.threatLevel}</span>
              </div>
              <div className="text-right flex-1 mr-4">
                <h4 className="text-sm font-semibold text-gray-800">{item.siteName}</h4>
                <p className="text-xs text-gray-500 mt-0.5 font-mono">{item.pasteUrl ? String(item.pasteUrl).slice(0, 50) : ""}</p>
              </div>
            </div>
            {item.content && (
              <p className="text-xs text-gray-500 mt-2 text-right">{String(item.content).slice(0, 100)}...</p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 text-gray-600"><ChevronRight size={16} /></button>
          <span className="text-sm text-gray-500">{page + 1} / {totalPages}</span>
          <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 text-gray-600"><ChevronLeft size={16} /></button>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
              <h3 className="text-lg font-bold text-gray-800">تفاصيل اللصق</h3>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-teal-50"><FileCode size={24} className="text-teal-600" /></div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{selected.siteName}</h4>
                  <p className="text-xs text-gray-400 font-mono">{selected.pasteUrl ? String(selected.pasteUrl) : ""}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${threatColors[selected.threatLevel] || "bg-gray-100"}`}>{selected.threatLevel}</div>
                  <div className="text-xs text-gray-500 mt-1">مستوى التهديد</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
                  <div className="text-sm font-bold text-gray-800">{selected.status}</div>
                  <div className="text-xs text-gray-500 mt-1">الحالة</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
                  <div className="text-sm font-bold text-gray-800">{new Date(selected.detectedAt).toLocaleDateString("ar-SA")}</div>
                  <div className="text-xs text-gray-500 mt-1">تاريخ الاكتشاف</div>
                </div>
              </div>
              {selected.content && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">المحتوى</h5>
                  <pre className="text-xs text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-64">{String(selected.content)}</pre>
                </div>
              )}
              {selected.keywords && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">الكلمات المفتاحية</h5>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selected.keywords) ? selected.keywords : []).map((kw: string, i: number) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
