import TeamModelSequelize from '../database/models/TeamsModel';
import { ITeamsModel } from '../Interfaces/index';

export default class TeamsModel implements ITeamsModel {
  private model = TeamModelSequelize;

  public async findAll(): Promise<TeamModelSequelize[]> {
    const response = await this.model.findAll();
    return response;
  }

  public async findById(id: number): Promise<TeamModelSequelize | null> {
    const response = await this.model.findByPk(id);
    return response;
  }
}
