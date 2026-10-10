const { z } = require('zod');

const updatePlanSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
});

const updateTenantStatusSchema = z.object({
  active: z.boolean(),
  reason: z.string().optional().default('Admin status update'),
});

const createSubscriptionSchema = z.object({
  tenantId: z.string().min(1, 'Tenant ID is required'),
  planId: z.string().min(1, 'Plan ID is required'),
  durationMonths: z.number().min(1).default(1),
  amount: z.number().min(0),
  paymentGateway: z.string().default('manual'),
});

module.exports = {
  updatePlanSchema,
  updateTenantStatusSchema,
  createSubscriptionSchema,
};
