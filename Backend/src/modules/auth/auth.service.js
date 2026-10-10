const Tenant = require('../../models/Tenant');
const User = require('../../models/User');
const Branch = require('../../models/Branch');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../../utils/jwt.util');
const { ROLES, SUBSCRIPTION_PLANS, SUBSCRIPTION_STATUS } = require('../../config/constants');

class AuthService {
  static async registerPharmacy(data) {
    const existingUser = await User.findOne({ email: data.email.toLowerCase() });
    if (existingUser) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 400;
      throw error;
    }

    const slug = data.pharmacyName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);

    const plan = SUBSCRIPTION_PLANS[data.planId?.toUpperCase()] || SUBSCRIPTION_PLANS.FREE_TRIAL;

    const tenant = await Tenant.create({
      name: data.pharmacyName,
      slug,
      email: data.email.toLowerCase(),
      phone: data.phone,
      pharmacyType: data.pharmacyType || 'Retail Pharmacy',
      city: data.city,
      address: data.address || '',
      planId: plan.id,
      subscriptionStatus: SUBSCRIPTION_STATUS.TRIAL,
      trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trial
    });

    // Create Main Branch
    const branch = await Branch.create({
      tenantId: tenant._id,
      name: `${data.pharmacyName} - Main Branch`,
      code: 'HQ-01',
      address: data.address || `${data.city}, Pakistan`,
      city: data.city,
      phone: data.phone,
      isMain: true,
    });

    // Create Owner User Account
    const user = await User.create({
      tenantId: tenant._id,
      branchId: branch._id,
      name: data.ownerName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      password: data.password,
      role: ROLES.PHARMACY_OWNER,
      designation: 'Pharmacy Owner',
      permissions: [{ module: '*', action: '*' }],
    });

    // Link manager
    branch.managerId = user._id;
    await branch.save();

    const tokenPayload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      tenantId: tenant._id,
      tenantName: tenant.name,
      tenantSlug: tenant.slug,
      branchId: branch._id,
      permissions: user.permissions,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: tenant._id,
        branchId: branch._id,
      },
      tenant: {
        id: tenant._id,
        name: tenant.name,
        slug: tenant.slug,
        planId: tenant.planId,
        subscriptionStatus: tenant.subscriptionStatus,
      },
      accessToken,
      refreshToken,
    };
  }

  static async login(email, password) {
    const user = await User.findOne({ email: email.toLowerCase() }).populate('tenantId branchId');
    if (!user) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    if (!user.active) {
      const error = new Error('Your user account is suspended. Please contact administrator.');
      error.statusCode = 403;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    let tenant = user.tenantId;
    if (user.role !== ROLES.SUPER_ADMIN && tenant && !tenant.active) {
      const error = new Error('Your pharmacy account is suspended. Please contact platform administrator.');
      error.statusCode = 403;
      throw error;
    }

    user.lastLogin = new Date();
    await user.save();

    const tokenPayload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      tenantId: tenant ? tenant._id : null,
      tenantName: tenant ? tenant.name : 'System Owner',
      tenantSlug: tenant ? tenant.slug : 'system',
      branchId: user.branchId ? user.branchId._id : null,
      permissions: user.permissions,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        designation: user.designation,
        tenantId: tenant ? tenant._id : null,
        branchId: user.branchId ? user.branchId._id : null,
        permissions: user.permissions,
      },
      tenant: tenant
        ? {
            id: tenant._id,
            name: tenant.name,
            slug: tenant.slug,
            planId: tenant.planId,
            subscriptionStatus: tenant.subscriptionStatus,
            settings: tenant.settings,
          }
        : null,
      accessToken,
      refreshToken,
    };
  }

  static async refresh(token) {
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      const error = new Error('Invalid or expired refresh token.');
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findById(decoded.id).populate('tenantId branchId');
    if (!user || !user.active) {
      const error = new Error('User account not found or suspended.');
      error.statusCode = 401;
      throw error;
    }

    const tokenPayload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      tenantId: user.tenantId ? user.tenantId._id : null,
      tenantName: user.tenantId ? user.tenantId.name : 'System Owner',
      tenantSlug: user.tenantId ? user.tenantId.slug : 'system',
      branchId: user.branchId ? user.branchId._id : null,
      permissions: user.permissions,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    return { accessToken, refreshToken: newRefreshToken };
  }

  static async getProfile(userId) {
    const user = await User.findById(userId).select('-password').populate('tenantId branchId');
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}

module.exports = AuthService;
