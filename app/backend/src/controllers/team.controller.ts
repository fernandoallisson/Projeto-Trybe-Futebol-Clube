import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import { statusHTTPS } from '../utils/index';

export default class TeamsController {
  constructor(private service = new TeamsService()) {}

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.service.getAllTeams();
    return res.status(statusHTTPS(status)).json(data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const id = req.params;
    const { status, data } = await this.service.getTeamById(Number(id));
    return res.status(statusHTTPS(status)).json(data);
  }
}
