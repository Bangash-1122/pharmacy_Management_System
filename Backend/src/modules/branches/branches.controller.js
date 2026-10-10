const BranchesService = require('./branches.service');
const ApiResponse = require('../../utils/apiResponse');

class BranchesController {
  static async list(req, res, next) {
    try {
      const branches = await BranchesService.listBranches(req.tenantId);
      return ApiResponse.success(res, branches);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const branch = await BranchesService.createBranch(req.tenantId, req.body);
      return ApiResponse.created(res, branch, { message: 'Branch created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const branch = await BranchesService.updateBranch(req.tenantId, id, req.body);
      return ApiResponse.success(res, branch, { message: 'Branch updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async createTransfer(req, res, next) {
    try {
      const transfer = await BranchesService.createTransfer(req.tenantId, req.user.id, req.body);
      return ApiResponse.created(res, transfer, { message: 'Inter-branch transfer dispatched' });
    } catch (error) {
      next(error);
    }
  }

  static async receiveTransfer(req, res, next) {
    try {
      const { id } = req.params;
      const transfer = await BranchesService.receiveTransfer(req.tenantId, id, req.user.id);
      return ApiResponse.success(res, transfer, { message: 'Stock transfer received into branch' });
    } catch (error) {
      next(error);
    }
  }

  static async listTransfers(req, res, next) {
    try {
      const transfers = await BranchesService.listTransfers(req.tenantId);
      return ApiResponse.success(res, transfers);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BranchesController;
