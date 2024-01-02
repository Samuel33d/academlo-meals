import { catchAsync } from '../../commons/errors/catchAsync.js';
import {
  validatePartialReview,
  validateReview,
} from '../reviews/reviews.schema.js';
import { ReviewsServices } from '../reviews/reviews.service.js';
import {
  validateRestaurant,
  validateUpdateRestaurant,
} from './restaurants.schema.js';
import { RestaurantsServices } from './restaurants.service.js';

export const registerRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, restaurantData } = validateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      errorMessage,
    });
  }

  const restaurant = await RestaurantsServices.create(restaurantData);

  return res.status(201).json({
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
      status: restaurant.status,
    },
  });
});

export const findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await RestaurantsServices.findAll();

  return res.status(200).json({
    restaurants,
  });
});

export const findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json({
    restaurant,
  });
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, restaurantData } = validateUpdateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { restaurant } = req;

  await RestaurantsServices.update(restaurant, restaurantData);

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant updated succesfully',
  });
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await RestaurantsServices.delete(restaurant);

  return res.status(204).json(null);
});

export const createReview = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, reviewData } = validateReview(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { restaurant } = req;
  const { sessionUser } = req;

  await ReviewsServices.create({
    comment: reviewData.comment,
    rating: reviewData.rating,
    userId: sessionUser.id,
    restaurantId: restaurant.id,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Review created succesfully',
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, reviewData } = validatePartialReview(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { review } = req;

  await ReviewsServices.update(review, reviewData);

  return res.status(200).json({
    status: 'success',
    message: 'Review updated succesfully',
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await ReviewsServices.delete(review);

  return res.status(204).json(null);
});
