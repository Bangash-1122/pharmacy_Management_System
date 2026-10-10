const mongoose = require('mongoose');
const { SUBSCRIPTION_PLANS, SUBSCRIPTION_STATUS } = require('../config/constants');

const subscriptionSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    planId: { type: String, required: true },
    planName: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'PKR' },
    billingInterval: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    status: {
      type: String,
      enum: Object.values(SUBSCRIPTION_STATUS),
      default: SUBSCRIPTION_STATUS.ACTIVE,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    paymentGateway: { type: String, enum: ['stripe', 'jazzcash', 'easypaisa', 'manual'], default: 'manual' },
    transactionId: { type: String, default: '' },
    invoiceUrl: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
