import express from 'express';
import { protect, restrictTo } from '../users/users.middleware.js';
import {
  createMeal,
  deleteMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
} from './meals.controller.js';
import { validateRestaurant } from '../restaurants/restaurants.middleware.js';
import { validateMeal } from './meals.middleware.js';

export const router = express.Router();

router.use(protect);

router.post('/:id', validateRestaurant, createMeal);

router.get('/', findAllMeals);

router
  .route('/:id')
  .get(validateMeal, findOneMeal)
  .patch(restrictTo('admin'), validateMeal, updateMeal)
  .delete(restrictTo('admin'), validateMeal, deleteMeal);
