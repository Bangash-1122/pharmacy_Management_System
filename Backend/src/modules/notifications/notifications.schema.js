import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        type: {
            type: String,
            enum: ["low_stock", "expiry", "sale", "purchase", "system", "subscription"],
            required: true,
        },
        channel: {
            type: String,
            enum: ["email", "sms", "whatsapp", "in_app"],
            required: true,
        },
        title: String,
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "sent", "failed"],
            default: "pending",
        },
        sentAt: Date,
        metadata: Schema.Types.Mixed,
    },
    { timestamps: true }
);

notificationSchema.index({ tenantId: 1, status: 1, createdAt: -1 });

export default mongoose.model("Notification", notificationSchema);
