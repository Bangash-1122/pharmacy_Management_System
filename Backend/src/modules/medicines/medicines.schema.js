import mongoose from "mongoose";

const { Schema } = mongoose;

const batchSchema = new Schema(
    {
        batchNo: { type: String, required: true },
        mfgDate: Date,
        expiryDate: { type: Date, required: true, index: true },
        supplierId: { type: Schema.Types.ObjectId, ref: "Supplier" },
        purchasePrice: { type: Number, required: true },
        qty: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { _id: true }
);

const medicineSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        name: { type: String, required: true, trim: true },
        genericName: { type: String, trim: true },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        barcodes: [String],
        salePrice: { type: Number, required: true },
        mrp: Number,
        taxPct: { type: Number, default: 0 },
        minStock: { type: Number, default: 5 },
        batches: [batchSchema],
        prescriptionRequired: { type: Boolean, default: false },
        isNarcotic: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

medicineSchema.index({ tenantId: 1, name: "text", genericName: "text" });
medicineSchema.index({ tenantId: 1, barcodes: 1 });
medicineSchema.index({ tenantId: 1, "batches.expiryDate": 1 });

export default mongoose.model("Medicine", medicineSchema);
