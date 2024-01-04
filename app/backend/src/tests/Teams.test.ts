import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { teamMock, teamsMock } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testanto os Teams', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Testa se há um endpoint para listagem de todos os times (testar a função findAll)', async () => {
    const response = (await chai.request(app).get('/teams').send());
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    // expect(response.body).to.be.deep.equal(teamsMock);
  });
  // it.only('Testa se há um endpoint para listagem de um time específico (testar a função findById)', async () => {
  //   const response = await chai.request(app).get('/teams/1');
  //   expect(response).to.have.status(200);
  //   expect(response.body).to.be.an('object');
  //   // expect(response.body).to.be.deep.equal(teamMock);
  // });
});
