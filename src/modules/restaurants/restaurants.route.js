import express from 'express';
import {
  createReview,
  deleteRestaurant,
  deleteReview,
  findAllRestaurants,
  findOneRestaurant,
  registerRestaurant,
  updateRestaurant,
  updateReview,
} from './restaurants.controller.js';
import { validateRestaurant } from './restaurants.middleware.js';
import {
  protect,
  protectAccountOwner,
  restrictTo,
} from '../users/users.middleware.js';
import { validateReview } from '../reviews/reviews.middleware.js';

export const router = express.Router();

router.route('/').get(findAllRestaurants).post(registerRestaurant);

router.use(protect);

router
  .route('/:id')
  .get(validateRestaurant, findOneRestaurant)
  .patch(restrictTo('admin'), validateRestaurant, updateRestaurant)
  .delete(restrictTo('admin'), validateRestaurant, deleteRestaurant);

router.post('/reviews/:id', validateRestaurant, createReview);

router
  .route('/reviews/:restaurantId/:id')
  .patch(validateRestaurant, validateReview, protectAccountOwner, updateReview)
  .delete(
    validateRestaurant,
    validateReview,
    protectAccountOwner,
    deleteReview
  );
