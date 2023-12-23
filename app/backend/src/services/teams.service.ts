import TeamModelSequelize from '../database/models/TeamsModel';
import { ITeamsModel } from '../Interfaces/index';
import TeamsModel from '../model/teams.model';
import { serviceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private TeamModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<serviceResponse<TeamModelSequelize[]>> {
    const data = await this.TeamModel.findAll();
    return { status: 'SUCCESSFUL', data };
  }

  public async getTeamById(id: number): Promise<serviceResponse<TeamModelSequelize>> {
    const data = await this.TeamModel.findById(id);
    if (!data) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data };
  }
}
