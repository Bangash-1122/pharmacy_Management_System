const express = require('express');
const router = express.Router();
const CategoryController = require('./categories.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { categorySchema } = require('./categories.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.MEDICINES, ACTIONS.VIEW), CategoryController.list);
router.get('/tree', requirePermission(MODULES.MEDICINES, ACTIONS.VIEW), CategoryController.tree);
router.post('/', requirePermission(MODULES.MEDICINES, ACTIONS.CREATE), validate(categorySchema), CategoryController.create);
router.put('/:id', requirePermission(MODULES.MEDICINES, ACTIONS.EDIT), validate(categorySchema), CategoryController.update);
router.delete('/:id', requirePermission(MODULES.MEDICINES, ACTIONS.DELETE), CategoryController.remove);

module.exports = router;
