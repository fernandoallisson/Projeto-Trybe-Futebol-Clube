import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class UserModelSequelize extends Model<InferAttributes<UserModelSequelize>,
InferCreationAttributes<UserModelSequelize>> {
  declare id: CreationOptional<number>;
  declare username: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare role: CreationOptional<string>;
}

UserModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
  underscored: true,
});

export default UserModelSequelize;
