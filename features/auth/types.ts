import { registerSchema } from "./schemas/register.schema";
import { loginSchema } from "./schemas/login.schema";
import { profileSchema, updateProfileSchema } from "./schemas/profile.schema";
import { z } from "zod";

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
export type UpdateProfileDto = UpdateProfileDTO;
