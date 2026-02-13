import { useState } from "react";
import Layout from "@/components/Layout";
import { Search, Globe, Mail, Phone, User, Database, Shield, AlertTriangle, ExternalLink, Copy, CheckCircle, Loader2, X } from "lucide-react";

const tools = [
  { id: "email", name: "بحث البريد الإلكتروني", nameEn: "Email Verifier", desc: "التحقق من تسريب البريد الإلكتروني", icon: <Mail size={20} />, placeholder: "أدخل البريد الإلكتروني..." },
  { id: "phone", name: "بحث رقم الهاتف", nameEn: "Phone Lookup", desc: "التحقق من تسريب رقم الهاتف", icon: <Phone size={20} />, placeholder: "أدخل رقم الهاتف..." },
  { id: "username", name: "بحث اسم المستخدم", nameEn: "Username Search", desc: "البحث عبر المنصات", icon: <User size={20} />, placeholder: "أدخل اسم المستخدم..." },
  { id: "domain", name: "بحث النطاق", nameEn: "WHOIS Lookup", desc: "فحص أمان النطاق", icon: <Globe size={20} />, placeholder: "أدخل اسم النطاق..." },
  { id: "ip", name: "بحث عنوان IP", nameEn: "IP Geolocation", desc: "تحليل عنوان IP", icon: <Database size={20} />, placeholder: "أدخل عنوان IP..." },
  { id: "breach", name: "البحث في التسريبات", nameEn: "Data Breach Search", desc: "البحث في قواعد بيانات التسريبات", icon: <Shield size={20} />, placeholder: "أدخل كلمة البحث..." },
];

interface SearchResult {
  source: string;
  status: string;
  details: string;
  risk: "high" | "medium" | "low";
}

export default function OSINTTools() {
  const [activeTool, setActiveTool] = useState("email");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [copied, setCopied] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        { source: "Have I Been Pwned", status: "تم العثور على تسريب", details: `تم العثور على ${query} في 3 تسريبات معروفة`, risk: "high" },
        { source: "DeHashed", status: "تم العثور على بيانات", details: `بيانات مرتبطة بـ ${query} في قاعدة بيانات مسربة`, risk: "high" },
        { source: "IntelX", status: "نتائج جزئية", details: `تم العثور على إشارات لـ ${query} في 2 مصدر`, risk: "medium" },
        { source: "Shodan", status: "لا توجد نتائج", details: `لم يتم العثور على ${query} في قواعد البيانات المفتوحة`, risk: "low" },
        { source: "VirusTotal", status: "آمن", details: `لم يتم الإبلاغ عن ${query} كتهديد`, risk: "low" },
        { source: "AbuseIPDB", status: "تحذير", details: `تم الإبلاغ عن نشاط مشبوه مرتبط بـ ${query}`, risk: "medium" },
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const tool = tools.find(t => t.id === activeTool)!;

  return (
    <Layout title="أدوات OSINT" titleEn="OSINT Tools">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {tools.map(t => (
          <button key={t.id} onClick={() => { setActiveTool(t.id); setResults([]); setQuery(""); }}
            className={`p-4 rounded-xl border text-center transition-all ${activeTool === t.id ? "bg-teal-50 border-teal-200 shadow-sm" : "bg-white border-gray-100 hover:border-gray-200"}`}>
            <div className={`mx-auto mb-2 ${activeTool === t.id ? "text-teal-600" : "text-gray-400"}`}>{t.icon}</div>
            <div className={`text-xs font-medium ${activeTool === t.id ? "text-teal-700" : "text-gray-600"}`}>{t.name}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{t.nameEn}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-teal-600">{tool.icon}</div>
          <div><h3 className="text-base font-semibold text-gray-800">{tool.name}</h3><p className="text-xs text-gray-500">{tool.desc}</p></div>
        </div>
        <div className="flex gap-3">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={tool.placeholder}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            dir="ltr" onKeyDown={e => { if (e.key === "Enter") handleSearch(); }} />
          <button onClick={handleSearch} disabled={isSearching || !query.trim()}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2">
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} بحث
          </button>
        </div>
      </div>

      {isSearching && (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Loader2 size={40} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-sm text-gray-500">جاري البحث في قواعد البيانات...</p>
        </div>
      )}

      {results.length > 0 && !isSearching && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600">
              {copied ? <CheckCircle size={12} className="text-green-500" /> : <Copy size={12} />}
              {copied ? "تم النسخ" : "نسخ النتائج"}
            </button>
            <h3 className="text-sm font-semibold text-gray-700">نتائج البحث ({results.length})</h3>
          </div>
          {results.map((r, i) => (
            <div key={i} onClick={() => setSelectedResult(r)} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${r.risk === "high" ? "bg-red-100 text-red-700" : r.risk === "medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                    {r.risk === "high" ? "خطر عالي" : r.risk === "medium" ? "متوسط" : "آمن"}
                  </span>
                  <ExternalLink size={12} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right"><div className="text-sm font-medium text-gray-800">{r.source}</div><div className="text-xs text-gray-500">{r.status}</div></div>
                  <div className={`p-2 rounded-lg ${r.risk === "high" ? "bg-red-50" : r.risk === "medium" ? "bg-amber-50" : "bg-green-50"}`}>
                    {r.risk === "high" ? <AlertTriangle size={16} className="text-red-600" /> : r.risk === "medium" ? <AlertTriangle size={16} className="text-amber-600" /> : <Shield size={16} className="text-green-600" />}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">{r.details}</p>
            </div>
          ))}
        </div>
      )}

      {selectedResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedResult(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedResult(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
              <h3 className="text-lg font-bold text-gray-800">تفاصيل النتيجة</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-gray-500">المصدر</span><span className="text-sm font-medium">{selectedResult.source}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">الحالة</span><span className="text-sm font-medium">{selectedResult.status}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">مستوى الخطر</span>
                <span className={`text-xs px-2 py-0.5 rounded ${selectedResult.risk === "high" ? "bg-red-100 text-red-700" : selectedResult.risk === "medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                  {selectedResult.risk === "high" ? "خطر عالي" : selectedResult.risk === "medium" ? "متوسط" : "آمن"}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100"><p className="text-sm text-gray-600">{selectedResult.details}</p></div>
              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">التوصيات</h4>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• تغيير كلمة المرور فوراً إذا تم تسريبها</li>
                  <li>• تفعيل المصادقة الثنائية</li>
                  <li>• مراقبة الحسابات المرتبطة</li>
                  <li>• إبلاغ فريق أمن المعلومات</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
