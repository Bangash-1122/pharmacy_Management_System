const express = require('express');
const router = express.Router();
const ExpensesController = require('./expenses.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { expenseSchema } = require('./expenses.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.EXPENSES, ACTIONS.VIEW), ExpensesController.list);
router.post('/', requirePermission(MODULES.EXPENSES, ACTIONS.CREATE), validate(expenseSchema), ExpensesController.create);
router.delete('/:id', requirePermission(MODULES.EXPENSES, ACTIONS.DELETE), ExpensesController.remove);

module.exports = router;
