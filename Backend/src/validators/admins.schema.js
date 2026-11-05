
const { z } = require("zod");

const createAdminSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(72),
});

module.exports = {
  createAdminSchema,
};
