import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encripted-password.plugin.js';
import generateJWT from '../../config/plugins/generateJWT.plugin.js';
import { OrdersServices } from '../orders/orders.service.js';
import {
  validateLoginUser,
  validateUpdateUser,
  validateUser,
} from './users.schema.js';
import { UsersServices } from './users.service.js';

export const signUp = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const user = await UsersServices.create(userData);
  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateLoginUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const user = await UsersServices.findOneByEmail(userData.email);

  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    message: 'Login succesfully!',
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateUpdateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { user } = req;

  await UsersServices.update(user, userData);

  return res.status(200).json({
    status: 'success',
    message: 'User updated succesfully',
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await UsersServices.delete(user);

  res.status(204).json(null);
});

export const findAllUserOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await OrdersServices.findAll(sessionUser.id);

  res.status(200).json({
    orders,
  });
});

export const findOneUserOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  return res.status(200).json({
    order,
  });
});
