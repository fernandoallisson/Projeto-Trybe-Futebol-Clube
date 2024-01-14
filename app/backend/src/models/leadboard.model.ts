import { QueryTypes } from 'sequelize';

import ITeamStatus from '../Interfaces/ITeamStatus';
import { listAwayTeamQuery, listHomeTeamQuery, listTeamQuery } from '../utils/querry';
import MatchModelSequelize from '../database/models/match-model-sequelize';

interface ILeadboard {
  listHomeTeam(): Promise<ITeamStatus[]>;
  listAwayTeam(): Promise<ITeamStatus[]>;
  listTeam(): Promise<ITeamStatus[]>;
}

class LeaderboardModel implements ILeadboard {
  private model = MatchModelSequelize;

  public async listHomeTeam(): Promise<ITeamStatus[]> {
    const matches = await this.model.sequelize?.query(listHomeTeamQuery, {
      type: QueryTypes.SELECT,
    }) as ITeamStatus[];
    return matches;
  }

  public async listAwayTeam(): Promise<ITeamStatus[]> {
    const matches = await this.model.sequelize?.query(listAwayTeamQuery, {
      type: QueryTypes.SELECT,
    }) as ITeamStatus[];
    return matches;
  }

  public async listTeam(): Promise<ITeamStatus[]> {
    const matches = await this.model.sequelize?.query(listTeamQuery, {
      type: QueryTypes.SELECT,
    }) as ITeamStatus[];
    return matches;
  }
}

export default LeaderboardModel;
