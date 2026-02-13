import Layout from "@/components/Layout";
import { piiClassification } from "@/lib/data";
import { Fingerprint, Search, BarChart3, Shield, Database, Eye } from "lucide-react";

const allPiiTypes = [
  { name: "رقم الهاتف", nameEn: "Phone Number", count: 215, category: "اتصال", risk: "عالي" },
  { name: "رقم الهوية الوطنية", nameEn: "National ID", count: 196, category: "هوية", risk: "حرج" },
  { name: "البريد الإلكتروني", nameEn: "Email Address", count: 169, category: "اتصال", risk: "عالي" },
  { name: "الاسم الكامل", nameEn: "Full Name", count: 167, category: "هوية", risk: "متوسط" },
  { name: "العنوان", nameEn: "Physical Address", count: 95, category: "موقع", risk: "عالي" },
  { name: "رقم الآيبان", nameEn: "IBAN Number", count: 55, category: "مالي", risk: "حرج" },
  { name: "بطاقة ائتمان", nameEn: "Credit Card", count: 39, category: "مالي", risk: "حرج" },
  { name: "رقم الجواز", nameEn: "Passport Number", count: 38, category: "هوية", risk: "حرج" },
  { name: "تاريخ الميلاد", nameEn: "Date of Birth", count: 34, category: "هوية", risk: "متوسط" },
  { name: "رقم الإقامة", nameEn: "Iqama Number", count: 32, category: "هوية", risk: "حرج" },
  { name: "الراتب", nameEn: "Salary", count: 28, category: "مالي", risk: "عالي" },
  { name: "السجل الطبي", nameEn: "Medical Record", count: 25, category: "صحي", risk: "حرج" },
  { name: "رقم السيارة", nameEn: "Vehicle Plate", count: 22, category: "أصول", risk: "متوسط" },
  { name: "بصمة الوجه", nameEn: "Facial Biometric", count: 18, category: "بيومتري", risk: "حرج" },
  { name: "رقم الضمان الاجتماعي", nameEn: "Social Security", count: 15, category: "حكومي", risk: "حرج" }
];

const riskColors: Record<string, string> = {
  "حرج": "bg-red-500/20 text-red-400",
  "عالي": "bg-amber-500/20 text-amber-400",
  "متوسط": "bg-blue-500/20 text-blue-400",
  "محدود": "bg-gray-500/20 text-gray-400"
};

const categoryColors: Record<string, string> = {
  "اتصال": "bg-teal-500/20 text-teal-600 dark:text-teal-400",
  "هوية": "bg-purple-500/20 text-purple-400",
  "مالي": "bg-amber-500/20 text-amber-400",
  "موقع": "bg-blue-500/20 text-blue-400",
  "صحي": "bg-green-500/20 text-green-400",
  "بيومتري": "bg-red-500/20 text-red-400",
  "حكومي": "bg-cyan-500/20 text-cyan-400",
  "أصول": "bg-gray-500/20 text-gray-400"
};

export default function PIIClassifier() {
  const totalPii = allPiiTypes.reduce((s, p) => s + p.count, 0);
  const criticalCount = allPiiTypes.filter(p => p.risk === "حرج").length;

  return (
    <Layout title="مصنّف PII" titleEn="PII Classifier">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-gray-100 dark:border-white/5 relative overflow-hidden bg-white dark:bg-[#111827]">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">مصنّف البيانات الشخصية</h2>
              <p className="text-xs text-gray-500">PII Classifier & Taxonomy</p>
              <p className="text-sm text-gray-400 mt-1">تصنيف وتحليل أنواع البيانات الشخصية المسربة وفقاً لنظام PDPL</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Fingerprint size={24} className="text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{allPiiTypes.length}</div>
          <div className="text-sm text-gray-400">أنواع PII مكتشفة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-purple-400">{totalPii}</div>
          <div className="text-sm text-gray-400">إجمالي الحالات</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-red-400">{criticalCount}</div>
          <div className="text-sm text-gray-400">أنواع حرجة</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <div className="text-2xl font-bold text-amber-400">8</div>
          <div className="text-sm text-gray-400">فئات تصنيف</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="البحث في أنواع البيانات..." className="w-full bg-[#111827] border border-gray-200 dark:border-white/10 rounded-lg py-2 pr-10 pl-4 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-teal-500/50" />
        </div>
        <select className="bg-[#111827] border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option>جميع الفئات</option>
          <option>هوية</option>
          <option>مالي</option>
          <option>اتصال</option>
          <option>صحي</option>
        </select>
        <select className="bg-[#111827] border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option>جميع المخاطر</option>
          <option>حرج</option>
          <option>عالي</option>
          <option>متوسط</option>
        </select>
      </div>

      {/* PII Types Table */}
      <div className="rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden bg-white dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/5">
                <th className="text-right p-4 text-xs text-gray-500 font-medium">نوع البيانات</th>
                <th className="text-right p-4 text-xs text-gray-500 font-medium">الاسم الإنجليزي</th>
                <th className="text-center p-4 text-xs text-gray-500 font-medium">الفئة</th>
                <th className="text-center p-4 text-xs text-gray-500 font-medium">مستوى الخطورة</th>
                <th className="text-center p-4 text-xs text-gray-500 font-medium">عدد الحالات</th>
                <th className="text-center p-4 text-xs text-gray-500 font-medium">التوزيع</th>
              </tr>
            </thead>
            <tbody>
              {allPiiTypes.map((pii, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm font-medium text-gray-200">{pii.name}</span>
                      <Fingerprint size={14} className="text-purple-400" />
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-xs text-gray-500 font-mono">{pii.nameEn}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[pii.category]}`}>{pii.category}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded ${riskColors[pii.risk]}`}>{pii.risk}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">{pii.count}</span>
                  </td>
                  <td className="p-4">
                    <div className="w-24 h-2 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden mx-auto">
                      <div className="h-full rounded-full bg-teal-500" style={{ width: `${(pii.count / 215) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
