const mongoose = require('mongoose');

const stockAuditSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
    auditNumber: { type: String, required: true },
    title: { type: String, default: 'Physical Stock Count Cycle' },
    status: { type: String, enum: ['in_progress', 'completed', 'cancelled'], default: 'in_progress' },
    startedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    countedItems: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        medicineName: { type: String, required: true },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineBatch', required: true },
        batchNo: { type: String, required: true },
        systemQty: { type: Number, required: true },
        physicalQty: { type: Number, required: true },
        varianceQty: { type: Number, required: true }, // physical - system
        notes: { type: String, default: '' },
      },
    ],
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StockAudit', stockAuditSchema);
