const mongoose = require('mongoose');

const saleReturnSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
    returnInvoiceNo: { type: String, required: true },
    originalSaleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
    originalInvoiceNo: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
    cashierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        medicineName: { type: String, required: true },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineBatch', required: true },
        batchNo: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true },
        refundSubtotal: { type: Number, required: true },
        reason: {
          type: String,
          enum: ['Wrong medicine', 'Expired', 'Damaged', 'Customer request', 'Other'],
          default: 'Customer request',
        },
        returnToStock: { type: Boolean, default: true }, // If false, marked as damaged/disposal
      },
    ],
    totalRefundAmount: { type: Number, required: true, min: 0 },
    refundMethod: { type: String, default: 'cash' }, // cash, credit_note, credit_adjustment
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

saleReturnSchema.index({ tenantId: 1, returnInvoiceNo: 1 }, { unique: true });

module.exports = mongoose.model('SaleReturn', saleReturnSchema);
