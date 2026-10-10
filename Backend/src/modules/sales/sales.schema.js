const { z } = require('zod');

const saleItemInputSchema = z.object({
  medicineId: z.string().min(1, 'Medicine ID is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0),
  batchId: z.string().optional(), // Optional: if omitted, system automatically performs FEFO
  discountPercent: z.number().min(0).max(100).optional().default(0),
  taxPercent: z.number().min(0).max(100).optional().default(0),
});

const createSaleSchema = z.object({
  customerId: z.string().nullable().optional(),
  customerName: z.string().optional().default('Walk-in Customer'),
  customerPhone: z.string().optional().default(''),
  items: z.array(saleItemInputSchema).min(1, 'At least 1 item is required for sale'),
  invoiceDiscount: z.number().min(0).optional().default(0),
  paidAmount: z.number().min(0, 'Paid amount must be positive'),
  paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'jazzcash', 'easypaisa', 'credit', 'split']).default('cash'),
  splitPayments: z
    .array(
      z.object({
        method: z.string(),
        amount: z.number().min(0),
        referenceNo: z.string().optional().default(''),
      })
    )
    .optional()
    .default([]),
  loyaltyPointsToRedeem: z.number().min(0).optional().default(0),
  prescriptionUrl: z.string().optional().default(''),
  notes: z.string().optional().default(''),
});

const returnSaleSchema = z.object({
  saleId: z.string().min(1, 'Original Sale ID is required'),
  items: z.array(
    z.object({
      medicineId: z.string(),
      batchId: z.string(),
      quantity: z.number().min(1),
      unitPrice: z.number().min(0),
      reason: z.enum(['Wrong medicine', 'Expired', 'Damaged', 'Customer request', 'Other']).default('Customer request'),
      returnToStock: z.boolean().default(true),
    })
  ).min(1, 'At least 1 item must be selected for return'),
  refundMethod: z.string().default('cash'),
  notes: z.string().optional().default(''),
});

module.exports = {
  createSaleSchema,
  returnSaleSchema,
};
