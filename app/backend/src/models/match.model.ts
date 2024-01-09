import TeamModelSequelize from '../database/models/team-model-sequelize';
import MatchModelSequelize from '../database/models/match-model-sequelize';
import { IMacthTeams } from '../Interfaces/Match/IMatch';
import { MatchLessId } from '../Interfaces/Match/Match-lessId';

export default class MatchModel {
  private model = MatchModelSequelize;

  private static matchResponse(matches: MatchModelSequelize[]): IMacthTeams[] {
    return matches.map((match) => {
      const { id, homeTeamId, homeTeamGoals,
        awayTeamId, awayTeamGoals,
        inProgress, homeTeam, awayTeam } = match as unknown as IMacthTeams;
      return {
        id,
        homeTeamId,
        inProgress,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
        homeTeam: { teamName: homeTeam.teamName },
        awayTeam: { teamName: awayTeam.teamName },
      };
    });
  }

  async findAll(): Promise<IMacthTeams[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModelSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModelSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return MatchModel.matchResponse(matches);
  }

  async matchInProgress(inProgress: boolean): Promise<IMacthTeams[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: TeamModelSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModelSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return MatchModel.matchResponse(matches);
  }

  async finishedMatches(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(data: MatchLessId): Promise<MatchModelSequelize> {
    const match = await this.model.create(data);
    return match;
  }
}
