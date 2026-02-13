import Layout from "@/components/Layout";
import { CheckCircle, FileCheck, AlertTriangle, Clock, Shield, XCircle } from "lucide-react";

const verifications = [
  { incident: "تسريب بيانات مسافري كريم", status: "تم التحقق", date: "٢٧ فبراير", verifier: "محمد الرحيلي", confidence: "عالية", icon: <CheckCircle size={14} className="text-green-500" /> },
  { incident: "بيانات عملاء ساكو على Pastebin", status: "تم التحقق", date: "٢٥ فبراير", verifier: "النظام الآلي", confidence: "عالية", icon: <CheckCircle size={14} className="text-green-500" /> },
  { incident: "تسريب موظفي وزارة الإسكان", status: "قيد التحقق", date: "٢٣ فبراير", verifier: "قيد المراجعة", confidence: "متوسطة", icon: <Clock size={14} className="text-amber-500" /> },
  { incident: "اختراق مستشفى السعودي الألماني", status: "تم التحقق", date: "٢٣ فبراير", verifier: "فريق التحليل", confidence: "عالية", icon: <CheckCircle size={14} className="text-green-500" /> },
  { incident: "تسريب فيرجن موبايل", status: "تم التحقق", date: "٢٢ فبراير", verifier: "النظام الآلي", confidence: "عالية", icon: <CheckCircle size={14} className="text-green-500" /> },
  { incident: "بيانات روبرت هاف", status: "مرفوض", date: "١٧ فبراير", verifier: "محمد الرحيلي", confidence: "منخفضة", icon: <XCircle size={14} className="text-red-500" /> },
];

export default function Verification() {
  return (
    <Layout title="التحقق من التوثيق" titleEn="Documentation Verification">
      <div className="rounded-xl p-6 mb-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">87</div>
              <div className="text-xs text-gray-500">تم التحقق</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">12</div>
              <div className="text-xs text-gray-500">قيد التحقق</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">3</div>
              <div className="text-xs text-gray-500">مرفوض</div>
            </div>
          </div>
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800 dark:text-white">التحقق من التوثيق</h2>
              <p className="text-xs text-gray-400">Incident Documentation & Verification</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
              <FileCheck size={24} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5 overflow-hidden">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-100 dark:border-white/5 text-right">
              <th className="p-3 text-xs text-gray-500 font-medium">الحادثة</th>
              <th className="p-3 text-xs text-gray-500 font-medium">الحالة</th>
              <th className="p-3 text-xs text-gray-500 font-medium">التاريخ</th>
              <th className="p-3 text-xs text-gray-500 font-medium">المحقق</th>
              <th className="p-3 text-xs text-gray-500 font-medium">الثقة</th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((v, i) => (
              <tr key={i} className="border-b border-gray-50 dark:border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-50 dark:bg-white/[0.02]">
                <td className="p-3 text-gray-700 dark:text-gray-200 font-medium">{v.incident}</td>
                <td className="p-3">
                  <span className="flex items-center gap-1 text-xs">
                    {v.icon}
                    <span className={v.status === "تم التحقق" ? "text-green-600 dark:text-green-400" : v.status === "مرفوض" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}>
                      {v.status}
                    </span>
                  </span>
                </td>
                <td className="p-3 text-gray-500">{v.date}</td>
                <td className="p-3 text-gray-500">{v.verifier}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    v.confidence === "عالية" ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400" :
                    v.confidence === "متوسطة" ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                    "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}>
                    {v.confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
