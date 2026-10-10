const SuppliersService = require('./suppliers.service');
const ApiResponse = require('../../utils/apiResponse');

class SuppliersController {
  static async list(req, res, next) {
    try {
      const suppliers = await SuppliersService.listSuppliers(req.tenantId, req.query);
      return ApiResponse.success(res, suppliers);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const supplier = await SuppliersService.getSupplierById(req.tenantId, id);
      return ApiResponse.success(res, supplier);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const supplier = await SuppliersService.createSupplier(req.tenantId, req.body);
      return ApiResponse.created(res, supplier, { message: 'Supplier created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const supplier = await SuppliersService.updateSupplier(req.tenantId, id, req.body);
      return ApiResponse.success(res, supplier, { message: 'Supplier updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getLedger(req, res, next) {
    try {
      const { id } = req.params;
      const ledger = await SuppliersService.getSupplierLedger(req.tenantId, id);
      return ApiResponse.success(res, ledger);
    } catch (error) {
      next(error);
    }
  }

  static async recordPayment(req, res, next) {
    try {
      const { id } = req.params;
      const result = await SuppliersService.recordPayment(req.tenantId, id, req.body);
      return ApiResponse.success(res, result, { message: 'Supplier payment recorded successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SuppliersController;
