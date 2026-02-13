import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  dashboard: router({
    stats: publicProcedure.query(async () => {
      const [stats, statusCounts, sourceCounts, sectors, piiTypes] = await Promise.all([
        db.getDashboardStats(),
        db.getIncidentStatusCounts(),
        db.getMonitoringSourceCounts(),
        db.getAllSectors(),
        db.getAllPiiTypes(),
      ]);
      return { stats, statusCounts, sourceCounts, sectors, piiTypes };
    }),
  }),

  sectors: router({
    list: publicProcedure.query(() => db.getAllSectors()),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getSectorById(input.id)),
  }),

  piiTypes: router({
    list: publicProcedure.query(() => db.getAllPiiTypes()),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getPiiTypeById(input.id)),
  }),

  incidents: router({
    list: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      severity: z.string().optional(),
      status: z.string().optional(),
      source: z.string().optional(),
      sectorId: z.number().optional(),
    }).optional()).query(({ input }) => db.getIncidents(input || {})),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getIncidentById(input.id)),
    statusCounts: publicProcedure.query(() => db.getIncidentStatusCounts()),
  }),

  leaks: router({
    list: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      severity: z.string().optional(),
      status: z.string().optional(),
      source: z.string().optional(),
      sectorId: z.number().optional(),
      search: z.string().optional(),
    }).optional()).query(({ input }) => db.getLeaks(input || {})),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getLeakById(input.id)),
  }),

  telegram: router({
    list: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      threatLevel: z.string().optional(),
      status: z.string().optional(),
    }).optional()).query(({ input }) => db.getTelegramMonitors(input || {})),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getTelegramById(input.id)),
  }),

  darkweb: router({
    list: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      threatLevel: z.string().optional(),
      status: z.string().optional(),
    }).optional()).query(({ input }) => db.getDarkwebMonitors(input || {})),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getDarkwebById(input.id)),
  }),

  paste: router({
    list: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      threatLevel: z.string().optional(),
      status: z.string().optional(),
    }).optional()).query(({ input }) => db.getPasteMonitors(input || {})),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getPasteById(input.id)),
  }),

  reports: router({
    list: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      type: z.string().optional(),
      status: z.string().optional(),
    }).optional()).query(({ input }) => db.getReports(input || {})),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getReportById(input.id)),
  }),

  threatRules: router({
    list: publicProcedure.query(() => db.getThreatRules()),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getThreatRuleById(input.id)),
  }),

  alertChannels: router({
    list: publicProcedure.query(() => db.getAlertChannels()),
  }),

  monitoringTasks: router({
    list: publicProcedure.query(() => db.getMonitoringTasks()),
  }),

  evidence: router({
    list: publicProcedure.input(z.object({
      incidentId: z.number().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }).optional()).query(({ input }) => db.getEvidenceChain(input || {})),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getEvidenceById(input.id)),
  }),

  ai: router({
    chat: publicProcedure.input(z.object({ message: z.string() })).mutation(async ({ input }) => {
      try {
        // Get dashboard context for AI
        const [stats, incidents, leaks] = await Promise.all([
          db.getDashboardStats(),
          db.getIncidents({ limit: 10 }),
          db.getLeaks({ limit: 10 }),
        ]);
        const context = `أنت راصد الذكي - مساعد ذكاء اصطناعي متخصص في حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية.
إحصائيات لوحة القيادة: ${JSON.stringify(stats)}
آخر الحوادث: ${JSON.stringify(incidents?.items?.slice(0, 5)?.map((i: any) => ({ title: i.title, severity: i.severity, sector: i.sector })))}
آخر التسريبات: ${JSON.stringify(leaks?.items?.slice(0, 5)?.map((l: any) => ({ title: l.title, severity: l.severity, source: l.source })))}
أجب باللغة العربية بشكل مفصل ومهني. قدم تحليلات وتوصيات عملية.`;
        const response = await invokeLLM({
          messages: [
            { role: "system", content: context },
            { role: "user", content: input.message },
          ],
        });
        return { response: response.choices?.[0]?.message?.content || "عذراً، لم أتمكن من معالجة طلبك." };
      } catch (error) {
        console.error("AI chat error:", error);
        return { response: "عذراً، حدث خطأ في المعالجة. يرجى المحاولة مرة أخرى." };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
