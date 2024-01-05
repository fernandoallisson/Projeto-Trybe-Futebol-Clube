import { Router, Request, Response } from 'express';
import TeamController from '../controller/team.controller';

const teamController = new TeamController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.findAll(req, res),
);
router.get(
  '/:id',
  (req: Request, res: Response) => teamController.findById(req, res),
);
router.delete(
  '/:id',
  (req: Request, res: Response) => teamController.delete(req, res),
);
router.put(
  '/:id',
  (req: Request, res: Response) => teamController.update(req, res),
);
router.post(
  '/',
  (req: Request, res: Response) => teamController.create(req, res),
);

export default router;
