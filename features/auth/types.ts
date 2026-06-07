import { registerSchema } from "./schemas/register.schema";
import { loginSchema } from "./schemas/login.schema";
import { z } from "zod";

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
