import { Response, NextFunction } from 'express';
import Errors from '../utils/Errors';
import tokenUtils from '../utils/token.utils';
import IAuth from '../Interfaces/User/Auth';
import UserModel from '../models/user.model';

const authMiddleware = async (req: IAuth, _res: Response, next: NextFunction) => {
  const userModel = new UserModel();

  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Errors('Token not found', 401);

    const token = tokenUtils.validateToken(tokenUtils.extractToken(authorization));
    const user = await userModel.findById(token.id);

    if (!user || user.dataValues.username !== token.username) {
      throw new Errors('Token invalid', 401);
    }

    req.user = token;
    next();
  } catch (err: unknown) {
    err as Errors;
    next(err);
  }
};

export default authMiddleware;
