const StaffService = require('./staff.service');
const ApiResponse = require('../../utils/apiResponse');

class StaffController {
  static async list(req, res, next) {
    try {
      const staff = await StaffService.listStaff(req.tenantId);
      return ApiResponse.success(res, staff);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const user = await StaffService.createStaff(req.tenantId, req.body);
      return ApiResponse.created(res, user, { message: 'Staff member account created' });
    } catch (error) {
      next(error);
    }
  }

  static async updatePermissions(req, res, next) {
    try {
      const { id } = req.params;
      const user = await StaffService.updatePermissions(req.tenantId, id, req.body.permissions);
      return ApiResponse.success(res, user, { message: 'Permissions updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async toggleStatus(req, res, next) {
    try {
      const { id } = req.params;
      const user = await StaffService.toggleStatus(req.tenantId, id, req.body.active);
      return ApiResponse.success(res, user, { message: 'Staff status updated' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StaffController;
