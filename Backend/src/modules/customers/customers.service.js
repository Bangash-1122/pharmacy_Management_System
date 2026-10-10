const Customer = require('../../models/Customer');
const Sale = require('../../models/Sale');

class CustomersService {
  static async listCustomers(tenantId, query = {}) {
    const filter = { tenantId, active: true };
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { phone: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
      ];
    }
    if (query.customerType) filter.customerType = query.customerType;

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const customers = await Customer.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Customer.countDocuments(filter);

    return { customers, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  static async getCustomerById(tenantId, id) {
    const customer = await Customer.findOne({ _id: id, tenantId, active: true });
    if (!customer) {
      const error = new Error('Customer not found.');
      error.statusCode = 404;
      throw error;
    }
    return customer;
  }

  static async createCustomer(tenantId, data) {
    return Customer.create({ ...data, tenantId });
  }

  static async updateCustomer(tenantId, id, data) {
    const customer = await Customer.findOneAndUpdate({ _id: id, tenantId }, data, { new: true });
    if (!customer) {
      const error = new Error('Customer not found.');
      error.statusCode = 404;
      throw error;
    }
    return customer;
  }

  static async getCustomerLedger(tenantId, id) {
    const customer = await Customer.findOne({ _id: id, tenantId });
    if (!customer) {
      const error = new Error('Customer not found.');
      error.statusCode = 404;
      throw error;
    }

    const sales = await Sale.find({ tenantId, customerId: id }).sort({ createdAt: -1 });

    return {
      customer,
      currentBalance: customer.balance,
      loyaltyPoints: customer.loyaltyPoints,
      loyaltyTier: customer.loyaltyTier,
      transactions: sales.map((s) => ({
        id: s._id,
        date: s.createdAt,
        invoiceNo: s.invoiceNo,
        grandTotal: s.grandTotal,
        paidAmount: s.paidAmount,
        creditAmount: s.creditAmount,
        paymentMethod: s.paymentMethod,
      })),
    };
  }

  static async recordCreditPayment(tenantId, id, data) {
    const customer = await Customer.findOne({ _id: id, tenantId });
    if (!customer) {
      const error = new Error('Customer not found.');
      error.statusCode = 404;
      throw error;
    }

    customer.balance = Math.max(0, customer.balance - data.amount);
    await customer.save();

    return { customer, paymentRecorded: data.amount, remainingBalance: customer.balance };
  }

  static async adjustLoyaltyPoints(tenantId, id, data) {
    const customer = await Customer.findOne({ _id: id, tenantId });
    if (!customer) {
      const error = new Error('Customer not found.');
      error.statusCode = 404;
      throw error;
    }

    customer.loyaltyPoints = Math.max(0, customer.loyaltyPoints + data.points);

    // Update tier automatically based on lifetime points
    if (customer.loyaltyPoints >= 1000) customer.loyaltyTier = 'Platinum';
    else if (customer.loyaltyPoints >= 500) customer.loyaltyTier = 'Gold';
    else if (customer.loyaltyPoints >= 200) customer.loyaltyTier = 'Silver';
    else customer.loyaltyTier = 'Bronze';

    await customer.save();
    return customer;
  }
}

module.exports = CustomersService;
