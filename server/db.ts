import { eq, desc, sql, and, like, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, sectors, piiTypes, incidents, leaks, telegramMonitors, darkwebMonitors, pasteMonitors, reports, threatRules, alertChannels, monitoringTasks, evidenceChain, dashboardStats } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; } else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ===== DASHBOARD =====
export async function getDashboardStats() {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(dashboardStats);
  const statsMap: Record<string, number> = {};
  for (const row of rows) statsMap[row.statKey] = row.statValue;
  return statsMap;
}

// ===== SECTORS =====
export async function getAllSectors() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sectors).orderBy(desc(sectors.incidentCount));
}

export async function getSectorById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(sectors).where(eq(sectors.id, id)).limit(1);
  return rows[0] || null;
}

// ===== PII TYPES =====
export async function getAllPiiTypes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(piiTypes).orderBy(desc(piiTypes.count));
}

export async function getPiiTypeById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(piiTypes).where(eq(piiTypes.id, id)).limit(1);
  return rows[0] || null;
}

// ===== INCIDENTS =====
export async function getIncidents(opts: { limit?: number; offset?: number; severity?: string; status?: string; source?: string; sectorId?: number } = {}) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (opts.severity) conditions.push(eq(incidents.severity, opts.severity as any));
  if (opts.status) conditions.push(eq(incidents.status, opts.status as any));
  if (opts.source) conditions.push(eq(incidents.source, opts.source as any));
  if (opts.sectorId) conditions.push(eq(incidents.sectorId, opts.sectorId));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const [items, totalResult] = await Promise.all([
    db.select().from(incidents).where(where).orderBy(desc(incidents.discoveredAt)).limit(opts.limit || 50).offset(opts.offset || 0),
    db.select({ count: count() }).from(incidents).where(where),
  ]);
  return { items, total: totalResult[0]?.count || 0 };
}

export async function getIncidentById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(incidents).where(eq(incidents.id, id)).limit(1);
  return rows[0] || null;
}

export async function getIncidentStatusCounts() {
  const db = await getDb();
  if (!db) return { new: 0, analyzing: 0, documented: 0, completed: 0 };
  const rows = await db.select({ status: incidents.status, count: count() }).from(incidents).groupBy(incidents.status);
  const result: Record<string, number> = { new: 0, analyzing: 0, documented: 0, completed: 0 };
  for (const row of rows) result[row.status] = row.count;
  return result;
}

// ===== LEAKS =====
export async function getLeaks(opts: { limit?: number; offset?: number; severity?: string; status?: string; source?: string; sectorId?: number; search?: string } = {}) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (opts.severity) conditions.push(eq(leaks.severity, opts.severity as any));
  if (opts.status) conditions.push(eq(leaks.status, opts.status as any));
  if (opts.source) conditions.push(eq(leaks.source, opts.source as any));
  if (opts.sectorId) conditions.push(eq(leaks.sectorId, opts.sectorId));
  if (opts.search) conditions.push(like(leaks.title, `%${opts.search}%`));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const [items, totalResult] = await Promise.all([
    db.select().from(leaks).where(where).orderBy(desc(leaks.discoveredAt)).limit(opts.limit || 50).offset(opts.offset || 0),
    db.select({ count: count() }).from(leaks).where(where),
  ]);
  return { items, total: totalResult[0]?.count || 0 };
}

export async function getLeakById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(leaks).where(eq(leaks.id, id)).limit(1);
  return rows[0] || null;
}

// ===== TELEGRAM =====
export async function getTelegramMonitors(opts: { limit?: number; offset?: number; threatLevel?: string; status?: string } = {}) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (opts.threatLevel) conditions.push(eq(telegramMonitors.threatLevel, opts.threatLevel as any));
  if (opts.status) conditions.push(eq(telegramMonitors.status, opts.status as any));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const [items, totalResult] = await Promise.all([
    db.select().from(telegramMonitors).where(where).orderBy(desc(telegramMonitors.createdAt)).limit(opts.limit || 50).offset(opts.offset || 0),
    db.select({ count: count() }).from(telegramMonitors).where(where),
  ]);
  return { items, total: totalResult[0]?.count || 0 };
}

export async function getTelegramById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(telegramMonitors).where(eq(telegramMonitors.id, id)).limit(1);
  return rows[0] || null;
}

// ===== DARK WEB =====
export async function getDarkwebMonitors(opts: { limit?: number; offset?: number; threatLevel?: string; status?: string } = {}) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (opts.threatLevel) conditions.push(eq(darkwebMonitors.threatLevel, opts.threatLevel as any));
  if (opts.status) conditions.push(eq(darkwebMonitors.status, opts.status as any));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const [items, totalResult] = await Promise.all([
    db.select().from(darkwebMonitors).where(where).orderBy(desc(darkwebMonitors.createdAt)).limit(opts.limit || 50).offset(opts.offset || 0),
    db.select({ count: count() }).from(darkwebMonitors).where(where),
  ]);
  return { items, total: totalResult[0]?.count || 0 };
}

export async function getDarkwebById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(darkwebMonitors).where(eq(darkwebMonitors.id, id)).limit(1);
  return rows[0] || null;
}

// ===== PASTE SITES =====
export async function getPasteMonitors(opts: { limit?: number; offset?: number; threatLevel?: string; status?: string } = {}) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (opts.threatLevel) conditions.push(eq(pasteMonitors.threatLevel, opts.threatLevel as any));
  if (opts.status) conditions.push(eq(pasteMonitors.status, opts.status as any));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const [items, totalResult] = await Promise.all([
    db.select().from(pasteMonitors).where(where).orderBy(desc(pasteMonitors.createdAt)).limit(opts.limit || 50).offset(opts.offset || 0),
    db.select({ count: count() }).from(pasteMonitors).where(where),
  ]);
  return { items, total: totalResult[0]?.count || 0 };
}

export async function getPasteById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(pasteMonitors).where(eq(pasteMonitors.id, id)).limit(1);
  return rows[0] || null;
}

// ===== REPORTS =====
export async function getReports(opts: { limit?: number; offset?: number; type?: string; status?: string } = {}) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (opts.type) conditions.push(eq(reports.type, opts.type as any));
  if (opts.status) conditions.push(eq(reports.status, opts.status as any));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const [items, totalResult] = await Promise.all([
    db.select().from(reports).where(where).orderBy(desc(reports.createdAt)).limit(opts.limit || 50).offset(opts.offset || 0),
    db.select({ count: count() }).from(reports).where(where),
  ]);
  return { items, total: totalResult[0]?.count || 0 };
}

export async function getReportById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(reports).where(eq(reports.id, id)).limit(1);
  return rows[0] || null;
}

// ===== THREAT RULES =====
export async function getThreatRules() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(threatRules).orderBy(desc(threatRules.matchCount));
}

export async function getThreatRuleById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(threatRules).where(eq(threatRules.id, id)).limit(1);
  return rows[0] || null;
}

// ===== ALERT CHANNELS =====
export async function getAlertChannels() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(alertChannels).orderBy(desc(alertChannels.createdAt));
}

// ===== MONITORING TASKS =====
export async function getMonitoringTasks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(monitoringTasks).orderBy(desc(monitoringTasks.createdAt));
}

// ===== EVIDENCE CHAIN =====
export async function getEvidenceChain(opts: { incidentId?: number; limit?: number; offset?: number } = {}) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (opts.incidentId) conditions.push(eq(evidenceChain.incidentId, opts.incidentId));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const [items, totalResult] = await Promise.all([
    db.select().from(evidenceChain).where(where).orderBy(desc(evidenceChain.collectedAt)).limit(opts.limit || 50).offset(opts.offset || 0),
    db.select({ count: count() }).from(evidenceChain).where(where),
  ]);
  return { items, total: totalResult[0]?.count || 0 };
}

export async function getEvidenceById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(evidenceChain).where(eq(evidenceChain.id, id)).limit(1);
  return rows[0] || null;
}

// ===== MONITORING SOURCE COUNTS =====
export async function getMonitoringSourceCounts() {
  const db = await getDb();
  if (!db) return { telegram: 0, darkweb: 0, paste: 0 };
  const [tg, dw, ps] = await Promise.all([
    db.select({ count: count() }).from(telegramMonitors),
    db.select({ count: count() }).from(darkwebMonitors),
    db.select({ count: count() }).from(pasteMonitors),
  ]);
  return { telegram: tg[0]?.count || 0, darkweb: dw[0]?.count || 0, paste: ps[0]?.count || 0 };
}
