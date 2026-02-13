import { useState } from "react";
import Layout from "@/components/Layout";
import { latestIncidents } from "@/lib/data";
import { Shield, Clock, AlertTriangle, CheckCircle2, Search, Download, Eye, Sparkles } from "lucide-react";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  "متوسط التأثير": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  "محدود التأثير": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
  "مرتفع التأثير": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30",
  "واسع النطاق": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/30"
};

const statusColors: Record<string, string> = {
  "جديد": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30",
  "قيد التحليل": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  "تم التوثيق": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
  "مكتملة": "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/30"
};

const sourceColors: Record<string, string> = {
  "موقع لصق": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  "دارك ويب": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
  "تليجرام": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
};

const allLeaks: Array<{id: string; title: string; sector: string; records: number; source: string; date: string; severity: string; piiTags: string[]; status: string}> = [
  {
    id: "LK-2026-0116",
    title: "تسريب بيانات مسافري كريم - 1,472,233 سجل سفر",
    sector: "النقل والطيران",
    records: 1472233,
    source: "موقع لصق",
    date: "٢٧‏/٢‏/٢٠٢٦",
    severity: "متوسط التأثير",
    piiTags: ["Full Name", "Phone", "Booking Reference", "Travel Route", "Email"],
    status: "قيد التحليل"
  },
  {
    id: "LK-2026-0084",
    title: "بيانات عملاء التجارة الإلكترونية من ساكو على Pastebin",
    sector: "التجارة الإلكترونية",
    records: 1036692,
    source: "موقع لصق",
    date: "٢٥‏/٢‏/٢٠٢٦",
    severity: "محدود التأثير",
    piiTags: ["Credit Card", "Email", "Phone", "Order History"],
    status: "قيد التحليل"
  },
  {
    id: "LK-2026-0032",
    title: "تسريب قاعدة بيانات موظفي وزارة الإسكان",
    sector: "القطاع الحكومي",
    records: 1680511,
    source: "موقع لصق",
    date: "٢٣‏/٢‏/٢٠٢٦",
    severity: "مرتفع التأثير",
    piiTags: ["Full Name", "National ID", "Salary", "Address"],
    status: "جديد"
  },
  {
    id: "LK-2026-0170",
    title: "تسريب بيانات متقدمين من منصة جدارات - 421,076 سيرة ذاتية",
    sector: "التوظيف والموارد البشرية",
    records: 421076,
    source: "تليجرام",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "مرتفع التأثير",
    piiTags: ["CV", "National ID", "Phone", "Email"],
    status: "جديد"
  },
  {
    id: "LK-2026-0048",
    title: "سجلات مشتركي الجوال من شركة موبايلي على BreachForums",
    sector: "الاتصالات",
    records: 1385228,
    source: "دارك ويب",
    date: "١٦‏/٢‏/٢٠٢٦",
    severity: "واسع النطاق",
    piiTags: ["Subscription Plan", "Email", "Call Records", "Address", "Phone", "Full Name"],
    status: "قيد التحليل"
  },
  {
    id: "LK-2026-0207",
    title: "تسريب بيانات عمال مشروع أوكساجون - 56,914 سجل",
    sector: "البناء والمشاريع الكبرى",
    records: 56914,
    source: "دارك ويب",
    date: "١٦‏/٢‏/٢٠٢٦",
    severity: "واسع النطاق",
    piiTags: ["Passport Number", "Full Name", "National ID", "Salary", "Phone", "Work Permit"],
    status: "قيد التحليل"
  },
  {
    id: "LK-2026-0123",
    title: "تسريب بيانات مقاولي شركة لوبريف على Pastebin",
    sector: "الطاقة والنفط",
    records: 913627,
    source: "موقع لصق",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "مرتفع التأثير",
    piiTags: ["Full Name", "Phone", "National ID"],
    status: "تم التوثيق"
  },
  {
    id: "LK-MLK6KKSF",
    title: "بيانات اعتماد VPN للشركات",
    sector: "قطاع التقنية",
    records: 7827,
    source: "دارك ويب",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "متوسط التأثير",
    piiTags: ["Email", "Phone"],
    status: "جديد"
  },
  {
    id: "LK-MLK5HZWM",
    title: "قاعدة بيانات عملاء التجارة الإلكترونية",
    sector: "قطاع التجزئة",
    records: 33412,
    source: "تليجرام",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "متوسط التأثير",
    piiTags: ["Email", "Phone", "IBAN"],
    status: "جديد"
  },
  {
    id: "LK-MLK5HZKT",
    title: "بيانات مشتركي الاتصالات",
    sector: "قطاع الاتصالات",
    records: 26148,
    source: "تليجرام",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "مرتفع التأثير",
    piiTags: ["Phone", "National ID", "Iqama"],
    status: "جديد"
  },
  {
    id: "LK-MLK4FF3E",
    title: "بيانات حاملي وثائق التأمين",
    sector: "قطاع التأمين",
    records: 14419,
    source: "دارك ويب",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "مرتفع التأثير",
    piiTags: ["National ID", "IBAN", "Phone"],
    status: "جديد"
  },
  {
    id: "LK-MLK17O0R",
    title: "تسريب بيانات اعتماد مصرفية سعودية",
    sector: "القطاع المصرفي",
    records: 18600,
    source: "تليجرام",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "واسع النطاق",
    piiTags: ["National ID", "IBAN", "Phone"],
    status: "جديد"
  },
  {
    id: "LK-MLK053GZ",
    title: "دليل موظفي القطاع الحكومي",
    sector: "القطاع الحكومي",
    records: 7716,
    source: "تليجرام",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "واسع النطاق",
    piiTags: ["National ID", "Email", "Phone"],
    status: "جديد"
  },
  {
    id: "LK-MLJVURXB",
    title: "بيع جملة لأرقام هوية وطنية سعودية",
    sector: "القطاع الحكومي",
    records: 50003,
    source: "دارك ويب",
    date: "١٢‏/٢‏/٢٠٢٦",
    severity: "واسع النطاق",
    piiTags: ["National ID"],
    status: "جديد"
  },
  {
    id: "LK-MLK059XF",
    title: "بيانات عملاء المرافق",
    sector: "قطاع المرافق",
    records: 8159,
    source: "موقع لصق",
    date: "١٣‏/٢‏/٢٠٢٦",
    severity: "محدود التأثير",
    piiTags: ["Phone", "IBAN"],
    status: "جديد"
  }
];

export default function Leaks() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout title="التسريبات" titleEn="Leaks">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">334</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">إجمالي التسريبات</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10">
              <Shield size={20} className="text-red-500 dark:text-red-400" />
            </div>
          </div>
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">92</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">واسعة النطاق</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10">
              <AlertTriangle size={20} className="text-amber-500 dark:text-amber-400" />
            </div>
          </div>
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">50</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">قيد التحليل</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10">
              <Clock size={20} className="text-amber-500 dark:text-amber-400" />
            </div>
          </div>
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] cursor-pointer hover:shadow-md transition-all">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">51</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">مكتملة</div>
            </div>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-500/10">
              <CheckCircle2 size={20} className="text-green-500 dark:text-green-400" />
            </div>
          </div>
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-2">اضغط للتفاصيل ←</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 mb-6 flex items-center gap-4 flex-wrap bg-white dark:bg-[#111827]">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث في التسريبات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 pr-10 pl-4 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-teal-400"
          />
        </div>
        <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option>جميع المستويات</option>
          <option>واسع النطاق</option>
          <option>مرتفع</option>
          <option>متوسط</option>
          <option>محدود</option>
        </select>
        <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option>جميع المصادر</option>
          <option>تليجرام</option>
          <option>دارك ويب</option>
          <option>مواقع اللصق</option>
        </select>
        <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option>جميع الحالات</option>
          <option>جديد</option>
          <option>قيد التحليل</option>
          <option>مكتملة</option>
        </select>
        <button onClick={() => toast("تصدير CSV", { description: "قريباً" })} className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10">
          <Download size={14} />
          تصدير CSV
        </button>
      </div>

      {/* Leak Cards */}
      <div className="space-y-4">
        {allLeaks.map((leak, i) => (
          <div key={i} className="rounded-xl p-5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all bg-white dark:bg-[#111827] hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400">
                  <Eye size={16} />
                </button>
                <span className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-2 py-0.5 rounded">
                  <Sparkles size={10} />
                  AI
                </span>
                <span className="text-xs text-gray-400">{leak.date}</span>
                <span className={`text-xs px-2 py-0.5 rounded border ${statusColors[leak.status]}`}>
                  {leak.status}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${sourceColors[leak.source] || "bg-gray-100 text-gray-600"}`}>
                  {leak.source}
                </span>
              </div>
              <div className="text-right flex-1 mr-4">
                <div className="flex items-center gap-2 justify-end">
                  <span className={`text-xs px-2 py-0.5 rounded border ${severityColors[leak.severity] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                    {leak.severity}
                  </span>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{leak.title}</h4>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {leak.id} — {leak.sector} — {leak.records.toLocaleString()} سجل
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 justify-end">
              {leak.piiTags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10">
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
