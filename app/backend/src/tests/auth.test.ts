import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModelSequelize from '../database/models/user-model-sequelize';
import { userMock1, userMock2 } from './mock/user.mock';
import tokenUtils from '../utils/token.utils';

chai.use(chaiHttp);

describe.only('Auth', () => {
  beforeEach(() => {
    sinon.restore();
  });
  
  it('Deve retornar um erro "Token invalid" mais um status 401', async () => {
    sinon.stub(tokenUtils, 'validateToken').returns({username: userMock1.username, id: userMock1.id });
    sinon.stub(UserModelSequelize, 'findByPk').resolves(null);

    const res = await chai.request(app).get('/login/role').set(
      'Authorization', 'Bearer token'
    ).send();

    chai.expect(res).to.have.status(401);
    chai.expect(res.body).to.have.property('message', 'Token invalid');
  });

  it('Deve retornar um erro "Token not found" mais um status 401', async () => {
    const res = await chai.request(app).get('/login/role').send();

    chai.expect(res).to.have.status(401);
    chai.expect(res.body).to.have.property('message', 'Token not found');
  });
});