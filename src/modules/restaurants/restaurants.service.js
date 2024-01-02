import Meal from '../meals/meals.model.js';
import Restaurant from './restaurants.model.js';

export class RestaurantsServices {
  static async create(data) {
    return await Restaurant.create(data);
  }

  static async findAll() {
    return await Restaurant.findAll({
      where: {
        status: true,
      },
      attributes: ['name', 'address', 'rating', 'id'],
      include: [
        {
          model: Meal,
          attributes: ['name', 'price', 'status', 'id'],
        },
      ],
    });
  }

  static async findOne(id) {
    return await Restaurant.findOne({
      where: {
        status: true,
        id,
      },
      attributes: ['name', 'address', 'rating', 'id'],
      include: [
        {
          model: Meal,
          attributes: ['name', 'price', 'status', 'id'],
        },
      ],
    });
  }

  static async update(restaurant, data) {
    return await restaurant.update(data);
  }

  static async delete(restaurant) {
    return await restaurant.update({ status: false });
  }
}
