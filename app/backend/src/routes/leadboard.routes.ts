import { Router } from 'express';
import LeadboardController from '../controller/leadboard.controller';

const router = Router();

router
  .get('/home', LeadboardController.getAllLeadboard)
  .get('/away', LeadboardController.getAllLeadboard);

export default router;
