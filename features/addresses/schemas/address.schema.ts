import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().trim().optional(),

  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long"),

  province: z.string().trim().min(2, "Province is required"),

  city: z.string().trim().min(2, "City is required"),

  street: z.string().trim().min(5, "Street address is required"),

  postalCode: z
    .string()
    .trim()
    .min(5, "Postal code is too short")
    .max(20, "Postal code is too long"),

  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = addressSchema.partial(); //creates a new schema but all are optional
