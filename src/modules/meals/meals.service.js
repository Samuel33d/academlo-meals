import Restaurant from '../restaurants/restaurants.model.js';
import Meal from './meals.model.js';

export class MealsServices {
  static async create(data) {
    return await Meal.create(data);
  }

  static async findAll() {
    return await Meal.findAll({
      where: {
        status: 'active',
      },
      attributes: ['id', 'name', 'price', 'status'],
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name', 'address', 'status', 'rating'],
        },
      ],
    });
  }

  static async findOne(id) {
    return await Meal.findOne({
      where: {
        id,
        status: 'active',
      },
      attributes: ['id', 'name', 'price', 'status'],
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name', 'address', 'status', 'rating'],
        },
      ],
    });
  }

  static async update(meal, data) {
    return await meal.update(data);
  }

  static async delete(meal) {
    return await meal.update({ status: 'inactive' });
  }
}
