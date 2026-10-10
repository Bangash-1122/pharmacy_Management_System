const express = require('express');
const router = express.Router();
const SuperAdminController = require('./superAdmin.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireRole } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { updatePlanSchema, updateTenantStatusSchema } = require('./superAdmin.schema');
const { ROLES } = require('../../config/constants');

// Super Admin exclusive routes
router.use(authenticate, requireRole(ROLES.SUPER_ADMIN));

router.get('/metrics', SuperAdminController.getMetrics);
router.get('/pharmacies', SuperAdminController.listPharmacies);
router.patch('/pharmacies/:id/status', validate(updateTenantStatusSchema), SuperAdminController.updateStatus);
router.patch('/pharmacies/:id/plan', validate(updatePlanSchema), SuperAdminController.forcePlan);
router.post('/pharmacies/:id/impersonate', SuperAdminController.impersonate);

module.exports = router;
