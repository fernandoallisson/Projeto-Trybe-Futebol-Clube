import { Request, Response } from 'express';
import LeadboardService from '../services/leadboard.service';

class LeadboardController {
  private service = new LeadboardService();

  public async listAll(req: Request, res: Response): Promise<Response> {
    const { team } = req.query;
    const response = await this.service.listAll(team as string);
    return res.status(response.statusCode).json(response.data);
  }

  public async listAwayTeam(_req: Request, res: Response): Promise<Response> {
    const response = await this.service.listAll('away');
    return res.status(response.statusCode).json(response.data);
  }

  public async listHomeTeam(_req: Request, res: Response): Promise<Response> {
    const response = await this.service.listAll('home');
    return res.status(response.statusCode).json(response.data);
  }
}

export default LeadboardController;
