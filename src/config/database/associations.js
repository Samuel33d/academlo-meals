import Meal from '../../modules/meals/meals.model.js';
import Order from '../../modules/orders/orders.model.js';
import Restaurant from '../../modules/restaurants/restaurants.model.js';
import Review from '../../modules/reviews/reviews.model.js';
import User from '../../modules/users/users.model.js';

export const initModel = () => {
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Review);
  Review.belongsTo(User);
};
