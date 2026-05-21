import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().min(1, 'Description is required').max(2000),
  category: z.string().min(1, 'Category is required').max(100),
});

export const updateServiceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255).optional(),
  description: z.string().min(1, 'Description is required').max(2000).optional(),
  category: z.string().min(1, 'Category is required').max(100).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  nombre: z.string().min(1, 'Name is required').max(255),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email format'),
  message: z.string().min(1, 'Message is required').max(5000),
});
