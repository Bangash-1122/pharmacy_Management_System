const ApiResponse = require('../utils/apiResponse');
const { ROLES } = require('../config/constants');

/**
 * Role-Based Access Control Middleware
 * Supports checking roles or granular permission mappings
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }

    if (req.user.role === ROLES.SUPER_ADMIN) {
      return next(); // Super admin bypasses all role restrictions
    }

    if (!allowedRoles.includes(req.user.role)) {
      return ApiResponse.forbidden(res, `Access denied. Requires one of roles: ${allowedRoles.join(', ')}`);
    }

    next();
  };
};

/**
 * Granular Permission Checker
 * @param {string} module - Name of module (e.g. 'medicines', 'sales')
 * @param {string} action - Action (e.g. 'view', 'create', 'edit', 'delete')
 */
const requirePermission = (moduleName, action) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }

    if (req.user.role === ROLES.SUPER_ADMIN || req.user.role === ROLES.PHARMACY_OWNER) {
      return next(); // Owners and Super Admin have full module authority
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = userPermissions.some(
      (p) => (p.module === moduleName || p.module === '*') && (p.action === action || p.action === '*')
    );

    if (!hasPermission) {
      return ApiResponse.forbidden(res, `Insufficient permission to perform '${action}' on '${moduleName}'`);
    }

    next();
  };
};

module.exports = {
  requireRole,
  requirePermission,
};
