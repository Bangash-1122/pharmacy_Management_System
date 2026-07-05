import mongoose from "mongoose";

const { Schema } = mongoose;

const supplierSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        companyName: { type: String, required: true, trim: true },
        contactPerson: String,
        phone: String,
        email: String,
        address: String,
        balance: { type: Number, default: 0 },
        creditDays: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

supplierSchema.index({ tenantId: 1, companyName: 1 });

export default mongoose.model("Supplier", supplierSchema);
