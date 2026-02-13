import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Bell, Mail, MessageSquare, Phone, Webhook, X, CheckCircle, XCircle, Settings } from "lucide-react";

export default function AlertChannels() {
  const { data: channels, isLoading } = trpc.alertChannels.list.useQuery();
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  const typeIcons: Record<string, any> = { "email": <Mail size={18} />, "sms": <Phone size={18} />, "telegram": <MessageSquare size={18} />, "webhook": <Webhook size={18} />, "slack": <MessageSquare size={18} /> };
  const typeColors: Record<string, string> = { "email": "bg-blue-50 text-blue-600", "sms": "bg-green-50 text-green-600", "telegram": "bg-sky-50 text-sky-600", "webhook": "bg-purple-50 text-purple-600", "slack": "bg-amber-50 text-amber-600" };

  return (
    <Layout title="قنوات التنبيه" titleEn="Alert Channels">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "إجمالي القنوات", value: channels?.length || 0, icon: <Bell size={20} className="text-teal-600" />, bg: "bg-teal-50" },
          { label: "نشطة", value: channels?.filter((c: any) => c.isActive).length || 0, icon: <CheckCircle size={20} className="text-green-600" />, bg: "bg-green-50" },
          { label: "معطلة", value: channels?.filter((c: any) => !c.isActive).length || 0, icon: <XCircle size={20} className="text-red-600" />, bg: "bg-red-50" },
          { label: "أنواع", value: new Set(channels?.map((c: any) => c.channelType)).size || 0, icon: <Settings size={20} className="text-purple-600" />, bg: "bg-purple-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right"><div className="text-2xl font-bold text-gray-800">{s.value}</div><div className="text-xs text-gray-500">{s.label}</div></div>
              <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center"><div className="animate-spin w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full mx-auto" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels?.map((ch: any) => (
            <div key={ch.id} onClick={() => setSelectedChannel(ch)} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2 py-0.5 rounded ${ch.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{ch.isActive ? "نشط" : "معطل"}</span>
                <div className={`p-2 rounded-lg ${typeColors[ch.channelType] || "bg-gray-50 text-gray-600"}`}>{typeIcons[ch.channelType] || <Bell size={18} />}</div>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 text-right">{ch.nameAr}</h3>
              <p className="text-xs text-gray-400 text-right mt-0.5">{ch.channelType.toUpperCase()}</p>
              {ch.config && <p className="text-xs text-gray-500 text-right mt-2 truncate">{String(ch.config)}</p>}
            </div>
          ))}
        </div>
      )}

      {selectedChannel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedChannel(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedChannel(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
              <h3 className="text-lg font-bold text-gray-800">تفاصيل القناة</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-gray-500">الاسم</span><span className="text-sm font-medium">{selectedChannel.nameAr}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">النوع</span><span className="text-sm font-medium">{selectedChannel.channelType}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">الحالة</span><span className={`text-xs px-2 py-0.5 rounded ${selectedChannel.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{selectedChannel.isActive ? "نشط" : "معطل"}</span></div>
              {selectedChannel.config && <div className="pt-2 border-t border-gray-100"><span className="text-sm text-gray-500 block mb-1">الإعدادات</span><pre className="text-xs bg-gray-50 rounded-lg p-3 text-gray-600 overflow-auto" dir="ltr">{JSON.stringify(selectedChannel.config, null, 2)}</pre></div>}
              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100">اختبار القناة</button>
                <button className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-gray-100">تعديل</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
