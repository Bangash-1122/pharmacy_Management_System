const { z } = require('zod');

const supplierSchema = z.object({
  name: z.string().min(2, 'Supplier name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().optional().default(''),
  phone: z.string().min(6, 'Phone is required'),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional().default(''),
  city: z.string().optional().default(''),
  taxRegistrationNumber: z.string().optional().default(''),
  bankDetails: z
    .object({
      bankName: z.string().optional().default(''),
      accountTitle: z.string().optional().default(''),
      accountNumber: z.string().optional().default(''),
      iban: z.string().optional().default(''),
    })
    .optional(),
  creditDays: z.number().min(0).default(30),
  creditLimit: z.number().min(0).default(0),
});

const supplierPaymentSchema = z.object({
  amount: z.number().min(1, 'Payment amount must be greater than 0'),
  paymentMethod: z.string().default('bank_transfer'),
  bankReference: z.string().optional().default(''),
  notes: z.string().optional().default(''),
});

module.exports = {
  supplierSchema,
  supplierPaymentSchema,
};
