import { z } from 'zod';

const userSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  country: z.string().optional(),
  city: z.string().optional(),
  post_code: z.string().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
});

export { userSchema };
