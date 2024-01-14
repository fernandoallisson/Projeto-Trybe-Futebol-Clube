import { Request, Response } from 'express';
import LeadboardService from '../services/leadboard.service';

class LeadboardController {
  static async getAllLeadboard(req: Request, res: Response): Promise<Response> {
    const params = req.path.split('/')[1];
    return LeadboardService.getAllLeaderBoardHomeOrAway(params)
      .then(({ data }) => res.status(200).json(console.log(data)));
  }
}

export default LeadboardController;
