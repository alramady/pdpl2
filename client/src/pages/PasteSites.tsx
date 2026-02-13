import Layout from "@/components/Layout";
import { FileText, Search, RefreshCw, Shield, AlertTriangle, Clock, Eye } from "lucide-react";
import { toast } from "sonner";

const pasteSites = [
  { id: "PS-001", name: "Pastebin.com", status: "نشط", leaks: 42, lastScan: "قبل 5 دقائق", impact: "عالي" },
  { id: "PS-002", name: "Ghostbin.com", status: "نشط", leaks: 28, lastScan: "قبل 12 دقيقة", impact: "عالي" },
  { id: "PS-003", name: "Paste.ee", status: "نشط", leaks: 15, lastScan: "قبل 8 دقائق", impact: "متوسط" },
  { id: "PS-004", name: "JustPaste.it", status: "نشط", leaks: 12, lastScan: "قبل 15 دقيقة", impact: "متوسط" },
  { id: "PS-005", name: "PrivateBin", status: "نشط", leaks: 8, lastScan: "قبل 20 دقيقة", impact: "محدود" },
  { id: "PS-006", name: "Hastebin", status: "نشط", leaks: 5, lastScan: "قبل 30 دقيقة", impact: "محدود" }
];

const recentPastes = [
  { id: "PT-2026-0089", title: "قائمة بريد إلكتروني حكومي سعودي — 12,500 عنوان", site: "Pastebin.com", date: "١٣ فبراير", severity: "مرتفع", records: 12500, pii: ["Email", "Full Name", "Department"] },
  { id: "PT-2026-0087", title: "بيانات اعتماد VPN لشركة سعودية", site: "Ghostbin.com", date: "١٢ فبراير", severity: "واسع النطاق", records: 3200, pii: ["Username", "Password", "IP Address"] },
  { id: "PT-2026-0085", title: "أرقام هوية وطنية مع أرقام هواتف", site: "Paste.ee", date: "١١ فبراير", severity: "مرتفع", records: 8900, pii: ["National ID", "Phone", "Full Name"] },
  { id: "PT-2026-0082", title: "قاعدة بيانات عملاء متجر إلكتروني", site: "JustPaste.it", date: "١٠ فبراير", severity: "متوسط", records: 15600, pii: ["Email", "Phone", "Address", "Order History"] },
  { id: "PT-2026-0079", title: "سجلات DNS لنطاقات حكومية سعودية", site: "Pastebin.com", date: "٩ فبراير", severity: "متوسط", records: 450, pii: ["Domain", "IP", "DNS Records"] },
  { id: "PT-2026-0076", title: "بيانات موظفين — شركة مقاولات كبرى", site: "Ghostbin.com", date: "٨ فبراير", severity: "مرتفع", records: 6700, pii: ["Full Name", "Salary", "National ID", "IBAN"] }
];

const impactColors: Record<string, string> = {
  "عالي": "text-red-400",
  "متوسط": "text-amber-400",
  "محدود": "text-blue-400"
};

const severityBg: Record<string, string> = {
  "واسع النطاق": "bg-red-500/20 text-red-400",
  "مرتفع": "bg-amber-500/20 text-amber-400",
  "متوسط": "bg-blue-500/20 text-blue-400",
  "محدود": "bg-gray-500/20 text-gray-400"
};

export default function PasteSites() {
  return (
    <Layout title="مواقع اللصق" titleEn="Paste Sites">
      {/* Header */}
      <div className="rounded-xl p-6 mb-6 border border-white/5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #2d1a0d 100%)" }}>
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">رصد مواقع اللصق</h2>
              <p className="text-xs text-gray-500">Paste Sites Monitoring</p>
              <p className="text-sm text-gray-400 mt-1">مراقبة مواقع اللصق العامة لاكتشاف تسريبات البيانات السعودية</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <FileText size={24} className="text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-teal-400">{pasteSites.length}</div>
          <div className="text-sm text-gray-400">مواقع مراقبة</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-amber-400">{pasteSites.reduce((s, p) => s + p.leaks, 0)}</div>
          <div className="text-sm text-gray-400">تسريبات مكتشفة</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-green-400">{pasteSites.filter(p => p.status === "نشط").length}</div>
          <div className="text-sm text-gray-400">مواقع نشطة</div>
        </div>
        <div className="rounded-xl p-4 border border-white/5" style={{ background: "#111827" }}>
          <div className="text-2xl font-bold text-purple-400">47,350</div>
          <div className="text-sm text-gray-400">سجلات مكشوفة</div>
        </div>
      </div>

      {/* Monitored Sites */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => toast.success("تم التحديث")} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10">
            <RefreshCw size={14} />
            فحص الآن
          </button>
          <h3 className="text-lg font-semibold text-white">المواقع المراقبة</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pasteSites.map((site) => (
            <div key={site.id} className="rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all cursor-pointer" style={{ background: "#111827" }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-green-400">● {site.status}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{site.name}</span>
                  <FileText size={16} className="text-amber-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                  <div className="text-xs text-gray-500">تسريبات</div>
                  <div className="text-sm font-semibold text-amber-400">{site.leaks}</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                  <div className="text-xs text-gray-500">آخر فحص</div>
                  <div className="text-xs font-semibold text-white">{site.lastScan}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">اضغط للتفاصيل ←</span>
                <span className={`text-xs ${impactColors[site.impact]}`}>تأثير {site.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Pastes */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">آخر التسريبات المكتشفة</h3>
        <div className="space-y-4">
          {recentPastes.map((paste) => (
            <div key={paste.id} className="rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all cursor-pointer" style={{ background: "#111827" }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Eye size={14} className="text-gray-400" />
                  <span className={`text-xs px-2 py-0.5 rounded ${severityBg[paste.severity]}`}>{paste.severity}</span>
                  <span className="text-xs text-gray-500">{paste.site}</span>
                  <span className="text-xs text-gray-600">{paste.date}</span>
                </div>
                <div className="text-right flex-1 mr-4">
                  <h4 className="text-sm font-semibold text-white">{paste.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{paste.id} — {paste.records.toLocaleString()} سجل</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 justify-end">
                {paste.pii.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
