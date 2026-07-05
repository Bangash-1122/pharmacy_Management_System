import mongoose from "mongoose";

const { Schema } = mongoose;

const branchSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        name: { type: String, required: true, trim: true },
        code: String,
        phone: String,
        email: String,
        address: String,
        isMain: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

branchSchema.index({ tenantId: 1, name: 1 }, { unique: true });

const transferItemSchema = new Schema(
    {
        medicineId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
        batchId: { type: Schema.Types.ObjectId, required: true },
        qty: { type: Number, required: true },
    },
    { _id: false }
);

const branchTransferSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        transferNo: { type: String, required: true },
        fromBranchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
        toBranchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
        items: [transferItemSchema],
        status: {
            type: String,
            enum: ["pending", "in_transit", "received", "cancelled"],
            default: "pending",
        },
        notes: String,
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        receivedBy: { type: Schema.Types.ObjectId, ref: "User" },
        receivedAt: Date,
    },
    { timestamps: true }
);

branchTransferSchema.index({ tenantId: 1, transferNo: 1 }, { unique: true });
branchTransferSchema.index({ tenantId: 1, fromBranchId: 1, createdAt: -1 });

export const Branch = mongoose.model("Branch", branchSchema);
export const BranchTransfer = mongoose.model("BranchTransfer", branchTransferSchema);
