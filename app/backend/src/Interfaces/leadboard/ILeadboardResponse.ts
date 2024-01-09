import IMacth from '../Match/IMatch';

export default interface ILeadboardResponse {
  id: number;
  teamName: string;
  homeTeam?: IMacth[];
  awayTeam?: IMacth[];
}
