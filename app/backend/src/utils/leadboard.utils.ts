import IMacth from '../Interfaces/Match/IMatch';

class LeadboardUtils {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private efficiency: number;
  private goalsBalance: number;

  constructor() {
    this.name = '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.efficiency = 0;
    this.goalsBalance = 0;
  }

  private leadboardPoints(goalsFstTeam: number, goalsSndTeam: number): void {
    this.goalsFavor += goalsFstTeam;
    this.goalsOwn += goalsSndTeam;

    if (goalsFstTeam > goalsSndTeam) {
      this.totalVictories += 1;
      this.totalPoints += 3;
    }
    if (goalsFstTeam === goalsSndTeam) {
      this.totalDraws += 1;
      this.totalPoints += 1;
    }
    if (goalsFstTeam < goalsSndTeam) {
      this.totalLosses += 1;
    }
  }

  private leadboard() {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      efficiency: Number(this.efficiency).toFixed(2),
      goalsBalance: this.goalsBalance,
    };
  }

  public setEfficiency(): void {
    this.efficiency = (this.totalPoints / (this.totalGames * 3)) * 100;
  }

  public setGoalsBalance(): void {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  public leaderboardReturn(homeWay: string, name: string, teams: IMacth[]) {
    this.name = name;

    teams.forEach((team) => {
      const { homeTeamGoals, awayTeamGoals } = team;

      this.totalGames += 1;
      if (homeWay === 'home') {
        return this.leadboardPoints(homeTeamGoals, awayTeamGoals);
      }
      this.leadboardPoints(awayTeamGoals, homeTeamGoals);
    });

    this.setEfficiency();
    this.setGoalsBalance();
    return this.leadboard();
  }
}

export default LeadboardUtils;
