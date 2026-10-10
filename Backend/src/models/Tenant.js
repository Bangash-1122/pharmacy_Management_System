const mongoose = require('mongoose');
const { SUBSCRIPTION_PLANS, SUBSCRIPTION_STATUS } = require('../config/constants');

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    pharmacyType: { type: String, default: 'Retail Pharmacy' },
    licenseNumber: { type: String, default: '' },
    taxNumber: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    logoUrl: { type: String, default: '' },
    planId: { type: String, default: SUBSCRIPTION_PLANS.FREE_TRIAL.id },
    subscriptionStatus: {
      type: String,
      enum: Object.values(SUBSCRIPTION_STATUS),
      default: SUBSCRIPTION_STATUS.TRIAL,
    },
    trialEndsAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    subscriptionEndsAt: { type: Date },
    settings: {
      currency: { type: String, default: 'PKR' },
      currencySymbol: { type: String, default: 'Rs.' },
      defaultTaxPercent: { type: Number, default: 0 },
      taxInclusive: { type: Boolean, default: false },
      invoicePrefix: { type: String, default: 'INV' },
      invoiceFooterNote: { type: String, default: 'Thank you for choosing our pharmacy. Get well soon!' },
      lowStockThresholdDefault: { type: Number, default: 10 },
      nearExpiryDaysThreshold: { type: Number, default: 60 },
      enableLoyaltyProgram: { type: Boolean, default: true },
      loyaltyPointsPerUnitSpent: { type: Number, default: 0.05 }, // 1 pt per 20 PKR
      loyaltyRedemptionValue: { type: Number, default: 1 }, // 1 pt = 1 PKR
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

tenantSchema.index({ slug: 1, subscriptionStatus: 1 });

module.exports = mongoose.model('Tenant', tenantSchema);
