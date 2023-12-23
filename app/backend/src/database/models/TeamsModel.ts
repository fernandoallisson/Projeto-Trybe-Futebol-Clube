import { Model, InferAttributes, InferCreationAttributes, CreateOptions, DataTypes } from "sequelize";
import db from '.'

class TeamModelSequelize extends Model<InferAttributes<TeamModelSequelize>,
InferCreationAttributes<TeamModelSequelize>> {
  declare id: CreateOptions<number>
  declare teamName: string;
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
  }
}, {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
});

export default TeamModelSequelize