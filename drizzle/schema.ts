import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Sectors (القطاعات المتأثرة)
export const sectors = mysqlTable("sectors", {
  id: int("id").autoincrement().primaryKey(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 100 }),
  color: varchar("color", { length: 50 }),
  incidentCount: int("incidentCount").default(0).notNull(),
  percentage: int("percentage").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Sector = typeof sectors.$inferSelect;

// PII Types (أنواع البيانات الشخصية)
export const piiTypes = mysqlTable("pii_types", {
  id: int("id").autoincrement().primaryKey(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }),
  count: int("count").default(0).notNull(),
  color: varchar("color", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PiiType = typeof piiTypes.$inferSelect;

// Incidents (الحوادث)
export const incidents = mysqlTable("incidents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  severity: mysqlEnum("severity", ["critical", "high", "medium", "low"]).default("medium").notNull(),
  status: mysqlEnum("status", ["new", "analyzing", "documented", "completed"]).default("new").notNull(),
  source: mysqlEnum("source", ["telegram", "darkweb", "paste_sites", "vendor_files", "other"]).default("other").notNull(),
  sectorId: int("sectorId"),
  affectedRecords: int("affectedRecords").default(0),
  dataTypes: json("dataTypes"),
  discoveredAt: timestamp("discoveredAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
  assignedTo: varchar("assignedTo", { length: 255 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Incident = typeof incidents.$inferSelect;

// Leaks (التسريبات)
export const leaks = mysqlTable("leaks", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  source: mysqlEnum("source", ["telegram", "darkweb", "paste_sites", "vendor", "other"]).default("other").notNull(),
  severity: mysqlEnum("severity", ["critical", "high", "medium", "low"]).default("medium").notNull(),
  status: mysqlEnum("status", ["new", "investigating", "confirmed", "resolved", "false_positive"]).default("new").notNull(),
  sectorId: int("sectorId"),
  affectedEntity: varchar("affectedEntity", { length: 500 }),
  dataCount: int("dataCount").default(0),
  dataTypes: json("dataTypes"),
  sourceUrl: text("sourceUrl"),
  discoveredAt: timestamp("discoveredAt").defaultNow().notNull(),
  verifiedAt: timestamp("verifiedAt"),
  resolvedAt: timestamp("resolvedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Leak = typeof leaks.$inferSelect;

// Telegram Monitoring (رصد تليجرام)
export const telegramMonitors = mysqlTable("telegram_monitors", {
  id: int("id").autoincrement().primaryKey(),
  channelName: varchar("channelName", { length: 255 }).notNull(),
  channelId: varchar("channelId", { length: 100 }),
  messageContent: text("messageContent"),
  messageDate: timestamp("messageDate"),
  threatLevel: mysqlEnum("threatLevel", ["critical", "high", "medium", "low"]).default("low").notNull(),
  hasPersonalData: boolean("hasPersonalData").default(false),
  dataTypes: json("dataTypes"),
  status: mysqlEnum("status", ["new", "reviewed", "escalated", "dismissed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TelegramMonitor = typeof telegramMonitors.$inferSelect;

// Dark Web Monitoring (رصد الدارك ويب)
export const darkwebMonitors = mysqlTable("darkweb_monitors", {
  id: int("id").autoincrement().primaryKey(),
  siteName: varchar("siteName", { length: 255 }).notNull(),
  siteUrl: text("siteUrl"),
  postTitle: varchar("postTitle", { length: 500 }),
  postContent: text("postContent"),
  threatLevel: mysqlEnum("threatLevel", ["critical", "high", "medium", "low"]).default("low").notNull(),
  dataTypes: json("dataTypes"),
  affectedEntity: varchar("affectedEntity", { length: 500 }),
  discoveredAt: timestamp("discoveredAt").defaultNow().notNull(),
  status: mysqlEnum("status", ["new", "reviewed", "escalated", "dismissed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DarkwebMonitor = typeof darkwebMonitors.$inferSelect;

// Paste Sites Monitoring (مواقع اللصق)
export const pasteMonitors = mysqlTable("paste_monitors", {
  id: int("id").autoincrement().primaryKey(),
  siteName: varchar("siteName", { length: 255 }).notNull(),
  pasteTitle: varchar("pasteTitle", { length: 500 }),
  pasteContent: text("pasteContent"),
  pasteUrl: text("pasteUrl"),
  threatLevel: mysqlEnum("threatLevel", ["critical", "high", "medium", "low"]).default("low").notNull(),
  hasPersonalData: boolean("hasPersonalData").default(false),
  dataTypes: json("dataTypes"),
  discoveredAt: timestamp("discoveredAt").defaultNow().notNull(),
  status: mysqlEnum("status", ["new", "reviewed", "escalated", "dismissed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PasteMonitor = typeof pasteMonitors.$inferSelect;

// Reports (التقارير)
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  type: mysqlEnum("type", ["daily", "weekly", "monthly", "incident", "custom"]).default("custom").notNull(),
  content: text("content"),
  summary: text("summary"),
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  incidentCount: int("incidentCount").default(0),
  leakCount: int("leakCount").default(0),
  createdBy: varchar("createdBy", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Report = typeof reports.$inferSelect;

// Threat Hunting Rules (قواعد صيد التهديدات)
export const threatRules = mysqlTable("threat_rules", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  ruleType: varchar("ruleType", { length: 100 }),
  pattern: text("pattern"),
  severity: mysqlEnum("severity", ["critical", "high", "medium", "low"]).default("medium").notNull(),
  isActive: boolean("isActive").default(true),
  matchCount: int("matchCount").default(0),
  lastMatchAt: timestamp("lastMatchAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ThreatRule = typeof threatRules.$inferSelect;

// Alert Channels (قنوات التنبيه)
export const alertChannels = mysqlTable("alert_channels", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["email", "sms", "telegram", "webhook", "slack"]).default("email").notNull(),
  config: json("config"),
  isActive: boolean("isActive").default(true),
  lastAlertAt: timestamp("lastAlertAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AlertChannel = typeof alertChannels.$inferSelect;

// Monitoring Tasks (مهام الرصد)
export const monitoringTasks = mysqlTable("monitoring_tasks", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 100 }),
  schedule: varchar("schedule", { length: 100 }),
  status: mysqlEnum("status", ["active", "paused", "completed", "failed"]).default("active").notNull(),
  lastRunAt: timestamp("lastRunAt"),
  nextRunAt: timestamp("nextRunAt"),
  resultCount: int("resultCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MonitoringTask = typeof monitoringTasks.$inferSelect;

// Evidence Chain (سلسلة الأدلة)
export const evidenceChain = mysqlTable("evidence_chain", {
  id: int("id").autoincrement().primaryKey(),
  incidentId: int("incidentId"),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  evidenceType: varchar("evidenceType", { length: 100 }),
  sourceUrl: text("sourceUrl"),
  hash: varchar("hash", { length: 255 }),
  collectedAt: timestamp("collectedAt").defaultNow().notNull(),
  collectedBy: varchar("collectedBy", { length: 255 }),
  verified: boolean("verified").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EvidenceChainItem = typeof evidenceChain.$inferSelect;

// Dashboard Stats Cache (إحصائيات لوحة القيادة)
export const dashboardStats = mysqlTable("dashboard_stats", {
  id: int("id").autoincrement().primaryKey(),
  statKey: varchar("statKey", { length: 100 }).notNull().unique(),
  statValue: int("statValue").default(0).notNull(),
  metadata: json("metadata"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DashboardStat = typeof dashboardStats.$inferSelect;
