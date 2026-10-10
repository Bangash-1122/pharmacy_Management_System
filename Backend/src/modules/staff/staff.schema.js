const { z } = require('zod');
const { ROLES } = require('../../config/constants');

const createStaffSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().default(''),
  cnic: z.string().optional().default(''),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(Object.values(ROLES)).default(ROLES.STAFF_USER),
  designation: z.string().optional().default(''),
  salary: z.number().min(0).optional().default(0),
  branchId: z.string().nullable().optional(),
  permissions: z
    .array(
      z.object({
        module: z.string(),
        action: z.string(),
      })
    )
    .optional()
    .default([]),
});

const updatePermissionsSchema = z.object({
  permissions: z.array(
    z.object({
      module: z.string(),
      action: z.string(),
    })
  ),
});

module.exports = {
  createStaffSchema,
  updatePermissionsSchema,
};
