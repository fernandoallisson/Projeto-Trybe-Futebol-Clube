import { Router } from 'express';
import TeamController from '../controller/team.controller';

const teamController = new TeamController();
const router = Router();

router.get('/', teamController.findAll);
router.get('/:id', teamController.findById);
router.post('/', teamController.create);
router.put('/:id', teamController.update);
router.delete('/:id', teamController.delete);

export default router;
