const express = require('express');
const router = express.Router();
const Tenant = require('../../models/Tenant');
const ApiResponse = require('../../utils/apiResponse');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requireRole } = require('../../middleware/rbac.middleware');
const { ROLES } = require('../../config/constants');

router.use(authenticate, requireTenant);

// Get current pharmacy settings
router.get('/current', async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.tenantId);
    if (!tenant) {
      return ApiResponse.notFound(res, 'Pharmacy profile not found');
    }
    return ApiResponse.success(res, tenant);
  } catch (error) {
    next(error);
  }
});

// Update pharmacy settings (Owner / Admin only)
router.put('/settings', requireRole(ROLES.PHARMACY_OWNER, ROLES.SUPER_ADMIN), async (req, res, next) => {
  try {
    const { name, phone, city, address, licenseNumber, taxNumber, settings } = req.body;
    const updatePayload = {};
    if (name) updatePayload.name = name;
    if (phone) updatePayload.phone = phone;
    if (city) updatePayload.city = city;
    if (address) updatePayload.address = address;
    if (licenseNumber !== undefined) updatePayload.licenseNumber = licenseNumber;
    if (taxNumber !== undefined) updatePayload.taxNumber = taxNumber;
    if (settings) updatePayload.settings = settings;

    const tenant = await Tenant.findByIdAndUpdate(req.tenantId, updatePayload, { new: true });
    return ApiResponse.success(res, tenant, { message: 'Pharmacy settings updated successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
