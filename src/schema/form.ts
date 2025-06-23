import { z } from 'zod';

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string(),
    referral_id: z.string().nullable().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const changePasswordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string(),
    token: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export {
  signUpSchema,
  signInSchema,
  resetPasswordSchema,
  changePasswordSchema,
};
