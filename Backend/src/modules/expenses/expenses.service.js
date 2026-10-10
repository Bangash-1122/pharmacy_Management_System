const Expense = require('../../models/Expense');

class ExpensesService {
  static async listExpenses(tenantId, query = {}) {
    const filter = { tenantId };
    if (query.category) filter.category = query.category;
    if (query.branchId) filter.branchId = query.branchId;
    if (query.startDate && query.endDate) {
      filter.expenseDate = {
        $gte: new Date(query.startDate),
        $lte: new Date(new Date(query.endDate).setHours(23, 59, 59)),
      };
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const expenses = await Expense.find(filter)
      .populate('createdById')
      .sort({ expenseDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Expense.countDocuments(filter);

    return { expenses, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  static async createExpense(tenantId, branchId, user, data) {
    const count = await Expense.countDocuments({ tenantId });
    const expenseNumber = `EXP-${Date.now().toString().slice(-6)}`;

    return Expense.create({
      tenantId,
      branchId,
      expenseNumber,
      category: data.category,
      amount: data.amount,
      description: data.description,
      paymentMethod: data.paymentMethod,
      receiptUrl: data.receiptUrl || '',
      expenseDate: data.expenseDate ? new Date(data.expenseDate) : new Date(),
      isRecurring: data.isRecurring || false,
      createdById: user.id,
      status: 'approved',
    });
  }

  static async deleteExpense(tenantId, id) {
    const expense = await Expense.findOneAndDelete({ _id: id, tenantId });
    if (!expense) {
      const error = new Error('Expense not found.');
      error.statusCode = 404;
      throw error;
    }
    return expense;
  }
}

module.exports = ExpensesService;
