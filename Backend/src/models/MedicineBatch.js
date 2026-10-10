const mongoose = require('mongoose');

const medicineBatchSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', index: true, default: null },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true, index: true },
    batchNo: { type: String, required: true, trim: true },
    lotNo: { type: String, trim: true, default: '' },
    manufacturingDate: { type: Date },
    expiryDate: { type: Date, required: true, index: true },
    quantity: { type: Number, required: true, default: 0, min: 0 },
    purchasePrice: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, required: true, min: 0 },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', default: null },
    grnId: { type: mongoose.Schema.Types.ObjectId, ref: 'GoodsReceipt', default: null },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Compound index for ultra-fast FEFO (First Expired First Out) querying
medicineBatchSchema.index({ tenantId: 1, medicineId: 1, expiryDate: 1, quantity: 1 });
medicineBatchSchema.index({ tenantId: 1, expiryDate: 1 });

module.exports = mongoose.model('MedicineBatch', medicineBatchSchema);
