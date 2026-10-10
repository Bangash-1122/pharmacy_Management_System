const InventoryService = require('./inventory.service');
const ApiResponse = require('../../utils/apiResponse');

class InventoryController {
  static async getOverview(req, res, next) {
    try {
      const data = await InventoryService.getInventoryOverview(req.tenantId, req.query);
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getExpiryRadar(req, res, next) {
    try {
      const data = await InventoryService.getExpiryRadar(req.tenantId, req.query.branchId);
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async adjust(req, res, next) {
    try {
      const data = await InventoryService.adjustStock(req.tenantId, req.user.id, req.body);
      return ApiResponse.success(res, data, { message: 'Stock adjustment posted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async startAudit(req, res, next) {
    try {
      const audit = await InventoryService.startStockAudit(req.tenantId, req.user.id, req.body);
      return ApiResponse.created(res, audit, { message: 'Physical inventory count started' });
    } catch (error) {
      next(error);
    }
  }

  static async saveAudit(req, res, next) {
    try {
      const { id } = req.params;
      const audit = await InventoryService.saveStockAudit(req.tenantId, id, req.user.id, req.body);
      return ApiResponse.success(res, audit, { message: 'Physical count reconciled and closed' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InventoryController;
