import { Router } from 'express';
import TeamRouter from './team.routes';
import LoginRouter from './login.routes';
import MatchRouter from './match.routes';
import leadboardRouter from './leadboard.routes';

const routers = Router();

routers.use('/teams', TeamRouter);
routers.use('/login', LoginRouter);
routers.use('/matches', MatchRouter);
routers.use('/leaderboard', leadboardRouter);

export default routers;
