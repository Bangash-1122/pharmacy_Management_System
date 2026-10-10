const express = require('express');
const router = express.Router();
const InventoryController = require('./inventory.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { stockAdjustmentSchema, stockAuditStartSchema, stockAuditSaveSchema } = require('./inventory.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/overview', requirePermission(MODULES.INVENTORY, ACTIONS.VIEW), InventoryController.getOverview);
router.get('/expiry-radar', requirePermission(MODULES.INVENTORY, ACTIONS.VIEW), InventoryController.getExpiryRadar);
router.post('/adjust', requirePermission(MODULES.INVENTORY, ACTIONS.ADJUST), validate(stockAdjustmentSchema), InventoryController.adjust);
router.post('/audit/start', requirePermission(MODULES.INVENTORY, ACTIONS.COUNT), validate(stockAuditStartSchema), InventoryController.startAudit);
router.post('/audit/:id/save', requirePermission(MODULES.INVENTORY, ACTIONS.COUNT), validate(stockAuditSaveSchema), InventoryController.saveAudit);

module.exports = router;
