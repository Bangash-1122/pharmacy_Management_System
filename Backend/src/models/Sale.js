const mongoose = require('mongoose');
const { PAYMENT_METHODS, STATUS } = require('../config/constants');

const saleItemSchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  medicineName: { type: String, required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineBatch', required: true },
  batchNo: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  purchasePrice: { type: Number, default: 0 },
  discountPercent: { type: Number, default: 0, min: 0, max: 100 },
  discountAmount: { type: Number, default: 0 },
  taxPercent: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
});

const saleSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
    invoiceNo: { type: String, required: true, trim: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
    customerName: { type: String, default: 'Walk-in Customer' },
    customerPhone: { type: String, default: '' },
    cashierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cashierName: { type: String, required: true },
    items: [saleItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    discountTotal: { type: Number, default: 0, min: 0 },
    taxTotal: { type: Number, default: 0, min: 0 },
    grandTotal: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, required: true, min: 0 },
    changeAmount: { type: Number, default: 0 },
    creditAmount: { type: Number, default: 0 },
    loyaltyPointsEarned: { type: Number, default: 0 },
    loyaltyPointsRedeemed: { type: Number, default: 0 },
    loyaltyDiscount: { type: Number, default: 0 },
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      default: PAYMENT_METHODS.CASH,
    },
    splitPayments: [
      {
        method: { type: String, enum: Object.values(PAYMENT_METHODS) },
        amount: { type: Number, required: true },
        referenceNo: { type: String, default: '' },
      },
    ],
    status: {
      type: String,
      enum: [STATUS.COMPLETED, STATUS.VOID, STATUS.RETURNED, 'held'],
      default: STATUS.COMPLETED,
    },
    prescriptionUrl: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

saleSchema.index({ tenantId: 1, invoiceNo: 1 }, { unique: true });
saleSchema.index({ tenantId: 1, createdAt: -1 });
saleSchema.index({ tenantId: 1, customerId: 1 });

module.exports = mongoose.model('Sale', saleSchema);
