const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const superAdminRoutes = require('../modules/superAdmin/superAdmin.routes');
const medicinesRoutes = require('../modules/medicines/medicines.routes');
const categoriesRoutes = require('../modules/categories/categories.routes');
const brandsRoutes = require('../modules/brands/brands.routes');
const inventoryRoutes = require('../modules/inventory/inventory.routes');
const salesRoutes = require('../modules/sales/sales.routes');
const purchasesRoutes = require('../modules/purchases/purchases.routes');
const suppliersRoutes = require('../modules/suppliers/suppliers.routes');
const customersRoutes = require('../modules/customers/customers.routes');
const branchesRoutes = require('../modules/branches/branches.routes');
const expensesRoutes = require('../modules/expenses/expenses.routes');
const reportsRoutes = require('../modules/reports/reports.routes');
const staffRoutes = require('../modules/staff/staff.routes');
const notificationsRoutes = require('../modules/notifications/notifications.routes');
const supportRoutes = require('../modules/support/support.routes');
const auditRoutes = require('../modules/audit/audit.routes');
const tenantsRoutes = require('../modules/tenants/tenants.routes');

// Mount Modules
router.use('/auth', authRoutes);
router.use('/admin', superAdminRoutes);
router.use('/medicines', medicinesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/brands', brandsRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/sales', salesRoutes);
router.use('/purchases', purchasesRoutes);
router.use('/suppliers', suppliersRoutes);
router.use('/customers', customersRoutes);
router.use('/branches', branchesRoutes);
router.use('/expenses', expensesRoutes);
router.use('/reports', reportsRoutes);
router.use('/staff', staffRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/support', supportRoutes);
router.use('/audit', auditRoutes);
router.use('/tenants', tenantsRoutes);

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Pharmacy Management System Enterprise API (v3.0)',
  });
});

module.exports = router;
