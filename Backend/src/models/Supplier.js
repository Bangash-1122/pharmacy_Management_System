const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    contactPerson: { type: String, default: '' },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    taxRegistrationNumber: { type: String, default: '' },
    bankDetails: {
      bankName: { type: String, default: '' },
      accountTitle: { type: String, default: '' },
      accountNumber: { type: String, default: '' },
      iban: { type: String, default: '' },
    },
    creditDays: { type: Number, default: 30 },
    creditLimit: { type: Number, default: 0 },
    balance: { type: Number, default: 0 }, // Positive means pharmacy owes supplier
    rating: { type: Number, default: 5, min: 1, max: 5 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Supplier', supplierSchema);
