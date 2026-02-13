import Layout from "@/components/Layout";
import { telegramChannels } from "@/lib/data";
import { Send, Search, RefreshCw, Filter, Eye, Users, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const impactColors: Record<string, string> = {
  "عالي": "bg-red-500/20 text-red-400 border-red-500/30",
  "متوسط": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "محدود": "bg-blue-500/20 text-blue-400 border-blue-500/30"
};

export default function Telegram() {
  const activeChannels = telegramChannels.filter(c => c.status === "نشط").length;
  const totalLeaks = telegramChannels.reduce((sum, c) => sum + c.leaks, 0);
  const highImpact = telegramChannels.filter(c => c.impact === "عالي").length;

  return (
    <Layout title="رصد تليجرام" titleEn="Telegram">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-white/5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d2137 100%)" }}>
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">رصد تليجرام</h2>
              <p className="text-xs text-gray-500">Telegram Channel Monitoring</p>
              <p className="text-sm text-gray-400 mt-1">مراقبة القنوات التي تبيع أو تشارك قواعد بيانات سعودية باستخدام Telethon API</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Send size={24} className="text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-teal-400">{telegramChannels.length}</div>
          <div className="text-sm text-gray-400">قنوات مراقبة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-green-400">{activeChannels}</div>
          <div className="text-sm text-gray-400">قنوات نشطة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-amber-400">{totalLeaks}</div>
          <div className="text-sm text-gray-400">تسريبات مكتشفة</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-red-400">{highImpact}</div>
          <div className="text-sm text-gray-400">قنوات عالية التأثير</div>
          <div className="text-xs text-gray-600 mt-1">اضغط للتفاصيل ←</div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="البحث في القنوات..."
            className="w-full bg-[#111827] border border-white/10 rounded-lg py-2 pr-10 pl-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
          />
        </div>
        <button onClick={() => toast.success("تم التحديث")} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10">
          <RefreshCw size={14} />
          تحديث
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10">
          <Filter size={14} />
          فلترة
        </button>
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {telegramChannels.map((channel) => (
          <div key={channel.id} className="rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all cursor-pointer" style={{ background: "#111827" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs ${channel.status === "نشط" ? "text-green-400" : "text-red-400"}`}>
                  ● {channel.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h4 className="text-sm font-semibold text-white">{channel.name}</h4>
                  <p className="text-xs text-gray-500">{channel.id}</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Send size={16} className="text-blue-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center p-2 rounded-lg bg-white/[0.02]">
                <div className="text-xs text-gray-500">مشترك</div>
                <div className="text-sm font-semibold text-white">{channel.subscribers.toLocaleString()}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/[0.02]">
                <div className="text-xs text-gray-500">تسريب</div>
                <div className="text-sm font-semibold text-amber-400">{channel.leaks}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/[0.02]">
                <div className="text-xs text-gray-500">آخر نشاط</div>
                <div className="text-sm font-semibold text-white">{channel.lastActivity}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">اضغط للتفاصيل ←</span>
              <span className={`text-xs px-2 py-0.5 rounded border ${impactColors[channel.impact]}`}>
                تأثير {channel.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
