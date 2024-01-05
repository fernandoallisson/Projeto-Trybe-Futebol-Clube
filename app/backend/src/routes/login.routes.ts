import { Request, Response, Router } from 'express';
import LoginController from '../controller/login.controller';
import authMiddleware from '../middlewares/Auth';

const router = Router();
const loginController = new LoginController();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  authMiddleware,
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default router;
