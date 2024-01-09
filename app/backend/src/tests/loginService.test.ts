import * as sinon from 'sinon';
import * as chai from 'chai';

import UserModelSequelize from '../database/models/user-model-sequelize';
import LoginService from '../services/login.service';
import UserModel from '../models/user.model';
import { userMock1, userMock2 } from './mock/user.mock';
import Errors from '../utils/Errors';

describe('LoginService login', () => {
  const service = new LoginService();
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve retornar um objeto com o token do usuário e statusCode 200', async () => {
    const mockUser = UserModelSequelize.build(userMock1);
    sinon.stub(UserModel.prototype, 'findByEmail').resolves(mockUser);

    const response = await service.login({
      email: userMock1.email,
      password: 'secret_user'
    });

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('statusCode', 200);
    chai.expect(response).to.have.property('data');
    chai.expect(response.data).to.have.property('token');
  });

  it('Deve lançar uma mensagem "Invalid email or password" de erro e statusCode 401', async () => {
    try {
      await service.login({
        email: userMock1.email,
        password: 'wrong_password'
      });
    } catch (error: unknown) {
      const errorCasted = error as Errors;
      chai.expect(errorCasted).to.be.an.instanceOf(Errors);
      chai.expect(errorCasted).to.have.property('message', 'Invalid email or password');
      chai.expect(errorCasted).to.have.property('statusCode', 401);
    }
  });
});

describe('LoginService getRole', () => {
  const service = new LoginService();
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve retornar um objeto com a role do usuário e statusCode 200', async () => {
    const mockUser = UserModelSequelize.build(userMock1);
    sinon.stub(UserModel.prototype, 'findById').resolves(mockUser);

    const response = await service.getRole(1);

    chai.expect(response).to.be.an('object');
    chai.expect(response).to.have.property('statusCode', 200);
    chai.expect(response).to.have.property('data');
    chai.expect(response.data).to.have.property('role');
  });

  it('Deve lançar uma mensagem "User not found" de erro e statusCode 404', async () => {
    try {
      await service.getRole(3);
    } catch (error: unknown) {
      const errorCasted = error as Errors;
      chai.expect(errorCasted).to.be.an.instanceOf(Errors);
      chai.expect(errorCasted).to.have.property('message', 'User not found');
      chai.expect(errorCasted).to.have.property('statusCode', 404);
    }
  });
});