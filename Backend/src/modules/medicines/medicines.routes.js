const express = require('express');
const router = express.Router();
const MedicineController = require('./medicines.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requirePermission } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { medicineSchema, bulkUpdateSchema } = require('./medicines.schema');
const { MODULES, ACTIONS } = require('../../config/constants');

router.use(authenticate, requireTenant);

router.get('/', requirePermission(MODULES.MEDICINES, ACTIONS.VIEW), MedicineController.list);
router.get('/barcode/:code', requirePermission(MODULES.MEDICINES, ACTIONS.VIEW), MedicineController.getByBarcode);
router.get('/:id', requirePermission(MODULES.MEDICINES, ACTIONS.VIEW), MedicineController.getById);
router.post('/', requirePermission(MODULES.MEDICINES, ACTIONS.CREATE), validate(medicineSchema), MedicineController.create);
router.put('/:id', requirePermission(MODULES.MEDICINES, ACTIONS.EDIT), validate(medicineSchema), MedicineController.update);
router.delete('/:id', requirePermission(MODULES.MEDICINES, ACTIONS.DELETE), MedicineController.remove);
router.post('/bulk-update', requirePermission(MODULES.MEDICINES, ACTIONS.EDIT), validate(bulkUpdateSchema), MedicineController.bulk);

module.exports = router;
