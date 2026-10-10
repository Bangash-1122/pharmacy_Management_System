const { z } = require('zod');

const registerSchema = z.object({
  pharmacyName: z.string().min(2, 'Pharmacy name must be at least 2 characters'),
  pharmacyType: z.string().optional().default('Retail Pharmacy'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  city: z.string().min(2, 'City is required'),
  address: z.string().optional().default(''),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  planId: z.string().optional().default('free_trial'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(10, 'Refresh token is required'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(4, 'OTP must be provided'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
