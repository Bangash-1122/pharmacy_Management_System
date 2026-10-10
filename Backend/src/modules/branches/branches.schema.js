const { z } = require('zod');

const branchSchema = z.object({
  name: z.string().min(2, 'Branch name is required'),
  code: z.string().min(2, 'Branch code is required'),
  address: z.string().min(3, 'Address is required'),
  city: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  managerId: z.string().nullable().optional(),
});

const createTransferSchema = z.object({
  sourceBranchId: z.string().min(1, 'Source branch is required'),
  targetBranchId: z.string().min(1, 'Target branch is required'),
  items: z
    .array(
      z.object({
        medicineId: z.string().min(1),
        batchId: z.string().min(1),
        quantity: z.number().min(1),
      })
    )
    .min(1, 'At least 1 item is required for branch transfer'),
  notes: z.string().optional().default(''),
});

module.exports = {
  branchSchema,
  createTransferSchema,
};
