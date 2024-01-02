import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { MealsServices } from './meals.service.js';

export const validateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await MealsServices.findOne(id);

  if (!meal) {
    return next(new AppError(`Meal with id /${id} not found`, 404));
  }

  req.meal = meal;
  next();
});
