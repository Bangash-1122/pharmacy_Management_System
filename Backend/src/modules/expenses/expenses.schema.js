import mongoose from "mongoose";

const { Schema } = mongoose;

const expenseSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
        category: { type: String, required: true, trim: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true, index: true },
        description: String,
        paymentMethod: String,
        approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

expenseSchema.index({ tenantId: 1, date: -1 });
expenseSchema.index({ tenantId: 1, category: 1, date: -1 });

export default mongoose.model("Expense", expenseSchema);
