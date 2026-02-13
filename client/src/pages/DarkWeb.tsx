import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Globe, Shield, AlertTriangle, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";

const threatColors: Record<string, string> = {
  "حرج": "bg-red-100 text-red-700",
  "عالي": "bg-orange-100 text-orange-700",
  "متوسط": "bg-amber-100 text-amber-700",
  "منخفض": "bg-green-100 text-green-700",
};

const typeColors: Record<string, string> = {
  "منتدى": "bg-purple-100 text-purple-700",
  "سوق": "bg-blue-100 text-blue-700",
  "مدونة": "bg-teal-100 text-teal-700",
  "خدمة": "bg-amber-100 text-amber-700",
};

export default function DarkWeb() {
  const [page, setPage] = useState(0);
  const [threatLevel, setThreatLevel] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const limit = 20;

  const { data, isLoading } = trpc.darkweb.list.useQuery({
    limit,
    offset: page * limit,
    threatLevel: threatLevel || undefined,
    status: undefined,
  });

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <Layout title="الدارك ويب" titleEn="Dark Web Monitoring">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{total}</div>
              <div className="text-sm text-muted-foreground">إجمالي المصادر</div>
            </div>
            <div className="p-2 rounded-lg bg-purple-50"><Globe size={20} className="text-purple-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel("حرج"); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">حرج</div>
              <div className="text-sm text-muted-foreground">تهديدات حرجة</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50"><AlertTriangle size={20} className="text-red-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel("عالي"); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">عالي</div>
              <div className="text-sm text-muted-foreground">تهديدات عالية</div>
            </div>
            <div className="p-2 rounded-lg bg-orange-50"><Shield size={20} className="text-orange-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel(""); setTypeFilter(""); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">الكل</div>
              <div className="text-sm text-muted-foreground">عرض الكل</div>
            </div>
            <div className="p-2 rounded-lg bg-green-50"><Eye size={20} className="text-green-500" /></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4 border border-border mb-6 flex items-center gap-4 flex-wrap bg-card">
        <select value={threatLevel} onChange={(e) => { setThreatLevel(e.target.value); setPage(0); }} className="bg-secondary border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground">
          <option value="">جميع المستويات</option>
          <option value="حرج">حرج</option>
          <option value="عالي">عالي</option>
          <option value="متوسط">متوسط</option>
          <option value="منخفض">منخفض</option>
        </select>
        <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(0); }} className="bg-secondary border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground">
          <option value="">جميع الأنواع</option>
          <option value="منتدى">منتدى</option>
          <option value="سوق">سوق</option>
          <option value="مدونة">مدونة</option>
          <option value="خدمة">خدمة</option>
        </select>
        {(threatLevel || typeFilter) && (
          <button onClick={() => { setThreatLevel(""); setTypeFilter(""); setPage(0); }} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"><X size={12} /> مسح</button>
        )}
        <div className="mr-auto text-sm text-muted-foreground">{total} نتيجة</div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} onClick={() => setSelected(item)} className="rounded-xl p-5 border border-border bg-card hover:border-purple-300 transition-all cursor-pointer hover:shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded ${threatColors[item.threatLevel] || "bg-secondary text-muted-foreground"}`}>{item.threatLevel}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${typeColors[item.type] || "bg-secondary text-muted-foreground"}`}>{item.type}</span>
              </div>
              <div className="text-right flex-1 mr-3">
                <h4 className="text-sm font-semibold text-foreground">{item.siteName}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">{item.onionUrl ? String(item.onionUrl).slice(0, 40) + "..." : ".onion"}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-right mb-3">{item.description ? String(item.description).slice(0, 80) : ""}...</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{new Date(item.lastScanned).toLocaleDateString("ar-SA")}</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.status}</span>
                <span className={`w-2 h-2 rounded-full ${item.status === "نشط" ? "bg-green-500" : item.status === "متوقف" ? "bg-red-500" : "bg-amber-500"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-border disabled:opacity-30 hover:bg-secondary text-muted-foreground"><ChevronRight size={16} /></button>
          <span className="text-sm text-muted-foreground">{page + 1} / {totalPages}</span>
          <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-border disabled:opacity-30 hover:bg-secondary text-muted-foreground"><ChevronLeft size={16} /></button>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-2xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل الموقع</h3>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-purple-50"><Globe size={24} className="text-purple-600" /></div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{selected.siteName}</h4>
                  <p className="text-xs text-muted-foreground font-mono">{selected.onionUrl ? String(selected.onionUrl) : ".onion"}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${threatColors[selected.threatLevel] || "bg-secondary"}`}>{selected.threatLevel}</div>
                  <div className="text-xs text-muted-foreground mt-1">مستوى التهديد</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${typeColors[selected.type] || "bg-secondary"}`}>{selected.type}</div>
                  <div className="text-xs text-muted-foreground mt-1">النوع</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-sm font-bold text-foreground">{selected.status}</div>
                  <div className="text-xs text-muted-foreground mt-1">الحالة</div>
                </div>
              </div>
              {selected.description && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-foreground mb-2">الوصف</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{String(selected.description)}</p>
                </div>
              )}
              {selected.keywords && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-foreground mb-2">الكلمات المفتاحية</h5>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selected.keywords) ? selected.keywords : []).map((kw: string, i: number) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                <span>آخر فحص: {new Date(selected.lastScanned).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>تاريخ الإضافة: {new Date(selected.createdAt).toLocaleDateString("ar-SA")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
