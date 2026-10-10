const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, default: '' },
    phone: { type: String, default: '' },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    isMain: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

branchSchema.index({ tenantId: 1, code: 1 }, { unique: true });

module.exports = mongoose.model('Branch', branchSchema);
