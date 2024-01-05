import IMacth from './IMatch';

export type MatchGoals = Omit<IMacth, 'id' | 'homeTeamId' | 'awayTeamId' | 'inProgress'>;
