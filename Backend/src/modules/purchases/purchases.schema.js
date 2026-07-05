import mongoose from "mongoose";

const { Schema } = mongoose;

const purchaseItemSchema = new Schema(
    {
        medicineId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
        batchNo: { type: String, required: true },
        expiryDate: { type: Date, required: true },
        qty: { type: Number, required: true },
        purchasePrice: { type: Number, required: true },
        mrp: Number,
        lineTotal: Number,
    },
    { _id: false }
);

const grnSchema = new Schema(
    {
        grnNumber: { type: String, required: true },
        receivedAt: { type: Date, default: Date.now },
        receivedBy: { type: Schema.Types.ObjectId, ref: "User" },
        items: [purchaseItemSchema],
        notes: String,
    },
    { _id: false }
);

const purchaseSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
        poNumber: { type: String, required: true },
        supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
        items: [purchaseItemSchema],
        subtotal: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        grandTotal: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ["draft", "ordered", "partial", "received", "cancelled", "returned"],
            default: "draft",
        },
        grn: grnSchema,
        orderDate: { type: Date, default: Date.now },
        expectedDate: Date,
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

purchaseSchema.index({ tenantId: 1, supplierId: 1, createdAt: -1 });
purchaseSchema.index({ tenantId: 1, poNumber: 1 }, { unique: true });

export default mongoose.model("Purchase", purchaseSchema);
