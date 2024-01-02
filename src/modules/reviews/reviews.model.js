import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Review = sequelize.define('review', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'restaurant_id',
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'deleted'),
    allowNull: true,
    defaultValue: 'active',
  },
});

export default Review;
