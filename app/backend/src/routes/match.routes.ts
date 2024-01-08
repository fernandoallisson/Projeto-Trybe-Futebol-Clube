import { Request, Response, Router } from 'express';
import MatchController from '../controller/match.controller';
import authMiddleware from '../middlewares/Auth';

const router = Router();
const matchController = new MatchController();

router.get(
  '/',
  (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      return matchController.findAll(req, res);
    }
    return matchController.matchInProgress(req, res);
  },
);

router.put(
  '/:id/finish',
  authMiddleware,
  (req: Request, res: Response) => matchController.finishedMatches(req, res),
);

router.put(
  '/:id',
  authMiddleware,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default router;
