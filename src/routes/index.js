import express from 'express';
import { router as usersRouter } from '../modules/users/users.route.js';
import { router as restaurantsRouter } from '../modules/restaurants/restaurants.route.js';
import { router as mealsRouter } from '../modules/meals/meals.route.js';
import { router as ordersRouter } from '../modules/orders/orders.route.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/meals', mealsRouter);
router.use('/orders', ordersRouter);

export default router;
