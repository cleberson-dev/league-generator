import { 
  ILeagueRepository, 
  IMatchRepository, 
  ITeamRepository, 
  SavedMatchId, SavedTeamId, SavedLeagueId 
} from "common/repositories";

type Params = {
  matchId: SavedMatchId;
}

type ResultTeam = {
  id: SavedTeamId;
  name: string;
  code: string;
  score: number;
};

type Result = {
  id: SavedMatchId;
  roundNumber: number;
  finished: boolean;
  league: {
    id: SavedLeagueId;
    name: string;
    twoLegged: boolean;
  };
  home: ResultTeam;
  away: ResultTeam;
}

export default class GetMatchUseCase {
  constructor(
    private matchRepository: IMatchRepository,
    private teamRepository: ITeamRepository,
    private leagueRepository: ILeagueRepository
  ) {}


  async execute(params: Params): Promise<Result> {
    const { matchId } = params;

    const match = await this.matchRepository.findOneById(matchId);
    const matchLeague = await this.leagueRepository.findOneById(match.leagueId);
    const homeTeam = await this.teamRepository.findOneById(match.home.id);
    const awayTeam = await this.teamRepository.findOneById(match.away.id);

    return {
      id: match.id as SavedMatchId,
      roundNumber: match.roundNumber,
      finished: match.finished as boolean,
      league: {
        id: matchLeague.id as SavedLeagueId,
        name: matchLeague.name,
        twoLegged: matchLeague.twoLegged as boolean
      },
      home: { 
        id: homeTeam.id as SavedTeamId, 
        name: homeTeam.name, 
        code: homeTeam.code,
        score: match.home.score as number
      },
      away: {
        id: awayTeam.id as SavedTeamId, 
        name: awayTeam.name, 
        code: awayTeam.code,
        score: match.away.score as number
      }
    }
  }
}