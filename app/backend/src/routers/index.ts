import { Router } from 'express';
import teamRouter from './team.router';

const routes = Router();

routes.use('/teams', teamRouter);

export default routes;
