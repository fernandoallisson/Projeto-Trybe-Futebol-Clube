import * as jwt from 'jsonwebtoken';
import IToken from '../Interfaces/User/IToken';
import Errors from './Errors';

const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (payload: IToken): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const validateToken = (token: string): IToken => {
  try {
    const payload = jwt.verify(token, secret);
    return payload as IToken;
  } catch (error: unknown) {
    throw new Errors('Invalid token', 401);
  }
};

const extractToken = (bearer: string): string => {
  const token = bearer.split(' ')[1];
  return token;
};

export default {
  generateToken,
  validateToken,
  extractToken,
};
