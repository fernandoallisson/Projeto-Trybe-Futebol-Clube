// import * as chai from 'chai';
// import * as sinon from 'sinon';

// import TeamModel from '../../models/team.model';
// import { teams } from '../mock/team.mock';
// import TeamModelSequelize from '../../database/models/team-model-sequelize';
// import sequelize from '../../database/models';

// describe('TeamModel', () => {
//   const model = new TeamModel();
//   beforeEach(() => {
//     sinon.restore();
//   });

//   it.only('Retornar todos os times', async () => {
//     const mock = TeamModelSequelize.build(teams[3])
//     sinon.stub(TeamModelSequelize, 'findAll').resolves([mock]);

//     const result = await model.findAll();

//     chai.expect(result).to.be.an('array');
//     chai.expect(result[0]).to.be.an('object');
//     chai.expect(result[0]).to.have.property('id', mock.id);
//     chai.expect(result[0]).to.have.property('teamName', mock.teamName);
//   });
// });
