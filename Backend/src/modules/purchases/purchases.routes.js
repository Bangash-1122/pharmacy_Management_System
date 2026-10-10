const express = require('express');
const router = express.Router();
const PurchasesController = require('./purchases.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { createPOSchema, createGRNSchema } = require('./purchases.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/orders', requirePermission(MODULES.PURCHASES, ACTIONS.VIEW), PurchasesController.listPOs);
router.post('/orders', requirePermission(MODULES.PURCHASES, ACTIONS.CREATE), validate(createPOSchema), PurchasesController.createPO);
router.get('/grn', requirePermission(MODULES.PURCHASES, ACTIONS.VIEW), PurchasesController.listGRNs);
router.post('/grn', requirePermission(MODULES.PURCHASES, ACTIONS.RECEIVE), validate(createGRNSchema), PurchasesController.createGRN);
router.get('/suggestions', requirePermission(MODULES.PURCHASES, ACTIONS.VIEW), PurchasesController.getSuggestions);

module.exports = router;
