import { Router } from 'express';
import TeamRouter from './team.routes';

const routers = Router();

routers.use('/teams', TeamRouter);

export default routers;
