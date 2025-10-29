import { z } from 'zod';

export const AddVendorSchema = z.object({
  storeId: z.string().min(1, 'Please select a store.'),
  vendorName: z.string().min(2, 'Vendor name must be at least 2 characters.'),
  paymentAmount: z.coerce.number().positive('Please enter a valid amount.'),
  vendorHistory: z.string().optional(),
  accountAge: z.coerce.number().min(0, 'Account age must be a positive number.').optional(),
});

export type AddVendorInput = z.infer<typeof AddVendorSchema>;

export type FormState = {
  message: string;
  isFraud: boolean;
  success: boolean;
  reason: string | null;
  fields?: Record<string, string>;
  issues?: string[];
};
