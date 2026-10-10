const express = require('express');
const router = express.Router();
const ReportsController = require('./reports.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/sales', requirePermission(MODULES.REPORTS, ACTIONS.VIEW), ReportsController.getSalesSummary);
router.get('/best-sellers', requirePermission(MODULES.REPORTS, ACTIONS.VIEW), ReportsController.getBestSellers);
router.get('/profit-loss', requirePermission(MODULES.REPORTS, ACTIONS.VIEW_FINANCIAL), ReportsController.getProfitLoss);
router.get('/dues', requirePermission(MODULES.REPORTS, ACTIONS.VIEW_FINANCIAL), ReportsController.getDues);

module.exports = router;
