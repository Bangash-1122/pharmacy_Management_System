const MedicineService = require('./medicines.service');
const ApiResponse = require('../../utils/apiResponse');

class MedicineController {
  static async list(req, res, next) {
    try {
      const data = await MedicineService.listMedicines(req.tenantId, req.query);
      return ApiResponse.success(res, data.medicines, { pagination: data.pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await MedicineService.getMedicineById(req.tenantId, id);
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getByBarcode(req, res, next) {
    try {
      const { code } = req.params;
      const data = await MedicineService.findByBarcode(req.tenantId, code);
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const medicine = await MedicineService.createMedicine(req.tenantId, req.body);
      return ApiResponse.created(res, medicine, { message: 'Medicine added to catalog successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const medicine = await MedicineService.updateMedicine(req.tenantId, id, req.body);
      return ApiResponse.success(res, medicine, { message: 'Medicine updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;
      await MedicineService.deleteMedicine(req.tenantId, id);
      return ApiResponse.success(res, null, { message: 'Medicine removed from active catalog' });
    } catch (error) {
      next(error);
    }
  }

  static async bulk(req, res, next) {
    try {
      const { medicineIds, updates } = req.body;
      const result = await MedicineService.bulkUpdate(req.tenantId, medicineIds, updates);
      return ApiResponse.success(res, result, { message: 'Bulk medicine update executed successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MedicineController;
