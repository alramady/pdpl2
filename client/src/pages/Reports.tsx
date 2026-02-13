import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { FileText, Download, ChevronLeft, ChevronRight, X, Clock, CheckCircle2, Eye, BarChart3, Calendar } from "lucide-react";
import { toast } from "sonner";

const typeColors: Record<string, string> = {
  "تقرير حادثة": "bg-red-100 text-red-700",
  "تقرير دوري": "bg-blue-100 text-blue-700",
  "تقرير تحليلي": "bg-purple-100 text-purple-700",
  "تقرير امتثال": "bg-green-100 text-green-700",
  "تقرير طوارئ": "bg-amber-100 text-amber-700",
};

const statusColors: Record<string, string> = {
  "مكتمل": "bg-green-100 text-green-700",
  "قيد الإعداد": "bg-amber-100 text-amber-700",
  "مراجعة": "bg-blue-100 text-blue-700",
};

export default function Reports() {
  const [page, setPage] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const limit = 20;

  const { data, isLoading } = trpc.reports.list.useQuery({
    limit,
    offset: page * limit,
    type: typeFilter || undefined,
    status: statusFilter || undefined,
  });

  const items = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <Layout title="التقارير" titleEn="Reports">
      {/* Header */}
      <div className="rounded-xl p-5 mb-6 bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => toast("إنشاء تقرير", { description: "قريباً" })} className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors flex items-center gap-2">
              <Calendar size={14} />
              إنشاء تقرير مخصص
            </button>
            <button onClick={() => toast("تصدير", { description: "قريباً" })} className="px-4 py-2 bg-secondary text-muted-foreground rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Download size={14} />
              تصدير سريع
            </button>
          </div>
          <div className="text-right flex items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 justify-end">
                التقارير والتوصيات
                <BarChart3 size={20} className="text-teal-600" />
              </h2>
              <p className="text-sm text-muted-foreground">تقارير دورية لصناع القرار وتوصيات تحديث السياسات</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{total}</div>
              <div className="text-sm text-muted-foreground">إجمالي التقارير</div>
            </div>
            <div className="p-2 rounded-lg bg-blue-50"><FileText size={20} className="text-blue-500" /></div>
          </div>
        </div>
        <div onClick={() => { setStatusFilter("مكتمل"); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">مكتمل</div>
              <div className="text-sm text-muted-foreground">تقارير مكتملة</div>
            </div>
            <div className="p-2 rounded-lg bg-green-50"><CheckCircle2 size={20} className="text-green-500" /></div>
          </div>
        </div>
        <div onClick={() => { setStatusFilter("قيد الإعداد"); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600">إعداد</div>
              <div className="text-sm text-muted-foreground">قيد الإعداد</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-50"><Clock size={20} className="text-amber-500" /></div>
          </div>
        </div>
        <div onClick={() => { setTypeFilter(""); setStatusFilter(""); setPage(0); }} className="rounded-xl p-4 border border-border bg-card cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">الكل</div>
              <div className="text-sm text-muted-foreground">عرض الكل</div>
            </div>
            <div className="p-2 rounded-lg bg-teal-50"><Eye size={20} className="text-teal-500" /></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4 border border-border mb-6 flex items-center gap-4 flex-wrap bg-card">
        <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(0); }} className="bg-secondary border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground">
          <option value="">جميع الأنواع</option>
          <option value="تقرير حادثة">تقرير حادثة</option>
          <option value="تقرير دوري">تقرير دوري</option>
          <option value="تقرير تحليلي">تقرير تحليلي</option>
          <option value="تقرير امتثال">تقرير امتثال</option>
          <option value="تقرير طوارئ">تقرير طوارئ</option>
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }} className="bg-secondary border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground">
          <option value="">جميع الحالات</option>
          <option value="مكتمل">مكتمل</option>
          <option value="قيد الإعداد">قيد الإعداد</option>
          <option value="مراجعة">مراجعة</option>
        </select>
        {(typeFilter || statusFilter) && (
          <button onClick={() => { setTypeFilter(""); setStatusFilter(""); setPage(0); }} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"><X size={12} /> مسح</button>
        )}
        <div className="mr-auto text-sm text-muted-foreground">{total} نتيجة</div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Report Cards */}
      <div className="space-y-3">
        {items.map((report: any) => (
          <div key={report.id} onClick={() => setSelected(report)} className="rounded-xl p-5 border border-border bg-card hover:border-blue-300 transition-all cursor-pointer hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{new Date(report.createdAt).toLocaleDateString("ar-SA")}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${statusColors[report.status] || "bg-secondary text-muted-foreground"}`}>{report.status}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${typeColors[report.type] || "bg-secondary text-muted-foreground"}`}>{report.type}</span>
              </div>
              <div className="text-right flex-1 mr-4">
                <h4 className="text-sm font-semibold text-foreground">{report.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">RPT-{String(report.id).padStart(4, "0")} — {report.author || "النظام"}</p>
              </div>
            </div>
            {report.summary && (
              <p className="text-xs text-muted-foreground mt-2 text-right">{String(report.summary).slice(0, 120)}...</p>
            )}
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
              <h3 className="text-lg font-bold text-foreground">تفاصيل التقرير</h3>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <h4 className="text-base font-bold text-foreground mb-3">{selected.title}</h4>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${typeColors[selected.type] || "bg-secondary"}`}>{selected.type}</div>
                  <div className="text-xs text-muted-foreground mt-1">النوع</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${statusColors[selected.status] || "bg-secondary"}`}>{selected.status}</div>
                  <div className="text-xs text-muted-foreground mt-1">الحالة</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-sm font-bold text-foreground">{selected.author || "النظام"}</div>
                  <div className="text-xs text-muted-foreground mt-1">المؤلف</div>
                </div>
              </div>
              {selected.summary && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-foreground mb-2">الملخص</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{String(selected.summary)}</p>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                <span>تاريخ الإنشاء: {new Date(selected.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <button onClick={() => { toast.success("جاري تحميل التقرير..."); setSelected(null); }} className="w-full mt-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2">
                <Download size={14} />
                تحميل التقرير
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
