const express = require('express');
const router = express.Router();
const Notification = require('../../models/Notification');
const ApiResponse = require('../../utils/apiResponse');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');

router.use(authenticate, requireTenant);

router.get('/', async (req, res, next) => {
  try {
    const notifications = await Notification.find({ tenantId: req.tenantId })
      .sort({ createdAt: -1 })
      .limit(50);
    const unreadCount = await Notification.countDocuments({ tenantId: req.tenantId, isRead: false });
    return ApiResponse.success(res, { notifications, unreadCount });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/read', async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      { isRead: true },
      { new: true }
    );
    return ApiResponse.success(res, notification);
  } catch (error) {
    next(error);
  }
});

router.post('/read-all', async (req, res, next) => {
  try {
    await Notification.updateMany({ tenantId: req.tenantId, isRead: false }, { isRead: true });
    return ApiResponse.success(res, null, { message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
