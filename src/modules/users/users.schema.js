import z from 'zod';
import { extractValidationData } from '../../commons/utils/extractValidationData.js';

const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a valid format',
      required_error: 'name is required',
    })
    .min(3, { message: 'name is too short' })
    .max(30, { message: 'name is too long' }),
  email: z
    .string({
      invalid_type_error: 'email must be a valid format',
      required_error: 'email is required',
    })
    .email(),
  password: z
    .string()
    .min(8, { message: 'password must be at least 8 characters' })
    .max(20, { message: 'password is too long' }),
  role: z.enum('admin', 'normal'),
});

const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'email must be a valid format',
      required_error: 'email is required',
    })
    .email(),
  password: z
    .string()
    .min(8, { message: 'password must be at least 8 characters' })
    .max(20, { message: 'password is too long' }),
});

const updateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'name is too short' })
    .max(30, { message: 'name is too long' }),
  email: z.string().email(),
});

export const validateUser = (data) => {
  const result = registerSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validateLoginUser = (data) => {
  const result = loginSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validateUpdateUser = (data) => {
  const result = updateSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};
