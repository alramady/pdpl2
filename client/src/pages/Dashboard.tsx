import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import Layout from "../components/Layout";
import { trpc } from "@/lib/trpc";
import {
  Shield, Eye, AlertTriangle, BarChart3, Building2, Fingerprint,
  Wifi, Zap, Database, Send, Globe, FileText, TrendingUp,
  ChevronLeft, ExternalLink, Clock, Activity, ArrowUpRight, X
} from "lucide-react";

// Animated counter
function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

// Sparkline SVG
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 60},${30 - (v / max) * 28}`).join(" ");
  return (
    <svg width="60" height="30" className="inline-block">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Detail Modal
function DetailModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 w-full max-w-3xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400">
            <X size={18} />
          </button>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="p-5 overflow-y-auto max-h-[70vh]">{children}</div>
      </div>
    </div>
  );
}

// Source icons map
const sourceIcons: Record<string, React.ReactNode> = {
  "تليجرام": <Send size={16} className="text-teal-500" />,
  "دارك ويب": <Globe size={16} className="text-purple-500" />,
  "مواقع اللصق": <FileText size={16} className="text-amber-500" />,
};

const sourceColors: Record<string, string> = {
  "تليجرام": "#14b8a6",
  "دارك ويب": "#8b5cf6",
  "مواقع اللصق": "#f59e0b",
};

const severityColors: Record<string, string> = {
  "واسع النطاق": "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  "عالي": "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  "متوسط": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "محدود": "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
};

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [selectedPii, setSelectedPii] = useState<any>(null);

  // Fetch data from database
  const { data: dashData, isLoading: dashLoading } = trpc.dashboard.stats.useQuery();
  const { data: incidentsData } = trpc.incidents.list.useQuery({ limit: 8 });
  const { data: leaksData } = trpc.leaks.list.useQuery({ limit: 10 });
  const { data: telegramData } = trpc.telegram.list.useQuery({ limit: 5 });
  const { data: darkwebData } = trpc.darkweb.list.useQuery({ limit: 5 });
  const { data: pasteData } = trpc.paste.list.useQuery({ limit: 5 });
  const { data: evidenceData } = trpc.evidence.list.useQuery({ limit: 5 });

  // Derived values
  const stats = dashData?.stats || {};
  const statusCounts = dashData?.statusCounts || { new: 0, analyzing: 0, documented: 0, completed: 0 };
  const sourceCounts = dashData?.sourceCounts || { telegram: 0, darkweb: 0, paste: 0 };
  const sectorsList = dashData?.sectors || [];
  const piiList = dashData?.piiTypes || [];

  const totalIncidents = Number(stats["totalIncidents"] || 329);
  const totalLeaks = Number(stats["totalLeaks"] || 334);
  const exposedRecords = Number(stats["exposedRecords"] || 245200000);
  const piiTypesCount = piiList.length || 54;
  const sectorsCount = sectorsList.length || 36;

  const monitoringSources = [
    { name: "تليجرام", nameEn: "Telegram", count: sourceCounts.telegram, percentage: Math.round((sourceCounts.telegram / (sourceCounts.telegram + sourceCounts.darkweb + sourceCounts.paste || 1)) * 100), color: "#14b8a6" },
    { name: "دارك ويب", nameEn: "Dark Web", count: sourceCounts.darkweb, percentage: Math.round((sourceCounts.darkweb / (sourceCounts.telegram + sourceCounts.darkweb + sourceCounts.paste || 1)) * 100), color: "#8b5cf6" },
    { name: "مواقع اللصق", nameEn: "Paste Sites", count: sourceCounts.paste, percentage: Math.round((sourceCounts.paste / (sourceCounts.telegram + sourceCounts.darkweb + sourceCounts.paste || 1)) * 100), color: "#f59e0b" },
  ];

  const kpiCards = [
    { label: "إجمالي الحوادث", labelEn: "Total Incidents", value: totalIncidents, icon: <Shield size={20} />, color: "from-red-500 to-rose-600", bgColor: "bg-red-50 dark:bg-red-500/10", iconColor: "text-red-600 dark:text-red-400", badge: totalLeaks, sparkData: [12, 19, 15, 25, 22, 30, 28, 35], onClick: () => setActiveModal("incidents") },
    { label: "سجلات مكشوفة", labelEn: "Exposed Records", value: exposedRecords, icon: <Eye size={20} />, color: "from-amber-500 to-orange-600", bgColor: "bg-amber-50 dark:bg-amber-500/10", iconColor: "text-amber-600 dark:text-amber-400", badge: null, sparkData: [5, 8, 12, 15, 20, 18, 25, 30], onClick: () => setActiveModal("records") },
    { label: "أنواع PII", labelEn: "PII Types", value: piiTypesCount, icon: <Fingerprint size={20} />, color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50 dark:bg-blue-500/10", iconColor: "text-blue-600 dark:text-blue-400", badge: null, sparkData: [10, 12, 14, 16, 18, 20, 22, 24], onClick: () => setActiveModal("pii") },
    { label: "القطاعات المتأثرة", labelEn: "Affected Sectors", value: sectorsCount, icon: <Building2 size={20} />, color: "from-teal-500 to-emerald-600", bgColor: "bg-teal-50 dark:bg-teal-500/10", iconColor: "text-teal-600 dark:text-teal-400", badge: null, sparkData: [8, 10, 12, 14, 16, 18, 20, 22], onClick: () => setActiveModal("sectors") },
  ];

  const formatRecords = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n.toString();
  };

  if (dashLoading) {
    return (
      <Layout title="لوحة القيادة" titleEn="Command Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">جاري تحميل البيانات...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="لوحة القيادة" titleEn="Command Dashboard">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            onClick={card.onClick}
            className="rounded-xl p-4 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 hover:shadow-lg hover:border-gray-200 dark:hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <Sparkline data={card.sparkData} color={card.iconColor.includes("red") ? "#ef4444" : card.iconColor.includes("amber") ? "#f59e0b" : card.iconColor.includes("blue") ? "#3b82f6" : "#14b8a6"} />
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">{card.labelEn}</p>
                </div>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <span className={card.iconColor}>{card.icon}</span>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <ArrowUpRight size={12} />
                <span>+12%</span>
              </div>
              <div className="flex items-center gap-2">
                {card.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium">{card.badge}</span>
                )}
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  <AnimatedNumber value={card.value} />
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-end gap-1 text-xs text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>عرض التفاصيل</span>
              <ChevronLeft size={12} />
            </div>
          </div>
        ))}
      </div>

      {/* Incident Status + Monitoring Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Incident Status */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate("/leaks")} className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500 flex items-center gap-1">
              <ChevronLeft size={12} />
              عرض الكل
            </button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">حالة الحوادث</h3>
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10">
                <AlertTriangle size={16} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Incident Status</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "جديد", labelEn: "New", value: statusCounts.new, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", status: "new" },
              { label: "قيد التحليل", labelEn: "Analyzing", value: statusCounts.analyzing, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", status: "analyzing" },
              { label: "موثّق", labelEn: "Documented", value: statusCounts.documented, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", status: "documented" },
              { label: "مكتمل", labelEn: "Completed", value: statusCounts.completed, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10", status: "completed" },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => navigate(`/leaks?status=${item.status}`)}
                className={`p-4 rounded-xl ${item.bg} border border-gray-100 dark:border-white/5 cursor-pointer hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${item.color}`}>
                    <AnimatedNumber value={item.value} />
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.label}</p>
                    <p className="text-[10px] text-gray-400">{item.labelEn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring Sources */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500 flex items-center gap-1">
              <ChevronLeft size={12} />
              التفاصيل
            </button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">مصادر الرصد</h3>
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10">
                <Eye size={16} className="text-teal-600 dark:text-teal-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Monitoring Sources</p>
          <div className="space-y-4">
            {monitoringSources.map((source) => (
              <div
                key={source.name}
                onClick={() => {
                  if (source.name === "تليجرام") navigate("/telegram");
                  else if (source.name === "دارك ويب") navigate("/darkweb");
                  else navigate("/paste-sites");
                }}
                className="p-4 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer hover:shadow-md transition-all"
                style={{ background: `${source.color}08` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800 dark:text-white">{source.count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{source.name}</span>
                      <span className="text-xs text-gray-400 mr-1">{source.nameEn}</span>
                    </div>
                    <div className="p-2 rounded-lg" style={{ background: `${source.color}15` }}>
                      {sourceIcons[source.name]}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{source.percentage}%</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${source.percentage}%`, background: source.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sectors + Radar + PII */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Affected Sectors */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setActiveModal("sectors")} className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500">عرض الكل</button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">القطاعات المتأثرة</h3>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10">
                <Building2 size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Affected Sectors</p>
          <div className="grid grid-cols-2 gap-3">
            {(sectorsList.length > 0 ? sectorsList.slice(0, 6) : []).map((sector: any) => (
              <div
                key={sector.id}
                onClick={() => setSelectedSector(sector)}
                className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-teal-300 dark:hover:border-teal-500/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">{sector.percentage}%</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">{sector.nameAr}</span>
                    <span className="text-base">{sector.icon}</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 text-right">
                  {sector.incidentCount} حادثة · {Number(sector.recordCount).toLocaleString()} سجل
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Radar */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 justify-end mb-4">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">رادار الرصد</h3>
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10">
              <Eye size={16} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Live Radar</p>
          <div className="relative w-44 h-44 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full border border-teal-200 dark:border-teal-500/20" />
            <div className="absolute inset-4 rounded-full border border-teal-200 dark:border-teal-500/15" />
            <div className="absolute inset-8 rounded-full border border-teal-200 dark:border-teal-500/10" />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(13,148,136,0.15) 30deg, transparent 60deg)", animation: "spin 3s linear infinite" }} />
            </div>
            <div className="absolute top-6 right-10 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div className="absolute top-14 left-6 w-2 h-2 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-10 right-14 w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <Wifi size={14} className="text-teal-600 dark:text-teal-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">32</div>
                <div className="text-[10px] text-gray-400">قنوات الرصد</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <Wifi size={14} className="text-green-600 dark:text-green-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">27</div>
                <div className="text-[10px] text-gray-400">قنوات نشطة</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <Zap size={14} className="text-amber-600 dark:text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{totalLeaks}</div>
                <div className="text-[10px] text-gray-400">تسريبات مُثرَاة بالذكاء</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <Database size={14} className="text-cyan-600 dark:text-cyan-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{formatRecords(exposedRecords)}</div>
                <div className="text-[10px] text-gray-400">بيانات PII مكتشفة</div>
              </div>
            </div>
          </div>
        </div>

        {/* PII Classification */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate("/pii-classifier")} className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500">التفاصيل</button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">تصنيف البيانات الشخصية المسربة</h3>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                <Eye size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">PII Classification</p>
          <div className="space-y-3">
            {(piiList.length > 0 ? piiList.slice(0, 8) : []).map((item: any) => (
              <div
                key={item.id}
                onClick={() => setSelectedPii(item)}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] rounded-lg p-1 -m-1 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-700 dark:text-white w-10 text-left">{item.count}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(item.count / (piiList[0]?.count || 220)) * 100}%`, background: item.color }} />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 w-32 text-right">{item.nameAr}</span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: item.color + "20" }}>
                  <Fingerprint size={13} style={{ color: item.color }} />
                </div>
              </div>
            ))}
            {piiList.length > 8 && (
              <div className="text-xs text-gray-400 text-center mt-2 cursor-pointer hover:text-teal-500" onClick={() => navigate("/pii-classifier")}>
                + {piiList.length - 8} نوع آخر
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Latest Incidents + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Latest Incidents */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate("/leaks")} className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500 flex items-center gap-1">
              <ChevronLeft size={12} />
              عرض الكل
            </button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">آخر الحوادث المرصودة</h3>
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10">
                <Eye size={16} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Latest Incidents</p>
          <div className="space-y-2.5">
            {(incidentsData?.items || []).slice(0, 6).map((incident: any) => (
              <div
                key={incident.id}
                onClick={() => navigate(`/incidents/${incident.id}`)}
                className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-teal-300 dark:hover:border-teal-500/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col items-start gap-1">
                    <span className={`text-[11px] px-2 py-0.5 rounded ${severityColors[incident.severity] || "bg-gray-100 text-gray-600"}`}>
                      {incident.severity}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {new Date(incident.discoveredAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long" })}
                    </span>
                  </div>
                  <div className="flex-1 text-right mr-3">
                    <div className="text-sm text-gray-700 dark:text-gray-200 font-medium leading-relaxed">{incident.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      {incident.source} · {Number(incident.recordCount).toLocaleString()} سجل
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend + Activity */}
        <div className="space-y-5">
          <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-4">
              <button className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500">التفاصيل</button>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white">الاتجاه الشهري</h3>
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10">
                  <BarChart3 size={16} className="text-teal-600 dark:text-teal-400" />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4 text-right">Monthly Trend</p>
            <div className="space-y-3">
              {[
                { month: "2025-09", count: 14 },
                { month: "2025-10", count: 12 },
                { month: "2025-11", count: 21 },
                { month: "2025-12", count: 6 },
                { month: "2026-01", count: 33 },
                { month: "2026-02", count: 107 },
              ].map((item) => (
                <div key={item.month} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-white w-8 text-left">{item.count}</span>
                  <div className="flex-1 h-3 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(item.count / 107) * 100}%`, background: "linear-gradient(90deg, #0d9488, #06b6d4)" }} />
                  </div>
                  <span className="text-xs text-gray-400 w-16 font-mono text-right">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Evidence */}
          <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2 justify-between mb-4">
              <button onClick={() => navigate("/evidence-chain")} className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500 flex items-center gap-1">
                <ChevronLeft size={12} />
                عرض الكل
              </button>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white">سجل النشاط</h3>
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                  <Activity size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4 text-right">Activity Log</p>
            <div className="space-y-2.5">
              {(incidentsData?.items || []).slice(0, 5).map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/incidents/${item.id}`)}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 cursor-pointer hover:border-gray-200 dark:hover:border-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-red-500" />
                      <span className="text-[11px] text-gray-400">
                        {new Date(item.discoveredAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long" })}
                      </span>
                    </div>
                    <div className="flex-1 text-right mr-3">
                      <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">رصد تسريب: {item.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{item.source}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODALS ===== */}

      {/* Incidents Modal */}
      {activeModal === "incidents" && (
        <DetailModal title="تفاصيل الحوادث" onClose={() => setActiveModal(null)}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(statusCounts).map(([key, val]) => (
              <div key={key} className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">{val}</div>
                <div className="text-sm text-gray-500">{key === "new" ? "جديد" : key === "analyzing" ? "قيد التحليل" : key === "documented" ? "موثّق" : "مكتمل"}</div>
              </div>
            ))}
          </div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">آخر الحوادث</h4>
          <div className="space-y-2">
            {(incidentsData?.items || []).map((inc: any) => (
              <div key={inc.id} onClick={() => { setActiveModal(null); navigate(`/incidents/${inc.id}`); }} className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 cursor-pointer hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded ${severityColors[inc.severity] || "bg-gray-100 text-gray-600"}`}>{inc.severity}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{inc.title}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1 text-right">{inc.source} · {Number(inc.recordCount).toLocaleString()} سجل</div>
              </div>
            ))}
          </div>
        </DetailModal>
      )}

      {/* Records Modal */}
      {activeModal === "records" && (
        <DetailModal title="السجلات المكشوفة" onClose={() => setActiveModal(null)}>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{formatRecords(exposedRecords)}</div>
            <p className="text-gray-500">إجمالي السجلات المكشوفة</p>
          </div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">أكبر التسريبات حجماً</h4>
          <div className="space-y-2">
            {(leaksData?.items || []).sort((a: any, b: any) => Number(b.recordCount) - Number(a.recordCount)).slice(0, 10).map((leak: any) => (
              <div key={leak.id} onClick={() => { setActiveModal(null); navigate(`/leaks/${leak.id}`); }} className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 cursor-pointer hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-red-600">{Number(leak.recordCount).toLocaleString()}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate mr-2">{leak.title}</span>
                </div>
              </div>
            ))}
          </div>
        </DetailModal>
      )}

      {/* PII Modal */}
      {activeModal === "pii" && (
        <DetailModal title="أنواع البيانات الشخصية" onClose={() => setActiveModal(null)}>
          <div className="space-y-3">
            {piiList.map((item: any) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <span className="text-sm font-semibold text-gray-700 dark:text-white w-12 text-left">{item.count}</span>
                <div className="flex-1 h-3 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(item.count / (piiList[0]?.count || 220)) * 100}%`, background: item.color }} />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 w-40 text-right">{item.nameAr}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: item.color + "20" }}>
                  <Fingerprint size={14} style={{ color: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </DetailModal>
      )}

      {/* Sectors Modal */}
      {activeModal === "sectors" && (
        <DetailModal title="القطاعات المتأثرة" onClose={() => setActiveModal(null)}>
          <div className="space-y-3">
            {sectorsList.map((sector: any) => (
              <div key={sector.id} onClick={() => { setActiveModal(null); setSelectedSector(sector); }} className="p-4 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 cursor-pointer hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-teal-600">{sector.percentage}%</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{sector.nameAr}</span>
                    <span className="text-lg">{sector.icon}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{Number(sector.recordCount).toLocaleString()} سجل</span>
                  <span>{sector.incidentCount} حادثة</span>
                </div>
              </div>
            ))}
          </div>
        </DetailModal>
      )}

      {/* Sector Detail Modal */}
      {selectedSector && (
        <DetailModal title={`تفاصيل القطاع: ${selectedSector.nameAr}`} onClose={() => setSelectedSector(null)}>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-center">
              <div className="text-2xl font-bold text-red-600">{selectedSector.incidentCount}</div>
              <div className="text-xs text-gray-500">حادثة</div>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-center">
              <div className="text-2xl font-bold text-amber-600">{Number(selectedSector.recordCount).toLocaleString()}</div>
              <div className="text-xs text-gray-500">سجل مكشوف</div>
            </div>
            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-center">
              <div className="text-2xl font-bold text-teal-600">{selectedSector.percentage}%</div>
              <div className="text-xs text-gray-500">نسبة التأثير</div>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            <p className="mb-2"><strong>الاسم بالإنجليزية:</strong> {selectedSector.nameEn}</p>
            <p><strong>عدد الحوادث:</strong> {selectedSector.incidentCount} حادثة تم رصدها في هذا القطاع</p>
          </div>
          <button onClick={() => { setSelectedSector(null); navigate(`/leaks?sectorId=${selectedSector.id}`); }} className="w-full py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors">
            عرض حوادث هذا القطاع
          </button>
        </DetailModal>
      )}

      {/* PII Detail Modal */}
      {selectedPii && (
        <DetailModal title={`تفاصيل: ${selectedPii.nameAr}`} onClose={() => setSelectedPii(null)}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: selectedPii.color + "20" }}>
              <Fingerprint size={28} style={{ color: selectedPii.color }} />
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white">{selectedPii.count}</div>
            <p className="text-gray-500">{selectedPii.nameEn}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2"><strong>التصنيف:</strong> {selectedPii.category}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2"><strong>مستوى الحساسية:</strong> {selectedPii.sensitivityLevel}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>عدد مرات الاكتشاف:</strong> {selectedPii.count} مرة في التسريبات المرصودة</p>
          </div>
        </DetailModal>
      )}
    </Layout>
  );
}
