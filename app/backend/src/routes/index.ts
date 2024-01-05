import { Router } from 'express';
import TeamRouter from './team.routes';
import LoginRouter from './login.routes';

const routers = Router();

routers.use('/teams', TeamRouter);
routers.use('/login', LoginRouter);

export default routers;
