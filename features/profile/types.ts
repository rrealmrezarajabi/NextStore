import { z } from "zod";
import { profileSchema, updateProfileSchema } from "./schemas/profile.schema";

export type Profile = z.infer<typeof profileSchema>;
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
export type UpdateProfileDto = UpdateProfileDTO;
