import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { ShieldCheck, CheckCircle, XCircle, Clock, X } from "lucide-react";

export default function Verification() {
  const { data: incidents } = trpc.incidents.list.useQuery({ limit: 50 });
  const { data: leaks } = trpc.leaks.list.useQuery({ limit: 50 });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  const verificationItems = [
    ...(incidents?.items?.map((inc: any) => ({ ...inc, itemType: "incident", verificationStatus: inc.status === "مغلق" ? "verified" : inc.status === "قيد التحقيق" ? "pending" : "unverified" })) || []),
    ...(leaks?.items?.map((leak: any) => ({ ...leak, itemType: "leak", verificationStatus: leak.severity === "حرج" ? "verified" : leak.severity === "عالي" ? "pending" : "unverified" })) || []),
  ];

  const filtered = filter === "all" ? verificationItems : verificationItems.filter(i => i.verificationStatus === filter);
  const verified = verificationItems.filter(i => i.verificationStatus === "verified").length;
  const pending = verificationItems.filter(i => i.verificationStatus === "pending").length;
  const unverified = verificationItems.filter(i => i.verificationStatus === "unverified").length;

  const statusLabels: Record<string, string> = { verified: "تم التحقق", pending: "قيد التحقق", unverified: "لم يتم التحقق" };
  const statusColors: Record<string, string> = { verified: "bg-green-100 text-green-700", pending: "bg-amber-100 text-amber-700", unverified: "bg-red-100 text-red-700" };
  const statusIcons: Record<string, any> = { verified: <CheckCircle size={14} className="text-green-500" />, pending: <Clock size={14} className="text-amber-500" />, unverified: <XCircle size={14} className="text-red-500" /> };

  return (
    <Layout title="التحقق" titleEn="Verification">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "إجمالي العناصر", value: verificationItems.length, icon: <ShieldCheck size={20} className="text-teal-600" />, bg: "bg-teal-50" },
          { label: "تم التحقق", value: verified, icon: <CheckCircle size={20} className="text-green-600" />, bg: "bg-green-50" },
          { label: "قيد التحقق", value: pending, icon: <Clock size={20} className="text-amber-600" />, bg: "bg-amber-50" },
          { label: "لم يتم التحقق", value: unverified, icon: <XCircle size={20} className="text-red-600" />, bg: "bg-red-50" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right"><div className="text-2xl font-bold text-foreground">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
              <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap justify-end">
          {[{ key: "all", label: "الكل" }, { key: "verified", label: "تم التحقق" }, { key: "pending", label: "قيد التحقق" }, { key: "unverified", label: "لم يتم التحقق" }].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${filter === f.key ? "bg-teal-600 text-white" : "bg-secondary text-muted-foreground hover:bg-gray-200"}`}>{f.label}</button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="p-3 text-xs text-muted-foreground font-medium text-right">العنصر</th>
              <th className="p-3 text-xs text-muted-foreground font-medium text-right">النوع</th>
              <th className="p-3 text-xs text-muted-foreground font-medium text-right">الخطورة</th>
              <th className="p-3 text-xs text-muted-foreground font-medium text-right">حالة التحقق</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 30).map((item: any, i: number) => (
              <tr key={i} onClick={() => setSelectedItem(item)} className="border-b border-gray-50 last:border-0 hover:bg-secondary cursor-pointer transition-colors">
                <td className="p-3 text-foreground font-medium">{item.title || item.description?.substring(0, 50)}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${item.itemType === "incident" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>{item.itemType === "incident" ? "حادثة" : "تسريب"}</span></td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${item.severity === "حرج" ? "bg-red-100 text-red-700" : item.severity === "عالي" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>{item.severity}</span></td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 w-fit ${statusColors[item.verificationStatus]}`}>{statusIcons[item.verificationStatus]} {statusLabels[item.verificationStatus]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedItem(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل التحقق</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">العنوان</span><span className="text-sm font-medium">{selectedItem.title || "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">النوع</span><span className="text-sm font-medium">{selectedItem.itemType === "incident" ? "حادثة" : "تسريب"}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الخطورة</span><span className={`text-xs px-2 py-0.5 rounded ${selectedItem.severity === "حرج" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>{selectedItem.severity}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">حالة التحقق</span><span className={`text-xs px-2 py-0.5 rounded ${statusColors[selectedItem.verificationStatus]}`}>{statusLabels[selectedItem.verificationStatus]}</span></div>
              {selectedItem.sector && <div className="flex justify-between"><span className="text-sm text-muted-foreground">القطاع</span><span className="text-sm font-medium">{selectedItem.sector}</span></div>}
              {selectedItem.source && <div className="flex justify-between"><span className="text-sm text-muted-foreground">المصدر</span><span className="text-sm font-medium">{selectedItem.source}</span></div>}
              {selectedItem.description && <div className="pt-2 border-t border-border"><span className="text-sm text-muted-foreground block mb-1">الوصف</span><p className="text-sm text-foreground bg-secondary rounded-lg p-3">{selectedItem.description}</p></div>}
              <div className="pt-3 border-t border-border flex gap-2">
                <button className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100">تأكيد التحقق</button>
                <button className="flex-1 py-2 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100">رفض</button>
                <button className="flex-1 py-2 bg-secondary text-foreground rounded-lg text-sm hover:bg-secondary">تعليق</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
