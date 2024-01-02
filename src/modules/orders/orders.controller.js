import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { MealsServices } from '../meals/meals.service.js';
import { validateOrder } from './orders.schema.js';
import { OrdersServices } from './orders.service.js';

export const createOrder = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, orderData } = validateOrder(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const meal = await MealsServices.findOne(orderData.mealId);

  if (!meal) {
    return next(
      new AppError(`Meal with id ${orderData.mealId} not found`, 404)
    );
  }

  const { sessionUser } = req;

  const totalPrice = meal.price * orderData.quantity;

  await OrdersServices.create({
    mealId: orderData.mealId,
    quantity: orderData.quantity,
    userId: sessionUser.id,
    totalPrice: totalPrice,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Order created succesfully',
  });
});

export const findAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await OrdersServices.findAll(sessionUser.id);

  res.status(200).json({
    orders,
  });
});

export const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await OrdersServices.update(order);

  return res.status(200).json({
    status: 'success',
    message: 'Order has been completed succesfully',
  });
});

export const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await OrdersServices.delete(order);

  return res.status(204).json(null);
});
