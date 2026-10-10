const { z } = require('zod');

const customerSchema = z.object({
  name: z.string().min(2, 'Customer name is required'),
  phone: z.string().min(6, 'Phone is required'),
  email: z.string().email().optional().or(z.literal('')),
  cnic: z.string().optional().default(''),
  address: z.string().optional().default(''),
  customerType: z.enum(['walk_in', 'regular', 'loyalty', 'wholesale', 'institutional']).default('walk_in'),
  doctorName: z.string().optional().default(''),
  medicalHistoryNotes: z.string().optional().default(''),
  allergies: z.array(z.string()).optional().default([]),
  creditLimit: z.number().min(0).default(0),
});

const adjustPointsSchema = z.object({
  points: z.number().refine((val) => val !== 0, 'Points adjustment cannot be zero'),
  reason: z.string().min(3, 'Reason is required'),
});

const customerPaymentSchema = z.object({
  amount: z.number().min(1, 'Payment amount must be greater than 0'),
  paymentMethod: z.string().default('cash'),
  notes: z.string().optional().default(''),
});

module.exports = {
  customerSchema,
  adjustPointsSchema,
  customerPaymentSchema,
};
