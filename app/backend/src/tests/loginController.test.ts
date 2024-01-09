import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import LoginService from '../services/login.service';
import LoginController from '../controller/login.controller';
import { Request, Response } from 'express';
import IAuth from '../Interfaces/User/Auth';
import { serviceResponseLogin, serviceResponseRole, userMock1 } from './mock/user.mock';
import tokenUtils from '../utils/token.utils';
import { username } from '../database/config/database';

describe('LoginController login', () => {
  const controller = new LoginController();
  const res = {} as Response;
  const req = {} as Request;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve retornar uma resposta com status 200 e um token', async () => {
    req.body = {
      email: userMock1.email,
      password: 'secret_user'
    };
    sinon.stub(LoginService.prototype, 'login').resolves(serviceResponseLogin);

    await controller.login(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith(serviceResponseLogin.data);
  });
});

describe('LoginController getRole', () => {
  const controller = new LoginController();
  const res = {} as Response;
  const req = {} as IAuth;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve retornar uma resposta com status 200 e o role do usuário', async () => {
    req.user = {
      id: userMock1.id,
      username: userMock1.username,
    };
    sinon.stub(LoginService.prototype, 'getRole').resolves(serviceResponseRole);

    await controller.getRole(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWith(serviceResponseRole.data);
    });
});
