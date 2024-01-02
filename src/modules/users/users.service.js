import Order from '../orders/orders.model.js';
import User from './users.model.js';

export class UsersServices {
  static async create(data) {
    return await User.create(data);
  }

  static async findOne(id) {
    return await User.findOne({
      where: {
        status: true,
        id,
      },
      include: [
        {
          model: Order,
        },
      ],
    });
  }

  static async findOneByEmail(email) {
    return await User.findOne({
      where: {
        status: true,
        email,
      },
    });
  }

  static async update(user, data) {
    return await user.update(data);
  }

  static async delete(user) {
    return await user.update({ status: false });
  }
}
