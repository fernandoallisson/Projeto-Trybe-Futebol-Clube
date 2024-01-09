import { MatchLessId } from '../Interfaces/Match/Match-lessId';
import IMacth from '../Interfaces/Match/IMatch';
import ServiceResponse, { ServiceResponseMessage } from '../Interfaces/service.response';
import MatchModel from '../models/match.model';
import Errors from '../utils/Errors';
import TeamModel from '../models/team.model';

class MatchService {
  private model = new MatchModel();
  private teamModel = new TeamModel();

  public async findAll(): Promise<ServiceResponse<IMacth[]>> {
    const matches = await this.model.findAll();
    return { statusCode: 200, data: matches };
  }

  public async matchInProgress(inProgress: boolean): Promise<ServiceResponse<IMacth[]>> {
    const matches = await this.model.findAll();
    const matchesInProgress = matches.filter((match) => match.inProgress === inProgress);
    return { statusCode: 200, data: matchesInProgress };
  }

  public async finishedMatches(id: number): Promise<ServiceResponse<ServiceResponseMessage>> {
    await this.model.finishedMatches(id);
    return { statusCode: 200, data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceResponseMessage>> {
    await this.model.updateMatch(id, homeTeamGoals, awayTeamGoals);
    if (!homeTeamGoals || !awayTeamGoals) {
      return { statusCode: 400, data: { message: 'Missing parameters' },
      };
    }
    return { statusCode: 200, data: { message: 'Match updated!' } };
  }

  public async createMatch(data: MatchLessId): Promise<ServiceResponse<IMacth>> {
    if (data.homeTeamId === data.awayTeamId) {
      throw new Errors('It is not possible to create a match with two equal teams', 422);
    }

    const homeTeam = await this.teamModel.findById(data.homeTeamId);
    const awayTeam = await this.teamModel.findById(data.awayTeamId);

    if (!homeTeam || !awayTeam) {
      throw new Errors('There is no team with such id!', 404);
    }

    const match = await this.model.createMatch(data);
    return { statusCode: 201, data: match.dataValues };
  }
}

export default MatchService;
