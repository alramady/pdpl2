import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const conn = await mysql.createConnection(DATABASE_URL);

// Helper
const q = (sql, params) => conn.execute(sql, params);

// Clear existing data
await q('DELETE FROM dashboard_stats');
await q('DELETE FROM evidence_chain');
await q('DELETE FROM threat_rules');
await q('DELETE FROM alert_channels');
await q('DELETE FROM monitoring_tasks');
await q('DELETE FROM paste_monitors');
await q('DELETE FROM darkweb_monitors');
await q('DELETE FROM telegram_monitors');
await q('DELETE FROM reports');
await q('DELETE FROM leaks');
await q('DELETE FROM incidents');
await q('DELETE FROM pii_types');
await q('DELETE FROM sectors');

console.log('Cleared existing data');

// ===== SECTORS =====
const sectorsData = [
  ['القطاع الحكومي', 'Government', 'Building2', '#ef4444', 54, 16],
  ['القطاع المالي', 'Financial', 'Landmark', '#f59e0b', 42, 13],
  ['قطاع الاتصالات', 'Telecommunications', 'Wifi', '#3b82f6', 38, 12],
  ['قطاع الصحة', 'Healthcare', 'Heart', '#10b981', 35, 11],
  ['قطاع التعليم', 'Education', 'GraduationCap', '#8b5cf6', 28, 9],
  ['قطاع التجزئة', 'Retail', 'ShoppingCart', '#ec4899', 24, 7],
  ['قطاع الطاقة', 'Energy', 'Zap', '#f97316', 21, 6],
  ['قطاع النقل', 'Transportation', 'Truck', '#06b6d4', 18, 5],
  ['قطاع البناء', 'Construction', 'HardHat', '#84cc16', 15, 5],
  ['قطاع التقنية', 'Technology', 'Cpu', '#6366f1', 13, 4],
  ['الضيافة والسياحة', 'Hospitality', 'Hotel', '#d946ef', 11, 3],
  ['التوظيف والموارد البشرية', 'HR & Recruitment', 'Users', '#14b8a6', 10, 3],
  ['قطاع التأمين', 'Insurance', 'Shield', '#f43f5e', 8, 2],
  ['قطاع الإعلام', 'Media', 'Tv', '#a855f7', 6, 2],
  ['القطاع العقاري', 'Real Estate', 'Home', '#22c55e', 4, 1],
  ['قطاع الزراعة', 'Agriculture', 'Leaf', '#65a30d', 2, 1],
];

for (const [nameAr, nameEn, icon, color, count, pct] of sectorsData) {
  await q('INSERT INTO sectors (nameAr, nameEn, icon, color, incidentCount, percentage) VALUES (?,?,?,?,?,?)',
    [nameAr, nameEn, icon, color, count, pct]);
}
console.log('Seeded sectors');

// ===== PII TYPES =====
const piiData = [
  ['رقم الهاتف', 'Phone Number', 'contact', 220, '#3b82f6'],
  ['رقم الهوية الوطنية', 'National ID', 'identity', 197, '#ef4444'],
  ['البريد الإلكتروني', 'Email', 'contact', 171, '#f59e0b'],
  ['العنوان', 'Address', 'contact', 145, '#10b981'],
  ['الاسم الكامل', 'Full Name', 'identity', 138, '#8b5cf6'],
  ['رقم الحساب البنكي', 'Bank Account', 'financial', 112, '#ec4899'],
  ['رقم بطاقة الائتمان', 'Credit Card', 'financial', 98, '#f97316'],
  ['تاريخ الميلاد', 'Date of Birth', 'identity', 87, '#06b6d4'],
  ['رقم جواز السفر', 'Passport Number', 'identity', 76, '#84cc16'],
  ['السجل الطبي', 'Medical Record', 'health', 65, '#6366f1'],
  ['رقم الضمان الاجتماعي', 'Social Security', 'identity', 54, '#d946ef'],
  ['بصمة الإصبع', 'Fingerprint', 'biometric', 43, '#14b8a6'],
  ['صورة شخصية', 'Personal Photo', 'biometric', 38, '#f43f5e'],
  ['رقم رخصة القيادة', 'Driving License', 'identity', 35, '#a855f7'],
  ['معلومات الراتب', 'Salary Info', 'financial', 32, '#22c55e'],
  ['رقم الموظف', 'Employee ID', 'identity', 28, '#65a30d'],
  ['IP Address', 'IP Address', 'technical', 25, '#0ea5e9'],
  ['بيانات الموقع', 'Location Data', 'technical', 22, '#e11d48'],
  ['رقم التأمين', 'Insurance Number', 'financial', 19, '#7c3aed'],
  ['بيانات بيومترية', 'Biometric Data', 'biometric', 16, '#059669'],
  ['سجل جنائي', 'Criminal Record', 'legal', 14, '#dc2626'],
  ['معلومات التوظيف', 'Employment Info', 'identity', 12, '#2563eb'],
  ['رقم السجل التجاري', 'Commercial Reg', 'financial', 10, '#ca8a04'],
  ['بيانات الأطفال', 'Children Data', 'sensitive', 8, '#be185d'],
  ['معلومات دينية', 'Religious Info', 'sensitive', 6, '#4f46e5'],
  ['بيانات صحية', 'Health Data', 'health', 55, '#0d9488'],
  ['رقم IBAN', 'IBAN', 'financial', 42, '#c026d3'],
  ['كلمات المرور', 'Passwords', 'technical', 37, '#ea580c'],
  ['رقم الوثيقة', 'Document Number', 'identity', 29, '#4338ca'],
  ['معلومات عائلية', 'Family Info', 'sensitive', 18, '#15803d'],
  ['بيانات تعليمية', 'Education Data', 'identity', 15, '#b91c1c'],
  ['سجل السفر', 'Travel Record', 'identity', 11, '#0369a1'],
  ['بيانات وظيفية', 'Job Data', 'identity', 9, '#a16207'],
  ['معلومات قانونية', 'Legal Info', 'legal', 7, '#86198f'],
];

for (const [nameAr, nameEn, cat, count, color] of piiData) {
  await q('INSERT INTO pii_types (nameAr, nameEn, category, count, color) VALUES (?,?,?,?,?)',
    [nameAr, nameEn, cat, count, color]);
}
console.log('Seeded PII types');

// ===== INCIDENTS =====
const severities = ['critical', 'high', 'medium', 'low'];
const statuses = ['new', 'analyzing', 'documented', 'completed'];
const sources = ['telegram', 'darkweb', 'paste_sites', 'vendor_files', 'other'];
const entities = [
  'وزارة الداخلية', 'وزارة الصحة', 'وزارة التعليم', 'البنك الأهلي', 'بنك الراجحي',
  'STC', 'موبايلي', 'زين', 'أرامكو', 'سابك', 'الخطوط السعودية', 'جامعة الملك سعود',
  'جامعة الملك عبدالعزيز', 'مستشفى الملك فيصل', 'وزارة المالية', 'هيئة الزكاة والضريبة',
  'المؤسسة العامة للتأمينات', 'وزارة العدل', 'وزارة التجارة', 'الهيئة العامة للإحصاء',
  'شركة الكهرباء', 'شركة المياه الوطنية', 'بنك الإنماء', 'بنك البلاد', 'بنك الجزيرة',
  'مجموعة بن داود', 'شركة جرير', 'إكسترا', 'نون', 'أمازون السعودية',
  'وزارة الموارد البشرية', 'هيئة الاتصالات', 'الهيئة الوطنية للأمن السيبراني',
  'مكتب إدارة البيانات الوطنية', 'وزارة الاقتصاد', 'هيئة السوق المالية',
];

const incidentTitles = [
  'تسريب بيانات عملاء من قاعدة بيانات',
  'اكتشاف بيانات شخصية على منتدى دارك ويب',
  'تسريب أرقام هوية وطنية عبر تليجرام',
  'بيع بيانات موظفين على الدارك ويب',
  'تسريب سجلات طبية لمرضى',
  'اكتشاف بيانات بطاقات ائتمان مسربة',
  'تسريب قاعدة بيانات بريد إلكتروني',
  'نشر بيانات طلاب جامعيين',
  'تسريب معلومات رواتب موظفين',
  'اكتشاف بيانات جوازات سفر مسربة',
  'تسريب أرقام حسابات بنكية',
  'نشر بيانات عقود حكومية',
  'تسريب معلومات تأمين صحي',
  'اكتشاف بيانات عملاء اتصالات',
  'تسريب سجلات قضائية',
  'نشر بيانات رخص قيادة',
  'تسريب معلومات ضريبية',
  'اكتشاف بيانات بيومترية مسربة',
  'تسريب قوائم عملاء VIP',
  'نشر بيانات موظفي شركة',
];

for (let i = 0; i < 329; i++) {
  const title = incidentTitles[i % incidentTitles.length] + ` #${i + 1}`;
  const entity = entities[i % entities.length];
  const desc = `تم رصد ${title} متعلقة بـ ${entity}. يتضمن التسريب بيانات شخصية حساسة تشمل أرقام هوية وبيانات اتصال.`;
  const sev = severities[i % 4];
  const stat = statuses[i % 4];
  const src = sources[i % 5];
  const sectorId = (i % 16) + 1;
  const affected = Math.floor(Math.random() * 50000) + 100;
  const daysAgo = Math.floor(Math.random() * 180);
  const dateStr = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 19).replace('T', ' ');
  
  await q(
    'INSERT INTO incidents (title, description, severity, status, source, sectorId, affectedRecords, dataTypes, discoveredAt, assignedTo) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [title, desc, sev, stat, src, sectorId, affected, JSON.stringify(['phone', 'national_id', 'email']), dateStr, 'فريق الاستجابة']
  );
}
console.log('Seeded 329 incidents');

// ===== LEAKS =====
const leakTitles = [
  'تسريب قاعدة بيانات عملاء', 'بيع بيانات على الدارك ويب', 'نشر بيانات على تليجرام',
  'تسريب ملفات حساسة', 'اكتشاف بيانات على Pastebin', 'تسريب بيانات موظفين',
  'نشر أرقام هوية وطنية', 'تسريب بيانات مالية', 'اكتشاف بيانات صحية مسربة',
  'تسريب بيانات تعليمية', 'نشر بيانات اتصال', 'تسريب سجلات حكومية',
];

for (let i = 0; i < 334; i++) {
  const title = leakTitles[i % leakTitles.length] + ` - ${entities[i % entities.length]}`;
  const desc = `تفاصيل التسريب: تم اكتشاف بيانات شخصية مسربة تتعلق بـ ${entities[i % entities.length]}. البيانات تشمل معلومات حساسة.`;
  const src = ['telegram', 'darkweb', 'paste_sites', 'vendor', 'other'][i % 5];
  const sev = severities[i % 4];
  const stat = ['new', 'investigating', 'confirmed', 'resolved', 'false_positive'][i % 5];
  const sectorId = (i % 16) + 1;
  const dataCount = Math.floor(Math.random() * 100000) + 50;
  const daysAgo = Math.floor(Math.random() * 180);
  const dateStr = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 19).replace('T', ' ');

  await q(
    'INSERT INTO leaks (title, description, source, severity, status, sectorId, affectedEntity, dataCount, dataTypes, discoveredAt) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [title, desc, src, sev, stat, sectorId, entities[i % entities.length], dataCount, JSON.stringify(['phone', 'email', 'national_id']), dateStr]
  );
}
console.log('Seeded 334 leaks');

// ===== TELEGRAM MONITORS =====
const channels = [
  'قناة تسريبات السعودية', 'Dark Leaks SA', 'بيانات مسربة', 'Saudi Data Dumps',
  'تسريبات حكومية', 'Financial Leaks KSA', 'Health Data Leaks', 'قناة الهاكرز العرب',
  'Cyber Threats SA', 'Data Breach Alerts', 'تسريبات البنوك', 'قناة الأمن السيبراني',
];

for (let i = 0; i < 113; i++) {
  const ch = channels[i % channels.length];
  const msg = `تم نشر بيانات جديدة تتضمن ${Math.floor(Math.random() * 10000)} سجل شخصي من ${entities[i % entities.length]}`;
  const threat = ['critical', 'high', 'medium', 'low'][i % 4];
  const daysAgo = Math.floor(Math.random() * 90);
  const dateStr = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 19).replace('T', ' ');

  await q(
    'INSERT INTO telegram_monitors (channelName, messageContent, messageDate, threatLevel, hasPersonalData, dataTypes, status) VALUES (?,?,?,?,?,?,?)',
    [ch, msg, dateStr, threat, true, JSON.stringify(['phone', 'national_id']), ['new', 'reviewed', 'escalated', 'dismissed'][i % 4]]
  );
}
console.log('Seeded 113 telegram monitors');

// ===== DARK WEB MONITORS =====
const darkSites = [
  'BreachForums', 'RaidForums Archive', 'DarkMarket', 'Hydra Market',
  'XSS.is', 'Exploit.in', 'Nulled.to', 'LeakBase', 'Cracked.io',
];

for (let i = 0; i < 121; i++) {
  const site = darkSites[i % darkSites.length];
  const postTitle = `بيع بيانات ${entities[i % entities.length]} - ${Math.floor(Math.random() * 50000)} سجل`;
  const content = `عرض لبيع بيانات شخصية تشمل أرقام هوية وبيانات مالية من ${entities[i % entities.length]}`;
  const threat = ['critical', 'high', 'medium', 'low'][i % 4];
  const daysAgo = Math.floor(Math.random() * 120);
  const dateStr = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 19).replace('T', ' ');

  await q(
    'INSERT INTO darkweb_monitors (siteName, postTitle, postContent, threatLevel, dataTypes, affectedEntity, discoveredAt, status) VALUES (?,?,?,?,?,?,?,?)',
    [site, postTitle, content, threat, JSON.stringify(['national_id', 'bank_account']), entities[i % entities.length], dateStr, ['new', 'reviewed', 'escalated', 'dismissed'][i % 4]]
  );
}
console.log('Seeded 121 darkweb monitors');

// ===== PASTE MONITORS =====
for (let i = 0; i < 100; i++) {
  const sites = ['Pastebin', 'GitHub Gist', 'Ghostbin', 'PrivateBin', 'JustPaste.it'];
  const site = sites[i % sites.length];
  const title = `تسريب بيانات ${entities[i % entities.length]}`;
  const content = `محتوى يتضمن بيانات شخصية مسربة: أرقام هوية، أرقام هاتف، عناوين بريد إلكتروني`;
  const threat = ['critical', 'high', 'medium', 'low'][i % 4];
  const daysAgo = Math.floor(Math.random() * 90);
  const dateStr = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 19).replace('T', ' ');

  await q(
    'INSERT INTO paste_monitors (siteName, pasteTitle, pasteContent, threatLevel, hasPersonalData, dataTypes, discoveredAt, status) VALUES (?,?,?,?,?,?,?,?)',
    [site, title, content, threat, true, JSON.stringify(['email', 'phone']), dateStr, ['new', 'reviewed', 'escalated', 'dismissed'][i % 4]]
  );
}
console.log('Seeded 100 paste monitors');

// ===== REPORTS =====
const reportTypes = ['daily', 'weekly', 'monthly', 'incident', 'custom'];
for (let i = 0; i < 50; i++) {
  const type = reportTypes[i % 5];
  const title = type === 'daily' ? `تقرير يومي - ${new Date(Date.now() - i * 86400000).toLocaleDateString('ar-SA')}` :
    type === 'weekly' ? `تقرير أسبوعي - الأسبوع ${Math.ceil((i + 1) / 7)}` :
    type === 'monthly' ? `تقرير شهري - ${['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'][i % 6]} 2026` :
    type === 'incident' ? `تقرير حادثة - ${entities[i % entities.length]}` :
    `تقرير مخصص #${i + 1}`;
  const summary = `ملخص التقرير: تم رصد ${Math.floor(Math.random() * 50)} حادثة جديدة و ${Math.floor(Math.random() * 30)} تسريب خلال الفترة.`;
  const content = `${summary}\n\nالتفاصيل:\n- عدد الحوادث الجديدة: ${Math.floor(Math.random() * 50)}\n- عدد التسريبات المكتشفة: ${Math.floor(Math.random() * 30)}\n- القطاعات المتأثرة: ${Math.floor(Math.random() * 10)}\n- أنواع البيانات المسربة: ${Math.floor(Math.random() * 15)}`;

  await q(
    'INSERT INTO reports (title, type, content, summary, status, incidentCount, leakCount, createdBy) VALUES (?,?,?,?,?,?,?,?)',
    [title, type, content, summary, ['draft', 'published', 'archived'][i % 3], Math.floor(Math.random() * 50), Math.floor(Math.random() * 30), 'Admin Rasid System']
  );
}
console.log('Seeded 50 reports');

// ===== THREAT RULES =====
const rules = [
  ['كشف أرقام الهوية الوطنية', 'قاعدة للكشف عن أرقام الهوية الوطنية السعودية', 'regex', '\\b[12]\\d{9}\\b'],
  ['كشف أرقام الهاتف', 'قاعدة للكشف عن أرقام الهاتف السعودية', 'regex', '\\b05\\d{8}\\b'],
  ['كشف البريد الإلكتروني', 'قاعدة للكشف عن عناوين البريد الإلكتروني', 'regex', '[\\w.-]+@[\\w.-]+\\.\\w+'],
  ['كشف أرقام IBAN', 'قاعدة للكشف عن أرقام IBAN السعودية', 'regex', '\\bSA\\d{22}\\b'],
  ['كشف بطاقات الائتمان', 'قاعدة للكشف عن أرقام بطاقات الائتمان', 'regex', '\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b'],
  ['كشف جوازات السفر', 'قاعدة للكشف عن أرقام جوازات السفر', 'regex', '\\b[A-Z]\\d{8}\\b'],
  ['كشف عناوين IP', 'قاعدة للكشف عن عناوين IP', 'regex', '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'],
  ['كشف كلمات المرور', 'قاعدة للكشف عن تسريب كلمات المرور', 'keyword', 'password|passwd|pass'],
  ['كشف بيانات طبية', 'قاعدة للكشف عن السجلات الطبية', 'keyword', 'medical|diagnosis|prescription'],
  ['كشف بيانات مالية', 'قاعدة للكشف عن البيانات المالية', 'keyword', 'salary|bank|account|credit'],
];

for (const [name, desc, type, pattern] of rules) {
  await q(
    'INSERT INTO threat_rules (name, description, ruleType, pattern, severity, isActive, matchCount) VALUES (?,?,?,?,?,?,?)',
    [name, desc, type, pattern, severities[Math.floor(Math.random() * 4)], true, Math.floor(Math.random() * 500)]
  );
}
console.log('Seeded threat rules');

// ===== ALERT CHANNELS =====
const alertData = [
  ['بريد الطوارئ', 'email', true],
  ['SMS تنبيهات', 'sms', true],
  ['قناة تليجرام الداخلية', 'telegram', true],
  ['Webhook الأمن السيبراني', 'webhook', true],
  ['Slack فريق الاستجابة', 'slack', false],
];

for (const [name, type, active] of alertData) {
  await q(
    'INSERT INTO alert_channels (name, type, isActive) VALUES (?,?,?)',
    [name, type, active]
  );
}
console.log('Seeded alert channels');

// ===== MONITORING TASKS =====
const tasks = [
  ['رصد تليجرام - القنوات الرئيسية', 'مراقبة القنوات الرئيسية على تليجرام', 'telegram', 'كل 15 دقيقة', 'active'],
  ['رصد الدارك ويب - المنتديات', 'مراقبة منتديات الدارك ويب', 'darkweb', 'كل ساعة', 'active'],
  ['رصد مواقع اللصق', 'مراقبة مواقع اللصق الشائعة', 'paste', 'كل 30 دقيقة', 'active'],
  ['فحص ملفات البائعين', 'فحص الملفات المشتركة مع البائعين', 'vendor', 'يومياً', 'active'],
  ['تحليل البيانات المسربة', 'تحليل تلقائي للبيانات المكتشفة', 'analysis', 'عند الاكتشاف', 'active'],
  ['تصنيف PII تلقائي', 'تصنيف البيانات الشخصية تلقائياً', 'classifier', 'مستمر', 'active'],
  ['توليد التقارير الأسبوعية', 'إنشاء تقارير أسبوعية تلقائية', 'report', 'أسبوعياً', 'active'],
  ['فحص الامتثال', 'فحص الامتثال لنظام حماية البيانات', 'compliance', 'شهرياً', 'paused'],
];

for (const [name, desc, type, schedule, status] of tasks) {
  await q(
    'INSERT INTO monitoring_tasks (name, description, type, schedule, status, resultCount) VALUES (?,?,?,?,?,?)',
    [name, desc, type, schedule, status, Math.floor(Math.random() * 1000)]
  );
}
console.log('Seeded monitoring tasks');

// ===== EVIDENCE CHAIN =====
for (let i = 0; i < 80; i++) {
  const title = `دليل #${i + 1} - ${entities[i % entities.length]}`;
  const desc = `تم جمع هذا الدليل من مصدر ${sources[i % 5]} ويتعلق بحادثة تسريب بيانات`;
  const types = ['screenshot', 'file', 'log', 'network_capture', 'database_dump'];
  const hash = Array.from({length: 64}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
  const daysAgo = Math.floor(Math.random() * 90);
  const dateStr = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 19).replace('T', ' ');

  await q(
    'INSERT INTO evidence_chain (incidentId, title, description, evidenceType, hash, collectedAt, collectedBy, verified) VALUES (?,?,?,?,?,?,?,?)',
    [(i % 329) + 1, title, desc, types[i % 5], hash, dateStr, 'فريق التحقيق', i % 3 === 0]
  );
}
console.log('Seeded evidence chain');

// ===== DASHBOARD STATS =====
const stats = [
  ['totalIncidents', 329],
  ['totalLeaks', 334],
  ['totalPiiTypes', 54],
  ['totalSectors', 36],
  ['exposedRecords', 245200000],
  ['newIncidents', 137],
  ['analyzingIncidents', 47],
  ['documentedIncidents', 81],
  ['completedIncidents', 48],
  ['telegramSources', 113],
  ['darkwebSources', 121],
  ['pasteSources', 100],
  ['notifications', 56],
];

for (const [key, val] of stats) {
  await q('INSERT INTO dashboard_stats (statKey, statValue) VALUES (?,?)', [key, val]);
}
console.log('Seeded dashboard stats');

await conn.end();
console.log('Database seeding complete!');
