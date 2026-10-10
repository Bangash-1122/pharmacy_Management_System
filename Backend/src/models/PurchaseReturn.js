const mongoose = require('mongoose');

const purchaseReturnSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
    returnNumber: { type: String, required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    supplierName: { type: String, required: true },
    items: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        medicineName: { type: String, required: true },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineBatch', required: true },
        batchNo: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        purchasePrice: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        reason: {
          type: String,
          enum: ['expired', 'near-expiry', 'damaged', 'excess stock', 'other'],
          default: 'near-expiry',
        },
      },
    ],
    totalCreditAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'completed' },
    notes: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

purchaseReturnSchema.index({ tenantId: 1, returnNumber: 1 }, { unique: true });

module.exports = mongoose.model('PurchaseReturn', purchaseReturnSchema);
