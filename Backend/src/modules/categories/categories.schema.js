import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        name: { type: String, required: true, trim: true },
        description: String,
        brand: String,
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

categorySchema.index({ tenantId: 1, name: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
