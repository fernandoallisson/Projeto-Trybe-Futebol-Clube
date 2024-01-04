import { TeamLessId } from '../Interfaces/Team/ITeamLessId';
import { ITeamModel } from '../Interfaces/Team/ITeam.model';
import TeamModelSequelize from '../database/models/team-model-sequelize';

export default class TeamModel implements ITeamModel {
  private teamModel = TeamModelSequelize;

  public async create({ teamName }: TeamLessId): Promise<TeamModelSequelize> {
    const response = await this.teamModel.create({ teamName });
    return response;
  }

  public async delete(id: number): Promise<number> {
    const response = await this.teamModel.destroy({ where: { id } });
    return response;
  }

  public async findAll(): Promise<TeamModelSequelize[]> {
    const response = await this.teamModel.findAll();
    return response;
  }

  public async findById(id: number): Promise<TeamModelSequelize | null> {
    const response = await this.teamModel.findByPk(id);
    return response;
  }

  public async update(
    id: number,
    { teamName }: TeamLessId,
  ): Promise<TeamModelSequelize | null> {
    await this.teamModel.update({ teamName }, { where: { id } });
    const response = await this.teamModel.findByPk(id);
    return response;
  }

  public async findByName(teamName: string): Promise<TeamModelSequelize | null> {
    const response = await this.teamModel.findOne({ where: { teamName } });
    return response;
  }
}
