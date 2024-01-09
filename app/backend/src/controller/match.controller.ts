import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  private matchService = new MatchService();

  public async findAll(req: Request, res: Response): Promise<Response> {
    const response = await this.matchService.findAll();
    return res.status(response.statusCode).json(response.data);
  }

  public async matchInProgress(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const response = await this.matchService.matchInProgress(inProgress === 'true');
    return res.status(response.statusCode).json(response.data);
  }

  public async finishedMatches(req: Request, res: Response): Promise<Response> {
    const response = await this.matchService.finishedMatches(Number(req.params.id));
    return res.status(response.statusCode).json(response.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const response = await this.matchService.updateMatch(
      Number(req.params.id),
      req.body.homeTeamGoals,
      req.body.awayTeamGoals,
    );
    return res.status(response.statusCode).json(response.data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService.createMatch({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return res.status(response.statusCode).json(response.data);
  }
}

export default MatchController;
