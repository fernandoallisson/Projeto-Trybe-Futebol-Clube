import * as bycrpt from 'bcryptjs';
import { ILogin } from '../Interfaces/User/ILogin';
import ServiceResponse from '../Interfaces/service.response';
import Errors from '../utils/Errors';
import UserModel from '../models/user.model';
import serviceToken from '../utils/token.utils';
import loginSchema from '../schemas/login.schema';

class LoginService {
  private userModel = new UserModel();

  public async getRole(id: number | undefined): Promise<ServiceResponse<{ role: string }>> {
    if (!id) {
      throw new Errors('User not found', 404);
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Errors('User not found', 404);
    }
    return { statusCode: 200, data: { role: user.dataValues.role } };
  }

  public async login({ email, password }: ILogin): Promise<ServiceResponse<{ token: string }>> {
    if (!email || !password) throw new Errors('All fields must be filled', 400);

    const { error } = loginSchema.validate({ email, password });
    if (error) throw new Errors('Invalid email or password', 401);

    const user = await this.userModel.findByEmail(email);
    if (!user || !bycrpt.compareSync(password, user.password)) {
      throw new Errors('Invalid email or password', 401);
    }

    const token = serviceToken.generateToken({ id: user.id, username: user.username });
    return { statusCode: 200, data: { token } };
  }
}

export default LoginService;
