const mongoose = require('mongoose');
const { STATUS } = require('../config/constants');

const purchaseOrderSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
    poNumber: { type: String, required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    supplierName: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    expectedDeliveryDate: { type: Date },
    items: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        medicineName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        expectedPrice: { type: Number, required: true, min: 0 },
        receivedQuantity: { type: Number, default: 0 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: [STATUS.DRAFT, STATUS.SENT, STATUS.PARTIALLY_RECEIVED, STATUS.COMPLETED, STATUS.CANCELLED],
      default: STATUS.DRAFT,
    },
    notes: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

purchaseOrderSchema.index({ tenantId: 1, poNumber: 1 }, { unique: true });

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
