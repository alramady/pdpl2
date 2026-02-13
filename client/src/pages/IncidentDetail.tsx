import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Layout from "../components/Layout";
import { useRoute, useLocation } from "wouter";
import { ArrowRight, AlertTriangle, Clock, Shield, FileText, MapPin, Database, User, Calendar, Tag } from "lucide-react";

const severityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

const statusLabels: Record<string, string> = {
  new: "جديد",
  analyzing: "قيد التحليل",
  documented: "موثّق",
  completed: "مكتمل",
};

const sourceLabels: Record<string, string> = {
  telegram: "تليجرام",
  darkweb: "الدارك ويب",
  paste_sites: "مواقع اللصق",
  vendor_files: "ملفات البائعين",
  other: "أخرى",
};

export default function IncidentDetail() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/incidents/:id");
  const id = params?.id ? parseInt(params.id) : 0;

  const { data: incident, isLoading } = trpc.incidents.byId.useQuery({ id }, { enabled: id > 0 });
  const { data: evidence } = trpc.evidence.list.useQuery({ incidentId: id, limit: 20 }, { enabled: id > 0 });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout title="تفاصيل الحادثة" titleEn="Incident Details">
      <div className="p-6 space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/")} className="p-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors">
            <ArrowRight size={20} className="text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">تفاصيل الحادثة #{id}</h1>
            <p className="text-sm text-muted-foreground">عرض تفصيلي للحادثة والأدلة المرتبطة</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : incident ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-orange-500" />
                  {incident.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{incident.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Tag size={14} />
                      <span>الخطورة</span>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${severityColors[incident.severity]}`}>
                      {incident.severity === 'critical' ? 'حرج' : incident.severity === 'high' ? 'عالي' : incident.severity === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Clock size={14} />
                      <span>الحالة</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{statusLabels[incident.status] || incident.status}</span>
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Shield size={14} />
                      <span>المصدر</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{sourceLabels[incident.source] || incident.source}</span>
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Database size={14} />
                      <span>السجلات المتأثرة</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{incident.affectedRecords?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Evidence Chain */}
              {evidence && evidence.items.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-blue-500" />
                    سلسلة الأدلة ({evidence.total})
                  </h3>
                  <div className="space-y-3">
                    {evidence.items.map((ev: any) => (
                      <div key={ev.id} className="flex items-start gap-3 p-3 bg-secondary rounded-lg border border-border">
                        <div className={`w-3 h-3 rounded-full mt-1.5 ${ev.verified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground text-sm">{ev.title}</span>
                            <span className="text-xs text-muted-foreground">{new Date(ev.collectedAt).toLocaleDateString('ar-SA')}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{ev.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{ev.evidenceType}</span>
                            <span className="text-xs text-muted-foreground">جمعه: {ev.collectedBy}</span>
                            {ev.verified && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">تم التحقق</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-4">معلومات إضافية</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">تاريخ الاكتشاف</p>
                      <p className="text-sm font-medium text-foreground">{new Date(incident.discoveredAt).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">مسند إلى</p>
                      <p className="text-sm font-medium text-foreground">{incident.assignedTo || 'غير محدد'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">القطاع</p>
                      <p className="text-sm font-medium text-foreground">قطاع #{incident.sectorId}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Types */}
              {incident.dataTypes != null && Array.isArray(incident.dataTypes) && (incident.dataTypes as string[]).length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-foreground mb-4">أنواع البيانات المتأثرة</h3>
                  <div className="flex flex-wrap gap-2">
                    {(incident.dataTypes as string[]).map((dt: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100">
                        {dt === 'phone' ? 'رقم الهاتف' : dt === 'national_id' ? 'رقم الهوية' : dt === 'email' ? 'البريد الإلكتروني' : dt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-4">الجدول الزمني</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">تم الاكتشاف</p>
                      <p className="text-xs text-foreground">{new Date(incident.discoveredAt).toLocaleString('ar-SA')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">تم الإنشاء</p>
                      <p className="text-xs text-foreground">{new Date(incident.createdAt).toLocaleString('ar-SA')}</p>
                    </div>
                  </div>
                  {incident.resolvedAt && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">تم الحل</p>
                        <p className="text-xs text-foreground">{new Date(incident.resolvedAt).toLocaleString('ar-SA')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-muted-foreground">لم يتم العثور على الحادثة</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
