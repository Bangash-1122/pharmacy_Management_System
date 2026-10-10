const { z } = require('zod');

const expenseSchema = z.object({
  category: z.enum(['Rent', 'Electricity', 'Salaries', 'Supplies', 'Repairs', 'Marketing', 'Taxes', 'Misc']).default('Misc'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  description: z.string().min(2, 'Description is required'),
  paymentMethod: z.string().default('cash'),
  receiptUrl: z.string().optional().default(''),
  expenseDate: z.string().optional(),
  isRecurring: z.boolean().optional().default(false),
});

module.exports = {
  expenseSchema,
};
