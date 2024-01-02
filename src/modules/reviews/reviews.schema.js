import z from 'zod';
import { extractValidationData } from '../../commons/utils/extractValidationData.js';

const reviewSchema = z.object({
  comment: z
    .string()
    .min(10, { message: 'comment is too short, minimum is 10 characters' }),
  rating: z
    .number()
    .gte(1, { message: 'rating must be between 1 and 5' })
    .lte(5, { message: 'rating must be between 1 and 5' }),
});

export const validateReview = (data) => {
  const result = reviewSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    reviewData,
  };
};

export const validatePartialReview = (data) => {
  const result = reviewSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    reviewData,
  };
};
