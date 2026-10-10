const Supplier = require('../../models/Supplier');
const GoodsReceipt = require('../../models/GoodsReceipt');

class SuppliersService {
  static async listSuppliers(tenantId, query = {}) {
    const filter = { tenantId, active: true };
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { companyName: { $regex: query.search, $options: 'i' } },
        { phone: { $regex: query.search, $options: 'i' } },
      ];
    }
    return Supplier.find(filter).sort({ name: 1 });
  }

  static async getSupplierById(tenantId, id) {
    const supplier = await Supplier.findOne({ _id: id, tenantId, active: true });
    if (!supplier) {
      const error = new Error('Supplier not found.');
      error.statusCode = 404;
      throw error;
    }
    return supplier;
  }

  static async createSupplier(tenantId, data) {
    return Supplier.create({ ...data, tenantId });
  }

  static async updateSupplier(tenantId, id, data) {
    const supplier = await Supplier.findOneAndUpdate({ _id: id, tenantId }, data, { new: true });
    if (!supplier) {
      const error = new Error('Supplier not found.');
      error.statusCode = 404;
      throw error;
    }
    return supplier;
  }

  static async getSupplierLedger(tenantId, id) {
    const supplier = await Supplier.findOne({ _id: id, tenantId });
    if (!supplier) {
      const error = new Error('Supplier not found.');
      error.statusCode = 404;
      throw error;
    }

    const grns = await GoodsReceipt.find({ tenantId, supplierId: id }).sort({ createdAt: -1 });

    return {
      supplier,
      currentBalance: supplier.balance,
      transactions: grns.map((g) => ({
        id: g._id,
        date: g.receivedDate || g.createdAt,
        type: 'GRN Invoice',
        reference: g.grnNumber,
        invoiceNo: g.supplierInvoiceNo,
        totalAmount: g.totalAmount,
        paidAmount: g.paidAmount,
        balanceAmount: g.balanceAmount,
      })),
    };
  }

  static async recordPayment(tenantId, id, data) {
    const supplier = await Supplier.findOne({ _id: id, tenantId });
    if (!supplier) {
      const error = new Error('Supplier not found.');
      error.statusCode = 404;
      throw error;
    }

    supplier.balance = Math.max(0, supplier.balance - data.amount);
    await supplier.save();

    return {
      supplier,
      paymentRecorded: data.amount,
      remainingBalance: supplier.balance,
    };
  }
}

module.exports = SuppliersService;
