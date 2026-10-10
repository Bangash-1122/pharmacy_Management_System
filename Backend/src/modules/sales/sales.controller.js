const SalesService = require('./sales.service');
const ApiResponse = require('../../utils/apiResponse');

class SalesController {
  static async checkout(req, res, next) {
    try {
      const sale = await SalesService.createSale(req.tenantId, req.branchId, req.user, req.body);
      return ApiResponse.created(res, sale, { message: 'Sale invoice finalized successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const data = await SalesService.listSales(req.tenantId, req.query);
      return ApiResponse.success(res, data.sales, { pagination: data.pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const sale = await SalesService.getSaleById(req.tenantId, id);
      return ApiResponse.success(res, sale);
    } catch (error) {
      next(error);
    }
  }

  static async processReturn(req, res, next) {
    try {
      const saleReturn = await SalesService.returnSale(req.tenantId, req.branchId, req.user, req.body);
      return ApiResponse.success(res, saleReturn, { message: 'Sales return and stock adjustment completed' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SalesController;
