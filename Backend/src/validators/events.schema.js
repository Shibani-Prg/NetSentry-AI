
const { z } = require("zod");


const eventQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(100),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  search: z.string().trim().max(100).optional(),
});


const createEventSchema = z.object({
  source_id: z.number().int().positive(),
  event_type: z.string().trim().min(1).max(100),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  source_ip: z.string().trim().min(1).max(45).optional().nullable(),
  details: z.record(z.string(), z.unknown()).optional().default({}),
});

module.exports = {
  eventQuerySchema,
  createEventSchema,
};
