const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true, trim: true, index: true }, // Brand name (e.g. Panadol 500mg)
    genericName: { type: String, required: true, trim: true, index: true }, // Paracetamol
    composition: { type: String, default: '' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
    subCategory: { type: String, default: '' },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    brandName: { type: String, default: '' },
    unitOfMeasure: {
      type: String,
      enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Strip', 'Box', 'Bottle', 'Sachet', 'Ointment', 'Drops', 'Inhaler', 'Other'],
      default: 'Tablet',
    },
    packingSize: { type: String, default: '1 Strip = 10 Tablets' },
    unitsPerPack: { type: Number, default: 10 },
    purchasePrice: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, required: true, min: 0 },
    mrp: { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    taxPercent: { type: Number, default: 0, min: 0, max: 100 },
    minStockLevel: { type: Number, default: 10, min: 0 },
    reorderQuantity: { type: Number, default: 50, min: 0 },
    rackLocation: { type: String, default: '' }, // Rack / Shelf / Bin (e.g., R-02-B)
    barcodes: [{ type: String, trim: true }],
    imageUrl: { type: String, default: '' },
    alternativeMedicineIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }],
    prescriptionRequired: { type: Boolean, default: false },
    narcoticFlag: { type: Boolean, default: false }, // Controlled substance
    active: { type: Boolean, default: true },
    notes: { type: String, default: '' },
    totalStock: { type: Number, default: 0 }, // Denormalized aggregated sum of all batches
  },
  { timestamps: true }
);

medicineSchema.index({ tenantId: 1, name: 'text', genericName: 'text', barcodes: 'text' });
medicineSchema.index({ tenantId: 1, barcodes: 1 });

module.exports = mongoose.model('Medicine', medicineSchema);
