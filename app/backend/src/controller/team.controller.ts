import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { teamName } = req.body;
    const response = await this.teamService.create({ teamName });
    return res.status(response.statusCode).json(response.data);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.teamService.delete(Number(id));
    return res.status(response.statusCode).json();
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const response = await this.teamService.findAll();
    return res.status(response.statusCode).json(response.data);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.teamService.findById(Number(id));
    return res.status(response.statusCode).json(response.data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { teamName } = req.body;
    const response = await this.teamService.update(Number(id), { teamName });
    return res.status(response.statusCode).json(response);
  }
}

export default TeamController;
