const mongoose = require('mongoose');

const goodsReceiptSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
    grnNumber: { type: String, required: true },
    poId: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder', default: null },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    supplierName: { type: String, required: true },
    supplierInvoiceNo: { type: String, required: true },
    supplierInvoiceDate: { type: Date, default: Date.now },
    receivedDate: { type: Date, default: Date.now },
    items: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        medicineName: { type: String, required: true },
        batchNo: { type: String, required: true },
        lotNo: { type: String, default: '' },
        mfgDate: { type: Date },
        expiryDate: { type: Date, required: true },
        quantityReceived: { type: Number, required: true, min: 1 },
        bonusQuantity: { type: Number, default: 0 },
        purchasePrice: { type: Number, required: true, min: 0 },
        salePrice: { type: Number, required: true, min: 0 },
        taxPercent: { type: Number, default: 0 },
        subtotal: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0 },
    balanceAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, default: 'credit' },
    notes: { type: String, default: '' },
    receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

goodsReceiptSchema.index({ tenantId: 1, grnNumber: 1 }, { unique: true });

module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);
