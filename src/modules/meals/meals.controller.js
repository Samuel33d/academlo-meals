import { catchAsync } from '../../commons/errors/catchAsync.js';
import { validateMeal, validatePartialMeal } from './meals.schema.js';
import { MealsServices } from './meals.service.js';

export const createMeal = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, mealData } = validateMeal(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { restaurant } = req;

  const meal = await MealsServices.create({
    name: mealData.name,
    price: mealData.price,
    restaurantId: restaurant.id,
  });

  return res.status(201).json({
    meal: {
      status: meal.status,
      id: meal.id,
      name: meal.name,
      price: meal.price,
      restaurantId: meal.restaurantId,
    },
  });
});

export const findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await MealsServices.findAll();

  res.status(200).json({
    meals,
  });
});

export const findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  return res.status(200).json({
    meal,
  });
});

export const updateMeal = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, mealData } = validatePartialMeal(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { meal } = req;

  await MealsServices.update(meal, mealData);

  return res.status(200).json({
    status: 'success',
    message: 'Meal updated successfully',
  });
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await MealsServices.delete(meal);

  return res.status(204).json(null);
});
