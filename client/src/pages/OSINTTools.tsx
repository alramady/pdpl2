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
            className={`p-4 rounded-xl border text-center transition-all ${activeTool === t.id ? "bg-teal-50 border-teal-200 shadow-sm" : "bg-card border-border hover:border-border"}`}>
            <div className={`mx-auto mb-2 ${activeTool === t.id ? "text-teal-600" : "text-muted-foreground"}`}>{t.icon}</div>
            <div className={`text-xs font-medium ${activeTool === t.id ? "text-teal-700" : "text-muted-foreground"}`}>{t.name}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{t.nameEn}</div>
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-teal-600">{tool.icon}</div>
          <div><h3 className="text-base font-semibold text-foreground">{tool.name}</h3><p className="text-xs text-muted-foreground">{tool.desc}</p></div>
        </div>
        <div className="flex gap-3">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={tool.placeholder}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder-gray-400 focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            dir="ltr" onKeyDown={e => { if (e.key === "Enter") handleSearch(); }} />
          <button onClick={handleSearch} disabled={isSearching || !query.trim()}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2">
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} بحث
          </button>
        </div>
      </div>

      {isSearching && (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Loader2 size={40} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">جاري البحث في قواعد البيانات...</p>
        </div>
      )}

      {results.length > 0 && !isSearching && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-teal-600">
              {copied ? <CheckCircle size={12} className="text-green-500" /> : <Copy size={12} />}
              {copied ? "تم النسخ" : "نسخ النتائج"}
            </button>
            <h3 className="text-sm font-semibold text-foreground">نتائج البحث ({results.length})</h3>
          </div>
          {results.map((r, i) => (
            <div key={i} onClick={() => setSelectedResult(r)} className="bg-card rounded-xl border border-border p-4 hover:border-border transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${r.risk === "high" ? "bg-red-100 text-red-700" : r.risk === "medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                    {r.risk === "high" ? "خطر عالي" : r.risk === "medium" ? "متوسط" : "آمن"}
                  </span>
                  <ExternalLink size={12} className="text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right"><div className="text-sm font-medium text-foreground">{r.source}</div><div className="text-xs text-muted-foreground">{r.status}</div></div>
                  <div className={`p-2 rounded-lg ${r.risk === "high" ? "bg-red-50" : r.risk === "medium" ? "bg-amber-50" : "bg-green-50"}`}>
                    {r.risk === "high" ? <AlertTriangle size={16} className="text-red-600" /> : r.risk === "medium" ? <AlertTriangle size={16} className="text-amber-600" /> : <Shield size={16} className="text-green-600" />}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-right">{r.details}</p>
            </div>
          ))}
        </div>
      )}

      {selectedResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedResult(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedResult(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل النتيجة</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">المصدر</span><span className="text-sm font-medium">{selectedResult.source}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الحالة</span><span className="text-sm font-medium">{selectedResult.status}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">مستوى الخطر</span>
                <span className={`text-xs px-2 py-0.5 rounded ${selectedResult.risk === "high" ? "bg-red-100 text-red-700" : selectedResult.risk === "medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                  {selectedResult.risk === "high" ? "خطر عالي" : selectedResult.risk === "medium" ? "متوسط" : "آمن"}
                </span>
              </div>
              <div className="pt-2 border-t border-border"><p className="text-sm text-muted-foreground">{selectedResult.details}</p></div>
              <div className="pt-2 border-t border-border">
                <h4 className="text-xs font-semibold text-foreground mb-2">التوصيات</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
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
