import { useState } from "react";
import Layout from "@/components/Layout";
import { threatMapRegions } from "@/lib/data";
import { AlertTriangle, MapPin, Database, Globe } from "lucide-react";

const filters = ["الكل", "واسع النطاق", "مرتفع", "متوسط", "محدود"];

export default function ThreatMap() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const totalLeaks = 233;
  const wideScale = 52;
  const affectedRegions = 10;
  const totalRecords = 228786190;

  return (
    <Layout title="خريطة التهديدات" titleEn="Threat Map">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 cursor-pointer hover:border-gray-200 dark:border-white/10 transition-all bg-white dark:bg-[#111827]">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{totalLeaks}</div>
              <div className="text-sm text-gray-400">إجمالي التسريبات</div>
            </div>
            <div className="p-2 rounded-lg bg-teal-500/10">
              <Shield size={20} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 cursor-pointer hover:border-gray-200 dark:border-white/10 transition-all bg-white dark:bg-[#111827]">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-400">{wideScale}</div>
              <div className="text-sm text-gray-400">تسريبات واسعة النطاق</div>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 cursor-pointer hover:border-gray-200 dark:border-white/10 transition-all bg-white dark:bg-[#111827]">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">{affectedRegions}</div>
              <div className="text-sm text-gray-400">المناطق المتأثرة</div>
            </div>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <MapPin size={20} className="text-purple-400" />
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
        </div>
        <div className="rounded-xl p-4 border border-gray-100 dark:border-white/5 cursor-pointer hover:border-gray-200 dark:border-white/10 transition-all bg-white dark:bg-[#111827]">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-400">{totalRecords.toLocaleString()}</div>
              <div className="text-sm text-gray-400">السجلات المتأثرة</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Database size={20} className="text-amber-400" />
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">اضغط للتفاصيل ←</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-400">تصفية حسب التأثير:</span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              activeFilter === f
                ? "bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30"
                : "bg-gray-100 dark:bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 rounded-xl p-5 border border-gray-100 dark:border-white/5 relative bg-white dark:bg-[#111827]">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2 justify-end">
            خريطة التهديدات — المملكة العربية السعودية
            <Globe size={18} className="text-teal-600 dark:text-teal-400" />
          </h3>
          {/* Simplified Saudi Arabia Map */}
          <div className="relative w-full" style={{ height: "500px" }}>
            <svg viewBox="0 0 600 500" className="w-full h-full">
              {/* Saudi Arabia outline - simplified */}
              <path
                d="M150,120 L250,80 L350,70 L450,90 L500,130 L520,200 L510,280 L480,340 L420,380 L380,420 L320,450 L260,440 L200,400 L160,350 L130,280 L120,200 Z"
                fill="rgba(20,184,166,0.05)"
                stroke="rgba(20,184,166,0.3)"
                strokeWidth="1.5"
              />
              {/* Region bubbles */}
              {threatMapRegions.map((region, i) => {
                const positions = [
                  { x: 480, y: 220 }, // Eastern
                  { x: 280, y: 380 }, // Makkah
                  { x: 280, y: 280 }, // Madinah
                  { x: 360, y: 160 }, // Hail
                  { x: 400, y: 200 }, // Qassim
                  { x: 320, y: 400 }, // Asir
                  { x: 420, y: 260 }, // Riyadh
                  { x: 200, y: 150 }, // Tabuk
                  { x: 260, y: 430 }, // Jazan
                  { x: 370, y: 420 }, // Najran
                ];
                const pos = positions[i];
                const size = Math.max(20, region.leaks * 0.8);
                return (
                  <g key={region.name}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size}
                      fill="rgba(239,68,68,0.3)"
                      stroke="rgba(239,68,68,0.5)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size * 0.6}
                      fill="rgba(239,68,68,0.5)"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 5}
                      textAnchor="middle"
                      fill="#374151"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {region.leaks}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 10}
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize="8"
                      fontFamily="IBM Plex Sans Arabic"
                    >
                      {region.name.length > 10 ? region.name.substring(0, 10) : region.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 justify-center">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-600" /><span className="text-xs text-gray-400">واسع النطاق</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-400" /><span className="text-xs text-gray-400">مرتفع</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-400" /><span className="text-xs text-gray-400">متوسط</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-400" /><span className="text-xs text-gray-400">محدود</span></div>
          </div>
        </div>

        {/* Region Ranking */}
        <div className="rounded-xl p-5 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827]">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            ترتيب المناطق حسب التسريبات
          </h3>
          <div className="space-y-4">
            {threatMapRegions.map((region) => (
              <div key={region.name} className="pb-3 border-b border-gray-100 dark:border-white/5 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{region.leaks} تسريب</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{region.name}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden mb-1">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${(region.leaks / 57) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 justify-end">
                  {region.medium > 0 && <span>{region.medium} متوسط</span>}
                  {region.high > 0 && <span className="text-amber-400">{region.high} عالي</span>}
                  {region.wideScale > 0 && <span className="text-red-400">{region.wideScale} واسع النطاق</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Shield({ size, className }: { size: number; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
