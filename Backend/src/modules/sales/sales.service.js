const Sale = require('../../models/Sale');
const SaleReturn = require('../../models/SaleReturn');
const Medicine = require('../../models/Medicine');
const MedicineBatch = require('../../models/MedicineBatch');
const Customer = require('../../models/Customer');
const Tenant = require('../../models/Tenant');
const { generateInvoiceNumber } = require('../../utils/barcode.util');
const { PAYMENT_METHODS } = require('../../config/constants');

class SalesService {
  static async createSale(tenantId, branchId, cashier, data) {
    const tenant = await Tenant.findById(tenantId);
    const resolvedItems = [];
    let subtotal = 0;
    let itemDiscountTotal = 0;
    let taxTotal = 0;

    // Process each item with FEFO allocation
    for (const item of data.items) {
      const medicine = await Medicine.findOne({ _id: item.medicineId, tenantId, active: true });
      if (!medicine) {
        const error = new Error(`Medicine not found for ID: ${item.medicineId}`);
        error.statusCode = 404;
        throw error;
      }

      let remainingQtyNeeded = item.quantity;

      // Find eligible batches sorted by earliest expiry date (FEFO)
      const batchQuery = {
        tenantId,
        medicineId: medicine._id,
        active: true,
        quantity: { $gt: 0 },
        expiryDate: { $gt: new Date() }, // Exclude expired batches from auto-selection
      };

      if (item.batchId) {
        batchQuery._id = item.batchId;
      }

      const availableBatches = await MedicineBatch.find(batchQuery).sort({ expiryDate: 1 });

      const totalBatchStock = availableBatches.reduce((sum, b) => sum + b.quantity, 0);
      if (totalBatchStock < remainingQtyNeeded) {
        const error = new Error(
          `Insufficient non-expired stock for "${medicine.name}". Requested: ${remainingQtyNeeded}, Available: ${totalBatchStock}`
        );
        error.statusCode = 400;
        throw error;
      }

      for (const batch of availableBatches) {
        if (remainingQtyNeeded <= 0) break;

        const qtyFromThisBatch = Math.min(batch.quantity, remainingQtyNeeded);
        const unitPrice = item.unitPrice || medicine.salePrice;
        const lineGross = qtyFromThisBatch * unitPrice;
        const discountAmt = (lineGross * (item.discountPercent || 0)) / 100;
        const taxable = lineGross - discountAmt;
        const taxAmt = (taxable * (item.taxPercent || 0)) / 100;
        const lineSubtotal = taxable + taxAmt;

        resolvedItems.push({
          medicineId: medicine._id,
          medicineName: medicine.name,
          batchId: batch._id,
          batchNo: batch.batchNo,
          expiryDate: batch.expiryDate,
          quantity: qtyFromThisBatch,
          unitPrice,
          purchasePrice: batch.purchasePrice,
          discountPercent: item.discountPercent || 0,
          discountAmount: discountAmt,
          taxPercent: item.taxPercent || 0,
          taxAmount: taxAmt,
          subtotal: lineSubtotal,
        });

        subtotal += lineGross;
        itemDiscountTotal += discountAmt;
        taxTotal += taxAmt;

        // Decrement Batch stock
        batch.quantity -= qtyFromThisBatch;
        await batch.save();

        remainingQtyNeeded -= qtyFromThisBatch;
      }

      // Update aggregate medicine stock
      medicine.totalStock = Math.max(0, medicine.totalStock - item.quantity);
      await medicine.save();
    }

    // Loyalty redemption calculation
    let loyaltyDiscount = 0;
    let customer = null;
    if (data.customerId) {
      customer = await Customer.findOne({ _id: data.customerId, tenantId });
      if (customer && data.loyaltyPointsToRedeem > 0) {
        const pointsToRedeem = Math.min(customer.loyaltyPoints, data.loyaltyPointsToRedeem);
        const ptValue = tenant?.settings?.loyaltyRedemptionValue || 1;
        loyaltyDiscount = pointsToRedeem * ptValue;
        customer.loyaltyPoints -= pointsToRedeem;
      }
    }

    const totalDiscount = itemDiscountTotal + (data.invoiceDiscount || 0) + loyaltyDiscount;
    const grandTotal = Math.max(0, subtotal - totalDiscount + taxTotal);

    let creditAmount = 0;
    if (data.paymentMethod === PAYMENT_METHODS.CREDIT) {
      creditAmount = grandTotal;
      if (customer) {
        customer.balance += grandTotal;
      }
    } else if (data.paidAmount < grandTotal) {
      creditAmount = grandTotal - data.paidAmount;
      if (customer) {
        customer.balance += creditAmount;
      }
    }

    // Loyalty points earning
    let loyaltyPointsEarned = 0;
    if (customer && tenant?.settings?.enableLoyaltyProgram) {
      const earnRate = tenant.settings.loyaltyPointsPerUnitSpent || 0.05;
      loyaltyPointsEarned = Math.floor(grandTotal * earnRate);
      customer.loyaltyPoints += loyaltyPointsEarned;
      customer.totalPurchasesCount += 1;
      customer.totalPurchasesAmount += grandTotal;
      await customer.save();
    }

    const count = await Sale.countDocuments({ tenantId });
    const invoiceNo = generateInvoiceNumber(tenant?.settings?.invoicePrefix || 'INV', count + 1);

    const sale = await Sale.create({
      tenantId,
      branchId,
      invoiceNo,
      customerId: customer ? customer._id : null,
      customerName: customer ? customer.name : data.customerName || 'Walk-in Customer',
      customerPhone: customer ? customer.phone : data.customerPhone || '',
      cashierId: cashier.id,
      cashierName: cashier.name,
      items: resolvedItems,
      subtotal,
      discountTotal: totalDiscount,
      taxTotal,
      grandTotal,
      paidAmount: data.paidAmount,
      changeAmount: Math.max(0, data.paidAmount - grandTotal),
      creditAmount,
      loyaltyPointsEarned,
      loyaltyPointsRedeemed: data.loyaltyPointsToRedeem || 0,
      loyaltyDiscount,
      paymentMethod: data.paymentMethod,
      splitPayments: data.splitPayments || [],
      prescriptionUrl: data.prescriptionUrl || '',
      notes: data.notes || '',
      status: 'completed',
    });

    return sale;
  }

  static async listSales(tenantId, query = {}) {
    const filter = { tenantId };
    if (query.customerId) filter.customerId = query.customerId;
    if (query.cashierId) filter.cashierId = query.cashierId;
    if (query.branchId) filter.branchId = query.branchId;
    if (query.paymentMethod) filter.paymentMethod = query.paymentMethod;
    if (query.startDate && query.endDate) {
      filter.createdAt = {
        $gte: new Date(query.startDate),
        $lte: new Date(new Date(query.endDate).setHours(23, 59, 59)),
      };
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const sales = await Sale.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Sale.countDocuments(filter);

    return {
      sales,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getSaleById(tenantId, id) {
    const sale = await Sale.findOne({ _id: id, tenantId })
      .populate('customerId cashierId branchId');
    if (!sale) {
      const error = new Error('Sale invoice not found.');
      error.statusCode = 404;
      throw error;
    }
    return sale;
  }

  static async returnSale(tenantId, branchId, cashier, data) {
    const originalSale = await Sale.findOne({ _id: data.saleId, tenantId });
    if (!originalSale) {
      const error = new Error('Original sale invoice not found.');
      error.statusCode = 404;
      throw error;
    }

    let totalRefund = 0;
    const returnItems = [];

    for (const item of data.items) {
      const saleLine = originalSale.items.find((si) => si.batchId.toString() === item.batchId.toString());
      if (!saleLine) continue;

      const refundSubtotal = item.quantity * (item.unitPrice || saleLine.unitPrice);
      totalRefund += refundSubtotal;

      returnItems.push({
        medicineId: item.medicineId,
        medicineName: saleLine.medicineName,
        batchId: item.batchId,
        batchNo: saleLine.batchNo,
        quantity: item.quantity,
        unitPrice: item.unitPrice || saleLine.unitPrice,
        refundSubtotal,
        reason: item.reason,
        returnToStock: item.returnToStock,
      });

      if (item.returnToStock) {
        // Return back to batch stock
        await MedicineBatch.findOneAndUpdate(
          { _id: item.batchId, tenantId },
          { $inc: { quantity: item.quantity } }
        );
        await Medicine.findOneAndUpdate(
          { _id: item.medicineId, tenantId },
          { $inc: { totalStock: item.quantity } }
        );
      }
    }

    const returnInvoiceNo = `RET-${Date.now().toString().slice(-6)}`;
    const saleReturn = await SaleReturn.create({
      tenantId,
      branchId,
      returnInvoiceNo,
      originalSaleId: originalSale._id,
      originalInvoiceNo: originalSale.invoiceNo,
      customerId: originalSale.customerId,
      cashierId: cashier.id,
      items: returnItems,
      totalRefundAmount: totalRefund,
      refundMethod: data.refundMethod,
      notes: data.notes || '',
    });

    return saleReturn;
  }
}

module.exports = SalesService;
