import { Request } from 'express';

export default interface IAuth extends Request {
  user?: {
    id: number;
    username: string;
  };
}
