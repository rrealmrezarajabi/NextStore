import { z } from "zod";

export const profileSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  name: z.string().optional(),
  role: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable().optional().transform((value) => value ?? undefined),
  password: z.string().optional(),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  username: z.string().min(1, "Username is required").optional(),
  email: z.string().email().optional(),
  password: z.string().min(4).optional(),
  avatar: z.string().optional(),
});
