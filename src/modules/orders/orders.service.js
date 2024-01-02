import Meal from '../meals/meals.model.js';
import Restaurant from '../restaurants/restaurants.model.js';

import Order from './orders.model.js';

export class OrdersServices {
  static async create(data) {
    return await Order.create(data);
  }

  static async findAll(userId) {
    return await Order.findAll({
      where: {
        userId,
        status: 'active',
      },
      attributes: ['status', 'quantity', 'totalPrice'],
      include: [
        {
          model: Meal,
          attributes: ['name', 'price', 'status'],
          include: [
            {
              model: Restaurant,
              attributes: ['name', 'address', 'rating', 'status'],
            },
          ],
        },
      ],
    });
  }

  static async findOne(id) {
    return await Order.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Meal,
          attributes: ['name', 'price', 'status'],
          include: [
            {
              model: Restaurant,
              attributes: ['name', 'address', 'rating', 'status'],
            },
          ],
        },
      ],
    });
  }

  static async update(order) {
    return await order.update({ status: 'completed' });
  }

  static async delete(order) {
    return await order.update({ status: 'cancelled' });
  }
}
