import { z } from "zod";
import { paginatedSchema } from "@/lib/schemas/pagination.schema";

export const userSchema = z.object({
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

export const createUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email(),
  password: z.string().min(4),
  avatar: z.string().optional(),
  role: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const paginatedUsersSchema = paginatedSchema(userSchema);
