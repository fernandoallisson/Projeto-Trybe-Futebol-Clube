import IMacth from '../Interfaces/Match/IMatch';
import ServiceResponse, { ServiceResponseMessage } from '../Interfaces/service.response';
import MatchModel from '../models/match.model';

class MatchService {
  private model = new MatchModel();

  async findAll(): Promise<ServiceResponse<IMacth[]>> {
    const matches = await this.model.findAll();
    return { statusCode: 200, data: matches };
  }

  async matchInProgress(inProgress: boolean): Promise<ServiceResponse<IMacth[]>> {
    const matches = await this.model.findAll();
    const matchesInProgress = matches.filter((match) => match.inProgress === inProgress);
    return { statusCode: 200, data: matchesInProgress };
  }

  async finishedMatches(id: number): Promise<ServiceResponse<ServiceResponseMessage>> {
    await this.model.finishedMatches(id);
    return { statusCode: 200, data: { message: 'Finished' } };
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceResponseMessage>> {
    await this.model.updateMatch(id, homeTeamGoals, awayTeamGoals);
    if (!homeTeamGoals || !awayTeamGoals) {
      return { statusCode: 400, data: { message: 'Missing parameters' },
      };
    }
    return { statusCode: 200, data: { message: 'Match Updated!' } };
  }
}

export default MatchService;
