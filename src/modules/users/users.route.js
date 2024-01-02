import express from 'express';
import {
  deleteUser,
  findAllUserOrders,
  findOneUserOrder,
  login,
  signUp,
  updateUser,
} from './users.controller.js';
import {
  protect,
  protectAccountOwner,
  validateUser,
} from './users.middleware.js';
import { validateOrder } from '../orders/orders.middleware.js';

export const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.use(protect);

router
  .route('/:id')
  .patch(validateUser, protectAccountOwner, updateUser)
  .delete(validateUser, protectAccountOwner, deleteUser);

router.get('/orders', findAllUserOrders);
router.get('/orders/:id', validateOrder, findOneUserOrder);
