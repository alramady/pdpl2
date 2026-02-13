import { useState } from "react";
import Layout from "@/components/Layout";
import { Fingerprint, Search, X } from "lucide-react";

interface PiiType {
  name: string;
  nameEn: string;
  count: number;
  category: string;
  risk: string;
  description: string;
  examples: string[];
  pdplArticle: string;
}

const allPiiTypes: PiiType[] = [
  { name: "رقم الهاتف", nameEn: "Phone Number", count: 215, category: "اتصال", risk: "عالي", description: "أرقام هواتف محمولة وثابتة سعودية مسربة من قواعد بيانات متعددة", examples: ["+966 5X XXX XXXX", "05XXXXXXXX"], pdplArticle: "المادة 5 - البيانات الشخصية" },
  { name: "رقم الهوية الوطنية", nameEn: "National ID", count: 196, category: "هوية", risk: "حرج", description: "أرقام هوية وطنية سعودية (10 أرقام) مسربة مع بيانات مرتبطة", examples: ["1XXXXXXXXX", "2XXXXXXXXX"], pdplArticle: "المادة 3 - البيانات الحساسة" },
  { name: "البريد الإلكتروني", nameEn: "Email Address", count: 169, category: "اتصال", risk: "عالي", description: "عناوين بريد إلكتروني حكومية وخاصة مسربة", examples: ["user@gov.sa", "name@company.com.sa"], pdplArticle: "المادة 5 - البيانات الشخصية" },
  { name: "الاسم الكامل", nameEn: "Full Name", count: 167, category: "هوية", risk: "متوسط", description: "أسماء كاملة (ثلاثي/رباعي) مسربة مع بيانات أخرى", examples: ["محمد أحمد العلي", "فاطمة سعد الدوسري"], pdplArticle: "المادة 5 - البيانات الشخصية" },
  { name: "العنوان", nameEn: "Physical Address", count: 95, category: "موقع", risk: "عالي", description: "عناوين سكنية ومكتبية مفصلة مسربة", examples: ["حي النزهة، الرياض", "شارع الملك فهد، جدة"], pdplArticle: "المادة 5 - البيانات الشخصية" },
  { name: "رقم الآيبان", nameEn: "IBAN Number", count: 55, category: "مالي", risk: "حرج", description: "أرقام حسابات بنكية دولية (IBAN) سعودية مسربة", examples: ["SA0380000000608010167519"], pdplArticle: "المادة 3 - البيانات الحساسة" },
  { name: "بطاقة ائتمان", nameEn: "Credit Card", count: 39, category: "مالي", risk: "حرج", description: "أرقام بطاقات ائتمان وخصم مباشر مسربة مع تواريخ انتهاء", examples: ["4XXX XXXX XXXX XXXX", "5XXX XXXX XXXX XXXX"], pdplArticle: "المادة 3 - البيانات الحساسة" },
  { name: "رقم الجواز", nameEn: "Passport Number", count: 38, category: "هوية", risk: "حرج", description: "أرقام جوازات سفر سعودية مسربة", examples: ["AXXXXXXXX"], pdplArticle: "المادة 3 - البيانات الحساسة" },
  { name: "تاريخ الميلاد", nameEn: "Date of Birth", count: 34, category: "هوية", risk: "متوسط", description: "تواريخ ميلاد مسربة مع بيانات هوية أخرى", examples: ["1990/01/15", "1405/06/20 هـ"], pdplArticle: "المادة 5 - البيانات الشخصية" },
  { name: "رقم الإقامة", nameEn: "Iqama Number", count: 32, category: "هوية", risk: "حرج", description: "أرقام إقامة للمقيمين في السعودية مسربة", examples: ["2XXXXXXXXX"], pdplArticle: "المادة 3 - البيانات الحساسة" },
  { name: "الراتب", nameEn: "Salary", count: 28, category: "مالي", risk: "عالي", description: "بيانات رواتب ومعلومات مالية للموظفين مسربة", examples: ["15,000 ر.س", "25,000 ر.س"], pdplArticle: "المادة 3 - البيانات الحساسة" },
  { name: "السجل الطبي", nameEn: "Medical Record", count: 25, category: "صحي", risk: "حرج", description: "سجلات طبية ومعلومات صحية مسربة من مستشفيات ومراكز صحية", examples: ["تشخيص مرضي", "نتائج فحوصات"], pdplArticle: "المادة 3 - البيانات الحساسة" },
  { name: "رقم السيارة", nameEn: "Vehicle Plate", count: 22, category: "أصول", risk: "متوسط", description: "أرقام لوحات سيارات سعودية مسربة مع بيانات المالك", examples: ["أ ب ج 1234", "KSA 5678"], pdplArticle: "المادة 5 - البيانات الشخصية" },
  { name: "بصمة الوجه", nameEn: "Facial Biometric", count: 18, category: "بيومتري", risk: "حرج", description: "بيانات بيومترية للوجه مسربة من أنظمة التعرف", examples: ["صور وجه عالية الدقة", "نقاط تعرف بيومترية"], pdplArticle: "المادة 3 - البيانات الحساسة" },
  { name: "رقم الضمان الاجتماعي", nameEn: "Social Security", count: 15, category: "حكومي", risk: "حرج", description: "أرقام ضمان اجتماعي مسربة من أنظمة حكومية", examples: ["XXXXXXXXXX"], pdplArticle: "المادة 3 - البيانات الحساسة" },
];

const riskColors: Record<string, string> = {
  "حرج": "bg-red-100 text-red-700",
  "عالي": "bg-amber-100 text-amber-700",
  "متوسط": "bg-blue-100 text-blue-700",
  "محدود": "bg-secondary text-muted-foreground",
};

const categoryColors: Record<string, string> = {
  "اتصال": "bg-teal-100 text-teal-700",
  "هوية": "bg-purple-100 text-purple-700",
  "مالي": "bg-amber-100 text-amber-700",
  "موقع": "bg-blue-100 text-blue-700",
  "صحي": "bg-green-100 text-green-700",
  "بيومتري": "bg-red-100 text-red-700",
  "حكومي": "bg-cyan-100 text-cyan-700",
  "أصول": "bg-secondary text-muted-foreground",
};

export default function PIIClassifier() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [selected, setSelected] = useState<PiiType | null>(null);

  const filtered = allPiiTypes.filter(p => {
    if (search && !p.name.includes(search) && !p.nameEn.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter !== "all" && p.category !== catFilter) return false;
    if (riskFilter !== "all" && p.risk !== riskFilter) return false;
    return true;
  });

  const totalPii = allPiiTypes.reduce((s, p) => s + p.count, 0);
  const criticalCount = allPiiTypes.filter(p => p.risk === "حرج").length;

  return (
    <Layout title="مصنّف PII" titleEn="PII Classifier">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-teal-600">{allPiiTypes.length}</div>
          <div className="text-sm text-muted-foreground">أنواع PII مكتشفة</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-purple-600">{totalPii}</div>
          <div className="text-sm text-muted-foreground">إجمالي الحالات</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
          <div className="text-sm text-muted-foreground">أنواع حرجة</div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="text-2xl font-bold text-amber-600">8</div>
          <div className="text-sm text-muted-foreground">فئات تصنيف</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="البحث في أنواع البيانات..." className="w-full bg-card border border-border rounded-lg py-2 pr-10 pl-4 text-sm text-foreground placeholder-gray-400 focus:outline-none focus:border-teal-500" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-card border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground focus:outline-none">
          <option value="all">جميع الفئات</option>
          <option value="هوية">هوية</option>
          <option value="مالي">مالي</option>
          <option value="اتصال">اتصال</option>
          <option value="صحي">صحي</option>
          <option value="بيومتري">بيومتري</option>
          <option value="حكومي">حكومي</option>
        </select>
        <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="bg-card border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground focus:outline-none">
          <option value="all">جميع المخاطر</option>
          <option value="حرج">حرج</option>
          <option value="عالي">عالي</option>
          <option value="متوسط">متوسط</option>
        </select>
      </div>

      {/* PII Types Table */}
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="text-right p-4 text-xs text-muted-foreground font-medium">نوع البيانات</th>
              <th className="text-right p-4 text-xs text-muted-foreground font-medium">الاسم الإنجليزي</th>
              <th className="text-center p-4 text-xs text-muted-foreground font-medium">الفئة</th>
              <th className="text-center p-4 text-xs text-muted-foreground font-medium">مستوى الخطورة</th>
              <th className="text-center p-4 text-xs text-muted-foreground font-medium">عدد الحالات</th>
              <th className="text-center p-4 text-xs text-muted-foreground font-medium">التوزيع</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pii, i) => (
              <tr key={i} onClick={() => setSelected(pii)} className="border-b border-gray-50 hover:bg-secondary transition-colors cursor-pointer">
                <td className="p-4">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm font-medium text-foreground">{pii.name}</span>
                    <Fingerprint size={14} className="text-purple-500" />
                  </div>
                </td>
                <td className="p-4 text-right"><span className="text-xs text-muted-foreground font-mono">{pii.nameEn}</span></td>
                <td className="p-4 text-center"><span className={`text-xs px-2 py-0.5 rounded ${categoryColors[pii.category]}`}>{pii.category}</span></td>
                <td className="p-4 text-center"><span className={`text-xs px-2 py-0.5 rounded ${riskColors[pii.risk]}`}>{pii.risk}</span></td>
                <td className="p-4 text-center"><span className="text-sm font-semibold text-foreground">{pii.count}</span></td>
                <td className="p-4">
                  <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden mx-auto">
                    <div className="h-full rounded-full bg-teal-500" style={{ width: `${(pii.count / 215) * 100}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل نوع البيانات</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-purple-50"><Fingerprint size={24} className="text-purple-500" /></div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{selected.name}</h4>
                  <p className="text-xs text-muted-foreground font-mono">{selected.nameEn}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${riskColors[selected.risk]}`}>{selected.risk}</div>
                  <div className="text-xs text-muted-foreground mt-1">الخطورة</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${categoryColors[selected.category]}`}>{selected.category}</div>
                  <div className="text-xs text-muted-foreground mt-1">الفئة</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border text-center">
                  <div className="text-lg font-bold text-teal-600">{selected.count}</div>
                  <div className="text-xs text-muted-foreground mt-1">حالات</div>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-foreground mb-1">الوصف</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
              </div>
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-foreground mb-1">أمثلة</h5>
                <div className="flex flex-wrap gap-2">
                  {selected.examples.map((ex, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground font-mono">{ex}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <h5 className="text-xs font-semibold text-blue-700 mb-1">المرجع القانوني (PDPL)</h5>
                <p className="text-xs text-blue-600">{selected.pdplArticle}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
