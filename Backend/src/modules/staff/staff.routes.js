const express = require('express');
const router = express.Router();
const StaffController = require('./staff.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { createStaffSchema, updatePermissionsSchema } = require('./staff.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.STAFF, ACTIONS.VIEW), StaffController.list);
router.post('/', requirePermission(MODULES.STAFF, ACTIONS.CREATE), validate(createStaffSchema), StaffController.create);
router.put('/:id/permissions', requirePermission(MODULES.STAFF, ACTIONS.EDIT), validate(updatePermissionsSchema), StaffController.updatePermissions);
router.patch('/:id/status', requirePermission(MODULES.STAFF, ACTIONS.EDIT), StaffController.toggleStatus);

module.exports = router;
