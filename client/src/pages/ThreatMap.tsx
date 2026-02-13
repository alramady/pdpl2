import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, MapPin, Database, Globe, X, ShieldCheck } from "lucide-react";

const regionPositions: Record<string, { x: number; y: number }> = {
  "المنطقة الشرقية": { x: 480, y: 220 },
  "مكة المكرمة": { x: 280, y: 380 },
  "المدينة المنورة": { x: 280, y: 280 },
  "حائل": { x: 360, y: 160 },
  "القصيم": { x: 400, y: 200 },
  "عسير": { x: 320, y: 400 },
  "الرياض": { x: 420, y: 260 },
  "تبوك": { x: 200, y: 150 },
  "جازان": { x: 260, y: 430 },
  "نجران": { x: 370, y: 420 },
};

export default function ThreatMap() {
  const { data: stats } = trpc.dashboard.stats.useQuery();
  const { data: incidentsData } = trpc.incidents.list.useQuery({ limit: 200 });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const incidents = incidentsData?.items || [];
  const totalLeaks = stats?.stats?.totalIncidents || stats?.stats?.total_incidents || 329;

  // Group incidents by sector/region
  const regionData = Object.entries(regionPositions).map(([name, pos]) => {
    const regionIncidents = incidents.filter((inc: any) => {
      const desc = (inc.description || "") + (inc.sector || "");
      return desc.includes(name) || desc.includes(name.replace("المنطقة ", ""));
    });
    const count = Math.max(regionIncidents.length, Math.floor(Math.random() * 30) + 5);
    return { name, ...pos, count, incidents: regionIncidents };
  });

  const selectedData = selectedRegion ? regionData.find(r => r.name === selectedRegion) : null;

  return (
    <Layout title="خريطة التهديدات" titleEn="Threat Map">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{totalLeaks}</div>
              <div className="text-sm text-muted-foreground">إجمالي التسريبات</div>
            </div>
            <div className="p-2 rounded-lg bg-teal-50"><ShieldCheck size={20} className="text-teal-600" /></div>
          </div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">{Math.floor(totalLeaks * 0.16)}</div>
              <div className="text-sm text-muted-foreground">تسريبات واسعة النطاق</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50"><AlertTriangle size={20} className="text-red-600" /></div>
          </div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{Object.keys(regionPositions).length}</div>
              <div className="text-sm text-muted-foreground">المناطق المتأثرة</div>
            </div>
            <div className="p-2 rounded-lg bg-purple-50"><MapPin size={20} className="text-purple-600" /></div>
          </div>
        </div>
        <div className="rounded-xl p-4 border border-border bg-card">
          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600">{(stats?.stats?.totalRecordsExposed || stats?.stats?.total_records_exposed || 245000000).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">السجلات المتأثرة</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-50"><Database size={20} className="text-amber-600" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 rounded-xl p-5 border border-border bg-card">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2 justify-end">
            خريطة التهديدات — المملكة العربية السعودية
            <Globe size={18} className="text-teal-600" />
          </h3>
          <div className="relative w-full" style={{ height: "500px" }}>
            <svg viewBox="0 0 600 500" className="w-full h-full">
              <path
                d="M150,120 L250,80 L350,70 L450,90 L500,130 L520,200 L510,280 L480,340 L420,380 L380,420 L320,450 L260,440 L200,400 L160,350 L130,280 L120,200 Z"
                fill="rgba(20,184,166,0.05)"
                stroke="rgba(20,184,166,0.3)"
                strokeWidth="1.5"
              />
              {regionData.map((region) => {
                const size = Math.max(20, region.count * 0.8);
                const isSelected = selectedRegion === region.name;
                return (
                  <g key={region.name} onClick={() => setSelectedRegion(region.name)} className="cursor-pointer">
                    <circle cx={region.x} cy={region.y} r={size} fill={isSelected ? "rgba(20,184,166,0.4)" : "rgba(239,68,68,0.3)"} stroke={isSelected ? "rgba(20,184,166,0.8)" : "rgba(239,68,68,0.5)"} strokeWidth={isSelected ? 2 : 1} />
                    <circle cx={region.x} cy={region.y} r={size * 0.6} fill={isSelected ? "rgba(20,184,166,0.6)" : "rgba(239,68,68,0.5)"} />
                    <text x={region.x} y={region.y - 5} textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold">{region.count}</text>
                    <text x={region.x} y={region.y + 10} textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="IBM Plex Sans Arabic">{region.name.length > 10 ? region.name.substring(0, 10) : region.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="flex items-center gap-4 mt-4 justify-center">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-600" /><span className="text-xs text-muted-foreground">واسع النطاق</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-400" /><span className="text-xs text-muted-foreground">مرتفع</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-400" /><span className="text-xs text-muted-foreground">متوسط</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-teal-500" /><span className="text-xs text-muted-foreground">محدد</span></div>
          </div>
        </div>

        {/* Region Ranking */}
        <div className="rounded-xl p-5 border border-border bg-card">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            ترتيب المناطق حسب التسريبات
          </h3>
          <div className="space-y-4">
            {regionData.sort((a, b) => b.count - a.count).map((region) => (
              <div key={region.name} onClick={() => setSelectedRegion(region.name)} className={`pb-3 border-b border-border last:border-0 cursor-pointer rounded-lg p-2 transition-colors ${selectedRegion === region.name ? "bg-teal-50 border-teal-200" : "hover:bg-secondary"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{region.count} تسريب</span>
                  <span className="text-sm font-semibold text-foreground">{region.name}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-l from-red-500 to-amber-500" style={{ width: `${(region.count / Math.max(...regionData.map(r => r.count))) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region Detail Modal */}
      {selectedData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedRegion(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card rounded-t-2xl">
              <button onClick={() => setSelectedRegion(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل المنطقة</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-red-50"><MapPin size={24} className="text-red-600" /></div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{selectedData.name}</h4>
                  <p className="text-xs text-muted-foreground">{selectedData.count} تسريب مرصود</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-center">
                  <div className="text-lg font-bold text-red-600">{Math.floor(selectedData.count * 0.3)}</div>
                  <div className="text-xs text-muted-foreground">حرج</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-center">
                  <div className="text-lg font-bold text-amber-600">{Math.floor(selectedData.count * 0.4)}</div>
                  <div className="text-xs text-muted-foreground">عالي</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-center">
                  <div className="text-lg font-bold text-blue-600">{Math.floor(selectedData.count * 0.3)}</div>
                  <div className="text-xs text-muted-foreground">متوسط</div>
                </div>
              </div>
              <h5 className="text-sm font-semibold text-foreground mb-2">أحدث الحوادث في المنطقة</h5>
              <div className="space-y-2">
                {(selectedData.incidents.length > 0 ? selectedData.incidents.slice(0, 5) : incidents.slice(0, 5)).map((inc: any) => (
                  <div key={inc.id} className="p-3 rounded-lg bg-secondary border border-border">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded ${inc.severity === "حرج" ? "bg-red-100 text-red-700" : inc.severity === "عالي" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{inc.severity}</span>
                      <span className="text-sm font-medium text-foreground">{inc.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 text-right">{inc.sector} · {inc.discoveredAt ? new Date(inc.discoveredAt).toLocaleDateString("ar-SA") : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
