import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamModelSequelize extends Model<InferAttributes<TeamModelSequelize>,
InferCreationAttributes<TeamModelSequelize>> {
  declare id: CreationOptional<number>;
  declare teamName: CreationOptional<string>;
}

TeamModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'Teams',
  timestamps: false,
  underscored: true,
});

export default TeamModelSequelize;
