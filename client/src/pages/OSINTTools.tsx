import Layout from "@/components/Layout";
import { Wrench, Search, Globe, Mail, Phone, MapPin, User, Database, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const tools = [
  { name: "WHOIS Lookup", nameAr: "استعلام WHOIS", desc: "البحث في سجلات النطاقات", icon: <Globe size={20} />, status: "متاح" },
  { name: "Email Verifier", nameAr: "التحقق من البريد", desc: "التحقق من صحة عناوين البريد", icon: <Mail size={20} />, status: "متاح" },
  { name: "Phone Lookup", nameAr: "استعلام الهاتف", desc: "البحث عن معلومات أرقام الهاتف", icon: <Phone size={20} />, status: "متاح" },
  { name: "IP Geolocation", nameAr: "تحديد موقع IP", desc: "تحديد الموقع الجغرافي لعناوين IP", icon: <MapPin size={20} />, status: "متاح" },
  { name: "Username Search", nameAr: "البحث عن مستخدم", desc: "البحث عن حسابات المستخدم عبر المنصات", icon: <User size={20} />, status: "متاح" },
  { name: "Data Breach Search", nameAr: "البحث في التسريبات", desc: "البحث في قواعد بيانات التسريبات المعروفة", icon: <Database size={20} />, status: "متاح" },
];

export default function OSINTTools() {
  return (
    <Layout title="أدوات OSINT" titleEn="OSINT Tools">
      <div className="rounded-xl p-6 mb-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800 dark:text-white">أدوات الاستخبارات المفتوحة</h2>
              <p className="text-xs text-gray-400">Open Source Intelligence Tools</p>
              <p className="text-sm text-gray-500 mt-1">مجموعة أدوات OSINT للتحقيق والبحث في المصادر المفتوحة</p>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20">
              <Wrench size={24} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div key={tool.name} className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5 hover:border-teal-300 dark:hover:border-teal-500/30 transition-all cursor-pointer group" onClick={() => toast(tool.nameAr, { description: "قريباً" })}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs px-2 py-0.5 rounded bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">{tool.status}</span>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-600 dark:text-teal-400 transition-colors">
                {tool.icon}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-800 dark:text-white text-right">{tool.nameAr}</h3>
            <p className="text-xs text-gray-400 text-right mt-0.5">{tool.name}</p>
            <p className="text-xs text-gray-500 text-right mt-2">{tool.desc}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
