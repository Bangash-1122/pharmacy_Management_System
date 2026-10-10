const CustomersService = require('./customers.service');
const ApiResponse = require('../../utils/apiResponse');

class CustomersController {
  static async list(req, res, next) {
    try {
      const data = await CustomersService.listCustomers(req.tenantId, req.query);
      return ApiResponse.success(res, data.customers, { pagination: data.pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await CustomersService.getCustomerById(req.tenantId, id);
      return ApiResponse.success(res, customer);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const customer = await CustomersService.createCustomer(req.tenantId, req.body);
      return ApiResponse.created(res, customer, { message: 'Customer registered successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await CustomersService.updateCustomer(req.tenantId, id, req.body);
      return ApiResponse.success(res, customer, { message: 'Customer updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getLedger(req, res, next) {
    try {
      const { id } = req.params;
      const ledger = await CustomersService.getCustomerLedger(req.tenantId, id);
      return ApiResponse.success(res, ledger);
    } catch (error) {
      next(error);
    }
  }

  static async recordCreditPayment(req, res, next) {
    try {
      const { id } = req.params;
      const result = await CustomersService.recordCreditPayment(req.tenantId, id, req.body);
      return ApiResponse.success(res, result, { message: 'Customer payment recorded successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async adjustPoints(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await CustomersService.adjustLoyaltyPoints(req.tenantId, id, req.body);
      return ApiResponse.success(res, customer, { message: 'Loyalty points adjusted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomersController;
