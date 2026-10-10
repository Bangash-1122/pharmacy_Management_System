const express = require('express');
const router = express.Router();
const BranchesController = require('./branches.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { branchSchema, createTransferSchema } = require('./branches.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.BRANCHES, ACTIONS.VIEW), BranchesController.list);
router.post('/', requirePermission(MODULES.BRANCHES, ACTIONS.CREATE), validate(branchSchema), BranchesController.create);
router.put('/:id', requirePermission(MODULES.BRANCHES, ACTIONS.EDIT), validate(branchSchema), BranchesController.update);
router.get('/transfers', requirePermission(MODULES.BRANCHES, ACTIONS.VIEW), BranchesController.listTransfers);
router.post('/transfers', requirePermission(MODULES.BRANCHES, ACTIONS.TRANSFER), validate(createTransferSchema), BranchesController.createTransfer);
router.post('/transfers/:id/receive', requirePermission(MODULES.BRANCHES, ACTIONS.RECEIVE), BranchesController.receiveTransfer);

module.exports = router;
