import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { GitBranch, Search, X, Database, Users, Building2, Network } from "lucide-react";

interface GraphNode { id: string; label: string; type: string; x: number; y: number; }
interface GraphEdge { from: string; to: string; label: string; }

export default function KnowledgeGraph() {
  const { data: incidents } = trpc.incidents.list.useQuery({ limit: 20 });
  const { data: leaks } = trpc.leaks.list.useQuery({ limit: 20 });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { nodes, edges } = useMemo(() => {
    const n: GraphNode[] = [];
    const e: GraphEdge[] = [];
    const sectors = new Set<string>();
    const sources = new Set<string>();

    n.push({ id: "center", label: "PDPL", type: "center", x: 400, y: 300 });

    incidents?.items?.forEach((inc: any, i: number) => {
      if (inc.sector && !sectors.has(inc.sector)) {
        sectors.add(inc.sector);
        const angle = (sectors.size / 8) * Math.PI * 2;
        n.push({ id: `sector-${inc.sector}`, label: inc.sector, type: "sector", x: 400 + Math.cos(angle) * 200, y: 300 + Math.sin(angle) * 200 });
        e.push({ from: "center", to: `sector-${inc.sector}`, label: "قطاع" });
      }
      if (i < 10) {
        const angle = (i / 10) * Math.PI * 2;
        n.push({ id: `inc-${inc.id}`, label: inc.title?.substring(0, 20) || `حادثة ${inc.id}`, type: "incident", x: 400 + Math.cos(angle) * 120, y: 300 + Math.sin(angle) * 120 });
        if (inc.sector) e.push({ from: `sector-${inc.sector}`, to: `inc-${inc.id}`, label: "حادثة" });
      }
    });

    leaks?.items?.forEach((leak: any) => {
      if (leak.source && !sources.has(leak.source)) {
        sources.add(leak.source);
        const angle = (sources.size / 6) * Math.PI * 2 + Math.PI / 4;
        n.push({ id: `source-${leak.source}`, label: leak.source, type: "source", x: 400 + Math.cos(angle) * 250, y: 300 + Math.sin(angle) * 250 });
        e.push({ from: "center", to: `source-${leak.source}`, label: "مصدر" });
      }
    });

    return { nodes: n, edges: e };
  }, [incidents, leaks]);

  const filteredNodes = searchQuery ? nodes.filter(n => n.label.includes(searchQuery)) : nodes;
  const typeColors: Record<string, string> = { center: "#0d9488", sector: "#6366f1", incident: "#ef4444", source: "#f59e0b" };
  const typeLabels: Record<string, string> = { center: "المركز", sector: "قطاع", incident: "حادثة", source: "مصدر" };

  return (
    <Layout title="رسم المعرفة" titleEn="Knowledge Graph">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "العقد", value: nodes.length, icon: <GitBranch size={20} className="text-teal-600" />, bg: "bg-teal-50" },
          { label: "الروابط", value: edges.length, icon: <Database size={20} className="text-blue-600" />, bg: "bg-blue-50" },
          { label: "القطاعات", value: nodes.filter(n => n.type === "sector").length, icon: <Building2 size={20} className="text-indigo-600" />, bg: "bg-indigo-50" },
          { label: "المصادر", value: nodes.filter(n => n.type === "source").length, icon: <Users size={20} className="text-amber-600" />, bg: "bg-amber-50" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right"><div className="text-2xl font-bold text-foreground">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
              <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border mb-4 p-4">
        <div className="flex items-center gap-3">
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="بحث في العقد..."
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-secondary text-sm text-foreground placeholder-gray-400 focus:outline-none focus:border-teal-300" />
          <Search size={18} className="text-muted-foreground" />
        </div>
        <div className="flex items-center gap-4 mt-3">
          {Object.entries(typeLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors[key] }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 relative" style={{ height: 500 }}>
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          {edges.map((edge, i) => {
            const from = nodes.find(n => n.id === edge.from);
            const to = nodes.find(n => n.id === edge.to);
            if (!from || !to) return null;
            return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#e5e7eb" strokeWidth={1} />;
          })}
          {filteredNodes.map(node => (
            <g key={node.id} onClick={() => setSelectedNode(node)} className="cursor-pointer">
              <circle cx={node.x} cy={node.y} r={node.type === "center" ? 30 : 18} fill={typeColors[node.type] || "#6b7280"} opacity={0.85} />
              <text x={node.x} y={node.y + (node.type === "center" ? 45 : 30)} textAnchor="middle" fontSize={node.type === "center" ? 12 : 9} fill="#374151">{node.label}</text>
            </g>
          ))}
        </svg>
      </div>

      {selectedNode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedNode(null)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md p-6" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedNode(null)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><X size={18} /></button>
              <h3 className="text-lg font-bold text-foreground">تفاصيل العقدة</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الاسم</span><span className="text-sm font-medium">{selectedNode.label}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">النوع</span><span className="text-sm font-medium">{typeLabels[selectedNode.type]}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">الروابط</span><span className="text-sm font-medium">{edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length}</span></div>
              <div className="pt-2 border-t border-border">
                <h4 className="text-xs font-semibold text-foreground mb-2">العقد المتصلة</h4>
                <div className="space-y-1">
                  {edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).slice(0, 5).map((e, i) => {
                    const connectedId = e.from === selectedNode.id ? e.to : e.from;
                    const connected = nodes.find(n => n.id === connectedId);
                    return connected ? (
                      <div key={i} className="flex items-center justify-between text-xs bg-secondary rounded-lg px-3 py-2">
                        <span className="text-muted-foreground">{e.label}</span>
                        <span className="text-foreground">{connected.label}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
