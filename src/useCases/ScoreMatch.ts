import { ILeagueRepository, IMatchRepository, SavedMatchId, SavedTeamId, SavedUserId } from "common/repositories";
import Match from "entities/Match";

type Params = {
  matchId: SavedMatchId;
  teamId: SavedTeamId;
  userId: SavedUserId;
}

type Result = Match;

export default class ScoreMatchUseCase {
  constructor(
    private matchRepository: IMatchRepository,
    private leagueRepository: ILeagueRepository,
  ) { }
  
  async execute(params: Params): Promise<Result> {
    const match = await this.matchRepository.findOneById(params.matchId);
    const league = await this.leagueRepository.findOneById(match.leagueId);

    if (league.ownerId !== params.userId) throw new Error('');

    let scoringTeam: 'home' | 'away';
    if (match.home.id === params.teamId) scoringTeam = 'home';
    else if (match.away.id === params.teamId) scoringTeam = 'away';
    else throw new Error('Team invalid');

    match[scoringTeam].score = match[scoringTeam].score as number + 1;

    await this.matchRepository.save(match);

    return match;
  }
}