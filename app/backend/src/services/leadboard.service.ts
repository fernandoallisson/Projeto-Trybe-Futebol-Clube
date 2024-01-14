import LeadboardUtils from '../utils/leadboard.utils';
import TeamModelSequelize from '../database/models/team-model-sequelize';
import MatchModelSequelize from '../database/models/match-model-sequelize';

interface LeaderBoardResponse {
  id: number;
  teamName: string;
  homeTeam?: Teams[];
  awayTeam?: Teams[];
}

interface Teams {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface LeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  efficiency: number | string;
  goalsBalance: number;
}

interface LeaderBoardReturns {
  status: string;
  data: LeaderBoard[];
}

export default class LeaderBoardService {
  static getAllLeaderBoardHomeOrAway(homeAway: string): Promise<LeaderBoardReturns> {
    return TeamModelSequelize.findAll({
      include: {
        model: MatchModelSequelize,
        as: `${homeAway}Team`,
        where: { inProgress: false },
      },
    })
      .then((teamsWithMatches) => {
        const allBoards = this.getAllLeaderBoardHomeReturns(
          homeAway,
          teamsWithMatches as unknown as LeaderBoardResponse[],
        );
        return { status: 'successful', data: allBoards };
      });
  }

  static orderedLeaderBoard(leaderBoard: LeaderBoard[]) {
    const orderedLeaderBoard = leaderBoard
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return orderedLeaderBoard;
  }

  static getAllLeaderBoardHomeReturns(
    homeAway: string,
    allLeaderBoards: LeaderBoardResponse[],
  ): LeaderBoard[] {
    const leaderBoard = allLeaderBoards.map((team) => {
      const helpers = new LeadboardUtils();
      if (homeAway === 'home' || homeAway === 'away') {
        const matches = homeAway === 'home' ? team.homeTeam : team.awayTeam;
        return helpers.leaderboardReturn(homeAway, team.teamName, matches as Teams[]);
      }
      return helpers.leaderboardReturn('home', team.teamName, team.homeTeam as Teams[]);
    });
    const orderedLeaderBoard = this.orderedLeaderBoard(leaderBoard);

    return orderedLeaderBoard;
  }
}
