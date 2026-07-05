import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false },
        name: { type: String, required: true, trim: true },
        role: {
            type: String,
            enum: ["owner", "admin", "pharmacist", "cashier", "staff"],
            default: "staff",
        },
        permissions: [{ type: String }],
        branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
        isActive: { type: Boolean, default: true },
        lastLoginAt: Date,
    },
    { timestamps: true }
);

userSchema.index({ tenantId: 1, email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
