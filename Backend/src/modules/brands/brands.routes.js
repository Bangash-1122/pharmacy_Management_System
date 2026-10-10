const express = require('express');
const router = express.Router();
const BrandController = require('./brands.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.MEDICINES, ACTIONS.VIEW), BrandController.list);
router.post('/', requirePermission(MODULES.MEDICINES, ACTIONS.CREATE), BrandController.create);
router.put('/:id', requirePermission(MODULES.MEDICINES, ACTIONS.EDIT), BrandController.update);
router.delete('/:id', requirePermission(MODULES.MEDICINES, ACTIONS.DELETE), BrandController.remove);

module.exports = router;
