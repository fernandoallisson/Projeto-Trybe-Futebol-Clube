import { Request, Response, Router } from 'express';
import LeadboardController from '../controller/leadboard.controller';

const router = Router();

router.get('/home', (req: Request, res: Response) => LeadboardController.getAllLeadboard(req, res));
router.get('/away', (req: Request, res: Response) => LeadboardController.getAllLeadboard(req, res));

export default router;
