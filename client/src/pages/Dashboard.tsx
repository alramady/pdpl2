import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  dashboardStats, monitoringSources, affectedSectors, radarStats,
  piiClassification, latestIncidents, monthlyTrend, activityLog
} from "@/lib/data";
import {
  Shield, Database, Fingerprint, Building2, AlertTriangle, Clock,
  FileCheck, CheckCircle2, RefreshCw, ChevronLeft, Eye, Zap, Wifi, BarChart3
} from "lucide-react";
import { toast } from "sonner";

function AnimatedNumber({ value, suffix = "" }: { value: number | string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const numVal = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;

  useEffect(() => {
    let start = 0;
    const end = numVal;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [numVal]);

  if (typeof value === "string" && value.includes("M")) {
    return <span>{value}</span>;
  }
  return <span>{display.toLocaleString()}{suffix}</span>;
}

function KPICard({ icon, value, label, labelEn, badge, badgeColor, gradient }: any) {
  return (
    <div
      className="relative overflow-hidden rounded-xl p-5 border border-white/5 cursor-pointer hover:border-white/10 transition-all group"
      style={{ background: gradient || "#111827" }}
    >
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.1)" }}>
          {icon}
        </div>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColor || "bg-teal-500/20 text-teal-400"}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-white">
          <AnimatedNumber value={value} />
        </div>
        <div className="text-sm text-gray-300 mt-1">{label}</div>
        <div className="text-xs text-gray-500">{labelEn}</div>
      </div>
      <div className="text-xs text-gray-500 mt-2">اضغط لعرض التفاصيل</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Layout title="لوحة القيادة" titleEn="Dashboard">
      {/* Header Banner */}
      <div className="rounded-xl p-6 mb-6 border border-white/5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d2137 100%)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-live" />
              مباشر
            </span>
            <span className="text-xs text-gray-500">آخر تحديث: الآن</span>
            <button
              onClick={() => toast.success("تم التحديث")}
              className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors"
            >
              <RefreshCw size={12} />
              تحديث
            </button>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-3 justify-end">
              <div>
                <h2 className="text-xl font-bold text-white">لوحة مؤشرات الرصد</h2>
                <p className="text-sm text-gray-400">مؤشرات أداء رصد تسريبات البيانات الشخصية</p>
              </div>
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                <BarChart3 size={24} className="text-teal-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          icon={<Shield size={20} className="text-teal-400" />}
          value={dashboardStats.totalIncidents}
          label="إجمالي حوادث التسريب"
          labelEn="Total Incidents"
          badge={`+${dashboardStats.newIncidents} جديدة`}
          badgeColor="bg-teal-500/20 text-teal-400"
          gradient="linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)"
        />
        <KPICard
          icon={<Database size={20} className="text-cyan-400" />}
          value={dashboardStats.exposedRecords}
          label="السجلات الشخصية المكشوفة"
          labelEn="Exposed Records"
          badge="+8.1% من الشهر السابق"
          badgeColor="bg-cyan-500/20 text-cyan-400"
          gradient="linear-gradient(135deg, #0f172a 0%, #164e63 100%)"
        />
        <KPICard
          icon={<Fingerprint size={20} className="text-purple-400" />}
          value={dashboardStats.piiTypes}
          label="أنواع البيانات الشخصية"
          labelEn="PII Types Detected"
          badge={`${dashboardStats.piiTypes} نوع مكتشف`}
          badgeColor="bg-purple-500/20 text-purple-400"
        />
        <KPICard
          icon={<Building2 size={20} className="text-amber-400" />}
          value={dashboardStats.affectedSectors}
          label="القطاعات المتأثرة"
          labelEn="Affected Sectors"
          badge={`${dashboardStats.affectedSectors} قطاع`}
          badgeColor="bg-amber-500/20 text-amber-400"
        />
      </div>

      {/* Incident Status */}
      <div className="rounded-xl p-5 border border-white/5 mb-6" style={{ background: "#111827" }}>
        <h3 className="text-base font-semibold text-white mb-1">حالة الحوادث</h3>
        <p className="text-xs text-gray-500 mb-4">Incident Status</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
            <AlertTriangle size={18} className="text-red-400" />
            <div>
              <div className="text-lg font-bold text-red-400">{dashboardStats.incidentStatus.new}</div>
              <div className="text-xs text-gray-400">تسريبات جديدة</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
            <Clock size={18} className="text-amber-400" />
            <div>
              <div className="text-lg font-bold text-amber-400">{dashboardStats.incidentStatus.underAnalysis}</div>
              <div className="text-xs text-gray-400">قيد التحليل</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
            <FileCheck size={18} className="text-blue-400" />
            <div>
              <div className="text-lg font-bold text-blue-400">{dashboardStats.incidentStatus.documented}</div>
              <div className="text-xs text-gray-400">تم التوثيق</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
            <CheckCircle2 size={18} className="text-green-400" />
            <div>
              <div className="text-lg font-bold text-green-400">{dashboardStats.incidentStatus.completed}</div>
              <div className="text-xs text-gray-400">مكتملة</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monitoring Sources */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">مصادر الرصد</h3>
              <p className="text-xs text-gray-500">Monitoring Sources</p>
            </div>
            <button className="text-xs text-teal-400 hover:text-teal-300">التفاصيل</button>
          </div>
          <div className="space-y-4">
            {monitoringSources.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: source.color }} />
                  <div>
                    <div className="text-sm text-gray-200">{source.name}</div>
                    <div className="text-xs text-gray-500">{source.nameEn}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">{source.count}</span>
                  <span className="text-xs text-gray-500">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affected Sectors */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">القطاعات المتأثرة</h3>
              <p className="text-xs text-gray-500">Affected Sectors</p>
            </div>
            <button className="text-xs text-teal-400 hover:text-teal-300">عرض الكل</button>
          </div>
          <div className="space-y-3">
            {affectedSectors.map((sector) => (
              <div key={sector.name} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{sector.icon}</span>
                    <span className="text-sm text-gray-200">{sector.name}</span>
                  </div>
                  <span className="text-xs text-teal-400">{sector.percentage}%</span>
                </div>
                <div className="text-xs text-gray-500">
                  {sector.incidents} حادثة · {sector.records.toLocaleString()} سجل
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Radar */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">رادار الرصد</h3>
              <p className="text-xs text-gray-500">Live Radar</p>
            </div>
          </div>
          {/* Radar Visualization */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border border-teal-500/20" />
            <div className="absolute inset-4 rounded-full border border-teal-500/15" />
            <div className="absolute inset-8 rounded-full border border-teal-500/10" />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left animate-radar"
                style={{ background: "linear-gradient(90deg, #14b8a6, transparent)" }}
              />
            </div>
            {/* Dots */}
            <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <div className="absolute top-16 left-8 w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-12 right-16 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
              <Wifi size={14} className="text-teal-400" />
              <div>
                <div className="text-sm font-semibold text-white">{radarStats.channels}</div>
                <div className="text-[10px] text-gray-500">قنوات الرصد</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
              <Wifi size={14} className="text-green-400" />
              <div>
                <div className="text-sm font-semibold text-white">{radarStats.activeChannels}</div>
                <div className="text-[10px] text-gray-500">قنوات نشطة</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
              <Zap size={14} className="text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-white">{radarStats.aiEnrichedLeaks}</div>
                <div className="text-[10px] text-gray-500">تسريبات مُثرَاة بالذكاء</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
              <Database size={14} className="text-cyan-400" />
              <div>
                <div className="text-sm font-semibold text-white">{radarStats.piiDiscovered.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500">بيانات PII مكتشفة</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* PII Classification */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Eye size={18} className="text-teal-400" />
                تصنيف البيانات الشخصية المسربة
              </h3>
              <p className="text-xs text-gray-500">PII Classification</p>
            </div>
            <button className="text-xs text-teal-400 hover:text-teal-300">التفاصيل</button>
          </div>
          <div className="space-y-3">
            {piiClassification.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-32 text-right">{item.name}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(item.count / 215) * 100}%`,
                      background: item.color
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-white w-10">{item.count}</span>
              </div>
            ))}
            <div className="text-xs text-gray-500 text-center mt-2">+ 46 نوع آخر</div>
          </div>
        </div>

        {/* Latest Incidents */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Eye size={18} className="text-teal-400" />
                آخر الحوادث المرصودة
              </h3>
              <p className="text-xs text-gray-500">Latest Incidents</p>
            </div>
            <button className="text-xs text-teal-400 hover:text-teal-300">عرض الكل</button>
          </div>
          <div className="space-y-3">
            {latestIncidents.map((incident, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-200 font-medium">{incident.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {incident.sector} · {incident.records.toLocaleString()} سجل
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 mr-3">
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">{incident.source}</span>
                    <span className="text-xs text-gray-500">{incident.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-teal-400" />
                الاتجاه الشهري
              </h3>
              <p className="text-xs text-gray-500">Monthly Trend</p>
            </div>
            <button className="text-xs text-teal-400 hover:text-teal-300">التفاصيل</button>
          </div>
          <div className="space-y-3">
            {monthlyTrend.map((item) => (
              <div key={item.month} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16 font-mono">{item.month}</span>
                <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(item.count / 102) * 100}%`,
                      background: `linear-gradient(90deg, #14b8a6, #06b6d4)`
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-white w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="rounded-xl p-5 border border-white/5" style={{ background: "#111827" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-teal-400" />
                سجل النشاط
              </h3>
              <p className="text-xs text-gray-500">Activity Log</p>
            </div>
          </div>
          <div className="space-y-3">
            {activityLog.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-200">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.sector} · {item.source}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mr-3">
                    <Shield size={14} className="text-red-400" />
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
