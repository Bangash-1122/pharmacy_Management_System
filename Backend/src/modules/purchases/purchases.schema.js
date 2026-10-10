const { z } = require('zod');

const createPOSchema = z.object({
  supplierId: z.string().min(1, 'Supplier ID is required'),
  expectedDeliveryDate: z.string().optional(),
  items: z.array(
    z.object({
      medicineId: z.string().min(1, 'Medicine ID is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      expectedPrice: z.number().min(0, 'Price must be positive'),
    })
  ).min(1, 'At least 1 item is required'),
  notes: z.string().optional().default(''),
});

const createGRNSchema = z.object({
  poId: z.string().nullable().optional(),
  supplierId: z.string().min(1, 'Supplier ID is required'),
  supplierInvoiceNo: z.string().min(1, 'Supplier invoice number is required'),
  supplierInvoiceDate: z.string().optional(),
  items: z.array(
    z.object({
      medicineId: z.string().min(1, 'Medicine ID is required'),
      batchNo: z.string().min(1, 'Batch number is required'),
      lotNo: z.string().optional().default(''),
      mfgDate: z.string().optional(),
      expiryDate: z.string().min(4, 'Expiry date is required'),
      quantityReceived: z.number().min(1, 'Quantity received must be >= 1'),
      bonusQuantity: z.number().optional().default(0),
      purchasePrice: z.number().min(0, 'Purchase price must be >= 0'),
      salePrice: z.number().min(0, 'Sale price must be >= 0'),
      taxPercent: z.number().optional().default(0),
    })
  ).min(1, 'At least 1 item is required in GRN'),
  paidAmount: z.number().optional().default(0),
  paymentMethod: z.string().optional().default('credit'),
  notes: z.string().optional().default(''),
});

module.exports = {
  createPOSchema,
  createGRNSchema,
};
