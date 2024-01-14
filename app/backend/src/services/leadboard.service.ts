import ITeamStatus from '../Interfaces/ITeamStatus';
import ServiceResponse from '../Interfaces/service.response';
import LeadboardModel from '../models/leadboard.model';

class LeadboardService {
  private model = new LeadboardModel();

  public async listAll(team: string): Promise<ServiceResponse<ITeamStatus[]>> {
    if (team === 'away') {
      const response = await this.model.listAwayTeam();
      return { statusCode: 200, data: response };
    }
    if (team === 'home') {
      const response = await this.model.listHomeTeam();
      return { statusCode: 200, data: response };
    }
    const response = await this.model.listTeam();
    return { statusCode: 200, data: response };
  }
}

export default LeadboardService;
