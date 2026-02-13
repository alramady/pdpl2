import Layout from "@/components/Layout";
import { Users, Search, Shield, AlertTriangle, Globe, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const vendors = [
  { id: "VA-001", name: "Gulf_Hackers_Team", aliases: ["GHT", "Gulf Hackers"], type: "مجموعة قرصنة", threat: "عالي", leaks: 42, firstSeen: "٢٠٢٥/٠٦", lastSeen: "١١ فبراير", platforms: ["تليجرام", "دارك ويب"], targets: ["حكومة", "بنوك", "اتصالات"] },
  { id: "VA-002", name: "KSA_Data_Market", aliases: ["KDM"], type: "سوق بيانات", threat: "عالي", leaks: 28, firstSeen: "٢٠٢٥/٠٨", lastSeen: "١٠ فبراير", platforms: ["تليجرام"], targets: ["تجزئة", "صحة"] },
  { id: "VA-003", name: "Saudi_InfoStealer_Logs", aliases: ["SIL", "InfoStealer SA"], type: "بائع بيانات", threat: "عالي", leaks: 35, firstSeen: "٢٠٢٥/٠٧", lastSeen: "١٠ فبراير", platforms: ["تليجرام", "مواقع لصق"], targets: ["حكومة", "شركات"] },
  { id: "VA-004", name: "BreachForums_SA_Seller", aliases: ["BF_SA"], type: "بائع منتدى", threat: "عالي", leaks: 22, firstSeen: "٢٠٢٥/٠٥", lastSeen: "٩ فبراير", platforms: ["دارك ويب"], targets: ["بنوك", "اتصالات", "حكومة"] },
  { id: "VA-005", name: "Arabian_Peninsula_Leaks", aliases: ["APL"], type: "مجموعة تسريب", threat: "متوسط", leaks: 22, firstSeen: "٢٠٢٥/٠٩", lastSeen: "٩ فبراير", platforms: ["تليجرام"], targets: ["تعليم", "صحة"] },
  { id: "VA-006", name: "XSS_Forum_KSA_Thread", aliases: ["XSS_KSA"], type: "خيط منتدى", threat: "عالي", leaks: 12, firstSeen: "٢٠٢٥/٠٤", lastSeen: "٨ فبراير", platforms: ["دارك ويب"], targets: ["حكومة", "بنوك"] }
];

const threatColors: Record<string, string> = {
  "عالي": "bg-red-500/20 text-red-400 border-red-500/30",
  "متوسط": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "محدود": "bg-blue-500/20 text-blue-400 border-blue-500/30"
};

export default function VendorFiles() {
  return (
    <Layout title="ملفات البائعين" titleEn="Vendor Files">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-gray-100 dark:border-white/5 relative overflow-hidden bg-white dark:bg-[#111827]">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">ملفات البائعين والمهددين</h2>
              <p className="text-xs text-gray-500">Vendor & Threat Actor Profiles</p>
              <p className="text-sm text-gray-400 mt-1">ملفات تعريف شاملة للجهات المهددة وبائعي البيانات المسربة</p>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <Users size={24} className="text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{vendors.length}</div>
          <div className="text-sm text-gray-400">جهات مهددة مرصودة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-red-400">{vendors.filter(v => v.threat === "عالي").length}</div>
          <div className="text-sm text-gray-400">تهديد عالي</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-amber-400">{vendors.reduce((s, v) => s + v.leaks, 0)}</div>
          <div className="text-sm text-gray-400">تسريبات مرتبطة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-purple-400">4</div>
          <div className="text-sm text-gray-400">منصات مراقبة</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="البحث في ملفات البائعين..." className="w-full bg-[#111827] border border-gray-200 dark:border-white/10 rounded-lg py-2 pr-10 pl-4 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-teal-500/50" />
        </div>
        <select className="bg-[#111827] border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option>جميع المستويات</option>
          <option>عالي</option>
          <option>متوسط</option>
          <option>محدود</option>
        </select>
      </div>

      {/* Vendor Cards */}
      <div className="space-y-4">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="rounded-xl p-5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:border-white/10 transition-all cursor-pointer bg-white dark:bg-[#111827]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded border ${threatColors[vendor.threat]}`}>تهديد {vendor.threat}</span>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded">{vendor.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h4 className="text-base font-semibold text-gray-800 dark:text-white">{vendor.name}</h4>
                  <p className="text-xs text-gray-500">{vendor.id} · الأسماء المستعارة: {vendor.aliases.join(", ")}</p>
                </div>
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Users size={18} className="text-red-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] text-center">
                <div className="text-xs text-gray-500">تسريبات</div>
                <div className="text-sm font-semibold text-amber-400">{vendor.leaks}</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] text-center">
                <div className="text-xs text-gray-500">أول ظهور</div>
                <div className="text-xs font-semibold text-gray-800 dark:text-white">{vendor.firstSeen}</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] text-center">
                <div className="text-xs text-gray-500">آخر نشاط</div>
                <div className="text-xs font-semibold text-gray-800 dark:text-white">{vendor.lastSeen}</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] text-center">
                <div className="text-xs text-gray-500">المنصات</div>
                <div className="text-xs font-semibold text-gray-800 dark:text-white">{vendor.platforms.length}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">اضغط لعرض الملف الكامل ←</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">الأهداف:</span>
                {vendor.targets.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-400">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
