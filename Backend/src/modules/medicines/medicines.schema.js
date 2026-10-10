const { z } = require('zod');

const medicineSchema = z.object({
  name: z.string().min(2, 'Medicine name is required'),
  genericName: z.string().min(2, 'Generic name is required'),
  composition: z.string().optional().default(''),
  categoryId: z.string().nullable().optional(),
  subCategory: z.string().optional().default(''),
  brandId: z.string().nullable().optional(),
  brandName: z.string().optional().default(''),
  unitOfMeasure: z.string().optional().default('Tablet'),
  packingSize: z.string().optional().default('1 Strip = 10 Tablets'),
  unitsPerPack: z.number().min(1).default(10),
  purchasePrice: z.number().min(0, 'Purchase price must be positive'),
  salePrice: z.number().min(0, 'Sale price must be positive'),
  mrp: z.number().optional().default(0),
  discountPercent: z.number().min(0).max(100).default(0),
  taxPercent: z.number().min(0).max(100).default(0),
  minStockLevel: z.number().min(0).default(10),
  reorderQuantity: z.number().min(0).default(50),
  rackLocation: z.string().optional().default(''),
  barcodes: z.array(z.string()).optional().default([]),
  imageUrl: z.string().optional().default(''),
  alternativeMedicineIds: z.array(z.string()).optional().default([]),
  prescriptionRequired: z.boolean().optional().default(false),
  narcoticFlag: z.boolean().optional().default(false),
  notes: z.string().optional().default(''),
});

const bulkUpdateSchema = z.object({
  medicineIds: z.array(z.string()).min(1),
  updates: z.object({
    categoryId: z.string().optional(),
    discountPercent: z.number().min(0).max(100).optional(),
    taxPercent: z.number().min(0).max(100).optional(),
    active: z.boolean().optional(),
  }),
});

module.exports = {
  medicineSchema,
  bulkUpdateSchema,
};
