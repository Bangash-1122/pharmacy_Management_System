const mongoose = require('mongoose');
const { CUSTOMER_TYPES, LOYALTY_TIERS } = require('../config/constants');

const customerSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, trim: true, default: '' },
    cnic: { type: String, trim: true, default: '' },
    address: { type: String, default: '' },
    customerType: {
      type: String,
      enum: Object.values(CUSTOMER_TYPES),
      default: CUSTOMER_TYPES.WALK_IN,
    },
    doctorName: { type: String, default: '' },
    medicalHistoryNotes: { type: String, default: '' },
    allergies: [{ type: String, trim: true }],
    loyaltyPoints: { type: Number, default: 0, min: 0 },
    loyaltyTier: {
      type: String,
      enum: Object.values(LOYALTY_TIERS),
      default: LOYALTY_TIERS.BRONZE,
    },
    balance: { type: Number, default: 0 }, // Credit ledger dues (positive means customer owes pharmacy)
    creditLimit: { type: Number, default: 0 },
    totalPurchasesCount: { type: Number, default: 0 },
    totalPurchasesAmount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

customerSchema.index({ tenantId: 1, phone: 1 });

module.exports = mongoose.model('Customer', customerSchema);
