import Layout from "@/components/Layout";
import { telegramChannels } from "@/lib/data";
import { Send, Search, RefreshCw, Filter, Eye, Users, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const impactColors: Record<string, string> = {
  "عالي": "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30",
  "متوسط": "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  "محدود": "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30"
};

const telegramLeaks = [
  { id: "LK-2026-0170", title: "تسريب بيانات متقدمين من منصة جدارات - 421,076 سيرة ذاتية", sector: "التوظيف والموارد البشرية", records: 421076, impact: "عالي", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLK5HZWM", title: "قاعدة بيانات عملاء التجارة الإلكترونية", sector: "قطاع التجزئة", records: 33412, impact: "متوسط", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLK5HZKT", title: "بيانات مشتركي الاتصالات", sector: "قطاع الاتصالات", records: 26148, impact: "عالي", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLK3W4KH", title: "قاعدة بيانات عملاء التجارة الإلكترونية", sector: "قطاع التجزئة", records: 34450, impact: "متوسط", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLK3CU6F", title: "بيانات مشتركي الاتصالات", sector: "قطاع الاتصالات", records: 26780, impact: "عالي", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLK2TMJ9", title: "بيانات مشتركي الاتصالات", sector: "قطاع الاتصالات", records: 24820, impact: "عالي", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLK1R0XY", title: "قاعدة بيانات عملاء التجارة الإلكترونية", sector: "قطاع التجزئة", records: 31206, impact: "متوسط", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLK17O0R", title: "تسريب بيانات اعتماد مصرفية سعودية", sector: "القطاع المصرفي", records: 18600, impact: "واسع النطاق", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLK053GZ", title: "دليل موظفي القطاع الحكومي", sector: "القطاع الحكومي", records: 7716, impact: "واسع النطاق", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLJZLT0Z", title: "دليل موظفي القطاع الحكومي", sector: "القطاع الحكومي", records: 6609, impact: "واسع النطاق", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLJYJ84Z", title: "دليل موظفي القطاع الحكومي", sector: "القطاع الحكومي", records: 9106, impact: "واسع النطاق", date: "١٣‏/٢‏/٢٠٢٦" },
  { id: "LK-MLJWXCW0", title: "تسريب بيانات اعتماد مصرفية سعودية", sector: "القطاع المصرفي", records: 18671, impact: "واسع النطاق", date: "١٢‏/٢‏/٢٠٢٦" },
  { id: "LK-MLJTPM5G", title: "تسريب بيانات اعتماد مصرفية سعودية", sector: "القطاع المصرفي", records: 17786, impact: "واسع النطاق", date: "١٢‏/٢‏/٢٠٢٦" },
  { id: "LK-MLJT6BO3", title: "سجلات مرضى قطاع الصحة", sector: "القطاع الصحي", records: 9862, impact: "عالي", date: "١٢‏/٢‏/٢٠٢٦" },
  { id: "LK-MLJRKH33", title: "بيانات مشتركي الاتصالات", sector: "قطاع الاتصالات", records: 24090, impact: "عالي", date: "١٢‏/٢‏/٢٠٢٦" },
];

const impactBadgeColors: Record<string, string> = {
  "عالي": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  "متوسط": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  "واسع النطاق": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
  "محدود": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
};

export default function Telegram() {
  const activeChannels = telegramChannels.filter(c => c.status === "نشط").length;
  const totalLeaks = telegramChannels.reduce((sum, c) => sum + c.leaks, 0);
  const highImpact = telegramChannels.filter(c => c.impact === "عالي").length;

  return (
    <Layout title="رصد تليجرام" titleEn="Telegram">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-gray-100 dark:border-white/5 relative overflow-hidden bg-white dark:bg-[#111827]">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">رصد تليجرام</h2>
              <p className="text-xs text-gray-500">Telegram Channel Monitoring</p>
              <p className="text-sm text-gray-400 mt-1">مراقبة القنوات التي تبيع أو تشارك قواعد بيانات سعودية باستخدام Telethon API</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
              <Send size={24} className="text-blue-500 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{telegramChannels.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">قنوات مراقبة</div>
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{activeChannels}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">قنوات نشطة</div>
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{totalLeaks}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">تسريبات مكتشفة</div>
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{highImpact}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">قنوات عالية التأثير</div>
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-1">اضغط للتفاصيل ←</div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="البحث في القنوات..."
            className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-lg py-2 pr-10 pl-4 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-teal-400"
          />
        </div>
        <button onClick={() => toast.success("تم التحديث")} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">
          <RefreshCw size={14} />
          تحديث
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">
          <Filter size={14} />
          فلترة
        </button>
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {telegramChannels.map((channel) => (
          <div key={channel.id} className="rounded-xl p-5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all cursor-pointer bg-white dark:bg-[#111827]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${channel.status === "نشط" ? "bg-green-500" : "bg-red-500"}`} />
                <span className={`text-xs ${channel.status === "نشط" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {channel.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{channel.name}</h4>
                  <p className="text-xs text-gray-400">{channel.id}</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <Send size={16} className="text-blue-500 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02]">
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{channel.subscribers.toLocaleString()}</div>
                <div className="text-xs text-gray-400">مشترك</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02]">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{channel.leaks}</div>
                <div className="text-xs text-gray-400">تسريب</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02]">
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{channel.lastActivity}</div>
                <div className="text-xs text-gray-400">آخر نشاط</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-teal-600 dark:text-teal-400">اضغط للتفاصيل ←</span>
              <span className={`text-xs px-2 py-0.5 rounded border ${impactColors[channel.impact]}`}>
                تأثير {channel.impact}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Telegram Leaks Table */}
      <div className="rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-white/5">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white text-right">أحدث تسريبات تليجرام</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" dir="rtl">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/[0.02]">
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">المعرّف</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">العنوان</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">القطاع</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">السجلات</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">التأثير</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {telegramLeaks.map((leak, i) => (
                <tr key={leak.id} className="border-t border-gray-50 dark:border-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{leak.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 font-medium">{leak.title}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{leak.sector}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300 font-mono">{leak.records.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${impactBadgeColors[leak.impact] || "bg-gray-100 text-gray-600"}`}>
                      {leak.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{leak.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
