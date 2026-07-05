import mongoose from "mongoose";

const { Schema } = mongoose;

const ticketMessageSchema = new Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        attachments: [String],
    },
    { timestamps: true }
);

const supportTicketSchema = new Schema(
    {
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        ticketNo: { type: String, required: true },
        subject: { type: String, required: true, trim: true },
        category: {
            type: String,
            enum: ["billing", "technical", "feature", "bug", "other"],
            default: "other",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        status: {
            type: String,
            enum: ["open", "in_progress", "resolved", "closed"],
            default: "open",
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
        messages: [ticketMessageSchema],
        resolvedAt: Date,
    },
    { timestamps: true }
);

supportTicketSchema.index({ tenantId: 1, ticketNo: 1 }, { unique: true });
supportTicketSchema.index({ tenantId: 1, status: 1, createdAt: -1 });

export default mongoose.model("SupportTicket", supportTicketSchema);
