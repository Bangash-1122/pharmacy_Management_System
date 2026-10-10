const mongoose = require('mongoose');
const { STOCK_ADJUSTMENT_TYPES } = require('../config/constants');

const stockAdjustmentSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
    adjustmentNumber: { type: String, required: true },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    medicineName: { type: String, required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineBatch', required: true },
    batchNo: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(STOCK_ADJUSTMENT_TYPES),
      default: STOCK_ADJUSTMENT_TYPES.PHYSICAL_CORRECTION,
    },
    quantityDelta: { type: Number, required: true }, // +ve or -ve
    reason: { type: String, required: true },
    adjustedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StockAdjustment', stockAdjustmentSchema);
