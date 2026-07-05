import mongoose from "mongoose";

const { Schema } = mongoose;

const stockLedgerSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
        medicineId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
        batchId: { type: Schema.Types.ObjectId, required: true },
        type: {
            type: String,
            enum: ["purchase", "sale", "return", "adjustment", "transfer_in", "transfer_out", "count"],
            required: true,
        },
        qty: { type: Number, required: true },
        balanceAfter: Number,
        ref: {
            module: String,
            documentId: Schema.Types.ObjectId,
            documentNo: String,
        },
        notes: String,
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

stockLedgerSchema.index({ tenantId: 1, medicineId: 1, batchId: 1 });
stockLedgerSchema.index({ tenantId: 1, medicineId: 1, batchId: 1, createdAt: -1 });

export default mongoose.model("StockLedger", stockLedgerSchema);
