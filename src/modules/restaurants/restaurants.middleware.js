import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { RestaurantsServices } from './restaurants.service.js';

export const validateRestaurant = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const resId = restaurantId || id;

  const restaurant = await RestaurantsServices.findOne(resId);

  if (!restaurant) {
    return next(new AppError(`Restaurant with id ${id} not found`, 404));
  }

  req.restaurant = restaurant;

  next();
});
