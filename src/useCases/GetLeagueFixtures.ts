import { IMatchRepository, SavedLeagueId, ITeamRepository, SavedTeamId, SavedMatchId } from "common/repositories";
import LeagueFixtures from "entities/LeagueFixtures";
import Team from "entities/Team";

type Params = {
  leagueId: SavedLeagueId;
}

type ResultMatchTeam = {
  id: SavedTeamId;
  name: string;
  code: string;
  score: number;
}

type ResultMatch = {
  id: SavedLeagueId;
  roundNumber: number;
  finished: boolean;
  home: ResultMatchTeam;
  away: ResultMatchTeam;
}

type Result = ResultMatch[][];

export default class GetLeagueFixturesUseCase {
  constructor(
    private matchRepository: IMatchRepository,
    private teamRepository: ITeamRepository,
  ) {}

  async execute(params: Params): Promise<Result> {
    const { leagueId } = params;
    const matches = await this.matchRepository.filterByLeague(leagueId);
    const teams = await this.teamRepository.filterByLeague(leagueId);

    const { fixtures } = new LeagueFixtures({ matches });

    return fixtures
      .map(roundMatches => roundMatches.map((match): ResultMatch => {
        const home = teams.find(team => team.id === match.home.id) as Team;
        const away = teams.find(team => team.id === match.home.id) as Team;
        
        return {
          id: match.id as SavedMatchId,
          finished: match.finished as boolean,
          roundNumber: match.roundNumber,
          home: {
            id: home.id as SavedTeamId,
            name: home.name,
            code: home.code,
            score: match.home.score as number
          },
          away: {
            id: away.id as SavedTeamId,
            name: away.name,
            code: away.code,
            score: match.away.score as number
          },
        }
      }))
  }
}