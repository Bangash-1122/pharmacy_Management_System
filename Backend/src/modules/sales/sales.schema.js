import mongoose from "mongoose";

const { Schema } = mongoose;

const saleItemSchema = new Schema(
    {
        medicineId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
        batchId: Schema.Types.ObjectId,
        name: String,
        qty: { type: Number, required: true },
        unit: String,
        salePrice: Number,
        discount: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        lineTotal: Number,
    },
    { _id: false }
);

const saleSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
        invoiceNo: { type: String, required: true },
        customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
        items: [saleItemSchema],
        subtotal: Number,
        discount: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        grandTotal: { type: Number, required: true },
        payments: [
            {
                method: String,
                amount: Number,
                ref: String,
            },
        ],
        status: {
            type: String,
            enum: ["paid", "void", "returned"],
            default: "paid",
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

saleSchema.index({ tenantId: 1, createdAt: -1 });
saleSchema.index({ tenantId: 1, invoiceNo: 1 }, { unique: true });
saleSchema.index({ tenantId: 1, customerId: 1, createdAt: -1 });

export default mongoose.model("Sale", saleSchema);
