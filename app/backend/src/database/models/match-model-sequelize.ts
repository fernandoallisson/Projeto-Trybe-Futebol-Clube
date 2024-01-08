import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamModelSequelize from './team-model-sequelize';

class MatchModelSequelize extends Model<InferAttributes<MatchModelSequelize>,
InferCreationAttributes<MatchModelSequelize>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: CreationOptional<number>;
  declare homeTeamGoals: CreationOptional<number>;
  declare awayTeamId: CreationOptional<number>;
  declare awayTeamGoals: CreationOptional<number>;
  declare inProgress: CreationOptional<boolean>;
}

MatchModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: {
        tableName: 'teams',
      },
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: {
        tableName: 'teams',
      },
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
    defaultValue: false,
  },
}, {
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

TeamModelSequelize.hasMany(MatchModelSequelize, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});
TeamModelSequelize.hasMany(MatchModelSequelize, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

MatchModelSequelize.belongsTo(TeamModelSequelize, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
MatchModelSequelize.belongsTo(TeamModelSequelize, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchModelSequelize;
