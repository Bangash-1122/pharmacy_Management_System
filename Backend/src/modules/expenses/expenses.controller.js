const ExpensesService = require('./expenses.service');
const ApiResponse = require('../../utils/apiResponse');

class ExpensesController {
  static async list(req, res, next) {
    try {
      const data = await ExpensesService.listExpenses(req.tenantId, req.query);
      return ApiResponse.success(res, data.expenses, { pagination: data.pagination });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const expense = await ExpensesService.createExpense(req.tenantId, req.branchId, req.user, req.body);
      return ApiResponse.created(res, expense, { message: 'Expense recorded successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;
      await ExpensesService.deleteExpense(req.tenantId, id);
      return ApiResponse.success(res, null, { message: 'Expense deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ExpensesController;
