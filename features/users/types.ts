import { z } from "zod";
import {
  createUserSchema,
  paginatedUsersSchema,
  updateUserSchema,
  userSchema,
} from "./schemas/user.schema";

export type User = z.infer<typeof userSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type PaginatedUsers = z.infer<typeof paginatedUsersSchema>;

