const PurchaseOrder = require('../../models/PurchaseOrder');
const GoodsReceipt = require('../../models/GoodsReceipt');
const PurchaseReturn = require('../../models/PurchaseReturn');
const Supplier = require('../../models/Supplier');
const Medicine = require('../../models/Medicine');
const MedicineBatch = require('../../models/MedicineBatch');
const { generatePONumber, generateGRNNumber } = require('../../utils/barcode.util');
const { STATUS } = require('../../config/constants');

class PurchasesService {
  static async createPO(tenantId, branchId, user, data) {
    const supplier = await Supplier.findOne({ _id: data.supplierId, tenantId });
    if (!supplier) {
      const error = new Error('Supplier not found.');
      error.statusCode = 404;
      throw error;
    }

    const items = [];
    let total = 0;

    for (const item of data.items) {
      const med = await Medicine.findOne({ _id: item.medicineId, tenantId });
      if (!med) continue;

      const sub = item.quantity * item.expectedPrice;
      total += sub;
      items.push({
        medicineId: med._id,
        medicineName: med.name,
        quantity: item.quantity,
        expectedPrice: item.expectedPrice,
        receivedQuantity: 0,
      });
    }

    const count = await PurchaseOrder.countDocuments({ tenantId });
    const poNumber = generatePONumber('PO', count + 1);

    const po = await PurchaseOrder.create({
      tenantId,
      branchId,
      poNumber,
      supplierId: supplier._id,
      supplierName: supplier.name,
      items,
      totalAmount: total,
      status: STATUS.SENT,
      notes: data.notes || '',
      createdBy: user.id,
      expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : null,
    });

    return po;
  }

  static async listPOs(tenantId, query = {}) {
    const filter = { tenantId };
    if (query.supplierId) filter.supplierId = query.supplierId;
    if (query.status) filter.status = query.status;

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const pos = await PurchaseOrder.find(filter)
      .populate('supplierId createdBy')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await PurchaseOrder.countDocuments(filter);

    return { pos, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  static async createGRN(tenantId, branchId, user, data) {
    const supplier = await Supplier.findOne({ _id: data.supplierId, tenantId });
    if (!supplier) {
      const error = new Error('Supplier not found.');
      error.statusCode = 404;
      throw error;
    }

    const grnCount = await GoodsReceipt.countDocuments({ tenantId });
    const grnNumber = generateGRNNumber('GRN', grnCount + 1);

    let totalAmount = 0;
    const grnItems = [];

    for (const item of data.items) {
      const medicine = await Medicine.findOne({ _id: item.medicineId, tenantId });
      if (!medicine) continue;

      const totalQty = item.quantityReceived + (item.bonusQuantity || 0);
      const lineSubtotal = item.quantityReceived * item.purchasePrice;
      totalAmount += lineSubtotal;

      grnItems.push({
        medicineId: medicine._id,
        medicineName: medicine.name,
        batchNo: item.batchNo,
        lotNo: item.lotNo || '',
        mfgDate: item.mfgDate ? new Date(item.mfgDate) : null,
        expiryDate: new Date(item.expiryDate),
        quantityReceived: item.quantityReceived,
        bonusQuantity: item.bonusQuantity || 0,
        purchasePrice: item.purchasePrice,
        salePrice: item.salePrice || medicine.salePrice,
        taxPercent: item.taxPercent || 0,
        subtotal: lineSubtotal,
      });

      // 1. Create or update MedicineBatch
      let batch = await MedicineBatch.findOne({
        tenantId,
        medicineId: medicine._id,
        batchNo: item.batchNo,
        active: true,
      });

      if (batch) {
        batch.quantity += totalQty;
        batch.purchasePrice = item.purchasePrice;
        batch.salePrice = item.salePrice || batch.salePrice;
        batch.expiryDate = new Date(item.expiryDate);
        await batch.save();
      } else {
        batch = await MedicineBatch.create({
          tenantId,
          branchId,
          medicineId: medicine._id,
          batchNo: item.batchNo,
          lotNo: item.lotNo || '',
          mfgDate: item.mfgDate ? new Date(item.mfgDate) : null,
          expiryDate: new Date(item.expiryDate),
          quantity: totalQty,
          purchasePrice: item.purchasePrice,
          salePrice: item.salePrice || medicine.salePrice,
          supplierId: supplier._id,
        });
      }

      // 2. Increment medicine totalStock & update master prices
      medicine.totalStock += totalQty;
      medicine.purchasePrice = item.purchasePrice;
      if (item.salePrice) medicine.salePrice = item.salePrice;
      await medicine.save();
    }

    const paidAmount = data.paidAmount || 0;
    const balanceAmount = Math.max(0, totalAmount - paidAmount);

    // Update supplier ledger balance
    supplier.balance += balanceAmount;
    await supplier.save();

    // If linked to a PO, update PO status
    if (data.poId) {
      await PurchaseOrder.findOneAndUpdate(
        { _id: data.poId, tenantId },
        { status: STATUS.COMPLETED }
      );
    }

    const grn = await GoodsReceipt.create({
      tenantId,
      branchId,
      grnNumber,
      poId: data.poId || null,
      supplierId: supplier._id,
      supplierName: supplier.name,
      supplierInvoiceNo: data.supplierInvoiceNo,
      supplierInvoiceDate: data.supplierInvoiceDate ? new Date(data.supplierInvoiceDate) : new Date(),
      items: grnItems,
      totalAmount,
      paidAmount,
      balanceAmount,
      paymentMethod: data.paymentMethod || 'credit',
      notes: data.notes || '',
      receivedBy: user.id,
    });

    return grn;
  }

  static async listGRNs(tenantId, query = {}) {
    const filter = { tenantId };
    if (query.supplierId) filter.supplierId = query.supplierId;

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const grns = await GoodsReceipt.find(filter)
      .populate('supplierId receivedBy poId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await GoodsReceipt.countDocuments(filter);

    return { grns, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  static async getLowStockSuggestions(tenantId) {
    const lowStockMedicines = await Medicine.find({
      tenantId,
      active: true,
      $expr: { $lte: ['$totalStock', '$minStockLevel'] },
    }).populate('brandId categoryId');

    return lowStockMedicines.map((m) => ({
      medicineId: m._id,
      medicineName: m.name,
      genericName: m.genericName,
      currentStock: m.totalStock,
      minStockLevel: m.minStockLevel,
      suggestedReorderQty: m.reorderQuantity,
      estimatedCost: m.reorderQuantity * m.purchasePrice,
    }));
  }
}

module.exports = PurchasesService;
