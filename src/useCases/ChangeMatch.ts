import { ILeagueRepository, IMatchRepository, SavedMatchId, SavedTeamId, SavedUserId } from 'common/repositories';

type Params = {
  matchId: SavedMatchId;
  userId: SavedUserId;
  homeScore?: number;
  awayScore?: number;
};
type ResultTeam = {
  id: SavedTeamId;
  score: number;
}
type Result = {
  id: SavedMatchId,
  roundNumber: number;
  finished: boolean;
  home: ResultTeam;
  away: ResultTeam;
};

export default class ChangeMatchUseCase {
  constructor( 
    private matchRepository: IMatchRepository,
    private leagueRepository: ILeagueRepository,
  ) {}
  
  async execute(params: Params): Promise<Result> {
    const match = await this.matchRepository.findOneById(params.matchId);
    const league = await this.leagueRepository.findOneById(match.leagueId);
    
    if (params.userId !== league.ownerId) throw Error('');
    if (match.finished) throw Error('');

    match.home.score = params.homeScore || match.home.score;
    match.away.score = params.awayScore || match.away.score;
    match.finished = true;

    return {
      id: match.id as SavedMatchId,
      roundNumber: match.roundNumber,
      finished: match.finished as boolean,
      home: {
        id: match.home.id,
        score: match.homeScore
      },
      away: {
        id: match.away.id,
        score: match.awayScore
      }
    }
  }
}