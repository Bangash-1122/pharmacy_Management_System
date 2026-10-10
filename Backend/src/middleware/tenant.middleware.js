const ApiResponse = require('../utils/apiResponse');
const { ROLES } = require('../config/constants');

/**
 * Ensures tenant isolation by enforcing tenant_id presence and matching context.
 * Super Admin accounts can optionally supply 'x-tenant-id' header to view tenant context.
 */
const requireTenant = (req, res, next) => {
  if (req.user && req.user.role === ROLES.SUPER_ADMIN) {
    const overrideTenant = req.headers['x-tenant-id'];
    if (overrideTenant) {
      req.tenantId = overrideTenant;
    }
    return next();
  }

  const tenantId = req.user?.tenantId || req.headers['x-tenant-id'];

  if (!tenantId) {
    return ApiResponse.badRequest(res, 'Tenant context is required for this operation');
  }

  req.tenantId = tenantId;
  next();
};

module.exports = {
  requireTenant,
};
