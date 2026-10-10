const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
    expenseNumber: { type: String, required: true },
    category: {
      type: String,
      enum: ['Rent', 'Electricity', 'Salaries', 'Supplies', 'Repairs', 'Marketing', 'Taxes', 'Misc'],
      default: 'Misc',
    },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    paymentMethod: { type: String, default: 'cash' },
    receiptUrl: { type: String, default: '' },
    expenseDate: { type: Date, default: Date.now },
    isRecurring: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
    createdById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
