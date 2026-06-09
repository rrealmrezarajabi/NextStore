import { z } from "zod";
import { addressSchema, updateAddressSchema } from "./schemas/address.schema";

export type Address = {
  id: number;
  label: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
  isDefault: boolean;
};

export type CreateAddressPayload = z.infer<typeof addressSchema>;

export type UpdateAddressPayload = z.infer<typeof updateAddressSchema>;
