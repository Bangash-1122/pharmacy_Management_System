const Sale = require('../../models/Sale');
const Expense = require('../../models/Expense');
const GoodsReceipt = require('../../models/GoodsReceipt');
const MedicineBatch = require('../../models/MedicineBatch');
const Customer = require('../../models/Customer');
const Supplier = require('../../models/Supplier');

class ReportsService {
  static async getSalesSummary(tenantId, query = {}) {
    const filter = { tenantId, status: 'completed' };
    if (query.branchId) filter.branchId = query.branchId;
    if (query.cashierId) filter.cashierId = query.cashierId;

    if (query.startDate && query.endDate) {
      filter.createdAt = {
        $gte: new Date(query.startDate),
        $lte: new Date(new Date(query.endDate).setHours(23, 59, 59)),
      };
    }

    const sales = await Sale.find(filter);

    let totalGrossSales = 0;
    let totalDiscounts = 0;
    let totalTax = 0;
    let totalNetSales = 0;
    let totalCash = 0;
    let totalCard = 0;
    let totalOnline = 0;
    let totalCredit = 0;
    let totalItemsSold = 0;

    sales.forEach((s) => {
      totalGrossSales += s.subtotal;
      totalDiscounts += s.discountTotal;
      totalTax += s.taxTotal;
      totalNetSales += s.grandTotal;

      if (s.paymentMethod === 'cash') totalCash += s.grandTotal;
      else if (s.paymentMethod === 'card') totalCard += s.grandTotal;
      else if (s.paymentMethod === 'jazzcash' || s.paymentMethod === 'easypaisa') totalOnline += s.grandTotal;
      else if (s.paymentMethod === 'credit') totalCredit += s.grandTotal;

      s.items.forEach((item) => {
        totalItemsSold += item.quantity;
      });
    });

    return {
      invoicesCount: sales.length,
      totalGrossSales,
      totalDiscounts,
      totalTax,
      totalNetSales,
      totalItemsSold,
      paymentBreakdown: {
        cash: totalCash,
        card: totalCard,
        online: totalOnline,
        credit: totalCredit,
      },
    };
  }

  static async getBestSellingMedicines(tenantId, limit = 10) {
    const results = await Sale.aggregate([
      { $match: { tenantId, status: 'completed' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.medicineId',
          medicineName: { $first: '$items.medicineName' },
          totalQuantitySold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.subtotal' },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: limit },
    ]);

    return results;
  }

  static async getProfitAndLoss(tenantId, query = {}) {
    const filter = { tenantId, status: 'completed' };
    const expFilter = { tenantId };

    if (query.startDate && query.endDate) {
      const dateRange = {
        $gte: new Date(query.startDate),
        $lte: new Date(new Date(query.endDate).setHours(23, 59, 59)),
      };
      filter.createdAt = dateRange;
      expFilter.expenseDate = dateRange;
    }

    const sales = await Sale.find(filter);
    const expenses = await Expense.find(expFilter);

    let grossSales = 0;
    let discounts = 0;
    let taxes = 0;
    let cogs = 0; // Cost of Goods Sold

    sales.forEach((s) => {
      grossSales += s.subtotal;
      discounts += s.discountTotal;
      taxes += s.taxTotal;

      s.items.forEach((item) => {
        cogs += (item.purchasePrice || 0) * item.quantity;
      });
    });

    const netSales = grossSales - discounts;
    const grossProfit = netSales - cogs;
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = grossProfit - totalExpenses;

    return {
      revenue: {
        grossSales,
        discounts,
        netSales,
        taxes,
      },
      costOfGoodsSold: cogs,
      grossProfit,
      grossMarginPercent: netSales > 0 ? ((grossProfit / netSales) * 100).toFixed(2) : 0,
      totalExpenses,
      netProfit,
      netMarginPercent: netSales > 0 ? ((netProfit / netSales) * 100).toFixed(2) : 0,
    };
  }

  static async getPendingDues(tenantId) {
    const customerDues = await Customer.aggregate([
      { $match: { tenantId, balance: { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: '$balance' }, count: { $sum: 1 } } },
    ]);

    const supplierDues = await Supplier.aggregate([
      { $match: { tenantId, balance: { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: '$balance' }, count: { $sum: 1 } } },
    ]);

    return {
      customerReceivables: {
        totalAmount: customerDues[0]?.total || 0,
        customersCount: customerDues[0]?.count || 0,
      },
      supplierPayables: {
        totalAmount: supplierDues[0]?.total || 0,
        suppliersCount: supplierDues[0]?.count || 0,
      },
    };
  }
}

module.exports = ReportsService;
