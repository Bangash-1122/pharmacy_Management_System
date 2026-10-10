const { z } = require('zod');

const stockAdjustmentSchema = z.object({
  medicineId: z.string().min(1, 'Medicine ID is required'),
  batchId: z.string().min(1, 'Batch ID is required'),
  type: z.string().default('Physical count correction'),
  quantityDelta: z.number().refine((val) => val !== 0, { message: 'Quantity delta cannot be zero' }),
  reason: z.string().min(3, 'Reason is required for inventory adjustments'),
});

const stockAuditStartSchema = z.object({
  title: z.string().optional().default('Physical Stock Count Cycle'),
  notes: z.string().optional().default(''),
});

const stockAuditSaveSchema = z.object({
  countedItems: z.array(
    z.object({
      medicineId: z.string(),
      batchId: z.string(),
      physicalQty: z.number().min(0),
      notes: z.string().optional().default(''),
    })
  ),
  postAdjustments: z.boolean().optional().default(true),
});

module.exports = {
  stockAdjustmentSchema,
  stockAuditStartSchema,
  stockAuditSaveSchema,
};
