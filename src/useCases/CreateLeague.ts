import {
  ILeagueRepository,
  IMatchRepository,
  ITeamRepository,
  IUserRepository,
  SavedLeagueId,
  SavedMatchId,
  SavedTeamId,
  SavedUserId,
} from 'common/repositories';
import League from 'entities/League';
import Match from 'entities/Match';
import LeagueTeamStats from 'entities/LeagueTeamStats';
import LeagueFixtures from 'entities/LeagueFixtures';
import ILeagueFixturesGenerator from 'common/ILeagueFixturesGenerator';
import ITableCalculator from 'common/ITableCalculator';

type Params = {
  userId: SavedUserId;
  leagueName: string;
  leagueTeams: SavedTeamId[];
  twoLegged?: boolean;
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

export default class CreateLeagueUseCase {
  constructor(
    private userRepository: IUserRepository,
    private leagueRepository: ILeagueRepository,
    private teamRepository: ITeamRepository,
    private matchRepository: IMatchRepository,
    private fixturesGenerator: ILeagueFixturesGenerator,
    private tableCalculator: ITableCalculator,
  ) {}

  async execute(params: Params): Promise<Result> {
    await this.userRepository.findOneById(params.userId);

    for (const teamId of params.leagueTeams) {
      try {
        await this.teamRepository.findOneById(teamId);
      } catch (err) {
        throw new Error('Some teams were not found');
      }
    }

    const newLeague = League.create({
      name: params.leagueName,
      ownerId: params.userId,
      twoLegged: params.twoLegged,
    });

    await this.leagueRepository.save(newLeague);
    await this.teamRepository.addTeamsToLeague(
      params.leagueTeams,
      newLeague.id as SavedLeagueId,
    );

    const leagueTeams = await this.teamRepository.filterByLeague(
      newLeague.id as SavedLeagueId,
    );

    const fixtures = this.fixturesGenerator.generate({
      teamsIds: params.leagueTeams,
      twoLegged: params.twoLegged || false,
    });

    const matches: Match[] = [];
    fixtures.forEach((roundMatch) => {
      matches.push(
        Match.create({
          home: { id: roundMatch.home },
          away: { id: roundMatch.away },
          leagueId: newLeague.id as number,
          roundNumber: roundMatch.roundNumber,
        }),
      );
    });
    await this.matchRepository.addMatchesToLeague(matches);

    const table = this.tableCalculator.calculate({ matches });
    const leagueFixtures = new LeagueFixtures({
      matches,
    }).fixtures.map((roundMatches) =>
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

    return {
      id: newLeague.id as SavedLeagueId,
      name: newLeague.name,
      twoLegged: newLeague.twoLegged as boolean,
      teams: leagueTeams.map(
        (team): ResultTeam => ({
          id: team.id as SavedTeamId,
          name: team.name,
          code: team.code,
        }),
      ),
      table,
      fixtures: leagueFixtures,
    };
  }
}
