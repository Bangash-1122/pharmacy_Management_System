const Category = require('../../models/Category');

class CategoryService {
  static async listCategories(tenantId) {
    return Category.find({ tenantId, active: true }).sort({ name: 1 });
  }

  static async getCategoryTree(tenantId) {
    const categories = await Category.find({ tenantId, active: true }).lean();
    const map = {};
    const tree = [];

    categories.forEach((cat) => {
      map[cat._id] = { ...cat, children: [] };
    });

    categories.forEach((cat) => {
      if (cat.parentId && map[cat.parentId]) {
        map[cat.parentId].children.push(map[cat._id]);
      } else {
        tree.push(map[cat._id]);
      }
    });

    return tree;
  }

  static async createCategory(tenantId, data) {
    return Category.create({ ...data, tenantId });
  }

  static async updateCategory(tenantId, id, data) {
    const category = await Category.findOneAndUpdate({ _id: id, tenantId }, data, { new: true });
    if (!category) {
      const error = new Error('Category not found.');
      error.statusCode = 404;
      throw error;
    }
    return category;
  }

  static async deleteCategory(tenantId, id) {
    const category = await Category.findOneAndUpdate({ _id: id, tenantId }, { active: false }, { new: true });
    if (!category) {
      const error = new Error('Category not found.');
      error.statusCode = 404;
      throw error;
    }
    return category;
  }
}

module.exports = CategoryService;
