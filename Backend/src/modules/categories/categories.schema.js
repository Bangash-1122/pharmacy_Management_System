const { z } = require('zod');

const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  parentId: z.string().nullable().optional(),
  icon: z.string().optional().default('pill'),
  color: z.string().optional().default('#0284c7'),
  description: z.string().optional().default(''),
});

module.exports = {
  categorySchema,
};
