import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        name: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        email: String,
        address: String,
        type: {
            type: String,
            enum: ["walk-in", "regular", "wholesale"],
            default: "walk-in",
        },
        loyaltyPoints: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

customerSchema.index({ tenantId: 1, phone: 1 }, { unique: true, sparse: true });
customerSchema.index({ tenantId: 1, name: "text" });

export default mongoose.model("Customer", customerSchema);
