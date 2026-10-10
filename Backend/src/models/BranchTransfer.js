const mongoose = require('mongoose');

const branchTransferSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    transferNumber: { type: String, required: true },
    sourceBranchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    sourceBranchName: { type: String, required: true },
    targetBranchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    targetBranchName: { type: String, required: true },
    items: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        medicineName: { type: String, required: true },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineBatch', required: true },
        batchNo: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    status: {
      type: String,
      enum: ['requested', 'approved', 'dispatched', 'received', 'cancelled'],
      default: 'requested',
    },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    dispatchedAt: { type: Date },
    receivedAt: { type: Date },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BranchTransfer', branchTransferSchema);
