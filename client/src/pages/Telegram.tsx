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
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{total}</div>
              <div className="text-sm text-muted-foreground">إجمالي الرصد</div>
            </div>
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10"><Send size={20} className="text-teal-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel("حرج"); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">حرج</div>
              <div className="text-sm text-muted-foreground">تهديدات حرجة</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10"><AlertTriangle size={20} className="text-red-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel("عالي"); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">عالي</div>
              <div className="text-sm text-muted-foreground">تهديدات عالية</div>
            </div>
            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-500/10"><Shield size={20} className="text-orange-500" /></div>
          </div>
        </div>
        <div onClick={() => { setThreatLevel(""); setStatusFilter(""); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">الكل</div>
              <div className="text-sm text-muted-foreground">عرض الكل</div>
            </div>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-500/10"><Eye size={20} className="text-green-500" /></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4 border border-border mb-6 flex items-center gap-4 flex-wrap bg-card">
        <select value={threatLevel} onChange={(e) => { setThreatLevel(e.target.value); setPage(0); }} className="bg-secondary dark:bg-card/5 border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground">
          <option value="">جميع المستويات</option>
          <option value="حرج">حرج</option>
          <option value="عالي">عالي</option>
          <option value="متوسط">متوسط</option>
          <option value="منخفض">منخفض</option>
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }} className="bg-secondary dark:bg-card/5 border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground">
          <option value="">جميع الحالات</option>
          <option value="نشط">نشط</option>
          <option value="مراقب">مراقب</option>
          <option value="محظور">محظور</option>
        </select>
        {(threatLevel || statusFilter) && (
          <button onClick={() => { setThreatLevel(""); setStatusFilter(""); setPage(0); }} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"><X size={12} /> مسح الفلاتر</button>
        )}
        <div className="mr-auto text-sm text-muted-foreground">{total} نتيجة</div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Items */}
      <div className="space-y-3">
        {items.map((item: any) => (
          <div key={item.id} onClick={() => setSelected(item)} className="rounded-xl p-4 border border-border bg-card hover:border-primary/30 dark:hover:border-teal-500/30 transition-all cursor-pointer hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString("ar-SA")}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${threatColors[item.threatLevel] || "bg-secondary text-muted-foreground"}`}>{item.threatLevel}</span>
              </div>
              <div className="text-right flex-1 mr-3">
                <h4 className="text-sm font-semibold text-foreground">{item.channelName}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description ? String(item.description).slice(0, 100) : "بدون وصف"}...</p>
                <div className="flex items-center gap-3 mt-1 justify-end text-xs text-muted-foreground">
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
              <h3 className="text-lg font-bold text-foreground">تفاصيل القناة</h3>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-500/10"><Send size={24} className="text-teal-600" /></div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{selected.channelName}</h4>
                  <p className="text-sm text-muted-foreground">{selected.channelUrl ? String(selected.channelUrl) : "رابط غير متاح"}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-xl font-bold text-foreground">{Number(selected.memberCount).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">عضو</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${threatColors[selected.threatLevel] || "bg-secondary text-muted-foreground"}`}>{selected.threatLevel}</div>
                  <div className="text-xs text-muted-foreground mt-1">مستوى التهديد</div>
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
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-4">تاريخ الإضافة: {new Date(selected.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
