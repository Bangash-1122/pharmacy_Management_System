const SuperAdminService = require('./superAdmin.service');
const ApiResponse = require('../../utils/apiResponse');

class SuperAdminController {
  static async getMetrics(req, res, next) {
    try {
      const data = await SuperAdminService.getDashboardMetrics();
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async listPharmacies(req, res, next) {
    try {
      const data = await SuperAdminService.listPharmacies(req.query);
      return ApiResponse.success(res, data.tenants, { pagination: data.pagination });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { active, reason } = req.body;
      const tenant = await SuperAdminService.updatePharmacyStatus(id, active, reason);
      return ApiResponse.success(res, tenant, { message: 'Pharmacy status updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async forcePlan(req, res, next) {
    try {
      const { id } = req.params;
      const { planId } = req.body;
      const tenant = await SuperAdminService.forcePlanChange(id, planId);
      return ApiResponse.success(res, tenant, { message: 'Subscription plan overridden successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async impersonate(req, res, next) {
    try {
      const { id } = req.params;
      const result = await SuperAdminService.impersonatePharmacy(id);
      return ApiResponse.success(res, result, { message: 'Impersonation session initialized' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SuperAdminController;
