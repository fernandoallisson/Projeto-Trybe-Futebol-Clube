import * as Joi from 'joi';
import { ILogin } from '../Interfaces/User/ILogin';

const loginSchema: Joi.ObjectSchema<ILogin> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

export default loginSchema;
