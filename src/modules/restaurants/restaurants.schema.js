import z from 'zod';
import { extractValidationData } from '../../commons/utils/extractValidationData.js';

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'restaurant name is too short' })
    .max(50, { message: 'restaurant name is too long' }),
  address: z.string().min(10, { message: 'address is too short' }),
  rating: z
    .number()
    .gte(1, { message: 'rating must be between 1 and 5' })
    .lte(5, { message: 'rating must be between 1 and 5' }),
});

const updateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'restaurant name is too short' })
    .max(50, { message: 'restaurant name is too long' }),
  address: z.string().min(10, { message: 'address is too short' }),
});

export const validateRestaurant = (data) => {
  const result = registerSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: restaurantData,
  } = extractValidationData(result);

  return { hasError, errorMessage, restaurantData };
};

export const validateUpdateRestaurant = (data) => {
  const result = updateSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: restaurantData,
  } = extractValidationData(result);

  return { hasError, errorMessage, restaurantData };
};
