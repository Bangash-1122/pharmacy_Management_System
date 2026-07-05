import mongoose from "mongoose";

const { Schema } = mongoose;

const auditLogSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        action: {
            type: String,
            enum: ["create", "update", "delete", "login", "logout", "void", "export"],
            required: true,
        },
        module: { type: String, required: true },
        documentId: Schema.Types.ObjectId,
        before: Schema.Types.Mixed,
        after: Schema.Types.Mixed,
        ipAddress: String,
        userAgent: String,
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

auditLogSchema.index({ tenantId: 1, createdAt: -1 });
auditLogSchema.index({ tenantId: 1, module: 1, createdAt: -1 });

export default mongoose.model("AuditLog", auditLogSchema);
