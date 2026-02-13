import Layout from "@/components/Layout";
import { darkWebSources, darkWebListings } from "@/lib/data";
import { Globe, RefreshCw, Shield, DollarSign, Database, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const impactColors: Record<string, string> = {
  "عالي": "bg-red-500/20 text-red-400 border-red-500/30",
  "متوسط": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "محدود": "bg-blue-500/20 text-blue-400 border-blue-500/30"
};

const severityColors: Record<string, string> = {
  "واسع النطاق": "bg-red-500/20 text-red-400",
  "عالي": "bg-amber-500/20 text-amber-400",
  "متوسط": "bg-blue-500/20 text-blue-400",
  "محدود": "bg-gray-500/20 text-gray-400"
};

export default function DarkWeb() {
  return (
    <Layout title="الدارك ويب" titleEn="Dark Web">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-white/5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #1a0d2e 100%)" }}>
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">رصد الدارك ويب</h2>
              <p className="text-xs text-gray-500">Dark Web Monitoring</p>
              <p className="text-sm text-gray-400 mt-1">مراقبة منتديات بيع البيانات وأسواق البيانات المسربة عبر شبكة Tor</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Globe size={24} className="text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-teal-400">10</div>
          <div className="text-sm text-gray-400">مصادر مراقبة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-purple-400">131</div>
          <div className="text-sm text-gray-400">تسريبات مكتشفة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-amber-400">35</div>
          <div className="text-sm text-gray-400">عروض بيع نشطة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-red-400">34,326,000</div>
          <div className="text-sm text-gray-400">سجلات مكشوفة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
      </div>

      {/* Sources */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => toast.success("تم التحديث")} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10">
            <RefreshCw size={14} />
            تحديث
          </button>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            المصادر المراقبة
            <Globe size={16} className="text-purple-400" />
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {darkWebSources.map((source) => (
            <div key={source.id} className="rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all cursor-pointer" style={{ background: "#111827" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${source.status === "نشط" ? "text-green-400" : "text-red-400"}`}>
                    ● {source.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h4 className="text-sm font-semibold text-white">{source.name}</h4>
                    <p className="text-xs text-gray-500">{source.id}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Globe size={16} className="text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">اضغط للتفاصيل ←</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${impactColors[source.impact]}`}>
                    تأثير {source.impact}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Shield size={12} />
                    {source.leaks} تسريب
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">آخر عروض البيع المرصودة</h3>
        <div className="space-y-4">
          {darkWebListings.map((listing, i) => (
            <div key={i} className="rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all cursor-pointer" style={{ background: "#111827" }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-amber-400">{listing.price}</div>
                    <div className="text-xs text-gray-500">{listing.records.toLocaleString()} سجل</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${severityColors[listing.severity]}`}>{listing.severity}</span>
                    <span className="text-xs text-gray-500">{listing.source}</span>
                    <span className="text-xs text-gray-600">{listing.date}</span>
                  </div>
                </div>
                <div className="text-right flex-1 mr-4">
                  <h4 className="text-sm font-semibold text-white">{listing.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{listing.titleEn}</p>
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
