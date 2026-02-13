import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Layout from "../components/Layout";
import { useRoute, useLocation } from "wouter";
import { ArrowRight, AlertTriangle, Clock, Shield, FileText, MapPin, Database, User, Calendar, Tag, ExternalLink, Globe } from "lucide-react";
import Login from "./Login";

const severityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

const severityLabels: Record<string, string> = {
  critical: "حرج",
  high: "عالي",
  medium: "متوسط",
  low: "منخفض",
};

const sourceLabels: Record<string, string> = {
  telegram: "تليجرام",
  darkweb: "الدارك ويب",
  paste_sites: "مواقع اللصق",
  vendor_files: "ملفات البائعين",
  other: "أخرى",
};

function SourceUrlBlock({ sourceUrl }: { sourceUrl: string | null }) {
  if (!sourceUrl) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <ExternalLink size={18} className="text-blue-500" />
        رابط المصدر
      </h3>
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all">
        {sourceUrl}
      </a>
    </div>
  );
}

function DataTypesBlock({ dataTypes }: { dataTypes: unknown }) {
  if (!dataTypes || !Array.isArray(dataTypes) || dataTypes.length === 0) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <FileText size={18} className="text-purple-500" />
        أنواع البيانات المسربة
      </h3>
      <div className="flex flex-wrap gap-2">
        {(dataTypes as string[]).map((dt: string, i: number) => (
          <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100">
            {dt === 'phone' ? 'رقم الهاتف' : dt === 'national_id' ? 'رقم الهوية' : dt === 'email' ? 'البريد الإلكتروني' : dt === 'address' ? 'العنوان' : dt === 'financial' ? 'بيانات مالية' : dt === 'medical' ? 'بيانات طبية' : dt}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LeakDetail() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/leaks/:id");
  const id = params?.id ? parseInt(params.id) : 0;

  const { data: leak, isLoading } = trpc.leaks.byId.useQuery({ id }, { enabled: id > 0 });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!isAuthenticated) return <Login />;

  return (
    <Layout title="تفاصيل التسريب" titleEn="Leak Details">
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/leaks")} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
            <ArrowRight size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">تفاصيل التسريب #{id}</h1>
            <p className="text-sm text-gray-500">عرض تفصيلي للتسريب المكتشف</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leak ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Shield size={20} className="text-red-500" />
                    {leak.title}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${severityColors[leak.severity]}`}>
                    {severityLabels[leak.severity]}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{leak.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Database size={14} />
                      <span>السجلات المسربة</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">{leak.dataCount?.toLocaleString()}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Globe size={14} />
                      <span>المصدر</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{sourceLabels[leak.source] || leak.source}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Clock size={14} />
                      <span>الحالة</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{leak.status === 'new' ? 'جديد' : leak.status === 'investigating' ? 'قيد التحقيق' : leak.status === 'confirmed' ? 'مؤكد' : leak.status === 'resolved' ? 'تم الحل' : leak.status}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Calendar size={14} />
                      <span>تاريخ الاكتشاف</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{new Date(leak.discoveredAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>

              {/* Source URL */}
              <SourceUrlBlock sourceUrl={leak.sourceUrl} />

              {/* Data Types */}
              <DataTypesBlock dataTypes={leak.dataTypes} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4">معلومات إضافية</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">تم الاكتشاف بواسطة</p>
                      <p className="text-sm font-medium text-gray-800">{'النظام'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">القطاع</p>
                      <p className="text-sm font-medium text-gray-800">قطاع #{leak.sectorId}</p>
                    </div>
                  </div>
    
                </div>
              </div>

              {/* Risk Score */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4">تقييم المخاطر</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                      <circle cx="18" cy="18" r="16" fill="none" stroke={leak.severity === 'critical' ? '#ef4444' : leak.severity === 'high' ? '#f97316' : leak.severity === 'medium' ? '#eab308' : '#22c55e'} strokeWidth="3" strokeDasharray={`${(leak.severity === 'critical' ? 95 : leak.severity === 'high' ? 75 : leak.severity === 'medium' ? 50 : 25)} 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">{leak.severity === 'critical' ? '95' : leak.severity === 'high' ? '75' : leak.severity === 'medium' ? '50' : '25'}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">لم يتم العثور على التسريب</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
