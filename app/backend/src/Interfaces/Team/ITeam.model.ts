import TeamModelSequelize from '../../database/models/team-model-sequelize';
import ICRUD from '../CRUD/CRUD.model';

export type ITeamModel = ICRUD<TeamModelSequelize>;
