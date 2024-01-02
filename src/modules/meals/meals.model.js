import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Meal = sequelize.define('meals', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'restaurant_id',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: true,
    defaultValue: 'active',
  },
});

export default Meal;
