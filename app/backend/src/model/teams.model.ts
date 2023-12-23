import TeamModelSequelize from '../database/models/TeamsModel';
import { ITeamsModel } from '../Interfaces/index';

export default class TeamsModel implements ITeamsModel {
  private model = TeamModelSequelize;

  async findAll(): Promise<TeamModelSequelize[]> {
    const response = await this.model.findAll();
    return response;
  }

  async findById(id: number): Promise<TeamModelSequelize | null> {
    const response = await this.model.findByPk(id);
    return response;
  }
}
