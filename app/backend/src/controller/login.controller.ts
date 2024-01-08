import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import IAuth from '../Interfaces/User/Auth';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const response = await this.loginService.login({ email, password });
    return res.status(response.statusCode).json(response.data);
  }

  public async getRole(req: IAuth, res: Response): Promise<Response> {
    const response = await this.loginService.getRole(req.user?.id);
    return res.status(response.statusCode).json(response.data);
  }
}

export default LoginController;
