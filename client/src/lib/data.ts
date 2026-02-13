// Mock data for the PDPL platform - matching the original site exactly

export const adminUser = {
  name: "Muhammed ALRuhaily",
  userId: "MRUHAILY",
  email: "prog.muhammed@gmail.com",
  mobile: "+966553445533",
  displayName: "Admin Rasid System",
  role: "تنفيذي (مشرف)",
  avatar: "M"
};

export const dashboardStats = {
  totalIncidents: 329,
  newIncidents: 146,
  exposedRecords: "245.2M",
  piiTypes: 54,
  affectedSectors: 36,
  incidentStatus: {
    new: 137,
    underAnalysis: 47,
    documented: 81,
    completed: 48
  }
};

export const monitoringSources = [
  { name: "تليجرام", nameEn: "Telegram", count: 113, percentage: 34, color: "#14b8a6" },
  { name: "دارك ويب", nameEn: "Dark Web", count: 121, percentage: 36, color: "#8b5cf6" },
  { name: "مواقع اللصق", nameEn: "Paste Sites", count: 100, percentage: 30, color: "#f59e0b" }
];

export const affectedSectors = [
  { name: "القطاع الحكومي", percentage: 10, incidents: 34, records: 16264514, icon: "🏛️" },
  { name: "البناء والمشاريع الكبرى", percentage: 5, incidents: 16, records: 15829279, icon: "🏗️" },
  { name: "البنوك والتمويل", percentage: 5, incidents: 16, records: 15458625, icon: "🏦" },
  { name: "التوظيف والموارد البشرية", percentage: 5, incidents: 16, records: 17665225, icon: "👥" },
  { name: "الاتصالات", percentage: 5, incidents: 16, records: 13862199, icon: "📡" },
  { name: "النقل والطيران", percentage: 5, incidents: 16, records: 17301663, icon: "✈️" }
];

export const radarStats = {
  channels: 32,
  activeChannels: 27,
  aiEnrichedLeaks: 233,
  piiDiscovered: 2790228
};

export const piiClassification = [
  { name: "رقم الهاتف", count: 220, color: "#3b82f6" },
  { name: "رقم الهوية الوطنية", count: 197, color: "#2563eb" },
  { name: "البريد الإلكتروني", count: 173, color: "#16a34a" },
  { name: "الاسم الكامل", count: 167, color: "#15803d" },
  { name: "العنوان", count: 95, color: "#7c3aed" },
  { name: "رقم الآيبان", count: 56, color: "#eab308" },
  { name: "بطاقة ائتمان", count: 39, color: "#ef4444" },
  { name: "رقم الجواز", count: 38, color: "#f97316" }
];

export const latestIncidents = [
  {
    id: "LK-2026-0036",
    title: "تسريب بيانات مسافري كريم - 1,472,233 سجل سفر",
    sector: "النقل والطيران",
    records: 1472233,
    source: "موقع لصق",
    date: "٢٧ فبراير",
    severity: "متوسط التأثير",
    piiTags: ["Email", "Travel Route", "Booking Reference", "Phone", "Full Name"]
  },
  {
    id: "LK-2026-0084",
    title: "بيانات عملاء التجارة الإلكترونية من ساكو على Pastebin",
    sector: "التجارة الإلكترونية",
    records: 1036692,
    source: "موقع لصق",
    date: "٢٥ فبراير",
    severity: "محدود التأثير",
    piiTags: ["Order History", "Phone", "Email", "Credit Card"]
  },
  {
    id: "LK-2026-0032",
    title: "تسريب قاعدة بيانات موظفي وزارة الإسكان",
    sector: "القطاع الحكومي",
    records: 1680511,
    source: "موقع لصق",
    date: "٢٣ فبراير",
    severity: "مرتفع التأثير",
    piiTags: ["Address", "Salary", "National ID", "Full Name"]
  },
  {
    id: "LK-2026-0029",
    title: "اختراق السجلات الطبية في مستشفى السعودي الألماني - 1,062,836 ملف مريض",
    sector: "الرعاية الصحية",
    records: 1062836,
    source: "دارك ويب",
    date: "٢٣ فبراير",
    severity: "محدود التأثير",
    piiTags: ["Medical Records", "National ID", "Phone"]
  },
  {
    id: "LK-2026-0025",
    title: "تسريب بيانات مشتركي شركة فيرجن موبايل - 1,016,135 سجل",
    sector: "الاتصالات",
    records: 1016135,
    source: "دارك ويب",
    date: "٢٢ فبراير",
    severity: "محدود التأثير",
    piiTags: ["Phone", "National ID", "Address"]
  },
  {
    id: "LK-2026-0018",
    title: "تسريب بيانات متقدمين من شركة روبرت هاف - 505,489 سيرة ذاتية",
    sector: "التوظيف والموارد البشرية",
    records: 505489,
    source: "دارك ويب",
    date: "١٧ فبراير",
    severity: "محدود التأثير",
    piiTags: ["CV", "Email", "Phone", "Address"]
  }
];

export const monthlyTrend = [
  { month: "2025-09", count: 14 },
  { month: "2025-10", count: 12 },
  { month: "2025-11", count: 21 },
  { month: "2025-12", count: 6 },
  { month: "2026-01", count: 33 },
  { month: "2026-02", count: 107 }
];

export const activityLog = [
  { title: "رصد تسريب: تسريب بيانات مسافري كريم - 1,472,233 سجل سفر", sector: "النقل والطيران", source: "موقع لصق", date: "٢٧ فبراير" },
  { title: "رصد تسريب: بيانات عملاء التجارة الإلكترونية من ساكو على Pastebin", sector: "التجارة الإلكترونية", source: "موقع لصق", date: "٢٥ فبراير" },
  { title: "رصد تسريب: تسريب قاعدة بيانات موظفي وزارة الإسكان", sector: "القطاع الحكومي", source: "موقع لصق", date: "٢٣ فبراير" },
  { title: "رصد تسريب: اختراق السجلات الطبية في مستشفى السعودي الألماني - 1,062,836 ملف مريض", sector: "الرعاية الصحية", source: "دارك ويب", date: "٢٣ فبراير" },
  { title: "رصد تسريب: تسريب بيانات مشتركي شركة فيرجن موبايل - 1,016,135 سجل", sector: "الاتصالات", source: "دارك ويب", date: "٢٢ فبراير" }
];

export const telegramChannels = [
  { id: "CH-TG-011", name: "Gulf_Hackers_Team", status: "نشط", subscribers: 32000, leaks: 42, lastActivity: "١١ فبراير", impact: "عالي" },
  { id: "CH-TG-013", name: "Saudi_InfoStealer_Logs", status: "نشط", subscribers: 4500, leaks: 35, lastActivity: "١٠ فبراير", impact: "عالي" },
  { id: "CH-TG-009", name: "KSA_Data_Market", status: "نشط", subscribers: 18500, leaks: 28, lastActivity: "١٠ فبراير", impact: "عالي" },
  { id: "CH-TG-003", name: "Gulf Hackers الخليج", status: "مُعلَّم", subscribers: 67000, leaks: 24, lastActivity: "٩ فبراير", impact: "عالي" },
  { id: "CH-TG-001", name: "Saudi Leaks تسريبات سعودية", status: "مُعلَّم", subscribers: 45000, leaks: 18, lastActivity: "٩ فبراير", impact: "عالي" },
  { id: "CH-TG-005", name: "Combo Lists KSA", status: "مُعلَّم", subscribers: 32000, leaks: 15, lastActivity: "٩ فبراير", impact: "عالي" },
  { id: "CH-TG-010", name: "Saudi_Leaked_DB", status: "نشط", subscribers: 9200, leaks: 15, lastActivity: "٩ فبراير", impact: "عالي" },
  { id: "CH-TG-014", name: "Arabian_Peninsula_Leaks", status: "نشط", subscribers: 11200, leaks: 22, lastActivity: "٩ فبراير", impact: "عالي" },
  { id: "CH-TG-002", name: "KSA Data Dumps", status: "نشط", subscribers: 28000, leaks: 12, lastActivity: "٨ فبراير", impact: "عالي" },
  { id: "CH-TG-012", name: "KSA_Combo_Lists", status: "نشط", subscribers: 6800, leaks: 19, lastActivity: "٨ فبراير", impact: "متوسط" },
  { id: "CH-TG-015", name: "KSA_Government_Leaks", status: "مُعلَّم", subscribers: 7800, leaks: 8, lastActivity: "٧ فبراير", impact: "عالي" },
  { id: "CH-TG-004", name: "InfoStealer Logs SA", status: "نشط", subscribers: 15000, leaks: 8, lastActivity: "٧ فبراير", impact: "متوسط" },
  { id: "CH-TG-006", name: "Saudi Gov Leaks حكومي", status: "نشط", subscribers: 9500, leaks: 6, lastActivity: "٦ فبراير", impact: "متوسط" },
  { id: "CH-TG-007", name: "Banking Data SA", status: "نشط", subscribers: 11000, leaks: 4, lastActivity: "٥ فبراير", impact: "متوسط" },
  { id: "CH-TG-008", name: "Healthcare Dumps KSA", status: "نشط", subscribers: 7500, leaks: 3, lastActivity: "٤ فبراير", impact: "محدود" }
];

export const darkWebSources = [
  { id: "CH-DW-006", name: "DarkForums_KSA_Section", status: "نشط", leaks: 18, impact: "عالي" },
  { id: "CH-DW-010", name: "LeakBase_Saudi_Collection", status: "نشط", leaks: 21, impact: "عالي" },
  { id: "CH-DW-007", name: "XSS_Forum_Saudi_Thread", status: "نشط", leaks: 12, impact: "عالي" },
  { id: "CH-DW-001", name: "BreachForums — Saudi Section", status: "مُعلَّم", leaks: 22, impact: "عالي" },
  { id: "CH-DW-002", name: "XSS.is — KSA Threads", status: "نشط", leaks: 14, impact: "عالي" },
  { id: "CH-DW-008", name: "Exploit_Forum_KSA", status: "نشط", leaks: 9, impact: "متوسط" },
  { id: "CH-DW-003", name: "Exploit.in — Saudi Market", status: "نشط", leaks: 9, impact: "عالي" },
  { id: "CH-DW-009", name: "RaidForums_Archive_SA", status: "نشط", leaks: 14, impact: "عالي" },
  { id: "CH-DW-005", name: "LeakBase — Saudi Data", status: "نشط", leaks: 5, impact: "متوسط" },
  { id: "CH-DW-004", name: "RaidForums Archive — SA", status: "نشط", leaks: 7, impact: "متوسط" }
];

export const darkWebListings = [
  { title: "قاعدة بيانات عملاء بنوك سعودية — 2.1 مليون سجل", titleEn: "Saudi Banking Customer Database — 2.1M Records", severity: "واسع النطاق", source: "BreachForums", date: "١٠‏/٢‏/٢٠٢٦", price: "$15,000", records: 2100000 },
  { title: "قائمة هوية وطنية + هاتف سعودية — 500 ألف", titleEn: "KSA National ID + Phone Combo List — 500K", severity: "واسع النطاق", source: "XSS Forum", date: "٩‏/٢‏/٢٠٢٦", price: "$8,000", records: 500000 },
  { title: "سجلات مرضى مستشفيات سعودية — 340 ألف", titleEn: "Saudi Hospital Patient Records — 340K", severity: "واسع النطاق", source: "DarkForums", date: "٩‏/٢‏/٢٠٢٦", price: "$12,000", records: 340000 },
  { title: "بيانات اعتماد حسابات أبشر — 180 ألف مستخدم", titleEn: "Absher Account Credentials — 180K Users", severity: "واسع النطاق", source: "Exploit Forum", date: "٧‏/٢‏/٢٠٢٦", price: "$20,000", records: 180000 },
  { title: "سجلات طلاب جامعات سعودية — 95 ألف", titleEn: "Saudi University Student Records — 95K", severity: "عالي", source: "LeakBase", date: "٦‏/٢‏/٢٠٢٦", price: "$3,500", records: 95000 },
  { title: "بيانات مشتركي STC — 1.5 مليون سجل", titleEn: "STC Subscriber Data — 1.5M Records", severity: "واسع النطاق", source: "BreachForums", date: "٥‏/٢‏/٢٠٢٦", price: "$25,000", records: 1500000 },
  { title: "منصة عقارات سعودية — 78 ألف مستخدم", titleEn: "Saudi Real Estate Platform — 78K Users", severity: "عالي", source: "XSS Forum", date: "٤‏/٢‏/٢٠٢٦", price: "$2,800", records: 78000 },
  { title: "سجلات بوابة سداد — 250 ألف معاملة", titleEn: "SADAD Payment Gateway Logs — 250K Transactions", severity: "واسع النطاق", source: "DarkForums", date: "٣‏/٢‏/٢٠٢٦", price: "$18,000", records: 250000 }
];

export const threatMapRegions = [
  { name: "المنطقة الشرقية", leaks: 57, wideScale: 18, high: 14, medium: 15, x: 920, y: 540 },
  { name: "مكة المكرمة", leaks: 49, wideScale: 13, high: 14, medium: 12, x: 740, y: 660 },
  { name: "المدينة المنورة", leaks: 24, wideScale: 5, high: 6, medium: 9, x: 760, y: 540 },
  { name: "حائل", leaks: 18, wideScale: 3, high: 8, medium: 3, x: 840, y: 440 },
  { name: "القصيم", leaks: 17, wideScale: 2, high: 7, medium: 4, x: 870, y: 500 },
  { name: "عسير", leaks: 16, wideScale: 1, high: 3, medium: 6, x: 770, y: 700 },
  { name: "الرياض", leaks: 16, wideScale: 3, high: 2, medium: 3, x: 880, y: 560 },
  { name: "تبوك", leaks: 15, wideScale: 2, high: 5, medium: 2, x: 700, y: 420 },
  { name: "جازان", leaks: 11, wideScale: 4, high: 5, medium: 0, x: 720, y: 740 },
  { name: "نجران", leaks: 10, wideScale: 1, high: 4, medium: 3, x: 810, y: 740 }
];

export const reportsData = {
  stats: {
    published: 15,
    policyGaps: 4,
    activeRecommendations: 12,
    monitoredSectors: 6
  },
  policyGaps: [
    { title: "سياسة حماية البيانات الصحية", titleEn: "Healthcare Data Protection Policy", sector: "صحة", severity: "عاجل", description: "70% من التسريبات المرصودة تتضمن سجلات صحية — لا توجد سياسة قطاعية مخصصة", progress: 25 },
    { title: "معايير تشفير بيانات الاتصالات", titleEn: "Telecom Data Encryption Standards", sector: "اتصالات", severity: "مهم", description: "قطاع الاتصالات الأكثر تسريباً — الحاجة لمعايير تشفير إلزامية", progress: 40 },
    { title: "إطار توثيق الحوادث", titleEn: "Incident Reporting Framework", sector: "عام", severity: "مهم", description: "لا يوجد إطار موحد لتوثيق ورصد تسريبات البيانات الشخصية", progress: 60 },
    { title: "حماية بيانات الإقامة", titleEn: "Iqama Data Protection", sector: "حكومة", severity: "متوسط", description: "تسريبات بيانات الإقامة تتزايد — الحاجة لضوابط إضافية", progress: 15 }
  ],
  generatedReports: [
    { title: "تقرير خاص — مراجعة حماية بيانات الحج 2025", date: "١١‏/٢‏/٢٠٢٦", type: "خاص", pages: 30 },
    { title: "مشهد التهديدات السنوي — الربع الأول 2025", date: "١١‏/٢‏/٢٠٢٦", type: "ربع سنوي", pages: 62 },
    { title: "تقرير المراقبة الشهري — فبراير 2026", date: "١١‏/٢‏/٢٠٢٦", type: "شهري", pages: 0 },
    { title: "تقرير المراقبة الشهري — ديسمبر 2025", date: "١١‏/٢‏/٢٠٢٦", type: "شهري", pages: 25 },
    { title: "تقرير خاص — تحليل اختراق وزارة الخارجية", date: "١١‏/٢‏/٢٠٢٦", type: "خاص", pages: 35 },
    { title: "تقرير خاص — تعرض بيانات مقاولي أرامكو", date: "١١‏/٢‏/٢٠٢٦", type: "خاص", pages: 22 },
    { title: "تقييم الامتثال لنظام حماية البيانات الشخصية — الربع الثاني 2025", date: "١١‏/٢‏/٢٠٢٦", type: "ربع سنوي", pages: 55 },
    { title: "تقرير مشهد تسريبات البيانات السعودية — الربع الرابع 2025", date: "١١‏/٢‏/٢٠٢٦", type: "ربع سنوي", pages: 48 },
    { title: "تقرير المراقبة الشهري — يناير 2026", date: "١١‏/٢‏/٢٠٢٦", type: "شهري", pages: 28 },
    { title: "ملخص استخبارات التهديدات — الربع الثالث 2025", date: "١١‏/٢‏/٢٠٢٦", type: "ربع سنوي", pages: 42 },
    { title: "ملخص استخبارات تهديدات الدارك ويب — الأسبوع الأول فبراير", date: "٨‏/٢‏/٢٠٢٦", type: "خاص", pages: 22 },
    { title: "الإحاطة التنفيذية الشهرية — يناير 2026", date: "١‏/٢‏/٢٠٢٦", type: "شهري", pages: 18 },
    { title: "تقييم أمن الخدمات الرقمية الحكومية", date: "٢٥‏/١‏/٢٠٢٦", type: "خاص", pages: 45 },
    { title: "تقرير اتجاهات اختراقات قطاع الاتصالات 2025", date: "٢٠‏/١‏/٢٠٢٦", type: "خاص", pages: 28 },
    { title: "تحليل فجوات امتثال PDPL — القطاع الصحي الربع الرابع 2025", date: "١٥‏/١‏/٢٠٢٦", type: "ربع سنوي", pages: 38 }
  ]
};

export const sidebarNavigation = {
  command: {
    label: "قيادي",
    labelEn: "Command",
    items: [
      { name: "لوحة القيادة", path: "/", icon: "dashboard" },
      { name: "التقارير", path: "/reports", icon: "reports" },
      { name: "خريطة التهديدات", path: "/threat-map", icon: "map" },
      { name: "راصد الذكي", path: "/smart-rasid", icon: "ai" }
    ]
  },
  operational: {
    label: "تنفيذي",
    labelEn: "Operational",
    items: [
      { name: "التسريبات", path: "/leaks", icon: "leaks" },
      { name: "رصد تليجرام", path: "/telegram", icon: "telegram" },
      { name: "الدارك ويب", path: "/darkweb", icon: "darkweb" },
      { name: "مواقع اللصق", path: "/paste-sites", icon: "paste" },
      { name: "ملفات البائعين", path: "/vendor-files", icon: "vendor" },
      { name: "الرصد المباشر", path: "/live-monitoring", icon: "live" }
    ]
  },
  advanced: {
    label: "متقدم",
    labelEn: "Advanced",
    items: [
      { name: "مصنّف PII", path: "/pii-classifier", icon: "pii" },
      { name: "سلسلة الأدلة", path: "/evidence-chain", icon: "evidence" },
      { name: "قواعد صيد التهديدات", path: "/threat-hunting", icon: "hunting" },
      { name: "أدوات OSINT", path: "/osint-tools", icon: "osint" },
      { name: "رسم المعرفة", path: "/knowledge-graph", icon: "graph" },
      { name: "مقاييس الدقة", path: "/accuracy-metrics", icon: "accuracy" }
    ]
  },
  management: {
    label: "إداري",
    labelEn: "Management",
    items: [
      { name: "مهام الرصد", path: "/monitoring-tasks", icon: "tasks" },
      { name: "قنوات التنبيه", path: "/alert-channels", icon: "alerts" },
      { name: "التقارير المجدولة", path: "/scheduled-reports", icon: "scheduled" },
      { name: "التحقق من التوثيق", path: "/verification", icon: "verify" }
    ]
  }
};
