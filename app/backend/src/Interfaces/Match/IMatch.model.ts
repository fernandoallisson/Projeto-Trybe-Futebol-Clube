import MatchModelSequelize from '../../database/models/match-model-sequelize';
import { ICreate, IRead, IUpdate } from '../CRUD/CRUD.model';

export interface IMatchModel
  extends ICreate<MatchModelSequelize>, IRead<MatchModelSequelize>, IUpdate<MatchModelSequelize> {}
