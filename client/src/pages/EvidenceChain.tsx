import Layout from "@/components/Layout";
import { Link2, Shield, Clock, CheckCircle2, FileText, Hash, Download, Eye } from "lucide-react";
import { toast } from "sonner";

const evidenceItems = [
  { id: "EV-2026-0089", leakId: "LK-2026-0036", title: "تسريب بيانات مسافري كريم", hash: "SHA256:a3f8...7b2e", status: "موثق", date: "٢٧ فبراير", type: "لقطة شاشة + ملف", integrity: "سليم", chain: ["رصد أولي", "تحليل AI", "توثيق", "حفظ أدلة"] },
  { id: "EV-2026-0087", leakId: "LK-2026-0084", title: "بيانات عملاء ساكو على Pastebin", hash: "SHA256:b7c2...9d4f", status: "موثق", date: "٢٥ فبراير", type: "لقطة شاشة + رابط", integrity: "سليم", chain: ["رصد أولي", "تحليل AI", "توثيق"] },
  { id: "EV-2026-0085", leakId: "LK-2026-0032", title: "قاعدة بيانات موظفي وزارة الإسكان", hash: "SHA256:c9d1...3e5a", status: "قيد التوثيق", date: "٢٣ فبراير", type: "ملف كامل", integrity: "سليم", chain: ["رصد أولي", "تحليل AI"] },
  { id: "EV-2026-0082", leakId: "LK-2026-0029", title: "السجلات الطبية — مستشفى السعودي الألماني", hash: "SHA256:d2e4...6f7b", status: "موثق", date: "٢٣ فبراير", type: "لقطة شاشة + عينة", integrity: "سليم", chain: ["رصد أولي", "تحليل AI", "توثيق", "حفظ أدلة"] },
  { id: "EV-2026-0079", leakId: "LK-2026-0025", title: "بيانات مشتركي فيرجن موبايل", hash: "SHA256:e5f7...8a9c", status: "موثق", date: "٢٢ فبراير", type: "لقطة شاشة", integrity: "سليم", chain: ["رصد أولي", "تحليل AI", "توثيق"] },
  { id: "EV-2026-0076", leakId: "LK-2026-0018", title: "بيانات متقدمين من روبرت هاف", hash: "SHA256:f8a9...1b2d", status: "قيد التوثيق", date: "١٧ فبراير", type: "رابط + عينة", integrity: "سليم", chain: ["رصد أولي", "تحليل AI"] }
];

const statusColors: Record<string, string> = {
  "موثق": "bg-green-500/20 text-green-400",
  "قيد التوثيق": "bg-amber-500/20 text-amber-400",
  "مرفوض": "bg-red-500/20 text-red-400"
};

export default function EvidenceChain() {
  return (
    <Layout title="سلسلة الأدلة" titleEn="Evidence Chain">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-gray-100 dark:border-white/5 relative overflow-hidden bg-white dark:bg-[#111827]">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">سلسلة الأدلة الرقمية</h2>
              <p className="text-xs text-gray-500">Digital Evidence Chain</p>
              <p className="text-sm text-gray-400 mt-1">توثيق وحفظ الأدلة الرقمية مع ضمان سلامة البيانات وسلسلة الحفظ</p>
            </div>
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
              <Link2 size={24} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{evidenceItems.length}</div>
          <div className="text-sm text-gray-400">أدلة مسجلة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-green-400">{evidenceItems.filter(e => e.status === "موثق").length}</div>
          <div className="text-sm text-gray-400">أدلة موثقة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-amber-400">{evidenceItems.filter(e => e.status === "قيد التوثيق").length}</div>
          <div className="text-sm text-gray-400">قيد التوثيق</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-blue-400">100%</div>
          <div className="text-sm text-gray-400">سلامة البيانات</div>
        </div>
      </div>

      {/* Evidence Items */}
      <div className="space-y-4">
        {evidenceItems.map((evidence) => (
          <div key={evidence.id} className="rounded-xl p-5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:border-white/10 transition-all bg-white dark:bg-[#111827]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <button onClick={() => toast("تحميل الدليل", { description: "قريباً" })} className="p-1.5 rounded hover:bg-gray-100 dark:bg-white/5 text-gray-400">
                  <Download size={14} />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-100 dark:bg-white/5 text-gray-400">
                  <Eye size={14} />
                </button>
                <span className={`text-xs px-2 py-0.5 rounded ${statusColors[evidence.status]}`}>{evidence.status}</span>
              </div>
              <div className="text-right">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{evidence.title}</h4>
                <div className="flex items-center gap-2 justify-end mt-1">
                  <span className="text-xs text-gray-500">{evidence.id}</span>
                  <span className="text-xs text-gray-600">←</span>
                  <span className="text-xs text-teal-600 dark:text-teal-400">{evidence.leakId}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] text-center">
                <div className="text-xs text-gray-500">التاريخ</div>
                <div className="text-xs font-semibold text-gray-800 dark:text-white">{evidence.date}</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] text-center">
                <div className="text-xs text-gray-500">النوع</div>
                <div className="text-xs font-semibold text-gray-800 dark:text-white">{evidence.type}</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] text-center">
                <div className="text-xs text-gray-500">السلامة</div>
                <div className="text-xs font-semibold text-green-400">{evidence.integrity} ✓</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] text-center">
                <div className="text-xs text-gray-500">Hash</div>
                <div className="text-[10px] font-mono text-gray-400 truncate">{evidence.hash}</div>
              </div>
            </div>
            {/* Chain Steps */}
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs text-gray-500">سلسلة الحفظ:</span>
              {evidence.chain.map((step, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">{step}</span>
                  {i < evidence.chain.length - 1 && <span className="text-gray-600">←</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
