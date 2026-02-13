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
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right"><div className="text-2xl font-bold text-foreground">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
              <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center"><div className="animate-spin w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full mx-auto" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels?.map((ch: any) => (
            <div key={ch.id} onClick={() => setSelectedChannel(ch)} className="bg-card rounded-xl border border-border p-5 hover:border-border transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2 py-0.5 rounded ${ch.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{ch.isActive ? "نشط" : "معطل"}</span>
                <div className={`p-2 rounded-lg ${typeColors[ch.channelType] || "bg-secondary text-muted-foreground"}`}>{typeIcons[ch.channelType] || <Bell size={18} />}</div>
              </div>
              <h3 className="text-sm font-semibold text-foreground text-right">{ch.nameAr}</h3>
              <p className="text-xs text-muted-foreground text-right mt-0.5">{ch.channelType.toUpperCase()}</p>
              {ch.config && <p className="text-xs text-muted-foreground text-right mt-2 truncate">{String(ch.config)}</p>}
            </div>
          ))}
        </div>
      )}

      {selectedChannel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedChannel(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedChannel(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل القناة</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الاسم</span><span className="text-sm font-medium">{selectedChannel.nameAr}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">النوع</span><span className="text-sm font-medium">{selectedChannel.channelType}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الحالة</span><span className={`text-xs px-2 py-0.5 rounded ${selectedChannel.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{selectedChannel.isActive ? "نشط" : "معطل"}</span></div>
              {selectedChannel.config && <div className="pt-2 border-t border-border"><span className="text-sm text-muted-foreground block mb-1">الإعدادات</span><pre className="text-xs bg-secondary rounded-lg p-3 text-muted-foreground overflow-auto" dir="ltr">{JSON.stringify(selectedChannel.config, null, 2)}</pre></div>}
              <div className="pt-3 border-t border-border flex gap-2">
                <button className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100">اختبار القناة</button>
                <button className="flex-1 py-2 bg-secondary text-foreground rounded-lg text-sm hover:bg-secondary">تعديل</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
