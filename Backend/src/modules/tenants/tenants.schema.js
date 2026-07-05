import mongoose from "mongoose";

const {
    Schema
} = mongoose;

const tenantSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    plan: {
        type: String,
        enum: ["free", "basic", "pro", "enterprise"],
        default: "free",
    },
    status: {
        type: String,
        enum: ["active", "suspended", "pending", "cancelled"],
        default: "pending",
        index: true,
    },
    settings: {
        currency: {
            type: String,
            default: "PKR"
        },
        timezone: {
            type: String,
            default: "Asia/Peshawar"
        },
        taxEnabled: {
            type: Boolean,
            default: true
        },
        logoUrl: String,
        receiptFooter: String,
    },
    contactEmail: String,
    contactPhone: String,
    address: String,
}, {
    timestamps: true
});

tenantSchema.index({
    slug: 1
}, {
    unique: true
});
tenantSchema.index({
    status: 1
});

export default mongoose.model("Tenant", tenantSchema);