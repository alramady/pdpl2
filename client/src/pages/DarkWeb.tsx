import Layout from "@/components/Layout";
import { darkWebSources, darkWebListings } from "@/lib/data";
import { Globe, RefreshCw, Shield, DollarSign, Database, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const impactColors: Record<string, string> = {
  "عالي": "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30",
  "متوسط": "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  "محدود": "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30"
};

const severityColors: Record<string, string> = {
  "واسع النطاق": "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400",
  "عالي": "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
  "متوسط": "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
  "محدود": "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400"
};

export default function DarkWeb() {
  return (
    <Layout title="الدارك ويب" titleEn="Dark Web">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-gray-100 dark:border-white/5 relative overflow-hidden bg-white dark:bg-[#111827]">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">رصد الدارك ويب</h2>
              <p className="text-xs text-gray-500">Dark Web Monitoring</p>
              <p className="text-sm text-gray-400 mt-1">مراقبة منتديات بيع البيانات وأسواق البيانات المسربة عبر شبكة Tor</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20">
              <Globe size={24} className="text-purple-500 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">10</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">مصادر مراقبة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">131</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">تسريبات مكتشفة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">35</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">عروض بيع نشطة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">34,326,000</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">سجلات مكشوفة</div>
        </div>
      </div>

      {/* Sources */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => toast.success("تم التحديث")} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">
            <RefreshCw size={14} />
            تحديث
          </button>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            المصادر المراقبة
            <Globe size={16} className="text-purple-500 dark:text-purple-400" />
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {darkWebSources.map((source) => (
            <div key={source.id} className="rounded-xl p-5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all cursor-pointer bg-white dark:bg-[#111827]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${source.status === "نشط" ? "bg-green-500" : "bg-red-500"}`} />
                  <span className={`text-xs ${source.status === "نشط" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {source.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{source.name}</h4>
                    <p className="text-xs text-gray-400">{source.id}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                    <Globe size={16} className="text-purple-500 dark:text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-600 dark:text-teal-400">اضغط للتفاصيل ←</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded border ${impactColors[source.impact]}`}>
                    تأثير {source.impact}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
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
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-right">آخر عروض البيع المرصودة</h3>
        <div className="space-y-4">
          {darkWebListings.map((listing, i) => (
            <div key={i} className="rounded-xl p-5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all cursor-pointer bg-white dark:bg-[#111827]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-amber-600 dark:text-amber-400">{listing.price}</div>
                    <div className="text-xs text-gray-500">{listing.records.toLocaleString()} سجل</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${severityColors[listing.severity]}`}>{listing.severity}</span>
                    <span className="text-xs text-gray-500">{listing.source}</span>
                    <span className="text-xs text-gray-400">{listing.date}</span>
                  </div>
                </div>
                <div className="text-right flex-1 mr-4">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{listing.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{listing.titleEn}</p>
                </div>
              </div>
              <div className="text-xs text-teal-600 dark:text-teal-400 mt-2">اضغط للتفاصيل ←</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
