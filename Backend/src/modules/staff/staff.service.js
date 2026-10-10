const User = require('../../models/User');

class StaffService {
  static async listStaff(tenantId) {
    return User.find({ tenantId }).select('-password').populate('branchId');
  }

  static async createStaff(tenantId, data) {
    const existing = await User.findOne({ email: data.email.toLowerCase() });
    if (existing) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({
      ...data,
      email: data.email.toLowerCase(),
      tenantId,
    });

    const sanitized = user.toObject();
    delete sanitized.password;
    return sanitized;
  }

  static async updatePermissions(tenantId, userId, permissions) {
    const user = await User.findOneAndUpdate(
      { _id: userId, tenantId },
      { permissions },
      { new: true }
    ).select('-password');

    if (!user) {
      const error = new Error('Staff user not found.');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  static async toggleStatus(tenantId, userId, active) {
    const user = await User.findOneAndUpdate(
      { _id: userId, tenantId },
      { active },
      { new: true }
    ).select('-password');

    if (!user) {
      const error = new Error('Staff user not found.');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }
}

module.exports = StaffService;
