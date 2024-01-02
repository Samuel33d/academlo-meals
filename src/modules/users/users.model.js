import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
import { encryptedPassword } from '../../config/plugins/encripted-password.plugin.js';

const User = sequelize.define(
  'users',
  {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    role: {
      type: DataTypes.ENUM('normal', 'admin'),
      allowNull: true,
      defaultValue: 'normal',
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password);
      },
    },
  }
);

export default User;
