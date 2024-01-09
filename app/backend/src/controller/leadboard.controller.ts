import { Request, Response } from 'express';
import LeadboardService from '../services/leadboard.service';

class LeadboardController {
  static async getAllLeadboard(req: Request, res: Response): Promise<Response> {
    const params = req.path.split('/')[1];
    return LeadboardService.getAllLeadboard(params)
      .then(({ status, data }) => res.status(200).json({ status, data }));
  }
}

export default LeadboardController;
