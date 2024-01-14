import { Router } from 'express';
import LeadboardController from '../controller/leadboard.controller';

const router = Router();

const controller = new LeadboardController();

router.get(
  '/',
  (req, res) => controller.listAll(req, res),
);
router.get(
  '/away',
  (req, res) => controller.listAwayTeam(req, res),
);
router.get(
  '/home',
  (req, res) => controller.listHomeTeam(req, res),
);
export default router;
