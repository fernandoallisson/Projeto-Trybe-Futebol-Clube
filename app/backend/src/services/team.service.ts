import ServiceResponse from '../Interfaces/service.response';
import { TeamLessId } from '../Interfaces/Team/ITeamLessId';
import { ITeamService } from '../Interfaces/Team/ITeamService';
import ITeam from '../Interfaces/Team/ITeam';
import TeamModel from '../models/team.model';
import Errors from '../utils/Errors';

class TeamService implements ITeamService {
  private teamModel: TeamModel;

  constructor() {
    this.teamModel = new TeamModel();
  }

  public async create({ teamName }: TeamLessId): Promise<ServiceResponse<ITeam>> {
    const response = await this.teamModel.findByName(teamName);
    if (response) {
      throw new Errors('Team already exists', 409);
    }
    const team = await this.teamModel.create({ teamName });
    return { statusCode: 201, data: team.dataValues };
  }

  public async delete(id: number): Promise<ServiceResponse<null>> {
    const response = await this.teamModel.findById(id);
    if (!response) {
      throw new Errors('Team not found_', 400);
    }
    await this.teamModel.delete(id);
    return { statusCode: 204, data: null };
  }

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const response = await this.teamModel.findAll();
    return { statusCode: 200, data: response };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeam>> {
    const response = await this.teamModel.findById(id);
    if (!response) {
      throw new Errors('Team not found', 404);
    }
    return { statusCode: 200, data: response.dataValues };
  }

  public async update(id: number, { teamName }: TeamLessId):
  Promise<ServiceResponse<ITeam>> {
    const response = await this.teamModel.findById(id);
    if (!response) {
      throw new Errors('Team not found', 404);
    }
    const updatedTeam = await this.teamModel.update(id, { teamName });
    if (!updatedTeam) {
      throw new Errors('Internal Server Error', 500);
    }
    return { statusCode: 200, data: updatedTeam.dataValues };
  }
}

export default TeamService;
