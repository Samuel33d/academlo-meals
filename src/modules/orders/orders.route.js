import express from 'express';
import { protect } from '../users/users.middleware.js';
import {
  createOrder,
  deleteOrder,
  findAllOrders,
  updateOrder,
} from './orders.controller.js';
import {
  protectOrderOwner,
  validateOrder,
  validateOrderStatus,
} from './orders.middleware.js';

export const router = express.Router();

router.use(protect);

router.post('/', createOrder);

router.get('/me', findAllOrders);

router
  .route('/:id')
  .patch(validateOrder, validateOrderStatus, protectOrderOwner, updateOrder)
  .delete(validateOrder, validateOrderStatus, protectOrderOwner, deleteOrder);
