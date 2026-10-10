const express = require('express');
const router = express.Router();
const AuditLog = require('../../models/AuditLog');
const ApiResponse = require('../../utils/apiResponse');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.AUDIT, ACTIONS.VIEW), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    const filter = { tenantId: req.tenantId };
    if (req.query.module) filter.module = req.query.module;

    const logs = await AuditLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await AuditLog.countDocuments(filter);

    return ApiResponse.success(res, logs, { pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
