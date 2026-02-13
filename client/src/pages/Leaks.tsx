import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Shield, Clock, AlertTriangle, CheckCircle2, Search, Download, Eye, Sparkles, ChevronLeft, ChevronRight, X, ExternalLink, Fingerprint } from "lucide-react";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  "واسع النطاق": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30",
  "عالي": "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
  "متوسط": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  "محدود": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30",
};

const statusColors: Record<string, string> = {
  "جديد": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  "قيد التحليل": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  "موثّق": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  "مكتمل": "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400",
};

const sourceColors: Record<string, string> = {
  "تليجرام": "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400",
  "دارك ويب": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
  "مواقع اللصق": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
};

export default function Leaks() {
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);

  const [searchQuery, setSearchQuery] = useState("");
  const [severity, setSeverity] = useState(params.get("severity") || "");
  const [source, setSource] = useState(params.get("source") || "");
  const [status, setStatus] = useState(params.get("status") || "");
  const [page, setPage] = useState(0);
  const [selectedLeak, setSelectedLeak] = useState<any>(null);
  const limit = 20;

  const { data, isLoading } = trpc.leaks.list.useQuery({
    limit,
    offset: page * limit,
    severity: severity || undefined,
    source: source || undefined,
    status: status || undefined,
    search: searchQuery || undefined,
  });

  const leaks = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Stats
  const { data: allLeaksData } = trpc.leaks.list.useQuery({ limit: 1 });
  const totalLeaks = allLeaksData?.total || 0;

  const handleExport = () => {
    const csv = leaks.map((l: any) => `${l.id},${l.title},${l.severity},${l.source},${l.recordCount},${l.status}`).join("\n");
    const blob = new Blob(["ID,Title,Severity,Source,Records,Status\n" + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leaks_export.csv";
    a.click();
    toast.success("تم تصدير البيانات بنجاح");
  };

  return (
    <Layout title="التسريبات" titleEn="Leaks">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div onClick={() => { setSeverity(""); setSource(""); setStatus(""); }} className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{totalLeaks}</div>
              <div className="text-sm text-gray-500">إجمالي التسريبات</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10">
              <Shield size={20} className="text-red-500" />
            </div>
          </div>
        </div>
        <div onClick={() => { setSeverity("واسع النطاق"); setStatus(""); setSource(""); }} className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">واسعة</div>
              <div className="text-sm text-gray-500">واسعة النطاق</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10">
              <AlertTriangle size={20} className="text-amber-500" />
            </div>
          </div>
        </div>
        <div onClick={() => { setStatus("قيد التحليل"); setSeverity(""); setSource(""); }} className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">تحليل</div>
              <div className="text-sm text-gray-500">قيد التحليل</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10">
              <Clock size={20} className="text-amber-500" />
            </div>
          </div>
        </div>
        <div onClick={() => { setStatus("مكتمل"); setSeverity(""); setSource(""); }} className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">مكتمل</div>
              <div className="text-sm text-gray-500">مكتملة</div>
            </div>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-500/10">
              <CheckCircle2 size={20} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 mb-6 flex items-center gap-4 flex-wrap bg-white dark:bg-[#111827]">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث في التسريبات..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 pr-10 pl-4 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-teal-400"
          />
        </div>
        <select value={severity} onChange={(e) => { setSeverity(e.target.value); setPage(0); }} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option value="">جميع المستويات</option>
          <option value="واسع النطاق">واسع النطاق</option>
          <option value="عالي">عالي</option>
          <option value="متوسط">متوسط</option>
          <option value="محدود">محدود</option>
        </select>
        <select value={source} onChange={(e) => { setSource(e.target.value); setPage(0); }} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option value="">جميع المصادر</option>
          <option value="تليجرام">تليجرام</option>
          <option value="دارك ويب">دارك ويب</option>
          <option value="مواقع اللصق">مواقع اللصق</option>
        </select>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(0); }} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option value="">جميع الحالات</option>
          <option value="جديد">جديد</option>
          <option value="قيد التحليل">قيد التحليل</option>
          <option value="موثّق">موثّق</option>
          <option value="مكتمل">مكتمل</option>
        </select>
        {(severity || source || status || searchQuery) && (
          <button onClick={() => { setSeverity(""); setSource(""); setStatus(""); setSearchQuery(""); setPage(0); }} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
            <X size={12} />
            مسح الفلاتر
          </button>
        )}
        <button onClick={handleExport} className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition-colors">
          <Download size={14} />
          تصدير CSV
        </button>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">
          صفحة {page + 1} من {totalPages || 1}
        </div>
        <div className="text-sm text-gray-500">
          {total} نتيجة
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Leak Cards */}
      <div className="space-y-3">
        {leaks.map((leak: any) => (
          <div
            key={leak.id}
            onClick={() => setSelectedLeak(leak)}
            className="rounded-xl p-5 border border-gray-100 dark:border-white/5 hover:border-teal-300 dark:hover:border-teal-500/30 transition-all bg-white dark:bg-[#111827] hover:shadow-sm cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {new Date(leak.discoveredAt).toLocaleDateString("ar-SA")}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${statusColors[leak.status] || "bg-gray-100 text-gray-600"}`}>
                  {leak.status}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${sourceColors[leak.source] || "bg-gray-100 text-gray-600"}`}>
                  {leak.source}
                </span>
              </div>
              <div className="text-right flex-1 mr-4">
                <div className="flex items-center gap-2 justify-end">
                  <span className={`text-xs px-2 py-0.5 rounded border ${severityColors[leak.severity] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                    {leak.severity}
                  </span>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{leak.title}</h4>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  LK-{String(leak.id).padStart(4, "0")} — {Number(leak.recordCount).toLocaleString()} سجل
                </p>
              </div>
            </div>
            {leak.dataTypes && (
              <div className="flex items-center gap-2 mt-3 justify-end flex-wrap">
                {(Array.isArray(leak.dataTypes) ? leak.dataTypes : []).map((tag: string) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-gray-50 dark:bg-white/5 text-gray-500 border border-gray-200 dark:border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300"
          >
            <ChevronRight size={16} />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = page < 3 ? i : page > totalPages - 3 ? totalPages - 5 + i : page - 2 + i;
              if (pageNum < 0 || pageNum >= totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${page === pageNum ? "bg-teal-600 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"}`}
                >
                  {pageNum + 1}
                </button>
              );
            })}
          </div>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(p => p + 1)}
            className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      {/* Leak Detail Modal */}
      {selectedLeak && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedLeak(null)}>
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 w-full max-w-2xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5">
              <button onClick={() => setSelectedLeak(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400">
                <X size={18} />
              </button>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">تفاصيل التسريب</h3>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <h4 className="text-base font-bold text-gray-800 dark:text-white mb-3">{selectedLeak.title}</h4>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 text-center">
                  <div className="text-xl font-bold text-red-600">{Number(selectedLeak.recordCount).toLocaleString()}</div>
                  <div className="text-xs text-gray-500">سجل مكشوف</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${severityColors[selectedLeak.severity] || "bg-gray-100 text-gray-600"}`}>
                    {selectedLeak.severity}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">مستوى الخطورة</div>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                  <span className={`text-xs px-2 py-0.5 rounded ${sourceColors[selectedLeak.source] || "bg-gray-100 text-gray-600"}`}>{selectedLeak.source}</span>
                  <span className="text-sm text-gray-500">المصدر</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                  <span className={`text-xs px-2 py-0.5 rounded ${statusColors[selectedLeak.status] || "bg-gray-100 text-gray-600"}`}>{selectedLeak.status}</span>
                  <span className="text-sm text-gray-500">الحالة</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                  <span className="text-sm text-gray-700 dark:text-gray-200">{new Date(selectedLeak.discoveredAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span className="text-sm text-gray-500">تاريخ الاكتشاف</span>
                </div>
                {selectedLeak.sourceUrl && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                    <a href={String(selectedLeak.sourceUrl)} target="_blank" rel="noopener" className="text-sm text-teal-600 hover:underline flex items-center gap-1">
                      <ExternalLink size={12} />
                      عرض المصدر
                    </a>
                    <span className="text-sm text-gray-500">رابط المصدر</span>
                  </div>
                )}
              </div>

              {selectedLeak.description && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">الوصف</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{String(selectedLeak.description)}</p>
                </div>
              )}

              {selectedLeak.dataTypes && Array.isArray(selectedLeak.dataTypes) && selectedLeak.dataTypes.length > 0 && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">أنواع البيانات المسربة</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedLeak.dataTypes.map((tag: string) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 flex items-center gap-1">
                        <Fingerprint size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedLeak(null); navigate(`/leaks/${selectedLeak.id}`); }}
                  className="flex-1 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors text-sm"
                >
                  عرض الصفحة الكاملة
                </button>
                <button
                  onClick={() => { setSelectedLeak(null); navigate(`/evidence-chain?incidentId=${selectedLeak.id}`); }}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm"
                >
                  سلسلة الأدلة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
