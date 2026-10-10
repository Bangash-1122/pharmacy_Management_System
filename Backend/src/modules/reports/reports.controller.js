const ReportsService = require('./reports.service');
const ApiResponse = require('../../utils/apiResponse');

class ReportsController {
  static async getSalesSummary(req, res, next) {
    try {
      const data = await ReportsService.getSalesSummary(req.tenantId, req.query);
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getBestSellers(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const data = await ReportsService.getBestSellingMedicines(req.tenantId, limit);
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getProfitLoss(req, res, next) {
    try {
      const data = await ReportsService.getProfitAndLoss(req.tenantId, req.query);
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getDues(req, res, next) {
    try {
      const data = await ReportsService.getPendingDues(req.tenantId);
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportsController;
