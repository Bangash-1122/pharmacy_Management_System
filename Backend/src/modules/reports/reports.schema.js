import mongoose from "mongoose";

const { Schema } = mongoose;

const reportCacheSchema = new Schema(
    {
        key: { type: String, required: true, unique: true },
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", index: true },
        reportType: String,
        params: Schema.Types.Mixed,
        data: Schema.Types.Mixed,
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: false }
);

reportCacheSchema.index({ key: 1 }, { unique: true });
reportCacheSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.model("ReportCache", reportCacheSchema);
