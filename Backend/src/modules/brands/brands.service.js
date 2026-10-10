const Brand = require('../../models/Brand');

class BrandService {
  static async listBrands(tenantId) {
    return Brand.find({ tenantId, active: true }).sort({ name: 1 });
  }

  static async createBrand(tenantId, data) {
    return Brand.create({ ...data, tenantId });
  }

  static async updateBrand(tenantId, id, data) {
    const brand = await Brand.findOneAndUpdate({ _id: id, tenantId }, data, { new: true });
    if (!brand) {
      const error = new Error('Brand not found.');
      error.statusCode = 404;
      throw error;
    }
    return brand;
  }

  static async deleteBrand(tenantId, id) {
    const brand = await Brand.findOneAndUpdate({ _id: id, tenantId }, { active: false }, { new: true });
    if (!brand) {
      const error = new Error('Brand not found.');
      error.statusCode = 404;
      throw error;
    }
    return brand;
  }
}

module.exports = BrandService;
