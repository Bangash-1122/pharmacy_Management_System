const express = require('express');
const router = express.Router();
const SupportTicket = require('../../models/SupportTicket');
const Tenant = require('../../models/Tenant');
const ApiResponse = require('../../utils/apiResponse');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireTenant } = require('../../middleware/tenant.middleware');
const { requireRole } = require('../../middleware/rbac.middleware');
const { ROLES } = require('../../config/constants');

router.use(authenticate);

// List tickets for tenant or super admin
router.get('/', async (req, res, next) => {
  try {
    const filter = req.user.role === ROLES.SUPER_ADMIN ? {} : { tenantId: req.tenantId };
    const tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
    return ApiResponse.success(res, tickets);
  } catch (error) {
    next(error);
  }
});

// Create new ticket
router.post('/', requireTenant, async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.tenantId);
    const count = await SupportTicket.countDocuments();
    const ticketNumber = `TICK-${String(count + 1).padStart(5, '0')}`;

    const ticket = await SupportTicket.create({
      ticketNumber,
      tenantId: req.tenantId,
      pharmacyName: tenant ? tenant.name : 'Unknown Pharmacy',
      userId: req.user.id,
      userName: req.user.name,
      subject: req.body.subject,
      category: req.body.category || 'General Support',
      priority: req.body.priority || 'Medium',
      messages: [
        {
          senderId: req.user.id,
          senderName: req.user.name,
          senderRole: req.user.role,
          message: req.body.message,
        },
      ],
    });

    return ApiResponse.created(res, ticket, { message: 'Support ticket submitted' });
  } catch (error) {
    next(error);
  }
});

// Post message to ticket
router.post('/:id/messages', async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) {
      return ApiResponse.notFound(res, 'Ticket not found');
    }

    ticket.messages.push({
      senderId: req.user.id,
      senderName: req.user.name,
      senderRole: req.user.role,
      message: req.body.message,
    });

    if (req.user.role === ROLES.SUPER_ADMIN && ticket.status === 'Open') {
      ticket.status = 'In_Progress';
    }

    await ticket.save();
    return ApiResponse.success(res, ticket, { message: 'Message sent' });
  } catch (error) {
    next(error);
  }
});

// Resolve ticket
router.patch('/:id/status', async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) {
      return ApiResponse.notFound(res, 'Ticket not found');
    }

    ticket.status = req.body.status;
    if (req.body.status === 'Resolved' || req.body.status === 'Closed') {
      ticket.resolvedAt = new Date();
    }

    await ticket.save();
    return ApiResponse.success(res, ticket, { message: 'Ticket status updated' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
