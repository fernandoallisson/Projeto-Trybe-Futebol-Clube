import ITeams from './Teams';
import ITeamsModel from './TeamsModel';

export type newEntity<T> = Omit<T, 'id'>; // A analisar

export { ITeams, ITeamsModel };
