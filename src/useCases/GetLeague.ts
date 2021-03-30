import {
  ILeagueRepository,
  IMatchRepository,
  ITeamRepository,
  SavedLeagueId,
  SavedMatchId,
  SavedTeamId,
} from 'common/repositories';
import ITableCalculator from 'common/ITableCalculator';
import LeagueFixtures from 'entities/LeagueFixtures';
import LeagueTeamStats from 'entities/LeagueTeamStats';

type Params = {
  leagueId: SavedLeagueId;
};

type ResultFixture = {
  id: SavedMatchId;
  roundNumber: number;
  finished: boolean;
  home: ResultMatchTeam;
  away: ResultMatchTeam;
};

type ResultTeam = {
  id: SavedTeamId;
  name: string;
  code: string;
};

type ResultMatchTeam = {
  id: SavedTeamId;
  score: number;
};

type Result = {
  id: SavedLeagueId;
  name: string;
  twoLegged: boolean;
  teams: ResultTeam[];
  fixtures: ResultFixture[][];
  table: LeagueTeamStats[];
};

export default class GetLeagueUseCase {
  constructor(
    private leagueRepository: ILeagueRepository,
    private matchRepository: IMatchRepository,
    private teamRepository: ITeamRepository,
    private tableCalculator: ITableCalculator,
  ) {}

  async execute(params: Params): Promise<Result> {
    const { leagueId } = params;
    const league = await this.leagueRepository.findOneById(leagueId);
    const matches = await this.matchRepository.filterByLeague(
      leagueId,
    );
    const teams = await this.teamRepository.filterByLeague(
      leagueId,
    );

    const fixtures = new LeagueFixtures({ matches }).fixtures.map(
      (roundMatches) =>
        roundMatches.map(
          (match): ResultFixture => ({
            id: match.id as SavedMatchId,
            roundNumber: match.roundNumber,
            finished: match.finished as boolean,
            home: {
              id: match.home.id,
              score: match.homeScore,
            },
            away: {
              id: match.away.id,
              score: match.awayScore,
            },
          }),
        ),
    );

    const table = this.tableCalculator.calculate({ matches });

    return {
      id: league.id as SavedLeagueId,
      name: league.name,
      twoLegged: league.twoLegged as boolean,
      teams: teams.map((team): ResultTeam => ({
        id: team.id as SavedTeamId,
        name: team.name,
        code: team.code
      })),
      fixtures,
      table,
    };
  }
}
