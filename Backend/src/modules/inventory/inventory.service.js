const MedicineBatch = require('../../models/MedicineBatch');
const Medicine = require('../../models/Medicine');
const StockAdjustment = require('../../models/StockAdjustment');
const StockAudit = require('../../models/StockAudit');

class InventoryService {
  static async getInventoryOverview(tenantId, query = {}) {
    const filter = { tenantId, active: true };
    if (query.medicineId) filter.medicineId = query.medicineId;
    if (query.branchId) filter.branchId = query.branchId;

    const batches = await MedicineBatch.find(filter)
      .populate('medicineId supplierId')
      .sort({ expiryDate: 1 }); // FEFO sort

    // Valuation calculation
    let totalStockValuePurchase = 0;
    let totalStockValueSale = 0;
    let totalUnits = 0;

    batches.forEach((b) => {
      totalStockValuePurchase += b.quantity * b.purchasePrice;
      totalStockValueSale += b.quantity * b.salePrice;
      totalUnits += b.quantity;
    });

    return {
      batches,
      valuation: {
        totalUnits,
        totalStockValuePurchase,
        totalStockValueSale,
        potentialProfit: totalStockValueSale - totalStockValuePurchase,
      },
    };
  }

  static async getExpiryRadar(tenantId, branchId = null) {
    const now = new Date();
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const in60Days = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    const in90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

    const baseFilter = { tenantId, active: true, quantity: { $gt: 0 } };
    if (branchId) baseFilter.branchId = branchId;

    // 1. Expired batches
    const expired = await MedicineBatch.find({
      ...baseFilter,
      expiryDate: { $lt: now },
    }).populate('medicineId supplierId').sort({ expiryDate: 1 });

    // 2. Expiring in 7 days
    const expiring7Days = await MedicineBatch.find({
      ...baseFilter,
      expiryDate: { $gte: now, $lte: in7Days },
    }).populate('medicineId supplierId').sort({ expiryDate: 1 });

    // 3. Expiring in 30 days
    const expiring30Days = await MedicineBatch.find({
      ...baseFilter,
      expiryDate: { $gt: in7Days, $lte: in30Days },
    }).populate('medicineId supplierId').sort({ expiryDate: 1 });

    // 4. Expiring in 60 days
    const expiring60Days = await MedicineBatch.find({
      ...baseFilter,
      expiryDate: { $gt: in30Days, $lte: in60Days },
    }).populate('medicineId supplierId').sort({ expiryDate: 1 });

    // 5. Expiring in 90 days
    const expiring90Days = await MedicineBatch.find({
      ...baseFilter,
      expiryDate: { $gt: in60Days, $lte: in90Days },
    }).populate('medicineId supplierId').sort({ expiryDate: 1 });

    return {
      expired: { count: expired.length, items: expired },
      expiring7Days: { count: expiring7Days.length, items: expiring7Days },
      expiring30Days: { count: expiring30Days.length, items: expiring30Days },
      expiring60Days: { count: expiring60Days.length, items: expiring60Days },
      expiring90Days: { count: expiring90Days.length, items: expiring90Days },
    };
  }

  static async adjustStock(tenantId, userId, data) {
    const batch = await MedicineBatch.findOne({ _id: data.batchId, tenantId, active: true });
    if (!batch) {
      const error = new Error('Batch not found.');
      error.statusCode = 404;
      throw error;
    }

    const medicine = await Medicine.findOne({ _id: data.medicineId, tenantId });
    if (!medicine) {
      const error = new Error('Medicine not found.');
      error.statusCode = 404;
      throw error;
    }

    if (batch.quantity + data.quantityDelta < 0) {
      const error = new Error(`Cannot decrease stock by ${Math.abs(data.quantityDelta)}. Current batch stock is ${batch.quantity}.`);
      error.statusCode = 400;
      throw error;
    }

    batch.quantity += data.quantityDelta;
    await batch.save();

    // Recalculate medicine total stock
    const allBatches = await MedicineBatch.find({ tenantId, medicineId: medicine._id, active: true });
    const newTotal = allBatches.reduce((acc, b) => acc + b.quantity, 0);
    medicine.totalStock = newTotal;
    await medicine.save();

    const adjustmentNumber = `ADJ-${Date.now().toString().slice(-6)}`;
    const adjustment = await StockAdjustment.create({
      tenantId,
      branchId: batch.branchId,
      adjustmentNumber,
      medicineId: medicine._id,
      medicineName: medicine.name,
      batchId: batch._id,
      batchNo: batch.batchNo,
      type: data.type,
      quantityDelta: data.quantityDelta,
      reason: data.reason,
      adjustedBy: userId,
      status: 'approved',
    });

    return { adjustment, updatedBatch: batch };
  }

  static async startStockAudit(tenantId, userId, data) {
    const auditNumber = `AUD-${Date.now().toString().slice(-6)}`;
    const activeBatches = await MedicineBatch.find({ tenantId, active: true, quantity: { $gt: 0 } })
      .populate('medicineId');

    const countedItems = activeBatches.map((b) => ({
      medicineId: b.medicineId._id,
      medicineName: b.medicineId.name,
      batchId: b._id,
      batchNo: b.batchNo,
      systemQty: b.quantity,
      physicalQty: b.quantity, // Initial default
      varianceQty: 0,
      notes: '',
    }));

    return StockAudit.create({
      tenantId,
      auditNumber,
      title: data.title,
      notes: data.notes,
      startedBy: userId,
      status: 'in_progress',
      countedItems,
    });
  }

  static async saveStockAudit(tenantId, auditId, userId, data) {
    const audit = await StockAudit.findOne({ _id: auditId, tenantId, status: 'in_progress' });
    if (!audit) {
      const error = new Error('Active stock audit not found.');
      error.statusCode = 404;
      throw error;
    }

    const updatedCounts = [];
    for (const item of data.countedItems) {
      const existing = audit.countedItems.find((ci) => ci.batchId.toString() === item.batchId.toString());
      if (existing) {
        const variance = item.physicalQty - existing.systemQty;
        updatedCounts.push({
          medicineId: existing.medicineId,
          medicineName: existing.medicineName,
          batchId: existing.batchId,
          batchNo: existing.batchNo,
          systemQty: existing.systemQty,
          physicalQty: item.physicalQty,
          varianceQty: variance,
          notes: item.notes || '',
        });

        if (data.postAdjustments && variance !== 0) {
          await MedicineBatch.findOneAndUpdate(
            { _id: item.batchId, tenantId },
            { quantity: item.physicalQty }
          );
        }
      }
    }

    audit.countedItems = updatedCounts;
    audit.status = 'completed';
    audit.completedBy = userId;
    await audit.save();

    return audit;
  }
}

module.exports = InventoryService;
