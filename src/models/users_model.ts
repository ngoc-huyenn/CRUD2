import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import db from '../config/connect_db';

class UserModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public token?: string;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required',
        },
        len: {
          args: [2, 100],
          msg: 'Name must be between 2 and 100 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'Email address already in use',
      },
      validate: {
        isEmail: {
          msg: 'Invalid email address',
        },
        notNull: {
          msg: 'Email is required',
        },
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters',
        },
      },
      set(value: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      },
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize: db,
    modelName: 'user',
  }
);

export default UserModel;
