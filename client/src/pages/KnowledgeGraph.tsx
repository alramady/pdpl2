import Layout from "@/components/Layout";
import { Network, Zap, GitBranch, Database } from "lucide-react";

const nodes = [
  { name: "Gulf_Hackers_Team", type: "مجموعة", connections: 12 },
  { name: "KSA_Data_Market", type: "سوق", connections: 8 },
  { name: "BreachForums", type: "منتدى", connections: 15 },
  { name: "بيانات حكومية", type: "بيانات", connections: 22 },
  { name: "بيانات بنكية", type: "بيانات", connections: 18 },
  { name: "InfoStealer Logs", type: "أداة", connections: 10 },
];

export default function KnowledgeGraph() {
  return (
    <Layout title="رسم المعرفة" titleEn="Knowledge Graph">
      <div className="rounded-xl p-6 mb-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-800 dark:text-white">رسم المعرفة</h2>
              <p className="text-xs text-gray-400">Knowledge Graph & Entity Relationships</p>
              <p className="text-sm text-gray-500 mt-1">خريطة العلاقات بين الجهات المهددة والتسريبات والبيانات</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20">
              <Network size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl p-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">156</div>
          <div className="text-sm text-gray-500">عقد مرصودة</div>
        </div>
        <div className="rounded-xl p-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">342</div>
          <div className="text-sm text-gray-500">علاقة مكتشفة</div>
        </div>
        <div className="rounded-xl p-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">8</div>
          <div className="text-sm text-gray-500">مجموعات رئيسية</div>
        </div>
      </div>

      {/* Graph Visualization Placeholder */}
      <div className="rounded-xl p-8 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5 mb-6">
        <div className="relative h-80 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {nodes.map((node, i) => {
              const angle = (i / nodes.length) * 2 * Math.PI;
              const radius = 120;
              const x = 50 + Math.cos(angle) * (radius / 3.5);
              const y = 50 + Math.sin(angle) * (radius / 3.5);
              return (
                <div key={node.name} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-200 dark:border-white/10 text-center hover:border-teal-300 dark:hover:border-teal-500/30 transition-all cursor-pointer">
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">{node.name}</div>
                    <div className="text-[10px] text-gray-400">{node.type} · {node.connections} علاقة</div>
                  </div>
                </div>
              );
            })}
            <div className="p-4 rounded-full bg-teal-50 dark:bg-teal-500/10 border-2 border-teal-300 dark:border-teal-500/30">
              <Network size={32} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Entity List */}
      <div className="rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-100 dark:border-white/5">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-800 dark:text-white text-right">العقد الرئيسية</h3>
        </div>
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-50 dark:bg-white/[0.02] cursor-pointer">
            <span className="text-xs text-gray-400">{node.connections} علاقة</span>
            <div className="flex items-center gap-3">
              <div>
                <span className="text-sm text-gray-700 dark:text-gray-200">{node.name}</span>
                <span className="text-xs text-gray-400 mr-2">{node.type}</span>
              </div>
              <GitBranch size={14} className="text-purple-500" />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
