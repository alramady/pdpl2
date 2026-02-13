import { useState } from "react";
import Layout from "@/components/Layout";
import { Users, X, AlertTriangle } from "lucide-react";

const vendors = [
  { id: 1, name: "Gulf_Hackers_Team", aliases: ["GHT", "Gulf Hackers"], type: "مجموعة قرصنة", threat: "عالي", leaks: 42, firstSeen: "2025-06-01", lastSeen: "2026-02-11", platforms: ["تليجرام", "دارك ويب"], targets: ["حكومة", "بنوك", "اتصالات"], description: "مجموعة قرصنة نشطة تستهدف البنية التحتية السعودية. تنشر تسريبات بشكل دوري على قنوات تليجرام ومنتديات الدارك ويب." },
  { id: 2, name: "KSA_Data_Market", aliases: ["KDM"], type: "سوق بيانات", threat: "عالي", leaks: 28, firstSeen: "2025-08-01", lastSeen: "2026-02-10", platforms: ["تليجرام"], targets: ["تجزئة", "صحة"], description: "سوق إلكتروني لبيع البيانات المسربة من مؤسسات سعودية. يعمل عبر بوت تليجرام مشفر." },
  { id: 3, name: "Saudi_InfoStealer_Logs", aliases: ["SIL", "InfoStealer SA"], type: "بائع بيانات", threat: "عالي", leaks: 35, firstSeen: "2025-07-01", lastSeen: "2026-02-10", platforms: ["تليجرام", "مواقع لصق"], targets: ["حكومة", "شركات"], description: "يبيع سجلات InfoStealer مستخرجة من أجهزة مصابة في السعودية. يشمل بيانات اعتماد وملفات تعريف ارتباط." },
  { id: 4, name: "BreachForums_SA_Seller", aliases: ["BF_SA"], type: "بائع منتدى", threat: "عالي", leaks: 22, firstSeen: "2025-05-01", lastSeen: "2026-02-09", platforms: ["دارك ويب"], targets: ["بنوك", "اتصالات", "حكومة"], description: "بائع نشط على BreachForums متخصص في بيع قواعد بيانات سعودية مسربة." },
  { id: 5, name: "Arabian_Peninsula_Leaks", aliases: ["APL"], type: "مجموعة تسريب", threat: "متوسط", leaks: 22, firstSeen: "2025-09-01", lastSeen: "2026-02-09", platforms: ["تليجرام"], targets: ["تعليم", "صحة"], description: "مجموعة تسريب تركز على قطاعي التعليم والصحة في دول الخليج." },
  { id: 6, name: "XSS_Forum_KSA_Thread", aliases: ["XSS_KSA"], type: "خيط منتدى", threat: "عالي", leaks: 12, firstSeen: "2025-04-01", lastSeen: "2026-02-08", platforms: ["دارك ويب"], targets: ["حكومة", "بنوك"], description: "خيط نقاش على منتدى XSS يركز على ثغرات المواقع الحكومية السعودية." },
];

const threatColors: Record<string, string> = {
  "عالي": "bg-red-100 text-red-700 border-red-200",
  "متوسط": "bg-amber-100 text-amber-700 border-amber-200",
  "محدود": "bg-blue-100 text-blue-700 border-blue-200",
};

export default function VendorFiles() {
  const [selected, setSelected] = useState<typeof vendors[0] | null>(null);

  return (
    <Layout title="ملفات البائعين" titleEn="Vendor Files">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-teal-600">{vendors.length}</div>
          <div className="text-sm text-muted-foreground">جهات مهددة مرصودة</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-red-600">{vendors.filter(v => v.threat === "عالي").length}</div>
          <div className="text-sm text-muted-foreground">تهديد عالي</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-amber-600">{vendors.reduce((s, v) => s + v.leaks, 0)}</div>
          <div className="text-sm text-muted-foreground">تسريبات مرتبطة</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-purple-600">4</div>
          <div className="text-sm text-muted-foreground">منصات مراقبة</div>
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="space-y-4">
        {vendors.map((vendor) => (
          <div key={vendor.id} onClick={() => setSelected(vendor)} className="rounded-xl p-5 border border-border hover:border-red-200 transition-all cursor-pointer bg-card hover:shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded border ${threatColors[vendor.threat]}`}>تهديد {vendor.threat}</span>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{vendor.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h4 className="text-base font-semibold text-foreground">{vendor.name}</h4>
                  <p className="text-xs text-muted-foreground">الأسماء المستعارة: {vendor.aliases.join(", ")}</p>
                </div>
                <div className="p-2 rounded-lg bg-red-50"><Users size={18} className="text-red-500" /></div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="p-2 rounded-lg bg-secondary text-center">
                <div className="text-xs text-muted-foreground">تسريبات</div>
                <div className="text-sm font-semibold text-amber-600">{vendor.leaks}</div>
              </div>
              <div className="p-2 rounded-lg bg-secondary text-center">
                <div className="text-xs text-muted-foreground">أول ظهور</div>
                <div className="text-xs font-semibold text-foreground">{new Date(vendor.firstSeen).toLocaleDateString("ar-SA")}</div>
              </div>
              <div className="p-2 rounded-lg bg-secondary text-center">
                <div className="text-xs text-muted-foreground">آخر نشاط</div>
                <div className="text-xs font-semibold text-foreground">{new Date(vendor.lastSeen).toLocaleDateString("ar-SA")}</div>
              </div>
              <div className="p-2 rounded-lg bg-secondary text-center">
                <div className="text-xs text-muted-foreground">المنصات</div>
                <div className="text-xs font-semibold text-foreground">{vendor.platforms.length}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-teal-600">اضغط لعرض الملف الكامل ←</span>
              <div className="flex items-center gap-2">
                {vendor.targets.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-2xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">ملف الجهة المهددة</h3>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-red-50"><Users size={24} className="text-red-500" /></div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{selected.name}</h4>
                  <p className="text-xs text-muted-foreground">الأسماء المستعارة: {selected.aliases.join(", ")}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-sm font-bold px-2 py-1 rounded inline-block ${threatColors[selected.threat]}`}>تهديد {selected.threat}</div>
                  <div className="text-xs text-muted-foreground mt-1">مستوى التهديد</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-sm font-bold text-foreground">{selected.type}</div>
                  <div className="text-xs text-muted-foreground mt-1">النوع</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-sm font-bold text-amber-600">{selected.leaks}</div>
                  <div className="text-xs text-muted-foreground mt-1">تسريبات</div>
                </div>
              </div>
              <div className="mb-5">
                <h5 className="text-sm font-semibold text-foreground mb-2">الوصف</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
              </div>
              <div className="mb-5">
                <h5 className="text-sm font-semibold text-foreground mb-2">المنصات النشطة</h5>
                <div className="flex flex-wrap gap-2">
                  {selected.platforms.map((p) => (
                    <span key={p} className="text-xs px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">{p}</span>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <h5 className="text-sm font-semibold text-foreground mb-2">القطاعات المستهدفة</h5>
                <div className="flex flex-wrap gap-2">
                  {selected.targets.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">{t}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="text-xs text-muted-foreground">أول ظهور</div>
                  <div className="text-sm font-bold text-foreground">{new Date(selected.firstSeen).toLocaleDateString("ar-SA", { year: "numeric", month: "long" })}</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="text-xs text-muted-foreground">آخر نشاط</div>
                  <div className="text-sm font-bold text-foreground">{new Date(selected.lastSeen).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
