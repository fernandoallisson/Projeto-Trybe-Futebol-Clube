import LeadboardUtils from '../utils/leadboard.utils';
import TeamModelSequelize from '../database/models/team-model-sequelize';
import MatchModelSequelize from '../database/models/match-model-sequelize';
import ILeadboardResponse from '../Interfaces/leadboard/ILeadboardResponse';
import IMacth from '../Interfaces/Match/IMatch';
import ILeadboard from '../Interfaces/leadboard/ILeadeboard';
import ILeadboardReturn from '../Interfaces/leadboard/ILeadboardReturn';

class LeadboardService {
  static async getAllLeadboard(homeWay: string): Promise<ILeadboardReturn> {
    return TeamModelSequelize.findAll({
      include: {
        model: MatchModelSequelize,
        as: `${homeWay}Team`,
        where: { inProgress: false },
      },
    })
      .then((teams) => {
        const allLeadboard = this.getAllLeaderBoardHomeReturns(
          homeWay,
          teams as unknown as ILeadboardResponse[],
        );
        return { status: 'success', data: allLeadboard };
      });
  }

  static getAllLeaderBoardHomeReturns(
    homeAway: string,
    allLeaderBoards: ILeadboardResponse[],
  ): ILeadboard[] {
    const leaderBoard = allLeaderBoards.map((team) => {
      const helpers = new LeadboardUtils();
      if (homeAway === 'home' || homeAway === 'away') {
        const matches = homeAway === 'home' ? team.homeTeam : team.awayTeam;
        return helpers.leaderboardReturn(homeAway, team.teamName, matches as IMacth[]);
      }
      return helpers.leaderboardReturn('home', team.teamName, team.homeTeam as IMacth[]);
    });

    const ordered = this.orderedLeaderBoard(leaderBoard);

    return ordered;
  }

  static orderedLeaderBoard(leaderBoard: ILeadboard[]) {
    const orderedLeaderBoard = leaderBoard
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    return orderedLeaderBoard;
  }
}

export default LeadboardService;
