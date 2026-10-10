const express = require('express');
const router = express.Router();
const SuppliersController = require('./suppliers.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { supplierSchema, supplierPaymentSchema } = require('./suppliers.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.SUPPLIERS, ACTIONS.VIEW), SuppliersController.list);
router.get('/:id', requirePermission(MODULES.SUPPLIERS, ACTIONS.VIEW), SuppliersController.getById);
router.post('/', requirePermission(MODULES.SUPPLIERS, ACTIONS.CREATE), validate(supplierSchema), SuppliersController.create);
router.put('/:id', requirePermission(MODULES.SUPPLIERS, ACTIONS.EDIT), validate(supplierSchema), SuppliersController.update);
router.get('/:id/ledger', requirePermission(MODULES.SUPPLIERS, ACTIONS.VIEW_LEDGER), SuppliersController.getLedger);
router.post('/:id/payments', requirePermission(MODULES.SUPPLIERS, ACTIONS.EDIT), validate(supplierPaymentSchema), SuppliersController.recordPayment);

module.exports = router;
