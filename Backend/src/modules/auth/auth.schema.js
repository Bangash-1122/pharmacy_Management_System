import mongoose from "mongoose";

const { Schema } = mongoose;

const sessionSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        token: { type: String, required: true, unique: true },
        deviceInfo: String,
        ipAddress: String,
        expiresAt: { type: Date, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const otpSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        code: { type: String, required: true },
        purpose: {
            type: String,
            enum: ["login", "reset", "2fa", "verify"],
            required: true,
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 5 * 60 * 1000),
        },
    },
    { timestamps: true }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpSchema.index({ userId: 1, purpose: 1 });

const rateLimitSchema = new Schema(
    {
        key: { type: String, required: true },
        window: { type: Number, required: true },
        count: { type: Number, default: 1 },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

rateLimitSchema.index({ key: 1, window: 1 }, { unique: true });
rateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model("Session", sessionSchema);
export const Otp = mongoose.model("Otp", otpSchema);
export const RateLimit = mongoose.model("RateLimit", rateLimitSchema);
