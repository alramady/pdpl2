import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  dashboardStats, monitoringSources, affectedSectors, radarStats,
  piiClassification, latestIncidents, monthlyTrend, activityLog
} from "@/lib/data";
import {
  Shield, Database, Fingerprint, Building2, AlertTriangle, Clock,
  FileCheck, CheckCircle2, RefreshCw, Eye, Zap, Wifi, BarChart3,
  Send, Globe, FileText, Activity
} from "lucide-react";
import { toast } from "sonner";

function AnimatedNumber({ value, suffix = "" }: { value: number | string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const numVal = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;

  useEffect(() => {
    const end = numVal;
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(end * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [numVal]);

  if (typeof value === "string" && value.includes("M")) {
    return <span>{value}</span>;
  }
  return <span>{display.toLocaleString()}{suffix}</span>;
}

function MiniSparkline({ color, data }: { color: string; data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 30;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h * 0.8 - h * 0.1;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} className="mt-2">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        opacity="0.6"
      />
    </svg>
  );
}

function KPICard({ icon, value, label, labelEn, badge, badgeColor, accentColor, sparkColor, sparkData }: any) {
  return (
    <div className="relative overflow-hidden rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 cursor-pointer hover:shadow-md transition-all group"
      style={{ background: `linear-gradient(135deg, white 60%, ${accentColor}15)` }}>
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl`} style={{ background: `${accentColor}15` }}>
          {icon}
        </div>
        {badge && (
          <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: `${badgeColor}15`, color: badgeColor }}>
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="text-3xl font-bold text-gray-800 dark:text-white">
          <AnimatedNumber value={value} />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{label}</div>
        <div className="text-xs text-gray-400">{labelEn}</div>
      </div>
      <div className="text-[11px] text-gray-400 mt-1">اضغط لعرض التفاصيل</div>
      {sparkData && <MiniSparkline color={sparkColor || "#14b8a6"} data={sparkData} />}
    </div>
  );
}

const sourceIcons: Record<string, React.ReactNode> = {
  "تليجرام": <Send size={20} className="text-teal-500" />,
  "دارك ويب": <Globe size={20} className="text-purple-500" />,
  "مواقع اللصق": <FileText size={20} className="text-amber-500" />,
};

export default function Dashboard() {
  return (
    <Layout title="لوحة القيادة" titleEn="Dashboard">
      {/* Header Banner */}
      <div className="rounded-xl p-5 mb-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-green-500 text-sm font-medium px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              مباشر
            </span>
            <span className="text-xs text-gray-400">آخر تحديث: الآن</span>
            <button
              onClick={() => toast.success("تم التحديث")}
              className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10"
            >
              <RefreshCw size={12} />
              تحديث
            </button>
          </div>
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">لوحة مؤشرات الرصد</h2>
              <p className="text-sm text-gray-500">مؤشرات أداء رصد تسريبات البيانات الشخصية</p>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20">
              <BarChart3 size={22} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          icon={<Shield size={20} className="text-teal-600" />}
          value={dashboardStats.totalIncidents}
          label="إجمالي حوادث التسريب"
          labelEn="Total Incidents"
          badge={`+${dashboardStats.newIncidents} جديدة`}
          badgeColor="#14b8a6"
          accentColor="#14b8a6"
          sparkColor="#14b8a6"
          sparkData={[5, 8, 12, 9, 15, 22, 18, 25, 30, 28, 35]}
        />
        <KPICard
          icon={<Database size={20} className="text-cyan-600" />}
          value={dashboardStats.exposedRecords}
          label="السجلات الشخصية المكشوفة"
          labelEn="Exposed Records"
          badge="+8.1% من الشهر السابق"
          badgeColor="#06b6d4"
          accentColor="#06b6d4"
          sparkColor="#06b6d4"
          sparkData={[10, 15, 12, 18, 22, 20, 25, 28, 32, 30, 35]}
        />
        <KPICard
          icon={<Fingerprint size={20} className="text-amber-600" />}
          value={dashboardStats.piiTypes}
          label="أنواع البيانات الشخصية"
          labelEn="PII Types Detected"
          badge={`${dashboardStats.piiTypes} نوع مكتشف`}
          badgeColor="#f59e0b"
          accentColor="#f59e0b"
          sparkColor="#f59e0b"
          sparkData={[8, 12, 15, 14, 18, 22, 20, 25, 28, 30, 32]}
        />
        <KPICard
          icon={<Building2 size={20} className="text-emerald-600" />}
          value={dashboardStats.affectedSectors}
          label="القطاعات المتأثرة"
          labelEn="Affected Sectors"
          badge={`${dashboardStats.affectedSectors} قطاع`}
          badgeColor="#10b981"
          accentColor="#10b981"
          sparkColor="#10b981"
          sparkData={[5, 8, 10, 12, 15, 14, 18, 20, 22, 25, 28]}
        />
      </div>

      {/* Incident Status + Monitoring Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Incident Status */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 mb-4 justify-end">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">حالة الحوادث</h3>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10">
              <Activity size={16} className="text-red-500" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Incident Status</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">تسريبات جديدة</span>
                <AlertTriangle size={16} className="text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 text-center">
                <AnimatedNumber value={dashboardStats.incidentStatus.new} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">قيد التحليل</span>
                <Clock size={16} className="text-amber-500" />
              </div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 text-center">
                <AnimatedNumber value={dashboardStats.incidentStatus.underAnalysis} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">تم التوثيق</span>
                <FileCheck size={16} className="text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
                <AnimatedNumber value={dashboardStats.incidentStatus.documented} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-green-50/50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">مكتملة</span>
                <CheckCircle2 size={16} className="text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 text-center">
                <AnimatedNumber value={dashboardStats.incidentStatus.completed} />
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Sources */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500">التفاصيل</button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">مصادر الرصد</h3>
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10">
                <Wifi size={16} className="text-teal-600 dark:text-teal-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Monitoring Sources</p>
          <div className="space-y-4">
            {monitoringSources.map((source) => (
              <div key={source.name} className="p-4 rounded-xl border border-gray-100 dark:border-white/5" style={{ background: `${source.color}08` }}>
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
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${source.percentage}%`, background: source.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Affected Sectors */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500">عرض الكل</button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">القطاعات المتأثرة</h3>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10">
                <Building2 size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Affected Sectors</p>
          <div className="grid grid-cols-2 gap-3">
            {affectedSectors.map((sector) => (
              <div key={sector.name} className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">{sector.percentage}%</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{sector.name}</span>
                    <span className="text-base">{sector.icon}</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 text-right">
                  {sector.incidents} حادثة · {sector.records.toLocaleString()} سجل
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
          {/* Radar Visualization */}
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
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{radarStats.channels}</div>
                <div className="text-[10px] text-gray-400">قنوات الرصد</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <Wifi size={14} className="text-green-600 dark:text-green-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{radarStats.activeChannels}</div>
                <div className="text-[10px] text-gray-400">قنوات نشطة</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <Zap size={14} className="text-amber-600 dark:text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{radarStats.aiEnrichedLeaks}</div>
                <div className="text-[10px] text-gray-400">تسريبات مُثرَاة بالذكاء</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <Database size={14} className="text-cyan-600 dark:text-cyan-400" />
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{radarStats.piiDiscovered.toLocaleString()}</div>
                <div className="text-[10px] text-gray-400">بيانات PII مكتشفة</div>
              </div>
            </div>
          </div>
        </div>

        {/* PII Classification */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500">التفاصيل</button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">تصنيف البيانات الشخصية المسربة</h3>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                <Eye size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">PII Classification</p>
          <div className="space-y-3">
            {piiClassification.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-white w-10 text-left">{item.count}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(item.count / 220) * 100}%`, background: item.color }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 w-32 text-right">{item.name}</span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: item.color + "20" }}>
                  <Fingerprint size={13} style={{ color: item.color }} />
                </div>
              </div>
            ))}
            <div className="text-xs text-gray-400 text-center mt-2">+ 46 نوع آخر</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Latest Incidents */}
        <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <button className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-500">عرض الكل</button>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">آخر الحوادث المرصودة</h3>
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10">
                <Eye size={16} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 text-right">Latest Incidents</p>
          <div className="space-y-2.5">
            {latestIncidents.map((incident, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-500">{incident.source}</span>
                    <span className="text-[11px] text-gray-400">{incident.date}</span>
                  </div>
                  <div className="flex-1 text-right mr-3">
                    <div className="text-sm text-gray-700 dark:text-gray-200 font-medium leading-relaxed">{incident.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      {incident.sector} · {incident.records.toLocaleString()} سجل
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend + Activity Log */}
        <div className="space-y-5">
          {/* Monthly Trend */}
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
              {monthlyTrend.map((item) => (
                <div key={item.month} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-white w-8 text-left">{item.count}</span>
                  <div className="flex-1 h-3 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(item.count / 107) * 100}%`,
                        background: `linear-gradient(90deg, #0d9488, #06b6d4)`
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-16 font-mono text-right">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-xl p-5 bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2 justify-end mb-4">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">سجل النشاط</h3>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                <BarChart3 size={16} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4 text-right">Activity Log</p>
            <div className="space-y-2.5">
              {activityLog.map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-red-500" />
                      <span className="text-[11px] text-gray-400">{item.date}</span>
                    </div>
                    <div className="flex-1 text-right mr-3">
                      <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{item.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {item.sector} · {item.source}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
