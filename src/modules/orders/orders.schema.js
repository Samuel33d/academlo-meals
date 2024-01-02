import z from 'zod';
import { extractValidationData } from '../../commons/utils/extractValidationData.js';

const orderSchema = z.object({
  mealId: z.number(),
  quantity: z.number(),
});

export const validateOrder = (data) => {
  const result = orderSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: orderData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    orderData,
  };
};
