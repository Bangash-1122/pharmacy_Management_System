import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        plan: {
            type: String,
            enum: ["free", "basic", "pro", "enterprise"],
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "past_due", "cancelled", "trialing"],
            default: "trialing",
        },
        stripeCustomerId: String,
        stripeSubscriptionId: String,
        currentPeriodStart: Date,
        currentPeriodEnd: Date,
        cancelAtPeriodEnd: { type: Boolean, default: false },
        limits: {
            maxUsers: { type: Number, default: 5 },
            maxBranches: { type: Number, default: 1 },
            maxMedicines: { type: Number, default: 1000 },
        },
    },
    { timestamps: true }
);

subscriptionSchema.index({ tenantId: 1 }, { unique: true });
subscriptionSchema.index({ status: 1 });

export default mongoose.model("Subscription", subscriptionSchema);
