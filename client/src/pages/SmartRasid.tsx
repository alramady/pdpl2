import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Bot, Send, Volume2, VolumeX, Save, Download, History, Plus, BarChart3, AlertTriangle, Link2, Shield, Users, Eye, Bell, TrendingUp, UserCircle, Brain, FileText, Crosshair } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const capabilities = [
  { name: "تحليل لوحة القيادة", desc: "إحصائيات وتقارير شاملة", icon: <BarChart3 size={16} /> },
  { name: "البحث في التسريبات", desc: "بحث متقدم بكل الفلاتر", icon: <Shield size={16} /> },
  { name: "حماية البيانات", desc: "نظام PDPL والتوصيات", icon: <Shield size={16} /> },
  { name: "الدارك ويب واللصق", desc: "رصد المصادر المظلمة", icon: <AlertTriangle size={16} /> },
  { name: "البائعون والتهديدات", desc: "ملفات تعريف المهددين", icon: <Users size={16} /> },
  { name: "تحليل الارتباطات", desc: "ربط البيانات واكتشاف الأنماط", icon: <Link2 size={16} /> },
  { name: "مراقبة الأنشطة", desc: "تتبع نشاط الموظفين", icon: <Eye size={16} /> },
  { name: "قاعدة المعرفة", desc: "مقالات وسياسات وإرشادات", icon: <FileText size={16} /> },
  { name: "إدارة الملفات", desc: "جلب التقارير والمستندات", icon: <FileText size={16} /> },
  { name: "رسم المعرفة", desc: "شبكة العلاقات والروابط", icon: <Brain size={16} /> },
  { name: "المراقبة والتنبيهات", desc: "حالة مهام الرصد", icon: <Bell size={16} /> },
  { name: "تحليل الاتجاهات", desc: "أنماط زمنية وتوزيعات", icon: <TrendingUp size={16} /> },
  { name: "صيد التهديدات", desc: "قواعد YARA-like", icon: <Crosshair size={16} /> },
  { name: "سلسلة الأدلة", desc: "توثيق وحفظ الأدلة", icon: <Link2 size={16} /> },
  { name: "الشخصية التفاعلية", desc: "ترحيب ذكي واحترام القادة", icon: <UserCircle size={16} /> }
];

const quickCommands = [
  "ملخص لوحة المعلومات",
  "تسريبات واسعة النطاق",
  "تحليل ارتباطات",
  "حالة الحماية",
  "نشاط المستخدمين",
  "خريطة التهديدات",
  "التقارير والمستندات",
  "قواعد الكشف"
];

const tabs = ["RASID", "تنفيذي", "تحليلات", "مراجعة", "معرفة", "ملفات", "شخصية"];

export default function SmartRasid() {
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const aiChat = trpc.ai.chat.useMutation();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      const result = await aiChat.mutateAsync({ message: text });
      const assistantMsg: ChatMessage = { role: "assistant", content: String(result.response || ""), timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = { role: "assistant", content: "عذراً، حدث خطأ في المعالجة. يرجى المحاولة مرة أخرى.", timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <Layout title="راصد الذكي" titleEn="Smart Rasid">
      {/* Top Bar */}
      <div className="rounded-xl p-3 mb-4 border border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          <button onClick={() => { setMessages([]); }} className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-600 rounded-lg text-xs hover:bg-teal-100 border border-teal-200">
            <Plus size={12} /> NEW_SESSION
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 rounded-lg hover:bg-secondary text-gray-400">
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button className="p-1.5 rounded-lg hover:bg-secondary text-gray-400"><Save size={14} /></button>
          <button className="p-1.5 rounded-lg hover:bg-secondary text-gray-400"><Download size={14} /></button>
          <button className="p-1.5 rounded-lg hover:bg-secondary text-gray-400"><History size={14} /></button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">26 أداة</span>
          <span className="text-xs text-gray-300">|</span>
          <span className="flex items-center gap-1 text-xs text-green-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> ONLINE
          </span>
          <span className="text-[10px] font-mono text-gray-400">SMART_RASID // 26 TOOLS · 7 AGENTS · ACTIVE</span>
          <span className="text-sm font-bold text-teal-600">راصد الذكي</span>
          <span className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded font-mono">v6.0</span>
        </div>
      </div>

      {/* Quick Commands */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {quickCommands.map((cmd) => (
          <button key={cmd} onClick={() => sendMessage(cmd)} className="flex-shrink-0 px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-muted-foreground hover:bg-teal-50 hover:border-teal-300 hover:text-teal-600 transition-colors">
            {cmd}
          </button>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="rounded-xl border border-border overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #0d1420 50%, #0a0f1e 100%)" }}>
        {!hasMessages ? (
          <>
            {/* AI Avatar & Info */}
            <div className="p-10 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-28 h-28 rounded-full border-2 border-teal-500/30 flex items-center justify-center mx-auto relative">
                  <div className="absolute inset-0 rounded-full border border-teal-500/10 animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-900/40 to-cyan-900/40 flex items-center justify-center">
                    <Bot size={44} className="text-teal-400" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#0a0f1e] flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">✓</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">راصد الذكي</h2>
              <p className="text-xs text-gray-500 font-mono mb-2">_ SMART RASID AI ASSISTANT _</p>
              <p className="text-sm text-gray-400 mb-6">كبير محللي حماية البيانات الشخصية — يحلل، يستنتج، يربط، وينفذ</p>
              <div className="flex items-center justify-center gap-1 mb-8">
                {tabs.map((tab, i) => (
                  <span key={tab} className={`text-xs px-3 py-1 rounded-full cursor-pointer transition-colors ${i === 0 ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "text-gray-500 hover:text-gray-300 hover:bg-card/5"}`}>
                    {i === 0 && "→ "}{tab}
                  </span>
                ))}
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {capabilities.map((cap) => (
                    <div key={cap.name} onClick={() => sendMessage(cap.name)} className="p-3 rounded-lg bg-card/[0.03] border border-white/[0.06] hover:border-teal-500/20 hover:bg-teal-500/5 transition-all cursor-pointer text-center group">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-gray-500 group-hover:text-teal-400 transition-colors">{cap.icon}</span>
                      </div>
                      <span className="text-[11px] font-medium text-gray-300 block">{cap.name}</span>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto" dir="rtl">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-teal-400" />
                  </div>
                )}
                <div className={`max-w-[70%] rounded-xl px-4 py-3 ${msg.role === "user" ? "bg-teal-500/20 text-teal-100" : "bg-card/[0.05] text-gray-200"}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{msg.timestamp.toLocaleTimeString("ar-SA")}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-teal-400" />
                </div>
                <div className="bg-card/[0.05] rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 bg-card/[0.03] rounded-lg px-4 py-3 border border-white/[0.06]">
            <span className="text-teal-400 text-sm font-mono">{">_"}</span>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب أمرك هنا..."
              className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 focus:outline-none"
              dir="rtl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim() && !isTyping) {
                  sendMessage(message);
                }
              }}
            />
            <button onClick={() => sendMessage(message)} disabled={!message.trim() || isTyping} className="p-2 rounded-lg bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 transition-colors disabled:opacity-50">
              <Send size={14} />
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-[10px] text-muted-foreground font-mono">Enter ↵ · Shift+Enter ⏎</span>
            <span className="text-[10px] text-muted-foreground font-mono">SMART_RASID v6.0 // 26 TOOLS · 7 AGENTS</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
