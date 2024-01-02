import z from 'zod';
import { extractValidationData } from '../../commons/utils/extractValidationData.js';

const mealSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'meal name must be a valid format',
      required_error: 'meal name is required',
    })
    .min(3, { message: 'meal name is too short' })
    .max(30, { message: 'meal name is too long' }),
  price: z.number(),
});

export const validateMeal = (data) => {
  const result = mealSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    mealData,
  };
};

export const validatePartialMeal = (data) => {
  const result = mealSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    mealData,
  };
};
