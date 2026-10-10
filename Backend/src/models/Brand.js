const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true, trim: true },
    country: { type: String, default: 'Pakistan' },
    contactEmail: { type: String, default: '' },
    contactPhone: { type: String, default: '' },
    logoUrl: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

brandSchema.index({ tenantId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Brand', brandSchema);
