const PurchasesService = require('./purchases.service');
const ApiResponse = require('../../utils/apiResponse');

class PurchasesController {
  static async createPO(req, res, next) {
    try {
      const po = await PurchasesService.createPO(req.tenantId, req.branchId, req.user, req.body);
      return ApiResponse.created(res, po, { message: 'Purchase Order created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async listPOs(req, res, next) {
    try {
      const data = await PurchasesService.listPOs(req.tenantId, req.query);
      return ApiResponse.success(res, data.pos, { pagination: data.pagination });
    } catch (error) {
      next(error);
    }
  }

  static async createGRN(req, res, next) {
    try {
      const grn = await PurchasesService.createGRN(req.tenantId, req.branchId, req.user, req.body);
      return ApiResponse.created(res, grn, { message: 'Stock received via GRN and inventory updated' });
    } catch (error) {
      next(error);
    }
  }

  static async listGRNs(req, res, next) {
    try {
      const data = await PurchasesService.listGRNs(req.tenantId, req.query);
      return ApiResponse.success(res, data.grns, { pagination: data.pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getSuggestions(req, res, next) {
    try {
      const suggestions = await PurchasesService.getLowStockSuggestions(req.tenantId);
      return ApiResponse.success(res, suggestions);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PurchasesController;
