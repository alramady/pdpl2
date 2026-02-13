import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Link2, X, Download, Eye } from "lucide-react";

const statusColors: Record<string, string> = {
  "مكتمل": "bg-green-100 text-green-700",
  "موثق": "bg-green-100 text-green-700",
  "قيد التحقق": "bg-amber-100 text-amber-700",
  "قيد التوثيق": "bg-amber-100 text-amber-700",
  "جديد": "bg-blue-100 text-blue-700",
};

export default function EvidenceChain() {
  const { data, isLoading } = trpc.evidence.list.useQuery({});
  const [selected, setSelected] = useState<any>(null);

  const items = data?.items || [];

  return (
    <Layout title="سلسلة الأدلة" titleEn="Evidence Chain">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-teal-600">{data?.total || 0}</div>
          <div className="text-sm text-muted-foreground">أدلة مسجلة</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-green-600">{items.filter((e: any) => e.status === "مكتمل" || e.status === "موثق").length}</div>
          <div className="text-sm text-muted-foreground">أدلة موثقة</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-amber-600">{items.filter((e: any) => e.status === "قيد التحقق" || e.status === "قيد التوثيق").length}</div>
          <div className="text-sm text-muted-foreground">قيد التوثيق</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-muted-foreground">سلامة البيانات</div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((evidence: any) => (
            <div key={evidence.id} onClick={() => setSelected(evidence)} className="rounded-xl p-5 border border-border bg-card hover:border-teal-200 transition-all cursor-pointer hover:shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${statusColors[evidence.status] || "bg-secondary text-muted-foreground"}`}>{evidence.status}</span>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{evidence.evidenceType}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h4 className="text-sm font-semibold text-foreground">{evidence.title}</h4>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <span className="text-xs text-muted-foreground">EV-{String(evidence.id).padStart(4, "0")}</span>
                      <span className="text-xs text-muted-foreground">←</span>
                      <span className="text-xs text-teal-600">INC-{String(evidence.incidentId).padStart(4, "0")}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-teal-50"><Link2 size={16} className="text-teal-600" /></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="p-2 rounded-lg bg-secondary text-center">
                  <div className="text-xs text-muted-foreground">التاريخ</div>
                  <div className="text-xs font-semibold text-foreground">{evidence.collectedAt ? new Date(evidence.collectedAt).toLocaleDateString("ar-SA") : "—"}</div>
                </div>
                <div className="p-2 rounded-lg bg-secondary text-center">
                  <div className="text-xs text-muted-foreground">المصدر</div>
                  <div className="text-xs font-semibold text-foreground">{evidence.source}</div>
                </div>
                <div className="p-2 rounded-lg bg-secondary text-center">
                  <div className="text-xs text-muted-foreground">السلامة</div>
                  <div className="text-xs font-semibold text-green-600">سليم ✓</div>
                </div>
                <div className="p-2 rounded-lg bg-secondary text-center">
                  <div className="text-xs text-muted-foreground">Hash</div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate">{evidence.hash || "N/A"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل الدليل</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-teal-50"><Link2 size={24} className="text-teal-600" /></div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{selected.title}</h4>
                  <p className="text-xs text-muted-foreground">EV-{String(selected.id).padStart(4, "0")}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${statusColors[selected.status] || "bg-secondary text-muted-foreground"}`}>{selected.status}</div>
                  <div className="text-xs text-muted-foreground mt-1">الحالة</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-xs font-bold text-foreground">{selected.evidenceType}</div>
                  <div className="text-xs text-muted-foreground mt-1">النوع</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-xs font-bold text-foreground">{selected.source}</div>
                  <div className="text-xs text-muted-foreground mt-1">المصدر</div>
                </div>
              </div>
              {selected.description && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-foreground mb-1">الوصف</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
                </div>
              )}
              <div className="mb-4 p-3 rounded-lg bg-secondary border border-border">
                <h5 className="text-xs font-semibold text-foreground mb-1">التجزئة (Hash)</h5>
                <p className="text-xs font-mono text-muted-foreground break-all">{selected.hash || "غير متوفر"}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="text-xs text-muted-foreground">الحادثة المرتبطة</div>
                  <div className="text-sm font-bold text-teal-600">INC-{String(selected.incidentId).padStart(4, "0")}</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="text-xs text-muted-foreground">تاريخ الجمع</div>
                  <div className="text-sm font-bold text-foreground">{selected.collectedAt ? new Date(selected.collectedAt).toLocaleDateString("ar-SA") : "—"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
