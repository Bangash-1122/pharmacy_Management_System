const express = require('express');
const router = express.Router();
const SalesController = require('./sales.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { createSaleSchema, returnSaleSchema } = require('./sales.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.SALES, ACTIONS.VIEW), SalesController.list);
router.get('/:id', requirePermission(MODULES.SALES, ACTIONS.VIEW), SalesController.getById);
router.post('/checkout', requirePermission(MODULES.SALES, ACTIONS.CREATE), validate(createSaleSchema), SalesController.checkout);
router.post('/return', requirePermission(MODULES.SALES, ACTIONS.RETURN), validate(returnSaleSchema), SalesController.processReturn);

module.exports = router;
