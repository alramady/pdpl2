import Layout from "@/components/Layout";
import { Bell, Mail, MessageSquare, Phone, Webhook, Send, CheckCircle, XCircle } from "lucide-react";

const channels = [
  { name: "البريد الإلكتروني", nameEn: "Email", icon: <Mail size={20} />, enabled: true, recipients: 5, lastAlert: "منذ 10 دقائق", alerts24h: 23 },
  { name: "تليجرام بوت", nameEn: "Telegram Bot", icon: <Send size={20} />, enabled: true, recipients: 3, lastAlert: "منذ 5 دقائق", alerts24h: 45 },
  { name: "رسائل SMS", nameEn: "SMS", icon: <Phone size={20} />, enabled: true, recipients: 2, lastAlert: "منذ ساعة", alerts24h: 8 },
  { name: "Webhook", nameEn: "Webhook", icon: <Webhook size={20} />, enabled: true, recipients: 4, lastAlert: "منذ 15 دقيقة", alerts24h: 67 },
  { name: "Slack", nameEn: "Slack", icon: <MessageSquare size={20} />, enabled: false, recipients: 0, lastAlert: "غير مفعل", alerts24h: 0 },
];

export default function AlertChannels() {
  return (
    <Layout title="قنوات التنبيه" titleEn="Alert Channels">
      <div className="rounded-xl p-6 mb-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">143</div>
              <div className="text-xs text-gray-500">تنبيهات اليوم</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">4</div>
              <div className="text-xs text-gray-500">قنوات نشطة</div>
            </div>
          </div>
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800 dark:text-white">قنوات التنبيه</h2>
              <p className="text-xs text-gray-400">Alert & Notification Channels</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
              <Bell size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map((ch) => (
          <div key={ch.name} className={`rounded-xl p-5 bg-white dark:bg-[#111827] border ${ch.enabled ? 'border-gray-200 dark:border-gray-100 dark:border-white/5' : 'border-gray-200 dark:border-gray-100 dark:border-white/5 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {ch.enabled ? <CheckCircle size={14} className="text-green-500" /> : <XCircle size={14} className="text-gray-400" />}
                <span className={`text-xs ${ch.enabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                  {ch.enabled ? 'مفعل' : 'معطل'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                {ch.icon}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-800 dark:text-white text-right">{ch.name}</h3>
            <p className="text-xs text-gray-400 text-right">{ch.nameEn}</p>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-100 dark:border-white/5 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-bold text-gray-700 dark:text-gray-200">{ch.alerts24h}</div>
                <div className="text-[10px] text-gray-400">تنبيهات/24س</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-700 dark:text-gray-200">{ch.recipients}</div>
                <div className="text-[10px] text-gray-400">مستلمين</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mt-1">{ch.lastAlert}</div>
                <div className="text-[10px] text-gray-400">آخر تنبيه</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
