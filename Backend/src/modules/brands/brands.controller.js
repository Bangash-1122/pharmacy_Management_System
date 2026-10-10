const BrandService = require('./brands.service');
const ApiResponse = require('../../utils/apiResponse');

class BrandController {
  static async list(req, res, next) {
    try {
      const brands = await BrandService.listBrands(req.tenantId);
      return ApiResponse.success(res, brands);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const brand = await BrandService.createBrand(req.tenantId, req.body);
      return ApiResponse.created(res, brand, { message: 'Brand created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const brand = await BrandService.updateBrand(req.tenantId, id, req.body);
      return ApiResponse.success(res, brand, { message: 'Brand updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;
      await BrandService.deleteBrand(req.tenantId, id);
      return ApiResponse.success(res, null, { message: 'Brand deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BrandController;
