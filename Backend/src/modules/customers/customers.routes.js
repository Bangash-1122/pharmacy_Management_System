const express = require('express');
const router = express.Router();
const CustomersController = require('./customers.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { customerSchema, customerPaymentSchema, adjustPointsSchema } = require('./customers.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.CUSTOMERS, ACTIONS.VIEW), CustomersController.list);
router.get('/:id', requirePermission(MODULES.CUSTOMERS, ACTIONS.VIEW), CustomersController.getById);
router.post('/', requirePermission(MODULES.CUSTOMERS, ACTIONS.CREATE), validate(customerSchema), CustomersController.create);
router.put('/:id', requirePermission(MODULES.CUSTOMERS, ACTIONS.EDIT), validate(customerSchema), CustomersController.update);
router.get('/:id/ledger', requirePermission(MODULES.CUSTOMERS, ACTIONS.VIEW_LEDGER), CustomersController.getLedger);
router.post('/:id/payments', requirePermission(MODULES.CUSTOMERS, ACTIONS.EDIT), validate(customerPaymentSchema), CustomersController.recordCreditPayment);
router.post('/:id/loyalty/adjust', requirePermission(MODULES.CUSTOMERS, ACTIONS.EDIT), validate(adjustPointsSchema), CustomersController.adjustPoints);

module.exports = router;
