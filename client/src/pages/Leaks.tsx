import { useState } from "react";
import Layout from "@/components/Layout";
import { latestIncidents } from "@/lib/data";
import { Shield, Clock, AlertTriangle, CheckCircle2, Search, Download, Eye, Sparkles } from "lucide-react";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  "متوسط التأثير": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "محدود التأثير": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "مرتفع التأثير": "bg-red-500/20 text-red-400 border-red-500/30",
  "واسع النطاق": "bg-purple-500/20 text-purple-400 border-purple-500/30"
};

const allLeaks: Array<{id: string; title: string; sector: string; records: number; source: string; date: string; severity: string; piiTags: string[]; status?: string}> = [
  ...latestIncidents.map(l => ({...l, status: 'قيد التحليل'})),
  {
    id: "LK-2026-0170",
    title: "تسريب بيانات متقدمين من منصة جدارات - 421,076 سيرة ذاتية",
    sector: "التوظيف والموارد البشرية",
    records: 421076,
    source: "تليجرام",
    date: "١٣ فبراير",
    severity: "مرتفع التأثير",
    piiTags: ["CV", "National ID", "Phone", "Email"],
    status: "جديد"
  },
  {
    id: "LK-2026-0165",
    title: "قاعدة بيانات عملاء التجارة الإلكترونية",
    sector: "قطاع التجزئة",
    records: 34450,
    source: "تليجرام",
    date: "١٣ فبراير",
    severity: "متوسط التأثير",
    piiTags: ["Order History", "Phone", "Email"],
    status: "قيد التحليل"
  },
  {
    id: "LK-2026-0160",
    title: "بيانات مشتركي الاتصالات",
    sector: "قطاع الاتصالات",
    records: 26780,
    source: "تليجرام",
    date: "١٣ فبراير",
    severity: "مرتفع التأثير",
    piiTags: ["Phone", "National ID", "Address"],
    status: "جديد"
  }
];

export default function Leaks() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout title="التسريبات" titleEn="Leaks">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-400">329</div>
              <div className="text-sm text-gray-400">إجمالي التسريبات</div>
            </div>
            <div className="p-2 rounded-lg bg-teal-500/10">
              <Shield size={20} className="text-teal-400" />
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-400">92</div>
              <div className="text-sm text-gray-400">واسعة النطاق</div>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-400">50</div>
              <div className="text-sm text-gray-400">قيد التحليل</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock size={20} className="text-amber-400" />
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">51</div>
              <div className="text-sm text-gray-400">مكتملة</div>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <CheckCircle2 size={20} className="text-green-400" />
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-xl p-4 border border-white/5 mb-6 flex items-center gap-4 flex-wrap" style={{ background: "#111827" }}>
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="بحث في التسريبات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pr-10 pl-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
          />
        </div>
        <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-gray-300 focus:outline-none">
          <option>جميع المستويات</option>
          <option>واسع النطاق</option>
          <option>مرتفع</option>
          <option>متوسط</option>
          <option>محدود</option>
        </select>
        <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-gray-300 focus:outline-none">
          <option>جميع المصادر</option>
          <option>تليجرام</option>
          <option>دارك ويب</option>
          <option>مواقع اللصق</option>
        </select>
        <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-gray-300 focus:outline-none">
          <option>جميع الحالات</option>
          <option>جديد</option>
          <option>قيد التحليل</option>
          <option>مكتملة</option>
        </select>
        <button onClick={() => toast("تصدير CSV", { description: "قريباً" })} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10">
          <Download size={14} />
          تصدير CSV
        </button>
      </div>

      {/* Leak Cards */}
      <div className="space-y-4">
        {allLeaks.map((leak, i) => (
          <div key={i} className="rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all" style={{ background: "#111827" }}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <button className="p-1.5 rounded hover:bg-white/5 text-gray-400">
                  <Eye size={16} />
                </button>
                <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                  <Sparkles size={10} />
                  AI
                </span>
                <span className="text-xs text-gray-500">{leak.date}</span>
                <span className={`text-xs px-2 py-0.5 rounded border ${
                  leak.status === "جديد" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                  leak.status === "قيد التحليل" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                  "bg-blue-500/20 text-blue-400 border-blue-500/30"
                }`}>
                  {leak.status || "قيد التحليل"}
                </span>
                <span className="text-xs text-gray-500">🔗 {leak.source}</span>
              </div>
              <div className="text-right flex-1 mr-4">
                <div className="flex items-center gap-2 justify-end">
                  <span className={`text-xs px-2 py-0.5 rounded border ${severityColors[leak.severity] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
                    {leak.severity}
                  </span>
                  <h4 className="text-sm font-semibold text-white">{leak.title}</h4>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {leak.id} — {leak.sector} — {leak.records.toLocaleString()} سجل
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 justify-end">
              {leak.piiTags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
