
const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
  password: z.string().min(1, "Password is required").max(128),
});

const adminRegistrationSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100),

  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255)
    .transform((email) => email.toLowerCase()),

  password: z.string()
    .min(8, "Password must contain at least 8 characters")
    .max(128),
});

module.exports = {
  loginSchema,
  adminRegistrationSchema,
};
