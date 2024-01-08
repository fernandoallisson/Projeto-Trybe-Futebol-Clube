interface IMacth {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMacthTeams extends IMacth {
  homeTeam: { teamName: string | undefined },
  awayTeam: { teamName: string | undefined },
}

export default IMacth;
