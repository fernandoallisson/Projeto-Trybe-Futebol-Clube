import TeamModelSequelize from '../database/models/TeamsModel';
import ITeams from './Teams';

export default interface ITeamsModel {
  findAll(): Promise<TeamModelSequelize[]>,
  findById(id: ITeams['id']): Promise<TeamModelSequelize | null>
}
