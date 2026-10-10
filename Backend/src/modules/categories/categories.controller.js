const CategoryService = require('./categories.service');
const ApiResponse = require('../../utils/apiResponse');

class CategoryController {
  static async list(req, res, next) {
    try {
      const categories = await CategoryService.listCategories(req.tenantId);
      return ApiResponse.success(res, categories);
    } catch (error) {
      next(error);
    }
  }

  static async tree(req, res, next) {
    try {
      const tree = await CategoryService.getCategoryTree(req.tenantId);
      return ApiResponse.success(res, tree);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const category = await CategoryService.createCategory(req.tenantId, req.body);
      return ApiResponse.created(res, category, { message: 'Category created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.updateCategory(req.tenantId, id, req.body);
      return ApiResponse.success(res, category, { message: 'Category updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory(req.tenantId, id);
      return ApiResponse.success(res, null, { message: 'Category deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
