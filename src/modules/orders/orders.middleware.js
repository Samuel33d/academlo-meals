import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { OrdersServices } from './orders.service.js';

export const validateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await OrdersServices.findOne(id);

  if (!order) {
    return next(new AppError(`Order with id ${id} not found`, 404));
  }

  req.order = order;
  next();
});

export const validateOrderStatus = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (order.status !== 'active') {
    return next(new AppError(`Order has been ${order.status} previously`, 404));
  }

  next();
});

export const protectOrderOwner = catchAsync(async (req, res, next) => {
  const { order } = req;
  const { sessionUser } = req;

  if (order.userId !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});
